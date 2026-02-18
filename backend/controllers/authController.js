import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import SibApiV3Sdk from 'sib-api-v3-sdk';

// ✅ BREVO API SDK CONFIGURATION
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY; 

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// --- AUTH CONTROLLERS ---

export const signup = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) return res.status(400).json({ message: "All fields required" });

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword, role: role || "user" });

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Signup error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000); 
    user.otpCreatedAt = new Date();
    user.resendCount = 0; 
    await user.save();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Login Verification Code";
    sendSmtpEmail.htmlContent = `<h3>Your OTP is: <b style="color:blue;">${otp}</b></h3><p>Valid for 5 minutes.</p>`;
    sendSmtpEmail.sender = { "name": "Security Team", "email": "guptamahek35@gmail.com" };
    sendSmtpEmail.to = [{ "email": user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ message: "OTP sent to your email", step: "verify-otp", email: user.email });
  } catch (error) {
    res.status(500).json({ message: "Login error", error: error.message });
  }
};

export const resendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const timeDiff = Date.now() - new Date(user.otpCreatedAt).getTime();
    if (timeDiff < 60000) {
      const remaining = Math.ceil((60000 - timeDiff) / 1000);
      return res.status(429).json({ message: `Please wait ${remaining}s before resending.` });
    }

    if (user.resendCount >= 5) {
      return res.status(403).json({ message: "Resend limit reached. Please try login again." });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = otp;
    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);
    user.otpCreatedAt = new Date();
    user.resendCount += 1; 
    await user.save();

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Verification Code";
    sendSmtpEmail.htmlContent = `<h3>Your new OTP is: <b style="color:green;">${otp}</b></h3><p>Attempts used: ${user.resendCount}/5</p>`;
    sendSmtpEmail.sender = { "name": "Security Team", "email": "guptamahek35@gmail.com" };
    sendSmtpEmail.to = [{ "email": user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.json({ message: "New OTP sent successfully", resendCount: user.resendCount });
  } catch (error) {
    res.status(500).json({ message: "Resend failed", error: error.message });
  }
};

export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email, otp, otpExpire: { $gt: new Date() } });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.otp = null;
    user.otpExpire = null;
    user.otpCreatedAt = null;
    user.resendCount = 0;
    user.status = "active";
    user.lastSeen = new Date();
    await user.save();

    res.cookie("refreshToken", refreshToken, { httpOnly: true, secure: true, sameSite: "none" });

    // ✅ FIX: Poora user data bhejein (profilePic ke saath)
    res.json({ 
      accessToken, 
      user: { 
        id: user._id,
        email: user.email, 
        role: user.role,
        profilePic: user.profilePic // 👈 Ye ab Navbar mein dikhega login ke baad
      } 
    });

  } catch (error) {
    res.status(500).json({ message: "Verification failed" });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id; 
    
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    // 1. Pehle check karein ki image ka URL kahan hai
    // Multer-Cloudinary aksar 'path' ya 'secure_url' mein URL bhejta hai
    const imageUrl = req.file.path || req.file.secure_url;

    if (!imageUrl) {
      return res.status(500).json({ message: "Cloudinary did not return a URL" });
    }

    // 2. Database update karein
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: imageUrl }, // Pura URL save karein
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    // 3. Response bhejein
    res.json({ 
      message: "Profile picture updated successfully", 
      user: {
        id: updatedUser._id,
        email: updatedUser.email,
        role: updatedUser.role,
        profilePic: updatedUser.profilePic // Frontend ko yehi chahiye
      } 
    });

  } catch (error) {
    console.error("Update Profile Error:", error);
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// ... resetPassword, forgotPassword, logout, etc. functions continue here as they were...

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(200).json({ message: "If an account exists, a link will be sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = resetTokenHash;
    user.resetTokenExpire = new Date(Date.now() + 3600000); 
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h3>Reset Your Password</h3>
          <p>Aapne password reset karne ki request ki hai. Niche link par click karein:</p>
          <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>Ye link 1 ghante mein expire ho jayega.</p>
        </body>
      </html>`;
    sendSmtpEmail.sender = { "name": "Support Team", "email": "guptamahek35@gmail.com" };
    sendSmtpEmail.to = [{ "email": user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    res.status(200).json({ message: "Reset link sent successfully!" });

  } catch (error) {
    console.error("BREVO_API_ERROR:", error.message);
    res.status(500).json({ message: "Email API failed", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: resetTokenHash,
      resetTokenExpire: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.resetToken = undefined;
    user.resetTokenExpire = undefined;
    await user.save();

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Reset password error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
    res.json({ message: "Logged out" });
  } catch (error) {
    res.status(500).json({ message: "Logout error" });
  }
};

export const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ message: "No refresh token" });

    jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Invalid refresh token" });
      const user = await User.findById(decoded.id);
      if (!user) return res.status(404).json({ message: "User not found" });
      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Refresh token error" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const totalUsers = await User.countDocuments();

    const users = await User.find({}, "-password")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete error" });
  }
};

export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    await User.findByIdAndUpdate(req.params.id, { role });
    res.status(200).json({ message: "Role updated" });
  } catch (error) {
    res.status(500).json({ message: "Update error" });
  }
};
// 1. Update Email
exports.updateEmail = async (req, res) => {
    try {
        const { email } = req.body;
        const userId = req.user.id; // Yeh auth middleware se aayega

        // Check karein ki email pehle se exist toh nahi karti
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ message: "Email already in use" });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email: email },
            { new: true }
        ).select("-password");

        res.status(200).json({ message: "Email updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

// 2. Update Password (Secure Way)
exports.updatePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.id;

        const user = await User.findById(userId);

        // 1. Purana password verify karein
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Current password is incorrect" });
        }

        // 2. Naya password hash karein
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();
        res.status(200).json({ message: "Password updated successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
};

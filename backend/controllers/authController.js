
// import User from "../models/User.js";
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import crypto from "crypto";
// import SibApiV3Sdk from 'sib-api-v3-sdk';

// // ✅ BREVO API SDK CONFIGURATION
// const defaultClient = SibApiV3Sdk.ApiClient.instance;
// const apiKey = defaultClient.authentications['api-key'];
// apiKey.apiKey = process.env.BREVO_API_KEY; 

// const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

// // --- AUTH CONTROLLERS ---

// export const signup = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;
//     if (!email || !password) return res.status(400).json({ message: "All fields required" });

//     const existingUser = await User.findOne({ email });
//     if (existingUser) return res.status(400).json({ message: "User already exists" });

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await User.create({ email, password: hashedPassword, role: role || "user" });

//     res.status(201).json({ message: "User created successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Signup error" });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });

//     if (!user || !(await bcrypt.compare(password, user.password))) {
//       return res.status(401).json({ message: "Invalid credentials" });
//     }

//     user.status = "active";
//     user.lastSeen = new Date();
//     await user.save();

//     const accessToken = generateAccessToken(user);
//     const refreshToken = generateRefreshToken(user);

//     res.cookie("refreshToken", refreshToken, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//     });

//     res.json({
//       accessToken,
//       user: { email: user.email, role: user.role, status: user.status },
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Login error" });
//   }
// };

// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(200).json({ message: "If an account exists, a link will be sent." });
//     }

//     const resetToken = crypto.randomBytes(32).toString("hex");
//     const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

//     user.resetToken = resetTokenHash;
//     user.resetTokenExpire = new Date(Date.now() + 3600000); 
//     await user.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
//     sendSmtpEmail.subject = "Password Reset Request";
//     sendSmtpEmail.htmlContent = `
//       <html>
//         <body style="font-family: Arial, sans-serif;">
//           <h3>Reset Your Password</h3>
//           <p>Aapne password reset karne ki request ki hai. Niche link par click karein:</p>
//           <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
//           <p>Ye link 1 ghante mein expire ho jayega.</p>
//         </body>
//       </html>`;
//     sendSmtpEmail.sender = { "name": "Support Team", "email": "guptamahek35@gmail.com" };
//     sendSmtpEmail.to = [{ "email": user.email }];

//     await apiInstance.sendTransacEmail(sendSmtpEmail);

//     res.status(200).json({ message: "Reset link sent successfully!" });

//   } catch (error) {
//     console.error("BREVO_API_ERROR:", error.message);
//     res.status(500).json({ message: "Email API failed", error: error.message });
//   }
// };

// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body;
//     const resetTokenHash = crypto.createHash("sha256").update(token).digest("hex");

//     const user = await User.findOne({
//       resetToken: resetTokenHash,
//       resetTokenExpire: { $gt: new Date() },
//     });

//     if (!user) return res.status(400).json({ message: "Invalid or expired token" });

//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetToken = undefined;
//     user.resetTokenExpire = undefined;
//     await user.save();

//     res.status(200).json({ message: "Password updated successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Reset password error" });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
//     res.json({ message: "Logged out" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout error" });
//   }
// };

// export const refreshToken = async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ message: "No refresh token" });

//     jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Invalid refresh token" });
//       const user = await User.findById(decoded.id);
//       if (!user) return res.status(404).json({ message: "User not found" });
//       const accessToken = generateAccessToken(user);
//       res.json({ accessToken });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Refresh token error" });
//   }
// };

// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, "-password").sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Users fetch error" });
//   }
// };

// export const deleteUser = async (req, res) => {
//   try {
//     await User.findByIdAndDelete(req.params.id);
//     res.status(200).json({ message: "User deleted" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete error" });
//   }
// };

// export const updateUserRole = async (req, res) => {
//   try {
//     const { role } = req.body;
//     await User.findByIdAndUpdate(req.params.id, { role });
//     res.status(200).json({ message: "Role updated" });
//   } catch (error) {
//     res.status(500).json({ message: "Update error" });
//   }
// };
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

    user.status = "active";
    user.lastSeen = new Date();
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });

    res.json({
      accessToken,
      user: { email: user.email, role: user.role, status: user.status },
    });
  } catch (error) {
    res.status(500).json({ message: "Login error" });
  }
};

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

// ✅ UPDATED: GET USERS WITH PAGINATION
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

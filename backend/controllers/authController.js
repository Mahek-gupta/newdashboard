
import User from "../models/User.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"

// 1. GLOBAL TRANSPORTER (Function se bahar rakhein taaki connection stable rahe)
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   host: "smtp.gmail.com",
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS, // Yahan 16-digit App Password aayega
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // Port 465 ke liye true zaroori hai
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    // Ye line Render ke connection issues ko fix karegi
    rejectUnauthorized: false,
  },
  connectionTimeout: 20000, // Wait time badha diya (20 seconds)
  greetingTimeout: 10000,
});

// 2. HELPER FUNCTION: Send Email
const sendResetEmail = async (email, resetLink) => {
  const mailOptions = {
    from: `"Support Team" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Password Reset Request",
    html: `
        <div style="font-family: sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <h2>Password Reset Request</h2>
          <p>Aapne password reset ke liye request ki hai. Niche diye gaye link par click karein:</p>
          <a href="${resetLink}" style="background-color: #1f2937; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Reset Password
          </a>
          <p>Ye link 1 ghante mein expire ho jayega.</p>
          <p>Agar aapne ye request nahi ki, toh is email ko ignore karein.</p>
        </div>
      `,
  };

  return transporter.sendMail(mailOptions);
};

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

// 🔥 CORRECTED FORGOT PASSWORD
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ message: "Email is required" });

    const user = await User.findOne({ email });
    if (!user) {
      // Security: User ko mat batao ki email galat hai
      return res.status(200).json({ message: "If an account exists, a link will be sent." });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenHash = crypto.createHash("sha256").update(resetToken).digest("hex");

    user.resetToken = resetTokenHash;
    user.resetTokenExpire = new Date(Date.now() + 60 * 60 * 1000); // 1 Hour
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    // Email send karne ka wait karein
    try {
      await sendResetEmail(user.email, resetLink);
      res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (mailErr) {
      console.error("Mail Transport Error:", mailErr);
      return res.status(500).json({ message: "Email service failed. Please check EMAIL_PASS." });
    }
  } catch (error) {
    console.error("Forgot password main error:", error);
    res.status(500).json({ message: "Internal server error" });
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

// ... Baaki Admin functions wahi rahenge
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password").sort({ createdAt: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Users fetch error" });
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

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });
    const user = await User.findById(decoded.id);
    const accessToken = generateAccessToken(user);
    res.json({ accessToken });
  });
};

export const logout = async (req, res) => {
  if (req.user) await User.findByIdAndUpdate(req.user.id, { status: "inactive" });
  res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
  res.json({ message: "Logged out" });
};


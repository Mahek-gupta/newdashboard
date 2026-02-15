

// import User from "../models/User.js"
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import nodemailer from "nodemailer"
// import crypto from "crypto"

// // GLOBAL TRANSPORTER: Render ke liye sabse stable configuration
// // const transporter = nodemailer.createTransport({
// //   service: "gmail", // Gmail service use karna Render par zyada stable hai
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// //   tls: {
// //     rejectUnauthorized: false, // Security check bypass for hosting
// //   }
// // });



// // 1. Updated Transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail", 
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // 2. Updated Helper with verification
// const sendResetEmail = async (email, resetLink) => {
//   try {
//     // Ye line check karegi ki connection ban raha hai ya nahi
//     await transporter.verify(); 
    
//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       html: `<h3>Reset Link:</h3><a href="${resetLink}">${resetLink}</a>`
//     };

//     return await transporter.sendMail(mailOptions);
//   } catch (error) {
//     console.error("Transporter Verify Error:", error.message);
//     throw error; // Taki forgotPassword ko pata chale ki mail nahi gaya
//   }
// };
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
//     user.resetTokenExpire = new Date(Date.now() + 60 * 60 * 1000); 
//     await user.save();

//     const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

//     // Yahan await lagana zaroori hai error catch karne ke liye
//     try {
//       await sendResetEmail(user.email, resetLink);
//       res.status(200).json({ message: "Password reset link sent to your email" });
//     } catch (mailErr) {
//       console.error("SMTP ERROR:", mailErr.message);
//       // Agar SMTP fail ho, toh user ko batayein
//       return res.status(500).json({ message: "Email service temporarily unavailable. Try again later." });
//     }
//   } catch (error) {
//     console.error("FORGOT PASSWORD ERROR:", error);
//     res.status(500).json({ message: "Internal server error" });
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

// export const refreshToken = async (req, res) => {
//   try {
//     const token = req.cookies.refreshToken;
//     if (!token) return res.status(401).json({ message: "No refresh token" });

//     jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
//       if (err) return res.status(403).json({ message: "Invalid refresh token" });
//       const user = await User.findById(decoded.id);
//       if(!user) return res.status(404).json({ message: "User not found" });
//       const accessToken = generateAccessToken(user);
//       res.json({ accessToken });
//     });
//   } catch (error) {
//     res.status(500).json({ message: "Refresh token error" });
//   }
// };

// export const logout = async (req, res) => {
//   try {
//     if (req.user) await User.findByIdAndUpdate(req.user.id, { status: "inactive" });
//     res.clearCookie("refreshToken", { httpOnly: true, sameSite: "none", secure: true });
//     res.json({ message: "Logged out" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout error" });
//   }
// };

import User from "../models/User.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"

// ✅ STABLE GMAIL TRANSPORTER
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // bjnsyyrovaarddne
  }
});

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
    res.json({ accessToken, user: { email: user.email, role: user.role, status: user.status } });
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
    user.resetTokenExpire = new Date(Date.now() + 60 * 60 * 1000); 
    await user.save();

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

    try {
      const mailOptions = {
        from: `"Support Team" <${process.env.EMAIL_USER}>`,
        to: user.email,
        subject: "Password Reset Request",
        html: `<h3>Password Reset</h3><p>Niche diye link par click karein:</p><a href="${resetLink}">${resetLink}</a>`
      };
      await transporter.sendMail(mailOptions);
      res.status(200).json({ message: "Password reset link sent to your email" });
    } catch (mailErr) {
      console.error("SMTP ERROR:", mailErr.message);
      return res.status(500).json({ message: "Email service failed. Try again later." });
    }
  } catch (error) {
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
      if(!user) return res.status(404).json({ message: "User not found" });
      const accessToken = generateAccessToken(user);
      res.json({ accessToken });
    });
  } catch (error) {
    res.status(500).json({ message: "Refresh token error" });
  }
};

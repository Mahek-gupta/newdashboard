
// import User from "../models/User.js"
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import nodemailer from "nodemailer"
// import crypto from "crypto"



// // 3. Signup function ko thoda update karein taaki admin role bhi bhej sake
// // Aapka existing signup replace karein isse:
// export const signup = async (req, res) => {
//   const { email, password, role } = req.body; // Role bhi lein

//   if (!email || !password) {
//     return res.status(400).json({ message: "All fields required" });
//   }

//   const existingUser = await User.findOne({ email });
//   if (existingUser) {
//     return res.status(400).json({ message: 'User already exists' });
//   }

//   const hashedPassword = await bcrypt.hash(password, 10);

//   const user = await User.create({
//     email,
//     password: hashedPassword,
//     role: role || "user" // Agar role nahi bhejte toh default "user"
//   });

//   res.status(201).json({ message: "User created successfully" });
// };


// // Updated Login Controller
// export const login = async (req, res) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   const isMatch = await bcrypt.compare(password, user.password);
//   if (!isMatch) {
//     return res.status(401).json({ message: "Invalid credentials" });
//   }

//   // 🔥 Login par status ACTIVE karein aur lastSeen update karein
//   user.status = "active";
//   user.lastSeen = new Date();
//   await user.save();

//   const accessToken = generateAccessToken(user);
//   const refreshToken = generateRefreshToken(user);

//   res.cookie("refreshToken", refreshToken, {
//     httpOnly: true,
//     secure: true, // Production mein true karein
//     sameSite: "none"
//   });

//   res.json({
//     accessToken,
//     user: {
//       email: user.email,
//       role: user.role,
//       status: user.status
//     }
//   });
// };


// export const refreshToken = async (req, res) => {
//   const token = req.cookies.refreshToken
//   if (!token) return res.status(401).json({ message: "No refresh token" })

//   jwt.verify(token, process.env.REFRESH_SECRET, async (err, decoded) => {
//     if (err) return res.status(403).json({ message: "Invalid refresh token" })

//     // 🔥 DB se user lao
//     const user = await User.findById(decoded.id)
//     if (!user) return res.status(404).json({ message: "User not found" })

//     // 🔥 ROLE ke saath token
//     const accessToken = generateAccessToken(user)

//     res.json({ accessToken })
//   })
// }




// // Updated Logout Controller
// export const logout = async (req, res) => {
//   try {
//     // 🔥 Logout par status INACTIVE karein
//     // Note: Iske liye 'protect' middleware route mein hona chahiye taaki req.user mile
//     if (req.user && req.user.id) {
//       await User.findByIdAndUpdate(req.user.id, { status: "inactive" });
//     }

//     res.clearCookie("refreshToken", {
//       httpOnly: true,
//       sameSite: "none",
//       secure: true
//     });

//     res.json({ message: "User Logged Out Successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Logout error" });
//   }
// };

// // Forgot Password - Send Reset Email
// export const forgotPassword = async (req, res) => {
//   try {
//     const { email } = req.body

//     if (!email) {
//       return res.status(400).json({ message: "Email is required" })
//     }

//     const user = await User.findOne({ email })
//     if (!user) {
//       // Security: Don't reveal if email exists
//       return res.status(200).json({
//         message: "If an account exists with this email, a reset link will be sent"
//       })
//     }

//     // Generate reset token (valid for 1 hour)
//     const resetToken = crypto.randomBytes(32).toString("hex")
//     const resetTokenHash = crypto
//       .createHash("sha256")
//       .update(resetToken)
//       .digest("hex")
//     const resetTokenExpire = new Date(Date.now() + 60 * 60 * 1000) // 1 hour

//     // Save token to database
//     user.resetToken = resetTokenHash
//     user.resetTokenExpire = resetTokenExpire
//     await user.save()

//     // Send email with reset link
//     const resetLink = 
// `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`

//     await sendResetEmail(user.email, resetLink)

//     res.status(200).json({
//       message: "Password reset link sent to your email"
//     })
//   } catch (error) {
//     console.error("Forgot password error:", error)
//     res.status(500).json({ message: "Failed to process request" })
//   }
// }

// // Reset Password - Verify Token and Update Password
// export const resetPassword = async (req, res) => {
//   try {
//     const { token, newPassword } = req.body

//     if (!token || !newPassword) {
//       return res.status(400).json({ message: "Token and password are required" })
//     }

//     // Hash the token to compare with stored hash
//     const resetTokenHash = crypto
//       .createHash("sha256")
//       .update(token)
//       .digest("hex")

//     // Find user with valid reset token
//     const user = await User.findOne({
//       resetToken: resetTokenHash,
//       resetTokenExpire: { $gt: new Date() }
//     })

//     if (!user) {
//       return res.status(400).json({
//         message: "Invalid or expired reset token"
//       })
//     }

//     // Hash new password and update user
//     const hashedPassword = await bcrypt.hash(newPassword, 10)
//     user.password = hashedPassword
//     user.resetToken = undefined
//     user.resetTokenExpire = undefined
//     await user.save()

//     res.status(200).json({
//       message: "Password reset successfully"
//     })
//   } catch (error) {
//     console.error("Reset password error:", error)
//     res.status(500).json({ message: "Failed to reset password" })
//   }
// }

// // Helper function to send reset email using Gmail
// const sendResetEmail = async (email, resetLink) => {
//   try {
//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS
//       }
//     })

//     const mailOptions = {
//       from: process.env.EMAIL_USER,
//       to: email,
//       subject: "Password Reset Request",
//       html: `
//         <h2>Password Reset Request</h2>
//         <p>Click the link below to reset your password. This link will expire in 1 hour.</p>
//         <a href="${resetLink}" style="background-color: #1f2937; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">
//           Reset Password
//         </a>
//         <p>Or copy this link: ${resetLink}</p>
//         <p>If you didn't request this, please ignore this email.</p>
//       `
//     }

//     const info = await transporter.sendMail(mailOptions)
//     console.log("✅ Reset email sent successfully to:", email)
//     console.log("Reset link:", resetLink)
//   } catch (error) {
//     console.error("Email sending error:", error)
//     throw new Error("Failed to send reset email")
//   }
// }




// // --- Naye Admin Functions ---

// // 1. Saare users get karne ke liye
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find({}, "-password").sort({ createdAt: -1 });
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: "Users fetch karne mein error aaya" });
//   }
// };

// // 2. Kisi user ko delete karne ke liye
// export const deleteUser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     // Khud ko delete karne se rokne ke liye logic (Optional)
//     if (req.user.id === id) {
//       return res.status(400).json({ message: "Aap khud ko delete nahi kar sakte" });
//     }
//     await User.findByIdAndDelete(id);
//     res.status(200).json({ message: "User successfully delete ho gaya" });
//   } catch (error) {
//     res.status(500).json({ message: "Delete karne mein fail ho gaya" });
//   }
// };

// // Add this to authController.js
// export const updateUserRole = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const { role } = req.body;

//     // Check if role is valid
//     if (!['admin', 'user'].includes(role)) {
//       return res.status(400).json({ message: "Invalid role type" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(
//       id, 
//       { role }, 
//       { new: true }
//     ).select("-password");

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "Role updated successfully", user: updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Update karne mein error aaya" });
//   }
// };
import User from "../models/User.js"
import { generateAccessToken, generateRefreshToken } from "../utils/token.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import nodemailer from "nodemailer"
import crypto from "crypto"

// 1. GLOBAL TRANSPORTER (Function se bahar rakhein taaki connection stable rahe)
const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Yahan 16-digit App Password aayega
  },
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



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
//     secure: false, // Production mein true karein
//     sameSite: "lax"
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
//       sameSite: "lax",
//       secure: false
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
// // export const getAllUsers = async (req, res) => {
// //   try {
// //     const users = await User.find({}, "-password").sort({ createdAt: -1 });
// //     res.status(200).json(users);
// //   } catch (error) {
// //     res.status(500).json({ message: "Users fetch karne mein error aaya" });
// //   }
// // };

// // 1. Saare users get karne ke liye (With Pagination)
// export const getAllUsers = async (req, res) => {
//   try {
//     // Frontend se page aur limit lena (Default: page 1, limit 10)
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
    
//     // Logic: Kitne records skip karne hain
//     const skip = (page - 1) * limit;

//     // Database se data nikalna
//     const users = await User.find({}, "-password") // Password nahi bhejna
//       .sort({ createdAt: -1 }) // Naye users sabse upar
//       .skip(skip)
//       .limit(limit);

//     // Total users ki ginti (Frontend Table Pagination ke liye zaroori hai)
//     const totalUsers = await User.countDocuments();

//     // Response bhejna jo aapke frontend logic se match kare
//     res.status(200).json({
//       users,         // Ye aapke response.data.users mein jayega
//       totalUsers,    // Ye setTotalUsers mein jayega
//       currentPage: page,
//       totalPages: Math.ceil(totalUsers / limit)
//     });

//   } catch (error) {
//     console.error("Error fetching users:", error);
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


// import dotenv from "dotenv"; 
// dotenv.config();  
// import User from "../models/User.js"; 
// import { generateAccessToken, generateRefreshToken } from "../utils/token.js"; 
// import bcrypt from "bcryptjs"; 
// import jwt from "jsonwebtoken"; 
// import crypto from "crypto"; 
// import nodemailer from "nodemailer";  

// const isProduction = process.env.NODE_ENV === "production";  

// const transporter = nodemailer.createTransport({   
//   host: "smtp.gmail.com",   
//   port: 587,   
//   secure: false,   
//   auth: {   
//     user: process.env.EMAIL_USER,   
//     pass: process.env.EMAIL_PASS,   
//   }, 
// });  

// const sendEmail = async ({ to, subject, html }) => {   
//   if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {     
//     throw new Error("Email credentials are not configured");   
//   }    
//   return transporter.sendMail({     
//     from: process.env.EMAIL_USER,     
//     to,     
//     subject,     
//     html,   
//   }); 
// };  

// /* ================= SIGNUP CONTROLLER ================= */ 
// export const signup = async (req, res) => {   
//   try {     
//     const { email, password, role } = req.body;     
//     if (!email || !password) {       
//       return res.status(400).json({ message: "All fields required" });     
//     }      
//     const existingUser = await User.findOne({ email });     
//     if (existingUser) {       
//       return res.status(400).json({ message: "User already exists" });     
//     }      
//     const hashedPassword = await bcrypt.hash(password, 10);     
    
//     // Security Fix: Signup par koi bhi khud ko direct Admin nahi bana sakega
//     await User.create({ 
//       email, 
//       password: hashedPassword, 
//       role: role || "user" 
//     });      
//     return res.status(201).json({ message: "User created successfully" });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Signup error", error: error.message });   
//   } 
// };  

// /* ================= LOGIN CONTROLLER ================= */ 
// export const login = async (req, res) => {   
//   try {     
//     const { email, password } = req.body;     
//     const user = await User.findOne({ email });      
//     if (!user || !(await bcrypt.compare(password, user.password))) {       
//       return res.status(401).json({ message: "Invalid credentials" });     
//     }      
    
//     // 6 Digit OTP generation logic
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();     
//     user.otp = otp;     
//     user.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 Mins validity      
//     user.otpCreatedAt = new Date();     
//     user.resendCount = 0;      
//     await user.save();      
    
//     await sendEmail({       
//       to: user.email,       
//       subject: "Login Verification Code",       
//       html: `<h3>Your OTP is: <b style="color:blue;">${otp}</b></h3><p>Valid for 5 minutes.</p>`,     
//     });      
//     return res.status(200).json({         
//       message: "OTP sent to your email",         
//       step: "verify-otp",         
//       email: user.email       
//     });   
//   } catch (error) {     
//     console.error("LOGIN_ERROR:", error);     
//     return res.status(500).json({ message: "Login error", error: error.message });   
//   } 
// };  

// /* ================= VERIFY OTP CONTROLLER ================= */ 
// export const verifyOTP = async (req, res) => {   
//   try {     
//     const { email, otp } = req.body;     
    
//     // User filter aur expiration check ek sath
//     const user = await User.findOne({ email, otp, otpExpire: { $gt: new Date() } });      
//     if (!user) {       
//       return res.status(400).json({ message: "Invalid or expired OTP" });     
//     }      
    
//     const accessToken = generateAccessToken(user);     
//     const refreshToken = generateRefreshToken(user);      
    
//     // OTP fields reset aur status update logic
//     user.otp = null;     
//     user.otpExpire = null;     
//     user.otpCreatedAt = null;     
//     user.resendCount = 0;     
//     user.status = "active";     
//     user.lastSeen = new Date();     
//     await user.save();      
    
//     res.cookie("refreshToken", refreshToken, {         
//       httpOnly: true,         
//       secure: isProduction,         
//       sameSite: isProduction ? "none" : "lax",         
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days     
//     });      
//     return res.status(200).json({       
//       accessToken,       
//       user: {         
//         id: user._id,         
//         email: user.email,           
//         role: user.role,         
//         status: user.status,
//         profilePic: user.profilePic       
//       }      
//     });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Verification failed", error: error.message });   
//   } 
// };  

// /* ================= RESEND OTP CONTROLLER ================= */ 
// export const resendOTP = async (req, res) => {   
//   try {     
//     const { email } = req.body;     
//     const user = await User.findOne({ email });      
//     if (!user) return res.status(404).json({ message: "User not found" });      
    
//     // Rate Limiting Logic: 60s cooldown threshold
//     const timeDiff = Date.now() - new Date(user.otpCreatedAt || 0).getTime();     
//     if (timeDiff < 60000) {       
//       const remaining = Math.ceil((60000 - timeDiff) / 1000);       
//       return res.status(429).json({ message: `Please wait ${remaining}s before resending.` });     
//     }      
//     if (user.resendCount >= 5) {       
//       return res.status(403).json({ message: "Resend limit reached. Please try login again." });     
//     }      
    
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();     
//     user.otp = otp;     
//     user.otpExpire = new Date(Date.now() + 5 * 60 * 1000);     
//     user.otpCreatedAt = new Date();     
//     user.resendCount += 1;      
//     await user.save();      
    
//     await sendEmail({       
//       to: user.email,       
//       subject: "New Verification Code",       
//       html: `<h3>Your new OTP is: <b style="color:green;">${otp}</b></h3><p>Attempts used: ${user.resendCount}/5</p>`,     
//     });      
//     return res.status(200).json({ message: "New OTP sent successfully", resendCount: user.resendCount });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Resend failed", error: error.message });   
//   } 
// };  

// /* ================= REFRESH TOKEN CONTROLLER ================= */ 
// export const refreshToken = async (req, res) => {   
//   try {     
//     const token = req.cookies.refreshToken;           
//     if (!token) {       
//       return res.status(401).json({ message: "Access Denied: No Refresh Token Provided" });     
//     }      
//     const decoded = jwt.verify(token, process.env.REFRESH_SECRET);           
//     const user = await User.findById(decoded.id);     
//     if (!user) {       
//       return res.status(404).json({ message: "User not found" });     
//     }      
//     const accessToken = generateAccessToken(user);     
//     return res.status(200).json({ accessToken });     
//   } catch (error) {     
//     if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {       
//       return res.status(403).json({ message: "Session expired, please login again" });     
//     }     
//     return res.status(500).json({ message: "Internal refresh exception", error: error.message });   
//   } 
// };  

// /* ================= LOGOUT CONTROLLER ================= */ 
// export const logout = async (req, res) => {   
//   try {     
//     // Status tracking on log out
//     if (req.user && req.user.id) {
//       await User.findByIdAndUpdate(req.user.id, { status: "inactive" });
//     }

//     res.clearCookie("refreshToken", { 
//       httpOnly: true, 
//       sameSite: isProduction ? "none" : "lax", 
//       secure: isProduction 
//     });     
//     return res.status(200).json({ message: "Logged out successfully" });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Logout error" });   
//   } 
// };  

// /* ================= FORGOT PASSWORD CONTROLLER ================= */ 
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
//     user.resetTokenExpire = new Date(Date.now() + 3600000); // 1 Hour window
//     await user.save();      
    
//     const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;      
//     await sendEmail({       
//       to: user.email,       
//       subject: "Password Reset Request",       
//       html: `<html><body style="font-family: Arial, sans-serif;"><h3>Reset Your Password</h3><p>Niche link par click karein:</p><a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a><p>Ye link 1 ghante mein expire ho jayega.</p></body></html>`,     
//     });      
//     return res.status(200).json({ message: "Reset link sent successfully!" });   
//   } catch (error) {     
//     console.error("FORGOT_PASSWORD_ERROR:", error.message);     
//     return res.status(500).json({ message: "Email API failed", error: error.message });   
//   } 
// };  

// /* ================= RESET PASSWORD CONTROLLER ================= */ 
// export const resetPassword = async (req, res) => {   
//   try {     
//     const { token, newPassword } = req.body;      
//     if (!token || !newPassword) {
//       return res.status(400).json({ message: "Token and password are required" });
//     }
    
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
//     return res.status(200).json({ message: "Password updated successfully" });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Reset password error" });   
//   } 
// };  

// /* ================= SETTINGS PAGE CONTROLLERS ================= */ 

// export const updateProfile = async (req, res) => {   
//   try {     
//     const userId = req.user.id;                
//     if (!req.file) {       
//       return res.status(400).json({ message: "No image uploaded" });     
//     }      
//     const imageUrl = req.file.path || req.file.secure_url;     
//     if (!imageUrl) {       
//       return res.status(500).json({ message: "Cloudinary did not return a URL" });     
//     }      
//     const updatedUser = await User.findByIdAndUpdate(       
//       userId,       
//       { profilePic: imageUrl },        
//       { new: true }     
//     ).select("-password");      
//     if (!updatedUser) {       
//       return res.status(404).json({ message: "User not found" });     
//     }      
//     return res.status(200).json({        
//       message: "Profile picture updated successfully",        
//       user: {         
//         id: updatedUser._id,         
//         email: updatedUser.email,         
//         role: updatedUser.role,         
//         profilePic: updatedUser.profilePic        
//       }      
//     });   
//   } catch (error) {     
//     console.error("Update Profile Error:", error);     
//     return res.status(500).json({ message: "Upload failed", error: error.message });   
//   } 
// };  

// export const updateEmail = async (req, res) => {   
//   try {     
//     const { email } = req.body;     
//     const userId = req.user.id;      
    
//     const emailExists = await User.findOne({ email });     
//     if (emailExists) {       
//       return res.status(400).json({ message: "Email already in use" });     
//     }      
//     const updatedUser = await User.findByIdAndUpdate(       
//       userId,       
//       { email: email },       
//       { new: true }     
//     ).select("-password");      
//     return res.status(200).json({ message: "Email updated successfully", user: updatedUser });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Server Error", error: error.message });   
//   } 
// };  

// export const updatePassword = async (req, res) => {   
//   try {     
//     const { currentPassword, newPassword } = req.body;     
//     const userId = req.user.id;      
//     const user = await User.findById(userId);     
    
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     const isMatch = await bcrypt.compare(currentPassword, user.password);     
//     if (!isMatch) {       
//       return res.status(400).json({ message: "Current password is incorrect" });     
//     }      
//     const salt = await bcrypt.genSalt(10);     
//     user.password = await bcrypt.hash(newPassword, salt);      
//     await user.save();     
//     return res.status(200).json({ message: "Password updated successfully" });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Server Error", error: error.message });   
//   } 
// };  

// /* ================= USER MANAGEMENT CONTROLLERS (ADMIN ONLY) ================= */ 

// export const getAllUsers = async (req, res) => {   
//   try {     
//     const page = parseInt(req.query.page) || 1;     
//     const limit = parseInt(req.query.limit) || 10;     
//     const skip = (page - 1) * limit;      
    
//     const totalUsers = await User.countDocuments();     
//     const users = await User.find({}, "-password")       
//       .sort({ createdAt: -1 })       
//       .skip(skip)       
//       .limit(limit);      
//     return res.status(200).json({       
//       users,       
//       currentPage: page,       
//       totalPages: Math.ceil(totalUsers / limit),       
//       totalUsers,     
//     });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Error fetching users", error: error.message });   
//   } 
// };  

// export const deleteUser = async (req, res) => {   
//   try {     
//     const { id } = req.params;
//     if (req.user.id === id) {
//       return res.status(400).json({ message: "Aap khud ko delete nahi kar sakte" });
//     }
//     await User.findByIdAndDelete(id);     
//     return res.status(200).json({ message: "User deleted successfully" });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Delete error" });   
//   } 
// };  

// export const updateUserRole = async (req, res) => {   
//   try {     
//     const { id } = req.params;
//     const { role } = req.body;     
    
//     if (!['admin', 'user'].includes(role)) {
//       return res.status(400).json({ message: "Invalid role type" });
//     }

//     const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");     
//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     return res.status(200).json({ message: "Role updated successfully", user: updatedUser });   
//   } catch (error) {     
//     return res.status(500).json({ message: "Update error" });   
//   } 
// };













import dotenv from "dotenv"; 
dotenv.config();  
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
const isProduction = process.env.NODE_ENV === "production";  

// Shared sender identity for Brevo
const emailSender = { name: "Support Team", email: "guptamahek35@gmail.com" };

/* ================= SIGNUP CONTROLLER ================= */ 
export const signup = async (req, res) => {   
  try {     
    const { email, password, role } = req.body;     
    if (!email || !password) {       
      return res.status(400).json({ message: "All fields required" });     
    }       
    const existingUser = await User.findOne({ email });     
    if (existingUser) {       
      return res.status(400).json({ message: "User already exists" });     
    }       
    const hashedPassword = await bcrypt.hash(password, 10);     
    
    // Security Fix: Signup par koi bhi khud ko direct Admin nahi bana sakega
    await User.create({ 
      email, 
      password: hashedPassword, 
      role: role || "user" 
    });       
    return res.status(201).json({ message: "User created successfully" });   
  } catch (error) {     
    return res.status(500).json({ message: "Signup error", error: error.message });   
  } 
};  

/* ================= LOGIN CONTROLLER ================= */ 
export const login = async (req, res) => {   
  try {     
    const { email, password } = req.body;     
    const user = await User.findOne({ email });      
    if (!user || !(await bcrypt.compare(password, user.password))) {       
      return res.status(401).json({ message: "Invalid credentials" });     
    }       
    
    // 6 Digit OTP generation logic
    const otp = Math.floor(100000 + Math.random() * 900000).toString();     
    user.otp = otp;     
    user.otpExpire = new Date(Date.now() + 5 * 60 * 1000); // 5 Mins validity      
    user.otpCreatedAt = new Date();     
    user.resendCount = 0;      
    await user.save();      
    
    // Brevo Implementation
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Login Verification Code";
    sendSmtpEmail.htmlContent = `<h3>Your OTP is: <b style="color:blue;">${otp}</b></h3><p>Valid for 5 minutes.</p>`;
    sendSmtpEmail.sender = emailSender;
    sendSmtpEmail.to = [{ email: user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
      
    return res.status(200).json({         
      message: "OTP sent to your email",         
      step: "verify-otp",         
      email: user.email       
    });   
  } catch (error) {     
    console.error("LOGIN_ERROR:", error);     
    return res.status(500).json({ message: "Login error", error: error.message });   
  } 
};  

/* ================= VERIFY OTP CONTROLLER ================= */ 
export const verifyOTP = async (req, res) => {   
  try {     
    const { email, otp } = req.body;     
    
    // User filter aur expiration check ek sath
    const user = await User.findOne({ email, otp, otpExpire: { $gt: new Date() } });      
    if (!user) {       
      return res.status(400).json({ message: "Invalid or expired OTP" });     
    }       
    
    const accessToken = generateAccessToken(user);     
    const refreshToken = generateRefreshToken(user);      
    
    // OTP fields reset aur status update logic
    user.otp = null;     
    user.otpExpire = null;     
    user.otpCreatedAt = null;     
    user.resendCount = 0;     
    user.status = "active";     
    user.lastSeen = new Date();     
    await user.save();      
    
    res.cookie("refreshToken", refreshToken, {         
      httpOnly: true,         
      secure: isProduction,         
      sameSite: isProduction ? "none" : "lax",         
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days     
    });      
    return res.status(200).json({       
      accessToken,       
      user: {         
        id: user._id,         
        email: user.email,           
        role: user.role,         
        status: user.status,
        profilePic: user.profilePic       
      }      
    });   
  } catch (error) {     
    return res.status(500).json({ message: "Verification failed", error: error.message });   
  } 
};  

/* ================= RESEND OTP CONTROLLER ================= */ 
export const resendOTP = async (req, res) => {   
  try {     
    const { email } = req.body;     
    const user = await User.findOne({ email });      
    if (!user) return res.status(404).json({ message: "User not found" });      
    
    // Rate Limiting Logic: 60s cooldown threshold
    const timeDiff = Date.now() - new Date(user.otpCreatedAt || 0).getTime();     
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
    
    // Brevo Implementation
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "New Verification Code";
    sendSmtpEmail.htmlContent = `<h3>Your new OTP is: <b style="color:green;">${otp}</b></h3><p>Attempts used: ${user.resendCount}/5</p>`;
    sendSmtpEmail.sender = emailSender;
    sendSmtpEmail.to = [{ email: user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
      
    return res.status(200).json({ message: "New OTP sent successfully", resendCount: user.resendCount });   
  } catch (error) {     
    return res.status(500).json({ message: "Resend failed", error: error.message });   
  } 
};  

/* ================= REFRESH TOKEN CONTROLLER ================= */ 
export const refreshToken = async (req, res) => {   
  try {     
    const token = req.cookies.refreshToken;           
    if (!token) {       
      return res.status(401).json({ message: "Access Denied: No Refresh Token Provided" });     
    }       
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);           
    const user = await User.findById(decoded.id);     
    if (!user) {       
      return res.status(404).json({ message: "User not found" });     
    }       
    const accessToken = generateAccessToken(user);     
    return res.status(200).json({ accessToken });     
  } catch (error) {     
    if (error.name === "JsonWebTokenError" || error.name === "TokenExpiredError") {       
      return res.status(403).json({ message: "Session expired, please login again" });     
    }     
    return res.status(500).json({ message: "Internal refresh exception", error: error.message });   
  } 
};  

/* ================= LOGOUT CONTROLLER ================= */ 
export const logout = async (req, res) => {   
  try {     
    // Status tracking on log out
    if (req.user && req.user.id) {
      await User.findByIdAndUpdate(req.user.id, { status: "inactive" });
    }

    res.clearCookie("refreshToken", { 
      httpOnly: true, 
      sameSite: isProduction ? "none" : "lax", 
      secure: isProduction 
    });     
    return res.status(200).json({ message: "Logged out successfully" });   
  } catch (error) {     
    return res.status(500).json({ message: "Logout error" });   
  } 
};  

/* ================= FORGOT PASSWORD CONTROLLER ================= */ 
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
    user.resetTokenExpire = new Date(Date.now() + 3600000); // 1 Hour window
    await user.save();       
    
    const resetLink = `${process.env.FRONTEND_URL || "http://localhost:5173"}/reset-password/${resetToken}`;      
    
    // Brevo Implementation
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "Password Reset Request";
    sendSmtpEmail.htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif;">
          <h3>Reset Your Password</h3>
          <p>Niche link par click karein:</p>
          <a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a>
          <p>Ye link 1 ghante mein expire ho jayega.</p>
        </body>
      </html>`;
    sendSmtpEmail.sender = emailSender;
    sendSmtpEmail.to = [{ email: user.email }];

    await apiInstance.sendTransacEmail(sendSmtpEmail);
      
    return res.status(200).json({ message: "Reset link sent successfully!" });   
  } catch (error) {     
    console.error("FORGOT_PASSWORD_ERROR:", error.message);     
    return res.status(500).json({ message: "Email API failed", error: error.message });   
  } 
};  

/* ================= RESET PASSWORD CONTROLLER ================= */ 
export const resetPassword = async (req, res) => {   
  try {     
    const { token, newPassword } = req.body;      
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token and password are required" });
    }
    
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
    return res.status(200).json({ message: "Password updated successfully" });   
  } catch (error) {     
    return res.status(500).json({ message: "Reset password error" });   
  } 
};  

/* ================= SETTINGS PAGE CONTROLLERS ================= */ 

export const updateProfile = async (req, res) => {   
  try {     
    const userId = req.user.id;                
    if (!req.file) {       
      return res.status(400).json({ message: "No image uploaded" });     
    }       
    const imageUrl = req.file.path || req.file.secure_url;     
    if (!imageUrl) {       
      return res.status(500).json({ message: "Cloudinary did not return a URL" });     
    }       
    const updatedUser = await User.findByIdAndUpdate(       
      userId,       
      { profilePic: imageUrl },        
      { new: true }     
    ).select("-password");       
    if (!updatedUser) {       
      return res.status(404).json({ message: "User not found" });     
    }       
    return res.status(200).json({        
      message: "Profile picture updated successfully",        
      user: {         
        id: updatedUser._id,         
        email: updatedUser.email,         
        role: updatedUser.role,         
        profilePic: updatedUser.profilePic        
      }      
    });   
  } catch (error) {     
    console.error("Update Profile Error:", error);     
    return res.status(500).json({ message: "Upload failed", error: error.message });   
  } 
};  

export const updateEmail = async (req, res) => {   
  try {     
    const { email } = req.body;     
    const userId = req.user.id;     
    
    const emailExists = await User.findOne({ email });     
    if (emailExists) {       
      return res.status(400).json({ message: "Email already in use" });     
    }       
    const updatedUser = await User.findByIdAndUpdate(       
      userId,       
      { email: email },       
      { new: true }     
    ).select("-password");       
    return res.status(200).json({ message: "Email updated successfully", user: updatedUser });   
  } catch (error) {     
    return res.status(500).json({ message: "Server Error", error: error.message });   
  } 
};  

export const updatePassword = async (req, res) => {   
  try {     
    const { currentPassword, newPassword } = req.body;     
    const userId = req.user.id;      
    const user = await User.findById(userId);     
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);     
    if (!isMatch) {       
      return res.status(400).json({ message: "Current password is incorrect" });     
    }       
    const salt = await bcrypt.genSalt(10);     
    user.password = await bcrypt.hash(newPassword, salt);       
    await user.save();     
    return res.status(200).json({ message: "Password updated successfully" });   
  } catch (error) {     
    return res.status(500).json({ message: "Server Error", error: error.message });   
  } 
};  

/* ================= USER MANAGEMENT CONTROLLERS (ADMIN ONLY) ================= */ 

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
    return res.status(200).json({       
      users,       
      currentPage: page,       
      totalPages: Math.ceil(totalUsers / limit),       
      totalUsers,     
    });   
  } catch (error) {     
    return res.status(500).json({ message: "Error fetching users", error: error.message });   
  } 
};  

export const deleteUser = async (req, res) => {   
  try {     
    const { id } = req.params;
    if (req.user.id === id) {
      return res.status(400).json({ message: "Aap khud ko delete nahi kar sakte" });
    }
    await User.findByIdAndDelete(id);     
    return res.status(200).json({ message: "User deleted successfully" });   
  } catch (error) {     
    return res.status(500).json({ message: "Delete error" });   
  } 
};  

export const updateUserRole = async (req, res) => {   
  try {     
    const { id } = req.params;
    const { role } = req.body;     
    
    if (!['admin', 'user'].includes(role)) {
      return res.status(400).json({ message: "Invalid role type" });
    }

    const updatedUser = await User.findByIdAndUpdate(id, { role }, { new: true }).select("-password");     
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json({ message: "Role updated successfully", user: updatedUser });   
  } catch (error) {     
    return res.status(500).json({ message: "Update error" });   
  } 
};
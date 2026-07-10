

// import express from "express"
// import { 
//   signup, login, refreshToken, logout, 
//   forgotPassword, resetPassword, 
//   getAllUsers, deleteUser, updateUserRole // Naye functions import karein
// } from "../controllers/authController.js"
// import { protect, adminOnly } from "../middleware/authMiddleware.js" // adminOnly zaroori hai
// import User from "../models/User.js"

// const router = express.Router()

// // Public Routes
// router.post("/signup", signup)
// router.post("/login", login)
// router.post("/refresh", refreshToken)
// router.post("/logout", logout)
// router.post("/forgot-password", forgotPassword)
// router.post("/reset-password", resetPassword)

// // Protected Profile Route
// router.get("/profile", protect, async (req, res) => {
//    try {
//     const user = await User.findById(req.user.id).select("-password")
//     if (!user) return res.status(404).json({ message: "User not found" })
//     res.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role
//       }
//     })
//   } catch (error) {
//     console.error(error)
//     res.status(500).json({ message: "Server error" })
//   }
// })

// // --- ADMIN ONLY ROUTES ---
// // In routes par 'protect' (login check) aur 'adminOnly' (role check) dono hone chahiye
// router.get("/users", protect, adminOnly, getAllUsers);
// router.delete("/user/:id", protect, adminOnly, deleteUser);
// router.post("/logout", protect, logout); // 'protect' lagana zaroori hai
// router.put("/user/:id", protect, adminOnly, updateUserRole);
// export default router


// import express from "express";
// import { 
//   signup, login, refreshToken, logout, 
//   forgotPassword, resetPassword, 
//   getAllUsers, deleteUser, updateUserRole 
// } from "../controllers/authController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import User from "../models/User.js";

// const router = express.Router();

// // Public Routes
// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/refresh", refreshToken);
// router.post("/logout", logout); // Ek hi logout kaafi hai
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// // Protected Profile Route
// router.get("/profile", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // Admin Routes
// router.get("/users", protect, adminOnly, getAllUsers);
// router.delete("/user/:id", protect, adminOnly, deleteUser);
// router.put("/user/:id", protect, adminOnly, updateUserRole);

// export default router;


// import express from "express";
// import { 
//   signup, 
//   login, 
//   verifyOTP,      // 👈 Naya Import
//   resendOTP,      // 👈 Naya Import
//   refreshToken, 
//   logout, 
//   forgotPassword, 
//   resetPassword, 
//   updateProfile,   // 👈 Naya Import (Settings)
//   updateEmail,     // 👈 Naya Import (Settings)
//   updatePassword,  // 👈 Naya Import (Settings)
//   getAllUsers, 
//   deleteUser, 
//   updateUserRole 
// } from "../controllers/authController.js";
// import { protect, adminOnly } from "../middleware/authMiddleware.js";
// import User from "../models/User.js";


// // Agar aap profile picture upload ke liye multer use kar rahe hain, toh uska middleware yahan import karein
// import upload from "../config/cloudinary.js"; 


// const router = express.Router();

// /* ================= PUBLIC ROUTES ================= */
// router.post("/signup", signup);
// router.post("/login", login);
// router.post("/verify-otp", verifyOTP);   // 👈 Naya Endpoint
// router.post("/resend-otp", resendOTP);   // 👈 Naya Endpoint
// router.post("/refresh", refreshToken);
// router.post("/logout", logout); 
// router.post("/forgot-password", forgotPassword);
// router.post("/reset-password", resetPassword);

// /* ================= PROTECTED ROUTES (USER + ADMIN) ================= */

// // 1. Profile Fetch Route
// router.get("/profile", protect, async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select("-password");
//     if (!user) return res.status(404).json({ message: "User not found" });
//     res.json({
//       user: {
//         id: user._id,
//         email: user.email,
//         role: user.role,
//         status: user.status,
//         profilePic: user.profilePic
//       }
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // 2. Settings Page Routes (Inpar 'protect' hona zaroori hai)
// router.put("/update-email", protect, updateEmail);
// router.put("/update-password", protect, updatePassword);

// // Profile Pic Upload Route (Agar multer use kar rahe ho toh route par 'upload.single("image")' add kar dena)
// router.put("/update-profile", protect, upload.single("image"), updateProfile); 


// /* ================= ADMIN ONLY ROUTES ================= */
// router.get("/users", protect, adminOnly, getAllUsers);
// router.delete("/user/:id", protect, adminOnly, deleteUser);
// router.put("/user/:id", protect, adminOnly, updateUserRole);

// export default router;






import express from "express";
import { 
  signup, 
  login, 
  verifyOTP,      
  resendOTP,      
  refreshToken, 
  logout, 
  forgotPassword, 
  resetPassword, 
  updateProfile,   
  updateEmail,     
  updatePassword,  
  getAllUsers, 
  deleteUser, 
  updateUserRole 
} from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

// Multer/Cloudinary configuration import
import upload from "../config/cloudinary.js"; 

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */
router.post("/signup", signup);
router.post("/login", login);
router.post("/verify-otp", verifyOTP);   
router.post("/resend-otp", resendOTP);   
router.post("/refresh", refreshToken);
router.post("/logout", logout); 
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

/* ================= PROTECTED ROUTES (USER + ADMIN) ================= */

// 1. Profile Fetch Route
router.get("/profile", protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        status: user.status,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 2. Settings Page Routes
router.put("/update-email", protect, updateEmail);
router.put("/update-password", protect, updatePassword);

// ✅ Fixed: upload.single("image") ko controller se PEHLE kar diya hai
router.put("/update-profile-pic", protect, upload.single("image"), updateProfile); 


/* ================= ADMIN ONLY ROUTES ================= */
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/user/:id", protect, adminOnly, deleteUser);
router.put("/user/:id", protect, adminOnly, updateUserRole);

export default router;
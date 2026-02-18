

import express from "express"
import { 
  signup, login, refreshToken, logout, verifyOTP,
  forgotPassword, resetPassword, resendOTP,updateEmail, updatePassword,
  getAllUsers, deleteUser, updateUserRole, updateProfile
} from "../controllers/authController.js"
import { protect, adminOnly } from "../middleware/authMiddleware.js" // adminOnly zaroori hai
import User from "../models/User.js"
import { upload } from "../config/cloudinary.js";

const router = express.Router()

// Public Routes
router.post("/signup", signup)
router.post("/login", login)
router.post("/verify-otp", verifyOTP)
router.post("/refresh", refreshToken)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.post('/resend-otp', resendOTP)

// Protected Profile Route
router.get("/profile", protect, async (req, res) => {
   try {
    const user = await User.findById(req.user.id).select("-password")
    if (!user) return res.status(404).json({ message: "User not found" })
    res.json({
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        profilePic: user.profilePic
      }
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
})

// --- ADMIN ONLY ROUTES ---
// In routes par 'protect' (login check) aur 'adminOnly' (role check) dono hone chahiye
router.put('/update-email', protect, updateEmail);
router.put('/update-password', protect, updatePassword);
router.get("/users", protect, adminOnly, getAllUsers);
router.delete("/user/:id", protect, adminOnly, deleteUser);
router.post("/logout", protect, logout); // 'protect' lagana zaroori hai
router.put("/user/:id", protect, adminOnly, updateUserRole);
router.put("/update-profile-pic", protect, upload.single('image'), updateProfile);
export default router

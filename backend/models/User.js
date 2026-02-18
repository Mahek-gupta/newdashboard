
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   role: {
//     type: String,
//     default: "user" // admin / user
//   },
//   resetToken: {
//     type: String,
//     default: null
//   },
//   resetTokenExpire: {
//     type: Date,
//     default: null
//   },
//   status: {
//   type: String,
//   default: "inactive", // Shuruat mein inactive rahega
// },
// lastSeen: {
//   type: Date,
//   default: Date.now
// },
//   otp: { type: String, default: null },
// otpExpire: { type: Date, default: null },
//   // models/User.js mein ye 2 fields zaroor honi chahiye
// otpCreatedAt: { type: Date },
// resendCount: { type: Number, default: 0 }
// }, 
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ["user", "admin"], // Sirf yahi do roles allow honge
    default: "user"
  },
  // 📸 Yeh field missing thi, ise ab add kar diya hai
  profilePic: {
    type: String,
    default: "" // Yahan Cloudinary ka URL save hoga
  },
  status: {
    type: String,
    enum: ["active", "inactive", "suspended"],
    default: "inactive"
  },
  lastSeen: {
    type: Date,
    default: Date.now
  },
  // 🔐 OTP & Security Fields
  otp: { type: String, default: null },
  otpExpire: { type: Date, default: null },
  otpCreatedAt: { type: Date, default: null },
  resendCount: { type: Number, default: 0 },
  
  // 🔑 Password Reset Fields
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpire: {
    type: Date,
    default: null
  }
}, 
{ 
  timestamps: true // Isse 'createdAt' aur 'updatedAt' apne aap ban jayenge
});

// Model ka naam "User" rakhein taaki confusion na ho
export default mongoose.model("Value", userSchema);
// { timestamps: true })

// export default mongoose.model("Value", userSchema)




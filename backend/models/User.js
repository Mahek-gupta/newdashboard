
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user" // admin / user
  },
  resetToken: {
    type: String,
    default: null
  },
  resetTokenExpire: {
    type: Date,
    default: null
  },
  status: {
  type: String,
  default: "inactive", // Shuruat mein inactive rahega
},
lastSeen: {
  type: Date,
  default: Date.now
}
}, 

{ timestamps: true })

export default mongoose.model("Value", userSchema)




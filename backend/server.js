// import express from "express"
// import mongoose from "mongoose"
// import cors from "cors"
// import cookieParser from "cookie-parser"
// import authRoutes from "./routes/authRoutes.js"
// import dotenv from "dotenv"

// dotenv.config()
// const app = express()
// const PORT = process.env.PORT || 5000;
// app.use(express.json())
// app.use(cookieParser())
// // app.use(cors({
// //   origin:process.env.FRONTEND_URL || "http://localhost:5173",
// //   credentials: true
// // }))
// app.use(cors({
//   origin: [
//     "https://newdashboard-frontend.onrender.com", 
//     "http://localhost:5173"
//   ],
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
// }));
// app.use("/api/auth", authRoutes)

// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("MongoDB connected"))
//   .catch(err => console.log(err))

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`)
//   console.log("mahak")
// })
import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/authRoutes.js"
import dotenv from "dotenv"

dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000;

// ✅ 1. CORS Configuration
app.use(cors({
  origin: ["https://newdashboard-frontend.onrender.com", "http://localhost:5173"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Cookie"]
}));

// ✅ 2. FIX: Wildcard Error Fix (Is line ko aise badlein)
// Puraana tarika: app.options('*', cors()) -> Isse error aa raha tha
app.options('(.*)', cors()); 

app.use(express.json())
app.use(cookieParser())

// ✅ 3. Routes
app.use("/api/auth", authRoutes)

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("MongoDB error:", err))

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

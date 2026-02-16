// import { useState } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate, Link } from "react-router-dom"
// import { useTheme } from "@mui/material/styles"

// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
//   Paper,
//   alpha
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
// import LoginIcon from "@mui/icons-material/Login"
// import ForgotPassword from "./ForgotPassword"

// const cloudStyles = (theme) => `
//   @keyframes float-left {
//     0% { transform: translateX(100vw); opacity: 0; }
//     10% { opacity: 1; }
//     90% { opacity: 1; }
//     100% { transform: translateX(-100vw); opacity: 0; }
//   }

//   @keyframes float-right {
//     0% { transform: translateX(-100vw); opacity: 0; }
//     10% { opacity: 1; }
//     90% { opacity: 1; }
//     100% { transform: translateX(100vw); opacity: 0; }
//   }

//   @keyframes slideInUp {
//     from { opacity: 0; transform: translateY(30px); }
//     to { opacity: 1; transform: translateY(0); }
//   }

//   @keyframes fadeInScale {
//     from { opacity: 0; transform: scale(0.95); }
//     to { opacity: 1; transform: scale(1); }
//   }

//   @keyframes pulse {
//     0%, 100% { transform: scale(1); }
//     50% { transform: scale(1.05); }
//   }

//   @keyframes shake {
//     0%, 100% { transform: translateX(0); }
//     25% { transform: translateX(-5px); }
//     75% { transform: translateX(5px); }
//   }

//   .cloud { position: absolute; pointer-events: none; }
//   .cloud-left { animation: float-left 45s infinite linear; }
//   .cloud-right { animation: float-right 50s infinite linear; }

//   .cloud-shape {
//     width: 120px;
//     height: 50px;
//     /* ✅ Dark mode me clouds thode faint ho jayenge */
//     background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : 'rgba(255, 255, 255, 0.7)'};
//     border-radius: 50px;
//     filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
//     position: relative;
//   }

//   .cloud-shape::before, .cloud-shape::after {
//     content: '';
//     position: absolute;
//     background: inherit;
//     border-radius: 50%;
//   }

//   .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
//   .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }

//   .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; }
//   .form-icon { animation: fadeInScale 0.8s ease-out; transition: all 0.3s ease; }
//   .form-icon:hover { animation: pulse 0.6s ease-in-out; }
//   .form-title { animation: slideInUp 0.7s ease-out 0.1s both; }
//   .form-subtitle { animation: slideInUp 0.7s ease-out 0.2s both; }
//   .form-field { animation: slideInUp 0.7s ease-out; }
//   .form-field:nth-of-type(1) { animation-delay: 0.3s; }
//   .form-field:nth-of-type(2) { animation-delay: 0.4s; }
//   .submit-button { animation: slideInUp 0.7s ease-out 0.6s both; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
//   .submit-button:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important; }
//   .submit-button:active { transform: translateY(-1px); }
//   .login-link { animation: slideInUp 0.7s ease-out 0.7s both; }
//   .alert-shake { animation: shake 0.5s ease-in-out; }
// `

// const Login = () => {
//   const { login, error } = useAuth()
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isDark = theme.palette.mode === 'dark'

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const success = await login(email, password)
//     if (success) navigate("/dashboard")
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         width: "100%",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         px: 2,
//         py: 4, // ✅ Aapka original padding-top aur bottom
//         // ✅ Background switch: Dark mode me Navy/Black, Light me SkyBlue
//         background: isDark 
//           ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
//           : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
//         position: "relative",
//         overflow: "hidden",
//         transition: "background 0.3s ease"
//       }}
//     >
//       <style>{cloudStyles(theme)}</style>

//       {/* Animated Clouds - Original code as requested */}
//       <Box className="cloud cloud-left" sx={{ top: "5%", animationDelay: "0s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-right" sx={{ top: "15%", animationDelay: "3s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-left" sx={{ top: "25%", animationDelay: "6s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-right" sx={{ top: "35%", animationDelay: "9s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-left" sx={{ top: "45%", animationDelay: "2s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-right" sx={{ top: "55%", animationDelay: "5s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-left" sx={{ top: "65%", animationDelay: "8s" }}><Box className="cloud-shape" /></Box>
//       <Box className="cloud cloud-right" sx={{ top: "75%", animationDelay: "1s" }}><Box className="cloud-shape" /></Box>

//       <Container
//         maxWidth="sm"
//         disableGutters
//         sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             width: "100%",
//             maxWidth: 420,
//             p: { xs: 3, sm: 4 },
//             borderRadius: 4,
//             // ✅ Dynamic Colors based on Mode
//             background: theme.palette.background.paper, 
//             boxShadow: isDark 
//               ? "0 20px 60px rgba(0, 0, 0, 0.5)" 
//               : "0 20px 60px rgba(0, 0, 0, 0.15)",
//             transition: "background 0.3s ease"
//           }}
//           className="form-paper"
//         >
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             <LoginIcon 
//               sx={{ fontSize: 40, color: isDark ? theme.palette.primary.main : "#1f2937" }} 
//               className="form-icon" 
//             />
//           </Box>

//           <Typography
//             variant="h5"
//             align="center"
//             fontWeight={600}
//             sx={{ mb: 1, color: theme.palette.text.primary }}
//             className="form-title"
//           >
//             Welcome Back
//           </Typography>

//           <Typography
//             variant="body2"
//             align="center"
//             color="text.secondary"
//             sx={{ mb: 3 }}
//             className="form-subtitle"
//           >
//             Sign in to your account to continue
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }} className="alert-shake">
//               {error}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               placeholder="Email Address"
//               type="email"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className="form-field"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   // Dark mode me inputs thode dark rahenge
//                   backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent',
//                 }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlinedIcon fontSize="small" color={isDark ? "primary" : "inherit"} />
//                   </InputAdornment>
//                 )
//               }}
//             />

//             <TextField
//               placeholder="Password"
//               type="password"
//               fullWidth
//               margin="normal"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className="form-field"
//               sx={{
//                 "& .MuiOutlinedInput-root": {
//                   backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent',
//                 }
//               }}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon fontSize="small" color={isDark ? "primary" : "inherit"} />
//                   </InputAdornment>
//                 )
//               }}
//             />

//             <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   color: theme.palette.primary.main, // Automatically uses context color
//                   fontWeight: 600,
//                   "&:hover": { textDecoration: "underline" },
//                   transition: "all 0.2s"
//                 }}
//                 onClick={() => setForgotPasswordOpen(true)}
//               >
//                 Forgot password?
//               </Typography>
//             </Box>

//             <Button
//               type="submit"
//               fullWidth
//               sx={{
//                 mt: 2,
//                 py: 1.2,
//                 borderRadius: 2,
//                 background: isDark
//                   ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #4338ca 100%)`
//                   : "linear-gradient(180deg, #1f2937 0%, #000 100%)",
//                 color: "#fff",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 fontSize: "16px",
//                 "&:hover": {
//                   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
//                 },
//                 transition: "all 0.3s ease"
//               }}
//               className="submit-button"
//             >
//               Sign In
//             </Button>

//             <Box
//               sx={{
//                 mt: 3,
//                 pt: 3,
//                 borderTop: `1px solid ${theme.palette.divider}`,
//                 textAlign: "center"
//               }}
//               className="login-link"
//             >
//               <Typography variant="body2" color="text.secondary">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   style={{
//                     color: theme.palette.primary.main,
//                     textDecoration: "none",
//                     fontWeight: 600,
//                   }}
//                 >
//                   Create account
//                 </Link>
//               </Typography>
//             </Box>
//           </Box>
//         </Paper>
//       </Container>

//       <ForgotPassword
//         open={forgotPasswordOpen}
//         onClose={() => setForgotPasswordOpen(false)}
//       />
//     </Box>
//   )
// }

// export default Login
// import { useState } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate, Link } from "react-router-dom"
// import { useTheme } from "@mui/material/styles"
// import api from '../api/axios'; // Api call ke liye

// import {
//   Box, Container, TextField, Button, Typography, Alert,
//   InputAdornment, Paper, alpha, CircularProgress
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
// import LoginIcon from "@mui/icons-material/Login"
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import ForgotPassword from "./ForgotPassword"
// import { toast } from "react-toastify"

// const cloudStyles = (theme) => `
//   @keyframes float-left { 0% { transform: translateX(100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-100vw); opacity: 0; } }
//   @keyframes float-right { 0% { transform: translateX(-100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100vw); opacity: 0; } }
//   @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//   @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
//   @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
//   @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
//   .cloud { position: absolute; pointer-events: none; }
//   .cloud-left { animation: float-left 45s infinite linear; }
//   .cloud-right { animation: float-right 50s infinite linear; }
//   .cloud-shape { width: 120px; height: 50px; background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : 'rgba(255, 255, 255, 0.7)'}; border-radius: 50px; filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1)); position: relative; }
//   .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
//   .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
//   .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
//   .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; }
//   .form-icon { animation: fadeInScale 0.8s ease-out; transition: all 0.3s ease; }
//   .form-icon:hover { animation: pulse 0.6s ease-in-out; }
//   .alert-shake { animation: shake 0.5s ease-in-out; }
// `

// const Login = () => {
//   const { login: authLogin, error: authError } = useAuth()
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isDark = theme.palette.mode === 'dark'

//   // Form States
//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [otp, setOtp] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
  
//   // ✅ 2FA Logic States
//   const [step, setStep] = useState("login") // 'login' or 'otp'
//   const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

//   // Step 1: Login Submission
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault()
//     setError("")
//     setLoading(true)
//     try {
//       // Backend ko call kiya
//       const response = await api.post("/auth/login", { email, password });
      
//       if (response.data.step === "verify-otp") {
//         setStep("otp");
//         toast.info("OTP sent to your email!");
//       } else {
//         // Agar OTP enabled nahi hai toh direct dashboard (waise humne logic change kiya hai toh OTP hi aayega)
//         const success = await authLogin(email, password);
//         if (success) navigate("/dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed");
//       toast.error(err.response?.data?.message || "Login error");
//     } finally {
//       setLoading(false);
//     }
//   }

//   // Step 2: OTP Verification Submission
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     setError("")
//     try {
//       const response = await api.post("/auth/verify-otp", { email, otp });
//       // JWT token aur user data context mein update karne ke liye
//       localStorage.setItem("accessToken", response.data.accessToken);
//       // Refresh page ya Context update logic yahan likhein (depends on your AuthContext)
//       toast.success("Login Successful!");
//       window.location.href = "/dashboard"; // Direct refresh to load context
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP");
//       toast.error("Invalid or expired OTP");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <Box sx={{
//         minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
//         px: 2, py: 4, position: "relative", overflow: "hidden", transition: "background 0.3s ease",
//         background: isDark 
//           ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
//           : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
//     }}>
//       <style>{cloudStyles(theme)}</style>

//       {/* Animated Clouds */}
//       {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
//         <Box key={i} className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s` }}>
//           <Box className="cloud-shape" />
//         </Box>
//       ))}

//       <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
//         <Paper elevation={6} className="form-paper"
//           sx={{
//             width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 4,
//             background: theme.palette.background.paper, 
//             boxShadow: isDark ? "0 20px 60px rgba(0, 0, 0, 0.5)" : "0 20px 60px rgba(0, 0, 0, 0.15)",
//           }}
//         >
//           {/* ✅ DYNAMIC ICON & TITLE */}
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             {step === 'login' ? (
//               <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} className="form-icon" />
//             ) : (
//               <VerifiedUserIcon sx={{ fontSize: 40, color: "#10b981" }} className="form-icon" />
//             )}
//           </Box>

//           <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 1, color: theme.palette.text.primary }}>
//             {step === 'login' ? "Welcome Back" : "Security Check"}
//           </Typography>

//           <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
//             {step === 'login' ? "Sign in to your account to continue" : `Enter the 6-digit code sent to ${email}`}
//           </Typography>

//           {(error || authError) && (
//             <Alert severity="error" sx={{ mb: 2 }} className="alert-shake">
//               {error || authError}
//             </Alert>
//           )}

//           {/* ✅ CONDITIONALLY RENDER LOGIN OR OTP FORM */}
//           {step === 'login' ? (
//             <Box component="form" onSubmit={handleLoginSubmit}>
//               <TextField
//                 placeholder="Email Address" type="email" fullWidth margin="normal"
//                 value={email} onChange={(e) => setEmail(e.target.value)}
//                 sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent' } }}
//                 InputProps={{ startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>) }}
//               />
//               <TextField
//                 placeholder="Password" type="password" fullWidth margin="normal"
//                 value={password} onChange={(e) => setPassword(e.target.value)}
//                 sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent' } }}
//                 InputProps={{ startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>) }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
//                 <Typography variant="body2" sx={{ cursor: "pointer", color: theme.palette.primary.main, fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
//                   onClick={() => setForgotPasswordOpen(true)}
//                 >
//                   Forgot password?
//                 </Typography>
//               </Box>

//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   py: 1.2, borderRadius: 2, fontWeight: 600, textTransform: "none", fontSize: "16px", transition: "all 0.3s ease",
//                   background: isDark ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #4338ca 100%)` : "linear-gradient(180deg, #1f2937 0%, #000 100%)",
//                   color: "#fff", "&:hover": { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)" }
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
//               </Button>
//             </Box>
//           ) : (
//             /* ✅ OTP FORM SCREEN */
//             <Box component="form" onSubmit={handleOtpSubmit} sx={{ animation: 'fadeInScale 0.5s' }}>
//               <TextField
//                 placeholder="6-Digit OTP" fullWidth margin="normal" autoFocus
//                 value={otp} onChange={(e) => setOtp(e.target.value)}
//                 inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
//                 sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
//               />
//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   mt: 2, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: "none", fontSize: "16px",
//                   background: "linear-gradient(90deg, #10b981 0%, #059669 100%)", color: "#fff"
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
//               </Button>
//               <Button fullWidth onClick={() => setStep('login')} sx={{ mt: 1, textTransform: "none", color: "text.secondary" }}>
//                 Back to Login
//               </Button>
//             </Box>
//           )}

//           {step === 'login' && (
//             <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}`, textAlign: "center" }}>
//               <Typography variant="body2" color="text.secondary">
//                 Don't have an account? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 600 }}>Create account</Link>
//               </Typography>
//             </Box>
//           )}
//         </Paper>
//       </Container>

//       <ForgotPassword open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
//     </Box>
//   )
// }

// export default Login
import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"
import api from '../api/axios'; // Api call ke liye

import {
  Box, Container, TextField, Button, Typography, Alert,
  InputAdornment, Paper, alpha, CircularProgress
} from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LoginIcon from "@mui/icons-material/Login"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ForgotPassword from "./ForgotPassword"
import { toast } from "react-toastify"

const cloudStyles = (theme) => `
  @keyframes float-left { 0% { transform: translateX(100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-100vw); opacity: 0; } }
  @keyframes float-right { 0% { transform: translateX(-100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100vw); opacity: 0; } }
  @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  @keyframes shake { 0%, 100% { transform: translateX(0); } 25% { transform: translateX(-5px); } 75% { transform: translateX(5px); } }
  .cloud { position: absolute; pointer-events: none; }
  .cloud-left { animation: float-left 45s infinite linear; }
  .cloud-right { animation: float-right 50s infinite linear; }
  .cloud-shape { width: 120px; height: 50px; background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : 'rgba(255, 255, 255, 0.7)'}; border-radius: 50px; filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1)); position: relative; }
  .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; }
  .form-icon { animation: fadeInScale 0.8s ease-out; transition: all 0.3s ease; }
  .form-icon:hover { animation: pulse 0.6s ease-in-out; }
  .alert-shake { animation: shake 0.5s ease-in-out; }
`

const Login = () => {
  const { login: authLogin, error: authError } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  // Form States
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  
  // ✅ 2FA Logic States
  const [step, setStep] = useState("login") // 'login' or 'otp'
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  // Step 1: Login Submission
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      // Backend ko call kiya
      const response = await api.post("/auth/login", { email, password });
      
      if (response.data.step === "verify-otp") {
        setStep("otp");
        toast.info("OTP sent to your email!");
      } else {
        // Agar OTP enabled nahi hai toh direct dashboard (waise humne logic change kiya hai toh OTP hi aayega)
        const success = await authLogin(email, password);
        if (success) navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
      toast.error(err.response?.data?.message || "Login error");
    } finally {
      setLoading(false);
    }
  }

  // Step 2: OTP Verification Submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const response = await api.post("/auth/verify-otp", { email, otp });
      // JWT token aur user data context mein update karne ke liye
      localStorage.setItem("accessToken", response.data.accessToken);
      // Refresh page ya Context update logic yahan likhein (depends on your AuthContext)
      toast.success("Login Successful!");
      window.location.href = "/dashboard"; // Direct refresh to load context
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      toast.error("Invalid or expired OTP");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box sx={{
        minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
        px: 2, py: 4, position: "relative", overflow: "hidden", transition: "background 0.3s ease",
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
    }}>
      <style>{cloudStyles(theme)}</style>

      {/* Animated Clouds */}
      {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
        <Box key={i} className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s` }}>
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
        <Paper elevation={6} className="form-paper"
          sx={{
            width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 4,
            background: theme.palette.background.paper, 
            boxShadow: isDark ? "0 20px 60px rgba(0, 0, 0, 0.5)" : "0 20px 60px rgba(0, 0, 0, 0.15)",
          }}
        >
          {/* ✅ DYNAMIC ICON & TITLE */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {step === 'login' ? (
              <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} className="form-icon" />
            ) : (
              <VerifiedUserIcon sx={{ fontSize: 40, color: "#10b981" }} className="form-icon" />
            )}
          </Box>

          <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 1, color: theme.palette.text.primary }}>
            {step === 'login' ? "Welcome Back" : "Security Check"}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3 }}>
            {step === 'login' ? "Sign in to your account to continue" : `Enter the 6-digit code sent to ${email}`}
          </Typography>

          {(error || authError) && (
            <Alert severity="error" sx={{ mb: 2 }} className="alert-shake">
              {error || authError}
            </Alert>
          )}

          {/* ✅ CONDITIONALLY RENDER LOGIN OR OTP FORM */}
          {step === 'login' ? (
            <Box component="form" onSubmit={handleLoginSubmit}>
              <TextField
                placeholder="Email Address" type="email" fullWidth margin="normal"
                value={email} onChange={(e) => setEmail(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent' } }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>) }}
              />
              <TextField
                placeholder="Password" type="password" fullWidth margin="normal"
                value={password} onChange={(e) => setPassword(e.target.value)}
                sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent' } }}
                InputProps={{ startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>) }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ cursor: "pointer", color: theme.palette.primary.main, fontWeight: 600, "&:hover": { textDecoration: "underline" } }}
                  onClick={() => setForgotPasswordOpen(true)}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button type="submit" fullWidth disabled={loading}
                sx={{
                  py: 1.2, borderRadius: 2, fontWeight: 600, textTransform: "none", fontSize: "16px", transition: "all 0.3s ease",
                  background: isDark ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #4338ca 100%)` : "linear-gradient(180deg, #1f2937 0%, #000 100%)",
                  color: "#fff", "&:hover": { boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)" }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
            </Box>
          ) : (
            /* ✅ OTP FORM SCREEN */
            <Box component="form" onSubmit={handleOtpSubmit} sx={{ animation: 'fadeInScale 0.5s' }}>
              <TextField
                placeholder="6-Digit OTP" fullWidth margin="normal" autoFocus
                value={otp} onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
                sx={{ "& .MuiOutlinedInput-root": { backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
              />
              <Button type="submit" fullWidth disabled={loading}
                sx={{
                  mt: 2, py: 1.2, borderRadius: 2, fontWeight: 700, textTransform: "none", fontSize: "16px",
                  background: "linear-gradient(90deg, #10b981 0%, #059669 100%)", color: "#fff"
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
              </Button>
              <Button fullWidth onClick={() => setStep('login')} sx={{ mt: 1, textTransform: "none", color: "text.secondary" }}>
                Back to Login
              </Button>
            </Box>
          )}

          {step === 'login' && (
            <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${theme.palette.divider}`, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 600 }}>Create account</Link>
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>

      <ForgotPassword open={forgotPasswordOpen} onClose={() => setForgotPasswordOpen(false)} />
    </Box>
  )
}

export default Login

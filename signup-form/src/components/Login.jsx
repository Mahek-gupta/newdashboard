// import React, { useContext, useState } from 'react'
// import { AuthContext } from '../store/AuthContext'

// const Login = () => {

//   const {login, error} = useContext(AuthContext)
//   const [email, setEmail] = useState()
//   const [password, setPassword] = useState()

//   const handleSubmit= (e)=>{
//     e.preventDefault()
//     login(email, password)

//   }
//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <p>login</p>
//         {error ? <p>{error}</p> : ''}
//       <input type="email" placeholder='enter your email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
//       <input type="password" placeholder='enter your password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
//     <button type='submit'>submit</button>
//     </form>
//     </div>
//   )
// }

// export default Login








// import { useState } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate } from "react-router-dom"

// const Login = () => {
//   const { login, error } = useAuth()
//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const success = await login(email, password)
//     if (success) navigate("/dashboard")
//   }

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Login</h2>
//       {error && <p>{error}</p>}

//       <input onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" onChange={(e) => setPassword(e.target.value)} />
//       <button>Login</button>
//     </form>
//   )
// }

// export default Login







// import { useState } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate } from "react-router-dom"

// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
//   Paper
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"

// const Login = () => {
//   const { login, error } = useAuth()
//   const navigate = useNavigate()

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     const success = await login(email, password)
//     if (success) navigate("/dashboard")
//   }

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         alignItems: "center",
//         background:
//           "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)"
//       }}
//     >
//       <Container maxWidth="xs">
//         <Paper
//           elevation={6}
//           sx={{
//             p: 4,
//             borderRadius: 4,
//             backdropFilter: "blur(10px)"
//           }}
//         >
//           <Typography variant="h5" align="center" fontWeight={600}>
//             Sign in with email
//           </Typography>

//           <Typography
//             variant="body2"
//             align="center"
//             color="text.secondary"
//             sx={{ mt: 1, mb: 3 }}
//           >
//             Make a new doc to bring your words, data, and teams together.
//           </Typography>

//           {error && (
//             <Alert severity="error" sx={{ mb: 2 }}>
//               {error}
//             </Alert>
//           )}

//           <Box component="form" onSubmit={handleSubmit}>
//             <TextField
//               placeholder="Email"
//               fullWidth
//               margin="normal"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                      <EmailOutlinedIcon fontSize="small" /> 
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
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon fontSize="small" /> 
//                   </InputAdornment>
//                 )
//               }}
//             />

//             <Typography
//               variant="body2"
//               align="right"
//               sx={{ mt: 1, cursor: "pointer" }}
//               color="primary"
//             >
//               Forgot password?
//             </Typography>

//             <Button
//               type="submit"
//               fullWidth
//               sx={{
//                 mt: 3,
//                 py: 1.2,
//                 borderRadius: 2,
//                 background:
//                   "linear-gradient(180deg, #1f2937 0%, #000 100%)",
//                 color: "#fff",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 "&:hover": {
//                   background:
//                     "linear-gradient(180deg, #111827 0%, #000 100%)"
//                 }
//               }}
//             >
//               Get Started
//             </Button>
//           </Box>
//         </Paper>
//       </Container>
//     </Box>
//   )
// }

// export default Login




// import { useState } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate, Link } from "react-router-dom"

// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Alert,
//   InputAdornment,
//   Paper
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
// import LoginIcon from "@mui/icons-material/Login"
// import ForgotPassword from "./ForgotPassword"

// // Cloud animation styles
// const cloudStyles = `
//   @keyframes float-left {
//     0% {
//       transform: translateX(100vw);
//       opacity: 0;
//     }
//     10% {
//       opacity: 1;
//     }
//     90% {
//       opacity: 1;
//     }
//     100% {
//       transform: translateX(-100vw);
//       opacity: 0;
//     }
//   }

//   @keyframes float-right {
//     0% {
//       transform: translateX(-100vw);
//       opacity: 0;
//     }
//     10% {
//       opacity: 1;
//     }
//     90% {
//       opacity: 1;
//     }
//     100% {
//       transform: translateX(100vw);
//       opacity: 0;
//     }
//   }

//   @keyframes slideInUp {
//     from {
//       opacity: 0;
//       transform: translateY(30px);
//     }
//     to {
//       opacity: 1;
//       transform: translateY(0);
//     }
//   }

//   @keyframes fadeInScale {
//     from {
//       opacity: 0;
//       transform: scale(0.95);
//     }
//     to {
//       opacity: 1;
//       transform: scale(1);
//     }
//   }

//   @keyframes pulse {
//     0%, 100% {
//       transform: scale(1);
//     }
//     50% {
//       transform: scale(1.05);
//     }
//   }

//   @keyframes shake {
//     0%, 100% { transform: translateX(0); }
//     25% { transform: translateX(-5px); }
//     75% { transform: translateX(5px); }
//   }

//   .cloud {
//     position: absolute;
//     pointer-events: none;
//   }

//   .cloud-left {
//     animation: float-left 45s infinite linear;
//   }

//   .cloud-right {
//     animation: float-right 50s infinite linear;
//   }

//   .cloud-shape {
//     width: 120px;
//     height: 50px;
//     background: rgba(255, 255, 255, 0.7);
//     border-radius: 50px;
//     filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
//     position: relative;
//   }

//   .cloud-shape::before {
//     content: '';
//     position: absolute;
//     width: 60px;
//     height: 60px;
//     background: rgba(255, 255, 255, 0.7);
//     border-radius: 50%;
//     top: -30px;
//     left: 10px;
//   }

//   .cloud-shape::after {
//     content: '';
//     position: absolute;
//     width: 50px;
//     height: 50px;
//     background: rgba(255, 255, 255, 0.7);
//     border-radius: 50%;
//     top: -25px;
//     right: 20px;
//   }

//   .form-paper {
//     animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out;
//   }

//   .form-icon {
//     animation: fadeInScale 0.8s ease-out;
//     transition: all 0.3s ease;
//   }

//   .form-icon:hover {
//     animation: pulse 0.6s ease-in-out;
//   }

//   .form-title {
//     animation: slideInUp 0.7s ease-out 0.1s both;
//   }

//   .form-subtitle {
//     animation: slideInUp 0.7s ease-out 0.2s both;
//   }

//   .form-field {
//     animation: slideInUp 0.7s ease-out;
//   }

//   .form-field:nth-of-type(1) {
//     animation-delay: 0.3s;
//   }

//   .form-field:nth-of-type(2) {
//     animation-delay: 0.4s;
//   }

//   .submit-button {
//     animation: slideInUp 0.7s ease-out 0.6s both;
//     transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }

//   .submit-button:hover {
//     transform: translateY(-3px);
//     box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important;
//   }

//   .submit-button:active {
//     transform: translateY(-1px);
//   }

//   .login-link {
//     animation: slideInUp 0.7s ease-out 0.7s both;
//   }

//   .alert-shake {
//     animation: shake 0.5s ease-in-out;
//   }
// `

// const Login = () => {
//   const { login, error } = useAuth()
//   const navigate = useNavigate()

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
//         py: 4,
//         background:
//           "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
//         position: "relative",
//         overflow: "hidden"
//       }}
//     >
//       {/* Inject cloud animation styles */}
//       <style>{cloudStyles}</style>

//       {/* Animated Clouds - 8 clouds evenly spaced, no overlap */}
//       <Box className="cloud cloud-left" sx={{ top: "5%", animationDelay: "0s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-right" sx={{ top: "15%", animationDelay: "3s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-left" sx={{ top: "25%", animationDelay: "6s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-right" sx={{ top: "35%", animationDelay: "9s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-left" sx={{ top: "45%", animationDelay: "2s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-right" sx={{ top: "55%", animationDelay: "5s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-left" sx={{ top: "65%", animationDelay: "8s" }}>
//         <Box className="cloud-shape" />
//       </Box>
//       <Box className="cloud cloud-right" sx={{ top: "75%", animationDelay: "1s" }}>
//         <Box className="cloud-shape" />
//       </Box>

//       <Container
//         maxWidth="sm"
//         disableGutters
//         sx={{
//           display: "flex",
//           justifyContent: "center",
//           position: "relative",
//           zIndex: 10
//         }}
//       >
//         <Paper
//           elevation={6}
//           sx={{
//             width: "100%",
//             maxWidth: 420,
//             p: { xs: 3, sm: 4 },
//             borderRadius: 4,
//             background: "#ffffff",
//             boxShadow: "0 20px 60px rgba(0, 0, 0, 0.15)"
//           }}
//           className="form-paper"
//         >
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             <LoginIcon sx={{ fontSize: 40, color: "#1f2937" }} className="form-icon" />
//           </Box>

//           <Typography
//             variant="h5"
//             align="center"
//             fontWeight={600}
//             sx={{ mb: 1 }}
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
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <EmailOutlinedIcon fontSize="small" />
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
//               InputProps={{
//                 startAdornment: (
//                   <InputAdornment position="start">
//                     <LockOutlinedIcon fontSize="small" />
//                   </InputAdornment>
//                 )
//               }}
//             />

//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "flex-end",
//                 mt: 1,
//                 mb: 2
//               }}
//             >
//               <Typography
//                 variant="body2"
//                 sx={{
//                   cursor: "pointer",
//                   color: "#3b82f6",
//                   fontWeight: 600,
//                   "&:hover": {
//                     color: "#2563eb",
//                     textDecoration: "underline"
//                   },
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
//                 background:
//                   "linear-gradient(180deg, #1f2937 0%, #000 100%)",
//                 color: "#fff",
//                 textTransform: "none",
//                 fontWeight: 600,
//                 fontSize: "16px",
//                 "&:hover": {
//                   background:
//                     "linear-gradient(180deg, #111827 0%, #000 100%)",
//                   boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)"
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
//                 borderTop: "1px solid #e5e7eb",
//                 textAlign: "center"
//               }}
//               className="login-link"
//             >
//               <Typography variant="body2" color="text.secondary">
//                 Don't have an account?{" "}
//                 <Link
//                   to="/signup"
//                   style={{
//                     color: "#3b82f6",
//                     textDecoration: "none",
//                     fontWeight: 600,
//                     transition: "color 0.2s"
//                   }}
//                   onMouseEnter={(e) => (e.target.style.color = "#2563eb")}
//                   onMouseLeave={(e) => (e.target.style.color = "#3b82f6")}
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






// import { useState, useEffect } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate, Link } from "react-router-dom"
// import { useTheme } from "@mui/material/styles"

// import {
//   Box, Container, TextField, Button, Typography, Alert,
//   InputAdornment, Paper, alpha, CircularProgress
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
// import LoginIcon from "@mui/icons-material/Login"
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
// import ForgotPassword from "./ForgotPassword"
// import { toast } from "react-toastify"

// const cloudStyles = (theme) => `
//   @keyframes float-left { 0% { transform: translateX(100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-100vw); opacity: 0; } }
//   @keyframes float-right { 0% { transform: translateX(-100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100vw); opacity: 0; } }
//   @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
//   @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  
//   @keyframes neonGlow {
//     0% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
//     33% { filter: blur(100px); opacity: 0.8; transform: translate(30px, -50px) scale(1.2); }
//     66% { filter: blur(80px); opacity: 0.6; transform: translate(-20px, 40px) scale(0.9); }
//     100% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
//   }

//   .cloud { position: absolute; pointer-events: none; z-index: 1; }
//   .cloud-left { animation: float-left 45s infinite linear; }
//   .cloud-right { animation: float-right 50s infinite linear; }
  
//   /* ✅ Fixed: Added Blur and consistent styling */
//   .cloud-shape { 
//     width: 120px; 
//     height: 50px; 
//     background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.08) : 'rgba(255, 255, 255, 0.75)'}; 
//     border-radius: 50px; 
//     filter: blur(5px); 
//     position: relative; 
//   }
//   .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
//   .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
//   .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  
//   .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; position: relative; z-index: 10; }
// `

// const Login = () => {
//   const { login: authLogin, verifyOTP, error: authError } = useAuth()
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isDark = theme.palette.mode === 'dark'

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [otp, setOtp] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [step, setStep] = useState("login") 
//   const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  
//   const [timer, setTimer] = useState(60)
//   const [canResend, setCanResend] = useState(false)

//   useEffect(() => {
//     let interval
//     if (step === "otp" && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1)
//       }, 1000)
//     } else if (timer === 0) {
//       setCanResend(true)
//       clearInterval(interval)
//     }
//     return () => clearInterval(interval)
//   }, [step, timer])

//   const handleLoginSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const result = await authLogin(email, password)
//     if (result.success) {
//       if (result.step === "otp") {
//         setStep("otp")
//         setTimer(60)
//         setCanResend(false)
//         toast.info("Verification code sent to email")
//       } else {
//         navigate("/dashboard")
//       }
//     }
//     setLoading(false)
//   }

//   const handleResendOtp = async () => {
//     setLoading(true)
//     const result = await authLogin(email, password)
//     if (result.success) {
//       setTimer(60)
//       setCanResend(false)
//       toast.success("New OTP sent successfully!")
//     }
//     setLoading(false)
//   }

//   const handleOtpSubmit = async (e) => {
//     e.preventDefault()
//     setLoading(true)
//     const success = await verifyOTP(email, otp)
//     if (success) {
//       toast.success("Welcome back!")
//       navigate("/dashboard")
//     }
//     setLoading(false)
//   }

//   return (
//     <Box sx={{
//         minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
//         px: 2, py: 4, position: "relative", overflow: "hidden", 
//         transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
//         background: isDark 
//           ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
//           : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
//     }}>
//       <style>{cloudStyles(theme)}</style>

//       {/* --- NEON GLOW EFFECTS --- */}
//       <Box
//         sx={{
//           position: "absolute", top: "-10%", left: "-10%", width: "600px", height: "600px",
//           background: isDark 
//             ? "radial-gradient(circle, rgba(0, 255, 242, 0.15) 0%, transparent 70%)"
//             : "radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)",
//           borderRadius: "50%", zIndex: 0, animation: "neonGlow 15s infinite ease-in-out",
//         }}
//       />
      
//       <Box
//         sx={{
//           position: "absolute", bottom: "-15%", right: "-5%", width: "700px", height: "700px",
//           background: isDark 
//             ? "radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)"
//             : "radial-gradient(circle, rgba(191, 0, 255, 0.2) 0%, transparent 70%)",
//           borderRadius: "50%", zIndex: 0, animation: "neonGlow 20s infinite ease-in-out reverse",
//         }}
//       />

//       {/* ✅ Clouds with updated Opacity & Blur */}
//       {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
//         <Box 
//           key={i} 
//           className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} 
//           sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s`, opacity: isDark ? 0.12 : 0.75 }}
//         >
//           <Box className="cloud-shape" />
//         </Box>
//       ))}

//       <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
//         <Paper elevation={0} className="form-paper"
//           sx={{
//             width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 8,
//             background: isDark 
//               ? alpha(theme.palette.background.paper, 0.6) 
//               : alpha('#fff', 0.75),
//             backdropFilter: "blur(30px)",
//             border: `1px solid ${alpha('#fff', 0.2)}`,
//             boxShadow: isDark ? `0 20px 80px ${alpha('#000', 0.8)}` : `0 20px 60px ${alpha(theme.palette.primary.main, 0.1)}`,
//           }}
//         >
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             <Box sx={{ 
//                 width: 60, height: 60, bgcolor: isDark ? alpha('#00f2ff', 0.1) : alpha(theme.palette.primary.main, 0.1), 
//                 borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 transform: 'rotate(-10deg)', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
//             }}>
//               {step === 'login' ? (
//                 <LoginIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
//               ) : (
//                 <VerifiedUserIcon sx={{ fontSize: 32, color: "#10b981" }} />
//               )}
//             </Box>
//           </Box>

//           <Typography variant="h5" align="center" fontWeight={900} sx={{ mb: 1, color: theme.palette.text.primary, letterSpacing: '-1px' }}>
//             {step === 'login' ? "Welcome Back" : "Security Check"}
//           </Typography>

//           <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3, fontWeight: 600 }}>
//             {step === 'login' ? "Sign in to your account to continue" : `Verification code sent to ${email}`}
//           </Typography>

//           {authError && <Alert severity="error" sx={{ mb: 2, borderRadius: 3, fontWeight: 600 }}>{authError}</Alert>}

//           {step === 'login' ? (
//             <Box component="form" onSubmit={handleLoginSubmit}>
//               <TextField
//                 placeholder="Email Address" type="email" fullWidth margin="normal"
//                 value={email} onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{ 
//                     startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
//                     sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.3) } 
//                 }}
//               />
//               <TextField
//                 placeholder="Password" type="password" fullWidth margin="normal"
//                 value={password} onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{ 
//                     startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
//                     sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.3) } 
//                 }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
//                 <Typography variant="body2" sx={{ cursor: "pointer", color: theme.palette.primary.main, fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
//                   onClick={() => setForgotPasswordOpen(true)}
//                 >
//                   Forgot password?
//                 </Typography>
//               </Box>

//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   py: 1.8, borderRadius: 4, fontWeight: 800, textTransform: "none", fontSize: "1rem",
//                   background: isDark 
//                     ? `linear-gradient(90deg, #00f2ff, #7000ff)` 
//                     : `linear-gradient(90deg, #1f2937, #000)`,
//                   color: "#fff", transition: 'all 0.4s ease',
//                   '&:hover': { transform: 'scale(1.02)', boxShadow: isDark ? `0 10px 25px ${alpha('#00f2ff', 0.5)}` : "0 8px 16px rgba(0,0,0,0.3)" }
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
//               </Button>
//             </Box>
//           ) : (
//             <Box component="form" onSubmit={handleOtpSubmit}>
//               <TextField
//                 placeholder="000000" fullWidth margin="normal" autoFocus
//                 value={otp} onChange={(e) => setOtp(e.target.value)}
//                 inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
//                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4, backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
//               />
              
//               <Box sx={{ textAlign: 'center', my: 2 }}>
//                 {canResend ? (
//                   <Typography variant="body2" onClick={handleResendOtp} 
//                     sx={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 700 }}>
//                     Resend OTP
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     Resend OTP in <b>{timer}s</b>
//                   </Typography>
//                 )}
//               </Box>

//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   py: 1.5, borderRadius: 4, fontWeight: 800, textTransform: "none",
//                   background: "linear-gradient(90deg, #10b981, #059669)", color: "#fff"
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
//               </Button>
//               <Button fullWidth onClick={() => { setStep('login'); setTimer(0); }} sx={{ mt: 1, textTransform: "none", color: "text.secondary", fontWeight: 600 }}>
//                 Back to Login
//               </Button>
//             </Box>
//           )}

//           {step === 'login' && (
//             <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, textAlign: "center" }}>
//               <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
//                 Don't have an account? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 800 }}>Create account</Link>
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



// import { useState, useEffect } from "react"
// import { useAuth } from "../store/AuthContext"
// import { useNavigate, Link } from "react-router-dom"
// import { useTheme } from "@mui/material/styles"

// import {
//   Box, Container, TextField, Button, Typography, Alert,
//   InputAdornment, Paper, alpha, CircularProgress
// } from "@mui/material"
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
// import LoginIcon from "@mui/icons-material/Login"
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
// import ForgotPassword from "./ForgotPassword"
// import { toast } from "react-toastify"

// // Optimized Animations & Cloud Logic
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
  
//   @keyframes neonGlow {
//     0% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
//     33% { filter: blur(100px); opacity: 0.8; transform: translate(30px, -50px) scale(1.2); }
//     66% { filter: blur(80px); opacity: 0.6; transform: translate(-20px, 40px) scale(0.9); }
//     100% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
//   }

//   .cloud { position: absolute; pointer-events: none; z-index: 1; }
//   .cloud-left { animation: float-left 45s infinite linear; }
//   .cloud-right { animation: float-right 50s infinite linear; }
  
//   .cloud-shape { 
//     width: 120px; 
//     height: 50px; 
//     background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.08) : 'rgba(255, 255, 255, 0.75)'}; 
//     border-radius: 50px; 
//     filter: blur(4px); 
//     position: relative; 
//   }
//   .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
//   .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
//   .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  
//   .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; position: relative; z-index: 10; }
// `

// const Login = () => {
//   const { login: authLogin, verifyOTP, error: authError } = useAuth()
//   const navigate = useNavigate()
//   const theme = useTheme()
//   const isDark = theme.palette.mode === 'dark'

//   const [email, setEmail] = useState("")
//   const [password, setPassword] = useState("")
//   const [otp, setOtp] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [step, setStep] = useState("login") // 'login' or 'otp'
//   const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  
//   const [timer, setTimer] = useState(60)
//   const [canResend, setCanResend] = useState(false)

//   // OTP Timer Logic
//   useEffect(() => {
//     let interval
//     if (step === "otp" && timer > 0) {
//       interval = setInterval(() => {
//         setTimer((prev) => prev - 1)
//       }, 1000)
//     } else if (timer === 0) {
//       setCanResend(true)
//       clearInterval(interval)
//     }
//     return () => clearInterval(interval)
//   }, [step, timer])

//   // Initial Form Login Trigger
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault()
//     if (!email || !password) {
//       toast.error("Please fill in all fields")
//       return
//     }
//     setLoading(true)
//     const result = await authLogin(email, password)
//     if (result?.success) {
//       if (result.step === "otp") {
//         setStep("otp")
//         setTimer(60)
//         setCanResend(false)
//         toast.info("Verification code sent to your email")
//       } else {
//         navigate("/dashboard")
//       }
//     }
//     setLoading(false)
//   }

//   // Resend OTP Action
//   const handleResendOtp = async () => {
//     setLoading(true)
//     const result = await authLogin(email, password)
//     if (result?.success) {
//       setTimer(60)
//       setCanResend(false)
//       toast.success("New OTP sent successfully!")
//     }
//     setLoading(false)
//   }

//   // OTP Verification Submission
//   const handleOtpSubmit = async (e) => {
//     e.preventDefault()
//     console.log("Submitting OTP for:", { email, otp });
//     if (otp.length < 6) {
//       toast.error("Please enter a valid 6-digit OTP")
//       return
//     }
//     setLoading(true)
//     const success = await verifyOTP(email, otp)
//     if (success) {
//       toast.success("Welcome back!")
//       navigate("/dashboard")
//     }
//     setLoading(false)
//   }

//   return (
//     <Box sx={{
//         minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
//         px: 2, py: 4, position: "relative", overflow: "hidden", 
//         transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
//         background: isDark 
//           ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
//           : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
//     }}>
//       <style>{cloudStyles(theme)}</style>

//       {/* Ambient Neon Glow Layers */}
//       <Box
//         sx={{
//           position: "absolute", top: "-10%", left: "-10%", width: "600px", height: "600px",
//           background: isDark 
//             ? "radial-gradient(circle, rgba(0, 255, 242, 0.12) 0%, transparent 70%)"
//             : "radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)",
//           borderRadius: "50%", zIndex: 0, animation: "neonGlow 15s infinite ease-in-out",
//         }}
//       />
      
//       <Box
//         sx={{
//           position: "absolute", bottom: "-15%", right: "-5%", width: "700px", height: "700px",
//           background: isDark 
//             ? "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)"
//             : "radial-gradient(circle, rgba(191, 0, 255, 0.15) 0%, transparent 70%)",
//           borderRadius: "50%", zIndex: 0, animation: "neonGlow 20s infinite ease-in-out reverse",
//         }}
//       />

//       {/* Floating Procedural Clouds */}
//       {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
//         <Box 
//           key={i} 
//           className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} 
//           sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s`, opacity: isDark ? 0.15 : 0.75 }}
//         >
//           <Box className="cloud-shape" />
//         </Box>
//       ))}

//       <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
//         <Paper elevation={0} className="form-paper"
//           sx={{
//             width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 8,
//             background: isDark 
//               ? alpha(theme.palette.background.paper, 0.65) 
//               : alpha('#fff', 0.8),
//             backdropFilter: "blur(20px)",
//             border: `1px solid ${isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05)}`,
//             boxShadow: isDark ? `0 20px 80px ${alpha('#000', 0.8)}` : `0 20px 60px ${alpha(theme.palette.primary.main, 0.12)}`,
//           }}
//         >
//           {/* Top Stage Icon Wrapper */}
//           <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
//             <Box sx={{ 
//                 width: 60, height: 60, bgcolor: isDark ? alpha('#00f2ff', 0.1) : alpha(theme.palette.primary.main, 0.1), 
//                 borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 transform: 'rotate(-10deg)', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
//             }}>
//               {step === 'login' ? (
//                 <LoginIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
//               ) : (
//                 <VerifiedUserIcon sx={{ fontSize: 32, color: "#10b981" }} />
//               )}
//             </Box>
//           </Box>

//           <Typography variant="h5" align="center" fontWeight={900} sx={{ mb: 1, color: theme.palette.text.primary, letterSpacing: '-1px' }}>
//             {step === 'login' ? "Welcome Back" : "Security Check"}
//           </Typography>

//           <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3, fontWeight: 600 }}>
//             {step === 'login' ? "Sign in to your account to continue" : `Verification code sent to ${email}`}
//           </Typography>

//           {authError && <Alert severity="error" sx={{ mb: 2, borderRadius: 3, fontWeight: 600 }}>{authError}</Alert>}

//           {/* Conditional Steps Rendering */}
//           {step === 'login' ? (
//             <Box component="form" onSubmit={handleLoginSubmit}>
//               <TextField
//                 placeholder="Email Address" type="email" fullWidth margin="normal" required
//                 value={email} onChange={(e) => setEmail(e.target.value)}
//                 InputProps={{ 
//                     startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
//                     sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.4) } 
//                 }}
//               />
//               <TextField
//                 placeholder="Password" type="password" fullWidth margin="normal" required
//                 value={password} onChange={(e) => setPassword(e.target.value)}
//                 InputProps={{ 
//                     startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
//                     sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.4) } 
//                 }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
//                 <Typography variant="body2" sx={{ cursor: "pointer", color: theme.palette.primary.main, fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
//                   onClick={() => setForgotPasswordOpen(true)}
//                 >
//                   Forgot password?
//                 </Typography>
//               </Box>

//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   py: 1.8, borderRadius: 4, fontWeight: 800, textTransform: "none", fontSize: "1rem",
//                   background: isDark 
//                     ? `linear-gradient(90deg, #00f2ff, #7000ff)` 
//                     : `linear-gradient(90deg, #1f2937, #000)`,
//                   color: "#fff", transition: 'all 0.4s ease',
//                   '&:hover': { transform: 'scale(1.02)', boxShadow: isDark ? `0 10px 25px ${alpha('#00f2ff', 0.5)}` : "0 8px 16px rgba(0,0,0,0.3)" }
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
//               </Button>
//             </Box>
//           ) : (
//             <Box component="form" onSubmit={handleOtpSubmit}>
//               <TextField
//                 placeholder="000000" fullWidth margin="normal" autoFocus required
//                 value={otp} onChange={(e) => setOtp(e.target.value)}
//                 inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
//                 sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4, backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
//               />
              
//               <Box sx={{ textAlign: 'center', my: 2 }}>
//                 {canResend ? (
//                   <Typography variant="body2" onClick={handleResendOtp} 
//                     sx={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 700, "&:hover": { textDecoration: "underline" } }}>
//                     Resend OTP
//                   </Typography>
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     Resend OTP in <b>{timer}s</b>
//                   </Typography>
//                 )}
//               </Box>

//               <Button type="submit" fullWidth disabled={loading}
//                 sx={{
//                   py: 1.5, borderRadius: 4, fontWeight: 800, textTransform: "none",
//                   background: "linear-gradient(90deg, #10b981, #059669)", color: "#fff",
//                   '&:hover': { transform: 'scale(1.01)' }
//                 }}
//               >
//                 {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
//               </Button>
//               <Button fullWidth onClick={() => { setStep('login'); setTimer(0); setOtp(''); }} sx={{ mt: 1, textTransform: "none", color: "text.secondary", fontWeight: 600 }}>
//                 Back to Login
//               </Button>
//             </Box>
//           )}

//           {/* Registration Navigation Section */}
//           {step === 'login' && (
//             <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, textAlign: "center" }}>
//               <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
//                 Don't have an account? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 800 }}>Create account</Link>
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


import { useState, useEffect } from "react"
import { useAuth } from "../store/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

import {
  Box, Container, TextField, Button, Typography, Alert,
  InputAdornment, Paper, alpha, CircularProgress
} from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import LoginIcon from "@mui/icons-material/Login"
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser'
import ForgotPassword from "./ForgotPassword"
import { toast } from "react-toastify"

// Optimized Animations & Cloud Logic
const cloudStyles = (theme) => `
  @keyframes float-left { 
    0% { transform: translateX(100vw); opacity: 0; } 
    10% { opacity: 1; } 
    90% { opacity: 1; } 
    100% { transform: translateX(-100vw); opacity: 0; } 
  }
  @keyframes float-right { 
    0% { transform: translateX(-100vw); opacity: 0; } 
    10% { opacity: 1; } 
    90% { opacity: 1; } 
    100% { transform: translateX(100vw); opacity: 0; } 
  }
  @keyframes slideInUp { 
    from { opacity: 0; transform: translateY(30px); } 
    to { opacity: 1; transform: translateY(0); } 
  }
  @keyframes fadeInScale { 
    from { opacity: 0; transform: scale(0.95); } 
    to { opacity: 1; transform: scale(1); } 
  }
  
  @keyframes neonGlow {
    0% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
    33% { filter: blur(100px); opacity: 0.8; transform: translate(30px, -50px) scale(1.2); }
    66% { filter: blur(80px); opacity: 0.6; transform: translate(-20px, 40px) scale(0.9); }
    100% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
  }

  .cloud { position: absolute; pointer-events: none; z-index: 1; }
  .cloud-left { animation: float-left 45s infinite linear; }
  .cloud-right { animation: float-right 50s infinite linear; }
  
  .cloud-shape { 
    width: 120px; 
    height: 50px; 
    background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.08) : 'rgba(255, 255, 255, 0.75)'}; 
    border-radius: 50px; 
    filter: blur(4px); 
    position: relative; 
  }
  .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  
  .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; position: relative; z-index: 10; }
`

const Login = () => {
  // ✅ Context se resendOTP use kiya taaki payload 400 Bad Request error handle ho sake
  const { login: authLogin, verifyOTP, resendOTP, error: authError } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [otp, setOtp] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState("login") 
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)
  
  const [timer, setTimer] = useState(60)
  const [canResend, setCanResend] = useState(false)

  // OTP Timer Logic
  useEffect(() => {
    let interval
    if (step === "otp" && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1)
      }, 1000)
    } else if (timer === 0) {
      setCanResend(true)
      clearInterval(interval)
    }
    return () => clearInterval(interval)
  }, [step, timer])

  // Initial Form Login Trigger
  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      toast.error("Please fill in all fields")
      return
    }
    setLoading(true)
    const result = await authLogin(email.trim(), password)
    if (result?.success) {
      if (result.step === "otp") {
        setStep("otp")
        setTimer(60)
        setCanResend(false)
        toast.info("Verification code sent to your email")
      } else {
        navigate("/dashboard")
      }
    }
    setLoading(false)
  }

  // ✅ Fixed: Context ke real resendOTP core function ko map kiya
  const handleResendOtp = async () => {
    setLoading(true)
    const result = await resendOTP(email.trim())
    if (result?.success) {
      setTimer(60)
      setCanResend(false)
      toast.success(result.message || "New OTP sent successfully!")
    } else {
      toast.error(result?.message || "Failed to resend OTP")
    }
    setLoading(false)
  }

  // OTP Verification Submission
  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    
    // Check constraints safely
    if (otp.length < 6) {
      toast.error("Please enter a valid 6-digit OTP")
      return
    }
    
    setLoading(true)
    // Dynamic binding to AuthContext verifyOTP
    const success = await verifyOTP(email.trim(), otp.trim())
    if (success) {
      toast.success("Welcome back!")
      navigate("/dashboard")
    }
    setLoading(false)
  }

  return (
    <Box sx={{
        minHeight: "100vh", width: "100%", display: "flex", justifyContent: "center", alignItems: "center",
        px: 2, py: 4, position: "relative", overflow: "hidden", 
        transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
    }}>
      <style>{cloudStyles(theme)}</style>

      {/* Ambient Neon Glow Layers */}
      <Box
        sx={{
          position: "absolute", top: "-10%", left: "-10%", width: "600px", height: "600px",
          background: isDark 
            ? "radial-gradient(circle, rgba(0, 255, 242, 0.12) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 217, 255, 0.3) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0, animation: "neonGlow 15s infinite ease-in-out",
        }}
      />
      
      <Box
        sx={{
          position: "absolute", bottom: "-15%", right: "-5%", width: "700px", height: "700px",
          background: isDark 
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(191, 0, 255, 0.15) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0, animation: "neonGlow 20s infinite ease-in-out reverse",
        }}
      />

      {/* Floating Procedural Clouds */}
      {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
        <Box 
          key={i} 
          className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} 
          sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s`, opacity: isDark ? 0.15 : 0.75 }}
        >
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
        <Paper elevation={0} className="form-paper"
          sx={{
            width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 8,
            background: isDark 
              ? alpha(theme.palette.background.paper, 0.65) 
              : alpha('#fff', 0.8),
            backdropFilter: "blur(20px)",
            border: `1px solid ${isDark ? alpha('#fff', 0.1) : alpha('#000', 0.05)}`,
            boxShadow: isDark ? `0 20px 80px ${alpha('#000', 0.8)}` : `0 20px 60px ${alpha(theme.palette.primary.main, 0.12)}`,
          }}
        >
          {/* Top Stage Icon Wrapper */}
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Box sx={{ 
                width: 60, height: 60, bgcolor: isDark ? alpha('#00f2ff', 0.1) : alpha(theme.palette.primary.main, 0.1), 
                borderRadius: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                transform: 'rotate(-10deg)', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}>
              {step === 'login' ? (
                <LoginIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
              ) : (
                <VerifiedUserIcon sx={{ fontSize: 32, color: "#10b981" }} />
              )}
            </Box>
          </Box>

          <Typography variant="h5" align="center" fontWeight={900} sx={{ mb: 1, color: theme.palette.text.primary, letterSpacing: '-1px' }}>
            {step === 'login' ? "Welcome Back" : "Security Check"}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3, fontWeight: 600 }}>
            {step === 'login' ? "Sign in to your account to continue" : `Verification code sent to ${email}`}
          </Typography>

          {authError && <Alert severity="error" sx={{ mb: 2, borderRadius: 3, fontWeight: 600 }}>{authError}</Alert>}

          {/* Conditional Steps Rendering */}
          {step === 'login' ? (
            <Box component="form" onSubmit={handleLoginSubmit}>
              <TextField
                placeholder="Email Address" type="email" fullWidth margin="normal" required
                value={email} onChange={(e) => setEmail(e.target.value)}
                InputProps={{ 
                    startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
                    sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.4) } 
                }}
              />
              <TextField
                placeholder="Password" type="password" fullWidth margin="normal" required
                value={password} onChange={(e) => setPassword(e.target.value)}
                InputProps={{ 
                    startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
                    sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.4) } 
                }}
              />

              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
                <Typography variant="body2" sx={{ cursor: "pointer", color: theme.palette.primary.main, fontWeight: 700, "&:hover": { textDecoration: "underline" } }}
                  onClick={() => setForgotPasswordOpen(true)}
                >
                  Forgot password?
                </Typography>
              </Box>

              <Button type="submit" fullWidth disabled={loading}
                sx={{
                  py: 1.8, borderRadius: 4, fontWeight: 800, textTransform: "none", fontSize: "1rem",
                  background: isDark 
                    ? `linear-gradient(90deg, #00f2ff, #7000ff)` 
                    : `linear-gradient(90deg, #1f2937, #000)`,
                  color: "#fff", transition: 'all 0.4s ease',
                  '&:hover': { transform: 'scale(1.02)', boxShadow: isDark ? `0 10px 25px ${alpha('#00f2ff', 0.5)}` : "0 8px 16px rgba(0,0,0,0.3)" }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleOtpSubmit}>
              <TextField
                placeholder="000000" fullWidth margin="normal" autoFocus required
                value={otp} 
                // Only digits safe wrapper
                onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
                inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4, backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
              />
              
              <Box sx={{ textAlign: 'center', my: 2 }}>
                {canResend ? (
                  <Typography variant="body2" onClick={handleResendOtp} 
                    sx={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 700, "&:hover": { textDecoration: "underline" } }}>
                    Resend OTP
                  </Typography>
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Resend OTP in <b>{timer}s</b>
                  </Typography>
                )}
              </Box>

              <Button type="submit" fullWidth disabled={loading}
                sx={{
                  py: 1.5, borderRadius: 4, fontWeight: 800, textTransform: "none",
                  background: "linear-gradient(90deg, #10b981, #059669)", color: "#fff",
                  '&:hover': { transform: 'scale(1.01)' }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
              </Button>
              <Button fullWidth onClick={() => { setStep('login'); setTimer(0); setOtp(''); }} sx={{ mt: 1, textTransform: "none", color: "text.secondary", fontWeight: 600 }}>
                Back to Login
              </Button>
            </Box>
          )}

          {/* Registration Navigation Section */}
          {step === 'login' && (
            <Box sx={{ mt: 3, pt: 3, borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, textAlign: "center" }}>
              <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 600 }}>
                Don't have an account? <Link to="/signup" style={{ color: theme.palette.primary.main, textDecoration: "none", fontWeight: 800 }}>Create account</Link>
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
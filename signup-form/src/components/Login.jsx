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

const cloudStyles = (theme) => `
  @keyframes float-left { 0% { transform: translateX(100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(-100vw); opacity: 0; } }
  @keyframes float-right { 0% { transform: translateX(-100vw); opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { transform: translateX(100vw); opacity: 0; } }
  @keyframes slideInUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes fadeInScale { from { opacity: 0; transform: scale(0.95); } to { opacity: 1; transform: scale(1); } }
  @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); } }
  
  /* ✅ Ultra-Slow Neon Glow Animation (Wahi Signup wali) */
  @keyframes neonGlow {
    0% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
    33% { filter: blur(100px); opacity: 0.8; transform: translate(30px, -50px) scale(1.2); }
    66% { filter: blur(80px); opacity: 0.6; transform: translate(-20px, 40px) scale(0.9); }
    100% { filter: blur(70px); opacity: 0.5; transform: translate(0, 0) scale(1); }
  }

  .cloud { position: absolute; pointer-events: none; z-index: 1; }
  .cloud-left { animation: float-left 45s infinite linear; }
  .cloud-right { animation: float-right 50s infinite linear; }
  .cloud-shape { width: 120px; height: 50px; background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : 'rgba(255, 255, 255, 0.7)'}; border-radius: 50px; filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1)); position: relative; }
  .cloud-shape::before, .cloud-shape::after { content: ''; position: absolute; background: inherit; border-radius: 50%; }
  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; position: relative; z-index: 10; }
`

const Login = () => {
  const { login: authLogin, verifyOTP, error: authError } = useAuth()
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

  const handleLoginSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const result = await authLogin(email, password)
    if (result.success) {
      if (result.step === "otp") {
        setStep("otp")
        setTimer(60)
        setCanResend(false)
        toast.info("Verification code sent to email")
      } else {
        navigate("/dashboard")
      }
    }
    setLoading(false)
  }

  const handleResendOtp = async () => {
    setLoading(true)
    const result = await authLogin(email, password)
    if (result.success) {
      setTimer(60)
      setCanResend(false)
      toast.success("New OTP sent successfully!")
    }
    setLoading(false)
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    const success = await verifyOTP(email, otp)
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
        /* ✅ Smooth Background transition */
        transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)",
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
    }}>
      <style>{cloudStyles(theme)}</style>

      {/* --- ✅ NEON GLOW EFFECTS (Same as Signup) --- */}
      <Box
        sx={{
          position: "absolute", top: "-10%", left: "-10%", width: "600px", height: "600px",
          background: isDark 
            ? "radial-gradient(circle, rgba(0, 255, 242, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0, animation: "neonGlow 15s infinite ease-in-out",
        }}
      />
      
      <Box
        sx={{
          position: "absolute", bottom: "-15%", right: "-5%", width: "700px", height: "700px",
          background: isDark 
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(191, 0, 255, 0.2) 0%, transparent 70%)",
          borderRadius: "50%", zIndex: 0, animation: "neonGlow 20s infinite ease-in-out reverse",
        }}
      />

      {[0, 3, 6, 9, 2, 5, 8, 1].map((delay, i) => (
        <Box key={i} className={`cloud cloud-${i % 2 === 0 ? 'left' : 'right'}`} sx={{ top: `${5 + i * 10}%`, animationDelay: `${delay}s`, opacity: isDark ? 0.15 : 0.8 }}>
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container maxWidth="sm" disableGutters sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}>
        <Paper elevation={0} className="form-paper"
          sx={{
            width: "100%", maxWidth: 420, p: { xs: 3, sm: 4 }, borderRadius: 8,
            /* ✅ Glassmorphism Match */
            background: isDark 
              ? alpha(theme.palette.background.paper, 0.6) 
              : alpha('#fff', 0.75),
            backdropFilter: "blur(30px)",
            border: `1px solid ${alpha('#fff', 0.2)}`,
            boxShadow: isDark ? "0 20px 60px rgba(0, 0, 0, 0.5)" : "0 20px 60px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            {step === 'login' ? (
              <LoginIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            ) : (
              <VerifiedUserIcon sx={{ fontSize: 40, color: "#10b981" }} />
            )}
          </Box>

          <Typography variant="h5" align="center" fontWeight={800} sx={{ mb: 1, color: theme.palette.text.primary, letterSpacing: '-0.5px' }}>
            {step === 'login' ? "Welcome Back" : "Security Check"}
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" sx={{ mb: 3, fontWeight: 500 }}>
            {step === 'login' ? "Sign in to your account to continue" : `Verification code sent to ${email}`}
          </Typography>

          {authError && <Alert severity="error" sx={{ mb: 2, borderRadius: 3 }}>{authError}</Alert>}

          {step === 'login' ? (
            <Box component="form" onSubmit={handleLoginSubmit}>
              <TextField
                placeholder="Email Address" type="email" fullWidth margin="normal"
                value={email} onChange={(e) => setEmail(e.target.value)}
                InputProps={{ 
                    startAdornment: (<InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
                    sx: { borderRadius: 4, bgcolor: alpha(theme.palette.background.default, 0.3) } 
                }}
              />
              <TextField
                placeholder="Password" type="password" fullWidth margin="normal"
                value={password} onChange={(e) => setPassword(e.target.value)}
                InputProps={{ 
                    startAdornment: (<InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>),
                    sx: { borderRadius: 4, bgcolor: alpha(theme.palette.background.default, 0.3) } 
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
                  py: 1.5, borderRadius: 4, fontWeight: 800, textTransform: "none", fontSize: "16px",
                  background: isDark 
                    ? `linear-gradient(90deg, #00f2ff, #7000ff)` 
                    : `linear-gradient(90deg, #1f2937, #000)`,
                  color: "#fff", transition: 'all 0.4s ease',
                  '&:hover': { transform: 'scale(1.02)', boxShadow: isDark ? `0 10px 25px ${alpha('#00f2ff', 0.4)}` : "0 8px 16px rgba(0,0,0,0.2)" }
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Sign In"}
              </Button>
            </Box>
          ) : (
            <Box component="form" onSubmit={handleOtpSubmit}>
              <TextField
                placeholder="000000" fullWidth margin="normal" autoFocus
                value={otp} onChange={(e) => setOtp(e.target.value)}
                inputProps={{ maxLength: 6, style: { textAlign: 'center', fontSize: '24px', letterSpacing: '8px', fontWeight: 'bold' } }}
                sx={{ "& .MuiOutlinedInput-root": { borderRadius: 4, backgroundColor: isDark ? alpha('#fff', 0.05) : '#f8fafc' } }}
              />
              
              <Box sx={{ textAlign: 'center', my: 2 }}>
                {canResend ? (
                  <Typography variant="body2" onClick={handleResendOtp} 
                    sx={{ color: theme.palette.primary.main, cursor: 'pointer', fontWeight: 700 }}>
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
                  background: "linear-gradient(90deg, #10b981, #059669)", color: "#fff"
                }}
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Verify & Login"}
              </Button>
              <Button fullWidth onClick={() => { setStep('login'); setTimer(0); }} sx={{ mt: 1, textTransform: "none", color: "text.secondary", fontWeight: 600 }}>
                Back to Login
              </Button>
            </Box>
          )}

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

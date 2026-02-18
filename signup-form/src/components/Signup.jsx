import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles"

import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  Paper,
  alpha
} from "@mui/material"
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import PersonOutlineIcon from "@mui/icons-material/PersonOutline"

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
  /* Ultra-Slow Neon Glow Animation */
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
    background: ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(255, 255, 255, 0.75)'};
    border-radius: 50px;
    filter: blur(4px);
    position: relative;
  }
  .cloud-shape::before, .cloud-shape::after {
    content: ''; position: absolute; background: inherit; border-radius: 50%;
  }
  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  .form-paper { animation: slideInUp 0.8s cubic-bezier(0.2, 0.8, 0.2, 1); }
`;

const Signup = () => {
  const { signup, error } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")
    if (!email || !password || !confirmPassword) return setLocalError("All fields are required")
    if (password.length < 6) return setLocalError("Password too short")
    if (password !== confirmPassword) return setLocalError("Passwords do not match")

    const success = await signup(email, password)
    if (success) navigate("/login")
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
        transition: "background 1.5s cubic-bezier(0.4, 0, 0.2, 1)"
      }}
    >
      <style>{cloudStyles(theme)}</style>

      {/* --- NEON GLOW EFFECTS (Slow & Attractive) --- */}
      {/* Top Left Neon Cyan */}
      <Box
        sx={{
          position: "absolute",
          top: "-10%",
          left: "-10%",
          width: "600px",
          height: "600px",
          background: isDark 
            ? "radial-gradient(circle, rgba(0, 255, 242, 0.15) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(0, 217, 255, 0.4) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "neonGlow 15s infinite ease-in-out",
        }}
      />
      
      {/* Bottom Right Electric Purple */}
      <Box
        sx={{
          position: "absolute",
          bottom: "-15%",
          right: "-5%",
          width: "700px",
          height: "700px",
          background: isDark 
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.2) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(191, 0, 255, 0.2) 0%, transparent 70%)",
          borderRadius: "50%",
          zIndex: 0,
          animation: "neonGlow 20s infinite ease-in-out reverse",
        }}
      />

      {/* Clouds Layer */}
      {[...Array(6)].map((_, i) => (
        <Box 
          key={i}
          className={`cloud ${i % 2 === 0 ? 'cloud-left' : 'cloud-right'}`} 
          sx={{ top: `${15 * i + 10}%`, animationDelay: `${i * 3}s`, opacity: isDark ? 0.15 : 0.8 }}
        >
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container maxWidth="sm" sx={{ position: "relative", zIndex: 10, display: 'flex', justifyContent: 'center' }}>
        <Paper
          elevation={0}
          className="form-paper"
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 5 },
            borderRadius: 10,
            /* Ultra Glass Effect */
            background: isDark 
              ? alpha(theme.palette.background.paper, 0.6) 
              : alpha('#fff', 0.7),
            backdropFilter: "blur(30px)",
            border: `1px solid ${alpha('#fff', 0.2)}`,
            boxShadow: isDark 
              ? `0 20px 80px ${alpha('#000', 0.8)}` 
              : `0 20px 80px ${alpha(theme.palette.primary.main, 0.15)}`,
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box sx={{ 
                width: 70, height: 70, bgcolor: isDark ? alpha('#00f2ff', 0.1) : alpha(theme.palette.primary.main, 0.1), 
                borderRadius: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', m: '0 auto', mb: 2,
                transform: 'rotate(-10deg)', border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`
            }}>
              <PersonOutlineIcon sx={{ fontSize: 40, color: theme.palette.primary.main }} />
            </Box>
            <Typography variant="h4" fontWeight={900} sx={{ color: theme.palette.text.primary, letterSpacing: '-1px' }}>
              Sign Up
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 500 }}>
              Join the future of secure accounts
            </Typography>
          </Box>

          { (error || localError) && <Alert severity="error" variant="filled" sx={{ mb: 3, borderRadius: 3 }}>{error || localError}</Alert> }

          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailOutlinedIcon color="primary" /></InputAdornment>,
                sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.3) }
              }}
            />
            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon color="primary" /></InputAdornment>,
                sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.3) }
              }}
            />
            <TextField
              placeholder="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              InputProps={{
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon color="primary" /></InputAdornment>,
                sx: { borderRadius: 4, height: 56, bgcolor: alpha(theme.palette.background.default, 0.3) }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 4,
                py: 2,
                borderRadius: 4,
                fontWeight: 800,
                fontSize: '1rem',
                textTransform: 'none',
                /* Multi-color Button Gradient */
                background: isDark 
                    ? `linear-gradient(90deg, #00f2ff, #7000ff)`
                    : `linear-gradient(90deg, #1f2937, #000)`,
                boxShadow: isDark ? `0 10px 30px ${alpha('#00f2ff', 0.3)}` : "none",
                transition: 'all 0.4s ease',
                '&:hover': { 
                  transform: 'scale(1.03)', 
                  boxShadow: isDark ? `0 15px 40px ${alpha('#00f2ff', 0.5)}` : "0 10px 20px rgba(0,0,0,0.2)"
                }
              }}
            >
              Get Started
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center' }}>
            <Typography variant="body2" sx={{ color: theme.palette.text.secondary, fontWeight: 600 }}>
              Already a member?{" "}
              <Link to="/login" style={{ color: theme.palette.primary.main, textDecoration: 'none', borderBottom: `2px solid ${alpha(theme.palette.primary.main, 0.3)}` }}>
                Login here
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Signup

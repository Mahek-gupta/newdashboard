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
  .cloud { position: absolute; pointer-events: none; z-index: 1; }
  .cloud-left { animation: float-left 45s infinite linear; }
  .cloud-right { animation: float-right 50s infinite linear; }
  .cloud-shape {
    width: 120px;
    height: 50px;
    background: ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.8)'};
    border-radius: 50px;
    filter: blur(4px);
    position: relative;
  }
  .cloud-shape::before, .cloud-shape::after {
    content: ''; position: absolute; background: inherit; border-radius: 50%;
  }
  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }
  .form-paper { animation: slideInUp 0.6s ease-out; }
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
        /* ✅ Light mode me purana Sky Blue background wapas la diya */
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
        transition: "background 0.5s ease"
      }}
    >
      <style>{cloudStyles(theme)}</style>

      {/* Clouds Layer - Inhe zIndex 1 par rakha hai */}
      {[...Array(6)].map((_, i) => (
        <Box 
          key={i}
          className={`cloud ${i % 2 === 0 ? 'cloud-left' : 'cloud-right'}`} 
          sx={{ 
            top: `${15 * i + 10}%`, 
            animationDelay: `${i * 2}s`,
            opacity: isDark ? 0.2 : 0.8 
          }}
        >
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container 
        maxWidth="sm" 
        sx={{ 
          position: "relative", 
          zIndex: 10, // ✅ Ensure form is always on top
          display: 'flex', 
          justifyContent: 'center' 
        }}
      >
        <Paper
          elevation={isDark ? 0 : 4}
          className="form-paper"
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 4,
            borderRadius: 6,
            /* ✅ Glassmorphism effect: thoda transparent taaki background ki blue vibes aayein */
            background: isDark 
              ? alpha(theme.palette.background.paper, 0.8) 
              : alpha('#fff', 0.85),
            backdropFilter: "blur(12px)",
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
            boxShadow: isDark 
              ? "0 25px 50px rgba(0,0,0,0.5)" 
              : "0 25px 50px rgba(0,0,0,0.1)",
          }}
        >
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Box 
              sx={{ 
                width: 60, height: 60, borderRadius: '50%', 
                bgcolor: alpha(theme.palette.primary.main, 0.1),
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto', mb: 2
              }}
            >
              <PersonOutlineIcon sx={{ fontSize: 35, color: theme.palette.primary.main }} />
            </Box>
            <Typography variant="h5" fontWeight={800} sx={{ color: theme.palette.text.primary }}>
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Secure your journey with us
            </Typography>
          </Box>

          { (error || localError) && <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }}>{error || localError}</Alert> }

          <form onSubmit={handleSubmit}>
            <TextField
              placeholder="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              InputProps={{
                startAdornment: <InputAdornment position="start"><EmailOutlinedIcon fontSize="small" color="primary" /></InputAdornment>,
                sx: { borderRadius: 3 }
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
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>,
                sx: { borderRadius: 3 }
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
                startAdornment: <InputAdornment position="start"><LockOutlinedIcon fontSize="small" color="primary" /></InputAdornment>,
                sx: { borderRadius: 3 }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{
                mt: 4,
                py: 1.5,
                borderRadius: 3,
                fontWeight: 700,
                textTransform: 'none',
                fontSize: '1rem',
                boxShadow: `0 8px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                background: isDark 
                    ? `linear-gradient(45deg, ${theme.palette.primary.main}, #4338ca)`
                    : `linear-gradient(45deg, #1f2937, #000)`,
                '&:hover': {
                  transform: 'translateY(-2px)',
                  transition: 'all 0.2s'
                }
              }}
            >
              Sign Up
            </Button>
          </form>

          <Box sx={{ mt: 4, textAlign: 'center', borderTop: `1px solid ${alpha(theme.palette.divider, 0.1)}`, pt: 2 }}>
            <Typography variant="body2" color="text.secondary">
              Already have an account?{" "}
              <Link to="/login" style={{ color: theme.palette.primary.main, fontWeight: 700, textDecoration: 'none' }}>
                Login
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Signup

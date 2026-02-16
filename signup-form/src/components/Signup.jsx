import { useState } from "react"
import { useAuth } from "../store/AuthContext"
import { useNavigate, Link } from "react-router-dom"
import { useTheme } from "@mui/material/styles" // Theme use karne ke liye

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

// Cloud animation styles - Added theme support for cloud color
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

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }

  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-5px); }
    75% { transform: translateX(5px); }
  }

  .cloud { position: absolute; pointer-events: none; }
  .cloud-left { animation: float-left 45s infinite linear; }
  .cloud-right { animation: float-right 50s infinite linear; }

  .cloud-shape {
    width: 120px;
    height: 50px;
    /* ✅ Dark mode me clouds faint ho jayenge original logic se */
    background: ${theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.7)'};
    border-radius: 50px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    position: relative;
  }

  .cloud-shape::before {
    content: '';
    position: absolute;
    width: 60px;
    height: 60px;
    background: inherit;
    border-radius: 50%;
    top: -30px;
    left: 10px;
  }

  .cloud-shape::after {
    content: '';
    position: absolute;
    width: 50px;
    height: 50px;
    background: inherit;
    border-radius: 50%;
    top: -25px;
    right: 20px;
  }

  .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; }
  .form-icon { animation: fadeInScale 0.8s ease-out; transition: all 0.3s ease; }
  .form-icon:hover { animation: pulse 0.6s ease-in-out; }
  .form-title { animation: slideInUp 0.7s ease-out 0.1s both; }
  .form-subtitle { animation: slideInUp 0.7s ease-out 0.2s both; }
  .form-field { animation: slideInUp 0.7s ease-out; }
  .form-field:nth-of-type(1) { animation-delay: 0.3s; }
  .form-field:nth-of-type(2) { animation-delay: 0.4s; }
  .form-field:nth-of-type(3) { animation-delay: 0.5s; }
  .submit-button { animation: slideInUp 0.7s ease-out 0.6s both; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .submit-button:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important; }
  .submit-button:active { transform: translateY(-1px); }
  .login-link { animation: slideInUp 0.7s ease-out 0.7s both; }
  .alert-shake { animation: shake 0.5s ease-in-out; }
`

const Signup = () => {
  const { signup, error } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme() // Access current theme
  const isDark = theme.palette.mode === 'dark'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [localError, setLocalError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLocalError("")

    if (!email || !password || !confirmPassword) {
      setLocalError("All fields are required")
      return
    }
    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters")
      return
    }
    if (password !== confirmPassword) {
      setLocalError("Passwords do not match")
      return
    }

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
        px: 2,
        py: 4,
        // ✅ Background switch: Dark mode me Navy-Black, Light me SkyBlue
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease"
      }}
    >
      <style>{cloudStyles(theme)}</style>

      {/* Animated Clouds - 8 clouds as per original request */}
      {[...Array(8)].map((_, i) => (
        <Box 
          key={i}
          className={`cloud ${i % 2 === 0 ? 'cloud-left' : 'cloud-right'}`} 
          sx={{ 
            top: `${10 * i + 5}%`, 
            animationDelay: `${i * 1.5}s`,
            opacity: isDark ? 0.3 : 1 // Slightly more subtle in dark mode
          }}
        >
          <Box className="cloud-shape" />
        </Box>
      ))}

      <Container
        maxWidth="sm"
        disableGutters
        sx={{ display: "flex", justifyContent: "center", position: "relative", zIndex: 10 }}
      >
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            borderRadius: 4,
            // ✅ Dynamic Colors using Theme palette
            background: theme.palette.background.paper, 
            boxShadow: isDark 
              ? "0 20px 60px rgba(0, 0, 0, 0.4)" 
              : "0 20px 60px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease"
          }}
          className="form-paper"
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <PersonOutlineIcon 
              sx={{ fontSize: 40, color: isDark ? theme.palette.primary.main : "#1f2937" }} 
              className="form-icon" 
            />
          </Box>

          <Typography
            variant="h5"
            align="center"
            fontWeight={600}
            sx={{ mb: 1, color: theme.palette.text.primary }}
            className="form-title"
          >
            Create Account
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
            className="form-subtitle"
          >
            Join us and secure your account with a strong password
          </Typography>

          {(error || localError) && (
            <Alert severity="error" sx={{ mb: 2 }} className="alert-shake">
              {error || localError}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              placeholder="Email Address"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailOutlinedIcon fontSize="small" color={isDark ? "primary" : "inherit"} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder="Password"
              type="password"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-field"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" color={isDark ? "primary" : "inherit"} />
                  </InputAdornment>
                )
              }}
            />

            <TextField
              placeholder="Confirm Password"
              type="password"
              fullWidth
              margin="normal"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="form-field"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: isDark ? alpha('#fff', 0.05) : 'transparent',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOutlinedIcon fontSize="small" color={isDark ? "primary" : "inherit"} />
                  </InputAdornment>
                )
              }}
            />

            <Typography
              variant="body2"
              sx={{ mt: 1, mb: 3, color: "text.secondary", fontSize: "12px" }}
            >
              Password must be at least 6 characters long
            </Typography>

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
                // ✅ Dark mode me Indigo/Blue gradient, Light mode me wahi original black gradient
                background: isDark
                  ? `linear-gradient(90deg, ${theme.palette.primary.main} 0%, #4338ca 100%)`
                  : "linear-gradient(180deg, #1f2937 0%, #000 100%)",
                color: "#fff",
                textTransform: "none",
                fontWeight: 600,
                fontSize: "16px",
                "&:hover": {
                  boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)"
                },
                transition: "all 0.3s ease"
              }}
              className="submit-button"
            >
              Sign Up
            </Button>

            <Box
              sx={{
                mt: 3,
                pt: 3,
                borderTop: `1px solid ${theme.palette.divider}`,
                textAlign: "center"
              }}
              className="login-link"
            >
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Link
                  to="/login"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Login here
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  )
}

export default Signup

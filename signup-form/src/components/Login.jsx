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
import LoginIcon from "@mui/icons-material/Login"
import ForgotPassword from "./ForgotPassword"

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
    /* ✅ Dark mode me clouds thode faint ho jayenge */
    background: ${theme.palette.mode === 'dark' ? alpha('#fff', 0.1) : 'rgba(255, 255, 255, 0.7)'};
    border-radius: 50px;
    filter: drop-shadow(0 2px 8px rgba(0, 0, 0, 0.1));
    position: relative;
  }

  .cloud-shape::before, .cloud-shape::after {
    content: '';
    position: absolute;
    background: inherit;
    border-radius: 50%;
  }

  .cloud-shape::before { width: 60px; height: 60px; top: -30px; left: 10px; }
  .cloud-shape::after { width: 50px; height: 50px; top: -25px; right: 20px; }

  .form-paper { animation: slideInUp 0.6s ease-out, fadeInScale 0.6s ease-out; }
  .form-icon { animation: fadeInScale 0.8s ease-out; transition: all 0.3s ease; }
  .form-icon:hover { animation: pulse 0.6s ease-in-out; }
  .form-title { animation: slideInUp 0.7s ease-out 0.1s both; }
  .form-subtitle { animation: slideInUp 0.7s ease-out 0.2s both; }
  .form-field { animation: slideInUp 0.7s ease-out; }
  .form-field:nth-of-type(1) { animation-delay: 0.3s; }
  .form-field:nth-of-type(2) { animation-delay: 0.4s; }
  .submit-button { animation: slideInUp 0.7s ease-out 0.6s both; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
  .submit-button:hover { transform: translateY(-3px); box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3) !important; }
  .submit-button:active { transform: translateY(-1px); }
  .login-link { animation: slideInUp 0.7s ease-out 0.7s both; }
  .alert-shake { animation: shake 0.5s ease-in-out; }
`

const Login = () => {
  const { login, error } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme()
  const isDark = theme.palette.mode === 'dark'

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    const success = await login(email, password)
    if (success) navigate("/dashboard")
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
        py: 4, // ✅ Aapka original padding-top aur bottom
        // ✅ Background switch: Dark mode me Navy/Black, Light me SkyBlue
        background: isDark 
          ? `linear-gradient(180deg, ${theme.palette.background.default} 0%, #000 100%)`
          : "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s ease"
      }}
    >
      <style>{cloudStyles(theme)}</style>

      {/* Animated Clouds - Original code as requested */}
      <Box className="cloud cloud-left" sx={{ top: "5%", animationDelay: "0s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-right" sx={{ top: "15%", animationDelay: "3s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-left" sx={{ top: "25%", animationDelay: "6s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-right" sx={{ top: "35%", animationDelay: "9s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-left" sx={{ top: "45%", animationDelay: "2s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-right" sx={{ top: "55%", animationDelay: "5s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-left" sx={{ top: "65%", animationDelay: "8s" }}><Box className="cloud-shape" /></Box>
      <Box className="cloud cloud-right" sx={{ top: "75%", animationDelay: "1s" }}><Box className="cloud-shape" /></Box>

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
            // ✅ Dynamic Colors based on Mode
            background: theme.palette.background.paper, 
            boxShadow: isDark 
              ? "0 20px 60px rgba(0, 0, 0, 0.5)" 
              : "0 20px 60px rgba(0, 0, 0, 0.15)",
            transition: "background 0.3s ease"
          }}
          className="form-paper"
        >
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <LoginIcon 
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
            Welcome Back
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            sx={{ mb: 3 }}
            className="form-subtitle"
          >
            Sign in to your account to continue
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }} className="alert-shake">
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              placeholder="Email Address"
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-field"
              sx={{
                "& .MuiOutlinedInput-root": {
                  // Dark mode me inputs thode dark rahenge
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

            <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1, mb: 2 }}>
              <Typography
                variant="body2"
                sx={{
                  cursor: "pointer",
                  color: theme.palette.primary.main, // Automatically uses context color
                  fontWeight: 600,
                  "&:hover": { textDecoration: "underline" },
                  transition: "all 0.2s"
                }}
                onClick={() => setForgotPasswordOpen(true)}
              >
                Forgot password?
              </Typography>
            </Box>

            <Button
              type="submit"
              fullWidth
              sx={{
                mt: 2,
                py: 1.2,
                borderRadius: 2,
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
              Sign In
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
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  style={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Create account
                </Link>
              </Typography>
            </Box>
          </Box>
        </Paper>
      </Container>

      <ForgotPassword
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
    </Box>
  )
}

export default Login

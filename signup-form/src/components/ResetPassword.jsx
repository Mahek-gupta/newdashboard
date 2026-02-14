import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
  CircularProgress,
  InputAdornment
} from "@mui/material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import axios from "axios"

const ResetPassword = () => {
  const { token } = useParams()
  const navigate = useNavigate()

  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    // Validation
    if (!newPassword || !confirmPassword) {
      setError("Both fields are required")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters long")
      return
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "https://newdashboard-90o4.onrender.com"}/api/auth/reset-password`,
        {
          token,
          newPassword
        }
      )

      setSuccess(true)
      setNewPassword("")
      setConfirmPassword("")

      // Redirect to login after 2 seconds
      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to reset password. Please try again."
      )
    } finally {
      setLoading(false)
    }
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
        background: "linear-gradient(180deg, #cfe9f9 0%, #eef6fb 100%)"
      }}
    >
      <Container maxWidth="sm" disableGutters>
        <Paper
          elevation={6}
          sx={{
            width: "100%",
            maxWidth: 420,
            p: { xs: 3, sm: 4 },
            borderRadius: 4
          }}
        >
          <Typography variant="h5" align="center" fontWeight={600} sx={{ mb: 2 }}>
            Reset Your Password
          </Typography>

          {success ? (
            <Alert severity="success" sx={{ mt: 2 }}>
              Password reset successfully! Redirecting to login...
            </Alert>
          ) : (
            <>
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Box component="form" onSubmit={handleSubmit}>
                <TextField
                  fullWidth
                  label="New Password"
                  type="password"
                  placeholder="At least 6 characters"
                  margin="normal"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />

                <TextField
                  fullWidth
                  label="Confirm Password"
                  type="password"
                  placeholder="Confirm your password"
                  margin="normal"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={loading}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockOutlinedIcon fontSize="small" />
                      </InputAdornment>
                    )
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{
                    mt: 3,
                    py: 1.2,
                    borderRadius: 2,
                    background: "linear-gradient(180deg, #1f2937 0%, #000 100%)",
                    textTransform: "none",
                    fontWeight: 600,
                    "&:hover": {
                      background: "linear-gradient(180deg, #111827 0%, #000 100%)"
                    }
                  }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={20} /> : "Reset Password"}
                </Button>
              </Box>
            </>
          )}
        </Paper>
      </Container>
    </Box>
  )
}

export default ResetPassword

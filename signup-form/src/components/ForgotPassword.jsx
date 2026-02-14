import { useState } from "react"
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography,
  Box
} from "@mui/material"
import axios from "axios"

const ForgotPassword = ({ open, onClose }) => {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const handleSubmit = async () => {
    setError("")
    setSuccess(false)

    if (!email.trim()) {
      setError("Please enter your email address")
      return
    }

    setLoading(true)

    try {
      // Call backend API to send password reset email
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL || "https://newdashboard-90o4.onrender.com"}/api/auth/forgot-password`,
        { email }
      )

      setSuccess(true)
      setEmail("")
      
      // Close dialog after 2 seconds
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 2000)
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to send reset email. Please try again."
      )
    } finally {
      setLoading(false)
    }
  }

  const handleClose = () => {
    if (!loading) {
      setEmail("")
      setError("")
      setSuccess(false)
      onClose()
    }
  }

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Reset Your Password</DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {success ? (
          <Alert severity="success">
            If an account exists with this email, you'll receive a password reset link shortly.
          </Alert>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enter your email address and we'll send you a link to reset your password.
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
              onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
              sx={{ mt: 1 }}
            />
          </>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose} disabled={loading}>
          {success ? "Close" : "Cancel"}
        </Button>
        {!success && (
          <Button
            onClick={handleSubmit}
            variant="contained"
            disabled={loading || !email.trim()}
          >
            {loading ? <CircularProgress size={20} /> : "Send Reset Link"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ForgotPassword





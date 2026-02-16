
import { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert,
  CircularProgress,
  Typography
} from "@mui/material";
import api from "../api/axios"; 

const ForgotPassword = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async () => {
    setError("");
    setSuccess(false);

    if (!email.trim()) {
      setError("Please enter your email address");
      return;
    }

    setLoading(true);

    try {
      // ✅ Correct endpoint use ho raha hai aur credential automatic handle honge
      await api.post("/auth/forgot-password", { email });
      setSuccess(true);
      setEmail("");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to send reset email.");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setEmail("");
      setError("");
      setSuccess(false);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle sx={{ fontWeight: "bold" }}>Reset Your Password</DialogTitle>
      <DialogContent sx={{ pt: 1 }}>
        {success ? (
          <Alert severity="success" sx={{ mt: 1 }}>
            Reset link sent! Please check your email inbox.
          </Alert>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
              Enter your registered email address and we'll send a link to reset your password.
            </Typography>
            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            <TextField
              fullWidth label="Email Address" type="email"
              value={email} onChange={(e) => setEmail(e.target.value)}
              disabled={loading} autoFocus
            />
          </>
        )}
      </DialogContent>
      <DialogActions sx={{ p: 3 }}>
        <Button onClick={handleClose} disabled={loading} color="inherit">
          {success ? "Close" : "Cancel"}
        </Button>
        {!success && (
          <Button onClick={handleSubmit} variant="contained" disabled={loading || !email.trim()}>
            {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;

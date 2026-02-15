// import { useState } from "react"
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   Typography,
//   Box
// } from "@mui/material"
// import axios from "axios"

// const ForgotPassword = ({ open, onClose }) => {
//   const [email, setEmail] = useState("")
//   const [loading, setLoading] = useState(false)
//   const [error, setError] = useState("")
//   const [success, setSuccess] = useState(false)

//   const handleSubmit = async () => {
//     setError("")
//     setSuccess(false)

//     if (!email.trim()) {
//       setError("Please enter your email address")
//       return
//     }

//     setLoading(true)

//     try {
//       // Call backend API to send password reset email
//       const response = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL || "https://newdashboard-90o4.onrender.com"}/api/auth/forgot-password`,
//         { email }
//       )

//       setSuccess(true)
//       setEmail("")
      
//       // Close dialog after 2 seconds
//       setTimeout(() => {
//         onClose()
//         setSuccess(false)
//       }, 2000)
//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Failed to send reset email. Please try again."
//       )
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleClose = () => {
//     if (!loading) {
//       setEmail("")
//       setError("")
//       setSuccess(false)
//       onClose()
//     }
//   }

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle>Reset Your Password</DialogTitle>

//       <DialogContent sx={{ pt: 2 }}>
//         {success ? (
//           <Alert severity="success">
//             If an account exists with this email, you'll receive a password reset link shortly.
//           </Alert>
//         ) : (
//           <>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
//               Enter your email address and we'll send you a link to reset your password.
//             </Typography>

//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <TextField
//               fullWidth
//               label="Email Address"
//               type="email"
//               placeholder="you@example.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//               onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
//               sx={{ mt: 1 }}
//             />
//           </>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 2 }}>
//         <Button onClick={handleClose} disabled={loading}>
//           {success ? "Close" : "Cancel"}
//         </Button>
//         {!success && (
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={loading || !email.trim()}
//           >
//             {loading ? <CircularProgress size={20} /> : "Send Reset Link"}
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   )
// }

// export default ForgotPassword



// import { useState } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   Button,
//   Alert,
//   CircularProgress,
//   Typography
// } from "@mui/material";
// // ✅ Hum apna custom api instance import kar rahe hain
// import api from "../api/axios"; 

// const ForgotPassword = ({ open, onClose }) => {
//   const [email, setEmail] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);

//   const handleSubmit = async () => {
//     setError("");
//     setSuccess(false);

//     // Basic Validation
//     if (!email.trim()) {
//       setError("Please enter your email address");
//       return;
//     }

//     setLoading(true);

//     try {
//       /** * ✅ Yahan api.post use karne se:
//        * 1. baseURL automatic lag jayega.
//        * 2. withCredentials: true jayega (CORS fix).
//        * 3. Interceptors 401 ko sahi se handle karenge.
//        */
//       await api.post("/auth/forgot-password", { email });

//       setSuccess(true);
//       setEmail("");
      
//       // 3 second baad dialog band ho jayega
//       setTimeout(() => {
//         handleClose();
//       }, 3000);
//     } catch (err) {
//       // Backend se jo error message aayega wahi display hoga
//       setError(
//         err.response?.data?.message || 
//         "Failed to send reset email. Please try again later."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     if (!loading) {
//       setEmail("");
//       setError("");
//       setSuccess(false);
//       onClose();
//     }
//   };

//   return (
//     <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
//       <DialogTitle sx={{ fontWeight: "bold" }}>Reset Your Password</DialogTitle>

//       <DialogContent sx={{ pt: 1 }}>
//         {success ? (
//           <Alert severity="success" sx={{ mt: 1 }}>
//             Reset link sent! If an account exists, you will receive an email shortly.
//           </Alert>
//         ) : (
//           <>
//             <Typography variant="body2" color="text.secondary" sx={{ mb: 3, mt: 1 }}>
//               Enter your registered email address below and we will send you a link to reset your password.
//             </Typography>

//             {error && (
//               <Alert severity="error" sx={{ mb: 2 }}>
//                 {error}
//               </Alert>
//             )}

//             <TextField
//               fullWidth
//               label="Email Address"
//               variant="outlined"
//               type="email"
//               placeholder="example@gmail.com"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               disabled={loading}
//               onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
//               autoFocus
//             />
//           </>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3 }}>
//         <Button 
//           onClick={handleClose} 
//           disabled={loading}
//           color="inherit"
//         >
//           {success ? "Close" : "Cancel"}
//         </Button>
        
//         {!success && (
//           <Button
//             onClick={handleSubmit}
//             variant="contained"
//             disabled={loading || !email.trim()}
//             sx={{ minWidth: 150 }}
//           >
//             {loading ? <CircularProgress size={24} color="inherit" /> : "Send Reset Link"}
//           </Button>
//         )}
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ForgotPassword;
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

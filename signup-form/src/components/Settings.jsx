// import React from 'react';
// import { Container, Paper, Typography, Box, Divider } from '@mui/material';
// import ProfilePicture from '../components/ProfilePicture';
// import { useAuth } from '../store/AuthContext';

// const Settings = () => {
//   const { user } = useAuth();

//   return (
//     <Container maxWidth="sm" sx={{ mt: 5 }}>
//       <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
//         <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
//           Account Settings
//         </Typography>
        
//         <Divider sx={{ mb: 3 }} />

//         {/* 📸 Yahan se photo change hogi */}
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
//             Profile Picture
//           </Typography>
//           <ProfilePicture />
//         </Box>

//         <Box sx={{ textAlign: 'left', mt: 2 }}>
//           <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{user?.email}</Typography>
          
//           <Typography variant="subtitle2" color="text.secondary">Account Role</Typography>
//           <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
//             {user?.role}
//           </Typography>
//         </Box>
//       </Paper>
//     </Container>
//   );
// };

// export default Settings;
import React, { useState } from 'react';
import { 
  Container, Paper, Typography, Box, Divider, TextField, 
  Button, Grid, InputAdornment, IconButton 
} from '@mui/material';
import { Visibility, VisibilityOff, Save, Lock } from '@mui/icons-material';
import ProfilePicture from '../components/ProfilePicture';
import { useAuth } from '../store/AuthContext';
import { toast } from 'react-toastify';
import api from '../api/axios';

const Settings = () => {
  const { user } = useAuth(); // Logged-in user ka data
  
  // States for Editing
  const [email, setEmail] = useState(user?.email || '');
  const [passwords, setPasswords] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  // Email Update Handler
  const handleUpdateEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.put('/auth/update-email', { email });
      toast.success("Email updated successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Email update failed");
    } finally { setLoading(false); }
  };

  // Password Update Handler
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      return toast.error("Passwords do not match!");
    }
    setLoading(true);
    try {
      await api.put('/auth/update-password', {
        currentPassword: passwords.currentPassword,
        newPassword: passwords.newPassword
      });
      toast.success("Password updated!");
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || "Current password wrong");
    } finally { setLoading(false); }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3, textAlign: 'center' }}>
          Account Settings
        </Typography>
        
        {/* 1. Profile Picture Section */}
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <ProfilePicture />
          <Typography variant="caption" display="block" sx={{ mt: 1, color: 'text.secondary' }}>
            Role: <span style={{ textTransform: 'capitalize' }}>{user?.role}</span>
          </Typography>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* 2. Email Update Form */}
        <Box component="form" onSubmit={handleUpdateEmail} sx={{ mb: 4 }}>
          <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600 }}>Update Email</Typography>
          <TextField
            fullWidth
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button type="submit" variant="contained" size="small" disabled={loading} startIcon={<Save />}>
            Save Email
          </Button>
        </Box>

        <Divider sx={{ mb: 4 }} />

        {/* 3. Password Update Form */}
        <Box component="form" onSubmit={handleUpdatePassword}>
          <Typography variant="subtitle2" sx={{ mb: 2, fontWeight: 600 }}>Change Password</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Current Password" type={showPass ? "text" : "password"} size="small"
                value={passwords.currentPassword}
                onChange={(e) => setPasswords({...passwords, currentPassword: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="New Password" type={showPass ? "text" : "password"} size="small"
                value={passwords.newPassword}
                onChange={(e) => setPasswords({...passwords, newPassword: e.target.value})}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth label="Confirm Password" type={showPass ? "text" : "password"} size="small"
                value={passwords.confirmPassword}
                onChange={(e) => setPasswords({...passwords, confirmPassword: e.target.value})}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPass(!showPass)} size="small">
                        {showPass ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="outlined" color="secondary" fullWidth disabled={loading} startIcon={<Lock />}>
                Update Password
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;

import React from 'react';
import { Container, Paper, Typography, Box, Divider } from '@mui/material';
import ProfilePicture from '../components/ProfilePicture';
import { useAuth } from '../store/AuthContext';

const Settings = () => {
  const { user } = useAuth();

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 3, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, mb: 3 }}>
          Account Settings
        </Typography>
        
        <Divider sx={{ mb: 3 }} />

        {/* 📸 Yahan se photo change hogi */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
            Profile Picture
          </Typography>
          <ProfilePicture />
        </Box>

        <Box sx={{ textAlign: 'left', mt: 2 }}>
          <Typography variant="subtitle2" color="text.secondary">Email Address</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, mb: 2 }}>{user?.email}</Typography>
          
          <Typography variant="subtitle2" color="text.secondary">Account Role</Typography>
          <Typography variant="body1" sx={{ fontWeight: 500, textTransform: 'capitalize' }}>
            {user?.role}
          </Typography>
        </Box>
      </Paper>
    </Container>
  );
};

export default Settings;

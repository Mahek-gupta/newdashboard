import React from 'react'
import { useAuth } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'
import { useTheme } from '@mui/material/styles' // Theme hook add kiya
import {
  Box,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  alpha // Sophisticated colors ke liye
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard'
import SecurityIcon from '@mui/icons-material/Security'
import PersonIcon from '@mui/icons-material/Person'
import VerifiedIcon from '@mui/icons-material/Verified'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LogoutIcon from '@mui/icons-material/Logout'

const DashBoard = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const theme = useTheme() // Theme access
  const isDark = theme.palette.mode === 'dark'

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100%",
        maxWidth: "100vw",
        overflowX: "hidden",
        px: { xs: 1, sm: 2 },
        pt: 4,
        pb: 10,
        // ✅ Dark mode ke liye background switch
        background: isDark 
          ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000000 100%)`
          : "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)",
        boxSizing: "border-box",
        transition: "background 0.3s ease"
      }}
    >
      <Container maxWidth="lg" disableGutters={false}>
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, flexWrap: "wrap" }}>
            <DashboardIcon sx={{ 
              fontSize: { xs: 28, sm: 32 }, 
              color: isDark ? theme.palette.primary.main : "#1f2937" 
            }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary, // Dynamic color
                fontSize: { xs: "1.75rem", sm: "2.125rem" }
              }}
            >
              Dashboard
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            color="text.secondary"
            sx={{ 
                wordBreak: "break-word",
                fontSize: { xs: "0.9rem", sm: "1rem" } 
            }} 
          >
            Welcome back, <strong style={{ color: isDark ? theme.palette.primary.main : 'inherit' }}>{user?.email}</strong>! 👋
          </Typography>
        </Box>

        {/* User Info Cards - Original Gradients preserved as they look good in both modes */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(102, 126, 234, 0.4)",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 50,
                      height: 50,
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      fontSize: "22px",
                      fontWeight: 700
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Status</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Active</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "#fff",
                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(245, 87, 108, 0.4)",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <SecurityIcon sx={{ fontSize: 35 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Security</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Protected</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "#fff",
                boxShadow: isDark ? "0 8px 24px rgba(0,0,0,0.5)" : "0 8px 24px rgba(79, 172, 254, 0.4)",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <VerifiedIcon sx={{ fontSize: 35 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Verification</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, fontSize: "1.1rem" }}>Verified</Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* User Details Section */}
        <Paper
          elevation={0}
          sx={{
            p: { xs: 2, sm: 3 },
            borderRadius: 3,
            // ✅ Dark mode background adjust
            background: theme.palette.background.paper, 
            border: `1px solid ${theme.palette.divider}`,
            mb: 4,
            width: "100%",
            boxSizing: "border-box",
            transition: "all 0.3s ease"
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <PersonIcon sx={{ color: isDark ? theme.palette.primary.main : "#3b82f6" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: theme.palette.text.primary, fontSize: "1.1rem" }}>
              Account Information
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}>
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ color: theme.palette.text.primary, fontWeight: 500, wordBreak: "break-all" }}>
                  {user?.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ mt: { xs: 2, sm: 0 } }}>
                <Typography variant="body2" sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}>
                  Account Type
                </Typography>
                <Chip
                  icon={user?.role === "admin" ? <AdminPanelSettingsIcon style={{color: '#fff'}} /> : <PersonIcon style={{color: '#fff'}} />}
                  label={user?.role === "admin" ? "Administrator" : "User"}
                  size="small"
                  sx={{
                    background: user?.role === "admin" ? "#f59e0b" : "#3b82f6",
                    color: "#fff",
                    fontWeight: 600
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Actions Section */}
        <Grid container spacing={2}>
          {user?.role === "admin" && (
            <Grid item xs={12} sm={6}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AdminPanelSettingsIcon />}
                onClick={() => navigate('/admin')}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: "#fbbf24",
                  color: "#000",
                  fontWeight: 600,
                  textTransform: "none",
                  "&:hover": { background: "#d97706" }
                }}
              >
                Admin Panel
              </Button>
            </Grid>
          )}

          <Grid item xs={12} sm={user?.role === "admin" ? 6 : 12}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "#ef4444",
                fontWeight: 600,
                textTransform: "none",
                "&:hover": { background: "#dc2626" }
              }}
            >
              Logout
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  )
}

export default DashBoard

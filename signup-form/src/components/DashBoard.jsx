import React from 'react'
import { useAuth } from '../store/AuthContext'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Container,
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Grid,
  Paper,
  Avatar,
  Divider,
  Chip,
  Icon
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

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <Box
      sx={{
        minHeight: "calc(100vh - 64px)",
        width: "100%",
        px: 2,
        py: 4,
        background: "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)"
      }}
    >
      <Container maxWidth="lg">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
            <DashboardIcon sx={{ fontSize: 32, color: "#1f2937" }} />
            <Typography
              variant="h4"
              sx={{
                fontWeight: 700,
                color: "#1f2937"
              }}
            >
              Dashboard
            </Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">
            Welcome back, {user?.email}! 👋
          </Typography>
        </Box>

        {/* User Info Card */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
                borderRadius: 3,
                position: "relative",
                overflow: "visible"
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      bgcolor: "rgba(255, 255, 255, 0.3)",
                      fontSize: "28px",
                      fontWeight: 700
                    }}
                  >
                    {user?.email?.charAt(0).toUpperCase()}
                  </Avatar>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Account Status
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Active
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Security Status */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(245, 87, 108, 0.4)",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <SecurityIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Security
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Protected
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Verification */}
          <Grid item xs={12} sm={6} md={4}>
            <Card
              sx={{
                background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
                color: "#fff",
                boxShadow: "0 8px 24px rgba(79, 172, 254, 0.4)",
                borderRadius: 3
              }}
            >
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                  <VerifiedIcon sx={{ fontSize: 40 }} />
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Verification
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Verified
                    </Typography>
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
            p: 3,
            borderRadius: 3,
            background: "#fff",
            border: "1px solid #e5e7eb",
            mb: 4
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 2 }}>
            <PersonIcon sx={{ color: "#3b82f6" }} />
            <Typography variant="h6" sx={{ fontWeight: 700, color: "#1f2937" }}>
              Account Information
            </Typography>
          </Box>

          <Divider sx={{ mb: 2 }} />

          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Box sx={{ pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}
                >
                  Email Address
                </Typography>
                <Typography variant="body1" sx={{ color: "#1f2937", fontWeight: 500 }}>
                  {user?.email}
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Box sx={{ pb: 2 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}
                >
                  Account Type
                </Typography>
                <Box>
                  <Chip
                    icon={user?.role === "admin" ? <AdminPanelSettingsIcon /> : <PersonIcon />}
                    label={user?.role === "admin" ? "Administrator" : "User"}
                    sx={{
                      background:
                        user?.role === "admin"
                          ? "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)"
                          : "linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)",
                      color: "#fff",
                      fontWeight: 600,
                      borderRadius: 2
                    }}
                  />
                </Box>
              </Box>
            </Grid>

            <Grid item xs={12}>
              <Box sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  sx={{ color: "text.secondary", fontWeight: 600, mb: 0.5 }}
                >
                  Member Since
                </Typography>
                <Typography variant="body1" sx={{ color: "#1f2937", fontWeight: 500 }}>
                  {new Date().toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric"
                  })}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {/* Actions Section */}
        <Grid container spacing={2}>
          {user?.role === "admin" && (
            <Grid item xs={12} sm={6} md={3}>
              <Button
                variant="contained"
                fullWidth
                startIcon={<AdminPanelSettingsIcon />}
                onClick={() => navigate('/admin')}
                sx={{
                  py: 1.5,
                  borderRadius: 2,
                  background: "linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)",
                  color: "#fff",
                  fontWeight: 600,
                  textTransform: "none",
                  fontSize: "16px",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(245, 159, 11, 0.4)",
                    transform: "translateY(-2px)"
                  },
                  transition: "all 0.3s ease"
                }}
              >
                Admin Panel
              </Button>
            </Grid>
          )}

          <Grid item xs={12} sm={6} md={user?.role === "admin" ? 3 : 6}>
            <Button
              variant="contained"
              fullWidth
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                py: 1.5,
                borderRadius: 2,
                background: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
                color: "#fff",
                fontWeight: 600,
                textTransform: "none",
                fontSize: "16px",
                "&:hover": {
                  boxShadow: "0 8px 24px rgba(239, 68, 68, 0.4)",
                  transform: "translateY(-2px)"
                },
                transition: "all 0.3s ease"
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
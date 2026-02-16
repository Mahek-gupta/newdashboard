import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/AuthContext'
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  Container,
  Menu,
  MenuItem,
  Avatar,
  Typography,
  Divider,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings'
import LoginIcon from '@mui/icons-material/Login'
import AppRegistrationIcon from '@mui/icons-material/AppRegistration'
import ThemeToggle from './ThemeToggle'

const Navbar = () => {
  const { user, logout, loading } = useAuth()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  if (loading) {
    return null
  }

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    logout()
    handleMenuClose()
    navigate('/login')
  }

  const handleNavigation = (path) => {
    navigate(path)
    setMobileOpen(false)
    handleMenuClose()
  }

  const mobileMenuItems = (
    <Box sx={{ width: 250, pt: 2 }}>
      {!user ? (
        <>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/signup')}
              sx={{
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              <AppRegistrationIcon sx={{ mr: 1 }} />
              <Typography>Sign Up</Typography>
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/login')}
              sx={{
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              <LoginIcon sx={{ mr: 1 }} />
              <Typography>Login</Typography>
            </ListItemButton>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem disablePadding>
            <ListItemButton
              onClick={() => handleNavigation('/dashboard')}
              sx={{
                '&:hover': { backgroundColor: '#f0f0f0' }
              }}
            >
              <DashboardIcon sx={{ mr: 1 }} />
              <Typography>Dashboard</Typography>
            </ListItemButton>
          </ListItem>
          {user?.role === 'admin' && (
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => handleNavigation('/admin')}
                sx={{
                  '&:hover': { backgroundColor: '#f0f0f0' }
                }}
              >
                <AdminPanelSettingsIcon sx={{ mr: 1 }} />
                <Typography>Admin Panel</Typography>
              </ListItemButton>
            </ListItem>
          )}
          <Divider sx={{ my: 1 }} />
          <ListItem disablePadding>
            <ListItemButton
              onClick={handleLogout}
              sx={{
                '&:hover': { backgroundColor: '#ffebee' }
              }}
            >
              <LogoutIcon sx={{ mr: 1, color: '#d32f2f' }} />
              <Typography sx={{ color: '#d32f2f' }}>Logout</Typography>
            </ListItemButton>
          </ListItem>
        </>
      )}
    </Box>
  )

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          background: 'linear-gradient(135deg, #1f2937 0%, #111827 100%)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              padding: '12px 0',
              minHeight: 'auto'
            }}
          >
            {/* Logo / Brand */}
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: { xs: '20px', sm: '24px' },
                background: 'linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                cursor: 'pointer',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'scale(1.05)'
                }
              }}
              onClick={() => navigate('/')}
            >
              SecureAuth
            </Typography>

// Navbar.js ke andar
<Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
   <ThemeToggle/>
   {/* Profile/Logout buttons */}
</Box>

            {/* Desktop Menu */}
            <Box
              sx={{
                display: { xs: 'none', md: 'flex' },
                gap: 2,
                alignItems: 'center'
              }}
            >
              {!user ? (
                <>
                  <Button
                    startIcon={<AppRegistrationIcon />}
                    onClick={() => navigate('/signup')}
                    sx={{
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Sign Up
                  </Button>
                  <Button
                    startIcon={<LoginIcon />}
                    onClick={() => navigate('/login')}
                    sx={{
                      backgroundColor: '#3b82f6',
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '16px',
                      fontWeight: 600,
                      px: 3,
                      borderRadius: 2,
                      '&:hover': {
                        backgroundColor: '#2563eb',
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 16px rgba(59, 130, 246, 0.4)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Login
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    startIcon={<DashboardIcon />}
                    onClick={() => navigate('/dashboard')}
                    sx={{
                      color: '#fff',
                      textTransform: 'none',
                      fontSize: '16px',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    Dashboard
                  </Button>

                  {user?.role === 'admin' && (
                    <Button
                      startIcon={<AdminPanelSettingsIcon />}
                      onClick={() => navigate('/admin')}
                      sx={{
                        color: '#fbbf24',
                        textTransform: 'none',
                        fontSize: '16px',
                        fontWeight: 600,
                        '&:hover': {
                          backgroundColor: 'rgba(251, 191, 36, 0.1)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.3s ease'
                      }}
                    >
                      Admin
                    </Button>
                  )}

                  {/* User Menu */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      ml: 2,
                      pl: 2,
                      borderLeft: '1px solid rgba(255, 255, 255, 0.1)'
                    }}
                  >
                    <Avatar
                      sx={{
                        bgcolor: '#3b82f6',
                        cursor: 'pointer',
                        fontWeight: 700,
                        width: 40,
                        height: 40,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.1)'
                        }
                      }}
                      onClick={handleMenuOpen}
                    >
                      {user?.email?.charAt(0).toUpperCase()}
                    </Avatar>
                    <Typography
                      sx={{
                        color: '#fff',
                        fontSize: '14px',
                        display: { xs: 'none', lg: 'block' }
                      }}
                    >
                      {user?.email}
                    </Typography>
                  </Box>

                  {/* Dropdown Menu */}
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      sx: {
                        mt: 1,
                        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
                        borderRadius: 2,
                        minWidth: 200
                      }
                    }}
                  >
                    <MenuItem disabled sx={{ pb: 1 }}>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {user?.email}
                      </Typography>
                    </MenuItem>
                    <Divider />
                    <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                      <LogoutIcon sx={{ mr: 1 }} />
                      Logout
                    </MenuItem>
                  </Menu>
                </>
              )}
            </Box>

            {/* Mobile Menu Icon */}
            <IconButton
              sx={{ display: { xs: 'flex', md: 'none' }, color: '#fff' }}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
      >
        {mobileMenuItems}
      </Drawer>
    </>
  )
}

export default Navbar


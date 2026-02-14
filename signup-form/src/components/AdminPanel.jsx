
import React, { useState, useEffect } from 'react';
import {
  Box, Container, Card, CardContent, Button, Typography, Grid, Paper, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, Tooltip, useMediaQuery, useTheme, Divider, 
  InputAdornment, IconButton
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../api/axios';

// Icons
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import CircleIcon from '@mui/icons-material/Circle';
import SearchIcon from '@mui/icons-material/Search';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import HistoryIcon from '@mui/icons-material/History';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await api.get('/auth/users');
      setUsers(response.data.users || response.data); 
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
    const interval = setInterval(fetchUsers, 60000);
    return () => clearInterval(interval);
  }, []);

  const isOnline = (user) => {
    if (user.status !== 'active') return false;
    const lastSeenDate = new Date(user.lastSeen || user.updatedAt);
    return (new Date() - lastSeenDate) < 15 * 60 * 1000;
  };

  const handleAddUser = async () => {
    try {
      await api.post('/auth/signup', newUser);
      toast.success("User added successfully!");
      setOpenDialog(false);
      setNewUser({ email: '', password: '', role: 'user' });
      fetchUsers();
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/auth/user/${id}`);
        toast.success("User deleted!");
        fetchUsers();
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/auth/user/${user._id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers();
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ minHeight: "calc(100vh - 64px)", width: "100%", px: 2, py: 4, background: "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)" }}>
      <Container maxWidth="xl">
        {/* Header - Original Style */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#fbbf24" }} />
            <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 700, color: "#1f2937" }}>Admin Control Center</Typography>
          </Box>
          <Typography variant="body1" color="text.secondary">Manage real-time users and system health</Typography>
        </Box>

        {/* Stats Cards - Fully Restored to Big Size */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Users</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{users.length}</Typography>
                  </Box>
                  <PeopleIcon sx={{ fontSize: 40, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)", color: "#fff", borderRadius: 2, boxShadow: "0 8px 24px rgba(245, 87, 108, 0.4)" }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>Active Users</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>{users.filter(u => isOnline(u)).length}</Typography>
                  </Box>
                  <SecurityIcon sx={{ fontSize: 40, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)", color: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>System Health</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>99.9%</Typography>
                  </Box>
                  <AnalyticsIcon sx={{ fontSize: 40, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ background: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)", color: "#fff", borderRadius: 2 }}>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <Box>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 0.5 }}>Database</Typography>
                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Live</Typography>
                  </Box>
                  <AdminPanelSettingsIcon sx={{ fontSize: 40, opacity: 0.3 }} />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper elevation={0} sx={{ background: "#fff", borderRadius: 2, border: "1px solid #e5e7eb" }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 2 }} variant={isMobile ? "fullWidth" : "standard"}>
              <Tab label="User Management" icon={<PeopleIcon />} iconPosition="start" />
              <Tab label="Security & Analytics" icon={<SecurityIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          {/* Tab 1: User Management */}
          <TabPanel value={tabValue} index={0}>
            {/* Search Bar - Balanced Size */}
            <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: 'center', px: 3, mb: 3, gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Registered Users</Typography>
              
              <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto' }}>
                <TextField
                  size="small"
                  placeholder="Search email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: isMobile ? '100%' : '250px', bgcolor: '#f9fafb' }}
                  InputProps={{
                    startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>),
                  }}
                />
                <Button 
                  variant="contained" 
                  startIcon={<AddIcon />} 
                  onClick={() => setOpenDialog(true)}
                  sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textTransform: "none", whiteSpace: 'nowrap' }}
                >
                  {isMobile ? "Add" : "Add New User"}
                </Button>
              </Box>
            </Box>

            {isMobile ? (
              <Box sx={{ px: 2, pb: 2 }}>
                {filteredUsers.map((user) => {
                  const online = isOnline(user);
                  return (
                    <Card key={user._id} sx={{ mb: 2, border: "1px solid #f0f0f0", borderRadius: 2, boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}>
                      <CardContent>
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", mb: 2 }}>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, flex: 1 }}>
                            <Avatar sx={{ bgcolor: online ? "#10b981" : "#6b7280", width: 35, height: 35 }}>{user.email[0].toUpperCase()}</Avatar>
                            <Box sx={{ overflow: 'hidden' }}>
                                <Typography variant="body2" sx={{ fontWeight: 700, wordBreak: "break-all" }}>{user.email}</Typography>
                                <Typography variant="caption" color="text.secondary">{new Date(user.createdAt).toLocaleDateString()}</Typography>
                            </Box>
                          </Box>
                          <Chip label={user.role} size="small" onClick={() => handleToggleRole(user)} color={user.role === 'admin' ? "secondary" : "default"} variant="outlined" />
                        </Box>
                        <Divider sx={{ mb: 1.5 }} />
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircleIcon sx={{ fontSize: 10, color: online ? "#10b981" : "#d1d5db" }} />
                            <Typography variant="caption" sx={{ color: online ? "#10b981" : "text.secondary", fontWeight: 600 }}>{online ? "ONLINE" : "OFFLINE"}</Typography>
                          </Box>
                          <Box>
                            <IconButton size="small" color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon fontSize="small" /></IconButton>
                            <IconButton size="small" color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon fontSize="small" /></IconButton>
                          </Box>
                        </Box>
                      </CardContent>
                    </Card>
                  );
                })}
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead sx={{ background: "#f3f4f6" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>User Info</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => {
                      const online = isOnline(user);
                      return (
                        <TableRow key={user._id} sx={{ "&:hover": { background: "#f9fafb" } }}>
                          <TableCell>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                              <Avatar sx={{ bgcolor: online ? "#10b981" : "#6b7280" }}>{user.email[0].toUpperCase()}</Avatar>
                              <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              <CircleIcon sx={{ fontSize: 12, color: online ? "#10b981" : "#d1d5db" }} />
                              <Typography variant="body2" sx={{ color: online ? "#10b981" : "text.secondary", fontWeight: 500 }}>{online ? "Online" : "Offline"}</Typography>
                            </Box>
                          </TableCell>
                          <TableCell>
                            <Chip label={user.role} size="small" sx={{ cursor: 'pointer' }} onClick={() => handleToggleRole(user)} color={user.role === 'admin' ? "secondary" : "default"} variant="outlined" />
                          </TableCell>
                          <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                          <TableCell align="right">
                            <IconButton color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon /></IconButton>
                            <IconButton color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon /></IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>

          {/* Tab 2: Security & Analytics - Added Content */}
          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 2 }}>
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f8fafc' }}>
                      <HistoryIcon color="primary" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Recent System Activity</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                       {['User login detected from Bhopal', 'Database backup completed', 'New admin role assigned', 'System firewall updated'].map((log, i) => (
                         <Box key={i} sx={{ mb: 1.5, display: 'flex', justifyContent: 'space-between' }}>
                           <Typography variant="body2" color="text.primary">• {log}</Typography>
                           <Typography variant="caption" color="text.secondary">2 mins ago</Typography>
                         </Box>
                       ))}
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Card variant="outlined" sx={{ borderRadius: 2, p: 3, textAlign: 'center', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <SecurityIcon sx={{ fontSize: 50, color: '#10b981', mb: 2, mx: 'auto' }} />
                    <Typography variant="h6">Security Protocol: Active</Typography>
                    <Typography variant="body2" color="text.secondary">All connections are encrypted with SSL/TLS 1.3</Typography>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>
      </Container>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 700 }}>Create New User</DialogTitle>
        <DialogContent>
          <TextField fullWidth label="Email Address" margin="normal" value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
          <TextField fullWidth label="Password" type="password" margin="normal" value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>Create Account</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;

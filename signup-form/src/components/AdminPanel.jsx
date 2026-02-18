import React, { useState, useEffect } from 'react';
import {
  Box, Container, Card, CardContent, Button, Typography, Grid, Paper, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, useMediaQuery, useTheme, Divider, 
  InputAdornment, IconButton, alpha, TablePagination
} from '@mui/material';
import { toast } from 'react-toastify';
import api from '../api/axios';

// Recharts for Graphics
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip } from 'recharts';

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
import DownloadIcon from '@mui/icons-material/FileDownload';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div role="tabpanel" hidden={value !== index} {...other}>
      {value === index && <Box sx={{ pt: { xs: 2, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));
  
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);

  const chartData = [
    { name: 'Mon', active: 40 }, { name: 'Tue', active: 30 },
    { name: 'Wed', active: 65 }, { name: 'Thu', active: 45 },
    { name: 'Fri', active: 90 }, { name: 'Sat', active: 70 },
    { name: 'Sun', active: 85 },
  ];

  const fetchUsers = async (currentPage = 0, currentLimit = 10) => {
    try {
      setLoading(true);
      const response = await api.get(`/auth/users?page=${currentPage + 1}&limit=${currentLimit}`);
      
      if (response.data.users) {
        setUsers(response.data.users);
        setTotalUsers(response.data.totalUsers || response.data.users.length);
      } else {
        setUsers(response.data);
        setTotalUsers(response.data.length);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(page, rowsPerPage);
    const interval = setInterval(() => fetchUsers(page, rowsPerPage), 60000);
    return () => clearInterval(interval);
  }, [page, rowsPerPage]);

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isOnline = (user) => {
    if (user.status !== 'active') return false;
    const lastSeenDate = new Date(user.lastSeen || user.updatedAt);
    return (new Date() - lastSeenDate) < 15 * 60 * 1000;
  };

  const exportToCSV = () => {
    const headers = ["Email,Role,Status,JoinedDate\n"];
    const rows = filteredUsers.map(user => 
      `${user.email},${user.role},${isOnline(user) ? 'Online' : 'Offline'},${new Date(user.createdAt).toLocaleDateString()}`
    );
    const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'users_list.csv';
    a.click();
    toast.success("CSV Downloaded!");
  };

  const handleAddUser = async () => {
    if(!newUser.email || !newUser.password) return toast.warning("Please fill all fields");
    try {
      await api.post('/auth/signup', newUser);
      toast.success("User added successfully!");
      setOpenDialog(false);
      setNewUser({ email: '', password: '', role: 'user' });
      fetchUsers(page, rowsPerPage);
    } catch (error) {
      toast.error(error.response?.data?.message || "Error adding user");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await api.delete(`/auth/user/${id}`);
        toast.success("User deleted!");
        fetchUsers(page, rowsPerPage);
      } catch (error) { toast.error("Failed to delete user"); }
    }
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/auth/user/${user._id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers(page, rowsPerPage);
    } catch (error) { toast.error("Failed to update role"); }
  };

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: "100vh", width: "100%", 
      px: { xs: 1, sm: 2 }, py: { xs: 2, sm: 4 }, 
      background: isDark 
        ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000 100%)` 
        : "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)",
      overflowX: "hidden" // ✅ Prevent side scroll
    }}>
      <Container maxWidth="xl" disableGutters={isMobile}>
        <Box sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: isMobile ? 32 : 40, color: "#fbbf24" }} />
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 800, color: theme.palette.text.primary }}>
              Admin Center
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">Real-time system management</Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4, px: { xs: 2, sm: 0 } }}>
          {[
            { label: "Total Users", val: totalUsers, icon: <PeopleIcon />, grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
            { label: "Active", val: users.filter(u => isOnline(u)).length, icon: <SecurityIcon />, grad: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
            { label: "Health", val: "99.9%", icon: <AnalyticsIcon />, grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
            { label: "DB Status", val: "Live", icon: <AdminPanelSettingsIcon />, grad: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
          ].map((item, index) => (
            <Grid item xs={6} md={3} key={index}>
              <Card sx={{ background: item.grad, color: "#fff", borderRadius: 3 }}>
                <CardContent sx={{ p: { xs: 1.5, sm: 2 }, '&:last-child': { pb: { xs: 1.5, sm: 2 } } }}>
                  <Typography variant="caption" sx={{ opacity: 0.8, display: 'block' }}>{item.label}</Typography>
                  <Typography variant={isMobile ? "h6" : "h4"} sx={{ fontWeight: 700 }}>{item.val}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={0} sx={{ 
          background: theme.palette.background.paper, borderRadius: { xs: 0, sm: 4 }, 
          border: isMobile ? 'none' : `1px solid ${theme.palette.divider}`,
          overflow: 'hidden', mx: { xs: -1, sm: 0 } 
        }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="fullWidth">
              <Tab label={isMobile ? "" : "Users"} icon={<PeopleIcon />} iconPosition="start" />
              <Tab label={isMobile ? "" : "Analytics"} icon={<SecurityIcon />} iconPosition="start" />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {/* Header Actions */}
            <Box sx={{ px: { xs: 2, sm: 3 }, mb: 3 }}>
               <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>User Management</Typography>
               <Box sx={{ 
                 display: "flex", flexOverlay: 'wrap', gap: 1, 
                 flexDirection: isMobile ? 'column' : 'row' 
               }}>
                <TextField
                  fullWidth={isMobile} size="small" placeholder="Search email..."
                  value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ maxWidth: isMobile ? '100%' : '300px' }}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button fullWidth variant="outlined" startIcon={<DownloadIcon />} onClick={exportToCSV} sx={{ textTransform: "none" }}>Export</Button>
                  <Button fullWidth variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textTransform: "none" }}>Add</Button>
                </Box>
              </Box>
            </Box>

            <TableContainer sx={{ width: '100%', overflowX: 'auto' }}>
              <Table size={isMobile ? "small" : "medium"}>
                <TableHead>
                  <TableRow sx={{ bgcolor: isDark ? alpha('#fff', 0.05) : "#f8fafc" }}>
                    <TableCell sx={{ fontWeight: 700 }}>User</TableCell>
                    {!isMobile && <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>}
                    <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user._id}>
                      <TableCell>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                          <Avatar sx={{ width: 32, height: 32, fontSize: 14, bgcolor: isOnline(user) ? "#10b981" : "#6b7280" }}>{user.email[0].toUpperCase()}</Avatar>
                          <Box>
                             <Typography variant="body2" sx={{ fontWeight: 600, fontSize: isMobile ? '0.75rem' : '0.875rem' }}>{user.email.split('@')[0]}</Typography>
                             {isMobile && <Typography variant="caption" color={isOnline(user) ? "success.main" : "text.disabled"}>{isOnline(user) ? "Online" : "Offline"}</Typography>}
                          </Box>
                        </Box>
                      </TableCell>
                      {!isMobile && (
                        <TableCell>
                          <Chip label={isOnline(user) ? "Online" : "Offline"} size="small" color={isOnline(user) ? "success" : "default"} variant="soft" />
                        </TableCell>
                      )}
                      <TableCell><Chip label={user.role} size="small" variant="outlined" /></TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon fontSize="small" /></IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon fontSize="small" /></IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[5, 10]}
              component="div"
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ borderTop: 1, borderColor: 'divider' }}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                   <Box sx={{ height: 250, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#333' : '#eee'} />
                        <XAxis dataKey="name" hide={isMobile} />
                        <YAxis hide />
                        <ChartTooltip />
                        <Area type="monotone" dataKey="active" stroke={theme.palette.primary.main} fill={alpha(theme.palette.primary.main, 0.1)} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>
      </Container>

      {/* Dialog responsive fix */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs" scroll="body">
        <DialogTitle sx={{ fontWeight: 700 }}>Add New User</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
            <TextField label="Email" fullWidth value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
            <TextField label="Password" type="password" fullWidth value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
            <TextField select label="Role" SelectProps={{ native: true }} fullWidth value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} >
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAddUser}>Create</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AdminPanel;

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
      {value === index && <Box sx={{ pt: { xs: 1, sm: 3 } }}>{children}</Box>}
    </div>
  );
}

const AdminPanel = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); // Tablet & Mobile logic
  
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

  const filteredUsers = users.filter(user => 
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading && users.length === 0) return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <CircularProgress />
    </Box>
  );

  return (
    <Box sx={{ 
      minHeight: "100vh", width: "100%", py: 4, px: { xs: 1, sm: 3 },
      background: isDark ? "#000" : "#f4f7fe",
      overflow: "hidden" // No Page Level Scroll
    }}>
      <Container maxWidth="xl">
        {/* Header Section */}
        <Box sx={{ mb: 4 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            <AdminPanelSettingsIcon sx={{ fontSize: { xs: 30, md: 40 }, color: "#fbbf24" }} />
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 800 }}>
              Admin Control Center
            </Typography>
          </Box>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {[
            { label: "Total Users", val: totalUsers, icon: <PeopleIcon />, grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
            { label: "Active Users", val: users.filter(u => isOnline(u)).length, icon: <SecurityIcon />, grad: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
            { label: "Database", val: "Live", icon: <AdminPanelSettingsIcon />, grad: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" },
            { label: "Health", val: "99%", icon: <AnalyticsIcon />, grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" }
          ].map((item, i) => (
            <Grid item xs={6} md={3} key={i}>
              <Card sx={{ background: item.grad, color: "#fff", borderRadius: 3 }}>
                <CardContent sx={{ p: { xs: 1.5, md: 2 } }}>
                  <Typography variant="caption" sx={{ opacity: 0.8 }}>{item.label}</Typography>
                  <Typography variant="h5" sx={{ fontWeight: 700 }}>{item.val}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper sx={{ borderRadius: 4, overflow: "hidden", elevation: 0, border: `1px solid ${theme.palette.divider}` }}>
          <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} variant="fullWidth">
            <Tab label="Users" icon={<PeopleIcon />} iconPosition="start" />
            <Tab label="Analytics" icon={<SecurityIcon />} iconPosition="start" />
          </Tabs>

          <TabPanel value={tabValue} index={0}>
            {/* Action Bar */}
            <Box sx={{ p: 2, display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 2, justifyContent: "space-between" }}>
              <TextField 
                size="small" 
                placeholder="Search..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{ startAdornment: <SearchIcon fontSize="small" /> }}
                sx={{ width: { xs: "100%", md: 300 } }}
              />
              <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)}>Add User</Button>
            </Box>

            {/* ✅ LOGIC: Desktop Table vs Mobile Cards */}
            {!isMobile ? (
              /* DESKTOP TABLE - No Change in UI */
              <TableContainer>
                <Table>
                  <TableHead sx={{ bgcolor: isDark ? alpha("#fff", 0.05) : "#f8f9fa" }}>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700 }}>User Info</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700 }}>Joined Date</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user._id}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                            <Avatar size="small">{user.email[0].toUpperCase()}</Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircleIcon sx={{ fontSize: 10, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
                            <Typography variant="body2">{isOnline(user) ? "Online" : "Offline"}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={user.role} size="small" /></TableCell>
                        <TableCell>
                          <Typography variant="body2" color="text.secondary">
                            <CalendarMonthIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton size="small" color="primary"><VerifiedUserIcon /></IconButton>
                          <IconButton size="small" color="error"><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              /* ✅ MOBILE CARDS - No Horizontal Scroll */
              <Box sx={{ p: 2 }}>
                {filteredUsers.map((user) => (
                  <Card key={user._id} sx={{ mb: 2, borderRadius: 2, border: `1px solid ${theme.palette.divider}` }} elevation={0}>
                    <CardContent sx={{ p: 2 }}>
                      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
                        <Box sx={{ display: "flex", gap: 1.5 }}>
                          <Avatar>{user.email[0].toUpperCase()}</Avatar>
                          <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{user.email}</Typography>
                            <Typography variant="caption" color="text.secondary">{user.role}</Typography>
                          </Box>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                           <CircleIcon sx={{ fontSize: 10, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
                           <Typography variant="caption">{isOnline(user) ? "Online" : "Offline"}</Typography>
                        </Box>
                      </Box>
                      <Divider sx={{ my: 1 }} />
                      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <Typography variant="caption" color="text.secondary">
                          Joined: {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                        <Box>
                          <IconButton size="small" color="primary"><VerifiedUserIcon fontSize="small" /></IconButton>
                          <IconButton size="small" color="error"><DeleteIcon fontSize="small" /></IconButton>
                        </Box>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            )}

            <TablePagination
              component="div"
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>System Analytics</Typography>
              <Box sx={{ height: 300, width: "100%" }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <ChartTooltip />
                    <Area type="monotone" dataKey="active" stroke="#667eea" fill={alpha("#667eea", 0.2)} />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </Box>
          </TabPanel>
        </Paper>
      </Container>
    </Paper>
  );
};

export default AdminPanel;





// import React, { useState, useEffect } from 'react';
// import {
//   Box, Container, Card, CardContent, Button, Typography, Grid, Paper, 
//   Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
//   Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   CircularProgress, useMediaQuery, useTheme, Divider, 
//   InputAdornment, IconButton, alpha, TablePagination
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import api from '../api/axios';

// import { alpha, Box, useMediaQuery, useTheme } from "@mui/material";
// import React, { useEffect, useState } from "react";

// // Recharts for Graphics
// import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip as ChartTooltip } from 'recharts';

// // Icons
// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import PeopleIcon from '@mui/icons-material/People';
// import SecurityIcon from '@mui/icons-material/Security';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import CircleIcon from '@mui/icons-material/Circle';
// import SearchIcon from '@mui/icons-material/Search';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import DownloadIcon from '@mui/icons-material/FileDownload';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div role="tabpanel" hidden={value !== index} {...other}>
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const AdminPanel = () => {
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';
  // const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
//   const [tabValue, setTabValue] = useState(0);
  // const [openDialog, setOpenDialog] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [searchTerm, setSearchTerm] = useState('');
  // const [loading, setLoading] = useState(true);
//   const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });

//   // ✅ Pagination States
  // const [page, setPage] = useState(0); // MUI TablePagination 0-based index use karta hai
  // const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [totalUsers, setTotalUsers] = useState(0);

  // // Dummy data for graph
  // const chartData = [
  //   { name: 'Mon', active: 40 }, { name: 'Tue', active: 30 },
  //   { name: 'Wed', active: 65 }, { name: 'Thu', active: 45 },
  //   { name: 'Fri', active: 90 }, { name: 'Sat', active: 70 },
  //   { name: 'Sun', active: 85 },
  // ];

  // // ✅ Updated Fetch Logic with Pagination
  // const fetchUsers = async (currentPage = 0, currentLimit = 10) => {
  //   try {
  //     setLoading(true);
  //     // Backend expects 1-based page, MUI provides 0-based
  //     const response = await api.get(`/auth/users?page=${currentPage + 1}&limit=${currentLimit}`);
      
  //     // Checking if data is paginated or simple array
  //     if (response.data.users) {
  //       setUsers(response.data.users);
  //       setTotalUsers(response.data.totalUsers || response.data.users.length);
  //     } else {
  //       setUsers(response.data);
  //       setTotalUsers(response.data.length);
  //     }
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Failed to fetch users");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchUsers(page, rowsPerPage);
  //   const interval = setInterval(() => fetchUsers(page, rowsPerPage), 60000);
  //   return () => clearInterval(interval);
  // }, [page, rowsPerPage]);

  // const handleChangePage = (event, newPage) => {
  //   setPage(newPage);
  // };

  // const handleChangeRowsPerPage = (event) => {
  //   const newLimit = parseInt(event.target.value, 10);
  //   setRowsPerPage(newLimit);
  //   setPage(0);
  // };

  // const isOnline = (user) => {
  //   if (user.status !== 'active') return false;
  //   const lastSeenDate = new Date(user.lastSeen || user.updatedAt);
  //   return (new Date() - lastSeenDate) < 15 * 60 * 1000;
  // };

  // const exportToCSV = () => {
  //   const headers = ["Email,Role,Status,JoinedDate\n"];
  //   const rows = filteredUsers.map(user => 
  //     `${user.email},${user.role},${isOnline(user) ? 'Online' : 'Offline'},${new Date(user.createdAt).toLocaleDateString()}`
  //   );
  //   const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
  //   const url = window.URL.createObjectURL(blob);
  //   const a = document.createElement('a');
  //   a.setAttribute('hidden', '');
  //   a.setAttribute('href', url);
  //   a.setAttribute('download', 'users_list.csv');
  //   document.body.appendChild(a);
  //   a.click();
  //   document.body.removeChild(a);
  //   toast.success("CSV Downloaded!");
  // };

  // const handleAddUser = async () => {
  //   if(!newUser.email || !newUser.password) {
  //       return toast.warning("Please fill all fields");
  //   }
  //   try {
  //     await api.post('/auth/signup', newUser);
  //     toast.success("User added successfully!");
  //     setOpenDialog(false);
  //     setNewUser({ email: '', password: '', role: 'user' });
  //     fetchUsers(page, rowsPerPage);
  //   } catch (error) {
  //     toast.error(error.response?.data?.message || "Error adding user");
  //   }
  // };

  // const handleDeleteUser = async (id) => {
  //   if (window.confirm("Are you sure you want to delete this user?")) {
  //     try {
  //       await api.delete(`/auth/user/${id}`);
  //       toast.success("User deleted!");
  //       fetchUsers(page, rowsPerPage);
  //     } catch (error) {
  //       toast.error("Failed to delete user");
  //     }
  //   }
  // };

  // const handleToggleRole = async (user) => {
  //   const newRole = user.role === 'admin' ? 'user' : 'admin';
  //   try {
  //     await api.put(`/auth/user/${user._id}`, { role: newRole });
  //     toast.success(`Role updated to ${newRole}`);
  //     fetchUsers(page, rowsPerPage);
  //   } catch (error) {
  //     toast.error("Failed to update role");
  //   }
  // };

  // const filteredUsers = users.filter(user => 
  //   user.email.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  // if (loading && users.length === 0) return (
  //   <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
  //     <CircularProgress />
  //   </Box>
  // );

//   return (
//     <Box sx={{ 
//       minHeight: "calc(100vh - 64px)", 
//       width: "100%", px: 2, py: 4, 
//       background: isDark 
//         ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000 100%)` 
//         : "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)",
//       transition: "background 0.3s ease"
//     }}>
//       <Container maxWidth="xl">
//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//             <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#fbbf24" }} />
//             <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
//               Admin Control Center
//             </Typography>
//           </Box>
//           <Typography variant="body1" color="text.secondary">Manage real-time users and system health</Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {[
//             { label: "Total Users", val: totalUsers, icon: <PeopleIcon />, grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
//             { label: "Active Users", val: users.filter(u => isOnline(u)).length, icon: <SecurityIcon />, grad: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
//             { label: "System Health", val: "99.9%", icon: <AnalyticsIcon />, grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
//             { label: "Database", val: "Live", icon: <AdminPanelSettingsIcon />, grad: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{ 
//                 background: item.grad, color: "#fff", borderRadius: 2,
//                 transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' }
//               }}>
//                 <CardContent>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box>
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>{item.label}</Typography>
//                       <Typography variant="h4" sx={{ fontWeight: 700 }}>{item.val}</Typography>
//                     </Box>
//                     {React.cloneElement(item.icon, { sx: { fontSize: 40, opacity: 0.3 } })}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Paper elevation={0} sx={{ 
//           background: theme.palette.background.paper, 
//           borderRadius: 2, border: `1px solid ${theme.palette.divider}`,
//           overflow: 'hidden'
//         }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 2 }} variant={isMobile ? "fullWidth" : "standard"}>
//               <Tab label="User Management" icon={<PeopleIcon />} iconPosition="start" />
//               <Tab label="Security & Analytics" icon={<SecurityIcon />} iconPosition="start" />
//             </Tabs>
//           </Box>

//           <TabPanel value={tabValue} index={0}>
//             {/* Table Header Actions */}
//             <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: 'center', px: 3, mb: 3, gap: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: 700 }}>Registered Users</Typography>
//               <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto' }}>
//                 <TextField
//                   size="small"
//                   placeholder="Search email..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   sx={{ width: isMobile ? '100%' : '250px', bgcolor: isDark ? alpha('#fff', 0.05) : '#f9fafb', borderRadius: 1 }}
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
//                 />
//                 <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportToCSV} sx={{ textTransform: "none" }}>Export</Button>
//                 <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textTransform: "none" }}>Add New</Button>
//               </Box>
//             </Box>

//             <TableContainer sx={{ maxHeight: 500 }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>User Info</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Role</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Joined Date</TableCell>
//                     <TableCell align="right" sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredUsers.map((user) => (
//                     <TableRow key={user._id} sx={{ "&:hover": { background: isDark ? alpha('#fff', 0.02) : "#f9fafb" } }}>
//                       <TableCell>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                           <Avatar sx={{ bgcolor: isOnline(user) ? "#10b981" : "#6b7280" }}>{user.email[0].toUpperCase()}</Avatar>
//                           <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <CircleIcon sx={{ fontSize: 12, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
//                           <Typography variant="body2" sx={{ color: isOnline(user) ? "#10b981" : "text.secondary" }}>{isOnline(user) ? "Online" : "Offline"}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell><Chip label={user.role} size="small" variant="outlined" sx={{ fontWeight: 600 }} /></TableCell>
//                       <TableCell>
//                         <Typography variant="body2" sx={{ color: "text.secondary", display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <CalendarMonthIcon sx={{ fontSize: 16 }} />
//                           {new Date(user.createdAt).toLocaleDateString()}
//                         </Typography>
//                       </TableCell>
//                       <TableCell align="right">
//                         <IconButton color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon /></IconButton>
//                         <IconButton color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon /></IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* ✅ Beautiful Pagination Integrated into the Footer */}
//             <Divider />
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={totalUsers}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               sx={{ bgcolor: isDark ? alpha('#fff', 0.02) : '#fff' }}
//             />
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <Box sx={{ p: 3 }}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'transparent' }}>
//                     <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: isDark ? alpha('#fff', 0.05) : '#f8fafc' }}>
//                       <AnalyticsIcon color="primary" />
//                       <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Real-time Traffic Activity</Typography>
//                     </Box>
//                     <Divider />
//                     <Box sx={{ p: 2, height: 300 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart data={chartData}>
//                           <defs>
//                             <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
//                               <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#eee'} />
//                           <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
//                           <YAxis stroke={theme.palette.text.secondary} />
//                           <ChartTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: '8px' }} />
//                           <Area type="monotone" dataKey="active" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorActive)" />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Card variant="outlined" sx={{ borderRadius: 2, p: 3, height: '100%', bgcolor: 'transparent' }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>System Security</Typography>
//                     <Box sx={{ textAlign: 'center', py: 2 }}>
//                         <SecurityIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
//                         <Typography variant="h6">Firewall Active</Typography>
//                         <Typography variant="body2" color="text.secondary">All requests monitored.</Typography>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Box>
//           </TabPanel>
//         </Paper>
//       </Container>

//       {/* Add User Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: 700 }}>Add New User</DialogTitle>
//         <DialogContent dividers>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
//             <TextField label="Email" fullWidth value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
//             <TextField label="Password" type="password" fullWidth value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
//             <TextField select label="Role" SelectProps={{ native: true }} fullWidth value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//             </TextField>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddUser} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>Create User</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default AdminPanel;
// import {
//   Container, Card, CardContent, Button, Typography, Grid, Paper, 
//   Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
//   Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
//   CircularProgress,   Divider, 
//   InputAdornment, IconButton,  TablePagination
// } from '@mui/material';
// import { toast } from 'react-toastify';
// import api from "../api/axios";

// import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
// import PeopleIcon from '@mui/icons-material/People';
// import SecurityIcon from '@mui/icons-material/Security';
// import AnalyticsIcon from '@mui/icons-material/Analytics';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddIcon from '@mui/icons-material/Add';
// import CircleIcon from '@mui/icons-material/Circle';
// import SearchIcon from '@mui/icons-material/Search';
// import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
// import DownloadIcon from '@mui/icons-material/FileDownload';
// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import { 
//   ResponsiveContainer, 
//   AreaChart, 
//   Area, 
//   XAxis, 
//   YAxis, 
//   CartesianGrid, 
//   Tooltip as ChartTooltip 
// } from 'recharts';
// function TabPanel(props) {
//   const { children, value, index, ...other } = props;
//   return (
//     <div role="tabpanel" hidden={value !== index} {...other}>
//       {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
//     </div>
//   );
// }

// const AdminPanel = ()=>{
//   const theme = useTheme();
//   const isDark = theme.palette.mode === 'dark';
//  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const [totalUsers, setTotalUsers] = useState(0);
//     const [users, setUsers] = useState([]);
//     const [tabValue, setTabValue] = useState(0);
//     const [searchTerm, setSearchTerm] = useState('');
//       const [openDialog, setOpenDialog] = useState(false);
//         const [loading, setLoading] = useState(true);
//           const [page, setPage] = useState(0); // MUI TablePagination 0-based index use karta hai
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });
   
//  // Dummy data for graph
//   const chartData = [
//     { name: 'Mon', active: 40 }, { name: 'Tue', active: 30 },
//     { name: 'Wed', active: 65 }, { name: 'Thu', active: 45 },
//     { name: 'Fri', active: 90 }, { name: 'Sat', active: 70 },
//     { name: 'Sun', active: 85 },
//   ];


// const handleChangeRowsPerPage = (event) => {
//     const newLimit = parseInt(event.target.value, 10);
//     setRowsPerPage(newLimit);
//     setPage(0);
//     // 3. 🔥 API ko call karo naye limit ke saath
//   // Hum 0 bhej rahe hain kyunki humne page ko 0 set kiya hai
//   // fetchUsers(0, newLimit);
//   };

// const handleChangePage = (event, newPage) => {
//   // 1. State update karo (UI badalne ke liye)
//   setPage(newPage); 
  
//   // 2. API call karo (Naya data lane ke liye)
//   // Hum 'newPage' direct bhej rahe hain kyunki state update hone mein thoda waqt leti hai
//   // fetchUsers(newPage, rowsPerPage); 
// };

//   const fetchUsers = async (currentPage = 0, currentLimit = 10) => {
//     try {
//       setLoading(true);
//       // Backend expects 1-based page, MUI provides 0-based
//       const response = await api.get(`/auth/users?page=${currentPage + 1}&limit=${currentLimit}`);
//       console.log(response)
//       // Checking if data is paginated or simple array
//       if (response.data.users) {
//         setUsers(response.data.users);
//         setTotalUsers(response.data.totalUsers || response.data.users.length);
//       } else {
//         setUsers(response.data);
//         setTotalUsers(response.data.length);
//       }
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Failed to fetch users");
//     } finally {
//       setLoading(false);
//     }
//   };

//    useEffect(() => {
//     fetchUsers(page, rowsPerPage);
//     const interval = setInterval(() => fetchUsers(page, rowsPerPage), 60000);
//     return () => clearInterval(interval);
//   }, [page, rowsPerPage]);
 
//   const exportToCSV = () => {
//     const headers = ["Email,Role,Status,JoinedDate\n"];
//     const rows = filteredUsers.map(user => 
//       `${user.email},${user.role},${isOnline(user) ? 'Online' : 'Offline'},${new Date(user.createdAt).toLocaleDateString()}`
//     );
//     const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
//     const url = window.URL.createObjectURL(blob);
//     const a = document.createElement('a');
//     a.setAttribute('hidden', '');
//     a.setAttribute('href', url);
//     a.setAttribute('download', 'users_list.csv');
//     document.body.appendChild(a);
//     a.click();
//     document.body.removeChild(a);
//     toast.success("CSV Downloaded!");
//   };

//   const handleAddUser = async () => {
//     if(!newUser.email || !newUser.password) {
//         return toast.warning("Please fill all fields");
//     }
//     try {
//       await api.post('/auth/signup', newUser);
//       toast.success("User added successfully!");
//       setOpenDialog(false);
//       setNewUser({ email: '', password: '', role: 'user' });
//       fetchUsers(page, rowsPerPage);
//     } catch (error) {
//       toast.error(error.response?.data?.message || "Error adding user");
//     }
//   };



//       const isOnline = (user) => {
//     if (user.status !== 'active') return false;
//     const lastSeenDate = new Date(user.lastSeen || user.updatedAt);
//     return (new Date() - lastSeenDate) < 15 * 60 * 1000;
//   };

//   const handleToggleRole = async (user) => {
//     const newRole = user.role === 'admin' ? 'user' : 'admin';
//     try {
//       await api.put(`/auth/user/${user._id}`, { role: newRole });
//       toast.success(`Role updated to ${newRole}`);
//       fetchUsers(page, rowsPerPage);
//     } catch (error) {
//       toast.error("Failed to update role");
//     }
//   };
//   const handleDeleteUser = async (id) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await api.delete(`/auth/user/${id}`);
//         toast.success("User deleted!");
//         fetchUsers(page, rowsPerPage);
//       } catch (error) {
//         toast.error("Failed to delete user");
//       }
//     }
//   };
//    const filteredUsers = users.filter(user => 
//     user.email.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   if (loading && users.length === 0) return (
//     <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', bgcolor: 'background.default' }}>
//       <CircularProgress />
//     </Box>
//   );

//   return (
//     <Box sx={{ 
//       minHeight: "calc(100vh - 64px)", 
//       width: "100%", px: 2, py: 4, 
//       background: isDark 
//         ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000 100%)` 
//         : "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)",
//       transition: "background 0.3s ease"
//     }}>
//       <Container maxWidth="xl">
//         <Box sx={{ mb: 4 }}>
//           <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
//             <AdminPanelSettingsIcon sx={{ fontSize: 40, color: "#fbbf24" }} />
//             <Typography variant={isMobile ? "h4" : "h3"} sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
//               Admin Control Center
//             </Typography>
//           </Box>
//           <Typography variant="body1" color="text.secondary">Manage real-time users and system health</Typography>
//         </Box>

//         {/* Stats Grid */}
//         <Grid container spacing={3} sx={{ mb: 4 }}>
//           {[
//             { label: "Total Users", val: totalUsers, icon: <PeopleIcon />, grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
//             { label: "Active Users", val: users.filter(u => isOnline(u)).length, icon: <SecurityIcon />, grad: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
//             { label: "System Health", val: "99.9%", icon: <AnalyticsIcon />, grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
//             { label: "Database", val: "Live", icon: <AdminPanelSettingsIcon />, grad: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
//           ].map((item, index) => (
//             <Grid item xs={12} sm={6} md={3} key={index}>
//               <Card sx={{ 
//                 background: item.grad, color: "#fff", borderRadius: 2,
//                 transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' }
//               }}>
//                 <CardContent>
//                   <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//                     <Box>
//                       <Typography variant="body2" sx={{ opacity: 0.9 }}>{item.label}</Typography>
//                       <Typography variant="h4" sx={{ fontWeight: 700 }}>{item.val}</Typography>
//                     </Box>
//                     {React.cloneElement(item.icon, { sx: { fontSize: 40, opacity: 0.3 } })}
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>

//         <Paper elevation={0} sx={{ 
//           background: theme.palette.background.paper, 
//           borderRadius: 2, border: `1px solid ${theme.palette.divider}`,
//           overflow: 'hidden'
//         }}>
//           <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
//             <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 2 }} variant={isMobile ? "fullWidth" : "standard"}>
//               <Tab label="User Management" icon={<PeopleIcon />} iconPosition="start" />
//               <Tab label="Security & Analytics" icon={<SecurityIcon />} iconPosition="start" />
//             </Tabs>
//           </Box>

//           <TabPanel value={tabValue} index={0}>
//             {/* Table Header Actions */}
//             <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: 'center', px: 3, mb: 3, gap: 2 }}>
//               <Typography variant="h6" sx={{ fontWeight: 700 }}>Registered Users</Typography>
//               <Box sx={{ display: 'flex', gap: 2, width: isMobile ? '100%' : 'auto' }}>
//                 <TextField
//                   size="small"
//                   placeholder="Search email..."
//                   value={searchTerm}
//                   onChange={(e) => setSearchTerm(e.target.value)}
//                   sx={{ width: isMobile ? '100%' : '250px', bgcolor: isDark ? alpha('#fff', 0.05) : '#f9fafb', borderRadius: 1 }}
//                   InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
//                 />
//                 <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportToCSV} sx={{ textTransform: "none" }}>Export</Button>
//                 <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textTransform: "none" }}>Add New</Button>
//               </Box>
//             </Box>

//             <TableContainer sx={{ maxHeight: 500 }}>
//               <Table stickyHeader>
//                 <TableHead>
//                   <TableRow>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>User Info</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Status</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Role</TableCell>
//                     <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Joined Date</TableCell>
//                     <TableCell align="right" sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Actions</TableCell>
//                   </TableRow>
//                 </TableHead>
//                 <TableBody>
//                   {filteredUsers.map((user) => (
//                     <TableRow key={user._id} sx={{ "&:hover": { background: isDark ? alpha('#fff', 0.02) : "#f9fafb" } }}>
//                       <TableCell>
//                         <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
//                           <Avatar sx={{ bgcolor: isOnline(user) ? "#10b981" : "#6b7280" }}>{user.email[0].toUpperCase()}</Avatar>
//                           <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell>
//                         <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <CircleIcon sx={{ fontSize: 12, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
//                           <Typography variant="body2" sx={{ color: isOnline(user) ? "#10b981" : "text.secondary" }}>{isOnline(user) ? "Online" : "Offline"}</Typography>
//                         </Box>
//                       </TableCell>
//                       <TableCell><Chip label={user.role} size="small" variant="outlined" sx={{ fontWeight: 600 }} /></TableCell>
//                       <TableCell>
//                         <Typography variant="body2" sx={{ color: "text.secondary", display: 'flex', alignItems: 'center', gap: 1 }}>
//                           <CalendarMonthIcon sx={{ fontSize: 16 }} />
//                           {new Date(user.createdAt).toLocaleDateString()}
//                         </Typography>
//                       </TableCell>
//                       <TableCell align="right">
//                         <IconButton color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon /></IconButton>
//                         <IconButton color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon /></IconButton>
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>
//             </TableContainer>

//             {/* ✅ Beautiful Pagination Integrated into the Footer */}
//             <Divider />
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={totalUsers}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               sx={{ bgcolor: isDark ? alpha('#fff', 0.02) : '#fff' }}
//             />
//           </TabPanel>

//           <TabPanel value={tabValue} index={1}>
//             <Box sx={{ p: 3 }}>
//               <Grid container spacing={3}>
//                 <Grid item xs={12} md={8}>
//                   <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'transparent' }}>
//                     <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: isDark ? alpha('#fff', 0.05) : '#f8fafc' }}>
//                       <AnalyticsIcon color="primary" />
//                       <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Real-time Traffic Activity</Typography>
//                     </Box>
//                     <Divider />
//                     <Box sx={{ p: 2, height: 300 }}>
//                       <ResponsiveContainer width="100%" height="100%">
//                         <AreaChart data={chartData}>
//                           <defs>
//                             <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
//                               <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
//                               <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
//                             </linearGradient>
//                           </defs>
//                           <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#eee'} />
//                           <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
//                           <YAxis stroke={theme.palette.text.secondary} />
//                           <ChartTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: '8px' }} />
//                           <Area type="monotone" dataKey="active" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorActive)" />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </Box>
//                   </Card>
//                 </Grid>
//                 <Grid item xs={12} md={4}>
//                   <Card variant="outlined" sx={{ borderRadius: 2, p: 3, height: '100%', bgcolor: 'transparent' }}>
//                     <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>System Security</Typography>
//                     <Box sx={{ textAlign: 'center', py: 2 }}>
//                         <SecurityIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
//                         <Typography variant="h6">Firewall Active</Typography>
//                         <Typography variant="body2" color="text.secondary">All requests monitored.</Typography>
//                     </Box>
//                   </Card>
//                 </Grid>
//               </Grid>
//             </Box>
//           </TabPanel>
//         </Paper>
//       </Container>

//       {/* Add User Dialog */}
//       <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
//         <DialogTitle sx={{ fontWeight: 700 }}>Add New User</DialogTitle>
//         <DialogContent dividers>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
//             <TextField label="Email" fullWidth value={newUser.email} onChange={(e) => setNewUser({...newUser, email: e.target.value})} />
//             <TextField label="Password" type="password" fullWidth value={newUser.password} onChange={(e) => setNewUser({...newUser, password: e.target.value})} />
//             <TextField select label="Role" SelectProps={{ native: true }} fullWidth value={newUser.role} onChange={(e) => setNewUser({...newUser, role: e.target.value})} >
//                 <option value="user">User</option>
//                 <option value="admin">Admin</option>
//             </TextField>
//           </Box>
//         </DialogContent>
//         <DialogActions sx={{ p: 2 }}>
//           <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
//           <Button variant="contained" onClick={handleAddUser} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>Create User</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// }

// export default AdminPanel






// import  { useState, useEffect } from "react";
import { alpha, Box, useMediaQuery, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  Container, Card, CardContent, Button, Typography, Grid, Paper, 
  Tabs, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, 
  Chip, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField,
  CircularProgress, Divider, InputAdornment, IconButton, TablePagination
} from '@mui/material';
// import {  alpha } from '@mui/material/styles';
// import useMediaQuery from '@mui/material/useMediaQuery';
import { toast } from 'react-toastify';
import api from "../api/axios";

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
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip 
} from 'recharts';

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
  const isDark = theme.palette.mode === 'dark';
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  
  const [totalUsers, setTotalUsers] = useState(0);
  const [users, setUsers] = useState([]);
  const [tabValue, setTabValue] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0); 
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [newUser, setNewUser] = useState({ email: '', password: '', role: 'user' });
   
  const chartData = [
    { name: 'Mon', active: 40 }, { name: 'Tue', active: 30 },
    { name: 'Wed', active: 65 }, { name: 'Thu', active: 45 },
    { name: 'Fri', active: 90 }, { name: 'Sat', active: 70 },
    { name: 'Sun', active: 85 },
  ];

  const handleChangeRowsPerPage = (event) => {
    const newLimit = parseInt(event.target.value, 10);
    setRowsPerPage(newLimit);
    setPage(0);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
  };

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
 
  const exportToCSV = () => {
    const headers = ["Email,Role,Status,JoinedDate\n"];
    const rows = filteredUsers.map(user => 
      `${user.email},${user.role},${isOnline(user) ? 'Online' : 'Offline'},${new Date(user.createdAt).toLocaleDateString()}`
    );
    const blob = new Blob([headers + rows.join("\n")], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'users_list.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    toast.success("CSV Downloaded!");
  };

  const handleAddUser = async () => {
    if(!newUser.email || !newUser.password) {
        return toast.warning("Please fill all fields");
    }
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

  const isOnline = (user) => {
    if (user.status !== 'active') return false;
    const lastSeenDate = new Date(user.lastSeen || user.updatedAt);
    return (new Date() - lastSeenDate) < 15 * 60 * 1000;
  };

  const handleToggleRole = async (user) => {
    const newRole = user.role === 'admin' ? 'user' : 'admin';
    try {
      await api.put(`/auth/user/${user._id}`, { role: newRole });
      toast.success(`Role updated to ${newRole}`);
      fetchUsers(page, rowsPerPage);
    } catch (error) {
      toast.error("Failed to update role");
    }
  };

  const handleDeleteUser = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await api.delete(`/auth/user/${id}`);
        toast.success("User deleted!");
        fetchUsers(page, rowsPerPage);
      } catch (error) {
        toast.error("Failed to delete user");
      }
    }
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
      minHeight: "calc(100vh - 64px)", 
      width: "100%", px: { xs: 1, sm: 2 }, py: 4, 
      background: isDark 
        ? `linear-gradient(135deg, ${theme.palette.background.default} 0%, #000 100%)` 
        : "linear-gradient(135deg, #f0f4f8 0%, #e8ecf1 100%)",
      transition: "background 0.3s ease"
    }}>
      <Container maxWidth="xl" disableGutters={isMobile}>
        <Box sx={{ mb: 4, px: isMobile ? 2 : 0 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1, flexWrap: "wrap" }}>
            <AdminPanelSettingsIcon sx={{ fontSize: { xs: 32, sm: 40 }, color: "#fbbf24" }} />
            <Typography variant={isMobile ? "h5" : "h3"} sx={{ fontWeight: 700, color: theme.palette.text.primary }}>
              Admin Control Center
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">Manage real-time users and system health</Typography>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={isMobile ? 2 : 3} sx={{ mb: 4, px: isMobile ? 2 : 0 }}>
          {[
            { label: "Total Users", val: totalUsers, icon: <PeopleIcon />, grad: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
            { label: "Active Users", val: users.filter(u => isOnline(u)).length, icon: <SecurityIcon />, grad: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)" },
            { label: "System Health", val: "99.9%", icon: <AnalyticsIcon />, grad: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)" },
            { label: "Database", val: "Live", icon: <AdminPanelSettingsIcon />, grad: "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)" }
          ].map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card sx={{ 
                background: item.grad, color: "#fff", borderRadius: 2,
                transition: 'transform 0.3s ease', '&:hover': { transform: 'translateY(-5px)' }
              }}>
                <CardContent>
                  <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <Box>
                      <Typography variant="body2" sx={{ opacity: 0.9 }}>{item.label}</Typography>
                      <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '1.75rem', sm: '2.125rem' } }}>{item.val}</Typography>
                    </Box>
                    {React.cloneElement(item.icon, { sx: { fontSize: 40, opacity: 0.3 } })}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={0} sx={{ 
          background: theme.palette.background.paper, 
          borderRadius: isMobile ? 0 : 2, border: `1px solid ${theme.palette.divider}`,
          overflow: 'hidden'
        }}>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={tabValue} onChange={(e, v) => setTabValue(v)} sx={{ px: 2 }} variant={isMobile ? "fullWidth" : "standard"}>
              <Tab label={isMobile ? "Users" : "User Management"} icon={<PeopleIcon />} iconPosition="start" sx={{ textTransform: 'none' }} />
              <Tab label={isMobile ? "Security" : "Security & Analytics"} icon={<SecurityIcon />} iconPosition="start" sx={{ textTransform: 'none' }} />
            </Tabs>
          </Box>

          <TabPanel value={tabValue} index={0}>
            {/* Table Header Actions */}
            <Box sx={{ display: "flex", flexDirection: "column", px: 3, mb: 3, gap: 2 }}>
              <Typography variant="h6" sx={{ fontWeight: 700 }}>Registered Users</Typography>
              <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', gap: 2, width: '100%', justifyContent: 'space-between' }}>
                <TextField
                  size="small"
                  placeholder="Search email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  sx={{ width: isMobile ? '100%' : '250px', bgcolor: isDark ? alpha('#fff', 0.05) : '#f9fafb', borderRadius: 1 }}
                  InputProps={{ startAdornment: (<InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>) }}
                />
                <Box sx={{ display: 'flex', gap: 1, width: isMobile ? '100%' : 'auto' }}>
                  <Button variant="outlined" startIcon={<DownloadIcon />} onClick={exportToCSV} sx={{ textTransform: "none", flex: 1 }}>Export</Button>
                  <Button variant="contained" startIcon={<AddIcon />} onClick={() => setOpenDialog(true)} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", textTransform: "none", flex: 1, whiteSpace: 'nowrap' }}>Add New</Button>
                </Box>
              </Box>
            </Box>

            {/* Mobile View Card Grid vs Desktop Table View */}
            {isMobile ? (
              <Box sx={{ px: 2, display: 'flex', flexDirection: 'column', gap: 2, pb: 2 }}>
                {filteredUsers.map((user) => (
                  <Card key={user._id} variant="outlined" sx={{ borderRadius: 2, borderColor: theme.palette.divider }}>
                    <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                          <Avatar sx={{ bgcolor: isOnline(user) ? "#10b981" : "#6b7280", width: 36, height: 36, fontSize: '1rem' }}>
                            {user.email[0].toUpperCase()}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 600, maxWidth: '160px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {user.email}
                          </Typography>
                        </Box>
                        <Chip label={user.role} size="small" variant="outlined" sx={{ fontWeight: 600 }} />
                      </Box>
                      
                      <Divider sx={{ my: 1 }} />
                      
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CircleIcon sx={{ fontSize: 10, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
                          <Typography variant="caption" sx={{ color: isOnline(user) ? "#10b981" : "text.secondary" }}>
                            {isOnline(user) ? "Online" : "Offline"}
                          </Typography>
                        </Box>
                        <Typography variant="caption" sx={{ color: "text.secondary", display: 'flex', alignItems: 'center', gap: 0.5 }}>
                          <CalendarMonthIcon sx={{ fontSize: 14 }} />
                          {new Date(user.createdAt).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 1, pt: 1, borderTop: `1px dashed ${theme.palette.divider}` }}>
                        <Button size="small" startIcon={<VerifiedUserIcon />} onClick={() => handleToggleRole(user)} color="primary" sx={{ textTransform: 'none' }}>Role</Button>
                        <Button size="small" startIcon={<DeleteIcon />} onClick={() => handleDeleteUser(user._id)} color="error" sx={{ textTransform: 'none' }}>Delete</Button>
                      </Box>
                    </CardContent>
                  </Card>
                ))}
              </Box>
            ) : (
              <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>User Info</TableCell>
                      <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Status</TableCell>
                      <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Role</TableCell>
                      <TableCell sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Joined Date</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700, bgcolor: isDark ? alpha('#fff', 0.05) : "#f3f4f6" }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user._id} sx={{ "&:hover": { background: isDark ? alpha('#fff', 0.02) : "#f9fafb" } }}>
                        <TableCell>
                          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                            <Avatar sx={{ bgcolor: isOnline(user) ? "#10b981" : "#6b7280" }}>{user.email[0].toUpperCase()}</Avatar>
                            <Typography variant="body2" sx={{ fontWeight: 600 }}>{user.email}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CircleIcon sx={{ fontSize: 12, color: isOnline(user) ? "#10b981" : "#d1d5db" }} />
                            <Typography variant="body2" sx={{ color: isOnline(user) ? "#10b981" : "text.secondary" }}>{isOnline(user) ? "Online" : "Offline"}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell><Chip label={user.role} size="small" variant="outlined" sx={{ fontWeight: 600 }} /></TableCell>
                        <TableCell>
                          <Typography variant="body2" sx={{ color: "text.secondary", display: 'flex', alignItems: 'center', gap: 1 }}>
                            <CalendarMonthIcon sx={{ fontSize: 16 }} />
                            {new Date(user.createdAt).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton color="primary" onClick={() => handleToggleRole(user)}><VerifiedUserIcon /></IconButton>
                          <IconButton color="error" onClick={() => handleDeleteUser(user._id)}><DeleteIcon /></IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            <Divider />
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalUsers}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ bgcolor: isDark ? alpha('#fff', 0.02) : '#fff' }}
            />
          </TabPanel>

          <TabPanel value={tabValue} index={1}>
            <Box sx={{ p: { xs: 2, sm: 3 } }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                  <Card variant="outlined" sx={{ borderRadius: 2, bgcolor: 'transparent' }}>
                    <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1, bgcolor: isDark ? alpha('#fff', 0.05) : '#f8fafc' }}>
                      <AnalyticsIcon color="primary" />
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Real-time Traffic Activity</Typography>
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2, height: 300 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={chartData}>
                          <defs>
                            <linearGradient id="colorActive" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                              <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? '#444' : '#eee'} />
                          <XAxis dataKey="name" stroke={theme.palette.text.secondary} />
                          <YAxis stroke={theme.palette.text.secondary} />
                          <ChartTooltip contentStyle={{ backgroundColor: theme.palette.background.paper, borderRadius: '8px' }} />
                          <Area type="monotone" dataKey="active" stroke={theme.palette.primary.main} fillOpacity={1} fill="url(#colorActive)" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined" sx={{ borderRadius: 2, p: 3, height: '100%', bgcolor: 'transparent' }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>System Security</Typography>
                    <Box sx={{ textAlign: 'center', py: 2 }}>
                        <SecurityIcon sx={{ fontSize: 60, color: '#10b981', mb: 2 }} />
                        <Typography variant="h6">Firewall Active</Typography>
                        <Typography variant="body2" color="text.secondary">All requests monitored.</Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </Box>
          </TabPanel>
        </Paper>
      </Container>

      {/* Add User Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} fullWidth maxWidth="xs">
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
          <Button variant="contained" onClick={handleAddUser} sx={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" }}>Create User</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default AdminPanel;
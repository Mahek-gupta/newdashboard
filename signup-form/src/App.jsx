// import React from 'react'
// import { Route, Routes } from 'react-router-dom'
// import Signup from './components/signup'
// import Login from './components/login'
// import AuthProvider from './store/AuthContext'
// import DashBoard from './components/DashBoard'
// import ProtectRoute from './components/ProtectRoute'
// import Navbar from './components/Navbar'
// import AdminRoute from './components/AdminRoute'
// import AdminDashboard from './components/AdminDashboard'
// import { ToastContainer } from "react-toastify"
// import "react-toastify/dist/ReactToastify.css"
// import NotificationProvider from './components/NotificationContext'

// const App = () => {
//   return (
//     <div>
//       <NotificationProvider>
//        <ToastContainer position="top-right" autoClose={3000} />
//       <AuthProvider>
//         <Navbar/>
//       <Routes>
//         <Route path='/' element={<Signup/>}/>
//         <Route path='/login' element={<Login/>}/>

//         <Route path='/dashboard' element={
//           <ProtectRoute>
//           <DashBoard/>
//           </ProtectRoute>}/>

//                 <Route path='/admin' element={
//         <AdminRoute>
//           <AdminDashboard/>
//              </AdminRoute>
//       }/>
//       </Routes>

//       </AuthProvider>
//       </NotificationProvider>
//     </div>
//   )
// }

// export default App



// import React from 'react'
// import Signup from './components/Signup'
// import { Route, Routes } from 'react-router-dom'
// import Login from './components/login'
// import ResetPassword from './components/ResetPassword'
// import ProtectRoute from './components/ProtectRoute'
// import DashBoard from './components/DashBoard'
// import { AuthProvider } from './store/AuthContext'
// import Unauthorized from './components/Unauthorized'
// import AdminPanel from './components/AdminPanel'
// import Navbar from './components/Navbar'

// // Toast imports
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ThemeContextProvider } from './store/ThemeContext'

// const App = () => {
//   return (
//     <ThemeContextProvider>
//     <AuthProvider>
//       <div>
//         <Navbar />  
//         <Routes>
//           <Route path="/" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/reset-password/:token" element={<ResetPassword />} />
          
//           <Route
//             path="/dashboard"
//             element={
//               <ProtectRoute allowedRoles={["user", "admin"]}>
//                 <DashBoard />
//               </ProtectRoute>
//             }
//           />

//           <Route
//             path="/admin"
//             element={
//               <ProtectRoute allowedRoles={["admin"]}>
//                 <AdminPanel />
//               </ProtectRoute>
//             }
//           />

//           <Route path="/unauthorized" element={<Unauthorized />} />
//         </Routes>

//         {/* ✅ Sahi Jagah: Return ke andar aur div ke end se pehle */}
//         <ToastContainer position="top-right" autoClose={3000} />
//       </div>
//     </AuthProvider>
//     </ThemeContextProvider>
//   )
// }

// export default App


import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Login from './components/Login' // Note: 'L' capital rakha hai convention ke mutabik
import ResetPassword from './components/ResetPassword'
import ProtectRoute from './components/ProtectRoute'
import DashBoard from './components/DashBoard'
import Unauthorized from './components/Unauthorized'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import Settings from './components/Settings'

// Context Providers
import { AuthProvider } from './store/AuthContext'
import { ThemeContextProvider } from './store/ThemeContext'

// Material UI Imports
import { useTheme, Box } from '@mui/material'

// Toast Notification Imports (Pehle code se CSS fix kiya)
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// Glow Effect Layer Component
const GlowEffect = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <div 
      className="glow-background" 
      data-theme={isDark ? 'dark' : 'light'} 
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1
      }}
    />
  );
}

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        {/* Main Wrapper Box: Glow ko piche aur content ko full height dene ke liye */}
        <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default', overflowX: 'hidden' }}>
          
          {/* Background Glow Layer */}
          <GlowEffect />

          {/* Foreground Content Layer (zIndex se elements glow ke upar rahenge) */}
          <Box sx={{ position: 'relative', zIndex: 10 }}>
            <Navbar />  
            
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
              {/* Protected User/Admin Routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectRoute allowedRoles={["user", "admin"]}>
                    <DashBoard />
                  </ProtectRoute>
                }
              />

              <Route
                path="/settings"
                element={
                  <ProtectRoute allowedRoles={["user", "admin"]}>
                    <Settings />
                  </ProtectRoute>
                }
              />

              {/* Protected Admin Only Route */}
              <Route
                path="/admin"
                element={
                  <ProtectRoute allowedRoles={["admin"]}>
                    <AdminPanel />
                  </ProtectRoute>
                }
              />

              {/* Error/Unauthorized Route */}
              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>

            {/* Global Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} />
          </Box>
        </Box>
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default App
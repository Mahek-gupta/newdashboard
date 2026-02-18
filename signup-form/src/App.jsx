
// import React from 'react'
// import Signup from './components/Signup'
// import { Route, Routes } from 'react-router-dom'
// import Login from './components/Login'
// import ResetPassword from './components/ResetPassword'
// import ProtectRoute from './components/ProtectRoute'
// import DashBoard from './components/DashBoard'
// import { AuthProvider } from './store/AuthContext'
// import Unauthorized from './components/Unauthorized'
// import AdminPanel from './components/AdminPanel'
// import Navbar from './components/Navbar'
// import Settings from './components/Settings' // ✅ Settings component ko import kiya

// // Toast imports
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { ThemeContextProvider } from './store/ThemeContext'

// const App = () => {
//   return (
//     <ThemeContextProvider>
//       <AuthProvider>
//         <div>
//           <Navbar />  
//           <Routes>
//             <Route path="/" element={<Login />} />
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/reset-password/:token" element={<ResetPassword />} />
            
//             <Route
//               path="/dashboard"
//               element={
//                 <ProtectRoute allowedRoles={["user", "admin"]}>
//                   <DashBoard />
//                 </ProtectRoute>
//               }
//             />

//             {/* ✅ Naya Settings Route: Jahan se profile pic change hogi */}
//             <Route
//               path="/settings"
//               element={
//                 <ProtectRoute allowedRoles={["user", "admin"]}>
//                   <Settings />
//                 </ProtectRoute>
//               }
//             />

//             <Route
//               path="/admin"
//               element={
//                 <ProtectRoute allowedRoles={["admin"]}>
//                   <AdminPanel />
//                 </ProtectRoute>
//               }
//             />

//             <Route path="/unauthorized" element={<Unauthorized />} />
//           </Routes>

//           {/* Toast Container */}
//           <ToastContainer position="top-right" autoClose={3000} />
//         </div>
//       </AuthProvider>
//     </ThemeContextProvider>
//   )
// }

// export default App
import React from 'react'
import Signup from './components/Signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import ResetPassword from './components/ResetPassword'
import ProtectRoute from './components/ProtectRoute'
import DashBoard from './components/DashBoard'
import { AuthProvider } from './store/AuthContext'
import Unauthorized from './components/Unauthorized'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'
import Settings from './components/Settings'

// Toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Theme & Glow Logic
import { ThemeContextProvider, ColorModeContext } from './store/ThemeContext'
import { useContext } from 'react'
import { useTheme, Box } from '@mui/material'

// Ek chota internal component jo sirf Roshni ko control karega
const GlowEffect = () => {
  const theme = useTheme();
  const isDark = theme.palette.mode === 'dark';
  
  return (
    <div 
      className="glow-background" 
      data-theme={isDark ? 'dark' : 'light'} 
    />
  );
}

const App = () => {
  return (
    <ThemeContextProvider>
      <AuthProvider>
        {/* Is Box ko relative banaya taaki glow piche rahe aur content upar */}
        <Box sx={{ position: 'relative', minHeight: '100vh', bgcolor: 'background.default' }}>
          
          {/* ✅ Ye hai woh Attractive Roshni Layer */}
          <GlowEffect />

          {/* Baaki saara content iske upar dikhega */}
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Navbar />  
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/reset-password/:token" element={<ResetPassword />} />
              
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

              <Route
                path="/admin"
                element={
                  <ProtectRoute allowedRoles={["admin"]}>
                    <AdminPanel />
                  </ProtectRoute>
                }
              />

              <Route path="/unauthorized" element={<Unauthorized />} />
            </Routes>

            <ToastContainer position="top-right" autoClose={3000} />
          </Box>
        </Box>
      </AuthProvider>
    </ThemeContextProvider>
  )
}

export default App

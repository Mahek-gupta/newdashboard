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



import React from 'react'
import Signup from './components/signup'
import { Route, Routes } from 'react-router-dom'
import Login from './components/login'
import ResetPassword from './components/ResetPassword'
import ProtectRoute from './components/ProtectRoute'
import DashBoard from './components/DashBoard'
import { AuthProvider } from './store/AuthContext'
import Unauthorized from './components/Unauthorized'
import AdminPanel from './components/AdminPanel'
import Navbar from './components/Navbar'

// Toast imports
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthProvider>
      <div>
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
            path="/admin"
            element={
              <ProtectRoute allowedRoles={["admin"]}>
                <AdminPanel />
              </ProtectRoute>
            }
          />

          <Route path="/unauthorized" element={<Unauthorized />} />
        </Routes>

        {/* ✅ Sahi Jagah: Return ke andar aur div ke end se pehle */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </AuthProvider>
  )
}

export default App
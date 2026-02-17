


// // // export const useAuth = () => useContext(AuthContext)
// import { createContext, useContext, useEffect, useState } from "react"
// import api, { setAccessToken, clearAccessToken } from "../api/axios"
// import { loginApi, logoutApi, signupApi } from "../api/authApi"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   useEffect(() => {
//     const restoreAuth = async () => {
//       try {
//         const res = await api.post("/auth/refresh")
//         setAccessToken(res.data.accessToken)
//         const profile = await api.get("/auth/profile")
//         setUser(profile.data.user)
//       } catch (err) {
//         clearAccessToken()
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }
//     restoreAuth()
//   }, [])

//   /* 🔐 Updated Login Logic */
//   const login = async (email, password) => {
//     try {
//       const res = await loginApi({ email, password })
      
//       // Case 1: Agar 2FA (OTP) required hai
//       if (res.data.step === "verify-otp") {
//         setError("")
//         return { success: true, step: "otp" }
//       }

//       // Case 2: Agar direct login ho gaya
//       setAccessToken(res.data.accessToken)
//       setUser(res.data.user)
//       setError("")
//       return { success: true, step: "dashboard" }

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//       return { success: false }
//     }
//   }

//   /* ✅ New: OTP Verification */
//   const verifyOTP = async (email, otp) => {
//     try {
//       const res = await api.post("/auth/verify-otp", { email, otp })
//       setAccessToken(res.data.accessToken)
//       setUser(res.data.user)
//       setError("")
//       return true
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP")
//       return false
//     }
//   }

//   const signup = async (email, password) => {
//     try {
//       await signupApi({ email, password })
//       setError("")
//       return true
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed")
//       return false
//     }
//   }

//   const logout = async () => {
//     try {
//       await logoutApi()
//     } finally {
//       clearAccessToken()
//       setUser(null)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ user, login, verifyOTP, signup, logout, error, loading }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
// import { createContext, useContext, useEffect, useState } from "react"
// import api, { setAccessToken, clearAccessToken } from "../api/axios"
// import { loginApi, logoutApi, signupApi } from "../api/authApi"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   // Restore session on refresh
//   useEffect(() => {
//     const restoreAuth = async () => {
//       try {
//         const res = await api.post("/auth/refresh")
//         setAccessToken(res.data.accessToken)
//         const profile = await api.get("/auth/profile")
//         setUser(profile.data.user)
//       } catch (err) {
//         clearAccessToken()
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }
//     restoreAuth()
//   }, [])

//   /* 🔐 Login Logic */
//   const login = async (email, password) => {
//     try {
//       const res = await loginApi({ email, password })
      
//       if (res.data.step === "verify-otp") {
//         setError("")
//         return { success: true, step: "otp" }
//       }

//       setAccessToken(res.data.accessToken)
//       setUser(res.data.user)
//       setError("")
//       return { success: true, step: "dashboard" }

//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//       return { success: false }
//     }
//   }

//   /* ✅ OTP Verification */
//   const verifyOTP = async (email, otp) => {
//     try {
//       const res = await api.post("/auth/verify-otp", { email, otp })
//       setAccessToken(res.data.accessToken)
//       setUser(res.data.user)
//       setError("")
//       return true
//     } catch (err) {
//       setError(err.response?.data?.message || "Invalid OTP")
//       return false
//     }
//   }

//   /* 🔄 New: Resend OTP (Bina existing logic chede) */
//   const resendOTP = async (email) => {
//     try {
//       const res = await api.post("/auth/resend-otp", { email })
//       return { success: true, message: res.data.message }
//     } catch (err) {
//       const msg = err.response?.data?.message || "Failed to resend OTP"
//       setError(msg)
//       return { success: false, message: msg }
//     }
//   }

//   /* 📸 New: Update Profile State (Photo upload ke baad state sync karne ke liye) */
//   const updateProfileState = (userData) => {
//     setUser(userData)
//   }

//   const signup = async (email, password) => {
//     try {
//       await signupApi({ email, password })
//       setError("")
//       return true
//     } catch (err) {
//       setError(err.response?.data?.message || "Signup failed")
//       return false
//     }
//   }

//   const logout = async () => {
//     try {
//       await logoutApi()
//     } finally {
//       clearAccessToken()
//       setUser(null)
//     }
//   }

//   return (
//     <AuthContext.Provider value={{ 
//       user, login, verifyOTP, resendOTP, signup, logout, 
//       updateProfileState, error, loading 
//     }}>
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
import { createContext, useContext, useEffect, useState } from "react"
import api, { setAccessToken, clearAccessToken } from "../api/axios"
import { loginApi, logoutApi, signupApi } from "../api/authApi"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Restore session on refresh
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        const res = await api.post("/auth/refresh")
        setAccessToken(res.data.accessToken)
        const profile = await api.get("/auth/profile")
        setUser(profile.data.user)
      } catch (err) {
        clearAccessToken()
        setUser(null)
      } finally {
        setLoading(false)
      }
    }
    restoreAuth()
  }, [])

  /* 🔐 Login Logic */
  const login = async (email, password) => {
    try {
      const res = await loginApi({ email, password })
      
      if (res.data.step === "verify-otp") {
        setError("")
        return { success: true, step: "otp" }
      }

      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
      setError("")
      return { success: true, step: "dashboard" }

    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      return { success: false }
    }
  }

  /* ✅ OTP Verification */
  const verifyOTP = async (email, otp) => {
    try {
      const res = await api.post("/auth/verify-otp", { email, otp })
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
      setError("")
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP")
      return false
    }
  }

  /* 🔄 Resend OTP */
  const resendOTP = async (email) => {
    try {
      const res = await api.post("/auth/resend-otp", { email })
      return { success: true, message: res.data.message }
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP"
      setError(msg)
      return { success: false, message: msg }
    }
  }

  /* 📸 Updated: Update Profile State */
  // Isme 'prev' ka use kiya hai taaki purana data (id, email) safe rahe
  const updateProfileState = (userData) => {
    setUser((prev) => ({
      ...prev,      // Purana data rakho
      ...userData,  // Naya data (profilePic) overwrite karo
    }));
  }

  const signup = async (email, password) => {
    try {
      await signupApi({ email, password })
      setError("")
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed")
      return false
    }
  }

  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      clearAccessToken()
      setUser(null)
    }
  }

  return (
    <AuthContext.Provider value={{ 
      user, login, verifyOTP, resendOTP, signup, logout, 
      updateProfileState, error, loading 
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)

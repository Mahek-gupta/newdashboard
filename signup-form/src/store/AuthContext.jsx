

// import { createContext, useContext, useEffect, useState } from "react"
// import api, { setAccessToken, clearAccessToken } from "../api/axios"
// import { loginApi, logoutApi, signupApi } from "../api/Authapi"

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState("")

//   /* 🔁 Restore auth on page refresh */
//   useEffect(() => {
//     const restoreAuth = async () => {
//       try {
//         const res = await api.post("/auth/refresh")
//         setAccessToken(res.data.accessToken)
// console.log("hii")
//         const profile = await api.get("/auth/profile")
//         setUser(profile.data.user)
//       } catch (err) {
//         clearAccessToken()
//         console.log("clear")
//         setUser(null)
//       } finally {
//         setLoading(false)
//       }
//     }

//     restoreAuth()
//   }, [])

//   useEffect(() => {
//   console.log("AUTH STATE:", { user, loading })
// }, [user, loading])

//   /* 🔐 Login */
//   const login = async (email, password) => {
//     try {
//       const res = await loginApi({ email, password })
//       setAccessToken(res.data.accessToken)
//       setUser(res.data.user)
//       setError("")
//       return true
//     } catch (err) {
//       setError(err.response?.data?.message || "Login failed")
//       return false
//     }
//   }

//   /* 📝 Signup */
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

//   /* 🚪 Logout */
//   const logout = async () => {
//     try {
//       await logoutApi()
//     } finally {
//       clearAccessToken()
//       setUser(null)
//     }
//   }

//   // if (loading) return <div>Loading...</div>

//   return (
//     <AuthContext.Provider
//       value={{ user, login, signup, logout, error, loading }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)




// import React, { createContext, useContext, useEffect, useState } from 'react'
// import api, { setAccessToken } from '../api/axios'
// import { loginApi, logoutApi, profileTokenApi, refreshTokenApi, signupApi } from '../api/Authapi'

// const AuthContext = createContext()
// export const AuthProvider = ({children}) => {
//   const [loading, setLoading] =  useState(true)
//   const [user, setUser] = useState(null)
//   const [error, setError] = useState("")


//   useEffect(()=>{
//     const restoreAuth = async (req, res)=>{
//       try{
//         const res = await api.post('/auth/refresh')
//         console.log(api.interceptors.request.use)
//         setAccessToken(res.data.accessToken)
//         const profile = await api.get('/auth/profile')
// console.log(api)
//       }
//       catch(err){
//         console.log("No active session", err)
//       }finally{
//         setLoading(false)
//       }
//     }
//     restoreAuth()
//   })

// const login = async(email, password)=>{
//   try{
//     const res = await loginApi({email, password})
//     setAccessToken(res.data.accesstoken)
//     setUser(res.data.user)
//     setError("")
//     return true
//   }
// catch(err){
//     setError(err.response?.data?.message || "Login failed")
//     return false
// }
// }

// const signup  = async(email, password)=>{
//   try{
// await signupApi({email, password})
// setError("")
// return true
//   }
//   catch(err){
//     setError(err.response?.data?.message || "Signup failed")
//   }
// }

// const logout = async()=>{
//   try{
//     await logoutApi()
//   }finally{
//     setAccessToken(null)
//     setUser(null)
//   }
// }
//   return (
//   <AuthContext.Provider  value={{user, login, error, signup, logout, loading}}>
//     {children}
//   </AuthContext.Provider>
//   )
// }


// export const useAuth = () => useContext(AuthContext)














import { createContext, useContext, useEffect, useState } from "react";
import api, { setAccessToken, clearAccessToken } from "../api/axios";
import { loginApi, logoutApi, signupApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* 🔁 Restore auth on page refresh */
  useEffect(() => {
    const restoreAuth = async () => {
      try {
        // Safe Check: Agar session storage/cookies handle automatic ho rahi ho backend par
        const res = await api.post("/auth/refresh");
        
        if (res.data?.accessToken) {
          setAccessToken(res.data.accessToken);
          const profile = await api.get("/auth/profile");
          setUser(profile.data.user);
        }
      } catch (err) {
        console.log("No active session found (User is Guest).");
        clearAccessToken();
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    restoreAuth();
  }, []);

  /* 🔐 Login Logic */
  const login = async (email, password) => {
    try {
      setError(""); // Purane errors reset karein
      const res = await loginApi({ email, password });
      
      // ✅ Fixed Match: Apne Login.jsx ke step condition ('otp') ke sath align kiya
      if (res.data?.step === "verify-otp" || res.data?.step === "otp") {
        return { success: true, step: "otp" };
      }

      if (res.data?.accessToken) {
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        return { success: true, step: "dashboard" };
      }

      return { success: false };
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed";
      setError(errorMsg);
      return { success: false };
    }
  };

  /* ✅ OTP Verification */
  const verifyOTP = async (email, otp) => {
    try {
      setError("");
      const res = await api.post("/auth/verify-otp", { email, otp });
      
      if (res.data?.accessToken) {
        setAccessToken(res.data.accessToken);
        setUser(res.data.user);
        return true;
      }
      return false;
    } catch (err) {
      setError(err.response?.data?.message || "Invalid OTP");
      return false;
    }
  };

  /* 🔄 Resend OTP */
  const resendOTP = async (email) => {
    try {
      setError("");
      const res = await api.post("/auth/resend-otp", { email });
      return { success: true, message: res.data?.message || "OTP Sent" };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to resend OTP";
      setError(msg);
      return { success: false, message: msg };
    }
  };

  /* 📸 Update Profile State Globally */
  const updateProfileState = (userData) => {
    setUser((prev) => (prev ? { ...prev, ...userData } : null));
  };

  /* 📝 Signup Logic */
  const signup = async (email, password) => {
    try {
      setError("");
      await signupApi({ email, password });
      return true;
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
      return false;
    }
  };

  /* 🚪 Logout Logic */
  const logout = async () => {
    try {
      await logoutApi();
    } catch (err) {
      console.error("Logout failed network request:", err);
    } finally {
      clearAccessToken();
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, login, verifyOTP, resendOTP, signup, logout, 
      updateProfileState, error, loading 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
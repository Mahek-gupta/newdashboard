

import { createContext, useContext, useEffect, useState } from "react"
import api, { setAccessToken, clearAccessToken } from "../api/axios"
import { loginApi, logoutApi, signupApi } from "../api/authApi"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  /* 🔁 Restore auth on page refresh */
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

  useEffect(() => {
  console.log("AUTH STATE:", { user, loading })
}, [user, loading])

  /* 🔐 Login */
  const login = async (email, password) => {
    try {
      const res = await loginApi({ email, password })
      setAccessToken(res.data.accessToken)
      setUser(res.data.user)
      setError("")
      return true
    } catch (err) {
      setError(err.response?.data?.message || "Login failed")
      return false
    }
  }

  /* 📝 Signup */
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

  /* 🚪 Logout */
  const logout = async () => {
    try {
      await logoutApi()
    } finally {
      clearAccessToken()
      setUser(null)
    }
  }

  // if (loading) return <div>Loading...</div>

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, error, loading }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)




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

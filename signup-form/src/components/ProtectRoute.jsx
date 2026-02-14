
import React from "react"
import { Navigate } from "react-router-dom"
import { useAuth } from "../store/AuthContext"

const ProtectRoute = ({ children,  allowedRoles}) => {
  const { user, loading } = useAuth()

  // 🔄 Auth restore ho raha hai
  if (loading) {
    return <div>Loading...</div>
  }

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" replace />
  }

  // ❌ Role not allowed
  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/unauthorized" replace />

  }
  console.log("USER:", user)


  // ✅ Allowed
  return children
}

export default ProtectRoute

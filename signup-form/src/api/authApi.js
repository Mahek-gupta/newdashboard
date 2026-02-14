import api from "./axios"

// Signup
export const signupApi = (data) =>
  api.post("/auth/signup", data)

// Login
export const loginApi = (data) =>
  api.post("/auth/login", data)

// Logout
export const logoutApi = () =>
  api.post("/auth/logout")

// Refresh token
export const refreshTokenApi = () =>
  api.post("/auth/refresh")


export const profileTokenApi = ()=>
  api.get('/auth/profile')

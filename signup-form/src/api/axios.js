
import axios from "axios"

const api = axios.create({
  baseURL: "https://newdashboard-90o4.onrender.com/api",
  withCredentials: true,
})

let accessToken = null
let isRefreshing = false
let failedQueue = []

/* ================= HELPERS ================= */

const processQueue = (error, token = null) => {
  failedQueue.forEach(prom => {
    if (error) prom.reject(error)
    else prom.resolve(token)
  })
  failedQueue = []
}

export const setAccessToken = (token) => {
  accessToken = token
}

export const clearAccessToken = () => {
  accessToken = null
}

/* ================= REQUEST ================= */

api.interceptors.request.use((config) => {
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`
  }
  return config
})

/* ================= RESPONSE ================= */

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config

    /* 🚨 VERY IMPORTANT BLOCK */
    if (
      originalRequest.url.includes("/auth/refresh") ||
      originalRequest.url.includes("/auth/login")
    ) {
      return Promise.reject(error)
    }

    if (error.response?.status === 401 && !originalRequest._retry) {

      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject })
        }).then(token => {
          originalRequest.headers.Authorization = `Bearer ${token}`
          return api(originalRequest)
        })
      }

      originalRequest._retry = true
      isRefreshing = true

      try {
        const res = await api.post("/auth/refresh")
        setAccessToken(res.data.accessToken)
        processQueue(null, res.data.accessToken)

        originalRequest.headers.Authorization =
          `Bearer ${res.data.accessToken}`

        return api(originalRequest)

      } catch (err) {
        processQueue(err, null)
        clearAccessToken()
        return Promise.reject(err)
      } finally {
        isRefreshing = false
      }
    }

    return Promise.reject(error)
  }
)

export default api





import jwt from "jsonwebtoken"

export const protect = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]

  if (!token) return res.sendStatus(401)

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
      console.log(req)
    req.user = user
    next()
  })
}

// export const adminOnly = (req, res, next) => {
//   if (req.user.role !== "admin") {
//     return res.sendStatus(403)
//   }
//   next()
// }

export const adminOnly = (req, res, next) => {
  // Check karein ki user logged in hai aur uska role admin hai
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied: Admins only" });
  }
}


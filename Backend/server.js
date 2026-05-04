import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// JWT Verification Middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ message: "Access token required" });

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Invalid or expired token" });
    req.user = user;
    next();
  });
}

// Role-based Access Control Middleware
function isAdmin(req, res, next) {
  if (req.user?.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Admin access only" });
  }
}

// Routes
app.use("/api/auth", authRoutes);

// Protected Routes
app.get("/api/dashboard", authenticateToken, (req, res) => {
  res.json({ message: `Welcome ${req.user.role}`, user: req.user });
});

app.get("/api/admin", authenticateToken, isAdmin, (req, res) => {
  res.json({ message: "Admin panel access granted" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
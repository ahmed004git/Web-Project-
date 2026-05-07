import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./db.js";
import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/studentRoutes.js";
import { authenticateToken, isAdmin } from "./middleware/authMiddleware.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));



// Routes
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);

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
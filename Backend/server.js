import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db.js";

import authRoutes from "./routes/auth.js";
import studentRoutes from "./routes/studentRoutes.js";
import attendanceRoutes from "./routes/attendanceRoutes.js";
import marksRoutes from "./routes/marksRoutes.js";
import userRoutes from "./routes/userRoutes.js";

import { protect, isAdmin } from "./middleware/authMiddleware.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

/* middleware */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/*routes */
app.use("/api/auth", authRoutes);
app.use("/api/students", studentRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/marks", marksRoutes);
app.use("/api/users", userRoutes);

/* protected routes */
app.get("/api/dashboard", protect, (req, res) => {
  res.json({
    message: `Welcome ${req.user.role}`,
    user: req.user
  });
});

app.get("/api/admin", protect, isAdmin, (req, res) => {
  res.json({ message: "Admin panel access granted" });
});

/* run server */
const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("DB Connection failed:", error.message);
  }
};

startServer();
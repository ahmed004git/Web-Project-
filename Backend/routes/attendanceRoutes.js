import express from "express";
import Attendance from "../models/attendance.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// mark attendacne 
router.post("/", protect, isAdmin, async (req, res) => {
  try {

    const { student, date, status } = req.body;

    const attendance = new Attendance({
      student,
      date,
      status
    });

    await attendance.save();

    res.status(201).json({
      message: "Attendance marked successfully",
      attendance
    });

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});


// see all attendance 
router.get("/", protect, isAdmin, async (req, res) => {

  try {

    const data = await Attendance.find().populate("student");

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

// search student attendance
router.get("/:studentId", protect, async (req, res) => {

  try {

    const data = await Attendance.find({
      student: req.params.studentId
    });

    res.json(data);

  } catch (err) {

    res.status(500).json({
      error: err.message
    });

  }
});

export default router;
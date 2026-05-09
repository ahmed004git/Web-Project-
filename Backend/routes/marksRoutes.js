import express from "express";
import Marks from "../models/marks.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();


// add marks
router.post("/", protect, isAdmin, async (req, res) => {
  try { 
    const {student, subject, marks, total_marks, semester} = req.body;
    const mark = new Marks({student, subject, marks, total_marks, semester});
    await mark.save(); 
    
    res.status(201).json(mark);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  show marks 
router.get("/", protect, async (req, res) => {
  try {
    const data = await Marks.find().populate("student");

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  search student marks  
router.get("/:studentId", protect, async (req, res) => {
  try {
    const data = await Marks.find({
      student: req.params.studentId
    });

    res.json(data);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


//  change marks  
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const updated = await Marks.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// deleting marks
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    await Marks.findByIdAndDelete(req.params.id);

    res.json({ message: "Marks deleted successfully" });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
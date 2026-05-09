import express from "express";
import Student from "../models/student.js";
import { protect, isAdmin } from "../middleware/authMiddleware.js";


const router = express.Router();

// create student 
router.post("/", protect, isAdmin, async(req, res)=>{
    try {
        const student= await Student.create(req.body);

        res.status(201).json(student);       

    }

    catch (error) 
    {
        res.status(500).json({message:"Internal Server Error"})
    }    
});

//getting students 
router.get("/", protect, async (req,res)=>{
    try{
        const students = await Student.find();
        res.json(students);
    }

    catch(error){
        res.status(500).json({message:"Internal Server Error"})
    }
});

//updating student 
router.put("/:id", protect, isAdmin, async (req, res) => {
  try {
    const updatedStudent = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedStudent);

  } catch (err) {
    res.status(500).json({ error:"internal server Error" });
  }
});

//delete student 
router.delete("/:id", protect, isAdmin, async (req, res) => {
  try {
    const deletedStudent = await Student.findByIdAndDelete(req.params.id);

    res.json({ message: "Student deleted successfully" });

  } catch (err) {
    res.status(500).json({ error:"Internal Server Error"});
  }
});

export default router;
import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import Student from "../models/student.js";

const router = express.Router();

/* register */
router.post("/register", async (req, res) => {
  const {
    username,
    password,
    role = "student",
    name,
    rollNumber,
    email,
    department,
    year,
    semester
  } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password required"
      });
    }

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const user = new User({
      username,
      password,
      role
    });

    await user.save();

    // create or link student 
    if (role === "student") {
      const { section } = req.body;
      if (!name || !rollNumber || !email || !department || !semester || !section) {
        await User.findByIdAndDelete(user._id);
        return res.status(400).json({
          message: "Missing student details (Name, Roll, Email, Dept, Sem, and Section are required)"
        });
      }

      // Check if student record already exists (e.g. added by admin)
      let student = await Student.findOne({ rollNumber });

      if (student) {
        // Link existing student to this user
        student.user = user._id;
        student.name = name;
        student.email = email;
        student.department = department;
        student.semester = Number(semester);
        student.section = section;
        await student.save();
      } else {
        // Create new student record
        student = new Student({
          user: user._id,
          name,
          rollNumber,
          email,
          department,
          year,
          semester: Number(semester),
          section
        });
        await student.save();
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

/* log in  */
router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });

  } catch (err) {
    res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
});

export default router;
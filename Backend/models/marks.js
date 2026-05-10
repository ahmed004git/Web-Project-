import mongoose from "mongoose";

const marksSchema = new mongoose.Schema({
    
    student:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },

    subject:{
        type: String,
        required: true
    },

    marks:{
        type: Number,
        required: true
    },

    total_marks:{
        type: Number,
        required: true
    },

    semester:{
        type: String,
        required: true
    }

}, { timestamps: true });

export default mongoose.model("Marks", marksSchema);
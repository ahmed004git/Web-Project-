import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: false
    },
    name:{
        type:String,
        required:true
    },
  
    rollNumber:{
        type:String,
        required:true,
        unique:true
    },

    email:{
        type:String,
        required:true
    },

   department: {
      type: String,
      required: true
    },
    year: {
      type: Number,
      required: false
    },

    semester: {
      type: Number,
      required: true
    },

    section: {
      type: String,
      required: true
    },

    cgpa:{
        type:Number,
        
    }
 
});
export default mongoose.model("Student", studentSchema);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique:true,
  },

  password: {
    type: String,
    required: true,
    select: false,  // hides it by default from queries
  },

  assistantName: {
    type: String,
    
  },

  assistantImage: {
    type: String,
    default: "",
  },

  history: [
    {
      type: String,
    },
  ],
}, {
  timestamps: true,
});

const User = mongoose.model("User", userSchema);
export default User;

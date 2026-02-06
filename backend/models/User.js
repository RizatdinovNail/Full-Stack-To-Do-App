const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required,
  },
  username: {
    type: String,
    required,
  },
  email: {
    type: email,
    required,
  },
  password: {
    type: String,
    required,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("User", userSchema);

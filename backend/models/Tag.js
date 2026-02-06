import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "#000",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Tags", tagSchema);

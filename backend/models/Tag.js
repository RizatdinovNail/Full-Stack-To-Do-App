import mongoose from "mongoose";

const tagSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
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

const Tag = mongoose.model("Tags", tagSchema);

export default Tag;

import express from "express";

import middleware from "./Middleware.js";
import User from "../models/User.js";
import ToDo from "../models/ToDo.js";
import Tag from "../models/Tag.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser =
    (await User.findOne({ email })) || (await User.findOne({ username }));
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  } else {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        username,
        email,
        password: hashedPassword,
        createdAt: Date.now(),
      });

      await newUser.save();

      const basicTag = new Tag({
        name: "Great Todo",
        color: "#00000",
        createdAt: Date.now(),
        userId: newUser._id,
      });

      await basicTag.save();

      res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ error: error.message });
    }
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

//======================= TODOS AUTH =======================
router.post("/todos", middleware, async (req, res) => {
  try {
    const defaultTags = await Tag.find({ userId: req.body.userId });
    const tagIds = defaultTags.map((tag) => tag._id);
    const todo = await ToDo.create({
      title: req.body.title,
      userId: req.user.userId,
      completed: false,
      createdAt: Date.now(),
      dueDate: null,
      updatedAt: Date.now(),
      tagIds,
    });
    await todo.populate("tagIds");
    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Failed to create todo: " + error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

router.get("/todos", middleware, async (req, res) => {
  try {
    const todos = await ToDo.find({ userId: req.user.userId }).populate(
      "tagIds",
    );
    res.json(todos);
  } catch (error) {
    console.error("Failed to get todos: " + error);
    res.status(500).json({ error: "Failed to get todos" });
  }
});

export default router;

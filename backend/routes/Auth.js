import express from "express";
import mongoose from "mongoose";

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
        createdAt: new Date(),
      });

      await newUser.save();
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

router.get("/me", middleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password");
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Error getting the user: " + error });
  }
});

router.patch("/update", middleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { username, email, currentPassword, newPassword } = req.body;

    const updates = {};

    // Update username
    if (username) updates.username = username;

    // Update email
    if (email) updates.email = email;

    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    // Update password
    if (newPassword) {
      if (!currentPassword)
        return res.status(400).json({ message: "Current password required" });

      const isMatch = await bcrypt.compare(currentPassword, user.password);

      if (!isMatch)
        return res.status(400).json({ message: "Incorrect current password" });

      updates.password = await bcrypt.hash(newPassword, 10);
    }

    // Apply updates
    const updatedUser = await User.findByIdAndUpdate(userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password"); // Never return password

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Error updating user: " + error.message });
  }
});

//======================= TODOS AUTH =======================
router.post("/todos", middleware, async (req, res) => {
  try {
    const todo = await ToDo.create({
      title: req.body.title,
      userId: req.user.userId,
      completed: false,
      createdAt: new Date(),
      dueDate: null,
      updatedAt: new Date(),
    });
    res.status(201).json({ message: "Todo added successfully" });
  } catch (error) {
    console.error("Failed to create todo: " + error);
    res.status(500).json({ error: "Failed to create todo" });
  }
});

router.get("/todos", middleware, async (req, res) => {
  try {
    const todos = await ToDo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    console.error("Failed to get todos: " + error);
    res.status(500).json({ error: "Failed to get todos" });
  }
});

router.delete("/todos/:id", middleware, async (req, res) => {
  try {
    const todoId = req.params.id;
    const deletedTodo = await ToDo.findOneAndDelete({
      _id: todoId,
      userId: req.user.userId,
    });

    if (!deletedTodo) {
      return res.status(404).json({ error: "Todo no found" });
    }

    const todos = await ToDo.find({ userId: req.user.userId });
    res.json(todos);
  } catch (error) {
    console.error("Failed to delete todo: " + error);
  }
});

router.patch("/todos/:id", middleware, async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await ToDo.findOneAndUpdate(
      {
        _id: todoId,
        userId: req.user.userId,
      },
      {
        title: req.body.title,
        completed: req.body.completed,
        dueDate: req.body.dueDate,
        updatedAt: new Date(),
      },
      { new: true },
    );

    if (!updatedTodo) {
      return res.status(400).json({ error: "Todo not found" });
    }

    res.send(updatedTodo);
  } catch (error) {
    console.error("Failed to update todo: " + error);
  }
});

router.get("/stats", middleware, async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user.userId);

    const stats = await ToDo.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: "$completed",
          count: { $sum: 1 },
        },
      },
    ]);

    let completed = 0;
    let incomplete = 0;

    stats.forEach((item) => {
      if (item._id === true) completed = item.count;
      else incomplete = item.count;
    });

    res.json({ completed, incomplete });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;

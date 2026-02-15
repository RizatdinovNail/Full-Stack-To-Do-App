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
    const todo = await ToDo.create({
      title: req.body.title,
      userId: req.user.userId,
      completed: false,
      createdAt: Date.now(),
      dueDate: null,
      updatedAt: Date.now(),
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
        updatedAt: Date.now(),
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

export default router;

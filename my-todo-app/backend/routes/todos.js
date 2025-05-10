const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTodo = new Todo({
    title,
    description,
    dueDate,
    createdAt: new Date(),
    owner: req.user.id,
  });
  await newTodo.save();
  res.status(201).json(newTodo);
});

router.get("/", async (req, res) => {
  const todos = await Todo.find({ owner: req.user.id });
  res.json(todos);
});

router.put("/:id", async (req, res) => {
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedTodo);
});

router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
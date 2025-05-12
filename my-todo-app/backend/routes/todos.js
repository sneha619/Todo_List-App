const express = require("express");
const Todo = require("../models/Todo");
const authMiddleware = require("../middleware/auth");
const router = express.Router();

router.use(authMiddleware);

router.post("/", async (req, res) => {
  const { title, description, dueDate } = req.body;
  
  // Find the highest order value for this user's todos
  const highestOrderTodo = await Todo.findOne({ owner: req.user.id }).sort({ order: -1 });
  const nextOrder = highestOrderTodo ? highestOrderTodo.order + 1 : 0;
  
  const newTodo = new Todo({
    title,
    description,
    dueDate,
    createdAt: new Date(),
    owner: req.user.id,
    order: nextOrder, // Add the order field
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

router.patch("/reorder", async (req, res) => {
  const { todos } = req.body;

  if (!Array.isArray(todos)) {
    return res.status(400).json({ message: "Invalid request format" });
  }

  try {
    const bulkOps = todos.map((todo, index) => ({
      updateOne: {
        filter: { _id: todo._id, owner: req.user.id },
        update: { order: index },
      },
    }));

    await Todo.bulkWrite(bulkOps);

    res.status(200).json({ message: "Todos reordered successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error reordering todos" });
  }
});


router.delete("/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

module.exports = router;
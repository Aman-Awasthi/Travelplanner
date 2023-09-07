const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// Get all todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add a new todo
router.post('/todos', async (req, res) => {
  const { task } = req.body;
  try {
    const newTodo = new Todo({ task });
    const todo = await newTodo.save();
    res.json(todo);
  } catch (error) {
    res.status(400).json({ error: 'Bad request' });
  }
});

// Delete a todo by ID
router.delete('/todos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await Todo.findByIdAndDelete(id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(404).json({ error: 'Todo not found' });
  }
});

module.exports = router;

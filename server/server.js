const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// In-memory task storage
let tasks = [];

// Routes
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/tasks', (req, res) => {
  const newTask = {
    id: Date.now().toString(),
    title: req.body.title,
    description: req.body.description,
    completed: false
  };
  tasks.push(newTask);
  res.json(newTask);
});

app.delete('/tasks/:id', (req, res) => {
  tasks = tasks.filter(task => task.id !== req.params.id);
  res.json({ message: 'Task deleted' });
});

app.put('/tasks/:id/toggle', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (task) {
    task.completed = !task.completed;
    res.json(task);
  } else {
    res.status(404).json({ message: 'Task not found' });
  }
});

// Home route
app.get('/', (req, res) => {
  res.send('✅ API is running!');
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

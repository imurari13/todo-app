const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// ✅ MongoDB Connection
mongoose.connect('mongodb://127.0.0.1:27017/todoapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('✅ Connected to Local MongoDB');
})
.catch((err) => {
  console.error('❌ MongoDB connection error:', err);
});

// ✅ Mongoose Schema and Model
const taskSchema = new mongoose.Schema({
  title: String,
  description: String,
  completed: { type: Boolean, default: false }
});
const Task = mongoose.model('Task', taskSchema);

// ✅ Routes

// Get all tasks
app.get('/tasks', async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Create a new task
app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

// Toggle completion
app.put('/tasks/:id/toggle', async (req, res) => {
  const task = await Task.findById(req.params.id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

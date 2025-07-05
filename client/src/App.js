import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // Your custom CSS

function App() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/tasks`);
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${backendUrl}/tasks`, { title, description: desc });
      setTitle(""); setDesc("");
      getTasks();
    } catch (err) {
      console.error("Error adding task:", err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/tasks/${id}`);
      getTasks();
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${backendUrl}/tasks/${id}/toggle`);
      getTasks();
    } catch (err) {
      console.error("Error toggling task:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">📝 My To-Do List</h1>

        <div className="input-group">
          <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} />
          <input placeholder="Description (optional)" value={desc} onChange={e => setDesc(e.target.value)} />
          <button onClick={addTask}>Add Task</button>
        </div>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className="task-item">
              <div>
                <h2 className={task.completed ? "done" : ""}>{task.title}</h2>
                {task.description && <p>{task.description}</p>}
              </div>
              <div className="actions">
                <button onClick={() => toggleComplete(task._id)}>{task.completed ? "↩️" : "✅"}</button>
                <button onClick={() => deleteTask(task._id)}>🗑️</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;

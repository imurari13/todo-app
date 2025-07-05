import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles.css'; // This connects your custom CSS

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const getTasks = async () => {
    const res = await axios.get("http://localhost:5000/tasks");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post("http://localhost:5000/tasks", { title, description: desc });
    setTitle(""); setDesc("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/tasks/${id}`);
    getTasks();
  };

  const toggleComplete = async (id) => {
    await axios.put(`http://localhost:5000/tasks/${id}/toggle`);
    getTasks();
  };

  useEffect(() => { getTasks(); }, []);

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

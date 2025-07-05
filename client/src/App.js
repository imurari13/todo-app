import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const backendUrl = process.env.REACT_APP_BACKEND_URL;

  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');

  const getTasks = async () => {
    try {
      const res = await axios.get(`${backendUrl}/tasks`);
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${backendUrl}/tasks`, { title, description: desc });
      setTitle('');
      setDesc('');
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${backendUrl}/tasks/${id}`);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const toggleComplete = async (id) => {
    try {
      await axios.put(`${backendUrl}/tasks/${id}/toggle`);
      getTasks();
    } catch (error) {
      console.error("Error toggling task:", error);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: 'auto', fontFamily: 'Arial' }}>
      <h1>📝 TODO App</h1>
      <div>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ marginRight: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button onClick={addTask} style={{ marginLeft: '0.5rem' }}>Add Task</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, marginTop: '1.5rem' }}>
        {tasks.map((task) => (
          <li key={task._id} style={{ marginBottom: '1rem', background: '#f3f3f3', padding: '1rem', borderRadius: '5px' }}>
            <strong style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</strong>
            <p style={{ margin: '0.5rem 0' }}>{task.description}</p>
            <button onClick={() => toggleComplete(task._id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '0.5rem' }}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

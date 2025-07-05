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
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const addTask = async () => {
    if (!title.trim()) return;
    try {
      await axios.post(`${backendUrl}/tasks`, { title, description: desc });
      setTitle('');
      setDesc('');
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

  const toggleTask = async (id) => {
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
    <div style={{ padding: '2rem', fontFamily: 'Arial', maxWidth: '600px', margin: 'auto' }}>
      <h1 style={{ textAlign: 'center' }}>✅ TODO List</h1>
      
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: '0.5rem', width: '40%', marginRight: '1rem' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          style={{ padding: '0.5rem', width: '40%' }}
        />
        <button onClick={addTask} style={{ padding: '0.5rem 1rem', marginLeft: '1rem' }}>Add</button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {tasks.map(task => (
          <li key={task._id} style={{ 
            marginBottom: '1rem',
            backgroundColor: '#f4f4f4',
            padding: '1rem',
            borderRadius: '5px'
          }}>
            <h3 style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</h3>
            <p>{task.description}</p>
            <button onClick={() => toggleTask(task._id)}>
              {task.completed ? 'Undo' : 'Complete'}
            </button>
            <button onClick={() => deleteTask(task._id)} style={{ marginLeft: '1rem', color: 'red' }}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

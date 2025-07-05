import React from 'react';
import ReactDOM from 'react-dom/client'; // ✅ use `react-dom/client` in React 18
import App from './App';
import './styles.css'; // or 'index.css' if you're using it

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

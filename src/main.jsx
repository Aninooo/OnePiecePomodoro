// main.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroApp from './PomodoroApp.jsx'; 
import './PomodoroApp.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PomodoroApp />
  </React.StrictMode>
);

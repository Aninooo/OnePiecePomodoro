// index.jsx
import React from 'react';
import ReactDOM from 'react-dom';
import PomodoroApp from './PomodoroApp';

const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <PomodoroApp />
  </React.StrictMode>
);

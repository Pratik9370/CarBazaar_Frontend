import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import ContextStates from './context/ContextStates';

createRoot(document.getElementById('root')).render(
  <ContextStates>
    <App />
  </ContextStates>
);

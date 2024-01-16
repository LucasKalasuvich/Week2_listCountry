import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'
import { BrowserRouter as Router } from "react-router-dom"

const rooElement = document.getElementById('root');
const root = createRoot(rooElement);

root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>,
  
);

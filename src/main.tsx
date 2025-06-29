
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Set initial HTML lang attribute based on URL
const currentPath = window.location.pathname;
const isEnglish = currentPath.startsWith('/us');
document.documentElement.lang = isEnglish ? 'en' : 'pt-BR';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

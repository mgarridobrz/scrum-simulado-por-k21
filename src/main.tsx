
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Handle custom domain redirection
const isCustomDomain = window.location.hostname === 'csmpracticeexam.com';
const currentPath = window.location.pathname;

if (isCustomDomain && !currentPath.startsWith('/us')) {
  // Redirect to English version for custom domain
  const newPath = '/us' + (currentPath === '/' ? '' : currentPath);
  window.location.replace(newPath);
}

// Set initial HTML lang attribute based on URL or domain
const isEnglish = currentPath.startsWith('/us') || isCustomDomain;
document.documentElement.lang = isEnglish ? 'en' : 'pt-BR';

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

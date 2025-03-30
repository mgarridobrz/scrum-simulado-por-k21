
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Index from './pages/Index';
import QuestionValidation from './pages/QuestionValidation';
import NotFound from './pages/NotFound';
import { Toaster } from './components/ui/toaster';
import './App.css';

// Simple auth check function
const isAuthenticated = () => {
  return localStorage.getItem('validationPageAuthenticated') === 'true';
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/validate-questions" element={<QuestionValidation />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;

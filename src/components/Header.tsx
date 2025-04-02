
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png" 
            alt="K21 Logo" 
            className="h-10"
          />
        </Link>
        
        <Link 
          to="/ranking" 
          className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-k21-teal transition-colors"
        >
          <Trophy size={16} className="text-k21-gold" />
          <span>Ranking</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;

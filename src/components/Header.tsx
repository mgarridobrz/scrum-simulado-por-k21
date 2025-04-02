
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ExternalLink } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';

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
        
        <div className="flex items-center gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Links Úteis
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a 
                  href="https://k21.global" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Site K21
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href="https://scrumguide.scrum.org/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Scrum Guide
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href="https://www.scrum.org/professional-scrum-certifications/professional-scrum-master-assessments" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Certificação PSM
                </a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          
          <Link 
            to="/ranking" 
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-k21-teal transition-colors"
          >
            <Trophy size={16} className="text-k21-gold" />
            <span>Ranking</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { cn } from "@/lib/utils";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full py-4 bg-white shadow-sm", className)}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-bold text-xl text-k21-black">
            Simulado CSM
          </span>
          <span className="text-sm font-medium text-k21-teal">
            por K21 Brasil
          </span>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-16 rounded-full" />
          <img 
            src="/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png" 
            alt="K21 Logo" 
            className="h-10 w-auto" 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;

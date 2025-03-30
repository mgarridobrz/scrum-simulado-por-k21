
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
        <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-16 rounded-full" />
      </div>
    </header>
  );
};

export default Header;


import React from 'react';
import { cn } from "@/lib/utils";
import { NavigationMenu, NavigationMenuLink, NavigationMenuList, NavigationMenuItem } from "@/components/ui/navigation-menu";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  return (
    <header className={cn("w-full bg-white shadow-sm", className)}>
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-2">
          <div className="flex flex-col">
            <span className="font-bold text-xl text-k21-black">
              Simulado
            </span>
            <span className="font-bold text-xl text-k21-gold">
              Certified ScrumMaster®
            </span>
          </div>
          <span className="text-sm font-medium text-k21-teal ml-1">
            por K21 Brasil
          </span>
        </div>
        <div className="flex items-center gap-6">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://aluno.k21.global/login" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors">
                  Área do Aluno
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://br.k21.global/cursos" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors">
                  Nossos Cursos
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink href="https://br.k21.global/conteudos" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors">
                  Conteúdos K21
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-16 rounded-full" />
            <img 
              src="/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png" 
              alt="K21 Logo" 
              className="h-10 w-auto" 
            />
          </div>
        </div>
      </div>
      
      {/* New static submenu */}
      <div className="border-t border-gray-100 bg-gray-50">
        <div className="container">
          <nav className="flex items-center py-2">
            <ul className="flex space-x-8">
              <li>
                <a href="/" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1 border-b-2 border-k21-teal">
                  Simulado CSM
                </a>
              </li>
              <li>
                <a href="https://br.k21.global/certificacoes/csm" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1">
                  Sobre o CSM
                </a>
              </li>
              <li>
                <a href="https://br.k21.global/certificacoes" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1">
                  Outras Certificações
                </a>
              </li>
              <li>
                <a href="https://br.k21.global/blog/tag/Scrum" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1">
                  Blog Scrum
                </a>
              </li>
              <li>
                <a href="https://br.k21.global/contato" target="_blank" className="text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1">
                  Contato
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

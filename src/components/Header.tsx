
import React from 'react';
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { 
  Drawer, 
  DrawerContent, 
  DrawerTrigger,
  DrawerClose
} from "@/components/ui/drawer";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const menuItems = [
    { label: 'Simulado CSM', href: '/', isActive: true },
    { label: 'Área do Aluno', href: 'https://aluno.k21.global/login', isExternal: true },
    { label: 'Nossos Cursos', href: 'https://br.k21.global/cursos', isExternal: true },
    { label: 'Conteúdos K21', href: 'https://br.k21.global/conteudos', isExternal: true },
    { label: 'Blog Scrum', href: 'https://br.k21.global/blog/tag/Scrum', isExternal: true },
    { label: 'Contato', href: 'https://br.k21.global/contato', isExternal: true },
  ];

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
        <div className="flex items-center gap-4">
          <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-16 rounded-full" />
          <img 
            src="/lovable-uploads/2342063e-9561-46ff-ae6a-e4a0316e24a1.png" 
            alt="K21 Logo" 
            className="h-10 w-auto" 
          />
        </div>
      </div>
      
      {/* Desktop Menu */}
      {!isMobile && (
        <div className="border-t border-gray-100 bg-gray-50">
          <div className="container">
            <nav className="flex items-center py-2">
              <ul className="flex space-x-8">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a 
                      href={item.href} 
                      target={item.isExternal ? "_blank" : undefined} 
                      className={`text-sm font-medium text-k21-black hover:text-k21-teal transition-colors flex items-center py-1 ${item.isActive ? 'border-b-2 border-k21-teal' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      )}

      {/* Mobile Menu Button */}
      {isMobile && (
        <div className="border-t border-gray-100 bg-gray-50 py-2">
          <div className="container">
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-auto block">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-[80%] max-h-[500px]">
                <div className="px-4 py-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex flex-col">
                      <span className="font-bold text-xl text-k21-black">Simulado</span>
                      <span className="font-bold text-xl text-k21-gold">Certified ScrumMaster®</span>
                    </div>
                    <DrawerClose asChild>
                      <Button variant="ghost" size="icon">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close menu</span>
                      </Button>
                    </DrawerClose>
                  </div>
                  <nav>
                    <ul className="space-y-4">
                      {menuItems.map((item, index) => (
                        <li key={index}>
                          <a 
                            href={item.href} 
                            target={item.isExternal ? "_blank" : undefined} 
                            className={`block text-base font-medium text-k21-black hover:text-k21-teal transition-colors py-2 ${item.isActive ? 'text-k21-teal' : ''}`}
                          >
                            {item.label}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

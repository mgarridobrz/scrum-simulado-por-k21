
import React from 'react';
import { Link } from 'react-router-dom';
import { Trophy, ExternalLink, MessageCircle, Share2, Linkedin, Twitter, Instagram } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

const Header = () => {
  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "Acabei de testar meu conhecimento em Scrum com o simulado CSM da K21! Confira:";
    
    let shareUrl = '';
    
    switch (platform) {
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'instagram':
        // Instagram não tem API direta de compartilhamento, usamos apenas um toast informativo
        toast({
          title: "Compartilhar no Instagram",
          description: "Copie o link e compartilhe em sua história do Instagram!",
        });
        navigator.clipboard.writeText(url);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

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
          <a 
            href="https://api.whatsapp.com/send/?phone=552138258624" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-green-600 transition-colors"
            title="Fale com a K21"
          >
            <MessageCircle size={16} className="text-green-600" />
            <span>Fale com a K21</span>
          </a>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center gap-1">
                <Share2 size={16} />
                <span className="hidden sm:inline">Curtiu o simulado? Então compartilhe!</span>
                <span className="sm:hidden">Compartilhe!</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem onClick={() => handleShare('linkedin')} className="cursor-pointer">
                <Linkedin size={16} className="mr-2 text-blue-600" />
                Compartilhar no LinkedIn
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('twitter')} className="cursor-pointer">
                <Twitter size={16} className="mr-2 text-sky-500" />
                Compartilhar no Twitter
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleShare('instagram')} className="cursor-pointer">
                <Instagram size={16} className="mr-2 text-pink-600" />
                Compartilhar no Instagram
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">
                Links Úteis
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <a 
                  href="http://br.k21.global" 
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
                  href="http://scrumguides.org" 
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
                  href="https://br.k21.global/cursos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Cursos
                </a>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a 
                  href="https://br.k21.global/conteudos" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <ExternalLink size={16} />
                  Conteúdos
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

import React, { useState, useEffect } from 'react';
import { QuizTheme } from '@/types/theme';
import { fetchThemeBySlug } from '@/utils/themeService';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';
import Game from './Game';

interface ThemedGameProps {
  themeSlug: string;
  basePath: string;
  forceAllQuestions?: boolean;
}

const ThemedGame: React.FC<ThemedGameProps> = ({ themeSlug, basePath, forceAllQuestions = false }) => {
  const navigate = useNavigate();
  
  const [theme, setTheme] = useState<QuizTheme | null>(null);
  const [themeLoading, setThemeLoading] = useState(true);
  const [themeError, setThemeError] = useState<string | null>(null);

  // Load theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      setThemeLoading(true);
      setThemeError(null);
      try {
        const loadedTheme = await fetchThemeBySlug(themeSlug);
        if (loadedTheme) {
          setTheme(loadedTheme);
        } else {
          setThemeError(`Tema '${themeSlug}' não encontrado.`);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        setThemeError("Erro ao carregar tema.");
      } finally {
        setThemeLoading(false);
      }
    };
    
    loadTheme();
  }, [themeSlug]);

  // Loading theme state
  if (themeLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <p className="text-muted-foreground">Carregando tema...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Theme error state
  if (themeError || !theme) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-muted">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto p-8 text-center">
            <h2 className="text-xl font-semibold text-destructive mb-4">Tema não encontrado</h2>
            <p className="text-muted-foreground mb-4">{themeError || "Este tema não existe ou está inativo."}</p>
            <button 
              onClick={() => navigate('/')}
              className="text-primary hover:underline"
            >
              Voltar ao início
            </button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return <Game themeSlug={themeSlug} themeId={theme.id} themeName={theme.name} basePath={basePath} forceAllQuestions={forceAllQuestions} />;
};

export default ThemedGame;

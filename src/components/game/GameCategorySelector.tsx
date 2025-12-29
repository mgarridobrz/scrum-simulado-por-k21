import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Clock, Target, ArrowLeft } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

interface GameCategorySelectorProps {
  onSelectCategory: (category: string, questionCount: number) => void;
  themeId?: string;
  basePath?: string;
  forceAllQuestions?: boolean;
}

const defaultCategories = [
  { id: 'fundamentals-roles', name: 'Fundamentos + Papéis', nameEn: 'Fundamentals + Roles' },
  { id: 'events-artifacts', name: 'Eventos + Artefatos + Disfunções', nameEn: 'Events + Artifacts + Dysfunctions' },
  { id: 'all', name: 'Todas as Categorias', nameEn: 'All Categories' }
];

const questionCounts = [
  { count: 5 as const, time: '5', description: 'Rápido', descriptionEn: 'Quick' },
  { count: 10 as const, time: '10', description: 'Completo', descriptionEn: 'Complete' }
];

export const GameCategorySelector: React.FC<GameCategorySelectorProps> = ({ 
  onSelectCategory, 
  themeId,
  basePath = '',
  forceAllQuestions = false
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [hasCategories, setHasCategories] = useState(true);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkCategories = async () => {
      if (!themeId) {
        setHasCategories(true);
        setLoading(false);
        return;
      }

      try {
        // Check if theme has questions with distinct categories
        const { data } = await supabase
          .from('quiz_questions')
          .select('category_id')
          .eq('theme_id', themeId)
          .limit(1000);

        if (data && data.length > 0) {
          setTotalQuestions(data.length);
          const uniqueCategories = [...new Set(data.map(q => q.category_id))];
          // If only one category or no meaningful categories, show simplified view
          setHasCategories(uniqueCategories.length > 1);
        } else {
          setHasCategories(false);
          setTotalQuestions(0);
        }
      } catch (error) {
        console.error('Error checking categories:', error);
        setHasCategories(false);
      } finally {
        setLoading(false);
      }
    };

    checkCategories();
  }, [themeId]);

  const homePath = basePath || '/';
  const rankingPath = basePath ? `${basePath}/game/ranking` : '/game/ranking';

  // For themes without categories, use total questions count
  const allQuestionsCount = totalQuestions > 0 ? totalQuestions : 10;

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-8">
        <div className="text-muted-foreground">Carregando...</div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header com botão de voltar */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-between">
          <Button 
            onClick={() => navigate(homePath)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            {language === 'pt' ? 'Voltar' : 'Back'}
          </Button>
          
          <div className="flex items-center space-x-4">
            <Target className="h-8 w-8 text-primary" />
            <h1 className="text-3xl font-bold">
              {getTranslation(language, 'gameMode')}
            </h1>
            <Clock className="h-8 w-8 text-primary" />
          </div>
          
          <div className="w-20"></div> {/* Espaçador para centralizar o título */}
        </div>
        
        <p className="text-muted-foreground">
          {language === 'pt' 
            ? 'Responda rapidamente digitando A, B, C ou D. Erros adicionam 15 segundos!'
            : 'Answer quickly by typing A, B, C or D. Mistakes add 15 seconds!'
          }
        </p>

        {/* Botão de Ranking em destaque */}
        <div className="flex justify-center">
          <Button 
            onClick={() => navigate(rankingPath)}
            variant="outline"
            size="lg"
            className="bg-yellow-50 border-yellow-200 hover:bg-yellow-100 text-yellow-700 hover:text-yellow-800"
          >
            <Trophy className="h-5 w-5 mr-2" />
            {getTranslation(language, 'gameRanking')}
          </Button>
        </div>
      </div>

      {/* Grid de categorias ou botão único */}
      {hasCategories && !forceAllQuestions ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {defaultCategories.map((category) => (
            <Card key={category.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="space-y-3">
                <div className="text-center">
                  <h3 className="font-semibold text-lg">
                    {language === 'pt' ? category.name : category.nameEn}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {category.id}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  {questionCounts.map((option) => (
                    <Button
                      key={option.count}
                      onClick={() => {
                        console.log('🔍 CATEGORY SELECTOR - Selected:', { category: category.id, count: option.count });
                        onSelectCategory(category.id, option.count);
                      }}
                      variant="default"
                      size="sm"
                      className="flex flex-col p-3 h-auto space-y-1"
                    >
                      <span className="text-xl font-bold">
                        {option.count}
                      </span>
                      <span className="text-xs">
                        {getTranslation(language, 'questions')}
                      </span>
                      <span className="text-xs opacity-75">
                        ~{option.time} min
                      </span>
                    </Button>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div className="max-w-md mx-auto">
          <Card className="p-6 hover:shadow-md transition-shadow">
            <div className="space-y-4 text-center">
              <h3 className="font-semibold text-lg">
                {language === 'pt' ? 'Todas as Questões' : 'All Questions'}
              </h3>
              <p className="text-muted-foreground text-sm">
                {language === 'pt' 
                  ? `${totalQuestions} questões disponíveis`
                  : `${totalQuestions} questions available`
                }
              </p>
              <Button
                onClick={() => {
                  console.log('🔍 CATEGORY SELECTOR - Selected all questions:', totalQuestions);
                  onSelectCategory('all', allQuestionsCount);
                }}
                variant="default"
                size="lg"
                className="w-full py-6 text-lg"
              >
                🎮 {language === 'pt' ? 'Iniciar Jogo' : 'Start Game'}
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Instruções compactas */}
      <Card className="p-4 bg-blue-50 border-blue-200">
        <div className="text-center space-y-2">
          <h4 className="font-semibold text-blue-900">
            {language === 'pt' ? 'Como Jogar' : 'How to Play'}
          </h4>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• {language === 'pt' ? 'Countdown de 3 segundos antes de cada questão' : '3-second countdown before each question'}</p>
            <p>• {language === 'pt' ? 'Digite A, B, C ou D para responder' : 'Type A, B, C or D to answer'}</p>
            <p>• {language === 'pt' ? 'Resposta errada = +15 segundos de penalidade' : 'Wrong answer = +15 seconds penalty'}</p>
            <p>• {language === 'pt' ? 'Menor tempo total vence!' : 'Lowest total time wins!'}</p>
          </div>
        </div>
      </Card>
    </div>
  );
};
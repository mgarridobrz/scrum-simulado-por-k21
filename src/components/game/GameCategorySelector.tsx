import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface GameCategorySelectorProps {
  onSelectCategory: (category: string, questionCount: 5 | 10) => void;
}

const categories = [
  { id: 'fundamentals', name: 'Fundamentos', nameEn: 'Fundamentals' },
  { id: 'roles', name: 'Papéis', nameEn: 'Roles' },
  { id: 'events', name: 'Eventos', nameEn: 'Events' },
  { id: 'artifacts', name: 'Artefatos', nameEn: 'Artifacts' },
  { id: 'all', name: 'Todas as Categorias', nameEn: 'All Categories' }
];

const questionCounts = [
  { count: 5 as const, time: '5' },
  { count: 10 as const, time: '10' }
];

export const GameCategorySelector: React.FC<GameCategorySelectorProps> = ({ onSelectCategory }) => {
  const { language } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">
          {getTranslation(language, 'selectCategory')}
        </h2>
        <p className="text-muted-foreground">
          Escolha uma categoria e o número de questões para começar o jogo
        </p>
      </div>

      <div className="grid gap-6">
        {categories.map((category) => (
          <Card key={category.id} className="p-6">
            <div className="text-center mb-4">
              <h3 className="text-lg font-semibold mb-2">
                {language === 'pt' ? category.name : category.nameEn}
              </h3>
              <Badge variant="outline" className="mb-4">
                {category.id}
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {questionCounts.map((option) => (
                <Button
                  key={option.count}
                  onClick={() => onSelectCategory(category.id, option.count)}
                  variant="outline"
                  className="flex flex-col p-4 h-auto hover:bg-primary hover:text-primary-foreground"
                >
                  <span className="text-2xl font-bold mb-1">
                    {option.count}
                  </span>
                  <span className="text-xs">
                    {getTranslation(language, 'questions')}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    ~{option.time} min
                  </span>
                </Button>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
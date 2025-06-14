
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';

interface QuizSizeSelectorProps {
  onSelectSize: (size: number) => void;
}

const QuizSizeSelector = ({ onSelectSize }: QuizSizeSelectorProps) => {
  const { language } = useLanguage();
  
  // Size options with their descriptions
  const sizeOptions = [
    { 
      size: 10, 
      title: getTranslation(language, 'quickQuiz'), 
      time: `${getTranslation(language, 'approxTime')} 10 ${getTranslation(language, 'minutes')}` 
    },
    { 
      size: 25, 
      title: getTranslation(language, 'intermediateQuiz'), 
      time: `${getTranslation(language, 'approxTime')} 25 ${getTranslation(language, 'minutes')}` 
    },
    { 
      size: 50, 
      title: getTranslation(language, 'completeQuiz'), 
      time: `${getTranslation(language, 'approxTime')} 50 ${getTranslation(language, 'minutes')}` 
    }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-k21-black">
        {getTranslation(language, 'selectQuestionCount')}
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sizeOptions.map((option) => (
          <Card 
            key={option.size}
            className="p-6 text-center cursor-pointer border-2 hover:border-k21-teal transition-colors"
            onClick={() => onSelectSize(option.size)}
          >
            <h3 className="text-2xl font-bold text-k21-black mb-2">{option.size}</h3>
            <p className="text-sm text-muted-foreground">{option.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{option.time}</p>
            <Button 
              className="mt-4 bg-k21-teal hover:bg-k21-teal/90 w-full"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSize(option.size);
              }}
            >
              {getTranslation(language, 'start')}
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizSizeSelector;

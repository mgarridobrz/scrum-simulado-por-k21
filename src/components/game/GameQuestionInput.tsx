import React, { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface GameQuestionInputProps {
  question: {
    id: number;
    question: string;
    category: string;
    options: Array<{ id: string; text: string }>;
    correctAnswer: string;
  };
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  correctAnswer?: string;
  userAnswer?: string;
}

export const GameQuestionInput: React.FC<GameQuestionInputProps> = ({
  question,
  onAnswer,
  isAnswered,
  correctAnswer,
  userAnswer
}) => {
  const [answer, setAnswer] = useState('');
  const { language } = useLanguage();

  // Get language-specific text
  const questionText = language === 'en' && (question as any).question_en 
    ? (question as any).question_en 
    : question.question;

  useEffect(() => {
    if (userAnswer) {
      setAnswer(userAnswer);
    }
  }, [userAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer.trim() && !isAnswered) {
      onAnswer(answer.trim().toUpperCase());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    const key = e.key.toUpperCase();
    console.log('🔍 GameQuestionInput - Tecla pressionada:', e.key, '-> Normalizada:', key);
    if (['A', 'B', 'C', 'D'].includes(key) && !isAnswered) {
      setAnswer(key);
      console.log('🔍 GameQuestionInput - Enviando resposta:', key);
      onAnswer(key);
    }
  };

  const getOptionStyle = (optionId: string) => {
    if (!isAnswered) return '';
    
    const normalizedCorrectAnswer = correctAnswer?.toUpperCase();
    const normalizedOptionId = optionId.toUpperCase();
    
    if (normalizedOptionId === normalizedCorrectAnswer) {
      return 'border-green-500 bg-green-50 text-green-700';
    }
    
    if (optionId.toUpperCase() === userAnswer?.toUpperCase() && normalizedOptionId !== normalizedCorrectAnswer) {
      return 'border-red-500 bg-red-50 text-red-700';
    }
    
    return 'opacity-50';
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <Badge variant="secondary" className="mb-4">
          {question.category}
        </Badge>
        <h2 className="text-xl font-semibold mb-6">
          {questionText}
        </h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option) => {
          const optionText = language === 'en' && (option as any).text_en 
            ? (option as any).text_en 
            : option.text;
          return (
            <Card 
              key={option.id} 
              className={`p-4 transition-all ${getOptionStyle(option.id)}`}
            >
              <div className="flex items-center space-x-3">
                <span className="font-bold text-lg">
                  {option.id}.
                </span>
                <span className="flex-1">
                  {optionText}
                </span>
              </div>
            </Card>
          );
        })}
      </div>

      {!isAnswered && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-2">
              {getTranslation(language, 'typeLetterToAnswer')}
            </p>
            <Input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value.toUpperCase())}
              onKeyDown={handleKeyPress}
              maxLength={1}
              className="text-center text-2xl font-bold w-20 mx-auto"
              placeholder="?"
              autoFocus
            />
          </div>
        </form>
      )}

      {isAnswered && (
        <div className="text-center space-y-2">
          <div className={`text-lg font-semibold ${
            userAnswer?.toUpperCase() === correctAnswer?.toUpperCase() ? 'text-green-600' : 'text-red-600'
          }`}>
            {userAnswer?.toUpperCase() === correctAnswer?.toUpperCase() ? '✅ Correto!' : '❌ Incorreto!'}
          </div>
          {userAnswer?.toUpperCase() !== correctAnswer?.toUpperCase() && (
            <p className="text-sm text-muted-foreground">
              {getTranslation(language, 'correctAnswer')}: {correctAnswer?.toUpperCase()}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
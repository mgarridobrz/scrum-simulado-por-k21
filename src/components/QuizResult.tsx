
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { QuestionWithCategory } from '@/data/quizData';
import { Card } from '@/components/ui/card';
import QuizQuestion from './QuizQuestion';
import { Progress } from '@/components/ui/progress';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface CategoryStats {
  correct: number;
  total: number;
}

interface QuizResultProps {
  categoryStats: Record<string, CategoryStats>;
  correctAnswers: number;
  totalQuestions: number;
  onRestart: () => void;
  userAnswers?: Record<number, string>;
  questions?: QuestionWithCategory[];
}

const QuizResult = ({ 
  userAnswers, 
  questions, 
  categoryStats, 
  correctAnswers, 
  totalQuestions, 
  onRestart 
}: QuizResultProps) => {
  const [showQuestions, setShowQuestions] = useState(false);
  const score = (correctAnswers / totalQuestions) * 100;
  const formattedScore = score.toFixed(0);
  
  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-k21-gold";
    return "text-red-500";
  };

  const getCategoryLabel = (category: string): string => {
    switch(category) {
      case 'fundamentals': return 'Fundamentos do Scrum';
      case 'roles': return 'Papéis do Scrum';
      case 'events': return 'Eventos do Scrum';
      case 'artifacts': return 'Artefatos do Scrum';
      default: return category;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-k21-black">Resultado do Simulado</h1>
        <p className="text-muted-foreground">
          Você completou o simulado para a certificação Scrum Master
        </p>
        
        <div className="w-40 h-40 rounded-full flex items-center justify-center bg-muted mx-auto border-4 border-k21-gold">
          <div className="text-center">
            <div className={`text-4xl font-bold ${getScoreColor()}`}>{formattedScore}%</div>
            <div className="text-sm text-muted-foreground">{correctAnswers} de {totalQuestions}</div>
          </div>
        </div>
        
        <div className="mt-4">
          {score >= 85 ? (
            <p className="text-green-500 font-medium">Parabéns! Você está pronto para a certificação.</p>
          ) : score >= 70 ? (
            <p className="text-k21-gold font-medium">Bom trabalho! Continue estudando.</p>
          ) : (
            <p className="text-red-500 font-medium">Continue praticando para melhorar sua pontuação.</p>
          )}
        </div>
      </div>
      
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-k21-black border-b pb-2">Desempenho por Categoria</h2>
        <div className="grid gap-4">
          {Object.entries(categoryStats).map(([category, stats]) => {
            const categoryScore = stats.total > 0 ? (stats.correct / stats.total) * 100 : 0;
            return (
              <div key={category} className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium text-k21-black">{getCategoryLabel(category)}</span>
                  <span className={`${getScoreColor()} font-medium`}>
                    {stats.correct} / {stats.total} ({Math.round(categoryScore)}%)
                  </span>
                </div>
                <Progress value={categoryScore} className="h-2" />
              </div>
            );
          })}
        </div>
      </div>
      
      {questions && userAnswers && (
        <div className="space-y-4">
          <div className="flex justify-between items-center border-b pb-2">
            <h2 className="text-xl font-semibold text-k21-black">Revisão das Questões</h2>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setShowQuestions(!showQuestions)}
              className="flex items-center gap-1"
            >
              {showQuestions ? (
                <>Ocultar Questões <ChevronUp size={16} /></>
              ) : (
                <>Mostrar Questões <ChevronDown size={16} /></>
              )}
            </Button>
          </div>
          
          {showQuestions && (
            <div className="space-y-6">
              {questions.map((question) => (
                <Card key={question.id} className="p-6">
                  <QuizQuestion
                    question={question}
                    selectedOption={userAnswers[question.id]}
                    onSelectOption={() => {}}
                    showResult={true}
                  />
                </Card>
              ))}
            </div>
          )}
        </div>
      )}
      
      <div className="flex justify-center pt-4">
        <Button
          onClick={onRestart}
          className="bg-k21-teal hover:bg-k21-teal/90 text-white"
        >
          Reiniciar Simulado
        </Button>
      </div>
    </div>
  );
};

export default QuizResult;


import React from 'react';
import { Button } from "@/components/ui/button";
import { QuestionType } from './QuizQuestion';
import { Card } from '@/components/ui/card';
import QuizQuestion from './QuizQuestion';

interface QuizResultProps {
  userAnswers: Record<number, string>;
  questions: QuestionType[];
  onRestart: () => void;
}

const QuizResult = ({ userAnswers, questions, onRestart }: QuizResultProps) => {
  const correctAnswers = questions.filter(
    (question) => userAnswers[question.id] === question.correctAnswer
  ).length;
  
  const score = (correctAnswers / questions.length) * 100;
  const formattedScore = score.toFixed(0);
  
  const getScoreColor = () => {
    if (score >= 85) return "text-green-500";
    if (score >= 70) return "text-k21-gold";
    return "text-red-500";
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
            <div className="text-sm text-muted-foreground">{correctAnswers} de {questions.length}</div>
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
      
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-k21-black border-b pb-2">Revisão das Questões</h2>
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
      </div>
      
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

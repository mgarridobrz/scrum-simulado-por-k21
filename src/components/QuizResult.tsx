
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Clock, Printer } from 'lucide-react';
import { QuestionWithCategory } from '@/data/quizData';
import QuizQuestion from './QuizQuestion';
import { trackQuizAttempt } from '@/utils/quizTracking';
import { generatePDF } from '@/utils/pdfGenerator';

interface CategoryStat {
  category: string;
  correctCount: number;
  totalCount: number;
}

interface QuizResultProps {
  correctAnswers: number;
  totalQuestions: number;
  categoryStats: CategoryStat[];
  onRestart: () => void;
  questions: QuestionWithCategory[];
  userAnswers: Record<number, string>;
  userData?: { name: string; email: string } | null;
}

const QuizResult = ({
  correctAnswers,
  totalQuestions,
  categoryStats,
  onRestart,
  questions,
  userAnswers,
  userData,
}: QuizResultProps) => {
  const [showQuestions, setShowQuestions] = useState(false);

  // Calculate percentages
  const passPercentage = 85;
  const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
  const passed = scorePercentage >= passPercentage;

  // Format date
  const currentDate = new Date().toLocaleDateString('pt-BR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Track the quiz attempt
  React.useEffect(() => {
    if (userData?.name) {
      trackQuizAttempt(
        userData.name,
        userData.email || '',
        totalQuestions,
        scorePercentage
      );
    }
  }, [userData, totalQuestions, scorePercentage]);

  return (
    <div className="max-w-3xl mx-auto w-full animate-fade-in">
      <Card className="shadow-lg border-t-4 border-t-k21-gold">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold text-gray-800">
            Resultados do Simulado
          </CardTitle>
          <CardDescription className="text-gray-600 flex items-center justify-center gap-1">
            <Clock size={14} className="text-gray-400" />
            {currentDate}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Score section */}
          <div className="flex flex-col items-center justify-center text-center p-3 bg-gray-50 rounded-lg border border-gray-100">
            <div className="text-5xl font-bold mb-2 text-k21-gold">
              {scorePercentage}%
            </div>
            <div className="text-sm text-gray-500 mb-4">
              {correctAnswers} de {totalQuestions} questões corretas
            </div>

            {passed ? (
              <Badge variant="default" className="bg-green-600 flex gap-1 py-1 px-3 text-white">
                <CheckCircle size={16} />
                <span>Aprovado</span>
              </Badge>
            ) : (
              <Badge variant="default" className="bg-amber-600 flex gap-1 py-1 px-3 text-white">
                <AlertCircle size={16} />
                <span>Não Aprovado</span>
              </Badge>
            )}

            <div className="text-xs text-gray-500 mt-2">
              Mínimo para aprovação: {passPercentage}%
            </div>
          </div>

          {/* Category breakdown */}
          <div>
            <h3 className="font-medium text-gray-800 mb-3">Desempenho por Categoria</h3>
            <div className="space-y-3">
              {categoryStats.map((stat, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="text-sm font-medium text-gray-600">{stat.category}</div>
                  <div className="flex items-center gap-2">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          (stat.correctCount / stat.totalCount) * 100 >= 85
                            ? 'bg-green-500'
                            : (stat.correctCount / stat.totalCount) * 100 >= 60
                            ? 'bg-yellow-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: `${(stat.correctCount / stat.totalCount) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-sm text-gray-500">
                      {stat.correctCount}/{stat.totalCount}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Toggle questions button */}
          <div className="pt-2">
            <Button
              variant="outline"
              onClick={() => setShowQuestions(!showQuestions)}
              className="w-full"
            >
              {showQuestions ? 'Ocultar Questões' : 'Mostrar Todas as Questões'}
            </Button>
          </div>

          {/* Questions details */}
          {showQuestions && (
            <div className="space-y-8 pt-2">
              <h3 className="font-medium text-gray-800 mb-3">Detalhes das Questões</h3>
              {questions.map((question, index) => (
                <div 
                  key={question.id}
                  className={`p-4 rounded-lg border ${
                    userAnswers[question.id] === question.correctAnswer
                      ? 'bg-green-50 border-green-200'
                      : 'bg-red-50 border-red-200'
                  }`}
                >
                  <div className="mb-2 flex justify-between items-center">
                    <span className="text-sm font-medium text-gray-500">
                      Questão {index + 1} • {question.category}
                    </span>
                    <Badge
                      variant="default"
                      className={`${
                        userAnswers[question.id] === question.correctAnswer
                          ? 'bg-green-600'
                          : 'bg-red-600'
                      } text-white`}
                    >
                      {userAnswers[question.id] === question.correctAnswer
                        ? 'Correta'
                        : 'Incorreta'}
                    </Badge>
                  </div>
                  <QuizQuestion
                    question={question}
                    selectedOption={userAnswers[question.id]}
                    onSelectOption={() => {}}
                    showResult={true}
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row gap-3 pt-0">
          <Button 
            onClick={onRestart} 
            variant="default" 
            className="w-full sm:w-auto"
          >
            Voltar para Início
          </Button>
          
          <Button 
            onClick={() => generatePDF(questions, userAnswers, correctAnswers, totalQuestions, categoryStats, userData)} 
            variant="outline" 
            className="w-full sm:w-auto flex items-center gap-2"
          >
            <Printer size={16} />
            Baixar Resultados (PDF)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default QuizResult;

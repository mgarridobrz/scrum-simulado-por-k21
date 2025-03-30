
import React, { useState } from 'react';
import Header from '@/components/Header';
import QuizQuestion from '@/components/QuizQuestion';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import { Button } from '@/components/ui/button';
import { getRandomQuestions, getCategoryStats, QuestionWithCategory } from '@/data/quizData';
import { Card } from '@/components/ui/card';
import StartScreen from '@/components/StartScreen';
import { ArrowRight } from 'lucide-react';

type QuizState = 'start' | 'in-progress' | 'completed';

const Index = () => {
  const [quizState, setQuizState] = useState<QuizState>('start');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizQuestions, setQuizQuestions] = useState<QuestionWithCategory[]>([]);

  const currentQuestion = quizQuestions[currentQuestionIndex];
  const totalQuestions = quizQuestions.length;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;
  const hasAnsweredCurrentQuestion = currentQuestion && userAnswers[currentQuestion.id] !== undefined;

  const handleStartQuiz = (questionsCount: number) => {
    // Get random questions based on selected count
    const randomQuestions = getRandomQuestions(questionsCount);
    setQuizQuestions(randomQuestions);
    setQuizState('in-progress');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  };

  const handleSelectOption = (optionId: string) => {
    if (!currentQuestion) return;
    
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionId,
    }));
  };

  const handleNextQuestion = () => {
    if (isLastQuestion) {
      setQuizState('completed');
    } else {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handleRestartQuiz = () => {
    setQuizState('start');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setQuizQuestions([]);
  };

  if (quizState === 'start') {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-10">
          <StartScreen onStart={handleStartQuiz} />
        </main>
      </div>
    );
  }

  if (quizState === 'completed') {
    const categoryStats = getCategoryStats(userAnswers, quizQuestions);
    
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container py-10">
          <QuizResult
            userAnswers={userAnswers}
            questions={quizQuestions}
            categoryStats={categoryStats}
            onRestart={handleRestartQuiz}
          />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container py-10">
        <div className="max-w-3xl mx-auto">
          <QuizProgress
            currentQuestion={currentQuestionIndex + 1}
            totalQuestions={totalQuestions}
            className="mb-8"
          />
          
          {currentQuestion && (
            <Card className="p-8 shadow-sm animate-fade-in">
              <QuizQuestion
                question={currentQuestion}
                selectedOption={userAnswers[currentQuestion.id] || null}
                onSelectOption={handleSelectOption}
              />
              
              <div className="mt-8 flex justify-end">
                <Button
                  onClick={handleNextQuestion}
                  disabled={!hasAnsweredCurrentQuestion}
                  className="bg-k21-teal hover:bg-k21-teal/90 text-white"
                >
                  {isLastQuestion ? 'Finalizar' : 'Próxima'}
                  {!isLastQuestion && <ArrowRight className="ml-2 h-4 w-4" />}
                </Button>
              </div>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
};

export default Index;

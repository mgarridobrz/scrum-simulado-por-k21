import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StartScreen from '@/components/StartScreen';
import QuizQuestion from '@/components/QuizQuestion';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import { getRandomQuestions, getCategoryStats, QuestionWithCategory } from '@/data/quizData';

const Index = () => {
  const [status, setStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSize, setQuizSize] = useState<number>(5);

  const handleStart = () => {
    const selectedQuestions = getRandomQuestions(quizSize);
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setStatus('playing');
  };

  const handleAnswer = (questionId: number, answer: string) => {
    setUserAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: answer,
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setStatus('finished');
    }
  };

  const handleSizeChange = (size: number) => {
    setQuizSize(size);
  };

  const handleRestart = () => {
    setStatus('ready');
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const showResult = status === 'finished';

  const categoryStats = showResult
    ? getCategoryStats(userAnswers, questions)
    : null;

  const correctAnswersCount = showResult
    ? questions.filter(question => userAnswers[question.id] === question.correctAnswer).length
    : 0;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col">
        {status === 'ready' && (
          <>
            <StartScreen 
              onStart={handleStart} 
              onSizeChange={handleSizeChange} 
              quizSize={quizSize}
            />
            <div className="mt-4 text-center">
              <Link to="/validate-questions">
                <Button variant="outline">Validar Perguntas (Especialistas)</Button>
              </Link>
            </div>
          </>
        )}
        
        {status === 'playing' && currentQuestion && (
          <>
            <QuizProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
            <QuizQuestion
              question={currentQuestion}
              selectedOption={userAnswers[currentQuestion.id] || null}
              onSelectOption={(optionId) => handleAnswer(currentQuestion.id, optionId)}
            />
            <div className="flex justify-end mt-4">
              <Button onClick={handleNextQuestion} disabled={!userAnswers[currentQuestion.id]}>
                {isLastQuestion ? 'Ver Resultados' : 'Próxima Pergunta'}
              </Button>
            </div>
          </>
        )}

        {status === 'finished' && categoryStats && (
          <QuizResult
            categoryStats={categoryStats}
            correctAnswers={correctAnswersCount}
            totalQuestions={questions.length}
            onRestart={handleRestart}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

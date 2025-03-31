
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StartScreen from '@/components/StartScreen';
import QuizQuestion from '@/components/QuizQuestion';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import { getRandomQuestions, getCategoryStats, QuestionWithCategory, getApprovedQuestions } from '@/data/quizData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { trackQuizAttempt } from '@/utils/quizTracking';

interface UserData {
  name: string;
  email: string;
}

const Index = () => {
  const [status, setStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [approvedQuestionsCount, setApprovedQuestionsCount] = useState<number>(0);
  const [userData, setUserData] = useState<UserData | null>(null);

  // Carregar contagem de questões aprovadas ao iniciar o componente
  useEffect(() => {
    // Get count of approved questions
    const approvedQuestions = getApprovedQuestions();
    setApprovedQuestionsCount(approvedQuestions.length);
  }, []);

  // Combined function to handle quiz start with size selection and user data
  const handleStartWithSize = (selectedSize: number, userInfo?: UserData) => {
    console.log(`Index - Starting quiz with size: ${selectedSize}`);
    console.log("User data:", userInfo);
    
    if (userInfo) {
      setUserData(userInfo);
      
      // Track this quiz attempt
      trackQuizAttempt(userInfo.name, userInfo.email, selectedSize);
    }
    
    // Get random questions based on the selected quiz size
    const selectedQuestions = getRandomQuestions(selectedSize);
    console.log(`Generated quiz with ${selectedQuestions.length} out of ${selectedSize} requested questions`);
    
    // Set the questions and reset other states
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

  const handleRestart = () => {
    setStatus('ready');
    setUserData(null);
    // Recarregar a contagem de questões aprovadas ao reiniciar
    const approvedQuestions = getApprovedQuestions();
    setApprovedQuestionsCount(approvedQuestions.length);
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
            {approvedQuestionsCount === 0 ? (
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Atenção</AlertTitle>
                <AlertDescription>
                  Nenhuma questão foi aprovada ainda. Todas as questões serão utilizadas no quiz.
                </AlertDescription>
              </Alert>
            ) : (
              <Alert className="mb-6">
                <Info className="h-4 w-4" />
                <AlertTitle>Informação</AlertTitle>
                <AlertDescription>
                  {approvedQuestionsCount} questões foram aprovadas e serão utilizadas no quiz.
                </AlertDescription>
              </Alert>
            )}
            <StartScreen onStart={handleStartWithSize} />
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
            questions={questions}
            userAnswers={userAnswers}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

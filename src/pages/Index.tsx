
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import StartScreen from '@/components/StartScreen';
import QuizQuestion from '@/components/QuizQuestion';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import QuizScoreCounter from '@/components/QuizScoreCounter';
import { getRandomQuestions, getCategoryStats, QuestionWithCategory, getApprovedQuestions } from '@/data/quizData';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Lock } from "lucide-react";

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
  const [canProceed, setCanProceed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);

  useEffect(() => {
    const approvedQuestions = getApprovedQuestions();
    setApprovedQuestionsCount(approvedQuestions.length);
  }, []);

  const handleStartWithSize = (selectedSize: number, userInfo?: UserData) => {
    console.log(`Index - Starting quiz with size: ${selectedSize}`);
    console.log("User data:", userInfo);
    
    if (userInfo) {
      setUserData(userInfo);
    }
    
    const selectedQuestions = getRandomQuestions(selectedSize);
    console.log(`Generated quiz with ${selectedQuestions.length} out of ${selectedSize} requested questions`);
    
    setQuestions(selectedQuestions);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCanProceed(false);
    setCorrectCount(0);
    setIncorrectCount(0);
    setStatus('playing');
  };

  const handleAnswer = (questionId: number, answer: string) => {
    // Only set answer if not already answered
    if (!userAnswers[questionId]) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: answer,
      }));

      // Update correct/incorrect counters
      const currentQuestion = questions.find(q => q.id === questionId);
      if (currentQuestion) {
        if (answer === currentQuestion.correctAnswer) {
          setCorrectCount(prev => prev + 1);
        } else {
          setIncorrectCount(prev => prev + 1);
        }
      }
      
      // Enable proceed button after answering
      setCanProceed(true);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCanProceed(false);
    } else {
      setStatus('finished');
    }
  };

  const handleRestart = () => {
    setStatus('ready');
    setUserData(null);
    setCorrectCount(0);
    setIncorrectCount(0);
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
    : correctCount;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col relative">
        {/* Admin Lock Button - Positioned at bottom right */}
        <div className="fixed bottom-4 right-4 z-50">
          <Link to="/validate-questions">
            <Button variant="ghost" size="icon" className="bg-white/70 hover:bg-white text-gray-500 hover:text-gray-700 shadow-sm border" title="Área administrativa">
              <Lock size={20} />
            </Button>
          </Link>
        </div>
        
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
          </>
        )}
        
        {status === 'playing' && currentQuestion && (
          <>
            <QuizProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={questions.length}
            />
            <div className="bg-gray-200 rounded-lg p-5 shadow">
              {/* Place the score counter inside the question container */}
              <QuizScoreCounter correctCount={correctCount} incorrectCount={incorrectCount} />
              <QuizQuestion
                question={currentQuestion}
                selectedOption={userAnswers[currentQuestion.id] || null}
                onSelectOption={(optionId) => handleAnswer(currentQuestion.id, optionId)}
                onContinue={canProceed ? handleNextQuestion : undefined}
              />
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
            userData={userData}
          />
        )}
      </div>
    </div>
  );
};

export default Index;

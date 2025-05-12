
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StartScreen from '@/components/StartScreen';
import QuizQuestion from '@/components/QuizQuestion';
import QuizProgress from '@/components/QuizProgress';
import QuizResult from '@/components/QuizResult';
import QuizScoreCounter from '@/components/QuizScoreCounter';
import PublicStatsCounter from '@/components/PublicStatsCounter';
import ScoreEvolutionChart from '@/components/ScoreEvolutionChart';
import { getRandomQuestionsWithBalance, getCategoryStats } from '@/utils/quizTracking';
import { Lock, Home } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface UserData {
  name: string;
  email: string;
}

const Index = () => {
  const [status, setStatus] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [totalQuestionsCount, setTotalQuestionsCount] = useState(0);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [canProceed, setCanProceed] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [completionTime, setCompletionTime] = useState<number | null>(null);

  useEffect(() => {
    const loadQuestionCount = async () => {
      try {
        const count = await getQuestionCount();
        setTotalQuestionsCount(count);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading question count:", error);
        setIsLoading(false);
      }
    };
    
    loadQuestionCount();
  }, []);

  const getQuestionCount = async () => {
    try {
      const { count, error } = await supabase
        .from('quiz_questions')
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        console.error("Error counting questions:", error);
        return 0;
      }
      
      return count || 0;
    } catch (error) {
      console.error("Error counting questions:", error);
      return 0;
    }
  };

  useEffect(() => {
    const importMigration = async () => {
      try {
        const module = await import('../utils/migrateQuestionsToDb');
        (window as any).migrateQuestionsToDatabase = module.migrateQuestionsToDatabase;
        console.log("Migration utility loaded. Run migrateQuestionsToDatabase() in console to migrate questions.");
      } catch (error) {
        console.error("Error loading migration utility:", error);
      }
    };
    
    importMigration();
  }, []);

  const handleStartWithSize = async (selectedSize: number, userInfo?: UserData) => {
    console.log(`Index - Starting quiz with size: ${selectedSize}`);
    console.log("User data:", userInfo);
    
    if (userInfo) {
      setUserData(userInfo);
    }
    
    setIsLoading(true);
    try {
      const selectedQuestions = await getRandomQuestionsWithBalance(selectedSize);
      console.log(`Generated quiz with ${selectedQuestions.length} out of ${selectedSize} requested questions`);
      
      setQuestions(selectedQuestions);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setCanProceed(false);
      setCorrectCount(0);
      setIncorrectCount(0);
      setStatus('playing');
      
      // Start tracking time when quiz begins
      setStartTime(Date.now());
      setCompletionTime(null);
    } catch (error) {
      console.error("Error getting questions:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAnswer = (questionId: number, answer: string) => {
    if (!userAnswers[questionId]) {
      setUserAnswers(prevAnswers => ({
        ...prevAnswers,
        [questionId]: answer,
      }));

      const currentQuestion = questions.find(q => q.id === questionId);
      if (currentQuestion) {
        if (answer === currentQuestion.correctAnswer) {
          setCorrectCount(prev => prev + 1);
        } else {
          setIncorrectCount(prev => prev + 1);
        }
      }
      
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
  };

  const handleReturnHome = () => {
    setStatus('ready');
    setUserData(null);
    setCorrectCount(0);
    setIncorrectCount(0);
    setUserAnswers({});
    setStartTime(null);
    setCompletionTime(null);
  };

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const showResult = status === 'finished';

  const categoryStats = showResult
    ? getCategoryStats(userAnswers, questions)
    : [];

  const correctAnswersCount = showResult
    ? questions.filter(question => userAnswers[question.id] === question.correctAnswer).length
    : correctCount;

  useEffect(() => {
    if (status === 'finished' && startTime) {
      const endTime = Date.now();
      const elapsedSeconds = Math.floor((endTime - startTime) / 1000);
      setCompletionTime(elapsedSeconds);
      console.log(`Quiz completed in ${elapsedSeconds} seconds`);
    }
  }, [status, startTime]);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-1 flex flex-col relative">
        <div className="fixed bottom-4 right-4 z-50">
          <Link to="/validate-questions">
            <Button variant="ghost" size="icon" className="bg-white/70 hover:bg-white text-gray-500 hover:text-gray-700 shadow-sm border" title="Área administrativa">
              <Lock size={20} />
            </Button>
          </Link>
        </div>
        
        {status === 'ready' && (
          <>
            <StartScreen onStart={handleStartWithSize} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <PublicStatsCounter />
              <ScoreEvolutionChart />
            </div>
          </>
        )}
        
        {status === 'playing' && currentQuestion && (
          <>
            <div className="mb-4">
              <QuizProgress
                currentQuestion={currentQuestionIndex + 1}
                totalQuestions={questions.length}
              />
            </div>
            <div className="bg-white rounded-lg p-5 shadow-md border border-gray-100">
              <QuizScoreCounter correctCount={correctCount} incorrectCount={incorrectCount} />
              <QuizQuestion
                question={currentQuestion}
                selectedOption={userAnswers[currentQuestion.id] || null}
                onSelectOption={(optionId) => handleAnswer(currentQuestion.id, optionId)}
                onContinue={canProceed ? handleNextQuestion : undefined}
              />
            </div>
            <div className="mt-6 text-center">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleReturnHome}
                className="flex items-center gap-1"
              >
                <Home size={16} className="text-k21-teal" />
                <span>Voltar para página inicial</span>
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
            userData={userData}
            completionTime={completionTime}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Index;

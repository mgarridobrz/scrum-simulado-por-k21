import React, { useState, useEffect } from 'react';
import { QuestionWithCategory } from '@/data/types';
import { trackQuizAttempt, fetchRandomQuestions } from '@/utils/quizTracking';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMetaTags } from '@/hooks/useMetaTags';
import { getTranslation } from '@/utils/translations';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StartScreen from '@/components/StartScreen';
import QuizQuestion from '@/components/QuizQuestion';
import QuizResult from '@/components/QuizResult';
import QuizProgress from '@/components/QuizProgress';
import PublicStatsCounter from '@/components/PublicStatsCounter';
import RestrictedAreaButton from '@/components/RestrictedAreaButton';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Index = () => {
  const { language } = useLanguage();
  useMetaTags(); // Add meta tags management
  
  const [currentScreen, setCurrentScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSize, setQuizSize] = useState(20);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load questions when quiz starts or language changes
  useEffect(() => {
    if (currentScreen === 'quiz' && questions.length === 0) {
      loadQuestions();
    }
  }, [currentScreen, quizSize, language]);

  const loadQuestions = async () => {
    try {
      setIsLoading(true);
      console.log(`Loading ${quizSize} questions for language: ${language}`);
      const fetchedQuestions = await fetchRandomQuestions(quizSize, language);
      setQuestions(fetchedQuestions);
      console.log(`Loaded ${fetchedQuestions.length} questions`);
    } catch (error) {
      console.error("Error loading questions:", error);
      // Fallback to empty array to prevent app crash
      setQuestions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStartQuiz = (size: number, userData?: { name: string; email: string }) => {
    setQuizSize(size);
    if (userData) {
      setUserInfo(userData);
    }
    setCurrentScreen('quiz');
    setStartTime(new Date());
    setUserAnswers({});
    setCurrentQuestionIndex(0);
    setQuestions([]); // Reset questions to trigger reload with new size/language
  };

  const handleAnswerSelect = (questionId: number, answer: string) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      handleFinishQuiz();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleFinishQuiz = async () => {
    const endDateTime = new Date();
    setEndTime(endDateTime);

    // Calculate score
    const score = questions.reduce((total, question) => {
      return total + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    // Calculate completion time in seconds
    const completionTimeSeconds = startTime 
      ? Math.round((endDateTime.getTime() - startTime.getTime()) / 1000)
      : 0;

    // Track the quiz attempt with language information
    try {
      await trackQuizAttempt(
        userInfo.name,
        userInfo.email || null,
        score,
        questions.length,
        userAnswers,
        questions,
        completionTimeSeconds,
        language
      );
      console.log(`Quiz attempt tracked for language: ${language}`);
    } catch (error) {
      console.error("Error tracking quiz attempt:", error);
    }

    setCurrentScreen('result');
  };

  const handleRestartQuiz = () => {
    setCurrentScreen('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setStartTime(null);
    setEndTime(null);
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentScreen === 'start' && (
          <>
            <StartScreen onStart={handleStartQuiz} />
            
            {/* Banner do Jogo */}
            <div className="mb-8 p-6 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="text-center md:text-left">
                  <h2 className="text-2xl font-bold text-primary mb-2">
                    🎮 {getTranslation(language, 'gameMode')}
                  </h2>
                  <p className="text-muted-foreground">
                    {language === 'pt' 
                      ? 'Teste sua velocidade! Responda rapidamente e compita no ranking global.'
                      : 'Test your speed! Answer quickly and compete in the global ranking.'
                    }
                  </p>
                </div>
                <Button 
                  onClick={() => window.location.href = '/game'}
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-6 text-lg whitespace-nowrap"
                >
                  🚀 {language === 'pt' ? 'Jogar Agora' : 'Play Now'}
                </Button>
              </div>
            </div>
            
            {/* Public Statistics */}
            <PublicStatsCounter />
            
            {/* Restricted Area Button */}
            <RestrictedAreaButton />
          </>
        )}

        {currentScreen === 'quiz' && (
          <div className="max-w-4xl mx-auto">
            {isLoading ? (
              <Card className="p-8">
                <div className="text-center">
                  <div className="text-lg mb-4">
                    {getTranslation(language, 'loadingQuestions')}
                  </div>
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-k21-teal mx-auto"></div>
                </div>
              </Card>
            ) : questions.length === 0 ? (
              <Card className="p-8">
                <div className="text-center">
                  <div className="text-lg text-red-600">
                    {getTranslation(language, 'errorLoadingQuestions')}
                  </div>
                </div>
              </Card>
            ) : (
              <>
                <QuizProgress 
                  currentQuestion={currentQuestionIndex + 1}
                  totalQuestions={questions.length}
                />
                
                {currentQuestion && (
                  <QuizQuestion
                    question={currentQuestion}
                    selectedOption={userAnswers[currentQuestion.id]}
                    onSelectOption={handleAnswerSelect}
                    onNext={handleNextQuestion}
                    onPrevious={handlePreviousQuestion}
                    canGoPrevious={currentQuestionIndex > 0}
                    isLastQuestion={currentQuestionIndex === questions.length - 1}
                  />
                )}
              </>
            )}
          </div>
        )}

        {currentScreen === 'result' && (
          <QuizResult
            score={questions.reduce((total, question) => {
              return total + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
            }, 0)}
            totalQuestions={questions.length}
            questions={questions}
            userAnswers={userAnswers}
            onRestart={handleRestartQuiz}
            completionTime={startTime && endTime ? Math.round((endTime.getTime() - startTime.getTime()) / 1000) : 0}
            userName={userInfo.name}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;

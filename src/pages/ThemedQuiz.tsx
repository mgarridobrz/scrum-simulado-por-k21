import React, { useState, useEffect } from 'react';
import { QuestionWithCategory } from '@/data/types';
import { QuizTheme } from '@/types/theme';
import { trackQuizAttempt, fetchRandomQuestions } from '@/utils/quizTracking';
import { fetchThemeBySlug } from '@/utils/themeService';
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
import { useNavigate } from 'react-router-dom';

interface ThemedQuizProps {
  themeSlug: string;
  showStats?: boolean;
  showAdminButton?: boolean;
}

const ThemedQuiz: React.FC<ThemedQuizProps> = ({ 
  themeSlug, 
  showStats = true, 
  showAdminButton = true 
}) => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  useMetaTags();
  
  const [theme, setTheme] = useState<QuizTheme | null>(null);
  const [themeLoading, setThemeLoading] = useState(true);
  const [themeError, setThemeError] = useState<string | null>(null);
  
  const [currentScreen, setCurrentScreen] = useState<'start' | 'quiz' | 'result'>('start');
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizSize, setQuizSize] = useState(20);
  const [userInfo, setUserInfo] = useState<{ name: string; email: string }>({ name: '', email: '' });
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Load theme on mount
  useEffect(() => {
    const loadTheme = async () => {
      setThemeLoading(true);
      setThemeError(null);
      try {
        const loadedTheme = await fetchThemeBySlug(themeSlug);
        if (loadedTheme) {
          setTheme(loadedTheme);
        } else {
          setThemeError(`Tema '${themeSlug}' não encontrado.`);
        }
      } catch (error) {
        console.error("Error loading theme:", error);
        setThemeError("Erro ao carregar tema.");
      } finally {
        setThemeLoading(false);
      }
    };
    
    loadTheme();
  }, [themeSlug]);

  // Load questions when quiz starts
  useEffect(() => {
    if (currentScreen === 'quiz' && theme) {
      loadQuestions();
    }
  }, [currentScreen, quizSize, language, theme]);

  const loadQuestions = async () => {
    if (!theme) return;
    
    try {
      setIsLoading(true);
      console.log(`Loading ${quizSize} questions for theme: ${theme.slug}, language: ${language}`);
      const fetchedQuestions = await fetchRandomQuestions(quizSize, language, undefined, theme.id);
      setQuestions(fetchedQuestions);
      console.log(`Loaded ${fetchedQuestions.length} questions`);
    } catch (error) {
      console.error("Error loading questions:", error);
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
    setQuestions([]);
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
    if (!theme) return;
    
    const endDateTime = new Date();
    setEndTime(endDateTime);

    const score = questions.reduce((total, question) => {
      return total + (userAnswers[question.id] === question.correctAnswer ? 1 : 0);
    }, 0);

    const completionTimeSeconds = startTime 
      ? Math.round((endDateTime.getTime() - startTime.getTime()) / 1000)
      : 0;

    try {
      await trackQuizAttempt(
        userInfo.name,
        userInfo.email || null,
        score,
        questions.length,
        userAnswers,
        questions,
        completionTimeSeconds,
        language,
        theme.id
      );
      console.log(`Quiz attempt tracked for theme: ${theme.slug}, language: ${language}`);
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

  // Loading theme state
  if (themeLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-k21-teal mx-auto mb-4"></div>
            <p className="text-gray-600">Carregando tema...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Theme error state
  if (themeError || !theme) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <Card className="max-w-md mx-auto p-8 text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Tema não encontrado</h2>
            <p className="text-gray-600 mb-4">{themeError || "Este tema não existe ou está inativo."}</p>
            <button 
              onClick={() => navigate('/')}
              className="text-k21-teal hover:underline"
            >
              Voltar ao início
            </button>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {currentScreen === 'start' && (
          <>
            <StartScreen 
              onStart={handleStartQuiz} 
              customSubtitle={theme.subtitle || undefined}
              themeName={theme.name}
            />
            
            {/* Public Statistics - only for CSM theme */}
            {showStats && themeSlug === 'csm' && <PublicStatsCounter />}
            
            {/* Restricted Area Button - only for CSM theme */}
            {showAdminButton && themeSlug === 'csm' && <RestrictedAreaButton />}
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
                  <p className="text-gray-500 mt-2">Este tema ainda não possui questões cadastradas.</p>
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

export default ThemedQuiz;

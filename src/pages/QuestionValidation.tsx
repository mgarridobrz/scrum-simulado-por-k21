import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/question-validation/NavigationBar';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AuthScreen from '@/components/question-validation/AuthScreen';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AttemptsList from '@/components/question-validation/AttemptsList';
import { useQuestionValidation } from '@/hooks/useQuestionValidation';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';

const QuestionValidation = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('fundamentals');
  const [showAttempts, setShowAttempts] = useState(false);
  const [attempts, setAttempts] = useState<string[]>([]);
  
  const {
    currentQuestion,
    currentIndex,
    filteredQuestions,
    filter,
    isLoading,
    approvedQuestions,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    approveQuestion,
    isQuestionApproved,
    updateQuestion
  } = useQuestionValidation();

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const fetchedAttempts = await getTrackedQuizAttempts();
        setAttempts(fetchedAttempts);
      } catch (error) {
        console.error("Error loading attempts:", error);
        setAttempts([]);
      }
    };
    
    loadAttempts();
  }, []);

  const handleAuth = (password: string) => {
    if (password === "120703") {
      setAuthenticated(true);
      localStorage.setItem('validationPageAuthenticated', 'true');
    } else {
      alert('Senha incorreta');
    }
  };

  React.useEffect(() => {
    const isAuth = localStorage.getItem('validationPageAuthenticated') === 'true';
    if (isAuth) {
      setAuthenticated(true);
    }
  }, []);

  if (!authenticated) {
    return <AuthScreen onAuthenticated={handleAuth} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <NavigationBar 
        currentIndex={currentIndex}
        totalQuestions={filteredQuestions.length}
        filter={filter}
        onFilterChange={setFilter}
        onNavigatePrevious={goToPreviousQuestion}
        onNavigateNext={goToNextQuestion}
        onShowAttempts={() => setShowAttempts(!showAttempts)}
        onLogout={() => {
          localStorage.removeItem('validationPageAuthenticated');
          setAuthenticated(false);
        }}
        onNavigateHome={() => window.location.href = '/'}
      />
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <div className="mb-6">
          <GlobalStatsCounter />
        </div>

        {showAttempts ? (
          <AttemptsList 
            open={showAttempts}
            onOpenChange={setShowAttempts}
            attempts={attempts}
            onAttemptsCleared={() => {}}
          />
        ) : (
          currentQuestion && (
            <QuestionEditor
              question={currentQuestion}
              isApproved={isQuestionApproved(currentQuestion.id)}
              onSave={updateQuestion}
              onApprove={approveQuestion}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuestionValidation;

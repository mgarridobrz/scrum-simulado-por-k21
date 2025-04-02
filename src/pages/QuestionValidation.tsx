
import React, { useState, useEffect } from 'react';
import NavigationBar from '@/components/question-validation/NavigationBar';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AuthScreen from '@/components/question-validation/AuthScreen';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AttemptsList from '@/components/question-validation/AttemptsList';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Info } from 'lucide-react';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import { useQuestions } from '@/hooks/useQuestions';

const QuestionValidation = () => {
  const [authenticated, setAuthenticated] = useState(false);
  const [showAttempts, setShowAttempts] = useState(false);
  const [attemptFilters, setAttemptFilters] = useState({
    page: 1,
    pageSize: 10,
    name: '',
    email: '',
    orderBy: 'created_at',
    orderDirection: 'desc' as 'asc' | 'desc'
  });
  const [attempts, setAttempts] = useState<string[]>([]);
  const [totalAttempts, setTotalAttempts] = useState(0);
  
  const {
    currentQuestion,
    currentIndex,
    filteredQuestions,
    filter,
    isLoading,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    saveQuestion
  } = useQuestions();

  useEffect(() => {
    const loadAttempts = async () => {
      try {
        const result = await getTrackedQuizAttempts(attemptFilters);
        setAttempts(result.attempts);
        setTotalAttempts(result.totalCount);
      } catch (error) {
        console.error("Error loading attempts:", error);
        setAttempts([]);
        setTotalAttempts(0);
      }
    };
    
    if (showAttempts) {
      loadAttempts();
    }
  }, [showAttempts, attemptFilters]);

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

  const handlePageChange = (page: number) => {
    setAttemptFilters(prev => ({ ...prev, page }));
  };

  const handleFilterChange = (filterKey: string, value: string) => {
    setAttemptFilters(prev => ({
      ...prev, 
      [filterKey]: value,
      page: 1 // Reset to first page when filters change
    }));
  };

  const handleSortChange = (field: string) => {
    setAttemptFilters(prev => {
      const newDirection = prev.orderBy === field && prev.orderDirection === 'desc' ? 'asc' : 'desc';
      return {
        ...prev,
        orderBy: field,
        orderDirection: newDirection
      };
    });
  };

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
            totalCount={totalAttempts}
            currentPage={attemptFilters.page}
            pageSize={attemptFilters.pageSize}
            onPageChange={handlePageChange}
            filters={attemptFilters}
            onFilterChange={handleFilterChange}
            onSortChange={handleSortChange}
          />
        ) : (
          currentQuestion && (
            <QuestionEditor
              question={currentQuestion}
              onSave={saveQuestion}
            />
          )
        )}
      </div>
    </div>
  );
};

export default QuestionValidation;

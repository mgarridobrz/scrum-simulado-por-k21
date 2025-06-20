
import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useMetadata } from '@/hooks/useMetadata';
import { getPageMetadata } from '@/utils/metadata';
import AuthScreen from '@/components/question-validation/AuthScreen';
import NavigationBar from '@/components/question-validation/NavigationBar';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AttemptsList from '@/components/question-validation/AttemptsList';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AssessmentTrendsChart from '@/components/question-validation/AssessmentTrendsChart';
import { useQuestions } from '@/hooks/useQuestions';
import { useAttempts } from '@/hooks/useAttempts';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const QuestionValidation = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Use metadata hook
  const metadata = getPageMetadata('validation', language);
  useMetadata({
    title: metadata.title,
    description: metadata.description,
    url: window.location.href,
    type: 'website'
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState<'questions' | 'attempts' | 'stats' | 'trends'>('questions');
  
  // For questions view
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [filter, setFilter] = useState('all');
  
  const { questions, loading, saveQuestion } = useQuestions(language);
  const filteredQuestions = questions.filter(q => 
    filter === 'all' || q.category === filter
  );

  // For attempts view
  const attemptsData = useAttempts();

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleNavigatePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const handleNavigateNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handleShowAttempts = () => {
    setCurrentView('attempts');
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView === 'questions' && filteredQuestions.length > 0 && (
        <div className="container mx-auto px-4 py-8">
          <NavigationBar
            currentIndex={currentQuestionIndex}
            totalQuestions={filteredQuestions.length}
            filter={filter}
            onFilterChange={setFilter}
            onNavigatePrevious={handleNavigatePrevious}
            onNavigateNext={handleNavigateNext}
            onShowAttempts={handleShowAttempts}
            onNavigateHome={handleNavigateHome}
          />
          
          <QuestionEditor
            question={filteredQuestions[currentQuestionIndex]}
            onSave={saveQuestion}
          />
        </div>
      )}
      
      {currentView === 'questions' && filteredQuestions.length === 0 && !loading && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Nenhuma questão encontrada</h1>
            <Button onClick={handleNavigateHome}>Voltar para início</Button>
          </div>
        </div>
      )}
      
      {currentView === 'questions' && loading && (
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-k21-teal mx-auto"></div>
            <p className="mt-2">Carregando questões...</p>
          </div>
        </div>
      )}
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'attempts' && <AttemptsList {...attemptsData} />}
        {currentView === 'stats' && <GlobalStatsCounter />}
        {currentView === 'trends' && <AssessmentTrendsChart />}
      </main>
    </div>
  );
};

export default QuestionValidation;

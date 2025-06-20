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

const QuestionValidation = () => {
  const { language } = useLanguage();
  
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

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavigationBar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8">
        {currentView === 'questions' && <QuestionEditor />}
        {currentView === 'attempts' && <AttemptsList />}
        {currentView === 'stats' && <GlobalStatsCounter />}
        {currentView === 'trends' && <AssessmentTrendsChart />}
      </main>
    </div>
  );
};

export default QuestionValidation;

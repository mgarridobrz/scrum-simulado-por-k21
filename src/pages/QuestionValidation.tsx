import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionValidation } from '@/hooks/useQuestionValidation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AuthScreen from '@/components/question-validation/AuthScreen';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import NavigationBar from '@/components/question-validation/NavigationBar';
import AttemptsList from '@/components/question-validation/AttemptsList';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AssessmentTrendsChart from "@/components/question-validation/AssessmentTrendsChart";
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import type { QuizAttempt } from '@/data/types';

const QuestionValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();
  
  const { 
    currentQuestion, 
    currentIndex, 
    filteredQuestions, 
    filter,
    isLoading,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    updateQuestion
  } = useQuestionValidation();

  useEffect(() => {
    const savedAuth = localStorage.getItem('validationPageAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadAttempts = async (page = 1) => {
    try {
      setLoading(true);
      console.log("Loading attempts page:", page);
      const { attempts: loadedAttempts, totalCount } = await getTrackedQuizAttempts({
        page,
        pageSize: 10
      });
      
      console.log("Loaded attempts:", loadedAttempts);
      setAttempts(loadedAttempts);
      setTotalPages(Math.ceil(totalCount / 10));
      setCurrentPage(page);
    } catch (error) {
      console.error('Error loading attempts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage: number) => {
    loadAttempts(newPage);
  };

  const handleShowAttempts = () => {
    setActiveTab('attempts');
    loadAttempts();
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    localStorage.setItem('validationPageAuthenticated', 'true');
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {activeTab === 'editor' ? (
        <>
          <NavigationBar
            currentIndex={currentIndex}
            totalQuestions={filteredQuestions.length}
            filter={filter}
            onFilterChange={setFilter}
            onNavigatePrevious={goToPreviousQuestion}
            onNavigateNext={goToNextQuestion}
            onShowAttempts={handleShowAttempts}
            onNavigateHome={handleNavigateHome}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card className="p-6">
                {isLoading ? (
                  <div className="text-center py-20">Carregando...</div>
                ) : currentQuestion ? (
                  <QuestionEditor
                    question={currentQuestion}
                    onSave={updateQuestion}
                  />
                ) : (
                  <div className="text-center py-20">
                    Nenhuma questão encontrada para os filtros selecionados.
                  </div>
                )}
              </Card>
            </div>
            
            <div>
              <GlobalStatsCounter />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Tentativas de Simulado</h1>
            <Button
              variant="outline"
              onClick={() => setActiveTab('editor')}
            >
              Voltar para editor
            </Button>
          </div>
          
          <AttemptsList 
            attempts={attempts} 
            loading={loading} 
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            onRefresh={() => loadAttempts(currentPage)}
          />
        </>
      )}
      <AssessmentTrendsChart />
    </div>
  );
};

export default QuestionValidation;

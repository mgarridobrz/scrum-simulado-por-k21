import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionValidation } from '@/hooks/useQuestionValidation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import AuthScreen from '@/components/question-validation/AuthScreen';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import NavigationBar from '@/components/question-validation/NavigationBar';
import AttemptsList from '@/components/question-validation/AttemptsList';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AssessmentTrendsChart from "@/components/question-validation/AssessmentTrendsChart";
import GameStatsCounter from '@/components/admin/GameStatsCounter';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import type { QuizAttempt } from '@/data/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

const QuestionValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
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

  const handleBackupGameAttempts = async () => {
    setIsBackingUp(true);
    try {
      const { data, error } = await supabase.rpc('backup_all_game_attempts');
      
      if (error) throw error;
      
      const result = data[0];
      if (result.error_message) {
        throw new Error(result.error_message);
      }
      
      toast({
        title: "Backup realizado com sucesso",
        description: `${result.moved_count} tentativas foram movidas para backup`,
      });
    } catch (error) {
      console.error('Error backing up game attempts:', error);
      toast({
        variant: "destructive",
        title: "Erro ao fazer backup",
        description: error.message || "Ocorreu um erro inesperado",
      });
    } finally {
      setIsBackingUp(false);
    }
  };

  const handleRestoreGameAttempts = async () => {
    setIsRestoring(true);
    try {
      const { data, error } = await supabase.rpc('restore_all_game_attempts');
      
      if (error) throw error;
      
      const result = data[0];
      if (result.error_message) {
        throw new Error(result.error_message);
      }
      
      toast({
        title: "Restauração realizada com sucesso",
        description: `${result.restored_count} tentativas foram restauradas`,
      });
    } catch (error) {
      console.error('Error restoring game attempts:', error);
      toast({
        variant: "destructive",
        title: "Erro ao restaurar",
        description: error.message || "Ocorreu um erro inesperado",
      });
    } finally {
      setIsRestoring(false);
    }
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
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Painel de Administração</h1>
        <p className="text-muted-foreground">Gerencie questões, visualize estatísticas e controle dados do sistema</p>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="questions">Edição de Questões</TabsTrigger>
          <TabsTrigger value="statistics">Estatísticas</TabsTrigger>
        </TabsList>

        <TabsContent value="questions" className="space-y-6">
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

              {/* Game Backup Controls */}
              <div className="p-4 bg-muted rounded-lg">
                <h3 className="text-lg font-semibold mb-3">Controles de Backup do Game</h3>
                <div className="flex gap-4">
                  <Button
                    onClick={handleBackupGameAttempts}
                    disabled={isBackingUp}
                    variant="destructive"
                    className="flex-1"
                  >
                    {isBackingUp ? "Fazendo Backup..." : "Backup Game Attempts"}
                  </Button>
                  <Button
                    onClick={handleRestoreGameAttempts}
                    disabled={isRestoring}
                    variant="secondary"
                    className="flex-1"
                  >
                    {isRestoring ? "Restaurando..." : "Restaurar Game Attempts"}
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Use o backup para zerar o ranking do game temporariamente. A restauração recupera todos os dados.
                </p>
              </div>

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
            </>
          ) : (
            <>
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">Tentativas de Simulado</h2>
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
        </TabsContent>

        <TabsContent value="statistics" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Estatísticas do Simulado</h2>
              <GlobalStatsCounter />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Estatísticas do Game</h2>
              <GameStatsCounter />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Tendências de Avaliação</h2>
              <AssessmentTrendsChart />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionValidation;

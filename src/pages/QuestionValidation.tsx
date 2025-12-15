import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuestionValidation } from '@/hooks/useQuestionValidation';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AuthScreen from '@/components/question-validation/AuthScreen';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import NavigationBar from '@/components/question-validation/NavigationBar';
import AttemptsList from '@/components/question-validation/AttemptsList';
import GlobalStatsCounter from '@/components/question-validation/GlobalStatsCounter';
import AssessmentTrendsChart from "@/components/question-validation/AssessmentTrendsChart";
import GameStatsCounter from '@/components/admin/GameStatsCounter';
import ThemeManager from '@/components/admin/ThemeManager';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import { fetchActiveThemes } from '@/utils/themeService';
import { QuizTheme } from '@/types/theme';
import type { QuizAttempt } from '@/data/types';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { ArrowLeft, Settings } from 'lucide-react';

const QuestionValidation = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('editor');
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isBackingUp, setIsBackingUp] = useState(false);
  const [isRestoring, setIsRestoring] = useState(false);
  
  // Theme selection state
  const [themes, setThemes] = useState<QuizTheme[]>([]);
  const [selectedThemeId, setSelectedThemeId] = useState<string | null>(null);
  const [showThemeManager, setShowThemeManager] = useState(false);
  const [themesLoading, setThemesLoading] = useState(true);
  
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const selectedTheme = themes.find(t => t.id === selectedThemeId);
  
  const { 
    currentQuestion, 
    currentIndex, 
    filteredQuestions, 
    filter,
    isLoading,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    updateQuestion,
    setThemeId
  } = useQuestionValidation();

  // Load themes on mount
  useEffect(() => {
    const loadThemes = async () => {
      setThemesLoading(true);
      try {
        const loadedThemes = await fetchActiveThemes();
        setThemes(loadedThemes);
      } catch (error) {
        console.error('Error loading themes:', error);
      } finally {
        setThemesLoading(false);
      }
    };
    loadThemes();
  }, []);

  // Update question validation hook when theme changes
  useEffect(() => {
    if (selectedThemeId && setThemeId) {
      setThemeId(selectedThemeId);
    }
  }, [selectedThemeId, setThemeId]);

  useEffect(() => {
    const savedAuth = localStorage.getItem('validationPageAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const loadAttempts = async (page = 1) => {
    if (!selectedThemeId) return;
    
    try {
      setLoading(true);
      console.log("Loading attempts page:", page, "for theme:", selectedThemeId);
      const { attempts: loadedAttempts, totalCount } = await getTrackedQuizAttempts({
        page,
        pageSize: 10,
        themeId: selectedThemeId
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
    } catch (error: any) {
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
    } catch (error: any) {
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

  const handleThemeSelect = (themeId: string) => {
    setSelectedThemeId(themeId);
    setActiveTab('editor');
  };

  const handleBackToThemeSelection = () => {
    setSelectedThemeId(null);
    setShowThemeManager(false);
  };

  const refreshThemes = async () => {
    const loadedThemes = await fetchActiveThemes();
    setThemes(loadedThemes);
  };

  if (!isAuthenticated) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  // Show theme manager
  if (showThemeManager) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={handleBackToThemeSelection}
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-3xl font-bold">Gestão de Temas</h1>
          <p className="text-muted-foreground">Crie, edite e gerencie os temas de simulado</p>
        </div>
        
        <ThemeManager onThemeChange={refreshThemes} />
      </div>
    );
  }

  // Show theme selection screen
  if (!selectedThemeId) {
    return (
      <div className="container mx-auto py-8 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Painel de Administração</h1>
          <p className="text-muted-foreground">Selecione um tema para gerenciar questões e estatísticas</p>
        </div>

        {themesLoading ? (
          <div className="text-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
            <p>Carregando temas...</p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Theme Management Button */}
            <div className="flex justify-end">
              <Button
                variant="outline"
                onClick={() => setShowThemeManager(true)}
                className="flex items-center gap-2"
              >
                <Settings className="h-4 w-4" />
                Gerenciar Temas
              </Button>
            </div>

            {/* Theme Selection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {themes.map((theme) => (
                <Card 
                  key={theme.id} 
                  className="p-6 cursor-pointer hover:border-primary transition-colors"
                  onClick={() => handleThemeSelect(theme.id)}
                >
                  <h3 className="text-xl font-semibold mb-2">{theme.name}</h3>
                  {theme.description && (
                    <p className="text-muted-foreground text-sm mb-3">{theme.description}</p>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-xs bg-muted px-2 py-1 rounded">
                      slug: {theme.slug}
                    </span>
                    <Button size="sm" variant="secondary">
                      Selecionar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {themes.length === 0 && (
              <div className="text-center py-10">
                <p className="text-muted-foreground">Nenhum tema encontrado.</p>
                <Button 
                  className="mt-4"
                  onClick={() => setShowThemeManager(true)}
                >
                  Criar primeiro tema
                </Button>
              </div>
            )}

            {/* Navigation to Home */}
            <div className="pt-6 border-t">
              <Button variant="outline" onClick={handleNavigateHome}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Voltar ao Início
              </Button>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Show theme-specific admin panel
  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-6">
        <Button
          variant="outline"
          onClick={handleBackToThemeSelection}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar aos Temas
        </Button>
        <h1 className="text-3xl font-bold">{selectedTheme?.name || 'Tema'}</h1>
        <p className="text-muted-foreground">{selectedTheme?.description || 'Gerencie questões e estatísticas'}</p>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="questions">Edição de Questões</TabsTrigger>
          <TabsTrigger value="quiz-statistics">Estatísticas Simulado</TabsTrigger>
          <TabsTrigger value="game-statistics">Estatísticas Modo Jogo</TabsTrigger>
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

              {/* Game Backup Controls - only for CSM theme */}
              {selectedTheme?.slug === 'csm' && (
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
              )}

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
                    <p>Nenhuma questão encontrada para este tema.</p>
                    <p className="text-muted-foreground text-sm mt-2">
                      Use a importação de CSV para adicionar questões.
                    </p>
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

        <TabsContent value="quiz-statistics" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Estatísticas do Simulado - {selectedTheme?.name}</h2>
              <GlobalStatsCounter themeId={selectedThemeId} />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold mb-4">Tendências de Avaliação</h2>
              <AssessmentTrendsChart themeId={selectedThemeId} />
            </div>
          </div>
        </TabsContent>

        <TabsContent value="game-statistics" className="space-y-6">
          <div className="grid gap-6">
            <div>
              <h2 className="text-2xl font-bold mb-4">Estatísticas do Modo Jogo - {selectedTheme?.name}</h2>
              <GameStatsCounter themeId={selectedThemeId} />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default QuestionValidation;

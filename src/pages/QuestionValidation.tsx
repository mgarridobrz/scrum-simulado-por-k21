
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { 
  QuestionWithCategory,
  quizQuestions,
  saveEditedQuestion 
} from '@/data/quizData';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import AuthScreen from '@/components/question-validation/AuthScreen';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AttemptsList from '@/components/question-validation/AttemptsList';
import NavigationBar from '@/components/question-validation/NavigationBar';
import QuestionFilters from '@/components/question-validation/QuestionFilters';
import { useToast } from "@/hooks/use-toast";
import { useQuestionValidation } from '@/hooks/useQuestionValidation';

const QuestionValidation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<string[]>([]);
  
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

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('validationPageAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handleAuthenticated = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('validationPageAuthenticated');
    setIsAuthenticated(false);
  };

  const handleOpenAttemptsDialog = () => {
    const attempts = getTrackedQuizAttempts();
    setQuizAttempts(attempts);
    setShowAttemptsDialog(true);
  };

  const saveQuestionChanges = (editedQuestion: QuestionWithCategory) => {
    try {
      // Save to localStorage
      saveEditedQuestion(editedQuestion);
      
      // Update the local state via the hook
      updateQuestion(editedQuestion);
      
      toast({
        title: "Alterações salvas",
        description: `As alterações na questão #${editedQuestion.id} foram salvas com sucesso.`,
      });
    } catch (error) {
      console.error("Error saving question changes:", error);
      toast({
        title: "Erro ao salvar",
        description: "Houve um problema ao salvar as alterações.",
        variant: "destructive"
      });
    }
  };

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  // Show loading state if no questions loaded
  if (isLoading || !currentQuestion) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Carregando perguntas...</h1>
        <button onClick={() => navigate('/')}>Voltar para início</button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <NavigationBar 
        currentIndex={currentIndex}
        totalQuestions={filteredQuestions.length}
        filter={filter}
        onFilterChange={setFilter}
        onNavigatePrevious={goToPreviousQuestion}
        onNavigateNext={goToNextQuestion}
        onShowAttempts={handleOpenAttemptsDialog}
        onLogout={handleLogout}
        onNavigateHome={() => navigate('/')}
      />

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Apenas questões aprovadas serão exibidas no quiz oficial. Total de questões aprovadas: {approvedQuestions.length} de {quizQuestions.length}.
        </AlertDescription>
      </Alert>

      <QuestionEditor 
        question={currentQuestion}
        isApproved={isQuestionApproved(currentQuestion.id)}
        onSave={saveQuestionChanges}
        onApprove={approveQuestion}
      />

      <AttemptsList 
        open={showAttemptsDialog}
        onOpenChange={setShowAttemptsDialog}
        attempts={quizAttempts}
      />
    </div>
  );
};

export default QuestionValidation;


import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from 'lucide-react';
import { 
  QuestionWithCategory, 
  quizQuestions, 
  saveEditedQuestion, 
  getApprovedQuestionIds,
  getEditedQuestions,
  saveApprovedQuestionIds 
} from '@/data/quizData';
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import AuthScreen from '@/components/question-validation/AuthScreen';
import QuestionEditor from '@/components/question-validation/QuestionEditor';
import AttemptsList from '@/components/question-validation/AttemptsList';
import NavigationBar from '@/components/question-validation/NavigationBar';
import { useToast } from "@/hooks/use-toast";

const QuestionValidation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [approvedQuestions, setApprovedQuestions] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<string[]>([]);

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = localStorage.getItem('validationPageAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Load questions and approved IDs when authenticated
  useEffect(() => {
    if (!isAuthenticated) return;
    
    try {
      // Load the approved question IDs
      const savedApprovedIds = getApprovedQuestionIds();
      setApprovedQuestions(savedApprovedIds);
      
      // Get the edited questions map
      const editedQuestionsMap = getEditedQuestions();
      
      // Apply edits to the base questions
      const updatedQuestions = quizQuestions.map(q => 
        editedQuestionsMap[q.id] ? editedQuestionsMap[q.id] : q
      );
      
      console.log(`Loaded ${updatedQuestions.length} questions with ${Object.keys(editedQuestionsMap).length} edits applied.`);
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error("Error loading questions:", error);
      toast({
        title: "Erro ao carregar questões",
        description: "Houve um problema ao carregar as questões editadas.",
        variant: "destructive"
      });
    }
  }, [isAuthenticated, toast]);

  // Handle filter changes
  useEffect(() => {
    if (!isAuthenticated || questions.length === 0) return;
    setCurrentIndex(0);
  }, [filter, isAuthenticated, questions]);

  // Save approved questions when they change
  useEffect(() => {
    if (approvedQuestions.length > 0) {
      saveApprovedQuestionIds(approvedQuestions);
    }
  }, [approvedQuestions]);

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

  const goToNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const approveQuestion = () => {
    if (!currentQuestion) return;
    
    if (!approvedQuestions.includes(currentQuestion.id)) {
      const newApprovedQuestions = [...approvedQuestions, currentQuestion.id];
      setApprovedQuestions(newApprovedQuestions);
      toast({
        title: "Questão aprovada",
        description: `A questão #${currentQuestion.id} foi aprovada.`
      });
    } else {
      const newApprovedQuestions = approvedQuestions.filter(id => id !== currentQuestion.id);
      setApprovedQuestions(newApprovedQuestions);
      toast({
        title: "Aprovação removida",
        description: `A aprovação da questão #${currentQuestion.id} foi removida.`
      });
    }
  };

  const saveQuestionChanges = (editedQuestion: QuestionWithCategory) => {
    try {
      // First save to localStorage
      saveEditedQuestion(editedQuestion);
      
      // Then update state
      const updatedQuestions = questions.map(q => 
        q.id === editedQuestion.id ? editedQuestion : q
      );
      setQuestions(updatedQuestions);
      
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

  const isQuestionApproved = (questionId: number) => {
    return approvedQuestions.includes(questionId);
  };

  // Derived state
  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.category === filter);

  const currentQuestion = filteredQuestions[currentIndex] || null;

  // Show authentication screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onAuthenticated={handleAuthenticated} />;
  }

  // Show loading state if no questions loaded
  if (!currentQuestion) {
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

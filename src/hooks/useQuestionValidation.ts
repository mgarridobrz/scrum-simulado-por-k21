
import { useState, useEffect } from 'react';
import { 
  QuestionWithCategory, 
  getApprovedQuestionIds,
  getEditedQuestions,
  saveApprovedQuestionIds,
  quizQuestions,
} from '@/data/quizData';
import { useToast } from '@/hooks/use-toast';

export function useQuestionValidation() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [approvedQuestions, setApprovedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load questions and approved IDs
  useEffect(() => {
    try {
      // Load the approved question IDs
      const savedApprovedIds = getApprovedQuestionIds();
      setApprovedQuestions(savedApprovedIds);
      
      // Set the questions to use the quiz questions directly
      // This ensures we always get the most up-to-date edited versions
      setQuestions(quizQuestions);
      console.log(`Loaded ${quizQuestions.length} questions with latest edits applied.`);
      
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading questions:", error);
      toast({
        title: "Erro ao carregar questões",
        description: "Houve um problema ao carregar as questões editadas.",
        variant: "destructive"
      });
      setIsLoading(false);
    }
  }, [toast]);

  // Handle filter changes
  useEffect(() => {
    if (questions.length === 0) return;
    setCurrentIndex(0);
  }, [filter, questions]);

  // Save approved questions when they change
  useEffect(() => {
    if (approvedQuestions.length > 0) {
      saveApprovedQuestionIds(approvedQuestions);
    }
  }, [approvedQuestions]);

  // Derived state
  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.category === filter);

  const currentQuestion = filteredQuestions[currentIndex] || null;

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

  const isQuestionApproved = (questionId: number) => {
    return approvedQuestions.includes(questionId);
  };

  // This function is modified to update the global quizQuestions array
  const updateQuestion = (updatedQuestion: QuestionWithCategory) => {
    // Create a new array with the updated question
    const updatedQuestions = questions.map(q => 
      q.id === updatedQuestion.id ? updatedQuestion : q
    );
    
    // Update the local state with the new questions
    setQuestions(updatedQuestions);
  };

  return {
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
    setQuestions,
    updateQuestion
  };
}

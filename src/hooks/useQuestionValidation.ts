
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
      
      // Get the edited questions map
      const editedQuestionsMap = getEditedQuestions();
      
      // Apply edits to the base questions
      const updatedQuestions = quizQuestions.map(q => 
        editedQuestionsMap[q.id] ? editedQuestionsMap[q.id] : q
      );
      
      console.log(`Loaded ${updatedQuestions.length} questions with ${Object.keys(editedQuestionsMap).length} edits applied.`);
      setQuestions(updatedQuestions);
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
    setQuestions
  };
}

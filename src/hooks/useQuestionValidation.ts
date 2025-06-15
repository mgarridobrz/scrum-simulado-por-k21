import { useState, useEffect } from 'react';
import { QuestionWithCategory } from '@/data/types';
import { fetchQuestionsByCategory, updateQuestion } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useQuestionValidation() {
  const { toast } = useToast();
  const { language } = useLanguage();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [approvedQuestions, setApprovedQuestions] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load questions from the database with language support
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await fetchQuestionsByCategory(filter === 'all' ? undefined : filter, language);
        setQuestions(fetchedQuestions);
        setCurrentIndex(0);
        console.log(`Loaded ${fetchedQuestions.length} questions from database with filter: ${filter} and language: ${language}`);
        
        // Load approved question IDs from localStorage (keeping this for backward compatibility)
        const savedApprovedIds = getApprovedQuestionIds();
        setApprovedQuestions(savedApprovedIds);
        
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: language === 'en' ? "Error loading questions" : "Erro ao carregar questões",
          description: language === 'en' ? "There was a problem fetching questions from the database." : "Houve um problema ao buscar as questões do banco de dados.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [filter, language, toast]);

  // Save approved questions when they change
  useEffect(() => {
    if (approvedQuestions.length > 0) {
      saveApprovedQuestionIds(approvedQuestions);
    }
  }, [approvedQuestions]);

  // Handle filter changes
  useEffect(() => {
    if (questions.length === 0) return;
    setCurrentIndex(0);
  }, [filter, questions]);

  // Derived state
  const filteredQuestions = questions;
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
        title: language === 'en' ? "Question approved" : "Questão aprovada",
        description: language === 'en' 
          ? `Question #${currentQuestion.id} was approved.`
          : `A questão #${currentQuestion.id} foi aprovada.`
      });
    } else {
      const newApprovedQuestions = approvedQuestions.filter(id => id !== currentQuestion.id);
      setApprovedQuestions(newApprovedQuestions);
      toast({
        title: language === 'en' ? "Approval removed" : "Aprovação removida",
        description: language === 'en'
          ? `Approval for question #${currentQuestion.id} was removed.`
          : `A aprovação da questão #${currentQuestion.id} foi removida.`
      });
    }
  };

  const isQuestionApproved = (questionId: number) => {
    return approvedQuestions.includes(questionId);
  };

  // Save question to database
  const saveQuestion = async (updatedQuestion: QuestionWithCategory) => {
    const success = await updateQuestion(updatedQuestion);
    
    if (success) {
      // Update local state
      setQuestions(prev => 
        prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
      );
      
      toast({
        title: language === 'en' ? "Question saved" : "Questão salva",
        description: language === 'en' 
          ? `Question #${updatedQuestion.id} was updated successfully.`
          : `A questão #${updatedQuestion.id} foi atualizada com sucesso.`
      });
    } else {
      toast({
        title: language === 'en' ? "Error saving" : "Erro ao salvar",
        description: language === 'en'
          ? `Could not update question #${updatedQuestion.id}.`
          : `Não foi possível atualizar a questão #${updatedQuestion.id}.`,
        variant: "destructive"
      });
    }
    
    return success;
  };

  // Helper functions for localStorage compatibility (keeping minimal for approved IDs)
  function getApprovedQuestionIds(): number[] {
    const savedApprovedQuestions = localStorage.getItem('approvedQuestions');
    if (savedApprovedQuestions) {
      try {
        return JSON.parse(savedApprovedQuestions);
      } catch (error) {
        console.error("Error parsing approved questions:", error);
        return [];
      }
    }
    return [];
  }

  function saveApprovedQuestionIds(ids: number[]): void {
    try {
      localStorage.setItem('approvedQuestions', JSON.stringify(ids));
      console.log(`Saved ${ids.length} approved question IDs to localStorage.`);
    } catch (error) {
      console.error("Error saving approved question IDs:", error);
    }
  }

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
    updateQuestion: saveQuestion
  };
}

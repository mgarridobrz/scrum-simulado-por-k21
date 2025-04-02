
import { useState, useEffect } from 'react';
import { QuestionWithCategory } from '@/data/types';
import { fetchQuestionsByCategory, updateQuestion } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';

export function useQuestions() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(true);

  // Load questions from the database
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setIsLoading(true);
        const fetchedQuestions = await fetchQuestionsByCategory(filter === 'all' ? undefined : filter);
        setQuestions(fetchedQuestions);
        setCurrentIndex(0);
        console.log(`Loaded ${fetchedQuestions.length} questions from database with filter: ${filter}`);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: "Erro ao carregar questões",
          description: "Houve um problema ao buscar as questões do banco de dados.",
          variant: "destructive"
        });
        setIsLoading(false);
      }
    };
    
    loadQuestions();
  }, [filter, toast]);

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

  // Update question in the database
  const saveQuestion = async (updatedQuestion: QuestionWithCategory) => {
    const success = await updateQuestion(updatedQuestion);
    
    if (success) {
      // Update local state
      setQuestions(prev => 
        prev.map(q => q.id === updatedQuestion.id ? updatedQuestion : q)
      );
      
      toast({
        title: "Questão salva",
        description: `A questão #${updatedQuestion.id} foi atualizada com sucesso.`
      });
    } else {
      toast({
        title: "Erro ao salvar",
        description: `Não foi possível atualizar a questão #${updatedQuestion.id}.`,
        variant: "destructive"
      });
    }
    
    return success;
  };

  return {
    currentQuestion,
    currentIndex,
    filteredQuestions,
    filter,
    isLoading,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    saveQuestion
  };
}

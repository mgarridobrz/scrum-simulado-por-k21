
import { useState, useEffect } from 'react';
import { QuestionWithCategory } from '@/data/types';
import { fetchQuestionsByCategory, updateQuestion } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

export function useQuestions(language: 'pt' | 'en') {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [filter, setFilter] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  // Load questions from the database with language support
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        setLoading(true);
        const fetchedQuestions = await fetchQuestionsByCategory(filter === 'all' ? undefined : filter, language);
        setQuestions(fetchedQuestions);
        setCurrentIndex(0);
        console.log(`Loaded ${fetchedQuestions.length} questions from database with filter: ${filter} and language: ${language}`);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        toast({
          title: language === 'en' ? "Error loading questions" : "Erro ao carregar questões",
          description: language === 'en' ? "There was a problem fetching questions from the database." : "Houve um problema ao buscar as questões do banco de dados.",
          variant: "destructive"
        });
        setLoading(false);
      }
    };
    
    loadQuestions();
  }, [filter, language, toast]);

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

  return {
    questions,
    loading,
    currentQuestion,
    currentIndex,
    filteredQuestions,
    filter,
    setFilter,
    goToNextQuestion,
    goToPreviousQuestion,
    saveQuestion
  };
}

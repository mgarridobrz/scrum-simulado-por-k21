
import { useState, useEffect } from 'react';
import { QuizAttempt } from '@/data/types';
import { fetchAllQuizAttempts } from '@/utils/quizTracking';
import { useToast } from '@/hooks/use-toast';

const ITEMS_PER_PAGE = 20;

export function useAttempts() {
  const { toast } = useToast();
  const [attempts, setAttempts] = useState<QuizAttempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadAttempts = async () => {
    try {
      setLoading(true);
      const fetchedAttempts = await fetchAllQuizAttempts();
      setAttempts(fetchedAttempts);
      setTotalPages(Math.ceil(fetchedAttempts.length / ITEMS_PER_PAGE));
      console.log(`Loaded ${fetchedAttempts.length} attempts from database`);
    } catch (error) {
      console.error("Error loading attempts:", error);
      toast({
        title: "Erro ao carregar tentativas",
        description: "Houve um problema ao buscar as tentativas do banco de dados.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAttempts();
  }, []);

  const paginatedAttempts = attempts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRefresh = () => {
    loadAttempts();
  };

  return {
    attempts: paginatedAttempts,
    loading,
    currentPage,
    totalPages,
    onPageChange: handlePageChange,
    onRefresh: handleRefresh
  };
}

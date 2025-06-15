
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { 
  ChevronLeft, 
  ChevronRight, 
  RefreshCw, 
  Trash2,
  Calendar,
  Clock
} from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { deleteQuizAttempt, formatTimeFromSeconds } from '@/utils/quizTracking';
import type { QuizAttempt } from '@/data/types';

interface AttemptsListProps {
  attempts: QuizAttempt[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onRefresh: () => void;
}

const AttemptsList = ({
  attempts,
  loading,
  currentPage,
  totalPages,
  onPageChange,
  onRefresh
}: AttemptsListProps) => {
  const { toast } = useToast();

  const handleDelete = async (id: string, attemptName: string) => {
    try {
      console.log("Attempting to delete quiz attempt with ID:", id);
      const success = await deleteQuizAttempt(id);
      
      if (success) {
        toast({
          title: "Registro excluído",
          description: `A tentativa de ${attemptName} foi excluída com sucesso.`
        });
        // Immediately refresh the list
        onRefresh();
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o registro. Tente novamente.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting attempt:", error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro inesperado ao excluir o registro.",
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', {
      year: 'numeric',
      month: 'short',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <Card className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Tentativas registradas</h2>
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center gap-1"
          onClick={onRefresh}
          disabled={loading}
        >
          <RefreshCw size={16} className={loading ? "animate-spin" : ""} />
          <span className="sr-only">Atualizar</span>
        </Button>
      </div>

      {loading ? (
        <div className="text-center py-10">Carregando...</div>
      ) : attempts.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">
          Nenhuma tentativa encontrada.
        </div>
      ) : (
        <>
          <div className="rounded-md border overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Data</TableHead>
                  <TableHead>Nome</TableHead>
                  <TableHead className="text-center">Tamanho</TableHead>
                  <TableHead className="text-center">Pontuação</TableHead>
                  <TableHead className="text-center">Tempo</TableHead>
                  <TableHead className="w-[100px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {attempts.map((attempt) => {
                  // The score already comes as a percentage from the database
                  const percentage = attempt.score;
                  
                  return (
                    <TableRow key={attempt.id}>
                      <TableCell className="font-mono text-xs">
                        <div className="flex items-center">
                          <Calendar size={14} className="mr-1.5 text-muted-foreground" />
                          {formatDate(attempt.createdAt)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <span className="font-medium">{attempt.name}</span>
                          {attempt.email && (
                            <span className="block text-xs text-muted-foreground">
                              {attempt.email}
                            </span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant="outline">
                          {attempt.quizSize}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {attempt.score !== null ? (
                          <Badge 
                            className={`${
                              percentage >= 74 ? 'bg-green-100 text-green-800 hover:bg-green-100' : 
                              'bg-amber-100 text-amber-800 hover:bg-amber-100'
                            }`}
                          >
                            {percentage}%
                          </Badge>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </TableCell>
                      <TableCell className="text-center">
                        <div className="flex items-center justify-center gap-1 text-muted-foreground text-sm">
                          <Clock size={14} />
                          {formatTimeFromSeconds(attempt.completionTimeSeconds)}
                        </div>
                      </TableCell>
                      <TableCell>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-muted-foreground hover:text-red-600"
                              type="button"
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Excluir registro</AlertDialogTitle>
                              <AlertDialogDescription>
                                Você tem certeza que deseja excluir a tentativa de <strong>{attempt.name}</strong>?
                                Esta ação não pode ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancelar</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => handleDelete(attempt.id, attempt.name)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Excluir
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          <div className="flex justify-between items-center mt-4">
            <div className="text-sm text-muted-foreground">
              Página {currentPage} de {totalPages}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1 || loading}
              >
                <ChevronLeft size={16} />
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage >= totalPages || loading}
              >
                <ChevronRight size={16} />
              </Button>
            </div>
          </div>
        </>
      )}
    </Card>
  );
};

export default AttemptsList;

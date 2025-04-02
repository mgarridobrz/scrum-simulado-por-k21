import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { 
  Download, 
  RefreshCw, 
  ChevronUp, 
  ChevronDown, 
  Search, 
  X, 
  Trash2,
  AlertCircle
} from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getTrackedQuizAttempts, deleteQuizAttempt } from '@/utils/quizTracking';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { QuizAttempt } from '@/data/types';

interface AttemptFilters {
  page: number;
  pageSize: number;
  name: string;
  email: string;
  orderBy: string;
  orderDirection: 'asc' | 'desc';
}

interface AttemptsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attempts: QuizAttempt[];
  totalCount: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number) => void;
  filters: AttemptFilters;
  onFilterChange: (filterKey: string, value: string) => void;
  onSortChange: (field: string) => void;
  onRefresh: () => void;
}

const AttemptsList = ({
  open,
  onOpenChange,
  attempts,
  totalCount,
  currentPage,
  pageSize,
  onPageChange,
  filters,
  onFilterChange,
  onSortChange,
  onRefresh
}: AttemptsListProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [nameFilter, setNameFilter] = useState(filters.name || '');
  const [emailFilter, setEmailFilter] = useState(filters.email || '');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [attemptToDelete, setAttemptToDelete] = useState<string | null>(null);
  
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString('pt-BR');
    } catch (e) {
      return isoString;
    }
  };

  const formatScore = (score: number | null) => {
    if (score === null) return 'N/A';
    return `${score}%`;
  };

  const loadAttempts = async () => {
    setIsLoading(true);
    try {
      await onRefresh();
      toast({
        title: "Dados atualizados",
        description: "Lista de tentativas atualizada com sucesso.",
      });
    } catch (error) {
      console.error("Error loading attempts:", error);
      toast({
        title: "Erro ao carregar dados",
        description: "Não foi possível carregar os dados de tentativas.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteAttempt = async () => {
    if (!attemptToDelete) return;
    
    setIsLoading(true);
    try {
      const success = await deleteQuizAttempt(attemptToDelete);
      
      if (success) {
        // Refresh the list
        await loadAttempts();
        
        toast({
          title: "Registro excluído",
          description: "O registro foi excluído com sucesso.",
        });
      } else {
        toast({
          title: "Erro ao excluir",
          description: "Não foi possível excluir o registro.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Error deleting attempt:", error);
      toast({
        title: "Erro ao excluir",
        description: "Ocorreu um erro ao tentar excluir o registro.",
        variant: "destructive"
      });
    } finally {
      setAttemptToDelete(null);
      setDeleteDialogOpen(false);
      setIsLoading(false);
    }
  };

  const exportAttemptsToPdf = () => {
    if (attempts.length === 0) {
      toast({
        title: "Sem dados para exportar",
        description: "Não há tentativas registradas para exportar.",
        variant: "destructive"
      });
      return;
    }

    const doc = new jsPDF();
    
    doc.setFontSize(18);
    doc.text("Relatório de Tentativas do Simulado", 14, 22);
    
    doc.setFontSize(11);
    doc.text(`Gerado em: ${new Date().toLocaleString('pt-BR')}`, 14, 30);
    
    const tableColumn = ["Nome", "Email", "Tamanho", "Data/Hora", "Pontuação"];
    const tableRows = attempts.map(attempt => {
      const [name, email, size, timestamp, score] = attempt.split(',');
      return [name, email, `${size} questões`, formatDate(timestamp), formatScore(score)];
    });
    
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 35,
      styles: { fontSize: 10, cellPadding: 3 },
      headStyles: { fillColor: [155, 135, 245] },
      alternateRowStyles: { fillColor: [240, 240, 245] }
    });
    
    const pageCount = (doc.internal as any).getNumberOfPages();
    for (let i = 1; i <= pageCount; i++) {
      doc.setPage(i);
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height ? pageSize.height : pageSize.getHeight();
      doc.setFontSize(10);
      doc.text('Simulado CSMK21 - Página ' + i + ' de ' + pageCount, 14, pageHeight - 10);
    }
    
    doc.save("simulado-csmk21-tentativas.pdf");
    
    toast({
      title: "PDF gerado com sucesso",
      description: "O relatório de tentativas foi exportado como PDF.",
    });
  };

  const applyFilters = () => {
    onFilterChange('name', nameFilter);
    onFilterChange('email', emailFilter);
  };

  const clearFilters = () => {
    setNameFilter('');
    setEmailFilter('');
    onFilterChange('name', '');
    onFilterChange('email', '');
  };

  const totalPages = Math.ceil(totalCount / pageSize);

  const getPaginationItems = () => {
    const items = [];
    
    items.push(
      <PaginationItem key="first">
        <PaginationLink isActive={currentPage === 1} onClick={() => onPageChange(1)}>
          1
        </PaginationLink>
      </PaginationItem>
    );
    
    if (currentPage > 3) {
      items.push(
        <PaginationItem key="ellipsis1">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
      if (i <= totalPages && i > 1) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink isActive={currentPage === i} onClick={() => onPageChange(i)}>
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    }
    
    if (currentPage < totalPages - 2) {
      items.push(
        <PaginationItem key="ellipsis2">
          <PaginationEllipsis />
        </PaginationItem>
      );
    }
    
    if (totalPages > 1) {
      items.push(
        <PaginationItem key="last">
          <PaginationLink isActive={currentPage === totalPages} onClick={() => onPageChange(totalPages)}>
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  const SortIndicator = ({ field }: { field: string }) => {
    if (filters.orderBy !== field) return null;
    
    return filters.orderDirection === 'asc' 
      ? <ChevronUp size={14} className="inline ml-1" />
      : <ChevronDown size={14} className="inline ml-1" />;
  };

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Registros de Tentativas do Simulado</DialogTitle>
            <DialogDescription>
              Esta lista mostra todas as tentativas registradas do simulado.
            </DialogDescription>
          </DialogHeader>
          
          <div className="mb-4 flex flex-col gap-4">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Filtrar por nome"
                  value={nameFilter}
                  onChange={(e) => setNameFilter(e.target.value)}
                  className="pl-8"
                />
                <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
              </div>
              <div className="flex-1 relative">
                <Input
                  placeholder="Filtrar por email"
                  value={emailFilter}
                  onChange={(e) => setEmailFilter(e.target.value)}
                  className="pl-8"
                />
                <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
              </div>
              <Button 
                variant="outline"
                size="sm" 
                onClick={applyFilters}
              >
                Aplicar
              </Button>
              <Button 
                variant="ghost"
                size="sm" 
                onClick={clearFilters}
                className="sm:w-auto"
              >
                <X size={16} />
              </Button>
            </div>
            
            <div className="flex justify-between">
              <Button 
                variant="secondary"
                size="sm" 
                onClick={loadAttempts}
                disabled={isLoading}
                className="flex items-center gap-1"
              >
                <RefreshCw size={16} className={isLoading ? "animate-spin" : ""} />
                Atualizar dados
              </Button>
              
              <Button 
                variant="outline" 
                size="sm" 
                onClick={exportAttemptsToPdf}
                className="flex items-center gap-1"
              >
                <Download size={16} />
                Exportar como PDF
              </Button>
            </div>
          </div>
          
          {attempts.length > 0 ? (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('name')}>
                      Nome <SortIndicator field="name" />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('email')}>
                      Email <SortIndicator field="email" />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('quiz_size')}>
                      Tamanho <SortIndicator field="quiz_size" />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('created_at')}>
                      Data/Hora <SortIndicator field="created_at" />
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => onSortChange('score')}>
                      Pontuação <SortIndicator field="score" />
                    </TableHead>
                    <TableHead></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {attempts.map((attempt) => (
                    <TableRow key={attempt.id}>
                      <TableCell>{attempt.name}</TableCell>
                      <TableCell>{attempt.email || 'N/A'}</TableCell>
                      <TableCell>{attempt.quiz_size} questões</TableCell>
                      <TableCell>{formatDate(attempt.created_at)}</TableCell>
                      <TableCell>{formatScore(attempt.score)}</TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          onClick={() => {
                            setAttemptToDelete(attempt.id);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 size={16} />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              
              {totalPages > 1 && (
                <div className="mt-4">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                          className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                      
                      {getPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                          className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
              
              <div className="text-sm text-muted-foreground text-center mt-2">
                Mostrando {attempts.length} de {totalCount} registros
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              {isLoading ? (
                <div className="flex flex-col items-center gap-2">
                  <RefreshCw size={24} className="animate-spin text-muted-foreground" />
                  <p>Carregando tentativas...</p>
                </div>
              ) : (
                "Nenhuma tentativa registrada ainda."
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-red-500" />
              Confirmar exclusão
            </AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir este registro? Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAttempt} 
              disabled={isLoading}
              className="bg-red-500 hover:bg-red-600"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Excluindo...
                </>
              ) : (
                <>Excluir</>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default AttemptsList;

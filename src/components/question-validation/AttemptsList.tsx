
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Download, RefreshCw } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AttemptsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attempts: string[];
  onAttemptsCleared?: () => void;
}

const AttemptsList = ({ open, onOpenChange, attempts: initialAttempts, onAttemptsCleared }: AttemptsListProps) => {
  const { toast } = useToast();
  const [attempts, setAttempts] = useState<string[]>(initialAttempts);
  const [isLoading, setIsLoading] = useState(false);
  
  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString('pt-BR');
    } catch (e) {
      return isoString;
    }
  };

  const formatScore = (score: string) => {
    if (!score) return 'N/A';
    return `${score}%`;
  };

  const loadAttempts = async () => {
    setIsLoading(true);
    try {
      const fetchedAttempts = await getTrackedQuizAttempts();
      setAttempts(fetchedAttempts);
      toast({
        title: "Dados atualizados",
        description: `${fetchedAttempts.length} tentativas carregadas.`,
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

  // Load attempts when dialog opens
  useEffect(() => {
    if (open) {
      loadAttempts();
    }
  }, [open]);

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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Registros de Tentativas do Simulado</DialogTitle>
          <DialogDescription>
            Esta lista mostra todas as tentativas registradas do simulado.
          </DialogDescription>
        </DialogHeader>
        
        <div className="mb-4 flex justify-between">
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
        
        {attempts.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nome</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Tamanho</TableHead>
                <TableHead>Data/Hora</TableHead>
                <TableHead>Pontuação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attempts.map((attempt, index) => {
                const [name, email, size, timestamp, score] = attempt.split(',');
                return (
                  <TableRow key={index}>
                    <TableCell>{name}</TableCell>
                    <TableCell>{email}</TableCell>
                    <TableCell>{size} questões</TableCell>
                    <TableCell>{formatDate(timestamp)}</TableCell>
                    <TableCell>{formatScore(score)}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
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
  );
};

export default AttemptsList;

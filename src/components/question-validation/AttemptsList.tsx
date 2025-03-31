
import React from 'react';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface AttemptsListProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  attempts: string[];
}

const AttemptsList = ({ open, onOpenChange, attempts }: AttemptsListProps) => {
  const { toast } = useToast();
  
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
        </DialogHeader>
        
        <div className="mb-4 flex justify-end">
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
            Nenhuma tentativa registrada ainda.
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AttemptsList;

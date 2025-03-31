
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import { QuestionWithCategory } from '@/data/quizData';

interface CategoryStat {
  category: string;
  correctCount: number;
  totalCount: number;
}

// Function to generate a PDF report of quiz results
export const generatePDF = (
  questions: QuestionWithCategory[],
  userAnswers: Record<number, string>,
  correctAnswers: number,
  totalQuestions: number,
  categoryStats: CategoryStat[],
  userData?: { name: string; email: string } | null
): void => {
  try {
    // Create new PDF document
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    
    // Add title
    doc.setFontSize(20);
    doc.setTextColor(44, 62, 80);
    doc.text('Relatório de Simulado K21', pageWidth / 2, 20, { align: 'center' });
    
    // Add date
    const currentDate = new Date().toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Data: ${currentDate}`, pageWidth / 2, 27, { align: 'center' });
    
    // Add user info if available
    if (userData?.name) {
      doc.setFontSize(12);
      doc.setTextColor(60, 60, 60);
      doc.text(`Nome: ${userData.name}`, 14, 40);
      
      if (userData.email) {
        doc.text(`Email: ${userData.email}`, 14, 47);
      }
    }
    
    // Add score summary
    const scorePercentage = Math.round((correctAnswers / totalQuestions) * 100);
    const passPercentage = 85;
    const passed = scorePercentage >= passPercentage;
    
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text('Resumo de Desempenho', 14, 60);
    
    doc.setFontSize(12);
    doc.text(`Questões corretas: ${correctAnswers} de ${totalQuestions} (${scorePercentage}%)`, 14, 68);
    
    doc.setTextColor(passed ? 46, 125, 50 : 211, 47, 47);
    doc.text(`Status: ${passed ? 'APROVADO' : 'NÃO APROVADO'}`, 14, 76);
    doc.setTextColor(0, 0, 0);
    doc.text(`Mínimo para aprovação: ${passPercentage}%`, 14, 84);
    
    // Add category performance table
    doc.setFontSize(14);
    doc.text('Desempenho por Categoria', 14, 100);
    
    const categoryData = categoryStats.map(stat => [
      stat.category,
      `${stat.correctCount}`,
      `${stat.totalCount}`,
      `${Math.round((stat.correctCount / stat.totalCount) * 100)}%`
    ]);
    
    autoTable(doc, {
      startY: 105,
      head: [['Categoria', 'Corretas', 'Total', 'Percentual']],
      body: categoryData,
      theme: 'striped',
      headStyles: { fillColor: [41, 128, 185] },
    });
    
    // Add question details
    doc.addPage();
    doc.setFontSize(14);
    doc.text('Detalhes das Questões', 14, 20);
    
    let yPosition = 30;
    const lineHeight = 7;
    const pageHeight = doc.internal.pageSize.getHeight();
    
    questions.forEach((question, index) => {
      const isCorrect = userAnswers[question.id] === question.correctAnswer;
      const remainingSpace = pageHeight - yPosition;
      
      // Check if we need a new page
      if (remainingSpace < 60) {
        doc.addPage();
        yPosition = 20;
      }
      
      // Question header
      doc.setFontSize(11);
      doc.setTextColor(0, 0, 0);
      doc.text(`Questão ${index + 1}: ${question.category}`, 14, yPosition);
      yPosition += lineHeight;
      
      // Question text
      doc.setFontSize(10);
      doc.text(question.question, 14, yPosition);
      yPosition += lineHeight * 2;
      
      // Status
      doc.setTextColor(isCorrect ? 46, 125, 50 : 211, 47, 47);
      doc.text(`Status: ${isCorrect ? 'CORRETA' : 'INCORRETA'}`, 14, yPosition);
      doc.setTextColor(0, 0, 0);
      yPosition += lineHeight * 1.5;
      
      // Answer details
      doc.setFontSize(9);
      doc.text(`Sua resposta: ${question.options.find(o => o.id === userAnswers[question.id])?.text || 'Não respondida'}`, 14, yPosition);
      yPosition += lineHeight;
      
      doc.text(`Resposta correta: ${question.options.find(o => o.id === question.correctAnswer)?.text}`, 14, yPosition);
      yPosition += lineHeight * 2;
    });
    
    // Save the PDF
    doc.save(`simulado-k21-${currentDate.replace(/\s/g, '-')}.pdf`);
    
    console.log('PDF gerado com sucesso!');
  } catch (error) {
    console.error('Erro ao gerar PDF:', error);
    alert('Houve um erro ao gerar o PDF. Por favor, tente novamente.');
  }
};

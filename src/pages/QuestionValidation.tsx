import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Edit, X, ChevronRight, ChevronLeft, Save, AlertCircle, FileText, Download } from 'lucide-react';
import { 
  QuestionWithCategory, 
  quizQuestions, 
  saveEditedQuestion, 
  getApprovedQuestionIds,
  getEditedQuestions,
  saveApprovedQuestionIds 
} from '@/data/quizData';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { getTrackedQuizAttempts } from '@/utils/quizTracking';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const QuestionValidation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithCategory | null>(null);
  const [filter, setFilter] = useState<string>('all');
  const [approvedQuestions, setApprovedQuestions] = useState<number[]>([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showAttemptsDialog, setShowAttemptsDialog] = useState(false);
  const [quizAttempts, setQuizAttempts] = useState<string[]>([]);

  useEffect(() => {
    const authStatus = localStorage.getItem('validationPageAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    let baseQuestions = [...quizQuestions];
    
    const savedApprovedIds = getApprovedQuestionIds();
    setApprovedQuestions(savedApprovedIds);
    
    const editedQuestionsMap = getEditedQuestions();
    
    const updatedQuestions = baseQuestions.map(q => 
      editedQuestionsMap[q.id] ? editedQuestionsMap[q.id] : q
    );
    
    setQuestions(updatedQuestions);
    
    if (updatedQuestions.length > 0) {
      setCurrentQuestion(updatedQuestions[0]);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) return;
    
    const filteredQuestions = filter === 'all' 
      ? questions 
      : questions.filter(q => q.category === filter);
      
    if (filteredQuestions.length > 0) {
      setCurrentIndex(0);
      setCurrentQuestion(filteredQuestions[0]);
      setEditMode(false);
    }
  }, [filter, questions, isAuthenticated]);

  useEffect(() => {
    saveApprovedQuestionIds(approvedQuestions);
  }, [approvedQuestions]);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hashedPassword = btoa(password);
    const correctHash = btoa('120703');
    
    if (hashedPassword === correctHash) {
      localStorage.setItem('validationPageAuthenticated', 'true');
      setIsAuthenticated(true);
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo à página de validação de questões.",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.category === filter);

  const goToNextQuestion = () => {
    if (currentIndex < filteredQuestions.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
      setCurrentQuestion(filteredQuestions[currentIndex + 1]);
      setEditMode(false);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
      setCurrentQuestion(filteredQuestions[currentIndex - 1]);
      setEditMode(false);
    }
  };

  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        question: e.target.value
      });
    }
  };

  const handleOptionChange = (id: string, text: string) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        options: currentQuestion.options.map(option => 
          option.id === id ? { ...option, text } : option
        )
      });
    }
  };

  const handleCorrectAnswerChange = (value: string) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        correctAnswer: value
      });
    }
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (currentQuestion) {
      setCurrentQuestion({
        ...currentQuestion,
        explanation: e.target.value
      });
    }
  };

  const saveChanges = () => {
    if (!currentQuestion) return;
    
    const updatedQuestions = questions.map(q => 
      q.id === currentQuestion.id ? currentQuestion : q
    );
    
    setQuestions(updatedQuestions);
    
    saveEditedQuestion(currentQuestion);
    
    setEditMode(false);
    toast({
      title: "Alterações salvas",
      description: "As alterações na questão foram salvas com sucesso.",
    });
  };

  const approveQuestion = () => {
    if (!currentQuestion) return;
    
    if (!approvedQuestions.includes(currentQuestion.id)) {
      if (editMode) {
        saveChanges();
      }
      
      const newApprovedQuestions = [...approvedQuestions, currentQuestion.id];
      setApprovedQuestions(newApprovedQuestions);
      
      saveEditedQuestion(currentQuestion);
      
      toast({
        title: "Questão aprovada",
        description: "A questão foi marcada como aprovada e será usada no quiz oficial.",
      });
    } else {
      const newApprovedQuestions = approvedQuestions.filter(id => id !== currentQuestion.id);
      setApprovedQuestions(newApprovedQuestions);
      toast({
        title: "Aprovação removida",
        description: "A questão não será mais usada no quiz oficial.",
        variant: "destructive"
      });
    }
  };

  const isQuestionApproved = (questionId: number) => {
    return approvedQuestions.includes(questionId);
  };

  const handleLogout = () => {
    localStorage.removeItem('validationPageAuthenticated');
    setIsAuthenticated(false);
    setPassword('');
  };

  const handleOpenAttemptsDialog = () => {
    const attempts = getTrackedQuizAttempts();
    setQuizAttempts(attempts);
    setShowAttemptsDialog(true);
  };

  const formatDate = (isoString: string) => {
    try {
      return new Date(isoString).toLocaleString('pt-BR');
    } catch (e) {
      return isoString;
    }
  };

  const exportAttemptsToPdf = () => {
    if (quizAttempts.length === 0) {
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
    
    const tableColumn = ["Nome", "Email", "Tamanho", "Data/Hora"];
    const tableRows = quizAttempts.map(attempt => {
      const [name, email, size, timestamp] = attempt.split(',');
      return [name, email, `${size} questões`, formatDate(timestamp)];
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

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto py-8 max-w-md flex flex-col items-center justify-center min-h-[70vh]">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
            <CardDescription className="text-center">
              Digite a senha para acessar a validação de questões
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handlePasswordSubmit} className="space-y-4">
              <div className="space-y-2">
                <Input
                  type="password"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full"
                />
              </div>
              <Button type="submit" className="w-full">Entrar</Button>
            </form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="outline" onClick={() => navigate('/')} className="mt-2">
              Voltar para início
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="container mx-auto py-8 text-center">
        <h1 className="text-2xl font-bold mb-4">Carregando perguntas...</h1>
        <Button onClick={() => navigate('/')}>Voltar para início</Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Validação de Perguntas do Quiz</h1>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={handleOpenAttemptsDialog}
            className="flex items-center gap-1"
          >
            <FileText size={16} />
            Listar Tentativas
          </Button>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filtrar por categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="fundamentals">Fundamentos</SelectItem>
              <SelectItem value="roles">Papéis</SelectItem>
              <SelectItem value="events">Eventos</SelectItem>
              <SelectItem value="artifacts">Artefatos</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={() => navigate('/')}>
            Voltar para início
          </Button>
          <Button variant="destructive" size="sm" onClick={handleLogout}>
            Sair
          </Button>
        </div>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Importante</AlertTitle>
        <AlertDescription>
          Apenas questões aprovadas serão exibidas no quiz oficial. Total de questões aprovadas: {approvedQuestions.length} de {quizQuestions.length}.
        </AlertDescription>
      </Alert>

      <div className="mb-4 flex justify-between items-center">
        <p className="text-sm text-muted-foreground">
          Questão {currentIndex + 1} de {filteredQuestions.length}
        </p>
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToPreviousQuestion}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="mr-1" size={16} /> Anterior
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={goToNextQuestion}
            disabled={currentIndex === filteredQuestions.length - 1}
          >
            Próxima <ChevronRight className="ml-1" size={16} />
          </Button>
        </div>
      </div>

      <Card className="mb-6">
        <CardHeader className="flex flex-row items-start justify-between space-y-0">
          <div>
            <CardTitle className="text-xl">
              Categoria: {currentQuestion.category === 'fundamentals' 
                ? 'Fundamentos' 
                : currentQuestion.category === 'roles' 
                ? 'Papéis' 
                : currentQuestion.category === 'events' 
                ? 'Eventos' 
                : 'Artefatos'}
            </CardTitle>
            <CardDescription>ID: {currentQuestion.id}</CardDescription>
          </div>
          <div className="flex gap-2">
            {editMode ? (
              <Button onClick={saveChanges} variant="default" size="sm">
                <Save size={16} className="mr-1" /> Salvar
              </Button>
            ) : (
              <>
                <Button onClick={() => setEditMode(true)} variant="outline" size="sm">
                  <Edit size={16} className="mr-1" /> Editar
                </Button>
                <Button 
                  onClick={approveQuestion} 
                  variant={isQuestionApproved(currentQuestion.id) ? "secondary" : "default"} 
                  size="sm"
                >
                  <Check size={16} className="mr-1" /> 
                  {isQuestionApproved(currentQuestion.id) ? "Aprovada" : "Aprovar"}
                </Button>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Pergunta:</h3>
              {editMode ? (
                <Textarea 
                  value={currentQuestion.question} 
                  onChange={handleQuestionChange} 
                  className="min-h-[80px]"
                />
              ) : (
                <p className="p-3 bg-muted rounded-md">{currentQuestion.question}</p>
              )}
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Opções:</h3>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">ID</TableHead>
                    <TableHead>Texto</TableHead>
                    <TableHead className="w-[100px]">Correta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {currentQuestion.options.map((option) => (
                    <TableRow key={option.id}>
                      <TableCell>{option.id}</TableCell>
                      <TableCell>
                        {editMode ? (
                          <Input 
                            value={option.text} 
                            onChange={(e) => handleOptionChange(option.id, e.target.value)} 
                          />
                        ) : (
                          option.text
                        )}
                      </TableCell>
                      <TableCell>
                        {editMode ? (
                          <Select 
                            value={currentQuestion.correctAnswer} 
                            onValueChange={handleCorrectAnswerChange}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {currentQuestion.options.map(o => (
                                <SelectItem key={o.id} value={o.id}>
                                  {o.id}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          option.id === currentQuestion.correctAnswer ? (
                            <span className="flex items-center text-green-600">
                              <Check size={16} className="mr-1" /> Sim
                            </span>
                          ) : (
                            <span className="flex items-center text-muted-foreground">
                              <X size={16} className="mr-1" /> Não
                            </span>
                          )
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Explicação:</h3>
              {editMode ? (
                <Textarea 
                  value={currentQuestion.explanation || ''} 
                  onChange={handleExplanationChange} 
                  className="min-h-[120px]"
                />
              ) : (
                <p className="p-3 bg-muted rounded-md">{currentQuestion.explanation || 'Sem explicação'}</p>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">
            Status: {isQuestionApproved(currentQuestion.id) ? (
              <span className="text-green-600 font-medium">Aprovada</span>
            ) : (
              <span className="text-amber-600 font-medium">Pendente de aprovação</span>
            )}
          </p>
          <p className="text-sm text-muted-foreground">
            Última atualização: {new Date().toLocaleDateString()}
          </p>
        </CardFooter>
      </Card>

      <Dialog open={showAttemptsDialog} onOpenChange={setShowAttemptsDialog}>
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
          
          {quizAttempts.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Tamanho</TableHead>
                  <TableHead>Data/Hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quizAttempts.map((attempt, index) => {
                  const [name, email, size, timestamp] = attempt.split(',');
                  return (
                    <TableRow key={index}>
                      <TableCell>{name}</TableCell>
                      <TableCell>{email}</TableCell>
                      <TableCell>{size} questões</TableCell>
                      <TableCell>{formatDate(timestamp)}</TableCell>
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
    </div>
  );
};

export default QuestionValidation;

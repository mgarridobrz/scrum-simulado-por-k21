
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Edit, X, ChevronRight, ChevronLeft, Save, AlertCircle } from 'lucide-react';
import { QuestionWithCategory } from '@/data/quizData';
import { quizQuestions } from '@/data/quizData';
import { useToast } from "@/components/ui/use-toast";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const QuestionValidation = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [questions, setQuestions] = useState<QuestionWithCategory[]>(quizQuestions);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithCategory>(questions[0]);
  const [filter, setFilter] = useState<string>('all');
  const [approvedQuestions, setApprovedQuestions] = useState<number[]>([]);

  // Load approved questions from localStorage when component mounts
  useEffect(() => {
    const savedApprovedQuestions = localStorage.getItem('approvedQuestions');
    if (savedApprovedQuestions) {
      setApprovedQuestions(JSON.parse(savedApprovedQuestions));
    }
  }, []);

  // Save approved questions to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('approvedQuestions', JSON.stringify(approvedQuestions));
  }, [approvedQuestions]);

  const filteredQuestions = filter === 'all' 
    ? questions 
    : questions.filter(q => q.category === filter);

  // Handle question navigation
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

  // Handle edits to the current question
  const handleQuestionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentQuestion({
      ...currentQuestion,
      question: e.target.value
    });
  };

  const handleOptionChange = (id: string, text: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      options: currentQuestion.options.map(option => 
        option.id === id ? { ...option, text } : option
      )
    });
  };

  const handleCorrectAnswerChange = (value: string) => {
    setCurrentQuestion({
      ...currentQuestion,
      correctAnswer: value
    });
  };

  const handleExplanationChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCurrentQuestion({
      ...currentQuestion,
      explanation: e.target.value
    });
  };

  // Save changes to the question
  const saveChanges = () => {
    const updatedQuestions = questions.map(q => 
      q.id === currentQuestion.id ? currentQuestion : q
    );
    setQuestions(updatedQuestions);
    setEditMode(false);
    toast({
      title: "Alterações salvas",
      description: "As alterações na questão foram salvas com sucesso.",
    });
  };

  // Approve question (mark as validated)
  const approveQuestion = () => {
    if (!approvedQuestions.includes(currentQuestion.id)) {
      const newApprovedQuestions = [...approvedQuestions, currentQuestion.id];
      setApprovedQuestions(newApprovedQuestions);
      toast({
        title: "Questão aprovada",
        description: "A questão foi marcada como aprovada e será usada no quiz oficial.",
      });
    } else {
      // Remove from approved if already approved (toggle functionality)
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

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Validação de Perguntas do Quiz</h1>
        <div className="flex gap-2">
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

      {currentQuestion && (
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
      )}
    </div>
  );
};

export default QuestionValidation;

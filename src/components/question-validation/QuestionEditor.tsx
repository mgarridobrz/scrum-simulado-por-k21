
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Check, Edit, X, Save } from 'lucide-react';
import { QuestionWithCategory } from '@/data/quizData';
import { useToast } from "@/hooks/use-toast";

interface QuestionEditorProps {
  question: QuestionWithCategory;
  isApproved: boolean;
  onSave: (question: QuestionWithCategory) => void;
  onApprove: () => void;
}

const QuestionEditor = ({ question, isApproved, onSave, onApprove }: QuestionEditorProps) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithCategory>(question);

  // Update local state when props change
  React.useEffect(() => {
    setCurrentQuestion(question);
  }, [question]);

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

  const saveChanges = () => {
    onSave(currentQuestion);
    setEditMode(false);
    toast({
      title: "Alterações salvas",
      description: "As alterações na questão foram salvas com sucesso.",
    });
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'fundamentals': return 'Fundamentos';
      case 'roles': return 'Papéis';
      case 'events': return 'Eventos';
      case 'artifacts': return 'Artefatos';
      default: return category;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">
            Categoria: {getCategoryName(currentQuestion.category)}
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
                onClick={onApprove} 
                variant={isApproved ? "secondary" : "default"} 
                size="sm"
              >
                <Check size={16} className="mr-1" /> 
                {isApproved ? "Aprovada" : "Aprovar"}
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
          Status: {isApproved ? (
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
  );
};

export default QuestionEditor;

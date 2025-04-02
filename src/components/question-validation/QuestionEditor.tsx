
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionWithCategory } from '@/data/types';
import { useToast } from "@/hooks/use-toast";
import QuestionOptionTable from './QuestionOptionTable';

interface QuestionEditorProps {
  question: QuestionWithCategory;
  onSave: (question: QuestionWithCategory) => Promise<boolean>;
}

const QuestionEditor = ({ question, onSave }: QuestionEditorProps) => {
  const { toast } = useToast();
  const [editMode, setEditMode] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<QuestionWithCategory>(question);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setCurrentQuestion(question);
    setEditMode(false);
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

  const saveChanges = async () => {
    setIsSaving(true);
    try {
      const success = await onSave(currentQuestion);
      if (success) {
        setEditMode(false);
      }
    } catch (error) {
      console.error("Error saving question:", error);
      toast({
        title: "Erro ao salvar",
        description: "Ocorreu um erro ao salvar as alterações.",
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  const getCategoryName = (category: string) => {
    switch (category) {
      case 'fundamentals': return 'Fundamentos';
      case 'roles': return 'Papéis';
      case 'events': return 'Eventos';
      case 'artifacts': return 'Artefatos';
      case 'dysfunctions': return 'Disfunções';
      default: return category;
    }
  };

  return (
    <Card className="mb-6">
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-xl">
            Categoria: {getCategoryName(question.category)}
          </CardTitle>
          <CardDescription>ID: {question.id}</CardDescription>
        </div>
        <div className="flex space-x-2">
          {editMode ? (
            <Button 
              variant="default" 
              onClick={saveChanges}
              disabled={isSaving}
            >
              {isSaving ? 'Salvando...' : 'Salvar'}
            </Button>
          ) : (
            <Button 
              variant="outline" 
              onClick={() => setEditMode(true)}
            >
              Editar
            </Button>
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
            <QuestionOptionTable 
              question={currentQuestion}
              editMode={editMode}
              onOptionChange={handleOptionChange}
              onCorrectAnswerChange={handleCorrectAnswerChange}
            />
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
      <CardFooter className="flex justify-end">
        <p className="text-sm text-muted-foreground">
          Última atualização: {new Date().toLocaleDateString()}
        </p>
      </CardFooter>
    </Card>
  );
};

export default QuestionEditor;

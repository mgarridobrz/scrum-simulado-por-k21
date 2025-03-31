
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionWithCategory } from '@/data/quizData';
import { useToast } from "@/hooks/use-toast";
import QuestionOptionTable from './QuestionOptionTable';
import QuestionHeaderActions from './QuestionHeaderActions';

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
  useEffect(() => {
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
        <QuestionHeaderActions 
          editMode={editMode}
          isApproved={isApproved}
          onSave={saveChanges}
          onEdit={() => setEditMode(true)}
          onApprove={onApprove}
        />
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

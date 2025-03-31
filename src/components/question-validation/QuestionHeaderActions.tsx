
import React from 'react';
import { Button } from '@/components/ui/button';
import { Save, Edit, Check } from 'lucide-react';

interface QuestionHeaderActionsProps {
  editMode: boolean;
  isApproved: boolean;
  onSave: () => void;
  onEdit: () => void;
  onApprove: () => void;
}

const QuestionHeaderActions = ({ 
  editMode, 
  isApproved, 
  onSave, 
  onEdit, 
  onApprove 
}: QuestionHeaderActionsProps) => {
  return (
    <div className="flex gap-2">
      {editMode ? (
        <Button onClick={onSave} variant="default" size="sm">
          <Save size={16} className="mr-1" /> Salvar
        </Button>
      ) : (
        <>
          <Button onClick={onEdit} variant="outline" size="sm">
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
  );
};

export default QuestionHeaderActions;

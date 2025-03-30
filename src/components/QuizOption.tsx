
import React from 'react';
import { cn } from "@/lib/utils";
import { Check, X } from "lucide-react";

export interface QuizOptionProps {
  id: string;
  label: string;
  isSelected: boolean;
  isCorrect?: boolean;
  showResult?: boolean;
  onSelect: (id: string) => void;
}

const QuizOption = ({
  id,
  label,
  isSelected,
  isCorrect,
  showResult = false,
  onSelect,
}: QuizOptionProps) => {
  const handleSelect = () => {
    if (!showResult) {
      onSelect(id);
    }
  };

  return (
    <div
      className={cn(
        "quiz-option",
        isSelected && "quiz-option-selected",
        showResult && isSelected && isCorrect && "quiz-option-correct",
        showResult && isSelected && !isCorrect && "quiz-option-incorrect"
      )}
      onClick={handleSelect}
    >
      <div className="flex items-center gap-3 w-full">
        <div
          className={cn(
            "flex-shrink-0 h-5 w-5 rounded-full border flex items-center justify-center",
            isSelected && "bg-k21-gold border-k21-gold text-white",
            showResult && isSelected && isCorrect && "bg-green-500 border-green-500",
            showResult && isSelected && !isCorrect && "bg-red-500 border-red-500"
          )}
        >
          {isSelected && !showResult && <span className="text-xs">✓</span>}
          {showResult && isSelected && isCorrect && <Check className="h-3 w-3" />}
          {showResult && isSelected && !isCorrect && <X className="h-3 w-3" />}
        </div>
        <div className="text-sm">{label}</div>
      </div>
      
      {showResult && isCorrect && !isSelected && (
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-green-500">
          <Check className="h-5 w-5" />
        </div>
      )}
    </div>
  );
};

export default QuizOption;

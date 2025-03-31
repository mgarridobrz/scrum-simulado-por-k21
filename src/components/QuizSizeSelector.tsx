
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizSizeSelectorProps {
  onSelectSize: (size: number) => void;
}

const QuizSizeSelector = ({ onSelectSize }: QuizSizeSelectorProps) => {
  // Size options with their descriptions
  const sizeOptions = [
    { size: 10, title: "Simulado rápido", time: "Aprox. 10 minutos" },
    { size: 25, title: "Simulado intermediário", time: "Aprox. 25 minutos" },
    { size: 50, title: "Simulado completo", time: "Aprox. 50 minutos" }
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-k21-black">
        Selecione o número de questões
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sizeOptions.map((option) => (
          <Card 
            key={option.size}
            className="p-6 text-center cursor-pointer border-2 hover:border-k21-teal transition-colors"
            onClick={() => onSelectSize(option.size)}
          >
            <h3 className="text-2xl font-bold text-k21-black mb-2">{option.size}</h3>
            <p className="text-sm text-muted-foreground">{option.title}</p>
            <p className="text-xs text-muted-foreground mt-1">{option.time}</p>
            <Button 
              className="mt-4 bg-k21-teal hover:bg-k21-teal/90 w-full"
              onClick={(e) => {
                e.stopPropagation();
                onSelectSize(option.size);
              }}
            >
              Iniciar
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuizSizeSelector;


import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface QuizSizeSelectorProps {
  onSelectSize: (size: number) => void;
}

const QuizSizeSelector = ({ onSelectSize }: QuizSizeSelectorProps) => {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-center text-k21-black">
        Selecione o número de questões
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card 
          className="p-6 text-center cursor-pointer border-2 hover:border-k21-teal transition-colors"
        >
          <h3 className="text-2xl font-bold text-k21-black mb-2">10</h3>
          <p className="text-sm text-muted-foreground">Simulado rápido</p>
          <p className="text-xs text-muted-foreground mt-1">Aprox. 10 minutos</p>
          <Button 
            className="mt-4 bg-k21-teal hover:bg-k21-teal/90 w-full"
            onClick={() => onSelectSize(10)}
          >
            Iniciar
          </Button>
        </Card>
        
        <Card 
          className="p-6 text-center cursor-pointer border-2 hover:border-k21-teal transition-colors"
        >
          <h3 className="text-2xl font-bold text-k21-black mb-2">25</h3>
          <p className="text-sm text-muted-foreground">Simulado intermediário</p>
          <p className="text-xs text-muted-foreground mt-1">Aprox. 25 minutos</p>
          <Button 
            className="mt-4 bg-k21-teal hover:bg-k21-teal/90 w-full"
            onClick={() => onSelectSize(25)}
          >
            Iniciar
          </Button>
        </Card>
        
        <Card 
          className="p-6 text-center cursor-pointer border-2 hover:border-k21-teal transition-colors"
        >
          <h3 className="text-2xl font-bold text-k21-black mb-2">50</h3>
          <p className="text-sm text-muted-foreground">Simulado completo</p>
          <p className="text-xs text-muted-foreground mt-1">Aprox. 50 minutos</p>
          <Button 
            className="mt-4 bg-k21-teal hover:bg-k21-teal/90 w-full"
            onClick={() => onSelectSize(50)}
          >
            Iniciar
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default QuizSizeSelector;

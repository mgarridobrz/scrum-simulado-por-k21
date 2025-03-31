
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import QuizSizeSelector from './QuizSizeSelector';

interface StartScreenProps {
  onStart: (size: number) => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  const [showSizeSelector, setShowSizeSelector] = useState(false);
  
  const handleStartClick = () => {
    setShowSizeSelector(true);
  };

  const handleSizeSelection = (size: number) => {
    console.log("StartScreen - Size selected:", size);
    // Directly pass the size to onStart
    onStart(size);
  };

  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-k21-black">
        Simulado de Certificação
        <span className="text-k21-gold block"> Certified ScrumMaster®</span>
      </h1>
      
      <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-32 mx-auto rounded-full" />
      
      <p className="text-muted-foreground">
        Prepare-se para sua certificação CSM com este simulado oferecido pela K21 Brasil.
      </p>
      
      {!showSizeSelector ? (
        <>
          <Card className="p-6 bg-gradient-to-br from-white to-gray-50">
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-k21-teal/10 flex items-center justify-center">
                  <span className="text-k21-teal font-medium">1</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">Simulado Realista</h3>
                  <p className="text-sm text-muted-foreground">Questões no estilo do exame oficial</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-k21-gold/10 flex items-center justify-center">
                  <span className="text-k21-gold font-medium">2</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">Resultado Detalhado</h3>
                  <p className="text-sm text-muted-foreground">Veja o que você acertou e onde precisa melhorar</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-black/10 flex items-center justify-center">
                  <span className="text-black font-medium">3</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">Conteúdo Atualizado</h3>
                  <p className="text-sm text-muted-foreground">Baseado nas diretrizes mais recentes da Scrum Alliance</p>
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-green-500/10 flex items-center justify-center">
                  <span className="text-green-500 font-medium">4</span>
                </div>
                <div className="text-left">
                  <h3 className="font-medium text-k21-black">Explicações Detalhadas</h3>
                  <p className="text-sm text-muted-foreground">Entenda o porquê de cada resposta correta</p>
                </div>
              </div>
            </div>
          </Card>
          
          <Button
            onClick={handleStartClick}
            className="bg-k21-teal hover:bg-k21-teal/90 text-white px-8 py-6 text-lg"
          >
            Iniciar Simulado
          </Button>
        </>
      ) : (
        <QuizSizeSelector onSelectSize={handleSizeSelection} />
      )}
      
      <p className="text-xs text-muted-foreground">
        Para informações adicionais, visite <a href="https://k21.com.br" className="text-k21-gold hover:underline">k21.com.br</a>
      </p>
    </div>
  );
};

export default StartScreen;

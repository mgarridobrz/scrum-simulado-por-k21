
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen = ({ onStart }: StartScreenProps) => {
  return (
    <div className="max-w-2xl mx-auto text-center space-y-6 animate-fade-in">
      <h1 className="text-3xl font-bold text-k21-black">
        Simulado de Certificação
        <span className="text-k21-gold"> Certified ScrumMaster®</span>
      </h1>
      
      <div className="bg-gradient-to-r from-k21-gold to-k21-teal h-1 w-32 mx-auto rounded-full" />
      
      <p className="text-muted-foreground">
        Prepare-se para sua certificação CSM com este simulado oferecido pela K21 Brasil.
      </p>
      
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
        </div>
      </Card>
      
      <Button
        onClick={onStart}
        className="bg-k21-teal hover:bg-k21-teal/90 text-white px-8 py-6 text-lg"
      >
        Iniciar Simulado
      </Button>
      
      <p className="text-xs text-muted-foreground">
        Para informações adicionais, visite <a href="https://k21.com.br" className="text-k21-gold hover:underline">k21.com.br</a>
      </p>
    </div>
  );
};

export default StartScreen;

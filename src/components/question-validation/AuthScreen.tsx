
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";

interface AuthScreenProps {
  onAuthenticated: (password: string) => void;
}

const AuthScreen = ({ onAuthenticated }: AuthScreenProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const hashedPassword = btoa(password);
    const correctHash = btoa('120703');
    
    if (hashedPassword === correctHash) {
      localStorage.setItem('validationPageAuthenticated', 'true');
      onAuthenticated(password);
      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo à página de validação de questões.",
      });
    } else {
      toast({
        title: "Senha incorreta",
        description: "Por favor, tente novamente.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-md flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
          <CardDescription className="text-center">
            Digite a senha para acessar a validação de questões
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div className="space-y-2">
              <Input
                type="password"
                placeholder="Digite a senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">Entrar</Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={() => navigate('/')} className="mt-2">
            Voltar para início
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthScreen;

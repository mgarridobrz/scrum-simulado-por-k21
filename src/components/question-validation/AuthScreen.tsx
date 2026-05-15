import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from "@/hooks/use-toast";
import { supabase } from '@/integrations/supabase/client';

interface AuthScreenProps {
  onAuthSuccess: () => void;
}

const AuthScreen = ({ onAuthSuccess }: AuthScreenProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError || !signInData.user) {
        toast({
          title: "Falha no login",
          description: signInError?.message || "Credenciais inválidas.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('is_admin')
        .eq('id', signInData.user.id)
        .maybeSingle();

      if (profileError || !profile?.is_admin) {
        await supabase.auth.signOut();
        toast({
          title: "Acesso negado",
          description: "Sua conta não tem permissão de administrador.",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      toast({
        title: "Acesso autorizado",
        description: "Bem-vindo ao painel de administração.",
      });
      onAuthSuccess();
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Erro de autenticação",
        description: "Erro interno do sistema. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-md flex flex-col items-center justify-center min-h-[70vh]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl text-center">Acesso Restrito</CardTitle>
          <CardDescription className="text-center">
            Faça login com sua conta de administrador
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
            <Input
              type="password"
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </Button>
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

import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { toast } from "@/hooks/use-toast";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      const response = await authService.login(username, password);
      if (response.data?.token) {
        localStorage.setItem('token', response.data.token);
        toast({
          title: "Login bem-sucedido",
          description: "Redirecionando para o dashboard...",
        });
        navigate('/dashboard');
      } else {
        throw new Error('Token não recebido');
      }
    } catch (error: any) {
      console.error('Erro de login:', error);
      toast({
        title: "Falha no login",
        description: error.response?.data?.message || "Usuário ou senha incorretos.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6"
      >
        <div className="flex justify-center mb-8">
          <Logo />
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl text-center">GOS - Gerenciamento de Ordens de Serviço</CardTitle>
            <CardDescription className="text-center">
              Entre com suas credenciais para acessar o sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Usuário</Label>
                  <Input
                    id="username"
                    placeholder="Seu nome de usuário"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Sua senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Entrando..." : "Entrar"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <div className="text-sm text-gray-600">
              Não tem uma conta?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Criar conta
              </Link>
            </div>
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} GOS - Todos os direitos reservados
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;

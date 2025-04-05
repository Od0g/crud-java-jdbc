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

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    email: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validação básica
    if (!formData.username || !formData.password || !formData.name || !formData.email) {
      toast({
        title: "Erro de validação",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      await authService.signup(formData);
      toast({
        title: "Cadastro realizado com sucesso",
        description: "Você já pode fazer login.",
      });
      navigate('/login');
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      toast({
        title: "Falha no cadastro",
        description: error.response?.data?.message || "Erro ao criar conta. Tente novamente.",
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
            <CardTitle className="text-2xl text-center">Criar Conta</CardTitle>
            <CardDescription className="text-center">
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="space-y-2">
                  <Label htmlFor="username">Nome de usuário</Label>
                  <Input
                    id="username"
                    name="username"
                    placeholder="Escolha um nome de usuário"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Seu nome completo"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Escolha uma senha segura"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div>
                <Button className="w-full" type="submit" disabled={isLoading}>
                  {isLoading ? "Criando conta..." : "Criar conta"}
                </Button>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4">
            <div className="text-sm text-gray-600">
              Já tem uma conta?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Fazer login
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

export default SignUp; 
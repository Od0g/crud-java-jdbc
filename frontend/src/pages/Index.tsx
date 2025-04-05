
import { FC } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronRight, BarChart, Wrench, Settings, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';

const features = [
  {
    title: 'Cadastro de Máquinas',
    description: 'Gerencie o inventário completo de máquinas com detalhes técnicos e histórico.',
    icon: Settings,
  },
  {
    title: 'Controle de Manutenção',
    description: 'Acompanhe as manutenções preventivas e corretivas com detalhamento de custos.',
    icon: Wrench,
  },
  {
    title: 'Gestão de Peças',
    description: 'Controle o estoque e uso de peças e materiais em cada manutenção.',
    icon: CheckCircle,
  },
  {
    title: 'Relatórios Analíticos',
    description: 'Visualize estatísticas e métricas para tomada de decisões estratégicas.',
    icon: BarChart,
  },
];

const Index: FC = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 max-w-3xl"
            >
              <h1 className="h1">
                Gestão de Ordem de Serviço
                <span className="text-primary block mt-2">Simples e Eficiente</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Controle completo das manutenções de máquinas industriais com análise de custos diretos e indiretos.
              </p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button size="lg" asChild>
                <Link to="/dashboard">
                  Começar agora <ChevronRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg">
                Saiba mais
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 md:py-24 bg-accent/50">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="h2 mb-4">Funcionalidades Principais</h2>
            <p className="p max-w-2xl mx-auto">
              Nossa plataforma oferece um conjunto completo de ferramentas para otimizar o gerenciamento de manutenções industriais.
            </p>
          </motion.div>
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card animate className="h-full flex flex-col items-center text-center p-8">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="glass rounded-2xl p-8 md:p-12 text-center max-w-4xl mx-auto"
          >
            <h2 className="h2 mb-4">Pronto para otimizar sua gestão de manutenção?</h2>
            <p className="p max-w-2xl mx-auto mb-8">
              Comece agora mesmo e tenha controle total sobre suas ordens de serviço, custos e relatórios analíticos.
            </p>
            <Button size="lg" asChild>
              <Link to="/dashboard">
                Acessar sistema <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="py-8 border-t">
        <div className="container px-4 md:px-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-muted-foreground">
              © 2024 GOS Manager. Todos os direitos reservados.
            </p>
          </div>
          <div className="flex space-x-6">
            <Link to="/privacy" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Privacidade
            </Link>
            <Link to="/terms" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Termos
            </Link>
            <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Contato
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

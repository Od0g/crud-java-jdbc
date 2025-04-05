import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navbar from '@/components/Navbar';
import { Plus, Calendar, ArrowRight, Search, Wrench, Clock } from 'lucide-react';
import PageTransition from '@/components/PageTransition';
import { Link, useParams } from 'react-router-dom';
import { Input } from "@/components/ui/input";

const dummyMaintenances = [
  {
    id: 'OS-2405',
    machine: 'Injetora Plástica XTZ-100',
    type: 'Preventiva',
    status: 'Concluída',
    startDate: '15/03/2024',
    endDate: '15/03/2024',
    downtime: '4h',
    technician: 'Carlos Silva',
    description: 'Manutenção preventiva semestral com troca de óleo e lubrificação.'
  },
  {
    id: 'OS-2404',
    machine: 'Torno CNC T-500',
    type: 'Corretiva',
    status: 'Em andamento',
    startDate: '14/03/2024',
    endDate: '',
    downtime: '12h',
    technician: 'Ricardo Almeida',
    description: 'Substituição de rolamentos e verificação do sistema de refrigeração.'
  },
  {
    id: 'OS-2403',
    machine: 'Prensa Hidráulica PH-200',
    type: 'Preventiva',
    status: 'Agendada',
    startDate: '18/03/2024',
    endDate: '',
    downtime: '6h',
    technician: 'Maria Santos',
    description: 'Verificação de vazamentos e ajuste do sistema hidráulico.'
  },
  {
    id: 'OS-2402',
    machine: 'Esteira Transportadora ET-300',
    type: 'Corretiva',
    status: 'Concluída',
    startDate: '10/03/2024',
    endDate: '11/03/2024',
    downtime: '8h',
    technician: 'João Oliveira',
    description: 'Reparo no motor principal e substituição de correia.'
  },
  {
    id: 'OS-2401',
    machine: 'Compressor Industrial CI-50',
    type: 'Preventiva',
    status: 'Concluída',
    startDate: '08/03/2024',
    endDate: '08/03/2024',
    downtime: '3h',
    technician: 'Ana Paula Costa',
    description: 'Limpeza de filtros e verificação de pressão.'
  },
];

const MaintenanceRegistration = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const { id } = useParams();
  
  const selectedMaintenance = id ? dummyMaintenances.find(m => m.id === id) : null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Concluída':
        return 'bg-green-100 text-green-700';
      case 'Em andamento':
        return 'bg-blue-100 text-blue-700';
      case 'Agendada':
        return 'bg-purple-100 text-purple-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Preventiva' 
      ? 'bg-teal-100 text-teal-700' 
      : 'bg-amber-100 text-amber-700';
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <PageTransition>
        <main className="pt-28 pb-16">
          <div className="container px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">
                  {selectedMaintenance ? `Ordem de Serviço: ${selectedMaintenance.id}` : 'Controle de Manutenção'}
                </h1>
                <p className="text-muted-foreground">
                  {selectedMaintenance 
                    ? `${selectedMaintenance.machine} - ${selectedMaintenance.type}` 
                    : 'Acompanhe as manutenções preventivas e corretivas'}
                </p>
              </div>
              {!selectedMaintenance && (
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="gap-1">
                    <Calendar className="h-4 w-4" /> 
                    Agenda
                  </Button>
                  <Button size="sm" className="gap-1">
                    <Plus className="h-4 w-4" />
                    Nova O.S.
                  </Button>
                </div>
              )}
            </div>
            
            {selectedMaintenance ? (
              // Maintenance detail view
              <div className="space-y-6">
                <Card className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Detalhes da Ordem de Serviço</h2>
                      <div className="space-y-3">
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Status:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(selectedMaintenance.status)}`}>
                            {selectedMaintenance.status}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Tipo:</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(selectedMaintenance.type)}`}>
                            {selectedMaintenance.type}
                          </span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Data Início:</span>
                          <span>{selectedMaintenance.startDate}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Data Término:</span>
                          <span>{selectedMaintenance.endDate || 'Em aberto'}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Tempo de Parada:</span>
                          <span>{selectedMaintenance.downtime}</span>
                        </div>
                        <div className="flex justify-between border-b pb-2">
                          <span className="text-muted-foreground">Técnico Responsável:</span>
                          <span>{selectedMaintenance.technician}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Descrição do Serviço</h2>
                      <p className="text-muted-foreground mb-4">{selectedMaintenance.description}</p>
                      
                      <h3 className="font-medium mt-6 mb-2">Custos</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Peças e Materiais:</span>
                          <span className="font-medium">R$ 1.245,80</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Mão de Obra:</span>
                          <span className="font-medium">R$ 680,00</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Custos Indiretos:</span>
                          <span className="font-medium">R$ 320,50</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-medium">Total:</span>
                          <span className="font-bold">R$ 2.246,30</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Peças Utilizadas</h2>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Peça</th>
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Qtde</th>
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 px-2">Rolamento 6205-ZZ</td>
                          <td className="py-2 px-2">2</td>
                          <td className="py-2 px-2">R$ 37,00</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2">Óleo Lubrificante</td>
                          <td className="py-2 px-2">5 L</td>
                          <td className="py-2 px-2">R$ 139,00</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2">Kit de Vedação</td>
                          <td className="py-2 px-2">1</td>
                          <td className="py-2 px-2">R$ 195,80</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                  
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Mão de Obra</h2>
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Técnico</th>
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Horas</th>
                          <th className="py-2 px-2 text-left font-medium text-muted-foreground text-sm">Valor</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-2 px-2">Carlos Silva</td>
                          <td className="py-2 px-2">4</td>
                          <td className="py-2 px-2">R$ 320,00</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2">Ricardo Almeida</td>
                          <td className="py-2 px-2">3</td>
                          <td className="py-2 px-2">R$ 240,00</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-2">Ajudante</td>
                          <td className="py-2 px-2">2</td>
                          <td className="py-2 px-2">R$ 120,00</td>
                        </tr>
                      </tbody>
                    </table>
                  </Card>
                </div>
                
                <div className="flex justify-end gap-2">
                  <Button variant="outline" asChild>
                    <Link to="/maintenance">Voltar</Link>
                  </Button>
                  <Button>Editar O.S.</Button>
                </div>
              </div>
            ) : (
              // Maintenance list view
              <>
                {/* Search and tabs */}
                <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input 
                      placeholder="Buscar O.S. ou máquina..." 
                      className="pl-10" 
                      value={searchTerm}
                      onChange={handleSearch}
                    />
                  </div>
                  
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                    <TabsList>
                      <TabsTrigger value="all">Todas</TabsTrigger>
                      <TabsTrigger value="active">Em Andamento</TabsTrigger>
                      <TabsTrigger value="scheduled">Agendadas</TabsTrigger>
                      <TabsTrigger value="completed">Concluídas</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                {/* Maintenance table */}
                <Card className="mb-8">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">O.S.</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Máquina</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Tipo</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Status</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Data Início</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Tempo Parada</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {dummyMaintenances.map((maintenance) => (
                          <tr key={maintenance.id} className="hover:bg-muted/30 transition-colors">
                            <td className="py-3 px-4 font-medium">{maintenance.id}</td>
                            <td className="py-3 px-4">{maintenance.machine}</td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getTypeColor(maintenance.type)}`}>
                                {maintenance.type}
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(maintenance.status)}`}>
                                {maintenance.status}
                              </span>
                            </td>
                            <td className="py-3 px-4">{maintenance.startDate}</td>
                            <td className="py-3 px-4">{maintenance.downtime}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button variant="ghost" size="sm" asChild>
                                  <Link to={`/maintenance/${maintenance.id}`}>
                                    Detalhes <ArrowRight className="ml-1 h-3 w-3" />
                                  </Link>
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </Card>
                
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Manutenções no Mês</h3>
                          <p className="text-2xl font-bold">24</p>
                        </div>
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                          <Wrench className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Preventivas:</span>
                        <span className="font-medium">14</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Corretivas:</span>
                        <span className="font-medium">10</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Tempo Médio de Parada</h3>
                          <p className="text-2xl font-bold">5.2h</p>
                        </div>
                        <div className="p-2 rounded-full bg-amber-50 text-amber-600">
                          <Clock className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Preventivas:</span>
                        <span className="font-medium">3.5h</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Corretivas:</span>
                        <span className="font-medium">8.7h</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Custo Total</h3>
                          <p className="text-2xl font-bold">R$ 42.680,00</p>
                        </div>
                        <div className="p-2 rounded-full bg-green-50 text-green-600">
                          <Wrench className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Peças:</span>
                        <span className="font-medium">R$ 24.320,00</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Mão-de-obra:</span>
                        <span className="font-medium">R$ 18.360,00</span>
                      </div>
                    </div>
                  </Card>
                </div>
              </>
            )}
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default MaintenanceRegistration;

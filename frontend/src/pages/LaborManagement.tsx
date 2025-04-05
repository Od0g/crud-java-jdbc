import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';
import { Plus, Search, Clock, Users } from 'lucide-react';

const dummyTechnicians = [
  { id: 'T001', name: 'Carlos Silva', role: 'Mecânico', hourRate: 80.0, hours: 42, totalValue: 3360.0 },
  { id: 'T002', name: 'Ricardo Almeida', role: 'Eletricista', hourRate: 85.0, hours: 38, totalValue: 3230.0 },
  { id: 'T003', name: 'Maria Santos', role: 'Mecânica', hourRate: 80.0, hours: 40, totalValue: 3200.0 },
  { id: 'T004', name: 'João Oliveira', role: 'Auxiliar', hourRate: 60.0, hours: 45, totalValue: 2700.0 },
  { id: 'T005', name: 'Ana Paula Costa', role: 'Engenheira', hourRate: 120.0, hours: 36, totalValue: 4320.0 },
];

const dummyLaborEntries = [
  { id: 'L001', os: 'OS-2405', date: '15/03/2024', technician: 'Carlos Silva', role: 'Mecânico', machine: 'Injetora Plástica XTZ-100', hours: 4, hourRate: 80.0, total: 320.0 },
  { id: 'L002', os: 'OS-2404', date: '14/03/2024', technician: 'Ricardo Almeida', role: 'Eletricista', machine: 'Torno CNC T-500', hours: 6, hourRate: 85.0, total: 510.0 },
  { id: 'L003', os: 'OS-2404', date: '14/03/2024', technician: 'João Oliveira', role: 'Auxiliar', machine: 'Torno CNC T-500', hours: 6, hourRate: 60.0, total: 360.0 },
  { id: 'L004', os: 'OS-2403', date: '18/03/2024', technician: 'Maria Santos', role: 'Mecânica', machine: 'Prensa Hidráulica PH-200', hours: 3, hourRate: 80.0, total: 240.0 },
  { id: 'L005', os: 'OS-2402', date: '10/03/2024', technician: 'Ana Paula Costa', role: 'Engenheira', machine: 'Esteira Transportadora ET-300', hours: 2, hourRate: 120.0, total: 240.0 },
];

const LaborManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <PageTransition>
        <main className="pt-28 pb-16">
          <div className="container px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Controle de Mão-de-obra</h1>
                <p className="text-muted-foreground">Gerencie os técnicos e alocação em manutenções</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Clock className="h-4 w-4" /> 
                  Horas Trabalhadas
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Novo Técnico
                </Button>
              </div>
            </div>
            
            {/* Technicians Section */}
            <h2 className="text-xl font-semibold mb-4">Técnicos Disponíveis</h2>
            <div className="mb-8 flex justify-between items-center">
              <div className="relative w-full sm:w-80 mb-4">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar técnico..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <Card className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Nome</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Função</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Valor/Hora</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Horas no Mês</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Valor Total</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dummyTechnicians.map((technician) => (
                      <tr key={technician.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{technician.id}</td>
                        <td className="py-3 px-4">{technician.name}</td>
                        <td className="py-3 px-4">{technician.role}</td>
                        <td className="py-3 px-4">R$ {technician.hourRate.toFixed(2)}</td>
                        <td className="py-3 px-4">{technician.hours}h</td>
                        <td className="py-3 px-4 font-medium">R$ {technician.totalValue.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Editar</Button>
                            <Button variant="ghost" size="sm">Detalhes</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* Labor Entries Section */}
            <h2 className="text-xl font-semibold mb-4">Registros de Mão-de-obra</h2>
            <div className="mb-4 flex justify-between">
              <Button size="sm" className="gap-1">
                <Plus className="h-4 w-4" />
                Nova Alocação
              </Button>
            </div>
            
            <Card className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">O.S.</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Data</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Técnico</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Função</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Máquina</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Horas</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Valor/Hora</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Total</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dummyLaborEntries.map((entry) => (
                      <tr key={entry.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{entry.id}</td>
                        <td className="py-3 px-4">{entry.os}</td>
                        <td className="py-3 px-4">{entry.date}</td>
                        <td className="py-3 px-4">{entry.technician}</td>
                        <td className="py-3 px-4">{entry.role}</td>
                        <td className="py-3 px-4">{entry.machine}</td>
                        <td className="py-3 px-4">{entry.hours}h</td>
                        <td className="py-3 px-4">R$ {entry.hourRate.toFixed(2)}</td>
                        <td className="py-3 px-4 font-medium">R$ {entry.total.toFixed(2)}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Editar</Button>
                            <Button variant="ghost" size="sm">Excluir</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="border-t">
                      <td colSpan={6} className="py-3 px-4 font-medium text-right">Total:</td>
                      <td className="py-3 px-4 font-medium">21h</td>
                      <td className="py-3 px-4"></td>
                      <td className="py-3 px-4 font-bold">R$ 1.670,00</td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total de Técnicos</h3>
                      <p className="text-2xl font-bold">5</p>
                    </div>
                    <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">3 funções diferentes</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Horas Trabalhadas</h3>
                      <p className="text-2xl font-bold">201h</p>
                    </div>
                    <div className="p-2 rounded-full bg-green-50 text-green-600">
                      <Clock className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">No mês atual</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Custo de Mão-de-obra</h3>
                      <p className="text-2xl font-bold">R$ 16.810,00</p>
                    </div>
                    <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                      <Users className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Valor total no mês</p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default LaborManagement;

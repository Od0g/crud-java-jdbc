
import { FC, useState } from 'react';
import { Search, Filter, Plus, BarChart3 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import PageTransition from '@/components/PageTransition';

const dummyIndirectCosts = [
  { id: 'IC001', os: 'OS-2405', date: '15/03/2024', machine: 'Injetora Plástica XTZ-100', description: 'Transporte de equipamentos', value: 320.50 },
  { id: 'IC002', os: 'OS-2404', date: '14/03/2024', machine: 'Torno CNC T-500', description: 'Aluguel de equipamento de medição', value: 580.00 },
  { id: 'IC003', os: 'OS-2404', date: '14/03/2024', machine: 'Torno CNC T-500', description: 'Consultoria especializada', value: 750.00 },
  { id: 'IC004', os: 'OS-2403', date: '18/03/2024', machine: 'Prensa Hidráulica PH-200', description: 'Descarte de resíduos', value: 180.30 },
  { id: 'IC005', os: 'OS-2402', date: '10/03/2024', machine: 'Esteira Transportadora ET-300', description: 'Energia elétrica adicional', value: 420.90 },
];

const costCategories = [
  { category: 'Transporte', total: 3250.80 },
  { category: 'Aluguel de Equipamentos', total: 4580.00 },
  { category: 'Consultorias', total: 2750.00 },
  { category: 'Descarte de Resíduos', total: 1830.30 },
  { category: 'Energia Elétrica', total: 2120.90 },
];

const IndirectCosts: FC = () => {
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
                <h1 className="text-3xl font-bold">Custos Indiretos</h1>
                <p className="text-muted-foreground">Gerencie os custos não diretamente relacionados a peças ou mão-de-obra</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> 
                  Filtrar
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Novo Custo
                </Button>
              </div>
            </div>
            
            {/* Search Bar */}
            <div className="mb-6 flex justify-between items-center">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar custo..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            {/* Indirect Costs Table */}
            <Card className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">ID</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">O.S.</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Data</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Máquina</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Descrição</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Valor</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dummyIndirectCosts.map((cost) => (
                      <tr key={cost.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{cost.id}</td>
                        <td className="py-3 px-4">{cost.os}</td>
                        <td className="py-3 px-4">{cost.date}</td>
                        <td className="py-3 px-4">{cost.machine}</td>
                        <td className="py-3 px-4">{cost.description}</td>
                        <td className="py-3 px-4 font-medium">R$ {cost.value.toFixed(2)}</td>
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
                      <td colSpan={5} className="py-3 px-4 font-medium text-right">Total:</td>
                      <td className="py-3 px-4 font-bold">R$ 2.251,70</td>
                      <td className="py-3 px-4"></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </Card>
            
            {/* Cost Categories */}
            <h2 className="text-xl font-semibold mb-4">Categorias de Custos Indiretos (Ano Atual)</h2>
            <Card className="mb-8">
              <div className="p-6">
                <div className="space-y-6">
                  {costCategories.map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between mb-2">
                        <span className="font-medium">{item.category}</span>
                        <span>R$ {item.total.toFixed(2)}</span>
                      </div>
                      <div className="bg-gray-100 rounded-full h-3">
                        <div 
                          className="bg-primary h-3 rounded-full" 
                          style={{ width: `${(item.total / 14532) * 100}%` }} 
                        />
                      </div>
                    </div>
                  ))}
                  
                  <div className="pt-4 border-t mt-4">
                    <div className="flex justify-between">
                      <span className="font-medium">Custo Total:</span>
                      <span className="font-bold">R$ 14.532,00</span>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
            
            {/* Stats cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total de Custos Indiretos</h3>
                      <p className="text-2xl font-bold">R$ 14.532,00</p>
                    </div>
                    <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Ano atual</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Média por O.S.</h3>
                      <p className="text-2xl font-bold">R$ 450,34</p>
                    </div>
                    <div className="p-2 rounded-full bg-green-50 text-green-600">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Baseado em 32 O.S.</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">% do Custo Total</h3>
                      <p className="text-2xl font-bold">15,8%</p>
                    </div>
                    <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Do orçamento de manutenção</p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default IndirectCosts;

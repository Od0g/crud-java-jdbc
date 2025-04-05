import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import Navbar from '@/components/Navbar';
import { Download, Calendar, Filter, BarChart3, ArrowUpRight, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PageTransition from '@/components/PageTransition';
import { PieChart as RechartsPieChart, Pie, Cell } from 'recharts';

const maintenanceData = [
  { month: 'Jan', preventiva: 12, corretiva: 8 },
  { month: 'Fev', preventiva: 15, corretiva: 10 },
  { month: 'Mar', preventiva: 13, corretiva: 7 },
  { month: 'Abr', preventiva: 14, corretiva: 9 },
  { month: 'Mai', preventiva: 18, corretiva: 5 },
  { month: 'Jun', preventiva: 16, corretiva: 6 },
];

const costDistributionData = [
  { name: 'Peças', value: 45 },
  { name: 'Mão de Obra', value: 30 },
  { name: 'Custos Indiretos', value: 15 },
  { name: 'Outros', value: 10 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const machineData = [
  { name: 'Injetora Plástica XTZ-100', preventiva: 8, corretiva: 3 },
  { name: 'Torno CNC T-500', preventiva: 6, corretiva: 5 },
  { name: 'Prensa Hidráulica PH-200', preventiva: 7, corretiva: 2 },
  { name: 'Esteira Transportadora ET-300', preventiva: 5, corretiva: 4 },
  { name: 'Compressor Industrial CI-50', preventiva: 9, corretiva: 1 },
];

const Reports = () => {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <PageTransition>
        <main className="pt-28 pb-16">
          <div className="container px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Relatórios Analíticos</h1>
                <p className="text-muted-foreground">Visualize estatísticas e métricas para tomada de decisões</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Calendar className="h-4 w-4" /> 
                  Período
                </Button>
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" />
                  Filtros
                </Button>
                <Button size="sm" className="gap-1">
                  <Download className="h-4 w-4" />
                  Exportar
                </Button>
              </div>
            </div>
            
            {/* Tabs */}
            <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                <TabsTrigger value="distribution">Distribuição</TabsTrigger>
                <TabsTrigger value="details">Detalhado</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-6 mt-6">
                {/* Stats cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Total de Manutenções</h3>
                          <p className="text-2xl font-bold">247</p>
                        </div>
                        <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="flex items-center text-green-600">
                          +12%
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                        <span className="text-muted-foreground ml-2">vs. ano anterior</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Custo Total</h3>
                          <p className="text-2xl font-bold">R$ 356.780,00</p>
                        </div>
                        <div className="p-2 rounded-full bg-green-50 text-green-600">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="flex items-center text-red-600">
                          +8.3%
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                        <span className="text-muted-foreground ml-2">vs. ano anterior</span>
                      </div>
                    </div>
                  </Card>
                  
                  <Card>
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h3 className="text-sm font-medium text-muted-foreground">Tempo Total de Parada</h3>
                          <p className="text-2xl font-bold">1.245 horas</p>
                        </div>
                        <div className="p-2 rounded-full bg-amber-50 text-amber-600">
                          <BarChart3 className="h-5 w-5" />
                        </div>
                      </div>
                      <div className="flex items-center text-sm">
                        <span className="flex items-center text-green-600">
                          -5.2%
                          <ArrowUpRight className="h-3 w-3 ml-1" />
                        </span>
                        <span className="text-muted-foreground ml-2">vs. ano anterior</span>
                      </div>
                    </div>
                  </Card>
                </div>
                
                {/* Chart - Maintenance by Month */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Manutenções por Mês</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={maintenanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <Bar key={`bar-${0}`} dataKey="preventiva" name="Preventiva" fill="#0088FE" />
                        <Bar key={`bar-${1}`} dataKey="corretiva" name="Corretiva" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
                
                {/* Chart - Maintenance by Machine */}
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Manutenções por Máquina</h2>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={machineData} layout="vertical" margin={{ top: 20, right: 30, left: 180, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis type="number" />
                        <YAxis type="category" dataKey="name" width={170} />
                        <Tooltip />
                        <Legend />
                        <Bar dataKey="preventiva" name="Preventiva" fill="#0088FE" />
                        <Bar dataKey="corretiva" name="Corretiva" fill="#FF8042" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="distribution" className="space-y-6 mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Chart - Cost Distribution */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Distribuição de Custos</h2>
                    <div className="h-80">
                      <ResponsiveContainer width="100%" height="100%">
                        <RechartsPieChart>
                          <Pie
                            data={costDistributionData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {costDistributionData.map((_, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </RechartsPieChart>
                      </ResponsiveContainer>
                    </div>
                  </Card>
                  
                  {/* Cost breakdown */}
                  <Card className="p-6">
                    <h2 className="text-xl font-semibold mb-6">Detalhamento de Custos</h2>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium mb-2">Peças e Materiais</h3>
                        <div className="bg-gray-100 rounded-full h-4">
                          <div className="bg-blue-500 h-4 rounded-full" style={{ width: '45%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-muted-foreground">45% do total</span>
                          <span className="font-medium">R$ 160.551,00</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Mão de Obra</h3>
                        <div className="bg-gray-100 rounded-full h-4">
                          <div className="bg-green-500 h-4 rounded-full" style={{ width: '30%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-muted-foreground">30% do total</span>
                          <span className="font-medium">R$ 107.034,00</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Custos Indiretos</h3>
                        <div className="bg-gray-100 rounded-full h-4">
                          <div className="bg-amber-500 h-4 rounded-full" style={{ width: '15%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-muted-foreground">15% do total</span>
                          <span className="font-medium">R$ 53.517,00</span>
                        </div>
                      </div>
                      
                      <div>
                        <h3 className="text-sm font-medium mb-2">Outros</h3>
                        <div className="bg-gray-100 rounded-full h-4">
                          <div className="bg-red-500 h-4 rounded-full" style={{ width: '10%' }}></div>
                        </div>
                        <div className="flex justify-between mt-1 text-sm">
                          <span className="text-muted-foreground">10% do total</span>
                          <span className="font-medium">R$ 35.678,00</span>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t mt-4">
                        <div className="flex justify-between">
                          <span className="font-medium">Custo Total:</span>
                          <span className="font-bold">R$ 356.780,00</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
                
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">Comparativo: Preventiva vs. Corretiva</h2>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Tipo</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Quantidade</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Custo Total</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Custo Médio</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Tempo Médio</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-700">Preventiva</span>
                          </td>
                          <td className="py-3 px-4">156</td>
                          <td className="py-3 px-4">R$ 185.525,60</td>
                          <td className="py-3 px-4">R$ 1.189,20</td>
                          <td className="py-3 px-4">3.5h</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">Corretiva</span>
                          </td>
                          <td className="py-3 px-4">91</td>
                          <td className="py-3 px-4">R$ 171.254,40</td>
                          <td className="py-3 px-4">R$ 1.882,00</td>
                          <td className="py-3 px-4">8.7h</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </Card>
              </TabsContent>
              
              <TabsContent value="details" className="space-y-6 mt-6">
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Relatório Detalhado de Manutenções</h2>
                    <Button variant="outline" size="sm" className="gap-1">
                      <FileText className="h-4 w-4" />
                      Gerar PDF
                    </Button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">O.S.</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Máquina</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Tipo</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Data</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Peças</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Mão de Obra</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Outros</th>
                          <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Total</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        <tr>
                          <td className="py-3 px-4 font-medium">OS-2405</td>
                          <td className="py-3 px-4">Injetora Plástica XTZ-100</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-700">Preventiva</span>
                          </td>
                          <td className="py-3 px-4">15/03/2024</td>
                          <td className="py-3 px-4">R$ 1.245,80</td>
                          <td className="py-3 px-4">R$ 680,00</td>
                          <td className="py-3 px-4">R$ 320,50</td>
                          <td className="py-3 px-4 font-medium">R$ 2.246,30</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">OS-2404</td>
                          <td className="py-3 px-4">Torno CNC T-500</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">Corretiva</span>
                          </td>
                          <td className="py-3 px-4">14/03/2024</td>
                          <td className="py-3 px-4">R$ 3.780,50</td>
                          <td className="py-3 px-4">R$ 1.240,00</td>
                          <td className="py-3 px-4">R$ 520,80</td>
                          <td className="py-3 px-4 font-medium">R$ 5.541,30</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">OS-2403</td>
                          <td className="py-3 px-4">Prensa Hidráulica PH-200</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-700">Preventiva</span>
                          </td>
                          <td className="py-3 px-4">10/03/2024</td>
                          <td className="py-3 px-4">R$ 856,20</td>
                          <td className="py-3 px-4">R$ 540,00</td>
                          <td className="py-3 px-4">R$ 180,30</td>
                          <td className="py-3 px-4 font-medium">R$ 1.576,50</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">OS-2402</td>
                          <td className="py-3 px-4">Esteira Transportadora ET-300</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-amber-100 text-amber-700">Corretiva</span>
                          </td>
                          <td className="py-3 px-4">05/03/2024</td>
                          <td className="py-3 px-4">R$ 2.350,70</td>
                          <td className="py-3 px-4">R$ 1.680,00</td>
                          <td className="py-3 px-4">R$ 420,90</td>
                          <td className="py-3 px-4 font-medium">R$ 4.451,60</td>
                        </tr>
                        <tr>
                          <td className="py-3 px-4 font-medium">OS-2401</td>
                          <td className="py-3 px-4">Compressor Industrial CI-50</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-1 rounded-full text-xs bg-teal-100 text-teal-700">Preventiva</span>
                          </td>
                          <td className="py-3 px-4">01/03/2024</td>
                          <td className="py-3 px-4">R$ 930,40</td>
                          <td className="py-3 px-4">R$ 420,00</td>
                          <td className="py-3 px-4">R$ 150,20</td>
                          <td className="py-3 px-4 font-medium">R$ 1.500,60</td>
                        </tr>
                      </tbody>
                      <tfoot>
                        <tr className="border-t">
                          <td colSpan={4} className="py-3 px-4 font-medium text-right">Total:</td>
                          <td className="py-3 px-4 font-medium">R$ 9.163,60</td>
                          <td className="py-3 px-4 font-medium">R$ 4.560,00</td>
                          <td className="py-3 px-4 font-medium">R$ 1.592,70</td>
                          <td className="py-3 px-4 font-bold">R$ 15.316,30</td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default Reports;

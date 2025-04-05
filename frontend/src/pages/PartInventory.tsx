import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Plus, Search, Filter, PackagePlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import PageTransition from "@/components/PageTransition";

const dummyParts = [
  { id: 'P001', name: 'Rolamento 6205-ZZ', quantity: 24, unit: 'pç', price: 18.5, location: 'A-12' },
  { id: 'P002', name: 'Correia V A-32', quantity: 12, unit: 'pç', price: 45.9, location: 'B-03' },
  { id: 'P003', name: 'Óleo Lubrificante ISO VG 68', quantity: 200, unit: 'L', price: 27.8, location: 'C-05' },
  { id: 'P004', name: 'Filtro Hidráulico 10μ', quantity: 8, unit: 'pç', price: 156.0, location: 'A-08' },
  { id: 'P005', name: 'Sensor Indutivo M12', quantity: 5, unit: 'pç', price: 189.7, location: 'D-14' },
  { id: 'P006', name: 'Acoplamento Flexível GE-28', quantity: 2, unit: 'pç', price: 320.0, location: 'B-11' },
];

const PartInventory = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <PageTransition>
        <main className="pt-28 pb-16">
          <div className="container px-4 md:px-6">
            {/* Header */}
            <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h1 className="text-3xl font-bold">Gestão de Peças</h1>
                <p className="text-muted-foreground">Controle o estoque e uso de peças e materiais</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="gap-1">
                  <Filter className="h-4 w-4" /> 
                  Filtrar
                </Button>
                <Button size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Nova Peça
                </Button>
              </div>
            </div>
            
            {/* Search and tabs */}
            <div className="mb-6 flex flex-col sm:flex-row justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Buscar peças..." 
                  className="pl-10" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
                <TabsList>
                  <TabsTrigger value="all">Todas</TabsTrigger>
                  <TabsTrigger value="low-stock">Estoque Baixo</TabsTrigger>
                  <TabsTrigger value="no-stock">Sem Estoque</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
            
            {/* Parts table */}
            <Card className="mb-8">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Código</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Descrição</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Quantidade</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Unidade</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Valor</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Localização</th>
                      <th className="py-3 px-4 text-left font-medium text-muted-foreground text-sm">Ações</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {dummyParts.map((part) => (
                      <tr key={part.id} className="hover:bg-muted/30 transition-colors">
                        <td className="py-3 px-4 font-medium">{part.id}</td>
                        <td className="py-3 px-4">{part.name}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            part.quantity <= 5 ? 'bg-red-100 text-red-700' : 
                            part.quantity <= 10 ? 'bg-amber-100 text-amber-700' : 
                            'bg-green-100 text-green-700'
                          }`}>
                            {part.quantity}
                          </span>
                        </td>
                        <td className="py-3 px-4">{part.unit}</td>
                        <td className="py-3 px-4">R$ {part.price.toFixed(2)}</td>
                        <td className="py-3 px-4">{part.location}</td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">Editar</Button>
                            <Button variant="ghost" size="sm">Histórico</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
            
            {/* Usage stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Total de Peças</h3>
                      <p className="text-2xl font-bold">251</p>
                    </div>
                    <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                      <PackagePlus className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">6 categorias diferentes</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Valor em Estoque</h3>
                      <p className="text-2xl font-bold">R$ 142.870,50</p>
                    </div>
                    <div className="p-2 rounded-full bg-green-50 text-green-600">
                      <PackagePlus className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">↑ 12% desde o mês passado</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Itens com Estoque Baixo</h3>
                      <p className="text-2xl font-bold">18</p>
                    </div>
                    <div className="p-2 rounded-full bg-amber-50 text-amber-600">
                      <PackagePlus className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">Necessitam reposição</p>
                </div>
              </Card>
              
              <Card>
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-sm font-medium text-muted-foreground">Consumo Mensal</h3>
                      <p className="text-2xl font-bold">78 itens</p>
                    </div>
                    <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                      <PackagePlus className="h-5 w-5" />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">R$ 15.320,00 em valor</p>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </PageTransition>
    </div>
  );
};

export default PartInventory;

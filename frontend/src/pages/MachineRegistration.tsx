import { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Save, 
  Loader2, 
  X, 
  ChevronLeft, 
  Image as ImageIcon,
  Upload
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import Card from '@/components/Card';
import Navbar from '@/components/Navbar';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface FormData {
  code: string;
  description: string;
  model: string;
  manufacturer: string;
  manufactureYear: string;
  sector: string;
  location: string;
  status: string;
  notes: string;
}

const MachineRegistration: FC = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    code: '',
    description: '',
    model: '',
    manufacturer: '',
    manufactureYear: '',
    sector: '',
    location: '',
    status: 'active',
    notes: '',
  });
  
  const [image, setImage] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: "Máquina cadastrada com sucesso",
        description: `Código: ${formData.code} - ${formData.description}`,
      });
    }, 1500);
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  
  const handleDragLeave = () => {
    setDragging(false);
  };
  
  const removeImage = () => {
    setImage(null);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-28 pb-16">
        <div className="container px-4 md:px-6 max-w-6xl">
          <div className="mb-8">
            <Link 
              to="/machines" 
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors mb-4"
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Voltar para a lista
            </Link>
            <h1 className="text-3xl font-bold">Cadastro de Máquina</h1>
            <p className="text-muted-foreground">Registre uma nova máquina no sistema</p>
          </div>
          
          <form onSubmit={handleSubmit}>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main info */}
                <div className="lg:col-span-2 space-y-6">
                  <Card>
                    <h2 className="text-xl font-semibold mb-4">Informações Principais</h2>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="code">Código *</Label>
                        <Input
                          id="code"
                          name="code"
                          value={formData.code}
                          onChange={handleChange}
                          placeholder="Ex: MQ-001"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select 
                          value={formData.status} 
                          onValueChange={(value) => handleSelectChange('status', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione o status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Ativa</SelectItem>
                            <SelectItem value="maintenance">Em Manutenção</SelectItem>
                            <SelectItem value="inactive">Inativa</SelectItem>
                            <SelectItem value="discontinued">Descontinuada</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="description">Descrição *</Label>
                        <Input
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Ex: Injetora Plástica XTZ-100"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="model">Modelo</Label>
                        <Input
                          id="model"
                          name="model"
                          value={formData.model}
                          onChange={handleChange}
                          placeholder="Ex: XTZ-100"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="manufacturer">Fabricante</Label>
                        <Input
                          id="manufacturer"
                          name="manufacturer"
                          value={formData.manufacturer}
                          onChange={handleChange}
                          placeholder="Ex: Industrial Machines Co."
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="manufactureYear">Ano de Fabricação</Label>
                        <Input
                          id="manufactureYear"
                          name="manufactureYear"
                          value={formData.manufactureYear}
                          onChange={handleChange}
                          placeholder="Ex: 2018"
                          type="number"
                          min="1900"
                          max={new Date().getFullYear()}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="sector">Setor</Label>
                        <Input
                          id="sector"
                          name="sector"
                          value={formData.sector}
                          onChange={handleChange}
                          placeholder="Ex: Produção"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="location">Localização</Label>
                        <Input
                          id="location"
                          name="location"
                          value={formData.location}
                          onChange={handleChange}
                          placeholder="Ex: Galpão 3, Linha 2"
                        />
                      </div>
                      
                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="notes">Observações</Label>
                        <Textarea
                          id="notes"
                          name="notes"
                          value={formData.notes}
                          onChange={handleChange}
                          placeholder="Informações adicionais sobre a máquina"
                          rows={4}
                        />
                      </div>
                    </div>
                  </Card>
                  
                  <div className="flex justify-end gap-3">
                    <Button variant="outline" type="button" asChild>
                      <Link to="/machines">Cancelar</Link>
                    </Button>
                    <Button type="submit" disabled={isSubmitting}>
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Salvando...
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          Salvar Máquina
                        </>
                      )}
                    </Button>
                  </div>
                </div>
                
                {/* Image and documents */}
                <div className="space-y-6">
                  <Card>
                    <h2 className="text-xl font-semibold mb-4">Imagem</h2>
                    
                    <div 
                      className={`border-2 border-dashed rounded-lg p-4 text-center transition-colors ${
                        dragging ? 'border-primary bg-primary/5' : 'border-border'
                      }`}
                      onDragOver={handleDragOver}
                      onDragLeave={handleDragLeave}
                      onDrop={handleDrop}
                    >
                      {image ? (
                        <div className="relative">
                          <img 
                            src={image} 
                            alt="Preview" 
                            className="w-full h-48 object-contain rounded-md" 
                          />
                          <button
                            type="button"
                            onClick={removeImage}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground rounded-full p-1"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="py-8">
                          <ImageIcon className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                          <p className="text-sm text-muted-foreground mb-2">
                            Arraste e solte uma imagem ou
                          </p>
                          <label className="inline-block">
                            <span className="text-sm bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md cursor-pointer hover:bg-secondary/80 transition-colors">
                              Escolher arquivo
                            </span>
                            <input 
                              type="file" 
                              className="hidden" 
                              accept="image/*" 
                              onChange={handleImageUpload}
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </Card>
                  
                  <Card>
                    <h2 className="text-xl font-semibold mb-4">Documentos</h2>
                    
                    <div className="border-2 border-dashed rounded-lg p-4 text-center transition-colors border-border">
                      <div className="py-4">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground mb-2" />
                        <p className="text-sm text-muted-foreground mb-2">
                          Adicione manuais ou documentação técnica
                        </p>
                        <Button variant="secondary" size="sm">
                          Adicionar documento
                        </Button>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </motion.div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default MachineRegistration;

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Calculator, Loader2, Car, Home, Heart, Shield } from 'lucide-react';
import { useTenant } from '@/providers/TenantProvider';
import type { QuoteFormData } from '@/types/tenant';

const basePersonalInfoSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  cpf: z.string().optional(),
});

const quoteFormSchema = z.object({
  type: z.enum(['auto', 'residencial', 'vida', 'saude', 'consorcio'], {
    required_error: 'Selecione o tipo de produto',
  }),
  personalInfo: basePersonalInfoSchema,
  details: z.record(z.any()),
});

export const QuoteForm: React.FC = () => {
  const { toast } = useToast();
  const { tenant } = useTenant();
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [selectedType, setSelectedType] = React.useState<string>('');

  const form = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      type: 'auto',
      personalInfo: {
        name: '',
        email: '',
        phone: '',
        cpf: '',
      },
      details: {},
    },
  });

  const watchedType = form.watch('type');

  const productTypes = [
    { value: 'auto', label: 'Seguro Auto', icon: Car, description: 'Proteção completa para seu veículo' },
    { value: 'residencial', label: 'Seguro Residencial', icon: Home, description: 'Sua casa protegida 24h' },
    { value: 'vida', label: 'Seguro de Vida', icon: Heart, description: 'Tranquilidade para sua família' },
    { value: 'saude', label: 'Plano de Saúde', icon: Shield, description: 'Cuidados médicos de qualidade' },
  ];

  const onSubmit = async (data: QuoteFormData) => {
    if (!tenant) return;

    setIsSubmitting(true);
    try {
      // Simular processamento
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Integração futura com API/Supabase aqui
      console.log('Quote form submitted:', data);

      // Criar mensagem personalizada para WhatsApp
      const productName = productTypes.find(p => p.value === data.type)?.label;
      const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
      
      let detailsText = '';
      if (data.type === 'auto' && data.details) {
        detailsText = `\n\nDetalhes do veículo:\n- Modelo: ${data.details.model || 'Não informado'}\n- Ano: ${data.details.year || 'Não informado'}`;
      }

      const message = encodeURIComponent(
        `Olá! Gostaria de solicitar uma cotação de ${productName}.\n\n` +
        `Meus dados:\n- Nome: ${data.personalInfo.name}\n- Email: ${data.personalInfo.email}\n- Telefone: ${data.personalInfo.phone}` +
        detailsText +
        `\n\nAguardo o contato!`
      );
      
      window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');

      toast({
        title: 'Cotação solicitada!',
        description: 'Você será redirecionado para o WhatsApp. Nossa equipe retornará em até 1 hora.',
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Erro ao solicitar cotação',
        description: 'Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderProductTypeCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      {productTypes.map((product) => {
        const IconComponent = product.icon;
        const isSelected = watchedType === product.value;
        
        return (
          <Card 
            key={product.value}
            className={`cursor-pointer transition-all hover:shadow-md ${
              isSelected ? 'ring-2 ring-primary border-primary' : 'border-border'
            }`}
            onClick={() => form.setValue('type', product.value as any)}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${
                  isSelected ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary'
                }`}>
                  <IconComponent className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-semibold">{product.label}</h3>
                  <p className="text-sm text-muted-foreground">{product.description}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );

  const renderProductSpecificFields = () => {
    if (watchedType === 'auto') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dados do Veículo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="details.model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Modelo do veículo</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: Honda Civic" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details.year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 2020" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    if (watchedType === 'residencial') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dados do Imóvel</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="details.propertyType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de imóvel</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="casa">Casa</SelectItem>
                      <SelectItem value="apartamento">Apartamento</SelectItem>
                      <SelectItem value="condominio">Casa em Condomínio</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details.value"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor do imóvel (aproximado)</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: R$ 300.000" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    if (watchedType === 'vida') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Informações do Seguro</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="details.coverage"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Cobertura desejada</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione a cobertura" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="100k">R$ 100.000</SelectItem>
                      <SelectItem value="200k">R$ 200.000</SelectItem>
                      <SelectItem value="500k">R$ 500.000</SelectItem>
                      <SelectItem value="1m">R$ 1.000.000</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details.age"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Idade</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 35" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    if (watchedType === 'saude') {
      return (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Dados do Plano</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="details.planType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de plano</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="individual">Individual</SelectItem>
                      <SelectItem value="familiar">Familiar</SelectItem>
                      <SelectItem value="empresarial">Empresarial</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="details.dependents"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Número de beneficiários</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex: 3" type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {/* Product Type Selection */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Selecione o produto</h3>
          {renderProductTypeCards()}
        </div>

        {/* Personal Information */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Seus dados</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="personalInfo.name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome completo *</FormLabel>
                  <FormControl>
                    <Input placeholder="Seu nome completo" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>E-mail *</FormLabel>
                  <FormControl>
                    <Input placeholder="seu@email.com" type="email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="personalInfo.phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Telefone/WhatsApp *</FormLabel>
                  <FormControl>
                    <Input placeholder="(11) 99999-9999" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="personalInfo.cpf"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CPF (opcional)</FormLabel>
                  <FormControl>
                    <Input placeholder="000.000.000-00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Product Specific Fields */}
        {renderProductSpecificFields()}

        {/* Submit Button */}
        <div className="flex flex-col gap-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            size="lg"
            className="w-full"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Processando Cotação...
              </>
            ) : (
              <>
                <Calculator className="mr-2 h-5 w-5" />
                Solicitar Cotação
              </>
            )}
          </Button>
          
          <p className="text-sm text-muted-foreground text-center">
            Você receberá a cotação em até 1 hora via WhatsApp. 
            Suas informações são confidenciais e protegidas.
          </p>
        </div>
      </form>
    </Form>
  );
};
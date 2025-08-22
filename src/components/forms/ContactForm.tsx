import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useToast } from '@/hooks/use-toast';
import { Send, Loader2 } from 'lucide-react';
import { useTenant } from '@/providers/TenantProvider';
import type { ContactFormData } from '@/types/tenant';

const contactFormSchema = z.object({
  name: z.string().min(2, 'Nome deve ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  phone: z.string().min(10, 'Telefone deve ter pelo menos 10 dígitos'),
  interest: z.enum(['seguros', 'saude', 'consorcio', 'outros'], {
    required_error: 'Selecione um interesse',
  }),
  message: z.string().min(10, 'Mensagem deve ter pelo menos 10 caracteres'),
});

export const ContactForm: React.FC = () => {
  const { toast } = useToast();
  const { tenant } = useTenant();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      interest: 'seguros',
      message: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    if (!tenant) return;

    setIsSubmitting(true);
    try {
      // Simular envio
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Integração futura com API/Supabase aqui
      console.log('Contact form submitted:', data);

      // Abrir WhatsApp com dados preenchidos
      const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
      const message = encodeURIComponent(
        `Olá! Meu nome é ${data.name} e tenho interesse em ${data.interest}.\n\n` +
        `Detalhes:\n${data.message}\n\n` +
        `Contatos:\n- Email: ${data.email}\n- Telefone: ${data.phone}`
      );
      
      window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');

      toast({
        title: 'Mensagem enviada!',
        description: 'Você será redirecionado para o WhatsApp para finalizar o contato.',
      });

      form.reset();
    } catch (error) {
      toast({
        title: 'Erro ao enviar',
        description: 'Tente novamente ou entre em contato pelo WhatsApp.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const interestOptions = [
    { value: 'seguros', label: 'Seguros (Auto, Residencial, Vida)' },
    { value: 'saude', label: 'Planos de Saúde' },
    { value: 'consorcio', label: 'Consórcios' },
    { value: 'outros', label: 'Outros Serviços' },
  ];

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="name"
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
            name="email"
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
            name="phone"
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
            name="interest"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interesse principal *</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione um interesse" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {interestOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mensagem *</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Conte-nos mais sobre o que você procura..."
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="flex-1"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Enviando...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Enviar Mensagem
              </>
            )}
          </Button>
          
          <Button 
            type="button" 
            variant="outline"
            onClick={() => {
              if (tenant) {
                const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
                const message = encodeURIComponent('Olá! Gostaria de falar diretamente com um especialista.');
                window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
              }
            }}
          >
            WhatsApp Direto
          </Button>
        </div>

        <p className="text-sm text-muted-foreground text-center">
          Ao enviar, você será redirecionado para o WhatsApp para finalizar o atendimento. 
          Seus dados estão protegidos pela nossa política de privacidade.
        </p>
      </form>
    </Form>
  );
};
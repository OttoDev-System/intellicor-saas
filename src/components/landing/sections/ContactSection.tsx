import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ContactForm } from '@/components/forms/ContactForm';
import { QuoteForm } from '@/components/forms/QuoteForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useTenant } from '@/providers/TenantProvider';

export const ContactSection: React.FC = () => {
  const { tenant } = useTenant();

  if (!tenant) return null;

  const handleWhatsApp = () => {
    const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Vim do site da ${tenant.name} e gostaria de falar com um especialista.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  const handleCall = () => {
    window.location.href = `tel:${tenant.settings.contactInfo.phone}`;
  };

  const handleEmail = () => {
    window.location.href = `mailto:${tenant.settings.contactInfo.email}`;
  };

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Entre em Contato
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Estamos prontos para atendê-lo! Escolha a forma de contato que preferir 
            ou preencha o formulário para receber nossa proposta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            {/* Quick Contact Cards */}
            <Card className="bg-background border-border cursor-pointer hover:shadow-md transition-shadow" onClick={handleWhatsApp}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-[#25D366]/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#25D366]" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">WhatsApp</h3>
                    <p className="text-muted-foreground text-sm">{tenant.settings.contactInfo.phone}</p>
                    <p className="text-xs text-muted-foreground">Atendimento 24h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border cursor-pointer hover:shadow-md transition-shadow" onClick={handleCall}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">Telefone</h3>
                    <p className="text-muted-foreground text-sm">{tenant.settings.contactInfo.phone}</p>
                    <p className="text-xs text-muted-foreground">Seg a Sex: 8h às 18h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-background border-border cursor-pointer hover:shadow-md transition-shadow" onClick={handleEmail}>
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-1">E-mail</h3>
                    <p className="text-muted-foreground text-sm break-all">{tenant.settings.contactInfo.email}</p>
                    <p className="text-xs text-muted-foreground">Resposta em até 4h</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Address */}
            {tenant.settings.contactInfo.address && (
              <Card className="bg-background border-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">Endereço</h3>
                      <p className="text-muted-foreground text-sm">{tenant.settings.contactInfo.address}</p>
                      <p className="text-xs text-muted-foreground">Estacionamento próprio</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Business Hours */}
            <Card className="bg-background border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horário de Atendimento</h3>
                    <div className="space-y-1 text-sm text-muted-foreground">
                      <p>Segunda a Sexta: 8h às 18h</p>
                      <p>Sábado: 8h às 12h</p>
                      <p>Domingo: Fechado</p>
                      <p className="text-[#25D366] font-medium mt-2">WhatsApp: 24h</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Forms */}
          <div className="lg:col-span-2">
            <Card className="bg-background border-border">
              <CardHeader>
                <CardTitle className="text-2xl">Solicite uma Proposta</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="contact" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="contact">Contato Geral</TabsTrigger>
                    <TabsTrigger value="quote">Cotação Rápida</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="contact" className="mt-6">
                    <ContactForm />
                  </TabsContent>
                  
                  <TabsContent value="quote" className="mt-6">
                    <QuoteForm />
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-primary/5 rounded-lg p-8 max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para se proteger?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de especialistas está aguardando para criar a solução perfeita para você.
            </p>
            <Button size="lg" onClick={handleWhatsApp} className="bg-[#25D366] hover:bg-[#20BA5A]">
              <Send className="mr-2 h-5 w-5" />
              Começar Agora no WhatsApp
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
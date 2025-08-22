import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { useTenant } from '@/providers/TenantProvider';

export const FAQSection: React.FC = () => {
  const { tenant } = useTenant();

  if (!tenant || tenant.content.faqs.length === 0) return null;

  const handleContactClick = () => {
    const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Tenho uma dúvida que não encontrei nas perguntas frequentes.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Perguntas Frequentes
            </h2>
            <p className="text-xl text-muted-foreground">
              Esclarecemos as principais dúvidas sobre nossos serviços. 
              Não encontrou o que procura? Entre em contato!
            </p>
          </div>

          {/* FAQ Accordion */}
          <Accordion type="single" collapsible className="mb-12">
            {tenant.content.faqs.map((faq, index) => (
              <AccordionItem key={faq.id} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-medium hover:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-base leading-relaxed pt-2">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {/* Contact CTA */}
          <div className="text-center bg-muted/50 rounded-lg p-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
              <MessageCircle className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Ainda tem dúvidas?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
              Nossa equipe de especialistas está pronta para esclarecer todas as suas questões 
              e ajudar você a encontrar a melhor solução.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" onClick={handleContactClick}>
                <MessageCircle className="mr-2 h-5 w-5" />
                Falar com Especialista
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Formulário de Contato
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
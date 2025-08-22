import React from 'react';
import { Car, Home, Heart, Shield, Target, Building, Truck, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useTenant } from '@/providers/TenantProvider';

const iconMap = {
  Car,
  Home,
  Heart,
  Shield,
  Target,
  Building,
  Truck,
  Users,
};

export const ServicesSection: React.FC = () => {
  const { tenant } = useTenant();

  if (!tenant) return null;

  const handleServiceClick = (service: any) => {
    const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Tenho interesse em ${service.title}. Gostaria de mais informações.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Nossos Serviços
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Oferecemos soluções completas em seguros, planos de saúde e consórcios 
            com o melhor atendimento do mercado.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tenant.content.services.map((service) => {
            const IconComponent = iconMap[service.icon as keyof typeof iconMap] || Shield;
            
            return (
              <Card 
                key={service.id} 
                className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-border hover:border-primary/20"
                onClick={() => handleServiceClick(service)}
              >
                <CardHeader className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4 mx-auto group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-xl mb-2 group-hover:text-primary transition-colors">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-center text-base leading-relaxed">
                    {service.description}
                  </CardDescription>
                  <div className="mt-6 text-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all"
                    >
                      Saiba Mais
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted/50 rounded-lg p-8">
          <h3 className="text-2xl font-bold text-foreground mb-4">
            Não encontrou o que procura?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Temos uma ampla gama de produtos e serviços. Entre em contato conosco 
            e nossa equipe especializada encontrará a solução ideal para você.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Falar com Especialista
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => {
                const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
                const message = encodeURIComponent(`Olá! Gostaria de conhecer todos os serviços disponíveis.`);
                window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
              }}
            >
              WhatsApp Direto
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
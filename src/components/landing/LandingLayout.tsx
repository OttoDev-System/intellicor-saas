import React from 'react';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import { useTenant } from '@/providers/TenantProvider';
import { useTenantTheme } from '@/hooks/useTenantTheme';
import { Button } from '@/components/ui/button';
import { ChatWidget } from '@/components/chatbot/ChatWidget';

interface LandingLayoutProps {
  children: React.ReactNode;
}

export const LandingLayout: React.FC<LandingLayoutProps> = ({ children }) => {
  const { tenant } = useTenant();
  useTenantTheme();

  if (!tenant) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const handleWhatsApp = () => {
    const phone = tenant.settings.contactInfo.phone.replace(/\D/g, '');
    const message = encodeURIComponent(`Olá! Vim do site da ${tenant.name} e gostaria de mais informações.`);
    window.open(`https://wa.me/55${phone}?text=${message}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-3">
              {tenant.logo ? (
                <img 
                  src={tenant.logo} 
                  alt={tenant.name}
                  className="h-10 w-auto"
                />
              ) : (
                <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold text-lg">
                    {tenant.name.charAt(0)}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-xl font-bold text-foreground">{tenant.name}</h1>
                {tenant.description && (
                  <p className="text-sm text-muted-foreground">{tenant.description}</p>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="hidden md:flex"
              >
                <Mail className="h-4 w-4 mr-2" />
                Contato
              </Button>
              <Button 
                size="sm"
                onClick={handleWhatsApp}
                className="bg-[#25D366] hover:bg-[#20BA5A] text-white"
              >
                <Phone className="h-4 w-4 mr-2" />
                WhatsApp
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-muted/50 border-t border-border mt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                {tenant.logo ? (
                  <img 
                    src={tenant.logo} 
                    alt={tenant.name}
                    className="h-8 w-auto"
                  />
                ) : (
                  <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                    <span className="text-primary-foreground font-bold">
                      {tenant.name.charAt(0)}
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-semibold">{tenant.name}</h3>
              </div>
              {tenant.description && (
                <p className="text-muted-foreground mb-4">{tenant.description}</p>
              )}
              
              {/* Social Media */}
              {tenant.settings.socialMedia && (
                <div className="flex gap-3">
                  {tenant.settings.socialMedia.facebook && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={tenant.settings.socialMedia.facebook} target="_blank" rel="noopener noreferrer">
                        <Facebook className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {tenant.settings.socialMedia.instagram && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={tenant.settings.socialMedia.instagram} target="_blank" rel="noopener noreferrer">
                        <Instagram className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  {tenant.settings.socialMedia.linkedin && (
                    <Button variant="ghost" size="sm" asChild>
                      <a href={tenant.settings.socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                  )}
                </div>
              )}
            </div>

            {/* Services */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Nossos Serviços</h3>
              <div className="space-y-2">
                <p className="text-muted-foreground">• Seguros Auto e Residencial</p>
                <p className="text-muted-foreground">• Seguro de Vida</p>
                <p className="text-muted-foreground">• Planos de Saúde</p>
                <p className="text-muted-foreground">• Consórcios</p>
                <p className="text-muted-foreground">• Seguros Empresariais</p>
              </div>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contato</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{tenant.settings.contactInfo.phone}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-primary" />
                  <span className="text-muted-foreground">{tenant.settings.contactInfo.email}</span>
                </div>
                {tenant.settings.contactInfo.address && (
                  <div className="flex items-start gap-3">
                    <MapPin className="h-4 w-4 text-primary mt-0.5" />
                    <span className="text-muted-foreground">{tenant.settings.contactInfo.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-border mt-8 pt-8 text-center">
            <p className="text-muted-foreground">
              © 2024 {tenant.name}. Todos os direitos reservados. Powered by INTELLICOR.
            </p>
          </div>
        </div>
      </footer>

      {/* Chatbot */}
      {tenant.settings.chatbotEnabled && <ChatWidget />}
    </div>
  );
};
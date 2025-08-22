import { Tenant } from '@/types/tenant';

export const mockTenants: Tenant[] = [
  {
    id: '1',
    subdomain: 'demo',
    name: 'Corretora Demo',
    description: 'Soluções em seguros há mais de 20 anos',
    logo: '/logos/demo-logo.png',
    theme: {
      primaryColor: '#0D214F',
      secondaryColor: '#5A7A9E',
      accentColor: '#007BFF',
    },
    settings: {
      chatbotEnabled: true,
      contactInfo: {
        phone: '(11) 99999-9999',
        email: 'contato@corretorademo.com.br',
        address: 'Rua das Flores, 123 - São Paulo, SP',
      },
      socialMedia: {
        facebook: 'https://facebook.com/corretorademo',
        instagram: 'https://instagram.com/corretorademo',
        linkedin: 'https://linkedin.com/company/corretorademo',
      },
    },
    content: {
      heroTitle: 'Protegemos o que mais importa para você',
      heroSubtitle: 'Soluções completas em seguros, planos de saúde e consórcios com atendimento personalizado e tecnologia de ponta.',
      services: [
        {
          id: '1',
          title: 'Seguro Auto',
          description: 'Proteção completa para seu veículo com as melhores seguradoras do mercado.',
          icon: 'Car',
          category: 'seguros',
        },
        {
          id: '2',
          title: 'Seguro Residencial',
          description: 'Sua casa protegida contra incêndio, roubo e desastres naturais.',
          icon: 'Home',
          category: 'seguros',
        },
        {
          id: '3',
          title: 'Seguro de Vida',
          description: 'Tranquilidade e proteção financeira para você e sua família.',
          icon: 'Heart',
          category: 'seguros',
        },
        {
          id: '4',
          title: 'Planos de Saúde',
          description: 'Cuidado médico de qualidade com a maior rede credenciada.',
          icon: 'Shield',
          category: 'saude',
        },
        {
          id: '5',
          title: 'Consórcios',
          description: 'Realize seus sonhos com consórcios de imóveis e veículos.',
          icon: 'Target',
          category: 'consorcio',
        },
      ],
      testimonials: [
        {
          id: '1',
          name: 'Maria Silva',
          role: 'Empresária',
          content: 'Excelente atendimento! Me ajudaram a escolher o melhor plano de saúde para minha família.',
          rating: 5,
        },
        {
          id: '2',
          name: 'João Santos',
          role: 'Engenheiro',
          content: 'Processo de cotação muito rápido e transparente. Recomendo!',
          rating: 5,
        },
        {
          id: '3',
          name: 'Ana Costa',
          role: 'Professora',
          content: 'Profissionais competentes e preços justos. Muito satisfeita!',
          rating: 5,
        },
      ],
      faqs: [
        {
          id: '1',
          question: 'Como faço para solicitar uma cotação?',
          answer: 'Você pode solicitar uma cotação através do nosso formulário online, pelo WhatsApp ou telefone. Nossa equipe entrará em contato em até 1 hora.',
          category: 'geral',
        },
        {
          id: '2',
          question: 'Vocês trabalham com quais seguradoras?',
          answer: 'Trabalhamos com as principais seguradoras do mercado: Bradesco, Porto Seguro, Azul, SulAmérica, Allianz e muitas outras.',
          category: 'seguros',
        },
        {
          id: '3',
          question: 'Qual a diferença entre os planos de saúde?',
          answer: 'Os planos variam em cobertura, rede credenciada e preço. Nossa equipe especializada te ajuda a escolher o melhor para seu perfil.',
          category: 'saude',
        },
      ],
    },
  },
  {
    id: '2',
    subdomain: 'seguros-sp',
    name: 'Seguros São Paulo',
    description: 'Especialistas em seguros empresariais',
    theme: {
      primaryColor: '#1B4332',
      secondaryColor: '#52B788',
      accentColor: '#95D5B2',
    },
    settings: {
      chatbotEnabled: true,
      contactInfo: {
        phone: '(11) 88888-8888',
        email: 'contato@segurossp.com.br',
        address: 'Av. Paulista, 456 - São Paulo, SP',
      },
    },
    content: {
      heroTitle: 'Seguros Empresariais Especializados',
      heroSubtitle: 'Protegemos seu negócio com soluções personalizadas e atendimento especializado em seguros corporativos.',
      services: [
        {
          id: '1',
          title: 'Seguro Empresarial',
          description: 'Proteção completa para seu negócio e patrimônio empresarial.',
          icon: 'Building',
          category: 'seguros',
        },
        {
          id: '2',
          title: 'Seguro de Frota',
          description: 'Gestão e proteção para frotas de veículos comerciais.',
          icon: 'Truck',
          category: 'seguros',
        },
      ],
      testimonials: [
        {
          id: '1',
          name: 'Pedro Oliveira',
          role: 'CEO',
          content: 'Excelente parceria para proteção da nossa empresa.',
          rating: 5,
        },
      ],
      faqs: [
        {
          id: '1',
          question: 'Atendem empresas de que porte?',
          answer: 'Atendemos desde MEI até grandes corporações, com soluções personalizadas.',
          category: 'empresarial',
        },
      ],
    },
  },
  {
    id: '3',
    subdomain: 'vida-segura',
    name: 'Vida Segura Corretora',
    description: 'Cuidando da sua família há 15 anos',
    theme: {
      primaryColor: '#7209B7',
      secondaryColor: '#A663CC',
      accentColor: '#B892D4',
    },
    settings: {
      chatbotEnabled: true,
      contactInfo: {
        phone: '(11) 77777-7777',
        email: 'contato@vidasegura.com.br',
        address: 'Rua da Consolação, 789 - São Paulo, SP',
      },
    },
    content: {
      heroTitle: 'Sua família sempre protegida',
      heroSubtitle: 'Especializados em seguros de vida e planos de saúde familiares com foco no bem-estar da sua família.',
      services: [
        {
          id: '1',
          title: 'Seguro de Vida Familiar',
          description: 'Proteção financeira completa para toda a família.',
          icon: 'Users',
          category: 'seguros',
        },
        {
          id: '2',
          title: 'Plano de Saúde Familiar',
          description: 'Cuidados médicos de qualidade para todos da família.',
          icon: 'Heart',
          category: 'saude',
        },
      ],
      testimonials: [
        {
          id: '1',
          name: 'Carla Mendes',
          role: 'Mãe de família',
          content: 'Atendimento humanizado e sempre pensando no melhor para a família.',
          rating: 5,
        },
      ],
      faqs: [
        {
          id: '1',
          question: 'Como funciona o seguro de vida familiar?',
          answer: 'Cobrimos todos os membros da família com um único contrato, oferecendo economia e praticidade.',
          category: 'vida',
        },
      ],
    },
  },
];

export const getTenantBySubdomain = (subdomain: string): Tenant | null => {
  return mockTenants.find(tenant => tenant.subdomain === subdomain) || null;
};

export const getDefaultTenant = (): Tenant => {
  return mockTenants[0]; // Corretora Demo como padrão
};
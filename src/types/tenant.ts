export interface Tenant {
  id: string;
  subdomain: string;
  name: string;
  description?: string;
  logo?: string;
  theme: {
    primaryColor: string;
    secondaryColor: string;
    accentColor?: string;
  };
  settings: {
    chatbotEnabled: boolean;
    contactInfo: {
      phone: string;
      email: string;
      address?: string;
    };
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      linkedin?: string;
    };
  };
  content: {
    heroTitle: string;
    heroSubtitle: string;
    heroImage?: string;
    services: ServiceCard[];
    testimonials: Testimonial[];
    faqs: FAQ[];
  };
}

export interface ServiceCard {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'seguros' | 'saude' | 'consorcio';
}

export interface Testimonial {
  id: string;
  name: string;
  role?: string;
  content: string;
  avatar?: string;
  rating: number;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  type: 'text' | 'quick_reply';
  quickReplies?: string[];
}

export interface QuoteFormData {
  type: 'auto' | 'residencial' | 'vida' | 'saude' | 'consorcio';
  personalInfo: {
    name: string;
    email: string;
    phone: string;
    cpf?: string;
  };
  details: Record<string, any>;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  interest: 'seguros' | 'saude' | 'consorcio' | 'outros';
  message: string;
}
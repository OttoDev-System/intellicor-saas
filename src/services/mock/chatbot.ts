import { ChatMessage } from '@/types/tenant';

export interface ChatbotResponse {
  content: string;
  quickReplies?: string[];
}

const responses: Record<string, ChatbotResponse> = {
  // Saudações
  'ola': {
    content: 'Olá! 👋 Sou o assistente virtual da corretora. Como posso te ajudar hoje?',
    quickReplies: ['Quero fazer uma cotação', 'Planos de saúde', 'Seguro auto', 'Falar com corretor'],
  },
  'oi': {
    content: 'Oi! 😊 Estou aqui para te ajudar com seguros, planos de saúde e consórcios. O que você gostaria de saber?',
    quickReplies: ['Cotação de seguro', 'Planos disponíveis', 'Preços', 'Atendimento'],
  },

  // Seguros
  'seguro auto': {
    content: 'Ótima escolha! 🚗 Para o seguro auto, trabalhamos com as melhores seguradoras. Preciso de algumas informações: qual o modelo do seu carro e ano?',
    quickReplies: ['Carro popular', 'Carro de luxo', 'SUV/Picape', 'Falar com corretor'],
  },
  'seguro residencial': {
    content: '🏠 O seguro residencial protege sua casa contra incêndio, roubo, danos elétricos e muito mais. Que tipo de imóvel você tem?',
    quickReplies: ['Apartamento', 'Casa', 'Casa de condomínio', 'Solicitar cotação'],
  },
  'seguro vida': {
    content: '❤️ O seguro de vida garante proteção financeira para sua família. Temos planos individuais e familiares. Gostaria de saber mais sobre qual?',
    quickReplies: ['Plano individual', 'Plano familiar', 'Valores', 'Cobertura'],
  },

  // Planos de Saúde
  'planos de saude': {
    content: '🏥 Temos excelentes planos de saúde com ampla rede credenciada. Você procura para quantas pessoas?',
    quickReplies: ['Individual', 'Casal', 'Família', 'Empresarial'],
  },
  'plano individual': {
    content: 'Perfeito! Para plano individual, temos opções de R$ 180 a R$ 450/mês. Qual sua faixa etária?',
    quickReplies: ['18-30 anos', '31-45 anos', '46-60 anos', 'Mais de 60'],
  },

  // Consórcios
  'consorcio': {
    content: '🎯 Consórcios são uma excelente forma de realizar sonhos! Você tem interesse em consórcio de imóvel ou veículo?',
    quickReplies: ['Consórcio imóvel', 'Consórcio veículo', 'Como funciona', 'Simulação'],
  },

  // Cotações
  'cotacao': {
    content: '📋 Vou te ajudar com a cotação! Qual tipo de produto você gostaria de cotar?',
    quickReplies: ['Seguro auto', 'Seguro residencial', 'Plano de saúde', 'Consórcio'],
  },
  'quero fazer cotacao': {
    content: '📋 Perfeito! Para fazer sua cotação, preciso saber: que tipo de seguro ou produto você procura?',
    quickReplies: ['Seguro auto', 'Seguro casa', 'Plano saúde', 'Seguro vida'],
  },

  // Atendimento
  'falar com corretor': {
    content: '👨‍💼 Claro! Vou te conectar com um de nossos corretores especializados. Você pode entrar em contato pelo WhatsApp: (11) 99999-9999 ou preencher o formulário de contato.',
    quickReplies: ['Abrir WhatsApp', 'Formulário contato', 'Ligar agora', 'Voltar ao menu'],
  },
  'telefone': {
    content: '📞 Nosso telefone para contato é (11) 99999-9999. Atendemos de segunda a sexta, das 8h às 18h, e sábados das 8h às 12h.',
    quickReplies: ['WhatsApp', 'Email', 'Endereço', 'Horários'],
  },

  // Informações gerais
  'horarios': {
    content: '🕐 Nossos horários de atendimento:\n• Segunda a Sexta: 8h às 18h\n• Sábado: 8h às 12h\n• Domingo: Fechado\n\nPelo WhatsApp atendemos 24h!',
    quickReplies: ['WhatsApp 24h', 'Agendar reunião', 'Emergência', 'Voltar'],
  },
  'endereco': {
    content: '📍 Estamos localizados na Rua das Flores, 123 - São Paulo, SP. Temos estacionamento próprio e fácil acesso por transporte público.',
    quickReplies: ['Ver no mapa', 'Como chegar', 'Estacionamento', 'Agendar visita'],
  },

  // Fallback
  'default': {
    content: 'Desculpe, não entendi sua pergunta. 🤔 Mas posso te ajudar com seguros, planos de saúde e consórcios. O que você gostaria de saber?',
    quickReplies: ['Seguros', 'Planos de saúde', 'Consórcios', 'Falar com corretor'],
  },
};

export const getChatbotResponse = async (message: string, tenantId: string): Promise<ChatbotResponse> => {
  // Simula delay da API
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

  const normalizedMessage = message.toLowerCase().trim();
  
  // Busca por palavras-chave
  for (const [key, response] of Object.entries(responses)) {
    if (normalizedMessage.includes(key) || normalizedMessage === key) {
      return response;
    }
  }

  // Resposta padrão
  return responses.default;
};

export const getWelcomeMessage = (tenantName: string): ChatMessage => {
  return {
    id: 'welcome',
    content: `Olá! 👋 Bem-vindo à ${tenantName}! Sou seu assistente virtual e estou aqui para te ajudar com seguros, planos de saúde e consórcios. Como posso te ajudar?`,
    sender: 'bot',
    timestamp: new Date(),
    type: 'quick_reply',
    quickReplies: ['Fazer cotação', 'Planos de saúde', 'Seguros', 'Falar com corretor'],
  };
};
import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, Send, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useTenant } from '@/providers/TenantProvider';
import { getChatbotResponse, getWelcomeMessage } from '@/services/mock/chatbot';
import type { ChatMessage } from '@/types/tenant';

export const ChatWidget: React.FC = () => {
  const { tenant } = useTenant();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0 && tenant) {
      const welcomeMsg = getWelcomeMessage(tenant.name);
      setMessages([welcomeMsg]);
    }
  }, [isOpen, tenant]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || !tenant) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date(),
      type: 'text',
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const response = await getChatbotResponse(content, tenant.id);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.content,
        sender: 'bot',
        timestamp: new Date(),
        type: response.quickReplies ? 'quick_reply' : 'text',
        quickReplies: response.quickReplies,
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Chatbot error:', error);
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  if (!tenant?.settings.chatbotEnabled) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Chat Button */}
      {!isOpen && (
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 shadow-lg hover:shadow-xl transition-all"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="w-80 h-96 shadow-xl border-border">
          <CardHeader className="bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm">
                Assistente {tenant.name}
              </CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          
          <CardContent className="p-0 flex flex-col h-full">
            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div key={message.id}>
                    <div
                      className={`flex ${
                        message.sender === 'user' ? 'justify-end' : 'justify-start'
                      }`}
                    >
                      <div
                        className={`max-w-[80%] p-3 rounded-lg ${
                          message.sender === 'user'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                    </div>
                    
                    {/* Quick Replies */}
                    {message.quickReplies && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {message.quickReplies.map((reply, index) => (
                          <Button
                            key={index}
                            variant="outline"
                            size="sm"
                            onClick={() => handleQuickReply(reply)}
                            className="text-xs"
                          >
                            {reply}
                          </Button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted text-foreground p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-3 w-3 animate-spin" />
                        <span className="text-sm">Digitando...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-border">
              <div className="flex gap-2">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  placeholder="Digite sua mensagem..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleSendMessage(inputMessage);
                    }
                  }}
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSendMessage(inputMessage)}
                  disabled={!inputMessage.trim()}
                  size="sm"
                  className="px-3"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
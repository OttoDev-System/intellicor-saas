import React from 'react';
import { Star, Quote } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useTenant } from '@/providers/TenantProvider';

export const TestimonialsSection: React.FC = () => {
  const { tenant } = useTenant();

  if (!tenant || tenant.content.testimonials.length === 0) return null;

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ));
  };

  const getInitials = (name: string) => {
    return name.split(' ').map(word => word[0]).join('').toUpperCase().slice(0, 2);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            O que nossos clientes dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A satisfação dos nossos clientes é nossa maior conquista. 
            Veja alguns depoimentos de quem confia na {tenant.name}.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tenant.content.testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="relative bg-background border-border">
              {/* Quote Icon */}
              <div className="absolute -top-4 left-6">
                <div className="bg-primary rounded-full p-2">
                  <Quote className="h-4 w-4 text-primary-foreground" />
                </div>
              </div>

              <CardContent className="pt-8">
                {/* Rating */}
                <div className="flex items-center gap-1 mb-4">
                  {renderStars(testimonial.rating)}
                </div>

                {/* Content */}
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {getInitials(testimonial.name)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    {testimonial.role && (
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-lg text-muted-foreground mb-4">
            Seja o próximo cliente satisfeito!
          </p>
          <div className="flex items-center justify-center gap-1 text-yellow-400">
            {renderStars(5)}
            <span className="ml-2 text-foreground font-semibold">4.9/5 de satisfação</span>
          </div>
        </div>
      </div>
    </section>
  );
};
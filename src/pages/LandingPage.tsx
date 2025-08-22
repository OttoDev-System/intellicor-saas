import React from 'react';
import { LandingLayout } from '@/components/landing/LandingLayout';
import { HeroSection } from '@/components/landing/sections/HeroSection';
import { ServicesSection } from '@/components/landing/sections/ServicesSection';
import { TestimonialsSection } from '@/components/landing/sections/TestimonialsSection';
import { FAQSection } from '@/components/landing/sections/FAQSection';
import { ContactSection } from '@/components/landing/sections/ContactSection';

export const LandingPage: React.FC = () => {
  return (
    <LandingLayout>
      <HeroSection />
      <ServicesSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
    </LandingLayout>
  );
};
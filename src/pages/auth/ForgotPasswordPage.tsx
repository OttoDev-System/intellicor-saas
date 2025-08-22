import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { ForgotPasswordForm } from '@/components/auth/ForgotPasswordForm';

export const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout
      title="Recuperar senha"
      subtitle="Digite seu email para receber instruções"
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};
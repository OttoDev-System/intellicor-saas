import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { LoginForm } from '@/components/auth/LoginForm';

export const LoginPage: React.FC = () => {
  return (
    <AuthLayout
      title="Bem-vindo de volta"
      subtitle="Faça login para acessar sua conta"
    >
      <LoginForm />
    </AuthLayout>
  );
};
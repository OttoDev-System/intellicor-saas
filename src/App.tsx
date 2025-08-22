import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { AuthProvider, useAuth } from "@/providers/AuthProvider";
import { DashboardLayout } from "@/components/layouts/DashboardLayout";
import { LoadingScreen } from "@/components/ui/loading-screen";
import AdminDashboard from "@/pages/dashboards/AdminDashboard";
import BrokerDashboard from "@/pages/dashboards/BrokerDashboard";
import SupportDashboard from "@/pages/dashboards/SupportDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes (formerly cacheTime)
    },
  },
});

// Protected route wrapper
const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isLoading, isAuthenticated } = useAuth();

  if (isLoading) {
    return <LoadingScreen message="Carregando INTELLICOR..." />;
  }

  if (!isAuthenticated) {
    return <LoadingScreen message="Redirecionando para login..." />;
  }

  return <>{children}</>;
};

// Dashboard route wrapper
const DashboardRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, organization } = useAuth();

  if (!user || !organization) {
    return <LoadingScreen message="Carregando dados do usuário..." />;
  }

  return (
    <DashboardLayout
      userRole={user.role}
      userName={user.fullName}
      organizationName={organization.name}
    >
      {children}
    </DashboardLayout>
  );
};

// Main App Routes
const AppRoutes: React.FC = () => {
  const { user } = useAuth();

  return (
    <Routes>
      {/* Default redirect based on user role */}
      <Route 
        path="/" 
        element={
          <Navigate 
            to={user ? `/${user.role}` : '/admin'} 
            replace 
          />
        } 
      />

      {/* Admin Routes */}
      <Route 
        path="/admin/*" 
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="users" element={<div className="p-6">Gestão de Usuários (em breve)</div>} />
                <Route path="organization" element={<div className="p-6">Configurações da Organização (em breve)</div>} />
                <Route path="security" element={<div className="p-6">Configurações de Segurança (em breve)</div>} />
                <Route path="reports" element={<div className="p-6">Relatórios Avançados (em breve)</div>} />
                <Route path="analytics" element={<div className="p-6">Analytics Detalhados (em breve)</div>} />
                <Route path="settings" element={<div className="p-6">Configurações do Sistema (em breve)</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardRoute>
          </ProtectedRoute>
        } 
      />

      {/* Broker Routes */}
      <Route 
        path="/broker/*" 
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Routes>
                <Route index element={<BrokerDashboard />} />
                <Route path="clients" element={<div className="p-6">Gestão de Clientes (em breve)</div>} />
                <Route path="quotes" element={<div className="p-6">Sistema de Cotações (em breve)</div>} />
                <Route path="policies" element={<div className="p-6">Gestão de Apólices (em breve)</div>} />
                <Route path="commissions" element={<div className="p-6">Controle de Comissões (em breve)</div>} />
                <Route path="performance" element={<div className="p-6">Análise de Performance (em breve)</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardRoute>
          </ProtectedRoute>
        } 
      />

      {/* Support Routes */}
      <Route 
        path="/support/*" 
        element={
          <ProtectedRoute>
            <DashboardRoute>
              <Routes>
                <Route index element={<SupportDashboard />} />
                <Route path="leads" element={<div className="p-6">Gestão de Leads (em breve)</div>} />
                <Route path="tickets" element={<div className="p-6">Sistema de Tickets (em breve)</div>} />
                <Route path="clients" element={<div className="p-6">Atendimento ao Cliente (em breve)</div>} />
                <Route path="knowledge" element={<div className="p-6">Base de Conhecimento (em breve)</div>} />
                <Route path="notifications" element={<div className="p-6">Central de Notificações (em breve)</div>} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </DashboardRoute>
          </ProtectedRoute>
        } 
      />

      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;

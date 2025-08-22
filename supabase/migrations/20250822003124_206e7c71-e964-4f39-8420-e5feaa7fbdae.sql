-- Create organizations table
CREATE TABLE public.organizations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  subdomain TEXT UNIQUE NOT NULL,
  logo_url TEXT,
  theme JSONB DEFAULT '{
    "primaryColor": "#0D214F",
    "secondaryColor": "#5A7A9E",
    "accentColor": "#00A86B"
  }'::jsonb,
  settings JSONB DEFAULT '{
    "allowRegistration": true,
    "requireEmailVerification": true,
    "sessionTimeout": 86400,
    "chatbotEnabled": true,
    "contactInfo": {
      "phone": "",
      "email": "",
      "address": ""
    },
    "socialMedia": {
      "facebook": "",
      "instagram": "",
      "linkedin": ""
    }
  }'::jsonb,
  subscription_status TEXT DEFAULT 'trial' CHECK (subscription_status IN ('trial', 'active', 'suspended', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create profiles table
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_id UUID REFERENCES public.organizations(id) ON DELETE CASCADE NOT NULL,
  email TEXT NOT NULL,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'corretor', 'suporte')),
  avatar_url TEXT,
  phone TEXT,
  is_active BOOLEAN DEFAULT true,
  last_login TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(email, organization_id)
);

-- Enable RLS
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create function to get user's organization
CREATE OR REPLACE FUNCTION public.get_user_organization_id()
RETURNS UUID
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    org_id UUID;
BEGIN
    SELECT organization_id INTO org_id
    FROM profiles
    WHERE id = auth.uid();
    
    RETURN org_id;
END;
$$;

-- Create function to check if user is admin
CREATE OR REPLACE FUNCTION public.is_organization_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_role TEXT;
BEGIN
    SELECT role INTO user_role
    FROM profiles
    WHERE id = auth.uid();
    
    RETURN user_role = 'admin';
END;
$$;

-- RLS Policies for organizations
CREATE POLICY "Users can view their organization" ON public.organizations
  FOR SELECT 
  USING (id = public.get_user_organization_id());

CREATE POLICY "Admins can update their organization" ON public.organizations
  FOR UPDATE 
  USING (id = public.get_user_organization_id() AND public.is_organization_admin());

-- RLS Policies for profiles
CREATE POLICY "Users can view profiles in their organization" ON public.profiles
  FOR SELECT 
  USING (organization_id = public.get_user_organization_id());

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE 
  USING (id = auth.uid());

CREATE POLICY "Admins can update profiles in their organization" ON public.profiles
  FOR UPDATE 
  USING (organization_id = public.get_user_organization_id() AND public.is_organization_admin());

CREATE POLICY "Admins can insert profiles in their organization" ON public.profiles
  FOR INSERT 
  WITH CHECK (organization_id = public.get_user_organization_id() AND public.is_organization_admin());

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_organizations_updated_at
    BEFORE UPDATE ON public.organizations
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_profiles_updated_at
    BEFORE UPDATE ON public.profiles
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

-- Insert demo organizations
INSERT INTO public.organizations (name, subdomain, settings) VALUES
('Corretora Demo INTELLICOR', 'demo', '{
  "allowRegistration": true,
  "requireEmailVerification": false,
  "sessionTimeout": 86400,
  "chatbotEnabled": true,
  "contactInfo": {
    "phone": "(11) 9999-9999",
    "email": "contato@demo.intellicor.com.br",
    "address": "Av. Paulista, 1000 - São Paulo, SP"
  },
  "socialMedia": {
    "facebook": "https://facebook.com/demo",
    "instagram": "https://instagram.com/demo",
    "linkedin": "https://linkedin.com/company/demo"
  }
}'::jsonb),
('Seguros São Paulo', 'seguros-sp', '{
  "allowRegistration": true,
  "requireEmailVerification": false,
  "sessionTimeout": 86400,
  "chatbotEnabled": true,
  "contactInfo": {
    "phone": "(11) 8888-8888",
    "email": "contato@seguros-sp.com.br",
    "address": "Rua Augusta, 500 - São Paulo, SP"
  }
}'::jsonb),
('Vida Segura Corretora', 'vida-segura', '{
  "allowRegistration": true,
  "requireEmailVerification": false,
  "sessionTimeout": 86400,
  "chatbotEnabled": true,
  "contactInfo": {
    "phone": "(11) 7777-7777",
    "email": "contato@vidasegura.com.br",
    "address": "Av. Faria Lima, 2000 - São Paulo, SP"
  }
}'::jsonb);

-- Create function to handle new user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    org_id UUID;
BEGIN
    -- Get organization by email domain or default to demo
    SELECT id INTO org_id FROM organizations WHERE subdomain = 'demo' LIMIT 1;
    
    -- Insert profile
    INSERT INTO public.profiles (
        id,
        organization_id,
        email,
        full_name,
        role
    ) VALUES (
        NEW.id,
        org_id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'Usuário'),
        'corretor'
    );
    
    RETURN NEW;
END;
$$;

-- Create trigger for new user registration
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
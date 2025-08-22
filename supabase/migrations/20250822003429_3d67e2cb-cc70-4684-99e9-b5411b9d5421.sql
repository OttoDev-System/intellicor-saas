-- Update handle_new_user to honor organization_subdomain in user metadata
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
    org_id UUID;
    meta_subdomain TEXT;
    user_role TEXT;
BEGIN
    meta_subdomain := COALESCE(NEW.raw_user_meta_data->>'organization_subdomain', 'demo');
    user_role := COALESCE(NEW.raw_user_meta_data->>'role', 'corretor');

    SELECT id INTO org_id FROM organizations WHERE subdomain = meta_subdomain LIMIT 1;
    IF org_id IS NULL THEN
        SELECT id INTO org_id FROM organizations WHERE subdomain = 'demo' LIMIT 1;
    END IF;

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
        user_role
    );

    RETURN NEW;
END;
$$;
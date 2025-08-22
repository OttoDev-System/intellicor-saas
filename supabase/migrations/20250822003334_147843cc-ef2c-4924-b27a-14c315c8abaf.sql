-- Set search_path for existing helper functions and allow public org listing for registration
CREATE OR REPLACE FUNCTION public.set_organization_context(org_id uuid)
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
    PERFORM set_config('app.current_organization_id', org_id::text, true);
END;
$function$;

CREATE OR REPLACE FUNCTION public.clear_organization_context()
 RETURNS void
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path = public
AS $function$
BEGIN
    PERFORM set_config('app.current_organization_id', '', true);
END;
$function$;

-- Allow anonymous to view organizations that allow registration
CREATE POLICY "Public can view registrable organizations"
ON public.organizations
FOR SELECT
USING (COALESCE((settings->>'allowRegistration')::boolean, false) = true);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_organizations_subdomain ON public.organizations(subdomain);
CREATE INDEX IF NOT EXISTS idx_profiles_org ON public.profiles(organization_id);

import { useAuth } from '@/providers/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useOrganization = () => {
  const { organization, user } = useAuth();
  const queryClient = useQueryClient();

  const updateOrganization = useMutation({
    mutationFn: async (updates: any) => {
      if (!organization) throw new Error('No organization found');

      const { data, error } = await supabase
        .from('organizations')
        .update(updates)
        .eq('id', organization.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Invalidate queries that depend on organization data
      queryClient.invalidateQueries({ queryKey: ['organization'] });
    },
  });

  const updateTheme = useMutation({
    mutationFn: async (theme: any) => {
      if (!organization) throw new Error('No organization found');

      const { data, error } = await supabase
        .from('organizations')
        .update({ theme })
        .eq('id', organization.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization'] });
    },
  });

  const updateSettings = useMutation({
    mutationFn: async (settings: any) => {
      if (!organization) throw new Error('No organization found');

      const { data, error } = await supabase
        .from('organizations')
        .update({ settings })
        .eq('id', organization.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['organization'] });
    },
  });

  const isAdmin = user?.role === 'admin';

  return {
    organization,
    updateOrganization: updateOrganization.mutate,
    updateTheme: updateTheme.mutate,
    updateSettings: updateSettings.mutate,
    isUpdating: updateOrganization.isPending || updateTheme.isPending || updateSettings.isPending,
    isAdmin,
  };
};
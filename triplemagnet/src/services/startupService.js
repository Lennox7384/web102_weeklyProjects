import { supabase } from '../supabaseClient';

// Create a new startup
export const createStartup = async (startupData) => {
  const user = await supabase.auth.getUser();
  console.log('Authenticated user:', user);
  const userId = user.data.user?.id;
  if (!userId) throw new Error('No authenticated user found');

  console.log('Startup data to insert:', { ...startupData, user_id: userId });

  const { data, error } = await supabase
    .from('startups')
    .insert({ ...startupData, user_id: userId })
    .select()
    .single();

  if (error) throw new Error(error.message || 'Failed to create startup');
  return data;
};

// Other functions (unchanged for this update, but included for completeness)
export const getAllStartups = async () => {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getUserStartups = async (userId) => {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  if (error) throw error;
  return data;
};

export const getStartupById = async (id) => {
  const { data, error } = await supabase
    .from('startups')
    .select('*')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
};

export const updateStartup = async (id, updates) => {
  const { data, error } = await supabase
    .from('startups')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const deleteStartup = async (id) => {
  const { error } = await supabase
    .from('startups')
    .delete()
    .eq('id', id);
  if (error) throw error;
};

export const applyToStartup = async (startupId, message) => {
  const { data, error } = await supabase
    .from('applications')
    .insert({
      startup_id: startupId,
      applicant_id: supabase.auth.getUser().id,
      message,
    })
    .select()
    .single();
  if (error) throw error;
  return data;
};

export const getApplicationsForStartup = async (startupId) => {
  const { data, error } = await supabase
    .from('applications')
    .select('*, applicant:applicant_id(email)')
    .eq('startup_id', startupId);
  if (error) throw error;
  return data;
};

export const updateApplicationStatus = async (applicationId, status) => {
  const { data, error } = await supabase
    .from('applications')
    .update({ status })
    .eq('id', applicationId)
    .select()
    .single();
  if (error) throw error;
  return data;
};
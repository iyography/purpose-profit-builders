import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface SprintSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  profile: string;
  profile_name: string;
  monthly_income: string;
  has_offer: boolean;
  offer_type: string;
  uses_ai: boolean;
  has_systems: boolean;
  faith_alignment: string;
  biggest_challenge: string;
  answers: Record<string, unknown>;
  user_agent?: string;
  created_at: string;
}

export const submitSprintResult = async (submission: Omit<SprintSubmission, 'id' | 'created_at'>) => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('ppb_sprint_submissions')
    .insert([submission]);

  if (error) throw error;
  return data;
};

export const getAllSprintSubmissions = async (): Promise<SprintSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('ppb_sprint_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getSprintSubmissionsByDateRange = async (startDate: string, endDate: string): Promise<SprintSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('ppb_sprint_submissions')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getSprintSubmissionsByProfile = async (profile: string): Promise<SprintSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('ppb_sprint_submissions')
    .select('*')
    .eq('profile', profile)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

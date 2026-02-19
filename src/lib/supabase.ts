import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

export const supabase = (supabaseUrl && supabaseAnonKey)
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export interface QuizSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  profile: string;
  profile_name: string;
  fico_range: string;
  has_negatives: boolean;
  negative_items: string[];
  utilization: string;
  has_two_cards: boolean;
  in_business: boolean;
  monthly_revenue: string;
  occupation: string;
  biggest_challenge: string;
  answers: Record<string, unknown>;
  user_agent?: string;
  created_at: string;
}

export const submitQuizResult = async (submission: Omit<QuizSubmission, 'id' | 'created_at'>) => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('credit_hub_quiz_submissions')
    .insert([submission]);

  if (error) throw error;
  return data;
};

export const getAllQuizSubmissions = async (): Promise<QuizSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('credit_hub_quiz_submissions')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getQuizSubmissionsByDateRange = async (startDate: string, endDate: string): Promise<QuizSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('credit_hub_quiz_submissions')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

export const getQuizSubmissionsByProfile = async (profile: string): Promise<QuizSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }

  const { data, error } = await supabase
    .from('credit_hub_quiz_submissions')
    .select('*')
    .eq('profile', profile)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data || [];
};

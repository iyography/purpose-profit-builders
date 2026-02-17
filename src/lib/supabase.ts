import { createClient } from '@supabase/supabase-js';

// These will need to be replaced with your actual Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim().replace(/^n\n/, '');
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim().replace(/^n\n/, '');

// Debug logging for environment variables
console.log('Supabase Environment Check:', {
  hasUrl: !!supabaseUrl,
  hasKey: !!supabaseAnonKey,
  urlFirst10: supabaseUrl?.substring(0, 10),
  keyFirst10: supabaseAnonKey?.substring(0, 10),
  urlIsValid: supabaseUrl?.startsWith('https://'),
  cleanedUrl: supabaseUrl
});

// Only create client if environment variables are properly configured
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Types for our database
export interface QuizSubmission {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  track: string;
  archetype: string;
  archetype_name: string;
  bottleneck?: string;
  recommended_tier: string;
  strike_zone: string;
  focus: string[];
  ignore_list: string;
  sixty_day_path: string;
  answers: Record<string, any>;
  user_agent?: string;
  created_at: string;
}

// Admin functions
export const submitQuizResult = async (submission: Omit<QuizSubmission, 'id' | 'created_at'>) => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }
  
  const { data, error } = await supabase
    .from('focus_founders_quiz_submissions')
    .insert([submission]);
  
  if (error) throw error;
  return data;
};

export const getAllQuizSubmissions = async (): Promise<QuizSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }
  
  const { data, error } = await supabase
    .from('focus_founders_quiz_submissions')
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
    .from('focus_founders_quiz_submissions')
    .select('*')
    .gte('created_at', startDate)
    .lte('created_at', endDate)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};

export const getQuizSubmissionsByArchetype = async (archetype: string): Promise<QuizSubmission[]> => {
  if (!supabase) {
    throw new Error('Supabase not configured. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.');
  }
  
  const { data, error } = await supabase
    .from('focus_founders_quiz_submissions')
    .select('*')
    .eq('archetype', archetype)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data || [];
};
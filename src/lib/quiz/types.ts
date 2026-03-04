export type SprintProfile = 'kingdom-starter' | 'systems-builder' | 'explorer';

export interface SprintQuestion {
  id: string;
  question: string;
  type: 'single' | 'multi-select' | 'text';
  options?: SprintOption[];
  required: boolean;
}

export interface SprintOption {
  id: string;
  text: string;
}

export interface SprintAnswers {
  q1_goal: string;
  q2_income: string;
  q3_offer: string;
  q4_ai_usage: string;
  q5_systems: string;
  q6_faith_alignment: string;
  q7_time_spent: string;
  q8_description: string;
  q9_challenge: string;
  q10_fix_one_thing: string;
}

export interface ContactInfo {
  full_name: string;
  email: string;
  phone: string;
}

export interface SprintResult {
  profile: SprintProfile;
  profileName: string;
  profileEmoji: string;
  primaryChallenge: string;
  summary: {
    whatsWorking: string[];
    needsAttention: string[];
  };
  nextSteps: string[];
  cta: {
    primary: { label: string; url: string };
    secondary?: { label: string; url: string };
  };
}

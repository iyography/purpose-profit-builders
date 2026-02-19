export type CreditProfile = 'credit-builder' | 'funding-seeker' | 'explorer';

export interface CreditQuizQuestion {
  id: string;
  question: string;
  type: 'single' | 'multi-select' | 'text';
  options?: CreditQuizOption[];
  required: boolean;
}

export interface CreditQuizOption {
  id: string;
  text: string;
}

export interface CreditQuizAnswers {
  q1_goal: string;
  q2_fico: string;
  q3_negatives: string[];
  q4_utilization: string;
  q5_two_cards: string;
  q6_in_business: string;
  q7_revenue: string;
  q8_occupation: string;
  q9_challenge: string;
  q10_fix_one_thing: string;
}

export interface ContactInfo {
  full_name: string;
  email: string;
  phone: string;
}

export interface CreditQuizResult {
  profile: CreditProfile;
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

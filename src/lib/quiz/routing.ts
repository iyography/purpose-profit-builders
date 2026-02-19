import { CreditQuizAnswers, CreditProfile, CreditQuizResult } from './types';

export function determineProfile(answers: CreditQuizAnswers): CreditProfile {
  const justExploring = answers.q1_goal === 'exploring';
  if (justExploring) return 'explorer';

  const ficoHigh = ['700-750', '750-plus'].includes(answers.q2_fico);
  const noNegatives =
    answers.q3_negatives.length === 1 && answers.q3_negatives[0] === 'clean';
  const lowUtilization = ['debt-free', 'under-15', '15-30', 'can-reduce'].includes(
    answers.q4_utilization
  );
  const hasTwoCards = answers.q5_two_cards === 'yes';

  if (ficoHigh && noNegatives && lowUtilization && hasTwoCards) {
    return 'funding-seeker';
  }

  return 'credit-builder';
}

export function generateResult(
  profile: CreditProfile,
  answers: CreditQuizAnswers
): CreditQuizResult {
  if (profile === 'funding-seeker') {
    return buildFundingSeekerResult(answers);
  }
  if (profile === 'explorer') {
    return buildExplorerResult(answers);
  }
  return buildCreditBuilderResult(answers);
}

function buildCreditBuilderResult(answers: CreditQuizAnswers): CreditQuizResult {
  const whatsWorking: string[] = [];
  const needsAttention: string[] = [];

  // Analyze FICO
  if (['700-750', '750-plus'].includes(answers.q2_fico)) {
    whatsWorking.push('Your FICO score is in a strong range');
  } else if (['680-700'].includes(answers.q2_fico)) {
    whatsWorking.push('Your FICO score is close to fundable range');
    needsAttention.push('A small score boost could unlock major funding opportunities');
  } else {
    needsAttention.push('Your FICO score needs improvement before accessing premium funding');
  }

  // Analyze negatives
  if (answers.q3_negatives.includes('clean')) {
    whatsWorking.push('Clean credit report with no negative items');
  } else {
    const negativeCount = answers.q3_negatives.filter(n => n !== 'getting-removed').length;
    if (answers.q3_negatives.includes('getting-removed')) {
      whatsWorking.push("You're already working on removing negative items");
    }
    if (negativeCount > 0) {
      needsAttention.push('Negative items on your report are limiting your approvals');
    }
  }

  // Analyze utilization
  if (['debt-free', 'under-15'].includes(answers.q4_utilization)) {
    whatsWorking.push('Your credit utilization is in a healthy range');
  } else if (answers.q4_utilization === 'can-reduce') {
    whatsWorking.push("You're positioned to quickly reduce utilization");
  } else {
    needsAttention.push('High credit utilization is dragging down your score');
  }

  // Analyze cards
  if (answers.q5_two_cards === 'yes') {
    whatsWorking.push('You have established credit card history');
  } else {
    needsAttention.push('Building primary tradelines will strengthen your credit profile');
  }

  // Ensure at least one item in each
  if (whatsWorking.length === 0) {
    whatsWorking.push("You've taken the first step by assessing where you stand");
  }
  if (needsAttention.length === 0) {
    needsAttention.push('Fine-tuning your profile for maximum funding potential');
  }

  // Determine primary challenge
  let primaryChallenge = 'Building a fundable credit profile';
  if (answers.q9_challenge === 'cleaning-credit') {
    primaryChallenge = 'Removing negative items and rebuilding your score';
  } else if (answers.q9_challenge === 'getting-approved') {
    primaryChallenge = 'Getting approved with your current credit profile';
  } else if (answers.q9_challenge === 'feeling-stuck') {
    primaryChallenge = 'Breaking through the credit repair plateau';
  }

  return {
    profile: 'credit-builder',
    profileName: 'Credit Builder',
    profileEmoji: '\u{1f527}',
    primaryChallenge,
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Get a free credit audit to identify exactly what to dispute',
      'Start rapid repair on the highest-impact negative items',
      'Build a 90-day credit improvement roadmap with our team',
    ],
    cta: {
      primary: { label: 'Book Free Credit Audit', url: '#credit-audit' },
      secondary: { label: 'Upgrade to VIP Credit Repair', url: '#vip-credit' },
    },
  };
}

function buildFundingSeekerResult(answers: CreditQuizAnswers): CreditQuizResult {
  const whatsWorking: string[] = [
    'Strong FICO score puts you in the funding zone',
    'Clean credit report with no red flags',
    'Good credit utilization management',
    'Established credit card tradelines',
  ];

  const needsAttention: string[] = [];

  if (answers.q6_in_business === 'no') {
    needsAttention.push('Setting up a proper business entity to access business credit');
  }
  if (['just-starting', 'under-10k'].includes(answers.q7_revenue)) {
    needsAttention.push('Building revenue history to qualify for larger funding amounts');
  }
  if (needsAttention.length === 0) {
    needsAttention.push('Optimizing your application strategy for maximum approvals');
  }

  let primaryChallenge = 'Maximizing your funding potential';
  if (answers.q9_challenge === 'getting-approved') {
    primaryChallenge = 'Unlocking the right funding sources for your profile';
  } else if (answers.q9_challenge === 'knowing-next-steps') {
    primaryChallenge = 'Creating a clear funding roadmap';
  }

  return {
    profile: 'funding-seeker',
    profileName: 'Funding Ready',
    profileEmoji: '\u{1f4b0}',
    primaryChallenge,
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Book a funding strategy call to map out your approval plan',
      'Get matched with the right lenders for your specific profile',
      'Execute the funding fast track to access $50K\u2013$250K in capital',
    ],
    cta: {
      primary: { label: 'Book Funding Strategy Call', url: '#funding-call' },
    },
  };
}

function buildExplorerResult(answers: CreditQuizAnswers): CreditQuizResult {
  const whatsWorking: string[] = [
    "You're exploring your options \u2014 that's a smart first step",
  ];
  const needsAttention: string[] = [
    'Understanding where your credit profile stands today',
    'Learning the strategies behind credit repair and funding access',
  ];

  if (['700-750', '750-plus'].includes(answers.q2_fico)) {
    whatsWorking.push('Your FICO score is already in a strong range');
  } else if (answers.q2_fico !== 'not-sure') {
    needsAttention.push('Your FICO score has room for improvement');
  }

  return {
    profile: 'explorer',
    profileName: 'Credit Explorer',
    profileEmoji: '\u{1f9ed}',
    primaryChallenge: 'Getting clear on your credit and funding path',
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Join The Credit Hub community to learn from real credit transformations',
      'Access our free training materials on credit repair fundamentals',
      'Connect with members who started exactly where you are',
    ],
    cta: {
      primary: { label: 'Join The Credit Hub', url: 'https://www.skool.com/tch' },
    },
  };
}

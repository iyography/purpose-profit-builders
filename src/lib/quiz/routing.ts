import { SprintAnswers, SprintProfile, SprintResult } from './types';

export function determineProfile(answers: SprintAnswers): SprintProfile {
  const justExploring = answers.q1_goal === 'exploring';
  if (justExploring) return 'explorer';

  const hasOffer = ['yes-selling', 'yes-not-selling'].includes(answers.q3_offer);
  const hasIncome = !['zero', 'under-1k'].includes(answers.q2_income);
  const usesAI = ['daily', 'sometimes'].includes(answers.q4_ai_usage);
  const hasSystems = answers.q5_systems === 'yes';

  if (hasOffer && hasIncome && (usesAI || hasSystems)) {
    return 'systems-builder';
  }

  return 'kingdom-starter';
}

export function generateResult(
  profile: SprintProfile,
  answers: SprintAnswers
): SprintResult {
  if (profile === 'systems-builder') {
    return buildSystemsBuilderResult(answers);
  }
  if (profile === 'explorer') {
    return buildExplorerResult(answers);
  }
  return buildKingdomStarterResult(answers);
}

function buildKingdomStarterResult(answers: SprintAnswers): SprintResult {
  const whatsWorking: string[] = [];
  const needsAttention: string[] = [];

  // Analyze faith alignment
  if (['fully-aligned', 'mostly-aligned'].includes(answers.q6_faith_alignment)) {
    whatsWorking.push('Your work is connected to your God-given purpose');
  } else {
    needsAttention.push('Aligning your business with your calling will unlock clarity and confidence');
  }

  // Analyze offer
  if (['yes-selling', 'yes-not-selling'].includes(answers.q3_offer)) {
    whatsWorking.push('You already have a product or service to offer');
    if (answers.q3_offer === 'yes-not-selling') {
      needsAttention.push('Your offer exists but needs a consistent sales system');
    }
  } else {
    needsAttention.push('Defining a clear, Kingdom-aligned offer is your first step');
  }

  // Analyze AI usage
  if (['daily', 'sometimes'].includes(answers.q4_ai_usage)) {
    whatsWorking.push("You're already leveraging AI tools in your workflow");
  } else {
    needsAttention.push('Simple AI systems can save you 20+ hours per week');
  }

  // Analyze time investment
  if (['10-20', '20-plus'].includes(answers.q7_time_spent)) {
    whatsWorking.push("You're investing real time into building your business");
  } else {
    needsAttention.push('Increasing focused time (even 15 min/day) will accelerate your results');
  }

  // Ensure at least one item in each
  if (whatsWorking.length === 0) {
    whatsWorking.push("You've taken the first step by assessing where you stand");
  }
  if (needsAttention.length === 0) {
    needsAttention.push('Fine-tuning your systems for consistent income');
  }

  // Determine primary challenge
  let primaryChallenge = 'Building a Kingdom-aligned business from the ground up';
  if (answers.q9_challenge === 'no-clients') {
    primaryChallenge = 'Getting consistent clients without pressure-based selling';
  } else if (answers.q9_challenge === 'no-offer') {
    primaryChallenge = 'Creating an offer your ideal clients actually want to pay for';
  } else if (answers.q9_challenge === 'no-clarity') {
    primaryChallenge = 'Getting clarity on your next steps and daily focus';
  } else if (answers.q9_challenge === 'overwhelmed') {
    primaryChallenge = 'Breaking free from overwhelm and building with peace';
  }

  return {
    profile: 'kingdom-starter',
    profileName: 'Kingdom Starter',
    profileEmoji: '\u{1f331}',
    primaryChallenge,
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Join the 7-Day Focus Sprint to build daily momentum (just 15 min/day)',
      'Use our Kingdom Business Blueprint to align your calling with a clear offer',
      'Connect with faith-driven builders in the community for accountability',
    ],
    cta: {
      primary: { label: 'Join Purpose & Profit Builders', url: 'https://www.skool.com/thezoexway/about' },
      secondary: { label: 'Start the 7-Day Sprint', url: 'https://www.skool.com/thezoexway/about' },
    },
  };
}

function buildSystemsBuilderResult(answers: SprintAnswers): SprintResult {
  const whatsWorking: string[] = [
    'You have an offer and income \u2014 the foundation is solid',
    "You're already generating revenue from your business",
  ];

  if (['daily', 'sometimes'].includes(answers.q4_ai_usage)) {
    whatsWorking.push("You're using AI tools to support your workflow");
  }
  if (answers.q5_systems === 'yes') {
    whatsWorking.push('You have repeatable systems in place for client acquisition');
  }

  const needsAttention: string[] = [];

  if (answers.q5_systems !== 'yes') {
    needsAttention.push('Building automated systems so your business works without constant effort');
  }
  if (!['daily'].includes(answers.q4_ai_usage)) {
    needsAttention.push('Deepening your AI integration to save 20+ hours per week');
  }
  if (['mostly-aligned', 'not-aligned', 'unsure'].includes(answers.q6_faith_alignment)) {
    needsAttention.push('Re-aligning your business operations with your Kingdom purpose');
  }
  if (needsAttention.length === 0) {
    needsAttention.push('Scaling your systems to hit consistent $10K+ months');
  }

  let primaryChallenge = 'Scaling your business with systems instead of hustle';
  if (answers.q9_challenge === 'no-systems') {
    primaryChallenge = 'Building automated systems so you stop doing everything manually';
  } else if (answers.q9_challenge === 'no-clients') {
    primaryChallenge = 'Creating a consistent client pipeline that runs on autopilot';
  } else if (answers.q9_challenge === 'overwhelmed') {
    primaryChallenge = 'Simplifying your operations so you can grow without burnout';
  }

  return {
    profile: 'systems-builder',
    profileName: 'Systems Builder',
    profileEmoji: '\u{2699}\u{fe0f}',
    primaryChallenge,
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Map out your AI automation stack to eliminate manual tasks',
      'Build a repeatable client acquisition system using our templates',
      'Join the weekly Kingdom Calls for strategy and accountability',
    ],
    cta: {
      primary: { label: 'Join Purpose & Profit Builders', url: 'https://www.skool.com/thezoexway/about' },
    },
  };
}

function buildExplorerResult(answers: SprintAnswers): SprintResult {
  const whatsWorking: string[] = [
    "You're exploring your options \u2014 that's a wise first step",
  ];
  const needsAttention: string[] = [
    'Getting clarity on your God-given purpose and how to monetize it',
    'Learning simple systems that can generate income without overwhelm',
  ];

  if (['fully-aligned', 'mostly-aligned'].includes(answers.q6_faith_alignment)) {
    whatsWorking.push('You already feel a sense of purpose in your work');
  } else {
    needsAttention.push('Discovering the intersection of your calling and your income');
  }

  return {
    profile: 'explorer',
    profileName: 'Purpose Explorer',
    profileEmoji: '\u{1f9ed}',
    primaryChallenge: 'Getting clear on your purpose-driven path to profit',
    summary: { whatsWorking, needsAttention },
    nextSteps: [
      'Join Purpose & Profit Builders to learn from faith-driven entrepreneurs',
      'Start the 7-Day Focus Sprint to gain clarity in just 15 minutes a day',
      'Connect with members who started exactly where you are',
    ],
    cta: {
      primary: { label: 'Join Purpose & Profit Builders', url: 'https://www.skool.com/thezoexway/about' },
    },
  };
}

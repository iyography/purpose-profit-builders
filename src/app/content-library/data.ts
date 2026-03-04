/* ──────────────────────────────────────────────
   POST DATA TYPES
   ────────────────────────────────────────────── */
export interface Post {
  id: number;
  title: string;
  short: string;
  medium: string;
  long: string;
  category: string;
  tab: 'social' | 'community' | 'skool';
}

/* ──────────────────────────────────────────────
   SOCIAL MEDIA POSTS (10 posts)
   ────────────────────────────────────────────── */
export const socialPosts: Post[] = [
  {
    id: 1,
    tab: 'social',
    category: 'Kingdom Economics',
    title: `Your purpose IS your profit strategy`,
    short: `God didn't give you a calling and forget to fund it. When you align your business with Kingdom principles, profit follows purpose. Stop separating your faith from your finances — they were always meant to work together.`,
    medium: `God didn't give you a calling and forget to fund it. When you align your business with Kingdom principles, profit follows purpose. Stop separating your faith from your finances — they were always meant to work together.

Too many faith-driven entrepreneurs feel guilty about making money. But profit is not the opposite of purpose — it's the proof that you're solving real problems for real people. Inside Purpose & Profit Builders, Theodore teaches you how to build a business that honors God AND hits $10K/mo.`,
    long: `God didn't give you a calling and forget to fund it. When you align your business with Kingdom principles, profit follows purpose. Stop separating your faith from your finances — they were always meant to work together.

Too many faith-driven entrepreneurs feel guilty about making money. But profit is not the opposite of purpose — it's the proof that you're solving real problems for real people. Kingdom Economics means your business becomes a vehicle for generosity, impact, and legacy.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore draws on 20+ years of IT leadership to show you how to build a business that honors God AND hits $10K/mo consistently. You don't have to choose between faith and finances. You were designed for both.`,
  },
  {
    id: 2,
    tab: 'social',
    category: 'AI Systems',
    title: `AI just gave you 20 hours back this week`,
    short: `You don't need to be a tech genius to use AI. Three simple tools can automate your content, follow-ups, and scheduling — saving you 20+ hours every week. Work smarter so you can serve deeper.`,
    medium: `You don't need to be a tech genius to use AI. Three simple tools can automate your content, follow-ups, and scheduling — saving you 20+ hours every week. Work smarter so you can serve deeper.

Most entrepreneurs are still doing everything manually — writing every email, posting every update, chasing every lead. Theodore spent 20+ years in IT leadership and has distilled the best AI workflows into simple, repeatable systems anyone can use. Inside PPB, we hand you the exact setup.`,
    long: `You don't need to be a tech genius to use AI. Three simple tools can automate your content, follow-ups, and scheduling — saving you 20+ hours every week. Work smarter so you can serve deeper.

Most entrepreneurs are still doing everything manually — writing every email, posting every update, chasing every lead. That's not stewardship — that's survival mode. Theodore spent 20+ years in IT leadership and has distilled the best AI workflows into simple, repeatable systems anyone can use.

Inside Purpose & Profit Builders at skool.com/thezoexway, we walk you through the exact AI stack step by step. No overwhelm, no fluff. Just tools that free up your time so you can focus on the people and the purpose God called you to.`,
  },
  {
    id: 3,
    tab: 'social',
    category: 'Income Strategy',
    title: `The $0 to $10K/mo roadmap nobody talks about`,
    short: `Going from $0 to $10K/mo doesn't require a massive audience or a perfect funnel. It requires a clear offer, a simple system, and consistent action. Most people overcomplicate it — here's the truth.`,
    medium: `Going from $0 to $10K/mo doesn't require a massive audience or a perfect funnel. It requires a clear offer, a simple system, and consistent action. Most people overcomplicate it — here's the truth.

The roadmap is simpler than you think: clarify who you serve, build one offer that solves a real problem, price it with confidence, and show up daily with value. Inside PPB, we break this into weekly sprints so you never feel lost. Faith-driven entrepreneurs deserve a clear path, not another course collecting dust.`,
    long: `Going from $0 to $10K/mo doesn't require a massive audience or a perfect funnel. It requires a clear offer, a simple system, and consistent action. Most people overcomplicate it — here's the truth.

The roadmap is simpler than you think: clarify who you serve, build one offer that solves a real problem, price it with confidence, and show up daily with value. You don't need 10,000 followers. You need 10 clients who trust you enough to pay.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore walks you through this step by step with weekly sprints and accountability. Faith-driven entrepreneurs deserve a clear path, not another course collecting dust. Join the community and start building your $10K/mo foundation today.`,
  },
  {
    id: 4,
    tab: 'social',
    category: 'Faith & Business',
    title: `God gave you a business idea — now steward it`,
    short: `That idea you keep thinking about? It's not random. God plants seeds of purpose, but you have to water them with action. Faith without works is dead — and so is a business without execution.`,
    medium: `That idea you keep thinking about? It's not random. God plants seeds of purpose, but you have to water them with action. Faith without works is dead — and so is a business without execution.

Too many people sit on God-given ideas waiting for the "perfect time." But stewardship means moving forward even when you can't see the full picture. Inside Purpose & Profit Builders, we help faith-driven entrepreneurs take that first step — and every step after — with a community that prays together and builds together.`,
    long: `That idea you keep thinking about? It's not random. God plants seeds of purpose, but you have to water them with action. Faith without works is dead — and so is a business without execution.

Too many people sit on God-given ideas waiting for the "perfect time." But stewardship means moving forward even when you can't see the full picture. Abraham didn't get a GPS — he got a promise and a direction. Your business journey works the same way.

Inside Purpose & Profit Builders at skool.com/thezoexway, we help faith-driven entrepreneurs take that first step — and every step after — with a community that prays together and builds together. Theodore leads with 20+ years of real-world IT leadership and Kingdom conviction. Stop waiting. Start stewarding.`,
  },
  {
    id: 5,
    tab: 'social',
    category: 'Systems',
    title: `Systems beat hustle every single time`,
    short: `Hustle gets you started. Systems get you free. If your business falls apart when you take a day off, you don't have a business — you have a job you created for yourself. Build systems that run without you.`,
    medium: `Hustle gets you started. Systems get you free. If your business falls apart when you take a day off, you don't have a business — you have a job you created for yourself. Build systems that run without you.

The difference between a $3K/mo grind and a $10K/mo business is systems. Repeatable processes for content, client onboarding, follow-ups, and delivery. Inside PPB, Theodore teaches you how to build these from scratch using simple tools and AI — no coding or tech background required.`,
    long: `Hustle gets you started. Systems get you free. If your business falls apart when you take a day off, you don't have a business — you have a job you created for yourself. Build systems that run without you.

The difference between a $3K/mo grind and a $10K/mo business is systems. Repeatable processes for content creation, client onboarding, follow-ups, and service delivery. When your systems work, you can step away and your business keeps moving.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore draws on 20+ years of IT leadership to teach you how to build these systems from scratch. No coding required. No tech overwhelm. Just simple, repeatable processes that free you to focus on purpose, family, and faith.`,
  },
  {
    id: 6,
    tab: 'social',
    category: 'Client Acquisition',
    title: `Stop chasing clients — start attracting them`,
    short: `The best clients don't come from cold DMs and desperate pitches. They come from value-first content, clear positioning, and genuine connection. Attract values-aligned clients by being exactly who God made you to be.`,
    medium: `The best clients don't come from cold DMs and desperate pitches. They come from value-first content, clear positioning, and genuine connection. Attract values-aligned clients by being exactly who God made you to be.

When you lead with service and authenticity, the right people find you. Inside Purpose & Profit Builders, we teach a simple 3-step attraction framework: share your story, solve one problem publicly, and invite people into the next step. No sleazy tactics. No manipulation. Just Kingdom-aligned client acquisition that feels natural.`,
    long: `The best clients don't come from cold DMs and desperate pitches. They come from value-first content, clear positioning, and genuine connection. Attract values-aligned clients by being exactly who God made you to be.

When you lead with service and authenticity, the right people find you. The secret is not some viral hack — it's consistency and clarity. People buy from those they trust, and trust is built through showing up with real value over time.

Inside Purpose & Profit Builders at skool.com/thezoexway, we teach a simple 3-step attraction framework: share your story, solve one problem publicly, and invite people into the next step. No sleazy tactics. No manipulation. Just Kingdom-aligned client acquisition that honors God and grows your business.`,
  },
  {
    id: 7,
    tab: 'social',
    category: 'Mindset',
    title: `Purpose over hustle — peace over pressure`,
    short: `Burnout is not a badge of honor. God designed you for purpose, not exhaustion. When you build from peace instead of pressure, you make better decisions, serve better clients, and actually enjoy the journey.`,
    medium: `Burnout is not a badge of honor. God designed you for purpose, not exhaustion. When you build from peace instead of pressure, you make better decisions, serve better clients, and actually enjoy the journey.

The hustle culture gospel says sleep less, grind more, sacrifice everything. But that's not Kingdom thinking. Proverbs says it's vain to rise early and stay up late in anxious toil. Inside PPB, Theodore leads a community that builds with intention — not desperation. You can grow to $10K/mo without losing your soul in the process.`,
    long: `Burnout is not a badge of honor. God designed you for purpose, not exhaustion. When you build from peace instead of pressure, you make better decisions, serve better clients, and actually enjoy the journey.

The hustle culture gospel says sleep less, grind more, sacrifice everything. But that's not Kingdom thinking. Proverbs says it's vain to rise early and stay up late eating the bread of anxious toil. Rest is not laziness — it's trust. Strategy is not slowness — it's wisdom.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore leads a community that builds with intention, not desperation. You can grow to $10K/mo without losing your soul, your family, or your health in the process. Purpose over hustle. Peace over pressure. Always.`,
  },
  {
    id: 8,
    tab: 'social',
    category: 'Offer Creation',
    title: `Build an offer that serves and sells`,
    short: `Your offer should solve a real problem so well that selling feels like serving. When your offer is aligned with your skills and your audience's pain, the sale becomes a natural next step — not a hard pitch.`,
    medium: `Your offer should solve a real problem so well that selling feels like serving. When your offer is aligned with your skills and your audience's pain, the sale becomes a natural next step — not a hard pitch.

Most entrepreneurs either underprice out of guilt or overpromise out of fear. Neither works. Inside Purpose & Profit Builders, we teach you how to craft an offer that matches your God-given strengths to a specific audience's urgent need. Price it with confidence, deliver with excellence, and watch your business grow through referrals.`,
    long: `Your offer should solve a real problem so well that selling feels like serving. When your offer is aligned with your skills and your audience's pain, the sale becomes a natural next step — not a hard pitch.

Most entrepreneurs either underprice out of guilt or overpromise out of fear. Neither works long-term. The sweet spot is an offer rooted in your God-given strengths, targeted at a specific audience, solving an urgent problem with a clear outcome.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore helps you build that offer step by step. You'll define your audience, clarify your transformation, set a price that reflects your value, and create a delivery system that wows every client. Serve well, sell naturally, and scale with integrity.`,
  },
  {
    id: 9,
    tab: 'social',
    category: 'Time Management',
    title: `15 minutes a day can change your business`,
    short: `You don't need 8 hours a day to build a business. You need 15 focused minutes of high-impact action. One post, one follow-up, one connection — done consistently, this compounds into massive results.`,
    medium: `You don't need 8 hours a day to build a business. You need 15 focused minutes of high-impact action. One post, one follow-up, one connection — done consistently, this compounds into massive results.

The lie is that you need more time. The truth is you need better focus. Inside PPB, we use "Focus Sprints" — 15-minute daily blocks dedicated to the one action that moves the needle most. Theodore designed this system for busy professionals who refuse to let "I don't have time" be their excuse. Small steps, big faith, real results.`,
    long: `You don't need 8 hours a day to build a business. You need 15 focused minutes of high-impact action. One post, one follow-up, one connection — done consistently, this compounds into massive results.

The lie is that you need more time. The truth is you need better focus. Most people spend hours on busywork that feels productive but moves nothing forward. A 15-minute Focus Sprint on the right task beats 3 hours of scattered effort every time.

Inside Purpose & Profit Builders at skool.com/thezoexway, Theodore designed this system for busy professionals building on the side. Each day you get one clear action. Do it in 15 minutes or less. Stack those days up, and in 90 days you'll be shocked at where you stand. Small steps, big faith, real results.`,
  },
  {
    id: 10,
    tab: 'social',
    category: 'Community',
    title: `You weren't meant to build alone`,
    short: `Isolation is the enemy of progress. Faith-driven entrepreneurs need accountability, encouragement, and people who understand the journey. The right community accelerates everything — your growth, your income, and your faith.`,
    medium: `Isolation is the enemy of progress. Faith-driven entrepreneurs need accountability, encouragement, and people who understand the journey. The right community accelerates everything — your growth, your income, and your faith.

Inside Purpose & Profit Builders, you'll find a community of like-minded entrepreneurs who pray for each other, challenge each other, and celebrate each other's wins. Theodore built this space because he knows firsthand — after 20+ years in IT leadership — that no one succeeds alone. Join us at skool.com/thezoexway.`,
    long: `Isolation is the enemy of progress. Faith-driven entrepreneurs need accountability, encouragement, and people who understand the journey. The right community accelerates everything — your growth, your income, and your faith.

Inside Purpose & Profit Builders, you'll find a community of like-minded entrepreneurs who pray for each other, challenge each other, and celebrate each other's wins. This isn't a passive group full of lurkers. It's an active, faith-driven community where people show up, share openly, and grow together.

Theodore built this space because he knows firsthand — after 20+ years in IT leadership — that no one succeeds alone. Whether you're at $0 or pushing past $5K/mo, you need people around you who speak life into your vision. Join us at skool.com/thezoexway and experience what building in community really feels like.`,
  },
];

/* ──────────────────────────────────────────────
   COMMUNITY POSTS (10 posts)
   ────────────────────────────────────────────── */
export const communityPosts: Post[] = [
  {
    id: 11,
    tab: 'community',
    category: 'Kingdom Alignment',
    title: `Deep dive: Aligning your business with Kingdom principles`,
    short: `Kingdom alignment means your business reflects your values at every level — from how you price to how you serve. When purpose leads, profit follows naturally.`,
    medium: `Kingdom alignment means your business reflects your values at every level — from how you price to how you serve. When purpose leads, profit follows naturally.

This isn't about slapping a Bible verse on your website. It's about building ethical systems, serving with excellence, and trusting God with the outcomes. Inside PPB, Theodore walks you through a Kingdom Alignment audit for your business so every decision flows from purpose.`,
    long: `Kingdom alignment means your business reflects your values at every level — from how you price to how you serve. When purpose leads, profit follows naturally.

This isn't about slapping a Bible verse on your website. It's about building ethical systems, serving with excellence, and trusting God with the outcomes. Do your marketing practices reflect honesty? Does your pricing reflect the value you deliver? Do your client relationships reflect genuine care?

Inside Purpose & Profit Builders, Theodore walks you through a Kingdom Alignment audit for your business. You'll evaluate every touchpoint and make sure your operations match your convictions. Faith-driven business isn't a label — it's a standard.`,
  },
  {
    id: 12,
    tab: 'community',
    category: 'Testimonials',
    title: `Member spotlight: From side hustle doubt to $5K months`,
    short: `One of our PPB members went from questioning whether entrepreneurship was even for them to consistently hitting $5K/mo. The key? Community, clarity, and daily focused action.`,
    medium: `One of our PPB members went from questioning whether entrepreneurship was even for them to consistently hitting $5K/mo. The key? Community, clarity, and daily focused action.

They started with no audience, no offer, and a lot of fear. Through the PPB framework — clarify, build, launch, refine — they found their niche, built a simple offer, and started showing up with value every day. The community kept them accountable when motivation faded. That's the power of building together.`,
    long: `One of our PPB members went from questioning whether entrepreneurship was even for them to consistently hitting $5K/mo. The key? Community, clarity, and daily focused action.

They started with no audience, no offer, and a lot of fear. Through the PPB framework — clarify, build, launch, refine — they found their niche, built a simple offer, and started showing up with value every day. The community kept them accountable when motivation faded.

Stories like this are why Theodore built Purpose & Profit Builders. It's not about overnight success. It's about stacking small wins, staying faithful, and letting God multiply your efforts. If you're ready for your own breakthrough, join us at skool.com/thezoexway.`,
  },
  {
    id: 13,
    tab: 'community',
    category: 'Strategy',
    title: `Strategy session: Mapping your first $10K month`,
    short: `Your first $10K month starts with math, not magic. How many clients do you need? At what price point? What's your conversion rate? Let's reverse-engineer it together.`,
    medium: `Your first $10K month starts with math, not magic. How many clients do you need? At what price point? What's your conversion rate? Let's reverse-engineer it together.

If your offer is $1,000, you need 10 clients. If it's $2,500, you need 4. The question shifts from "how do I make $10K" to "how do I find 4 people who need what I offer." That's a much more solvable problem. Inside PPB, we break these numbers down with you and build the acquisition system to match.`,
    long: `Your first $10K month starts with math, not magic. How many clients do you need? At what price point? What's your conversion rate? Let's reverse-engineer it together.

If your offer is $1,000, you need 10 clients. If it's $2,500, you need 4. The question shifts from "how do I make $10K" to "how do I find 4 people who need what I offer." That's a much more solvable problem — and it removes the overwhelm.

Inside Purpose & Profit Builders, Theodore helps you reverse-engineer your revenue goal into daily actions. You'll know exactly what to do each day, how many conversations to have, and what content to create. Clarity kills confusion, and confusion is the biggest revenue killer in early-stage business.`,
  },
  {
    id: 14,
    tab: 'community',
    category: 'AI Workflows',
    title: `AI workflow breakdown: Automate your content in 30 minutes`,
    short: `Theodore's AI content workflow produces a full week of posts in under 30 minutes. No writing from scratch. No staring at a blank screen. Just a repeatable system anyone can follow.`,
    medium: `Theodore's AI content workflow produces a full week of posts in under 30 minutes. No writing from scratch. No staring at a blank screen. Just a repeatable system anyone can follow.

The process is simple: start with one core idea, use AI to expand it into multiple formats, edit for your voice, and schedule. With 20+ years in IT, Theodore has refined this into a plug-and-play system inside PPB. Members save 10-20 hours a week on content alone — time they reinvest into serving clients and growing revenue.`,
    long: `Theodore's AI content workflow produces a full week of posts in under 30 minutes. No writing from scratch. No staring at a blank screen. Just a repeatable system anyone can follow.

The process is simple: start with one core idea, use AI to expand it into multiple formats — short posts, long-form, email, even video scripts — edit for your voice, and schedule everything in advance. The AI does the heavy lifting; you bring the authenticity.

With 20+ years in IT leadership, Theodore has refined this into a plug-and-play system inside Purpose & Profit Builders. Members save 10-20 hours a week on content alone — time they reinvest into client delivery and revenue growth. Join at skool.com/thezoexway and get the full workflow.`,
  },
  {
    id: 15,
    tab: 'community',
    category: 'Weekly Recap',
    title: `This week inside PPB: Wins, lessons, and next steps`,
    short: `Every week we recap the biggest wins, toughest lessons, and key takeaways from the community. Transparency and celebration keep everyone moving forward with momentum.`,
    medium: `Every week we recap the biggest wins, toughest lessons, and key takeaways from the community. Transparency and celebration keep everyone moving forward with momentum.

This week, members closed new clients, launched offers, set up AI automations, and pushed through doubt. We also had honest conversations about what didn't work and what needs adjusting. That's the beauty of a real community — you get the full picture, not just the highlight reel.`,
    long: `Every week we recap the biggest wins, toughest lessons, and key takeaways from the community. Transparency and celebration keep everyone moving forward with momentum.

This week, members closed new clients, launched offers, set up AI automations, and pushed through doubt. We also had honest conversations about what didn't work and what needs adjusting. That's the beauty of a real community — you get the full picture, not just the highlight reel.

If you're tired of building in isolation and want to be part of a community that celebrates wins AND processes setbacks together, Purpose & Profit Builders is your home. Theodore keeps the energy high and the standards higher. Join us at skool.com/thezoexway.`,
  },
  {
    id: 16,
    tab: 'community',
    category: 'Prayer & Business',
    title: `When you pray before you plan: Faith-first business decisions`,
    short: `The most successful faith-driven entrepreneurs don't just strategize — they pray first. Seeking God's direction before making major business decisions leads to peace, clarity, and better outcomes.`,
    medium: `The most successful faith-driven entrepreneurs don't just strategize — they pray first. Seeking God's direction before making major business decisions leads to peace, clarity, and better outcomes.

This doesn't mean waiting passively. It means surrendering the outcome while doing the work. Pray, plan, execute, trust. Inside PPB, we start our weekly strategy sessions with prayer because we believe wisdom from God outperforms any business framework alone.`,
    long: `The most successful faith-driven entrepreneurs don't just strategize — they pray first. Seeking God's direction before making major business decisions leads to peace, clarity, and better outcomes.

This doesn't mean waiting passively. It means surrendering the outcome while doing the work. Pray, plan, execute, trust. When you lead with faith, you make decisions from abundance instead of scarcity. You take risks from conviction instead of desperation.

Inside Purpose & Profit Builders, we start our weekly strategy sessions with prayer because we believe wisdom from God outperforms any business framework alone. Theodore models this in how he leads — and the results speak for themselves. Join us at skool.com/thezoexway.`,
  },
  {
    id: 17,
    tab: 'community',
    category: 'Scaling',
    title: `Scaling with integrity: Growing without compromising your values`,
    short: `Scaling doesn't mean selling out. You can grow your revenue, expand your reach, and serve more people — all while keeping your values at the center. Integrity is your competitive advantage.`,
    medium: `Scaling doesn't mean selling out. You can grow your revenue, expand your reach, and serve more people — all while keeping your values at the center. Integrity is your competitive advantage.

The temptation when things start working is to cut corners, automate everything, or chase bigger numbers at the expense of quality. But Kingdom entrepreneurs scale differently — we scale by deepening our service, not diluting it. Inside PPB, Theodore teaches you how to grow sustainably without sacrificing what makes your business special.`,
    long: `Scaling doesn't mean selling out. You can grow your revenue, expand your reach, and serve more people — all while keeping your values at the center. Integrity is your competitive advantage.

The temptation when things start working is to cut corners, automate everything, or chase bigger numbers at the expense of quality. But Kingdom entrepreneurs scale differently — we scale by deepening our service, not diluting it. Better systems, better delivery, better client experience.

Inside Purpose & Profit Builders, Theodore teaches you how to grow sustainably. AI handles the repetitive work. Systems handle the operations. You stay focused on relationships and impact. That's scaling with integrity — and it's how you build a business that lasts.`,
  },
  {
    id: 18,
    tab: 'community',
    category: 'Overcoming Doubt',
    title: `Imposter syndrome is lying to you — here's the truth`,
    short: `Every entrepreneur feels like a fraud at some point. But imposter syndrome is just fear wearing a mask. The truth is, someone out there needs exactly what you have to offer — right now, at your current level.`,
    medium: `Every entrepreneur feels like a fraud at some point. But imposter syndrome is just fear wearing a mask. The truth is, someone out there needs exactly what you have to offer — right now, at your current level.

You don't need to know everything. You just need to be one step ahead of the person you're serving. Inside PPB, we normalize the struggle and remind each other daily: God doesn't call the qualified, He qualifies the called. Your doubts don't disqualify you — your obedience does the work.`,
    long: `Every entrepreneur feels like a fraud at some point. But imposter syndrome is just fear wearing a mask. The truth is, someone out there needs exactly what you have to offer — right now, at your current level.

You don't need to know everything. You just need to be one step ahead of the person you're serving. The expert with 10 years of experience was once a beginner who decided to start anyway. That's you right now — a beginner who's choosing to be brave.

Inside Purpose & Profit Builders, we normalize the struggle and remind each other daily: God doesn't call the qualified, He qualifies the called. Theodore built this community so you never have to fight doubt alone. Join us at skool.com/thezoexway and find your people.`,
  },
  {
    id: 19,
    tab: 'community',
    category: 'Building Systems',
    title: `The 3 systems every faith-driven business needs`,
    short: `Every business needs three core systems: lead generation, client delivery, and follow-up. Without these, you're rebuilding from scratch every month. With them, your business runs like a well-oiled machine.`,
    medium: `Every business needs three core systems: lead generation, client delivery, and follow-up. Without these, you're rebuilding from scratch every month. With them, your business runs like a well-oiled machine.

Lead generation brings in new prospects consistently. Client delivery ensures everyone gets an excellent experience. Follow-up turns one-time clients into repeat customers and referral sources. Inside PPB, Theodore helps you build all three using simple tools and AI so you're not glued to your laptop 12 hours a day.`,
    long: `Every business needs three core systems: lead generation, client delivery, and follow-up. Without these, you're rebuilding from scratch every month. With them, your business runs like a well-oiled machine.

Lead generation brings in new prospects consistently — through content, referrals, or community engagement. Client delivery ensures everyone gets an excellent experience with clear communication and reliable results. Follow-up turns one-time clients into repeat customers and referral sources.

Inside Purpose & Profit Builders, Theodore helps you build all three systems using simple tools and AI. No complex tech stacks. No expensive software. Just proven processes that a faith-driven entrepreneur can set up in a weekend and maintain in 15 minutes a day. Join us at skool.com/thezoexway.`,
  },
  {
    id: 20,
    tab: 'community',
    category: 'Monthly Challenge',
    title: `This month's challenge: 30 days of consistent action`,
    short: `This month's PPB challenge is simple — 30 days of showing up. One action per day toward your business goal. Post your daily win in the community. Let's build momentum together.`,
    medium: `This month's PPB challenge is simple — 30 days of showing up. One action per day toward your business goal. Post your daily win in the community. Let's build momentum together.

Consistency beats intensity every time. You don't need a 12-hour sprint. You need a 15-minute daily habit that compounds. By the end of 30 days, you'll have built a content library, started conversations with potential clients, and proven to yourself that you can do this. The community will be with you every step.`,
    long: `This month's PPB challenge is simple — 30 days of showing up. One action per day toward your business goal. Post your daily win in the community. Let's build momentum together.

Consistency beats intensity every time. You don't need a 12-hour sprint. You need a 15-minute daily habit that compounds. Create one piece of content. Send one follow-up. Have one conversation. Small, daily, faithful action.

By the end of 30 days, you'll have built a content library, started conversations with potential clients, and proven to yourself that you can do this. Theodore designed this challenge to remove every excuse. Join Purpose & Profit Builders at skool.com/thezoexway and take the challenge with us.`,
  },
];

/* ──────────────────────────────────────────────
   SKOOL POSTS (11 posts)
   ────────────────────────────────────────────── */
export const skoolPosts: Post[] = [
  {
    id: 21,
    tab: 'skool',
    category: 'Welcome',
    title: `Welcome to Purpose & Profit Builders!`,
    short: `Welcome to the community! You're now part of a faith-driven tribe building real businesses with Kingdom principles. Introduce yourself below — tell us who you are, what you're building, and what you're believing God for.`,
    medium: `Welcome to the community! You're now part of a faith-driven tribe building real businesses with Kingdom principles. Introduce yourself below — tell us who you are, what you're building, and what you're believing God for.

Here's how to get started: complete your profile, introduce yourself in the comments, and check out the pinned resources. Theodore and the PPB community are here to support you every step of the way. No question is too basic. No dream is too big. Let's build together.`,
    long: `Welcome to Purpose & Profit Builders! You're now part of a faith-driven tribe building real businesses with Kingdom principles. Introduce yourself below — tell us who you are, what you're building, and what you're believing God for.

Here's how to get started: complete your profile, introduce yourself in the comments, and check out the pinned resources in the classroom. We have frameworks, AI workflows, and strategy guides ready for you to use immediately.

Theodore and the entire PPB community are here to support you every step of the way. No question is too basic. No dream is too big. This is a judgment-free zone where faith meets action. Welcome home — now let's get to work.`,
  },
  {
    id: 22,
    tab: 'skool',
    category: 'Weekly Challenge',
    title: `Weekly challenge: Define your ideal client in 5 minutes`,
    short: `This week's challenge: write a clear description of your ideal client in 5 minutes or less. Who are they? What's their biggest frustration? What result do they want? Post it below for feedback.`,
    medium: `This week's challenge: write a clear description of your ideal client in 5 minutes or less. Who are they? What's their biggest frustration? What result do they want? Post it below for feedback.

Clarity on who you serve changes everything — your content, your offers, your messaging. Most people skip this step and wonder why nothing converts. Take 5 minutes right now and post your answer in the comments. The community will help you refine it.`,
    long: `This week's challenge: write a clear description of your ideal client in 5 minutes or less. Who are they? What's their biggest frustration? What result do they want? Post it below for feedback.

Clarity on who you serve changes everything — your content, your offers, your messaging. Most people skip this step and wonder why nothing converts. You can't hit a target you haven't defined.

Take 5 minutes right now and post your answer in the comments. The community will help you refine it. Theodore reviews responses every week and gives direct feedback. This one exercise can unlock months of progress. Don't overthink it — just start.`,
  },
  {
    id: 23,
    tab: 'skool',
    category: 'Resource Drop',
    title: `Resource drop: The PPB content creation template`,
    short: `New resource just dropped in the classroom: the PPB Content Creation Template. Use it to turn one idea into a week of content in under 30 minutes. Download it and start creating today.`,
    medium: `New resource just dropped in the classroom: the PPB Content Creation Template. Use it to turn one idea into a week of content in under 30 minutes. Download it and start creating today.

The template walks you through: choosing your core topic, writing a hook, expanding into short and long formats, and repurposing for different platforms. Combined with AI tools, this system eliminates content overwhelm for good. Check the classroom for the full walkthrough.`,
    long: `New resource just dropped in the classroom: the PPB Content Creation Template. Use it to turn one idea into a week of content in under 30 minutes. Download it and start creating today.

The template walks you through: choosing your core topic, writing a hook, expanding into short and long formats, and repurposing for different platforms. Combined with the AI tools Theodore teaches, this system eliminates content overwhelm for good.

Check the classroom for the full walkthrough video and downloadable template. If you have questions, drop them below. This is one of the most popular resources in PPB — members say it cut their content creation time by 75%.`,
  },
  {
    id: 24,
    tab: 'skool',
    category: 'Q&A',
    title: `Q&A thread: Ask Theodore anything about building to $10K/mo`,
    short: `Open Q&A thread! Drop your biggest question about building to $10K/mo below. Theodore will answer every question this week. No topic is off limits — offers, pricing, AI, mindset, faith, systems — ask away.`,
    medium: `Open Q&A thread! Drop your biggest question about building to $10K/mo below. Theodore will answer every question this week. No topic is off limits — offers, pricing, AI, mindset, faith, systems — ask away.

This is your chance to get direct guidance from someone with 20+ years of IT leadership and a heart for Kingdom entrepreneurship. Don't sit on your questions. The fastest way to grow is to ask, learn, and apply. Drop your question in the comments now.`,
    long: `Open Q&A thread! Drop your biggest question about building to $10K/mo below. Theodore will answer every question this week. No topic is off limits — offers, pricing, AI, mindset, faith, systems — ask away.

This is your chance to get direct guidance from someone with 20+ years of IT leadership and a heart for Kingdom entrepreneurship. Don't sit on your questions. The fastest way to grow is to ask, learn, and apply.

Some of the best breakthroughs in PPB have come from these Q&A threads. One question led a member to completely reposition their offer and double their price — and their clients were happier for it. Your question could be the one that changes everything. Drop it below.`,
  },
  {
    id: 25,
    tab: 'skool',
    category: 'Accountability',
    title: `Accountability check-in: What did you accomplish this week?`,
    short: `Weekly accountability check-in! Share one thing you accomplished this week and one thing you're committing to next week. Public accountability accelerates results — let the community hold you to your word.`,
    medium: `Weekly accountability check-in! Share one thing you accomplished this week and one thing you're committing to next week. Public accountability accelerates results — let the community hold you to your word.

It doesn't have to be big. Maybe you posted your first piece of content. Maybe you had a sales conversation. Maybe you finally set up that AI workflow. Every step counts. Share below and let's celebrate progress, not perfection.`,
    long: `Weekly accountability check-in! Share one thing you accomplished this week and one thing you're committing to next week. Public accountability accelerates results — let the community hold you to your word.

It doesn't have to be big. Maybe you posted your first piece of content. Maybe you had a sales conversation. Maybe you finally set up that AI workflow. Every step counts. Progress is progress, no matter how small.

PPB members who participate in weekly check-ins consistently outperform those who don't. There's power in declaring your commitments publicly and having a community that follows up. Share your win and your next commitment below. We're cheering for you.`,
  },
  {
    id: 26,
    tab: 'skool',
    category: 'Wins',
    title: `Win celebration: Share your biggest win this week!`,
    short: `Time to celebrate! Drop your biggest win from this week in the comments. First client? New lead? Conquered a fear? Every win matters here. Let's lift each other up and keep the momentum going.`,
    medium: `Time to celebrate! Drop your biggest win from this week in the comments. First client? New lead? Conquered a fear? Every win matters here. Let's lift each other up and keep the momentum going.

Celebrating wins rewires your brain for success. When you acknowledge progress — no matter how small — you build confidence and momentum. Inside PPB, we don't wait for $10K months to celebrate. We celebrate the first post, the first conversation, the first dollar. Drop your win below!`,
    long: `Time to celebrate! Drop your biggest win from this week in the comments. First client? New lead? Conquered a fear? Every win matters here. Let's lift each other up and keep the momentum going.

Celebrating wins rewires your brain for success. When you acknowledge progress — no matter how small — you build confidence and momentum. Most entrepreneurs skip this step and only focus on what's not working. That kills motivation fast.

Inside PPB, we don't wait for $10K months to celebrate. We celebrate the first post, the first conversation, the first dollar. Every step of faith deserves recognition. Drop your win below and let the community pour some encouragement into your journey.`,
  },
  {
    id: 27,
    tab: 'skool',
    category: 'Tools',
    title: `Tool recommendation: Top 3 AI tools for solopreneurs`,
    short: `Here are Theodore's top 3 AI tools for faith-driven solopreneurs: one for content creation, one for email automation, and one for client management. All free or low-cost. All simple to set up.`,
    medium: `Here are Theodore's top 3 AI tools for faith-driven solopreneurs: one for content creation, one for email automation, and one for client management. All free or low-cost. All simple to set up.

You don't need 20 tools. You need 3 that work together. Theodore has tested dozens and narrowed it down to the essentials that save the most time with the least complexity. Check the classroom for the full walkthrough and setup guides. These tools alone can save you 15-20 hours per week.`,
    long: `Here are Theodore's top 3 AI tools for faith-driven solopreneurs: one for content creation, one for email automation, and one for client management. All free or low-cost. All simple to set up.

You don't need 20 tools. You need 3 that work together seamlessly. Theodore has tested dozens of tools over his 20+ years in IT and narrowed it down to the essentials that save the most time with the least complexity.

Check the classroom for the full walkthrough and setup guides. These tools alone can save you 15-20 hours per week. If you're still doing everything manually, this is your sign to upgrade. Drop questions in the comments and the community will help you get set up.`,
  },
  {
    id: 28,
    tab: 'skool',
    category: 'Faith Framework',
    title: `Faith framework: The Proverbs 31 entrepreneur model`,
    short: `The Proverbs 31 model isn't just about virtue — it's a business blueprint. Planning, execution, multiple income streams, excellent service, and generosity. Let's break down what Kingdom entrepreneurship really looks like.`,
    medium: `The Proverbs 31 model isn't just about virtue — it's a business blueprint. Planning, execution, multiple income streams, excellent service, and generosity. Let's break down what Kingdom entrepreneurship really looks like.

This framework covers everything: identifying opportunity, investing wisely, delivering quality, serving your community, and building a legacy that outlasts you. Inside PPB, Theodore uses this model to ground all our business strategies in biblical wisdom. Faith and business aren't separate lanes — they're the same road.`,
    long: `The Proverbs 31 model isn't just about virtue — it's a business blueprint. Planning, execution, multiple income streams, excellent service, and generosity. Let's break down what Kingdom entrepreneurship really looks like.

This framework covers everything: identifying opportunity, investing wisely, delivering quality, serving your community, and building a legacy that outlasts you. It's strategic, faithful, and action-oriented — exactly what a modern faith-driven entrepreneur needs.

Inside Purpose & Profit Builders, Theodore uses this model to ground all our business strategies in biblical wisdom. When you build with Kingdom principles, you don't just make money — you make impact. Check the classroom for the full Faith Framework breakdown and start applying it to your business today.`,
  },
  {
    id: 29,
    tab: 'skool',
    category: 'Sprint Recap',
    title: `Sprint recap: What the community built in 7 days`,
    short: `Here's what our PPB community accomplished in the last 7-day sprint: new offers launched, content systems built, first clients landed, and AI workflows activated. The results of focused, faith-driven action are real.`,
    medium: `Here's what our PPB community accomplished in the last 7-day sprint: new offers launched, content systems built, first clients landed, and AI workflows activated. The results of focused, faith-driven action are real.

Each sprint focuses on one key area — this week was all about client acquisition. Members committed to specific daily actions, reported progress, and supported each other through the challenges. The sprint model works because it creates urgency without overwhelm. Short bursts of focused effort compound into massive results.`,
    long: `Here's what our PPB community accomplished in the last 7-day sprint: new offers launched, content systems built, first clients landed, and AI workflows activated. The results of focused, faith-driven action are real.

Each sprint focuses on one key area — this week was all about client acquisition. Members committed to specific daily actions, reported progress, and supported each other through the challenges. The sprint model works because it creates urgency without overwhelm.

Short bursts of focused effort compound into massive results over time. If you missed this sprint, don't worry — a new one starts every week inside Purpose & Profit Builders. Join at skool.com/thezoexway and catch the next wave.`,
  },
  {
    id: 30,
    tab: 'skool',
    category: 'Monthly Goals',
    title: `Monthly goal setting: Map your March targets`,
    short: `New month, new targets. Take 10 minutes to set your top 3 business goals for the month. Post them below and let the community help you stay on track. Written goals are 42% more likely to be achieved.`,
    medium: `New month, new targets. Take 10 minutes to set your top 3 business goals for the month. Post them below and let the community help you stay on track. Written goals are 42% more likely to be achieved.

Keep your goals specific and measurable. Not "grow my business" but "publish 12 pieces of content and have 5 sales conversations." Theodore reviews every goal posted and gives feedback to help you make them more actionable. Don't skip this — it's the foundation for a productive month.`,
    long: `New month, new targets. Take 10 minutes to set your top 3 business goals for the month. Post them below and let the community help you stay on track. Written goals are 42% more likely to be achieved.

Keep your goals specific and measurable. Not "grow my business" but "publish 12 pieces of content and have 5 sales conversations." Specificity creates clarity, and clarity creates action. Vague goals produce vague results.

Theodore reviews every goal posted and gives feedback to help you make them more actionable. At the end of the month, we'll do a review thread to celebrate progress and recalibrate. This simple rhythm of set, execute, review has been a game-changer for PPB members. Post your goals below.`,
  },
  {
    id: 31,
    tab: 'skool',
    category: 'Community Spotlight',
    title: `Community spotlight: Builders making moves this month`,
    short: `Every month we highlight PPB members who are showing up, doing the work, and inspiring the community. This isn't about perfection — it's about faithfulness. Here are this month's standout builders.`,
    medium: `Every month we highlight PPB members who are showing up, doing the work, and inspiring the community. This isn't about perfection — it's about faithfulness. Here are this month's standout builders.

These members posted consistently, engaged with others, completed challenges, and took action on their business goals. They represent what Purpose & Profit Builders is all about — faith-driven entrepreneurs building with integrity and supporting each other along the way. Congratulations to this month's spotlighted builders!`,
    long: `Every month we highlight PPB members who are showing up, doing the work, and inspiring the community. This isn't about perfection — it's about faithfulness. Here are this month's standout builders.

These members posted consistently, engaged with others, completed challenges, and took action on their business goals. Some landed their first clients. Some launched new offers. Some simply showed up every single day when it would have been easier to quit.

They represent what Purpose & Profit Builders is all about — faith-driven entrepreneurs building with integrity and supporting each other along the way. If you want to be spotlighted next month, the recipe is simple: show up, take action, and engage with the community. We see you. We celebrate you. Keep building.`,
  },
];

import { CaseStudy, Testimonial, ServiceItem, PricingPlan, BlogArticle, AuditRecommendation, ClientProfile, PortalMessage } from '../types';
import ashleyHeadshot from '../assets/images/ashley_lalfam_headshot_1785719693060.jpg';

export const FOUNDER_INFO = {
  name: 'Ashley Lalfam',
  title: 'Founder & SaaS Payment Recovery Specialist',
  avatar: ashleyHeadshot,
  bio: 'Ashley has spent over 7 years optimizing subscription payment rails, gateway retry schedules, and dunning automation for scaling SaaS companies. Prior to founding ChurnFix Advisory, Ashley analyzed over $180M in subscription recurring billing logs across Stripe, Paddle, and Chargebee.',
  mission: 'To eliminate involuntary churn for high-growth SaaS companies by turning failed payment retries into predictable, automated revenue recovery.',
  credentials: [
    '7+ Years Subscription Billing Engineering',
    '$24M+ Total Recovered Involuntary MRR',
    'Specialized in Stripe, Paddle, Chargebee, Recurly',
    'Audited 120+ Scale-up SaaS Payment Architectures'
  ]
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'devtech-inc',
    title: 'Recovered $42,500/mo Involuntary MRR Loss for Series A Developer Platform',
    clientName: 'DevTech Inc.',
    industry: 'Developer Tools & Infrastructure',
    stage: 'Series A ($3.2M ARR)',
    mrrBefore: 265000,
    failureRateBefore: '9.8%',
    failureRateAfter: '2.1%',
    mrrRecovered: '$42,500/mo',
    timeframe: '45 Days',
    quote: 'Ashley uncovered that 60% of our payment failures were soft declines occurring on bank billing cycles. Implementing smart retry logic and card updater webhooks immediately saved $42K/mo without bothering our developers.',
    authorName: 'Marcus Vance',
    authorRole: 'VP of Growth & Operations',
    challenge: 'DevTech Inc. was losing nearly 10% of monthly renewals due to expired corporate debit cards and rigid 3-day default retry schedules. Engineering was too busy with product features to build dunning systems.',
    solution: [
      'Audited 12 months of Stripe webhook event logs',
      'Configured automated Smart Retry windows mapped to card issuer paydays',
      'Deployed friction-free 1-click in-app update modals via custom webhooks',
      'Established pre-expiration card updater triggers with issuer network integrations'
    ],
    results: [
      'Involuntary churn dropped from 9.8% to 2.1%',
      '$42,500 monthly recurring revenue immediately recovered',
      'LTV increased by 22% across developer tier accounts'
    ],
    gateway: 'Stripe Billing'
  },
  {
    id: 'cloudflow-b2b',
    title: 'Reduced Payment Decline Rate by 76% for B2B Workflow SaaS',
    clientName: 'CloudFlow Solutions',
    industry: 'B2B Productivity SaaS',
    stage: 'Scale-up ($8.5M ARR)',
    mrrBefore: 710000,
    failureRateBefore: '11.4%',
    failureRateAfter: '2.7%',
    mrrRecovered: '$68,000/mo',
    timeframe: '60 Days',
    quote: 'Involuntary churn was quietly draining our top-line expansion. ChurnFix replaced our aggressive 4-email dunning spam with intelligent card updater flows. Our finance team was blown away.',
    authorName: 'Elena Rostova',
    authorRole: 'Head of Revenue Operations',
    challenge: 'CloudFlow was suffering from high corporate credit card limit declines and outdated customer contact info. Customers were angry about sudden account lockouts caused by silent payment failures.',
    solution: [
      'Implemented custom dunning email sequences tailored for B2B finance departments',
      'Added automated grace period buffers with priority notifications',
      'Optimized retry algorithms to match European and North American banking settlement hours',
      'Integrated Chargebee fallback payment method collection'
    ],
    results: [
      '76% drop in overall payment decline rates',
      'Net retention rate improved from 104% to 112%',
      '$68,000 monthly recurring revenue protected'
    ],
    gateway: 'Chargebee + Stripe'
  },
  {
    id: 'apihub-scale',
    title: 'Rescued 310 Subscription Accounts in 30 Days for API Infrastructure Platform',
    clientName: 'APIHub Tech',
    industry: 'API & Data Services',
    stage: 'Seed ($1.1M ARR)',
    mrrBefore: 92000,
    failureRateBefore: '14.2%',
    failureRateAfter: '3.4%',
    mrrRecovered: '$11,800/mo',
    timeframe: '30 Days',
    quote: 'As a lean team, we had zero bandwidth for payment recovery logic. Ashley provided a plug-and-play dunning strategy that turned $11.8K of lost billing into active ARR in our first month.',
    authorName: 'David Chen',
    authorRole: 'Founder & CEO',
    challenge: 'APIHub was experiencing rapid user acquisition, but losing 14% of monthly renewals to expired virtual cards and soft bank decline codes.',
    solution: [
      'Configured automated card updater integration via Paddle',
      'Built custom retry schedule with exponential backoff and localized currency retry logic',
      'Designed self-service portal for updating card credentials without password log-in'
    ],
    results: [
      '310 accounts saved in the first 30 days',
      'Involuntary churn reduced to 3.4%',
      'Recoup cost of ChurnFix Advisory in less than 7 days'
    ],
    gateway: 'Paddle'
  }
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-1',
    name: 'Sarah Jenkins',
    role: 'CEO & Founder',
    company: 'SaaSMetrics Pro',
    content: 'Ashley from ChurnFix is hands-down the most knowledgeable payment recovery specialist in the SaaS space. The audit gave us complete visibility into why payments were failing and saved us $24,000 in monthly recurring revenue in 30 days.',
    metric: '+$24k MRR Recovered',
    rating: 5
  },
  {
    id: 'test-2',
    name: 'Michael Thorne',
    role: 'VP of Finance',
    company: 'DataStream Cloud',
    content: 'We thought our payment retry settings in Stripe were fine out of the box. Ashley showed us how default settings were failing on 40% of soft declines. The ROI on ChurnFix was 18x our investment.',
    metric: '18x ROI Delivered',
    rating: 5
  },
  {
    id: 'test-3',
    name: 'Karen Alvarezo',
    role: 'Head of Growth',
    company: 'LogiFlow Software',
    content: 'The Client Portal gave our team clear step-by-step technical blueprints. We implemented the recommended smart retry intervals and card updater webhooks without breaking a single line of production code.',
    metric: '72% Decline Reduction',
    rating: 5
  }
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'audit',
    title: 'Payment Recovery Audit',
    shortDesc: 'Complete diagnostic analysis of your billing gateway logs, payment decline codes, and dunning sequences to pinpoint lost revenue.',
    fullDesc: 'Our flagship deep-dive audit inspects 6-24 months of historical subscription transaction logs across Stripe, Paddle, Chargebee, or Recurly. We categorize decline codes (soft vs hard), evaluate default retry windows, and deliver a high-impact roadmap for immediate MRR recovery.',
    iconName: 'SearchCheck',
    deliverables: [
      'Decline Code Forensic Breakdown (Soft Declines, Card Expirations, Insufficient Funds)',
      'Gateway & Dunning Audit Report',
      'Custom Smart Retry Schedule Matrix',
      'Quantified Revenue Recovery Opportunity ($ per month)',
      '60-Minute Executive & Engineering Walkthrough Call'
    ],
    targetAudience: 'SaaS companies doing $20k to $1M+ MRR experiencing >4% involuntary churn.',
    expectedRoi: '3x - 10x ROI within 30-60 days'
  },
  {
    id: 'smart-dunning',
    title: 'Smart Dunning Strategy',
    shortDesc: 'Behavioral and friction-free payment recovery communications designed specifically for SaaS customer retention.',
    fullDesc: 'Replace obnoxious, generic billing failure emails with contextual, brand-aligned dunning experiences. We build high-converting email sequences, in-app billing modals, SMS alerts, and magic-link payment pages.',
    iconName: 'MailCheck',
    deliverables: [
      'High-converting 4-part Dunning Email Sequences (B2B & B2C templates)',
      'Magic-Link Payment Update UX Specification (Zero-friction card update)',
      'In-App Toast & Banner Billing Notification Triggers',
      'Segmentation Rules for High-Value Accounts vs Standard Plans'
    ],
    targetAudience: 'SaaS teams looking to improve dunning click-through & payment recovery rates.',
    expectedRoi: '35% to 60% uplift in dunning conversion'
  },
  {
    id: 'retry-optimization',
    title: 'Retry Logic & Gateway Tuning',
    shortDesc: 'Data-driven algorithmic retry schedules aligned with card issuer network behaviors and customer billing cycles.',
    fullDesc: 'Default gateway retries retry payments at random intervals or consecutive days—often triggering fraud flags or bank limits. We design custom retry windows based on issuer behavior, paydays, and card type.',
    iconName: 'RefreshCw',
    deliverables: [
      'Algorithmic Retry Timing Blueprint (Days +1, +3, +7, +14, +21 optimization)',
      'Soft vs Hard Decline Handling Rules',
      '3D Secure (3DS) & SCA Step-Up Authentication Workflow Config',
      'Multi-currency Settlement Retry Parameters'
    ],
    targetAudience: 'Companies using Stripe Billing, Chargebee, Paddle, or Recurly.',
    expectedRoi: '25% - 45% reduction in uncollected invoices'
  },
  {
    id: 'card-updater',
    title: 'Card Updater & Token Strategy',
    shortDesc: 'Automated credit card token refresh workflows that prevent payment failures before card expiration dates occur.',
    fullDesc: 'Stop waiting for cards to fail! We implement automated Account Card Updater (AU) webhook protocols that interface directly with Visa, Mastercard, and issuer networks to refresh card details silently.',
    iconName: 'CreditCard',
    deliverables: [
      'Pre-Expiration Webhook Alert Protocols (30/60 days prior)',
      'Visa/Mastercard Account Updater Network Configuration',
      'Tokenization & Fallback Payment Method Setup',
      'Card Lifecycle Event Tracking Dashboard Setup'
    ],
    targetAudience: 'SaaS with high consumer credit card or annual subscription renewals.',
    expectedRoi: 'Prevents up to 80% of card expiration churn'
  },
  {
    id: 'billing-optimization',
    title: 'Billing Infrastructure Optimization',
    shortDesc: 'Full stack alignment of webhooks, subscription status states, grace periods, and merchant account settings.',
    fullDesc: 'Ensure your app permissions, user access grace periods, invoice PDF generators, and gateway webhooks work seamlessly without locking out legitimate customers prematurely or giving away free service indefinitely.',
    iconName: 'Cpu',
    deliverables: [
      'Grace Period Access Architecture (Pro-rated access vs strict lockout)',
      'Merchant Category Code (MCC) & Issuer Authorization Rate Tuning',
      'Webhook Failure Fallback & Retry Queue Design',
      'Multi-Gateway Failover Architecture Setup'
    ],
    targetAudience: 'Scaling SaaS products with complex billing engines or global customers.',
    expectedRoi: 'Eliminates revenue leakage and customer support friction'
  },
  {
    id: 'retainer-consulting',
    title: 'Managed Payment Recovery Retainer',
    shortDesc: 'Ongoing monthly payment health monitoring, retry tuning, and dunning management by Ashley Lalfam.',
    fullDesc: 'Let ChurnFix act as your dedicated Fractional Head of Payment Recovery. We monitor weekly decline rates, conduct ongoing retry experiments, test email copy, and ensure maximum MRR retention every month.',
    iconName: 'ShieldCheck',
    deliverables: [
      'Weekly Involuntary Churn & Recovery Performance Monitoring',
      'Continuous A/B Testing on Dunning Sequences & Subject Lines',
      'Monthly Executive Recovery Statements ($ MRR Saved Report)',
      'Priority Async Slack / Portal Communication with Founder Ashley Lalfam'
    ],
    targetAudience: 'Growth & Enterprise SaaS businesses with $100k+ MRR seeking hands-off management.',
    expectedRoi: 'Guaranteed positive ROI month after month'
  }
];

export const PRICING_PLANS: PricingPlan[] = [
  {
    id: 'audit-plan',
    name: 'Payment Recovery Audit',
    tagline: 'Deep diagnostic analysis & custom recovery blueprint for scaling SaaS.',
    price: '$2,450',
    period: 'one-time',
    popular: true,
    features: [
      '6-24 Months Transaction Log Forensic Analysis',
      'Decline Code & Gateway Health Audit Report',
      'Custom Smart Retry Matrix & Timing Specs',
      '4-Part Dunning Email Copy templates (B2B/B2C)',
      'Card Updater & Webhook Strategy Specification',
      '60-Minute Strategy & Walkthrough Session with Founder Ashley Lalfam',
      '30 Days Client Portal Access & Implementation Support',
      '100% ROI Guarantee (If we don\'t identify 3x the audit cost in recoverable revenue, full refund)'
    ],
    idealFor: 'SaaS products ($20k–$300k MRR) looking to immediately diagnose and fix revenue leaks.',
    ctaText: 'Book Payment Recovery Audit',
    guarantee: '3x Recoverable Revenue Guarantee'
  },
  {
    id: 'implementation-plan',
    name: 'Audit + Done-For-You Implementation',
    tagline: 'We audit, build, and configure your retry logic and dunning workflows.',
    price: '$5,800',
    period: 'one-time',
    popular: false,
    features: [
      'Everything in Payment Recovery Audit',
      'Direct Gateway Configuration (Stripe, Chargebee, Paddle, Recurly)',
      'Custom Webhook & Smart Retry Rule Setup',
      'Zero-Friction In-App Card Update Portal Integration',
      'Dunning Email Sequence Setup in your ESP (Klaviyo, Customer.io, Hubspot)',
      'Live End-to-End Test Transactions & Webhook Verification',
      '60 Days Dedicated Direct Portal Support with Ashley Lalfam',
      'Staff Training & Engineering Handoff Documentation'
    ],
    idealFor: 'SaaS teams who want the entire payment recovery stack built and tested for them.',
    ctaText: 'Get Done-For-You Setup',
    guarantee: 'Full System Implementation Guarantee'
  },
  {
    id: 'managed-retainer',
    name: 'Managed Recovery Retainer',
    tagline: 'Continuous payment health monitoring and revenue optimization.',
    price: '$1,950',
    period: '/month + % of recovered MRR',
    popular: false,
    features: [
      'Continuous Payment Health Monitoring & Weekly Log Review',
      'Ongoing Smart Retry & Decline Code Optimization Experiments',
      'Dunning Email A/B Testing & Copy Refinement',
      'Monthly Executive MRR Recovery Reports',
      'Direct Dedicated Slack Channel & Portal Messaging with Founder',
      'Quarterly Gateway & Issuer Network Optimization',
      'Priority Emergency Billing Failure Response'
    ],
    idealFor: 'Scale-ups ($100k+ MRR) requiring active managed protection against involuntary churn.',
    ctaText: 'Apply for Retainer',
    guarantee: 'Cancel Anytime • Pay for Results'
  }
];

export const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 'why-default-stripe-retries-fail',
    slug: 'why-default-stripe-retries-fail',
    title: 'Why Default Stripe Smart Retries Are Missing 40% of Recoverable SaaS Revenue',
    excerpt: 'Default gateway settings retry payments on generic intervals without considering bank settlement windows, card issuer limits, or consumer paydays. Here is how to fix it.',
    content: `
When SaaS founders launch on Stripe, Paddle, or Chargebee, they usually leave the "Smart Retries" toggle on default settings. On paper, default retries sound great: the gateway uses machine learning to retry failed payments.

However, after analyzing over $180M in subscription transaction logs, we discovered a glaring flaw: **default smart retries fail on nearly 40% of recoverable soft declines**.

### The Problem with Default Gateway Retry Windows

1. **Consecutive Day Retries**: Most default algorithms retry failed payments on Day +1, Day +3, and Day +5. If a customer's debit card failed due to insufficient funds mid-month, retrying 24 hours later almost guarantees a second decline—and increases bank fraud risk scores.
2. **Ignoring Payday Cycles**: In the U.S., Canada, and Europe, consumer and corporate payrolls clear on the 1st, 15th, or last Friday of the month. A payment that fails on the 10th will consistently fail on the 11th, 13th, and 15th if retried too early.
3. **Soft Declines vs. Hard Declines**: Gateways often treat generic decline codes (such as \`generic_decline\` or \`do_not_honor\`) as hard failures when they are actually temporary bank authorization freezes.

### The 4-Step Smart Retry Framework

To maximize payment recovery without bothering your engineering team, structure your retry windows like this:

- **Retry #1 (Day +1 at 03:00 AM local issuer time)**: Catches temporary server timeouts or daily limit resets.
- **Retry #2 (Day +4)**: Allows time for ACH/bank transfers or overdraft buffers to process.
- **Retry #3 (Day +9)**: Aligns with weekly or bi-weekly payroll windows.
- **Retry #4 (Day +16)**: Final attempt before subscription cancellation, triggered alongside urgent in-app dunning banners.

### Results You Can Expect

By switching from default 3-day retries to an issuer-aware retry schedule, SaaS companies typically see a **25% to 45% reduction in uncollected subscription invoices** within 30 days.
    `,
    category: 'Retry Logic',
    author: {
      name: 'Ashley Lalfam',
      role: 'Founder & SaaS Payment Recovery Specialist',
      avatar: ashleyHeadshot
    },
    publishedAt: '2026-07-14',
    readTime: '6 min read',
    featured: true,
    tags: ['Stripe', 'Retry Logic', 'Involuntary Churn', 'Dunning']
  },
  {
    id: 'dunning-emails-that-actually-convert',
    slug: 'dunning-emails-that-actually-convert',
    title: 'Anatomy of a High-Converting B2B Dunning Email Sequence',
    excerpt: 'Stop sending passive-aggressive "Your credit card failed" template emails. Learn the exact 4-part email framework that recovers 55%+ of failed subscription payments.',
    content: `
Most dunning emails are awful. They sound like automated debt collection notices sent by cold robots: *"Your payment of $299 for Invoice #1042 failed. Please update your billing information immediately or your access will be terminated."*

When a B2B SaaS buyer receives this, three things happen:
1. They ignore it because it looks like spam or phishing.
2. They forward it to a busy finance manager who puts it on a low-priority task list.
3. Your account gets locked out, angering the end user who had no idea the corporate card expired.

### The 4-Part High-Converting Dunning Blueprint

#### Email 1: Gentle Heads-Up (Send 1 Hour After First Soft Decline)
- **Subject**: Quick update regarding your [AppName] account
- **Tone**: Helpful, friendly, non-alarmist.
- **Key Element**: Direct 1-click magic link allowing the user to update their card without logging in.

#### Email 2: User Value Reminder (Send Day +4)
- **Subject**: Action needed: Keep [AppName] running smoothly
- **Tone**: Focused on continuous productivity and team usage.
- **Key Element**: Highlight active project data or recent usage stats so they understand what is at stake.

#### Email 3: Urgent Finance Escalation (Send Day +9)
- **Subject**: Urgent: Payment authorization issue for [CompanyName]
- **Tone**: Formal, direct, professional.
- **Key Element**: Provide PDF invoice copy and alternative payment methods (ACH/Wire or new card link).

#### Email 4: Final Grace Period Notice (Send Day +15)
- **Subject**: Final Notice: Your [AppName] workspace will be paused in 48 hours
- **Tone**: Calm, respectful, clear timeline.
- **Key Element**: Reassure that no data will be lost, and account can be reactivated instantly upon card update.

### Rule of Thumb
Never lock users out instantly on day 1 of a payment failure. Provide a 7 to 14-day grace period with subtle top-banner notifications inside your application.
    `,
    category: 'Dunning',
    author: {
      name: 'Ashley Lalfam',
      role: 'Founder & SaaS Payment Recovery Specialist',
      avatar: ashleyHeadshot
    },
    publishedAt: '2026-06-28',
    readTime: '8 min read',
    featured: false,
    tags: ['Dunning Email', 'B2B SaaS', 'Customer Retention']
  },
  {
    id: 'demystifying-involuntary-churn',
    slug: 'demystifying-involuntary-churn',
    title: 'Voluntary vs Involuntary Churn: The Silent Revenue Killer in Subscription SaaS',
    excerpt: 'Up to 40% of total SaaS customer churn is completely involuntary. Here is how to distinguish voluntary cancellation from payment failure and fix it.',
    content: `
When SaaS teams look at their monthly churn rate (e.g. 5% monthly churn), they usually assume 5% of their customers got tired of the product, switched to a competitor, or decided it was too expensive.

However, in over 70% of SaaS audits we conduct, **1.5% to 2.5% of that churn is purely involuntary**.

### What Is Involuntary Churn?

Involuntary churn occurs when a customer **wants** to keep paying for your product, but their subscription is canceled automatically because:
- Their credit card expired (average card life is 3 years, meaning ~3% of your user base gets new cards every single month!).
- Their bank issued a soft decline due to daily spending limits or anti-fraud checks.
- Their company changed corporate card providers.
- A virtual card number generated for a trial expired.

### Why Involuntary Churn is the Easiest Revenue to Fix

Fixing voluntary churn requires product roadmap overhauls, customer onboarding changes, and feature enhancements that take months of engineering time.

Fixing involuntary churn requires **fixing billing rails**, which can be done in days. Recovering $20,000/mo in involuntary churn has the exact same impact on your ARR as hiring a new AE to close $240,000 in new bookings.
    `,
    category: 'SaaS Metrics',
    author: {
      name: 'Ashley Lalfam',
      role: 'Founder & SaaS Payment Recovery Specialist',
      avatar: ashleyHeadshot
    },
    publishedAt: '2026-05-19',
    readTime: '5 min read',
    featured: false,
    tags: ['Involuntary Churn', 'SaaS Growth', 'MRR Recovery']
  }
];

export const DEMO_CLIENT_PROFILE: ClientProfile = {
  id: 'devtech-demo',
  companyName: 'DevTech Inc.',
  contactName: 'Marcus Vance',
  email: 'marcus@devtech.io',
  role: 'VP of Operations',
  avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=150',
  mrr: 285000,
  involuntaryChurnRate: 2.1,
  gateway: 'Stripe Billing',
  auditStatus: 'In Progress',
  recoveredMrr: 42500,
  potentialMrr: 58000,
  joinedDate: '2026-06-10'
};

export const INITIAL_RECOMMENDATIONS: AuditRecommendation[] = [
  {
    id: 'rec-1',
    title: 'Enable Stripe Automatic Account Card Updater Webhooks',
    category: 'Card Updater',
    impact: 'Critical',
    effort: 'Easy Quick Win',
    estimatedRecovery: '$18,500/mo',
    status: 'Implemented',
    description: 'Configure automated card updater webhooks to automatically refresh expired credit card tokens directly from Visa and Mastercard issuer networks prior to monthly renewal billing dates.',
    actionSteps: [
      'Log into Stripe Dashboard > Settings > Billing > Customer Emails & Card Updater',
      'Enable Automatic Card Updater notifications',
      'Subscribe webhook endpoint to customer.source.updated and payment_method.updated events'
    ]
  },
  {
    id: 'rec-2',
    title: 'Replace Default 3-Day Retry Schedule with Exponential Backoff Matrix',
    category: 'Retry Logic',
    impact: 'Critical',
    effort: 'Moderate',
    estimatedRecovery: '$14,200/mo',
    status: 'In Progress',
    description: 'Shift from default retry intervals (Days 1, 3, 5) to custom issuer-aware windows (Days +1, +4, +9, +16) to align with banking paydays and soft decline cooldowns.',
    actionSteps: [
      'Set custom retry schedule in Stripe / Chargebee billing rules',
      'Separate soft decline handling from hard fraud decline rules',
      'Configure 3:00 AM local bank settlement retry times'
    ]
  },
  {
    id: 'rec-3',
    title: 'Deploy Friction-Free Magic-Link Card Update UX',
    category: 'Billing UX',
    impact: 'High',
    effort: 'Technical Integration',
    estimatedRecovery: '$9,800/mo',
    status: 'Pending',
    description: 'Implement secure, 1-click magic link payment update pages so corporate buyers can update their credit card details directly from dunning emails without needing full password authentication.',
    actionSteps: [
      'Generate secure 72-hour signed JWT billing update tokens',
      'Build minimal card update React modal with instant Stripe Elements validation',
      'Test end-to-end mobile responsiveness'
    ]
  },
  {
    id: 'rec-4',
    title: 'Implement B2B Finance Department Escalation Sequence',
    category: 'Dunning Sequence',
    impact: 'Medium',
    effort: 'Easy Quick Win',
    estimatedRecovery: '$6,500/mo',
    status: 'Implemented',
    description: 'Send Email #3 in dunning sequences directly to CC billing email addresses and finance team contacts with attached PDF invoice copies.',
    actionSteps: [
      'Add secondary invoice email field to signup billing form',
      'Configure dunning email workflow in Customer.io / Hubspot',
      'Include downloadable PDF invoice attachment in Day +9 notice'
    ]
  }
];

export const INITIAL_MESSAGES: PortalMessage[] = [
  {
    id: 'm1',
    sender: 'Ashley Lalfam (Founder)',
    role: 'SaaS Payment Recovery Specialist',
    avatar: ashleyHeadshot,
    text: 'Welcome to your ChurnFix Advisory Client Portal, Marcus! I have completed the forensic review of your Stripe transaction logs from Q2. We identified a total of $58,000/mo in uncollected subscription invoices due to soft decline retry timing.',
    timestamp: 'Yesterday at 10:15 AM',
    isAdvisor: true
  },
  {
    id: 'm2',
    sender: 'Marcus Vance',
    text: 'Thanks Ashley! The $42.5K/mo recovered in our first phase was incredible. Our finance team was shocked by how many soft declines were just sitting there.',
    timestamp: 'Yesterday at 11:30 AM',
    isAdvisor: false
  },
  {
    id: 'm3',
    sender: 'Ashley Lalfam (Founder)',
    role: 'SaaS Payment Recovery Specialist',
    avatar: ashleyHeadshot,
    text: 'Awesome to hear! Next up is implementing Recommendation #3 (the magic-link payment update UX). I have attached the technical specifications in your Downloads tab.',
    timestamp: 'Today at 09:05 AM',
    isAdvisor: true,
    attachments: [
      { name: 'Magic_Link_Card_Update_Spec.pdf', size: '2.4 MB', url: '#' }
    ]
  }
];

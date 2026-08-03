export type NavigationPage = 
  | 'home' 
  | 'about' 
  | 'services' 
  | 'industries' 
  | 'case-studies' 
  | 'pricing' 
  | 'resources' 
  | 'blog-post'
  | 'faq' 
  | 'contact' 
  | 'book-audit' 
  | 'privacy' 
  | 'terms' 
  | 'portal';

export type PortalTab = 
  | 'dashboard' 
  | 'audit-reports' 
  | 'recommendations' 
  | 'revenue-insights' 
  | 'messages' 
  | 'schedule' 
  | 'downloads' 
  | 'settings' 
  | 'ai-assistant';

export interface ClientProfile {
  id: string;
  companyName: string;
  contactName: string;
  email: string;
  role: string;
  avatarUrl?: string;
  mrr: number;
  involuntaryChurnRate: number;
  gateway: string;
  auditStatus: 'Pending Review' | 'In Progress' | 'Audit Complete' | 'Monitoring';
  recoveredMrr: number;
  potentialMrr: number;
  joinedDate: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  clientName: string;
  industry: string;
  stage: string;
  mrrBefore: number;
  failureRateBefore: string;
  failureRateAfter: string;
  mrrRecovered: string;
  timeframe: string;
  quote: string;
  authorName: string;
  authorRole: string;
  challenge: string;
  solution: string[];
  results: string[];
  gateway: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image?: string;
  content: string;
  metric: string;
  rating: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  fullDesc: string;
  iconName: string;
  deliverables: string[];
  targetAudience: string;
  expectedRoi: string;
}

export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period: string;
  popular?: boolean;
  features: string[];
  idealFor: string;
  ctaText: string;
  guarantee: string;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: 'Dunning' | 'Billing Infrastructure' | 'Retry Logic' | 'Card Updater' | 'Case Study' | 'SaaS Metrics';
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  readTime: string;
  featured?: boolean;
  tags: string[];
}

export interface AuditRecommendation {
  id: string;
  title: string;
  category: 'Retry Logic' | 'Dunning Sequence' | 'Card Updater' | 'Billing UX' | 'Gateway Settings';
  impact: 'Critical' | 'High' | 'Medium' | 'Low';
  effort: 'Easy Quick Win' | 'Moderate' | 'Technical Integration';
  estimatedRecovery: string;
  status: 'Pending' | 'In Progress' | 'Implemented';
  description: string;
  actionSteps: string[];
}

export interface PortalMessage {
  id: string;
  sender: string;
  role?: string;
  avatar?: string;
  text: string;
  timestamp: string;
  isAdvisor: boolean;
  attachments?: { name: string; size: string; url: string }[];
}

export interface AuditBookingForm {
  fullName: string;
  email: string;
  companyName: string;
  phoneNumber?: string;
  website: string;
  subscriptionPlatform?: string;
  mrrRange: string;
  monthlyActiveCustomers?: string;
  currentGateway: string;
  estimatedInvoluntaryChurn: string;
  primaryPainPoint: string;
  notes?: string;
  dateSubmitted?: string;
  timeSubmitted?: string;
}

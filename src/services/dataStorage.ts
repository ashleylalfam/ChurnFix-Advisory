import { PortalMessage, AuditRecommendation } from '../types';
import { UserAccount } from './auth';
import ashleyHeadshot from '../assets/images/ashley_lalfam_headshot_1785719693060.jpg';

export interface UserDataStore {
  messages: PortalMessage[];
  chatHistory: { role: 'user' | 'model'; text: string }[];
  recommendations: AuditRecommendation[];
  auditReports: { id: string; title: string; date: string; status: string; recoveryPotential: string; fileName?: string }[];
  meetings: { id: string; title: string; date: string; time: string; advisor: string; status: string }[];
  notifications: { id: string; title: string; text: string; date: string; read: boolean }[];
}

const getStorageKey = (userId: string) => `churnfix_user_data_v2_${userId}`;

export const DEFAULT_WELCOME_MESSAGE: PortalMessage = {
  id: 'welcome-ashley-01',
  sender: 'Ashley Lalfam (Founder)',
  role: 'SaaS Payment Recovery Specialist',
  avatar: ashleyHeadshot,
  text: "Welcome to ChurnFix Advisory. I'm Ashley. I'm here to help you identify payment recovery opportunities and reduce involuntary churn. Feel free to ask me anything or upload your payment data to get started.",
  timestamp: 'Just now',
  isAdvisor: true
};

export const getDefaultRecommendations = (gateway: string = 'Stripe'): AuditRecommendation[] => [
  {
    id: 'rec-01',
    title: 'Configure Account Automatic Card Updater Webhooks',
    category: 'Card Updater',
    impact: 'Critical',
    effort: 'Easy Quick Win',
    estimatedRecovery: '+$18,500/mo',
    status: 'Pending',
    description: `Subscribe to ${gateway} automatic card updater webhooks to capture re-issued customer cards prior to subscription renewal cycles.`,
    actionSteps: [
      `Enable ${gateway} Account Updater in Billing Settings`,
      'Register webhook endpoint `/api/webhooks/card-update`',
      'Auto-update customer payment method tokens without customer intervention'
    ]
  },
  {
    id: 'rec-02',
    title: 'Shift Retry Schedule to Smart Exponential Backoff',
    category: 'Retry Logic',
    impact: 'High',
    effort: 'Moderate',
    estimatedRecovery: '+$14,200/mo',
    status: 'In Progress',
    description: 'Replace standard 24-hour retries with optimized days +1, +4, +9, +16 backoff to align with payroll cycles and card limit resets.',
    actionSteps: [
      'Disable gateway default daily retry rule',
      'Set retry intervals: Day 1, Day 4, Day 9, Day 16',
      'Enable soft-decline vs hard-decline routing logic'
    ]
  },
  {
    id: 'rec-03',
    title: 'Implement Frictionless 1-Click Card Update Magic Links',
    category: 'Dunning Sequence',
    impact: 'High',
    effort: 'Technical Integration',
    estimatedRecovery: '+$11,000/mo',
    status: 'Pending',
    description: 'Allow expired card subscribers to update billing details via secure pre-authenticated magic links in dunning emails without requiring login.',
    actionSteps: [
      'Generate signed short-lived billing portal URLs',
      'Embed magic links in dunning email sequence #2 and #3',
      'Add mobile-optimized card update drawer'
    ]
  }
];

export const getUserDataStore = (user: UserAccount): UserDataStore => {
  try {
    const raw = localStorage.getItem(getStorageKey(user.id));
    if (!raw) {
      const initialStore: UserDataStore = {
        messages: [DEFAULT_WELCOME_MESSAGE],
        chatHistory: [],
        recommendations: getDefaultRecommendations(user.gateway),
        auditReports: [
          {
            id: `rep-${Date.now()}`,
            title: `${user.companyName} Initial Gateway Recovery Audit`,
            date: new Date().toLocaleDateString(),
            status: user.auditStatus || 'Pending Review',
            recoveryPotential: `$${Math.round(user.mrr * (user.involuntaryChurnRate / 100) * 0.65).toLocaleString()}/mo`
          }
        ],
        meetings: [],
        notifications: [
          {
            id: 'notif-1',
            title: 'Welcome to ChurnFix Portal',
            text: `Ashley Lalfam has initialized your workspace for ${user.companyName}.`,
            date: 'Today',
            read: false
          }
        ]
      };
      saveUserDataStore(user.id, initialStore);
      return initialStore;
    }
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading user data store:', err);
    return {
      messages: [DEFAULT_WELCOME_MESSAGE],
      chatHistory: [],
      recommendations: getDefaultRecommendations(user.gateway),
      auditReports: [],
      meetings: [],
      notifications: []
    };
  }
};

export const saveUserDataStore = (userId: string, store: UserDataStore) => {
  try {
    localStorage.setItem(getStorageKey(userId), JSON.stringify(store));
  } catch (err) {
    console.error('Error saving user data store:', err);
  }
};

export const addUserMessage = (userId: string, userMsgText: string, advisorReplyText: string): UserDataStore => {
  const users = [userId]; // target
  const store = getUserDataStore({ id: userId } as any);

  const userMsg: PortalMessage = {
    id: `msg-${Date.now()}`,
    sender: 'You',
    text: userMsgText,
    timestamp: 'Just now',
    isAdvisor: false
  };

  const advisorMsg: PortalMessage = {
    id: `msg-${Date.now() + 1}`,
    sender: 'Ashley Lalfam (Founder)',
    role: 'SaaS Payment Recovery Specialist',
    avatar: ashleyHeadshot,
    text: advisorReplyText,
    timestamp: 'Just now',
    isAdvisor: true
  };

  store.messages.push(userMsg, advisorMsg);
  
  // Track context history for Gemini
  store.chatHistory.push(
    { role: 'user', text: userMsgText },
    { role: 'model', text: advisorReplyText }
  );

  saveUserDataStore(userId, store);
  return store;
};

export const updateUserRecommendation = (userId: string, recId: string, status: 'Pending' | 'In Progress' | 'Implemented'): UserDataStore => {
  const store = getUserDataStore({ id: userId } as any);
  store.recommendations = store.recommendations.map(r => r.id === recId ? { ...r, status } : r);
  saveUserDataStore(userId, store);
  return store;
};

export const addScheduledMeeting = (userId: string, meeting: { title: string; date: string; time: string; advisor: string }): UserDataStore => {
  const store = getUserDataStore({ id: userId } as any);
  store.meetings.push({
    id: `mtg-${Date.now()}`,
    ...meeting,
    status: 'Confirmed'
  });
  saveUserDataStore(userId, store);
  return store;
};

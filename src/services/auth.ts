import { ClientProfile } from '../types';

export interface UserAccount extends ClientProfile {
  passwordHash: string;
  roleType: 'admin' | 'client';
}

const STORAGE_USERS_KEY = 'churnfix_users_db_v1';
const STORAGE_CURRENT_USER_KEY = 'churnfix_current_user_v1';

export const ADMIN_CREDENTIALS = {
  email: 'ashleylalfam001@gmail.com',
  password: 'Ashley@1122'
};

const DEFAULT_USERS: UserAccount[] = [
  {
    id: 'usr-admin-01',
    email: 'ashleylalfam001@gmail.com',
    passwordHash: 'Ashley@1122',
    roleType: 'admin',
    role: 'Lead Founder & Advisory Specialist',
    companyName: 'ChurnFix Advisory (Admin)',
    contactName: 'Ashley Lalfam',
    mrr: 150000,
    involuntaryChurnRate: 0,
    gateway: 'Stripe + Multi-Gateway',
    auditStatus: 'Audit Complete',
    recoveredMrr: 125000,
    potentialMrr: 150000,
    joinedDate: '2025-01-01'
  },
  {
    id: 'usr-client-01',
    email: 'marcus@devtech.io',
    passwordHash: 'password123',
    roleType: 'client',
    role: 'VP Ops',
    companyName: 'DevTech Inc.',
    contactName: 'Marcus Vance',
    mrr: 285000,
    involuntaryChurnRate: 4.8,
    gateway: 'Stripe Billing',
    auditStatus: 'Audit Complete',
    recoveredMrr: 42500,
    potentialMrr: 68000,
    joinedDate: '2025-03-15'
  },
  {
    id: 'usr-client-02',
    email: 'elena@cloudflow.io',
    passwordHash: 'password123',
    roleType: 'client',
    role: 'Head of RevOps',
    companyName: 'CloudFlow Solutions',
    contactName: 'Elena Rostova',
    mrr: 710000,
    involuntaryChurnRate: 3.5,
    gateway: 'Chargebee + Stripe',
    auditStatus: 'Audit Complete',
    recoveredMrr: 68000,
    potentialMrr: 95000,
    joinedDate: '2025-02-10'
  },
  {
    id: 'usr-client-03',
    email: 'david@apihub.tech',
    passwordHash: 'password123',
    roleType: 'client',
    role: 'Founder',
    companyName: 'APIHub Tech',
    contactName: 'David Chen',
    mrr: 92000,
    involuntaryChurnRate: 6.2,
    gateway: 'Paddle',
    auditStatus: 'In Progress',
    recoveredMrr: 11800,
    potentialMrr: 24000,
    joinedDate: '2025-04-01'
  }
];

export const getStoredUsers = (): UserAccount[] => {
  try {
    const raw = localStorage.getItem(STORAGE_USERS_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(DEFAULT_USERS));
      return DEFAULT_USERS;
    }
    const users: UserAccount[] = JSON.parse(raw);
    
    // Ensure admin account exists with updated credentials if missing
    const adminExists = users.some(u => u.email.toLowerCase() === ADMIN_CREDENTIALS.email.toLowerCase());
    if (!adminExists) {
      users.unshift(DEFAULT_USERS[0]);
      localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
    }
    return users;
  } catch (err) {
    console.error('Failed reading stored users:', err);
    return DEFAULT_USERS;
  }
};

export const saveUsers = (users: UserAccount[]) => {
  try {
    localStorage.setItem(STORAGE_USERS_KEY, JSON.stringify(users));
  } catch (err) {
    console.error('Failed saving users:', err);
  }
};

export const getCurrentUser = (): UserAccount | null => {
  try {
    const raw = localStorage.getItem(STORAGE_CURRENT_USER_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
};

export const setCurrentUser = (user: UserAccount | null) => {
  try {
    if (user) {
      localStorage.setItem(STORAGE_CURRENT_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_CURRENT_USER_KEY);
    }
  } catch (err) {
    console.error('Failed setting current user:', err);
  }
};

export const authenticateUser = (emailInput: string, passwordInput: string): { success: boolean; user?: UserAccount; error?: string } => {
  const users = getStoredUsers();
  const cleanEmail = emailInput.trim().toLowerCase();
  
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);
  if (!user) {
    return { success: false, error: 'No account registered with this email address.' };
  }

  if (user.passwordHash !== passwordInput) {
    return { success: false, error: 'Invalid password. Please double check your credentials.' };
  }

  setCurrentUser(user);
  return { success: true, user };
};

export const registerUser = (data: {
  email: string;
  password: string;
  contactName: string;
  companyName: string;
  gateway: string;
  mrr: number;
  involuntaryChurnRate: number;
}): { success: boolean; user?: UserAccount; error?: string } => {
  const users = getStoredUsers();
  const cleanEmail = data.email.trim().toLowerCase();

  if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
    return { success: false, error: 'An account with this work email already exists. Please sign in.' };
  }

  const roleType: 'admin' | 'client' = cleanEmail === ADMIN_CREDENTIALS.email.toLowerCase() ? 'admin' : 'client';

  const newUser: UserAccount = {
    id: `usr-${Date.now()}`,
    email: cleanEmail,
    passwordHash: data.password,
    roleType,
    role: roleType === 'admin' ? 'Advisory Admin' : 'SaaS Founder / Executive',
    companyName: data.companyName.trim() || 'SaaS Client',
    contactName: data.contactName.trim() || 'SaaS Leader',
    mrr: data.mrr || 50000,
    involuntaryChurnRate: data.involuntaryChurnRate || 4.5,
    gateway: data.gateway || 'Stripe Billing',
    auditStatus: 'Pending Review',
    recoveredMrr: 0,
    potentialMrr: Math.round((data.mrr || 50000) * ((data.involuntaryChurnRate || 4.5) / 100) * 0.65),
    joinedDate: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  saveUsers(users);
  setCurrentUser(newUser);

  return { success: true, user: newUser };
};

export const requestPasswordReset = (emailInput: string): { success: boolean; message: string; resetCode?: string } => {
  const users = getStoredUsers();
  const cleanEmail = emailInput.trim().toLowerCase();
  const user = users.find(u => u.email.toLowerCase() === cleanEmail);

  if (!user) {
    return { success: false, message: 'No registered user found with that email address.' };
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  return {
    success: true,
    message: `Password reset code sent to ${cleanEmail}. Use code: ${resetCode}`,
    resetCode
  };
};

export const resetUserPassword = (emailInput: string, resetCodeInput: string, newPasswordInput: string): { success: boolean; message: string } => {
  const users = getStoredUsers();
  const cleanEmail = emailInput.trim().toLowerCase();
  const userIndex = users.findIndex(u => u.email.toLowerCase() === cleanEmail);

  if (userIndex === -1) {
    return { success: false, message: 'Account not found.' };
  }

  if (newPasswordInput.length < 6) {
    return { success: false, message: 'Password must be at least 6 characters long.' };
  }

  users[userIndex].passwordHash = newPasswordInput;
  saveUsers(users);

  return { success: true, message: 'Password reset successfully! You may now sign in.' };
};

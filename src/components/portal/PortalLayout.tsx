import React from 'react';
import { PortalTab } from '../../types';
import { UserAccount } from '../../services/auth';
import { 
  LayoutDashboard, 
  FileSpreadsheet, 
  CheckSquare, 
  BarChart3, 
  MessageSquare, 
  Calendar, 
  Download, 
  Settings, 
  Sparkles, 
  LogOut, 
  ShieldCheck,
  Bell,
  Users,
  ShieldAlert
} from 'lucide-react';

interface PortalLayoutProps {
  user: UserAccount;
  activeTab: PortalTab;
  onSelectTab: (tab: PortalTab) => void;
  onLogout: () => void;
  onNavigateHome: () => void;
  children: React.ReactNode;
}

export const PortalLayout: React.FC<PortalLayoutProps> = ({
  user,
  activeTab,
  onSelectTab,
  onLogout,
  onNavigateHome,
  children
}) => {
  const isAdmin = user.roleType === 'admin';

  const baseTabs: { id: PortalTab; label: string; icon: any; badge?: string; adminOnly?: boolean }[] = [
    { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
    { id: 'audit-reports', label: 'Audit Upload', icon: FileSpreadsheet, badge: 'CSV Upload' },
    { id: 'recommendations', label: 'Action Items', icon: CheckSquare, badge: '3 Items' },
    { id: 'revenue-insights', label: 'Revenue Analytics', icon: BarChart3 },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare, badge: 'Advisor Active' },
    { id: 'ai-assistant', label: 'AI Audit Assistant', icon: Sparkles, badge: 'Gemini AI', adminOnly: true },
    { id: 'schedule', label: 'Schedule Meeting', icon: Calendar },
    { id: 'downloads', label: 'Downloads', icon: Download },
    { id: 'settings', label: 'Integrations & Settings', icon: Settings },
  ];

  const visibleTabs = baseTabs.filter(t => !t.adminOnly || isAdmin);

  return (
    <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col lg:flex-row">
      
      {/* Sidebar Navigation */}
      <aside className="w-full lg:w-72 bg-white border-r border-slate-200 p-4 lg:p-6 flex flex-col justify-between shrink-0 shadow-xs">
        <div className="space-y-6">
          
          {/* Top Brand Logo inside Portal */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <div 
              onClick={onNavigateHome}
              className="flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <span className="text-base font-bold text-slate-900 tracking-tight block">
                  ChurnFix <span className="text-blue-600">Portal</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono uppercase block -mt-1">
                  {isAdmin ? 'ADMIN CONTROL CENTER' : 'CLIENT WORKSPACE'}
                </span>
              </div>
            </div>

            <button
              onClick={onNavigateHome}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 cursor-pointer"
            >
              Website
            </button>
          </div>

          {/* Active User Card in Sidebar */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-9 h-9 rounded-full ${isAdmin ? 'bg-amber-600' : 'bg-blue-600'} text-white flex items-center justify-center font-bold text-xs font-mono`}>
                {(user.companyName || 'CF').substring(0, 2).toUpperCase()}
              </div>
              <div className="overflow-hidden">
                <div className="text-xs font-bold text-slate-900 leading-snug truncate">{user.companyName}</div>
                <div className="text-[10px] text-slate-500 font-mono flex items-center gap-1">
                  <span>{user.contactName}</span>
                  {isAdmin && <span className="text-amber-600 font-bold px-1 rounded bg-amber-50">ADMIN</span>}
                </div>
              </div>
            </div>
            <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500' : 'bg-blue-600'} animate-pulse`} />
          </div>

          {/* Tabs Menu */}
          <nav className="space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono px-3 block mb-2">
              {isAdmin ? 'ADMIN NAVIGATION' : 'WORKSPACE NAVIGATION'}
            </span>
            {visibleTabs.map((tab) => {
              const IconComp = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onSelectTab(tab.id)}
                  className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 text-blue-700 border border-blue-200 font-bold shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComp className={`w-4 h-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                    <span>{tab.label}</span>
                  </div>
                  {tab.badge && (
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Logout Footer */}
        <div className="pt-4 border-t border-slate-100 space-y-2">
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-[11px] text-slate-500 space-y-1">
            <div className="text-slate-900 font-bold">Logged in as:</div>
            <div className="text-blue-600 font-bold truncate">{user.email}</div>
          </div>

          <button
            onClick={onLogout}
            className="w-full py-2.5 px-3 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-red-600 hover:border-red-200 hover:bg-red-50 text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out ({user.contactName})</span>
          </button>
        </div>

      </aside>

      {/* Main Portal View Area */}
      <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        
        {/* Top Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-8 border-b border-slate-200">
          <div>
            <span className="text-xs font-mono uppercase text-slate-500 font-medium flex items-center gap-1.5">
              <span>{isAdmin ? 'Admin Portal' : 'Client Workspace'}</span> / <span className="font-bold text-slate-800">{user.companyName}</span>
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-0.5">
              {baseTabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-mono flex items-center gap-2 shadow-xs">
              <span className="text-slate-500">Account Role:</span>
              <span className={`font-bold ${isAdmin ? 'text-amber-600' : 'text-blue-600'}`}>
                {isAdmin ? 'Admin / Lead Advisory' : 'Client Member'}
              </span>
            </div>

            <button
              onClick={() => onSelectTab('messages')}
              className="p-2.5 rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-blue-600 transition-colors cursor-pointer relative shadow-xs"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            </button>
          </div>
        </div>

        {/* Tab View Content */}
        {children}

      </main>

    </div>
  );
};

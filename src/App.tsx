import React, { useState, useEffect } from 'react';
import { NavigationPage, PortalTab, BlogArticle } from './types';
import { BLOG_ARTICLES } from './data/mockData';
import { UserAccount, getCurrentUser, setCurrentUser as saveCurrentUser } from './services/auth';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './components/pages/Home';
import { About } from './components/pages/About';
import { Services } from './components/pages/Services';
import { Industries } from './components/pages/Industries';
import { CaseStudies } from './components/pages/CaseStudies';
import { Pricing } from './components/pages/Pricing';
import { Resources } from './components/pages/Resources';
import { BlogPost } from './components/pages/BlogPost';
import { FAQPage } from './components/pages/FAQPage';
import { Contact } from './components/pages/Contact';
import { BookAudit } from './components/pages/BookAudit';
import { Legal } from './components/pages/Legal';

// Portal
import { PortalLayout } from './components/portal/PortalLayout';
import { ClientLogin } from './components/portal/ClientLogin';
import { DashboardView } from './components/portal/DashboardView';
import { AuditReportView } from './components/portal/AuditReportView';
import { RecommendationsView } from './components/portal/RecommendationsView';
import { RevenueInsightsView } from './components/portal/RevenueInsightsView';
import { MessagesView } from './components/portal/MessagesView';
import { ScheduleMeetingView } from './components/portal/ScheduleMeetingView';
import { DownloadsView } from './components/portal/DownloadsView';
import { SettingsView } from './components/portal/SettingsView';
import { AiAssistantView } from './components/portal/AiAssistantView';

export function App() {
  const [currentPage, setCurrentPage] = useState<NavigationPage>('home');
  const [portalTab, setPortalTab] = useState<PortalTab>('dashboard');
  const [user, setUser] = useState<UserAccount | null>(() => getCurrentUser());
  const [selectedArticle, setSelectedArticle] = useState<BlogArticle | null>(BLOG_ARTICLES[0]);
  const [prefilledBookingData, setPrefilledBookingData] = useState<{ mrr: number; churn: number; gateway: string } | null>(null);

  // Scroll to top on page navigation
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage, portalTab]);

  const handleNavigate = (page: NavigationPage) => {
    setCurrentPage(page);
  };

  const handleLogin = (newUser: UserAccount) => {
    saveCurrentUser(newUser);
    setUser(newUser);
    setPortalTab('dashboard');
  };

  const handleLogout = () => {
    saveCurrentUser(null);
    setUser(null);
  };

  const handleSelectBookingWithData = (mrr: number, churn: number, gateway: string) => {
    setPrefilledBookingData({ mrr, churn, gateway });
  };

  const renderPortalTab = () => {
    if (!user) return null;

    switch (portalTab) {
      case 'dashboard':
        return <DashboardView profile={user} onSelectTab={setPortalTab} />;
      case 'audit-reports':
        return <AuditReportView />;
      case 'recommendations':
        return <RecommendationsView />;
      case 'revenue-insights':
        return <RevenueInsightsView />;
      case 'messages':
        return <MessagesView user={user} />;
      case 'schedule':
        return <ScheduleMeetingView />;
      case 'downloads':
        return <DownloadsView />;
      case 'settings':
        return <SettingsView />;
      case 'ai-assistant':
        return <AiAssistantView user={user} onSelectTab={setPortalTab} />;
      default:
        return <DashboardView profile={user} onSelectTab={setPortalTab} />;
    }
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} onSelectBookingWithData={handleSelectBookingWithData} />;
      case 'about':
        return <About onNavigate={handleNavigate} />;
      case 'services':
        return <Services onNavigate={handleNavigate} />;
      case 'industries':
        return <Industries onNavigate={handleNavigate} />;
      case 'case-studies':
        return <CaseStudies onNavigate={handleNavigate} />;
      case 'pricing':
        return <Pricing onNavigate={handleNavigate} />;
      case 'resources':
        return <Resources onNavigate={handleNavigate} onSelectArticle={setSelectedArticle} />;
      case 'blog-post':
        return <BlogPost article={selectedArticle} onNavigate={handleNavigate} />;
      case 'faq':
        return <FAQPage onNavigate={handleNavigate} />;
      case 'contact':
        return <Contact />;
      case 'book-audit':
        return <BookAudit onNavigate={handleNavigate} prefilledData={prefilledBookingData} />;
      case 'privacy':
        return <Legal type="privacy" />;
      case 'terms':
        return <Legal type="terms" />;
      case 'portal':
        if (!user) {
          return <ClientLogin onLogin={handleLogin} />;
        }
        return (
          <PortalLayout
            user={user}
            activeTab={portalTab}
            onSelectTab={setPortalTab}
            onLogout={handleLogout}
            onNavigateHome={() => setCurrentPage('home')}
          >
            {renderPortalTab()}
          </PortalLayout>
        );
      default:
        return <Home onNavigate={handleNavigate} onSelectBookingWithData={handleSelectBookingWithData} />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* Hide standard website Header/Footer if inside Client Portal view */}
      {currentPage !== 'portal' && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1">
        {renderPage()}
      </div>

      {currentPage !== 'portal' && (
        <Footer onNavigate={handleNavigate} />
      )}

    </div>
  );
}

export default App;

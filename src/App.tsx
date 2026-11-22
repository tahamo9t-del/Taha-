import React, { useEffect, useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServiceList } from './components/ServiceList';
import { DashboardStats } from './components/DashboardStats';
import { DocumentAlerts } from './components/DocumentAlerts';
import { GuidesSection } from './components/GuidesSection';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { GuidesIndexPage } from './components/GuidesIndexPage';
import { GuideDetailPage } from './components/GuideDetailPage';
import { Footer } from './components/Footer';
import { AdminPortal } from './components/AdminPortal';

// Modals & Alert Toasts
import { ServiceDetailsModal } from './components/ServiceDetailsModal';
import { PaymentModal } from './components/PaymentModal';
import { CourierDeliveryModal } from './components/CourierDeliveryModal';
import { SupportChat } from './components/SupportChat';
import { PhoneLinkingModal } from './components/PhoneLinkingModal';
import { IncomingAlertsModal } from './components/IncomingAlertsModal';
import { IncomingAlertToast } from './components/IncomingAlertToast';
import { AdminLoginPage } from './components/AdminLoginPage';
import { PAYMENTS_AND_ORDERS_ENABLED } from './config/features';
import { findServiceBySlugOrId } from './data/seoMetadata';
import { GUIDES_DATA } from './data/guidesData';
import { syncClientSeo } from './seo/clientSeoSync';

const MainContent: React.FC = () => {
  const { userRole, isAdminAuthenticated, services } = useApp();
  const [routePath, setRoutePath] = useState<string>(() => {
    try {
      return (window.location.pathname || '/').replace(/\/+$/, '') || '/';
    } catch {
      return '/';
    }
  });

  useEffect(() => {
    const onRouteChange = () => {
      setRoutePath((window.location.pathname || '/').replace(/\/+$/, '') || '/');
    };
    window.addEventListener('popstate', onRouteChange);
    window.addEventListener('skip:navigate', onRouteChange);
    return () => {
      window.removeEventListener('popstate', onRouteChange);
      window.removeEventListener('skip:navigate', onRouteChange);
    };
  }, []);

  const matchedService = routePath.startsWith('/services/')
    ? findServiceBySlugOrId(services, routePath.slice('/services/'.length))
    : undefined;

  const matchedGuide = routePath.startsWith('/guides/')
    ? GUIDES_DATA.find(
        g =>
          g.slug.toLowerCase() === decodeURIComponent(routePath.slice('/guides/'.length)).toLowerCase() ||
          g.id.toLowerCase() === decodeURIComponent(routePath.slice('/guides/'.length)).toLowerCase()
      )
    : undefined;

  useEffect(() => {
    syncClientSeo({
      isAdmin: userRole === 'admin',
      routePath,
      service: matchedService,
      guide: matchedGuide
    });
  }, [userRole, routePath, matchedService, matchedGuide]);

  // 1. DEDICATED ADMIN EDITION (Noindex, completely isolated)
  if (userRole === 'admin') {
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }

    return (
      <div className="min-h-screen bg-slate-900 text-slate-100">
        <AdminPortal />

        {/* Global Admin Overlays */}
        <PhoneLinkingModal />
        <IncomingAlertsModal />
        <SupportChat />
        <IncomingAlertToast />
      </div>
    );
  }

  // 2. DEDICATED CITIZEN EDITION
  const renderPublicRoute = () => {
    if (matchedService) {
      return <ServiceDetailPage service={matchedService} />;
    }
    if (routePath === '/guides') {
      return <GuidesIndexPage />;
    }
    if (matchedGuide) {
      return <GuideDetailPage guide={matchedGuide} />;
    }
    return (
      <>
        <HeroBanner />
        <ServiceList />
        {PAYMENTS_AND_ORDERS_ENABLED && <DashboardStats />}
        <DocumentAlerts />
        <GuidesSection />
      </>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        {renderPublicRoute()}
      </main>
      <Footer />

      {/* Citizen Modals - Document verification only until payment licensing */}
      <ServiceDetailsModal />
      {PAYMENTS_AND_ORDERS_ENABLED && <PaymentModal />}
      {PAYMENTS_AND_ORDERS_ENABLED && <CourierDeliveryModal />}
      <SupportChat />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

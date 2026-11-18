import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { HeroBanner } from './components/HeroBanner';
import { ServiceList } from './components/ServiceList';
import { DashboardStats } from './components/DashboardStats';
import { DocumentAlerts } from './components/DocumentAlerts';
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

const MainContent: React.FC = () => {
  const { userRole, isAdminAuthenticated } = useApp();

  // 1. DEDICATED ADMIN EDITION
  if (userRole === 'admin') {
    // If device is not yet unlocked with PIN, render dedicated login gateway
    if (!isAdminAuthenticated) {
      return <AdminLoginPage />;
    }

    // Unlocked Admin Dashboard
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

  // 2. DEDICATED CITIZEN EDITION (100% Clean, zero admin buttons or staff hints)
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors w-full max-w-full overflow-x-hidden">
      <Navbar />
      <main className="flex-1 w-full max-w-full overflow-x-hidden">
        <HeroBanner />
        <ServiceList />
        {PAYMENTS_AND_ORDERS_ENABLED && <DashboardStats />}
        <DocumentAlerts />
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

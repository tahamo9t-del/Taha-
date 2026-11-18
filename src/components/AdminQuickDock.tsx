import React from 'react';
import { useApp } from '../context/AppContext';
import { ShieldAlert, ArrowLeft, ArrowRight, Lock } from 'lucide-react';

/**
 * Floating Admin Dock: Strictly visible ONLY on an authenticated admin device
 * when browsing the application in Citizen preview mode.
 * Completely hidden from ordinary public visitors and customers.
 */
export const AdminQuickDock: React.FC = () => {
  const { 
    isAdminAuthenticated, 
    userRole, 
    setUserRole, 
    unreadIncomingAlertsCount,
    logoutAdmin,
    language 
  } = useApp();

  // If not authenticated or currently in admin view, do not render
  if (!isAdminAuthenticated || userRole === 'admin') {
    return null;
  }

  return (
    <div className="fixed bottom-3 start-3 sm:bottom-5 sm:start-5 max-w-[calc(100vw-24px)] z-50 flex items-center gap-1.5 sm:gap-2 p-1.5 bg-slate-900/95 text-white border border-purple-500/40 rounded-2xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-5">
      <button
        onClick={() => {
          setUserRole('admin');
          try {
            history.pushState(null, '', '#admin');
          } catch {}
        }}
        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-xs font-black transition-all shadow-md active:scale-95 text-white border border-purple-400/30"
        title="التبديل إلى لوحة تحكم الإدارة الخاصة بك"
      >
        <ShieldAlert className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>{language === 'ar' ? 'نسخة الإدارة والطلبات' : 'Admin Operations'}</span>
        {unreadIncomingAlertsCount > 0 && (
          <span className="px-1.5 py-0.5 text-[10px] font-mono bg-amber-400 text-slate-950 font-black rounded-full">
            {unreadIncomingAlertsCount}
          </span>
        )}
        {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5 text-sky-300" /> : <ArrowRight className="w-3.5 h-3.5 text-sky-300" />}
      </button>

      <button
        onClick={logoutAdmin}
        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition-colors"
        title={language === 'ar' ? 'قفل وتسجيل خروج الإدارة من هذا الجهاز' : 'Lock & Logout Admin Session'}
      >
        <Lock className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

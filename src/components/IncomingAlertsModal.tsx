import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Bell, 
  Phone, 
  Smartphone, 
  MessageSquare, 
  CheckCheck, 
  Trash2, 
  Settings, 
  Sparkles,
  ExternalLink,
  Filter
} from 'lucide-react';

export const IncomingAlertsModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    language, 
    incomingAlerts, 
    markAlertAsRead, 
    clearAllAlerts, 
    openModal,
    simulateIncomingCustomerTest 
  } = useApp();

  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  if (activeModal.type !== 'alerts_feed') return null;

  const filteredAlerts = incomingAlerts.filter(a => {
    if (filter === 'unread') return !a.read;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <Bell className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <span>{language === 'ar' ? 'مركز الإشعارات والطلبات الواردة' : 'Incoming Alerts & Customer Orders'}</span>
                <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-mono">
                  {incomingAlerts.length}
                </span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'سجل فوري لكافة المعاملات والرسائل الواردة مع إمكانية الاتصال والواتساب' : 'Real-time log of customer requests with 1-click WhatsApp & calls'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => openModal('phone_settings')}
              className="p-2 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700"
              title={language === 'ar' ? 'تعديل أرقام الهواتف المربوطة' : 'Configure Phone Numbers'}
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Toolbar & Filter */}
        <div className="p-4 bg-slate-100/70 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between gap-3 text-xs">
          
          <div className="flex items-center gap-1.5 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 font-bold rounded-lg transition-colors ${
                filter === 'all'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'ar' ? 'الكل' : 'All'} ({incomingAlerts.length})
            </button>
            <button
              onClick={() => setFilter('unread')}
              className={`px-3 py-1 font-bold rounded-lg transition-colors ${
                filter === 'unread'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              {language === 'ar' ? 'غير مقروء' : 'Unread'} ({incomingAlerts.filter(a => !a.read).length})
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={simulateIncomingCustomerTest}
              className="px-3 py-1.5 bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-700/60 font-bold rounded-xl flex items-center gap-1 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'تجربة إشعار' : 'Test Alert'}</span>
            </button>

            {incomingAlerts.length > 0 && (
              <button
                onClick={clearAllAlerts}
                className="px-3 py-1.5 text-slate-500 hover:text-rose-600 rounded-xl flex items-center gap-1 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'مسح الكل' : 'Clear'}</span>
              </button>
            )}
          </div>

        </div>

        {/* Alerts List */}
        <div className="p-6 space-y-3 overflow-y-auto flex-1">
          {filteredAlerts.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <Bell className="w-10 h-10 text-slate-300 dark:text-slate-600 mx-auto" />
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {language === 'ar' ? 'لا توجد إشعارات حالياً' : 'No incoming notifications'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'عند قيام أي عميل بطلب معاملة أو إرسال استفسار ستظهر هنا فوراً مع تنبيه صوتي.' : 'New orders and customer messages will pop up here with instant chimes.'}
              </p>
            </div>
          ) : (
            filteredAlerts.map((alert) => {
              const rawPhone = alert.customerPhone || '';
              const cleanPhone = rawPhone.replace(/\D/g, '');
              const internationalPhone = cleanPhone.startsWith('2') ? cleanPhone : '2' + cleanPhone;
              const defaultMsg = language === 'ar'
                ? `مرحباً أستاذ ${alert.customerName}، تواصل معك من إدارة منصة SKIP بخصوص طلبك (${alert.referenceNumber || 'المسجل لدينا'}). هل ترغب في تحديد موعد استلام الأوراق؟`
                : `Hello Mr./Ms. ${alert.customerName}, reaching out from SKIP platform regarding your request. How can we help?`;
              const whatsappUrl = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(defaultMsg)}`;

              return (
                <div
                  key={alert.id}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    alert.read
                      ? 'bg-slate-50/70 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                      : 'bg-purple-50/60 dark:bg-purple-950/30 border-purple-300 dark:border-purple-800/70 shadow-sm'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-gradient-to-r from-purple-700 to-indigo-600 text-white font-mono">
                          {alert.referenceNumber || 'طلب جديد'}
                        </span>
                        <span className="text-[11px] text-slate-400 font-mono">
                          {alert.timestamp}
                        </span>
                        {!alert.read && (
                          <span className="w-2 h-2 rounded-full bg-amber-400 ring-2 ring-amber-200 dark:ring-amber-900 animate-pulse" />
                        )}
                      </div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {alert.title}
                      </h4>
                    </div>

                    <div className="text-end shrink-0">
                      <span className="text-xs font-bold text-purple-700 dark:text-purple-300 block">
                        {alert.customerName}
                      </span>
                      <span className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-bold tabular-nums">
                        {alert.customerPhone}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
                    {alert.description}
                  </p>

                  {/* Actions for this customer */}
                  <div className="pt-3 border-t border-slate-200/80 dark:border-slate-700/80 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Phone Call */}
                      <a
                        href={`tel:${alert.customerPhone}`}
                        onClick={() => markAlertAsRead(alert.id)}
                        className="py-1.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-all shadow-sm"
                      >
                        <Phone className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === 'ar' ? 'اتصال بالعميل' : 'Direct Call'}</span>
                      </a>

                      {/* WhatsApp */}
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => markAlertAsRead(alert.id)}
                        className="py-1.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors shadow-sm"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
                      </a>

                      {/* In-app Chat */}
                      <button
                        onClick={() => {
                          markAlertAsRead(alert.id);
                          closeModal();
                          openModal('chat');
                        }}
                        className="py-1.5 px-3 bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                        <span>{language === 'ar' ? 'شات التطبيق' : 'Chat'}</span>
                      </button>
                    </div>

                    {!alert.read && (
                      <button
                        onClick={() => markAlertAsRead(alert.id)}
                        className="text-[11px] font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                      >
                        {language === 'ar' ? 'تحديد كمقروء' : 'Mark read'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle2, 
  RefreshCw, 
  Clock, 
  CreditCard, 
  FileText,
  Calendar
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';

export const DocumentAlerts: React.FC = () => {
  const { expiryAlerts, language, openModal, services } = useApp();

  const handleRenew = (serviceId?: string) => {
    if (!serviceId) return;
    const targetService = services.find(s => s.id === serviceId);
    if (targetService) {
      openModal('service_details', targetService);
    }
  };

  return (
    <section id="alerts" className="py-10 sm:py-14 bg-slate-50 dark:bg-slate-950 transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
              <span>{language === 'ar' ? 'تنبيهات الصلاحية' : 'Expiry Alerts'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{language === 'ar' ? 'تجديد فوري' : 'Quick Renewal'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'صلاحية الوثائق والجوازات' : 'Document Expiry Alerts'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md">
            {PAYMENTS_AND_ORDERS_ENABLED
              ? (language === 'ar'
                  ? 'تذكير مبكر لتفادي الغرامات وإمكانية التجديد مباشرة عبر المندوب.'
                  : 'Timely reminders before your documents expire with direct courier renewal.')
              : (language === 'ar'
                  ? 'تذكير مبكر بمواعيد انتهاء الوثائق لفحص وتجهيز أوراق التجديد قبل الذهاب.'
                  : 'Timely reminders to review and prepare renewal documents before going.')}
          </p>
        </div>

        {/* Alerts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {expiryAlerts.map((item) => {
            const isExpiringSoon = item.status === 'expiring_soon';
            return (
              <div
                key={item.id}
                className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
                  isExpiringSoon
                    ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800/60 shadow-md'
                    : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-xs mb-3">
                    <span className="font-mono text-slate-400 tabular-nums">
                      {item.documentNumber}
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        isExpiringSoon
                          ? 'bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-200 flex items-center gap-1'
                          : 'bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200'
                      }`}
                    >
                      {isExpiringSoon && <AlertTriangle className="w-3 h-3 text-amber-600" />}
                      <span>
                        {isExpiringSoon 
                          ? (language === 'ar' ? `تنتهي خلال ${item.daysRemaining} يوماً` : `Expires in ${item.daysRemaining} days`) 
                          : (language === 'ar' ? 'سارية الصلاحية' : 'Valid')}
                      </span>
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1">
                    {language === 'ar' ? item.title : item.titleEn}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                    {language === 'ar' ? 'صاحب الوثيقة:' : 'Holder:'} {item.holderName}
                  </p>

                  <div className="p-3 rounded-2xl bg-white/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60 text-xs flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span>{language === 'ar' ? 'تاريخ الانتهاء:' : 'Expiry Date:'}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                      {item.expiryDate}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleRenew(item.renewServiceId)}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    isExpiringSoon
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white shadow-md shadow-purple-950/20'
                      : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200'
                  }`}
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${isExpiringSoon ? 'text-amber-300' : 'text-slate-500'}`} />
                  <span>
                    {isExpiringSoon
                      ? (PAYMENTS_AND_ORDERS_ENABLED
                          ? (language === 'ar' ? 'تجديد الآن إلكترونياً وبالمندوب' : 'Renew Now Digitally')
                          : (language === 'ar' ? 'فحص أوراق التجديد المطلوبة' : 'Check Renewal Papers'))
                      : (language === 'ar' ? 'عرض تفاصيل الوثيقة' : 'View Document')}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

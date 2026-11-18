import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, 
  Phone, 
  Smartphone, 
  MessageSquare, 
  X, 
  UserCheck, 
  FileText,
  ExternalLink,
  Volume2
} from 'lucide-react';

export const IncomingAlertToast: React.FC = () => {
  const { latestAlertToast, dismissToast, language, openModal, markAlertAsRead } = useApp();

  if (!latestAlertToast) return null;

  const rawPhone = latestAlertToast.customerPhone || '';
  const cleanPhone = rawPhone.replace(/\D/g, '');
  const internationalPhone = cleanPhone.startsWith('2') ? cleanPhone : '2' + cleanPhone;

  const defaultWhatsappMsg = language === 'ar'
    ? `مرحباً يا أستاذ ${latestAlertToast.customerName}، تواصل معك بخصوص طلبك (${latestAlertToast.referenceNumber || 'المسجل على SKIP'}). جاهزون لإنجاز أوراقك فوراً!`
    : `Hello Mr./Ms. ${latestAlertToast.customerName}, reaching out regarding your request (${latestAlertToast.referenceNumber || 'on SKIP'}). We are ready to assist you!`;

  const whatsappUrl = `https://wa.me/${internationalPhone}?text=${encodeURIComponent(defaultWhatsappMsg)}`;

  return (
    <div className="fixed bottom-6 start-6 z-50 max-w-md w-full animate-in slide-in-from-bottom-5 duration-300">
      <div className="p-4 sm:p-5 rounded-3xl bg-slate-900/95 text-white shadow-2xl border-2 border-purple-500/80 backdrop-blur-md relative overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/20 rounded-full blur-2xl pointer-events-none" />

        {/* Top row */}
        <div className="flex items-start justify-between gap-3 relative z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <Bell className="w-5 h-5 text-amber-300 animate-bounce" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-400/20 text-amber-300 rounded-full border border-amber-400/40">
                  {language === 'ar' ? 'إشعار وارد فوري' : 'Live Incoming Alert'}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {latestAlertToast.timestamp}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white mt-1">
                {latestAlertToast.title}
              </h4>
            </div>
          </div>

          <button
            onClick={dismissToast}
            className="p-1 text-slate-400 hover:text-white rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Customer Details Box */}
        <div className="mt-3 p-3 rounded-2xl bg-white/10 border border-white/10 text-xs space-y-1 relative z-10">
          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">
              {language === 'ar' ? 'اسم العميل / المواطن:' : 'Customer Name:'}
            </span>
            <span className="font-bold text-amber-300">
              {latestAlertToast.customerName}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-slate-300 font-medium">
              {language === 'ar' ? 'رقم هاتف العميل:' : 'Customer Phone:'}
            </span>
            <span className="font-mono font-bold text-sky-300 tabular-nums">
              {latestAlertToast.customerPhone}
            </span>
          </div>

          <p className="text-[11px] text-slate-300 pt-1 border-t border-white/10 line-clamp-2">
            {latestAlertToast.description}
          </p>
        </div>

        {/* Direct Action Buttons: Call & WhatsApp */}
        <div className="mt-4 grid grid-cols-3 gap-2 relative z-10">
          
          {/* Direct Phone Call */}
          <a
            href={`tel:${latestAlertToast.customerPhone}`}
            onClick={() => {
              markAlertAsRead(latestAlertToast.id);
            }}
            className="py-2.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <Phone className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'ar' ? 'اتصال هاتف' : 'Call'}</span>
          </a>

          {/* Direct WhatsApp Chat */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            onClick={() => {
              markAlertAsRead(latestAlertToast.id);
            }}
            className="py-2.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md"
          >
            <Smartphone className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'ar' ? 'واتساب' : 'WhatsApp'}</span>
          </a>

          {/* In-app Chat */}
          <button
            onClick={() => {
              markAlertAsRead(latestAlertToast.id);
              dismissToast();
              openModal('chat');
            }}
            className="py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all border border-slate-700"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{language === 'ar' ? 'الشات' : 'In-App Chat'}</span>
          </button>

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Phone, 
  Smartphone, 
  Bell, 
  Volume2, 
  VolumeX, 
  CheckCircle2, 
  MessageSquare, 
  Sparkles,
  ShieldCheck,
  Send,
  ExternalLink
} from 'lucide-react';

export const PhoneLinkingModal: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    language, 
    adminPhoneSettings, 
    updateAdminPhoneSettings,
    simulateIncomingCustomerTest,
    requestBrowserNotificationPermission 
  } = useApp();

  const [primaryPhone, setPrimaryPhone] = useState(adminPhoneSettings.primaryPhone);
  const [whatsappPhone, setWhatsappPhone] = useState(adminPhoneSettings.whatsappPhone);
  const [secondaryPhone, setSecondaryPhone] = useState(adminPhoneSettings.secondaryPhone);
  const [adminName, setAdminName] = useState(adminPhoneSettings.adminName);
  const [soundEnabled, setSoundEnabled] = useState(adminPhoneSettings.soundEnabled);
  const [autoWhatsAppAlert, setAutoWhatsAppAlert] = useState(adminPhoneSettings.autoWhatsAppAlert);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (activeModal.type !== 'phone_settings') return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateAdminPhoneSettings({
      primaryPhone,
      whatsappPhone,
      secondaryPhone,
      adminName,
      soundEnabled,
      autoWhatsAppAlert
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const cleanWhatsAppNumber = whatsappPhone.replace(/\D/g, '');
  const testWhatsAppUrl = `https://wa.me/${cleanWhatsAppNumber.startsWith('2') ? cleanWhatsAppNumber : '2' + cleanWhatsAppNumber}?text=${encodeURIComponent('مرحباً، تم ربط رقم الهاتف بنجاح بتطبيق SKIP لاستقبال إشعارات المعاملات!')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <Phone className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'ربط أرقام الهاتف وقنوات الإشعارات' : 'Phone Linking & Alert Channels'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'استقبل إشعارات فورية عند إرسال أي مواطن لمعاملة أو رسالة وتواصل معه مباشرة' : 'Receive instant alerts and contact customers via WhatsApp or call'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {savedSuccess && (
            <div className="p-4 rounded-2xl bg-amber-400/20 border border-amber-400/50 flex items-center gap-3 text-amber-900 dark:text-amber-200 text-xs font-bold animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-amber-600 shrink-0" />
              <span>{language === 'ar' ? 'تم حفظ وربط أرقامك بنجاح! سيصلك تنبيه فوري عند أي طلب جديد.' : 'Phone numbers linked successfully! Instant alerts activated.'}</span>
            </div>
          )}

          <form onSubmit={handleSave} className="space-y-4">
            
            {/* Primary Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>{language === 'ar' ? 'رقم الهاتف الأساسي للاتصال والرسائل:' : 'Primary Direct Contact Phone:'}</span>
                <span className="text-[11px] font-normal text-purple-600 dark:text-purple-400 font-mono">010 / 011 / 012 / 015</span>
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute top-3 start-3.5 text-slate-400" />
                <input
                  type="tel"
                  dir="ltr"
                  value={primaryPhone}
                  onChange={(e) => setPrimaryPhone(e.target.value)}
                  placeholder="01098765432"
                  className="w-full ps-10 pe-4 py-2.5 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
                {language === 'ar' ? 'هذا الرقم سيظهر للعميل للتواصل معك وسيتلقى إشعارات المعاملات.' : 'Used for direct customer dialing and transaction routing.'}
              </p>
            </div>

            {/* WhatsApp Phone */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1 flex items-center justify-between">
                <span>{language === 'ar' ? 'رقم الواتساب المباشر (WhatsApp):' : 'Direct WhatsApp Number:'}</span>
                <span className="text-[11px] font-normal text-sky-600 dark:text-sky-400">لفتح الشات المباشر</span>
              </label>
              <div className="relative">
                <Smartphone className="w-4 h-4 absolute top-3 start-3.5 text-sky-500" />
                <input
                  type="tel"
                  dir="ltr"
                  value={whatsappPhone}
                  onChange={(e) => setWhatsappPhone(e.target.value)}
                  placeholder="01098765432"
                  className="w-full ps-10 pe-4 py-2.5 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  required
                />
              </div>
              <div className="flex items-center justify-between mt-1 text-[11px]">
                <span className="text-slate-500 dark:text-slate-400">
                  {language === 'ar' ? 'يمكنك الضغط للتواصل مع العملاء بضغطة زر عبر واتساب' : 'Enables 1-click WhatsApp customer chats'}
                </span>
                <a
                  href={testWhatsAppUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-purple-600 dark:text-purple-400 hover:text-purple-500 font-bold flex items-center gap-1"
                >
                  <span>{language === 'ar' ? 'تجربة فتح واتساب' : 'Test WhatsApp'}</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Secondary Hotline / Backup */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'ar' ? 'رقم الطوارئ أو الخط البديل (اختياري):' : 'Backup Hotline / Alternative Phone:'}
              </label>
              <div className="relative">
                <Phone className="w-4 h-4 absolute top-3 start-3.5 text-slate-400" />
                <input
                  type="tel"
                  dir="ltr"
                  value={secondaryPhone}
                  onChange={(e) => setSecondaryPhone(e.target.value)}
                  placeholder="01123456789"
                  className="w-full ps-10 pe-4 py-2.5 text-sm font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Admin / Courier Name */}
            <div>
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                {language === 'ar' ? 'الاسم الظاهر للمواطن (الإدارة / المندوب):' : 'Display Name for Customers:'}
              </label>
              <input
                type="text"
                value={adminName}
                onChange={(e) => setAdminName(e.target.value)}
                placeholder="كابتن أحمد سامي (مندوب سكيب المعتمد)"
                className="w-full px-3.5 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            {/* Notification Channel Preferences */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Bell className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                <span>{language === 'ar' ? 'خيارات الإشعارات اللحظية:' : 'Instant Alert Settings:'}</span>
              </h4>

              {/* Sound Toggle */}
              <div 
                onClick={() => setSoundEnabled(!soundEnabled)}
                className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 cursor-pointer flex items-center justify-between"
              >
                <div className="flex items-center gap-2.5">
                  {soundEnabled ? (
                    <Volume2 className="w-4 h-4 text-purple-600 dark:text-purple-400 shrink-0" />
                  ) : (
                    <VolumeX className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? 'نغمة التنبيه الصوتي في التطبيق' : 'Audible In-App Chime'}
                    </h5>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {language === 'ar' ? 'صوت رنة واضح عند ورود طلب أو رسالة جديدة' : 'Plays a clean sound chime on new orders'}
                    </p>
                  </div>
                </div>
                <input
                  type="checkbox"
                  checked={soundEnabled}
                  onChange={(e) => setSoundEnabled(e.target.checked)}
                  className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                />
              </div>

              {/* Browser Desktop Notifications button */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-center justify-between">
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? 'إشعارات المتصفح الفورية (Push)' : 'Browser Push Notifications'}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'تظهر لك نافذة إشعار حتى لو كنت خارج الصفحة' : 'Alert window pops up on your device'}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    const ok = await requestBrowserNotificationPermission();
                    if (ok) alert(language === 'ar' ? 'تم تفعيل إشعارات المتصفح بنجاح!' : 'Browser notifications enabled!');
                  }}
                  className="px-3 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shrink-0 shadow-xs"
                >
                  {language === 'ar' ? 'تفعيل الإشعارات' : 'Enable'}
                </button>
              </div>

            </div>

            {/* Save Buttons */}
            <div className="pt-3 flex flex-col sm:flex-row items-center gap-3">
              <button
                type="submit"
                className="w-full sm:flex-1 py-3 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-md shadow-purple-950/20 flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4 text-amber-300" />
                <span>{language === 'ar' ? 'حفظ وتأكيد ربط الأرقام' : 'Save & Link Phones'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  simulateIncomingCustomerTest();
                }}
                className="w-full sm:w-auto px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shrink-0"
                title="اضغط لتجربة كيف سيصلك الإشعار والصوت عند قيام عميل بإرسال طلب جديد"
              >
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'تجربة إشعار وارد فوري' : 'Test Live Alert'}</span>
              </button>
            </div>

          </form>

        </div>

      </div>
    </div>
  );
};

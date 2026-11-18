import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, KeyRound, AlertCircle, X, ArrowLeft, ArrowRight, Smartphone } from 'lucide-react';

export const AdminLoginModal: React.FC = () => {
  const { activeModal, closeModal, loginAdmin, language } = useApp();
  const [pin, setPin] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (activeModal.type !== 'admin_login') return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const success = loginAdmin(pin, rememberDevice);
    if (success) {
      setPin('');
      setError(null);
    } else {
      setError(
        language === 'ar' 
          ? 'رمز PIN غير صحيح. الرمز الافتراضي المعتمد هو 2026' 
          : 'Incorrect PIN. The default authorized PIN is 2026'
      );
    }
    setIsSubmitting(false);
  };

  const handleQuickDigit = (digit: string) => {
    if (pin.length < 6) {
      setPin(prev => prev + digit);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden relative"
        onClick={e => e.stopPropagation()}
      >
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-slate-900 via-purple-950 to-slate-900 p-6 text-white text-center relative border-b border-slate-800">
          <button
            onClick={closeModal}
            className="absolute top-4 start-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            title={language === 'ar' ? 'إغلاق' : 'Close'}
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center shadow-inner">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>

          <h3 className="text-xl font-black tracking-tight">
            {language === 'ar' ? 'بوابة الإدارة والمناديب 🔒' : 'Partner & Dispatch Access 🔒'}
          </h3>
          <p className="text-xs text-slate-300 mt-1 max-w-xs mx-auto leading-relaxed">
            {language === 'ar'
              ? 'تسجيل الدخول لجهاز الإدارة لتلقي طلبات المواطنين والإشعارات المباشرة'
              : 'Authorized access for platform management and courier dispatch operations'}
          </p>
        </div>

        {/* Content Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-600 dark:text-rose-400 text-xs font-semibold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar' ? 'رمز الدخول السري (PIN):' : 'Security PIN Code:'}
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="password"
                inputMode="numeric"
                maxLength={8}
                value={pin}
                onChange={e => {
                  setPin(e.target.value);
                  setError(null);
                }}
                placeholder="••••"
                autoFocus
                className="w-full ps-11 pe-4 py-3 bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-2xl text-center text-2xl font-mono tracking-widest text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-400 placeholder:tracking-normal"
              />
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
              <span>{language === 'ar' ? 'الرمز الافتراضي الأولي: 2026' : 'Default initial PIN: 2026'}</span>
              <button
                type="button"
                onClick={() => setPin('2026')}
                className="text-purple-600 dark:text-purple-400 font-semibold hover:underline"
              >
                {language === 'ar' ? 'تعبئة الرمز الافتراضي' : 'Fill default PIN'}
              </button>
            </div>
          </div>

          {/* Quick Keypad */}
          <div className="grid grid-cols-3 gap-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(d => (
              <button
                key={d}
                type="button"
                onClick={() => handleQuickDigit(d)}
                className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-mono font-bold text-lg text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-slate-500 dark:text-slate-400 transition-colors"
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickDigit('0')}
              className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-mono font-bold text-lg text-slate-800 dark:text-slate-200 transition-colors shadow-xs"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 font-bold text-xs text-slate-500 dark:text-slate-400 transition-colors"
            >
              ⌫
            </button>
          </div>

          {/* Remember Device Option */}
          <label className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 cursor-pointer">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={e => setRememberDevice(e.target.checked)}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-300 dark:border-slate-600"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {language === 'ar' ? 'تذكر هذا الجهاز كجهاز إدارة معتمد' : 'Remember this device as Admin'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'لن تحتاج لإدخال الرمز في كل مرة على هاتفك الشخصي' : 'Stay authenticated on this browser'}
              </span>
            </div>
          </label>

          {/* Action Buttons */}
          <div className="pt-2 flex flex-col gap-2">
            <button
              type="submit"
              disabled={isSubmitting || pin.length < 3}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 disabled:opacity-50 text-white text-sm font-bold rounded-2xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4 text-amber-300" />
              <span>{language === 'ar' ? 'فتح لوحة التحكم والإدارة' : 'Unlock Admin Dashboard'}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
            </button>

            <button
              type="button"
              onClick={closeModal}
              className="w-full py-2.5 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors"
            >
              {language === 'ar' ? 'الرجوع إلى واجهة المواطن العامة' : 'Return to Citizen Public View'}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};

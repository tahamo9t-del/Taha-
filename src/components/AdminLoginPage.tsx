import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShieldCheck, Lock, KeyRound, AlertCircle, ArrowLeft, ArrowRight, Home, ShieldAlert } from 'lucide-react';

export const AdminLoginPage: React.FC = () => {
  const { loginAdmin, language, setUserRole } = useApp();
  const [pin, setPin] = useState('');
  const [rememberDevice, setRememberDevice] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          ? 'رمز PIN غير مصرح به. يرجى إدخال رمز الإدارة المعتمد (الافتراضي: 2026)' 
          : 'Unauthorized PIN. Please enter authorized admin passcode (Default: 2026)'
      );
    }
    setIsSubmitting(false);
  };

  const handleQuickDigit = (digit: string) => {
    if (pin.length < 8) {
      setPin(prev => prev + digit);
      setError(null);
    }
  };

  const handleBackspace = () => {
    setPin(prev => prev.slice(0, -1));
  };

  const handleReturnToCitizen = () => {
    setUserRole('citizen');
    try {
      if (window.location.hash === '#admin') {
        history.replaceState(null, '', window.location.pathname);
      }
    } catch {}
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-center items-center p-4 relative overflow-hidden select-none">
      {/* Background glow effects */}
      <div className="absolute top-1/4 -start-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -end-20 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Login Container */}
      <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl shadow-2xl backdrop-blur-xl overflow-hidden relative z-10">
        
        {/* Header Banner */}
        <div className="p-8 text-center border-b border-slate-800/80 bg-gradient-to-b from-purple-950/40 via-slate-850 to-transparent">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img 
              src="/assets/aistudio/image_5ae8ef1d.png" 
              alt="SKIP" 
              className="w-12 h-12 object-contain rounded-2xl shadow-md border border-slate-700/50" 
            />
            <div className="text-start">
              <div className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
                <span>SKIP</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                  ADMIN CONSOLE
                </span>
              </div>
              <p className="text-xs text-purple-300 font-medium">المنظومة المركزية لإدارة الطلبات والخدمات</p>
            </div>
          </div>

          <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center">
            <Lock className="w-7 h-7 text-amber-400" />
          </div>

          <h2 className="text-xl font-bold text-white tracking-tight">
            {language === 'ar' ? 'بوابة الإدارة الخاصة والمناديب' : 'Private Administration Terminal'}
          </h2>
          <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto leading-relaxed">
            {language === 'ar' 
              ? 'هذه النسخة مخصصة لمدير المنصة فقط لإدارة الأسعار، وتعيين المناديب، واستقبال الإشعارات الفورية'
              : 'Authorized personnel only. Manage services, pricing, courier fleet, and live order dispatches.'}
          </p>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
          {error && (
            <div className="p-3.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-300">
              {language === 'ar' ? 'رمز الدخول السري المعتمد (PIN):' : 'Authorized Access Passcode (PIN):'}
            </label>
            <div className="relative">
              <KeyRound className="w-5 h-5 absolute start-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
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
                className="w-full ps-11 pe-4 py-3.5 bg-slate-800/80 border border-slate-700 rounded-2xl text-center text-2xl font-mono tracking-widest text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all placeholder:text-slate-500 placeholder:tracking-normal"
              />
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>{language === 'ar' ? 'الرمز الافتراضي: 2026' : 'Default PIN: 2026'}</span>
              <button
                type="button"
                onClick={() => setPin('2026')}
                className="text-amber-400 font-semibold hover:underline"
              >
                {language === 'ar' ? 'تعبئة الرمز (2026)' : 'Fill 2026'}
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
                className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 font-mono font-bold text-xl text-slate-200 transition-all border border-slate-700/50"
              >
                {d}
              </button>
            ))}
            <button
              type="button"
              onClick={() => setPin('')}
              className="py-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 active:scale-95 font-bold text-xs text-slate-400 transition-all border border-slate-700/40"
            >
              {language === 'ar' ? 'مسح' : 'Clear'}
            </button>
            <button
              type="button"
              onClick={() => handleQuickDigit('0')}
              className="py-3 rounded-xl bg-slate-800 hover:bg-slate-700/80 active:scale-95 font-mono font-bold text-xl text-slate-200 transition-all border border-slate-700/50"
            >
              0
            </button>
            <button
              type="button"
              onClick={handleBackspace}
              className="py-3 rounded-xl bg-slate-800/60 hover:bg-slate-700/60 active:scale-95 font-bold text-xs text-slate-400 transition-all border border-slate-700/40"
            >
              ⌫
            </button>
          </div>

          {/* Remember Device Option */}
          <label className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-800/50 border border-slate-700/50 cursor-pointer hover:bg-slate-800/70 transition-colors">
            <input
              type="checkbox"
              checked={rememberDevice}
              onChange={e => setRememberDevice(e.target.checked)}
              className="w-4 h-4 rounded text-purple-600 focus:ring-purple-500 border-slate-600 bg-slate-700"
            />
            <div className="flex flex-col">
              <span className="text-xs font-bold text-slate-200">
                {language === 'ar' ? 'تذكر هذا الجهاز كجهاز إدارة معتمد' : 'Remember this device as Admin'}
              </span>
              <span className="text-[10px] text-slate-400">
                {language === 'ar' ? 'حتى تفتح لوحة التحكم مباشرة من هاتفك أو حاسوبك دون تكرار الرمز' : 'Stay signed in on this private browser'}
              </span>
            </div>
          </label>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button
              type="submit"
              disabled={isSubmitting || pin.length < 3}
              className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 active:scale-98 disabled:opacity-50 text-white text-sm font-bold rounded-2xl shadow-lg shadow-purple-950/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-5 h-5 text-amber-300" />
              <span>{language === 'ar' ? 'تسجيل الدخول وفتح لوحة الإدارة' : 'Unlock Admin Operations'}</span>
              {language === 'ar' ? <ArrowLeft className="w-4 h-4 text-sky-300" /> : <ArrowRight className="w-4 h-4 text-sky-300" />}
            </button>

            <button
              type="button"
              onClick={handleReturnToCitizen}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-800/40 hover:bg-slate-800 text-slate-400 hover:text-slate-200 text-xs font-semibold transition-colors flex items-center justify-center gap-2"
            >
              <Home className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'الرجوع إلى نسخة العميل والمواطن العامة' : 'Return to Public Citizen App'}</span>
            </button>
          </div>
        </form>

      </div>

      {/* Footer copyright */}
      <div className="mt-8 text-center text-xs text-slate-500">
        SKIP Unified Operations & Dispatch Platform · Confidential & Secured
      </div>
    </div>
  );
};

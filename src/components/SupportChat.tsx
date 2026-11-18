import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Send, 
  Truck, 
  Headphones, 
  Stethoscope, 
  CheckCheck, 
  Paperclip, 
  Smile,
  ShieldCheck,
  UserCheck,
  Phone,
  Smartphone,
  ExternalLink
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';

export const SupportChat: React.FC = () => {
  const { 
    activeModal, 
    closeModal, 
    language, 
    chatMessages, 
    sendMessage, 
    userRole, 
    activeCourierForChat 
  } = useApp();
  const [inputText, setInputText] = useState('');
  const [activeChannel, setActiveChannel] = useState<'courier' | 'support' | 'doctor'>(
    PAYMENTS_AND_ORDERS_ENABLED ? 'courier' : 'support'
  );
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedCourier = activeModal.data?.courier || activeCourierForChat;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  if (activeModal.type !== 'chat') return null;

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText, userRole === 'admin' ? 'support' : 'user');
    setInputText('');
  };

  const quickPrompts = userRole === 'admin' ? [
    'تم إسناد المعاملة لك، يرجى سرعة التحرك للعنوان',
    'يرجى التواصل مع العميل هاتفياً وتأكيد الموعد',
    'أكد لي فور استلام أصول المستندات من العميل',
    'تم سداد وتأكيد الرسوم الحكومية، توجّه للجهة'
  ] : PAYMENTS_AND_ORDERS_ENABLED ? (
    language === 'ar' ? [
      'أين المندوب الآن؟',
      'هل أحتاج صور شخصية أصلية؟',
      'متى يصل جواز السفر بعد التجديد؟',
      'أريد تعديل موعد استلام الأوراق من المنزل'
    ] : [
      'Where is the courier now?',
      'Do I need original photos?',
      'When will my passport arrive?',
      'Reschedule home pickup'
    ]
  ) : (
    language === 'ar' ? [
      'هل أحتاج صور شخصية أصلية؟',
      'ما هي مواعيد العمل الرسمية في شبين الكوم وقويسنا؟',
      'هل يشترط حضور صاحب الشأن شخصياً؟',
      'ما هي الأوراق البديلة في حال عدم توفر إيصال مرافق؟'
    ] : [
      'Do I need original personal photos?',
      'What are the official working hours?',
      'Must the applicant attend in person?',
      'Are there alternatives to a utility bill?'
    ]
  );

  const courierPhone = selectedCourier?.phone || '01011223344';
  const courierName = selectedCourier?.name || (language === 'ar' ? 'كابتن أحمد سامي (مندوب سكيب المعتمد)' : 'Capt. Ahmed Samy (SKIP Courier)');
  const rawNum = courierPhone.replace(/\D/g, '');
  const intlNum = rawNum.startsWith('2') ? rawNum : '2' + rawNum;
  const whatsappUrl = `https://wa.me/${intlNum}?text=${encodeURIComponent('مرحباً كابتن ' + courierName + '، بخصوص المعاملات المسندة إليك من منصة SKIP...')}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col h-[650px] max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white flex items-center justify-center font-bold shadow-sm">
                {activeChannel === 'courier' ? <Truck className="w-5 h-5 text-amber-300" /> : activeChannel === 'doctor' ? <Stethoscope className="w-5 h-5 text-sky-300" /> : <Headphones className="w-5 h-5 text-amber-300" />}
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-amber-400 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {activeChannel === 'courier' 
                    ? courierName
                    : activeChannel === 'doctor'
                      ? (language === 'ar' ? 'الفريق الطبي والاستشاري الموحد' : 'Central Medical Team')
                      : (language === 'ar' ? 'دعم عملاء منصة SKIP' : 'SKIP Citizen Support')}
                </h3>
                {activeChannel === 'courier' && selectedCourier?.vehicle && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-800 dark:text-amber-300 font-bold border border-amber-400/30">
                    {selectedCourier.vehicle}
                  </span>
                )}
              </div>
              <p className="text-[11px] text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1 mt-0.5">
                <span>{language === 'ar' ? 'متصل الآن وجاهز للاستلام والتوصيل' : 'Online & ready for dispatch'}</span>
                {activeChannel === 'courier' && (
                  <span className="font-mono text-amber-600 dark:text-amber-400 font-bold ms-1">({courierPhone})</span>
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            {activeChannel === 'courier' && (
              <>
                <a
                  href={`tel:${courierPhone}`}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
                  title="اتصال هاتفي مباشر بالمندوب"
                >
                  <Phone className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 dark:bg-purple-950/60 dark:hover:bg-purple-900/60 text-purple-600 dark:text-purple-300 transition-colors"
                  title="فتح محادثة واتساب المندوب"
                >
                  <Smartphone className="w-4 h-4 text-amber-500" />
                </a>
              </>
            )}
            <button
              onClick={closeModal}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl"
              title="إغلاق المحادثة"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Channel Switcher Tabs */}
        <div className="flex items-center gap-1.5 p-2 bg-slate-100 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
          {PAYMENTS_AND_ORDERS_ENABLED && (
            <button
              onClick={() => setActiveChannel('courier')}
              className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeChannel === 'courier'
                  ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'ar' ? 'المندوب المسؤول' : 'Assigned Courier'}</span>
            </button>
          )}

          <button
            onClick={() => setActiveChannel('support')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeChannel === 'support'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Headphones className="w-3.5 h-3.5 text-sky-300" />
            <span>{language === 'ar' ? 'الدعم الفني' : 'Technical Support'}</span>
          </button>

          <button
            onClick={() => setActiveChannel('doctor')}
            className={`flex-1 py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
              activeChannel === 'doctor'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Stethoscope className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'ar' ? 'الاستشارات الطبية' : 'Medical Team'}</span>
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-slate-50/50 dark:bg-slate-900/40">
          
          <div className="text-center py-2">
            <span className="text-[11px] text-slate-400 bg-slate-200/60 dark:bg-slate-800 px-3 py-1 rounded-full">
              {language === 'ar' ? 'المحادثة مشفرة وآمنة تماماً لحماية خصوصيتك' : 'End-to-End Encrypted Session'}
            </span>
          </div>

          {chatMessages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div
                key={msg.id}
                className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
              >
                <span className="text-[10px] text-slate-400 mb-1 px-1">
                  {language === 'ar' ? msg.senderName : (msg.senderNameEn || msg.senderName)}
                </span>
                <div
                  className={`max-w-[82%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white rounded-be-none shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-bs-none border border-slate-200 dark:border-slate-700 shadow-sm'
                  }`}
                >
                  <p>{msg.message}</p>
                  <div className={`mt-1.5 flex items-center gap-1 text-[10px] ${isUser ? 'text-purple-200 justify-end' : 'text-slate-400 justify-start'}`}>
                    <span>{msg.timestamp}</span>
                    {isUser && <CheckCheck className="w-3.5 h-3.5 text-amber-300" />}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {quickPrompts.map((q, idx) => (
            <button
              key={idx}
              onClick={() => sendMessage(q, 'user')}
              className="px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 bg-slate-100 dark:bg-slate-800 rounded-lg whitespace-nowrap transition-colors"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSend} className="p-3 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={
              language === 'ar' 
                ? 'اكتب رسالتك أو استفسارك هنا للمندوب أو الدعم...' 
                : 'Type your inquiry to courier or team...'
            }
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={!inputText.trim()}
            className="p-2.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-all shadow-sm"
          >
            <Send className="w-4 h-4 text-amber-300" />
          </button>
        </form>

      </div>
    </div>
  );
};

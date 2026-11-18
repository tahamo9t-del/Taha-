import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Truck, 
  CheckCircle2, 
  Clock, 
  MessageSquare, 
  Phone, 
  MapPin,
  Banknote,
  CreditCard,
  ChevronDown,
  ChevronUp,
  X
} from 'lucide-react';

export const DashboardStats: React.FC = () => {
  const { 
    userRequests, 
    language, 
    openModal 
  } = useApp();

  const [isTrackerOpen, setIsTrackerOpen] = useState(false);

  return (
    <section id="requests-tracker" className="py-6 bg-slate-50 dark:bg-slate-950 transition-colors border-b border-slate-200/60 dark:border-slate-800/60 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Collapsed State: Interactive Icon Bar */}
        {!isTrackerOpen ? (
          <button
            onClick={() => setIsTrackerOpen(true)}
            className="w-full group p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500/60 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-start cursor-pointer"
          >
            <div className="flex items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-xs">
                <Truck className="w-5 h-5 sm:w-6 sm:h-6" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full ring-2 ring-white dark:ring-slate-900 animate-pulse" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm sm:text-lg font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors truncate">
                    {language === 'ar' ? 'متابعة طلباتي ومسار المندوب' : 'My Requests & Courier Tracking'}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-bold px-2 py-0.5 bg-amber-400/15 text-amber-700 dark:text-amber-300 rounded-full border border-amber-300/40 dark:border-amber-700/50 shrink-0">
                    {userRequests.length} {language === 'ar' ? 'معاملات' : 'Active'}
                  </span>
                </div>
                <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                  {language === 'ar' 
                    ? 'اضغط هنا لفتح مسار خط سير المندوب ومراحل إنجاز الأوراق والتواصل معه' 
                    : 'Click here to expand live courier timeline and contact'}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-1.5 w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold shadow-md shadow-purple-950/20 transition-all shrink-0">
              <Truck className="w-3.5 h-3.5 text-amber-300" />
              <span>{language === 'ar' ? 'فتح ومتابعة مسار المندوب' : 'Open Tracking'}</span>
              <ChevronDown className="w-3.5 h-3.5 group-hover:translate-y-0.5 transition-transform" />
            </div>
          </button>
        ) : (
          /* Expanded Full Tracker */
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            
            {/* Header with Close / Collapse button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Truck className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white">
                    {language === 'ar' ? 'متابعة طلباتي ومسار المندوب' : 'My Requests & Courier Tracking'}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'متابعة فورية لمراحل إنجاز أوراقك وحالة تسليم المندوب' : 'Real-time tracking of your paperwork and delivery'}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-3 py-1 bg-amber-400/15 text-amber-700 dark:text-amber-300 rounded-full border border-amber-300/40 dark:border-amber-700/50">
                  {userRequests.length} {language === 'ar' ? 'معاملات مسجلة' : 'Requests'}
                </span>
                <button
                  onClick={() => setIsTrackerOpen(false)}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title={language === 'ar' ? 'إغلاق وطي' : 'Close'}
                >
                  <ChevronUp className="w-4 h-4" />
                  <span>{language === 'ar' ? 'طي وإخفاء' : 'Collapse'}</span>
                </button>
              </div>
            </div>

            {/* Requests List */}
            {userRequests.length === 0 ? (
              <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                <Truck className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  {language === 'ar' ? 'لا توجد طلبات جارية حالياً' : 'No active requests'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'ar' ? 'اختر خدمة من الدليل أو اطلب مندوباً لباب بيتك لبدء معاملتك' : 'Select a service or book a courier to get started'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {userRequests.map((req) => {
                  const isCash = req.paymentMethod === 'cash';
                  return (
                    <div
                      key={req.id}
                      className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 shadow-xs transition-all"
                    >
                      
                      {/* Top line: Ref & Status */}
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700 gap-2">
                        <div>
                          <div className="flex items-center gap-2 text-xs mb-1">
                            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">{req.referenceNumber}</span>
                            <span className="text-slate-400">·</span>
                            <span className="text-slate-500 font-mono text-[11px]">{req.createdAt}</span>
                            <span className="text-slate-400">·</span>
                            <span className={`text-[11px] font-bold flex items-center gap-1 ${isCash ? 'text-amber-600 dark:text-amber-400' : 'text-sky-600 dark:text-sky-400'}`}>
                              {isCash ? <Banknote className="w-3.5 h-3.5" /> : <CreditCard className="w-3.5 h-3.5" />}
                              <span>{isCash ? `كاش للمندوب (${req.fee} ج.م)` : `مسدد إلكترونياً (${req.fee} ج.م)`}</span>
                            </span>
                          </div>
                          <h3 className="text-base font-bold text-slate-900 dark:text-white">
                            {language === 'ar' ? req.serviceTitle : req.serviceTitleEn}
                          </h3>
                        </div>

                        {req.courierRequested && (
                          <button
                            onClick={() => openModal('chat')}
                            className="self-start sm:self-auto px-3.5 py-1.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl transition-all flex items-center gap-1.5 shadow-sm shadow-purple-950/20"
                          >
                            <MessageSquare className="w-3.5 h-3.5 text-sky-300" />
                            <span>{language === 'ar' ? 'محادثة المندوب' : 'Chat Courier'}</span>
                          </button>
                        )}
                      </div>

                      {/* Courier details if assigned */}
                      {req.courierRequested && req.courierName && (
                        <div className="mt-3 p-3 rounded-xl bg-purple-50/70 dark:bg-purple-950/40 border border-purple-200/80 dark:border-purple-800/60 flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-lg bg-purple-700 text-white flex items-center justify-center font-bold text-[11px]">
                              <Truck className="w-3.5 h-3.5 text-amber-300" />
                            </div>
                            <div>
                              <span className="font-bold text-slate-900 dark:text-white">{req.courierName}</span>
                              <span className="text-slate-500 text-[11px] block">{req.address}</span>
                            </div>
                          </div>
                          <span className="font-mono text-amber-600 dark:text-amber-400 font-bold">{req.courierPhone}</span>
                        </div>
                      )}

                      {/* Concise Steps Timeline */}
                      <div className="mt-4 grid grid-cols-2 sm:grid-cols-5 gap-1.5 sm:gap-2">
                        {req.trackingSteps.map((step, sIdx) => {
                          const isLastOnMobile = sIdx === req.trackingSteps.length - 1;
                          return (
                            <div
                              key={sIdx}
                              className={`p-2 sm:p-2.5 rounded-xl border text-xs transition-all ${
                                isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
                              } ${
                                step.completed
                                  ? 'bg-purple-50/60 dark:bg-purple-950/40 border-purple-500/60 text-slate-900 dark:text-white'
                                  : 'bg-white/40 dark:bg-slate-900/30 border-slate-200 dark:border-slate-800 text-slate-400 opacity-60'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-[10px] font-mono text-slate-400">0{sIdx + 1}</span>
                                {step.completed ? (
                                  <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 dark:text-amber-400" />
                                ) : (
                                  <div className="w-2.5 h-2.5 rounded-full border border-slate-400" />
                                )}
                              </div>
                              <span className="font-bold text-[10px] sm:text-[11px] line-clamp-1 block">
                                {language === 'ar' ? step.title : step.titleEn}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

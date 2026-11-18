import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import { 
  X, 
  CheckCircle2, 
  Circle, 
  CreditCard, 
  Clock, 
  Building2, 
  Truck, 
  AlertCircle, 
  FileCheck,
  ShieldCheck,
  Download,
  Share2,
  MessageSquare,
  RotateCcw
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';

export const ServiceDetailsModal: React.FC = () => {
  const { activeModal, closeModal, language, openModal } = useApp();
  const service: ServiceItem | undefined = activeModal.data;

  // Store checked state per service ID so services don't share checklist state
  const [checkedDocsByService, setCheckedDocsByService] = useState<Record<string, Record<number, boolean>>>({});

  if (activeModal.type !== 'service_details' || !service) return null;

  const checkedDocs = checkedDocsByService[service.id] || {};

  const toggleDoc = (index: number) => {
    setCheckedDocsByService(prev => ({
      ...prev,
      [service.id]: {
        ...(prev[service.id] || {}),
        [index]: !(prev[service.id]?.[index])
      }
    }));
  };

  const resetServiceDocs = () => {
    setCheckedDocsByService(prev => ({
      ...prev,
      [service.id]: {}
    }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = service.requiredDocuments.length;
  const progressPercent = totalDocs > 0 ? Math.round((completedCount / totalDocs) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Modal Top Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
              <span>{language === 'ar' ? service.responsibleEntity : service.responsibleEntityEn}</span>
              {PAYMENTS_AND_ORDERS_ENABLED && (
                <>
                  <span aria-hidden="true">·</span>
                  <span className="text-amber-600 dark:text-amber-400 font-bold">{service.courierSupported ? (language === 'ar' ? 'يدعم المندوب المنزلي' : 'Courier Supported') : (language === 'ar' ? 'شباك حكومي' : 'Office Window')}</span>
                </>
              )}
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
              {language === 'ar' ? service.title : service.titleEn}
            </h2>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {/* Key Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {PAYMENTS_AND_ORDERS_ENABLED ? (
              <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                  {language === 'ar' ? 'الرسوم الرسمية:' : 'Official Fee:'}
                </span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  {service.fee} {language === 'ar' ? 'جنيه مصري' : 'EGP'}
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                  {language === 'ar' ? 'المستندات المطلوبة:' : 'Required Papers:'}
                </span>
                <span className="text-base font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
                  {totalDocs} {language === 'ar' ? 'أوراق ومستندات' : 'documents'}
                </span>
              </div>
            )}

            <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                {language === 'ar' ? 'الوقت المقدر للإنجاز:' : 'Estimated Duration:'}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? service.estimatedDuration : service.estimatedDurationEn}
              </span>
            </div>

            {PAYMENTS_AND_ORDERS_ENABLED ? (
              <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                  {language === 'ar' ? 'المندوب والتوصيل المنزلي:' : 'Courier Home Service:'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <Truck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>{language === 'ar' ? 'متاح لباب البيت' : 'Available at Doorstep'}</span>
                </span>
              </div>
            ) : (
              <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 col-span-2 sm:col-span-1">
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block mb-1">
                  {language === 'ar' ? 'حالة فحص الأوراق:' : 'Checklist Progress:'}
                </span>
                <span className="text-xs sm:text-sm font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1.5">
                  <FileCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
                  <span>
                    {completedCount === totalDocs && totalDocs > 0
                      ? (language === 'ar' ? 'جاهز للتوجه للمصلحة' : 'Ready to go!')
                      : (language === 'ar' ? `تم تجهيز ${completedCount} من ${totalDocs}` : `${completedCount} of ${totalDocs} checked`)}
                  </span>
                </span>
              </div>
            )}
          </div>

          {/* Document Preparation Checklist (Core value of SKIP: اعرف المطلوب قبل ما تروح) */}
          <div className="p-5 rounded-3xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/70 dark:border-purple-800/60">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FileCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                  <span>{language === 'ar' ? 'قائمة الأوراق والمستندات المطلوبة (جهّز قبل ما تنزل):' : 'Mandatory Document Checklist:'}</span>
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  {language === 'ar' ? 'اضغط على كل ورقة لتأكيد تجهيزها والتأكد من عدم نسيان أي ورقة:' : 'Check each document as you prepare it:'}
                </p>
              </div>
              <div className="text-end">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  {completedCount} / {totalDocs}
                </span>
                <div className="w-20 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300" 
                    style={{ width: `${progressPercent}%` }} 
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              {service.requiredDocuments.map((doc, idx) => {
                const isChecked = !!checkedDocs[idx];
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => toggleDoc(idx)}
                    className={`w-full text-start p-3 rounded-2xl transition-all border flex items-start gap-3 ${
                      isChecked
                        ? 'bg-white dark:bg-slate-900 border-purple-500 shadow-sm'
                        : 'bg-white/80 dark:bg-slate-900/60 border-slate-200/80 dark:border-slate-800 hover:border-purple-300'
                    }`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isChecked ? (
                        <CheckCircle2 className="w-5 h-5 text-amber-500 fill-amber-100 dark:fill-amber-950/60" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-300 dark:text-slate-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-xs sm:text-sm font-semibold ${isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'}`}>
                          {language === 'ar' ? doc.name : doc.nameEn}
                        </span>
                        {doc.copiesCount && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md shrink-0">
                            {doc.copiesCount} {language === 'ar' ? 'نسخ' : 'copies'}
                          </span>
                        )}
                      </div>
                      {doc.notes && (
                        <p className="text-[11px] text-amber-700 dark:text-amber-400 mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{doc.notes}</span>
                        </p>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Step by step procedures */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-3">
              {language === 'ar' ? 'خطوات وإجراءات المعاملة الرسمية:' : 'Step-by-Step Procedure:'}
            </h3>
            <ol className="space-y-2.5">
              {(language === 'ar' ? service.procedureSteps : service.procedureStepsEn).map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Conditions & Eligibility */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-500" />
              <span>{language === 'ar' ? 'الشروط والضوابط الرسمية:' : 'Official Eligibility Rules:'}</span>
            </h4>
            <ul className="space-y-1">
              {(language === 'ar' ? service.conditions : service.conditionsEn).map((cond, cIdx) => (
                <li key={cIdx} className="text-xs text-slate-600 dark:text-slate-400 list-disc list-inside">
                  {cond}
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Modal Bottom Fixed CTA Actions */}
        {PAYMENTS_AND_ORDERS_ENABLED ? (
          <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            
            <button
              onClick={() => {
                closeModal();
                openModal('courier_booking', { service });
              }}
              className="w-full sm:w-auto px-5 py-3 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              <Truck className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'طلب مندوب لاستلام الأوراق من البيت' : 'Book Courier to Collect Papers'}</span>
            </button>

            <button
              onClick={() => {
                closeModal();
                openModal('payment', { service });
              }}
              className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>
                {language === 'ar' ? `بدء التقديم وسداد الرسوم (${service.fee} ج.م)` : `Apply & Pay (${service.fee} EGP)`}
              </span>
            </button>

          </div>
        ) : (
          <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={resetServiceDocs}
                  className="px-4 py-2.5 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'إعادة التصفير' : 'Reset'}</span>
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  closeModal();
                  openModal('chat');
                }}
                className="flex-1 sm:flex-initial px-4 py-2.5 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-950 rounded-xl border border-purple-200 dark:border-purple-800 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{language === 'ar' ? 'استفسار عن مستند' : 'Ask About Document'}</span>
              </button>
            </div>

            <button
              type="button"
              onClick={closeModal}
              className="w-full sm:w-auto px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 text-amber-300" />
              <span>
                {completedCount === totalDocs && totalDocs > 0
                  ? (language === 'ar' ? 'تم تجهيز جميع الأوراق بنجاح' : 'All Documents Ready')
                  : (language === 'ar' ? `تم فحص الأوراق (${completedCount}/${totalDocs}) — إغلاق` : `Checked (${completedCount}/${totalDocs}) — Close`)}
              </span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';
import { enrichServiceWithSeo, getServiceSlug } from '../data/seoMetadata';
import { GUIDES_DATA } from '../data/guidesData';
import { navigateTo } from '../seo/clientSeoSync';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Circle,
  Clock,
  Building2,
  FileCheck,
  ShieldCheck,
  ExternalLink,
  Banknote,
  Sparkles,
  AlertCircle,
  BookOpen,
  RotateCcw,
  CreditCard
} from 'lucide-react';

interface ServiceDetailPageProps {
  service: ServiceItem;
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ service: rawService }) => {
  const { language, services, openModal } = useApp();
  const service = enrichServiceWithSeo(rawService);
  const [checkedDocs, setCheckedDocs] = useState<Record<number, boolean>>({});

  const toggleDoc = (idx: number) => {
    setCheckedDocs(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const completedCount = Object.values(checkedDocs).filter(Boolean).length;
  const totalDocs = service.requiredDocuments.length;
  const progressPercent = totalDocs > 0 ? Math.round((completedCount / totalDocs) * 100) : 0;

  const officialFee = service.officialFee ?? service.fee;
  const skipFee = service.skipFee ?? 0;

  const currentSlug = getServiceSlug(service);
  const relatedGuides = GUIDES_DATA.filter(g => g.relatedServiceSlugs.includes(currentSlug));
  const relatedServices = services
    .filter(s => s.category === service.category && s.id !== service.id)
    .slice(0, 3)
    .map(enrichServiceWithSeo);

  const categoryLabelAr =
    service.category === 'government'
      ? 'حكومية وهويات'
      : service.category === 'educational'
        ? 'تعليم وجامعات'
        : service.category === 'housing'
          ? 'إسكان ومرافق'
          : 'مستشفيات وصحة';

  const categoryLabelEn =
    service.category === 'government'
      ? 'Government & ID'
      : service.category === 'educational'
        ? 'Education & Universities'
        : service.category === 'housing'
          ? 'Housing & Utilities'
          : 'Hospitals & Health';

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
          >
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </a>
          <span>/</span>
          <span>{language === 'ar' ? categoryLabelAr : categoryLabelEn}</span>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold line-clamp-1">
            {language === 'ar' ? service.title : service.titleEn}
          </span>
        </nav>

        {/* Hero Header Card */}
        <header className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-purple-500/30 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-bold">
              <Building2 className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? service.responsibleEntity : service.responsibleEntityEn}</span>
            </span>

            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
              <span>{language === 'ar' ? 'العودة للدليل الرئيسي' : 'Back to Directory'}</span>
            </a>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black leading-snug">
            {language === 'ar' ? service.title : service.titleEn}
          </h1>

          <p className="text-sm text-slate-200 leading-relaxed max-w-3xl">
            {language === 'ar' ? service.description : service.descriptionEn}
          </p>
        </header>

        {/* Key Metadata Grid: Official Fee vs SKIP Fee Separately, Duration, Official Source */}
        <section className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Official Fee */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Banknote className="w-4 h-4 text-amber-500" />
              <span>{language === 'ar' ? 'الرسوم الحكومية الرسمية:' : 'Official Government Fee:'}</span>
            </div>
            <div className="text-lg font-black text-amber-600 dark:text-amber-400 tabular-nums">
              {officialFee === 0
                ? (language === 'ar' ? 'مجاناً بالجهة' : 'Free of charge')
                : `${officialFee} ${language === 'ar' ? 'جنيه مصري' : 'EGP'}`}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {language === 'ar' ? 'تُسدد بالجهة الحكومية الرسمية' : 'Payable directly to government authority'}
            </p>
          </div>

          {/* SKIP Service Fee Separately */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span>{language === 'ar' ? 'رسوم خدمة SKIP:' : 'SKIP Service Fee:'}</span>
            </div>
            <div className="text-lg font-black text-purple-700 dark:text-purple-300 tabular-nums">
              {skipFee === 0
                ? (language === 'ar' ? 'مجانية (0 ج.م)' : 'Free (0 EGP)')
                : `${skipFee} ${language === 'ar' ? 'جنيه مصري' : 'EGP'}`}
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">
              {PAYMENTS_AND_ORDERS_ENABLED
                ? (language === 'ar' ? 'رسوم التجهيز والمتابعة عبر SKIP' : 'SKIP handling & follow-up fee')
                : (language === 'ar' ? 'فحص الأوراق مجاني حالياً لحين الاعتماد' : 'Document check free pending licensing')}
            </p>
          </div>

          {/* Estimated Duration */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
              <Clock className="w-4 h-4 text-sky-500" />
              <span>{language === 'ar' ? 'المدة المتوقعة للإنجاز:' : 'Estimated Duration:'}</span>
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              {language === 'ar' ? service.estimatedDuration : service.estimatedDurationEn}
            </div>
          </div>

          {/* Official Government Source Link */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-1">
                <ShieldCheck className="w-4 h-4 text-sky-500" />
                <span>{language === 'ar' ? 'المصدر الحكومي الرسمي:' : 'Official Government Source:'}</span>
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">
                {language === 'ar' ? service.officialSourceName : service.officialSourceNameEn}
              </div>
            </div>
            <a
              href={service.officialSourceUrl || 'https://digital.gov.eg'}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>{language === 'ar' ? 'زيارة البوابة الرسمية' : 'Visit Official Portal'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </section>

        {/* Interactive Required Documents Checklist */}
        <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-purple-200 dark:border-purple-800/60 shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                <span>{language === 'ar' ? 'الأوراق والمستندات المطلوبة' : 'Required Documents Checklist'}</span>
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                {language === 'ar'
                  ? 'اضغط على كل مستند لتأكيد تجهيزه وفحص ملفك قبل الذهاب للمصلحة:'
                  : 'Check each document to verify readiness before visiting the office:'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {completedCount > 0 && (
                <button
                  type="button"
                  onClick={() => setCheckedDocs({})}
                  className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-200 flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>{language === 'ar' ? 'تصفير' : 'Reset'}</span>
                </button>
              )}
              <div className="text-end">
                <span className="text-xs font-bold text-purple-700 dark:text-purple-300">
                  {completedCount} / {totalDocs}
                </span>
                <div className="w-24 h-2 bg-slate-200 dark:bg-slate-700 rounded-full mt-1 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-purple-600 to-indigo-600 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          <ul className="space-y-2.5">
            {service.requiredDocuments.map((doc, idx) => {
              const isChecked = !!checkedDocs[idx];
              return (
                <li key={idx}>
                  <button
                    type="button"
                    onClick={() => toggleDoc(idx)}
                    className={`w-full text-start p-3.5 rounded-2xl transition-all border flex items-start gap-3 cursor-pointer ${
                      isChecked
                        ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-500 shadow-xs'
                        : 'bg-slate-50/80 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-purple-300'
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
                        <span
                          className={`text-xs sm:text-sm font-bold ${
                            isChecked ? 'line-through text-slate-400 dark:text-slate-500' : 'text-slate-800 dark:text-slate-100'
                          }`}
                        >
                          {language === 'ar' ? doc.name : doc.nameEn}
                        </span>
                        {doc.copiesCount && (
                          <span className="text-[10px] font-bold px-2 py-0.5 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-md border border-slate-200 dark:border-slate-700 shrink-0">
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
                </li>
              );
            })}
          </ul>
        </section>

        {/* Conditions & Procedure Steps */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Conditions */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-sky-500" />
              <span>{language === 'ar' ? 'شروط استخراج الخدمة' : 'Eligibility Conditions'}</span>
            </h2>
            <ul className="space-y-2.5">
              {(language === 'ar' ? service.conditions : service.conditionsEn).map((cond, cIdx) => (
                <li key={cIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{cond}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Steps */}
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-5 h-5 text-amber-500" />
              <span>{language === 'ar' ? 'خطوات التقديم الرسمية' : 'Step-by-Step Application'}</span>
            </h2>
            <ol className="space-y-2.5">
              {(language === 'ar' ? service.procedureSteps : service.procedureStepsEn).map((step, sIdx) => (
                <li key={sIdx} className="flex items-start gap-3 text-xs sm:text-sm text-slate-600 dark:text-slate-300">
                  <span className="w-6 h-6 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {sIdx + 1}
                  </span>
                  <span className="leading-relaxed">{step}</span>
                </li>
              ))}
            </ol>
          </section>
        </div>

        {/* Optional CTA if payments enabled */}
        {PAYMENTS_AND_ORDERS_ENABLED && (
          <div className="p-5 rounded-3xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs sm:text-sm font-bold text-purple-950 dark:text-purple-200">
              {language === 'ar' ? 'جاهز لتقديم المعاملة أو طلب المندوب؟' : 'Ready to apply or book a courier?'}
            </p>
            <button
              onClick={() => openModal('payment', { service })}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-700 to-indigo-600 text-white text-xs sm:text-sm font-bold flex items-center gap-2 cursor-pointer"
            >
              <CreditCard className="w-4 h-4 text-amber-300" />
              <span>{language === 'ar' ? 'بدء التقديم' : 'Apply Now'}</span>
            </button>
          </div>
        )}

        {/* Related Guides */}
        {relatedGuides.length > 0 && (
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
            <h2 className="text-base font-black text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-purple-600" />
              <span>{language === 'ar' ? 'أدلة ومقالات مفيدة عن هذه الخدمة' : 'Related Procedural Guides'}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedGuides.map(g => (
                <a
                  key={g.id}
                  href={`/guides/${g.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/guides/${g.slug}`);
                  }}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200 dark:border-slate-700 transition-colors block"
                >
                  <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400">
                    {language === 'ar' ? g.categoryLabel : g.categoryLabelEn}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1">
                    {language === 'ar' ? g.title : g.titleEn}
                  </h3>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Related Services */}
        {relatedServices.length > 0 && (
          <section className="space-y-3">
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              {language === 'ar' ? 'خدمات أخرى قد تهمك' : 'Related Services'}
            </h2>
            <div className="grid sm:grid-cols-3 gap-4">
              {relatedServices.map(rs => {
                const rSlug = getServiceSlug(rs);
                return (
                  <a
                    key={rs.id}
                    href={`/services/${rSlug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/services/${rSlug}`);
                    }}
                    className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 transition-all block"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2">
                      {language === 'ar' ? rs.title : rs.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {language === 'ar' ? rs.description : rs.descriptionEn}
                    </p>
                  </a>
                );
              })}
            </div>
          </section>
        )}

      </div>
    </div>
  );
};

import React from 'react';
import { useApp } from '../context/AppContext';
import { GUIDES_DATA } from '../data/guidesData';
import { navigateTo } from '../seo/clientSeoSync';
import { BookOpen, Clock, ArrowRight, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

export const GuidesIndexPage: React.FC = () => {
  const { language } = useApp();

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="hover:text-purple-600 dark:hover:text-purple-400"
          >
            {language === 'ar' ? 'الرئيسية' : 'Home'}
          </a>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold">
            {language === 'ar' ? 'أدلة ومقالات الإجراءات الحكومية' : 'Guides & Articles'}
          </span>
        </nav>

        <header className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-purple-900 via-slate-900 to-indigo-950 text-white shadow-xl border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/20 text-purple-200 border border-purple-400/30 text-xs font-bold">
              <BookOpen className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'موسوعة الإجراءات المصرية' : 'Egyptian Procedures Knowledge Base'}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black">
              {language === 'ar' ? 'أدلة ومقالات الأوراق المطلوبة للخدمات الحكومية 2026' : 'Government Paperwork Guides & Articles 2026'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-2xl">
              {language === 'ar'
                ? 'شروحات محدثة للأوراق المطلوبة لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخص القيادة والسيارات، وتقديم الكليات.'
                : 'Updated guides for passports, National ID, criminal record, driving licenses, and university enrollment.'}
            </p>
          </div>

          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors shrink-0 self-start sm:self-center"
          >
            {language === 'ar' ? <ArrowRight className="w-4 h-4" /> : <ArrowLeft className="w-4 h-4" />}
            <span>{language === 'ar' ? 'العودة للرئيسية' : 'Back Home'}</span>
          </a>
        </header>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GUIDES_DATA.map((guide) => (
            <a
              key={guide.id}
              href={`/guides/${guide.slug}`}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(`/guides/${guide.slug}`);
              }}
              className="group p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-400 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between gap-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                    {language === 'ar' ? guide.categoryLabel : guide.categoryLabelEn}
                  </span>
                  <span className="flex items-center gap-1 text-slate-400">
                    <Clock className="w-3.5 h-3.5 text-sky-500" />
                    <span>{language === 'ar' ? guide.readingTime : guide.readingTimeEn}</span>
                  </span>
                </div>

                <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {language === 'ar' ? guide.title : guide.titleEn}
                </h2>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {language === 'ar' ? guide.excerpt : guide.excerptEn}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300">
                <span>{language === 'ar' ? 'اقرأ الدليل الكامل' : 'Read Full Guide'}</span>
                {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-amber-500" /> : <ChevronRight className="w-4 h-4 text-amber-500" />}
              </div>
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

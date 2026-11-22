import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { GUIDES_DATA } from '../data/guidesData';
import { navigateTo } from '../seo/clientSeoSync';
import { BookOpen, Clock, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';

export const GuidesSection: React.FC = () => {
  const { language } = useApp();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="guides" className="py-6 sm:py-10 bg-white dark:bg-slate-900 transition-colors border-t border-slate-200/70 dark:border-slate-800/70 w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-5">

        {/* Single Clickable Trigger Box */}
        <button
          type="button"
          onClick={() => setIsExpanded(prev => !prev)}
          aria-expanded={isExpanded}
          aria-controls="guides-accordion-panel"
          className={`w-full text-start p-5 sm:p-6 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group ${
            isExpanded
              ? 'bg-purple-50/70 dark:bg-purple-950/30 border-purple-400 dark:border-purple-600 shadow-md'
              : 'bg-slate-50 dark:bg-slate-800/60 hover:bg-white dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80 hover:border-purple-400 hover:shadow-lg'
          }`}
        >
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-gradient-to-br from-purple-600 to-purple-800 text-white flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6 text-amber-300" />
            </div>

            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 text-[11px] font-bold border border-purple-200 dark:border-purple-800">
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>{language === 'ar' ? 'أدلة ومقالات إرشادية' : 'Official Paperwork Guides'}</span>
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 text-[11px] font-bold">
                  {language === 'ar' ? `${GUIDES_DATA.length} أدلة شاملة` : `${GUIDES_DATA.length} Full Guides`}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight group-hover:text-purple-700 dark:group-hover:text-purple-300 transition-colors">
                {language === 'ar' ? 'أدلة الإجراءات والأوراق الحكومية في مصر' : 'Egyptian Procedures & Paperwork Guides'}
              </h2>

              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {language === 'ar'
                  ? 'جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخص القيادة والسيارة، تقديم الكليات، والعلاج على نفقة الدولة.'
                  : 'Passport, National ID, Criminal Record, Driving & Car Licenses, University Admission, and State-Funded Healthcare.'}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-3 sm:pt-0 border-t sm:border-t-0 border-slate-200/80 dark:border-slate-700/80 shrink-0">
            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-purple-600 group-hover:bg-purple-700 text-white text-xs sm:text-sm font-bold shadow-sm transition-colors">
              <span>
                {isExpanded
                  ? language === 'ar'
                    ? 'إخفاء الأدلة'
                    : 'Hide Guides'
                  : language === 'ar'
                    ? 'اضغط لفتح جميع الأدلة'
                    : 'Click to Open All Guides'}
              </span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-amber-300" />
              ) : (
                <ChevronDown className="w-4 h-4 text-amber-300" />
              )}
            </span>
          </div>
        </button>

        {/* Expanded Guides Container */}
        {isExpanded && (
          <div id="guides-accordion-panel" className="space-y-5 pt-1">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-1">
              <p className="text-xs sm:text-sm font-semibold text-slate-600 dark:text-slate-300">
                {language === 'ar'
                  ? 'اختر الدليل المطلوب لعرض الأوراق، الشروط، الخطوات، والأسئلة الشائعة بالتفصيل:'
                  : 'Select a guide to view required paperwork, conditions, steps, and FAQs:'}
              </p>

              <a
                href="/guides"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/guides');
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-purple-50 dark:bg-purple-950/50 hover:bg-purple-100 dark:hover:bg-purple-950 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800 transition-colors self-start sm:self-auto"
              >
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>{language === 'ar' ? 'فتح صفحة الأدلة الكاملة' : 'Open Full Guides Directory'}</span>
              </a>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              {GUIDES_DATA.map((guide) => (
                <a
                  key={guide.id}
                  href={`/guides/${guide.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    navigateTo(`/guides/${guide.slug}`);
                  }}
                  className="group p-5 rounded-3xl bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 hover:border-purple-400 hover:shadow-lg transition-all flex flex-col justify-between gap-4"
                >
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="px-2.5 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300 font-bold">
                        {language === 'ar' ? guide.categoryLabel : guide.categoryLabelEn}
                      </span>
                      <span className="flex items-center gap-1 text-slate-400">
                        <Clock className="w-3 h-3 text-sky-500" />
                        <span>{language === 'ar' ? guide.readingTime : guide.readingTimeEn}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug line-clamp-2">
                      {language === 'ar' ? guide.title : guide.titleEn}
                    </h3>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {language === 'ar' ? guide.excerpt : guide.excerptEn}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-200/70 dark:border-slate-700/70 flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300">
                    <span>{language === 'ar' ? 'قراءة الدليل الكامل' : 'Read Full Guide'}</span>
                    {language === 'ar' ? (
                      <ChevronLeft className="w-4 h-4 text-amber-500 group-hover:-translate-x-1 transition-transform" />
                    ) : (
                      <ChevronRight className="w-4 h-4 text-amber-500 group-hover:translate-x-1 transition-transform" />
                    )}
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}

      </div>
    </section>
  );
};


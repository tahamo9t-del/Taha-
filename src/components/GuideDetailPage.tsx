import React from 'react';
import { useApp } from '../context/AppContext';
import { GuideArticle, ServiceItem } from '../types';
import { findServiceBySlugOrId, getServiceSlug } from '../data/seoMetadata';
import { navigateTo } from '../seo/clientSeoSync';
import {
  ArrowRight,
  ArrowLeft,
  BookOpen,
  Clock,
  CheckCircle2,
  HelpCircle,
  ExternalLink,
  FileCheck2
} from 'lucide-react';

interface GuideDetailPageProps {
  guide: GuideArticle;
}

export const GuideDetailPage: React.FC<GuideDetailPageProps> = ({ guide }) => {
  const { language, services } = useApp();

  const relatedServices = guide.relatedServiceSlugs
    .map(slug => findServiceBySlugOrId(services, slug))
    .filter((s): s is ServiceItem => Boolean(s));

  return (
    <div className="pt-24 sm:pt-28 pb-16 bg-slate-50 dark:bg-slate-950 min-h-screen transition-colors">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
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
          <a
            href="/guides"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/guides');
            }}
            className="hover:text-purple-600 dark:hover:text-purple-400"
          >
            {language === 'ar' ? 'أدلة ومقالات' : 'Guides'}
          </a>
          <span>/</span>
          <span className="text-slate-900 dark:text-white font-bold line-clamp-1">
            {language === 'ar' ? guide.title : guide.titleEn}
          </span>
        </nav>

        <article className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
          <header className="space-y-3 pb-5 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 font-bold">
                  {language === 'ar' ? guide.categoryLabel : guide.categoryLabelEn}
                </span>
                <span className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5 text-sky-500" />
                  <span>{language === 'ar' ? guide.readingTime : guide.readingTimeEn}</span>
                </span>
              </div>

              <a
                href="/guides"
                onClick={(e) => {
                  e.preventDefault();
                  navigateTo('/guides');
                }}
                className="inline-flex items-center gap-1 text-xs font-bold text-purple-600 dark:text-purple-400 hover:underline"
              >
                {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                <span>{language === 'ar' ? 'كل الأدلة' : 'All Guides'}</span>
              </a>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white leading-snug">
              {language === 'ar' ? guide.title : guide.titleEn}
            </h1>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {language === 'ar' ? guide.excerpt : guide.excerptEn}
            </p>
          </header>

          {/* Sections */}
          <div className="space-y-6">
            {guide.sections.map((sec, idx) => (
              <section key={idx} className="space-y-3">
                <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  {language === 'ar' ? sec.heading : sec.headingEn}
                </h2>
                {(language === 'ar' ? sec.paragraphs : sec.paragraphsEn).map((p, pIdx) => (
                  <p key={pIdx} className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    {p}
                  </p>
                ))}
                {sec.bullets && (
                  <ul className="space-y-2 pt-1">
                    {(language === 'ar' ? sec.bullets : (sec.bulletsEn || sec.bullets)).map((b, bIdx) => (
                      <li key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/70 dark:border-slate-800">
                        <CheckCircle2 className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>

          {/* FAQs */}
          {guide.faqs.length > 0 && (
            <section className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-purple-600" />
                <span>{language === 'ar' ? 'الأسئلة الشائعة' : 'Frequently Asked Questions'}</span>
              </h2>
              <div className="space-y-3">
                {guide.faqs.map((faq, fIdx) => (
                  <div key={fIdx} className="p-4 rounded-2xl bg-purple-50/50 dark:bg-purple-950/20 border border-purple-200/60 dark:border-purple-800/40">
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? faq.question : faq.questionEn}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {language === 'ar' ? faq.answer : faq.answerEn}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Official Government Source */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300">
              {language === 'ar' ? `المصدر الرسمي: ${guide.officialSourceName}` : `Official Source: ${guide.officialSourceName}`}
            </span>
            <a
              href={guide.officialSourceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 font-bold text-purple-600 dark:text-purple-400 hover:underline"
            >
              <span>{language === 'ar' ? 'الانتقال للمصدر الحكومي' : 'Visit Official Source'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </article>

        {/* Related Service Pages */}
        {relatedServices.length > 0 && (
          <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-amber-500" />
              <span>{language === 'ar' ? 'افحص أوراقك الآن في صفحات الخدمات المرتبطة' : 'Interactive Checklists for Related Services'}</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-3">
              {relatedServices.map(srv => {
                const slug = getServiceSlug(srv);
                return (
                  <a
                    key={srv.id}
                    href={`/services/${slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      navigateTo(`/services/${slug}`);
                    }}
                    className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200 dark:border-slate-700 transition-colors block"
                  >
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? srv.title : srv.titleEn}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {language === 'ar' ? srv.description : srv.descriptionEn}
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

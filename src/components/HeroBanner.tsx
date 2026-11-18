import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  CreditCard, 
  Sparkles,
  CheckCircle2,
  FileCheck2
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';

export const HeroBanner: React.FC = () => {
  const { language } = useApp();

  return (
    <section id="home" className="relative overflow-hidden pt-24 pb-14 sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24 min-h-[520px] sm:min-h-[580px] flex items-center transition-all duration-500 w-full">
      
      {/* Authentic High-Definition Real Cairo Nile & Tower Photo Matching Golden - Purple - Light Blue Palette */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img 
          src="/assets/cairo_nile_palette.jpg" 
          alt="بانوراما نيل القاهرة وبرج الجزيرة بألوان الذهبي والبنفسجي والأزرق الفاتح" 
          className="w-full h-full object-cover object-[center_35%] filter brightness-95 contrast-105"
        />
        {/* Balanced scrim preserving the stunning purple and golden twilight reflections while ensuring high readability */}
        <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-l from-slate-950/85 via-slate-950/65 to-slate-950/25" />
        <div className="absolute inset-0 bg-radial-[at_top_right] from-purple-950/20 via-transparent to-transparent pointer-events-none" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        {/* Centered on mobile phones, side-aligned on desktop - crisp text on calm toned background */}
        <div className="max-w-2xl mx-auto md:mx-0 text-center md:text-start space-y-4">
          
          {/* Tagline Badge in Purple & Golden */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-purple-900/60 text-purple-200 text-xs font-bold border border-purple-500/40 backdrop-blur-md shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
              <span>{language === 'ar' ? 'منصة SKIP الموحدة للمعاملات' : 'SKIP Unified Procedures Hub'}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/15 text-amber-300 text-xs font-bold border border-amber-500/30 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-amber-400"></span>
              <span>{language === 'ar' ? 'محافظة المنوفية · شبين الكوم وقويسنا' : 'Menoufia · Shebin El-Kom & Quesna'}</span>
            </div>
          </div>

          {/* Headline with Golden & Light Blue Accents */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-md">
            {language === 'ar' ? (
              <>
                اعرف المطلوب <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">قبل ما تروح</span>
                <span className="block text-lg sm:text-2xl lg:text-3xl font-bold text-slate-100 mt-2">
                  أوراقك وإجراءاتك في <span className="text-sky-300">مكان واحد</span>
                </span>
              </>
            ) : (
              <>
                Know What's Needed <span className="bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 bg-clip-text text-transparent">Before You Go</span>
                <span className="block text-lg sm:text-2xl lg:text-3xl font-bold text-slate-100 mt-2">
                  Your Papers & Procedures in <span className="text-sky-300">One Place</span>
                </span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-base text-slate-200 leading-relaxed font-medium drop-shadow-sm max-w-xl mx-auto md:mx-0">
            {PAYMENTS_AND_ORDERS_ENABLED
              ? (language === 'ar'
                  ? 'دليلك السريع للأوراق المطلوبة والرسوم الرسمية لكل مصلحة حكومية أو تعليمية أو صحية، لتجهيز معاملتك قبل الذهاب.'
                  : 'Your quick guide to required documents and official fees for government, educational, and healthcare services.')
              : (language === 'ar'
                  ? 'دليلك السريع لمعرفة وفحص الأوراق والمستندات المطلوبة لكل مصلحة حكومية أو تعليمية أو صحية، لتجهيز ملفك قبل الذهاب.'
                  : 'Your quick guide to verify and prepare all required documents for government, educational, and healthcare services before you go.')}
          </p>

          {/* 3 Quick Concise Trust Indicators (Purple, Golden, Light Blue) */}
          <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-2 sm:gap-3 text-xs font-bold">
            {/* Golden Trust Pill */}
            <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-amber-500/40 text-amber-300 shadow-xs">
              <CheckCircle2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
              <span className="text-[11px] sm:text-xs">{language === 'ar' ? 'تجهيز الأوراق بدون طوابير' : 'No Waiting Queues'}</span>
            </span>
            {/* Purple Trust Pill */}
            <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-purple-500/40 text-purple-200 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-purple-400" />
              <span className="text-[11px] sm:text-xs">
                {PAYMENTS_AND_ORDERS_ENABLED
                  ? (language === 'ar' ? 'قوائم أوراق ورسوم محدثة' : 'Updated Docs & Fees')
                  : (language === 'ar' ? 'قوائم أوراق وشروط محدثة' : 'Updated Document Lists')}
              </span>
            </span>
            {/* Light Blue Trust Pill */}
            <span className="flex items-center gap-1.5 bg-slate-900/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-sky-500/40 text-sky-200 shadow-xs">
              {PAYMENTS_AND_ORDERS_ENABLED ? (
                <>
                  <CreditCard className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                  <span className="text-[11px] sm:text-xs">{language === 'ar' ? 'دفع كاش أو إلكتروني' : 'Cash or Digital Pay'}</span>
                </>
              ) : (
                <>
                  <FileCheck2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-sky-400" />
                  <span className="text-[11px] sm:text-xs">{language === 'ar' ? 'فحص وتجهيز المستندات' : 'Check & Prepare Papers'}</span>
                </>
              )}
            </span>
          </div>

        </div>
      </div>
    </section>
  );
};

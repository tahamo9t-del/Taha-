import React from 'react';
import { useApp } from '../context/AppContext';
import { Globe, Phone } from 'lucide-react';
import { navigateTo } from '../seo/clientSeoSync';

export const Footer: React.FC = () => {
  const { language, toggleLanguage } = useApp();

  const popularLinks = [
    { href: '/services/awraq-estekhrag-gawaz-safar-misri', ar: 'أوراق جواز السفر', en: 'Passport Papers' },
    { href: '/services/tagdid-gawaz-elsafar-elmisri', ar: 'تجديد جواز السفر', en: 'Passport Renewal' },
    { href: '/services/awraq-estekhrag-betaka-shakhsiya', ar: 'بطاقة الرقم القومي', en: 'National ID' },
    { href: '/services/estekhrag-fish-we-tashbih-momaykan', ar: 'استخراج فيش وتشبيه', en: 'Criminal Record' },
    { href: '/services/awraq-estekhrag-rokhset-qiyada', ar: 'أوراق رخصة القيادة', en: 'Driving License' },
    { href: '/services/tagdid-rokhset-sayara-shebin-elkom', ar: 'تجديد رخصة السيارة', en: 'Car Renewal' },
    { href: '/services/awraq-taqdim-koliyat-gameat-elmenoufia', ar: 'تقديم الكليات', en: 'College Admission' },
    { href: '/guides', ar: 'أدلة ومقالات', en: 'Guides' }
  ];

  return (
    <footer className="bg-slate-900 text-slate-400 py-8 border-t border-slate-800 text-xs w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-6 border-b border-slate-800">
          
          {/* Brand */}
          <a
            href="/"
            onClick={(e) => {
              e.preventDefault();
              navigateTo('/');
            }}
            className="flex items-center gap-3"
          >
            <img 
              src="/assets/aistudio/image_5ae8ef1d.png" 
              alt="SKIP" 
              loading="lazy"
              className="w-9 h-9 object-contain rounded-lg"
            />
            <div>
              <span className="text-lg font-black text-white tracking-tight">SKIP</span>
              <p className="text-xs text-slate-400">
                {language === 'ar' ? 'اعرف المطلوب قبل ما تروح · أوراقك وإجراءاتك في مكان واحد' : 'Know Before You Go · Unified Procedures'}
              </p>
            </div>
          </a>

          {/* Emergency Hotlines Strip */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
            <span className="text-slate-400 flex items-center gap-1 font-sans">
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'الخطوط الرسمية:' : 'Hotlines:'}</span>
            </span>
            <span className="text-slate-300">الجوازات: <strong className="text-white">15340</strong></span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">المرور: <strong className="text-white">136</strong></span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">الإسكان: <strong className="text-white">1188</strong></span>
            <span className="text-slate-500">·</span>
            <span className="text-slate-300">الصحة: <strong className="text-white">105</strong></span>
          </div>

        </div>

        {/* Popular SEO Directory Links */}
        <nav aria-label={language === 'ar' ? 'روابط سريعة للأوراق المطلوبة' : 'Quick Paperwork Links'} className="py-4 border-b border-slate-800/80 flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 text-[11px]">
          {popularLinks.map((lnk) => (
            <a
              key={lnk.href}
              href={lnk.href}
              onClick={(e) => {
                e.preventDefault();
                navigateTo(lnk.href);
              }}
              className="text-slate-400 hover:text-amber-300 transition-colors"
            >
              {language === 'ar' ? lnk.ar : lnk.en}
            </a>
          ))}
        </nav>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 text-[11px]">
          <div>
            © 2026 SKIP. {language === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </div>
          <div className="flex items-center gap-4">
            <button onClick={toggleLanguage} className="hover:text-slate-300 flex items-center gap-1 cursor-pointer">
              <Globe className="w-3 h-3" />
              <span>{language === 'ar' ? 'English' : 'عربي'}</span>
            </button>
            <span>·</span>
            <span className="hover:text-slate-400 cursor-pointer">{language === 'ar' ? 'الخصوصية والأمان' : 'Privacy & Security'}</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

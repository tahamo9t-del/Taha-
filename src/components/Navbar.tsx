import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  HeartPulse, 
  Bell, 
  MessageSquare, 
  Sun, 
  Moon, 
  Globe, 
  Menu, 
  X,
  Truck,
  FileCheck2,
  BookOpen
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';
import { navigateTo } from '../seo/clientSeoSync';

export const Navbar: React.FC = () => {
  const { 
    language, 
    toggleLanguage, 
    theme, 
    toggleTheme, 
    unreadAlertsCount, 
    openModal,
    setSelectedCategory
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 w-full ${
      isScrolled || mobileMenuOpen
        ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-sm border-b border-slate-200 dark:border-slate-800'
        : 'bg-gradient-to-b from-slate-950/60 via-slate-950/25 to-transparent border-b-0 shadow-none'
    }`}>
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-6">
          
          {/* Zone 1: Brand Zone */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/');
              }}
              className="flex items-center gap-2 sm:gap-3 group"
            >
              <img 
                src="/assets/aistudio/image_5ae8ef1d.png" 
                alt="SKIP Logo" 
                referrerPolicy="no-referrer"
                className="h-10 sm:h-12 w-auto object-contain rounded-lg shadow-sm transition-transform group-hover:scale-105 shrink-0"
              />
              <div className="flex flex-col">
                <span className={`text-xl sm:text-2xl font-black tracking-tight leading-none transition-colors ${
                  isScrolled || mobileMenuOpen
                    ? 'text-slate-900 dark:text-white'
                    : 'text-white drop-shadow-sm'
                }`}>
                  SKIP
                </span>
                <span className={`text-[10px] sm:text-xs font-bold mt-0.5 sm:mt-1 hidden sm:inline transition-colors ${
                  isScrolled || mobileMenuOpen
                    ? 'text-amber-500 dark:text-amber-400'
                    : 'text-amber-300 drop-shadow-sm'
                }`}>
                  {language === 'ar' ? 'اعرف المطلوب قبل ما تروح' : 'Know Before You Go'}
                </span>
              </div>
            </a>
          </div>

          {/* Zone 2: Navigation Links */}
          <nav className={`hidden xl:flex items-center gap-6 text-sm font-medium transition-colors ${
            isScrolled || mobileMenuOpen
              ? 'text-slate-700 dark:text-slate-200'
              : 'text-white/95 drop-shadow-sm'
          }`}>
            <a 
              href="/#services" 
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  navigateTo('/');
                  setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
                }
              }}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isScrolled || mobileMenuOpen
                  ? 'hover:text-purple-600 dark:hover:text-purple-400'
                  : 'hover:text-amber-300'
              }`}
            >
              <FileText className={`w-4 h-4 ${isScrolled || mobileMenuOpen ? 'text-purple-600 dark:text-purple-400' : 'text-amber-300'}`} />
              <span>{language === 'ar' ? 'دليل الخدمات الورقية' : 'Services Directory'}</span>
            </a>

            {PAYMENTS_AND_ORDERS_ENABLED && (
              <a 
                href="/#requests-tracker" 
                onClick={(e) => {
                  if (window.location.pathname !== '/') {
                    e.preventDefault();
                    navigateTo('/');
                    setTimeout(() => document.getElementById('requests-tracker')?.scrollIntoView({ behavior: 'smooth' }), 80);
                  }
                }}
                className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                  isScrolled || mobileMenuOpen
                    ? 'hover:text-purple-600 dark:hover:text-purple-400'
                    : 'hover:text-amber-300'
                }`}
              >
                <Truck className="w-4 h-4 text-amber-400" />
                <span>{language === 'ar' ? 'طلباتي ومتابعة المندوب' : 'My Requests & Courier'}</span>
              </a>
            )}

            <button 
              onClick={() => {
                setSelectedCategory('health');
                if (window.location.pathname !== '/') {
                  navigateTo('/');
                  setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
                } else {
                  document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 cursor-pointer text-sm font-medium ${
                isScrolled || mobileMenuOpen
                  ? 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400'
                  : 'text-white/95 hover:text-amber-300'
              }`}
            >
              <HeartPulse className={`w-4 h-4 ${isScrolled || mobileMenuOpen ? 'text-sky-500' : 'text-sky-300'}`} />
              <span>{language === 'ar' ? 'صحة ومستشفيات' : 'Health & Clinics'}</span>
            </button>

            <a 
              href="/guides"
              onClick={(e) => {
                e.preventDefault();
                navigateTo('/guides');
              }}
              className={`transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isScrolled || mobileMenuOpen
                  ? 'hover:text-purple-600 dark:hover:text-purple-400'
                  : 'hover:text-amber-300'
              }`}
            >
              <BookOpen className={`w-4 h-4 ${isScrolled || mobileMenuOpen ? 'text-purple-600 dark:text-purple-400' : 'text-sky-300'}`} />
              <span>{language === 'ar' ? 'أدلة وإجراءات' : 'Guides'}</span>
            </a>

            <a 
              href="/#alerts" 
              onClick={(e) => {
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  navigateTo('/');
                  setTimeout(() => document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' }), 80);
                }
              }}
              className={`relative transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                isScrolled || mobileMenuOpen
                  ? 'hover:text-purple-600 dark:hover:text-purple-400'
                  : 'hover:text-amber-300'
              }`}
            >
              <Bell className="w-4 h-4 text-amber-400" />
              <span>{language === 'ar' ? 'انتهاء الوثائق' : 'Expiry Alerts'}</span>
              {unreadAlertsCount > 0 && (
                <span className="flex items-center justify-center min-w-5 h-5 px-1.5 text-[11px] font-black text-slate-950 bg-amber-400 rounded-full shadow-xs">
                  {unreadAlertsCount}
                </span>
              )}
            </a>
          </nav>

          {/* Zone 3: Primary Action & Utilities */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">

            {/* Live Chat with Courier / Support */}
            <button
              onClick={() => openModal('chat')}
              className={`p-2 sm:p-2.5 rounded-xl transition-colors relative cursor-pointer ${
                isScrolled || mobileMenuOpen
                  ? 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  : 'text-white hover:text-amber-300 hover:bg-white/15 backdrop-blur-xs'
              }`}
              title={language === 'ar' ? 'محادثة المندوب والدعم الفني' : 'Chat with Courier & Support'}
              aria-label="Support & Courier Chat"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-sky-400 rounded-full ring-2 ring-slate-900/60 shadow-xs"></span>
            </button>

            {/* Dark / Light Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 sm:p-2.5 rounded-xl transition-colors cursor-pointer ${
                isScrolled || mobileMenuOpen
                  ? 'text-slate-700 dark:text-slate-200 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  : 'text-white hover:bg-white/15 backdrop-blur-xs'
              }`}
              title={theme === 'dark' ? (language === 'ar' ? 'تفعيل الوضع النهاري' : 'Light Mode') : (language === 'ar' ? 'تفعيل الوضع الليلي' : 'Dark Mode')}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" />
              ) : (
                <Moon className={`w-4 h-4 sm:w-5 sm:h-5 ${isScrolled || mobileMenuOpen ? 'text-purple-600' : 'text-purple-200'}`} />
              )}
            </button>

            {/* Language Switcher */}
            <button
              onClick={toggleLanguage}
              className={`px-2 py-1 sm:px-2.5 sm:py-2 text-[11px] sm:text-xs font-bold rounded-xl border transition-colors flex items-center gap-1 whitespace-nowrap shadow-2xs backdrop-blur-xs cursor-pointer ${
                isScrolled || mobileMenuOpen
                  ? 'text-slate-800 dark:text-slate-200 bg-slate-100/80 dark:bg-slate-800/60 hover:bg-slate-200 dark:hover:bg-slate-800 border-slate-200 dark:border-slate-700/80'
                  : 'text-white bg-white/15 hover:bg-white/25 border-white/25'
              }`}
            >
              <Globe className={`w-3.5 h-3.5 ${isScrolled || mobileMenuOpen ? 'text-purple-600 dark:text-purple-400' : 'text-sky-300'}`} />
              <span>{language === 'ar' ? 'EN' : 'عربي'}</span>
            </button>

            {/* Primary Action Button (Royal Purple with Golden touch) */}
            {PAYMENTS_AND_ORDERS_ENABLED ? (
              <button
                onClick={() => openModal('courier_booking')}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/20 transition-all whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <Truck className="w-4 h-4 text-amber-300" />
                <span>{language === 'ar' ? 'طلب مندوب لباب البيت' : 'Book SKIP Courier'}</span>
              </button>
            ) : (
              <a
                href="/#services"
                onClick={(e) => {
                  if (window.location.pathname !== '/') {
                    e.preventDefault();
                    navigateTo('/');
                    setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
                  }
                }}
                className="hidden lg:inline-flex items-center gap-2 px-4 py-2.5 text-xs font-black text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/20 transition-all whitespace-nowrap active:scale-95 cursor-pointer"
              >
                <FileCheck2 className="w-4 h-4 text-amber-300" />
                <span>{language === 'ar' ? 'فحص الأوراق المطلوبة' : 'Check Required Papers'}</span>
              </a>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 sm:p-2.5 rounded-xl xl:hidden transition-colors ${
                isScrolled || mobileMenuOpen
                  ? 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  : 'text-white hover:bg-white/15 backdrop-blur-xs'
              }`}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-3 pb-6 space-y-3">

          <a
            href="/#services"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (window.location.pathname !== '/') {
                e.preventDefault();
                navigateTo('/');
                setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
              }
            }}
            className="flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
          >
            <FileText className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>{language === 'ar' ? 'دليل الخدمات والأوراق المطلوبة' : 'Services Directory'}</span>
          </a>
          {PAYMENTS_AND_ORDERS_ENABLED && (
            <a
              href="/#requests-tracker"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  navigateTo('/');
                  setTimeout(() => document.getElementById('requests-tracker')?.scrollIntoView({ behavior: 'smooth' }), 80);
                }
              }}
              className="flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
            >
              <Truck className="w-5 h-5 text-amber-500" />
              <span>{language === 'ar' ? 'طلباتي ومتابعة المندوب' : 'My Requests & Courier'}</span>
            </a>
          )}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              setSelectedCategory('health');
              if (window.location.pathname !== '/') {
                navigateTo('/');
                setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
              } else {
                document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="w-full flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium text-start cursor-pointer"
          >
            <HeartPulse className="w-5 h-5 text-sky-500" />
            <span>{language === 'ar' ? 'صحة ومستشفيات' : 'Health & Clinics'}</span>
          </button>
          <a
            href="/guides"
            onClick={(e) => {
              e.preventDefault();
              setMobileMenuOpen(false);
              navigateTo('/guides');
            }}
            className="flex items-center gap-3 p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
          >
            <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
            <span>{language === 'ar' ? 'أدلة وإجراءات الخدمات' : 'Paperwork Guides'}</span>
          </a>
          <a
            href="#alerts"
            onClick={(e) => {
              setMobileMenuOpen(false);
              if (window.location.pathname !== '/') {
                e.preventDefault();
                navigateTo('/');
                setTimeout(() => document.getElementById('alerts')?.scrollIntoView({ behavior: 'smooth' }), 80);
              }
            }}
            className="flex items-center justify-between p-3 rounded-lg text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 font-medium"
          >
            <div className="flex items-center gap-3">
              <Bell className="w-5 h-5 text-amber-500" />
              <span>{language === 'ar' ? 'تنبيهات انتهاء الوثائق' : 'Expiry Alerts'}</span>
            </div>
            {unreadAlertsCount > 0 && (
              <span className="px-2 py-0.5 text-xs font-bold text-slate-950 bg-amber-400 rounded-full">
                {unreadAlertsCount}
              </span>
            )}
          </a>
          {PAYMENTS_AND_ORDERS_ENABLED ? (
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openModal('courier_booking');
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20"
            >
              <Truck className="w-5 h-5 text-amber-300" />
              <span>{language === 'ar' ? 'طلب مندوب لباب البيت' : 'Book SKIP Courier'}</span>
            </button>
          ) : (
            <a
              href="/#services"
              onClick={(e) => {
                setMobileMenuOpen(false);
                if (window.location.pathname !== '/') {
                  e.preventDefault();
                  navigateTo('/');
                  setTimeout(() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' }), 80);
                }
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20"
            >
              <FileCheck2 className="w-5 h-5 text-amber-300" />
              <span>{language === 'ar' ? 'فحص الأوراق المطلوبة' : 'Check Required Papers'}</span>
            </a>
          )}
        </div>
      )}
    </header>
  );
};

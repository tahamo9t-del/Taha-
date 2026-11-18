import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceCategory } from '../types';
import { 
  FileText, 
  Clock, 
  CreditCard, 
  Building2, 
  GraduationCap, 
  Home, 
  HeartPulse, 
  Truck, 
  CheckCircle, 
  ChevronLeft, 
  ChevronRight, 
  ChevronUp,
  Sparkles, 
  X, 
  Search, 
  MessageSquare,
  Plane,
  RefreshCw,
  Car,
  Bike,
  ShieldCheck,
  School,
  Award,
  FileCheck2,
  Stethoscope,
  Calendar,
  Pill,
  MousePointerClick,
  MapPin,
  Lock,
  ArrowRight,
  ArrowLeft
} from 'lucide-react';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';

export const ServiceList: React.FC = () => {
  const { 
    services, 
    offices,
    selectedCategory, 
    setSelectedCategory, 
    searchQuery, 
    setSearchQuery, 
    language, 
    openModal 
  } = useApp();

  // Hierarchical drill-down state inside every category:
  // Step 1: Category -> Step 2: Governorate (Menoufia) -> Step 3: Center (Shebin El-Kom / Quesna) -> Services
  const [selectedGovernorate, setSelectedGovernorate] = useState<'menoufia' | null>(null);
  const [selectedCenter, setSelectedCenter] = useState<'shebin' | 'quesna' | null>(null);

  // Reset drill-down whenever active category changes or collapses
  useEffect(() => {
    setSelectedGovernorate(null);
    setSelectedCenter(null);
  }, [selectedCategory]);

  const govCount = services.filter(s => s.category === 'government').length;
  const eduCount = services.filter(s => s.category === 'educational').length;
  const housingCount = services.filter(s => s.category === 'housing').length;
  const healthCount = services.filter(s => s.category === 'health').length;

  const categories: { 
    key: ServiceCategory; 
    labelAr: string; 
    labelEn: string; 
    icon: any; 
    descAr: string; 
    descEn: string; 
    countAr: string;
    countEn: string;
  }[] = [
    { 
      key: 'government', 
      labelAr: 'حكومية وهويات', 
      labelEn: 'Government & ID', 
      icon: Building2, 
      descAr: 'جوازات، بطاقات، مرور، وتوكيل',
      descEn: 'Passports, IDs, Traffic & Notary',
      countAr: `${govCount} خدمات متاحة`,
      countEn: `${govCount} services`
    },
    { 
      key: 'educational', 
      labelAr: 'تعليم وجامعات', 
      labelEn: 'Education & Universities', 
      icon: GraduationCap, 
      descAr: 'جامعة المنوفية، المدارس، والشهادات',
      descEn: 'Menoufia Univ., Schools & Degrees',
      countAr: `${eduCount} خدمات تعليمية`,
      countEn: `${eduCount} services`
    },
    { 
      key: 'housing', 
      labelAr: 'إسكان ومرافق', 
      labelEn: 'Housing & Utilities', 
      icon: Home, 
      descAr: 'إسكان، عدادات مياه وكهرباء وغاز',
      descEn: 'Housing, Water, Power & Gas',
      countAr: `${housingCount} خدمات إسكان`,
      countEn: `${housingCount} services`
    },
    { 
      key: 'health', 
      labelAr: 'مستشفيات وصحة', 
      labelEn: 'Hospitals & Health', 
      icon: HeartPulse, 
      descAr: 'الجامعي، معهد الكبد، التعليمي، وقويسنا',
      descEn: 'University, Liver Inst. & Quesna',
      countAr: `${healthCount} خدمات ومستشفيات`,
      countEn: `${healthCount} hospital services`
    },
    ...(PAYMENTS_AND_ORDERS_ENABLED ? [{ 
      key: 'courier' as ServiceCategory, 
      labelAr: 'خدمة المندوب', 
      labelEn: 'SKIP Courier', 
      icon: Truck, 
      descAr: 'توصيل واستلام الأوراق والأدوية',
      descEn: 'Doorstep Pick-up & Delivery',
      countAr: 'توصيل لباب المنزل',
      countEn: 'Doorstep Delivery'
    }] : []),
  ];

  const hasSearch = searchQuery.trim().length > 0;

  // High-Quality Expressive Icon Resolver with Golden, Purple & Light Blue Accents
  const getExpressiveServiceIcon = (iconName: string, category: string) => {
    switch (iconName) {
      case 'Plane':
        return { 
          icon: Plane, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      case 'RefreshCw':
        return { 
          icon: RefreshCw, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'CreditCard':
        return { 
          icon: CreditCard, 
          style: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30' 
        };
      case 'Car':
        return { 
          icon: Car, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      case 'Bike':
        return { 
          icon: Bike, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      case 'Building2':
        return { 
          icon: Building2, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'Fingerprint':
        return { 
          icon: ShieldCheck, 
          style: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-400/30' 
        };
      case 'GraduationCap':
        return { 
          icon: GraduationCap, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'School':
        return { 
          icon: School, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'Award':
        return { 
          icon: Award, 
          style: 'bg-amber-500/15 text-amber-600 dark:text-amber-300 border-amber-400/30' 
        };
      case 'Home':
        return { 
          icon: Home, 
          style: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30' 
        };
      case 'SearchCheck':
        return { 
          icon: FileCheck2, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'Stethoscope':
        return { 
          icon: Stethoscope, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      case 'Calendar':
        return { 
          icon: Calendar, 
          style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' 
        };
      case 'Pill':
        return { 
          icon: Pill, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      case 'HeartPulse':
        return { 
          icon: HeartPulse, 
          style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' 
        };
      default:
        if (category === 'educational') {
          return { icon: GraduationCap, style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' };
        }
        if (category === 'housing') {
          return { icon: Home, style: 'bg-amber-500/15 text-amber-600 dark:text-amber-400 border-amber-400/30' };
        }
        if (category === 'health') {
          return { icon: HeartPulse, style: 'bg-sky-500/15 text-sky-600 dark:text-sky-300 border-sky-400/30' };
        }
        return { icon: FileText, style: 'bg-purple-500/15 text-purple-600 dark:text-purple-300 border-purple-400/30' };
    }
  };

  // Helper to get services for a specific category + center
  const getServicesForCenter = (cat: ServiceCategory, center: 'shebin' | 'quesna') => {
    return services
      .filter((srv) => {
        const catMatch = cat === 'courier' ? srv.courierSupported : srv.category === cat;
        const cityMatch = !srv.city || srv.city === 'menoufia' || srv.city === center;
        return catMatch && cityMatch;
      })
      .sort((a, b) => {
        const aExact = a.city === center ? 0 : 1;
        const bExact = b.city === center ? 0 : 1;
        return aExact - bExact;
      });
  };

  // Helper to get offices/hospitals for a specific category + center
  const getOfficesForCenter = (cat: ServiceCategory, center: 'shebin' | 'quesna') => {
    return offices.filter((off) => {
      const catMatch = cat === 'courier' ? true : off.category === cat;
      const cityMatch = off.city === center;
      return catMatch && cityMatch;
    });
  };

  // Final filtered list when either searching OR reached Step 3 (Category + Governorate + Center)
  const filteredServices = hasSearch
    ? services.filter((srv) => {
        const q = searchQuery.toLowerCase();
        const titleMatch = srv.title.toLowerCase().includes(q) || srv.titleEn.toLowerCase().includes(q);
        const descMatch = srv.description.toLowerCase().includes(q) || srv.descriptionEn.toLowerCase().includes(q);
        const entityMatch = srv.responsibleEntity.toLowerCase().includes(q) || srv.responsibleEntityEn.toLowerCase().includes(q);
        const docMatch = srv.requiredDocuments.some(
          d => d.name.toLowerCase().includes(q) || d.nameEn.toLowerCase().includes(q)
        );
        return titleMatch || descMatch || entityMatch || docMatch;
      })
    : selectedCategory && selectedGovernorate === 'menoufia' && selectedCenter
      ? getServicesForCenter(selectedCategory, selectedCenter)
      : [];

  const activeCategoryObj = categories.find(c => c.key === selectedCategory);

  const getCityLabel = (city?: 'shebin' | 'quesna' | 'menoufia') => {
    if (city === 'shebin') return language === 'ar' ? 'شبين الكوم' : 'Shebin El-Kom';
    if (city === 'quesna') return language === 'ar' ? 'قويسنا' : 'Quesna';
    return language === 'ar' ? 'شبين الكوم وقويسنا' : 'Shebin & Quesna';
  };

  const getCenterDisplayName = (center: 'shebin' | 'quesna') => {
    if (center === 'shebin') return language === 'ar' ? 'مركز ومدينة شبين الكوم' : 'Shebin El-Kom Center';
    return language === 'ar' ? 'مركز ومدينة قويسنا' : 'Quesna Center';
  };

  // Toggle category on click: if already active, fold back up; otherwise expand at Governorates step
  const handleCategoryClick = (catKey: ServiceCategory) => {
    if (selectedCategory === catKey) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(catKey);
      setSelectedGovernorate(null);
      setSelectedCenter(null);
    }
  };

  const categoryTotalServices = selectedCategory
    ? services.filter(s => (selectedCategory === 'courier' ? s.courierSupported : s.category === selectedCategory)).length
    : 0;

  const shebinCenterServices = selectedCategory ? getServicesForCenter(selectedCategory, 'shebin') : [];
  const quesnaCenterServices = selectedCategory ? getServicesForCenter(selectedCategory, 'quesna') : [];
  const shebinCenterOffices = selectedCategory ? getOfficesForCenter(selectedCategory, 'shebin') : [];
  const quesnaCenterOffices = selectedCategory ? getOfficesForCenter(selectedCategory, 'quesna') : [];

  return (
    <section id="services" className="py-8 sm:py-12 bg-white dark:bg-slate-900 transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-6 sm:space-y-8">
        
        {/* Search Bar with Purple & Light Blue Accents */}
        <div className="max-w-3xl mx-auto w-full">
          <div className="relative flex items-center shadow-lg rounded-2xl bg-slate-50 dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 focus-within:ring-2 focus-within:ring-purple-500 transition-all">
            <div className="ps-3 pe-1 sm:ps-4 sm:pe-2 text-purple-600 dark:text-purple-400 shrink-0">
              <Search className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600 dark:text-purple-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={
                language === 'ar'
                  ? 'ابحث عن خدمة أو مستشفى بالمنوفية (قويسنا، شبين الكوم، معهد الكبد، مرور)...'
                  : 'Search services or hospitals in Menoufia (Quesna, Shebin El-Kom)...'
              }
              className="w-full py-3 sm:py-4 pe-2 text-xs sm:text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none min-w-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="me-1 px-2 py-1 text-xs font-bold text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors cursor-pointer shrink-0"
              >
                {language === 'ar' ? 'مسح' : 'Clear'}
              </button>
            )}
            <button
              onClick={() => {
                const el = document.getElementById('services');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="me-1.5 sm:me-2 px-3 sm:px-5 py-2 sm:py-2.5 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl transition-all shadow-md shadow-purple-600/20 shrink-0 cursor-pointer"
            >
              {language === 'ar' ? 'بحث' : 'Search'}
            </button>
          </div>
        </div>

        {/* Compact Section Badge */}
        <div className="text-center px-2">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200 dark:border-purple-800">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{language === 'ar' ? 'دليل المعاملات والمستشفيات الرسمي' : 'Official Services & Hospitals Directory'}</span>
          </div>
        </div>

        {/* Prominent Entity Selector Cards (Golden, Purple & Light Blue Palette) */}
        <div className={`grid grid-cols-2 ${PAYMENTS_AND_ORDERS_ENABLED ? 'sm:grid-cols-3 md:grid-cols-5 max-w-5xl' : 'md:grid-cols-4 max-w-4xl'} gap-2.5 sm:gap-4 mx-auto`}>
          {categories.map((cat, idx) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.key;
            const isLastOnMobile = PAYMENTS_AND_ORDERS_ENABLED && idx === categories.length - 1;
            return (
              <button
                key={cat.key}
                onClick={() => handleCategoryClick(cat.key)}
                className={`group p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl transition-all duration-300 flex flex-col items-center justify-center gap-2 sm:gap-3 text-center border shadow-xs cursor-pointer ${
                  isLastOnMobile ? 'col-span-2 sm:col-span-1' : ''
                } ${
                  isSelected
                    ? 'bg-gradient-to-b from-purple-700 via-purple-800 to-indigo-900 text-white shadow-xl shadow-purple-600/30 border-purple-400 ring-4 ring-amber-400/30 scale-102 sm:scale-105'
                    : 'bg-slate-50 dark:bg-slate-800/70 hover:bg-white dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-purple-400 hover:shadow-md'
                }`}
                title={language === 'ar' ? (isSelected ? 'إخفاء وطي القسم' : `فتح ${cat.labelAr}`) : `View ${cat.labelEn}`}
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 shadow-xs ${
                  isSelected
                    ? 'bg-white/20 text-white'
                    : 'bg-purple-500/10 text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/20'
                }`}>
                  <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-black tracking-tight leading-snug">
                    {language === 'ar' ? cat.labelAr : cat.labelEn}
                  </h3>
                  <span className={`inline-block text-[10px] mt-1 px-2 py-0.5 rounded-full font-bold ${
                    isSelected 
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' 
                      : 'bg-slate-200/60 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 group-hover:text-purple-600 dark:group-hover:text-purple-300'
                  }`}>
                    {isSelected 
                      ? (language === 'ar' ? 'مفتوح الآن · اضغط للطي' : 'Active · Click to close') 
                      : (language === 'ar' ? cat.countAr : cat.countEn)}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Clean, Tidy Default Hint (When no category is selected and not searching) */}
        {!selectedCategory && !hasSearch && (
          <div className="pt-2 pb-4 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-purple-50/60 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300 text-xs font-bold border border-purple-200/60 dark:border-purple-800/60 shadow-2xs">
              <MousePointerClick className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>{language === 'ar' ? 'الواجهة مرتبة · اضغط على أي تصنيف أعلاه لاختيار المحافظة والمركز' : 'Neat view · Click any sector above to select Governorate & Center'}</span>
            </div>
          </div>
        )}

        {/* Dynamic State: If Search is active */}
        {hasSearch && (
          <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-purple-950 dark:text-purple-200">
              <Search className="w-4 h-4 text-purple-600" />
              <span>
                {language === 'ar' ? `نتائج البحث عن: "${searchQuery}"` : `Search results for: "${searchQuery}"`}
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-bold">
                {filteredServices.length} {language === 'ar' ? 'خدمة' : 'results'}
              </span>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs font-bold text-purple-700 dark:text-purple-300 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'مسح البحث' : 'Clear'}</span>
            </button>
          </div>
        )}

        {/* HIERARCHICAL DRILL-DOWN SECTION (Category -> Governorates -> Menoufia Centers -> Services/Hospitals) */}
        {(selectedCategory || hasSearch) && (
          <div className="space-y-6 animate-in fade-in slide-in-from-top-4 duration-300">
            
            {/* Breadcrumb & Navigation Header Bar */}
            {selectedCategory && !hasSearch && (
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:p-4 rounded-2xl bg-slate-900 text-white border border-purple-500/30 gap-3 shadow-md">
                <div className="flex items-center gap-2.5 min-w-0 flex-wrap">
                  {activeCategoryObj && (
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                      <activeCategoryObj.icon className="w-5 h-5" />
                    </div>
                  )}

                  {/* Interactive Breadcrumb */}
                  <div className="flex items-center flex-wrap gap-1.5 text-xs sm:text-sm font-bold">
                    <button
                      onClick={() => {
                        setSelectedGovernorate(null);
                        setSelectedCenter(null);
                      }}
                      className={`hover:text-amber-300 transition-colors cursor-pointer ${
                        !selectedGovernorate ? 'text-amber-300' : 'text-slate-300'
                      }`}
                    >
                      {activeCategoryObj ? (language === 'ar' ? activeCategoryObj.labelAr : activeCategoryObj.labelEn) : ''}
                    </button>

                    {selectedGovernorate && (
                      <>
                        {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                        <button
                          onClick={() => setSelectedCenter(null)}
                          className={`hover:text-amber-300 transition-colors cursor-pointer ${
                            !selectedCenter ? 'text-amber-300' : 'text-slate-300'
                          }`}
                        >
                          {language === 'ar' ? 'محافظة المنوفية' : 'Menoufia Governorate'}
                        </button>
                      </>
                    )}

                    {selectedCenter && (
                      <>
                        {language === 'ar' ? <ChevronLeft className="w-4 h-4 text-slate-500" /> : <ChevronRight className="w-4 h-4 text-slate-500" />}
                        <span className="text-sky-300 font-black">
                          {getCenterDisplayName(selectedCenter)}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 shrink-0">
                  {/* Back button depending on step */}
                  {selectedCenter ? (
                    <button
                      onClick={() => setSelectedCenter(null)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-[11px] sm:text-xs font-bold text-purple-100 border border-purple-400/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                      <span>{language === 'ar' ? 'تغيير المركز' : 'Change Center'}</span>
                    </button>
                  ) : selectedGovernorate ? (
                    <button
                      onClick={() => setSelectedGovernorate(null)}
                      className="px-3 py-1.5 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 text-[11px] sm:text-xs font-bold text-purple-100 border border-purple-400/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {language === 'ar' ? <ArrowRight className="w-3.5 h-3.5" /> : <ArrowLeft className="w-3.5 h-3.5" />}
                      <span>{language === 'ar' ? 'المحافظات' : 'Governorates'}</span>
                    </button>
                  ) : null}

                  {/* Quick Switcher when inside a center */}
                  {selectedCenter && (
                    <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-800 border border-slate-700">
                      <button
                        onClick={() => setSelectedCenter('shebin')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          selectedCenter === 'shebin'
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {language === 'ar' ? 'شبين الكوم' : 'Shebin El-Kom'}
                      </button>
                      <button
                        onClick={() => setSelectedCenter('quesna')}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                          selectedCenter === 'quesna'
                            ? 'bg-amber-400 text-slate-950 shadow-xs'
                            : 'text-slate-300 hover:text-white'
                        }`}
                      >
                        {language === 'ar' ? 'قويسنا' : 'Quesna'}
                      </button>
                    </div>
                  )}

                  <button
                    onClick={() => setSelectedCategory(null)}
                    className="shrink-0 px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-[11px] sm:text-xs font-bold text-purple-200 border border-purple-500/40 transition-colors flex items-center gap-1.5 shadow-2xs cursor-pointer"
                    title={language === 'ar' ? 'طي وإخفاء القسم' : 'Fold section'}
                  >
                    <ChevronUp className="w-3.5 h-3.5" />
                    <span>{language === 'ar' ? 'طي' : 'Fold'}</span>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: GOVERNORATES SELECTION (When Category selected, Governorate NOT yet picked) */}
            {selectedCategory && !selectedGovernorate && !hasSearch && (
              <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-amber-500" />
                      <span>
                        {language === 'ar'
                          ? `اختر المحافظة — قسم ${activeCategoryObj?.labelAr}`
                          : `Select Governorate — ${activeCategoryObj?.labelEn}`}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {language === 'ar'
                        ? 'الانطلاق الحالي مفعّل لمحافظة المنوفية (مركزي قويسنا وشبين الكوم) وسيتم إضافة باقي المحافظات تباعاً.'
                        : 'Initial launch is live for Menoufia Governorate (Quesna & Shebin El-Kom).'}
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/15 text-amber-700 dark:text-amber-300 border border-amber-400/30 text-[11px] font-bold self-start sm:self-center">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                    {language === 'ar' ? 'المرحلة الأولى: المنوفية' : 'Phase 1: Menoufia'}
                  </span>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* ACTIVE GOVERNORATE: MENOUFIA */}
                  <button
                    onClick={() => setSelectedGovernorate('menoufia')}
                    className="sm:col-span-2 text-start group p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-purple-700 via-purple-800 to-indigo-900 text-white border-2 border-amber-400/70 shadow-xl shadow-purple-700/20 hover:scale-[1.01] transition-all cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shadow-md shrink-0">
                          <MapPin className="w-6 h-6" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <h4 className="text-lg sm:text-xl font-black">
                              {language === 'ar' ? 'محافظة المنوفية' : 'Menoufia Governorate'}
                            </h4>
                            <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-400 text-slate-950">
                              {language === 'ar' ? 'مفعّلة الآن' : 'Active'}
                            </span>
                          </div>
                          <p className="text-xs text-purple-100 mt-0.5">
                            {language === 'ar'
                              ? 'متاح الآن: مركز شبين الكوم ومركز قويسنا'
                              : 'Available now: Shebin El-Kom & Quesna Centers'}
                          </p>
                        </div>
                      </div>
                      <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center group-hover:bg-amber-400 group-hover:text-slate-950 transition-colors shrink-0">
                        {language === 'ar' ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-white/15 text-xs">
                      <div className="flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 text-sky-200 font-bold">
                          {language === 'ar' ? 'شبين الكوم' : 'Shebin El-Kom'}
                        </span>
                        <span className="px-2.5 py-1 rounded-lg bg-white/10 text-amber-200 font-bold">
                          {language === 'ar' ? 'قويسنا' : 'Quesna'}
                        </span>
                      </div>
                      <span className="font-bold text-amber-300">
                        {categoryTotalServices} {language === 'ar' ? 'خدمة متاحة · اضغط لاختيار المركز' : 'services · Select center'}
                      </span>
                    </div>
                  </button>

                  {/* UPCOMING GOVERNORATES (LOCKED / COMING SOON) */}
                  {[
                    { ar: 'محافظة القاهرة', en: 'Cairo Governorate' },
                    { ar: 'محافظة الجيزة', en: 'Giza Governorate' },
                  ].map((gov, idx) => (
                    <div
                      key={idx}
                      aria-disabled="true"
                      className="p-5 rounded-2xl bg-white/60 dark:bg-slate-900/50 border border-dashed border-slate-300 dark:border-slate-700 opacity-65 flex flex-col justify-between gap-3 select-none"
                    >
                      <div className="flex items-center justify-between">
                        <div className="w-10 h-10 rounded-xl bg-slate-200/70 dark:bg-slate-800 text-slate-400 flex items-center justify-center">
                          <Lock className="w-4 h-4" />
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                          {language === 'ar' ? 'قريباً' : 'Soon'}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-600 dark:text-slate-300">
                          {language === 'ar' ? gov.ar : gov.en}
                        </h4>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {language === 'ar' ? 'جاري إضافة المراكز والمقرات' : 'Onboarding soon'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* STEP 3: CENTERS INSIDE MENOUFIA (When Menoufia picked, Center NOT yet picked) */}
            {selectedCategory && selectedGovernorate === 'menoufia' && !selectedCenter && !hasSearch && (
              <div className="p-5 sm:p-7 rounded-3xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                      <Building2 className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span>
                        {language === 'ar'
                          ? `اختر المركز في محافظة المنوفية — (${activeCategoryObj?.labelAr})`
                          : `Select Center in Menoufia — (${activeCategoryObj?.labelEn})`}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {language === 'ar'
                        ? 'مقتصر حالياً على مركزي شبين الكوم وقويسنا · اضغط على المركز لعرض الخدمات والمستشفيات الخاصة به'
                        : 'Currently limited to Shebin El-Kom & Quesna Centers · Click a center to view its services'}
                    </p>
                  </div>
                </div>

                {/* 2 ACTIVE MENOUFIA CENTERS: SHEBIN EL-KOM & QUESNA */}
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  {/* SHEBIN EL-KOM CARD */}
                  <button
                    onClick={() => setSelectedCenter('shebin')}
                    className="text-start group p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-purple-300 dark:border-purple-700 hover:border-purple-600 dark:hover:border-amber-400 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-purple-700 to-indigo-700 text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                          <MapPin className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300 mb-1">
                            {language === 'ar' ? 'عاصمة المنوفية · مركز شبين الكوم' : 'Menoufia Capital · Shebin El-Kom'}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-amber-300 transition-colors">
                            {language === 'ar' ? 'مركز ومدينة شبين الكوم' : 'Shebin El-Kom Center'}
                          </h4>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shrink-0">
                        {shebinCenterServices.length} {language === 'ar' ? 'خدمة' : 'items'}
                      </span>
                    </div>

                    {/* Sample hubs / hospitals inside Shebin for this category */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                        {language === 'ar' ? 'أبرز الجهات والمقرات المتاحة في شبين الكوم:' : 'Key offices & hospitals in Shebin El-Kom:'}
                      </span>
                      {(shebinCenterOffices.length > 0 ? shebinCenterOffices.slice(0, 3) : shebinCenterServices.slice(0, 3)).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                          <span className="truncate">{language === 'ar' ? (item.name || item.title) : (item.nameEn || item.titleEn)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-purple-700 dark:text-purple-300 pt-1">
                      <span>{language === 'ar' ? 'عرض خدمات وأوراق شبين الكوم' : 'Open Shebin El-Kom services'}</span>
                      {language === 'ar' ? <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </div>
                  </button>

                  {/* QUESNA CARD */}
                  <button
                    onClick={() => setSelectedCenter('quesna')}
                    className="text-start group p-5 sm:p-6 rounded-3xl bg-white dark:bg-slate-900 border-2 border-sky-300 dark:border-sky-700 hover:border-amber-500 dark:hover:border-amber-400 shadow-lg hover:shadow-xl transition-all cursor-pointer flex flex-col justify-between gap-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3.5">
                        <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-sky-500 to-indigo-700 text-white flex items-center justify-center shadow-md shrink-0 group-hover:scale-105 transition-transform">
                          <MapPin className="w-6 h-6 text-amber-300" />
                        </div>
                        <div>
                          <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 mb-1">
                            {language === 'ar' ? 'مركز قويسنا والمنطقة الصناعية' : 'Quesna Center & Industrial Zone'}
                          </span>
                          <h4 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white group-hover:text-sky-600 dark:group-hover:text-amber-300 transition-colors">
                            {language === 'ar' ? 'مركز ومدينة قويسنا' : 'Quesna Center'}
                          </h4>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 text-xs font-black shrink-0">
                        {quesnaCenterServices.length} {language === 'ar' ? 'خدمة' : 'items'}
                      </span>
                    </div>

                    {/* Sample hubs / hospitals inside Quesna for this category */}
                    <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/70 space-y-1.5">
                      <span className="text-[11px] font-bold text-slate-600 dark:text-slate-300 block">
                        {language === 'ar' ? 'أبرز الجهات والمقرات المتاحة في قويسنا:' : 'Key offices & hospitals in Quesna:'}
                      </span>
                      {(quesnaCenterOffices.length > 0 ? quesnaCenterOffices.slice(0, 3) : quesnaCenterServices.slice(0, 3)).map((item: any, idx: number) => (
                        <div key={idx} className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                          <span className="truncate">{language === 'ar' ? (item.name || item.title) : (item.nameEn || item.titleEn)}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center justify-between text-xs font-bold text-sky-600 dark:text-sky-300 pt-1">
                      <span>{language === 'ar' ? 'عرض خدمات وأوراق قويسنا' : 'Open Quesna services'}</span>
                      {language === 'ar' ? <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> : <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
                    </div>
                  </button>
                </div>

                {/* Upcoming Menoufia Centers Strip */}
                <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60 text-[11px] text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 text-slate-400" />
                    {language === 'ar'
                      ? 'باقي مراكز المنوفية (منوف · أشمون · الباجور · السادات · تلا · بركة السبع · الشهداء):'
                      : 'Other Menoufia centers (Menouf, Ashmoun, Bagour, Sadat, Tala):'}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-slate-200/70 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    {language === 'ar' ? 'تُضاف في المرحلة القادمة' : 'Coming next phase'}
                  </span>
                </div>
              </div>
            )}

            {/* STEP 4: SERVICES & HOSPITALS LIST (Shown when Center selected OR Search is active) */}
            {(hasSearch || (selectedCategory && selectedGovernorate === 'menoufia' && selectedCenter)) && (
              <>
                {/* Health Special Actions Banner if Health category selected */}
                {selectedCategory === 'health' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-purple-950 via-slate-900 to-sky-950 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-sky-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-sky-500/20 text-sky-300 flex items-center justify-center shrink-0">
                        <HeartPulse className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-sky-200">
                          {PAYMENTS_AND_ORDERS_ENABLED
                            ? (language === 'ar'
                                ? `خدمات المستشفيات والروشتات — ${selectedCenter === 'quesna' ? 'قويسنا' : 'شبين الكوم'}`
                                : 'Hospitals & Prescription Delivery')
                            : (language === 'ar'
                                ? `أوراق وإجراءات المستشفيات — ${selectedCenter === 'quesna' ? 'قويسنا' : 'شبين الكوم'}`
                                : 'Hospitals & Clinics Required Documents')}
                        </h4>
                        <p className="text-xs text-slate-300 mt-0.5">
                          {PAYMENTS_AND_ORDERS_ENABLED
                            ? (language === 'ar'
                                ? 'حجز العيادات، التقارير الثلاثية، قرارات نفقة الدولة، وتوصيل الأدوية للبيت'
                                : 'Clinic bookings, state-funded therapy & doorstep medicine delivery')
                            : (language === 'ar'
                                ? 'قوائم المستندات المطلوبة للعيادات، التقارير الثلاثية، وقرارات نفقة الدولة قبل الذهاب'
                                : 'Checklists for clinics, medical committees & state-funded therapy papers')}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      {PAYMENTS_AND_ORDERS_ENABLED && (
                        <button
                          onClick={() => openModal('courier_booking')}
                          className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-sky-500 hover:bg-sky-400 font-bold text-xs text-slate-950 rounded-xl transition-all shadow-md shadow-sky-500/20 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                          <Truck className="w-3.5 h-3.5" />
                          <span>{language === 'ar' ? 'طلب مندوب للروشتة' : 'Prescription Courier'}</span>
                        </button>
                      )}
                      <button
                        onClick={() => openModal('chat')}
                        className="flex-1 sm:flex-initial px-3 sm:px-4 py-2 bg-white/10 hover:bg-white/20 font-bold text-xs text-white rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-300" />
                        <span>{language === 'ar' ? 'استفسار عن الأوراق' : 'Ask About Papers'}</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Courier Highlight Banner if Courier tab selected */}
                {PAYMENTS_AND_ORDERS_ENABLED && selectedCategory === 'courier' && (
                  <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-amber-700 via-amber-800 to-purple-950 text-white shadow-md flex flex-col sm:flex-row items-center justify-between gap-4 border border-amber-500/30">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-amber-500/20 text-amber-300 flex items-center justify-center shrink-0">
                        <Truck className="w-5 h-5 text-amber-300" />
                      </div>
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-amber-100">
                          {language === 'ar'
                            ? `مندوب سكيب في ${selectedCenter === 'quesna' ? 'قويسنا' : 'شبين الكوم'}`
                            : 'Doorstep Paperwork Courier'}
                        </h4>
                        <p className="text-xs text-amber-200 mt-0.5">
                          {language === 'ar' ? 'مندوب يستلم المستندات من باب بيتك ويوصلها مختومة' : 'Our courier collects documents and delivers them stamped'}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => openModal('courier_booking')}
                      className="w-full sm:w-auto px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs rounded-xl transition-all shadow-md shadow-amber-400/20 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Truck className="w-4 h-4 text-slate-950" />
                      <span>{language === 'ar' ? 'طلب مندوب الآن' : 'Request Courier'}</span>
                    </button>
                  </div>
                )}

                {/* Services Grid */}
                {filteredServices.length === 0 ? (
                  <div className="py-16 text-center rounded-3xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
                    <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
                    <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">
                      {language === 'ar' ? 'لم يتم العثور على خدمات مطابقة' : 'No matching services found'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {language === 'ar' ? 'جرب البحث باسم آخر أو التبديل بين شبين الكوم وقويسنا' : 'Try searching another term or switching centers'}
                    </p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                    {filteredServices.map((service) => {
                      const { icon: ExpressiveIcon, style: iconStyle } = getExpressiveServiceIcon(service.icon, service.category);
                      return (
                        <div
                          key={service.id}
                          className="group flex flex-col justify-between bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 rounded-2xl sm:rounded-3xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700/80 hover:border-purple-400/60 hover:shadow-xl transition-all overflow-hidden"
                        >
                          <div>
                            
                            {/* Service Header with Expressive High-Quality Themed Icon */}
                            <div className="flex items-start gap-3 mb-3">
                              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border shadow-xs group-hover:scale-105 transition-transform ${iconStyle}`}>
                                <ExpressiveIcon className="w-6 h-6" />
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1 gap-1.5">
                                  <span className="font-medium truncate text-[11px] sm:text-xs text-slate-500 dark:text-slate-400">
                                    {language === 'ar' ? service.responsibleEntity : service.responsibleEntityEn}
                                  </span>
                                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold shrink-0 bg-sky-500/10 text-sky-700 dark:text-sky-300 border border-sky-400/30">
                                    <MapPin className="w-2.5 h-2.5" />
                                    {selectedCenter && (!service.city || service.city === 'menoufia')
                                      ? getCityLabel(selectedCenter)
                                      : getCityLabel(service.city)}
                                  </span>
                                </div>
                                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-2">
                                  {language === 'ar' ? service.title : service.titleEn}
                                </h3>
                              </div>
                            </div>

                            {/* Short Description */}
                            <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed mb-4">
                              {language === 'ar' ? service.description : service.descriptionEn}
                            </p>

                            {/* Required Documents Teaser */}
                            <div className="p-3 sm:p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-700/60 mb-4 sm:mb-5">
                              <div className="text-[11px] font-bold text-slate-700 dark:text-slate-200 mb-2 flex items-center justify-between">
                                <span>{language === 'ar' ? 'أبرز الأوراق المطلوبة:' : 'Key Documents Required:'}</span>
                                <span className="text-[10px] text-purple-600 dark:text-purple-400 font-bold">
                                  {service.requiredDocuments.length} {language === 'ar' ? 'مستندات' : 'items'}
                                </span>
                              </div>
                              <ul className="space-y-1.5">
                                {service.requiredDocuments.slice(0, 2).map((doc, dIdx) => (
                                  <li key={dIdx} className="flex items-start gap-1.5 text-[11px] text-slate-600 dark:text-slate-400">
                                    <CheckCircle className="w-3.5 h-3.5 text-sky-500 shrink-0 mt-0.5" />
                                    <span className="truncate">{language === 'ar' ? doc.name : doc.nameEn}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>

                            {/* Key stats row */}
                            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 border-t border-slate-200/60 dark:border-slate-700/60 mb-4 sm:mb-5 gap-2">
                              {PAYMENTS_AND_ORDERS_ENABLED ? (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <CreditCard className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span className="font-black text-amber-600 dark:text-amber-400 tabular-nums text-[11px] sm:text-xs">
                                    {service.fee} {language === 'ar' ? 'ج.م' : 'EGP'}
                                  </span>
                                </div>
                              ) : (
                                <div className="flex items-center gap-1.5 shrink-0">
                                  <FileCheck2 className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                                  <span className="font-black text-amber-600 dark:text-amber-400 tabular-nums text-[11px] sm:text-xs">
                                    {service.requiredDocuments.length} {language === 'ar' ? 'مستندات مطلوبة' : 'docs required'}
                                  </span>
                                </div>
                              )}
                              <span aria-hidden="true" className="text-slate-300 dark:text-slate-700">·</span>
                              <div className="flex items-center gap-1.5 min-w-0 truncate">
                                <Clock className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                                <span className="truncate text-[11px] sm:text-xs">
                                  {language === 'ar' ? service.estimatedDuration : service.estimatedDurationEn}
                                </span>
                              </div>
                            </div>

                          </div>

                          {/* Actions buttons */}
                          {PAYMENTS_AND_ORDERS_ENABLED ? (
                            <div className="grid grid-cols-2 gap-2 pt-2">
                              <button
                                onClick={() => openModal('service_details', service)}
                                className="w-full py-2.5 px-2 text-[11px] sm:text-xs font-bold text-slate-800 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-purple-50 dark:hover:bg-purple-950/40 rounded-xl border border-slate-200 dark:border-slate-600 hover:border-purple-400 transition-colors flex items-center justify-center gap-1 truncate cursor-pointer"
                              >
                                <span className="truncate">{language === 'ar' ? 'فحص الأوراق' : 'Check Papers'}</span>
                              </button>

                              <button
                                onClick={() => openModal('payment', { service })}
                                className="w-full py-2.5 px-2 text-[11px] sm:text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1 truncate cursor-pointer"
                              >
                                <span className="truncate">{language === 'ar' ? 'تقديم / سداد' : 'Apply & Pay'}</span>
                                {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                              </button>
                            </div>
                          ) : (
                            <div className="pt-2">
                              <button
                                onClick={() => openModal('service_details', service)}
                                className="w-full py-2.5 px-3 text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-600/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                              >
                                <FileCheck2 className="w-4 h-4 text-amber-300 shrink-0" />
                                <span className="truncate">{language === 'ar' ? 'فحص الأوراق المطلوبة' : 'Check Required Papers'}</span>
                                {language === 'ar' ? <ChevronLeft className="w-3.5 h-3.5 shrink-0" /> : <ChevronRight className="w-3.5 h-3.5 shrink-0" />}
                              </button>
                            </div>
                          )}

                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            )}

          </div>
        )}

      </div>
    </section>
  );
};

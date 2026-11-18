import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceOffice } from '../types';
import { 
  MapPin, 
  Clock, 
  Phone, 
  Navigation, 
  Building2, 
  CheckCircle, 
  Truck, 
  Star, 
  Filter,
  Search,
  Compass
} from 'lucide-react';

export const InteractiveMap: React.FC = () => {
  const { offices, language, openModal } = useApp();
  const [selectedOffice, setSelectedOffice] = useState<ServiceOffice>(offices[0]);
  const [mapCategory, setMapCategory] = useState<'all' | 'government' | 'educational' | 'housing' | 'health'>('all');
  const [mapCity, setMapCity] = useState<'all' | 'shebin' | 'quesna'>('all');
  const [searchBranch, setSearchBranch] = useState<string>('');

  const filteredOffices = offices.filter((off) => {
    const catMatch = mapCategory === 'all' || off.category === mapCategory;
    const cityMatch = mapCity === 'all' || !off.city || off.city === 'menoufia' || off.city === mapCity;
    const searchMatch = 
      !searchBranch || 
      off.name.toLowerCase().includes(searchBranch.toLowerCase()) || 
      off.nameEn.toLowerCase().includes(searchBranch.toLowerCase()) ||
      off.address.toLowerCase().includes(searchBranch.toLowerCase());
    return catMatch && cityMatch && searchMatch;
  });

  useEffect(() => {
    if (filteredOffices.length > 0 && !filteredOffices.some(o => o.id === selectedOffice?.id)) {
      setSelectedOffice(filteredOffices[0]);
    }
  }, [mapCategory, mapCity, searchBranch, filteredOffices, selectedOffice]);

  return (
    <section id="map-section" className="py-10 sm:py-14 bg-slate-100 dark:bg-slate-950 transition-colors w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-purple-600 dark:text-purple-400 mb-1">
              <span>{language === 'ar' ? 'خريطة المنوفية التفاعلية' : 'Menoufia Interactive Map'}</span>
              <span aria-hidden="true">·</span>
              <span className="text-amber-600 dark:text-amber-400 font-bold">{language === 'ar' ? 'شبين الكوم وقويسنا' : 'Shebin El-Kom & Quesna'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'المصالح الحكومية والمستشفيات بالمنوفية' : 'Menoufia Official Hubs & Hospitals'}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md">
            {language === 'ar'
              ? 'استعرض أماكن المصالح ومستشفيات شبين الكوم وقويسنا وأوقات الانتظار الحالية قبل التحرك.'
              : 'Explore government hubs and hospitals in Shebin El-Kom & Quesna with live wait times.'}
          </p>
        </div>

        {/* Filter & Search Bar */}
        <div className="mb-6 flex flex-col xl:flex-row items-stretch xl:items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Tabs */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-x-auto">
              {[
                { key: 'all', labelAr: 'كافة المقرات', labelEn: 'All Hubs' },
                { key: 'health', labelAr: 'المستشفيات', labelEn: 'Hospitals' },
                { key: 'government', labelAr: 'جوازات ومرور ومحليات', labelEn: 'Gov & Traffic' },
                { key: 'educational', labelAr: 'جامعة المنوفية', labelEn: 'University' },
                { key: 'housing', labelAr: 'الإسكان', labelEn: 'Housing' },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setMapCategory(tab.key as any)}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                    mapCategory === tab.key
                      ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {language === 'ar' ? tab.labelAr : tab.labelEn}
                </button>
              ))}
            </div>

            {/* Menoufia City Switcher */}
            <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800">
              {[
                { key: 'all', labelAr: 'كل المنوفية', labelEn: 'All' },
                { key: 'shebin', labelAr: 'شبين الكوم', labelEn: 'Shebin El-Kom' },
                { key: 'quesna', labelAr: 'قويسنا', labelEn: 'Quesna' },
              ].map((c) => (
                <button
                  key={c.key}
                  onClick={() => setMapCity(c.key as any)}
                  className={`px-2.5 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap cursor-pointer ${
                    mapCity === c.key
                      ? 'bg-amber-400 text-slate-950 shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {language === 'ar' ? c.labelAr : c.labelEn}
                </button>
              ))}
            </div>
          </div>

          <div className="relative xl:w-64 w-full shrink-0">
            <Search className="w-4 h-4 absolute top-2.5 start-3 text-slate-400" />
            <input
              type="text"
              value={searchBranch}
              onChange={(e) => setSearchBranch(e.target.value)}
              placeholder={language === 'ar' ? 'ابحث باسم المستشفى أو المكتب...' : 'Search hospital or office...'}
              className="w-full ps-9 pe-4 py-2 text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
        </div>

        {/* Main Map + Details Layout */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Interactive Map Visual (Stylized Menoufia Plan: Shebin El-Kom <-> Quesna) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-3xl p-5 relative min-h-[460px] overflow-hidden shadow-xl border border-slate-800 flex flex-col justify-between">
            
            {/* SVG Interactive Map Canvas */}
            <div className="absolute inset-0 opacity-85">
              <svg className="w-full h-full" viewBox="0 0 900 500" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255, 255, 255, 0.05)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="#090d16" />
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* City Zone Halos */}
                <ellipse cx="290" cy="245" rx="200" ry="185" fill="#7c3aed" fillOpacity="0.06" stroke="#8b5cf6" strokeOpacity="0.2" strokeDasharray="6 4" />
                <ellipse cx="670" cy="245" rx="165" ry="165" fill="#f59e0b" fillOpacity="0.05" stroke="#fbbf24" strokeOpacity="0.2" strokeDasharray="6 4" />

                {/* Bahr Shebin Canal running through Shebin El-Kom */}
                <path
                  d="M 275 0 C 260 120, 295 230, 265 360 C 250 420, 270 460, 255 500"
                  fill="none"
                  stroke="#0284c7"
                  strokeWidth="22"
                  strokeOpacity="0.35"
                  strokeLinecap="round"
                />
                <path
                  d="M 275 0 C 260 120, 295 230, 265 360 C 250 420, 270 460, 255 500"
                  fill="none"
                  stroke="#38bdf8"
                  strokeWidth="7"
                  strokeOpacity="0.75"
                />

                {/* Shebin El-Kom <-> Quesna Highway & Delta Agricultural Road */}
                <path d="M 120 265 Q 450 245 780 215" fill="none" stroke="#475569" strokeWidth="6" opacity="0.6" />
                <line x1="690" y1="20" x2="730" y2="480" stroke="#64748b" strokeWidth="5" strokeDasharray="8 5" opacity="0.5" />
                <line x1="150" y1="150" x2="450" y2="380" stroke="#334155" strokeWidth="3" opacity="0.45" />

                {/* District & Highway Labels */}
                <text x="115" y="135" fill="#cbd5e1" fontSize="14" fontWeight="bold">شبين الكوم (الحي الغربي)</text>
                <text x="315" y="105" fill="#c4b5fd" fontSize="14" fontWeight="bold">البر الشرقي وجامعة المنوفية</text>
                <text x="305" y="295" fill="#7dd3fc" fontSize="12" fontWeight="bold">مجمع المستشفيات - شارع جمال عبد الناصر</text>
                <text x="455" y="232" fill="#94a3b8" fontSize="11" fontWeight="bold">طريق شبين الكوم - قويسنا</text>
                <text x="615" y="115" fill="#fcd34d" fontSize="15" fontWeight="bold">قويسنا - وسط المدينة</text>
                <text x="635" y="385" fill="#94a3b8" fontSize="12" fontWeight="bold">الطريق الزراعي والمنطقة الصناعية بقويسنا</text>
              </svg>
            </div>

            {/* Interactive Pins layer */}
            <div className="relative w-full h-full min-h-[360px] pointer-events-none">
              {filteredOffices.map((office) => {
                const isSelected = selectedOffice?.id === office.id;
                return (
                  <button
                    key={office.id}
                    onClick={() => setSelectedOffice(office)}
                    style={{
                      left: `${office.coords.x}%`,
                      top: `${office.coords.y}%`,
                    }}
                    className={`absolute -translate-x-1/2 -translate-y-1/2 pointer-events-auto transition-transform hover:scale-125 focus:outline-none group z-20 cursor-pointer ${
                      isSelected ? 'scale-125 z-30' : 'opacity-90'
                    }`}
                    title={language === 'ar' ? office.name : office.nameEn}
                  >
                    <div className="relative flex flex-col items-center">
                      <div
                        className={`w-9 h-9 sm:w-10 sm:h-10 rounded-2xl flex items-center justify-center shadow-lg transition-all ${
                          isSelected
                            ? 'bg-amber-400 text-slate-950 ring-4 ring-amber-400/40'
                            : office.category === 'health'
                              ? 'bg-sky-500 text-white'
                              : office.category === 'educational'
                                ? 'bg-purple-600 text-white'
                                : 'bg-indigo-600 text-white'
                        }`}
                      >
                        <MapPin className="w-5 h-5" />
                      </div>

                      {/* Wait Time Indicator Pill */}
                      <span className="mt-1 px-1.5 py-0.5 text-[9px] font-bold bg-slate-900/95 text-white rounded-md border border-slate-700 whitespace-nowrap">
                        {office.currentWaitTimeMin} {language === 'ar' ? 'د' : 'm'}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Bottom floating Map legend & user location detector */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-slate-900/85 backdrop-blur-md border border-slate-800 text-white text-xs">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span>
                  <span className="text-[11px] text-slate-300">{language === 'ar' ? 'حكومي ومرور' : 'Government'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
                  <span className="text-[11px] text-slate-300">{language === 'ar' ? 'جامعة المنوفية' : 'University'}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                  <span className="text-[11px] text-slate-300">{language === 'ar' ? 'مستشفيات شبين وقويسنا' : 'Hospitals'}</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '8s' }} />
                <span className="text-[11px] text-slate-200 font-bold">
                  {language === 'ar' ? 'النطاق: محافظة المنوفية (شبين الكوم - قويسنا)' : 'Region: Menoufia (Shebin El-Kom - Quesna)'}
                </span>
              </div>
            </div>

          </div>

          {/* Selected Office Details Sidebar */}
          <div className="lg:col-span-4 bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-xl border border-slate-200 dark:border-slate-800 flex flex-col justify-between">
            {selectedOffice ? (
              <div className="space-y-4">
                
                {/* Office Header */}
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1.5">
                    <span className="font-bold text-purple-600 dark:text-purple-400">
                      {selectedOffice.city === 'quesna'
                        ? (language === 'ar' ? 'قويسنا · المنوفية' : 'Quesna · Menoufia')
                        : (language === 'ar' ? 'شبين الكوم · المنوفية' : 'Shebin El-Kom · Menoufia')}
                    </span>
                    <div className="flex items-center gap-1 text-amber-500 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400" />
                      <span>{selectedOffice.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-snug">
                    {language === 'ar' ? selectedOffice.name : selectedOffice.nameEn}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span>{language === 'ar' ? selectedOffice.address : selectedOffice.addressEn}</span>
                  </p>
                </div>

                {/* Queue status banner */}
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800/60 flex items-center justify-between">
                  <div>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                      {language === 'ar' ? 'وقت الانتظار التقريبي بالشباك:' : 'Estimated Current Queue:'}
                    </span>
                    <span className="text-base font-extrabold text-purple-700 dark:text-purple-300 tabular-nums">
                      {selectedOffice.currentWaitTimeMin} {language === 'ar' ? 'دقيقة فقط' : 'minutes'}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold px-2 py-1 bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/30 rounded-lg">
                    {language === 'ar' ? 'شباك مميكن سريع' : 'Fast-track'}
                  </span>
                </div>

                {/* Working hours & Contact */}
                <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                    <span>{language === 'ar' ? selectedOffice.workingHours : selectedOffice.workingHoursEn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono tabular-nums">{selectedOffice.phone}</span>
                  </div>
                </div>

                {/* Services available at branch */}
                <div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mb-2">
                    {language === 'ar' ? 'الخدمات المتاحة بهذا الفرع:' : 'Services Available at this Hub:'}
                  </h4>
                  <ul className="space-y-1.5">
                    {selectedOffice.servicesAvailable.map((srv, idx) => (
                      <li key={idx} className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-400">
                        <CheckCircle className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                        <span>{srv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action buttons */}
                <div className="pt-4 border-t border-slate-200 dark:border-slate-800 space-y-2">
                  <button
                    onClick={() => openModal('courier_booking', { office: selectedOffice })}
                    className="w-full py-3 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md shadow-purple-950/20 flex items-center justify-center gap-2"
                  >
                    <Truck className="w-4 h-4 text-amber-300" />
                    <span>
                      {language === 'ar' ? 'طلب مندوب سكيب من هذا المقر' : 'Order Courier to this Hub'}
                    </span>
                  </button>

                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(selectedOffice.name + ' ' + selectedOffice.address)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full py-2.5 px-4 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2"
                  >
                    <Navigation className="w-3.5 h-3.5 text-sky-500" />
                    <span>{language === 'ar' ? 'فتح الاتجاهات (GPS)' : 'Get Directions (GPS)'}</span>
                  </a>
                </div>

              </div>
            ) : null}
          </div>

        </div>

      </div>
    </section>
  );
};

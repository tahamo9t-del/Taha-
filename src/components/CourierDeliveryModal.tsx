import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  X, 
  Truck, 
  FileText, 
  Pill, 
  MapPin, 
  Phone, 
  CheckCircle2, 
  Clock, 
  ShieldCheck, 
  MessageSquare,
  Upload
} from 'lucide-react';

export const CourierDeliveryModal: React.FC = () => {
  const { activeModal, closeModal, language, createRequest, openModal, services, alertDestinationSettings } = useApp();
  
  const [courierType, setCourierType] = useState<'documents' | 'medicine'>('documents');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('gov-passport-renew');
  const [medicineNotes, setMedicineNotes] = useState<string>('كونكور 5 مجم (علبة) + أسبوسيد أطفال (شريطين)');
  const [customerName, setCustomerName] = useState<string>('محمد أحمد إبراهيم سليم');
  const [address, setAddress] = useState<string>('شارع الجيش، وسط مدينة قويسنا، المنوفية');
  const [phone, setPhone] = useState<string>('01098765432');
  const [handoverTime, setHandoverTime] = useState<string>('اليوم - خلال ساعتين');
  const [notes, setNotes] = useState<string>('الأوراق جاهزة وموضوعة في مظروف شفاف بالصور والبطاقة');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'instapay'>('cash');
  const [createdOrderRef, setCreatedOrderRef] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  if (activeModal.type !== 'courier_booking') return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const service = services.find(s => s.id === selectedServiceId) || services[0];
    const newReq = await createRequest(service, {
      name: customerName.trim() || 'مواطن كريم',
      phone: phone.trim() || '01098765432',
      nationalId: '29510140104872',
      address: address.trim() || 'شبين الكوم - قويسنا، المنوفية',
      courierRequested: true,
      paymentMethod
    });
    setCreatedOrderRef(newReq.referenceNumber);
    setIsSuccess(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <Truck className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'خدمة مندوب سكيب (SKIP Courier)' : 'SKIP Doorstep Courier'}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? 'تجهيز الأوراق بدون خروج من المنزل وتوصيل الأدوية' : 'Zero-Queue doorstep paper collection & medicine dispatch'}
              </p>
            </div>
          </div>
          <button
            onClick={closeModal}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-200/50 dark:hover:bg-slate-700"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto">
          
          {isSuccess ? (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'تم توجيه المندوب بنجاح!' : 'Courier Dispatched Successfully!'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-md mx-auto">
                {language === 'ar'
                  ? 'تم تعيين كابتن أحمد سامي (مندوب سكيب المعتمد). سيتوجه إلى عنوانك لاستلام الملف ومطابقته.'
                  : 'Captain Ahmed Samy has been assigned to collect your documents at your address.'}
              </p>

              <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 text-start flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-700 text-amber-300 flex items-center justify-center font-bold">
                    AS
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                      كابتن أحمد سامي
                    </h5>
                    <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
                      مندوب معتمد - يحمل تصريح الهيئة
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    closeModal();
                    openModal('chat');
                  }}
                  className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white rounded-lg flex items-center gap-1.5 shadow-sm"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-sky-300" />
                  <span>{language === 'ar' ? 'فتح الشات' : 'Open Chat'}</span>
                </button>
              </div>

              <button
                onClick={() => {
                  closeModal();
                  const el = document.getElementById('requests-tracker');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="w-full py-3 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
              >
                {language === 'ar' ? 'متابعة مسار المندوب بالخريطة' : 'Track Courier Live'}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Type Switcher: Documents vs Medicine */}
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setCourierType('documents')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    courierType === 'documents'
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <FileText className="w-4 h-4 text-sky-300" />
                  <span>{language === 'ar' ? 'استلام وتخليص أوراق' : 'Official Paperwork'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCourierType('medicine')}
                  className={`py-2.5 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                    courierType === 'medicine'
                      ? 'bg-purple-700 text-white shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Pill className="w-4 h-4 text-amber-300" />
                  <span>{language === 'ar' ? 'توصيل أدوية للعنوان' : 'Medicine Delivery'}</span>
                </button>
              </div>

              {courierType === 'documents' ? (
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'اختر المعاملة المراد استلام أوراقها وتخليصها:' : 'Select Target Procedure:'}
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3 py-2.5 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    {services.filter(s => s.courierSupported).map((s) => (
                      <option key={s.id} value={s.id}>
                        {language === 'ar' ? s.title : s.titleEn} ({s.fee} ج.م)
                      </option>
                    ))}
                  </select>
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-1">
                    {language === 'ar' ? 'أسماء الأدوية المطلوبة أو رقم الروشتة:' : 'Medicine Names / Prescription ID:'}
                  </label>
                  <textarea
                    rows={2}
                    value={medicineNotes}
                    onChange={(e) => setMedicineNotes(e.target.value)}
                    placeholder="اكتب الأدوية المطلوبة أو رقم الروشتة المسجلة بالملف الطبي..."
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              )}

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'الاسم بالكامل لصاحب المعاملة:' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="الاسم الرباعي كما هو مدون بالبطاقة"
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  required
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'ar' ? 'عنوان الاستلام / التسليم بالتفصيل:' : 'Delivery Address:'}
                  </label>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'ar' ? 'رقم الهاتف للتواصل المباشر:' : 'Contact Phone:'}
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'الوقت المفضل لحضور المندوب:' : 'Preferred Courier Arrival Window:'}
                </label>
                <select
                  value={handoverTime}
                  onChange={(e) => setHandoverTime(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="اليوم - خلال ساعتين">اليوم - خلال ساعتين (فوري)</option>
                  <option value="اليوم - من 4 عصراً إلى 8 مساءً">اليوم - من 4 عصراً إلى 8 مساءً</option>
                  <option value="غداً صباحاً - من 9 ص إلى 1 م">غداً صباحاً - من 9 ص إلى 1 م</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  {language === 'ar' ? 'ملاحظات خاصة للمندوب:' : 'Special Instructions for Courier:'}
                </label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="مثال: يرجى الاتصال عند الوصول أسفل العقار..."
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                />
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  {language === 'ar' ? 'طريقة سداد أتعاب المندوب والرسوم:' : 'Payment Method:'}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'cash'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 text-amber-700 dark:text-amber-300 ring-2 ring-amber-400/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{language === 'ar' ? '💵 نقداً عند الاستلام (كاش)' : 'Cash on Handover'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-2.5 rounded-xl border text-xs font-bold transition-all flex items-center justify-center gap-2 ${
                      paymentMethod === 'instapay'
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-500 text-purple-700 dark:text-purple-300 ring-2 ring-purple-500/20 shadow-xs'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>{language === 'ar' ? '📱 دفع إلكتروني (انستاباي)' : 'InstaPay'}</span>
                  </button>
                </div>
              </div>

              {/* Service guarantee note */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
                <ShieldCheck className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                <span>
                  {language === 'ar'
                    ? 'كافة مناديب SKIP معتمدون رسمياً، ومزودون بحقائب شحن مميكنة ومؤمنة ضد الفتح لحماية الوثائق الرسمية والأدوية.'
                    : 'All SKIP couriers are officially verified and carry tamper-evident security pouches.'}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl transition-all shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4 text-amber-300" />
                <span>
                  {language === 'ar' ? 'تأكيد وحجز المندوب المنزلي' : 'Confirm & Request Courier'}
                </span>
              </button>

            </form>
          )}

        </div>

      </div>
    </div>
  );
};

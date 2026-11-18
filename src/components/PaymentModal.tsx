import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ServiceItem, UserRequest } from '../types';
import { 
  X, 
  CreditCard, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  QrCode, 
  Download, 
  ExternalLink,
  ArrowRight,
  ArrowLeft,
  Lock,
  Smartphone,
  Banknote,
  Send,
  MessageCircle,
  Phone
} from 'lucide-react';

export const PaymentModal: React.FC = () => {
  const { activeModal, closeModal, language, createRequest, openModal, alertDestinationSettings, adminPhoneSettings } = useApp();
  const service: ServiceItem | undefined = activeModal.data?.service;

  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'instapay' | 'fawry' | 'card' | 'wallet'>('cash');
  const [includeCourier, setIncludeCourier] = useState<boolean>(true);
  const [applicantName, setApplicantName] = useState<string>('محمد أحمد إبراهيم سليم');
  const [applicantPhone, setApplicantPhone] = useState<string>('01098765432');
  const [nationalId, setNationalId] = useState<string>('29510140104872');
  const [address, setAddress] = useState<string>('شارع جمال عبد الناصر، البر الشرقي، شبين الكوم، المنوفية');
  const [fawryCode, setFawryCode] = useState<string>('');
  const [completedRequest, setCompletedRequest] = useState<UserRequest | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  if (activeModal.type !== 'payment' || !service) return null;

  const serviceFee = service.fee;
  const courierFee = includeCourier ? 60 : 0;
  const totalAmount = serviceFee + courierFee;

  const handlePay = async () => {
    setIsProcessing(true);
    try {
      const newReq = await createRequest(service, {
        name: applicantName,
        phone: applicantPhone,
        nationalId,
        address,
        courierRequested: includeCourier,
        paymentMethod
      });
      setFawryCode(`789-${Math.floor(100000 + Math.random() * 900000)}`);
      setCompletedRequest(newReq);
    } catch (e) {
      console.error(e);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl my-8 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh]">
        
        {/* Top Header */}
        <div className="p-6 bg-slate-50 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-100 dark:bg-purple-950/80 text-purple-700 dark:text-purple-300">
              <CreditCard className="w-5 h-5 text-amber-500 dark:text-amber-400" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                {completedRequest 
                  ? (language === 'ar' ? 'إيصال السداد والتأكيد الرسمي' : 'Official Payment Receipt') 
                  : (language === 'ar' ? 'سداد الرسوم بالدفع الموحد' : 'Unified Payment Gateway')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {language === 'ar' ? service.title : service.titleEn}
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
          
          {completedRequest ? (
            /* SUCCESS INVOICE STATE */
            <div className="space-y-6 text-center">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-950/80 text-amber-600 dark:text-amber-400 rounded-full flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {completedRequest.paymentMethod === 'cash'
                    ? (language === 'ar' ? 'تم تأكيد وإرسال طلبك بنجاح (الدفع نقداً عند الاستلام)!' : 'Request Dispatched (Cash on Delivery)!')
                    : (language === 'ar' ? 'تم تأكيد السداد وإرسال الطلب بنجاح!' : 'Payment Verified & Request Submitted!')}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {completedRequest.paymentMethod === 'cash'
                    ? (language === 'ar' ? 'سيقوم المندوب بالتواصل معك هاتفياً وتحصيل الرسوم نقداً عند استلام أصول الأوراق.' : 'Our courier will call you and collect the cash upon handover.')
                    : (language === 'ar' ? 'تم تسجيل معاملتك رسمياً، وتعيين المندوب المعتمد لمتابعة الإجراءات.' : 'Your transaction has been officially recorded and verified.')}
                </p>
              </div>

              {/* Instant WhatsApp Dispatch To Admin Button */}
              {(() => {
                const rawNum = alertDestinationSettings?.whatsappNumber?.replace(/\D/g, '') || '01098765432';
                const intl = rawNum.startsWith('2') ? rawNum : '2' + rawNum;
                const payText = completedRequest.paymentMethod === 'cash' ? 'الدفع نقداً عند استلام الأوراق' : 'مدفوع إلكترونياً';
                const msg = `🚨 طلب جديد وارد عبر منصة SKIP:\nرقم المعاملة: ${completedRequest.referenceNumber}\nالخدمة: ${completedRequest.serviceTitle}\nصاحب الشأن: ${completedRequest.applicantName}\nالهاتف: ${completedRequest.applicantPhone}\nالعنوان: ${completedRequest.address}\nطريقة السداد: ${payText}\nالمبلغ: ${completedRequest.fee} ج.م`;
                const whatsappUrl = `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;

                return (
                  <div className="p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-300 dark:border-purple-800 text-start space-y-3">
                    <div className="flex items-center gap-2 text-purple-950 dark:text-purple-200">
                      <MessageCircle className="w-5 h-5 text-purple-600 dark:text-purple-400 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold">
                          {language === 'ar' ? 'إخطار فوري للإدارة والمندوب عبر واتساب:' : 'Instant Direct WhatsApp Alert:'}
                        </h4>
                        <p className="text-[11px] text-purple-700 dark:text-purple-300">
                          {language === 'ar' ? 'اضغط لإرسال تفاصيل طلبك مباشرة للإدارة لتسريع تحرك المندوب وتأكيد الموعد فوراً.' : 'Click to send your order dossier directly to administration.'}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm flex items-center justify-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4 text-sky-300" />
                        <span>{language === 'ar' ? 'إرسال بيانات الطلب عبر واتساب للإدارة' : 'Send via WhatsApp to Admin'}</span>
                      </a>
                      <a
                        href={`tel:${alertDestinationSettings?.whatsappNumber || '01098765432'}`}
                        className="py-2.5 px-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-1.5"
                      >
                        <Phone className="w-4 h-4 text-purple-600" />
                        <span>{language === 'ar' ? 'اتصال مباشر' : 'Call'}</span>
                      </a>
                    </div>
                  </div>
                );
              })()}

              {/* Official Electronic Receipt Card */}
              <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-start space-y-3">
                <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-2">
                    <img src="/assets/aistudio/image_5ae8ef1d.png" alt="SKIP" className="w-7 h-7 object-contain" />
                    <span className="font-extrabold text-xs tracking-wider text-purple-700 dark:text-purple-300">SKIP OFFICIAL RECEIPT</span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-500">
                    {completedRequest.createdAt}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block">{language === 'ar' ? 'رقم الإيصال المرجعي:' : 'Reference No:'}</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">{completedRequest.referenceNumber}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">
                      {completedRequest.paymentMethod === 'cash'
                        ? (language === 'ar' ? 'المبلغ المطلوب تحصيله نقداً:' : 'Cash to Collect:')
                        : (language === 'ar' ? 'المبلغ المسدد إلكترونياً:' : 'Amount Paid:')}
                    </span>
                    <span className="font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                      {completedRequest.fee} {language === 'ar' ? 'جنيه مصري' : 'EGP'}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'ar' ? 'اسم المواطن:' : 'Applicant Name:'}</span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{completedRequest.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">{language === 'ar' ? 'طريقة السداد:' : 'Payment Method:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {completedRequest.paymentMethod === 'cash' ? 'نقداً عند استلام الأوراق' : 'دفع إلكتروني'}
                    </span>
                  </div>
                </div>

                {includeCourier && (
                  <div className="p-3 rounded-xl bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-purple-800 dark:text-purple-200">
                      <Truck className="w-4 h-4 text-amber-500 shrink-0" />
                      <div>
                        <span className="font-bold block">
                          {completedRequest.courierName || (language === 'ar' ? 'المندوب المعين: كابتن أحمد سامي' : 'Assigned Courier: Capt. Ahmed Samy')}
                        </span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold">
                          {language === 'ar' ? 'سيتواصل معك لاستلام الأصول من عنوانك' : 'Will contact you for papers pickup'}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        closeModal();
                        openModal('chat');
                      }}
                      className="px-2.5 py-1 text-xs font-bold text-white bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-lg shrink-0"
                    >
                      {language === 'ar' ? 'شات المندوب' : 'Chat'}
                    </button>
                  </div>
                )}
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => {
                    closeModal();
                    const el = document.getElementById('requests-tracker');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl transition-all shadow-md"
                >
                  {language === 'ar' ? 'متابعة حالة الطلب والمندوب' : 'Track Order & Courier'}
                </button>
              </div>
            </div>
          ) : (
            /* PAYMENT CHECKOUT FORM */
            <>
              {/* Fee Breakdown Summary */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span>{language === 'ar' ? 'الرسوم الرسمية للجهة الحكومية:' : 'Official Government Fee:'}</span>
                  <span className="font-bold tabular-nums">{serviceFee} {language === 'ar' ? 'ج.م' : 'EGP'}</span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
                  <span className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'ar' ? 'خدمة مندوب سكيب والاستلام من البيت:' : 'SKIP Home Courier Service:'}</span>
                  </span>
                  <span className="font-bold tabular-nums text-amber-600 dark:text-amber-400">
                    {includeCourier ? `+${courierFee} ${language === 'ar' ? 'ج.م' : 'EGP'}` : (language === 'ar' ? 'غير مفعل' : 'Disabled')}
                  </span>
                </div>

                <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>{language === 'ar' ? 'إجمالي المبلغ المطلوب:' : 'Total Payable Amount:'}</span>
                  <span className="text-amber-600 dark:text-amber-400 font-black tabular-nums">
                    {totalAmount} {language === 'ar' ? 'جنيه مصري' : 'EGP'}
                  </span>
                </div>
              </div>

              {/* Doorstep Courier Toggle */}
              <div 
                onClick={() => setIncludeCourier(!includeCourier)}
                className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-start gap-3 ${
                  includeCourier 
                    ? 'bg-purple-50/70 dark:bg-purple-950/40 border-purple-500 shadow-sm' 
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                }`}
              >
                <div className="mt-0.5">
                  <input
                    type="checkbox"
                    checked={includeCourier}
                    onChange={(e) => setIncludeCourier(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
                  />
                </div>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>{language === 'ar' ? 'تجهيز الأوراق بدون خروج من المنزل (توصيل مندوب سكيب)' : 'Stay Home: SKIP Courier Handles Handover'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">
                    {language === 'ar'
                      ? 'مندوبنا يستلم الأصول من عنوانك، يختمها ويودعها بالمصلحة الحكومية، ويعيدها لباب بيتك (60 ج.م فقط).'
                      : 'Certified courier picks up originals, stamps at the department, and delivers them back.'}
                  </p>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div>
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200 mb-2.5">
                  {language === 'ar' ? 'اختر طريقة سداد الرسوم (إلكتروني أو نقدي للمندوب):' : 'Select Payment Method:'}
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
                  
                  {/* Cash on Delivery */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('cash')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'cash'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-400/20 shadow-sm'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300'
                    }`}
                  >
                    <Banknote className="w-5 h-5 text-amber-500" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">نقداً للمندوب</span>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">كاش عند الاستلام</span>
                  </button>

                  {/* InstaPay */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('instapay')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'instapay'
                        ? 'bg-purple-50 dark:bg-purple-950/40 border-purple-600 ring-2 ring-purple-600/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-purple-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">انستاباي</span>
                    <span className="text-[10px] text-slate-500">InstaPay (لحظي)</span>
                  </button>

                  {/* Fawry */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('fawry')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'fawry'
                        ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-600 ring-2 ring-amber-600/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-amber-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">فوري</span>
                    <span className="text-[10px] text-slate-500">Fawry Pay</span>
                  </button>

                  {/* Bank Cards */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'card'
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-600 ring-2 ring-blue-600/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <CreditCard className="w-5 h-5 text-blue-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">فيزا / ميزة</span>
                    <span className="text-[10px] text-slate-500">Visa / Meeza</span>
                  </button>

                  {/* Smart Wallets */}
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('wallet')}
                    className={`p-3 rounded-2xl border text-center transition-all flex flex-col items-center gap-1.5 ${
                      paymentMethod === 'wallet'
                        ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-600 ring-2 ring-rose-600/20'
                        : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <Smartphone className="w-5 h-5 text-rose-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">المحافظ</span>
                    <span className="text-[10px] text-slate-500">Vodafone / Cash</span>
                  </button>

                </div>
              </div>

              {/* Cash note if selected */}
              {paymentMethod === 'cash' && (
                <div className="p-3.5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex items-center gap-3 text-xs text-amber-800 dark:text-amber-200">
                  <Banknote className="w-5 h-5 text-amber-500 shrink-0" />
                  <div>
                    <span className="font-bold block">
                      {language === 'ar' ? 'سداد نقدي عند الاستلام:' : 'Cash on Handover:'}
                    </span>
                    <span>
                      {language === 'ar'
                        ? `لا تحتاج لأي بطاقة بنكية الآن. سيقوم مندوبنا باستلام الملف واستلام الرسوم (${totalAmount} ج.م) نقداً وتسليمك إيصالاً فورياً مختوماً.`
                        : `Pay ${totalAmount} EGP in cash directly to the certified courier on document pickup.`}
                    </span>
                  </div>
                </div>
              )}

              {/* Applicant Info Form */}
              <div className="space-y-3 pt-2">
                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'ar' ? 'الاسم رباعي (صاحب المعاملة):' : 'Full Applicant Name:'}
                    </label>
                    <input
                      type="text"
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'ar' ? 'الرقم القومي (14 رقماً):' : 'National ID (14 digits):'}
                    </label>
                    <input
                      type="text"
                      value={nationalId}
                      onChange={(e) => setNationalId(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'ar' ? 'رقم الهاتف للتواصل ومتابعة المندوب:' : 'Phone Number:'}
                    </label>
                    <input
                      type="tel"
                      value={applicantPhone}
                      onChange={(e) => setApplicantPhone(e.target.value)}
                      className="w-full px-3 py-2 text-xs font-mono bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      {language === 'ar' ? 'عنوان الاستلام والتوصيل المنزلي:' : 'Home Delivery Address:'}
                    </label>
                    <input
                      type="text"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                    />
                  </div>
                </div>
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handlePay}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 disabled:opacity-50 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-purple-950/20 flex items-center justify-center gap-2"
                >
                  <Lock className="w-4 h-4 text-amber-300" />
                  <span>
                    {isProcessing 
                      ? (language === 'ar' ? 'جارٍ السداد وتأكيد المعاملة...' : 'Processing...') 
                      : (language === 'ar' ? `تأكيد وسداد إجمالي ${totalAmount} ج.م` : `Confirm & Pay ${totalAmount} EGP`)}
                  </span>
                </button>
              </div>
            </>
          )}

        </div>

      </div>
    </div>
  );
};

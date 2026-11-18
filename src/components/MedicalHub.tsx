import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MedicalRecordItem } from '../types';
import { 
  HeartPulse, 
  Stethoscope, 
  Pill, 
  Calendar, 
  FileCheck2, 
  Share2, 
  Download, 
  Plus, 
  CheckCircle2, 
  Truck, 
  Clock, 
  MessageSquare,
  ShieldCheck,
  AlertCircle,
  QrCode,
  X
} from 'lucide-react';

export const MedicalHub: React.FC = () => {
  const { 
    medicalRecords, 
    appointments, 
    language, 
    requestMedicineDelivery, 
    openModal,
    bookAppointment 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'records' | 'prescriptions' | 'appointments'>('records');
  const [selectedRecord, setSelectedRecord] = useState<MedicalRecordItem>(medicalRecords[0]);
  const [showShareModal, setShowShareModal] = useState<boolean>(false);
  const [isDeliveryRequested, setIsDeliveryRequested] = useState<boolean>(false);

  // New Appointment Form state
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [newDoctorName, setNewDoctorName] = useState<string>('أ.د. حازم النجار');
  const [newSpecialty, setNewSpecialty] = useState<string>('استشاري أمراض القلب والأوعية');
  const [newHospital, setNewHospital] = useState<string>('مستشفى شبين الكوم الجامعي (جامعة المنوفية)');
  const [newDate, setNewDate] = useState<string>('2026-11-12');
  const [newTime, setNewTime] = useState<string>('12:00 م');

  const handleOrderAllMeds = () => {
    const medNames = selectedRecord.prescriptions.map(p => p.medicineName);
    requestMedicineDelivery(selectedRecord, medNames);
    setIsDeliveryRequested(true);
    setTimeout(() => setIsDeliveryRequested(false), 3000);
  };

  const handleSaveAppointment = (e: React.FormEvent) => {
    e.preventDefault();
    bookAppointment({
      doctorName: newDoctorName,
      doctorNameEn: 'Prof. Dr. Specialist',
      specialty: newSpecialty,
      specialtyEn: 'Consultant',
      hospital: newHospital,
      hospitalEn: 'University Hospital',
      date: newDate,
      timeSlot: newTime,
      fee: 200
    });
    setIsBookingModalOpen(false);
  };

  return (
    <section id="medical-hub" className="py-14 bg-slate-50 dark:bg-slate-950 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              {language === 'ar' ? 'مستشفيات المنوفية والملف الطبي' : 'Menoufia Hospitals & Medical Hub'}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {language === 'ar' ? 'حجز مواعيد مستشفيات شبين الكوم وقويسنا وصرف وتوصيل الروشتات للمنزل' : 'Book Shebin El-Kom & Quesna hospitals and doorstep Rx delivery'}
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => openModal('chat')}
              className="px-4 py-2.5 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 border border-purple-200 dark:border-purple-800 rounded-xl hover:bg-purple-100 transition-colors flex items-center gap-1.5"
            >
              <MessageSquare className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span>{language === 'ar' ? 'استشارة الفريق الطبي' : 'Medical Team Chat'}</span>
            </button>

            <button
              onClick={() => setIsBookingModalOpen(true)}
              className="px-4 py-2.5 text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-amber-300" />
              <span>{language === 'ar' ? 'حجز موعد كشف جديد' : 'Book Appointment'}</span>
            </button>
          </div>
        </div>

        {/* Patient Identity Bar */}
        <div className="mb-6 p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center font-bold text-base">
              O+
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  {selectedRecord.patientName}
                </h3>
                <span className="text-[10px] font-bold px-2.5 py-0.5 bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/30 rounded-full">
                  {language === 'ar' ? 'تأمين صحي نشط' : 'Active Insurance'}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                <span>{language === 'ar' ? 'الرقم القومي:' : 'National ID:'} {selectedRecord.nationalId}</span>
                <span aria-hidden="true">·</span>
                <span>{language === 'ar' ? 'فصيلة الدم:' : 'Blood Group:'} O+</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setShowShareModal(true)}
              className="flex-1 sm:flex-none px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
            >
              <Share2 className="w-3.5 h-3.5 text-sky-500" />
              <span>{language === 'ar' ? 'مشاركة الملف مع استشاري' : 'Share File with Doctor'}</span>
            </button>
          </div>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-900 rounded-2xl mb-6 max-w-md">
          <button
            onClick={() => setActiveTab('records')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'records'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'ar' ? 'التقارير والفحوصات السابقة' : 'Lab & Reports'}
          </button>

          <button
            onClick={() => setActiveTab('prescriptions')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'prescriptions'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'ar' ? 'الروشتات وصرف الأدوية' : 'Rx & Delivery'}
          </button>

          <button
            onClick={() => setActiveTab('appointments')}
            className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all ${
              activeTab === 'appointments'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {language === 'ar' ? 'مواعيد الكشف والعيادات' : 'Appointments'}
          </button>
        </div>

        {/* TAB 1: LAB & MEDICAL REPORTS */}
        {activeTab === 'records' && (
          <div className="grid lg:grid-cols-12 gap-6">
            
            {/* Left Record List */}
            <div className="lg:col-span-5 space-y-3">
              <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                {language === 'ar' ? 'سجل الزيارات والتشخيصات المعتمدة' : 'Verified Clinical Encounters'}
              </h4>
              {medicalRecords.map((rec) => {
                const isSelected = selectedRecord.id === rec.id;
                return (
                  <div
                    key={rec.id}
                    onClick={() => setSelectedRecord(rec)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-purple-50/50 dark:bg-slate-800 border-purple-500 shadow-md ring-1 ring-purple-500/20'
                        : 'bg-white/80 dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {language === 'ar' ? rec.specialty : rec.specialtyEn}
                      </span>
                      <span className="tabular-nums font-mono">{rec.date}</span>
                    </div>
                    <h5 className="text-sm font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? rec.doctorName : rec.doctorNameEn}
                    </h5>
                    <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                      {language === 'ar' ? rec.hospital : rec.hospitalEn}
                    </p>
                    <p className="text-xs text-slate-700 dark:text-slate-300 mt-2 font-medium bg-slate-50 dark:bg-slate-900/60 p-2 rounded-xl">
                      {language === 'ar' ? rec.diagnosis : rec.diagnosisEn}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Test Report */}
            <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-md">
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 mb-4">
                <div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {language === 'ar' ? 'نتائج التحاليل والفحوصات المخبرية' : 'Diagnostic Lab Results'}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {language === 'ar' ? 'موثقة ومطابقة للمعايير المرجعية' : 'Verified with standard reference values'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-950/60 px-2.5 py-1 rounded-lg">
                    {selectedRecord.shareToken}
                  </span>
                </div>
              </div>

              {/* Lab table */}
              <div className="space-y-3">
                {selectedRecord.labTests.map((test, tIdx) => (
                  <div
                    key={tIdx}
                    className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex items-center justify-between"
                  >
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 dark:text-white">
                        {test.name}
                      </h5>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {language === 'ar' ? 'المدى الطبيعي:' : 'Reference range:'} {test.referenceRange}
                      </p>
                    </div>
                    <div className="text-end">
                      <span className="text-xs font-extrabold text-purple-700 dark:text-purple-300 tabular-nums">
                        {test.result}
                      </span>
                      <span className="block text-[10px] font-semibold text-amber-600 dark:text-amber-400">
                        {test.status === 'normal' ? (language === 'ar' ? 'ضمن المعدل الطبيعي' : 'Normal') : 'Attention'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Direct medicine delivery CTA inside report */}
              <div className="mt-6 p-4 rounded-2xl bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-0.5 text-start">
                  <h5 className="text-xs font-bold text-purple-950 dark:text-purple-200 flex items-center gap-1.5">
                    <Truck className="w-4 h-4 text-amber-500" />
                    <span>{language === 'ar' ? 'صرف وتوصيل روشتة هذا الكشف للمنزل' : 'Deliver Prescribed Medicines Home'}</span>
                  </h5>
                  <p className="text-[11px] text-purple-700 dark:text-purple-300">
                    {language === 'ar' ? 'توصيل خلال ساعة مع مندوب سكيب المعتمد' : 'Direct certified courier delivery in 60 mins'}
                  </p>
                </div>
                <button
                  onClick={handleOrderAllMeds}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-sm transition-all whitespace-nowrap"
                >
                  {isDeliveryRequested ? (language === 'ar' ? 'تم توجيه المندوب!' : 'Dispatched!') : (language === 'ar' ? 'طلب الأدوية الآن' : 'Order Now')}
                </button>
              </div>

            </div>

          </div>
        )}

        {/* TAB 2: PRESCRIPTIONS & MEDICINE DELIVERY */}
        {activeTab === 'prescriptions' && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-md">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-100 dark:border-slate-800 gap-4">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Pill className="w-5 h-5 text-amber-500" />
                  <span>{language === 'ar' ? 'الأدوية الموصوفة والجرعات العلاجية' : 'Prescribed Medications & Regimen'}</span>
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {language === 'ar' ? 'يمكنك طلب توصيل أي دواء أو جميع الأدوية دفعة واحدة حتى باب منزلك.' : 'Order doorstep delivery for chronic or current prescriptions.'}
                </p>
              </div>

              <button
                onClick={handleOrderAllMeds}
                className="px-5 py-3 text-xs font-bold text-white bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 rounded-xl shadow-md shadow-purple-950/20 transition-all flex items-center justify-center gap-2"
              >
                <Truck className="w-4 h-4" />
                <span>
                  {isDeliveryRequested ? (language === 'ar' ? 'تم طلب التوصيل!' : 'Order Placed!') : (language === 'ar' ? 'توصيل كامل الروشتة للمنزل' : 'Deliver Entire Regimen')}
                </span>
              </button>
            </div>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedRecord.prescriptions.map((med, idx) => (
                <div
                  key={idx}
                  className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
                      <span className="font-semibold text-purple-600 dark:text-purple-400">
                        {language === 'ar' ? 'دواء معتمد' : 'Verified'}
                      </span>
                      <span>{med.duration}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1.5">
                      {med.medicineName}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                      {med.dosage}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      requestMedicineDelivery(selectedRecord, [med.medicineName]);
                      setIsDeliveryRequested(true);
                      setTimeout(() => setIsDeliveryRequested(false), 3000);
                    }}
                    className="w-full py-2 px-3 text-xs font-bold text-purple-700 dark:text-purple-300 bg-white dark:bg-slate-700 hover:bg-purple-50 dark:hover:bg-slate-600 border border-purple-200 dark:border-slate-600 rounded-xl transition-all flex items-center justify-center gap-1.5"
                  >
                    <Truck className="w-3.5 h-3.5 text-amber-500" />
                    <span>{language === 'ar' ? 'توصيل هذا الدواء فقط' : 'Deliver This Med'}</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: APPOINTMENTS */}
        {activeTab === 'appointments' && (
          <div className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              {appointments.map((apt) => (
                <div
                  key={apt.id}
                  className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md space-y-4"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                    <span className="text-xs font-bold px-2.5 py-1 bg-amber-400/20 text-amber-800 dark:text-amber-300 border border-amber-400/30 rounded-full">
                      {language === 'ar' ? 'حجز مؤكد إلكترونياً' : 'Confirmed'}
                    </span>
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-400 tabular-nums font-black">
                      {apt.fee} {language === 'ar' ? 'ج.م' : 'EGP'}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-base font-bold text-slate-900 dark:text-white">
                      {language === 'ar' ? apt.doctorName : apt.doctorNameEn}
                    </h4>
                    <p className="text-xs text-purple-600 dark:text-purple-400 font-semibold mt-0.5">
                      {language === 'ar' ? apt.specialty : apt.specialtyEn}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      {language === 'ar' ? apt.hospital : apt.hospitalEn}
                    </p>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 flex items-center justify-between text-xs text-slate-700 dark:text-slate-300">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{apt.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                      <span>{apt.timeSlot}</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-1">
                    <button
                      onClick={() => openModal('chat')}
                      className="py-2.5 px-3 text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 hover:bg-purple-100 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>{language === 'ar' ? 'دردشة الطبيب' : 'Chat Doctor'}</span>
                    </button>
                    <button
                      onClick={() => alert(language === 'ar' ? 'تم إرسال تذكرة الحجز والباركود إلى هاتفك عبر SMS' : 'Digital QR pass re-sent via SMS')}
                      className="py-2.5 px-3 text-xs font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <QrCode className="w-3.5 h-3.5 text-sky-500" />
                      <span>{language === 'ar' ? 'باركود الدخول' : 'Access QR'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>

      {/* SHARE MODAL */}
      {showShareModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 text-center space-y-4">
            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-950/80 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
              <QrCode className="w-8 h-8 text-amber-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {language === 'ar' ? 'رمز المشاركة الطبية الآمن' : 'Secure Medical Share Token'}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {language === 'ar'
                ? 'أعط هذا الرمز للطبيب الاستشاري أو المستشفى للاطلاع الفوري على تحاليلك وأدويتك السابقة بأمان تام.'
                : 'Share this secure code with your consulting doctor to grant temporary view access.'}
            </p>
            <div className="p-3.5 bg-slate-100 dark:bg-slate-800 rounded-xl font-mono text-sm font-extrabold text-purple-700 dark:text-purple-400">
              {selectedRecord.shareToken}
            </div>
            <button
              onClick={() => setShowShareModal(false)}
              className="w-full py-2.5 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 text-white text-xs font-bold rounded-xl shadow-md"
            >
              {language === 'ar' ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}

      {/* BOOK APPOINTMENT MODAL */}
      {isBookingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {language === 'ar' ? 'حجز موعد كشف جديد' : 'New Doctor Appointment'}
              </h3>
              <button onClick={() => setIsBookingModalOpen(false)}>
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            <form onSubmit={handleSaveAppointment} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'التخصص الطبي:' : 'Medical Specialty:'}
                </label>
                <select
                  value={newSpecialty}
                  onChange={(e) => setNewSpecialty(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="استشاري أمراض القلب والأوعية">استشاري أمراض القلب والأوعية</option>
                  <option value="استشاري جراحة العظام والمفاصل">استشاري جراحة العظام والمفاصل</option>
                  <option value="أخصائي طب وجراحة العيون">أخصائي طب وجراحة العيون</option>
                  <option value="استشاري الباطنة والجهاز الهضمي">استشاري الباطنة والجهاز الهضمي</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {language === 'ar' ? 'المستشفى أو المركز الصحي:' : 'Hospital or Clinic:'}
                </label>
                <select
                  value={newHospital}
                  onChange={(e) => setNewHospital(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                >
                  <option value="مستشفى شبين الكوم الجامعي (جامعة المنوفية)">مستشفى شبين الكوم الجامعي (جامعة المنوفية)</option>
                  <option value="معهد الكبد القومي بشبين الكوم">معهد الكبد القومي بشبين الكوم</option>
                  <option value="مستشفى شبين الكوم التعليمي">مستشفى شبين الكوم التعليمي</option>
                  <option value="مستشفى الهلال للتأمين الصحي بشبين الكوم">مستشفى الهلال للتأمين الصحي بشبين الكوم</option>
                  <option value="مستشفى قويسنا المركزي">مستشفى قويسنا المركزي</option>
                  <option value="عيادة قويسنا الشاملة للتأمين الصحي">عيادة قويسنا الشاملة للتأمين الصحي</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'ar' ? 'التاريخ المفضل:' : 'Date:'}
                  </label>
                  <input
                    type="date"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    {language === 'ar' ? 'الموعد:' : 'Time Slot:'}
                  </label>
                  <select
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-900 dark:text-white"
                  >
                    <option value="10:00 ص">10:00 ص</option>
                    <option value="12:00 م">12:00 م</option>
                    <option value="02:30 م">02:30 م</option>
                    <option value="06:00 م">06:00 م</option>
                  </select>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md shadow-purple-950/20 transition-all"
              >
                {language === 'ar' ? 'تأكيد الحجز وسداد الرسوم (200 ج.م)' : 'Confirm Booking (200 EGP)'}
              </button>
            </form>
          </div>
        </div>
      )}

    </section>
  );
};

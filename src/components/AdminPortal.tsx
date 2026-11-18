import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { RequestStatus, UserRequest, AlertDestinationChannel, ServiceItem, RequiredDocument } from '../types';
import { 
  Truck, 
  Phone, 
  Smartphone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  CreditCard, 
  ShieldCheck, 
  Bell, 
  Settings, 
  Filter, 
  ArrowRight,
  ArrowLeft,
  Volume2,
  Sparkles,
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Send,
  User,
  Activity,
  AlertTriangle,
  Bot,
  Mail,
  Sliders,
  Check,
  Radio,
  FileText,
  Lock,
  KeyRound,
  UserPlus,
  Users,
  X,
  Edit3,
  Plus,
  Trash2,
  Search,
  Banknote,
  FileCheck2,
  DollarSign,
  Layers,
  Tag
} from 'lucide-react';

export const AdminPortal: React.FC = () => {
  const { 
    language, 
    userRequests, 
    updateRequestStatus, 
    adminPhoneSettings, 
    updateAdminPhoneSettings,
    alertDestinationSettings,
    updateAlertDestinationSettings,
    sendTestNotificationToPrimary,
    simulateIncomingCustomerTest,
    openModal,
    setUserRole,
    chatMessages,
    sendMessage,
    logoutAdmin,
    adminPin,
    updateAdminPin,
    couriers,
    addCourier,
    updateCourierStatus,
    assignCourierToRequest,
    openCourierChat,
    services,
    updateService,
    addService,
    deleteService,
    deleteRequest,
    refreshAllData
  } = useApp();

  const [isSyncing, setIsSyncing] = useState(false);
  const [orderSearch, setOrderSearch] = useState('');
  const [paymentFilter, setPaymentFilter] = useState<'all' | 'cash' | 'electronic'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'active' | 'completed'>('all');
  const [selectedReq, setSelectedReq] = useState<UserRequest | null>(userRequests[0] || null);
  const [activeTab, setActiveTab] = useState<'orders' | 'services_pricing' | 'crm_couriers' | 'alert_settings' | 'messages'>('orders');

  const handleManualSync = async () => {
    setIsSyncing(true);
    await refreshAllData();
    setTimeout(() => setIsSyncing(false), 500);
  };

  // Service Management & Pricing states
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCategoryFilter, setServiceCategoryFilter] = useState<string>('all');
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);
  const [showAddServiceModal, setShowAddServiceModal] = useState(false);
  const [serviceSuccessMsg, setServiceSuccessMsg] = useState<string | null>(null);

  // Edit Service Form state
  const [editFee, setEditFee] = useState<number>(0);
  const [editDuration, setEditDuration] = useState<string>('');
  const [editDurationEn, setEditDurationEn] = useState<string>('');
  const [editTitle, setEditTitle] = useState<string>('');
  const [editTitleEn, setEditTitleEn] = useState<string>('');
  const [editEntity, setEditEntity] = useState<string>('');
  const [editDocuments, setEditDocuments] = useState<RequiredDocument[]>([]);
  
  // New Document Input row in edit modal
  const [newDocName, setNewDocName] = useState('');
  const [newDocNameEn, setNewDocNameEn] = useState('');
  const [newDocMandatory, setNewDocMandatory] = useState(true);
  const [newDocNotes, setNewDocNotes] = useState('');

  // Add New Service Form state
  const [newServiceTitle, setNewServiceTitle] = useState('');
  const [newServiceTitleEn, setNewServiceTitleEn] = useState('');
  const [newServiceCategory, setNewServiceCategory] = useState<'government' | 'educational' | 'housing' | 'health'>('government');
  const [newServiceFee, setNewServiceFee] = useState<number>(500);
  const [newServiceDuration, setNewServiceDuration] = useState('خلال 48 ساعة');
  const [newServiceEntity, setNewServiceEntity] = useState('مصلحة الخدمات الحكومية');
  const [newServiceDescription, setNewServiceDescription] = useState('');
  const [newServiceDocs, setNewServiceDocs] = useState<RequiredDocument[]>([
    { name: 'بطاقة الرقم القومي سارية', nameEn: 'Valid National ID', isMandatory: true }
  ]);
  const [customDocInput, setCustomDocInput] = useState('');

  // Service Actions
  const handleOpenEditService = (srv: ServiceItem) => {
    setEditingService(srv);
    setEditFee(srv.fee);
    setEditDuration(srv.estimatedDuration);
    setEditDurationEn(srv.estimatedDurationEn || '');
    setEditTitle(srv.title);
    setEditTitleEn(srv.titleEn || '');
    setEditEntity(srv.responsibleEntity);
    setEditDocuments([...srv.requiredDocuments]);
    setNewDocName('');
    setNewDocNameEn('');
    setNewDocMandatory(true);
    setNewDocNotes('');
  };

  const handleSaveServiceEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingService) return;
    await updateService(editingService.id, {
      title: editTitle.trim(),
      titleEn: editTitleEn.trim(),
      fee: Number(editFee),
      estimatedDuration: editDuration.trim(),
      estimatedDurationEn: editDurationEn.trim(),
      responsibleEntity: editEntity.trim(),
      requiredDocuments: editDocuments
    });
    setServiceSuccessMsg(`تم تحديث سعر ومستندات (${editTitle}) بنجاح! السعر الجديد: ${editFee} ج.م`);
    setEditingService(null);
    setTimeout(() => setServiceSuccessMsg(null), 4000);
  };

  const handleAddDocToEdit = () => {
    if (!newDocName.trim()) return;
    setEditDocuments(prev => [
      ...prev,
      {
        name: newDocName.trim(),
        nameEn: newDocNameEn.trim() || newDocName.trim(),
        isMandatory: newDocMandatory,
        notes: newDocNotes.trim() || undefined
      }
    ]);
    setNewDocName('');
    setNewDocNameEn('');
    setNewDocNotes('');
    setNewDocMandatory(true);
  };

  const handleRemoveDocFromEdit = (index: number) => {
    setEditDocuments(prev => prev.filter((_, i) => i !== index));
  };

  const handleCreateNewService = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newServiceTitle.trim()) return;
    await addService({
      title: newServiceTitle.trim(),
      titleEn: newServiceTitleEn.trim() || newServiceTitle.trim(),
      category: newServiceCategory,
      fee: Number(newServiceFee),
      estimatedDuration: newServiceDuration.trim(),
      estimatedDurationEn: 'Within 48 hours',
      responsibleEntity: newServiceEntity.trim(),
      responsibleEntityEn: 'Government Authority',
      description: newServiceDescription.trim() || 'خدمة مخصصة أضيفت بواسطة الإدارة',
      descriptionEn: 'Custom service added by administration',
      icon: 'FileText',
      courierSupported: true,
      digitalInstant: false,
      requiredDocuments: newServiceDocs
    });
    setServiceSuccessMsg(`تمت إضافة الخدمة الجديدة (${newServiceTitle}) بسعر ${newServiceFee} ج.م بنجاح!`);
    setShowAddServiceModal(false);
    setNewServiceTitle('');
    setTimeout(() => setServiceSuccessMsg(null), 4000);
  };

  const handleAddDocToNewService = () => {
    if (!customDocInput.trim()) return;
    setNewServiceDocs(prev => [
      ...prev,
      { name: customDocInput.trim(), nameEn: customDocInput.trim(), isMandatory: true }
    ]);
    setCustomDocInput('');
  };

  // CRM Fleet & Courier Registration states
  const [showAddCourierModal, setShowAddCourierModal] = useState(false);
  const [newCourierName, setNewCourierName] = useState('');
  const [newCourierPhone, setNewCourierPhone] = useState('');
  const [newCourierVehicle, setNewCourierVehicle] = useState<'موتوسيكل' | 'سيارة' | 'سكوتر' | 'عجلة'>('موتوسيكل');
  const [newCourierArea, setNewCourierArea] = useState('');
  const [newCourierNationalId, setNewCourierNationalId] = useState('');
  const [courierSuccessMsg, setCourierSuccessMsg] = useState<string | null>(null);
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Form states for Alert Destination Settings
  const [primaryChannel, setPrimaryChannel] = useState<AlertDestinationChannel>(alertDestinationSettings.primaryChannel);
  const [whatsappNumber, setWhatsappNumber] = useState(alertDestinationSettings.whatsappNumber);
  const [emailAddress, setEmailAddress] = useState(alertDestinationSettings.emailAddress);
  const [telegramChatId, setTelegramChatId] = useState(alertDestinationSettings.telegramChatId);
  const [smsNumber, setSmsNumber] = useState(alertDestinationSettings.smsNumber);
  const [autoOpenWhatsApp, setAutoOpenWhatsApp] = useState(alertDestinationSettings.autoOpenWhatsAppOnOrder);
  const [soundEnabled, setSoundEnabled] = useState(alertDestinationSettings.soundEnabled);
  const [soundTone, setSoundTone] = useState(alertDestinationSettings.soundTone);

  // Trigger filters
  const [notifyNewReq, setNotifyNewReq] = useState(alertDestinationSettings.notifyOnNewRequest);
  const [notifyMeds, setNotifyMeds] = useState(alertDestinationSettings.notifyOnMedicineOrder);
  const [notifyDoctors, setNotifyDoctors] = useState(alertDestinationSettings.notifyOnDoctorBooking);
  const [notifyChat, setNotifyChat] = useState(alertDestinationSettings.notifyOnChatMessage);

  // Custom templates
  const [customWhatsAppTemplate, setCustomWhatsAppTemplate] = useState(alertDestinationSettings.customWhatsAppTemplate);
  const [customEmailSubject, setCustomEmailSubject] = useState(alertDestinationSettings.customEmailSubject);
  const [newPinInput, setNewPinInput] = useState('');
  const [pinChangeStatus, setPinChangeStatus] = useState<string | null>(null);

  const [saveBanner, setSaveBanner] = useState<string | null>(null);

  const handleUpdatePin = () => {
    if (newPinInput.trim().length >= 4) {
      updateAdminPin(newPinInput.trim());
      setPinChangeStatus('تم تغيير رمز الدخول السري بنجاح!');
      setNewPinInput('');
      setTimeout(() => setPinChangeStatus(null), 4000);
    } else {
      setPinChangeStatus('يجب أن يتكون رمز PIN من 4 أرقام على الأقل');
      setTimeout(() => setPinChangeStatus(null), 4000);
    }
  };

  const filteredRequests = userRequests.filter(req => {
    // Status filter
    if (statusFilter === 'pending' && !(req.status === 'submitted' || req.status === 'processing')) return false;
    if (statusFilter === 'active' && !(req.status === 'delegate_assigned' || req.status === 'documents_verified' || req.status === 'ready_for_delivery')) return false;
    if (statusFilter === 'completed' && !(req.status === 'delivered' || req.status === 'completed')) return false;

    // Payment filter
    if (paymentFilter === 'cash' && req.paymentMethod !== 'cash') return false;
    if (paymentFilter === 'electronic' && req.paymentMethod === 'cash') return false;

    // Text search filter
    if (orderSearch.trim()) {
      const q = orderSearch.trim().toLowerCase();
      const matchName = (req.applicantName || '').toLowerCase().includes(q);
      const matchPhone = (req.applicantPhone || '').includes(q);
      const matchRef = (req.referenceNumber || '').toLowerCase().includes(q);
      const matchTitle = (req.serviceTitle || '').toLowerCase().includes(q);
      if (!matchName && !matchPhone && !matchRef && !matchTitle) return false;
    }

    return true;
  });

  const totalRevenue = userRequests.reduce((sum, r) => sum + r.fee, 0);
  const activeOrdersCount = userRequests.filter(r => r.status !== 'completed' && r.status !== 'delivered').length;

  const handleStatusChange = (requestId: string, newStatus: RequestStatus) => {
    updateRequestStatus(requestId, newStatus);
    if (selectedReq?.id === requestId) {
      setSelectedReq(prev => prev ? { ...prev, status: newStatus } : null);
    }
  };

  const handleSaveAlertSettings = (e: React.FormEvent) => {
    e.preventDefault();
    updateAlertDestinationSettings({
      primaryChannel,
      whatsappNumber,
      emailAddress,
      telegramChatId,
      smsNumber,
      autoOpenWhatsAppOnOrder: autoOpenWhatsApp,
      soundEnabled,
      soundTone,
      notifyOnNewRequest: notifyNewReq,
      notifyOnMedicineOrder: notifyMeds,
      notifyOnDoctorBooking: notifyDoctors,
      notifyOnChatMessage: notifyChat,
      customWhatsAppTemplate,
      customEmailSubject
    });
    // Also sync admin phone settings
    updateAdminPhoneSettings({
      primaryPhone: smsNumber || whatsappNumber,
      whatsappPhone: whatsappNumber,
      soundEnabled
    });

    const channelName = 
      primaryChannel === 'whatsapp' ? 'الواتساب (WhatsApp)' :
      primaryChannel === 'email' ? 'البريد الإلكتروني (Email)' :
      primaryChannel === 'telegram' ? 'تيليجرام (Telegram)' : 'إشعارات المتصفح';

    setSaveBanner(`تم حفظ الإعدادات بنجاح وتعيين [${channelName}] كوجهة أساسية لجميع الإشعارات والطلبات الجديدة!`);
    setTimeout(() => setSaveBanner(null), 3500);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col transition-colors">
      
      {/* Top Admin Bar */}
      <header className="sticky top-0 z-40 bg-slate-950/90 border-b border-slate-800 backdrop-blur-md px-4 sm:px-6 lg:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          
          {/* Brand & Workspace Tag */}
          <div className="flex items-center gap-3">
            <img 
              src="/assets/aistudio/image_5ae8ef1d.png" 
              alt="SKIP" 
              className="w-10 h-10 object-contain rounded-xl"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black text-white tracking-tight">SKIP</span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {language === 'ar' ? 'نسخة الإدارة والمندوب' : 'Partner & Courier Portal'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                {language === 'ar' ? 'لوحة استقبال ومتابعة طلبات المواطنين وتعيين وجهة الإشعارات' : 'Live Order Receiving & Alert Destination Routing'}
              </p>
            </div>
          </div>

          {/* Controls: Live Sync, Sound, Linked phone, Back to customer mode */}
          <div className="flex items-center flex-wrap gap-2.5">
            
            {/* Live Sync Status Beacon */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-purple-950/70 border border-purple-500/40 text-xs text-purple-200 font-bold shadow-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              <span>{language === 'ar' ? 'سيرفر متصل مباشر' : 'Live Sync Online'}</span>
            </div>

            {/* Instant Manual Refresh */}
            <button
              onClick={handleManualSync}
              disabled={isSyncing}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-sky-300 border border-sky-500/30 text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs"
              title="تحديث فوري لجلب جميع الطلبات من قاعدة البيانات"
            >
              <RefreshCw className={`w-3.5 h-3.5 text-sky-400 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? (language === 'ar' ? 'جاري الجلب...' : 'Syncing...') : (language === 'ar' ? 'تحديث فوري' : 'Refresh')}</span>
            </button>

            {/* Current Primary Destination Badge */}
            <div className="px-3 py-1.5 rounded-xl bg-slate-800 text-xs text-slate-300 border border-slate-700 flex items-center gap-2">
              <span className="text-slate-400 text-[11px]">الوجهة:</span>
              <span className="font-bold text-amber-400 flex items-center gap-1">
                {alertDestinationSettings.primaryChannel === 'whatsapp' && <Smartphone className="w-3.5 h-3.5 text-amber-400" />}
                {alertDestinationSettings.primaryChannel === 'email' && <Mail className="w-3.5 h-3.5 text-sky-400" />}
                {alertDestinationSettings.primaryChannel === 'telegram' && <Bot className="w-3.5 h-3.5 text-sky-400" />}
                <span className="capitalize">{alertDestinationSettings.primaryChannel}</span>
              </span>
            </div>

            {/* Test Customer Alert Simulator */}
            <button
              onClick={() => sendTestNotificationToPrimary()}
              className="px-3 py-1.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40 text-xs font-bold flex items-center gap-1.5 transition-colors"
              title="إرسال إشعار تجريبي فوري للوجهة الأساسية المحددة"
            >
              <Send className="w-3.5 h-3.5 text-amber-400" />
              <span>{language === 'ar' ? 'اختبار الإشعار' : 'Test Alert'}</span>
            </button>

            {/* Switch to Customer Preview */}
            <button
              onClick={() => {
                setUserRole('citizen');
                try {
                  if (window.location.hash === '#admin') {
                    history.replaceState(null, '', window.location.pathname);
                  }
                } catch {}
              }}
              className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-700 via-purple-600 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold transition-all shadow-md shadow-purple-950/20 flex items-center gap-1.5"
              title="معاينة واجهة المواطن العامة كما يراها العميل"
            >
              <span>{language === 'ar' ? 'معاينة كعميل' : 'Customer View'}</span>
              {language === 'ar' ? <ArrowLeft className="w-3.5 h-3.5 text-sky-300" /> : <ArrowRight className="w-3.5 h-3.5 text-sky-300" />}
            </button>

            {/* Lock & Logout */}
            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-rose-950/40 text-slate-300 hover:text-rose-400 border border-slate-700 hover:border-rose-500/40 text-xs font-bold transition-all flex items-center gap-1.5"
              title="قفل لوحة التحكم وتسجيل الخروج"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>{language === 'ar' ? 'قفل وخروج' : 'Lock & Exit'}</span>
            </button>

          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 space-y-6">
        
        {saveBanner && (
          <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-500/80 text-purple-200 text-xs font-bold flex items-center gap-3 animate-in fade-in shadow-lg">
            <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
            <span>{saveBanner}</span>
          </div>
        )}

        {/* Compact Metrics Summary Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-800/60 rounded-2xl border border-slate-700/80 text-xs">
          <div className="flex items-center gap-5">
            <div>
              <span className="text-slate-400 ms-1">{language === 'ar' ? 'الطلبات الجارية:' : 'Active:'}</span>
              <strong className="text-amber-400 font-mono text-sm">{activeOrdersCount}</strong>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 ms-1">{language === 'ar' ? 'الإجمالي:' : 'Total:'}</span>
              <strong className="text-purple-400 font-mono text-sm">{userRequests.length}</strong>
            </div>
            <div className="h-4 w-px bg-slate-700" />
            <div>
              <span className="text-slate-400 ms-1">{language === 'ar' ? 'المحصل:' : 'Revenue:'}</span>
              <strong className="text-amber-400 font-mono text-sm">{totalRevenue} ج.م</strong>
            </div>
          </div>
          <div className="text-slate-400 text-[11px] flex items-center gap-1.5 font-mono">
            <span>الوجهة:</span>
            <span className="text-sky-300 font-bold">{alertDestinationSettings.whatsappNumber}</span>
          </div>
        </div>

        {/* Tabs switcher - Concise & Focused */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-800/80 rounded-2xl border border-slate-700 overflow-x-auto">
          <button
            onClick={() => setActiveTab('orders')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'orders'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'الطلبات الواردة' : 'Orders'} ({filteredRequests.length})
          </button>

          <button
            onClick={() => setActiveTab('services_pricing')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'services_pricing'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Banknote className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'ar' ? 'تعديل الأسعار والمستندات' : 'Pricing & Services'} ({services.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('crm_couriers')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'crm_couriers'
                ? 'bg-amber-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Truck className="w-3.5 h-3.5 text-amber-300" />
            <span>{language === 'ar' ? 'فريق المناديب' : 'Couriers'} ({couriers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('alert_settings')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
              activeTab === 'alert_settings'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Sliders className="w-3.5 h-3.5 text-amber-400" />
            <span>{language === 'ar' ? 'إعدادات الواتساب والتنبيهات' : 'Alerts'}</span>
          </button>

          <button
            onClick={() => setActiveTab('messages')}
            className={`py-2 px-3.5 text-xs font-bold rounded-xl transition-all whitespace-nowrap ${
              activeTab === 'messages'
                ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {language === 'ar' ? 'المحادثات' : 'Chats'} ({chatMessages.length})
          </button>
        </div>

        {/* TAB 1: ORDERS RADAR & CUSTOMER CONTACT */}
        {activeTab === 'orders' && (
          <div className="grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Left Column: Orders Queue */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between pb-2">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  {language === 'ar' ? 'طابور الطلبات الواردة:' : 'Incoming Queue:'}
                </span>

                <div className="flex items-center gap-1 text-[11px]">
                  <button
                    onClick={() => setStatusFilter('all')}
                    className={`px-2 py-0.5 rounded-md ${statusFilter === 'all' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'الكل' : 'All'}
                  </button>
                  <button
                    onClick={() => setStatusFilter('active')}
                    className={`px-2 py-0.5 rounded-md ${statusFilter === 'active' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'نشط' : 'Active'}
                  </button>
                  <button
                    onClick={() => setStatusFilter('completed')}
                    className={`px-2 py-0.5 rounded-md ${statusFilter === 'completed' ? 'bg-purple-700 text-white' : 'text-slate-400'}`}
                  >
                    {language === 'ar' ? 'مكتمل' : 'Done'}
                  </button>
                </div>
              </div>

              {/* Search Bar for Orders */}
              <div className="relative">
                <Search className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  value={orderSearch}
                  onChange={(e) => setOrderSearch(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث باسم العميل، الهاتف، أو كود الطلب...' : 'Search by name, phone, ref...'}
                  className="w-full ps-9 pe-8 py-2.5 bg-slate-800/90 border border-slate-700 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
                />
                {orderSearch && (
                  <button
                    onClick={() => setOrderSearch('')}
                    className="absolute end-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Payment Filter Pills */}
              <div className="flex items-center gap-1.5 p-1 bg-slate-800/70 rounded-xl text-[11px]">
                <button
                  onClick={() => setPaymentFilter('all')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all ${paymentFilter === 'all' ? 'bg-purple-700 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  {language === 'ar' ? 'الكل' : 'All'}
                </button>
                <button
                  onClick={() => setPaymentFilter('cash')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${paymentFilter === 'cash' ? 'bg-amber-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <Banknote className="w-3 h-3 text-amber-200" />
                  <span>{language === 'ar' ? 'كاش للمندوب' : 'Cash'}</span>
                </button>
                <button
                  onClick={() => setPaymentFilter('electronic')}
                  className={`flex-1 py-1 px-2 rounded-lg font-bold transition-all flex items-center justify-center gap-1 ${paymentFilter === 'electronic' ? 'bg-sky-600 text-white shadow-xs' : 'text-slate-400 hover:text-slate-200'}`}
                >
                  <CreditCard className="w-3 h-3 text-sky-200" />
                  <span>{language === 'ar' ? 'إلكتروني' : 'Electronic'}</span>
                </button>
              </div>

              <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
                {filteredRequests.map((req) => {
                  const isSelected = selectedReq?.id === req.id;
                  return (
                    <div
                      key={req.id}
                      onClick={() => setSelectedReq(req)}
                      className={`p-4 rounded-2xl border cursor-pointer transition-all ${
                        isSelected
                          ? 'bg-slate-800 border-purple-500 shadow-lg ring-1 ring-purple-500/30'
                          : 'bg-slate-800/60 border-slate-700/80 hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between text-xs mb-1.5">
                        <span className="font-mono text-purple-400 font-bold">
                          {req.referenceNumber}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">
                          {req.createdAt}
                        </span>
                      </div>

                      <h4 className="text-sm font-bold text-white mb-1">
                        {language === 'ar' ? req.serviceTitle : req.serviceTitleEn}
                      </h4>

                      <div className="flex items-center justify-between text-xs text-slate-400 mt-2 pt-2 border-t border-slate-700/60">
                        <span className="font-medium text-slate-200">
                          {req.applicantName}
                        </span>
                        <span className="font-mono tabular-nums text-amber-400 font-bold">
                          {req.fee} ج.م
                        </span>
                      </div>

                      <div className="mt-2 flex flex-wrap items-center justify-between gap-1">
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-700 text-slate-300">
                          {req.status}
                        </span>
                        {req.paymentMethod === 'cash' ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold">
                            💵 كاش للمندوب ({req.fee} ج.م)
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-md bg-sky-500/20 text-sky-300 border border-sky-500/30 font-bold">
                            💳 مدفوع إلكترونياً
                          </span>
                        )}
                        {req.courierRequested && (
                          <span className="text-[10px] text-sky-400 flex items-center gap-1">
                            <Truck className="w-3 h-3" />
                            <span>مندوب منزلي</span>
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Selected Order Inspection & Action Terminal */}
            <div className="lg:col-span-7 bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-6">
              {selectedReq ? (
                <>
                  {/* Order Header */}
                  <div className="flex items-start justify-between pb-4 border-b border-slate-700 gap-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
                        <span className="font-mono font-bold text-sky-400">{selectedReq.referenceNumber}</span>
                        <span aria-hidden="true">·</span>
                        <span>{selectedReq.category.toUpperCase()}</span>
                      </div>
                      <h3 className="text-lg font-bold text-white">
                        {language === 'ar' ? selectedReq.serviceTitle : selectedReq.serviceTitleEn}
                      </h3>
                    </div>

                    <div className="text-end">
                      <span className="text-xs text-slate-400 block">
                        {selectedReq.paymentMethod === 'cash' ? 'المبلغ المطلوب تحصيله كاش' : 'المبلغ المسدد إلكترونياً'}
                      </span>
                      <span className="text-lg font-black text-amber-400 tabular-nums">
                        {selectedReq.fee} ج.م
                      </span>
                    </div>
                  </div>

                  {/* Customer Information & Direct Actions */}
                  <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-700 space-y-3">
                    <span className="text-[11px] font-bold text-slate-400 uppercase block">
                      بيانات العميل للتواصل الفوري:
                    </span>

                    <div className="grid sm:grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-slate-400 block">اسم المواطن:</span>
                        <span className="font-bold text-white text-sm">{selectedReq.applicantName}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">رقم هاتف العميل:</span>
                        <span className="font-mono font-bold text-sky-400 text-sm">{selectedReq.applicantPhone}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">الرقم القومي:</span>
                        <span className="font-mono text-slate-300">{selectedReq.nationalId}</span>
                      </div>
                      <div>
                        <span className="text-slate-400 block">طريقة السداد:</span>
                        <span className={`font-bold ${selectedReq.paymentMethod === 'cash' ? 'text-amber-400' : 'text-sky-400'}`}>
                          {selectedReq.paymentMethod === 'cash'
                            ? `💵 نقداً للمندوب (تحصيل: ${selectedReq.fee} ج.م)`
                            : `💳 ${selectedReq.paymentMethod.toUpperCase()} (تم السداد إلكترونياً)`}
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 border-t border-slate-800 flex items-start gap-2 text-xs text-slate-300">
                      <MapPin className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>{selectedReq.address}</span>
                    </div>

                    {/* Instant Contact Buttons for this Customer */}
                    <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center gap-3">
                      
                      {/* Direct Dial */}
                      <a
                        href={`tel:${selectedReq.applicantPhone}`}
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <Phone className="w-4 h-4" />
                        <span>اتصال هاتفي بالعميل</span>
                      </a>

                      {/* Direct WhatsApp */}
                      <a
                        href={`https://wa.me/${selectedReq.applicantPhone.replace(/\D/g, '').startsWith('2') ? selectedReq.applicantPhone.replace(/\D/g, '') : '2' + selectedReq.applicantPhone.replace(/\D/g, '')}?text=${encodeURIComponent(`أهلاً بك يا أستاذ ${selectedReq.applicantName}، تواصل معك من إدارة منصة ومندوبي SKIP بخصوص طلبك (${selectedReq.referenceNumber}). جاهزون لاستلام وتجهيز أوراقك!`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 py-2.5 px-4 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-md"
                      >
                        <Smartphone className="w-4 h-4 text-amber-300" />
                        <span>محادثة واتساب فورية</span>
                      </a>

                      {/* In-app Chat */}
                      <button
                        onClick={() => openModal('chat')}
                        className="py-2.5 px-4 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageSquare className="w-4 h-4 text-sky-400" />
                        <span>شات العميل</span>
                      </button>

                    </div>

                    {/* CRM COURIER DISPATCH & ASSIGNMENT SECTION */}
                    <div className="pt-4 border-t border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <Truck className="w-4 h-4 text-amber-400" />
                          <span>المندوب المسؤول وتكليفه بالمعاملة (CRM Dispatch):</span>
                        </span>
                        {selectedReq.courierName ? (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-bold">
                            تم التعيين
                          </span>
                        ) : (
                          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 font-bold animate-pulse">
                            في انتظار إسناد مندوب
                          </span>
                        )}
                      </div>

                      {selectedReq.courierName ? (
                        <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-700 space-y-3">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-white">{selectedReq.courierName}</span>
                                <span className="text-[10px] px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono">
                                  {selectedReq.courierPhone}
                                </span>
                              </div>
                              <span className="text-[11px] text-slate-400">
                                المندوب المعتمد لمقابلة العميل واستلام المستندات وتوريدها للجهة
                              </span>
                            </div>

                            <button
                              onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                              className="text-xs text-amber-400 hover:underline font-bold self-start sm:self-auto"
                            >
                              تغيير المندوب 🔄
                            </button>
                          </div>

                          {/* Quick Courier Action Triggers: Open Chat, WhatsApp, Call */}
                          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-800">
                            {/* Open Direct Courier Chat */}
                            <button
                              onClick={() => {
                                const matchingCourier = couriers.find(c => c.name === selectedReq.courierName || c.phone === selectedReq.courierPhone) || couriers[0];
                                openCourierChat(matchingCourier, selectedReq);
                              }}
                              className="flex-1 py-2 px-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                            >
                              <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                              <span>فتح شات المندوب 💬</span>
                            </button>

                            {/* WhatsApp to Courier */}
                            <a
                              href={`https://wa.me/${(selectedReq.courierPhone || '01011223344').replace(/\D/g, '').startsWith('2') ? (selectedReq.courierPhone || '01011223344').replace(/\D/g, '') : '2' + (selectedReq.courierPhone || '01011223344').replace(/\D/g, '')}?text=${encodeURIComponent(`🚨 تكليف مباشر من إدارة SKIP:\nالمعاملة: ${selectedReq.serviceTitle} (#${selectedReq.referenceNumber})\nالعميل: ${selectedReq.applicantName}\nالهاتف: ${selectedReq.applicantPhone}\nالعنوان: ${selectedReq.address}\nالرسوم المطلوبة: ${selectedReq.fee} ج.م`)}`}
                              target="_blank"
                              rel="noreferrer"
                              className="py-2 px-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                              <span>واتساب المندوب 🟢</span>
                            </a>

                            {/* Call Courier */}
                            <a
                              href={`tel:${selectedReq.courierPhone}`}
                              className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                            >
                              <Phone className="w-3.5 h-3.5 text-sky-400" />
                              <span>اتصال</span>
                            </a>
                          </div>
                        </div>
                      ) : (
                        <div className="p-3.5 rounded-2xl bg-amber-950/20 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-3">
                          <span className="text-xs text-amber-200">
                            لم يتم إسناد مندوب توصيل لهذه المعاملة بعد. اختر مندوباً لإرسال بيانات الطلب إليه فوراً.
                          </span>
                          <button
                            onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                            className="w-full sm:w-auto px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 whitespace-nowrap"
                          >
                            <UserPlus className="w-4 h-4" />
                            <span>تعيين مندوب للطلب</span>
                          </button>
                        </div>
                      )}

                      {/* Dropdown / Selection Modal for Courier Assignment */}
                      {showAssignDropdown && (
                        <div className="p-4 rounded-2xl bg-slate-900 border border-amber-500/50 shadow-2xl space-y-3 animate-in fade-in">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white">اختر مندوباً من فريق العمل المسجل:</span>
                            <button
                              onClick={() => setShowAssignDropdown(false)}
                              className="text-slate-400 hover:text-white text-xs"
                            >
                              إلغاء
                            </button>
                          </div>

                          <div className="grid sm:grid-cols-2 gap-2">
                            {couriers.map(c => (
                              <button
                                key={c.id}
                                onClick={() => {
                                  assignCourierToRequest(selectedReq.id, c.id);
                                  setSelectedReq(prev => prev ? {
                                    ...prev,
                                    courierName: c.name,
                                    courierPhone: c.phone,
                                    status: 'delegate_assigned'
                                  } : null);
                                  setShowAssignDropdown(false);
                                }}
                                className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-amber-500 text-start transition-all flex items-center justify-between"
                              >
                                <div>
                                  <span className="text-xs font-bold text-white block">{c.name}</span>
                                  <span className="text-[10px] text-slate-400 font-mono">{c.phone} · {c.vehicle}</span>
                                  <span className="text-[10px] text-sky-400 block mt-0.5">{c.area}</span>
                                </div>
                                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${c.status === 'available' ? 'bg-purple-500/20 text-purple-300' : 'bg-amber-500/20 text-amber-400'}`}>
                                  {c.status === 'available' ? 'متاح' : 'في مهمة'}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Status Controller */}
                  <div className="space-y-3">
                    <span className="text-xs font-bold text-slate-300 block">
                      التحكم في مرحلة وحالة المعاملة (يتحدث للعميل تلقائياً في شاشته):
                    </span>

                    <div className="grid sm:grid-cols-3 gap-2">
                      <button
                        onClick={() => handleStatusChange(selectedReq.id, 'delegate_assigned')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          selectedReq.status === 'delegate_assigned'
                            ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-purple-500 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        1. توجه المندوب لاستلام الأوراق
                      </button>

                      <button
                        onClick={() => handleStatusChange(selectedReq.id, 'documents_verified')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          selectedReq.status === 'documents_verified'
                            ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-purple-500 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        2. تم استلام الأوراق ومطابقتها
                      </button>

                      <button
                        onClick={() => handleStatusChange(selectedReq.id, 'ready_for_delivery')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all ${
                          selectedReq.status === 'ready_for_delivery'
                            ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white border-purple-500 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-slate-400 hover:text-white'
                        }`}
                      >
                        3. تم التوثيق وبدء التوصيل
                      </button>

                      <button
                        onClick={() => handleStatusChange(selectedReq.id, 'completed')}
                        className={`py-2 px-3 text-xs font-bold rounded-xl border transition-all sm:col-span-3 ${
                          selectedReq.status === 'completed' || selectedReq.status === 'delivered'
                            ? 'bg-amber-500 text-slate-950 font-black border-amber-400 shadow-md'
                            : 'bg-slate-900/60 border-slate-700 text-amber-400 hover:bg-amber-950/40'
                        }`}
                      >
                        ✓ تم تسليم الوثيقة الرسمية للمواطن بنجاح (إنهاء المعاملة)
                      </button>
                    </div>

                    {/* Delete / Archive Order Option */}
                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500">
                        {language === 'ar' ? 'إجراءات السجل الإداري:' : 'Administrative Record Actions:'}
                      </span>
                      <button
                        onClick={async () => {
                          if (window.confirm(language === 'ar' ? `هل أنت متأكد من حذف الطلب رقم (${selectedReq.referenceNumber}) نهائياً؟` : `Delete order (${selectedReq.referenceNumber})?`)) {
                            await deleteRequest(selectedReq.id);
                            setSelectedReq(null);
                          }
                        }}
                        className="py-1.5 px-3 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-bold transition-all flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{language === 'ar' ? 'حذف المعاملة من النظام' : 'Delete Order'}</span>
                      </button>
                    </div>
                  </div>

                </>
              ) : (
                <div className="text-center py-16 text-slate-400">
                  اختر طلباً من القائمة اليسرى لعرض تفاصيله والتواصل مع العميل
                </div>
              )}
            </div>

          </div>
        )}

        {/* TAB: SERVICES, PRICING & DOCUMENTS MANAGEMENT (تحكم كامل في الأسعار والأوراق) */}
        {activeTab === 'services_pricing' && (
          <div className="space-y-6 animate-in fade-in">
            
            {serviceSuccessMsg && (
              <div className="p-4 rounded-2xl bg-purple-950/90 border border-purple-500/80 text-purple-200 text-xs font-bold flex items-center gap-3 shadow-lg">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0" />
                <span>{serviceSuccessMsg}</span>
              </div>
            )}

            {/* Top Control Header */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
                    <Banknote className="w-5 h-5 text-amber-400" />
                  </span>
                  <h3 className="text-lg font-bold text-white">
                    {language === 'ar' ? 'إدارة الخدمات والأسعار وقوائم المستندات' : 'Services, Fees & Documents Management'}
                  </h3>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  {language === 'ar'
                    ? 'تحكم كامل في أسعار الخدمات الحكومية والتعليمية والإسكانية، وتعديل قوائم الأوراق المطلوبة وإضافة خدمات جديدة تظهر للمواطنين فوراً.'
                    : 'Full administrative control over official service fees, required documents checklists, and custom services.'}
                </p>
              </div>

              <div className="flex items-center gap-2.5 w-full lg:w-auto">
                <button
                  onClick={() => setShowAddServiceModal(true)}
                  className="w-full lg:w-auto px-4 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <Plus className="w-4 h-4 text-amber-300" />
                  <span>{language === 'ar' ? 'إضافة خدمة جديدة' : 'Add New Service'}</span>
                </button>
              </div>
            </div>

            {/* Filters Bar: Search & Category Filter */}
            <div className="p-4 rounded-2xl bg-slate-800/80 border border-slate-700 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              
              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
                {[
                  { id: 'all', label: 'كل الخدمات', labelEn: 'All' },
                  { id: 'government', label: 'حكومية', labelEn: 'Government' },
                  { id: 'educational', label: 'تعليمية', labelEn: 'Educational' },
                  { id: 'housing', label: 'إسكانية', labelEn: 'Housing' },
                  { id: 'health', label: 'صحية', labelEn: 'Health' }
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setServiceCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                      serviceCategoryFilter === cat.id
                        ? 'bg-gradient-to-r from-purple-700 to-indigo-600 text-white shadow-sm'
                        : 'bg-slate-900/60 text-slate-400 hover:text-white border border-slate-700/60'
                    }`}
                  >
                    {language === 'ar' ? cat.label : cat.labelEn}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative min-w-[240px]">
                <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={serviceSearch}
                  onChange={(e) => setServiceSearch(e.target.value)}
                  placeholder={language === 'ar' ? 'بحث في الخدمات بالاسم أو الجهة...' : 'Search services...'}
                  className="w-full pr-9 pl-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

            </div>

            {/* Services Grid */}
            {(() => {
              const filteredServices = services.filter(s => {
                const matchesCat = serviceCategoryFilter === 'all' || s.category === serviceCategoryFilter;
                const matchesQuery = s.title.toLowerCase().includes(serviceSearch.toLowerCase()) || 
                  (s.titleEn && s.titleEn.toLowerCase().includes(serviceSearch.toLowerCase())) ||
                  s.responsibleEntity.toLowerCase().includes(serviceSearch.toLowerCase());
                return matchesCat && matchesQuery;
              });

              if (filteredServices.length === 0) {
                return (
                  <div className="text-center py-12 bg-slate-800/50 rounded-3xl border border-slate-700 text-slate-400 text-xs">
                    لم يتم العثور على أي خدمات مطابقة لمعايير البحث.
                  </div>
                );
              }

              return (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredServices.map(srv => (
                    <div
                      key={srv.id}
                      className="bg-slate-800/90 border border-slate-700/80 rounded-3xl p-5 shadow-lg flex flex-col justify-between space-y-4 hover:border-purple-500/50 transition-all"
                    >
                      <div className="space-y-3">
                        {/* Top tag & entity */}
                        <div className="flex items-center justify-between text-xs">
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-900 text-sky-300 border border-slate-700">
                            {srv.category === 'government' ? 'خدمات حكومية' :
                             srv.category === 'educational' ? 'خدمات تعليمية' :
                             srv.category === 'housing' ? 'إسكان ودعم' : 'رعاية صحية'}
                          </span>
                          <span className="text-[11px] text-slate-400 truncate max-w-[150px]">
                            {srv.responsibleEntity}
                          </span>
                        </div>

                        {/* Title */}
                        <h4 className="text-base font-bold text-white leading-snug">
                          {srv.title}
                        </h4>
                        <p className="text-xs text-slate-400 line-clamp-2">
                          {srv.description}
                        </p>

                        {/* Fee Box (Current Price) */}
                        <div className="p-3.5 rounded-2xl bg-slate-900/90 border border-slate-700 flex items-center justify-between">
                          <div>
                            <span className="text-[10px] text-slate-400 block">السعر الحالي للخدمة:</span>
                            <span className="text-xl font-black text-amber-400 tabular-nums">
                              {srv.fee} ج.م
                            </span>
                          </div>
                          <button
                            onClick={() => handleOpenEditService(srv)}
                            className="px-2.5 py-1.5 text-xs font-bold text-amber-300 bg-amber-500/20 hover:bg-amber-500/30 rounded-xl flex items-center gap-1 border border-amber-500/30 transition-colors"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                            <span>تعديل السعر</span>
                          </button>
                        </div>

                        {/* Estimated Duration */}
                        <div className="flex items-center gap-2 text-xs text-slate-300">
                          <Clock className="w-3.5 h-3.5 text-sky-400" />
                          <span>المدة المتوقعة: </span>
                          <span className="font-semibold text-white">{srv.estimatedDuration}</span>
                        </div>

                        {/* Required Documents Preview */}
                        <div className="pt-2 border-t border-slate-700/60 space-y-1.5">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                              <FileCheck2 className="w-3.5 h-3.5 text-amber-400" />
                              <span>الأوراق المطلوبة:</span>
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-amber-300 border border-slate-700 font-mono font-bold">
                              {srv.requiredDocuments.length} مستندات
                            </span>
                          </div>

                          <ul className="text-xs text-slate-400 space-y-1">
                            {srv.requiredDocuments.slice(0, 3).map((doc, dIdx) => (
                              <li key={dIdx} className="flex items-center gap-1.5 truncate">
                                <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${doc.isMandatory ? 'bg-amber-400' : 'bg-slate-500'}`} />
                                <span className="truncate">{doc.name}</span>
                                {doc.isMandatory && <span className="text-[10px] text-amber-400 font-bold shrink-0">(إجباري)</span>}
                              </li>
                            ))}
                            {srv.requiredDocuments.length > 3 && (
                              <li className="text-[11px] text-sky-400 font-bold">
                                +{srv.requiredDocuments.length - 3} مستندات أخرى...
                              </li>
                            )}
                          </ul>
                        </div>
                      </div>

                      {/* Action buttons */}
                      <div className="pt-3 border-t border-slate-700 flex items-center gap-2">
                        <button
                          onClick={() => handleOpenEditService(srv)}
                          className="flex-1 py-2.5 px-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition-all shadow-md"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                          <span>تعديل السعر والمستندات</span>
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`هل أنت متأكد من حذف خدمة "${srv.title}"؟`)) {
                              deleteService(srv.id);
                            }
                          }}
                          className="p-2.5 bg-slate-900 hover:bg-rose-950/60 text-slate-400 hover:text-rose-400 border border-slate-700 hover:border-rose-700/60 rounded-xl transition-colors"
                          title="حذف الخدمة"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              );
            })()}

            {/* MODAL: EDIT SERVICE PRICE & DOCUMENTS */}
            {editingService && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                  
                  {/* Modal Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                        <Edit3 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          تعديل السعر والأوراق: {editingService.title}
                        </h3>
                        <p className="text-xs text-slate-400">
                          التغييرات التي تقوم بها هنا تطبق فوراً وتظهر لجميع العملاء عبر هواتفهم.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setEditingService(null)}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleSaveServiceEdit} className="space-y-5">
                    
                    {/* Price / Fee Input (Most Requested by user: محتاج انا الي احط الاسعار بنفسي) */}
                    <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/60 space-y-2">
                      <label className="block text-xs font-bold text-amber-300">
                        💰 الرسوم الرسمية للخدمة (السعر بالجنيه المصري):
                      </label>
                      <div className="flex items-center gap-3">
                        <div className="relative flex-1">
                          <input
                            type="number"
                            min="0"
                            step="10"
                            value={editFee}
                            onChange={(e) => setEditFee(Number(e.target.value))}
                            className="w-full px-4 py-2.5 bg-slate-900 border border-amber-500/80 rounded-xl text-lg font-black text-amber-400 tabular-nums focus:outline-none focus:ring-2 focus:ring-amber-500"
                            required
                          />
                          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400">
                            ج.م
                          </span>
                        </div>

                        {/* Quick +/- 50 adjusters */}
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => setEditFee(prev => Math.max(0, prev - 50))}
                            className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                          >
                            -50
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditFee(prev => prev + 50)}
                            className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                          >
                            +50
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditFee(prev => prev + 100)}
                            className="px-2.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-lg border border-slate-700"
                          >
                            +100
                          </button>
                        </div>
                      </div>
                      <span className="text-[11px] text-amber-400/80 block">
                        هذا هو السعر الذي يدفعه العميل عند طلب الخدمة (سواء إلكترونياً أو نقداً للمندوب).
                      </span>
                    </div>

                    {/* Service Name & Entity */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          اسم الخدمة (بالعربية):
                        </label>
                        <input
                          type="text"
                          value={editTitle}
                          onChange={(e) => setEditTitle(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          المدة المتوقعة للإنجاز:
                        </label>
                        <input
                          type="text"
                          value={editDuration}
                          onChange={(e) => setEditDuration(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        الجهة المسؤولة عن الاستخراج:
                      </label>
                      <input
                        type="text"
                        value={editEntity}
                        onChange={(e) => setEditEntity(e.target.value)}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* Interactive Required Documents Manager (User request: يكون عندي امكانية تعديل في الخدمات سواء السعر او الاوراق) */}
                    <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
                          <FileCheck2 className="w-4 h-4 text-amber-400" />
                          <span>قائمة المستندات والأوراق المطلوبة ({editDocuments.length}):</span>
                        </span>
                        <span className="text-[10px] text-slate-400">
                          يمكنك حذف أوراق أو إضافة أوراق جديدة للمواطن
                        </span>
                      </div>

                      {/* Current Documents Checklist */}
                      <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                        {editDocuments.map((doc, dIdx) => (
                          <div
                            key={dIdx}
                            className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-2 text-xs"
                          >
                            <div className="flex items-center gap-2 truncate">
                              <span className={`w-2 h-2 rounded-full shrink-0 ${doc.isMandatory ? 'bg-amber-400' : 'bg-slate-500'}`} />
                              <span className="text-white font-medium truncate">{doc.name}</span>
                              <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold ${doc.isMandatory ? 'bg-amber-500/20 text-amber-300' : 'bg-slate-800 text-slate-400'}`}>
                                {doc.isMandatory ? 'إجباري' : 'اختياري'}
                              </span>
                              {doc.notes && <span className="text-[10px] text-slate-500 truncate">({doc.notes})</span>}
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemoveDocFromEdit(dIdx)}
                              className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-slate-800 rounded-lg shrink-0 transition-colors"
                              title="حذف المستند من القائمة"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ))}
                      </div>

                      {/* Add New Document to Checklist Row */}
                      <div className="pt-3 border-t border-slate-800 space-y-2">
                        <span className="text-[11px] font-bold text-slate-300 block">
                          ➕ إضافة مستند جديد لقائمة الأوراق:
                        </span>
                        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                          <input
                            type="text"
                            value={newDocName}
                            onChange={(e) => setNewDocName(e.target.value)}
                            placeholder="اسم المستند (مثال: شهادة الميلاد المميكنة الأصلية)..."
                            className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                          <input
                            type="text"
                            value={newDocNotes}
                            onChange={(e) => setNewDocNotes(e.target.value)}
                            placeholder="ملاحظات (مثال: الأصل للاطلاع + صورتين)..."
                            className="sm:w-48 px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                          />
                          <label className="flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer shrink-0">
                            <input
                              type="checkbox"
                              checked={newDocMandatory}
                              onChange={(e) => setNewDocMandatory(e.target.checked)}
                              className="w-4 h-4 rounded text-amber-500"
                            />
                            <span>إجباري</span>
                          </label>
                          <button
                            type="button"
                            onClick={handleAddDocToEdit}
                            className="px-3 py-2 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-colors shrink-0"
                          >
                            إضافة ورقة
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingService(null)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition-all flex items-center gap-2"
                      >
                        <ShieldCheck className="w-4 h-4 text-amber-300" />
                        <span>حفظ التعديلات والأسعار فوراً</span>
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            )}

            {/* MODAL: ADD NEW CUSTOM SERVICE */}
            {showAddServiceModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
                <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-700 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 max-h-[90vh] overflow-y-auto">
                  
                  <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-xl bg-purple-500/20 text-purple-400">
                        <Plus className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">
                          إضافة خدمة ورقية جديدة
                        </h3>
                        <p className="text-xs text-slate-400">
                          أضف أي خدمة جديدة بتسعيرك وقائمة أوراقك الخاصة لتظهر للجمهور.
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowAddServiceModal(false)}
                      className="p-2 text-slate-400 hover:text-white rounded-xl hover:bg-slate-800"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form onSubmit={handleCreateNewService} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          اسم الخدمة (بالعربية):
                        </label>
                        <input
                          type="text"
                          value={newServiceTitle}
                          onChange={(e) => setNewServiceTitle(e.target.value)}
                          placeholder="مثال: استخراج قيد عائلي مستعجل"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          القسم / التصنيف:
                        </label>
                        <select
                          value={newServiceCategory}
                          onChange={(e: any) => setNewServiceCategory(e.target.value)}
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                        >
                          <option value="government">خدمات حكومية</option>
                          <option value="educational">خدمات تعليمية</option>
                          <option value="housing">خدمات إسكان ودعم</option>
                          <option value="health">رعاية صحية ومستشفيات</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-amber-400 mb-1">
                          الرسوم المقررة (السعر بالجنيه):
                        </label>
                        <input
                          type="number"
                          value={newServiceFee}
                          onChange={(e) => setNewServiceFee(Number(e.target.value))}
                          className="w-full px-3 py-2 bg-slate-800 border border-amber-500 rounded-xl text-sm font-bold text-amber-400"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          المدة المقدرة للإنجاز:
                        </label>
                        <input
                          type="text"
                          value={newServiceDuration}
                          onChange={(e) => setNewServiceDuration(e.target.value)}
                          placeholder="مثال: خلال 48 ساعة"
                          className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        الجهة الحكومية أو الرسمية المسؤولة:
                      </label>
                      <input
                        type="text"
                        value={newServiceEntity}
                        onChange={(e) => setNewServiceEntity(e.target.value)}
                        placeholder="مثال: مصلحة الأحوال المدنية - وزارة الداخلية"
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        وصف مختصر للخدمة:
                      </label>
                      <textarea
                        value={newServiceDescription}
                        onChange={(e) => setNewServiceDescription(e.target.value)}
                        placeholder="وصف تفصيلي للإجراء والخدمة..."
                        rows={2}
                        className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-xl text-xs text-white"
                      />
                    </div>

                    {/* New Service Document Checklist Builder */}
                    <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
                      <label className="block text-xs font-bold text-amber-300">
                        قائمة الأوراق المطلوبة للخدمة:
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={customDocInput}
                          onChange={(e) => setCustomDocInput(e.target.value)}
                          placeholder="اسم المستند المطلوب..."
                          className="flex-1 px-3 py-1.5 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white"
                        />
                        <button
                          type="button"
                          onClick={handleAddDocToNewService}
                          className="px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl"
                        >
                          إضافة ورقة
                        </button>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {newServiceDocs.map((doc, dIdx) => (
                          <span
                            key={dIdx}
                            className="px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-700 text-[11px] text-slate-300 flex items-center gap-1"
                          >
                            <span>{doc.name}</span>
                            <button
                              type="button"
                              onClick={() => setNewServiceDocs(prev => prev.filter((_, i) => i !== dIdx))}
                              className="text-rose-400 hover:text-rose-300 font-bold ml-1"
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddServiceModal(false)}
                        className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold rounded-xl"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg"
                      >
                        حفظ وإتاحة الخدمة للمواطنين
                      </button>
                    </div>

                  </form>

                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 2: CRM FLEET & COURIERS MANAGEMENT */}
        {activeTab === 'crm_couriers' && (
          <div className="space-y-6 animate-in fade-in">
            
            {/* Header & New Courier CTA */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
                    <Truck className="w-6 h-6" />
                  </span>
                  <div>
                    <h3 className="text-lg font-bold text-white">
                      نظام CRM لإدارة وتوزيع المناديب (Courier Fleet Management)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      إضافة المناديب الجدد، متابعة حالتهم، فتح الشات المباشر معهم، والتواصل الفوري عبر الهاتف أو واتساب.
                    </p>
                  </div>
                </div>
              </div>

              <button
                onClick={() => setShowAddCourierModal(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 shrink-0"
              >
                <UserPlus className="w-4 h-4" />
                <span>إضافة مندوب جديد للنظام</span>
              </button>
            </div>

            {/* Courier Fleet Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">إجمالي فريق المناديب:</span>
                <span className="text-2xl font-black text-white">{couriers.length}</span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">مناديب متاحون فوراً:</span>
                <span className="text-2xl font-black text-sky-400">
                  {couriers.filter(c => c.status === 'available').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">في مهمات جارية:</span>
                <span className="text-2xl font-black text-amber-400">
                  {couriers.filter(c => c.status === 'busy').length}
                </span>
              </div>
              <div className="p-4 rounded-2xl bg-slate-800 border border-slate-700">
                <span className="text-xs text-slate-400 block mb-1">المعاملات المنجزة:</span>
                <span className="text-2xl font-black text-purple-400">
                  {couriers.reduce((sum, c) => sum + c.assignedOrdersCount, 0)}
                </span>
              </div>
            </div>

            {courierSuccessMsg && (
              <div className="p-4 rounded-2xl bg-purple-950/80 border border-purple-500 text-purple-200 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4 text-amber-400" />
                <span>{courierSuccessMsg}</span>
              </div>
            )}

            {/* Couriers Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {couriers.map((courier) => {
                const rawPhone = courier.phone.replace(/\D/g, '');
                const intlPhone = rawPhone.startsWith('2') ? rawPhone : '2' + rawPhone;
                const courierWhatsappUrl = `https://wa.me/${intlPhone}?text=${encodeURIComponent(`أهلاً كابتن ${courier.name}، تواصل معك من إدارة منصة SKIP بخصوص توزيع المهام والطلبات الجديدة.`)}`;

                return (
                  <div
                    key={courier.id}
                    className="p-5 rounded-3xl bg-slate-800/90 border border-slate-700 hover:border-amber-500/50 transition-all shadow-lg flex flex-col justify-between space-y-4"
                  >
                    <div>
                      {/* Top Bar: Name & Vehicle */}
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 flex items-center justify-center font-bold text-lg shadow-inner">
                            <Truck className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="text-sm font-bold text-white">{courier.name}</h4>
                              <span className="text-[10px] text-amber-400 font-bold">⭐ {courier.rating}</span>
                            </div>
                            <span className="text-xs font-mono text-sky-400 block mt-0.5">
                              {courier.phone}
                            </span>
                          </div>
                        </div>

                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">
                          {courier.vehicle}
                        </span>
                      </div>

                      {/* Area & ID */}
                      <div className="mt-4 pt-3 border-t border-slate-700/60 space-y-1 text-xs">
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">منطقة التغطية:</span>
                          <span className="font-semibold text-white">{courier.area}</span>
                        </div>
                        <div className="flex items-center justify-between text-slate-300">
                          <span className="text-slate-400">الطلبات المسندة:</span>
                          <span className="font-bold text-amber-400">{courier.assignedOrdersCount} معاملة</span>
                        </div>
                        {courier.nationalId && (
                          <div className="flex items-center justify-between text-slate-400 text-[11px]">
                            <span>الرقم القومي:</span>
                            <span className="font-mono">{courier.nationalId}</span>
                          </div>
                        )}
                      </div>

                      {/* Status Toggle */}
                      <div className="mt-3 pt-2 border-t border-slate-700/60 flex items-center justify-between">
                        <span className="text-[11px] text-slate-400">حالة المندوب:</span>
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => updateCourierStatus(courier.id, 'available')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              courier.status === 'available'
                                ? 'bg-purple-600 text-white shadow-xs'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            متاح
                          </button>
                          <button
                            onClick={() => updateCourierStatus(courier.id, 'busy')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              courier.status === 'busy'
                                ? 'bg-amber-500 text-white shadow-xs'
                                : 'bg-slate-900 text-slate-400 hover:text-white'
                            }`}
                          >
                            في مهمة
                          </button>
                          <button
                            onClick={() => updateCourierStatus(courier.id, 'offline')}
                            className={`px-2 py-1 rounded-lg text-[10px] font-bold transition-all ${
                              courier.status === 'offline'
                                ? 'bg-slate-700 text-slate-200'
                                : 'bg-slate-900 text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            غير متاح
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* CRM Quick Actions Bar for Courier */}
                    <div className="pt-3 border-t border-slate-700/80 flex items-center gap-2">
                      {/* Direct In-App Chat button */}
                      <button
                        onClick={() => openCourierChat(courier)}
                        className="flex-1 py-2 px-2.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                        title="فتح شات مباشر مع المندوب"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
                        <span>فتح الشات</span>
                      </button>

                      {/* WhatsApp */}
                      <a
                        href={courierWhatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2 px-3 bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/40 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        title="محادثة واتساب المندوب"
                      >
                        <Smartphone className="w-3.5 h-3.5 text-amber-400" />
                        <span>واتساب</span>
                      </a>

                      {/* Direct Phone Call */}
                      <a
                        href={`tel:${courier.phone}`}
                        className="py-2 px-3 bg-slate-900 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                        title="اتصال هاتفي"
                      >
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Modal: Add New Courier */}
            {showAddCourierModal && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                <div 
                  className="w-full max-w-lg bg-slate-900 rounded-3xl p-6 border border-slate-700 shadow-2xl space-y-5"
                  onClick={e => e.stopPropagation()}
                >
                  <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <UserPlus className="w-5 h-5 text-amber-400" />
                      <h3 className="text-base font-bold text-white">تسجيل وإضافة مندوب جديد لفريق SKIP</h3>
                    </div>
                    <button
                      onClick={() => setShowAddCourierModal(false)}
                      className="p-1 text-slate-400 hover:text-white rounded-lg"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      if (!newCourierName.trim() || !newCourierPhone.trim()) return;

                      const added = addCourier({
                        name: newCourierName,
                        phone: newCourierPhone,
                        vehicle: newCourierVehicle,
                        area: newCourierArea || 'المنوفية (شبين الكوم وقويسنا)',
                        nationalId: newCourierNationalId
                      });

                      setCourierSuccessMsg(`تم إضافة المندوب (${added.name}) بنجاح وتعيين رقمه في نظام CRM!`);
                      setNewCourierName('');
                      setNewCourierPhone('');
                      setNewCourierArea('');
                      setNewCourierNationalId('');
                      setShowAddCourierModal(false);
                      setTimeout(() => setCourierSuccessMsg(null), 4000);
                    }}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold text-slate-300 mb-1">
                        اسم المندوب بالكامل:
                      </label>
                      <input
                        type="text"
                        value={newCourierName}
                        onChange={e => setNewCourierName(e.target.value)}
                        placeholder="كابتن كريم ممدوح"
                        required
                        className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          رقم الهاتف (واتساب واتصال):
                        </label>
                        <input
                          type="tel"
                          dir="ltr"
                          value={newCourierPhone}
                          onChange={e => setNewCourierPhone(e.target.value)}
                          placeholder="01012345678"
                          required
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          وسيلة المواصلات:
                        </label>
                        <select
                          value={newCourierVehicle}
                          onChange={e => setNewCourierVehicle(e.target.value as any)}
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                        >
                          <option value="موتوسيكل">موتوسيكل (دراجة نارية)</option>
                          <option value="سيارة">سيارة</option>
                          <option value="سكوتر">سكوتر</option>
                          <option value="عجلة">دراجة هوائية</option>
                        </select>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          منطقة التغطية والعمل:
                        </label>
                        <input
                          type="text"
                          value={newCourierArea}
                          onChange={e => setNewCourierArea(e.target.value)}
                          placeholder="مدينة نصر والتجمع"
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-300 mb-1">
                          الرقم القومي (14 رقم):
                        </label>
                        <input
                          type="text"
                          maxLength={14}
                          value={newCourierNationalId}
                          onChange={e => setNewCourierNationalId(e.target.value)}
                          placeholder="29501010104822"
                          className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                        />
                      </div>
                    </div>

                    <div className="pt-3 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setShowAddCourierModal(false)}
                        className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                      >
                        إلغاء
                      </button>

                      <button
                        type="submit"
                        className="px-6 py-2.5 bg-amber-600 hover:bg-amber-500 text-white text-xs font-bold rounded-xl shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Check className="w-4 h-4" />
                        <span>حفظ وإضافة المندوب</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

        {/* TAB 3: ALERT DESTINATION & ROUTING SETTINGS */}
        {activeTab === 'alert_settings' && (
          <form onSubmit={handleSaveAlertSettings} className="space-y-6">
            
            {/* Step 1: Select Primary Destination */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-5">
              <div>
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-purple-400" />
                  <span>تحديد "الوجهة الأساسية" لاستلام جميع إشعارات الطلبات والمعاملات الجديدة:</span>
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  اختر القناة التي تريد أن يوجه التطبيق جميع تنبيهات الطلبات إليها فور قيام أي عميل بالحجز أو السداد:
                </p>
              </div>

              {/* 5 Channel Cards */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                
                {/* 1. WhatsApp */}
                <div
                  onClick={() => setPrimaryChannel('whatsapp')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    primaryChannel === 'whatsapp'
                      ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/30'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    {primaryChannel === 'whatsapp' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-600 text-white flex items-center gap-1">
                        <Check className="w-3 h-3 text-amber-300" /> الوجهة الأساسية
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">واتساب (WhatsApp)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      استقبال رسالة واتساب فورية على هاتفك تحتوي على كافة تفاصيل المعاملة وبيانات العميل.
                    </p>
                  </div>
                </div>

                {/* 2. Direct Email */}
                <div
                  onClick={() => setPrimaryChannel('email')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    primaryChannel === 'email'
                      ? 'bg-blue-950/50 border-blue-500 ring-2 ring-blue-500/30'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    {primaryChannel === 'email' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-500 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" /> الوجهة الأساسية
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">البريد الإلكتروني (Email)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      إرسال ملف المعاملة والبيانات الكاملة للمواطن إلى بريدك الإلكتروني المباشر.
                    </p>
                  </div>
                </div>

                {/* 3. Telegram Bot */}
                <div
                  onClick={() => setPrimaryChannel('telegram')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    primaryChannel === 'telegram'
                      ? 'bg-sky-950/50 border-sky-500 ring-2 ring-sky-500/30'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                      <Bot className="w-5 h-5" />
                    </div>
                    {primaryChannel === 'telegram' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-500 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" /> الوجهة الأساسية
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">تيليجرام (Telegram Bot)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      تنبيه فوري ومجاني عبر بوت تيليجرام برنة مستمرة على موبايلك عند كل طلب جديد.
                    </p>
                  </div>
                </div>

                {/* 4. Browser & Sound Chime */}
                <div
                  onClick={() => setPrimaryChannel('browser_push')}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex flex-col justify-between ${
                    primaryChannel === 'browser_push'
                      ? 'bg-purple-950/50 border-purple-500 ring-2 ring-purple-500/30'
                      : 'bg-slate-900/60 border-slate-700 hover:border-slate-600'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                      <Bell className="w-5 h-5" />
                    </div>
                    {primaryChannel === 'browser_push' && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-500 text-white flex items-center gap-1">
                        <Check className="w-3 h-3" /> الوجهة الأساسية
                      </span>
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white mb-1">المتصفح والصوت (Push)</h4>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      رنة جرس قوية في لوحة التحكم وإشعار يظهر على شاشة الهاتف حتى خارج المتصفح.
                    </p>
                  </div>
                </div>

              </div>

            </div>

            {/* Step 2: Channel Contact Details */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <Settings className="w-4 h-4 text-purple-400" />
                <span>بيانات الاتصال للوجهات المربوطة:</span>
              </h4>

              <div className="grid sm:grid-cols-2 gap-4">
                {/* WhatsApp */}
                <div className={`p-4 rounded-2xl border ${primaryChannel === 'whatsapp' ? 'border-purple-500/60 bg-purple-950/20' : 'border-slate-700 bg-slate-900/60'}`}>
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Smartphone className="w-4 h-4 text-purple-400" />
                      <span>رقم الواتساب لاستقبال الطلبات:</span>
                    </span>
                    {primaryChannel === 'whatsapp' && <span className="text-[10px] text-purple-400 font-bold">الوجهة الأساسية</span>}
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={whatsappNumber}
                    onChange={(e) => setWhatsappNumber(e.target.value)}
                    placeholder="01098765432"
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                  <div className="flex items-center justify-between mt-2 text-[11px]">
                    <span className="text-slate-400">سيتم توجيه جميع إشعارات العملاء لهذا الرقم.</span>
                    <button
                      type="button"
                      onClick={() => sendTestNotificationToPrimary('whatsapp')}
                      className="text-amber-400 hover:underline font-bold"
                    >
                      تجربة واتساب
                    </button>
                  </div>
                </div>

                {/* Email */}
                <div className={`p-4 rounded-2xl border ${primaryChannel === 'email' ? 'border-sky-500/60 bg-sky-950/20' : 'border-slate-700 bg-slate-900/60'}`}>
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Mail className="w-4 h-4 text-sky-400" />
                      <span>البريد الإلكتروني المخصص للإشعارات:</span>
                    </span>
                    {primaryChannel === 'email' && <span className="text-[10px] text-sky-400 font-bold">الوجهة الأساسية</span>}
                  </label>
                  <input
                    type="email"
                    dir="ltr"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    placeholder="orders@skip-portal.com"
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                    required
                  />
                  <div className="flex items-center justify-between mt-2 text-[11px]">
                    <span className="text-slate-400">تصلك رسالة إلكترونية مفصلة فور تسجيل كل طلب.</span>
                    <button
                      type="button"
                      onClick={() => sendTestNotificationToPrimary('email')}
                      className="text-sky-400 hover:underline font-bold"
                    >
                      تجربة إيميل
                    </button>
                  </div>
                </div>

                {/* Telegram */}
                <div className={`p-4 rounded-2xl border ${primaryChannel === 'telegram' ? 'border-sky-500/60 bg-sky-950/20' : 'border-slate-700 bg-slate-900/60'}`}>
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Bot className="w-4 h-4 text-sky-400" />
                      <span>معرّف تيليجرام (Telegram Chat / ID):</span>
                    </span>
                    {primaryChannel === 'telegram' && <span className="text-[10px] text-sky-400 font-bold">الوجهة الأساسية</span>}
                  </label>
                  <input
                    type="text"
                    dir="ltr"
                    value={telegramChatId}
                    onChange={(e) => setTelegramChatId(e.target.value)}
                    placeholder="@skip_admin_dispatch"
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>

                {/* SMS & Hotline Phone */}
                <div className="p-4 rounded-2xl border border-slate-700 bg-slate-900/60">
                  <label className="block text-xs font-bold text-slate-200 mb-1 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-purple-400" />
                      <span>رقم الهاتف المباشر للمكالمات (SMS / Call):</span>
                    </span>
                  </label>
                  <input
                    type="tel"
                    dir="ltr"
                    value={smsNumber}
                    onChange={(e) => setSmsNumber(e.target.value)}
                    placeholder="01098765432"
                    className="w-full px-3.5 py-2.5 text-xs font-mono bg-slate-800 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 3: Event Triggers Selector (ما هي الطلبات التي ترغب في استلام إشعار بها؟) */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-3">
              <h4 className="text-sm font-bold text-white">
                أنواع المعاملات والأحداث المطلوب استلام تنبيه فوري عنها:
              </h4>

              <div className="grid sm:grid-cols-2 gap-3 pt-1">
                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyNewReq}
                    onChange={(e) => setNotifyNewReq(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">طلبات الخدمات الحكومية والتعليمية والإسكان</span>
                    <span className="text-[11px] text-slate-400">جوازات، بطاقات، رخص سيارات، شهادات، شقق إسكان</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyMeds}
                    onChange={(e) => setNotifyMeds(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">طلبات صرف وتوصيل الأدوية والروشتات</span>
                    <span className="text-[11px] text-slate-400">إشعار فوري عند رفع أي روشتة طبية أو طلب علاج للمنزل</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyDoctors}
                    onChange={(e) => setNotifyDoctors(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">حجوزات مواعيد الكشف والعيادات</span>
                    <span className="text-[11px] text-slate-400">إشعار عند حجز مريض لموعد استشاري بالعيادة</span>
                  </div>
                </label>

                <label className="flex items-center gap-3 p-3 rounded-xl bg-slate-900/60 border border-slate-700/80 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notifyChat}
                    onChange={(e) => setNotifyChat(e.target.checked)}
                    className="w-4 h-4 text-purple-600 rounded"
                  />
                  <div>
                    <span className="text-xs font-bold text-white block">رسائل الشات والاستفسارات الفورية</span>
                    <span className="text-[11px] text-slate-400">تنبيه عند إرسال أي مواطن رسالة في نافذة المراسلة</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Step 4: Notification Template Customization */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
              <h4 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-sky-400" />
                <span>تخصيص قالب رسالة التنبيه الواردة (Message Template):</span>
              </h4>

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    نص قالب رسالة الواتساب / التيليجرام المرسلة إليك:
                  </label>
                  <textarea
                    rows={4}
                    value={customWhatsAppTemplate}
                    onChange={(e) => setCustomWhatsAppTemplate(e.target.value)}
                    className="w-full p-3 text-xs font-mono bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  />
                  <span className="text-[10px] text-slate-400">
                    المتغيرات المتاحة: {'{NAME}'} (اسم العميل) · {'{SERVICE}'} (اسم الخدمة) · {'{PHONE}'} (رقم الهاتف) · {'{REF}'} (رقم المعاملة) · {'{ADDRESS}'} (العنوان)
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    عنوان رسالة البريد الإلكتروني (Email Subject):
                  </label>
                  <input
                    type="text"
                    value={customEmailSubject}
                    onChange={(e) => setCustomEmailSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs font-mono bg-slate-900 border border-slate-700 rounded-xl text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>
            </div>

            {/* Step 5: Admin Security & PIN Code Management */}
            <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h4 className="text-sm font-bold text-white flex items-center gap-2">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>حماية لوحة الإدارة ورمز الدخول السري (Security PIN):</span>
                </h4>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-slate-400">الرمز السري المعتمد حالياً:</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 font-mono font-bold tracking-widest">
                    {adminPin}
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                هذا الرمز مخصص لك ولمناديبك فقط، ويمنع أي عميل أو زائر عادي من فتح لوحة التحكم بعد نشر التطبيق. يمكنك تغيير الرمز في أي وقت من هنا.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <div className="relative w-full sm:w-72">
                  <KeyRound className="w-4 h-4 absolute start-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    inputMode="numeric"
                    maxLength={8}
                    value={newPinInput}
                    onChange={(e) => setNewPinInput(e.target.value)}
                    placeholder="أدخل رمز PIN جديد (مثل: 8899)"
                    className="w-full ps-9 pe-3 py-2.5 text-xs font-mono bg-slate-900 border border-slate-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUpdatePin}
                  className="w-full sm:w-auto px-4 py-2.5 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl transition-all shadow-sm flex items-center justify-center gap-1.5"
                >
                  <KeyRound className="w-3.5 h-3.5" />
                  <span>تحديث وحفظ رمز PIN</span>
                </button>
              </div>

              {pinChangeStatus && (
                <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                  <CheckCircle2 className="w-4 h-4 text-amber-400" />
                  <span>{pinChangeStatus}</span>
                </div>
              )}
            </div>

            {/* Action Bar: Save & Direct Test */}
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-xs text-slate-300">
                <span>الوجهة الأساسية الحالية: </span>
                <span className="font-bold text-purple-400 uppercase">{primaryChannel}</span>
                <span className="text-slate-500"> ({primaryChannel === 'whatsapp' ? whatsappNumber : primaryChannel === 'email' ? emailAddress : telegramChatId})</span>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  type="button"
                  onClick={() => sendTestNotificationToPrimary()}
                  className="flex-1 sm:flex-none px-5 py-3 bg-slate-800 hover:bg-slate-700 text-sky-300 border border-sky-500/30 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>إرسال إشعار تجريبي الآن</span>
                </button>

                <button
                  type="submit"
                  className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4 text-amber-300" />
                  <span>حفظ وتعيين كوجهة أساسية</span>
                </button>
              </div>
            </div>

          </form>
        )}

        {/* TAB 3: LIVE MESSAGES INBOX */}
        {activeTab === 'messages' && (
          <div className="bg-slate-800/90 rounded-3xl p-6 border border-slate-700 shadow-xl space-y-4">
            <div className="flex items-center justify-between pb-4 border-b border-slate-700">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-purple-400" />
                <span>محادثات واستفسارات المواطنين المباشرة</span>
              </h3>
              <button
                onClick={() => openModal('chat')}
                className="px-3 py-1.5 bg-gradient-to-r from-purple-700 to-indigo-600 hover:from-purple-600 hover:to-indigo-500 text-white text-xs font-bold rounded-xl"
              >
                فتح نافذة الدردشة المباشرة
              </button>
            </div>

            <div className="space-y-3 max-h-[460px] overflow-y-auto">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className="p-3.5 rounded-2xl bg-slate-900/70 border border-slate-700 flex items-start justify-between gap-3"
                >
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-bold text-sky-400">{msg.senderName}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-xs text-slate-200 leading-relaxed">{msg.message}</p>
                  </div>
                  <button
                    onClick={() => openModal('chat')}
                    className="px-3 py-1 text-xs font-bold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg shrink-0"
                  >
                    رد فوري
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

    </div>
  );
};

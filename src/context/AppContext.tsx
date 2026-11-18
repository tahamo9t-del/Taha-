import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  Language, 
  Theme, 
  ServiceCategory, 
  ServiceItem, 
  UserRequest, 
  RequestStatus,
  DocumentExpiryItem, 
  MedicalRecordItem, 
  DoctorAppointment, 
  ChatMessage,
  ServiceOffice,
  AdminPhoneSettings,
  AlertDestinationSettings,
  AlertDestinationChannel,
  IncomingAlert,
  Courier
} from '../types';
import { PAYMENTS_AND_ORDERS_ENABLED } from '../config/features';
import { 
  SERVICES_DATA, 
  SERVICE_OFFICES, 
  INITIAL_EXPIRY_ALERTS, 
  INITIAL_MEDICAL_RECORDS, 
  UPCOMING_APPOINTMENTS, 
  INITIAL_USER_REQUESTS,
  INITIAL_CHAT_MESSAGES,
  INITIAL_COURIERS 
} from '../data/mockData';

interface AppContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
  theme: Theme;
  toggleTheme: () => void;

  // Role: Citizen (Customer) vs Admin (Manager/Courier Portal)
  userRole: 'citizen' | 'admin';
  setUserRole: (role: 'citizen' | 'admin') => void;
  toggleUserRole: () => void;
  
  // Services & Filtering
  services: ServiceItem[];
  updateService: (serviceId: string, updatedData: Partial<ServiceItem>) => Promise<void>;
  addService: (newService: Partial<ServiceItem>) => Promise<ServiceItem>;
  deleteService: (serviceId: string) => Promise<void>;
  selectedCategory: ServiceCategory;
  setSelectedCategory: (cat: ServiceCategory) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Offices
  offices: ServiceOffice[];
  
  // User Requests & Tracker
  userRequests: UserRequest[];
  createRequest: (
    service: ServiceItem,
    applicantData: {
      name: string;
      phone: string;
      nationalId: string;
      address: string;
      courierRequested: boolean;
      paymentMethod: 'cash' | 'fawry' | 'instapay' | 'card' | 'wallet';
    }
  ) => Promise<UserRequest>;
  updateRequestStatus: (requestId: string, newStatus: RequestStatus) => void;
  deleteRequest: (requestId: string) => Promise<void>;
  refreshAllData: () => Promise<void>;
  
  // Alerts & Documents
  expiryAlerts: DocumentExpiryItem[];
  
  // Medical
  medicalRecords: MedicalRecordItem[];
  appointments: DoctorAppointment[];
  bookAppointment: (doctor: { doctorName: string; doctorNameEn: string; specialty: string; specialtyEn: string; hospital: string; hospitalEn: string; date: string; timeSlot: string; fee: number }) => void;
  requestMedicineDelivery: (record: MedicalRecordItem, medicineNames: string[]) => void;
  
  // Chat
  chatMessages: ChatMessage[];
  sendMessage: (text: string, sender?: 'user' | 'support' | 'courier' | 'doctor') => void;

  // CRM Fleet & Courier Dispatch Management
  couriers: Courier[];
  addCourier: (courierData: { name: string; phone: string; vehicle: 'موتوسيكل' | 'سيارة' | 'سكوتر' | 'عجلة'; area: string; nationalId?: string }) => Courier;
  updateCourierStatus: (courierId: string, status: 'available' | 'busy' | 'offline') => void;
  assignCourierToRequest: (requestId: string, courierId: string) => void;
  openCourierChat: (courier: Courier, request?: UserRequest) => void;
  activeCourierForChat: Courier | null;
  setActiveCourierForChat: (courier: Courier | null) => void;
  
  // Admin Phone Linking & Notification Settings
  adminPhoneSettings: AdminPhoneSettings;
  updateAdminPhoneSettings: (settings: Partial<AdminPhoneSettings>) => void;
  alertDestinationSettings: AlertDestinationSettings;
  updateAlertDestinationSettings: (settings: Partial<AlertDestinationSettings>) => void;
  sendTestNotificationToPrimary: (customChannel?: AlertDestinationChannel) => void;
  incomingAlerts: IncomingAlert[];
  latestAlertToast: IncomingAlert | null;
  dismissToast: () => void;
  markAlertAsRead: (id: string) => void;
  clearAllAlerts: () => void;
  simulateIncomingCustomerTest: () => void;
  requestBrowserNotificationPermission: () => Promise<boolean>;

  // Admin Authentication & Device Locking
  isAdminAuthenticated: boolean;
  adminPin: string;
  loginAdmin: (pin: string, rememberDevice?: boolean) => boolean;
  logoutAdmin: () => void;
  updateAdminPin: (newPin: string) => boolean;

  // Modals & Navigation
  activeModal: {
    type: 'service_details' | 'payment' | 'courier_booking' | 'biometric' | 'medical_details' | 'book_doctor' | 'chat' | 'cloud_backup' | 'phone_settings' | 'alerts_feed' | 'admin_login' | null;
    data?: any;
  };
  openModal: (type: 'service_details' | 'payment' | 'courier_booking' | 'biometric' | 'medical_details' | 'book_doctor' | 'chat' | 'cloud_backup' | 'phone_settings' | 'alerts_feed' | 'admin_login', data?: any) => void;
  closeModal: () => void;
  
  // Biometric auth
  isBiometricVerified: boolean;
  verifyBiometrics: (callback?: () => void) => void;
  
  // Cloud Backup
  lastCloudBackup: string;
  isBackingUp: boolean;
  runCloudBackup: () => void;
  
  // Quick notifications
  unreadAlertsCount: number;
  unreadIncomingAlertsCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

// Web Audio API notification sound synthesizer
const playChimeSound = () => {
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    const now = ctx.currentTime;
    // Two-tone bright notification chime
    osc.frequency.setValueAtTime(587.33, now); // D5
    osc.frequency.setValueAtTime(880, now + 0.12); // A5
    
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    osc.stop(now + 0.6);
  } catch (err) {
    console.warn('Audio chime playback restricted', err);
  }
};

const checkIsAdminUrl = (): boolean => {
  try {
    const hash = (window.location.hash || '').toLowerCase();
    const search = (window.location.search || '').toLowerCase();
    const pathname = (window.location.pathname || '').toLowerCase();
    return (
      hash === '#admin' ||
      hash.startsWith('#admin') ||
      pathname === '/admin' ||
      pathname.startsWith('/admin') ||
      search.includes('admin=true') ||
      search.includes('portal=admin')
    );
  } catch {
    return false;
  }
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>('ar');
  const [theme, setThemeState] = useState<Theme>('light');
  const [userRole, setUserRoleState] = useState<'citizen' | 'admin'>(() =>
    checkIsAdminUrl() ? 'admin' : 'citizen'
  );

  const setUserRole = (role: 'citizen' | 'admin') => {
    setUserRoleState(role);
    try {
      if (role === 'admin') {
        if (!checkIsAdminUrl()) {
          history.pushState(null, '', '#admin');
        }
      } else {
        const hash = (window.location.hash || '').toLowerCase();
        const pathname = (window.location.pathname || '').toLowerCase();
        const search = (window.location.search || '').toLowerCase();
        if (hash.startsWith('#admin')) {
          history.replaceState(null, '', window.location.pathname + window.location.search);
        } else if (pathname.startsWith('/admin') || search.includes('admin=true') || search.includes('portal=admin')) {
          history.replaceState(null, '', '/');
        }
      }
    } catch {}
  };

  const toggleUserRole = () => {
    setUserRole(userRole === 'citizen' ? 'admin' : 'citizen');
  };

  // Admin Authentication & Device Session (Strictly requires PIN login on each device)
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => {
    try {
      localStorage.removeItem('skip_admin_auth');
      return localStorage.getItem('skip_admin_session_v2') === 'true';
    } catch {
      return false;
    }
  });

  const [adminPin, setAdminPinState] = useState<string>(() => {
    try {
      return localStorage.getItem('skip_admin_pin') || '2026';
    } catch {
      return '2026';
    }
  });

  const loginAdmin = (pin: string, rememberDevice: boolean = true): boolean => {
    if (pin.trim() === adminPin.trim()) {
      setIsAdminAuthenticated(true);
      setUserRole('admin');
      if (rememberDevice) {
        try {
          localStorage.setItem('skip_admin_session_v2', 'true');
        } catch {}
      }
      closeModal();
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminAuthenticated(false);
    setUserRole('citizen');
    try {
      localStorage.removeItem('skip_admin_auth');
      localStorage.removeItem('skip_admin_session_v2');
    } catch {}
  };

  const updateAdminPin = (newPin: string): boolean => {
    if (newPin.trim().length >= 4) {
      setAdminPinState(newPin.trim());
      try {
        localStorage.setItem('skip_admin_pin', newPin.trim());
      } catch {}
      return true;
    }
    return false;
  };

  const [services, setServices] = useState<ServiceItem[]>(SERVICES_DATA);
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [offices] = useState<ServiceOffice[]>(SERVICE_OFFICES);
  
  const [userRequests, setUserRequests] = useState<UserRequest[]>(INITIAL_USER_REQUESTS);
  const [expiryAlerts, setExpiryAlerts] = useState<DocumentExpiryItem[]>(INITIAL_EXPIRY_ALERTS);
  const [medicalRecords, setMedicalRecords] = useState<MedicalRecordItem[]>(INITIAL_MEDICAL_RECORDS);
  const [appointments, setAppointments] = useState<DoctorAppointment[]>(UPCOMING_APPOINTMENTS);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(INITIAL_CHAT_MESSAGES);

  // CRM Fleet & Courier Management
  const [couriers, setCouriers] = useState<Courier[]>(() => {
    try {
      const saved = localStorage.getItem('skip_couriers');
      if (saved) return JSON.parse(saved);
    } catch {}
    return INITIAL_COURIERS;
  });

  const [activeCourierForChat, setActiveCourierForChat] = useState<Courier | null>(null);

  const addCourier = (courierData: { 
    name: string; 
    phone: string; 
    vehicle: 'موتوسيكل' | 'سيارة' | 'سكوتر' | 'عجلة'; 
    area: string; 
    nationalId?: string 
  }): Courier => {
    const newCourier: Courier = {
      id: `cour-${Date.now()}`,
      name: courierData.name.trim(),
      phone: courierData.phone.trim(),
      vehicle: courierData.vehicle,
      area: courierData.area.trim(),
      nationalId: courierData.nationalId?.trim() || '29000000000000',
      status: 'available',
      assignedOrdersCount: 0,
      rating: 5.0
    };
    setCouriers(prev => {
      const updated = [newCourier, ...prev];
      try {
        localStorage.setItem('skip_couriers', JSON.stringify(updated));
      } catch {}
      return updated;
    });
    return newCourier;
  };

  const updateCourierStatus = (courierId: string, status: 'available' | 'busy' | 'offline') => {
    setCouriers(prev => {
      const updated = prev.map(c => c.id === courierId ? { ...c, status } : c);
      try {
        localStorage.setItem('skip_couriers', JSON.stringify(updated));
      } catch {}
      return updated;
    });
  };

  const assignCourierToRequest = (requestId: string, courierId: string) => {
    const courier = couriers.find(c => c.id === courierId);
    if (!courier) return;

    setUserRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          courierRequested: true,
          courierName: courier.name,
          courierPhone: courier.phone,
          status: 'delegate_assigned',
          trackingSteps: [
            ...req.trackingSteps,
            {
              title: `تم إسناد المعاملة للمندوب (${courier.name} - ${courier.phone})`,
              titleEn: `Assigned to courier (${courier.name} - ${courier.phone})`,
              completed: true,
              timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
            }
          ]
        };
      }
      return req;
    }));

    updateCourierStatus(courierId, 'busy');
    setCouriers(prev => prev.map(c => c.id === courierId ? { ...c, assignedOrdersCount: c.assignedOrdersCount + 1 } : c));

    // Automated courier acknowledgement message in chat
    const dispatchNotice: ChatMessage = {
      id: `dispatch-${Date.now()}`,
      sender: 'courier',
      senderName: `${courier.name} (مندوب سكيب)`,
      senderNameEn: `${courier.name} (Courier)`,
      message: `أهلاً بك يا إدارة! تم تأكيد إسناد المعاملة لي (${courier.name} - ${courier.phone}). جاري الآن التواصل مع العميل والتحرك على العنوان لاستلام الأوراق وتخليص المعاملة.`,
      messageEn: `Order received and confirmed. Contacting client and heading to address.`,
      timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, dispatchNotice]);
  };

  const openCourierChat = (courier: Courier, request?: UserRequest) => {
    setActiveCourierForChat(courier);
    if (request) {
      const dispatchMsg: ChatMessage = {
        id: `chat-disp-${Date.now()}`,
        sender: 'support',
        senderName: 'إدارة منصة SKIP',
        senderNameEn: 'SKIP Administration',
        message: `📍 تكليف مباشر للطلب (${request.referenceNumber}):\nالخدمة: ${request.serviceTitle}\nالعميل: ${request.applicantName}\nالهاتف: ${request.applicantPhone}\nالعنوان: ${request.address}\nالرسوم للتحصيل: ${request.fee} ج.م`,
        timestamp: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
      };
      setChatMessages(prev => [...prev, dispatchMsg]);
    }
    openModal('chat', { courier, request });
  };

  // Admin Phone Linking Settings
  const [adminPhoneSettings, setAdminPhoneSettings] = useState<AdminPhoneSettings>(() => {
    try {
      const saved = localStorage.getItem('skip_admin_phones');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      primaryPhone: '01098765432',
      whatsappPhone: '01098765432',
      secondaryPhone: '01123456789',
      adminName: 'إدارة ومندوب منصة SKIP المعتمد',
      soundEnabled: true,
      browserNotificationsEnabled: true,
      autoWhatsAppAlert: true
    };
  });

  // Comprehensive Alert Destination & Routing Settings
  const [alertDestinationSettings, setAlertDestinationSettings] = useState<AlertDestinationSettings>(() => {
    try {
      const saved = localStorage.getItem('skip_alert_destination_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      primaryChannel: 'whatsapp',
      whatsappNumber: '01098765432',
      emailAddress: 'admin@skip-portal.com',
      telegramChatId: '@skip_admin_dispatch',
      smsNumber: '01098765432',
      adminName: 'إدارة ومناديب منصة SKIP المعتمدين',
      soundEnabled: true,
      soundTone: 'chime',
      browserNotificationsEnabled: true,
      autoOpenWhatsAppOnOrder: true,
      notifyOnNewRequest: true,
      notifyOnMedicineOrder: true,
      notifyOnDoctorBooking: true,
      notifyOnChatMessage: true,
      customWhatsAppTemplate: '🚨 [تنبيه منصة SKIP] طلب جديد وارد!\nالعميل: {NAME}\nالخدمة: {SERVICE}\nرقم المعاملة: {REF}\nالهاتف: {PHONE}\nالعنوان: {ADDRESS}',
      customEmailSubject: '🔔 [SKIP Portal] إشعار بطلب جديد رقم {REF}'
    };
  });

  // Incoming alerts for requests and chats
  const [incomingAlerts, setIncomingAlerts] = useState<IncomingAlert[]>([
    {
      id: 'alt-init-1',
      type: 'request',
      title: 'طلب جديد: تجديد جواز سفر بالمنزل',
      titleEn: 'New Request: Home Passport Renewal',
      description: 'قام العميل محمد أحمد بطلب تجديد جواز السفر مع خدمة المندوب المنزلي.',
      descriptionEn: 'Customer Mohamed Ahmed requested passport renewal with doorstep courier.',
      customerName: 'محمد أحمد إبراهيم',
      customerPhone: '01098765432',
      referenceNumber: 'SKP-2026-89210',
      timestamp: 'منذ قليل',
      read: false
    }
  ]);

  const [latestAlertToast, setLatestAlertToast] = useState<IncomingAlert | null>(null);

  const [activeModal, setActiveModal] = useState<{
    type: 'service_details' | 'payment' | 'courier_booking' | 'biometric' | 'medical_details' | 'book_doctor' | 'chat' | 'cloud_backup' | 'phone_settings' | 'alerts_feed' | 'admin_login' | null;
    data?: any;
  }>({ type: null });

  // Dedicated Admin Route Listener: /admin, #admin, or ?admin=true
  useEffect(() => {
    const syncRoleWithUrl = () => {
      if (checkIsAdminUrl()) {
        setUserRoleState('admin');
      } else {
        setUserRoleState('citizen');
      }
    };

    syncRoleWithUrl();
    window.addEventListener('hashchange', syncRoleWithUrl);
    window.addEventListener('popstate', syncRoleWithUrl);
    return () => {
      window.removeEventListener('hashchange', syncRoleWithUrl);
      window.removeEventListener('popstate', syncRoleWithUrl);
    };
  }, []);

  // Real-time Cross-Device Server Sync (SSE + Periodic Polling fallback)
  useEffect(() => {
    // 1. Initial Load from Backend Store
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {});

    fetch('/api/requests')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setUserRequests(data);
      })
      .catch(() => {});

    fetch('/api/couriers')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) setCouriers(data);
      })
      .catch(() => {});

    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data && data.whatsappNumber) {
          setAlertDestinationSettings(prev => ({ ...prev, ...data }));
          setAdminPhoneSettings(prev => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});

    // 2. Server-Sent Events (SSE) Listener for zero-latency incoming dispatch
    let eventSource: EventSource | null = null;
    try {
      eventSource = new EventSource('/api/events');

      eventSource.addEventListener('new_request', (event: any) => {
        try {
          const newReq: UserRequest = JSON.parse(event.data);
          setUserRequests(prev => {
            if (prev.some(r => r.id === newReq.id)) return prev;
            return [newReq, ...prev];
          });

          // Trigger sound and toast for incoming order
          triggerIncomingNotification({
            type: 'request',
            title: `معاملة جديدة: ${newReq.serviceTitle}`,
            titleEn: `New Order: ${newReq.serviceTitleEn}`,
            description: `طلب جديد من ${newReq.applicantName} (${newReq.paymentMethod === 'cash' ? 'الدفع نقداً للمندوب' : 'سداد إلكتروني'}) - الرسوم: ${newReq.fee} ج.م`,
            descriptionEn: `New request from ${newReq.applicantName} (${newReq.paymentMethod}) - Fee: ${newReq.fee} EGP`,
            customerName: newReq.applicantName,
            customerPhone: newReq.applicantPhone,
            referenceNumber: newReq.referenceNumber
          });
        } catch (e) {}
      });

      eventSource.addEventListener('request_updated', (event: any) => {
        try {
          const updatedReq: UserRequest = JSON.parse(event.data);
          setUserRequests(prev => prev.map(r => r.id === updatedReq.id ? updatedReq : r));
        } catch (e) {}
      });

      eventSource.addEventListener('request_deleted', (event: any) => {
        try {
          const { id } = JSON.parse(event.data);
          setUserRequests(prev => prev.filter(r => r.id !== id));
        } catch (e) {}
      });

      eventSource.addEventListener('service_updated', (event: any) => {
        try {
          const updatedSrv: ServiceItem = JSON.parse(event.data);
          setServices(prev => prev.map(s => s.id === updatedSrv.id ? updatedSrv : s));
        } catch (e) {}
      });

      eventSource.addEventListener('service_added', (event: any) => {
        try {
          const addedSrv: ServiceItem = JSON.parse(event.data);
          setServices(prev => [addedSrv, ...prev.filter(s => s.id !== addedSrv.id)]);
        } catch (e) {}
      });

      eventSource.addEventListener('service_deleted', (event: any) => {
        try {
          const { id } = JSON.parse(event.data);
          setServices(prev => prev.filter(s => s.id !== id));
        } catch (e) {}
      });
    } catch (e) {
      console.warn('SSE stream error:', e);
    }

    // 3. Fallback Poll every 3.5 seconds
    const pollTimer = setInterval(() => {
      fetch('/api/requests')
        .then(res => res.json())
        .then((latestRequests: UserRequest[]) => {
          if (Array.isArray(latestRequests) && latestRequests.length > 0) {
            setUserRequests(prev => {
              const currentIds = new Set(prev.map(r => r.id));
              const newlyArrived = latestRequests.filter(r => !currentIds.has(r.id));
              if (newlyArrived.length > 0) {
                newlyArrived.forEach(req => {
                  triggerIncomingNotification({
                    type: 'request',
                    title: `معاملة جديدة: ${req.serviceTitle}`,
                    titleEn: `New Order: ${req.serviceTitleEn}`,
                    description: `طلب جديد من ${req.applicantName} (${req.paymentMethod === 'cash' ? 'نقداً للمندوب' : 'سداد إلكتروني'}) - الرسوم: ${req.fee} ج.م`,
                    descriptionEn: `New request from ${req.applicantName} (${req.paymentMethod}) - Fee: ${req.fee} EGP`,
                    customerName: req.applicantName,
                    customerPhone: req.applicantPhone,
                    referenceNumber: req.referenceNumber
                  });
                });
                return latestRequests;
              }
              return prev;
            });
          }
        })
        .catch(() => {});
    }, 3500);

    return () => {
      eventSource?.close();
      clearInterval(pollTimer);
    };
  }, []);
  
  const [isBiometricVerified, setIsBiometricVerified] = useState<boolean>(false);
  const [lastCloudBackup, setLastCloudBackup] = useState<string>('اليوم، 04:30 ص (مشفر سحابياً)');
  const [isBackingUp, setIsBackingUp] = useState<boolean>(false);

  // Sync HTML dir and lang
  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
  }, [language]);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleLanguage = () => {
    setLanguageState(prev => (prev === 'ar' ? 'en' : 'ar'));
  };

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleTheme = () => {
    setThemeState(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const openModal = (type: any, data?: any) => {
    if (!PAYMENTS_AND_ORDERS_ENABLED && (type === 'payment' || type === 'courier_booking')) {
      if (data?.service) {
        setActiveModal({ type: 'service_details', data: data.service });
      }
      return;
    }
    setActiveModal({ type, data });
  };

  const closeModal = () => {
    setActiveModal({ type: null });
  };

  const verifyBiometrics = (callback?: () => void) => {
    setIsBiometricVerified(true);
    if (callback) callback();
  };

  const runCloudBackup = () => {
    setIsBackingUp(true);
    setTimeout(() => {
      setIsBackingUp(false);
      const nowStr = language === 'ar' ? 'الآن (نسخة احتياطية مشفرة بنجاح)' : 'Just now (Encrypted & synced)';
      setLastCloudBackup(nowStr);
    }, 1800);
  };

  const updateAdminPhoneSettings = (settings: Partial<AdminPhoneSettings>) => {
    setAdminPhoneSettings(prev => {
      const updated = { ...prev, ...settings };
      try {
        localStorage.setItem('skip_admin_phones', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const updateAlertDestinationSettings = (settings: Partial<AlertDestinationSettings>) => {
    setAlertDestinationSettings(prev => {
      const updated = { ...prev, ...settings };
      try {
        localStorage.setItem('skip_alert_destination_settings', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  };

  const sendTestNotificationToPrimary = (customChannel?: AlertDestinationChannel) => {
    const channel = customChannel || alertDestinationSettings.primaryChannel;
    const testName = 'مواطن تجريبي (محمد الشريف)';
    const testRef = 'SKP-' + Math.floor(10000 + Math.random() * 90000);
    const testPhone = '010' + Math.floor(10000000 + Math.random() * 90000000);

    triggerIncomingNotification({
      type: 'request',
      title: `🔔 تنبيه تجريبي إلى وجهة: ${channel.toUpperCase()}`,
      titleEn: `Test Alert to Destination: ${channel.toUpperCase()}`,
      description: `تم إرسال هذا الإشعار التجريبي للتحقق من وصول التنبيه إلى وجهتك الأساسية المحددة (${channel === 'whatsapp' ? alertDestinationSettings.whatsappNumber : channel === 'email' ? alertDestinationSettings.emailAddress : channel}).`,
      descriptionEn: `Test alert dispatched to verify your primary destination (${channel}).`,
      customerName: testName,
      customerPhone: testPhone,
      referenceNumber: testRef
    });

    if (channel === 'whatsapp' && alertDestinationSettings.whatsappNumber) {
      const rawNum = alertDestinationSettings.whatsappNumber.replace(/\D/g, '');
      const intl = rawNum.startsWith('2') ? rawNum : '2' + rawNum;
      const text = `🚨 تجربة تنبيه SKIP:\nتم ربط رقم الواتساب بنجاح كوجهة أساسية لتلقي إشعارات المعاملات!\nالطلب التجريبي: ${testRef}\nالعميل: ${testName}\nالهاتف: ${testPhone}`;
      const url = `https://wa.me/${intl}?text=${encodeURIComponent(text)}`;
      window.open(url, '_blank');
    } else if (channel === 'email' && alertDestinationSettings.emailAddress) {
      const subject = `[SKIP Alert] تجربة استلام تنبيه الطلبات - ${testRef}`;
      const body = `مرحباً،\nهذه رسالة تجريبية لتأكيد تعيين بريدك الإلكتروني (${alertDestinationSettings.emailAddress}) كوجهة أساسية لجميع إشعارات الطلبات والمعاملات في منصة SKIP.\n\nرقم الطلب التجريبي: ${testRef}\nالعميل: ${testName}\nرقم الهاتف: ${testPhone}`;
      const mailtoUrl = `mailto:${alertDestinationSettings.emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      window.open(mailtoUrl, '_blank');
    }
  };

  const requestBrowserNotificationPermission = async (): Promise<boolean> => {
    if (!('Notification' in window)) return false;
    try {
      const permission = await Notification.requestPermission();
      const granted = permission === 'granted';
      updateAdminPhoneSettings({ browserNotificationsEnabled: granted });
      return granted;
    } catch (e) {
      return false;
    }
  };

  const triggerIncomingNotification = (alertData: Omit<IncomingAlert, 'id' | 'timestamp' | 'read'>) => {
    const newAlert: IncomingAlert = {
      ...alertData,
      id: `alt-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' }),
      read: false
    };

    setIncomingAlerts(prev => [newAlert, ...prev]);

    // STRICT ROLE SEPARATION: Toasts, audio chime, and push notifications ONLY fire for the admin
    if (userRole === 'admin') {
      setLatestAlertToast(newAlert);

      // Audio chime
      if (adminPhoneSettings.soundEnabled) {
        playChimeSound();
      }

      // Web Notification API
      if (adminPhoneSettings.browserNotificationsEnabled && 'Notification' in window && Notification.permission === 'granted') {
        try {
          new Notification(`🔔 SKIP: ${newAlert.title}`, {
            body: `${newAlert.customerName} (${newAlert.customerPhone}): ${newAlert.description}`,
            icon: '/assets/aistudio/image_5ae8ef1d.png'
          });
        } catch (e) {}
      }

      // Auto dismiss toast after 9 seconds
      setTimeout(() => {
        setLatestAlertToast(curr => (curr?.id === newAlert.id ? null : curr));
      }, 9000);
    }
  };

  const dismissToast = () => {
    setLatestAlertToast(null);
  };

  const markAlertAsRead = (id: string) => {
    setIncomingAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a));
  };

  const clearAllAlerts = () => {
    setIncomingAlerts([]);
  };

  // Test simulation helper to test receiving an incoming customer order
  const simulateIncomingCustomerTest = () => {
    const sampleNames = ['محمود عبد الله الشريف', 'سارة كمال المنشاوي', 'كريم حسن الديب', 'داليا فؤاد'];
    const sampleServices = ['تجديد رخصة سيارة ملاكي', 'استخراج شهادة تخرج معتمدة', 'صرف وتوصيل روشتة أدوية القلب', 'التقديم لشقق سكن مصر'];
    const randName = sampleNames[Math.floor(Math.random() * sampleNames.length)];
    const randSrv = sampleServices[Math.floor(Math.random() * sampleServices.length)];
    const randPhone = '01' + Math.floor(100000000 + Math.random() * 900000000);

    triggerIncomingNotification({
      type: 'request',
      title: `معاملة واردة: ${randSrv}`,
      titleEn: `Incoming Request: ${randSrv}`,
      description: `قام العميل ${randName} بإرسال الأوراق وسداد الرسوم، ويرغب في التواصل الفوري مع المندوب.`,
      descriptionEn: `Customer ${randName} submitted dossier and paid fees, waiting for courier contact.`,
      customerName: randName,
      customerPhone: randPhone,
      referenceNumber: 'SKP-' + Math.floor(10000 + Math.random() * 90000)
    });
  };

  const createRequest = async (
    service: ServiceItem,
    applicantData: {
      name: string;
      phone: string;
      nationalId: string;
      address: string;
      courierRequested: boolean;
      paymentMethod: 'cash' | 'fawry' | 'instapay' | 'card' | 'wallet';
    }
  ): Promise<UserRequest> => {
    // 1. Try sending to persistent backend server first for cross-device sync
    try {
      const response = await fetch('/api/requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ service, applicantData })
      });
      if (response.ok) {
        const createdReq: UserRequest = await response.json();
        setUserRequests(prev => [createdReq, ...prev.filter(r => r.id !== createdReq.id)]);

        // Alert toast for admin
        triggerIncomingNotification({
          type: 'request',
          title: `طلب جديد: ${service.title}`,
          titleEn: `New Request: ${service.titleEn}`,
          description: `قام ${applicantData.name} بإرسال طلب (${createdReq.referenceNumber}) مع خدمة ${applicantData.paymentMethod === 'cash' ? 'الدفع نقداً' : 'الدفع الإلكتروني'}.`,
          descriptionEn: `Customer ${applicantData.name} placed order (${createdReq.referenceNumber}).`,
          customerName: applicantData.name,
          customerPhone: applicantData.phone,
          referenceNumber: createdReq.referenceNumber
        });

        if (applicantData.courierRequested) {
          setTimeout(() => {
            setChatMessages(prev => [
              ...prev,
              {
                id: `msg-${Date.now()}`,
                sender: 'courier',
                senderName: adminPhoneSettings.adminName,
                senderNameEn: 'Certified SKIP Courier & Administration',
                message: `أهلاً بك يا أستاذ ${applicantData.name}، تم إسناد معاملتك رقم (${createdReq.referenceNumber}) للمندوب المعتمد (${adminPhoneSettings.primaryPhone}). سيتم التواصل معك هاتفياً أو عبر واتساب لتأكيد موعد استلام الأوراق من عنوانك: ${applicantData.address}.`,
                messageEn: `Hello ${applicantData.name}, request (${createdReq.referenceNumber}) assigned to courier (${adminPhoneSettings.primaryPhone}).`,
                timestamp: 'الآن'
              }
            ]);
          }, 800);
        }

        return createdReq;
      }
    } catch (e) {
      console.warn('Backend unavailable, falling back to local memory:', e);
    }

    // 2. Fallback in-memory creation if server is unreachable
    const randomRef = 'SKP-2026-' + Math.floor(10000 + Math.random() * 90000);
    const isCash = applicantData.paymentMethod === 'cash';
    const isCourier = applicantData.courierRequested;
    const newReq: UserRequest = {
      id: `req-${Date.now()}`,
      serviceId: service.id,
      serviceTitle: service.title,
      serviceTitleEn: service.titleEn,
      category: service.category,
      referenceNumber: randomRef,
      status: isCourier ? 'delegate_assigned' : 'processing',
      createdAt: '2026-10-30 05:00',
      fee: service.fee + (isCourier ? 60 : 0),
      paymentMethod: applicantData.paymentMethod,
      paymentStatus: isCash ? 'pending' : 'paid',
      applicantName: applicantData.name,
      applicantPhone: applicantData.phone,
      nationalId: applicantData.nationalId,
      address: applicantData.address,
      courierRequested: isCourier,
      courierName: isCourier ? adminPhoneSettings.adminName : undefined,
      courierPhone: isCourier ? adminPhoneSettings.primaryPhone : undefined,
      estimatedCompletion: 'خلال 48 ساعة',
      trackingSteps: [
        { title: 'تم استلام وتأكيد المعاملة رقمياً', titleEn: 'Application confirmed digitally', completed: true, timestamp: 'اليوم' },
        { 
          title: isCash ? 'سداد الرسوم نقداً عند استلام المندوب للأوراق' : 'سداد الرسوم الحكومية ورسوم الخدمة إلكترونياً', 
          titleEn: isCash ? 'Cash on handover' : 'Official fee settled electronically', 
          completed: !isCash, 
          timestamp: !isCash ? 'اليوم' : 'معلق' 
        },
        { 
          title: isCourier ? 'توجيه مندوب سكيب المعتمد لاستلام أصول الأوراق' : 'فحص ومطابقة المستندات بالجهة الحكومية', 
          titleEn: isCourier ? 'SKIP courier dispatched to pick up original papers' : 'Document verification at authority', 
          completed: false 
        },
        { title: 'إصدار الوثيقة الرسمية وختمها', titleEn: 'Official document stamped & printed', completed: false },
        { 
          title: isCourier ? 'التوصيل النهائي حتى باب المنزل' : 'جاهزة للاستلام من الشباك الموحد', 
          titleEn: isCourier ? 'Doorstep home delivery' : 'Ready for pickup at counter', 
          completed: false 
        }
      ]
    };

    setUserRequests(prev => [newReq, ...prev]);

    triggerIncomingNotification({
      type: 'request',
      title: `طلب جديد: ${service.title}`,
      titleEn: `New Request: ${service.titleEn}`,
      description: `قام ${applicantData.name} بإرسال طلب (${randomRef}) مع خدمة ${isCash ? 'الدفع نقداً' : 'الدفع الإلكتروني'}.`,
      descriptionEn: `Customer ${applicantData.name} placed order (${randomRef}).`,
      customerName: applicantData.name,
      customerPhone: applicantData.phone,
      referenceNumber: randomRef
    });

    return newReq;
  };

  const updateRequestStatus = async (requestId: string, newStatus: RequestStatus) => {
    try {
      fetch(`/api/requests/${requestId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      }).catch(() => {});
    } catch (e) {}

    setUserRequests(prev => prev.map(req => {
      if (req.id !== requestId) return req;
      return {
        ...req,
        status: newStatus,
        trackingSteps: req.trackingSteps.map((step, idx) => {
          if (newStatus === 'completed') return { ...step, completed: true, timestamp: 'مكتمل' };
          if (newStatus === 'delivered' && idx <= 4) return { ...step, completed: true, timestamp: 'تم التسليم' };
          if (newStatus === 'ready_for_delivery' && idx <= 3) return { ...step, completed: true, timestamp: 'جاهز' };
          if (newStatus === 'documents_verified' && idx <= 2) return { ...step, completed: true, timestamp: 'تم الفحص' };
          if (newStatus === 'delegate_assigned' && idx <= 1) return { ...step, completed: true, timestamp: 'تم التعيين' };
          return step;
        })
      };
    }));
  };

  const deleteRequest = async (requestId: string) => {
    try {
      await fetch(`/api/requests/${requestId}`, { method: 'DELETE' });
    } catch (e) {}
    setUserRequests(prev => prev.filter(r => r.id !== requestId));
  };

  const refreshAllData = async () => {
    try {
      const [reqs, srvs, cour, sett] = await Promise.all([
        fetch('/api/requests').then(r => r.json()).catch(() => null),
        fetch('/api/services').then(r => r.json()).catch(() => null),
        fetch('/api/couriers').then(r => r.json()).catch(() => null),
        fetch('/api/settings').then(r => r.json()).catch(() => null),
      ]);
      if (Array.isArray(reqs)) setUserRequests(reqs);
      if (Array.isArray(srvs) && srvs.length > 0) setServices(srvs);
      if (Array.isArray(cour) && cour.length > 0) setCouriers(cour);
      if (sett && sett.whatsappNumber) {
        setAlertDestinationSettings(prev => ({ ...prev, ...sett }));
        setAdminPhoneSettings(prev => ({ ...prev, ...sett }));
      }
    } catch (e) {
      console.warn('Sync failed:', e);
    }
  };

  // Services CRUD methods for Admin
  const updateService = async (serviceId: string, updatedData: Partial<ServiceItem>) => {
    try {
      const res = await fetch(`/api/services/${serviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        const updated: ServiceItem = await res.json();
        setServices(prev => prev.map(s => s.id === serviceId ? updated : s));
        return;
      }
    } catch (e) {
      console.warn('Failed to update service on server:', e);
    }
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, ...updatedData } as ServiceItem : s));
  };

  const addService = async (newService: Partial<ServiceItem>): Promise<ServiceItem> => {
    try {
      const res = await fetch('/api/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newService)
      });
      if (res.ok) {
        const created: ServiceItem = await res.json();
        setServices(prev => [created, ...prev.filter(s => s.id !== created.id)]);
        return created;
      }
    } catch (e) {
      console.warn('Failed to add service on server:', e);
    }
    const fallbackService = { ...newService, id: `srv-${Date.now()}` } as ServiceItem;
    setServices(prev => [fallbackService, ...prev]);
    return fallbackService;
  };

  const deleteService = async (serviceId: string) => {
    try {
      await fetch(`/api/services/${serviceId}`, { method: 'DELETE' });
    } catch (e) {}
    setServices(prev => prev.filter(s => s.id !== serviceId));
  };

  const bookAppointment = (doctor: { 
    doctorName: string; 
    doctorNameEn: string; 
    specialty: string; 
    specialtyEn: string; 
    hospital: string; 
    hospitalEn: string; 
    date: string; 
    timeSlot: string; 
    fee: number;
  }) => {
    const newApt: DoctorAppointment = {
      id: `apt-${Date.now()}`,
      doctorId: `doc-${Date.now()}`,
      doctorName: doctor.doctorName,
      doctorNameEn: doctor.doctorNameEn,
      specialty: doctor.specialty,
      specialtyEn: doctor.specialtyEn,
      hospital: doctor.hospital,
      hospitalEn: doctor.hospitalEn,
      date: doctor.date,
      timeSlot: doctor.timeSlot,
      fee: doctor.fee,
      status: 'upcoming',
      telehealthAvailable: true
    };
    setAppointments(prev => [newApt, ...prev]);

    // Post to persistent server
    fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceTitle: `حجز كشف طبي (${doctor.specialty})`,
        serviceTitleEn: `Doctor Appointment (${doctor.specialtyEn})`,
        category: 'health',
        applicantName: 'محمد أحمد إبراهيم',
        applicantPhone: adminPhoneSettings.primaryPhone,
        nationalId: '29010140104872',
        address: `عيادة ${doctor.hospital} - الموعد: ${doctor.date} (${doctor.timeSlot})`,
        fee: doctor.fee,
        paymentMethod: 'wallet',
        courierRequested: false
      })
    }).then(res => res.json()).then(req => {
      setUserRequests(prev => [req, ...prev.filter(r => r.id !== req.id)]);
    }).catch(() => {});

    triggerIncomingNotification({
      type: 'request',
      title: `حجز كشف طبي جديد: ${doctor.doctorName}`,
      titleEn: `New Appointment: ${doctor.doctorNameEn}`,
      description: `حجز عيادة ${doctor.specialty} بمستشفى ${doctor.hospital} يوم ${doctor.date} الساعة ${doctor.timeSlot}`,
      descriptionEn: `Clinic reservation at ${doctor.hospital} on ${doctor.date} at ${doctor.timeSlot}`,
      customerName: 'محمد أحمد إبراهيم',
      customerPhone: adminPhoneSettings.primaryPhone
    });
  };

  const requestMedicineDelivery = (record: MedicalRecordItem, medicineNames: string[]) => {
    const medTitle = `توصيل أدوية (${medicineNames.slice(0, 2).join(' + ')})`;
    
    // Post to persistent backend server for cross-device sync
    fetch('/api/requests', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        serviceTitle: medTitle,
        serviceTitleEn: `Medicine Delivery (${medicineNames.slice(0, 2).join(', ')})`,
        category: 'health',
        applicantName: record.patientName,
        applicantPhone: adminPhoneSettings.primaryPhone,
        nationalId: record.nationalId,
        address: 'شارع جمال عبد الناصر، شبين الكوم، المنوفية',
        fee: 145,
        paymentMethod: 'cash',
        courierRequested: true
      })
    }).then(res => res.json()).then(req => {
      setUserRequests(prev => [req, ...prev.filter(r => r.id !== req.id)]);
    }).catch(() => {});

    triggerIncomingNotification({
      type: 'medicine',
      title: 'طلب توصيل علاج جديد للعنوان',
      titleEn: 'New Prescription Home Delivery Request',
      description: `طلب صرف: ${medicineNames.join(', ')} للمريض ${record.patientName}`,
      descriptionEn: `Medicine order for patient ${record.patientName}`,
      customerName: record.patientName,
      customerPhone: adminPhoneSettings.primaryPhone,
      referenceNumber: 'SKP-MED-' + Math.floor(10000 + Math.random() * 90000)
    });
  };

  const sendMessage = (text: string, sender: 'user' | 'support' | 'courier' | 'doctor' = 'user') => {
    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender,
      senderName: sender === 'user' ? (language === 'ar' ? 'أنت (المواطن)' : 'You') : adminPhoneSettings.adminName,
      senderNameEn: sender === 'user' ? 'You' : 'SKIP Admin',
      message: text,
      timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
    };
    setChatMessages(prev => [...prev, newMsg]);

    if (sender === 'user') {
      // Trigger instant incoming alert to the linked phone
      triggerIncomingNotification({
        type: 'message',
        title: 'رسالة محادثة جديدة من مواطن',
        titleEn: 'New Chat Message from Citizen',
        description: text,
        descriptionEn: text,
        customerName: 'مواطن / عميل SKIP',
        customerPhone: adminPhoneSettings.primaryPhone
      });

      setTimeout(() => {
        const replyTextAr = `شكراً لتواصلك! تم إشعار رقم الإدارة والمندوب المسجل (${adminPhoneSettings.primaryPhone}) وسيقوم بالتواصل معك عبر الهاتف أو الواتساب أو هنا فوراً.`;
        const replyTextEn = `Thank you! An instant notification was dispatched to the linked admin phone (${adminPhoneSettings.primaryPhone}) and they will contact you shortly.`;
        setChatMessages(prev => [
          ...prev,
          {
            id: `msg-auto-${Date.now()}`,
            sender: 'support',
            senderName: adminPhoneSettings.adminName,
            senderNameEn: 'SKIP Administration',
            message: language === 'ar' ? replyTextAr : replyTextEn,
            timestamp: new Date().toLocaleTimeString(language === 'ar' ? 'ar-EG' : 'en-US', { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 1200);
    }
  };

  const unreadAlertsCount = expiryAlerts.filter(a => a.status === 'expiring_soon' || a.status === 'expired').length;
  const unreadIncomingAlertsCount = incomingAlerts.filter(a => !a.read).length;

  return (
    <AppContext.Provider
      value={{
        language,
        setLanguage,
        toggleLanguage,
        theme,
        toggleTheme,
        userRole,
        setUserRole,
        toggleUserRole,
        updateRequestStatus,
        deleteRequest,
        refreshAllData,
        isAdminAuthenticated,
        adminPin,
        loginAdmin,
        logoutAdmin,
        updateAdminPin,
        services,
        updateService,
        addService,
        deleteService,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        offices,
        userRequests,
        createRequest,
        expiryAlerts,
        medicalRecords,
        appointments,
        bookAppointment,
        requestMedicineDelivery,
        chatMessages,
        sendMessage,
        couriers,
        addCourier,
        updateCourierStatus,
        assignCourierToRequest,
        openCourierChat,
        activeCourierForChat,
        setActiveCourierForChat,
        adminPhoneSettings,
        updateAdminPhoneSettings,
        alertDestinationSettings,
        updateAlertDestinationSettings,
        sendTestNotificationToPrimary,
        incomingAlerts,
        latestAlertToast,
        dismissToast,
        markAlertAsRead,
        clearAllAlerts,
        simulateIncomingCustomerTest,
        requestBrowserNotificationPermission,
        activeModal,
        openModal,
        closeModal,
        isBiometricVerified,
        verifyBiometrics,
        lastCloudBackup,
        isBackingUp,
        runCloudBackup,
        unreadAlertsCount,
        unreadIncomingAlertsCount
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

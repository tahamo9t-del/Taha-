export type Language = 'ar' | 'en';
export type Theme = 'light' | 'dark';

export type ServiceCategory = 
  | 'all'
  | 'government'
  | 'educational'
  | 'housing'
  | 'health'
  | 'courier'
  | null;

export interface RequiredDocument {
  name: string;
  nameEn: string;
  isMandatory: boolean;
  notes?: string;
  notesEn?: string;
  copiesCount?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  titleEn: string;
  category: 'government' | 'educational' | 'housing' | 'health';
  icon: string;
  description: string;
  descriptionEn: string;
  responsibleEntity: string;
  responsibleEntityEn: string;
  fee: number; // in EGP
  estimatedDuration: string;
  estimatedDurationEn: string;
  courierSupported: boolean;
  digitalInstant: boolean;
  requiredDocuments: RequiredDocument[];
  procedureSteps: string[];
  procedureStepsEn: string[];
  conditions: string[];
  conditionsEn: string[];
  popular?: boolean;
  city?: 'shebin' | 'quesna' | 'menoufia';
}

export type RequestStatus = 
  | 'submitted'
  | 'processing'
  | 'delegate_assigned'
  | 'documents_verified'
  | 'ready_for_delivery'
  | 'delivered'
  | 'completed';

export interface UserRequest {
  id: string;
  serviceId: string;
  serviceTitle: string;
  serviceTitleEn: string;
  category: string;
  referenceNumber: string;
  status: RequestStatus;
  createdAt: string;
  fee: number;
  paymentMethod: 'cash' | 'fawry' | 'instapay' | 'card' | 'wallet';
  paymentStatus: 'paid' | 'pending';
  applicantName: string;
  applicantPhone: string;
  nationalId: string;
  address: string;
  courierRequested: boolean;
  courierName?: string;
  courierPhone?: string;
  estimatedCompletion: string;
  trackingSteps: {
    title: string;
    titleEn: string;
    completed: boolean;
    timestamp?: string;
  }[];
}

export interface ServiceOffice {
  id: string;
  name: string;
  nameEn: string;
  category: 'government' | 'educational' | 'housing' | 'health';
  city?: 'shebin' | 'quesna' | 'menoufia';
  address: string;
  addressEn: string;
  coords: { x: number; y: number }; // Relative percentage on interactive map
  phone: string;
  workingHours: string;
  workingHoursEn: string;
  currentWaitTimeMin: number;
  servicesAvailable: string[];
  rating: number;
}

export interface DocumentExpiryItem {
  id: string;
  title: string;
  titleEn: string;
  documentNumber: string;
  holderName: string;
  expiryDate: string;
  daysRemaining: number;
  status: 'valid' | 'expiring_soon' | 'expired';
  renewServiceId?: string;
}

export interface MedicalRecordItem {
  id: string;
  patientName: string;
  nationalId: string;
  bloodType: string;
  date: string;
  doctorName: string;
  doctorNameEn: string;
  specialty: string;
  specialtyEn: string;
  hospital: string;
  hospitalEn: string;
  diagnosis: string;
  diagnosisEn: string;
  prescriptions: {
    medicineName: string;
    dosage: string;
    duration: string;
    deliveryAvailable: boolean;
  }[];
  labTests: {
    name: string;
    result: string;
    referenceRange: string;
    status: 'normal' | 'attention';
  }[];
  shareToken: string;
}

export interface DoctorAppointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorNameEn: string;
  specialty: string;
  specialtyEn: string;
  hospital: string;
  hospitalEn: string;
  date: string;
  timeSlot: string;
  fee: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  telehealthAvailable: boolean;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'support' | 'courier' | 'doctor';
  senderName: string;
  senderNameEn: string;
  avatar?: string;
  message: string;
  messageEn?: string;
  timestamp: string;
  type?: 'text' | 'image' | 'location' | 'status_update';
}

export type AlertDestinationChannel = 'whatsapp' | 'email' | 'telegram' | 'browser_push' | 'all';

export interface AlertDestinationSettings {
  primaryChannel: AlertDestinationChannel;
  whatsappNumber: string;
  emailAddress: string;
  telegramChatId: string;
  smsNumber: string;
  adminName: string;
  soundEnabled: boolean;
  soundTone: 'chime' | 'urgent' | 'classic';
  browserNotificationsEnabled: boolean;
  autoOpenWhatsAppOnOrder: boolean;
  notifyOnNewRequest: boolean;
  notifyOnMedicineOrder: boolean;
  notifyOnDoctorBooking: boolean;
  notifyOnChatMessage: boolean;
  customWhatsAppTemplate: string;
  customEmailSubject: string;
}

export interface AdminPhoneSettings {
  primaryPhone: string;
  whatsappPhone: string;
  secondaryPhone: string;
  adminName: string;
  soundEnabled: boolean;
  browserNotificationsEnabled: boolean;
  autoWhatsAppAlert: boolean;
}

export interface IncomingAlert {
  id: string;
  type: 'request' | 'message' | 'medicine' | 'call_request';
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  customerName: string;
  customerPhone: string;
  referenceNumber?: string;
  timestamp: string;
  read: boolean;
}

export interface Courier {
  id: string;
  name: string;
  phone: string;
  vehicle: 'موتوسيكل' | 'سيارة' | 'سكوتر' | 'عجلة';
  area: string;
  status: 'available' | 'busy' | 'offline';
  nationalId?: string;
  assignedOrdersCount: number;
  rating: number;
  avatar?: string;
}


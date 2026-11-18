import { 
  ServiceItem, 
  ServiceOffice, 
  DocumentExpiryItem, 
  MedicalRecordItem, 
  DoctorAppointment, 
  UserRequest,
  ChatMessage,
  Courier 
} from '../types';

export const SERVICES_DATA: ServiceItem[] = [
  // --- GOVERNMENT SERVICES (MENOUFIA: SHEBIN EL-KOM & QUESNA) ---
  {
    id: 'gov-passport-new',
    title: 'استخراج جواز سفر مصري لأول مرة - قسم جوازات شبين الكوم',
    titleEn: 'First-time Passport Issuance - Shebin El-Kom Passports Dept.',
    category: 'government',
    city: 'shebin',
    icon: 'Plane',
    description: 'إجراءات استخراج جواز السفر المميكن من قسم جوازات شبين الكوم بالحي الشرقي (يخدم أهالي شبين الكوم وقويسنا ومراكز المنوفية).',
    descriptionEn: 'Issue a new machine-readable passport from Shebin El-Kom Passports Dept. serving Shebin El-Kom, Quesna & Menoufia.',
    responsibleEntity: 'قسم جوازات شبين الكوم - بجوار مديرية أمن المنوفية',
    responsibleEntityEn: 'Shebin El-Kom Passports Office - Menoufia Security Directorate',
    fee: 900,
    estimatedDuration: '3 إلى 5 أيام عمل (مستعجل 24 ساعة)',
    estimatedDurationEn: '3 to 5 business days (Express: 24 hours)',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية (لمن بلغ 16 عاماً)', nameEn: 'Valid National ID Card (16+ years)', isMandatory: true, copiesCount: 2 },
      { name: 'شهادة الميلاد المميكنة (لمن هم دون 16 عاماً)', nameEn: 'Computerized Birth Certificate (under 16)', isMandatory: false, notes: 'للأطفال أو لمن ليس لديه بطاقة بعد' },
      { name: 'عدد 4 صور حديثة بخلفية بيضاء مقاس 4×6', nameEn: '4 recent 4x6 photos with white background', isMandatory: true },
      { name: 'شهادة الموقف التجنيدي (للذكور من سن 19 عاماً فما فوق)', nameEn: 'Military Status Certificate (males 19+)', isMandatory: true, notes: 'الأصل للاطلاع مع صورة' },
      { name: 'المؤهل الدراسي ما لم يكن مثبتاً بالرقم القومي', nameEn: 'Academic Degree if not recorded on National ID', isMandatory: true },
      { name: 'وثيقة الزواج (للإناث لإثبات اسم الزوج)', nameEn: 'Marriage Certificate (for females)', isMandatory: false }
    ],
    procedureSteps: [
      'ملء استمارة جواز السفر (نموذج 29 جوازات) عبر تطبيق SKIP قبل الذهاب لقسم جوازات شبين الكوم',
      'التحقق من الموقف التجنيدي وسريان بطاقة الرقم القومي والصور البيضاء',
      'سداد الرسوم المقررة إلكترونياً عبر فوري أو انستاباي أو في خزينة الجوازات',
      'التوجه إلى شباك قسم جوازات شبين الكوم بالبر الشرقي لتسليم الملف وأخذ البصمة',
      'استلام الجواز مطبوعاً من المقر أو توصيله لباب بيتك في شبين الكوم وقويسنا'
    ],
    procedureStepsEn: [
      'Prepare passport Form 29 checklist via SKIP before visiting Shebin El-Kom office',
      'Verify military status, valid National ID and 4x6 white background photos',
      'Pay official fees via Fawry, InstaPay or at the Passports counter',
      'Submit dossier at Shebin El-Kom Passports Dept. (Eastern Bank)',
      'Collect printed passport or request home delivery to Shebin El-Kom / Quesna'
    ],
    conditions: [
      'حضور صاحب الشأن بشخصه لأخذ الصورة والبيانات الحيوية',
      'يغطي قسم جوازات شبين الكوم مركزي شبين الكوم وقويسنا بالكامل'
    ],
    conditionsEn: [
      'Applicant must appear in person for biometric verification',
      'Covers all citizens of Shebin El-Kom and Quesna districts'
    ]
  },
  {
    id: 'gov-passport-renew',
    title: 'تجديد جواز السفر المنتهي - جوازات شبين الكوم',
    titleEn: 'Passport Renewal - Shebin El-Kom Passports Office',
    category: 'government',
    city: 'shebin',
    icon: 'RefreshCw',
    description: 'تجديد جواز السفر منتهي الصلاحية أو ممتلئ الصفحات بمقر جوازات شبين الكوم مع إحضار الجواز السابق للتخريم والإلغاء.',
    descriptionEn: 'Renew expired or full-page Egyptian passport at Shebin El-Kom Passports Dept. with old passport cancellation.',
    responsibleEntity: 'قسم جوازات شبين الكوم - محافظة المنوفية',
    responsibleEntityEn: 'Shebin El-Kom Passports Office - Menoufia',
    fee: 950,
    estimatedDuration: '48 ساعة إلى 4 أيام',
    estimatedDurationEn: '48 hours to 4 days',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'جواز السفر السابق المنتهي (الأصل)', nameEn: 'Old/Expired Original Passport', isMandatory: true },
      { name: 'بطاقة الرقم القومي سارية + صورتين منها', nameEn: 'Valid National ID + 2 copies', isMandatory: true },
      { name: 'عدد 3 صور شخصية 4×6 خلفية بيضاء حديثة', nameEn: '3 Recent 4x6 photos with white background', isMandatory: true },
      { name: 'إيصال سداد الرسوم المميكن', nameEn: 'Electronic Payment Receipt', isMandatory: true }
    ],
    procedureSteps: [
      'فحص بيانات الجواز المنتهي والرقم القومي والتأكد من عدم تغيير البيانات',
      'تجهيز الصور والأوراق أو طلب مندوب SKIP من شبين الكوم أو قويسنا للمساعدة',
      'إيداع الأوراق وإلغاء الجواز القديم بمصلحة الجوازات بشبين الكوم',
      'استلام الجواز الجديد مع الجواز القديم المؤشر عليه بالإلغاء'
    ],
    procedureStepsEn: [
      'Check old passport details and National ID validity',
      'Prepare photos & dossier or schedule SKIP courier assistance in Menoufia',
      'Submit at Shebin El-Kom Passports Dept. and cancel old booklet',
      'Receive newly issued passport along with punched old passport'
    ],
    conditions: ['تسليم أصل الجواز القديم كاملاً عند التقديم'],
    conditionsEn: ['Original expired passport must be presented']
  },
  {
    id: 'gov-national-id',
    title: 'استخراج وتجديد بطاقة الرقم القومي - سجل مدني شبين الكوم وقويسنا',
    titleEn: 'National ID Renewal - Shebin El-Kom & Quesna Civil Registry',
    category: 'government',
    city: 'menoufia',
    icon: 'CreditCard',
    description: 'استخراج وتجديد بطاقة الرقم القومي، وتحديث المهنة والحالة الاجتماعية، من السجل المدني الرئيسي بشبين الكوم وسجل مدني قويسنا.',
    descriptionEn: 'Issue or renew National ID cards and update job or marital status via Shebin El-Kom Central Civil Registry & Quesna Civil Office.',
    responsibleEntity: 'الأحوال المدنية بالمنوفية (الحي الغربي بشبين الكوم & سجل مدني قويسنا)',
    responsibleEntityEn: 'Menoufia Civil Registry (West Shebin & Quesna Offices)',
    fee: 305,
    estimatedDuration: '24 ساعة (مستعجل) أو 7 أيام (عادي)',
    estimatedDurationEn: '24 hours (Express) or 7 days (Regular)',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'استمارة بطاقة الرقم القومي (عادية أو مستعجلة أو VIP)', nameEn: 'Civil Registry National ID Form', isMandatory: true },
      { name: 'شهادة الميلاد المميكنة الأصلية في حالة أول مرة', nameEn: 'Original computerized birth cert if first time', isMandatory: false },
      { name: 'وثيقة إثبات المهنة (خطاب عمل معتمد أو كارنيه نقابة)', nameEn: 'Proof of Profession (Work or Syndicate letter)', isMandatory: true },
      { name: 'إثبات محل الإقامة (إيصال مرافق حديث بشبين الكوم أو قويسنا)', nameEn: 'Utility bill confirming residence in Shebin/Quesna', isMandatory: true },
      { name: 'وثيقة الزواج أو الطلاق (عند تغيير الحالة الاجتماعية)', nameEn: 'Marriage / Divorce document (if applicable)', isMandatory: false }
    ],
    procedureSteps: [
      'شراء نوع الاستمارة المناسب (عادي 50 ج.م - عاجل 125 ج.م - VIP 305 ج.م)',
      'اعتماد الاستمارة من جهة العمل أو الكلية أو النقابة التابع لها بالمنوفية',
      'التوجه لأقرب سجل مدني (الحي الغربي شبين الكوم / مركز شرطة وسجل مدني قويسنا) للتصوير',
      'استلام البطاقة خلال المدة المحددة أو عبر مندوب التوصيل السريع'
    ],
    procedureStepsEn: [
      'Purchase matching ID form tier (Regular / Express / VIP)',
      'Stamp form at employer, Menoufia University or professional syndicate',
      'Visit West Shebin Central Civil Registry or Quesna Civil Office for photo',
      'Collect ID card at branch or via SKIP home delivery'
    ],
    conditions: ['أن يكون عنوان الإقامة مثبتاً بإيصال مرافق أو بضمانة قريب من الدرجة الأولى'],
    conditionsEn: ['Address must match utility bill or first-degree relative guarantee']
  },
  {
    id: 'gov-vehicle-license',
    title: 'تجديد ترخيص سيارة ملاكي والفحص الفني - مرور شبين الكوم',
    titleEn: 'Vehicle License & Technical Inspection - Shebin El-Kom Traffic',
    category: 'government',
    city: 'shebin',
    icon: 'Car',
    description: 'تجديد رخصة السيارة الملاكي، سداد المخالفات وشهادة براءة الذمة، التأمين الإجباري والملصق الإلكتروني بوحدة مرور شبين الكوم.',
    descriptionEn: 'Renew private vehicle registration, settle traffic fines, insurance, and e-sticker at Shebin El-Kom Traffic Administration.',
    responsibleEntity: 'إدارة مرور المنوفية - وحدة مرور شبين الكوم',
    responsibleEntityEn: 'Menoufia Traffic Dept. - Shebin El-Kom Unit',
    fee: 1450,
    estimatedDuration: 'خلال نفس اليوم إلى 24 ساعة',
    estimatedDurationEn: 'Same day to 24 hours',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية لمالك السيارة', nameEn: 'Car owner valid National ID', isMandatory: true },
      { name: 'رخصة السيارة السابقة أو تصريح التسيير', nameEn: 'Previous vehicle registration or permit', isMandatory: true },
      { name: 'شهادة براءة الذمة من نيابة مرور شبين الكوم (المخالفات)', nameEn: 'Traffic Violation Clearance Certificate', isMandatory: true },
      { name: 'حقيبة إسعافات ومثلث عاكس وطفاية حريق صالحة (في حالة الفحص)', nameEn: 'First-aid kit, triangle & valid fire extinguisher', isMandatory: false },
      { name: 'وثيقة التأمين الإجباري عن المسؤولية المدنية', nameEn: 'Mandatory Third-Party Insurance Policy', isMandatory: true }
    ],
    procedureSteps: [
      'الاستعلام عن مخالفات المرور وسدادها أونلاين واستخراج شهادة براءة الذمة',
      'التوجه لوحدة مرور شبين الكوم لسداد الضريبة والتأمين الإجباري بالخزينة المميكنة',
      'إجراء الفحص الفني وأخذ بصمة الشاسيه والموتور (في سنوات الفحص)',
      'تركيب الملصق الإلكتروني واستلام الرخصة الجديدة من الشباك'
    ],
    procedureStepsEn: [
      'Check & settle traffic fines online and obtain clearance certificate',
      'Pay road tax & mandatory insurance at Shebin El-Kom Traffic unit',
      'Pass technical inspection and chassis/engine check if due',
      'Attach e-sticker and collect renewed license card'
    ],
    conditions: ['خلو السيارة من حظر البيع أو التفتيش المالي'],
    conditionsEn: ['No active legal or bank lien block on the vehicle']
  },
  {
    id: 'gov-quesna-traffic',
    title: 'ترخيص وتجديد رخصة سيارة وموتوسيكل - وحدة مرور قويسنا',
    titleEn: 'Car & Motorcycle Licensing - Quesna Traffic Unit',
    category: 'government',
    city: 'quesna',
    icon: 'Bike',
    description: 'تجديد ونقل قيد السيارات والموتوسيكلات، استخراج رخصة القيادة الخاصة لأول مرة، والفحص الفني بوحدة مرور قويسنا.',
    descriptionEn: 'Car & motorcycle registration, transfers, first-time driving license & inspection at Quesna Traffic Unit.',
    responsibleEntity: 'وحدة مرور قويسنا - طريق قويسنا / شبين الكوم',
    responsibleEntityEn: 'Quesna Traffic Unit - Quesna / Shebin Road',
    fee: 650,
    estimatedDuration: 'نصف يوم إلى 24 ساعة',
    estimatedDurationEn: 'Half day to 24 hours',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية (تتبع مركز قويسنا) + صورتين', nameEn: 'Valid National ID (Quesna district) + 2 copies', isMandatory: true },
      { name: 'أصل الرخصة السابقة أو فاتورة الشراء والمبايعة الموثقة', nameEn: 'Previous license or notarized purchase invoice', isMandatory: true },
      { name: 'شهادة براءة الذمة من المخالفات', nameEn: 'Traffic violation clearance certificate', isMandatory: true },
      { name: 'الكشف الطبي (باطنة ونظر) لرخص القيادة لأول مرة من مستشفى معتمد بقويسنا', nameEn: 'Vision & internal medical check for new driving licenses', isMandatory: false },
      { name: 'وثيقة التأمين الإجباري وملف مرور قويسنا', nameEn: 'Mandatory Insurance & Quesna Traffic file', isMandatory: true }
    ],
    procedureSteps: [
      'مراجعة ملف المركبة أو أوراق الكشف الطبي لرخصة القيادة',
      'سداد المخالفات إلكترونياً واستخراج شهادة براءة الذمة',
      'التوجه لوحدة مرور قويسنا للفحص الفني والاختبار العملي',
      'سداد الضريبة واستلام اللوحات والملصق الإلكتروني والرخصة'
    ],
    procedureStepsEn: [
      'Prepare vehicle dossier or driving medical exam papers',
      'Clear traffic fines electronically',
      'Visit Quesna Traffic Unit for vehicle inspection or driving test',
      'Pay taxes and collect plates, e-sticker & license card'
    ],
    conditions: ['أن يكون عنوان السكن بالبطاقة تابعاً لمركز ومدينة قويسنا'],
    conditionsEn: ['National ID residence must fall under Quesna jurisdiction']
  },
  {
    id: 'gov-notary-office',
    title: 'توثيق العقود والتوكيلات - الشهر العقاري بشبين الكوم وقويسنا',
    titleEn: 'Power of Attorney & Contracts - Shebin & Quesna Notary',
    category: 'government',
    city: 'menoufia',
    icon: 'FileText',
    description: 'توثيق التوكيلات العامة والخاصة، عقود بيع السيارات والعقارات، وإقرارات الشهر العقاري بفروع شبين الكوم وقويسنا المميكنة.',
    descriptionEn: 'Notarize general/special Power of Attorney, vehicle & property contracts at Shebin El-Kom & Quesna Real Estate Publicity offices.',
    responsibleEntity: 'مصلحة الشهر العقاري والتوثيق (فرع شبين الكوم & فرع قويسنا)',
    responsibleEntityEn: 'Real Estate Publicity & Notarization (Shebin & Quesna)',
    fee: 195,
    estimatedDuration: '30 إلى 60 دقيقة (مع حجز الموعد)',
    estimatedDurationEn: '30 to 60 minutes (with pre-booking)',
    courierSupported: false,
    digitalInstant: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية للطرف الموكّل أو البائع', nameEn: 'Valid National ID of grantor/seller', isMandatory: true },
      { name: 'صورة بطاقة الطرف الآخر وبياناته كاملة (الاسم والرقم القومي والعنوان)', nameEn: 'Full details & ID copy of recipient/buyer', isMandatory: true },
      { name: 'أصل رخصة السيارة أو سند الملكية (في حالة توكيل أو عقد بيع)', nameEn: 'Original vehicle license or title deed (for sales)', isMandatory: false }
    ],
    procedureSteps: [
      'حجز موعد مسبق بمكتب توثيق شبين الكوم المميكن أو مكتب شهر عقاري قويسنا',
      'مراجعة صياغة التوكيل أو العقد والتأكد من صحة بيانات الأطراف',
      'سداد رسوم التوثيق بالفيزا أو ميزة عند الشباك',
      'التوقيع أمام الموثق واستلام المحرر الموثق بختم الشعار'
    ],
    procedureStepsEn: [
      'Pre-book slot at Shebin El-Kom or Quesna computerized notary office',
      'Review Power of Attorney / contract wording and ID numbers',
      'Settle notarization fees via bank card / Meeza at counter',
      'Sign before notary officer and collect stamped original'
    ],
    conditions: ['حضور الموكل بشخصه وسريان بطاقته الشخصية'],
    conditionsEn: ['Personal attendance of grantor with valid National ID']
  },
  {
    id: 'gov-building-permit',
    title: 'تراخيص البناء والتصالح - المركز التكنولوجي بشبين الكوم وقويسنا',
    titleEn: 'Building Permits & Reconciliation - Shebin & Quesna Tech Centers',
    category: 'government',
    city: 'menoufia',
    icon: 'Building2',
    description: 'استخراج بيان صلاحية الموقع، تراخيص البناء والتعلية، واستكمال ملفات التصالح في مخالفات البناء بمجلس مدينة قويسنا وحي شرق/غرب شبين الكوم.',
    descriptionEn: 'Obtain site validity, building permits, and construction reconciliation files at Quesna City Council & Shebin El-Kom East/West Districts.',
    responsibleEntity: 'المركز التكنولوجي لخدمة المواطنين (قويسنا & حي شرق وغرب شبين الكوم)',
    responsibleEntityEn: 'Technological Municipal Centers (Quesna & Shebin Districts)',
    fee: 2800,
    estimatedDuration: '15 إلى 30 يوم عمل',
    estimatedDurationEn: '15 to 30 business days',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'شهادة صلاحية الموقع للبناء وفقاً لخريطة التنظيم بالمنوفية', nameEn: 'Site Planning & Zoning Suitability Certificate', isMandatory: true },
      { name: 'سند الملكية المسجل أو عقد بيع مشهر + بطاقة الرقم القومي', nameEn: 'Registered Property Deed + National ID', isMandatory: true },
      { name: 'الرسومات الهندسية المعمارية والإنشائية معتمدة من نقابة المهندسين بشبين الكوم', nameEn: 'Blueprints certified by Menoufia Engineers Syndicate', isMandatory: true },
      { name: 'تقرير سلامة إنشائية (في حالات التعلية أو التصالح)', nameEn: 'Structural safety report (for reconciliation/expansion)', isMandatory: false }
    ],
    procedureSteps: [
      'تقديم طلب بيان الصلاحية بالمركز التكنولوجي لمجلس مدينة قويسنا أو حي شبين الكوم',
      'سداد رسوم الرفع المساحي والمعاينة الميدانية',
      'تسليم الرسومات الهندسية واستيفاء موافقات المرافق والحماية المدنية',
      'سداد رسوم الترخيص أو التصالح واستلام الرخصة أو نموذج 8 النهائي'
    ],
    procedureStepsEn: [
      'Apply for zoning certificate at Quesna Council or Shebin District Tech Center',
      'Settle surveying and on-site engineering inspection fees',
      'Deposit syndicate-stamped blueprints and safety approvals',
      'Pay final municipal dues and collect official permit / Form 8'
    ],
    conditions: ['مطابقة العقار لخطوط التنظيم والاشتراطات البنائية المعتمدة بالمحافظة'],
    conditionsEn: ['Property must conform to official urban zoning regulations']
  },
  {
    id: 'gov-criminal-record',
    title: 'صحيفة الحالة الجنائية (الفيش المميكن) - شبين الكوم وقويسنا',
    titleEn: 'Digital Criminal Record Clearance - Shebin El-Kom & Quesna',
    category: 'government',
    city: 'menoufia',
    icon: 'Fingerprint',
    description: 'استخراج الفيش والتشبيه المميكن للتوظيف أو السفر من مكتب الأدلة الجنائية بمركز شرطة قويسنا وقسم شرطة شبين الكوم.',
    descriptionEn: 'Computerized criminal record check for jobs or travel from Quesna Police Center & Shebin El-Kom Police Station.',
    responsibleEntity: 'الأدلة الجنائية - قسم شبين الكوم & مركز شرطة قويسنا',
    responsibleEntityEn: 'Criminal Evidence Unit - Shebin El-Kom & Quesna Police',
    fee: 140,
    estimatedDuration: '24 ساعة (مستعجل نفس اليوم)',
    estimatedDurationEn: '24 hours (Same-day Express)',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية', nameEn: 'Valid National ID', isMandatory: true },
      { name: 'تحديد اسم الجهة الموجه إليها الفيش بدقة', nameEn: 'Exact name of recipient institution/employer', isMandatory: true },
      { name: 'إيصال سداد استمارة الفيش المميكنة', nameEn: 'Computerized form receipt', isMandatory: true }
    ],
    procedureSteps: [
      'تجهيز البطاقة السارية وتحديد الجهة الموجه إليها قبل التوجه للقسم',
      'شراء استمارة الفيش المميكن (عادي أو مستعجل) بسجل أو قسم الشرطة',
      'أخذ البصمات الرقمية ومطابقتها إلكترونياً بقاعدة البيانات',
      'استلام الفيش مختوماً خلال 24 ساعة أو توصيله عبر SKIP'
    ],
    procedureStepsEn: [
      'Prepare valid ID and exact recipient entity name beforehand',
      'Purchase standard or express computerized form at station',
      'Complete digital live-scan fingerprinting',
      'Collect stamped clearance within 24h or via SKIP courier'
    ],
    conditions: ['الحضور الشخصي عند أخذ البصمات لأول مرة أو عند التغيير'],
    conditionsEn: ['Applicant presence required for live fingerprint scan']
  },
  {
    id: 'gov-quesna-industrial',
    title: 'خدمات وتراخيص المنطقة الصناعية والتموين بقويسنا',
    titleEn: 'Quesna Industrial Zone, Supply & Municipal Services',
    category: 'government',
    city: 'quesna',
    icon: 'Building2',
    description: 'خدمات تسجيل وتجديد بطاقات التموين، الشهادات الصحية للعاملين بمصانع قويسنا، واستخراج تراخيص المحال والمنشآت التجارية بقويسنا.',
    descriptionEn: 'Supply cards, health certificates for Quesna Industrial Zone workers, and commercial shop licensing in Quesna.',
    responsibleEntity: 'مجلس مدينة قويسنا & مكتب تموين قويسنا المطور',
    responsibleEntityEn: 'Quesna City Council & Developed Supply Office',
    fee: 180,
    estimatedDuration: '2 إلى 5 أيام عمل',
    estimatedDurationEn: '2 to 5 business days',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية للمتقدم', nameEn: 'Applicant valid National ID', isMandatory: true },
      { name: 'عقد إيجار أو تمليك موثق للمنشأة (لتراخيص المحال بقويسنا)', nameEn: 'Notarized shop lease/deed (for commercial licensing)', isMandatory: false },
      { name: 'شهادة خلو أمراض من مستشفى قويسنا المركزي (للشهادات الصحية للمصانع)', nameEn: 'Medical clearance from Quesna Central Hospital (for factory staff)', isMandatory: false },
      { name: 'إيصال مرافق حديث داخل مركز قويسنا', nameEn: 'Recent utility bill in Quesna', isMandatory: true }
    ],
    procedureSteps: [
      'تحديد نوع المعاملة (تموين قويسنا / رخصة محل / شهادة صحية للمنطقة الصناعية)',
      'استيفاء الفحص الطبي المبدئي بمستشفى قويسنا المركزي إذا كانت شهادة صحية',
      'تقديم الأوراق بالمركز التكنولوجي بقويسنا وسداد الرسوم إلكترونياً',
      'استلام الترخيص أو البطاقة المعتمدة من الشباك الموحد'
    ],
    procedureStepsEn: [
      'Select transaction type (Supply card / Commercial license / Health cert)',
      'Complete initial screening at Quesna Central Hospital if required',
      'Submit dossier at Quesna Tech Center and pay fees electronically',
      'Collect certified license or card from the unified window'
    ],
    conditions: ['تقديم أصول المستندات للمطابقة في مكتب قويسنا المختص'],
    conditionsEn: ['Present original documents for verification at Quesna office']
  },

  // --- EDUCATIONAL SERVICES (MENOUFIA UNIVERSITY & DIRECTORATE) ---
  {
    id: 'edu-college-admission',
    title: 'التقديم لكليات جامعة المنوفية وشؤون الطلاب - شبين الكوم',
    titleEn: 'Menoufia University Admissions & Student Affairs - Shebin El-Kom',
    category: 'educational',
    city: 'shebin',
    icon: 'GraduationCap',
    description: 'دليل قيد الطلاب الجدد بكليات جامعة المنوفية بشبين الكوم (الهندسة، الطب، التجارة، الحقوق، الآداب، العلوم، الحاسبات)، والكشف الطبي وسداد المصروفات.',
    descriptionEn: 'Freshmen enrollment dossier, medical screening & tuition payments across Menoufia University faculties in Shebin El-Kom.',
    responsibleEntity: 'جامعة المنوفية - مجمع الكليات وشؤون الطلاب بشبين الكوم',
    responsibleEntityEn: 'Menoufia University - Central Campus, Shebin El-Kom',
    fee: 450,
    estimatedDuration: '3 إلى 7 أيام',
    estimatedDurationEn: '3 to 7 days',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'أصل استمارة نجاح الثانوية العامة + 4 صور منها', nameEn: 'Original High School Certificate + 4 copies', isMandatory: true },
      { name: 'أصل شهادة الميلاد المميكنة بالرقم الثلاثي للذكور + 4 صور', nameEn: 'Original computerized birth cert with triple military no.', isMandatory: true },
      { name: 'بطاقة الترشيح المطبوعة لكلية جامعة المنوفية', nameEn: 'Printed Menoufia University admission nomination card', isMandatory: true },
      { name: 'نموذج 2 جند ونموذج 6 جند أو 7 جند (للذكور)', nameEn: 'Military form 2-Gund & 6/7-Gund (males)', isMandatory: true },
      { name: 'عدد 6 صور شخصية 4×6 + استمارة الكشف الطبي الموقعة بالجامعة', nameEn: '6 Personal photos + stamped university medical exam form', isMandatory: true }
    ],
    procedureSteps: [
      'حجز موعد الكشف الطبي بمجمع الكليات الطبية بجامعة المنوفية عبر البوابة الرقمية',
      'سداد مصروفات الكلية إلكترونياً عبر فوري أو الدفع الجامعي الموحد',
      'تجهيز ملف القيد والأوراق التجنيدية ومراجعتها عبر SKIP قبل السفر لشبين الكوم',
      'تسليم الملف لشؤون الطلاب بالكلية واستلام الكارنيه الجامعي'
    ],
    procedureStepsEn: [
      'Schedule mandatory medical screening at Menoufia University medical complex',
      'Pay faculty tuition via Fawry or university e-payment portal',
      'Verify full paper checklist and military forms before visiting Shebin campus',
      'Submit file to faculty student affairs and collect student ID card'
    ],
    conditions: ['اجتياز الكشف الطبي بمقر الإدارة الطبية لجامعة المنوفية بشبين الكوم'],
    conditionsEn: ['Complete mandatory medical check at Menoufia University clinic']
  },
  {
    id: 'edu-grad-certificate',
    title: 'استخراج شهادة التخرج وبيان الدرجات - جامعة المنوفية',
    titleEn: 'Graduation Certificate & Transcripts - Menoufia University',
    category: 'educational',
    city: 'shebin',
    icon: 'Award',
    description: 'استخراج الشهادة المؤقتة أو الدائمة باللغة العربية والإنجليزية وبيان التقديرات لخريجي جامعة المنوفية بشبين الكوم مع خدمة التوصيل لقويسنا والمراكز.',
    descriptionEn: 'Official temporary/permanent graduation certificates & 4-year transcripts for Menoufia University alumni with delivery to Quesna & Shebin.',
    responsibleEntity: 'إدارة الخريجين المركزية - جامعة المنوفية (شبين الكوم)',
    responsibleEntityEn: 'Central Alumni Office - Menoufia University (Shebin El-Kom)',
    fee: 380,
    estimatedDuration: '48 ساعة إلى 4 أيام عمل',
    estimatedDurationEn: '48 hours to 4 business days',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'صورة بطاقة الرقم القومي سارية', nameEn: 'Valid National ID copy', isMandatory: true },
      { name: 'إخلاء طرف مكتمل من الكلية ومكتبة الجامعة والمدينة الجامعية بشبين الكوم', nameEn: 'Completed clearance from Faculty, Library & Dorms', isMandatory: true },
      { name: 'عدد 2 صورة شخصية حديثة 4×6 خلفية بيضاء', nameEn: '2 Recent 4x6 white-background photos', isMandatory: true },
      { name: 'إيصال سداد رسوم الشهادة والدمغات الجامعية', nameEn: 'University fee & stamp payment receipt', isMandatory: true }
    ],
    procedureSteps: [
      'استيفاء توقيعات إخلاء الطرف من شؤون الخريجين والمكتبة بالكلية',
      'سداد الرسوم المقررة للنسخة العربية أو الإنجليزية إلكترونياً',
      'اعتماد الشهادة من إدارة الخريجين المركزية بجامعة المنوفية',
      'استلام الشهادة من مقر الجامعة أو توصيلها بالمندوب إلى شبين الكوم أو قويسنا'
    ],
    procedureStepsEn: [
      'Complete faculty and library clearance signatures',
      'Settle fees for Arabic or English stamped copies electronically',
      'Authenticate diploma at Menoufia University Central Alumni Office',
      'Collect diploma in person or request SKIP doorstep delivery'
    ],
    conditions: ['مراجعة صحة الاسم باللغتين العربية والإنجليزية قبل الطباعة النهائية'],
    conditionsEn: ['Verify bilingual spelling accuracy prior to final printing']
  },
  {
    id: 'edu-school-enrollment',
    title: 'التقديم للمدارس والتحويلات - إدارتي شبين الكوم وقويسنا التعليميتين',
    titleEn: 'School Admissions & Transfers - Shebin & Quesna Educational Admin',
    category: 'educational',
    city: 'menoufia',
    icon: 'School',
    description: 'تقديم رياض الأطفال والصف الأول الابتدائي والتحويلات بين المدارس الرسمية واللغات والخاصة بإدارتي شبين الكوم وقويسنا التعليميتين.',
    descriptionEn: 'KG, primary enrollment & school transfers across public and language schools in Shebin El-Kom & Quesna Educational Directorates.',
    responsibleEntity: 'مديرية التربية والتعليم بالمنوفية (إدارة شبين الكوم & إدارة قويسنا)',
    responsibleEntityEn: 'Menoufia Directorate of Education (Shebin & Quesna)',
    fee: 250,
    estimatedDuration: '5 إلى 10 أيام عمل',
    estimatedDurationEn: '5 to 10 business days',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'شهادة الميلاد المميكنة الأصلية للطالب + 4 صور', nameEn: 'Original computerized birth certificate + 4 copies', isMandatory: true },
      { name: 'البطاقة الصحية مختومة من وحدة التأمين الصحي بشبين أو قويسنا', nameEn: 'Health record card stamped by Shebin/Quesna insurance clinic', isMandatory: true },
      { name: 'عدد 8 صور شخصية حديثة 4×6', nameEn: '8 Recent 4x6 photos', isMandatory: true },
      { name: 'صورة بطاقة الرقم القومي للأب والأم + إيصال مرافق لإثبات المربع السكني', nameEn: 'Parents National IDs + utility bill for district zoning', isMandatory: true },
      { name: 'بيان نجاح معتمد من الإدارة التعليمية السابقة (في حال التحويل)', nameEn: 'Certified pass transcript (for school transfers)', isMandatory: false }
    ],
    procedureSteps: [
      'التسجيل على موقع مديرية التربية والتعليم بالمنوفية واختيار المدارس بالمربع السكني',
      'اعتماد البطاقة الصحية للطفل من عيادة التأمين الصحي بشبين الكوم أو قويسنا',
      'تقديم ملف التقديم الورقي وطوابع المهن التعليمية بالمدرسة',
      'سداد المصروفات الدراسية عبر البريد أو فوري وتأكيد القيد'
    ],
    procedureStepsEn: [
      'Apply on Menoufia Education portal selecting zoned local schools',
      'Stamp child health card at Shebin or Quesna Health Insurance clinic',
      'Submit paper dossier with educational stamps to accepted school',
      'Pay tuition fees via Egypt Post or Fawry to finalize enrollment'
    ],
    conditions: ['الالتزام بالمربع السكني لمركزي شبين الكوم أو قويسنا والسن القانوني في أكتوبر'],
    conditionsEn: ['Reside within Shebin/Quesna zoning & meet Oct 1 age limit']
  },
  {
    id: 'edu-quesna-schools',
    title: 'خدمات الإدارة التعليمية والمدارس الرسمية والفنية بقويسنا',
    titleEn: 'Quesna Educational Admin - Public, Language & Technical Schools',
    category: 'educational',
    city: 'quesna',
    icon: 'School',
    description: 'استخراج بيانات النجاح والدرجات، تقديم المدارس الرسمية لغات والفنية والتجارية، واعتماد ملفات الطلبة بإدارة قويسنا التعليمية.',
    descriptionEn: 'Official pass statements, experimental/technical school admissions & student file authentication at Quesna Educational Administration.',
    responsibleEntity: 'إدارة قويسنا التعليمية - مديرية التربية والتعليم بالمنوفية',
    responsibleEntityEn: 'Quesna Educational Administration - Menoufia',
    fee: 150,
    estimatedDuration: '2 إلى 4 أيام عمل',
    estimatedDurationEn: '2 to 4 business days',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'صورة بطاقة الرقم القومي لولي الأمر أو الطالب', nameEn: 'Guardian or student National ID copy', isMandatory: true },
      { name: 'شهادة الميلاد المميكنة حديثة + 4 صور شخصية', nameEn: 'Recent computerized birth certificate + 4 photos', isMandatory: true },
      { name: 'استمارة النجاح أو بيان الدرجات من المدرسة بقويسنا', nameEn: 'Pass certificate or grade statement from Quesna school', isMandatory: true }
    ],
    procedureSteps: [
      'تحديد الخدمة (بيان نجاح / تحويل مدرسة / ملف تقديم ثانوي أو فني بقويسنا)',
      'ختم الاستمارة من شؤون الطلبة بالمدرسة التابع لها بمركز قويسنا',
      'المراجعة والاعتماد الرسمي بديوان إدارة قويسنا التعليمية',
      'استلام المستند مختوماً أو توصيله عبر مندوب SKIP في قويسنا'
    ],
    procedureStepsEn: [
      'Select service (Grade statement / School transfer / High school enrollment)',
      'Stamp application at student affairs of the Quesna school',
      'Authenticate at Quesna Educational Administration HQ',
      'Collect stamped document or use SKIP courier in Quesna'
    ],
    conditions: ['أن يكون الطالب مقيداً بإحدى مدارس مركز ومدينة قويسنا أو قراها'],
    conditionsEn: ['Student must be registered in a school within Quesna district']
  },
  {
    id: 'edu-enrollment-proof',
    title: 'استخراج إثبات قيد دراسي موثق (مدارس وجامعة المنوفية)',
    titleEn: 'Verified Student Enrollment Proof (Menoufia Schools & Univ.)',
    category: 'educational',
    city: 'menoufia',
    icon: 'FileText',
    description: 'استخراج بيان قيد دراسي رسمي موجه للتجنيد، المعاشات، التأمين الصحي، أو السفر لطلاب جامعة المنوفية ومدارس شبين وقويسنا.',
    descriptionEn: 'Official student enrollment letter for military draft, pensions, or insurance for Menoufia University & Shebin/Quesna school students.',
    responsibleEntity: 'شؤون الطلاب - جامعة المنوفية & إدارتي شبين الكوم وقويسنا',
    responsibleEntityEn: 'Student Affairs - Menoufia Univ. & Shebin/Quesna Admin',
    fee: 85,
    estimatedDuration: '24 ساعة',
    estimatedDurationEn: '24 hours',
    courierSupported: true,
    digitalInstant: true,
    requiredDocuments: [
      { name: 'كارنيه الكلية أو المدرسة للعام الدراسي الحالي', nameEn: 'Current academic year student ID card', isMandatory: true },
      { name: 'بطاقة الرقم القومي أو شهادة الميلاد', nameEn: 'National ID or Birth Certificate', isMandatory: true },
      { name: 'تحديد الجهة الرسمية الموجه إليها البيان', nameEn: 'Designated recipient authority name', isMandatory: true }
    ],
    procedureSteps: [
      'تحديد الجهة الموجه إليها الخطاب ودفع رسوم الطوابع المقررة',
      'مراجعة القيد في سجلات شؤون الطلاب بالكلية أو المدرسة',
      'اعتماد الخطاب بختم شعار الجمهورية (لجهات التجنيد والمعاشات)',
      'استلام إثبات القيد أو توصيله لمحل السكن في شبين الكوم وقويسنا'
    ],
    procedureStepsEn: [
      'Specify destination institution and pay stamp duty',
      'Verify active enrollment in student registry',
      'Stamp document with official republic seal if required',
      'Pick up document or dispatch SKIP courier in Shebin/Quesna'
    ],
    conditions: ['انتظام قيد الطالب وسداد مصروفات العام الدراسي الجاري'],
    conditionsEn: ['Active enrollment and paid current-year tuition']
  },

  // --- HOUSING SERVICES (MENOUFIA) ---
  {
    id: 'house-social-housing',
    title: 'شقق الإسكان الاجتماعي بالمنوفية (قويسنا - شبين الكوم - السادات)',
    titleEn: 'Menoufia Social Housing Units (Quesna - Shebin - Sadat)',
    category: 'housing',
    city: 'menoufia',
    icon: 'Home',
    description: 'تجهيز ملفات حجز شقق الإسكان الاجتماعي والمتابعة الميدانية بمديرية الإسكان بالمنوفية لمشروعات قويسنا وشبين الكوم.',
    descriptionEn: 'Dossier preparation and application support for Menoufia Housing units in Quesna, Shebin El-Kom & New Sadat.',
    responsibleEntity: 'مديرية الإسكان والمرافق بالمنوفية وصندوق الإسكان الاجتماعي',
    responsibleEntityEn: 'Menoufia Housing Directorate & Social Housing Fund',
    fee: 350,
    estimatedDuration: 'حسب إعلانات الطرح وبرامج التمويل العقاري',
    estimatedDurationEn: 'According to housing advertisement & mortgage timeline',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية للزوج والزوجة', nameEn: 'Valid National IDs for applicant & spouse', isMandatory: true },
      { name: 'شهادة إثبات الدخل الشهري معتمدة + برنت تأمينات من مكتب شبين أو قويسنا', nameEn: 'Certified net income statement + Social Insurance printout', isMandatory: true },
      { name: 'قيد عائلي مميكن من الأحوال المدنية', nameEn: 'Computerized family record', isMandatory: true },
      { name: 'إيصال مرافق حديث + إيصال سداد جدية الحجز بالبريد', nameEn: 'Recent utility bill + Egypt Post reservation receipt', isMandatory: true }
    ],
    procedureSteps: [
      'شراء كراسة الشروط من مكاتب بريد شبين الكوم أو قويسنا الرئيسية',
      'تجهيز شهادة الدخل وبرنت التأمينات ومراجعتها قبل الرفع الرقمي',
      'رفع الملف بصيغة PDF موحدة عبر البوابة الإلكترونية للصندوق',
      'متابعة الاستعلام الميداني والتعاقد البنكي وتسليم الوحدة'
    ],
    procedureStepsEn: [
      'Purchase condition booklet from main Shebin El-Kom or Quesna Post Office',
      'Assemble income proof & insurance record and verify documents via SKIP',
      'Upload unified PDF packet on Social Housing portal',
      'Track field verification, bank financing & unit handover'
    ],
    conditions: ['من أبناء أو العاملين بمحافظة المنوفية وعدم سبق الحصول على وحدة مدعومة'],
    conditionsEn: ['Menoufia resident/worker with no prior subsidized state unit']
  },
  {
    id: 'house-utilities-menoufia',
    title: 'التعاقد على عدادات الكهرباء والمياه والغاز - شبين الكوم وقويسنا',
    titleEn: 'Electricity, Water & Gas Meters - Shebin El-Kom & Quesna',
    category: 'housing',
    city: 'menoufia',
    icon: 'SearchCheck',
    description: 'إجراءات التقديم على عدادات الكهرباء الكودية، اشتراكات شركة مياه الشرب بالمنوفية، وتوصيل الغاز الطبيعي للوحدات السكنية بقويسنا وشبين الكوم.',
    descriptionEn: 'Apply for prepaid electricity meters, Menoufia Water subscriptions, and natural gas installation in Quesna & Shebin El-Kom.',
    responsibleEntity: 'هندسة كهرباء شبين الكوم وقويسنا & شركة مياه المنوفية',
    responsibleEntityEn: 'Shebin & Quesna Electricity Networks & Menoufia Water Co.',
    fee: 150,
    estimatedDuration: '7 إلى 15 يوم عمل للمعاينة والتركيب',
    estimatedDurationEn: '7 to 15 business days for inspection & installation',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'صورة بطاقة الرقم القومي لصاحب الوحدة', nameEn: 'Owner National ID copy', isMandatory: true },
      { name: 'صورة عقد الملكية أو الإيجار الموثق أو نموذج التصالح', nameEn: 'Ownership/lease contract or building reconciliation form', isMandatory: true },
      { name: 'إيصال سداد المقايسة ورسوم المعاينة', nameEn: 'Inspection & assessment receipt', isMandatory: true },
      { name: 'موافقة الحي أو مجلس المدينة (حي شرق/غرب شبين الكوم أو مجلس مدينة قويسنا)', nameEn: 'Local Municipal approval (Shebin Districts or Quesna Council)', isMandatory: true }
    ],
    procedureSteps: [
      'استخراج خطاب المرافق أو رخصة المبنى من المركز التكنولوجي بشبين الكوم أو قويسنا',
      'تقديم ملف العداد بهندسة كهرباء شبين/قويسنا أو فرع شركة مياه المنوفية',
      'إجراء المعاينة الفنية للمبنى وسداد قيمة المقايسة الإلكترونية',
      'تركيب العداد الكودي وتفعيل الشحن الإلكتروني'
    ],
    procedureStepsEn: [
      'Obtain utility clearance from Shebin District or Quesna Municipal Tech Center',
      'Submit meter packet at local electricity or Menoufia Water branch',
      'Complete technical site visit and pay installation assessment',
      'Install smart/prepaid meter and activate electronic recharge'
    ],
    conditions: ['سلامة التوصيلات الداخلية وتوفر ملف تصالح أو ترخيص ساري للعقار'],
    conditionsEn: ['Valid building license or reconciliation request with safe wiring/pipes']
  },

  // --- HOSPITAL & HEALTH SERVICES IN SHEBIN EL-KOM & QUESNA ---
  {
    id: 'health-shebin-university-hospital',
    title: 'مستشفيات جامعة المنوفية بشبين الكوم (العيادات - الطوارئ - الجراحة)',
    titleEn: 'Menoufia University Hospitals (Shebin El-Kom) - Clinics & Surgery',
    category: 'health',
    city: 'shebin',
    icon: 'HeartPulse',
    description: 'حجز العيادات التخصصية (القلب، العظام، الجراحة، المخ والأعصاب، الباطنة، الأشعة) بمستشفى شبين الكوم الجامعي، وتجهيز ملف الدخول والعمليات بدون زحام.',
    descriptionEn: 'Outpatient clinics (Cardiology, Orthopedics, Surgery, Neurology, Radiology) & admission files at Menoufia University Hospital in Shebin El-Kom.',
    responsibleEntity: 'مستشفى شبين الكوم الجامعي - مستشفيات جامعة المنوفية',
    responsibleEntityEn: 'Menoufia University Hospitals - Shebin El-Kom',
    fee: 50,
    estimatedDuration: 'حجز وتجهيز ملف فوري · العيادات من 8:30 ص',
    estimatedDurationEn: 'Instant booking · Clinics open 8:30 AM (24/7 ER)',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'أصل بطاقة الرقم القومي للمريض أو شهادة الميلاد للأطفال', nameEn: 'Original Patient National ID or child birth certificate', isMandatory: true },
      { name: 'تذكرة الكشف أو خطاب التحويل الطبي / التأميني إن وجد', nameEn: 'Clinic ticket or medical/insurance referral letter if available', isMandatory: false },
      { name: 'أحدث التحاليل والأشعة والتقارير السابقة للمريض', nameEn: 'Latest lab tests, imaging and prior medical reports', isMandatory: false },
      { name: 'إقرار الدخول وموافقة المرافق (في حالات القسطرة والعمليات)', nameEn: 'Admission consent form (for surgeries/catheterization)', isMandatory: false }
    ],
    procedureSteps: [
      'معرفة التخصص ومواعيد العيادة بمبنى العيادات الخارجية بمستشفى شبين الكوم الجامعي',
      'تجهيز صورة البطاقة والتقارير السابقة وقطع تذكرة الكشف أو الحجز الإلكتروني',
      'إجراء الكشف مع الأطباء والاستشاريين وتحويل الحالات للأشعة أو المعامل المركزية',
      'إصدار التقرير الطبي الثلاثي أو حجز موعد الدخول للأقسام الداخلية'
    ],
    procedureStepsEn: [
      'Check specialty clinic schedule at Menoufia University Outpatient Building',
      'Prepare ID copy & prior scans and book clinic ticket',
      'Consult specialist physician and proceed to central labs/radiology if ordered',
      'Receive tripartite medical report or inpatient surgery admission schedule'
    ],
    conditions: ['مواعيد العيادات الصباحية من السبت للخميس 8:30 ص - 1:30 م، والطوارئ تعمل 24 ساعة'],
    conditionsEn: ['Outpatient clinics Sat–Thu 8:30 AM–1:30 PM; Emergency operates 24/7']
  },
  {
    id: 'health-liver-institute',
    title: 'معهد الكبد القومي بشبين الكوم (عيادات الكبد والمناظير والفحوصات)',
    titleEn: 'National Liver Institute (Shebin El-Kom) - Clinics & Endoscopy',
    category: 'health',
    city: 'shebin',
    icon: 'Stethoscope',
    description: 'تجهيز ملف المرضى وحجز الكشف والمناظير والأشعة التداخلية وصرف علاج الكبد والجهاز الهضمي بمعهد الكبد القومي بشبين الكوم (جامعة المنوفية).',
    descriptionEn: 'Patient file registration, hepatology consultations, endoscopy & radiology scheduling at National Liver Institute, Shebin El-Kom.',
    responsibleEntity: 'معهد الكبد القومي - جامعة المنوفية بشبين الكوم',
    responsibleEntityEn: 'National Liver Institute - Menoufia University (Shebin)',
    fee: 100,
    estimatedDuration: 'حجز فوري · نتائج الفحوصات خلال 24-48 ساعة',
    estimatedDurationEn: 'Instant booking · Test results in 24-48 hours',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية + صورتين منها لفتح ملف المعهد', nameEn: 'Valid National ID + 2 copies for Institute file', isMandatory: true },
      { name: 'تحاليل وظائف كبد حديثة وأشعة موجات صوتية / مقطعية إن وجدت', nameEn: 'Recent liver function panel & abdominal ultrasound/CT if done', isMandatory: true },
      { name: 'كارت المتابعة للمرضى القدامى بالمعهد أو قرار نفقة الدولة', nameEn: 'Existing patient follow-up card or state-funded decision', isMandatory: false }
    ],
    procedureSteps: [
      'فتح ملف طبي برقم موحد في شباك استقبال المرضى بمعهد الكبد القومي بشبين الكوم',
      'تحديد العيادة (كبد بالغين - كبد أطفال - مناظير - أورام كبد - زراعة كبد)',
      'عمل التحاليل والسونار التخصصي بالمعهد ومراجعتها مع الاستشاري',
      'إصدار روشتة العلاج أو استخراج خطاب العلاج على نفقة الدولة بالمعهد'
    ],
    procedureStepsEn: [
      'Open a unified patient file at National Liver Institute reception in Shebin El-Kom',
      'Select specialty clinic (Adult Hepatology, Pediatrics, Endoscopy, Liver Oncology)',
      'Complete on-site ultrasound/labs and review with hepatology consultant',
      'Obtain treatment prescription or state-funded therapy approval'
    ],
    conditions: ['يشترط الصيام 6–8 ساعات قبل فحوصات المناظير أو السونار البطني حسب إرشادات المعهد'],
    conditionsEn: ['6–8 hours fasting required prior to endoscopy or abdominal ultrasound']
  },
  {
    id: 'health-shebin-teaching-hospital',
    title: 'مستشفى شبين الكوم التعليمي (العيادات - الطوارئ - العمليات)',
    titleEn: 'Shebin El-Kom Teaching Hospital (Clinics - ER - Surgery)',
    category: 'health',
    city: 'shebin',
    icon: 'HeartPulse',
    description: 'حجز العيادات الخارجية بمستشفى شبين الكوم التعليمي (عيون، أنف وأذن، نساء وتوليد، جراحة، مسالك، أطفال) وإجراءات الحضّانات والطوارئ والتقارير الطبية.',
    descriptionEn: 'Outpatient clinics (ENT, Ophthalmology, OB-GYN, Urology, Pediatrics), NICU, ER & medical reports at Shebin El-Kom Teaching Hospital.',
    responsibleEntity: 'مستشفى شبين الكوم التعليمي - الهيئة العامة للمستشفيات التعليمية',
    responsibleEntityEn: 'Shebin El-Kom Teaching Hospital - General Teaching Hospitals Org.',
    fee: 40,
    estimatedDuration: 'كشف فوري (عيادات صباحية ومسائية)',
    estimatedDurationEn: 'Same-day visit (Morning & Evening clinics)',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية للمريض (أو شهادة ميلاد الطفل)', nameEn: 'Valid Patient National ID (or child birth cert)', isMandatory: true },
      { name: 'تذكرة العيادة الخارجية أو خطاب التأمين / نفقة الدولة', nameEn: 'Outpatient clinic ticket or insurance/state referral', isMandatory: false },
      { name: 'أوراق المتابعة أو الأشعة والتحاليل السابقة', nameEn: 'Prior follow-up slips, scans or lab results', isMandatory: false }
    ],
    procedureSteps: [
      'اختيار العيادة (صباحية من 8 ص إلى 2 م أو مسائية اقتصادية من 2 م إلى 6 م)',
      'سداد تذكرة الكشف بمجمع العيادات في مستشفى شبين الكوم التعليمي',
      'الكشف الطبي وإصدار طلب التحاليل أو تقرير طبي معتمد بختم المستشفى',
      'توصيل التقارير الطبية أو الأدوية للمنزل عبر خدمة SKIP عند الطلب'
    ],
    procedureStepsEn: [
      'Choose morning (8 AM–2 PM) or afternoon economic clinic (2 PM–6 PM)',
      'Settle clinic ticket at Shebin El-Kom Teaching Hospital outpatient gate',
      'See specialist doctor and receive lab orders or stamped medical report',
      'Request SKIP courier to deliver medical reports or medicines home'
    ],
    conditions: ['قسم الاستقبال والطوارئ والعمليات الحرجة بمستشفى شبين التعليمي يعمل 24 ساعة'],
    conditionsEn: ['Emergency reception and trauma surgery operate 24/7']
  },
  {
    id: 'health-shebin-hilal-insurance',
    title: 'مستشفى الهلال للتأمين الصحي بشبين الكوم (بطاقات، لجان وصرف علاج)',
    titleEn: 'El-Helal Health Insurance Hospital (Shebin El-Kom) - Clinics & Rx',
    category: 'health',
    city: 'shebin',
    icon: 'CreditCard',
    description: 'خدمات منتفعي التأمين الصحي بالمنوفية بمستشفى الهلال بشبين الكوم: تجديد البطاقة التأمينية، حجز اللجان الطبية المتخصصة، وإجراء العمليات وصرف العلاج الشهري.',
    descriptionEn: 'Menoufia Health Insurance services at El-Helal Hospital Shebin El-Kom: card renewal, medical committees, surgeries & monthly chronic Rx.',
    responsibleEntity: 'مستشفى الهلال للتأمين الصحي - فرع المنوفية (شبين الكوم)',
    responsibleEntityEn: 'El-Helal Health Insurance Hospital - Menoufia Branch (Shebin)',
    fee: 50,
    estimatedDuration: 'خلال 24 ساعة للتجديد · كشف فوري بالموعد',
    estimatedDurationEn: '24h for card renewal · Same-day scheduled clinic',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية + كارت/دفتر التأمين الصحي للمنتفع', nameEn: 'Valid National ID + Health Insurance booklet/card', isMandatory: true },
      { name: 'خطاب تحويل من عيادة التأمين الصحي التابعة (شبين أو قويسنا)', nameEn: 'Referral letter from local health insurance clinic (Shebin/Quesna)', isMandatory: true },
      { name: 'استمارة استكمال البيانات أو برنت التأمينات (للموظفين والمعاشات والطلبة)', nameEn: 'Insurance form or pension/student status printout', isMandatory: false },
      { name: 'صورة شخصية حديثة (عند استخراج أو تجديد الكارت)', nameEn: 'Recent personal photo (for card issuance/renewal)', isMandatory: false }
    ],
    procedureSteps: [
      'استخراج خطاب التحويل من عيادة التأمين الشاملة (عيادة قويسنا أو عيادة شبين الكوم)',
      'حجز موعد اللجنة أو العيادة التخصصية بمستشفى الهلال بشبين الكوم',
      'مناظرة الاستشاري واعتماد قرار صرف الدواء الشهري أو العملية مجاناً تحت مظلة التأمين',
      'صرف الدواء من صيدلية التأمين أو توصيله لمرضى قويسنا وشبين الكوم'
    ],
    procedureStepsEn: [
      'Obtain referral letter from Quesna or Shebin local health insurance clinic',
      'Schedule committee or specialist visit at El-Helal Hospital Shebin El-Kom',
      'Specialist review and approval for chronic refill or covered surgery',
      'Dispense medicine at insurance pharmacy or deliver to Quesna/Shebin home'
    ],
    conditions: ['التزام المنتفع بخطاب التحويل من عيادة الممارس العام التابع لها'],
    conditionsEn: ['Requires initial GP referral from registered insurance clinic']
  },
  {
    id: 'health-quesna-central-hospital',
    title: 'مستشفى قويسنا المركزي (العيادات - الغسيل الكلوي - الطوارئ - التقارير)',
    titleEn: 'Quesna Central Hospital (Clinics - Dialysis - ER - Reports)',
    category: 'health',
    city: 'quesna',
    icon: 'HeartPulse',
    description: 'حجز العيادات الخارجية بمستشفى قويسنا المركزي، خدمات الطوارئ، وحدة الغسيل الكلوي والحضّانات، واستخراج الشهادات الصحية والتقرير الثلاثي لأهالي قويسنا.',
    descriptionEn: 'Outpatient clinics, 24/7 ER, dialysis unit, NICU, food/work health certificates & tripartite reports at Quesna Central Hospital.',
    responsibleEntity: 'مستشفى قويسنا المركزي - مديرية الشؤون الصحية بالمنوفية',
    responsibleEntityEn: 'Quesna Central Hospital - Menoufia Health Directorate',
    fee: 30,
    estimatedDuration: 'كشف فوري · الشهادات الصحية خلال 24 ساعة',
    estimatedDurationEn: 'Same-day consultation · Health certs in 24 hours',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي سارية لمقدم الطلب أو المريض', nameEn: 'Valid National ID of patient/applicant', isMandatory: true },
      { name: 'عدد 2 صورة شخصية 4×6 (لاستخراج الشهادة الصحية للعمل أو المصانع بقويسنا)', nameEn: '2 Personal 4x6 photos (for work/factory health certificate)', isMandatory: false },
      { name: 'التقارير الطبية أو التحاليل السابقة (للمتابعة ووحدة الغسيل الكلوي)', nameEn: 'Prior reports or labs (for follow-up & dialysis unit)', isMandatory: false }
    ],
    procedureSteps: [
      'التوجه لشباك التذاكر بمستشفى قويسنا المركزي بشارع بورسعيد أو الحجز عبر SKIP',
      'إجراء الكشف الطبي بالعيادات (باطنة، أطفال، جراحة، عظام، أسنان، نساء، رمد)',
      'في حالة استخراج التقرير الثلاثي لعلاج نفقة الدولة: توقيع 3 أطباء أخصائيين وختم المستشفى',
      'استلام التقرير أو الشهادة الصحية معتمدة ومختومة بختم مستشفى قويسنا المركزي'
    ],
    procedureStepsEn: [
      'Get outpatient ticket at Quesna Central Hospital (Port Said St.) or prep dossier via SKIP',
      'Consult specialists across Internal Med, Pediatrics, Surgery, Ortho, Dental, OB-GYN or Eye',
      'For state-funded treatment: obtain 3 specialist signatures on tripartite report',
      'Collect officially stamped medical report or health clearance certificate'
    ],
    conditions: ['قسم الاستقبال والطوارئ والولادة بمستشفى قويسنا المركزي يعمل 24 ساعة يومياً'],
    conditionsEn: ['Quesna Central Hospital ER & emergency maternity unit operate 24/7']
  },
  {
    id: 'health-quesna-insurance-clinic',
    title: 'عيادة قويسنا الشاملة للتأمين الصحي والمركز الطبي بقويسنا',
    titleEn: 'Quesna Health Insurance Polyclinic & Medical Center',
    category: 'health',
    city: 'quesna',
    icon: 'Stethoscope',
    description: 'تقديم خدمات الممارس العام، تحويلات مستشفى الهلال بشبين الكوم، صرف أدوية الأمراض المزمنة، تطعيمات المواليد، واعتماد الشهادات المدرسية بعيادة قويسنا.',
    descriptionEn: 'GP checkups, referrals to El-Helal Shebin Hospital, chronic medication refills, child immunizations & school health certs in Quesna.',
    responsibleEntity: 'عيادة قويسنا للتأمين الصحي والمركز الطبي العام بقويسنا',
    responsibleEntityEn: 'Quesna Comprehensive Health Insurance Clinic & Medical Center',
    fee: 20,
    estimatedDuration: 'خلال نفس اليوم (من 8 ص إلى 2 م)',
    estimatedDurationEn: 'Same-day service (8 AM to 2 PM)',
    courierSupported: true,
    digitalInstant: true,
    requiredDocuments: [
      { name: 'كارت أو دفتر التأمين الصحي للمريض أو الطالب', nameEn: 'Patient or student Health Insurance card/booklet', isMandatory: true },
      { name: 'بطاقة الرقم القومي أو شهادة الميلاد المميكنة', nameEn: 'National ID or computerized birth certificate', isMandatory: true },
      { name: 'كارت المتابعة وتكرار صرف العلاج الشهري (لأصحاب الأمراض المزمنة)', nameEn: 'Chronic medication refill follow-up card', isMandatory: false }
    ],
    procedureSteps: [
      'إبراز بطاقة التأمين الصحي في شباك الاستقبال بعيادة قويسنا الشاملة',
      'توقيع الكشف عند طبيب الأسرة أو الأخصائي وتحديد الدواء أو التحويل لمستشفى الهلال بشبين',
      'ختم دفتر التأمين أو البطاقة الصحية للمدارس وإصدار إذن صرف الدواء',
      'استلام الأدوية من صيدلية التأمين بقويسنا أو طلب توصيلها بالمندوب'
    ],
    procedureStepsEn: [
      'Present Health Insurance ID at Quesna Polyclinic reception counter',
      'Complete GP/specialist checkup and get Rx or referral to El-Helal Hospital Shebin',
      'Stamp school health booklet or approve chronic refill prescription',
      'Pick up medication at Quesna Insurance pharmacy or request SKIP delivery'
    ],
    conditions: ['مخصصة لأهالي مركز قويسنا المقيدين بالتأمين الصحي والطلبة والمعاشات'],
    conditionsEn: ['Dedicated to Quesna residents, students & pensioners under Health Insurance']
  },
  {
    id: 'health-state-treatment',
    title: 'استخراج وتجديد قرار العلاج على نفقة الدولة - المجالس الطبية بالمنوفية',
    titleEn: 'State-Funded Medical Treatment Decision - Menoufia Medical Councils',
    category: 'health',
    city: 'menoufia',
    icon: 'HeartPulse',
    description: 'تقديم التقارير الثلاثية من مستشفى شبين الكوم الجامعي أو التعليمي أو مستشفى قويسنا المركزي لإصدار وتجديد قرارات العلاج والعمليات مجاناً على نفقة الدولة.',
    descriptionEn: 'Process tripartite medical reports from Shebin University/Teaching Hospitals or Quesna Central Hospital for free state-funded treatment.',
    responsibleEntity: 'إدارة العلاج على نفقة الدولة بالمنوفية - المجالس الطبية المتخصصة',
    responsibleEntityEn: 'Menoufia State-Funded Treatment Dept. - Specialized Medical Councils',
    fee: 0,
    estimatedDuration: '48 إلى 72 ساعة',
    estimatedDurationEn: '48 to 72 hours',
    courierSupported: true,
    digitalInstant: false,
    popular: true,
    requiredDocuments: [
      { name: 'بطاقة الرقم القومي للمريض سارية (أصل + صورتين)', nameEn: 'Valid National ID of the patient (Original + 2 copies)', isMandatory: true },
      { name: 'تقرير طبي ثلاثي مختوم من مستشفى شبين الجامعي/التعليمي أو مستشفى قويسنا المركزي', nameEn: 'Stamped tripartite report from Shebin Univ./Teaching or Quesna Central Hospital', isMandatory: true },
      { name: 'أحدث التحاليل والأشعة الطبية المؤيدة للحالة المرضية', nameEn: 'Latest lab tests and diagnostic imaging supporting diagnosis', isMandatory: true },
      { name: 'بيان تأمينات أو إقرار عدم الخضوع لمظلة التأمين الصحي', nameEn: 'Statement proving no duplicate health insurance coverage', isMandatory: true }
    ],
    procedureSteps: [
      'استخراج التقرير الطبي الثلاثي من مستشفى قويسنا المركزي أو مستشفى شبين الكوم الجامعي/التعليمي',
      'رفع البيانات بوحدة نفقة الدولة داخل المستشفى وربطها بالشبكة القومية للمجالس الطبية',
      'متابعة صدور القرار خلال 48 ساعة وإخطار المريض برسالة نصية',
      'صرف العلاج أو تحديد موعد العملية بالمستشفى التابع له القرار في المنوفية'
    ],
    procedureStepsEn: [
      'Obtain tripartite medical report at Quesna Central or Shebin University/Teaching Hospital',
      'Submit packet at the hospital State-Treatment office for electronic linkage',
      'Receive automated decision notification within 48 hours',
      'Dispense medication or schedule covered surgery at designated Menoufia hospital'
    ],
    conditions: ['أن يكون المواطن مصري الجنسية وغير خاضع لتغطية تأمينية لنفس العلاج'],
    conditionsEn: ['Egyptian citizen not covered by alternative insurance for the same therapy']
  },
  {
    id: 'health-medicine-delivery',
    title: 'صرف وتوصيل الأدوية للبيت في شبين الكوم وقويسنا',
    titleEn: 'Medicine Dispensing & Home Delivery (Shebin El-Kom & Quesna)',
    category: 'health',
    city: 'menoufia',
    icon: 'Pill',
    description: 'تصوير الروشتة الطبية أو إرسال كارت العلاج الشهري لصرف الأدوية من الصيدليات المعتمدة في شبين الكوم وقويسنا وتوصيلها لباب المنزل عبر مندوب SKIP.',
    descriptionEn: 'Upload prescription or monthly refill card to dispense medicine from certified pharmacies in Shebin El-Kom & Quesna with doorstep delivery.',
    responsibleEntity: 'شبكة صيدليات شبين الكوم وقويسنا المعتمدة',
    responsibleEntityEn: 'Certified Shebin El-Kom & Quesna Pharmacy Network',
    fee: 65,
    estimatedDuration: '45 إلى 90 دقيقة داخل شبين وقويسنا',
    estimatedDurationEn: '45 to 90 mins within Shebin El-Kom & Quesna',
    courierSupported: true,
    digitalInstant: true,
    popular: true,
    requiredDocuments: [
      { name: 'صورة الروشتة الطبية سارية من الطبيب المعالج أو كارت صرف الدواء', nameEn: 'Valid Doctor Prescription photo or chronic refill card', isMandatory: true },
      { name: 'العنوان التفصيلي في شبين الكوم أو قويسنا أو القرى التابعة ورقم الهاتف', nameEn: 'Detailed address in Shebin El-Kom or Quesna and phone number', isMandatory: true }
    ],
    procedureSteps: [
      'تصوير الروشتة أو كتابة أسماء الأدوية المطلوبة',
      'مراجعة الصيدلي وتأكيد توفر الأدوية والبدائل الآمنة والجرعات',
      'تأكيد الفاتورة والدفع عند الاستلام أو إلكترونياً',
      'توصيل العبوة مغلقة عبر مندوب SKIP داخل شبين الكوم وقويسنا'
    ],
    procedureStepsEn: [
      'Upload prescription photo or list requested medicines',
      'Licensed pharmacist validates doses and confirms availability',
      'Confirm invoice and choose Cash on Delivery or electronic payment',
      'SKIP courier delivers sealed pack directly to your home in Shebin or Quesna'
    ],
    conditions: ['أدوية الجدول والرقابة تتطلب تسليم أصل الروشتة المختومة للمندوب'],
    conditionsEn: ['Controlled prescriptions require handing over original stamped script']
  },
  {
    id: 'health-medical-reports',
    title: 'اعتماد التقارير الطبية والقومسيون الطبي العام بالمنوفية',
    titleEn: 'Medical Reports & Menoufia General Medical Commission',
    category: 'health',
    city: 'shebin',
    icon: 'FileText',
    description: 'اعتماد الإجازات المرضية للموظفين، الكشف الطبي لتجديد رخص القيادة والوظائف الحكومية، ولجان تكافل وكرامة/كارت الخدمات المتكاملة بالقومسيون الطبي بشبين الكوم.',
    descriptionEn: 'Certify sick leaves, driving/employment medical exams, and disability committees at Menoufia Medical Commission in Shebin El-Kom.',
    responsibleEntity: 'المجلس الطبي العام (القومسيون الطبي) - شبين الكوم، المنوفية',
    responsibleEntityEn: 'Menoufia General Medical Commission - Shebin El-Kom',
    fee: 75,
    estimatedDuration: 'خلال يوم عمل واحد',
    estimatedDurationEn: 'Within 1 business day',
    courierSupported: true,
    digitalInstant: false,
    requiredDocuments: [
      { name: 'أصل التقرير الطبي أو تذكرة المستشفى مختومة (من مستشفى قويسنا أو شبين)', nameEn: 'Original hospital report stamped by Quesna or Shebin hospital', isMandatory: true },
      { name: 'بطاقة الرقم القومي سارية للمواطن', nameEn: 'Valid National ID', isMandatory: true },
      { name: 'خطاب موجه من جهة العمل أو إدارة المرور أو الموارد البشرية', nameEn: 'Official referral letter from employer or Traffic Dept.', isMandatory: false }
    ],
    procedureSteps: [
      'حجز موعد اللجنة الطبية إلكترونياً وتحديد الغرض (إجازة مرضية / رخصة / وظيفة)',
      'مراجعة أصل التقرير الطبي وإقرار المستشفى قبل التوجه للجنة بشبين الكوم',
      'عرض المستندات والكشف أمام اللجنة الطبية بالقومسيون العام',
      'اعتماد الشهادة بختم النسر واستلامها أو توصيلها عبر مندوب SKIP'
    ],
    procedureStepsEn: [
      'Pre-schedule committee type (Sick leave / Driving / Employment)',
      'Verify original hospital report and referral letter before visiting',
      'Attend commission review at Shebin El-Kom Medical Commission',
      'Collect stamped official certificate or arrange SKIP delivery'
    ],
    conditions: ['تقديم خطاب الإجازة المرضية خلال 48 ساعة من صدوره واعتماده من المستشفى'],
    conditionsEn: ['Submit sick leave certificate within 48 hours of hospital issuance']
  }
];

// Interactive Map Offices & Hospitals (Menoufia: Shebin El-Kom & Quesna)
export const SERVICE_OFFICES: ServiceOffice[] = [
  {
    id: 'off-shebin-passports',
    name: 'قسم جوازات شبين الكوم - مصلحة الجوازات والهجرة',
    nameEn: 'Shebin El-Kom Passports & Emigration Office',
    category: 'government',
    city: 'shebin',
    address: 'شارع جمال عبد الناصر، بجوار مديرية الأمن، البر الشرقي، شبين الكوم',
    addressEn: 'Gamal Abdel Nasser St., next to Security Directorate, Shebin El-Kom',
    coords: { x: 35, y: 36 },
    phone: '048-2321450',
    workingHours: '8:00 ص - 2:30 م (يومياً عدا الجمعة)',
    workingHoursEn: '8:00 AM - 2:30 PM (Daily except Friday)',
    currentWaitTimeMin: 22,
    servicesAvailable: ['استخراج جواز سفر لأول مرة', 'تجديد جواز السفر المنتهي', 'شهادات التحركات بالمنوفية'],
    rating: 4.5
  },
  {
    id: 'off-shebin-civil',
    name: 'السجل المدني الرئيسي والأحوال المدنية بالمنوفية (شبين الكوم)',
    nameEn: 'Menoufia Central Civil Registry Hub (Shebin El-Kom)',
    category: 'government',
    city: 'shebin',
    address: 'شارع طلعت حرب، الحي الغربي، شبين الكوم، المنوفية',
    addressEn: 'Talaat Harb St., West District, Shebin El-Kom, Menoufia',
    coords: { x: 22, y: 42 },
    phone: '15340',
    workingHours: '8:00 ص - 3:00 م (فترة مسائية حتى 8 م للـ VIP)',
    workingHoursEn: '8:00 AM - 3:00 PM (Evening till 8 PM)',
    currentWaitTimeMin: 15,
    servicesAvailable: ['بطاقة الرقم القومي العادية والمستعجلة', 'قيد عائلي مميكن', 'شهادات الميلاد والوفاة'],
    rating: 4.6
  },
  {
    id: 'off-shebin-traffic',
    name: 'إدارة مرور المنوفية - وحدة مرور شبين الكوم',
    nameEn: 'Menoufia Traffic HQ - Shebin El-Kom Unit',
    category: 'government',
    city: 'shebin',
    address: 'طريق شبين الكوم - الباجور، منطقة المصانع، شبين الكوم',
    addressEn: 'Shebin El-Kom - El Bagour Rd., Industrial Area, Shebin El-Kom',
    coords: { x: 30, y: 74 },
    phone: '048-2226180',
    workingHours: '8:00 ص - 3:00 م',
    workingHoursEn: '8:00 AM - 3:00 PM',
    currentWaitTimeMin: 28,
    servicesAvailable: ['تجديد رخص السيارات الملاكي', 'الفحص الفني والملصق الإلكتروني', 'رخص القيادة بالمنوفية'],
    rating: 4.3
  },
  {
    id: 'off-quesna-municipal',
    name: 'المركز التكنولوجي بمجلس مدينة قويسنا والشهر العقاري',
    nameEn: 'Quesna City Council Tech Center & Notary Office',
    category: 'government',
    city: 'quesna',
    address: 'شارع الجيش، وسط مدينة قويسنا، المنوفية',
    addressEn: 'El-Geish St., Downtown Quesna, Menoufia',
    coords: { x: 73, y: 44 },
    phone: '048-2573100',
    workingHours: '8:30 ص - 2:30 م (الأحد إلى الخميس)',
    workingHoursEn: '8:30 AM - 2:30 PM (Sun - Thu)',
    currentWaitTimeMin: 16,
    servicesAvailable: ['تراخيص البناء والتصالح', 'توثيق الشهر العقاري والتوكيلات', 'تراخيص المحال وخدمات التموين'],
    rating: 4.4
  },
  {
    id: 'off-quesna-traffic',
    name: 'وحدة مرور قويسنا وسجل مدني قويسنا',
    nameEn: 'Quesna Traffic Unit & Quesna Civil Registry',
    category: 'government',
    city: 'quesna',
    address: 'طريق قويسنا - شبين الكوم، بجوار المركز الطبي، قويسنا',
    addressEn: 'Quesna - Shebin Rd., near Medical Center, Quesna',
    coords: { x: 64, y: 55 },
    phone: '048-2574290',
    workingHours: '8:00 ص - 2:30 م',
    workingHoursEn: '8:00 AM - 2:30 PM',
    currentWaitTimeMin: 19,
    servicesAvailable: ['ترخيص السيارات والموتوسيكلات', 'الفحص الفني بقويسنا', 'الفيش المميكن والبطاقة'],
    rating: 4.5
  },
  {
    id: 'off-menoufia-univ',
    name: 'جامعة المنوفية - مجمع الكليات وإدارة الخريجين (شبين الكوم)',
    nameEn: 'Menoufia University - Central Campus & Alumni (Shebin El-Kom)',
    category: 'educational',
    city: 'shebin',
    address: 'شارع جمال عبد الناصر، البر الشرقي، شبين الكوم، المنوفية',
    addressEn: 'Gamal Abdel Nasser St., Eastern Bank, Shebin El-Kom',
    coords: { x: 40, y: 27 },
    phone: '048-2224155',
    workingHours: '8:30 ص - 2:30 م',
    workingHoursEn: '8:30 AM - 2:30 PM',
    currentWaitTimeMin: 24,
    servicesAvailable: ['قيد الطلاب الجدد والتنسيق', 'شهادات التخرج وبيان الدرجات', 'إثبات القيد الموثق'],
    rating: 4.5
  },
  {
    id: 'off-shebin-housing',
    name: 'مديرية الإسكان والمرافق بالمنوفية - حي شرق شبين الكوم',
    nameEn: 'Menoufia Housing Directorate - East Shebin El-Kom',
    category: 'housing',
    city: 'shebin',
    address: 'ميدان شرف / شارع سعد زغلول، شبين الكوم، المنوفية',
    addressEn: 'Sharaf Sq. / Saad Zaghloul St., Shebin El-Kom',
    coords: { x: 26, y: 60 },
    phone: '048-2221904',
    workingHours: '8:30 ص - 2:30 م',
    workingHoursEn: '8:30 AM - 2:30 PM',
    currentWaitTimeMin: 20,
    servicesAvailable: ['ملفات الإسكان الاجتماعي', 'معاينات العدادات والمرافق', 'اعتماد الرسومات التخطيطية'],
    rating: 4.2
  },
  {
    id: 'off-shebin-univ-hosp',
    name: 'مستشفيات جامعة المنوفية (المستشفى الجامعي بشبين الكوم)',
    nameEn: 'Menoufia University Hospitals (Shebin El-Kom)',
    category: 'health',
    city: 'shebin',
    address: 'شارع جمال عبد الناصر، مجمع الكليات الطبية، شبين الكوم',
    addressEn: 'Gamal Abdel Nasser St., Medical Complex, Shebin El-Kom',
    coords: { x: 37, y: 48 },
    phone: '048-2228301',
    workingHours: 'طوارئ 24 ساعة - العيادات الخارجية 8:30 ص - 1:30 م',
    workingHoursEn: '24/7 Emergency - Outpatient 8:30 AM - 1:30 PM',
    currentWaitTimeMin: 20,
    servicesAvailable: ['العيادات الخارجية والاستشاريين', 'الطوارئ والعمليات الكبرى', 'التقرير الطبي الثلاثي ونفقة الدولة'],
    rating: 4.6
  },
  {
    id: 'off-shebin-liver',
    name: 'معهد الكبد القومي - جامعة المنوفية (شبين الكوم)',
    nameEn: 'National Liver Institute - Menoufia Univ. (Shebin El-Kom)',
    category: 'health',
    city: 'shebin',
    address: 'شارع جمال عبد الناصر، بجوار المستشفى الجامعي، شبين الكوم',
    addressEn: 'Gamal Abdel Nasser St., next to Univ. Hospital, Shebin El-Kom',
    coords: { x: 43, y: 39 },
    phone: '048-2222740',
    workingHours: '8:00 ص - 3:00 م (الطوارئ 24 ساعة)',
    workingHoursEn: '8:00 AM - 3:00 PM (24/7 ER)',
    currentWaitTimeMin: 18,
    servicesAvailable: ['عيادات أمراض الكبد والجهاز الهضمي', 'وحدة المناظير والأشعة التداخلية', 'صرف علاج الكبد بالمنوفية'],
    rating: 4.8
  },
  {
    id: 'off-shebin-teaching-hosp',
    name: 'مستشفى شبين الكوم التعليمي',
    nameEn: 'Shebin El-Kom Teaching Hospital',
    category: 'health',
    city: 'shebin',
    address: 'شارع جمال عبد الناصر، أمام كلية الهندسة، شبين الكوم',
    addressEn: 'Gamal Abdel Nasser St., opposite Faculty of Engineering, Shebin El-Kom',
    coords: { x: 45, y: 63 },
    phone: '048-2321985',
    workingHours: 'طوارئ 24 ساعة - العيادات الصباحية والمسائية 8 ص - 6 م',
    workingHoursEn: '24/7 ER - Morning & Evening Clinics 8 AM - 6 PM',
    currentWaitTimeMin: 15,
    servicesAvailable: ['عيادات الرمد والأنف والأذن والنساء', 'الحضّانات والعمليات الجراحية', 'توثيق التقارير الطبية'],
    rating: 4.5
  },
  {
    id: 'off-shebin-hilal-hosp',
    name: 'مستشفى الهلال للتأمين الصحي بشبين الكوم',
    nameEn: 'El-Helal Health Insurance Hospital (Shebin El-Kom)',
    category: 'health',
    city: 'shebin',
    address: 'الحي الغربي، بجوار محطة السكة الحديد، شبين الكوم',
    addressEn: 'West District, near Railway Station, Shebin El-Kom',
    coords: { x: 18, y: 54 },
    phone: '048-2226410',
    workingHours: '8:00 ص - 4:00 م (طوارئ التأمين 24 ساعة)',
    workingHoursEn: '8:00 AM - 4:00 PM (24/7 Insurance ER)',
    currentWaitTimeMin: 14,
    servicesAvailable: ['لجان التأمين الصحي بالمنوفية', 'تجديد بطاقات التأمين', 'عمليات وصرف أدوية المنتفعين'],
    rating: 4.4
  },
  {
    id: 'off-quesna-central-hosp',
    name: 'مستشفى قويسنا المركزي',
    nameEn: 'Quesna Central Hospital',
    category: 'health',
    city: 'quesna',
    address: 'شارع بورسعيد، وسط مدينة قويسنا، المنوفية',
    addressEn: 'Port Said St., Downtown Quesna, Menoufia',
    coords: { x: 78, y: 29 },
    phone: '048-2573220',
    workingHours: 'طوارئ 24 ساعة - العيادات 8:00 ص - 2:00 م',
    workingHoursEn: '24/7 Emergency - Clinics 8:00 AM - 2:00 PM',
    currentWaitTimeMin: 17,
    servicesAvailable: ['العيادات الخارجية والغسيل الكلوي', 'الطوارئ والحضّانات', 'الشهادات الصحية والتقرير الثلاثي'],
    rating: 4.5
  },
  {
    id: 'off-quesna-insurance',
    name: 'عيادة قويسنا الشاملة للتأمين الصحي والمركز الطبي',
    nameEn: 'Quesna Health Insurance Polyclinic & Medical Center',
    category: 'health',
    city: 'quesna',
    address: 'شارع المحطة، بجوار مزلقان قويسنا، المنوفية',
    addressEn: 'Station St., Downtown Quesna, Menoufia',
    coords: { x: 84, y: 62 },
    phone: '048-2575118',
    workingHours: '8:00 ص - 2:00 م (يومياً عدا الجمعة)',
    workingHoursEn: '8:00 AM - 2:00 PM (Daily except Friday)',
    currentWaitTimeMin: 12,
    servicesAvailable: ['تحويلات مستشفى الهلال بشبين', 'صرف أدوية الأمراض المزمنة', 'اعتماد الشهادات الصحية للطلبة'],
    rating: 4.4
  }
];

// Document Expiry Alerts
export const INITIAL_EXPIRY_ALERTS: DocumentExpiryItem[] = [
  {
    id: 'alert-1',
    title: 'بطاقة الرقم القومي المصرية (سجل مدني شبين الكوم)',
    titleEn: 'Egyptian National ID Card (Shebin El-Kom Civil Office)',
    documentNumber: '29510141701872',
    holderName: 'محمد أحمد إبراهيم سليم',
    expiryDate: '2026-11-20',
    daysRemaining: 21,
    status: 'expiring_soon',
    renewServiceId: 'gov-national-id'
  },
  {
    id: 'alert-2',
    title: 'جواز السفر المصري المميكن (جوازات شبين الكوم)',
    titleEn: 'Egyptian Passport (Shebin El-Kom Passports Dept.)',
    documentNumber: 'A28941092',
    holderName: 'محمد أحمد إبراهيم سليم',
    expiryDate: '2026-12-15',
    daysRemaining: 46,
    status: 'expiring_soon',
    renewServiceId: 'gov-passport-renew'
  },
  {
    id: 'alert-3',
    title: 'رخصة قيادة خاصة ملاكي (مرور المنوفية)',
    titleEn: 'Private Driving License (Menoufia Traffic)',
    documentNumber: 'DL-8492019',
    holderName: 'محمد أحمد إبراهيم سليم',
    expiryDate: '2027-08-10',
    daysRemaining: 284,
    status: 'valid',
    renewServiceId: 'gov-vehicle-license'
  }
];

// Central Patient Medical Records (Menoufia Hospitals)
export const INITIAL_MEDICAL_RECORDS: MedicalRecordItem[] = [
  {
    id: 'med-01',
    patientName: 'محمد أحمد إبراهيم سليم',
    nationalId: '29510141701872',
    bloodType: 'O+ موجب',
    date: '2026-10-18',
    doctorName: 'أ.د. حازم النجار',
    doctorNameEn: 'Prof. Dr. Hazem El Naggar',
    specialty: 'استشاري أمراض القلب والأوعية الدموية',
    specialtyEn: 'Cardiology & Vascular Consultant',
    hospital: 'مستشفى شبين الكوم الجامعي (جامعة المنوفية) - وحدة القلب',
    hospitalEn: 'Menoufia University Hospital (Shebin El-Kom) - Cardiology',
    diagnosis: 'ارتفاع ضغط الدم الشرياني الخفيف مع متابعة دورية منتظمة',
    diagnosisEn: 'Mild arterial hypertension with scheduled follow-up',
    prescriptions: [
      { medicineName: 'كونكور 5 مجم (Concor 5mg)', dosage: 'قرص واحد صباحاً يومياً بعد الإفطار', duration: 'لمدة شهر', deliveryAvailable: true },
      { medicineName: 'أسبوسيد 75 مجم أطفال (Aspocid 75mg)', dosage: 'قرص واحد للمضغ بعد الغداء', duration: 'لمدة 3 أشهر', deliveryAvailable: true },
      { medicineName: 'أوميجا 3 بلس كبسولات', dosage: 'كبسولة واحدة مساءً', duration: 'لمدة شهرين', deliveryAvailable: true }
    ],
    labTests: [
      { name: 'تحليل دهون الدم الشامل (Lipid Profile)', result: 'الكوليسترول الكلي: 185 mg/dL', referenceRange: 'أقل من 200 mg/dL', status: 'normal' },
      { name: 'سكر الدم التراكمي (HbA1c)', result: '5.4 %', referenceRange: '4.0 - 5.6 %', status: 'normal' },
      { name: 'وظائف كلى (سيروم كرياتينين)', result: '0.9 mg/dL', referenceRange: '0.7 - 1.2 mg/dL', status: 'normal' }
    ],
    shareToken: 'SKIP-MNF-49102-SECURE'
  },
  {
    id: 'med-02',
    patientName: 'محمد أحمد إبراهيم سليم',
    nationalId: '29510141701872',
    bloodType: 'O+ موجب',
    date: '2026-08-04',
    doctorName: 'د. ياسمين الشاذلي',
    doctorNameEn: 'Dr. Yasmine El Shazly',
    specialty: 'استشاري الجهاز الهضمي والكبد',
    specialtyEn: 'Gastroenterology & Hepatology Consultant',
    hospital: 'معهد الكبد القومي بشبين الكوم - جامعة المنوفية',
    hospitalEn: 'National Liver Institute - Shebin El-Kom',
    diagnosis: 'التهاب معدة بسيط مع نتائج وظائف كبد طبيعية تماماً',
    diagnosisEn: 'Mild gastritis with completely normal liver panel',
    prescriptions: [
      { medicineName: 'كونترولوك 40 مجم (Controloc 40mg)', dosage: 'قرص واحد قبل الإفطار بنصف ساعة', duration: 'لمدة 3 أسابيع', deliveryAvailable: true },
      { medicineName: 'جافيسكون شراب (Gaviscon)', dosage: 'ملعقة كبيرة بعد الوجبات وعند اللزوم', duration: 'عند اللزوم', deliveryAvailable: true }
    ],
    labTests: [
      { name: 'إنزيمات ووظائف الكبد (ALT / AST)', result: 'ALT: 22 U/L · AST: 20 U/L', referenceRange: 'أقل من 40 U/L', status: 'normal' },
      { name: 'أشعة سونار البطن والكبد', result: 'حجم وشكل طبيعي للكبد', referenceRange: 'طبيعي', status: 'normal' }
    ],
    shareToken: 'SKIP-MNF-18290-SECURE'
  },
  {
    id: 'med-03',
    patientName: 'محمد أحمد إبراهيم سليم',
    nationalId: '29510141701872',
    bloodType: 'O+ موجب',
    date: '2026-06-12',
    doctorName: 'د. كريم عبد الفتاح',
    doctorNameEn: 'Dr. Karim Abdel Fattah',
    specialty: 'أخصائي طب وجراحة العيون',
    specialtyEn: 'Ophthalmology Specialist',
    hospital: 'مستشفى قويسنا المركزي - عيادة الرمد',
    hospitalEn: 'Quesna Central Hospital - Ophthalmology Clinic',
    diagnosis: 'جفاف بسيط بالقرنية وإجهاد رقمي نتيجة الشاشات',
    diagnosisEn: 'Mild corneal dryness and digital eye strain',
    prescriptions: [
      { medicineName: 'سيستان ألترا قطرة مرطبة (Systane Ultra)', dosage: 'نقطة بكل عين 3 مرات يومياً', duration: 'عند اللزوم', deliveryAvailable: true }
    ],
    labTests: [
      { name: 'قياس حدة الإبصار (Visual Acuity)', result: '6/6 بالعينين بعد التصحيح', referenceRange: '6/6', status: 'normal' },
      { name: 'قياس ضغط العين (Tonometry)', result: '14 mmHg', referenceRange: '10 - 21 mmHg', status: 'normal' }
    ],
    shareToken: 'SKIP-QSN-33410-SECURE'
  }
];

export const UPCOMING_APPOINTMENTS: DoctorAppointment[] = [
  {
    id: 'apt-1',
    doctorId: 'doc-01',
    doctorName: 'أ.د. طارق الشربيني',
    doctorNameEn: 'Prof. Dr. Tarek El Sherbini',
    specialty: 'استشاري جراحة العظام والمفاصل والعمود الفقري',
    specialtyEn: 'Orthopedics & Spine Surgery Consultant',
    hospital: 'مستشفى شبين الكوم التعليمي - العيادات الخارجية',
    hospitalEn: 'Shebin El-Kom Teaching Hospital - Clinics',
    date: '2026-11-04',
    timeSlot: '11:30 ص',
    fee: 100,
    status: 'upcoming',
    telehealthAvailable: true
  },
  {
    id: 'apt-2',
    doctorId: 'doc-02',
    doctorName: 'د. حسام البنا',
    doctorNameEn: 'Dr. Hossam El Banna',
    specialty: 'استشاري الباطنة العامة ومتابعة الأمراض المزمنة',
    specialtyEn: 'Internal Medicine & Chronic Care Consultant',
    hospital: 'مستشفى قويسنا المركزي - العيادة التخصصية',
    hospitalEn: 'Quesna Central Hospital - Specialist Clinic',
    date: '2026-11-07',
    timeSlot: '10:00 ص',
    fee: 80,
    status: 'upcoming',
    telehealthAvailable: true
  }
];

// Seed Active User Requests in Menoufia (Shebin El-Kom & Quesna)
export const INITIAL_USER_REQUESTS: UserRequest[] = [
  {
    id: 'req-8921',
    serviceId: 'gov-passport-renew',
    serviceTitle: 'تجديد جواز السفر المنتهي - جوازات شبين الكوم',
    serviceTitleEn: 'Passport Renewal - Shebin El-Kom Office',
    category: 'government',
    referenceNumber: 'SKP-2026-89210',
    status: 'delegate_assigned',
    createdAt: '2026-10-29 14:20',
    fee: 950,
    paymentMethod: 'instapay',
    paymentStatus: 'paid',
    applicantName: 'محمد أحمد إبراهيم سليم',
    applicantPhone: '01098765432',
    nationalId: '29510141701872',
    address: 'شارع جمال عبد الناصر، البر الشرقي، شبين الكوم، المنوفية',
    courierRequested: true,
    courierName: 'كابتن أحمد سامي (مندوب شبين الكوم)',
    courierPhone: '01123456789',
    estimatedCompletion: 'غداً 31 أكتوبر - 02:00 م',
    trackingSteps: [
      { title: 'تم استلام وتأكيد الطلب رقمياً', titleEn: 'Request received & confirmed digitally', completed: true, timestamp: '29 أكتوبر 02:20 م' },
      { title: 'سداد الرسوم بنجاح عبر انستاباي', titleEn: 'Fees paid successfully via InstaPay', completed: true, timestamp: '29 أكتوبر 02:22 م' },
      { title: 'تعيين مندوب سكيب بشبين الكوم واستلام الأوراق', titleEn: 'Shebin courier assigned & papers collected', completed: true, timestamp: '30 أكتوبر 10:15 ص' },
      { title: 'مراجعة الأوراق بقسم جوازات شبين الكوم وطباعة الجواز', titleEn: 'Processing at Shebin El-Kom Passports Dept.', completed: false },
      { title: 'استلام الجواز والتوصيل حتى باب بيتك بالمنوفية', titleEn: 'Passport delivered safely to your door', completed: false }
    ]
  },
  {
    id: 'req-7742',
    serviceId: 'health-medicine-delivery',
    serviceTitle: 'توصيل أدوية القلب الدورية للعنوان (قويسنا)',
    serviceTitleEn: 'Chronic Heart Medicine Delivery (Quesna)',
    category: 'health',
    referenceNumber: 'SKP-MED-77421',
    status: 'processing',
    createdAt: '2026-10-30 08:30',
    fee: 285,
    paymentMethod: 'fawry',
    paymentStatus: 'paid',
    applicantName: 'محمد أحمد إبراهيم سليم',
    applicantPhone: '01098765432',
    nationalId: '29510141701872',
    address: 'شارع الجيش، وسط مدينة قويسنا، المنوفية',
    courierRequested: true,
    courierName: 'كابتن محمود رضا (مندوب قويسنا والتوصيل الطبي)',
    courierPhone: '01234567890',
    estimatedCompletion: 'اليوم خلال ساعة ونصف',
    trackingSteps: [
      { title: 'مطابقة الروشتة وتجهيز العبوة بصيدلية قويسنا المعتمدة', titleEn: 'Prescription matched at Quesna certified pharmacy', completed: true, timestamp: '30 أكتوبر 08:45 ص' },
      { title: 'انطلاق المندوب بالدراجة المجهزة بدرجة تبريد آمنة', titleEn: 'Courier departed with temperature-controlled pack', completed: true, timestamp: '30 أكتوبر 09:10 ص' },
      { title: 'التسليم المباشر للمنزل في قويسنا واستلام الدواء', titleEn: 'Direct doorstep delivery in Quesna', completed: false }
    ]
  }
];

export const INITIAL_CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'support',
    senderName: 'فريق دعم عملاء SKIP - قطاع المنوفية',
    senderNameEn: 'SKIP Support Team - Menoufia Sector',
    message: 'أهلاً بك يا أستاذ محمد في تطبيق SKIP بالمنوفية! "اعرف المطلوب قبل ما تروح" في كافة مصالح ومستشفيات شبين الكوم وقويسنا. كيف يمكننا مساعدتك اليوم؟',
    messageEn: 'Welcome Mr. Mohamed to SKIP Menoufia! Covering all government offices and hospitals in Shebin El-Kom & Quesna. How can we assist you today?',
    timestamp: '09:00 ص'
  },
  {
    id: 'msg-2',
    sender: 'courier',
    senderName: 'كابتن أحمد سامي (مندوب شبين الكوم وقويسنا)',
    senderNameEn: 'Captain Ahmed Samy (Shebin & Quesna Courier)',
    message: 'صباح الخير أستاذ محمد، أنا مندوب سكيب في شبين الكوم. تم مراجعة عدد 3 صور وبطاقة الرقم القومي وأصل الجواز المنتهي قبل التوجه إلى قسم جوازات شبين الكوم بالبر الشرقي.',
    messageEn: 'Good morning Mr. Mohamed! All photos, National ID and old passport are verified before heading to Shebin El-Kom Passports Office.',
    timestamp: '10:18 ص'
  }
];

export const INITIAL_COURIERS: Courier[] = [
  {
    id: 'cour-1',
    name: 'كابتن إسلام محمود',
    phone: '01011223344',
    vehicle: 'موتوسيكل',
    area: 'شبين الكوم (الحي الشرقي ومجمع الكليات والمستشفيات)',
    status: 'available',
    nationalId: '29304151702938',
    assignedOrdersCount: 14,
    rating: 4.9
  },
  {
    id: 'cour-2',
    name: 'كابتن أحمد سامي',
    phone: '01122334455',
    vehicle: 'موتوسيكل',
    area: 'شبين الكوم (الحي الغربي، السجل المدني ومستشفى الهلال)',
    status: 'busy',
    nationalId: '29108121704812',
    assignedOrdersCount: 28,
    rating: 4.95
  },
  {
    id: 'cour-3',
    name: 'كابتن حسام حسن',
    phone: '01277889900',
    vehicle: 'سيارة',
    area: 'قويسنا (وسط المدينة، مجلس المدينة ومستشفى قويسنا المركزي)',
    status: 'available',
    nationalId: '28912031707721',
    assignedOrdersCount: 11,
    rating: 4.85
  },
  {
    id: 'cour-4',
    name: 'كابتن محمود رضا',
    phone: '01066554433',
    vehicle: 'موتوسيكل',
    area: 'قويسنا والمنطقة الصناعية وطريق قويسنا - شبين (توصيل طبي)',
    status: 'busy',
    nationalId: '29402191705543',
    assignedOrdersCount: 36,
    rating: 5.0
  }
];

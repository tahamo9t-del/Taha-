import { ServiceItem } from '../types';

export interface ServiceSeoMeta {
  slug: string;
  seoTitle: string;
  seoTitleEn: string;
  seoDescription: string;
  seoDescriptionEn: string;
  keywords: string[];
  officialFee: number;
  skipFee: number;
  officialSourceName: string;
  officialSourceNameEn: string;
  officialSourceUrl: string;
}

export const SERVICE_SEO_META: Record<string, ServiceSeoMeta> = {
  'gov-passport-new': {
    slug: 'awraq-estekhrag-gawaz-safar-misri',
    seoTitle: 'الأوراق المطلوبة لاستخراج جواز سفر مصري لأول مرة 2026 | SKIP',
    seoTitleEn: 'Required Documents for New Egyptian Passport 2026 | SKIP',
    seoDescription: 'تعرف على الأوراق المطلوبة لاستخراج جواز سفر مصري لأول مرة، الشروط، خطوات التقديم في جوازات شبين الكوم ومصر، الرسوم الرسمية ومدة الاستلام.',
    seoDescriptionEn: 'Complete checklist of documents, conditions, fees, and steps to issue a first-time Egyptian passport.',
    keywords: [
      'الأوراق المطلوبة لاستخراج جواز سفر',
      'استخراج جواز سفر مصري لأول مرة',
      'جوازات شبين الكوم المنوفية',
      'نموذج 29 جوازات',
      'رسوم استخراج جواز السفر 2026'
    ],
    officialFee: 900,
    skipFee: 75,
    officialSourceName: 'الإدارة العامة للجوازات والهجرة - وزارة الداخلية',
    officialSourceNameEn: 'Passports, Immigration & Nationality Dept. - MOI Egypt',
    officialSourceUrl: 'https://moi.gov.eg'
  },
  'gov-passport-renew': {
    slug: 'tagdid-gawaz-elsafar-elmisri',
    seoTitle: 'تجديد جواز السفر المصري 2026: الأوراق المطلوبة والرسوم | SKIP',
    seoTitleEn: 'Egyptian Passport Renewal: Documents & Fees 2026 | SKIP',
    seoDescription: 'دليل تجديد جواز السفر المصري المنتهي أو ممتلئ الصفحات: قائمة الأوراق المطلوبة، خطوات التقديم العادي والمستعجل، والرسوم الرسمية بالتفصيل.',
    seoDescriptionEn: 'Step-by-step guide for renewing an expired Egyptian passport including required papers and official fees.',
    keywords: [
      'تجديد جواز السفر المصري',
      'الأوراق المطلوبة لتجديد جواز السفر',
      'تجديد جواز السفر المستعجل',
      'جوازات شبين الكوم'
    ],
    officialFee: 950,
    skipFee: 75,
    officialSourceName: 'بوابة وزارة الداخلية المصرية - قطاع الجوازات',
    officialSourceNameEn: 'Ministry of Interior Egypt - Passports Portal',
    officialSourceUrl: 'https://moi.gov.eg'
  },
  'gov-national-id': {
    slug: 'awraq-estekhrag-betaka-shakhsiya',
    seoTitle: 'الأوراق المطلوبة لاستخراج بطاقة شخصية وتجديد الرقم القومي | SKIP',
    seoTitleEn: 'Egyptian National ID Card Documents & Steps | SKIP',
    seoDescription: 'اعرف الأوراق المطلوبة لاستخراج بطاقة شخصية لأول مرة أو تجديد وتغيير بيانات الرقم القومي في السجل المدني والخطوات والرسوم الرسمية.',
    seoDescriptionEn: 'Complete required documents and steps for issuing or renewing an Egyptian National ID card.',
    keywords: [
      'الأوراق المطلوبة لاستخراج بطاقة شخصية',
      'تجديد بطاقة الرقم القومي',
      'استخراج بطاقة رقم قومي أول مرة',
      'السجل المدني شبين الكوم وقويسنا'
    ],
    officialFee: 175,
    skipFee: 60,
    officialSourceName: 'قطاع الأحوال المدنية - منصة مصر الرقمية',
    officialSourceNameEn: 'Civil Status Sector - Digital Egypt Platform',
    officialSourceUrl: 'https://digital.gov.eg'
  },
  'gov-driving-license': {
    slug: 'awraq-estekhrag-rokhset-qiyada',
    seoTitle: 'الأوراق المطلوبة لرخصة القيادة الخاصة لأول مرة والتجديد 2026 | SKIP',
    seoTitleEn: 'Required Documents for Egyptian Driving License 2026 | SKIP',
    seoDescription: 'قائمة الأوراق المطلوبة لاستخراج رخصة القيادة الخاصة لأول مرة في مصر، الكشف الطبي (باطنة ونظر)، شروط السن، اختبارات المرور والرسوم الرسمية.',
    seoDescriptionEn: 'Required documents, medical checkups, and traffic department steps for obtaining a personal driving license.',
    keywords: [
      'الأوراق المطلوبة لرخصة القيادة',
      'استخراج رخصة قيادة خاصة لأول مرة',
      'كشف نظر وباطنة رخصة القيادة',
      'مرور شبين الكوم وقويسنا'
    ],
    officialFee: 1150,
    skipFee: 80,
    officialSourceName: 'الإدارة العامة للمرور - وزارة الداخلية المصرية',
    officialSourceNameEn: 'General Traffic Department - MOI Egypt',
    officialSourceUrl: 'https://moi.gov.eg'
  },
  'gov-vehicle-license': {
    slug: 'tagdid-rokhset-sayara-shebin-elkom',
    seoTitle: 'الأوراق المطلوبة لتجديد رخصة السيارة والفحص الفني 2026 | SKIP',
    seoTitleEn: 'Car License Renewal & Inspection Requirements 2026 | SKIP',
    seoDescription: 'تعرف على الأوراق المطلوبة لتجديد رخصة السيارة الملاكي، شهادة المخالفات، الملصق الإلكتروني، طفاية الحريق والفحص الفني في المرور.',
    seoDescriptionEn: 'Required documents for private car license renewal, traffic clearance certificate, and technical inspection.',
    keywords: [
      'تجديد رخصة السيارة',
      'الأوراق المطلوبة لتجديد رخصة السيارة',
      'شهادة المخالفات المرورية',
      'وحدة مرور شبين الكوم'
    ],
    officialFee: 1450,
    skipFee: 90,
    officialSourceName: 'بوابة المرور والنيابة العامة - مصر الرقمية',
    officialSourceNameEn: 'Traffic & Public Prosecution Portal - Digital Egypt',
    officialSourceUrl: 'https://digital.gov.eg'
  },
  'gov-quesna-traffic': {
    slug: 'tagdid-rokhset-sayara-quesna',
    seoTitle: 'تجديد رخصة السيارة والموتوسيكل في وحدة مرور قويسنا | SKIP',
    seoTitleEn: 'Vehicle & Motorcycle License Renewal - Quesna Traffic Unit | SKIP',
    seoDescription: 'الأوراق المطلوبة لتجديد ونقل قيد رخصة السيارة أو الدراجة النارية بوحدة مرور قويسنا، شروط الفحص الفني، والتكلفة الرسمية.',
    seoDescriptionEn: 'Required paperwork and steps for car and motorcycle license renewal at Quesna Traffic Unit.',
    keywords: [
      'تجديد رخصة السيارة قويسنا',
      'وحدة مرور قويسنا',
      'تجديد رخصة موتوسيكل',
      'الأوراق المطلوبة للترخيص'
    ],
    officialFee: 650,
    skipFee: 80,
    officialSourceName: 'الإدارة العامة للمرور - بوابة مصر الرقمية',
    officialSourceNameEn: 'General Traffic Dept. - Digital Egypt',
    officialSourceUrl: 'https://digital.gov.eg'
  },
  'gov-notary-office': {
    slug: 'awraq-tawkil-shahr-aqari',
    seoTitle: 'الأوراق المطلوبة لعمل توكيل وتوثيق العقود بالشهر العقاري | SKIP',
    seoTitleEn: 'Notary Public Power of Attorney & Contracts Guide | SKIP',
    seoDescription: 'الأوراق المطلوبة لاستخراج توكيل عام أو خاص أو توثيق عقد بيع في مصلحة الشهر العقاري والتوثيق بالمنوفية ومصر.',
    seoDescriptionEn: 'Documents needed for power of attorney and contract authentication at the Notary Public.',
    keywords: [
      'الأوراق المطلوبة لعمل توكيل',
      'توثيق عقد سيارة الشهر العقاري',
      'الشهر العقاري شبين الكوم وقويسنا'
    ],
    officialFee: 195,
    skipFee: 60,
    officialSourceName: 'مصلحة الشهر العقاري والتوثيق - منصة مصر الرقمية',
    officialSourceNameEn: 'Real Estate Publicity & Notarization - Digital Egypt',
    officialSourceUrl: 'https://digital.gov.eg'
  },
  'gov-building-permit': {
    slug: 'awraq-tarakhis-elbinaa-wal-tasaloh',
    seoTitle: 'الأوراق المطلوبة لتراخيص البناء والتصالح بالمركز التكنولوجي | SKIP',
    seoTitleEn: 'Building Permits & Reconciliation Papers | SKIP',
    seoDescription: 'تعرف على الأوراق المطلوبة لاستخراج بيان صلاحية الموقع، رخصة البناء، أو نموذج التصالح من المركز التكنولوجي بالمنوفية.',
    seoDescriptionEn: 'Checklist of documents required for building permits and reconciliation at local technology centers.',
    keywords: [
      'الأوراق المطلوبة لرخصة البناء',
      'ملف التصالح في مخالفات البناء',
      'المركز التكنولوجي شبين الكوم وقويسنا'
    ],
    officialFee: 2800,
    skipFee: 150,
    officialSourceName: 'البوابة الإلكترونية لمحافظة المنوفية',
    officialSourceNameEn: 'Menoufia Governorate Official Portal',
    officialSourceUrl: 'http://www.monofeya.gov.eg'
  },
  'gov-criminal-record': {
    slug: 'estekhrag-fish-we-tashbih-momaykan',
    seoTitle: 'الأوراق المطلوبة لاستخراج فيش وتشبيه مستعجل وعادي 2026 | SKIP',
    seoTitleEn: 'Criminal Record Certificate (Fish & Tashbih) Documents | SKIP',
    seoDescription: 'دليل استخراج فيش وتشبيه مميكن (صحيفة الحالة الجنائية) في نفس اليوم أو أونلاين: الأوراق المطلوبة، الشروط، الخطوات والرسوم الرسمية.',
    seoDescriptionEn: 'Required documents and steps for obtaining an official Egyptian Criminal Record Certificate.',
    keywords: [
      'استخراج فيش وتشبيه',
      'الأوراق المطلوبة للفيش والتشبيه',
      'فيش وتشبيه مستعجل',
      'صحيفة الحالة الجنائية المنوفية'
    ],
    officialFee: 100,
    skipFee: 50,
    officialSourceName: 'الأدلة الجنائية - وزارة الداخلية المصرية',
    officialSourceNameEn: 'Forensic Evidence Dept. - MOI Egypt',
    officialSourceUrl: 'https://moi.gov.eg'
  },
  'gov-quesna-industrial': {
    slug: 'khadamat-manteqa-senaeya-quesna',
    seoTitle: 'إجراءات التراخيص والبطاقات التموينية في قويسنا والمنطقة الصناعية | SKIP',
    seoTitleEn: 'Quesna Industrial Zone & Supply Directorate Services | SKIP',
    seoDescription: 'الأوراق المطلوبة لخطابات العمل بالمنطقة الصناعية بقويسنا وخدمات بطاقات التموين بالمركز التكنولوجي.',
    seoDescriptionEn: 'Required documents for Quesna Industrial Zone work letters and supply card procedures.',
    keywords: [
      'المنطقة الصناعية بقويسنا',
      'خدمات تموين قويسنا',
      'الأوراق المطلوبة لبطاقة التموين'
    ],
    officialFee: 180,
    skipFee: 60,
    officialSourceName: 'منصة مصر الرقمية - خدمات التموين والمحليات',
    officialSourceNameEn: 'Digital Egypt Platform - Supply & Localities',
    officialSourceUrl: 'https://digital.gov.eg'
  },
  'edu-college-admission': {
    slug: 'awraq-taqdim-koliyat-gameat-elmenoufia',
    seoTitle: 'الأوراق المطلوبة للتقديم للكليات والجامعات المصرية 2026 | SKIP',
    seoTitleEn: 'Required Documents for University & College Enrollment 2026 | SKIP',
    seoDescription: 'قائمة كاملة بالأوراق المطلوبة للتقديم للكليات للطلاب الجدد، نموذج 2 جند، بطاقة الترشيح، الكشف الطبي، والخطوات في جامعة المنوفية والجامعات الحكومية.',
    seoDescriptionEn: 'Complete freshers college admission documents checklist including nomination card, military forms, and medical check.',
    keywords: [
      'الأوراق المطلوبة للتقديم للكليات',
      'ملف التقديم للجامعات الحكومية',
      'تقديم كليات جامعة المنوفية',
      'نموذج 2 جند و6 جند'
    ],
    officialFee: 450,
    skipFee: 60,
    officialSourceName: 'موقع التنسيق الإلكتروني وبوابة جامعة المنوفية',
    officialSourceNameEn: 'Egyptian Universities Tansik & Menoufia University Portal',
    officialSourceUrl: 'https://www.menofia.edu.eg'
  },
  'edu-grad-certificate': {
    slug: 'estekhrag-shehadet-takharog-bayan-daragat',
    seoTitle: 'الأوراق المطلوبة لاستخراج شهادة التخرج وبيان الدرجات الجامعي | SKIP',
    seoTitleEn: 'Graduation Certificate & Academic Transcript Papers | SKIP',
    seoDescription: 'تعرف على الأوراق المطلوبة لاستخراج شهادة التخرج المؤقتة والدائمة وبيان الدرجات وإخلاء الطرف من شؤون الخريجين.',
    seoDescriptionEn: 'Documents and clearance steps to obtain university graduation certificates and transcripts.',
    keywords: [
      'استخراج شهادة التخرج',
      'استخراج بيان درجات جامعي',
      'شؤون الخريجين جامعة المنوفية'
    ],
    officialFee: 380,
    skipFee: 60,
    officialSourceName: 'بوابة جامعة المنوفية الرسمية',
    officialSourceNameEn: 'Menoufia University Official Portal',
    officialSourceUrl: 'https://www.menofia.edu.eg'
  },
  'edu-school-enrollment': {
    slug: 'awraq-taqdim-madares-tahwilat-menoufia',
    seoTitle: 'الأوراق المطلوبة للتقديم للمدارس والتحويلات بين المدارس | SKIP',
    seoTitleEn: 'School Enrollment & Transfer Required Documents | SKIP',
    seoDescription: 'دليل الأوراق المطلوبة لتقديم رياض الأطفال والصف الأول الابتدائي والتحويل بين المدارس بالإدارات التعليمية.',
    seoDescriptionEn: 'Required papers for KG1, primary school enrollment, and official student transfers.',
    keywords: [
      'الأوراق المطلوبة للتقديم للمدارس',
      'تحويل طالب بين المدارس',
      'الإدارة التعليمية شبين الكوم وقويسنا'
    ],
    officialFee: 250,
    skipFee: 50,
    officialSourceName: 'وزارة التربية والتعليم والتعليم الفني',
    officialSourceNameEn: 'Ministry of Education & Technical Education Egypt',
    officialSourceUrl: 'https://moe.gov.eg'
  },
  'edu-quesna-schools': {
    slug: 'khadamat-edara-taalimiya-quesna',
    seoTitle: 'الأوراق المطلوبة لبيان النجاح والتحويلات في إدارة قويسنا التعليمية | SKIP',
    seoTitleEn: 'Quesna Educational Directorate Certificates & Transfers | SKIP',
    seoDescription: 'الأوراق المطلوبة لاستخراج بيان النجاح (ابتدائي وإعدادي) والتحويلات في الإدارة التعليمية بقويسنا.',
    seoDescriptionEn: 'Required documents for academic success statements and transfers in Quesna.',
    keywords: [
      'إدارة قويسنا التعليمية',
      'استخراج بيان نجاح إعدادي',
      'تحويلات المدارس قويسنا'
    ],
    officialFee: 150,
    skipFee: 50,
    officialSourceName: 'وزارة التربية والتعليم والتعليم الفني',
    officialSourceNameEn: 'Ministry of Education Egypt',
    officialSourceUrl: 'https://moe.gov.eg'
  },
  'edu-enrollment-proof': {
    slug: 'estekhrag-ethbat-qaid-dirasi',
    seoTitle: 'الأوراق المطلوبة لاستخراج إثبات قيد دراسي للمدارس والجامعات | SKIP',
    seoTitleEn: 'Student Enrollment Proof Certificate Papers | SKIP',
    seoDescription: 'خطوات وأوراق استخراج شهادة إثبات قيد رسمية موجهة للتجنيد أو الجوازات أو التأمينات.',
    seoDescriptionEn: 'How to obtain an official student enrollment certificate for military, passport, or insurance use.',
    keywords: [
      'استخراج إثبات قيد دراسي',
      'شهادة قيد للتجنيد',
      'شهادة قيد للجوازات'
    ],
    officialFee: 85,
    skipFee: 45,
    officialSourceName: 'بوابة جامعة المنوفية - شؤون الطلاب',
    officialSourceNameEn: 'Menoufia University - Student Affairs',
    officialSourceUrl: 'https://www.menofia.edu.eg'
  },
  'house-social-housing': {
    slug: 'awraq-shaqaq-eskan-egtima3i-menoufia',
    seoTitle: 'الأوراق المطلوبة للتقديم على شقق الإسكان الاجتماعي بالمنوفية | SKIP',
    seoTitleEn: 'Social Housing Application Required Papers - Menoufia | SKIP',
    seoDescription: 'قائمة أوراق شقق الإسكان الاجتماعي ومحدودي الدخل: مفردات المرتب، قسيمة الزواج، كراسة الشروط وإيصال البريد.',
    seoDescriptionEn: 'Required documents for Egyptian social housing and mortgage finance applications.',
    keywords: [
      'الأوراق المطلوبة للإسكان الاجتماعي',
      'شقق الإسكان الاجتماعي المنوفية قويسنا',
      'صندوق الإسكان الاجتماعي'
    ],
    officialFee: 350,
    skipFee: 75,
    officialSourceName: 'صندوق الإسكان الاجتماعي ودعم التمويل العقاري',
    officialSourceNameEn: 'Social Housing & Mortgage Finance Fund',
    officialSourceUrl: 'https://cservices.shmff.gov.eg'
  },
  'house-utilities-menoufia': {
    slug: 'awraq-taqdim-adad-kahraba-maya-ghaz',
    seoTitle: 'الأوراق المطلوبة لتركيب عداد الكهرباء والمياه والغاز | SKIP',
    seoTitleEn: 'Utility Meter (Electricity, Water & Gas) Papers | SKIP',
    seoDescription: 'الأوراق المطلوبة للتعاقد على عداد كهرباء أو مياه أو غاز طبيعي، شهادة المطابقة وسند الملكية في المنوفية.',
    seoDescriptionEn: 'Required documents for installing residential electricity, water, and natural gas meters.',
    keywords: [
      'الأوراق المطلوبة لعداد الكهرباء',
      'توصيل الغاز الطبيعي للمنازل',
      'التعاقد على عداد المياه'
    ],
    officialFee: 150,
    skipFee: 60,
    officialSourceName: 'الشركة القابضة لكهرباء مصر والمنصة الموحدة',
    officialSourceNameEn: 'Egyptian Electricity Holding Company Unified Portal',
    officialSourceUrl: 'https://www.eehc.gov.eg'
  },
  'health-shebin-university-hospital': {
    slug: 'mostashfa-shebin-elkom-elgam3i-awraq',
    seoTitle: 'دليل أوراق الكشف والحجز بمستشفيات جامعة المنوفية بشبين الكوم | SKIP',
    seoTitleEn: 'Menoufia University Hospitals Required Papers & Clinics | SKIP',
    seoDescription: 'الأوراق المطلوبة لفتح ملف طبي أو دخول العيادات الخارجية والطوارئ بمستشفيات جامعة المنوفية بشبين الكوم.',
    seoDescriptionEn: 'Required IDs, referrals, and opening files for Menoufia University Hospitals clinics.',
    keywords: [
      'مستشفى شبين الكوم الجامعي',
      'عيادات مستشفيات جامعة المنوفية',
      'أوراق فتح ملف طبي مستشفى جامعي'
    ],
    officialFee: 50,
    skipFee: 0,
    officialSourceName: 'مستشفيات جامعة المنوفية',
    officialSourceNameEn: 'Menoufia University Hospitals',
    officialSourceUrl: 'https://www.menofia.edu.eg'
  },
  'health-liver-institute': {
    slug: 'ma3had-elkabed-elqawmi-shebin-elkom',
    seoTitle: 'الأوراق المطلوبة لعيادات معهد الكبد القومي بشبين الكوم | SKIP',
    seoTitleEn: 'National Liver Institute Shebin El-Kom Papers | SKIP',
    seoDescription: 'تعرف على الأوراق والتحاليل المطلوبة لفتح ملف متابعة وحجز مناظير وفحوصات في معهد الكبد القومي بشبين الكوم.',
    seoDescriptionEn: 'Documents and labs required for consultations and endoscopy files at National Liver Institute.',
    keywords: [
      'معهد الكبد القومي بشبين الكوم',
      'أوراق حجز معهد الكبد',
      'علاج الكبد المنوفية'
    ],
    officialFee: 100,
    skipFee: 0,
    officialSourceName: 'معهد الكبد القومي - جامعة المنوفية',
    officialSourceNameEn: 'National Liver Institute - Menoufia University',
    officialSourceUrl: 'https://www.menofia.edu.eg'
  },
  'health-shebin-teaching-hospital': {
    slug: 'mostashfa-shebin-elkom-eltaalimi',
    seoTitle: 'أوراق الكشف والعمليات في مستشفى شبين الكوم التعليمي | SKIP',
    seoTitleEn: 'Shebin El-Kom Teaching Hospital Clinics & Papers | SKIP',
    seoDescription: 'دليل الأوراق المطلوبة للعيادات الخارجية، العمليات، وقوائم الانتظار في مستشفى شبين الكوم التعليمي.',
    seoDescriptionEn: 'Required papers for clinics and surgical waiting lists at Shebin El-Kom Teaching Hospital.',
    keywords: [
      'مستشفى شبين الكوم التعليمي',
      'أوراق قوائم الانتظار وزارة الصحة',
      'عيادات شبين التعليمي'
    ],
    officialFee: 40,
    skipFee: 0,
    officialSourceName: 'وزارة الصحة والسكان المصرية',
    officialSourceNameEn: 'Ministry of Health & Population Egypt',
    officialSourceUrl: 'https://www.mohp.gov.eg'
  },
  'health-shebin-hilal-insurance': {
    slug: 'mostashfa-elhelal-tamin-sehy-shebin',
    seoTitle: 'أوراق التأمين الصحي واللجان بمستشفى الهلال بشبين الكوم | SKIP',
    seoTitleEn: 'El-Helal Health Insurance Hospital Shebin Papers | SKIP',
    seoDescription: 'الأوراق المطلوبة لاستخراج وتجديد بطاقة التأمين الصحي وصرف العلاج الشهري وعرض اللجان الطبية بالمنوفية.',
    seoDescriptionEn: 'Documents for health insurance cards, chronic medication refills, and medical committees.',
    keywords: [
      'مستشفى الهلال للتأمين الصحي شبين الكوم',
      'تجديد بطاقة التأمين الصحي',
      'صرف علاج التأمين الصحي'
    ],
    officialFee: 50,
    skipFee: 0,
    officialSourceName: 'الهيئة العامة للتأمين الصحي',
    officialSourceNameEn: 'Health Insurance Organization (HIO Egypt)',
    officialSourceUrl: 'https://www.hio.gov.eg'
  },
  'health-quesna-central-hospital': {
    slug: 'mostashfa-quesna-elmarkazi-awraq',
    seoTitle: 'أوراق الكشف والتقارير بمستشفى قويسنا المركزي | SKIP',
    seoTitleEn: 'Quesna Central Hospital Clinics & Medical Reports | SKIP',
    seoDescription: 'المستندات المطلوبة للعيادات الخارجية، الشهادات الصحية، اللجان والتقارير الطبية في مستشفى قويسنا المركزي.',
    seoDescriptionEn: 'Required papers for outpatient clinics, health certificates, and reports at Quesna Central Hospital.',
    keywords: [
      'مستشفى قويسنا المركزي',
      'الشهادات الصحية قويسنا',
      'أوراق الكشف مستشفى قويسنا'
    ],
    officialFee: 30,
    skipFee: 0,
    officialSourceName: 'وزارة الصحة والسكان المصرية',
    officialSourceNameEn: 'Ministry of Health & Population Egypt',
    officialSourceUrl: 'https://www.mohp.gov.eg'
  },
  'health-quesna-insurance-clinic': {
    slug: 'eyadet-quesna-eltamin-elsehy',
    seoTitle: 'أوراق عيادة قويسنا الشاملة للتأمين الصحي والمركز الطبي | SKIP',
    seoTitleEn: 'Quesna Health Insurance Polyclinic Required Papers | SKIP',
    seoDescription: 'قائمة الأوراق المطلوبة للكشف، تحاليل التأمين الصحي، وتطعيمات السفر بعيادة قويسنا الشاملة والمركز الطبي.',
    seoDescriptionEn: 'Required documents for chronic care, labs, and travel vaccines at Quesna Polyclinic.',
    keywords: [
      'عيادة قويسنا للتأمين الصحي',
      'المركز الطبي بقويسنا',
      'دفتر التأمين الصحي قويسنا'
    ],
    officialFee: 20,
    skipFee: 0,
    officialSourceName: 'الهيئة العامة للتأمين الصحي',
    officialSourceNameEn: 'Health Insurance Organization (HIO)',
    officialSourceUrl: 'https://www.hio.gov.eg'
  },
  'health-state-treatment': {
    slug: 'qarar-elag-ala-nafaqat-eldawla',
    seoTitle: 'الأوراق المطلوبة لقرار العلاج على نفقة الدولة وتجديده | SKIP',
    seoTitleEn: 'State-Funded Medical Treatment Decision Papers | SKIP',
    seoDescription: 'تعرف على الأوراق المطلوبة لاستخراج وتجديد قرار العلاج على نفقة الدولة: اللجنة الثلاثية، صورة البطاقة، وبحث الحالة.',
    seoDescriptionEn: 'Required documents for issuing or renewing a state-funded medical therapy decision in Egypt.',
    keywords: [
      'العلاج على نفقة الدولة',
      'الأوراق المطلوبة لقرار نفقة الدولة',
      'تقرير اللجنة الثلاثية',
      'المجالس الطبية المتخصصة'
    ],
    officialFee: 0,
    skipFee: 0,
    officialSourceName: 'المجالس الطبية المتخصصة - وزارة الصحة',
    officialSourceNameEn: 'Specialized Medical Councils - MOHP Egypt',
    officialSourceUrl: 'https://wlms.smcegy.com'
  },
  'health-medicine-delivery': {
    slug: 'sarf-adwiya-rosheta-menoufia',
    seoTitle: 'ضوابط وأوراق صرف الأدوية الشهرية والروشتات بالمنوفية | SKIP',
    seoTitleEn: 'Prescription Dispensing Requirements - Menoufia | SKIP',
    seoDescription: 'الأوراق والروشتة المعتمدة المطلوبة لصرف الأدوية المزمنة وأدوية التأمين الصحي من الصيدليات المعتمدة.',
    seoDescriptionEn: 'Approved prescriptions and ID requirements for dispensing chronic medicines.',
    keywords: [
      'صرف الأدوية الشهرية',
      'أوراق صرف أدوية التأمين',
      'روشتة طبية معتمدة'
    ],
    officialFee: 0,
    skipFee: 65,
    officialSourceName: 'الهيئة العامة للتأمين الصحي',
    officialSourceNameEn: 'Health Insurance Organization Egypt',
    officialSourceUrl: 'https://www.hio.gov.eg'
  },
  'health-medical-reports': {
    slug: 'etmad-taqarir-tebeya-qomsyon-teby',
    seoTitle: 'الأوراق المطلوبة للقومسيون الطبي واعتماد التقارير الطبية | SKIP',
    seoTitleEn: 'Medical Commission & Official Medical Reports Papers | SKIP',
    seoDescription: 'المستندات المطلوبة للكشف الطبي بالقمسيون الطبي (السيارات المجهزة، كارت الخدمات المتكاملة، إجازات العمل).',
    seoDescriptionEn: 'Required documents for Medical Commission approvals and official medical reports.',
    keywords: [
      'القومسيون الطبي العام بالمنوفية',
      'اعتماد التقارير الطبية',
      'كارت الخدمات المتكاملة الأوراق المطلوبة'
    ],
    officialFee: 75,
    skipFee: 0,
    officialSourceName: 'المجالس الطبية المتخصصة',
    officialSourceNameEn: 'Specialized Medical Councils Egypt',
    officialSourceUrl: 'https://wlms.smcegy.com'
  }
};

export function getServiceSlug(service: Pick<ServiceItem, 'id' | 'slug'>): string {
  return service.slug || SERVICE_SEO_META[service.id]?.slug || service.id;
}

export function enrichServiceWithSeo(service: ServiceItem): ServiceItem {
  const meta = SERVICE_SEO_META[service.id];
  return {
    ...service,
    slug: service.slug || meta?.slug || service.id,
    seoTitle: service.seoTitle || meta?.seoTitle || `${service.title} | SKIP`,
    seoTitleEn: service.seoTitleEn || meta?.seoTitleEn || `${service.titleEn} | SKIP`,
    seoDescription: service.seoDescription || meta?.seoDescription || service.description,
    seoDescriptionEn: service.seoDescriptionEn || meta?.seoDescriptionEn || service.descriptionEn,
    keywords: service.keywords || meta?.keywords || [service.title, service.responsibleEntity],
    officialFee: service.officialFee ?? meta?.officialFee ?? service.fee,
    skipFee: service.skipFee ?? meta?.skipFee ?? (service.courierSupported ? 60 : 0),
    officialSourceName: service.officialSourceName || meta?.officialSourceName || service.responsibleEntity,
    officialSourceNameEn: service.officialSourceNameEn || meta?.officialSourceNameEn || service.responsibleEntityEn,
    officialSourceUrl: service.officialSourceUrl || meta?.officialSourceUrl || 'https://digital.gov.eg'
  };
}

export function findServiceBySlugOrId(services: ServiceItem[], slugOrId: string): ServiceItem | undefined {
  const normalized = decodeURIComponent(slugOrId).trim().toLowerCase();
  for (const raw of services) {
    const srv = enrichServiceWithSeo(raw);
    if (
      srv.slug?.toLowerCase() === normalized ||
      srv.id.toLowerCase() === normalized
    ) {
      return srv;
    }
  }
  return undefined;
}

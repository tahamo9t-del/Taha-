import { GuideArticle } from '../types';

export const GUIDES_DATA: GuideArticle[] = [
  {
    id: 'guide-passport-egypt',
    slug: 'dalil-estekhrag-wa-tagdid-gawaz-elsafar-elmisri',
    title: 'الدليل الكامل لاستخراج وتجديد جواز السفر المصري 2026: الأوراق والشروط والخطوات',
    titleEn: 'Complete Guide to Issuing & Renewing an Egyptian Passport 2026',
    excerpt: 'كل ما تحتاج معرفته قبل التوجه لمصلحة الجوازات في شبين الكوم أو أي محافظة: الأوراق المطلوبة لأول مرة أو التجديد، صور جواز السفر، الموقف التجنيدي، والمدة المتوقعة.',
    excerptEn: 'Everything you need before visiting the Passports Office: required papers for first-time or renewal, photos, military certificate, and processing time.',
    categoryLabel: 'الجوازات والسفر',
    categoryLabelEn: 'Passports & Travel',
    publishedAt: '2026-02-01',
    updatedAt: '2026-11-15',
    readingTime: '4 دقائق قراءة',
    readingTimeEn: '4 min read',
    keywords: [
      'الأوراق المطلوبة لاستخراج جواز سفر',
      'تجديد جواز السفر المصري',
      'جواز سفر مستعجل مصر',
      'نموذج 29 جوازات',
      'أوراق جواز السفر شبين الكوم'
    ],
    relatedServiceSlugs: [
      'awraq-estekhrag-gawaz-safar-misri',
      'tagdid-gawaz-elsafar-elmisri'
    ],
    officialSourceName: 'الإدارة العامة للجوازات والهجرة - وزارة الداخلية',
    officialSourceUrl: 'https://moi.gov.eg',
    sections: [
      {
        heading: 'أولاً: الأوراق المطلوبة لاستخراج جواز سفر مصري لأول مرة',
        headingEn: '1. Required Papers for a First-Time Egyptian Passport',
        paragraphs: [
          'قبل التوجه إلى قسم الجوازات التابع لمحل إقامتك (مثل قسم جوازات شبين الكوم لمواطني شبين الكوم وقويسنا ومراكز المنوفية)، يجب تجهيز أصول المستندات التالية لتجنب رفض الملف أو تكرار الزيارة:'
        ],
        paragraphsEn: [
          'Before heading to your district Passports Office, ensure you have all original documents ready:'
        ],
        bullets: [
          'بطاقة الرقم القومي سارية المفعول لمن بلغ 16 عاماً (وصورتان ضوئيتان واضحتان).',
          'شهادة الميلاد المميكنة بالرقم القومي لمن هم دون 16 عاماً.',
          '4 صور شخصية حديثة ملونة مقاس 4×6 بخلفية بيضاء واضحة.',
          'شهادة تحديد الموقف التجنيدي للذكور من سن 19 عاماً فأكثر (الإعفاء أو التأجيل أو تأدية الخدمة).',
          'أصل المؤهل الدراسي أو إثبات القيد للطلبة إذا لم يكن مثبتاً ببطاقة الرقم القومي.',
          'قسيمة الزواج للزوجات في حال الرغبة في إثبات اسم الزوج في الجواز.'
        ],
        bulletsEn: [
          'Valid National ID card for applicants aged 16+ (with 2 copies).',
          'Computerized birth certificate for minors under 16.',
          '4 recent 4x6 color photos with white background.',
          'Military status certificate for males aged 19+.',
          'Academic degree or student enrollment proof if not printed on the ID.',
          'Marriage certificate for married female applicants if adding spouse name.'
        ]
      },
      {
        heading: 'ثانياً: شروط وخطوات تجديد جواز السفر المصري المنتهي',
        headingEn: '2. Conditions & Steps for Passport Renewal',
        paragraphs: [
          'عند تجديد جواز السفر المصري المنتهي أو الذي امتلأت صفحاته بالأختام، يُشترط إحضار الجواز القديم للتخريم والإلغاء بجانب بطاقة الرقم القومي السارية والصور الجديدة، مع استيفاء استمارة نموذج 29 جوازات.'
        ],
        paragraphsEn: [
          'When renewing an expired or full Egyptian passport, you must bring the old passport for cancellation alongside a valid National ID, new photos, and Form 29.'
        ],
        bullets: [
          'حضور صاحب الشأن شخصياً للتحقق من الهوية والتصوير.',
          'في حالة القُصّر: حضور ولي الأمر أو الوصي مع بطاقة الرقم القومي.',
          'استلام الجواز العادي يستغرق 3 إلى 5 أيام عمل، والمستعجل خلال 24 ساعة أو نفس اليوم حسب الفئة.'
        ],
        bulletsEn: [
          'Applicant must appear in person for verification.',
          'Minors must be accompanied by a legal guardian with National ID.',
          'Standard delivery takes 3-5 business days; express takes 24 hours.'
        ]
      }
    ],
    faqs: [
      {
        question: 'هل يمكن استخراج جواز سفر ببطاقة رقم قومي منتهية؟',
        questionEn: 'Can I issue a passport with an expired National ID?',
        answer: 'لا، يشترط سريان بطاقة الرقم القومي تماماً عند التقديم، أو إحضار إيصال استمارة التجديد ساري المفعول وفق تعليمات الجوازات.',
        answerEn: 'No, your National ID card must be valid at the time of application.'
      },
      {
        question: 'كم تبلغ الرسوم الحكومية لاستخراج جواز السفر العادي؟',
        questionEn: 'What is the official fee for a standard Egyptian passport?',
        answer: 'تبلغ الرسوم الحكومية المقررة لجواز السفر العادي نحو 900 جنيه مصري (وقد تختلف في حالة الطلب المستعجل أو عدم حمل مؤهل دراسي).',
        answerEn: 'The official fee for a standard passport is around 900 EGP, with higher fees for express processing.'
      }
    ]
  },
  {
    id: 'guide-national-id',
    slug: 'awraq-estekhrag-wa-tagdid-betaka-shakhsiya-misr',
    title: 'الأوراق المطلوبة لاستخراج بطاقة شخصية وتجديد الرقم القومي في السجل المدني',
    titleEn: 'Required Documents for Egyptian National ID Issuance & Renewal',
    excerpt: 'دليل شامل لاستخراج بطاقة الرقم القومي لأول مرة عند بلوغ 15 عاماً، وتجديد البطاقة المنتهية أو تعديل المهنة والحالة الاجتماعية ومحل الإقامة.',
    excerptEn: 'Complete checklist for first-time National ID (age 15+), renewals, profession updates, and address changes.',
    categoryLabel: 'الأحوال المدنية',
    categoryLabelEn: 'Civil Status',
    publishedAt: '2026-02-05',
    updatedAt: '2026-11-15',
    readingTime: '3 دقائق قراءة',
    readingTimeEn: '3 min read',
    keywords: [
      'الأوراق المطلوبة لاستخراج بطاقة شخصية',
      'استخراج بطاقة رقم قومي أول مرة',
      'تجديد البطاقة الشخصية أونلاين',
      'تغيير محل الإقامة في البطاقة'
    ],
    relatedServiceSlugs: [
      'awraq-estekhrag-betaka-shakhsiya'
    ],
    officialSourceName: 'قطاع الأحوال المدنية - منصة مصر الرقمية',
    officialSourceUrl: 'https://digital.gov.eg',
    sections: [
      {
        heading: 'الأوراق المطلوبة لاستخراج بطاقة رقم قومي لأول مرة أو التجديد',
        headingEn: 'Documents for First-Time National ID or Renewal',
        paragraphs: [
          'يلزم استخراج بطاقة الرقم القومي لكل مواطن مصري يبلغ 15 عاماً خلال 6 أشهر، كما يجب تجديد البطاقة المنتهية خلال 3 أشهر لتفادي الغرامات المالية المقررة.'
        ],
        paragraphsEn: [
          'Every Egyptian citizen reaching age 15 must apply for a National ID within 6 months, and expired IDs must be renewed within 3 months to avoid late fines.'
        ],
        bullets: [
          'استمارة بطاقة الرقم القومي (عادية أو مستعجلة أو VIP).',
          'أصل شهادة الميلاد المميكنة (لحالات الاستخراج لأول مرة).',
          'ضامن من الدرجة الأولى (الأب أو الأم أو الأخ أو الزوج) مع بطاقته السارية عند الاستخراج لأول مرة.',
          'مستند إثبات محل الإقامة (إيصال كهرباء أو غاز أو مياه حديث باسم صاحب الشأن أو عقد إيجار موثق).',
          'مستند إثبات المهنة (خطاب جهة العمل أو النقابة أو المؤهل الدراسي للخريجين).'
        ],
        bulletsEn: [
          'National ID application form (Standard, Express, or VIP).',
          'Original computerized birth certificate (first-time applicants).',
          'First-degree guarantor with valid National ID (first-time).',
          'Proof of residence (recent utility bill or notarized lease).',
          'Proof of profession or academic degree.'
        ]
      }
    ],
    faqs: [
      {
        question: 'ما هو السن القانوني لاستخراج البطاقة الشخصية في مصر؟',
        questionEn: 'What is the legal age for obtaining an Egyptian National ID?',
        answer: 'أصبح السن القانوني لإلزامية استخراج بطاقة الرقم القومي في مصر هو 15 عاماً.',
        answerEn: 'The legal age for issuing a National ID in Egypt is 15 years old.'
      },
      {
        question: 'هل يتطلب تجديد البطاقة دون تغيير بيانات إحضار ضامن؟',
        questionEn: 'Does simple renewal without data changes require a guarantor?',
        answer: 'في حال التجديد المطابق لنفس البيانات السابقة دون تعديل، لا يُطلب ضامن أو أوراق إثبات إقامة إضافية في أغلب الأحوال.',
        answerEn: 'Simple renewals without data changes typically do not require a guarantor or extra utility bills.'
      }
    ]
  },
  {
    id: 'guide-criminal-record',
    slug: 'estekhrag-fish-we-tashbih-mustaagel-wa-adi',
    title: 'استخراج فيش وتشبيه 2026: الأوراق المطلوبة والرسوم للنسخة الورقية والإلكترونية',
    titleEn: 'How to Issue a Criminal Record Certificate (Fish & Tashbih) in Egypt 2026',
    excerpt: 'تعرف على شروط وأوراق استخراج صحيفة الحالة الجنائية (الفيش والتشبيه) للتوظيف أو السفر أو التقديم للكليات في قسم الشرطة أو الأدلة الجنائية.',
    excerptEn: 'Complete steps and documents for obtaining a Criminal Record Certificate for employment, travel, or university admission.',
    categoryLabel: 'الأدلة الجنائية',
    categoryLabelEn: 'Criminal Records',
    publishedAt: '2026-02-10',
    updatedAt: '2026-11-15',
    readingTime: '3 دقائق قراءة',
    readingTimeEn: '3 min read',
    keywords: [
      'استخراج فيش وتشبيه',
      'الأوراق المطلوبة للفيش والتشبيه',
      'فيش وتشبيه مستعجل',
      'رسوم الفيش الجنائي 2026'
    ],
    relatedServiceSlugs: [
      'estekhrag-fish-we-tashbih-momaykan'
    ],
    officialSourceName: 'وزارة الداخلية المصرية - الأدلة الجنائية',
    officialSourceUrl: 'https://moi.gov.eg',
    sections: [
      {
        heading: 'الأوراق المطلوبة لاستخراج فيش وتشبيه مميكن',
        headingEn: 'Documents Needed for Fish & Tashbih',
        paragraphs: [
          'صحيفة الحالة الجنائية (الفيش والتشبيه) وثيقة رسمية صالحة لمدة 3 أشهر من تاريخ إصدارها وموجهة لجهة واحدة محددة.'
        ],
        paragraphsEn: [
          'The Criminal Record Certificate is valid for 3 months from issuance and is addressed to a single specified entity.'
        ],
        bullets: [
          'أصل بطاقة الرقم القومي سارية المفعول.',
          'شهادة الميلاد المميكنة لمن هم دون 16 عاماً.',
          'تحديد اسم الجهة الموجه إليها الفيش بدقة (شركة، وزارة، كلية، سفر، نقابة).',
          'الحضور الشخصي لأخذ بصمات الأصابع العشر والتصوير الفوري.'
        ],
        bulletsEn: [
          'Valid original National ID card.',
          'Computerized birth certificate for minors under 16.',
          'Exact name of the destination entity.',
          'In-person attendance for digital 10-finger biometrics and photo.'
        ]
      }
    ],
    faqs: [
      {
        question: 'ما مدة صلاحية الفيش والتشبيه؟',
        questionEn: 'How long is a Criminal Record Certificate valid?',
        answer: 'تسري صلاحية الفيش والتشبيه لمدة 3 أشهر فقط من تاريخ الإصدار، وللجهة المحددة فيه فقط.',
        answerEn: 'It is valid for 3 months from the date of issue and only for the named organization.'
      }
    ]
  },
  {
    id: 'guide-driving-and-car-license',
    slug: 'awraq-rokhset-elqiyada-wa-tagdid-rokhset-elsayara',
    title: 'الأوراق المطلوبة لرخصة القيادة وتجديد رخصة السيارة في المرور 2026',
    titleEn: 'Required Documents for Driving License & Car Renewal in Egypt 2026',
    excerpt: 'دليل وحدات المرور: أوراق استخراج رخصة قيادة خاصة لأول مرة، الكشف الطبي، وأوراق تجديد رخصة السيارة وشهادة المخالفات والفحص الفني.',
    excerptEn: 'Traffic unit guide covering first-time driving license papers, medical checks, car renewal, and technical inspection.',
    categoryLabel: 'المرور والتراخيص',
    categoryLabelEn: 'Traffic & Licensing',
    publishedAt: '2026-02-14',
    updatedAt: '2026-11-15',
    readingTime: '4 دقائق قراءة',
    readingTimeEn: '4 min read',
    keywords: [
      'الأوراق المطلوبة لرخصة القيادة',
      'تجديد رخصة السيارة',
      'شهادة المخالفات المرورية',
      'مرور شبين الكوم وقويسنا'
    ],
    relatedServiceSlugs: [
      'awraq-estekhrag-rokhset-qiyada',
      'tagdid-rokhset-sayara-shebin-elkom',
      'tagdid-rokhset-sayara-quesna'
    ],
    officialSourceName: 'الإدارة العامة للمرور - وزارة الداخلية المصرية',
    officialSourceUrl: 'https://moi.gov.eg',
    sections: [
      {
        heading: 'الأوراق المطلوبة لاستخراج رخصة القيادة الخاصة لأول مرة',
        headingEn: 'Documents for First-Time Private Driving License',
        paragraphs: [
          'يُشترط لاستخراج رخصة القيادة الخاصة ألا يقل سن المتقدم عن 18 عاماً واجتياز اختبارات القيادة والإشارات:'
        ],
        paragraphsEn: [
          'Applicants must be at least 18 years old and pass theoretical signs and practical driving tests:'
        ],
        bullets: [
          'بطاقة الرقم القومي سارية وصورتان منها (محل الإقامة مطابق لنطاق وحدة المرور).',
          'شهادتا كشف طبي (باطنة + نظر) معتمدتان من مستشفى حكومي أو مركز معتمد بالمرور.',
          'أصل المؤهل الدراسي أو شهادة محو الأمية.',
          '4 صور شخصية حديثة بخلفية بيضاء.',
          'شراء ملف التقديم واجتياز الاختبار النظري والعملي للقيادة.'
        ],
        bulletsEn: [
          'Valid National ID matching traffic jurisdiction + 2 copies.',
          'Approved internal medicine and eye medical certificates.',
          'Original academic qualification or literacy certificate.',
          '4 recent personal photos with white background.',
          'Pass traffic theory and practical driving tests.'
        ]
      },
      {
        heading: 'الأوراق المطلوبة لتجديد رخصة السيارة الملاكي',
        headingEn: 'Documents for Car License Renewal',
        paragraphs: [
          'عند تجديد رخصة تسيير السيارة في وحدات المرور (مثل شبين الكوم وقويسنا)، تأكد من تجهيز المستندات التالية:'
        ],
        paragraphsEn: [
          'When renewing your car registration license, prepare the following papers:'
        ],
        bullets: [
          'الرخصة المنتهية للسيارة + بطاقة الرقم القومي السارية للمالك.',
          'شهادة براءة الذمة (شهادة المخالفات المرورية) سارية ومسددة.',
          'وثيقة التأمين الإجباري السارية للمدة الجديدة (سنة أو 3 سنوات).',
          'ورقة فحص فني وبصمة الشاسيه والموتور (في سنوات الفحص المقررة) + مثلث عاكس وطفاية حريق وشنطة إسعافات.'
        ],
        bulletsEn: [
          'Old car license + valid owner National ID.',
          'Paid traffic violations clearance certificate.',
          'Mandatory vehicle insurance policy covering renewal period.',
          'Technical inspection, fire extinguisher, warning triangle, and first-aid kit.'
        ]
      }
    ],
    faqs: [
      {
        question: 'كم مدة صلاحية شهادة المخالفات المرورية عند تجديد رخصة السيارة؟',
        questionEn: 'How long is the traffic clearance certificate valid?',
        answer: 'تسري شهادة المخالفات عادة لمدة 15 يوماً من تاريخ إصدارها لإتمام إجراءات التجديد في المرور.',
        answerEn: 'A traffic clearance certificate is typically valid for 15 days from issuance.'
      }
    ]
  },
  {
    id: 'guide-university-admission',
    slug: 'awraq-taqdim-koliyat-wa-gam3at-misr',
    title: 'الأوراق المطلوبة للتقديم للكليات والجامعات المصرية 2026 (دليل الطلاب الجدد)',
    titleEn: 'Required Documents for Egyptian Colleges & Universities Admission 2026',
    excerpt: 'قائمة مفصلة بملف التقديم للجامعات والكليات الحكومية: أصل الثانوية العامة، بطاقة الترشيح، نموذج 2 جند و6 جند، الكشف الطبي وإثبات القيد.',
    excerptEn: 'Checklist for newly admitted college students: High school certificate, Tansik nomination card, military forms 2 & 6, and medical check.',
    categoryLabel: 'التعليم والجامعات',
    categoryLabelEn: 'Education & Universities',
    publishedAt: '2026-02-18',
    updatedAt: '2026-11-15',
    readingTime: '3 دقائق قراءة',
    readingTimeEn: '3 min read',
    keywords: [
      'الأوراق المطلوبة للتقديم للكليات',
      'أوراق التقديم للجامعة للطلاب الجدد',
      'نموذج 2 جند و6 جند',
      'تقديم جامعة المنوفية'
    ],
    relatedServiceSlugs: [
      'awraq-taqdim-koliyat-gameat-elmenoufia',
      'estekhrag-ethbat-qaid-dirasi',
      'estekhrag-shehadet-takharog-bayan-daragat'
    ],
    officialSourceName: 'بوابة جامعة المنوفية الرسمية - شؤون الطلاب',
    officialSourceUrl: 'https://www.menofia.edu.eg',
    sections: [
      {
        heading: 'محتويات ملف التقديم الرسمي للكليات الحكومية',
        headingEn: 'Official Freshmen College Enrollment Folder',
        paragraphs: [
          'عقب ظهور نتيجة التنسيق، يجب تجهيز ملف التقديم وتسليمه لشؤون الطلاب بالكلية المرشح لها في المواعيد المعلنة:'
        ],
        paragraphsEn: [
          'After receiving your Tansik nomination result, submit the complete enrollment dossier to your faculty student affairs office:'
        ],
        bullets: [
          'بطاقة الترشيح النهائية مطبوعة من موقع التنسيق الإلكتروني (صورتان).',
          'أصل استمارة شهادة الثانوية العامة (أو الدبلوم الفني) + 3 صور ضوئية.',
          'أصل شهادة الميلاد المميكنة بالرقم القومي + 3 صور.',
          'صورة بطاقة الرقم القومي للطالب وولي الأمر.',
          '6 إلى 8 صور شخصية حديثة 4×6 مدون خلفها اسم الطالب والرقم القومي.',
          'نموذج 2 جند للطلاب الذكور + نموذج 6 جند (أو بطاقة 6 جند لمواليد السن المحدد) من منطقة التجنيد أو القسم.',
          'استمارة الكشف الطبي المعتمدة من الإدارة الطبية بالجامعة.'
        ],
        bulletsEn: [
          'Printed final Tansik nomination card (2 copies).',
          'Original High School certificate + 3 copies.',
          'Original computerized birth certificate + 3 copies.',
          'Copies of student and guardian National ID cards.',
          '6-8 recent 4x6 personal photos.',
          'Military forms 2 Gond and 6 Gond for male students.',
          'Approved university medical examination card.'
        ]
      }
    ],
    faqs: [
      {
        question: 'من أين يستخرج الطالب نموذج 2 جند و6 جند للتقديم للكلية؟',
        questionEn: 'Where do male students obtain military forms 2 and 6 Gond?',
        answer: 'يُستخرج نموذج 2 جند من مديرية الأمن أو مركز التجنيد أو مكاتب البريد المخصصة، بينما تُستخرج بطاقة 6 جند من قسم الشرطة التابع له محل إقامة الطالب.',
        answerEn: 'Form 2 Gond is obtained from recruitment offices/directorates, and Form 6 Gond from the local police station.'
      }
    ]
  },
  {
    id: 'guide-state-treatment-menoufia',
    slug: 'dalil-elag-ala-nafaqat-eldawla-wal-mostashfayat',
    title: 'دليل أوراق العلاج على نفقة الدولة وحجز العيادات بالمستشفيات بالمنوفية',
    titleEn: 'State-Funded Medical Treatment & Hospital Clinics Guide - Menoufia',
    excerpt: 'الأوراق المطلوبة لإصدار قرار العلاج على نفقة الدولة، تقرير اللجنة الثلاثية، وإجراءات المستشفى الجامعي ومعهد الكبد ومستشفى قويسنا المركزي.',
    excerptEn: 'Documents required for state-funded therapy decisions, medical committee reports, and Menoufia hospitals.',
    categoryLabel: 'الصحة والمستشفيات',
    categoryLabelEn: 'Health & Hospitals',
    publishedAt: '2026-02-20',
    updatedAt: '2026-11-15',
    readingTime: '4 دقائق قراءة',
    readingTimeEn: '4 min read',
    keywords: [
      'العلاج على نفقة الدولة',
      'تقرير اللجنة الثلاثية',
      'مستشفى شبين الكوم الجامعي',
      'معهد الكبد القومي بشبين الكوم',
      'مستشفى قويسنا المركزي'
    ],
    relatedServiceSlugs: [
      'qarar-elag-ala-nafaqat-eldawla',
      'mostashfa-shebin-elkom-elgam3i-awraq',
      'ma3had-elkabed-elqawmi-shebin-elkom',
      'mostashfa-quesna-elmarkazi-awraq'
    ],
    officialSourceName: 'المجالس الطبية المتخصصة - وزارة الصحة والسكان',
    officialSourceUrl: 'https://wlms.smcegy.com',
    sections: [
      {
        heading: 'الأوراق المطلوبة لاستخراج قرار العلاج على نفقة الدولة',
        headingEn: 'Documents for State-Funded Treatment Decision',
        paragraphs: [
          'تقدم الخدمة مجاناً للمواطنين غير الخاضعين لمظلة التأمين الصحي الشامل أو التأمين الصحي، عبر المستشفيات الحكومية والجامعية:'
        ],
        paragraphsEn: [
          'Provided free of charge for eligible uninsured citizens through public and university hospitals:'
        ],
        bullets: [
          'صورة بطاقة الرقم القومي السارية للمريض (وجه وظهر) على ورقة واحدة.',
          'أصل تقرير اللجنة الثلاثية معتمد ومختوم من المستشفى الحكومي أو الجامعي (شبين الكوم الجامعي، معهد الكبد، التعليمي، أو قويسنا المركزي).',
          'نتائج الفحوصات والتحاليل والأشعة الحديثة الدالة على التشخيص الطبي.',
          'أصل بحث اجتماعي في بعض حالات الزرع أو الجراحات الدقيقة عند طلبه.'
        ],
        bulletsEn: [
          'Copy of valid National ID card (front & back).',
          'Original stamped Medical Committee (Triple Committee) report from a public/university hospital.',
          'Recent supporting lab tests and radiology reports.',
          'Social research document when required for major procedures.'
        ]
      }
    ],
    faqs: [
      {
        question: 'كم يستغرق صدور قرار العلاج على نفقة الدولة؟',
        questionEn: 'How long does it take to issue the state-funded treatment decision?',
        answer: 'يتم الرفع إلكترونياً عبر شبكة المجالس الطبية المتخصصة وتصدر الموافقة غالباً خلال 48 ساعة إلى 7 أيام عمل، وتصل رسالة SMS على هاتف المريض.',
        answerEn: 'Electronically submitted requests are typically approved within 48 hours to 7 business days with SMS notification.'
      }
    ]
  }
];

import type { Request } from 'express';
import { ServiceItem, GuideArticle } from '../types';
import { GUIDES_DATA } from '../data/guidesData';
import { enrichServiceWithSeo, findServiceBySlugOrId, getServiceSlug } from '../data/seoMetadata';

function escapeHtml(str: string): string {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

export function getBaseUrl(req: Request): string {
  const envUrl = (process.env.APP_URL || '').trim().replace(/\/+$/, '');
  if (envUrl) return envUrl;
  const protoHeader = (req.headers['x-forwarded-proto'] as string) || req.protocol || 'https';
  const proto = protoHeader.split(',')[0].trim();
  const host = ((req.headers['x-forwarded-host'] as string) || req.get('host') || 'localhost:3000')
    .split(',')[0]
    .trim();
  return `${proto}://${host}`;
}

export function isPrivateOrAdminRequest(req: Request): boolean {
  const path = (req.path || '/').toLowerCase();
  const query = req.query || {};
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path === '/login' ||
    path.startsWith('/login/') ||
    path.startsWith('/api/') ||
    path.startsWith('/requests') ||
    path.startsWith('/medical') ||
    path.startsWith('/documents') ||
    path.startsWith('/profile') ||
    path.startsWith('/account') ||
    path.startsWith('/dashboard') ||
    path.startsWith('/orders') ||
    String(query.admin || '').toLowerCase() === 'true' ||
    String(query.portal || '').toLowerCase() === 'admin' ||
    Boolean(query.token)
  );
}

export function getCanonicalRedirect(req: Request, rawServices: ServiceItem[]): string | null {
  if (req.method !== 'GET' || isPrivateOrAdminRequest(req)) return null;
  const rawPath = req.path || '/';
  // Remove duplicate trailing slash on non-root public pages
  if (rawPath.length > 1 && rawPath.endsWith('/')) {
    const trimmed = rawPath.replace(/\/+$/, '') || '/';
    return trimmed;
  }
  // Redirect legacy service ID URLs (e.g., /services/gov-passport-new) to unified canonical slug
  if (rawPath.startsWith('/services/')) {
    const slugParam = decodeURIComponent(rawPath.slice('/services/'.length));
    const services = rawServices.map(enrichServiceWithSeo);
    const srv = findServiceBySlugOrId(services, slugParam);
    if (srv) {
      const canonicalSlug = getServiceSlug(srv);
      if (slugParam !== canonicalSlug) {
        return `/services/${encodeURIComponent(canonicalSlug)}`;
      }
    }
  }
  return null;
}

export function buildRobotsTxt(baseUrl: string): string {
  return [
    'User-agent: *',
    'Allow: /',
    'Allow: /services/',
    'Allow: /guides',
    'Allow: /guides/',
    'Disallow: /admin',
    'Disallow: /admin/',
    'Disallow: /login',
    'Disallow: /login/',
    'Disallow: /api/',
    'Disallow: /requests',
    'Disallow: /medical',
    'Disallow: /documents',
    'Disallow: /profile',
    'Disallow: /account',
    'Disallow: /dashboard',
    'Disallow: /orders',
    'Disallow: /*?admin=*',
    'Disallow: /*?portal=*',
    '',
    `Sitemap: ${baseUrl}/sitemap.xml`,
    ''
  ].join('\n');
}

export function buildSitemapXml(baseUrl: string, rawServices: ServiceItem[]): string {
  const today = new Date().toISOString().slice(0, 10);
  const services = rawServices.map(enrichServiceWithSeo);

  const urls: { loc: string; lastmod: string; changefreq: string; priority: string }[] = [
    { loc: `${baseUrl}/`, lastmod: today, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/guides`, lastmod: today, changefreq: 'weekly', priority: '0.9' }
  ];

  for (const srv of services) {
    const slug = getServiceSlug(srv);
    urls.push({
      loc: `${baseUrl}/services/${encodeURIComponent(slug)}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: '0.9'
    });
  }

  for (const guide of GUIDES_DATA) {
    urls.push({
      loc: `${baseUrl}/guides/${encodeURIComponent(guide.slug)}`,
      lastmod: guide.updatedAt || today,
      changefreq: 'monthly',
      priority: '0.85'
    });
  }

  const entries = urls
    .map(
      u => `  <url>
    <loc>${escapeHtml(u.loc)}</loc>
    <lastmod>${escapeHtml(u.lastmod)}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
    )
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>
`;
}

function buildOrganizationSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SKIP - منصة المعاملات والخدمات الذكية',
    alternateName: 'SKIP Egypt',
    url: baseUrl,
    logo: `${baseUrl}/assets/aistudio/image_5ae8ef1d.png`,
    description:
      'دليل المواطنين في مصر ومحافظة المنوفية لمعرفة وفحص الأوراق المطلوبة للخدمات الحكومية والتعليمية والصحية والإسكانية قبل التوجه للجهات الرسمية.',
    areaServed: {
      '@type': 'Country',
      name: 'Egypt'
    }
  };
}

function buildWebSiteSchema(baseUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'SKIP - اعرف المطلوب قبل ما تروح',
    url: baseUrl,
    inLanguage: 'ar-EG',
    potentialAction: {
      '@type': 'SearchAction',
      target: `${baseUrl}/?q={search_term_string}`,
      'query-input': 'required name=search_term_string'
    }
  };
}

function getCategoryArabicLabel(category: ServiceItem['category']): string {
  switch (category) {
    case 'government':
      return 'خدمات حكومية وهويات';
    case 'educational':
      return 'تعليم وجامعات';
    case 'housing':
      return 'إسكان ومرافق';
    case 'health':
      return 'مستشفيات وصحة';
    default:
      return 'خدمات عامة';
  }
}

function renderServiceSnapshotHtml(baseUrl: string, srv: ServiceItem, allServices: ServiceItem[]): string {
  const officialFee = srv.officialFee ?? srv.fee;
  const skipFee = srv.skipFee ?? 0;
  const relatedGuides = GUIDES_DATA.filter(g => g.relatedServiceSlugs.includes(getServiceSlug(srv)));
  const relatedServices = allServices
    .filter(s => s.category === srv.category && s.id !== srv.id)
    .slice(0, 4);

  return `
    <main dir="rtl" lang="ar" style="max-width:960px;margin:0 auto;padding:24px;font-family:Cairo,sans-serif;line-height:1.7;color:#0f172a">
      <nav aria-label="Breadcrumb">
        <a href="${baseUrl}/">الرئيسية</a> /
        <span>${escapeHtml(getCategoryArabicLabel(srv.category))}</span> /
        <span>${escapeHtml(srv.title)}</span>
      </nav>
      <header>
        <p>${escapeHtml(srv.responsibleEntity)}</p>
        <h1>${escapeHtml(srv.title)}</h1>
        <p>${escapeHtml(srv.description)}</p>
      </header>
      <section>
        <h2>ملخص الخدمة والرسوم والمدة المتوقعة</h2>
        <ul>
          <li><strong>الرسوم الحكومية الرسمية:</strong> ${officialFee} جنيه مصري</li>
          <li><strong>رسوم خدمة SKIP:</strong> ${skipFee > 0 ? `${skipFee} جنيه مصري (تُفعّل بعد الترخيص الرسمي)` : 'مجانية لفحص الأوراق'}</li>
          <li><strong>المدة المتوقعة للإنجاز:</strong> ${escapeHtml(srv.estimatedDuration)}</li>
          <li><strong>المصدر الحكومي الرسمي:</strong> <a href="${escapeHtml(srv.officialSourceUrl || 'https://digital.gov.eg')}" target="_blank" rel="noopener noreferrer">${escapeHtml(srv.officialSourceName || srv.responsibleEntity)}</a></li>
        </ul>
      </section>
      <section>
        <h2>الأوراق والمستندات المطلوبة</h2>
        <ul>
          ${srv.requiredDocuments
            .map(
              d =>
                `<li>${escapeHtml(d.name)}${d.copiesCount ? ` (${d.copiesCount} نسخ)` : ''}${d.notes ? ` — ${escapeHtml(d.notes)}` : ''}</li>`
            )
            .join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>شروط استخراج الخدمة</h2>
        <ul>
          ${srv.conditions.map(c => `<li>${escapeHtml(c)}</li>`).join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>خطوات التقديم الرسمية</h2>
        <ol>
          ${srv.procedureSteps.map(step => `<li>${escapeHtml(step)}</li>`).join('\n          ')}
        </ol>
      </section>
      ${
        relatedGuides.length > 0
          ? `<section><h2>أدلة ومقالات ذات صلة</h2><ul>${relatedGuides
              .map(g => `<li><a href="${baseUrl}/guides/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a></li>`)
              .join('')}</ul></section>`
          : ''
      }
      ${
        relatedServices.length > 0
          ? `<section><h2>خدمات مشابهة</h2><ul>${relatedServices
              .map(
                rs =>
                  `<li><a href="${baseUrl}/services/${escapeHtml(getServiceSlug(rs))}">${escapeHtml(rs.title)}</a></li>`
              )
              .join('')}</ul></section>`
          : ''
      }
    </main>
  `;
}

function renderGuideSnapshotHtml(baseUrl: string, guide: GuideArticle, allServices: ServiceItem[]): string {
  const relatedServices = guide.relatedServiceSlugs
    .map(slug => findServiceBySlugOrId(allServices, slug))
    .filter((s): s is ServiceItem => Boolean(s));

  return `
    <main dir="rtl" lang="ar" style="max-width:960px;margin:0 auto;padding:24px;font-family:Cairo,sans-serif;line-height:1.7;color:#0f172a">
      <nav aria-label="Breadcrumb">
        <a href="${baseUrl}/">الرئيسية</a> /
        <a href="${baseUrl}/guides">أدلة ومقالات الإجراءات</a> /
        <span>${escapeHtml(guide.title)}</span>
      </nav>
      <article>
        <header>
          <p>${escapeHtml(guide.categoryLabel)} · آخر تحديث: ${escapeHtml(guide.updatedAt)}</p>
          <h1>${escapeHtml(guide.title)}</h1>
          <p>${escapeHtml(guide.excerpt)}</p>
        </header>
        ${guide.sections
          .map(
            sec => `
          <section>
            <h2>${escapeHtml(sec.heading)}</h2>
            ${sec.paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('')}
            ${sec.bullets ? `<ul>${sec.bullets.map(b => `<li>${escapeHtml(b)}</li>`).join('')}</ul>` : ''}
          </section>`
          )
          .join('')}
        ${
          guide.faqs.length > 0
            ? `<section><h2>الأسئلة الشائعة</h2>${guide.faqs
                .map(f => `<div><h3>${escapeHtml(f.question)}</h3><p>${escapeHtml(f.answer)}</p></div>`)
                .join('')}</section>`
            : ''
        }
        <p>المصدر الرسمي: <a href="${escapeHtml(guide.officialSourceUrl)}" target="_blank" rel="noopener noreferrer">${escapeHtml(guide.officialSourceName)}</a></p>
      </article>
      ${
        relatedServices.length > 0
          ? `<section><h2>صفحات الخدمات المرتبطة</h2><ul>${relatedServices
              .map(s => `<li><a href="${baseUrl}/services/${escapeHtml(getServiceSlug(s))}">${escapeHtml(s.title)}</a></li>`)
              .join('')}</ul></section>`
          : ''
      }
    </main>
  `;
}

function renderHomeSnapshotHtml(baseUrl: string, services: ServiceItem[]): string {
  return `
    <main dir="rtl" lang="ar" style="max-width:1100px;margin:0 auto;padding:24px;font-family:Cairo,sans-serif;line-height:1.7;color:#0f172a">
      <header>
        <h1>SKIP — اعرف الأوراق المطلوبة للخدمات الحكومية والمستشفيات في مصر والمنوفية قبل ما تروح</h1>
        <p>دليل المواطن المصري الشامل للأوراق المطلوبة وشروط التقديم وخطوات استخراج جواز السفر، بطاقة الرقم القومي، الفيش والتشبيه، رخصة القيادة، تجديد رخصة السيارة، التقديم للكليات، وخدمات المستشفيات في شبين الكوم وقويسنا.</p>
      </header>
      <section>
        <h2>دليل الخدمات الحكومية والتعليمية والصحية</h2>
        <ul>
          ${services
            .map(srv => {
              const slug = getServiceSlug(srv);
              return `<li><a href="${baseUrl}/services/${escapeHtml(slug)}">${escapeHtml(srv.title)}</a> — ${escapeHtml(srv.description)}</li>`;
            })
            .join('\n          ')}
        </ul>
      </section>
      <section>
        <h2>أدلة ومقالات الإجراءات الحكومية في مصر</h2>
        <ul>
          ${GUIDES_DATA.map(
            g => `<li><a href="${baseUrl}/guides/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a> — ${escapeHtml(g.excerpt)}</li>`
          ).join('\n          ')}
        </ul>
      </section>
    </main>
  `;
}

function renderGuidesIndexSnapshotHtml(baseUrl: string): string {
  return `
    <main dir="rtl" lang="ar" style="max-width:960px;margin:0 auto;padding:24px;font-family:Cairo,sans-serif;line-height:1.7;color:#0f172a">
      <nav aria-label="Breadcrumb">
        <a href="${baseUrl}/">الرئيسية</a> / <span>أدلة ومقالات الإجراءات الحكومية</span>
      </nav>
      <h1>أدلة ومقالات الأوراق المطلوبة للخدمات الحكومية في مصر 2026</h1>
      <p>شروحات مبسطة ودقيقة للأوراق والشروط والرسوم الرسمية لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخص القيادة والسيارات، والتقديم للجامعات.</p>
      <ul>
        ${GUIDES_DATA.map(
          g => `<li><h2><a href="${baseUrl}/guides/${escapeHtml(g.slug)}">${escapeHtml(g.title)}</a></h2><p>${escapeHtml(g.excerpt)}</p></li>`
        ).join('\n        ')}
      </ul>
    </main>
  `;
}

export interface SeoInjectResult {
  html: string;
  statusCode: number;
  isPrivate: boolean;
}

export function injectSeoIntoHtml(
  templateHtml: string,
  req: Request,
  rawServices: ServiceItem[]
): SeoInjectResult {
  const baseUrl = getBaseUrl(req);
  const services = rawServices.map(enrichServiceWithSeo);
  const path = (req.path || '/').replace(/\/+$/, '') || '/';
  const defaultOgImage = `${baseUrl}/assets/aistudio/image_5ae8ef1d.png`;

  // 1. PRIVATE / ADMIN ROUTES -> Strict noindex, nofollow
  if (isPrivateOrAdminRequest(req)) {
    const privateTags = `
    <title>بوابة الإدارة والعمليات الخاصة | SKIP</title>
    <meta name="robots" content="noindex, nofollow, noarchive, nosnippet" />
    <meta name="googlebot" content="noindex, nofollow" />
    `;
    const html = applyHeadAndRoot(templateHtml, privateTags, '', []);
    return { html, statusCode: 200, isPrivate: true };
  }

  // 2. SERVICE DETAIL PAGE (/services/:slug)
  if (path.startsWith('/services/')) {
    const slugParam = path.slice('/services/'.length);
    const srv = findServiceBySlugOrId(services, slugParam);

    if (!srv) {
      const notFoundTags = `
      <title>الخدمة غير موجودة | SKIP</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="${escapeHtml(baseUrl)}/" />
      `;
      const html = applyHeadAndRoot(templateHtml, notFoundTags, renderHomeSnapshotHtml(baseUrl, services), []);
      return { html, statusCode: 404, isPrivate: false };
    }

    const canonicalSlug = getServiceSlug(srv);
    const canonicalUrl = `${baseUrl}/services/${encodeURIComponent(canonicalSlug)}`;
    const title = srv.seoTitle || `${srv.title} | SKIP`;
    const description = srv.seoDescription || srv.description;
    const keywords = (srv.keywords || []).join('، ');
    const officialFee = srv.officialFee ?? srv.fee;

    const headTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(keywords)}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="SKIP - اعرف المطلوب قبل ما تروح" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(defaultOgImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(defaultOgImage)}" />
    `;

    const schemas = [
      buildOrganizationSchema(baseUrl),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: getCategoryArabicLabel(srv.category), item: `${baseUrl}/#services` },
          { '@type': 'ListItem', position: 3, name: srv.title, item: canonicalUrl }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: srv.title,
        description,
        serviceType: getCategoryArabicLabel(srv.category),
        provider: {
          '@type': 'GovernmentOrganization',
          name: srv.responsibleEntity,
          url: srv.officialSourceUrl || 'https://digital.gov.eg'
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'محافظة المنوفية ومصر'
        },
        url: canonicalUrl,
        offers: {
          '@type': 'Offer',
          price: String(officialFee),
          priceCurrency: 'EGP'
        }
      },
      {
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name: `خطوات وأوراق ${srv.title}`,
        description,
        supply: srv.requiredDocuments.map(d => ({
          '@type': 'HowToSupply',
          name: d.name
        })),
        step: srv.procedureSteps.map((step, i) => ({
          '@type': 'HowToStep',
          position: i + 1,
          text: step
        }))
      }
    ];

    const html = applyHeadAndRoot(
      templateHtml,
      headTags,
      renderServiceSnapshotHtml(baseUrl, srv, services),
      schemas
    );
    return { html, statusCode: 200, isPrivate: false };
  }

  // 3. GUIDES INDEX (/guides)
  if (path === '/guides') {
    const canonicalUrl = `${baseUrl}/guides`;
    const title = 'أدلة ومقالات الأوراق المطلوبة للخدمات الحكومية في مصر 2026 | SKIP';
    const description =
      'مقالات وأدلة إرشادية لمعرفة الأوراق المطلوبة لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخصة القيادة، وتقديم الجامعات في مصر.';

    const headTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="الأوراق المطلوبة لاستخراج جواز سفر، تجديد جواز السفر المصري، الأوراق المطلوبة لاستخراج بطاقة شخصية، استخراج فيش وتشبيه، الأوراق المطلوبة لرخصة القيادة، تجديد رخصة السيارة، الأوراق المطلوبة للتقديم للكليات" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SKIP" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(defaultOgImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(defaultOgImage)}" />
    `;

    const schemas = [
      buildOrganizationSchema(baseUrl),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'أدلة ومقالات', item: canonicalUrl }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description,
        url: canonicalUrl
      }
    ];

    const html = applyHeadAndRoot(templateHtml, headTags, renderGuidesIndexSnapshotHtml(baseUrl), schemas);
    return { html, statusCode: 200, isPrivate: false };
  }

  // 4. GUIDE DETAIL ARTICLE (/guides/:slug)
  if (path.startsWith('/guides/')) {
    const guideSlug = decodeURIComponent(path.slice('/guides/'.length)).toLowerCase();
    const guide = GUIDES_DATA.find(g => g.slug.toLowerCase() === guideSlug || g.id.toLowerCase() === guideSlug);

    if (!guide) {
      const notFoundTags = `
      <title>الدليل غير موجود | SKIP</title>
      <meta name="robots" content="noindex, follow" />
      <link rel="canonical" href="${escapeHtml(baseUrl)}/guides" />
      `;
      const html = applyHeadAndRoot(templateHtml, notFoundTags, renderGuidesIndexSnapshotHtml(baseUrl), []);
      return { html, statusCode: 404, isPrivate: false };
    }

    const canonicalUrl = `${baseUrl}/guides/${encodeURIComponent(guide.slug)}`;
    const title = `${guide.title} | SKIP`;
    const description = guide.excerpt;

    const headTags = `
    <title>${escapeHtml(title)}</title>
    <meta name="description" content="${escapeHtml(description)}" />
    <meta name="keywords" content="${escapeHtml(guide.keywords.join('، '))}" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(canonicalUrl)}" />
    <meta property="og:type" content="article" />
    <meta property="og:site_name" content="SKIP" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:title" content="${escapeHtml(title)}" />
    <meta property="og:description" content="${escapeHtml(description)}" />
    <meta property="og:url" content="${escapeHtml(canonicalUrl)}" />
    <meta property="og:image" content="${escapeHtml(defaultOgImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(title)}" />
    <meta name="twitter:description" content="${escapeHtml(description)}" />
    <meta name="twitter:image" content="${escapeHtml(defaultOgImage)}" />
    `;

    const schemas: unknown[] = [
      buildOrganizationSchema(baseUrl),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${baseUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'أدلة ومقالات', item: `${baseUrl}/guides` },
          { '@type': 'ListItem', position: 3, name: guide.title, item: canonicalUrl }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.excerpt,
        datePublished: guide.publishedAt,
        dateModified: guide.updatedAt,
        inLanguage: 'ar-EG',
        author: {
          '@type': 'Organization',
          name: 'SKIP'
        },
        publisher: {
          '@type': 'Organization',
          name: 'SKIP',
          logo: {
            '@type': 'ImageObject',
            url: defaultOgImage
          }
        },
        mainEntityOfPage: canonicalUrl
      }
    ];

    if (guide.faqs.length > 0) {
      schemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: guide.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: f.answer
          }
        }))
      });
    }

    const html = applyHeadAndRoot(
      templateHtml,
      headTags,
      renderGuideSnapshotHtml(baseUrl, guide, services),
      schemas
    );
    return { html, statusCode: 200, isPrivate: false };
  }

  // 5. DEFAULT HOME PAGE (/)
  const homeUrl = `${baseUrl}/`;
  const homeTitle = 'SKIP | اعرف الأوراق المطلوبة للخدمات الحكومية والمستشفيات في مصر';
  const homeDescription =
    'دليلك السريع لمعرفة وفحص الأوراق المطلوبة لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخصة القيادة، تجديد رخصة السيارة، وتقديم الكليات بالمنوفية ومصر.';

  const headTags = `
    <title>${escapeHtml(homeTitle)}</title>
    <meta name="description" content="${escapeHtml(homeDescription)}" />
    <meta name="keywords" content="الأوراق المطلوبة لاستخراج جواز سفر، تجديد جواز السفر المصري، الأوراق المطلوبة لاستخراج بطاقة شخصية، استخراج فيش وتشبيه، الأوراق المطلوبة لرخصة القيادة، تجديد رخصة السيارة، الأوراق المطلوبة للتقديم للكليات، خدمات شبين الكوم وقويسنا" />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="${escapeHtml(homeUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="SKIP" />
    <meta property="og:locale" content="ar_EG" />
    <meta property="og:title" content="${escapeHtml(homeTitle)}" />
    <meta property="og:description" content="${escapeHtml(homeDescription)}" />
    <meta property="og:url" content="${escapeHtml(homeUrl)}" />
    <meta property="og:image" content="${escapeHtml(defaultOgImage)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escapeHtml(homeTitle)}" />
    <meta name="twitter:description" content="${escapeHtml(homeDescription)}" />
    <meta name="twitter:image" content="${escapeHtml(defaultOgImage)}" />
  `;

  const schemas = [buildOrganizationSchema(baseUrl), buildWebSiteSchema(baseUrl)];
  const html = applyHeadAndRoot(templateHtml, headTags, renderHomeSnapshotHtml(baseUrl, services), schemas);
  return { html, statusCode: 200, isPrivate: false };
}

function applyHeadAndRoot(
  templateHtml: string,
  dynamicHeadTags: string,
  rootInnerHtml: string,
  schemas: unknown[]
): string {
  // Strip existing static title/description/og/twitter/canonical/robots tags to avoid duplicates
  let result = templateHtml
    .replace(/<title>[\s\S]*?<\/title>/gi, '')
    .replace(/<meta\s+name="(?:description|keywords|robots|googlebot)"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '');

  const jsonLdScripts = schemas
    .map(schema => `<script type="application/ld+json">${safeJsonLd(schema)}</script>`)
    .join('\n    ');

  result = result.replace(
    '</head>',
    `    ${dynamicHeadTags.trim()}\n    ${jsonLdScripts}\n  </head>`
  );

  if (rootInnerHtml) {
    result = result.replace(
      '<div id="root"></div>',
      `<div id="root">${rootInnerHtml}</div>`
    );
  }

  return result;
}

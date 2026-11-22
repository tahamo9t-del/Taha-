import { ServiceItem, GuideArticle } from '../types';
import { getServiceSlug } from '../data/seoMetadata';

export function navigateTo(path: string) {
  try {
    if (window.location.pathname + window.location.search + window.location.hash === path) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    window.history.pushState(null, '', path);
    window.dispatchEvent(new Event('skip:navigate'));
    if (!path.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  } catch {
    window.location.href = path;
  }
}

function upsertMeta(attrName: 'name' | 'property', attrValue: string, content: string) {
  let el = document.head.querySelector(`meta[${attrName}="${attrValue}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attrName, attrValue);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href: string | null) {
  let el = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

function replaceJsonLd(schemas: unknown[]) {
  document.head.querySelectorAll('script[type="application/ld+json"]').forEach(n => n.remove());
  for (const schema of schemas) {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  }
}

function isPrivateClientRoute(routePath: string): boolean {
  const path = (routePath || '/').toLowerCase();
  const params = new URLSearchParams(window.location.search || '');
  return (
    path === '/admin' ||
    path.startsWith('/admin/') ||
    path === '/login' ||
    path.startsWith('/login/') ||
    path.startsWith('/requests') ||
    path.startsWith('/medical') ||
    path.startsWith('/documents') ||
    path.startsWith('/profile') ||
    path.startsWith('/account') ||
    path.startsWith('/dashboard') ||
    path.startsWith('/orders') ||
    params.get('admin')?.toLowerCase() === 'true' ||
    params.get('portal')?.toLowerCase() === 'admin' ||
    Boolean(params.get('token'))
  );
}

function buildOrgSchema(origin: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'SKIP - منصة المعاملات والخدمات الذكية',
    alternateName: 'SKIP Egypt',
    url: origin,
    logo: `${origin}/assets/aistudio/image_5ae8ef1d.png`,
    description:
      'دليل المواطنين في مصر ومحافظة المنوفية لمعرفة وفحص الأوراق المطلوبة للخدمات الحكومية والتعليمية والصحية والإسكانية قبل التوجه للجهات الرسمية.',
    areaServed: {
      '@type': 'Country',
      name: 'Egypt'
    }
  };
}

export function syncClientSeo(params: {
  isAdmin: boolean;
  routePath: string;
  service?: ServiceItem;
  guide?: GuideArticle;
}) {
  const origin = window.location.origin;
  const ogImage = `${origin}/assets/aistudio/image_5ae8ef1d.png`;
  const normalizedPath = (params.routePath || '/').replace(/\/+$/, '') || '/';

  if (params.isAdmin || isPrivateClientRoute(normalizedPath)) {
    document.title = 'بوابة الإدارة والعمليات الخاصة | SKIP';
    upsertMeta('name', 'robots', 'noindex, nofollow, noarchive, nosnippet');
    upsertMeta('name', 'googlebot', 'noindex, nofollow');
    upsertCanonical(null);
    replaceJsonLd([]);
    return;
  }

  if (normalizedPath.startsWith('/services/') && !params.service) {
    document.title = 'الخدمة غير موجودة | SKIP';
    upsertMeta('name', 'robots', 'noindex, follow');
    upsertCanonical(`${origin}/`);
    replaceJsonLd([]);
    return;
  }

  if (normalizedPath.startsWith('/guides/') && !params.guide) {
    document.title = 'الدليل غير موجود | SKIP';
    upsertMeta('name', 'robots', 'noindex, follow');
    upsertCanonical(`${origin}/guides`);
    replaceJsonLd([]);
    return;
  }

  if (params.service) {
    const srv = params.service;
    const slug = getServiceSlug(srv);
    const canonical = `${origin}/services/${encodeURIComponent(slug)}`;
    const title = srv.seoTitle || `${srv.title} | SKIP`;
    const desc = srv.seoDescription || srv.description;
    const officialFee = srv.officialFee ?? srv.fee;

    document.title = title;
    upsertMeta('name', 'description', desc);
    upsertMeta('name', 'keywords', (srv.keywords || []).join('، '));
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertCanonical(canonical);
    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:site_name', 'SKIP - اعرف المطلوب قبل ما تروح');
    upsertMeta('property', 'og:locale', 'ar_EG');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);

    replaceJsonLd([
      buildOrgSchema(origin),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: srv.title, item: canonical }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'GovernmentService',
        name: srv.title,
        description: desc,
        provider: {
          '@type': 'GovernmentOrganization',
          name: srv.responsibleEntity,
          url: srv.officialSourceUrl || 'https://digital.gov.eg'
        },
        areaServed: {
          '@type': 'AdministrativeArea',
          name: 'محافظة المنوفية ومصر'
        },
        url: canonical,
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
        description: desc,
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
    ]);
    return;
  }

  if (params.guide) {
    const g = params.guide;
    const canonical = `${origin}/guides/${encodeURIComponent(g.slug)}`;
    const title = `${g.title} | SKIP`;
    document.title = title;
    upsertMeta('name', 'description', g.excerpt);
    upsertMeta('name', 'keywords', g.keywords.join('، '));
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertCanonical(canonical);
    upsertMeta('property', 'og:type', 'article');
    upsertMeta('property', 'og:site_name', 'SKIP');
    upsertMeta('property', 'og:locale', 'ar_EG');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', g.excerpt);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', g.excerpt);
    upsertMeta('name', 'twitter:image', ogImage);

    const guideSchemas: unknown[] = [
      buildOrgSchema(origin),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'أدلة ومقالات', item: `${origin}/guides` },
          { '@type': 'ListItem', position: 3, name: g.title, item: canonical }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: g.title,
        description: g.excerpt,
        datePublished: g.publishedAt,
        dateModified: g.updatedAt,
        inLanguage: 'ar-EG',
        author: { '@type': 'Organization', name: 'SKIP' },
        publisher: {
          '@type': 'Organization',
          name: 'SKIP',
          logo: { '@type': 'ImageObject', url: ogImage }
        },
        mainEntityOfPage: canonical
      }
    ];

    if (g.faqs.length > 0) {
      guideSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: g.faqs.map(f => ({
          '@type': 'Question',
          name: f.question,
          acceptedAnswer: { '@type': 'Answer', text: f.answer }
        }))
      });
    }

    replaceJsonLd(guideSchemas);
    return;
  }

  if (normalizedPath === '/guides') {
    const canonical = `${origin}/guides`;
    const title = 'أدلة ومقالات الأوراق المطلوبة للخدمات الحكومية في مصر 2026 | SKIP';
    const desc =
      'مقالات وأدلة إرشادية لمعرفة الأوراق المطلوبة لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخصة القيادة، وتقديم الجامعات في مصر.';
    document.title = title;
    upsertMeta('name', 'description', desc);
    upsertMeta(
      'name',
      'keywords',
      'الأوراق المطلوبة لاستخراج جواز سفر، تجديد جواز السفر المصري، الأوراق المطلوبة لاستخراج بطاقة شخصية، استخراج فيش وتشبيه، الأوراق المطلوبة لرخصة القيادة، تجديد رخصة السيارة، الأوراق المطلوبة للتقديم للكليات'
    );
    upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
    upsertCanonical(canonical);
    upsertMeta('property', 'og:type', 'website');
    upsertMeta('property', 'og:site_name', 'SKIP');
    upsertMeta('property', 'og:locale', 'ar_EG');
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', desc);
    upsertMeta('property', 'og:url', canonical);
    upsertMeta('property', 'og:image', ogImage);
    upsertMeta('name', 'twitter:card', 'summary_large_image');
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', desc);
    upsertMeta('name', 'twitter:image', ogImage);
    replaceJsonLd([
      buildOrgSchema(origin),
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'الرئيسية', item: `${origin}/` },
          { '@type': 'ListItem', position: 2, name: 'أدلة ومقالات', item: canonical }
        ]
      },
      {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: title,
        description: desc,
        url: canonical
      }
    ]);
    return;
  }

  const homeUrl = `${origin}/`;
  const homeTitle = 'SKIP | اعرف الأوراق المطلوبة للخدمات الحكومية والمستشفيات في مصر';
  const homeDesc =
    'دليلك السريع لمعرفة وفحص الأوراق المطلوبة لاستخراج جواز السفر، البطاقة الشخصية، الفيش والتشبيه، رخصة القيادة، تجديد رخصة السيارة، وتقديم الكليات بالمنوفية ومصر.';
  document.title = homeTitle;
  upsertMeta('name', 'description', homeDesc);
  upsertMeta(
    'name',
    'keywords',
    'الأوراق المطلوبة لاستخراج جواز سفر، تجديد جواز السفر المصري، الأوراق المطلوبة لاستخراج بطاقة شخصية، استخراج فيش وتشبيه، الأوراق المطلوبة لرخصة القيادة، تجديد رخصة السيارة، الأوراق المطلوبة للتقديم للكليات، خدمات شبين الكوم وقويسنا'
  );
  upsertMeta('name', 'robots', 'index, follow, max-image-preview:large');
  upsertCanonical(homeUrl);
  upsertMeta('property', 'og:type', 'website');
  upsertMeta('property', 'og:site_name', 'SKIP');
  upsertMeta('property', 'og:locale', 'ar_EG');
  upsertMeta('property', 'og:title', homeTitle);
  upsertMeta('property', 'og:description', homeDesc);
  upsertMeta('property', 'og:url', homeUrl);
  upsertMeta('property', 'og:image', ogImage);
  upsertMeta('name', 'twitter:card', 'summary_large_image');
  upsertMeta('name', 'twitter:title', homeTitle);
  upsertMeta('name', 'twitter:description', homeDesc);
  upsertMeta('name', 'twitter:image', ogImage);
  replaceJsonLd([
    buildOrgSchema(origin),
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: 'SKIP - اعرف المطلوب قبل ما تروح',
      url: origin,
      inLanguage: 'ar-EG',
      potentialAction: {
        '@type': 'SearchAction',
        target: `${origin}/?q={search_term_string}`,
        'query-input': 'required name=search_term_string'
      }
    }
  ]);
}


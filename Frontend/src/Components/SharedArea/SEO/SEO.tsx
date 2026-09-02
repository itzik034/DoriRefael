import { Head } from 'vite-react-ssg';

export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: 'website' | 'article' | string;
    ogLocale?: string;
    noindex?: boolean;
    schema?: Record<string, any> | Record<string, any>[] | string;
    lang?: string;
    dir?: 'rtl' | 'ltr';
    children?: React.ReactNode;
}

const SITE_NAME = 'דורי רפאל';
const DEFAULT_TITLE = 'דורי רפאל | פדיקור רפואי קליני ושיקומי בתל אביב';
const DEFAULT_DESCRIPTION = 'דורי רפאל - מומחה כף רגל, פדיקור רפואי קליני ושיקומי בתל-אביב. מעל 20 שנות ניסיון בטיפול בציפורן חודרנית, פטרת עור וציפורניים, יבלות, כף רגל סוכרתית ועוד.';
const DEFAULT_KEYWORDS = 'פדיקור רפואי, דורי רפאל, טיפול בכף הרגל תל אביב, ציפורן חודרנית, פטרת ציפורניים, יבלות, פדיקור סוכרתי, SWIFT';
const BASE_URL = 'https://dorirefael.co.il';
const DEFAULT_OG_IMAGE = '/og-image.jpg';

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    canonical,
    ogTitle,
    ogDescription,
    ogImage = DEFAULT_OG_IMAGE,
    ogType = 'website',
    ogLocale = 'he_IL',
    noindex = false,
    schema,
    lang = 'he',
    dir = 'rtl',
    children,
}: SEOProps) {
    const fullTitle = title ? `${title}` : DEFAULT_TITLE;
    const metaOgTitle = ogTitle || fullTitle;
    const metaOgDescription = ogDescription || description;

    // Resolve canonical URL to an absolute URL
    const canonicalUrl = (() => {
        if (!canonical || canonical === '/' || canonical === '') {
            return `${BASE_URL}/`;
        }
        if (canonical.startsWith('http://') || canonical.startsWith('https://')) {
            return canonical;
        }
        return `${BASE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`;
    })();

    // Resolve OG image to an absolute URL
    const resolvedOgImage = (() => {
        const imagePath = ogImage || DEFAULT_OG_IMAGE;
        if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
            return imagePath;
        }
        return `${BASE_URL}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`;
    })();

    return (
        <Head>
            <html lang={lang} dir={dir} />
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content={ogType} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={metaOgTitle} />
            <meta property="og:description" content={metaOgDescription} />
            <meta property="og:image" content={resolvedOgImage} />
            <meta property="og:locale" content={ogLocale} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaOgTitle} />
            <meta name="twitter:description" content={metaOgDescription} />
            <meta name="twitter:image" content={resolvedOgImage} />

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Structured Data (JSON-LD) */}
            {schema && (
                Array.isArray(schema) ? (
                    schema.map((item, idx) => (
                        <script key={idx} type="application/ld+json">
                            {typeof item === 'string' ? item : JSON.stringify(item)}
                        </script>
                    ))
                ) : (
                    <script type="application/ld+json">
                        {typeof schema === 'string' ? schema : JSON.stringify(schema)}
                    </script>
                )
            )}

            {children}
        </Head>
    );
}


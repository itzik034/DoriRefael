import { Helmet } from 'react-helmet-async';

export interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    ogType?: string;
    noindex?: boolean;
}

const SITE_NAME = 'דורי רפאל';
const DEFAULT_TITLE = 'דורי רפאל | פדיקור רפואי קליני ושיקומי בתל אביב';
const DEFAULT_DESCRIPTION = 'דורי רפאל - מומחה כף רגל, פדיקור רפואי קליני ושיקומי בתל-אביב. מעל 20 שנות ניסיון בטיפול בציפורן חודרנית, פטרת עור וציפורניים, יבלות, כף רגל סוכרתית ועוד.';
const DEFAULT_KEYWORDS = 'פדיקור רפואי, דורי רפאל, טיפול בכף הרגל תל אביב, ציפורן חודרנית, פטרת ציפורניים, יבלות, פדיקור סוכרתי, SWIFT';
const BASE_URL = 'https://dorirefael.co.il';

export function SEO({
    title,
    description = DEFAULT_DESCRIPTION,
    keywords = DEFAULT_KEYWORDS,
    canonical,
    ogTitle,
    ogDescription,
    ogImage = '/src/assets/DoriProfile.webp',
    ogType = 'website',
    noindex = false,
}: SEOProps) {
    const fullTitle = title ? `${title}` : DEFAULT_TITLE;
    const metaOgTitle = ogTitle || fullTitle;
    const metaOgDescription = ogDescription || description;
    const canonicalUrl = canonical ? `${BASE_URL}${canonical.startsWith('/') ? canonical : '/' + canonical}` : BASE_URL;

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords} />}
            <link rel="canonical" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:site_name" content={SITE_NAME} />
            <meta property="og:type" content={ogType} />
            <meta property="og:title" content={metaOgTitle} />
            <meta property="og:description" content={metaOgDescription} />
            <meta property="og:url" content={canonicalUrl} />
            {ogImage && <meta property="og:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={metaOgTitle} />
            <meta name="twitter:description" content={metaOgDescription} />
            {ogImage && <meta name="twitter:image" content={ogImage.startsWith('http') ? ogImage : `${BASE_URL}${ogImage}`} />}

            {/* Robots */}
            {noindex && <meta name="robots" content="noindex, nofollow" />}
        </Helmet>
    );
}

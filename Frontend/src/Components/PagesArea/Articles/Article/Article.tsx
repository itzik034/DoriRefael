import { useMemo, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SEO } from '../../../SharedArea/SEO/SEO';
import { appConfig } from '../../../../Utils/AppConfig';
import { articlesService } from '../../../../Services/ArticlesService';
import { ArticleModel } from '../../../../Models/ArticleModel';
import DoriProfile from '../../../../assets/DoriProfile.webp';
import './Article.css';

interface ArticleProps {
    article?: ArticleModel;
}

export function Article(props: ArticleProps) {
    const params = useParams<{ slug: string }>();
    const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

    // Resolve article either from props (during SSG build) or from URL params (runtime routing)
    const article = useMemo(() => {
        if (props.article) {
            return props.article;
        }
        if (params.slug) {
            return articlesService.getArticleBySlug(params.slug);
        }
        return undefined;
    }, [props.article, params.slug]);

    // Parse FAQ items if provided
    const faqs = useMemo(() => {
        if (!article || !article.faq) return [];
        return articlesService.parseFaq(article.faq);
    }, [article]);

    // Retrieve related articles
    const relatedArticles = useMemo(() => {
        if (!article) return [];
        return articlesService.getAllArticles()
            .filter(a => a.slug !== article.slug)
            .slice(0, 3);
    }, [article]);

    // Calculate reading time estimate
    const readingTimeMinutes = useMemo(() => {
        if (!article?.html) return 2;
        const textOnly = article.html.replace(/<[^>]*>/g, ' ');
        const wordCount = textOnly.trim().split(/\s+/).length;
        return Math.max(1, Math.ceil(wordCount / 180));
    }, [article]);

    // Format publication date in Hebrew locale
    const formattedDate = useMemo(() => {
        if (!article?.publishedAt) return '';
        try {
            const date = new Date(article.publishedAt);
            return new Intl.DateTimeFormat('he-IL', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            }).format(date);
        } catch {
            return article.publishedAt;
        }
    }, [article]);

    // If article is not found, display 404 placeholder
    if (!article) {
        return (
            <div className="article-page" dir="rtl">
                <SEO
                    title="מאמר לא נמצא | דורי רפאל"
                    description="המאמר המבוקש לא נמצא באתר של דורי רפאל - פדיקור רפואי בתל אביב."
                    noindex={true}
                />
                <div className="article-page__container">
                    <div className="article__not-found">
                        <div className="article__not-found-icon">📄</div>
                        <h1 className="article__not-found-title">המאמר לא נמצא</h1>
                        <p className="article__not-found-text">
                            המאמר שחיפשת אינו קיים או שהוסר. מוזמן לעיין במאמרים נוספים או לחזור לדף הבית.
                        </p>
                        <NavLink to={appConfig.baseUrl + "/"} className="article__not-found-btn">
                            חזרה לדף הבית
                        </NavLink>
                    </div>
                </div>
            </div>
        );
    }

    const canonicalUrl = `https://dorirefael.co.il/articles/${article.slug}`;
    const metaDescription = article.description || article.excerpt || `מאמר מקצועי בנושא ${article.title} מאת דורי רפאל.`;
    const featuredImageUrl = article.image || 'https://dorirefael.co.il/og-image.jpg';

    // Structured Data: Article / MedicalWebPage Schema
    const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'MedicalWebPage',
        headline: article.title,
        description: metaDescription,
        image: featuredImageUrl.startsWith('http') ? featuredImageUrl : `https://dorirefael.co.il${featuredImageUrl}`,
        datePublished: article.publishedAt || undefined,
        dateModified: article.publishedAt || undefined,
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': canonicalUrl
        },
        author: {
            '@type': 'Person',
            name: 'דורי רפאל',
            jobTitle: 'מומחה כף רגל ופדיקור רפואי',
            url: 'https://dorirefael.co.il/about'
        },
        publisher: {
            '@type': 'Organization',
            name: 'דורי רפאל',
            url: 'https://dorirefael.co.il',
            logo: {
                '@type': 'ImageObject',
                url: 'https://dorirefael.co.il/src/assets/foot_w.png'
            }
        }
    };

    // Structured Data: BreadcrumbList Schema
    const breadcrumbSchema = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'דף הבית',
                item: 'https://dorirefael.co.il/'
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'מאמרים',
                item: 'https://dorirefael.co.il/'
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: article.title,
                item: canonicalUrl
            }
        ]
    };

    // Structured Data: FAQPage Schema (if FAQs exist)
    const faqSchema = faqs.length > 0 ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map(item => ({
            '@type': 'Question',
            name: item.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: item.answer
            }
        }))
    } : null;

    // Custom Schema JSON parsing if provided
    let customSchemaObject: Record<string, any> | null = null;
    if (article.schema) {
        if (typeof article.schema === 'object') {
            customSchemaObject = article.schema;
        } else if (typeof article.schema === 'string' && article.schema.trim() && article.schema.trim() !== '{}') {
            try {
                customSchemaObject = JSON.parse(article.schema);
            } catch {
                customSchemaObject = null;
            }
        }
    }

    const toggleFaq = (index: number) => {
        setOpenFaqIndex(prevIndex => prevIndex === index ? null : index);
    };

    const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(article.title + ' - ' + canonicalUrl)}`;
    const whatsappConsultUrl = 'https://api.whatsapp.com/send/?phone=972508266042&type=phone_number&app_absent=0';

    return (
        <article className="article-page" dir="rtl">
            {/* Primary SEO Meta Tags */}
            <SEO
                title={`${article.title} | דורי רפאל`}
                description={metaDescription}
                keywords={`${article.title}, דורי רפאל, פדיקור רפואי, טיפול בכף הרגל`}
                canonical={`/articles/${article.slug}`}
                ogTitle={article.title}
                ogDescription={metaDescription}
                ogImage={article.image || '/og-image.jpg'}
                ogType="article"
            />

            {/* Schema.org Structured Data */}
            <Helmet>
                <script type="application/ld+json">
                    {JSON.stringify(articleSchema)}
                </script>
                <script type="application/ld+json">
                    {JSON.stringify(breadcrumbSchema)}
                </script>
                {faqSchema && (
                    <script type="application/ld+json">
                        {JSON.stringify(faqSchema)}
                    </script>
                )}
                {customSchemaObject && (
                    <script type="application/ld+json">
                        {JSON.stringify(customSchemaObject)}
                    </script>
                )}
            </Helmet>

            <div className="article-page__container">
                {/* Breadcrumbs Navigation */}
                <nav className="article__breadcrumbs" aria-label="Breadcrumb navigation">
                    <NavLink to={appConfig.baseUrl + "/"} className="article__breadcrumb-link">בית</NavLink>
                    <span className="article__breadcrumb-separator">/</span>
                    <span className="article__breadcrumb-current" aria-current="page">{article.title}</span>
                </nav>

                {/* Article Header */}
                <header className="article__header">
                    <div className="article__badge-container">
                        <span className="article__badge">מאמר מקצועי</span>
                    </div>

                    <h1 className="article__title">{article.title}</h1>

                    <div className="article__meta">
                        <div className="article__meta-author">
                            <img src={DoriProfile} alt="דורי רפאל" className="article__meta-author-img" />
                            <span>דורי רפאל</span>
                        </div>

                        {formattedDate && (
                            <div className="article__meta-item">
                                <span className="article__meta-icon">📅</span>
                                <span>{formattedDate}</span>
                            </div>
                        )}

                        <div className="article__meta-item">
                            <span className="article__meta-icon">⏱️</span>
                            <span>{readingTimeMinutes} דקות קריאה</span>
                        </div>

                        <a 
                            href={whatsappShareUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="article__share-btn"
                            aria-label="שתף בוואטסאפ"
                        >
                            <span>שתף מאמר</span>
                            <span>💬</span>
                        </a>
                    </div>
                </header>

                {/* Featured Image */}
                {article.image && (
                    <div className="article__featured-media">
                        <img 
                            src={article.image} 
                            alt={article.title} 
                            className="article__featured-img" 
                            loading="eager"
                        />
                    </div>
                )}

                {/* Excerpt Lead Card */}
                {article.excerpt && (
                    <div className="article__excerpt">
                        <p>{article.excerpt}</p>
                    </div>
                )}

                {/* Main Article Body */}
                <div className="article__main-card">
                    <div 
                        className="article__body"
                        dangerouslySetInnerHTML={{ __html: article.html }}
                    />

                    {/* FAQ Accordion Section */}
                    {faqs.length > 0 && (
                        <section className="article__faq" aria-labelledby="faq-heading">
                            <div className="article__faq-header">
                                <h2 id="faq-heading" className="article__faq-title">
                                    <span className="article__faq-icon">❓</span>
                                    <span>שאלות ותשובות נפוצות</span>
                                </h2>
                            </div>
                            <div className="article__faq-list">
                                {faqs.map((faqItem, index) => {
                                    const isOpen = openFaqIndex === index;
                                    return (
                                        <div 
                                            key={index} 
                                            className={`article__faq-item ${isOpen ? 'is-open' : ''}`}
                                        >
                                            <button
                                                className="article__faq-question-btn"
                                                onClick={() => toggleFaq(index)}
                                                aria-expanded={isOpen}
                                                aria-controls={`faq-answer-${index}`}
                                            >
                                                <span>{faqItem.question}</span>
                                                <span className="article__faq-toggle" aria-hidden="true">+</span>
                                            </button>
                                            {isOpen && (
                                                <div 
                                                    id={`faq-answer-${index}`} 
                                                    className="article__faq-answer"
                                                >
                                                    <p>{faqItem.answer}</p>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    )}
                </div>

                {/* Author Info Box */}
                <aside className="article__author-box">
                    <img src={DoriProfile} alt="דורי רפאל - מומחה כף רגל" className="article__author-avatar" />
                    <div className="article__author-info">
                        <div className="article__author-title-row">
                            <h3 className="article__author-name">דורי רפאל</h3>
                        </div>
                        <p className="article__author-bio">
                            פודיאטור מוסמך בעל מעל 20 שנות ניסיון קליני בטיפול ושיקום בעיות כף רגל מורכבות, ציפורן חודרנית, יבלות ויראליות בטכנולוגיית Swift, פדיקור לחולי סוכרת ושיקום ספורטאים.
                        </p>
                    </div>
                </aside>

                {/* Conversion CTA Box */}
                <aside className="article__cta">
                    <h2 className="article__cta-title">סובלים מכאבים או בעיה בכף הרגל?</h2>
                    <p className="article__cta-text">
                        אל תתנו לכאב להגביל אתכם. דורי רפאל מעניק אבחון מדויק, טיפול מקצועי בטכנולוגיות המתקדמות ביותר והקלה מהירה מהטיפול הראשון.
                    </p>
                    <div className="article__cta-actions">
                        <NavLink to={appConfig.baseUrl + "/contact"} className="article__cta-btn">
                            קבעו תור לייעוץ וטיפול
                        </NavLink>
                        <a 
                            href={whatsappConsultUrl} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="article__cta-whatsapp-btn"
                        >
                            <span>התייעצות מהירה בוואטסאפ</span>
                            <span>💬</span>
                        </a>
                    </div>
                </aside>

                {/* Related Articles Section */}
                {relatedArticles.length > 0 && (
                    <section className="article__related">
                        <h2 className="article__related-title">מאמרים נוספים שיכולים לעניין אותך</h2>
                        <div className="article__related-grid">
                            {relatedArticles.map(rel => (
                                <NavLink 
                                    key={rel.slug} 
                                    to={`${appConfig.baseUrl}/articles/${rel.slug}`} 
                                    className="article__related-card"
                                >
                                    <div>
                                        <h3 className="article__related-card-title">{rel.title}</h3>
                                        {rel.excerpt && (
                                            <p className="article__related-card-excerpt">{rel.excerpt}</p>
                                        )}
                                    </div>
                                    <div className="article__related-card-link">
                                        <span>קרא עוד</span>
                                        <span>←</span>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
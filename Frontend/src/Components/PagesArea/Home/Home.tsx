import { Head } from 'vite-react-ssg';
import { NavLink } from 'react-router-dom';
import './Home.css';
import DoriProfile from '../../../assets/DoriProfile.webp';
import { appConfig } from '../../../Utils/AppConfig';
import { SEO } from '../../SharedArea/SEO/SEO';

const medicalBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'MedicalBusiness',
    name: 'דורי רפאל',
    url: 'https://dorirefael.co.il',
    image: 'https://dorirefael.co.il/og-image.jpg',
    telephone: '050-8266042',
    address: {
        '@type': 'PostalAddress',
        streetAddress: 'הגיבור האלמוני 50, יד אליהו',
        addressLocality: 'תל אביב',
        addressCountry: 'IL'
    },
    openingHoursSpecification: [
        {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
            opens: '09:00',
            closes: '19:00'
        }
    ]
};

export function Home() {
    return (
        <div className="home" dir="rtl">
            <SEO
                title="דורי רפאל | פדיקור רפואי קליני ושיקומי בתל אביב"
                description="דורי רפאל - מומחה כף רגל, פדיקור רפואי קליני ושיקומי בתל-אביב. מעל 20 שנות ניסיון בטיפול בציפורן חודרנית, פטרת עור וציפורניים, יבלות, כף רגל סוכרתית ועוד."
                keywords="פדיקור רפואי, דורי רפאל, טיפול בכף הרגל תל אביב, ציפורן חודרנית, פטרת ציפורניים, יבלות, פדיקור סוכרתי, SWIFT"
                canonical="/"
            />
            <Head>
                <script type="application/ld+json">
                    {JSON.stringify(medicalBusinessSchema)}
                </script>
            </Head>
            {/* Hero Section */}
            <header className="home__hero">
                <div className="home__hero-content">
                    <h1 className="home__hero-title">דורי רפאל</h1>
                    <p className="home__hero-subtitle">
                        מומחה כף-רגל, פדיקור רפואי קליני ושיקומי בתל-אביב.
                        <br />
                        אבחון וטיפול ביבלות ברגליים, בידיים ובמקומות אחרים על פני העור.
                    </p>
                    <div className="home__hero-since">
                        ~ Since 2003 ~
                    </div>
                    <a href="https://api.whatsapp.com/send/?phone=972508266042&type=phone_number&app_absent=0" target="_blank" className="home__cta-btn" aria-label="Book a consultation">קבע פגישת ייעוץ</a>
                </div>
            </header>

            {/* Trust Bar Section */}
            <section className="home__trust-bar">
                <div className="home__trust-item">
                    <span className="home__trust-icon" aria-hidden="true">✓</span>
                    <span className="home__trust-text">מעל 20 שנות ניסיון</span>
                </div>
                <div className="home__trust-item">
                    <span className="home__trust-icon" aria-hidden="true">✓</span>
                    <span className="home__trust-text">יעוץ אותנטי ואמין</span>
                </div>
                <div className="home__trust-item">
                    <span className="home__trust-icon" aria-hidden="true">✓</span>
                    <span className="home__trust-text">ליווי טיפולי צמוד</span>
                </div>
                <div className="home__trust-item">
                    <span className="home__trust-icon" aria-hidden="true">✓</span>
                    <span className="home__trust-text">שיפור משמעותי באיכות החיים</span>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="home__services" id="services">
                <h2 className="home__section-title">מטיפולי הדגל שלנו:</h2>
                <p className="home__services-description">
                    אבחון פתולוגיות בכף הרגל והתאמת טיפולים משקמים –<br />
                    <strong>יובש / גירודים / ריחות / יבלות / כאבים / ציפורן חודרנית / פטרת עור וציפורניים.</strong>
                </p>

                <div className="home__swift-banner-container">
                    <NavLink to={appConfig.baseUrl + "/treatments/warts"} className="swift-banner">
                        <span className="swift-banner__badge">טכנולוגיה פורצת דרך</span>
                        <h2 className="swift-banner__title">טיפולי SWIFT</h2>
                        <p className="swift-banner__desc">
                            אבחון וטיפול ביבלות ברגליים, בידיים ובמקומות אחרים על פני העור.
                        </p>
                    </NavLink>
                </div>

                <div className="home__services-grid">

                    <NavLink to={appConfig.baseUrl + "/treatments/sports"} className="home__service-card">
                        <h3 className="home__service-title">ספורטאים וחיילים</h3>
                        <p className="home__service-desc">
                            טיפולי רגליים מותאמים במיוחד לספורטאים וחיילים החשופים לעומסים ושחיקה.
                        </p>
                    </NavLink>

                    <NavLink to={appConfig.baseUrl + "/treatments/elderly"} className="home__service-card">
                        <h3 className="home__service-title">גיל הזהב</h3>
                        <p className="home__service-desc">
                            טיפולי רגליים לבני ובנות גיל הזהב, לתחזוקה נכונה ונוחות בהליכה.
                        </p>
                    </NavLink>

                    <NavLink to={appConfig.baseUrl + "/treatments/diabetes"} className="home__service-card">
                        <h3 className="home__service-title">חולי סוכרת</h3>
                        <p className="home__service-desc">
                            טיפול מקצועי ומוסמך בחולי סוכרת למניעת סיבוכים וטיפוח העור.
                        </p>
                    </NavLink>

                    <NavLink to={appConfig.baseUrl + "/treatments/ingrown"} className="home__service-card">
                        <h3 className="home__service-title">ציפורן חודרנית</h3>
                        <p className="home__service-desc">
                            עזרה ראשונה במקרים של ציפורן חודרנית להקלה מיידית בכאב.
                        </p>
                    </NavLink>

                    <NavLink to={appConfig.baseUrl + "/treatments/fungus"} className="home__service-card">
                        <h3 className="home__service-title">פטרת עור וציפורניים</h3>
                        <p className="home__service-desc">
                            ניקוי וטיפול מקצועי בפטריות לשיפור האסתטיקה ובריאות הרגל.
                        </p>
                    </NavLink>

                    <NavLink to={appConfig.baseUrl + "/articles/viral-vs-mechanical"} className="home__service-card">
                        <h3 className="home__service-title">יבלת מכאנית או ויראלית?</h3>
                        <p className="home__service-desc">
                            המדריך המלא לזיהוי והבחנה בין יבלת מכאנית ליבלת ויראלית.
                        </p>
                    </NavLink>
                </div>
            </section>

            {/* Overview Section - Bento Box Design */}
            <section className="home__bento-overview">
                <div className="home__bento-header">
                    <img src={DoriProfile} alt="דורי רפאל" className="home__profile-image" />
                    <h2 className="home__bento-title">ייעוץ פודיאטרי וטיפולי פדיקור רפואי קליני ושיקומי</h2>
                    <h3 className="home__bento-subtitle">דורי רפאל</h3>
                </div>

                <div className="home__bento-grid">

                    {/* Right Column (in RTL) */}
                    <div className="home__bento-column">
                        {/* Summary Card */}
                        <article className="home__bento-card home__bento-summary">
                            <div className="home__bento-icon" aria-hidden="true">⭐</div>
                            <div className="home__bento-text-content">
                                <p>
                                    הקליניקה מתמחה במתן פתרונות מקצועיים לבעיות בכפות הרגליים של ספורטאים, חיילים, מטופלים סוכרתיים ומבוגרים, תוך הקפדה על סטנדרט טיפולי גבוה, ציוד רפואי מתקדם וסביבת טיפול סטרילית, נגישה ודיסקרטית.
                                </p>
                                <p className="home__bento-summary-highlight">
                                    לאורך השנים סייע דורי רפאל לאלפי מטופלים להפחית כאבים, לשפר את מצב כפות הרגליים שלהם ולחזור לשגרת חיים נוחה, בריאה ומתפקדת יותר.
                                </p>
                            </div>
                        </article>

                        {/* Alert Card */}
                        <article className="home__bento-card home__bento-alert">
                            <div className="home__bento-icon" aria-hidden="true">🏥</div>
                            <div className="home__bento-text-content">
                                <p>
                                    כל הטיפולים מתבצעים בקליניקה פרטית ומאובזרת בתל אביב בלבד.<br />
                                    <strong>לא מתקיימים ביקורי בית.</strong>
                                </p>
                            </div>
                        </article>
                    </div>

                    {/* Left Column (in RTL) */}
                    <div className="home__bento-column">
                        {/* Intro Card */}
                        <article className="home__bento-card home__bento-intro">
                            <div className="home__bento-icon" aria-hidden="true">✨</div>
                            <div className="home__bento-text-content">
                                <p>
                                    <strong>טיפול מקצועי בכפות רגליים בקליניקה רפואית מתקדמת.</strong><br />
                                    פודיאטור בעל למעלה מ־20 שנות ניסיון בטיפול במצבים מורכבים של כף הרגל.
                                </p>
                                <p>
                                    כפות רגליים בריאות אינן מותרות אסתטיות, אלא חלק מאיכות חיים, תפקוד וביטחון עצמי.
                                </p>
                            </div>
                        </article>

                        {/* Problems Card */}
                        <article className="home__bento-card home__bento-problems">
                            <div className="home__bento-icon" aria-hidden="true">🔍</div>
                            <div className="home__bento-text-content">
                                <h4>הטיפולים מיועדים (בעיקר) לגברים הסובלים מבעיות כגון:</h4>
                                <ul>
                                    <li>יבלות מכאניות וכאבים בדריכה</li>
                                    <li>עור יבש וסדקים עמוקים</li>
                                    <li>ציפורניים מעובות ופטרת ציפורניים</li>
                                    <li>ציפורן חודרנית</li>
                                    <li>כאבים כתוצאה מעומסים, פעילות גופנית וספורט</li>
                                    <li>בעיות עור שונות בכפות הרגליים</li>
                                </ul>
                            </div>
                        </article>
                    </div>

                </div>
            </section>

        </div>
    );
}

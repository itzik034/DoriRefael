import { NavLink } from 'react-router-dom';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import { appConfig } from '../../../Utils/AppConfig';
import elderlyCouple from '../../../assets/patients/11f2b06c-9d80-4607-a148-436f1af87a14.jpg';
import './Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function ElderlyPedicure() {
    return (
        <div className="treatment-page" dir="rtl">
            <SEO
                title="פדיקור רפואי לבני גיל הזהב | דורי רפאל"
                description="טיפולי כף רגל ייעודיים לבני ובנות גיל הזהב, לתחזוקה נכונה, הגנה על העור ונוחות מרבית בהליכה."
                keywords="פדיקור לגיל הזהב, טיפול רגליים לקשישים, פדיקור רפואי מבוגרים, דורי רפאל גיל שלישי"
                canonical="/treatments/elderly"
                ogImage={elderlyCouple}
            />
            <header className="treatment__header">
                <h1 className="treatment__title">טיפול פודיאטרי ופדיקור רפואי בגיל השלישי</h1>
                <p className="treatment__subtitle">
                    ככל שאנחנו מתבגרים, הגוף עובר שינויים טבעיים המשפיעים גם על בריאות כפות הרגליים. כפות הרגליים נושאות אותנו לאורך כל החיים — אך דווקא בגיל המבוגר הן הופכות לאחד האזורים המוזנחים ביותר בגוף.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">שינויים טבעיים עם השנים</h2>
                    <p className="treatment__text">עם השנים מופיעים בין היתר:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">ירידה בגמישות העור</li>
                        <li className="treatment__list-item">עיוותים מבניים של כף הרגל</li>
                        <li className="treatment__list-item">התעבות או עיוות של הציפורניים</li>
                        <li className="treatment__list-item">יובש וסדקים</li>
                        <li className="treatment__list-item">ירידה ביכולת הריפוי</li>
                        <li className="treatment__list-item">שינויים בתחושה העצבית</li>
                        <li className="treatment__list-item">רגישות יתר או ירידה בתחושה, במיוחד אצל חולי סוכרת</li>
                        <li className="treatment__list-item">קושי פיזי להגיע לכפות הרגליים ולטפל בהן באופן עצמאי</li>
                    </ul>
                    <div className="treatment__before-after" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 300px' }}>
                            <ZoomableImage src={elderlyCouple} alt="כף רגל לפני טיפול מבוגרים" style={{ width: '100%', borderRadius: '8px', border: '2px solid #ccc' }} />
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">טיפול בגיל המבוגר דורש ניסיון וזהירות</h2>
                    <p className="treatment__text">
                        טיפול בכפות רגליים של מטופלים מבוגרים מצריך גישה מקצועית, זהירה ומותאמת למצבו הרפואי הכללי של המטופל. מטופלים רבים בגיל השלישי מתמודדים עם:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">סוכרת</li>
                        <li className="treatment__list-item">בעיות כלי דם</li>
                        <li className="treatment__list-item">טיפול במדללי דם</li>
                        <li className="treatment__list-item">ירידה ביכולת הריפוי</li>
                        <li className="treatment__list-item">עור עדין ושביר יותר</li>
                        <li className="treatment__list-item">רגישות מוגברת לזיהומים</li>
                    </ul>
                    <p className="treatment__text">
                        לכן, במקרים רבים מומלץ להגיע לטיפול הראשון עם רשימת תרופות
                        ומידע רפואי עדכני מהרופא המטפל – עדיפות <strong>לאנמנזה</strong> רשמית מודפסת.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">אין גיל "נכון" להתחיל לטפל בכפות הרגליים</h2>
                    <p className="treatment__text">
                        למעשה, שמירה נכונה על כפות הרגליים מתחילה כבר בילדות. לאורך השנים הדרכתי גם הורים כיצד להקנות לילדיהם הרגלים נכונים של היגיינה ותחזוקת כפות הרגליים — כאשר אחד הכללים החשובים ביותר הוא ייבוש יסודי של כפות הרגליים לאחר רחצה.
                    </p>
                    <p className="treatment__text">
                        ועדיין, ככל שמתבגרים, התחזוקה העצמאית של כפות הרגליים הופכת קשה יותר. לפעמים זו ירידה בגמישות, לפעמים כאבי גב או מגבלה פיזית, ולפעמים פשוט הקושי להתכופף, להגיע לציפורניים ולטפל בהן בצורה בטוחה.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">טיפול תקופתי הוא חלק משמירה על איכות החיים</h2>
                    <p className="treatment__text">
                        בדיוק כפי שאנשים מקפידים על מעקב רפואי, טיפולי שיניים או בדיקות תקופתיות — כך חשוב גם לשמור על בריאות כפות הרגליים. טיפול מקצועי תקופתי יכול לסייע ב:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">שמירה על נוחות בדריכה ובהליכה</li>
                        <li className="treatment__list-item">טיפול בציפורניים מעובות ובעייתיות</li>
                        <li className="treatment__list-item">הפחתת לחצים ועור קשה</li>
                        <li className="treatment__list-item">מניעת סדקים ופציעות</li>
                        <li className="treatment__list-item">שיפור ההיגיינה והנוחות היומיומית</li>
                        <li className="treatment__list-item">זיהוי מוקדם של בעיות הדורשות התייחסות רפואית</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">ניסיון שנמשך לאורך דורות</h2>
                    <p className="treatment__text">
                        מאז שנת 2003 מטפל דורי רפאל במטופלים מכל הגילאים — החל מילדים ועד מבוגרים בגילאים מתקדמים מאוד. יש אפילו מקרים של טיפול באבא, סבא ובנים של אותה משפחה.
                    </p>
                    <p className="treatment__text">
                        הגישה הטיפולית מבוססת על סבלנות, עדינות, ניסיון מקצועי רב והבנה של הצרכים הייחודיים של המטופל המבוגר. הטיפולים מתבצעים בקליניקה פרטית ומאובזרת בתל אביב, בסביבה סטרילית ונגישה.
                    </p>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">חשוב לכם לשמור על בריאות כפות הרגליים?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לקביעת תור</NavLink>
                </aside>
            </div>
        </div>
    );
}

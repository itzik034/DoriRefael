import './About.css';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import doriProfileImage from '../../../assets/DoriProfile.webp';
import doriDegreeImage from '../../../assets/Dori_Degree.jpeg';
import { SEO } from '../../SharedArea/SEO/SEO';

export function About() {
    return (
        <div className="about-page" dir="rtl">
            <SEO
                title="אודות דורי רפאל | מומחה פדיקור רפואי קליני בתל אביב"
                description="למדו על דורי רפאל, מומחה לטיפולי כף רגל ופדיקור רפואי קליני ושיקומי בתל אביב עם מעל 20 שנות ניסיון מקצועי."
                keywords="אודות דורי רפאל, פדיקוריסט רפואי תל אביב, מומחה כף רגל, הכשרה פודיאטריה"
                canonical="/about"
            />
            <div className="about__container">
                <header className="about__header">
                    <h1 className="about__title">אודות דורי רפאל</h1>
                    <p className="about__subtitle">
                        פודיאטור ומטפל ותיק בתחום רפואת כף הרגל, בעל למעלה מ־20 שנות ניסיון.
                    </p>
                </header>

                <section className="about__section about__section--flex">
                    <div className="about__section-content">
                        <h2 className="about__section-title">רקע והכשרה מקצועית</h2>
                        <p className="about__text">
                            דורי רפאל הינו בוגר בית הספר לסיעוד של בית החולים מרכז רפואי שיבא תל השומר, בוגר ומרצה לשעבר במכללה לקוסמטיקה רפואית בתל אביב, ובעל הכשרות מתקדמות בתחום הפודיאטריה בארץ ובעולם, כולל מסלול PhD Extension במסגרת University of Brighton.
                        </p>
                        <p className="about__text">
                            בשנת 2008 שימש כיועץ לשר הבריאות יעקב בן־יזרי במסגרת עבודות ההכנה לחוק הסדרת העיסוק במקצועות הבריאות בישראל. לאורך השנים הרצה בפני מסגרות מקצועיות שונות, ובהן לשכות הגיוס של צה"ל, אגודות ספורט ופורומים מקצועיים בתחום רפואת כף הרגל.
                        </p>
                    </div>
                    <div className="about__section-image-wrapper">
                        <ZoomableImage src={doriProfileImage} alt="דורי רפאל" className="about__degree-image" style={{ borderRadius: '16px', boxShadow: '0 10px 30px rgba(0, 31, 63, 0.1)', objectFit: 'cover' }} />
                    </div>
                </section>

                <section className="about__section about__section--flex">
                    <div className="about__section-content">
                        <h2 className="about__section-title">הכשרה אקדמית ומקצועית</h2>
                        <p className="about__text">הסמכותיו העיקריות של דורי רפאל, המבוססות על הכשרה נרחבת בארץ ובחו"ל:</p>
                        <ul className="about__list" style={{ marginTop: '1.5rem' }}>
                            <li className="about__list-item">
                                <span className="about__list-icon" aria-hidden="true">✓</span>
                                בוגר בית הספר לסיעוד של המרכז הרפואי שיבא תל השומר
                            </li>
                            <li className="about__list-item">
                                <span className="about__list-icon" aria-hidden="true">✓</span>
                                בוגר ומרצה לשעבר במכללה לקוסמטיקה רפואית בתל אביב
                            </li>
                            <li className="about__list-item">
                                <span className="about__list-icon" aria-hidden="true">✓</span>
                                בוגר מסלול PhD Extension באוניברסיטת Brighton באנגליה
                            </li>
                            <li className="about__list-item">
                                <span className="about__list-icon" aria-hidden="true">✓</span>
                                פודיאטור בעל הכשרות מתקדמות בישראל ובעולם עם ניסיון קליני של מעל ל-20 שנה
                            </li>
                        </ul>
                    </div>
                    <div className="about__section-image-wrapper">
                        <ZoomableImage src={doriDegreeImage} alt="תעודת הסמכה פודיאטריה דורי רפאל" className="about__degree-image" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }} />
                    </div>
                </section>

                <section className="about__section">
                    <h2 className="about__section-title">חברויות בארגונים מקצועיים</h2>
                    <p className="about__text">דורי רפאל חבר בעמותות ובארגונים מקצועיים מובילים בארץ ובעולם, ביניהם:</p>
                    <ul className="about__list">
                        <li className="about__list-item">
                            <span className="about__list-icon" aria-hidden="true">✓</span>
                            העמותה לפודיאטרים וכירופודיסטים בישראל
                        </li>
                        <li className="about__list-item">
                            <span className="about__list-icon" aria-hidden="true">✓</span>
                            נאמן איגוד הפודיאטרים בישראל
                        </li>
                        <li className="about__list-item">
                            <span className="about__list-icon" aria-hidden="true">✓</span>
                            American Podiatric Medical Network Association
                        </li>
                        <li className="about__list-item">
                            <span className="about__list-icon" aria-hidden="true">✓</span>
                            האגודה הישראלית לסוכרת
                        </li>
                    </ul>
                </section>

                <section className="about__section">
                    <h2 className="about__section-title">הקליניקה והגישה הטיפולית</h2>
                    <p className="about__text">
                        מאז שנת 2003 מנהל דורי רפאל קליניקה פרטית בתל אביב, המתמחה בטיפולים רפואיים ושיקומיים לכפות הרגליים לגברים — מודל טיפולי ייחודי ויוצא דופן בישראל.
                    </p>
                    <p className="about__text">
                        ייחודיות הקליניקה נועדה לאפשר לגברים לקבל טיפול מקצועי, דיסקרטי ואישי בסביבה רפואית סטרילית ומבוקרת, תוך מתן מענה למצבים שרבים נוטים להזניח בשל מבוכה, ביישנות או חוויות לא נעימות ממכונים קוסמטיים שאינם מתמחים בתחום רפואת כף הרגל.
                    </p>
                    <p className="about__text">
                        הגישה הטיפולית בקליניקה משלבת ניסיון קליני רב־שנים, הקפדה מקצועית גבוהה, שימוש בטכנולוגיות מתקדמות וחתירה לתוצאות טיפול איכותיות, בטוחות וארוכות טווח.
                    </p>
                </section>
            </div>
        </div>
    );
}

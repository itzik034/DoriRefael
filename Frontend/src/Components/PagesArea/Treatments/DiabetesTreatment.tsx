import { NavLink } from 'react-router-dom';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import './Treatment.css';
import { appConfig } from '../../../Utils/AppConfig';
import diabetesImg from '../../../assets/patients/רגל-סוכרתית.jpg';

export function DiabetesTreatment() {
    return (
        <div className="treatment-page" dir="rtl">
            <header className="treatment__header">
                <h1 className="treatment__title">טיפול פודיאטרי ופדיקור רפואי לחולי סוכרת</h1>
                <p className="treatment__subtitle">
                    סוכרת היא אחת המחלות השכיחות ביותר בישראל. אחד הסיבוכים המשמעותיים ביותר הוא הפגיעה בכפות הרגליים, המוכר בשם "רגל סוכרתית".
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">למה כף הרגל הסוכרתית דורשת תשומת לב מיוחדת?</h2>
                    <p className="treatment__text">מחלת הסוכרת עלולה לאורך השנים לפגוע ב:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">עצבי התחושה (נוירופתיה)</li>
                        <li className="treatment__list-item">זרימת הדם לרגליים</li>
                        <li className="treatment__list-item">יכולת הריפוי של העור והרקמות</li>
                        <li className="treatment__list-item">ומערכת החיסון המקומית</li>
                    </ul>
                    <p className="treatment__text">
                        כתוצאה מכך, גם פציעות קטנות יחסית — לחץ מנעל, סדק בעור, שלפוחית או ציפורן חודרנית — עלולות להתפתח לפצעים מורכבים, זיהומים קשים ואף לכיבים מסוכנים.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">חשוב להבין</h2>
                    <p className="treatment__text">
                        חולי סוכרת אינם יכולים להרשות לעצמם טיפול אגרסיבי, לא מקצועי או בלתי מבוקר בכפות הרגליים. לצערי, לא מעט מטופלים מגיעים לאחר שנפגעו במהלך טיפולים קוסמטיים, חיתוכים עמוקים מדי, שימוש לא נכון במכשירים חדים או ניסיונות טיפול עצמיים בבית.
                    </p>
                    <p className="treatment__text">
                        בכף רגל סוכרתית — גם פציעה קטנה עלולה להפוך לבעיה רפואית משמעותית. לכן, טיפול בכפות רגליים של חולי סוכרת חייב להתבצע בזהירות רבה, בסביבה סטרילית, ותוך הבנה מקצועית של גורמי הסיכון הייחודיים למחלה.
                    </p>
                    <div className="treatment__before-after" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <div style={{ flex: '1 1 300px', maxWidth: '400px' }}>
                            <ZoomableImage src={diabetesImg} alt="טיפול בכף רגל סוכרתית" style={{ width: '100%', borderRadius: '8px', border: '2px solid #ccc' }} />
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מה כולל הטיפול?</h2>
                    <p className="treatment__text">
                        הטיפול הפודיאטרי לחולי סוכרת מותאם באופן אישי למצב כפות הרגליים ולרמת הסיכון של המטופל, ועשוי לכלול בין היתר:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">טיפול בציפורניים מעובות ובעייתיות</li>
                        <li className="treatment__list-item">הפחתת עור קשה ולחצים</li>
                        <li className="treatment__list-item">טיפול בסדקים ויובש משמעותי</li>
                        <li className="treatment__list-item">זיהוי מוקדם של אזורי לחץ וסיכון</li>
                        <li className="treatment__list-item">מעקב תקופתי אחר מצב כפות הרגליים</li>
                        <li className="treatment__list-item">הדרכה לשמירה נכונה על היגיינת כף הרגל הסוכרתית</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מעקב תקופתי יכול למנוע סיבוכים</h2>
                    <p className="treatment__text">
                        במקרים רבים, מעקב מקצועי קבוע מאפשר לזהות בעיות בשלב מוקדם — עוד לפני שהמטופל עצמו מרגיש בכאב או מבחין בהתפתחות של פצע.
                        עבור חולי סוכרת רבים, טיפול תקופתי נכון אינו רק עניין של נוחות או אסתטיקה — אלא חלק משמעותי בשמירה על בריאות כפות הרגליים ואיכות החיים.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">ניסיון, זהירות ואחריות מקצועית</h2>
                    <p className="treatment__text">
                        מאז שנת 2003 מטפל דורי רפאל בחולי סוכרת תוך הקפדה על עבודה עדינה, מבוקרת וזהירה במיוחד, בהתאם למורכבות הרפואית של כל מטופל.
                        הטיפולים מתבצעים בקליניקה פרטית ומאובזרת בתל אביב, בסביבה סטרילית, נגישה ודיסקרטית.
                    </p>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">זקוקים לטיפול מותאם וזהיר?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לקביעת תור</NavLink>
                </aside>
            </div>
        </div>
    );
}

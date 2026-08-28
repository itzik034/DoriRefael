import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import patientImg2 from '../../../assets/patients/shutterstock_479268232-Medium.jpg';
import sportsInjuries from '../../../assets/patients/sports-injuries.jpg';
import './Treatment.css';

export function SportsTreatments() {
    return (
        <div className="treatment-page" dir="rtl">
            <header className="treatment__header">
                <div className="treatment__header-content">
                    <h1 className="treatment__title">טיפולים לחיילים וספורטאים</h1>
                    <p className="treatment__subtitle">
                        פתרונות מקצועיים לעומסים, שחיקה ופציעות אופייניות.
                    </p>
                </div>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">העומס על כפות הרגליים</h2>
                    <p className="treatment__text">
                        חיילים וספורטאים מעמיסים על כפות הרגליים עומסים כבדים באופן יומיומי. פעילות פיזית מאומצת, שהייה ממושכת בנעליים סגורות, זיעה ולחצים מכאניים מובילים לשכיחות גבוהה של בעיות ייחודיות כגון שפשופים, יבלות מכאניות, ציפורניים חודרניות ופטרת.
                    </p>
                    <p className="treatment__text">
                        הקליניקה של דורי רפאל מתמחה במתן טיפולים ייעודיים לאוכלוסיות אלו, מתוך הבנה מעמיקה של הצרכים הייחודיים שלהם והחשיבות של חזרה מהירה לכשירות מלאה.
                    </p>
                    <div className="img_exmpls">
                        <div style={{ marginTop: '1rem', textAlign: 'center' }}>
                            <ZoomableImage src={sportsInjuries} alt="עומס ופציעות ספורט בכפות הרגליים" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">הבעיות השכיחות בקרב ספורטאים וחיילים:</h2>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">
                            <strong>יבלות לחץ:</strong> חיכוך מוגבר מנעליים נוקשות (נעלי צבא, נעלי כדורגל) גורם להתעבות העור וליצירת יבלות מכאניות כואבות המקשות על הדריכה.
                        </li>
                        <li className="treatment__list-item">
                            <strong>ציפורן חודרנית:</strong> חבלות חוזרות באזור הבהונות ולחץ מתמיד גורמים לחדירת הציפורן לעור, מה שמוביל לכאבים חזקים, אדמומיות ודלקת מקומית.
                        </li>
                        <li className="treatment__list-item">
                            <strong>פטרת וכפות רגליים לחות:</strong> סביבה חמה ולחה בתוך נעליים צבאיות או נעלי ספורט לאורך שעות ארוכות מהווה כר פורה להתפתחות פטרת עור ("Athlete Foot") ופטרת ציפורניים.
                        </li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">הגישה הטיפולית</h2>
                    <p className="treatment__text">
                        מטרת הטיפול היא לא רק הקלה מיידית בכאב, אלא גם הדרכה נכונה למניעת הישנות הבעיה. אנו שמים דגש על שיקום כף הרגל והחזרתה לתפקוד מלא תוך זמן קצר, באמצעות ציוד רפואי מתקדם בסביבה סטרילית ובטוחה.
                    </p>
                    <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
                        <ZoomableImage src={patientImg2} alt="שיקום כף רגל" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }} />
                    </div>
                </section>

                <aside className="treatment__cta">
                    <a href="https://api.whatsapp.com/send/?phone=972508266042&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="treatment__cta-btn">
                        לקביעת פגישת אבחון וטיפול
                    </a>
                </aside>
            </div>
        </div>
    );
}

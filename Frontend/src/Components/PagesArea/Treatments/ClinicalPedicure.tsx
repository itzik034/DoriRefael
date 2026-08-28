import patientImg from '../../../assets/patients/449f2400-c40c-409c-87ea-a2ba858151fc.jpg';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';

export function ClinicalPedicure() {
    return (
        <div className="treatment-page" dir="rtl">
            <header className="treatment__header">
                <div className="treatment__header-content">
                    <h1 className="treatment__title">פדיקור רפואי קליני</h1>
                    <p className="treatment__subtitle">
                        טיפול מקצועי בכפות רגליים בקליניקה רפואית מתקדמת.
                    </p>
                </div>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">בריאות כף הרגל</h2>
                    <p className="treatment__text">
                        כפות רגליים בריאות אינן מותרות אסתטיות, אלא חלק מאיכות חיים, תפקוד וביטחון עצמי. הקליניקה מתמחה במתן פתרונות מקצועיים לבעיות בכפות הרגליים תוך הקפדה על סטנדרט טיפולי גבוה, ציוד רפואי מתקדם וסביבת טיפול סטרילית, נגישה ודיסקרטית.
                    </p>
                    <p className="treatment__text">
                        פודיאטור בעל למעלה מ־20 שנות ניסיון בטיפול במצבים מורכבים של כף הרגל. כל הטיפולים מתבצעים בקליניקה פרטית ומאובזרת בתל אביב בלבד. לא מתקיימים ביקורי בית.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">הטיפולים מיועדים למגוון בעיות:</h2>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">יבלות מכאניות וכאבים בדריכה</li>
                        <li className="treatment__list-item">עור יבש וסדקים עמוקים</li>
                        <li className="treatment__list-item">ציפורניים מעובות ופטרת ציפורניים</li>
                        <li className="treatment__list-item">ציפורן חודרנית</li>
                        <li className="treatment__list-item">כאבים כתוצאה מעומסים, פעילות גופנית וספורט</li>
                        <li className="treatment__list-item">בעיות עור שונות בכפות הרגליים</li>
                    </ul>
                    <div style={{ background: 'var(--color-slate)', padding: '1.5rem', borderRadius: '16px', maxWidth: '420px', margin: '1.5rem auto 0', border: '1px solid rgba(0,0,0,0.03)', textAlign: 'center' }}>
                        <ZoomableImage src={patientImg} alt="פדיקור קליני - אחרי טיפול" style={{ width: '100%', borderRadius: '12px', boxShadow: '0 8px 24px rgba(0,0,0,0.06)' }} />
                        <p style={{ marginTop: '0.75rem', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--color-steel-blue)', marginBottom: 0 }}>גם לך מגיע!</p>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">שיפור באיכות החיים</h2>
                    <p className="treatment__text" style={{ fontWeight: 600, color: 'var(--color-navy)', fontSize: '1.2rem', textAlign: 'center' }}>
                        לאורך השנים סייע דורי רפאל לאלפי מטופלים להפחית כאבים, לשפר את מצב כפות הרגליים שלהם ולחזור לשגרת חיים נוחה, בריאה ומתפקדת יותר.
                    </p>
                </section>

                <aside className="treatment__cta">
                    <a href="https://api.whatsapp.com/send/?phone=972508266042&type=phone_number&app_absent=0" target="_blank" rel="noreferrer" className="treatment__cta-btn">
                        לקביעת תור וייעוץ
                    </a>
                </aside>
            </div>
        </div>
    );
}

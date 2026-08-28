import { NavLink } from 'react-router-dom';
import '../Treatments/Treatment.css';
import { appConfig } from '../../../Utils/AppConfig';

export function DrySkinAndCracks() {
    return (
        <article className="treatment-page" dir="rtl">
            <header className="treatment__header">
                <h1 className="treatment__title">המדריך המלא: עור יבש וסדקים עמוקים בכפות הרגליים</h1>
                <p className="treatment__subtitle">
                    רבים נוטים לחשוב שעור יבש או סדוק בעקבים זו רק בעיה אסתטית, אך למעשה מדובר במצב רפואי שעלול להחמיר, לגרום לכאבים עזים בדריכה ואף להוביל לזיהומים. אל תתעלמו ממה שהרגליים שלכם מנסות לומר לכם.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">מה גורם לעור יבש וסדקים עמוקים?</h2>
                    <p className="treatment__text">
                        סדקים בעקבים (Fissures) מתפתחים כאשר העור מסביב לעקב מתייבש, מאבד מהגמישות שלו ומתעבה (היווצרות קאלוס). כשאנו עומדים או הולכים, משקל הגוף מפעיל לחץ על כרית העקב, מה שגורם לעור הקשה והלא-גמיש "להישבר" ולהיסדק. 
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>עומס פיזי:</strong> עמידה ממושכת, הליכה מרובה או עודף משקל שמגבירים את הלחץ על העקבים.</li>
                        <li className="treatment__list-item"><strong>הנעלה לא מתאימה:</strong> הליכה יחפה, שימוש בכפכפים או נעליים פתוחות מאחור שאינן מספקות תמיכה לעקב.</li>
                        <li className="treatment__list-item"><strong>מצבים רפואיים:</strong> סוכרת, בעיות בבלוטת התריס, פסוריאזיס, ומחלות עור שונות פוגעות ביכולת הגוף לשמור על לחות טבעית בעור.</li>
                        <li className="treatment__list-item"><strong>גיל מתבגר:</strong> עם השנים, העור מאבד מהלחות הטבעית שלו ונעשה דק ופגיע יותר.</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">למה מסוכן להזניח סדקים בעקבים?</h2>
                    <p className="treatment__text">
                        כשהסדקים מעמיקים וחודרים לשכבות העור הפנימיות, הבעיה מפסיקה להיות רק "עור קשה" והופכת לסיכון בריאותי של ממש:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>כאב כרוני:</strong> כל צעד הופך לסיוט. הסדקים עלולים לדמם ולגרום לכאב חד המזכיר דריכה על זכוכיות.</li>
                        <li className="treatment__list-item"><strong>סכנת זיהום חמורה:</strong> סדק פתוח הוא שער כניסה ישיר לחיידקים ופטריות. זיהום באזור זה עלול להתפתח לצלוליטיס (זיהום רקמות עמוק) המצריך טיפול אנטיביוטי.</li>
                        <li className="treatment__list-item"><strong>סכנה מוגברת לחולי סוכרת:</strong> אצל חולי סוכרת, עקב פגיעה עצבית (נוירופתיה) וזרימת דם לקויה, סדק קטן יכול להפוך במהירות לכיב סוכרתי קשה לריפוי.</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">קרם לחות זה לא מספיק: למה נדרש טיפול מקצועי?</h2>
                    <p className="treatment__text">
                        רבים מנסים לטפל בסדקים עמוקים באמצעות מריחת קרמים או שפשוף באבן פומיס ביתית, אך לרוב ללא הצלחה. הסיבה היא פשוטה: כל עוד קיימת שכבת עור יבשה, קשה ומעובה, שום קרם לא יוכל לחדור פנימה ולרפא את העור שמתחתיה. שפשוף אגרסיבי מדי בבית עלול אפילו להחמיר את המצב ולגרום לפציעות וקרעים בעור הבריא.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">השיקום המקצועי בקליניקה של דורי רפאל</h2>
                    <p className="treatment__text">
                        הטיפול בסדקים עמוקים דורש מיומנות קלינית והבנה מעמיקה של פיזיולוגיית כף הרגל. בקליניקה של דורי רפאל, אנו מציעים טיפול שיקומי יסודי:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>הסרה כירורגית מבוקרת (Debridement):</strong> הסרה עדינה ובטוחה של שכבות העור הקשה סביב הסדק באמצעות ציוד רפואי סטרילי, המאפשרת לעור להיסגר ולהחלים.</li>
                        <li className="treatment__list-item"><strong>טיפול בקצוות הסדק:</strong> החלקת שולי הסדק כדי למנוע את פתיחתו מחדש בעת דריכה.</li>
                        <li className="treatment__list-item"><strong>חבישות ותכשירים רפואיים:</strong> שימוש במשחות שיקומיות בריכוז חומרים פעילים גבוה, ובמידת הצורך גם חבישות מיוחדות להקלה על הלחץ.</li>
                        <li className="treatment__list-item"><strong>הדרכה למניעה:</strong> התאמת שגרת טיפוח ביתית נכונה, המלצות להנעלה מתאימה ואסטרטגיה למניעת חזרת הסדקים.</li>
                    </ul>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">הסדקים כואבים ומפריעים לכם ללכת? אל תחכו להחמרה!</h3>
                    <p className="treatment__cta-text" style={{color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', maxWidth: '800px', marginInline: 'auto'}}>
                        הגיע הזמן לטפל בבעיה מהשורש ולהחזיר לעצמכם את איכות החיים. דורי רפאל, פודיאטור בעל עשרות שנות ניסיון, יעניק לכם טיפול רפואי, מקצועי ויסודי שיסגור את הסדקים ויחזיר לכפות הרגליים שלכם את הבריאות והנוחות.
                    </p>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">קבעו תור עכשיו לייעוץ וטיפול</NavLink>
                </aside>
            </div>
        </article>
    );
}

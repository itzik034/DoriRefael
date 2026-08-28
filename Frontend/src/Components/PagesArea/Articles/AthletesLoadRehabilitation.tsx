import { NavLink } from 'react-router-dom';
import { appConfig } from '../../../Utils/AppConfig';
import '../Treatments/Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function AthletesLoadRehabilitation() {
    return (
        <article className="treatment-page" dir="rtl">
            <SEO
                title="שיקום עומסים בכף הרגל לספורטאים | דורי רפאל"
                description="מאמר מקצועי על שיקום עומסים, פציעות ספורט ושחיקה בכפות הרגליים אצל ספורטאים וחיילים מבית דורי רפאל."
                keywords="שיקום עומסים, פציעות ספורט כף רגל, עומס ספורטאים, טיפול רגליים לחיילים"
                canonical="/articles/athletes-load-rehabilitation"
            />
            <header className="treatment__header">
                <h1 className="treatment__title">המדריך המלא: שיקום עומסים ופציעות ספורט בכפות הרגליים</h1>
                <p className="treatment__subtitle">
                    פעילות גופנית אינטנסיבית, שירות צבאי קרבי ואימוני ספורט מפעילים עומס אדיר על כפות הרגליים. התעלמות מכאבים ומיבלות הנגרמות ממאמץ עלולה להוביל לפציעות חמורות ולפגיעה משמעותית בתפקוד ובביצועים.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">מהם עומסים וכיצד הם משפיעים על כפות הרגליים?</h2>
                    <p className="treatment__text">
                        כפות הרגליים שלנו נושאות את מלוא משקל הגוף וסופגות זעזועים בכל צעד, קפיצה או ריצה. בקרב ספורטאים וחיילים, העומס המופעל על כפות הרגליים הוא חריג ורציף, מה שמוביל לרוב למספר בעיות נפוצות:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>יבלות לחץ (קאלוס):</strong> נוצרות כתוצאה מחיכוך ולחץ מתמיד של הנעל על העור. במקרים של אימונים אינטנסיביים או מסעות ארוכים, יבלות אלו יכולות להפוך לכואבות במיוחד.</li>
                        <li className="treatment__list-item"><strong>שלפוחיות (Blisters):</strong> הצטברות נוזלים תחת העור עקב חיכוך. התפוצצות של שלפוחית בתנאי שטח או באימון עלולה להוביל לזיהום מיידי.</li>
                        <li className="treatment__list-item"><strong>ציפורניים חודרניות וטראומטיות:</strong> נעלי ספורט או נעלי צבא שלוחצות על האצבעות עלולות לגרום לציפורן לחדור אל העור (ציפורן חודרנית) או להופעת שטפי דם תחת הציפורן וניתוקה ממיטת הציפורן.</li>
                        <li className="treatment__list-item"><strong>כאבים בכריות כף הרגל ובעקבים:</strong> דלקות ברצועה הפלנטרית (דורבן) וכאבים מכניים כתוצאה משחיקת כריות השומן הטבעיות של כף הרגל.</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">למה מסוכן להזניח כאבים כתוצאה מעומסים?</h2>
                    <p className="treatment__text">
                        בקרב חיילים וספורטאים ישנה נטייה "לנשוך שפתיים" ולהמשיך להתאמן למרות הכאב. זוהי טעות שעלולה לעלות ביוקר:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>החמרת הפציעה:</strong> מה שמתחיל כיבלת קטנה יכול להתפתח לפצע פתוח וליבלת שורש עמוקה שמונעת דריכה לחלוטין.</li>
                        <li className="treatment__list-item"><strong>שינוי תבנית ההליכה:</strong> בניסיון להימנע מהכאב בכף הרגל, המטופל משנה את צורת ההליכה או הריצה שלו. הפיצוי הזה יוצר עומסים א-סימטריים שמובילים לכאבי ברכיים, ירכיים וגב תחתון.</li>
                        <li className="treatment__list-item"><strong>זיהומים:</strong> בתנאי שטח, פצעים ויבלות פתוחות חושפים את כף הרגל לזיהומים חיידקיים שעלולים להשבית את החייל או הספורטאי לתקופה ארוכה.</li>
                    </ul>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">השיקום המקצועי בקליניקה של דורי רפאל</h2>
                    <p className="treatment__text">
                        הטיפול בכפות רגליים העמוסות של ספורטאים וחיילים מחייב גישה רפואית, מקצועית ושיקומית. דורי רפאל מתמחה במתן פתרונות מהירים ויעילים להחזרת המטופל לכשירות מלאה:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item"><strong>הסרת יבלות לחץ:</strong> קילוף עדין ומקצועי של שכבות העור המתות ושחרור הלחץ הממוקד دون לפגוע ברקמה הבריאה.</li>
                        <li className="treatment__list-item"><strong>טיפול בשלפוחיות ופצעים:</strong> ניקוז מקצועי, חיטוי וחבישות רפואיות מתקדמות המאפשרות המשך פעילות ככל הניתן תוך שמירה על היגיינה.</li>
                        <li className="treatment__list-item"><strong>שיקום ציפורניים:</strong> טיפול שמרני בציפורניים חודרניות לשחרור הלחץ והכאב, וכן טיפול בציפורניים שחורות (טראומטיות) למניעת סיבוכים.</li>
                        <li className="treatment__list-item"><strong>התאמת שגרת טיפול אישית:</strong> ייעוץ בנוגע לבחירת גרביים מתאימות, שריכת נעליים נכונה ושמירה על היגיינת כף הרגל למניעת פציעות עתידיות.</li>
                    </ul>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">סובלים מכאבים כתוצאה ממאמץ גופני? אל תשלימו עם הכאב!</h3>
                    <p className="treatment__cta-text" style={{color: 'white', marginBottom: '1.5rem', fontSize: '1.2rem', maxWidth: '800px', marginInline: 'auto'}}>
                        טיפול מקצועי ובזמן יכול למנוע השבתה ממושכת מפעילות. דורי רפאל, פודיאטור מוסמך בעל ניסיון רב בטיפול בחיילים וספורטאים, יעניק לכם את הטיפול והשיקום הדרושים כדי לחזור למגרש או לשטח בכשירות שיא.
                    </p>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">קבעו תור עכשיו לייעוץ וטיפול</NavLink>
                </aside>
            </div>
        </article>
    );
}

import { NavLink } from 'react-router-dom';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import fungusBefore from '../../../assets/patients/נפתלי גרנות R.jpg';
import fungusNail2 from '../../../assets/patients/fungus_nail_2.png';
import fungusSkin1 from '../../../assets/patients/fungus_skin_1.png';
import fungusSkin2 from '../../../assets/patients/fungus_skin_2.png';
import { appConfig } from '../../../Utils/AppConfig';
import './Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function FungusTreatment() {
    return (
        <div className="treatment-page" dir="rtl">
            <SEO
                title="טיפול בפטרת עור וציפורניים | דורי רפאל"
                description="ניקוי, חיטוי וטיפול מקצועי בפטרת כף הרגל והציפורניים לשיפור האסתטיקה ובריאות כף הרגל בקליניקה בתל אביב."
                keywords="פטרת ציפורניים, פטרת עור, טיפול בפטרת, ניקוי פטרת, פטרת כף הרגל"
                canonical="/treatments/fungus"
                ogImage={fungusNail2}
            />
            <header className="treatment__header">
                <h1 className="treatment__title">פטרת עור ופטרת ציפורניים בכפות הרגליים</h1>
                <p className="treatment__subtitle">
                    פטרת בכפות הרגליים ובציפורניי הבהונות היא אחת הבעיות השכיחות ביותר בישראל, במיוחד בקרב גברים, חיילים, ספורטאים ואנשים הנמצאים שעות רבות בנעליים סגורות.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">חשוב להבין</h2>
                    <p className="treatment__text">
                        נכון לידע הרפואי הקיים כיום, תכשירים חיצוניים אינם מספקים ברוב המקרים פתרון אפקטיבי אמיתי לפטרת בציפורניי הבהונות — במיוחד כאשר מדובר בזיהום ותיק, עמוק או מפושט. 
                        בנוסף, גם תחום טיפולי הלייזר לפטרת ציפורניים סובל בשנים האחרונות מהבטחות שיווקיות מוגזמות, אשר אינן מגובות ברמת הוכחה רפואית מספקת.
                    </p>
                    <p className="treatment__text">
                        לצערי, מטופלים רבים מוציאים סכומי כסף גבוהים מאוד על סדרות טיפולים יקרות, לעיתים תוך יצירת ציפיות שאינן תואמות את המציאות הרפואית בפועל. לכן, במקרים משמעותיים של פטרת ציפורניים, ההמלצה המקצועית שלי היא בדרך כלל לפנות לרופא עור מומחה לצורך אבחון מסודר. המקצועיות שלי היא גם לדעת מתי נכון להפנות את המטופל לגורם הרפואי המתאים ביותר עבורו.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">פטרת עור בכפות הרגליים (Tinea Pedis)</h2>
                    <p className="treatment__text">
                        פטרת עור מופיעה לרוב בין אצבעות כפות הרגליים, אך עלולה להתפשט גם לאזורים נוספים בכף הרגל. התסמינים השכיחים כוללים:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">גרד וצריבה</li>
                        <li className="treatment__list-item">קילופים וסדקים</li>
                        <li className="treatment__list-item">עור לבן, לח או "ממוסס" בין האצבעות</li>
                        <li className="treatment__list-item">אדמומיות ורגישות</li>
                        <li className="treatment__list-item">ריח חריף ולא נעים</li>
                    </ul>
                    <p className="treatment__text">
                        ברוב המקרים מדובר בזיהום פטרייתי הניתן לטיפול יעיל יחסית, במיוחד כאשר משלבים טיפול מתאים יחד עם שיפור בהרגלי ההיגיינה והייבוש של כפות הרגליים.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <ZoomableImage src={fungusSkin1} alt="פטרת עור בכפות הרגליים - אצבעות" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <ZoomableImage src={fungusSkin2} alt="פטרת עור בכפות הרגליים - קילוף" style={{ width: '100%', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }} />
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">אז מה בכל זאת תפקידו של הטיפול הפודיאטרי?</h2>
                    <p className="treatment__text">
                        לטיפול הפודיאטרי יש חשיבות משמעותית כחלק מההתמודדות הכוללת עם פטרת עור וציפורניים, בין היתר באמצעות:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">ניקוי מקצועי של כף הרגל</li>
                        <li className="treatment__list-item">הפחתת עומס של ציפורניים מעובות ופטרתיות</li>
                        <li className="treatment__list-item">הסרת עור נגוע ומרבצי פטרת</li>
                        <li className="treatment__list-item">הפחתת כאבים ולחצים</li>
                        <li className="treatment__list-item">שיפור היגיינת כף הרגל</li>
                        <li className="treatment__list-item">הדרכה מקצועית למניעת הדבקה חוזרת</li>
                    </ul>
                    <p className="treatment__text">
                        במקרים רבים, ללא תחזוקה מקצועית ושמירה יומיומית נכונה על כפות הרגליים — גם טיפול תרופתי טוב עלול שלא להשיג תוצאה מספקת לאורך זמן.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מניעה והיגיינה – חלק בלתי נפרד מהטיפול</h2>
                    <p className="treatment__text">פטריות אוהבות חום, לחות וסביבה סגורה. לכן, אחד הדברים החשובים ביותר הוא:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">ייבוש יסודי של כפות הרגליים לאחר רחצה</li>
                        <li className="treatment__list-item">ייבוש בין האצבעות</li>
                        <li className="treatment__list-item">החלפה תדירה של גרביים</li>
                        <li className="treatment__list-item">אוורור נעליים</li>
                        <li className="treatment__list-item">הימנעות מהליכה יחפה במקלחות ציבוריות, חדרי כושר ובריכות</li>
                    </ul>
                    <p className="treatment__text">
                        במקרים של פטרת פעילה, מומלץ לעיתים גם להקדיש מגבת נפרדת לכפות הרגליים ולשמור על היגיינה קפדנית של הנעליים והגרביים, כדי להפחית סיכון להדבקה חוזרת.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">פטרת ציפורניים (Onychomycosis)</h2>
                    <p className="treatment__text">
                        פטרת ציפורניים פוגעת בעיקר בציפורניי הבהונות, וגורמת עם הזמן לשינוי צבע הציפורן, התעבות, עיוות מבני ולעיתים אף להתפוררות חלקית של הציפורן.
                    </p>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', marginTop: '1.5rem' }}>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <ZoomableImage src={fungusBefore} alt="פטרת ציפורניים לפני טיפול 1" style={{ width: '100%', borderRadius: '8px', border: '2px solid #ccc' }} />
                        </div>
                        <div style={{ width: '100%', maxWidth: '400px' }}>
                            <ZoomableImage src={fungusNail2} alt="פטרת ציפורניים לפני טיפול 2" style={{ width: '100%', borderRadius: '8px', border: '2px solid #ccc' }} />
                        </div>
                    </div>
                </section>


                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">סובלים מפטרת עור או ציפורניים?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לטיפול והדרכה</NavLink>
                </aside>
            </div>
        </div>
    );
}

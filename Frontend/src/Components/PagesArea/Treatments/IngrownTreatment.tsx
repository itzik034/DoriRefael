import { NavLink } from 'react-router-dom';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import ingrownAfter from '../../../assets/patients/shutterstock_1335239690-Small.jpg';
import { appConfig } from '../../../Utils/AppConfig';
import './Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function IngrownTreatment() {
    return (
        <div className="treatment-page" dir="rtl">
            <SEO
                title="טיפול בציפורן חודרנית | דורי רפאל"
                description="עזרה ראשונה וטיפול מקצועי בציפורן חודרנית להקלה מיידית בכאב וללא ניתוח בקליניקה בתל אביב."
                keywords="ציפורן חודרנית, טיפול בציפורן חודרנית, הקלה בכאב ציפורן חודרנית, פדיקור רפואי ציפורן חודרנית"
                canonical="/treatments/ingrown"
                ogImage={ingrownAfter}
            />
            <header className="treatment__header">
                <h1 className="treatment__title">טיפול בציפורן חודרנית</h1>
                <p className="treatment__subtitle">
                    ציפורן חודרנית היא אחת הבעיות הכואבות והשכיחות ביותר בכף הרגל. המצב נוצר כאשר קצה הציפורן חודר אל תוך העור שסביבה.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">תסמינים ותגובה דלקתית</h2>
                    <p className="treatment__text">
                        החדירה של הציפורן לעור גורמת לתגובה דלקתית מקומית העלולה לכלול:
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">כאבים משמעותיים</li>
                        <li className="treatment__list-item">נפיחות ואדמומיות</li>
                        <li className="treatment__list-item">רגישות בדריכה</li>
                        <li className="treatment__list-item">זיהום מקומי</li>
                        <li className="treatment__list-item">הפרשות ולעיתים גם מוגלה</li>
                    </ul>
                    <p className="treatment__text">
                        במקרים מתקדמים, הגוף מנסה "לסגור" על האזור הפצוע, ולעיתים נוצרת רקמת בשר מגורה ובולטת סביב הציפורן.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">למה זה קורה?</h2>
                    <p className="treatment__text">ציפורן חודרנית יכולה להיגרם ממספר גורמים, ביניהם:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">גזירה לא נכונה של הציפורניים</li>
                        <li className="treatment__list-item">לחץ מנעליים צרות או לוחצות</li>
                        <li className="treatment__list-item">מבנה ציפורן מולד</li>
                        <li className="treatment__list-item">חבלה או מכה באזור</li>
                        <li className="treatment__list-item">פעילות ספורטיבית אינטנסיבית</li>
                        <li className="treatment__list-item">עיוותים של הציפורן או פטרת ציפורניים</li>
                    </ul>
                    <p className="treatment__text">
                        לעיתים מדובר בבעיה חד־פעמית, אך אצל חלק מהמטופלים קיימת נטייה חוזרת לציפורניים חודרניות.
                    </p>
                    <div className="treatment__before-after" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                        <div style={{ flex: '1 1 300px' }}>
                            <ZoomableImage src={ingrownAfter} alt="לאחר טיפול בציפורן חודרנית" style={{ width: '100%', borderRadius: '8px', border: '2px solid #4CAF50' }} />
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">חשוב להבין</h2>
                    <p className="treatment__text">
                        במקרים רבים ניתן להקל על הכאב כמעט באופן מיידי כבר במהלך הטיפול הראשון, במיוחד כאשר הטיפול מבוצע בצורה מקצועית, עדינה ומבוקרת. 
                        עם זאת, טיפול אגרסיבי מדי, חיתוכים עמוקים או ניסיונות "לחפור" לבד בציפורן — עלולים דווקא להחמיר את המצב, להגביר את הדלקת וליצור זיהומים מיותרים.
                    </p>
                    <p className="treatment__text">
                        לכן, טיפול בציפורן חודרנית חייב להתבצע בידיים מיומנות, בסביבה סטרילית ותוך הבנה מקצועית של מבנה הציפורן ודפוסי הגדילה שלה.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מה כולל הטיפול?</h2>
                    <p className="treatment__text">הטיפול מותאם למצב הציפורן ולחומרת הדלקת, ועשוי לכלול:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">הקלה מיידית על הלחץ והכאב</li>
                        <li className="treatment__list-item">ניקוי מקצועי ועדין של האזור</li>
                        <li className="treatment__list-item">טיפול בדלקת מקומית</li>
                        <li className="treatment__list-item">הנחיית הציפורן לצמיחה נכונה יותר</li>
                        <li className="treatment__list-item">הפחתת הסיכון לחזרת הבעיה</li>
                        <li className="treatment__list-item">הדרכה מקצועית לגזירה נכונה ומניעה עתידית</li>
                    </ul>
                    <p className="treatment__text">
                        במקרים מורכבים במיוחד או חוזרים, ייתכן צורך גם בהפניה להמשך טיפול רפואי מתאים.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">ניסיון, סטריליות וזהירות</h2>
                    <p className="treatment__text">
                        ציפורן חודרנית אולי נראית כמו בעיה "קטנה", אך טיפול לא נכון עלול להפוך אותה לבעיה כואבת וממושכת. מאז שנת 2003 מטפל דורי רפאל במאות מקרים של ציפורניים חודרניות — החל ממקרים קלים ועד למצבים מורכבים אצל ספורטאים, חיילים, מבוגרים וחולי סוכרת.
                    </p>
                    <p className="treatment__text">
                        הטיפולים מתבצעים בקליניקה פרטית ומאובזרת בתל אביב, תוך הקפדה על סביבת טיפול סטרילית, עבודה עדינה ותשומת לב מקצועית גבוהה.
                    </p>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">סובלים מכאבים בציפורן?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לקביעת טיפול מקצועי</NavLink>
                </aside>
            </div>
        </div>
    );
}

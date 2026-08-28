import { NavLink } from 'react-router-dom';
import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import wartBefore from '../../../assets/patients/דניאל יד ימין לפני.jpg';
import wartAfter from '../../../assets/patients/דניאל יד ימין אחרי טיפול.jpg';
import footBefore from '../../../assets/patients/רומן רגל שמאל לפני.jpg';
import footAfter from '../../../assets/patients/רומן רגל שמאל אחרי.jpg';
import { appConfig } from '../../../Utils/AppConfig';
import './Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function WartsTreatment() {
    return (
        <div className="treatment-page" dir="rtl">
            <SEO
                title="טיפולי SWIFT ויבלות מכאניות | דורי רפאל"
                description="אבחון וטיפול חדשני ביבלות ברגליים, בידיים ובמקומות אחרים בעור בטכנולוגיית SWIFT מתקדמת בקליניקה של דורי רפאל בתל אביב."
                keywords="טיפול ביבלות, טכנולוגיית SWIFT, יבלות מכאניות, יבלות בכף הרגל, דורי רפאל SWIFT"
                canonical="/treatments/warts"
            />
            <header className="treatment__header">
                <h1 className="treatment__title">יבלות בכף הרגל – אבחון וטיפול מקצועי</h1>
                <p className="treatment__subtitle">
                    כאבים בכף הרגל אינם תמיד נגרמים מאותה הבעיה. רבים משתמשים במילה "יבלת" כדי לתאר מספר מצבים שונים לחלוטין — ולכן אבחון מקצועי הוא שלב קריטי לפני תחילת טיפול.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">ההבדל בין סוגי היבלות</h2>
                    <p className="treatment__text">באופן כללי, נהוג להבחין בין שלושה מצבים עיקריים:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">יבלות מכאניות (יבלות לחץ / Corns)</li>
                        <li className="treatment__list-item">נקודות לחץ ועור מעובה (Callus)</li>
                        <li className="treatment__list-item">יבלות ויראליות הנגרמות על-ידי נגיף ה־HPV</li>
                    </ul>
                    <p className="treatment__text">
                        למרות שלעיתים הכאב דומה, מדובר במצבים שונים לחלוטין מבחינת הגורם, אופי הטיפול והסיכון להדבקה.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מהן יבלות מכאניות ונקודות לחץ?</h2>
                    <p className="treatment__text">
                        יבלת מכאנית נוצרת כתוצאה מלחץ או חיכוך מתמשך באזור מסוים בכף הרגל. בניגוד ליבלות ויראליות, היבלות המכאניות קשורות בדרך-כלל לעומסים מקומיים כגון נעל לוחצת, מבנה אנטומי של כף הרגל או לחץ חוזר בזמן הליכה. בשפה העממית מכנים לעיתים יבלות אלו בשם “יבלת מסמר”.
                    </p>
                    <p className="treatment__text">טיפול פדיקור רפואי מקצועי כולל:</p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">אבחון מקור הלחץ</li>
                        <li className="treatment__list-item">הסרה מדויקת של הרקמה המעובה</li>
                        <li className="treatment__list-item">הפחתת כאב מיידית</li>
                        <li className="treatment__list-item">הכוונה להפחתת הישנות ככל האפשר</li>
                    </ul>
                    <p className="treatment__text">
                        טיפול מקצועי ונכון עשוי לשפר משמעותית את איכות החיים, להפחית כאב, לשפר את ההליכה והעמידה, ולהאריך באופן משמעותי את הזמן עד להישנות היבלת.
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מהן יבלות ויראליות (יבלות HPV)?</h2>
                    <p className="treatment__text">
                        יבלות ויראליות הן נגעי עור הנגרמים על-ידי נגיף ה־Human papillomavirus. הנגיף חודר לעור דרך סדקים מיקרוסקופיים ועלול לגרום להתפתחות נגעים עוריים המופיעים במקבצים, ובעלי נטייה להדבקה במגע עור ישיר.
                    </p>
                    <p className="treatment__text">
                        הטיפולים המסורתיים (כגון חנקן נוזלי או חומרים כימיים) עשויים לסייע, אך במקרים עמידים, טיפולים אלו עלולים להיות כרוכים בכאב משמעותי ותקופת החלמה ממושכת. לכן מטופלים רבים מחפשים פתרונות מתקדמים יותר.
                    </p>
                    <div className="treatment__before-after-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        <div className='img_exmpls'>
                            <h3 className="treatment__section-subtitle" style={{textAlign: "center", marginTop: 0}}>טיפול ביבלות ביד</h3>
                            <div className="treatment__before-after" style={{ marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                                <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                    <h4 className="treatment__before-after-title">לפני הטיפול</h4>
                                    <ZoomableImage src={wartBefore} alt="יבלות ויראליות ביד ימין לפני טיפול" className="treatment__before-after-img" />
                                </div>
                                <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                    <h4 className="treatment__before-after-title">אחרי סדרת טיפולים</h4>
                                    <ZoomableImage src={wartAfter} alt="יד ימין נקייה מיבלות אחרי טיפול" className="treatment__before-after-img treatment__before-after-img--after" />
                                </div>
                            </div>
                        </div>
                        <div>
                            <h3 className="treatment__section-subtitle" style={{textAlign: "center", marginTop: 0}}>טיפול ביבלות ברגל</h3>
                            <div className="treatment__before-after" style={{ marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                                <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                    <h4 className="treatment__before-after-title">לפני הטיפול</h4>
                                    <ZoomableImage src={footBefore} alt="יבלות ויראליות ברגל שמאל לפני טיפול" className="treatment__before-after-img" />
                                </div>
                                <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                    <h4 className="treatment__before-after-title">אחרי סדרת טיפולים</h4>
                                    <ZoomableImage src={footAfter} alt="רגל שמאל נקייה מיבלות אחרי טיפול" className="treatment__before-after-img treatment__before-after-img--after" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">טכנולוגיית SWIFT לטיפול ביבלות</h2>
                    <p className="treatment__text">
                        טכנולוגיית Swift Microwave Therapy היא טכנולוגיה רפואית מתקדמת לטיפול ביבלות ויראליות באמצעות אנרגיית גלי מיקרו מדויקת. הטיפול יוצר תגובה ביולוגית מקומית ברקמה המסייעת לגוף להתמודד עם הזיהום.
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">טיפול ממוקד ללא ניתוח</li>
                        <li className="treatment__list-item">ללא חבישות או השבתה ממושכת</li>
                        <li className="treatment__list-item">זמן טיפול קצר יחסית עם חזרה מהירה לשגרה</li>
                        <li className="treatment__list-item">התאמה ליבלות עמידות לטיפולים קודמים</li>
                    </ul>

                    <h3 className="treatment__section-subtitle">טכנולוגיה מתקדמת</h3>
                    
                    <div className="treatment__video-single">
                        <iframe
                            width="100%"
                            height="315"
                            src="https://www.youtube.com/embed/gIwASrCaMVU"
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen>
                        </iframe>
                    </div>
                    
                    <h3 className="treatment__section-subtitle">המלצות מטופלים</h3>
                    
                    <div className="treatment__video-grid">
                        <div className="treatment__video-item">
                            <iframe
                                width="100%"
                                height="250"
                                src="https://www.youtube.com/embed/xVx3v4KolH4"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                        <div className="treatment__video-item">
                            <iframe
                                width="100%"
                                height="250"
                                src="https://www.youtube.com/embed/ELLpe8Wb-vE"
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                allowFullScreen>
                            </iframe>
                        </div>
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מדוע חשוב לא לאבחן לבד?</h2>
                    <p className="treatment__text">
                        ניסיון לטפל ביבלת באופן עצמאי באמצעות תכשירים הנמכרים ללא מרשם וללא אבחון מקצועי עלול לגרום לכוויות כימיות, כאבים משמעותיים ואף החמרה של המצב המקורי.
                        בקליניקה מבוצע אבחון מקצועי, ניקוי והסרת שכבות עור נגועות, והתאמת שיטת הטיפול המתאימה ביותר – המטרה היא להסיר את הנגע ולסייע לעור לחזור לתפקוד תקין.
                    </p>
                </section>

                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">חושדים שיש לכם יבלת?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לאבחון וטיפול מקצועי</NavLink>
                </aside>
            </div>
        </div>
    );
}

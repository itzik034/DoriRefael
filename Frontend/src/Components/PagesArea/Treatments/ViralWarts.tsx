import { ZoomableImage } from '../../SharedArea/ZoomableImage/ZoomableImage';
import { NavLink } from 'react-router-dom';
import case1Before from '../../../assets/patients/3/1 לפני.png';
import case1After from '../../../assets/patients/3/1 אחרי.png';
import case2Before from '../../../assets/patients/3/2 לפני.png';
import case2After from '../../../assets/patients/3/2 אחרי.png';
import case3Before from '../../../assets/patients/3/3 לפני.png';
import case3After from '../../../assets/patients/3/3 אחרי.png';
import case4Before from '../../../assets/patients/3/4 לפני.png';
import case4After from '../../../assets/patients/3/4 אחרי.png';
import case5Before from '../../../assets/patients/3/5 לפני.png';
import case5After from '../../../assets/patients/3/5 אחרי.png';
import case6Before from '../../../assets/patients/3/6 לפני.png';
import case6After from '../../../assets/patients/3/6 אחרי.png';
import { appConfig } from '../../../Utils/AppConfig';
import './Treatment.css';
import { SEO } from '../../SharedArea/SEO/SEO';

export function ViralWarts() {
    return (
        <div className="treatment-page" dir="rtl">
            <SEO
                title="טיפול ביבלת ויראלית בכף הרגל | דורי רפאל"
                description="אבחון וטיפול מקצועי ביבלות ויראליות (HPV) בכפות הרגליים והידיים בקליניקה של דורי רפאל בתל אביב בטכנולוגיית SWIFT."
                keywords="יבלת ויראלית, טיפול ביבלת ויראלית, יבלת בכף הרגל, HPV ברגל, SWIFT יבלת ויראלית"
                canonical="/treatments/viral"
                ogImage={case1Before}
            />
            <header className="treatment__header">
                <h1 className="treatment__title">יבלות ויראליות – הסבר ומידע</h1>
                <p className="treatment__subtitle">
                    מהן יבלות ויראליות, איך נדבקים בהן, ומה ניתן לעשות כדי לטפל בנגיף באופן יעיל ובטוח.
                </p>
            </header>

            <div className="treatment__content">
                <section className="treatment__card">
                    <h2 className="treatment__card-title">מהן יבלות ויראליות?</h2>
                    <p className="treatment__text">
                        יבלות וויראליות הן גידולי עור שפירים שמופיעים במקומות שונים על פני העור, כתוצאה מהדבקה בנגיף הפפילומה האנושי (HPV). הנגיף חודר לעור ויכול להתקיים בשני מצבים עקרים: דגירה או התפרצות. בשלב הדגירה, שלא מוגבל בזמן, הווירוס מתפתח מחזק את אחיזתו ברקמת העור, ובונה למושבות שלו, שנראות כמו כרוביות קטנות, מערכת של חילוף חומרים, שמבוססת על נימי דם קטנים, שמופיעים לרוב בתוך היבלות כנקודות שחורות. זהו המאפיין היחודי והבולט ביותר של היבלות הוויראליות.
                    </p>
                    <p className="treatment__text">
                        במרבית המקרים היבלות מתחילות את דרכן על הגוף הנשא, מאזור כפות הרגליים, אבל הן יכולות להופיע גם על כפות הידיים, פנים, שפתיים וכל מקום אחר על פני העור.
                    </p>
                    <p className="treatment__text">
                        היבלות הוויראליות הן בעלות יכולת הדבקה גבוהה גם למי שבא במגע ישיר עם הנשא, וגם לנשא עצמו, בדרך של התפשטות לאזורים נוספים או שטחים נרחבים על פני העור.
                    </p>
                    <p className="treatment__text">
                        בחלק מהמקרים, כמעט תמיד כשהיבלות נמצאות באזורי דריכה של כף-הרגל, הן יכולות לגרום לכאב חד ומשמעותי.
                    </p>
                    <p className="treatment__text">
                        <b>לכן קיימת חשיבות עליונה לעצור את תהליך ההתפרצות וההתפשטות – מוקדם ככל האפשר.</b>
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">תמונות של יבלות וויראליות – לפני ואחרי טיפולים בטכנולוגיית SWIFT</h2>
                    <div className="treatment__before-after-container" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {[
                            { before: case1Before, after: case1After, title: "מקרה 1" },
                            { before: case2Before, after: case2After, title: "מקרה 2" },
                            { before: case3Before, after: case3After, title: "מקרה 3" },
                            { before: case4Before, after: case4After, title: "מקרה 4" },
                            { before: case5Before, after: case5After, title: "מקרה 5" },
                            { before: case6Before, after: case6After, title: "מקרה 6" },
                        ].map((caseData, index) => (
                            <div key={index} className='img_exmpls'>
                                <h3 className="treatment__section-subtitle" style={{ textAlign: "center", marginTop: 0 }}>{caseData.title}</h3>
                                <div className="treatment__before-after" style={{ marginTop: '0.5rem', flexWrap: 'nowrap' }}>
                                    <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                        <h4 className="treatment__before-after-title">לפני הטיפול</h4>
                                        <ZoomableImage src={caseData.before} alt={`לפני טיפול - ${caseData.title}`} className="treatment__before-after-img" />
                                    </div>
                                    <div className="treatment__before-after-col" style={{ flex: '1 1 50%' }}>
                                        <h4 className="treatment__before-after-title">אחרי סדרת טיפולים</h4>
                                        <ZoomableImage src={caseData.after} alt={`אחרי טיפול - ${caseData.title}`} className="treatment__before-after-img treatment__before-after-img--after" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">איך נדבקים ביבלות ויראליות?</h2>
                    <p className="treatment__text">
                        הנגיף (ווירוס הפפילומה) מועבר בדרך כלל במגע ישיר בין בני האדם (עור לעור), אך גם משטחים מזוהמים (פלסטיק, מזרוני פעילות, חדרי כושר, ג'ימבורי, גני ילדים ומקלחות ציבוריות) מסוגלים להעביר את הווירוס ולגרום להדבקה.
                    </p>
                    <p className="treatment__text">
                        <b>ילדים צעירים ובני-נוער רגישים יותר להדבקה, כמו גם אנשים עם מערכת חיסונית מוחלשת.</b>
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">תסמינים ואבחון</h2>
                    <p className="treatment__text">
                        היבלת הוויראלית נראית לרוב כגוש קטן ומחוספס על העור, ולרוב מתקיימת כמקבץ אשכולות, בעל מראה א-סימטרי. במרבית המקרים, ניתן לראות בתוכה נקודות שחורות קטנות – אלו כלי דם זעירים, שהנגיף לוקח מהגוף לצורך מערכת חילוף החומרים של המושבה הוויראלית (ממש כמו צנרת אספקת חיים).
                    </p>
                    <p className="treatment__text">
                        בכפות הרגליים, היבלת עשויה להיראות כעור עבה ונוקשה, שגורם לכאבים משמעותיים.
                    </p>
                    <p className="treatment__text">
                        <b>אבחון מקצועי חשוב במיוחד, שכן לא כל נגע קשה או מכאיב בכף הרגל הוא יבלת ויראלית (למשל, יבלות מכאניות הנוצרות מלחץ).</b>
                    </p>
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">טכנולוגיית SWIFT לטיפול ביבלות ויראליות</h2>
                    <p className="treatment__text">
                        הטיפולים שהיו נהוגים עד לאחרונה, כגון שימוש בצריבה ע"י חנקן נוזלי, תכשירים למריחה מקומית כמו VEROMAL או בליבלת, ואפילו טיפולים נוראיים בלייזר, לא הוכיחו תוצאות מספקות, גרמו לכאב וסבל אצל המטופלים, ואפילו גרמו להתחזקות האחיזה של הנגיף בגוף הנשא ולהתפשטות נוספת על פני העור.
                    </p>
                    <p className="treatment__text">
                        <b>בדיוק בשביל מקרים אלה, פותחה טכנולוגיה פורצת דרך בתחום הרפואה - <span style={{ fontSize: "1.5rem" }}>SWIFT MICROWAVE THERAPY</span></b>
                    </p>
                    <ul className="treatment__list">
                        <li className="treatment__list-item">טכנולוגיה מתקדמת לטיפול ממוקד ומדויק, ביבלות וויראליות, באמצעות אנרגיית גלי-מיקרו.</li>
                        <li className="treatment__list-item">טיפול שיוצר תגובה ביולוגית מקומית בדרך של הרס פנימי של המושבות הוויראליות, המסייעת לגוף להתמודד עם הנגיף באופן טבעי.</li>
                        <li className="treatment__list-item">הטיפול מחליף במרבית המקרים את הצורך בניתוח (על כל השלכותיו).</li>
                        <li className="treatment__list-item">ללא חבישות, השבתה, ופגיעה בפעילות שגרתית.</li>
                        <li className="treatment__list-item">התאמה גבוהה ליבלות ויראליות שהראו עמידות לטיפולים קודמים (כגון חנקן נוזלי ואפילו לייזר).</li>
                    </ul>

                    <h3 className="treatment__section-subtitle">איך עובדת הטכנולוגיה?</h3>
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
                </section>

                <section className="treatment__card">
                    <h2 className="treatment__card-title">מטופלים ממליצים</h2>
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


                <aside className="treatment__cta">
                    <h3 className="treatment__cta-title">סובלים מיבלות ויראליות?</h3>
                    <NavLink to={appConfig.baseUrl + "/contact"} className="treatment__cta-btn">צרו קשר לאבחון וטיפול מקצועי</NavLink>
                </aside>
            </div>
        </div>
    );
}

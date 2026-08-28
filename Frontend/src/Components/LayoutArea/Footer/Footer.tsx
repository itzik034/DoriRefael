import { NavLink } from 'react-router-dom';
import { appConfig } from '../../../Utils/AppConfig';
import './Footer.css';

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footer__container">
                <section className="footer__section">
                    <h3 className="footer__title">דורי רפאל - מרפאת מומחים</h3>
                    <p className="footer__text footer__text_line_height">
                        רפואה מתקדמת, ליווי צמוד, יחס אישי ודיסקרטיות מלאה לגברים.
                    </p>
                </section>
                
                <section className="footer__section">
                    <h3 className="footer__title">יצירת קשר</h3>
                    <address className="footer__address">
                        <p className="footer__text">כתובת: הגיבור האלמוני 50, יד אליהו, ת"א​</p>
                        <p className="footer__text">טלפון: <a href="tel:0508266042" className="footer__link">050-8266042</a></p>
                        <p className="footer__text">דוא"ל: <a href="mailto:office@dorirefael.co.il" className="footer__link">office@dorirefael.co.il</a></p>
                    </address>
                </section>
                
                <section className="footer__section">
                    <h3 className="footer__title">שעות פעילות</h3>
                    <p className="footer__text">א' – ה' מ 9:00 עד 19:00</p>
                    <p className="footer__text">זמינות מיוחדת לחיילים גם בסופ"שים</p>
                </section>
            </div>
            <div className="footer__bottom">
                <div className="footer__bottom-container">
                    <p>&copy; {currentYear} דורי רפאל. כל הזכויות שמורות.</p>
                    <p className="footer__credits">
                        אתר זה נבנה ועוצב ע"י <a href="https://itzik.it/" target="_blank" rel="noopener noreferrer" className="footer__credits-link">איציק אוליאל</a>
                    </p>
                    <NavLink to={appConfig.baseUrl + "/accessibility"} className="footer__accessibility-link">הצהרת נגישות</NavLink>
                </div>
            </div>
        </footer>
    );
}

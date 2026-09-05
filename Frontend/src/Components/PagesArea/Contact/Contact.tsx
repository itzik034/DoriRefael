import { useState } from 'react';
import './Contact.css';
import { SEO } from '../../SharedArea/SEO/SEO';
import clinicHeroImage from '../../../assets/clinic_hero_3.jpg';

export function Contact() {
    const [nameVal, setNameVal] = useState('');
    const [phoneVal, setPhoneVal] = useState('');
    const [messageVal, setMessageVal] = useState('');
    const [errors, setErrors] = useState({ name: '', phone: '' });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const newErrors = { name: '', phone: '' };
        let isValid = true;

        if (!nameVal.trim()) {
            newErrors.name = 'אנא הזן שם מלא';
            isValid = false;
        }

        if (!phoneVal.trim()) {
            newErrors.phone = 'אנא הזן מספר טלפון';
            isValid = false;
        }

        setErrors(newErrors);

        if (isValid) {
            console.log('Form submitted', { nameVal, phoneVal, messageVal });
        }
    };

    return (
        <div className="contact-page" dir="rtl">
            <SEO
                title="צור קשר | דורי רפאל - קליניקה לטיפולי כף רגל בתל אביב"
                description="צרו קשר עם דורי רפאל לקביעת תור לייעוץ וטיפול פדיקור רפואי בקליניקה בתל אביב. טלפון ישיר: 050-826-6042."
                keywords="צור קשר דורי רפאל, קביעת תור פדיקור רפואי, קליניקה בתל אביב, טלפון דורי רפאל"
                canonical="/contact"
                ogImage={clinicHeroImage}
            />
            <header className="contact__header">
                <h1 className="contact__title">צור קשר</h1>
                <p className="contact__subtitle">
                    אנו כאן לכל שאלה. השאירו פרטים או צרו קשר ישירות.
                </p>
            </header>

            <div className="contact__content">
                {/* Contact Information Card */}
                <section className="contact__info-card" aria-labelledby="contact-info-title">
                    <h2 className="contact__card-title" id="contact-info-title">פרטי התקשרות</h2>

                    <div className="contact__detail-item contact__whatsapp-container">
                        <span className="contact__detail-label">להזמנת טיפול או קבלת מידע</span>
                        <a 
                            href="https://api.whatsapp.com/send/?phone=972508266042&text=%D7%94%D7%99%D7%99%2C+%D7%94%D7%92%D7%A2%D7%AA%D7%99+%D7%93%D7%A8%D7%9A+%D7%94%D7%90%D7%AA%D7%A8+%D7%A9%D7%9C%D7%9A.+%D7%90%D7%A9%D7%9E%D7%97+%D7%9C%D7%A7%D7%91%D7%9C+%D7%A4%D7%A8%D7%98%D7%99%D7%9D+%D7%95%D7%9C%D7%AA%D7%90%D7%9D+%D7%AA%D7%95%D7%A8+%D7%9C%D7%98%D7%99%D7%A4%D7%95%D7%9C.&type=phone_number&app_absent=0" 
                            className="contact__whatsapp-btn"
                            target="_blank" 
                            rel="noopener noreferrer"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" width="24" height="24" fill="currentColor">
                                <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
                            </svg>
                            שלחו הודעת ווצאפ
                        </a>
                        <div style={{ fontSize: '1.4rem', color: 'var(--color-text-light)' }}>
                            טלפון ישיר במקרים דחופים: <br /><a href="tel:0508266042" dir="ltr" style={{ color: 'var(--color-steel-blue)', textDecoration: 'none', fontWeight: 600 }}>050-826-6042</a>
                        </div>
                    </div>

                    <div className="contact__detail-item">
                        <span className="contact__detail-label">כתובת המרפאה</span>
                        <span className="contact__detail-value">
                            הגיבור האלמוני 50, יד אליהו, תל אביב
                        </span>
                    </div>

                    {/* Map Iframe */}
                    <div className="contact__map-wrapper">
                        <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3381.330083668451!2d34.80236472385705!3d32.0603198202662!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x151d4b0c7be8a987%3A0x54ebc86f8b3133!2z15PXldeo15kg16jXpNeQ15wgLSDXnteV157Xl9eUINec16TXk9eZ16fXldeoINeo16TXldeQ15kg16fXnNeZ16DXmSDXldeY15nXpNeV15zXmdedINee16rXp9eT157XmdedINec15TXodeo16og15nXkdec15XXqiDXldeV15nXqNeQ15zXmdeV16ogLyDXnteb15DXoNeZ15XXqi4!5e0!3m2!1siw!2sil!4v1781139138906!5m2!1siw!2sil" 
                            width="600" 
                            height="450" 
                            style={{border: 0}} 
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="מפת הגעה למרפאה"
                        ></iframe>
                    </div>

                    {/* Navigation Buttons */}
                    <div className="contact__nav-buttons">
                        <a href="https://ul.waze.com/ul?place=ChIJh6noewxLHRURMzGLb8jrVAA&ll=32.06031530%2C34.79978980&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location" target="_blank" rel="noopener noreferrer" className="contact__nav-btn contact__nav-btn--waze">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                                <path d="M13.218 0C9.915 0 6.835 1.49 4.723 4.148c-1.515 1.913-2.31 4.272-2.31 6.706v1.739c0 .894-.62 1.738-1.862 1.813-.298.025-.547.224-.547.522-.05.82.82 2.31 2.012 3.502.82.844 1.788 1.515 2.832 2.036a3 3 0 0 0 2.955 3.528 2.966 2.966 0 0 0 2.931-2.385h2.509c.323 1.689 2.086 2.856 3.974 2.21 1.64-.546 2.36-2.409 1.763-3.924a12.84 12.84 0 0 0 1.838-1.465 10.73 10.73 0 0 0 3.18-7.65c0-2.882-1.118-5.589-3.155-7.625A10.899 10.899 0 0 0 13.218 0zm0 1.217c2.558 0 4.967.994 6.78 2.807a9.525 9.525 0 0 1 2.807 6.78A9.526 9.526 0 0 1 20 17.585a9.647 9.647 0 0 1-6.78 2.807h-2.46a3.008 3.008 0 0 0-2.93-2.41 3.03 3.03 0 0 0-2.534 1.367v.024a8.945 8.945 0 0 1-2.41-1.788c-.844-.844-1.316-1.614-1.515-2.11a2.858 2.858 0 0 0 1.441-.846 2.959 2.959 0 0 0 .795-2.036v-1.789c0-2.11.696-4.197 2.012-5.861 1.863-2.385 4.62-3.726 7.6-3.726zm-2.41 5.986a1.192 1.192 0 0 0-1.191 1.192 1.192 1.192 0 0 0 1.192 1.193A1.192 1.192 0 0 0 12 8.395a1.192 1.192 0 0 0-1.192-1.192zm7.204 0a1.192 1.192 0 0 0-1.192 1.192 1.192 1.192 0 0 0 1.192 1.193 1.192 1.192 0 0 0 1.192-1.193 1.192 1.192 0 0 0-1.192-1.192zm-7.377 4.769a.596.596 0 0 0-.546.845 4.813 4.813 0 0 0 4.346 2.757 4.77 4.77 0 0 0 4.347-2.757.596.596 0 0 0-.547-.845h-.025a.561.561 0 0 0-.521.348 3.59 3.59 0 0 1-3.254 2.061 3.591 3.591 0 0 1-3.254-2.061.64.64 0 0 0-.546-.348z"/>
                            </svg>
                            נווט ב-Waze
                        </a>
                        <a href="https://maps.app.goo.gl/gRUYp7jA9hEhL3Hq5" target="_blank" rel="noopener noreferrer" className="contact__nav-btn contact__nav-btn--google">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" width="18" height="18" fill="currentColor">
                                <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                            </svg>
                            נווט ב-Google Maps
                        </a>
                    </div>
                </section>

                {/* Contact Form Card */}
                <section className="contact__form-card" aria-labelledby="contact-form-title">
                    <h2 className="contact__card-title" id="contact-form-title">השארת פרטים</h2>
                    <form className="contact__form" onSubmit={handleSubmit} noValidate>
                        <div className="contact__form-group">
                            <label htmlFor="name" className="contact__form-label">שם מלא</label>
                            <input 
                                type="text" 
                                id="name" 
                                name="name" 
                                className="contact__form-input" 
                                placeholder="הכנס את שמך" 
                                required 
                                value={nameVal}
                                onChange={(e) => setNameVal(e.target.value)}
                                aria-invalid={!!errors.name}
                                aria-describedby={errors.name ? "name-error" : undefined}
                            />
                            {errors.name && <span id="name-error" className="contact__error-message" aria-live="polite" style={{ color: '#d32f2f', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.name}</span>}
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="phone" className="contact__form-label">טלפון</label>
                            <input 
                                type="tel" 
                                id="phone" 
                                name="phone" 
                                className="contact__form-input" 
                                placeholder="הכנס מספר טלפון לחזרה" 
                                required 
                                value={phoneVal}
                                onChange={(e) => setPhoneVal(e.target.value)}
                                dir={phoneVal ? "ltr" : "rtl"}
                                style={{ textAlign: phoneVal ? "left" : "right" }}
                                aria-invalid={!!errors.phone}
                                aria-describedby={errors.phone ? "phone-error" : undefined}
                            />
                            {errors.phone && <span id="phone-error" className="contact__error-message" aria-live="polite" style={{ color: '#d32f2f', fontSize: '0.875rem', marginTop: '0.25rem', display: 'block' }}>{errors.phone}</span>}
                        </div>

                        <div className="contact__form-group">
                            <label htmlFor="message" className="contact__form-label">הודעה (אופציונלי)</label>
                            <textarea 
                                id="message" 
                                name="message" 
                                className="contact__form-textarea" 
                                placeholder="איך נוכל לעזור?"
                                value={messageVal}
                                onChange={(e) => setMessageVal(e.target.value)}
                                aria-describedby="message-helper"
                            ></textarea>
                            <span id="message-helper" className="contact__helper-text" style={{ fontSize: '0.875rem', color: 'var(--color-text-light)', marginTop: '0.25rem', display: 'block' }}>
                                נשתדל לחזור אליך בהקדם האפשרי.
                            </span>
                        </div>

                        <button type="submit" className="contact__submit-btn">שלח פנייה</button>
                    </form>
                </section>
            </div>
        </div>
    );
}

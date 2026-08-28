import './Reviews.css';
import { SEO } from '../../SharedArea/SEO/SEO';

interface Review {
    id: number;
    name: string;
    text: string;
    rating: number;
    time: string;
}

const reviews: Review[] = [
    {
        id: 1,
        name: "shmuel david",
        time: "לפני 7 חודשים",
        rating: 5,
        text: "אשתי שסבלה מצפורן חודרנית כתוצאה מנשירה של צפורן חדשה אחרי פגיעה. הגיעה עם בוהן דלוקה נפוחה מלווה בכאבים עברה טפול מציל כף רגל כמעט ללא כאבים והיום כבר מסוגלת לחזור ולנעול סנדל ולהלך ללא כאבים."
    },
    {
        id: 2,
        name: "Elad Shurati",
        time: "לפני 7 חודשים",
        rating: 5,
        text: "תותח! מקצוען, סבלני, איכותי מאוד והכל באווירה מדהימה. מומלץ"
    },
    {
        id: 3,
        name: "mor levi",
        time: "לפני 7 חודשים",
        rating: 5,
        text: "נחשפתי לדורי האמת ממש במקרה דרך הצ׳אט גיפטי ואני חייבת לציין שהייתי מופתעת לטובה ! התקשרתי אליו בגלל שיש לי סבתא בת 93 עם בעיות של אצבעות ויבלות מאוד קשות ודורי טיפל בה ברגישות ומסירות כאילו זאת הייתה סבתא שלו שזה מה שריגש אותי מאוד !!! שירות מקצועי ואמין ממליצה בחום 🙏"
    },
    {
        id: 4,
        name: "Sela Netz",
        time: "לפני 7 חודשים",
        rating: 5,
        text: "הגעתי לדורי עם ציפורן חודרנית כתוצאה מפציעה, אדם מקצועי ביותר, משרה ביטחון ואווירה נעימה. מקום נקי ודורי מקפיד על סטריליות. ניכר שאכפת לו ושהוא דואג ללקוחות שלו. ממליץ בחום!"
    },
    {
        id: 5,
        name: "Yakov riboh",
        time: "לפני 7 חודשים",
        rating: 5,
        text: "שירות מעולה ומקצועי"
    },
    {
        id: 6,
        name: "Irit Gerchkovitz",
        time: "לפני 6 חודשים",
        rating: 5,
        text: "טיפול מקצועי ורגיש. מקום אסתטי. דורי עושה פלאים."
    },
    {
        id: 7,
        name: "Gilad Liviatan",
        time: "לפני 5 חודשים",
        rating: 5,
        text: "תודה רבה לדורי היקר עבור הטיפול המקצועי פעם ראשונה שלי לטיפול רפואי לכף הרגל הטיפול היה באווירה נעימה נינוחה ואסטטית, דורי טיפל בצורה מקצועית ונעימה, הסביר את תהליך הטיפול וכמובן גם הרווחנו שיחה נעימה , תודה רבה לך :) ממליץ בחום"
    },
    {
        id: 8,
        name: "Yakov Binyaminov",
        time: "לפני 5 חודשים",
        rating: 5,
        text: "דורי באמת יודע מה הוא עושה קשוב לבעיה ויודע למצוא את הפתרון הנכון אדם חביב ונחמד ובעיקר מקצועי מאוד ממליץ בחום!!"
    }
];

const youtubeVideos = [
    { id: 'ELLpe8Wb-vE', url: 'https://www.youtube.com/embed/ELLpe8Wb-vE' },
    { id: 'xVx3v4KolH4', url: 'https://www.youtube.com/embed/xVx3v4KolH4' }
];

export function Reviews() {
    return (
        <div className="reviews-page" dir="rtl">
            <SEO
                title="המלצות וביקורות מטופלים | דורי רפאל"
                description="קראו חוות דעת, המלצות וביקורות של מטופלים על טיפולי פדיקור רפואי, ציפורן חודרנית, טיפולי SWIFT ופטרת אצל דורי רפאל."
                keywords="ביקורות דורי רפאל, המלצות פדיקור רפואי, חוות דעת פדיקוריסט, המלצות טיפול ביבלות"
                canonical="/reviews"
            />
            <header className="reviews__header">
                <h1 className="reviews__title">המלצות המטופלים</h1>
                <p className="reviews__subtitle">
                    הנה מה שהמטופלים שלנו מספרים ומשתפים על חוויית הטיפול בקליניקה.
                </p>
            </header>

            <section className="reviews__video-section" aria-labelledby="video-reviews-title">
                <h2 className="reviews__section-title" id="video-reviews-title" style={{ marginBottom: '0.5rem' }}>המלצות מטופלים בטכנולוגיית גלי-מיקרו SWIFT להסרת יבלות וויראליות</h2>
                <div className="reviews__video-scroll-container" style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
                    {youtubeVideos.map((video) => (
                        <div key={video.id} className="reviews__video-card" style={{ width: '100%', maxWidth: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                            <iframe 
                                width="100%" 
                                height="225" 
                                src={video.url} 
                                title="YouTube video player" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                                allowFullScreen
                                style={{ display: 'block' }}
                            ></iframe>
                        </div>
                    ))}
                </div>
            </section>

            <section className="reviews__text-section" aria-labelledby="text-reviews-title">
                <div className="reviews__text-section-header">
                    <h2 className="reviews__section-title" id="text-reviews-title">ביקורות נבחרות</h2>
                    {/* <div className="reviews__google-badge">
                        <span className="reviews__google-rating">5.0</span>
                        <div className="reviews__google-stars">
                            {'★★★★★'.split('').map((star, index) => (
                                <span key={index} className="reviews__star active">{star}</span>
                            ))}
                        </div>
                        <span className="reviews__google-text">Google Reviews</span>
                    </div> */}
                </div>
                <div className="reviews__grid">
                    {reviews.map((review) => (
                        <article key={review.id} className="review-card">
                            <div className="review-card__header">
                                <div className="review-card__avatar">
                                    {review.name.charAt(0).toUpperCase()}
                                </div>
                                <div className="review-card__meta">
                                    <h3 className="review-card__name">{review.name}</h3>
                                    <div className="review-card__stars" aria-label="5 stars">
                                        {Array.from({ length: 5 }).map((_, index) => (
                                            <span key={index} className="reviews__star active" aria-hidden="true">★</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="review-card__google-icon">
                                    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true">
                                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                    </svg>
                                </div>
                            </div>
                            <div className="review-card__body">
                                <p className="review-card__text">"{review.text}"</p>
                            </div>
                            <div className="review-card__footer">
                                <span className="review-card__time">{review.time}</span>
                            </div>
                        </article>
                    ))}
                </div>

                <div className="reviews__cta-container">
                    <a
                        href="https://search.google.com/local/reviews?placeid=ChIJh6noewxLHRURMzGLb8jrVAA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="reviews__cta-btn"
                    >
                        לקריאת כל הביקורות ב-Google
                    </a>
                </div>
            </section>
        </div>
    );
}

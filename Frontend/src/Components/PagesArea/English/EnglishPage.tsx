import './EnglishPage.css';
import DoriProfile from '../../../assets/DoriProfile.webp';
import { SEO } from '../../SharedArea/SEO/SEO';

export function EnglishPage() {
    return (
        <div className="english-page" dir="ltr">
            <SEO
                title="Dori Refael | Clinical & Medical Pedicure Specialist Tel Aviv"
                description="Dori Refael - Medical & Clinical Pedicure Specialist in Tel Aviv with over 20 years of experience in ingrown toenail, fungus, warts, and diabetic foot care."
                keywords="Medical Pedicure Tel Aviv, Podiatry Tel Aviv, Dori Refael, Ingrown Toenail Treatment, Fungal Nail Care"
                canonical="/en"
            />
            <header className="english__header">
                <div className="english__header-content">
                    <h1 className="english__title--name">Dori Refael</h1>
                    <h1 className="english__title">Advanced Foot Care</h1>
                    <p className="english__subtitle">Medical Expertise • Over 20 Years of Experience</p>
                </div>
            </header>

            <main className="english__main">
                <section className="english__intro">
                    <div className="english__intro-text">
                        <p>
                            Professional treatment for healthy, functional and well-maintained feet — provided in a private medical clinic in Tel Aviv by Dori Refael, an experienced podiatry practitioner specializing in foot care for men.
                        </p>
                        <p>
                            <strong>Dori Refael</strong> is a graduate of the Nursing Academy at Sheba Medical Center and a former lecturer at the Tel Aviv Medical Cosmetics Academy. He has completed advanced professional training in podiatry and clinical foot care in Israel and abroad, including postgraduate studies associated with University of Brighton.
                        </p>
                        <p>
                            Over the years, he has worked with athletes, diabetic patients, elderly patients and individuals requiring ongoing professional foot care in a discreet, sterile and medically supervised environment.
                        </p>
                    </div>
                    <div className="english__intro-image">
                        <img src={DoriProfile} alt="Dori Refael" />
                    </div>
                </section>

                <div className="english__content-grid">
                    <section className="english__card">
                        <h2 className="english__card-title">The clinic provides professional care for:</h2>
                        <ul className="english__list">
                            <li>Athletes and physically active individuals</li>
                            <li>Soldiers and security personnel</li>
                            <li>Diabetic patients</li>
                            <li>Older adults</li>
                            <li>Men suffering from chronic or complex foot conditions</li>
                        </ul>
                    </section>

                    <section className="english__card">
                        <h2 className="english__card-title">Treatments Include:</h2>
                        <ul className="english__list">
                            <li>Professional nail and skin care</li>
                            <li>Callus and pressure relief</li>
                            <li>Ingrown toenail treatment</li>
                            <li>Athlete’s foot and skin fungal infections</li>
                            <li>Thickened toenails and nail disorders</li>
                            <li>Diabetic foot preventive care</li>
                            <li>Foot hygiene and odor management</li>
                            <li>Periodic maintenance treatments</li>
                        </ul>
                    </section>
                </div>

                <section className="english__note">
                    <h3 style={{ color: 'var(--color-navy)', marginBottom: '1rem' }}>Important Information</h3>
                    <p><strong>This is not a cosmetic beauty salon.</strong> The clinic was established specifically to provide men with professional, discreet and medically oriented foot care — in an environment designed for patients who value expertise, hygiene, privacy and long-term results.</p>
                    <p style={{ marginTop: '1rem', color: 'var(--color-text-light)' }}>The treatments are provided exclusively at the private clinic in Tel Aviv. No home visits.</p>
                </section>

                <div className="english__cta">
                    <a href="https://api.whatsapp.com/send/?phone=972508266042&type=phone_number&app_absent=0" target="_blank" className="english__cta-btn">
                        Contact via WhatsApp: 050-826-6042
                    </a>
                </div>
            </main>
        </div>
    );
}

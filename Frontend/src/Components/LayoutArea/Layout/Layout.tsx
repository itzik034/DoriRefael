import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Routing } from '../Routing/Routing';
import { WhatsAppButton } from '../WhatsAppButton/WhatsAppButton';
import { ScrollToTop } from '../ScrollToTop/ScrollToTop';
import { AccessibilityWidget } from '../AccessibilityWidget/AccessibilityWidget';
import './Layout.css';

export function Layout() {
    return (
        <div className="layout">
            <ScrollToTop />
            <Header />
            <main className="layout__main">
                <Routing />
            </main>
            <Footer />
            <WhatsAppButton />
            <AccessibilityWidget />
        </div>
    );
}

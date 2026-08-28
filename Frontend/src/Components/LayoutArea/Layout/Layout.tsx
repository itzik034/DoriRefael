import { Header } from '../Header/Header';
import { Footer } from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
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
                <Outlet />
            </main>
            <Footer />
            <WhatsAppButton />
            <AccessibilityWidget />
        </div>
    );
}


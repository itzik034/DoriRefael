import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/foot_w.png';
import { appConfig } from '../../../Utils/AppConfig';
import { Menu } from '../Menu/Menu';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const isEnglishPage = location.pathname === appConfig.baseUrl + "/en" || location.pathname === appConfig.baseUrl + "/english-2";

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__brand">
                    <NavLink to={appConfig.baseUrl + "/"} end className="header__brand-link" onClick={closeMenu}>
                        <img src={logo} alt="Dori Refael Logo" className="header__brand-logo" />
                        {!isEnglishPage && <span className="header__brand-name">Dori Refael</span>}
                    </NavLink>
                </div>

                <button 
                    className={`header__hamburger ${isMenuOpen ? 'active' : ''}`}
                    onClick={toggleMenu}
                    aria-label="Toggle navigation menu"
                    aria-expanded={isMenuOpen}
                >
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                    <span className="hamburger-line"></span>
                </button>

                <Menu isOpen={isMenuOpen} onClose={closeMenu} />
            </div>
        </header>
    );
}

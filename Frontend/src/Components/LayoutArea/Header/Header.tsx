import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import './Header.css';
import logo from '../../../assets/foot_w.png';
import { appConfig } from '../../../Utils/AppConfig';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
    const location = useLocation();

    const isEnglishPage = location.pathname === appConfig.baseUrl + "/en" || location.pathname === appConfig.baseUrl + "/english-2";

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        if (isMenuOpen) {
            setIsDropdownOpen(false); // Close dropdown if menu is closing
            setIsArticlesDropdownOpen(false);
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
        setIsDropdownOpen(false);
        setIsArticlesDropdownOpen(false);
    };

    const toggleDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDropdownOpen(!isDropdownOpen);
        setIsArticlesDropdownOpen(false);
    };

    const toggleArticlesDropdown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsArticlesDropdownOpen(!isArticlesDropdownOpen);
        setIsDropdownOpen(false);
    };

    return (
        <header className="header">
            <div className="header__container">
                <div className="header__brand" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <NavLink to={appConfig.baseUrl + "/"} end className="header__brand-link" onClick={closeMenu} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none' }}>
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

                <nav className={`header__nav ${isMenuOpen ? 'open' : ''}`} aria-label="Main navigation">
                    <ul className="header__nav-list">
                        <li className="header__nav-item">
                            <NavLink to={appConfig.baseUrl + "/"} end className="header__nav-link" onClick={closeMenu}>דף הבית</NavLink>
                        </li>
                        <li className="header__nav-item">
                            <NavLink to={appConfig.baseUrl + "/about"} className="header__nav-link" onClick={closeMenu}>אודות</NavLink>
                        </li>
                        
                        <li className={`header__nav-item header__dropdown ${isDropdownOpen ? 'open' : ''}`}>
                            <button className="header__nav-link header__dropdown-toggle" onClick={toggleDropdown} aria-expanded={isDropdownOpen} aria-haspopup="true">
                                טיפולים <span className="dropdown-arrow">▼</span>
                            </button>
                            <ul className="header__dropdown-menu">
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/warts"} className="header__dropdown-link" onClick={closeMenu}>אבחון וטיפול ביבלות</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/diabetes"} className="header__dropdown-link" onClick={closeMenu}>פדיקור רפואי לחולי סוכרת</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/clinical"} className="header__dropdown-link" onClick={closeMenu}>פדיקור רפואי קליני</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/ingrown"} className="header__dropdown-link" onClick={closeMenu}>טיפול בציפורן חודרנית</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/sports"} className="header__dropdown-link" onClick={closeMenu}>טיפולים לחיילים וספורטאים</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/elderly"} className="header__dropdown-link" onClick={closeMenu}>פדיקור לגיל הזהב</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/treatments/fungus"} className="header__dropdown-link" onClick={closeMenu}>פטרת עור וציפורניים</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="header__nav-item">
                            <NavLink to={appConfig.baseUrl + "/reviews"} className="header__nav-link" onClick={closeMenu}>המלצות</NavLink>
                        </li>

                        <li className={`header__nav-item header__dropdown ${isArticlesDropdownOpen ? 'open' : ''}`}>
                            <button className="header__nav-link header__dropdown-toggle" onClick={toggleArticlesDropdown} aria-expanded={isArticlesDropdownOpen} aria-haspopup="true">
                                מאמרים <span className="dropdown-arrow">▼</span>
                            </button>
                            <ul className="header__dropdown-menu">
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/articles/viral-vs-mechanical"} className="header__dropdown-link" onClick={closeMenu}>יבלת מכאנית או ויראלית?</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/articles/dry-skin-and-cracks"} className="header__dropdown-link" onClick={closeMenu}>עור יבש וסדקים</NavLink>
                                </li>
                                <li className="header__dropdown-item">
                                    <NavLink to={appConfig.baseUrl + "/articles/athletes-load-rehabilitation"} className="header__dropdown-link" onClick={closeMenu}>שיקום עומסים לספורטאים</NavLink>
                                </li>
                            </ul>
                        </li>

                        <li className="header__nav-item">
                            <NavLink to={appConfig.baseUrl + "/contact"} className="header__nav-link" onClick={closeMenu}>צור קשר</NavLink>
                        </li>
                        <li className="header__nav-item" style={{ display: 'flex', alignItems: 'center' }}>
                            <NavLink to={appConfig.baseUrl + "/en"} className="header__nav-link" onClick={closeMenu} title="English Version" style={{ fontSize: '1.2rem' }}>
                                English
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}

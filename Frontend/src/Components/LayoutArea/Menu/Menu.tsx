import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './Menu.css';
import { appConfig } from '../../../Utils/AppConfig';
import { articlesService } from '../../../Services/ArticlesService';

interface MenuProps {
    isOpen: boolean;
    onClose: () => void;
}

export function Menu({ isOpen, onClose }: MenuProps) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isArticlesDropdownOpen, setIsArticlesDropdownOpen] = useState(false);
    const dynamicArticles = articlesService.getAllArticles();

    // Lock background scroll when mobile menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('menu-open');
        } else {
            document.body.classList.remove('menu-open');
        }

        return () => {
            document.body.classList.remove('menu-open');
        };
    }, [isOpen]);

    const handleLinkClick = () => {
        setIsDropdownOpen(false);
        setIsArticlesDropdownOpen(false);
        onClose();
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
        <nav className={`menu ${isOpen ? 'open' : ''}`} aria-label="Main navigation">
            <ul className="menu__list">
                <li className="menu__item">
                    <NavLink to={appConfig.baseUrl + "/"} end className="menu__link" onClick={handleLinkClick}>דף הבית</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to={appConfig.baseUrl + "/about"} className="menu__link" onClick={handleLinkClick}>אודות</NavLink>
                </li>
                
                <li className={`menu__item menu__dropdown ${isDropdownOpen ? 'open' : ''}`}>
                    <button className="menu__link menu__dropdown-toggle" onClick={toggleDropdown} aria-expanded={isDropdownOpen} aria-haspopup="true">
                        טיפולים <span className="dropdown-arrow">▼</span>
                    </button>
                    <ul className="menu__dropdown-menu">
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/warts"} className="menu__dropdown-link" onClick={handleLinkClick}>אבחון וטיפול ביבלות</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/diabetes"} className="menu__dropdown-link" onClick={handleLinkClick}>פדיקור רפואי לחולי סוכרת</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/clinical"} className="menu__dropdown-link" onClick={handleLinkClick}>פדיקור רפואי קליני</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/ingrown"} className="menu__dropdown-link" onClick={handleLinkClick}>טיפול בציפורן חודרנית</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/sports"} className="menu__dropdown-link" onClick={handleLinkClick}>טיפולים לחיילים וספורטאים</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/elderly"} className="menu__dropdown-link" onClick={handleLinkClick}>פדיקור לגיל הזהב</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/treatments/fungus"} className="menu__dropdown-link" onClick={handleLinkClick}>פטרת עור וציפורניים</NavLink>
                        </li>
                    </ul>
                </li>

                <li className="menu__item">
                    <NavLink to={appConfig.baseUrl + "/reviews"} className="menu__link" onClick={handleLinkClick}>המלצות</NavLink>
                </li>

                <li className={`menu__item menu__dropdown ${isArticlesDropdownOpen ? 'open' : ''}`}>
                    <button className="menu__link menu__dropdown-toggle" onClick={toggleArticlesDropdown} aria-expanded={isArticlesDropdownOpen} aria-haspopup="true">
                        מאמרים <span className="dropdown-arrow">▼</span>
                    </button>
                    <ul className="menu__dropdown-menu">
                        {/* Static articles */}
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/articles/viral-vs-mechanical"} className="menu__dropdown-link" onClick={handleLinkClick}>יבלת מכאנית או ויראלית?</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/articles/dry-skin-and-cracks"} className="menu__dropdown-link" onClick={handleLinkClick}>עור יבש וסדקים</NavLink>
                        </li>
                        <li className="menu__dropdown-item">
                            <NavLink to={appConfig.baseUrl + "/articles/athletes-load-rehabilitation"} className="menu__dropdown-link" onClick={handleLinkClick}>שיקום עומסים לספורטאים</NavLink>
                        </li>

                        {/* Dynamic JSON articles */}
                        {dynamicArticles.map(article => (
                            <li key={article.slug} className="menu__dropdown-item">
                                <NavLink to={`${appConfig.baseUrl}/articles/${article.slug}`} className="menu__dropdown-link" onClick={handleLinkClick}>
                                    {article.title}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </li>

                <li className="menu__item">
                    <NavLink to={appConfig.baseUrl + "/contact"} className="menu__link" onClick={handleLinkClick}>צור קשר</NavLink>
                </li>
                <li className="menu__item">
                    <NavLink to={appConfig.baseUrl + "/en"} className="menu__link menu__link--english" onClick={handleLinkClick} title="English Version">
                        English
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

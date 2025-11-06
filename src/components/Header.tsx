

import React, { useState, useEffect, useRef } from 'react';
import { PageKey } from '../types';
import { MenuIcon } from './icons/MenuIcon';
import { CloseIcon } from './icons/CloseIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { useTranslation } from '../i18n/context';
import LanguageSwitcher from './LanguageSwitcher';

interface HeaderProps {
    currentPage: PageKey;
    onNavigate: (page: PageKey) => void;
}

type NavItem = {
  page: PageKey;
  label: string;
  dropdown?: {
    label: string;
    page: PageKey;
  }[];
};

const navLinks: NavItem[] = [
  { page: 'hjem', label: 'nav.hjem' },
  {
    page: 'tjenester',
    label: 'nav.tjenester',
    dropdown: [
      { label: 'navServicesDropdown.storage', page: 'lagringOgHenting' },
      { label: 'navServicesDropdown.process', page: 'gjenvinningsprosessen' },
      { label: 'navServicesDropdown.product', page: 'ferdigProdukt' },
    ],
  },
  { page: 'omOss', label: 'nav.omOss' },
  { page: 'kontakt', label: 'nav.kontakt' },
];


const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isServicesOpen, setIsServicesOpen] = useState(false);
    const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false);
    const { t } = useTranslation();
    const servicesTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLinkClick = (page: PageKey) => {
        onNavigate(page);
        setIsMenuOpen(false);
        setIsMobileServicesOpen(false);
    };

    const handleDropdownClick = (page: PageKey) => {
      onNavigate(page);
      setIsServicesOpen(false);
      setIsMenuOpen(false);
      setIsMobileServicesOpen(false);
    };

    const handleMouseEnter = () => {
        if (servicesTimeoutRef.current) {
            clearTimeout(servicesTimeoutRef.current);
        }
        setIsServicesOpen(true);
    };

    const handleMouseLeave = () => {
        servicesTimeoutRef.current = setTimeout(() => {
            setIsServicesOpen(false);
        }, 200);
    };

    return (
        <header className={`sticky top-0 z-40 transition-shadow duration-300 ${isScrolled ? 'shadow-md bg-white/80 backdrop-blur-lg' : 'bg-transparent'}`}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-20">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleLinkClick('hjem')}
                            className="flex items-center"
                            aria-label={t('header.logoLabel')}
                        >
                            <img
                                src="/assets/value-icons/logo.png"
                                alt={t('header.logoLabel')}
                                className="h-14 w-auto"
                            />
                        </button>
                    </div>
                    <div className="hidden md:flex items-center space-x-4">
                        <nav className="flex items-center space-x-1">
                            {navLinks.map((link) => {
                                const isActive = currentPage === link.page || (link.dropdown?.some(item => item.page === currentPage) ?? false);
                                return link.dropdown ? (
                                <div key={link.page} className="relative" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                                    <button
                                        onClick={() => handleLinkClick(link.page)}
                                        className={`flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent font-semibold' : 'text-text-main hover:text-primary-dark hover:bg-primary-light'}`}
                                        aria-current={isActive ? 'page' : undefined}
                                        aria-haspopup="true"
                                        aria-expanded={isServicesOpen}
                                    >
                                        {t(link.label)}
                                        <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isServicesOpen ? 'transform rotate-180' : ''}`} />
                                    </button>
                                    {isServicesOpen && (
                                        <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200/50">
                                            {link.dropdown.map(item => (
                                                <button key={item.page} onClick={() => handleDropdownClick(item.page)} className="block w-full text-left px-4 py-2 text-sm text-text-main hover:bg-primary-light hover:text-primary-dark">{t(item.label)}</button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button key={link.page} onClick={() => handleLinkClick(link.page)} className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive ? 'text-accent font-semibold' : 'text-text-main hover:text-primary-dark hover:bg-primary-light'}`} aria-current={isActive ? 'page' : undefined}>
                                    {t(link.label)}
                                </button>
                            );
                            })}
                        </nav>
                        {/* Language switcher tucked into mobile menu only */}
                        <button
                            onClick={() => handleLinkClick('kontakt')}
                            className="bg-accent text-white font-bold py-2 px-5 rounded-full text-sm hover:bg-green-600 transition-colors duration-300 btn-lift"
                        >
                            {t('header.cta')}
                        </button>
                    </div>
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label={isMenuOpen ? t('header.closeMenu') : t('header.openMenu')} aria-expanded={isMenuOpen}>
                           {isMenuOpen ? <CloseIcon className="h-7 w-7 text-text-main" /> : <MenuIcon className="h-7 w-7 text-text-main" />}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden bg-white shadow-lg">
                    <nav className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => {
                            const isActive = currentPage === link.page || (link.dropdown?.some(item => item.page === currentPage) ?? false);
                           return (
                           <div key={link.page}>
                               <button
                                   onClick={() => link.dropdown ? setIsMobileServicesOpen(!isMobileServicesOpen) : handleLinkClick(link.page)}
                                   className={`flex items-center justify-center w-full px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive ? 'text-accent font-semibold' : 'text-text-main hover:text-primary-dark hover:bg-primary-light'}`}
                               >
                                   {t(link.label)}
                                   {link.dropdown && <ChevronDownIcon className={`ml-1 h-4 w-4 transition-transform duration-200 ${isMobileServicesOpen ? 'transform rotate-180' : ''}`} />}
                               </button>
                               {link.dropdown && isMobileServicesOpen && (
                                   <div className="pl-4 mt-1 space-y-1">
                                       {link.dropdown.map(item => (
                                           <button key={item.page} onClick={() => handleDropdownClick(item.page)} className="block w-full text-center px-4 py-2 text-sm rounded-md text-gray-600 hover:bg-primary-light hover:text-primary-dark">{t(item.label)}</button>
                                       ))}
                                   </div>
                               )}
                           </div>
                        );
                        })}
                    </nav>
                    <div className="px-4 pb-4">
                        <div className="flex justify-center">
                            <LanguageSwitcher variant="mobile" />
                        </div>
                    </div>
                    <div className="px-4 py-3 border-t border-gray-200">
                        <button
                            onClick={() => handleLinkClick('kontakt')}
                            className="w-full bg-accent text-white font-bold py-3 px-6 rounded-full hover:bg-green-600 transition-colors duration-300 text-base"
                        >
                            {t('header.cta')}
                        </button>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;

import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { useTranslation, Language } from '../i18n/context';

interface LanguageSwitcherProps {
    variant?: 'default' | 'mobile';
}

const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({ variant = 'default' }) => {
    const { language, setLanguage } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const handleLanguageChange = (lang: Language) => {
        setLanguage(lang);
        setIsOpen(false);
    };
    
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Adjust button styles for better contrast on dark/light backgrounds
    const buttonClasses =
        variant === 'mobile'
            ? 'flex items-center space-x-1 px-3 py-2 bg-transparent text-primary-dark rounded-md transition-colors duration-200'
            : 'flex items-center space-x-1 px-3 py-2 bg-transparent rounded-md transition-colors duration-200 text-white hover:text-white/80';

    return (
        <div className={variant === 'mobile' ? 'relative w-full flex justify-center' : 'relative'} ref={dropdownRef}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={buttonClasses}
                aria-haspopup="true"
                aria-expanded={isOpen}
                aria-label="Change language"
            >
                <span className="font-semibold text-sm">{language.toUpperCase()}</span>
                <ChevronDownIcon className="h-4 w-4 text-gray-400" />
            </button>

            {isOpen && (
                <div className={`absolute ${variant === 'mobile' ? 'left-1/2 -translate-x-1/2' : 'right-0'} mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200/50`}>
                    <button onClick={() => handleLanguageChange('no')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'no' ? 'font-bold text-accent' : 'text-text-main'} hover:text-accent`}>Norsk (NO)</button>
                    <button onClick={() => handleLanguageChange('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'font-bold text-accent' : 'text-text-main'} hover:text-accent`}>English (EN)</button>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;

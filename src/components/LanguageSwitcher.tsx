import React, { useState, useEffect, useRef } from 'react';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { useTranslation, Language } from '../i18n/context';

const LanguageSwitcher: React.FC = () => {
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
        'flex items-center space-x-1 px-3 py-2 bg-transparent rounded-md transition-colors duration-200 text-primary-light hover:text-white md:text-text-main md:hover:text-primary-dark';

    return (
        <div className="relative" ref={dropdownRef}>
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
                <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200/50">
                    <button onClick={() => handleLanguageChange('no')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'no' ? 'font-bold text-accent' : 'text-text-main'} hover:bg-primary-light`}>Norsk (NO)</button>
                    <button onClick={() => handleLanguageChange('en')} className={`block w-full text-left px-4 py-2 text-sm ${language === 'en' ? 'font-bold text-accent' : 'text-text-main'} hover:bg-primary-light`}>English (EN)</button>
                </div>
            )}
        </div>
    );
};

export default LanguageSwitcher;

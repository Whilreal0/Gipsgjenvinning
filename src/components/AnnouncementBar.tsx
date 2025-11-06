import React from 'react';
import LanguageSwitcher from './LanguageSwitcher';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';
import { useTranslation } from '../i18n/context';

interface AnnouncementBarProps {
    isVisible: boolean;
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ isVisible }) => {
    const { t } = useTranslation();
    
    return (
        <div className={`
            bg-primary-dark text-white 
            transition-transform duration-300 ease-in-out z-50
            hidden md:flex
            ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        `}>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-10 flex items-center justify-between text-sm">
                <div className="flex items-center divide-x divide-white/20 min-w-0">
                    <div className="pr-4">
                        <a href={`tel:+47${t('footer.phone').replace(/\s/g, '')}`} className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                            <PhoneIcon className="h-4 w-4" />
                            <span>{t('footer.phone')}</span>
                        </a>
                    </div>
                    <div className="pl-4">
                        <a href={`mailto:${t('footer.email')}`} className="flex items-center space-x-2 text-white hover:text-white/80 transition-colors">
                            <MailIcon className="h-4 w-4" />
                            <span>{t('footer.email')}</span>
                        </a>
                    </div>
                </div>
                <div className="flex items-center divide-x divide-white/20">
                    <div className="pr-4 flex items-center">
                        <span className="text-xs text-white">{t('footer.orgNr')}</span>
                    </div>
                    <div className="pl-2">
                        <LanguageSwitcher />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnnouncementBar;

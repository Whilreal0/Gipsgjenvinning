import React from 'react';
import { PageKey } from '../types';
import { PhoneIcon } from './icons/PhoneIcon';
import { MailIcon } from './icons/MailIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { useTranslation } from '../i18n/context';
import { LinkedInIcon } from './icons/LinkedInIcon';
import { FacebookIcon } from './icons/FacebookIcon';

interface FooterProps {
    onNavigate: (page: PageKey) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
    const { t } = useTranslation();
    const navLinks: PageKey[] = ['hjem', 'tjenester', 'omOss', 'kontakt'];
    const legalLinks: PageKey[] = ['personvern'];

    return (
        <footer className="bg-primary-dark text-white footer-bg-pattern">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Column 1: Logo & Info */}
                    <div className="md:col-span-1">
                        <img
                            src="/assets/value-icons/logo.png"
                            alt={t('header.logoLabel')}
                            className="mb-4 h-14 w-auto brightness-125 contrast-110 drop-shadow-[0_0_10px_rgba(0,0,0,0.25)]"
                        />
                        <p className="text-primary-light text-sm">{t('footer.tagline')}</p>
                        <p className="text-primary-light text-sm mt-3">{t('footer.orgNr')}</p>
                    </div>
                    
                    {/* Column 2: Navigation */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold mb-3">{t('footer.menu')}</h3>
                        <ul className="space-y-1.5">
                            {navLinks.map(page => (
                                <li key={page}>
                                    <button onClick={() => onNavigate(page)} className="text-primary-light hover:text-white transition-colors">{t(`nav.${page}`)}</button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3: Contact */}
                    <div>
                        <h3 className="font-heading text-lg font-semibold mb-3">{t('footer.contact')}</h3>
                        <ul className="space-y-2 text-primary-light">
                            <li className="flex items-start">
                                <MapPinIcon className="h-5 w-5 mr-3 mt-1 flex-shrink-0" />
                                <span>{t('footer.address')}</span>
                            </li>
                            <li className="flex items-center">
                                <PhoneIcon className="h-5 w-5 mr-3" />
                                <a href={`tel:+47${t('footer.phone').replace(/\s/g, '')}`} className="hover:text-white transition-colors">{t('footer.phone')}</a>
                            </li>
                            <li className="flex items-center">
                                <MailIcon className="h-5 w-5 mr-3" />
                                <a href={`mailto:${t('footer.email')}`} className="hover:text-white transition-colors">{t('footer.email')}</a>
                            </li>
                        </ul>
                    </div>
                    
                    {/* Column 4: Legal & Social */}
                     <div>
                        <h3 className="font-heading text-lg font-semibold mb-3">{t('footer.legal')}</h3>
                        <ul className="space-y-1.5">
                             {legalLinks.map(page => (
                                <li key={page}>
                                    <button onClick={() => onNavigate(page)} className="text-primary-light hover:text-white transition-colors">{t(`nav.${page}`)}</button>
                                </li>
                            ))}
                        </ul>

                        <div className="mt-5">
                            <h3 className="font-heading text-lg font-semibold mb-3">{t('footer.social.title')}</h3>
                            <div className="flex space-x-4">
                                <a href={t('footer.social.linkedinUrl')} target="_blank" rel="noopener noreferrer" aria-label={t('footer.social.linkedinAria')} className="text-primary-light hover:text-white transition-colors">
                                    <LinkedInIcon className="h-6 w-6" />
                                </a>
                                <a href={t('footer.social.facebookUrl')} target="_blank" rel="noopener noreferrer" aria-label={t('footer.social.facebookAria')} className="text-primary-light hover:text-white transition-colors">
                                    <FacebookIcon className="h-6 w-6" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 pt-6 border-t border-gray-700 text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Gipsgjenvinning AS. {t('footer.copyright')}</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

import React from 'react';
import { useTranslation } from '../i18n/context';

const PrivacyPage: React.FC = () => {
    const { t, language } = useTranslation();
    const lastUpdatedDate = new Date().toLocaleDateString(language === 'no' ? 'no-NO' : 'en-US');
    const purposeListRaw = t('privacyPage.section7.purposeList') as unknown;
    const purposeList = Array.isArray(purposeListRaw) ? purposeListRaw : [];

    return (
        <>
            <section className="bg-primary-lightwhite py-16 sm:py-24">
                <div className="container mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
                    <header className="mb-12 text-left">
                        <h1 className="text-4xl font-extrabold font-heading text-primary-dark">{t('privacyPage.section7.title')}</h1>
                        <p className="mt-4 text-lg text-text-main">
                            {t('privacyPage.section7.intro')}
                        </p>
                    </header>

                    <article className="space-y-10 text-text-main">
                        <section>
                            <h2 className="text-2xl font-semibold text-primary-dark">{t('privacyPage.section7.usageTitle')}</h2>
                            <p className="mt-3 text-lg leading-relaxed">{t('privacyPage.section7.usageP1')}</p>
                            <p className="mt-3 text-lg leading-relaxed">{t('privacyPage.section7.usageP2')}</p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary-dark">{t('privacyPage.section7.purposeTitle')}</h2>
                            <ul className="mt-4 space-y-2 text-lg leading-relaxed">
                                {purposeList.map((item, index) => (
                                    <li key={index} className="pl-5 before:mr-3 before:inline-block before:h-2 before:w-2 before:-translate-y-1 before:rounded-full before:bg-primary-dark">
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-semibold text-primary-dark">{t('privacyPage.section7.disableTitle')}</h2>
                            <p className="mt-3 text-lg leading-relaxed">{t('privacyPage.section7.disableP1')}</p>
                            <p className="mt-3 text-lg leading-relaxed">
                                {t('privacyPage.section7.disableP2')}{' '}
                                <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline decoration-transparent transition hover:decoration-accent">
                                    {t('privacyPage.section7.disableGaText')}
                                </a>
                                .
                            </p>
                            <p className="mt-3 text-lg leading-relaxed">
                                {t('privacyPage.section7.disableMoreInfoIntro')}{' '}
                                <a href="https://www.allaboutcookies.org/" target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline decoration-transparent transition hover:decoration-accent">
                                    {t('privacyPage.section7.disableMoreInfoText')}
                                </a>
                                .
                            </p>
                        </section>
                    </article>

                    <footer className="mt-14 flex justify-start">
                        <a
                            href="/"
                            className="inline-flex items-center rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark/90"
                        >
                            {t('privacyPage.backToHome')}
                        </a>
                    </footer>

                    <p className="mt-10 text-sm text-text-main/60">
                        {t('privacyPage.lastUpdated')}: {lastUpdatedDate}
                    </p>
                </div>
            </section>
        </>
    );
};

export default PrivacyPage;

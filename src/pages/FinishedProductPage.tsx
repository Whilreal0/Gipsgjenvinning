import React from 'react';
import { useTranslation } from '../i18n/context';
import ServiceDetail from '../components/ServiceDetail';

const FinishedProductPage: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <div className="bg-primary-light text-primary-dark py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading">{t('finishedProductPage.title')}</h1>
                    <p className="mt-4 text-xl text-text-main max-w-3xl mx-auto">{t('finishedProductPage.subtitle')}</p>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ServiceDetail
                        title={t('finishedProductPage.title')}
                        description={t('finishedProductPage.subtitle')}
                        imgWebp="/assets/value-icons/sale-of-recycled-gypsum.webp"
                        imgSrc="/assets/value-icons/Sale of Recycled Gypsum.webp"
                        alt={t('finishedProductPage.alt')}
                        points={t('finishedProductPage.points')}
                    />
                </div>
            </div>
        </>
    );
};

export default FinishedProductPage;

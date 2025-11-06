import React from 'react';
import { useTranslation } from '../i18n/context';
import ServiceDetail from '../components/ServiceDetail';

const StorageAndCollectionPage: React.FC = () => {
    const { t } = useTranslation();
    
    return (
        <>
            <div className="bg-primary-light text-primary-dark py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading">{t('storageAndCollectionPage.title')}</h1>
                    <p className="mt-4 text-xl text-text-main max-w-3xl mx-auto">{t('storageAndCollectionPage.subtitle')}</p>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <ServiceDetail
                        title={t('storageAndCollectionPage.title')}
                        description={t('storageAndCollectionPage.subtitle')}
                        imgWebp="/assets/value-icons/gypsum-collection.webp"
                        imgSrc="/assets/value-icons/Gypsum Collection.webp"
                        alt={t('storageAndCollectionPage.alt')}
                        points={t('storageAndCollectionPage.points')}
                    />
                </div>
            </div>
        </>
    );
};

export default StorageAndCollectionPage;

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '../i18n/context';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { pageRoutes } from '../routes';

const ServiceSummaryCard: React.FC<{
    title: string;
    description: string;
    imgSrc: string;
    alt: string;
    onClick: () => void;
    reverse?: boolean;
}> = ({ title, description, imgSrc, alt, onClick, reverse = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 bg-white p-8 rounded-lg shadow-md ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-2/5">
            <img src={imgSrc} alt={alt} className="rounded-lg shadow-lg w-full h-auto object-cover" loading="lazy" />
        </div>
        <div className="md:w-3/5">
            <h2 className="text-3xl font-bold font-heading text-primary-dark mb-4">{title}</h2>
            <p className="text-lg text-text-main mb-6">{description}</p>
            <button onClick={onClick} className="inline-flex items-center text-accent font-bold hover:underline">
                {useTranslation().t('servicesPage.cta')} <ChevronRightIcon className="ml-1 h-5 w-5" />
            </button>
        </div>
    </div>
);

const ServicesPage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    return (
        <>
            <div className="bg-primary-dark text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading">{t('pageTitles.tjenester')}</h1>
                    <p className="mt-4 text-xl text-primary-light max-w-3xl mx-auto">{t('servicesPage.subtitle')}</p>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                    <ServiceSummaryCard
                        title={t('navServicesDropdown.storage')}
                        description={t('storageAndCollectionPage.subtitle')}
                        imgWebp="/assets/value-icons/gypsum-collection.webp"
                        imgSrc="/assets/value-icons/Gypsum Collection.webp"
                        alt={t('storageAndCollectionPage.alt')}
                        onClick={() => navigate(pageRoutes.lagringOgHenting)}
                    />
                    <ServiceSummaryCard
                        title={t('navServicesDropdown.process')}
                        description={t('recyclingProcessPage.subtitle')}
                        imgWebp="/assets/value-icons/recycling-and-processing.webp"
                        imgSrc="/assets/value-icons/Recycling and Processing.webp"
                        alt={t('recyclingProcessPage.alt')}
                        onClick={() => navigate(pageRoutes.gjenvinningsprosessen)}
                        reverse={true}
                    />
                     <ServiceSummaryCard
                        title={t('navServicesDropdown.product')}
                        description={t('finishedProductPage.subtitle')}
                        imgWebp="/assets/value-icons/sale-of-recycled-gypsum.webp"
                        imgSrc="/assets/value-icons/Sale of Recycled Gypsum.webp"
                        alt={t('finishedProductPage.alt')}
                        onClick={() => navigate(pageRoutes.ferdigProdukt)}
                    />
                </div>
            </div>
        </>
    );
};

export default ServicesPage;

import React from 'react';
import { useTranslation } from '../i18n/context';
import { CheckCircleIcon } from '../components/icons/CheckCircleIcon';
import { CheckIcon } from '../components/icons/CheckIcon';
import { XIcon } from '../components/icons/XIcon';

const RecyclingProcessPage: React.FC = () => {
    const { t } = useTranslation();

    return (
        <>
            <section className="bg-primary-light py-16 md:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-3xl text-center">
                        <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-primary-dark">
                            {t('recyclingProcessPage.title')}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-text-main">
                            {t('recyclingProcessPage.subtitle')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="pt-16 sm:pt-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto grid max-w-5xl items-center gap-8 md:grid-cols-2">
                        <div className="space-y-5 text-text-main">
                            <p className="text-lg leading-relaxed text-text-main/85">
                                {t('recyclingProcessPage.summary')}
                            </p>
                            <p className="text-base leading-relaxed text-text-main/85">
                                {t('recyclingProcessPage.details.intro.p1')}
                            </p>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-lg">
                            <picture>
                                <source srcSet="/assets/value-icons/recycling-and-processing.webp" type="image/webp" />
                                <img
                                    src="/assets/value-icons/Recycling and Processing.webp"
                                    alt={t('recyclingProcessPage.imageAlt')}
                                    className="h-[260px] w-full object-cover sm:h-80 lg:h-[340px]"
                                    loading="lazy"
                                />
                            </picture>
                        </div>
                    </div>
                </div>
            </section>

            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl font-bold font-heading text-text-main">
                            {t('recyclingProcessPage.details.intro.title')}
                        </h2>
                        <p className="mt-4 text-lg text-text-main">
                            {t('recyclingProcessPage.details.intro.p1')}
                        </p>
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <h2 className="text-3xl font-bold font-heading text-primary-dark text-center mb-12">
                            {t('recyclingProcessPage.details.why.title')}
                        </h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 text-lg">
                            {t('recyclingProcessPage.details.why.points').map((point: string) => (
                                <li key={point} className="flex items-start">
                                    <CheckCircleIcon className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                                    <span>{point}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-accent">
                            <h3 className="text-2xl font-bold font-heading text-primary-dark">
                                {t('recyclingProcessPage.details.can.title')}
                            </h3>
                            <ul className="mt-6 space-y-4 text-lg">
                                {t('recyclingProcessPage.details.can.points').map((point: string) => (
                                    <li key={point} className="flex items-start">
                                        <CheckIcon className="h-6 w-6 text-accent mr-3 mt-1 shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-red-500">
                            <h3 className="text-2xl font-bold font-heading text-primary-dark">
                                {t('recyclingProcessPage.details.cannot.title')}
                            </h3>
                            <p className="mt-2 text-text-main">
                                {t('recyclingProcessPage.details.cannot.p1')}
                            </p>
                            <ul className="mt-6 space-y-4 text-lg">
                                {t('recyclingProcessPage.details.cannot.points').map((point: string) => (
                                    <li key={point} className="flex items-start">
                                        <XIcon className="h-6 w-6 text-red-500 mr-3 mt-1 shrink-0" />
                                        <span>{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RecyclingProcessPage;

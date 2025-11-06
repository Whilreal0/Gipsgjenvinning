import React from 'react';
import { useTranslation } from '../i18n/context';
const iconMap = [
    '/assets/value-icons/step1.webp',
    '/assets/value-icons/step2.webp',
    '/assets/value-icons/step3.webp',
] as const;

interface ProcessStepProps {
    index: number;
    stepLabel: string;
    title: string;
    description: string;
    isLast?: boolean;
}

const ProcessStep: React.FC<ProcessStepProps> = ({ index, stepLabel, title, description, isLast = false }) => (
    <div className="relative h-full transition-transform duration-500 ease-out hover:-translate-y-2 hover:shadow-lg">
        {!isLast && (
            <span
                className="hidden md:block absolute top-1/2 right-[-2.5rem] h-0.5 w-16 bg-gradient-to-r from-primary-light via-primary-light/70 to-transparent"
                aria-hidden="true"
            />
        )}
        <div className="relative flex h-full flex-col rounded-2xl border border-primary-light/50 bg-white px-6 pb-8 pt-12 shadow-lg transition-transform duration-500 ease-out">
            <div className="absolute -top-9 left-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-light/70 shadow-md">
                <div
                    className="h-11 w-11 bg-primary-dark"
                    style={{
                        WebkitMaskImage: `url(${iconMap[index]})`,
                        maskImage: `url(${iconMap[index]})`,
                        WebkitMaskRepeat: 'no-repeat',
                        maskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskPosition: 'center',
                        WebkitMaskSize: 'contain',
                        maskSize: 'contain',
                    }}
                    aria-hidden="true"
                />
                <span className="sr-only">{title}</span>
            </div>
            <span className="text-xs font-semibold uppercase tracking-[0.35em] text-accent/80">
                {stepLabel || `Step ${String(index + 1).padStart(2, '0')}`}
            </span>
            <h3 className="mt-4 text-2xl font-heading font-bold text-primary-dark">{title}</h3>
            <p className="mt-4 text-base leading-relaxed text-text-main">
                {description}
            </p>
        </div>
    </div>
);

const HowItWorksPage: React.FC = () => {
    const { t } = useTranslation();

    const steps = [
        { step: t('howItWorksPage.step1.step'), title: t('howItWorksPage.step1.title'), description: t('howItWorksPage.step1.description') },
        { step: t('howItWorksPage.step2.step'), title: t('howItWorksPage.step2.title'), description: t('howItWorksPage.step2.description') },
        { step: t('howItWorksPage.step3.step'), title: t('howItWorksPage.step3.title'), description: t('howItWorksPage.step3.description') },
    ] as const;

    return (
        <>
            <div className="bg-white text-primary-dark py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading">{t('howItWorksPage.title')}</h1>
                    <p className="mt-4 text-xl text-text-main max-w-3xl mx-auto">{t('howItWorksPage.subtitle')}</p>
                </div>
            </div>
            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid gap-12 md:grid-cols-3">
                        {steps.map((step, index) => (
                            <ProcessStep
                                key={step.title}
                                index={index}
                                stepLabel={step.step}
                                title={step.title}
                                description={step.description}
                                isLast={index === steps.length - 1}
                            />
                        ))}
                    </div>

                    <div className="mt-16 grid gap-6 rounded-2xl border border-primary-light/40 bg-white/70 p-8 shadow-md md:grid-cols-2">
                        <div>
                            <h2 className="text-2xl font-heading font-semibold text-primary-dark">{t('howItWorksPage.promise.title')}</h2>
                            <p className="mt-3 text-text-main">
                                {t('howItWorksPage.promise.description')}
                            </p>
                        </div>
                        <div className="grid grid-cols-2 gap-6 text-center md:text-left">
                            <div>
                                <p className="text-4xl font-heading font-bold text-primary-dark">24/7</p>
                                <p className="text-sm uppercase tracking-wide text-text-main/70">{t('howItWorksPage.metrics.availability')}</p>
                            </div>
                            <div>
                                <p className="text-4xl font-heading font-bold text-primary-dark">99%</p>
                                <p className="text-sm uppercase tracking-wide text-text-main/70">{t('howItWorksPage.metrics.uptime')}</p>
                            </div>
                            <div>
                                <p className="text-4xl font-heading font-bold text-primary-dark">48h</p>
                                <p className="text-sm uppercase tracking-wide text-text-main/70">{t('howItWorksPage.metrics.pickup')}</p>
                            </div>
                            <div>
                                <p className="text-4xl font-heading font-bold text-primary-dark">100%</p>
                                <p className="text-sm uppercase tracking-wide text-text-main/70">{t('howItWorksPage.metrics.reporting')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HowItWorksPage;

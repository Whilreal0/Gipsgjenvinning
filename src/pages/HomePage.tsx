import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../routes';
import { teamMembers } from '../data/team';
import { ChevronRightIcon } from '../components/icons/ChevronRightIcon';
import { useTranslation } from '../i18n/context';
import { LogoIcon } from '../components/icons/LogoIcon';

const ServiceCard: React.FC<{ imgSrc: string; title: string; description: string; alt: string }> = ({ imgSrc, title, description, alt }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden group relative transform transition duration-300 hover:shadow-xl hover:-translate-y-2">
        <div className="absolute top-0 left-0 h-1.5 bg-accent w-0 group-hover:w-full transition-all duration-500 z-10"></div>
        <div className="overflow-hidden">
            <img src={imgSrc} alt={alt} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 ease-out" loading="lazy" />
        </div>
        <div className="p-6">
            <h3 className="font-heading text-xl font-bold text-primary-dark mb-2">{title}</h3>
            <p className="text-text-main">{description}</p>
        </div>
    </div>
);

const ProcessStep: React.FC<{ number: string; title: string; description: string; isLast?: boolean }> = ({ number, title, description, isLast = false }) => (
    <div className="relative flex items-start">
        <div className="shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl z-10">
            {number}
        </div>
        {!isLast && <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-primary-light"></div>}
        <div className="ml-6">
            <h3 className="font-heading text-xl font-bold text-primary-dark">{title}</h3>
            <p className="mt-2 text-text-main">{description}</p>
        </div>
    </div>
);

const TeamMember: React.FC<{ imgSrc: string; name: string; title: string; alt: string;}> = ({ imgSrc, name, title, alt }) => (
    <div className="text-center">
        <img src={imgSrc} alt={alt} className="w-32 h-32 rounded-full mx-auto object-cover mb-4 shadow-lg" loading="lazy" />
        <h3 className="font-heading text-lg font-bold text-primary-dark">{name}</h3>
        <p className="text-text-main">{title}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const values = [
        { key: 'value1', iconSrc: '/assets/value-icons/1.webp' },
        { key: 'value2', iconSrc: '/assets/value-icons/2.webp' },
        { key: 'value3', iconSrc: '/assets/value-icons/3.webp' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="relative min-h-screen py-20 md:py-32 overflow-hidden flex items-center">
                <div className="absolute inset-0">
                    <img
                        src="/assets/value-icons/hero-section.webp"
                        alt={t('home.hero.title')}
                        className="w-full h-full object-cover object-[center_25%]"
                        fetchPriority="high"
                    />
                    <div className="absolute inset-0 bg-linear-to-r from-primary-dark/90 via-primary-dark/80 to-primary-dark/60" />
                </div>
                <div className="absolute -top-1/4 -right-1/4 z-0 opacity-[0.05]">
                    <LogoIcon className="w-[800px] h-auto transform rotate-12 text-white/20" monochromeColor="#ffffff" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="max-w-3xl text-center md:text-left text-white">
                        <h1 className="text-4xl md:text-6xl font-extrabold font-heading leading-tight">
                            {t('home.hero.title')}
                        </h1>
                        <p className="mt-4 text-lg md:text-xl text-white/90">
                            {t('home.hero.subtitle')}
                        </p>
                        <div className="mt-8 flex flex-col sm:flex-row md:justify-start justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                            <button onClick={() => navigate(pageRoutes.tjenester)} className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-[#14553a] transition-colors duration-300 btn-lift">
                                {t('home.hero.ctaServices')}
                            </button>
                            <button onClick={() => navigate(pageRoutes.kontakt)} className="bg-white text-primary-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 btn-lift border border-white/30 hover:border-white">
                                {t('home.hero.ctaContact')}
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark font-heading">{t('home.services.title')}</h2>
                         <p className="mt-3 max-w-2xl mx-auto text-lg text-text-main">{t('home.services.subtitle')}</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-8">
                        <ServiceCard imgWebp="/assets/value-icons/gypsum-collection.webp" imgSrc="/assets/value-icons/Gypsum Collection.webp" title={t('home.services.card1.title')} description={t('home.services.card1.description')} alt={t('home.services.card1.alt')} />
                        <ServiceCard imgWebp="/assets/value-icons/recycling-and-processing.webp" imgSrc="/assets/value-icons/Recycling and Processing.webp" title={t('home.services.card2.title')} description={t('home.services.card2.description')} alt={t('home.services.card2.alt')} />
                        <ServiceCard imgWebp="/assets/value-icons/sale-of-recycled-gypsum.webp" imgSrc="/assets/value-icons/Sale of Recycled Gypsum.webp" title={t('home.services.card3.title')} description={t('home.services.card3.description')} alt={t('home.services.card3.alt')} />
                    </div>
                </div>
            </section>

             {/* How It Works Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark font-heading">{t('home.howItWorks.title')}</h2>
                            <p className="mt-4 text-lg text-text-main">{t('home.howItWorks.subtitle')}</p>
                            <button onClick={() => navigate(pageRoutes.slikFungererDet)} className="mt-6 inline-flex items-center text-primary-dark font-semibold underline underline-offset-4 hover:text-primary-dark/70">
                                {t('home.howItWorks.link')} <ChevronRightIcon className="ml-1 h-5 w-5" />
                            </button>
                        </div>
                        <div className="space-y-10">
                           <ProcessStep number="1" title={t('home.howItWorks.step1.title')} description={t('home.howItWorks.step1.description')} />
                           <ProcessStep number="2" title={t('home.howItWorks.step2.title')} description={t('home.howItWorks.step2.description')} />
                           <ProcessStep number="3" title={t('home.howItWorks.step3.title')} description={t('home.howItWorks.step3.description')} isLast={true} />
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Values Section */}
            <section className="py-16 sm:py-24 bg-primary-dark text-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid md:grid-cols-3 gap-12 text-center">
                        {values.map(({ key, iconSrc }) => (
                            <div key={key}>
                                <img
                                    src={iconSrc}
                                    alt={t(`home.values.${key}.title`)}
                                    className="h-14 w-14 mx-auto object-contain filter brightness-0 invert"
                                    loading="lazy"
                                />
                                <h3 className="font-heading text-xl font-bold text-white mb-2">{t(`home.values.${key}.title`)}</h3>
                                <p className="text-primary-light">{t(`home.values.${key}.description`)}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>


            {/* About Us Snippet Section */}
            <section className="py-16 sm:py-24 bg-background">
                 <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-primary-dark font-heading">{t('home.about.title')}</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-text-main">{t('home.about.subtitle')}</p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                        {teamMembers.slice(0, 4).map((member) => (
                           <TeamMember
                                key={member.name}
                                imgSrc={member.imgUrl}
                                name={member.name}
                                title={t(`aboutUsPage.team.roles.${member.titleKey}`)}
                                alt={`${t('aboutUsPage.team.altPrefix')} ${member.name}, ${t(`aboutUsPage.team.roles.${member.titleKey}`)}`}
                           />
                        ))}
                    </div>
                     <button onClick={() => navigate(pageRoutes.omOss)} className="mt-12 bg-primary-dark text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-800 transition-colors duration-300 btn-lift">
                        {t('home.about.cta')}
                    </button>
                </div>
            </section>
        </>
    );
};

export default HomePage;

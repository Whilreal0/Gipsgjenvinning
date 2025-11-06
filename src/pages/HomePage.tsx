import React from 'react';
import { useNavigate } from 'react-router-dom';
import { pageRoutes } from '../routes';
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
        <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-xl z-10">
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
        <h4 className="font-heading text-lg font-bold text-primary-dark">{name}</h4>
        <p className="text-text-main">{title}</p>
    </div>
);

const HomePage: React.FC = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const teamMembers = [
        { name: 'Espen Hurrod', titleKey: 'generalManager' },
        { name: 'Joacim Holten The Gorge', titleKey: 'teamLeader' },
        { name: 'Daniel Andre Jensen', titleKey: 'productionWorker' },
        { name: 'Sara-Helen Larsen', titleKey: 'adminAndProduction' },
    ];

    const values = [
        { key: 'value1', iconSrc: '/assets/value-icons/1.png' },
        { key: 'value2', iconSrc: '/assets/value-icons/2.png' },
        { key: 'value3', iconSrc: '/assets/value-icons/3.png' },
    ];

    return (
        <>
            {/* Hero Section */}
            <section className="bg-primary-light pt-20 pb-20 md:pt-32 md:pb-32 text-center relative overflow-hidden">
                <div className="absolute -top-1/4 -right-1/4 z-0 opacity-[0.03]">
                    <LogoIcon className="w-[800px] h-auto transform rotate-12" monochromeColor="#0E4B4F" />
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-primary-dark font-heading leading-tight">
                        {t('home.hero.title')}
                    </h1>
                    <p className="mt-4 max-w-3xl mx-auto text-lg md:text-xl text-text-main">
                        {t('home.hero.subtitle')}
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <button onClick={() => navigate(pageRoutes.tjenester)} className="bg-accent text-white font-bold py-3 px-8 rounded-full text-lg hover:bg-green-600 transition-colors duration-300 btn-lift">
                            {t('home.hero.ctaServices')}
                        </button>
                        <button onClick={() => navigate(pageRoutes.kontakt)} className="bg-white text-primary-dark font-bold py-3 px-8 rounded-full text-lg hover:bg-gray-100 transition-colors duration-300 btn-lift border border-gray-300 hover:border-primary-dark">
                            {t('home.hero.ctaContact')}
                        </button>
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
                        <ServiceCard imgSrc="https://picsum.photos/seed/gips1/600/400" title={t('home.services.card1.title')} description={t('home.services.card1.description')} alt={t('home.services.card1.alt')} />
                        <ServiceCard imgSrc="https://picsum.photos/seed/gips2/600/400" title={t('home.services.card2.title')} description={t('home.services.card2.description')} alt={t('home.services.card2.alt')} />
                        <ServiceCard imgSrc="https://picsum.photos/seed/gips3/600/400" title={t('home.services.card3.title')} description={t('home.services.card3.description')} alt={t('home.services.card3.alt')} />
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
                            <button onClick={() => navigate(pageRoutes.slikFungererDet)} className="mt-6 inline-flex items-center text-accent font-bold hover:underline">
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
                        {teamMembers.map((member) => (
                           <TeamMember
                                key={member.name}
                                imgSrc={`https://source.boringavatars.com/marble/200/${member.name.replace(/\s/g, '')}?colors=0E4B4F,D7EEE9,F9FBFC,1E2328,2FBF71`}
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

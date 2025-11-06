import React from 'react';
import { useTranslation } from '../i18n/context';
import TeamMemberCard from '../components/TeamMemberCard';

const AboutUsPage: React.FC = () => {
    const { t } = useTranslation();

    const teamMembers = [
        {
            name: 'Espen Hurrod',
            titleKey: 'generalManager',
            phone: '410 06 505',
            email: null,
            imgSeed: 'espen'
        },
        {
            name: 'Joacim Holten The Gorge',
            titleKey: 'teamLeader',
            phone: null,
            email: 'joacim@gipsgjenvinn.no',
            imgSeed: 'joacim'
        },
        {
            name: 'Daniel Andre Jensen',
            titleKey: 'productionWorker',
            phone: null,
            email: null,
            imgSeed: 'daniel'
        },
        {
            name: 'Sara-Helen Larsen',
            titleKey: 'adminAndProduction',
            phone: null,
            email: 'sara@gipsgjenvinn.no',
            imgSeed: 'sara'
        },
        {
            name: 'Jonas Makksund Marberg',
            titleKey: 'machineOperator',
            phone: null,
            email: null,
            imgSeed: 'jonas'
        },
    ];

    return (
        <>
            <div className="bg-primary-light">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
                    <h1 className="text-4xl md:text-5xl font-extrabold font-heading text-primary-dark">{t('aboutUsPage.title')}</h1>
                    <p className="mt-4 text-xl text-text-main max-w-3xl mx-auto">{t('aboutUsPage.subtitle')}</p>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-3xl font-bold font-heading text-primary-dark mb-4">{t('aboutUsPage.story.title')}</h2>
                        <p className="text-lg text-text-main">
                            {t('aboutUsPage.story.p1')}
                        </p>
                    </div>
                    <div>
                        <img src="https://picsum.photos/seed/about/800/600" alt={t('aboutUsPage.story.alt')} className="rounded-lg shadow-lg" loading="lazy" />
                    </div>
                </div>
            </div>

            <div className="py-16 sm:py-24 bg-background">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-4xl font-extrabold font-heading text-primary-dark">{t('aboutUsPage.team.title')}</h2>
                    <p className="mt-3 max-w-2xl mx-auto text-lg text-text-main">{t('aboutUsPage.team.subtitle')}</p>
                    <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {teamMembers.map(member => (
                            <TeamMemberCard
                                key={member.name}
                                name={member.name}
                                title={t(`aboutUsPage.team.roles.${member.titleKey}`)}
                                imgSrc={`https://source.boringavatars.com/marble/300/${member.name.replace(/\s/g, '')}?colors=0E4B4F,D7EEE9,F9FBFC,1E2328,2FBF71`}
                                alt={`${t('aboutUsPage.team.altPrefix')} ${member.name}, ${t(`aboutUsPage.team.roles.${member.titleKey}`)}`}
                                phone={member.phone}
                                email={member.email}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutUsPage;
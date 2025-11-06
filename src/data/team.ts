export interface TeamMember {
    name: string;
    titleKey: string;
    phone?: string | null;
    email?: string | null;
    imgUrl: string;
}

export const teamMembers: TeamMember[] = [
    {
        name: 'Espen Hurrod',
        titleKey: 'generalManager',
        phone: '410 06 505',
        email: null,
        imgUrl: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
    {
        name: 'Joacim Holten The Gorge',
        titleKey: 'teamLeader',
        phone: null,
        email: 'joacim@gipsgjenvinn.no',
        imgUrl: 'https://images.pexels.com/photos/3184613/pexels-photo-3184613.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
    {
        name: 'Daniel Andre Jensen',
        titleKey: 'productionWorker',
        phone: null,
        email: null,
        imgUrl: 'https://images.pexels.com/photos/3775538/pexels-photo-3775538.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
    {
        name: 'Sara-Helen Larsen',
        titleKey: 'adminAndProduction',
        phone: null,
        email: 'sara@gipsgjenvinn.no',
        imgUrl: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
    {
        name: 'Jonas Makksund Marberg',
        titleKey: 'machineOperator',
        phone: null,
        email: null,
        imgUrl: 'https://images.pexels.com/photos/1800457/pexels-photo-1800457.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&dpr=1',
    },
];

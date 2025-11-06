import React from 'react';
import { MailIcon } from './icons/MailIcon';
import { PhoneIcon } from './icons/PhoneIcon';

interface TeamMemberCardProps {
    imgSrc: string;
    name: string;
    title: string;
    alt: string;
    phone?: string | null;
    email?: string | null;
}

const TeamMemberCard: React.FC<TeamMemberCardProps> = ({ imgSrc, name, title, alt, phone, email }) => (
    <div className="flex flex-col text-center p-4 bg-white rounded-lg shadow-sm transition-shadow duration-300 hover:shadow-lg h-full">
        <img
            src={imgSrc}
            alt={alt}
            className="w-32 h-32 rounded-full mx-auto object-cover mb-4 shadow-md border-4 border-white flex-shrink-0"
            loading="lazy"
        />
        <div className="flex-grow">
            <h3 className="font-heading text-xl font-bold text-primary-dark">{name}</h3>
            <p className="text-accent font-medium">{title}</p>
        </div>
        {(phone || email) && (
             <div className="mt-4 pt-4 border-t border-gray-200 space-y-2 text-sm text-text-main">
                {phone && (
                    <div className="flex items-center justify-center space-x-2">
                        <PhoneIcon className="h-4 w-4 text-gray-500" />
                        <a href={`tel:+47${phone.replace(/\s/g, '')}`} className="hover:text-accent">{phone}</a>
                    </div>
                )}
                {email && (
                    <div className="flex items-center justify-center space-x-2">
                        <MailIcon className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${email}`} className="hover:text-accent truncate" title={email}>{email}</a>
                    </div>
                )}
            </div>
        )}
    </div>
);

export default TeamMemberCard;
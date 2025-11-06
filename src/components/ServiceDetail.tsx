import React from 'react';
import { CheckCircleIcon } from './icons/CheckCircleIcon';

interface ServiceDetailProps {
    title: string;
    description: string;
    imgSrc: string;
    imgWebp?: string;
    alt: string;
    points: string[];
    reverse?: boolean;
}

const ServiceDetail: React.FC<ServiceDetailProps> = ({ title, description, imgSrc, imgWebp, alt, points, reverse = false }) => (
    <div className={`flex flex-col md:flex-row items-center gap-12 ${reverse ? 'md:flex-row-reverse' : ''}`}>
        <div className="md:w-1/2">
            <picture>
                {imgWebp && <source srcSet={imgWebp} type="image/webp" />}
                <img src={imgSrc} alt={alt} className="rounded-lg shadow-lg w-full h-auto object-cover" loading="lazy" />
            </picture>
        </div>
        <div className="md:w-1/2">
            <h2 className="text-3xl font-bold font-heading text-primary-dark mb-4">{title}</h2>
            <p className="text-lg text-text-main mb-6">{description}</p>
            <ul className="space-y-3">
                {points.map((point, index) => (
                    <li key={index} className="flex items-start">
                        <CheckCircleIcon className="h-6 w-6 text-accent mr-3 mt-1 flex-shrink-0" />
                        <span>{point}</span>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

export default ServiceDetail;

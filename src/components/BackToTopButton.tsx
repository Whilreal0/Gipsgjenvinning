import React, { useState, useEffect } from 'react';
import { ArrowUpIcon } from './icons/ArrowUpIcon';

const BackToTopButton: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => setIsVisible(true), 10);
            return () => clearTimeout(timer);
        }
        return undefined;
    }, [isVisible]);

    return (
        <div className="fixed bottom-[4.25rem] right-3 sm:right-5 z-[999] flex flex-col items-end gap-2">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    bg-primary-dark text-white rounded-full h-10 w-10 flex items-center justify-center shadow-lg hover:bg-primary-dark/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-dark/40
                    transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
                `}
                aria-label="Gå til toppen"
            >
                <ArrowUpIcon className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
            </button>
        </div>
    );
};

export default BackToTopButton;

import React, { useState, useEffect } from 'react';
import { ChevronUpIcon } from './icons/ChevronUpIcon';

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
        <div className="fixed bottom-20 right-3 sm:right-5 z-[999] flex flex-col items-end gap-2">
            <button
                type="button"
                onClick={scrollToTop}
                className={`
                    bg-accent text-white rounded-full p-2.5 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent btn-lift
                    transition-all duration-500 ease-out
                    ${isVisible ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-75 translate-y-4 pointer-events-none'}
                `}
                aria-label="Gå til toppen"
            >
                <ChevronUpIcon className="h-5 w-5" />
            </button>
        </div>
    );
};

export default BackToTopButton;

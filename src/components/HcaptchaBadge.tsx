import React from 'react';

interface HcaptchaBadgeProps {
    className?: string;
}

const HcaptchaBadge: React.FC<HcaptchaBadgeProps> = ({ className }) => {
    return (
        <a
            href="https://www.hcaptcha.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center rounded-2xl border border-primary-light/40 bg-white/95 px-3 py-2 shadow-md transition hover:shadow-lg ${className ?? ''}`}
            aria-label="hCaptcha Privacy Policy"
        >
            <div
                className="flex h-14 w-14 items-center justify-center rounded-xl shadow-inner"
                style={{
                    backgroundImage:
                        'linear-gradient(135deg, #3cd3f2 0%, #2ab6e8 25%, #1fa0dc 50%, #1483ce 75%, #0c6ac2 100%)',
                }}
            >
                <svg
                    viewBox="0 0 24 24"
                    className="h-8 w-8 text-white"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={1.8}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <path d="M9 11.25V5.25C9 4.2835 9.7835 3.5 10.75 3.5S12.5 4.2835 12.5 5.25v6M12.5 11.25V3.75C12.5 2.7835 13.2835 2 14.25 2S16 2.7835 16 3.75v7.5M16 11.25V5.25C16 4.2835 16.7835 3.5 17.75 3.5S19.5 4.2835 19.5 5.25v7.705a7.5 7.5 0 01-2.916 5.927l-2.988 2.312a2.5 2.5 0 01-3.078-.046l-2.501-2.022a6.5 6.5 0 01-2.017-2.818l-.898-2.394a2.75 2.75 0 011.61-3.483 2.75 2.75 0 013.467 1.587l.191.519" />
                </svg>
            </div>
            <span className="mt-2 text-[11px] font-semibold uppercase tracking-wide text-primary-dark">hCaptcha</span>
        </a>
    );
};

export default HcaptchaBadge;

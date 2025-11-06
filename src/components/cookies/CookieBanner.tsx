import React from 'react';
import { Link } from 'react-router-dom';
import { useCookieConsent } from './CookieConsentContext';

const COOKIE_POLICY_PATH = '/cookies';

export const CookieBanner: React.FC = () => {
    const { isBannerVisible, acceptAll, rejectNonEssential } = useCookieConsent();

    if (!isBannerVisible) {
        return null;
    }

    return (
        <div className="fixed inset-x-0 bottom-0 z-[1100] px-4 sm:px-6 pb-4">
            <div className="mx-auto max-w-5xl rounded-lg border border-primary-dark/10 bg-white/95 shadow-xl backdrop-blur-md px-4 py-5 sm:px-6 sm:py-6">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-sm sm:text-base text-text-main">
                        <p className="font-semibold text-primary-dark">We use cookies</p>
                        <p className="mt-2">
                            We use cookies so the site works properly and to improve your experience. You can accept or reject non-essential cookies.{` `}
                            <Link to={COOKIE_POLICY_PATH} className="font-semibold text-accent underline hover:text-green-600">
                                Read cookie policy
                            </Link>
                        </p>
                    </div>
                    <div className="flex flex-shrink-0 gap-3 sm:ml-6">
                        <button
                            type="button"
                            onClick={rejectNonEssential}
                            className="w-full sm:w-auto rounded-full border border-primary-dark/20 bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition hover:bg-primary-light/60"
                        >
                            Reject non-essential
                        </button>
                        <button
                            type="button"
                            onClick={acceptAll}
                            className="w-full sm:w-auto rounded-full bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-600"
                        >
                            Accept all cookies
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

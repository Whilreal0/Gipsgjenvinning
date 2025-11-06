import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

type ConsentStatus = 'pending' | 'accepted' | 'rejected';

interface StoredConsent {
    nonEssential: boolean;
    ts: string;
}

interface CookieConsentContextValue {
    status: ConsentStatus;
    hasNonEssentialConsent: boolean;
    isBannerVisible: boolean;
    acceptAll: () => void;
    rejectNonEssential: () => void;
    openBanner: () => void;
    closeBanner: () => void;
}

const STORAGE_KEY = 'cookieConsent.v1';

const CookieConsentContext = createContext<CookieConsentContextValue | undefined>(undefined);

interface CookieConsentProviderProps {
    children: React.ReactNode;
}

const readStoredConsent = (): StoredConsent | null => {
    if (typeof window === 'undefined') {
        return null;
    }
    try {
        const raw = window.localStorage.getItem(STORAGE_KEY);
        if (!raw) {
            return null;
        }
        const parsed = JSON.parse(raw) as StoredConsent;
        if (typeof parsed?.nonEssential === 'boolean') {
            return parsed;
        }
        return null;
    } catch (error) {
        console.warn('Failed to read stored cookie consent', error);
        return null;
    }
};

const storeConsent = (nonEssential: boolean) => {
    if (typeof window === 'undefined') {
        return;
    }
    const payload: StoredConsent = {
        nonEssential,
        ts: new Date().toISOString(),
    };
    try {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch (error) {
        console.warn('Failed to persist cookie consent', error);
    }
};

export const CookieConsentProvider: React.FC<CookieConsentProviderProps> = ({ children }) => {
    const [status, setStatus] = useState<ConsentStatus>('pending');
    const [isBannerVisible, setIsBannerVisible] = useState(false);
    const initialisedRef = useRef(false);

    useEffect(() => {
        if (initialisedRef.current) {
            return;
        }
        initialisedRef.current = true;
        const stored = readStoredConsent();
        if (!stored) {
            setStatus('pending');
            setIsBannerVisible(true);
            return;
        }
        setStatus(stored.nonEssential ? 'accepted' : 'rejected');
        setIsBannerVisible(false);
    }, []);

    const acceptAll = useCallback(() => {
        storeConsent(true);
        setStatus('accepted');
        setIsBannerVisible(false);
    }, []);

    const rejectNonEssential = useCallback(() => {
        storeConsent(false);
        setStatus('rejected');
        setIsBannerVisible(false);
    }, []);

    const openBanner = useCallback(() => {
        setIsBannerVisible(true);
    }, []);

    const closeBanner = useCallback(() => {
        setIsBannerVisible(false);
    }, []);

    const value = useMemo<CookieConsentContextValue>(
        () => ({
            status,
            hasNonEssentialConsent: status === 'accepted',
            isBannerVisible,
            acceptAll,
            rejectNonEssential,
            openBanner,
            closeBanner,
        }),
        [acceptAll, closeBanner, isBannerVisible, openBanner, rejectNonEssential, status]
    );

    return <CookieConsentContext.Provider value={value}>{children}</CookieConsentContext.Provider>;
};

export const useCookieConsent = (): CookieConsentContextValue => {
    const context = useContext(CookieConsentContext);
    if (!context) {
        throw new Error('useCookieConsent must be used within a CookieConsentProvider');
    }
    return context;
};

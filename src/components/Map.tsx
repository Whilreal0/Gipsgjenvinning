import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n/context';

declare global {
    interface Window {
        mapboxgl?: any;
        Cookiebot?: {
            consent?: {
                preferences?: boolean;
                statistics?: boolean;
                marketing?: boolean;
            };
        };
    }
}

const MAPBOX_SCRIPT_SRC = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.js';
const MAPBOX_CSS_HREF = 'https://api.mapbox.com/mapbox-gl-js/v3.4.0/mapbox-gl.css';
// Public demo token – replace with your own for production use.
const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiZXhhbXBsZXMiLCJhIjoiY2p0MG01MXRqMW45cjQzb2R6b2ptc3J4MSJ9.zA2W0IkI0c6KaAhJfk9bWg';

const LONGITUDE = 10.976;
const LATITUDE = 59.188;
const MARKER_ICON = '/assets/value-icons/marker-icon.png';

const loadStylesheet = () => {
    if (document.querySelector(`link[href="${MAPBOX_CSS_HREF}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = MAPBOX_CSS_HREF;
    document.head.appendChild(link);
};

const loadScript = () =>
    new Promise<void>((resolve, reject) => {
        if (window.mapboxgl) {
            resolve();
            return;
        }

        const existingScript = document.querySelector<HTMLScriptElement>(`script[src="${MAPBOX_SCRIPT_SRC}"]`);
        if (existingScript) {
            existingScript.addEventListener('load', () => resolve(), { once: true });
            existingScript.addEventListener('error', () => reject(new Error('Failed to load Mapbox script')), { once: true });
            return;
        }

        const script = document.createElement('script');
        script.src = MAPBOX_SCRIPT_SRC;
        script.async = true;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error('Failed to load Mapbox script'));
        document.head.appendChild(script);
    });

const Map: React.FC = () => {
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<any>(null);
    const [canLoadMap, setCanLoadMap] = useState(false);
    const [consentState, setConsentState] = useState<'pending' | 'accepted' | 'declined' | 'unavailable'>('pending');
    const { t } = useTranslation();

    useEffect(() => {
        let mounted = true;
        const updateConsent = () => {
            if (!mounted) return;
            const bot = window.Cookiebot;
            if (!bot || !bot.consent) {
                setCanLoadMap(false);
                setConsentState(bot ? 'pending' : 'unavailable');
                return;
            }
            const { preferences, statistics, marketing } = bot.consent;
            const allowed = Boolean(preferences || statistics || marketing);
            setCanLoadMap(allowed);
            setConsentState(allowed ? 'accepted' : 'declined');
        };

        const onDialogEvent = () => updateConsent();

        const tryAttachCookiebot = () => {
            if (!window.Cookiebot) return false;
            updateConsent();
            window.addEventListener('CookiebotOnAccept', onDialogEvent);
            window.addEventListener('CookiebotOnDecline', onDialogEvent);
            window.addEventListener('CookiebotOnDialogInit', onDialogEvent);
            return true;
        };

        if (!tryAttachCookiebot()) {
            const intervalId = window.setInterval(() => {
                if (tryAttachCookiebot()) {
                    window.clearInterval(intervalId);
                }
            }, 500);
            return () => {
                mounted = false;
                window.clearInterval(intervalId);
                window.removeEventListener('CookiebotOnAccept', onDialogEvent);
                window.removeEventListener('CookiebotOnDecline', onDialogEvent);
                window.removeEventListener('CookiebotOnDialogInit', onDialogEvent);
            };
        }

        return () => {
            mounted = false;
            window.removeEventListener('CookiebotOnAccept', onDialogEvent);
            window.removeEventListener('CookiebotOnDecline', onDialogEvent);
            window.removeEventListener('CookiebotOnDialogInit', onDialogEvent);
        };
    }, []);

    useEffect(() => {
        if (!canLoadMap) {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
            return;
        }

        let isCancelled = false;
        loadStylesheet();
        const initMap = async () => {
            try {
                await loadScript();
                if (isCancelled || !mapContainerRef.current || mapRef.current) {
                    return;
                }

                const { mapboxgl } = window;
                if (!mapboxgl) {
                    throw new Error('Mapbox library unavailable');
                }

                mapboxgl.accessToken = MAPBOX_ACCESS_TOKEN;

                const map = new mapboxgl.Map({
                    container: mapContainerRef.current,
                    style: 'mapbox://styles/mapbox/streets-v12',
                    center: [LONGITUDE, LATITUDE],
                    zoom: 14,
                    interactive: true,
                });
                mapRef.current = map;

                const markerEl = document.createElement('div');
                markerEl.style.backgroundImage = `url(${MARKER_ICON})`;
                markerEl.style.width = '44px';
                markerEl.style.height = '44px';
                markerEl.style.backgroundSize = 'contain';
                markerEl.style.backgroundRepeat = 'no-repeat';
                markerEl.style.cursor = 'pointer';

                new mapboxgl.Marker(markerEl).setLngLat([LONGITUDE, LATITUDE]).addTo(map);
                map.addControl(new mapboxgl.NavigationControl(), 'top-right');
                map.on('load', () => map.resize());
            } catch (error) {
                console.error(error);
            }
        };

        initMap();

        return () => {
            isCancelled = true;
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [canLoadMap]);

    if (!canLoadMap) {
        const isDeclined = consentState === 'declined';
        const isPending = consentState === 'pending';
        const message = isDeclined
            ? t('map.requiresConsent')
            : isPending
            ? t('map.awaitingConsent')
            : t('map.unavailable');

        const handleAccept = () => {
            if (window.Cookiebot && typeof window.Cookiebot.show === 'function') {
                window.Cookiebot.show();
            } else {
                const trigger = document.querySelector<HTMLElement>('[data-cookiebot-trigger]');
                trigger?.click();
            }
        };

        return (
            <div className="flex min-h-[24rem] w-full flex-col items-center justify-center rounded-lg bg-[#e6e8eb] p-8 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#d1d5db] text-[#1f2933]">
                    <svg
                        aria-hidden="true"
                        className="h-9 w-9 text-[#1f2933]"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={1.8}
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3 3l18 18M10.477 10.789A2.25 2.25 0 0113.21 13.52m-2.733-2.732L9.88 9.192m3.328 3.328l.426.426M3.98 8.223C5.976 5.92 8.64 4.5 12 4.5c3.36 0 6.024 1.42 8.02 3.723a3.53 3.53 0 010 4.554c-.443.516-.947.996-1.503 1.44M6.876 15.126C7.906 15.703 9.092 16.03 10.5 16.03c.883 0 1.713-.123 2.487-.36"
                        />
                    </svg>
                </div>
                <p className="mt-6 text-base font-medium text-[#1f2933]">{message}</p>
                {(isDeclined || isPending) && (
                    <button
                        type="button"
                        onClick={handleAccept}
                        className="mt-5 inline-flex items-center justify-center bg-[#1f1f1f] px-6 py-2 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#333]"
                    >
                        {t('map.accept')}
                    </button>
                )}
            </div>
        );
    }

    return <div ref={mapContainerRef} className="h-full w-full min-h-[24rem]" />;
};

export default Map;

import React, { useEffect, useCallback, useMemo, useState, lazy, Suspense } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { PageKey } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import { useTranslation } from './i18n/context';
import AnnouncementBar from './components/AnnouncementBar';
import BackToTopButton from './components/BackToTopButton';
import { getPageKeyFromPath, pageRoutes } from './routes';

const HomePage = lazy(() => import('./pages/HomePage'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const HowItWorksPage = lazy(() => import('./pages/HowItWorksPage'));
const AboutUsPage = lazy(() => import('./pages/AboutUsPage'));
const ContactPage = lazy(() => import('./pages/ContactPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const StorageAndCollectionPage = lazy(() => import('./pages/StorageAndCollectionPage'));
const RecyclingProcessPage = lazy(() => import('./pages/RecyclingProcessPage'));
const FinishedProductPage = lazy(() => import('./pages/FinishedProductPage'));
const LazyChatWidget = lazy(() => import('./components/ChatWidget'));

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, t } = useTranslation();
    const [isAnnouncementBarVisible, setisAnnouncementBarVisible] = useState(true);
    const [isPageEntering, setIsPageEntering] = useState(true);
    const [isChatWidgetReady, setIsChatWidgetReady] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setisAnnouncementBarVisible(false);
            } else {
                setisAnnouncementBarVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const currentPage = useMemo<PageKey>(() => getPageKeyFromPath(location.pathname), [location.pathname]);

    useEffect(() => {
        setIsPageEntering(true);
        const timeout = setTimeout(() => setIsPageEntering(false), 200);
        return () => clearTimeout(timeout);
    }, [location.pathname]);

    useEffect(() => {
        const timeout = window.setTimeout(() => setIsChatWidgetReady(true), 1000);
        return () => window.clearTimeout(timeout);
    }, []);

    useEffect(() => {
        window.scrollTo(0, 0);

        // Update document metadata based on language and page
        document.documentElement.lang = language;
        
        const titleKey = `pageTitles.${currentPage}`;
        const descriptionKey = `pageDescriptions.${currentPage}`;

        document.title = t(titleKey);
        
        const descriptionTag = document.querySelector('meta[name="description"]');
        if (descriptionTag) {
            descriptionTag.setAttribute('content', t(descriptionKey));
        }

    }, [currentPage, language, t]);

    const handleNavigate = useCallback(
        (page: PageKey) => {
            const target = pageRoutes[page];
            if (target) {
                navigate(target);
            } else {
                navigate(pageRoutes.hjem);
            }
        },
        [navigate]
    );

    return (
        <div className="bg-background min-h-screen flex flex-col">
            <AnnouncementBar isVisible={isAnnouncementBarVisible} />
            <Header currentPage={currentPage} onNavigate={handleNavigate} />
            <main
                className={`flex-grow transform transition-all duration-300 ease-out ${
                    isPageEntering ? 'opacity-0 translate-y-3' : 'opacity-100 translate-y-0'
                }`}
            >
                <Suspense
                    fallback={
                        <div className="flex w-full justify-center py-16" role="status" aria-live="polite">
                            <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-light border-t-primary-dark" />
                            <span className="sr-only">Laster inn sideinnhold …</span>
                        </div>
                    }
                >
                    <Routes>
                        <Route path={pageRoutes.hjem} element={<HomePage />} />
                        <Route path={pageRoutes.tjenester} element={<ServicesPage />} />
                        <Route path={pageRoutes.lagringOgHenting} element={<StorageAndCollectionPage />} />
                        <Route path={pageRoutes.gjenvinningsprosessen} element={<RecyclingProcessPage />} />
                        <Route path={pageRoutes.ferdigProdukt} element={<FinishedProductPage />} />
                        <Route path={pageRoutes.slikFungererDet} element={<HowItWorksPage />} />
                        <Route path={pageRoutes.omOss} element={<AboutUsPage />} />
                        <Route path={pageRoutes.kontakt} element={<ContactPage />} />
                        <Route path={pageRoutes.personvern} element={<PrivacyPage />} />
                        <Route path="*" element={<Navigate to={pageRoutes.hjem} replace />} />
                    </Routes>
                </Suspense>
            </main>
            <Footer onNavigate={handleNavigate} />
            <BackToTopButton />
            {isChatWidgetReady && (
                <Suspense fallback={null}>
                    <LazyChatWidget />
                </Suspense>
            )}
        </div>
    );
};

export default App;

import React, { useEffect, useCallback, useMemo, useState } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { PageKey } from './types';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ServicesPage from './pages/ServicesPage';
import HowItWorksPage from './pages/HowItWorksPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import PrivacyPage from './pages/PrivacyPage';
import { useTranslation } from './i18n/context';
import AnnouncementBar from './components/AnnouncementBar';
import StorageAndCollectionPage from './pages/StorageAndCollectionPage';
import RecyclingProcessPage from './pages/RecyclingProcessPage';
import FinishedProductPage from './pages/FinishedProductPage';
import ChatWidget from './components/ChatWidget';
import BackToTopButton from './components/BackToTopButton';
import { getPageKeyFromPath, pageRoutes } from './routes';

const App: React.FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { language, t } = useTranslation();
    const [isAnnouncementBarVisible, setisAnnouncementBarVisible] = useState(true);

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
            <main className="flex-grow">
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
            </main>
            <Footer onNavigate={handleNavigate} />
            <BackToTopButton />
            <ChatWidget />
        </div>
    );
};

export default App;

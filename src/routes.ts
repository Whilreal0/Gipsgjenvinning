import { PageKey } from './types';

export const pageRoutes: Record<PageKey, string> = {
    hjem: '/',
    tjenester: '/tjenester',
    lagringOgHenting: '/tjenester/lagring-og-henting',
    gjenvinningsprosessen: '/tjenester/gjenvinningsprosessen',
    ferdigProdukt: '/tjenester/ferdig-produkt',
    slikFungererDet: '/slik-fungerer-det',
    omOss: '/om-oss',
    kontakt: '/kontakt',
    personvern: '/personvern',
    cookies: '/cookies',
};

const normalizePath = (path: string) => {
    if (!path) {
        return '/';
    }
    const trimmed = path.trim();
    if (trimmed === '') {
        return '/';
    }
    const withoutTrailingSlash = trimmed.endsWith('/') && trimmed.length > 1 ? trimmed.slice(0, -1) : trimmed;
    return withoutTrailingSlash === '' ? '/' : withoutTrailingSlash;
};

export const getPageKeyFromPath = (pathname: string): PageKey => {
    const normalized = normalizePath(pathname);
    const match = (Object.entries(pageRoutes) as [PageKey, string][]).find(([, path]) => normalizePath(path) === normalized);
    return match ? match[0] : 'hjem';
};

import i18next, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import enGB from './translations/en-GB/common.json';
import ro from './translations/ro/common.json';

export const initOpts: InitOptions = {
    interpolation: {
        escapeValue: false, // react already escapes
        // format,
    },
    fallbackLng: 'en-GB',
    ns: ['common'],
    defaultNS: 'common',
    keySeparator: false, // we want a.b.c.d.e strings for easy lookup
    detection: {
        order: [
            'customRegionLanguageDetector',
            'querystring',
            'cookie',
            'localStorage',
            'navigator',
            'htmlTag',
        ],
    },
    resources: {
        'en-GB': {
            common: { ...enGB },
        },
        ro: {
            common: { ...ro },
        },
    },
    react: {
        useSuspense: false, // we don't wait for resource loading
    },
};
export const initTranslations = () =>
    i18next.use(initReactI18next).init(initOpts);

import React, { useEffect } from 'react';
import { CacheProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { changeLanguage } from 'i18next';
import { hot } from 'react-hot-loader/root';
import Routing from './infrastructure/Routing';
import { theme } from './theme';
import { createEmotionCache } from './utils/createEmotionCache';

import { ProvideAuth } from './common/auth.hook';
import { QueryClient, QueryClientProvider } from 'react-query';

const clientSideEmotionCache = createEmotionCache();

export const App = hot(_App);
export function _App(): JSX.Element | null {
    const queryClient = new QueryClient();

    useEffect(() => {
        const language = localStorage.getItem('i18nextLng');
        if (language) {
            changeLanguage(language);
        }
    }, []);

    return (
        <CacheProvider value={clientSideEmotionCache}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <ProvideAuth>
                    <QueryClientProvider client={queryClient}>
                        <Routing />
                    </QueryClientProvider>
                </ProvideAuth>
            </ThemeProvider>
        </CacheProvider>
    );
}

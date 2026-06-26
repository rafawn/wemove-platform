import { createInertiaApp } from '@inertiajs/vue3';
import { createI18n } from 'vue-i18n';
import { ZiggyVue } from 'ziggy-js';
import { initializeTheme } from '@/composables/useAppearance';
import AppLayout from '@/layouts/AppLayout.vue';
import AuthLayout from '@/layouts/AuthLayout.vue';
import SettingsLayout from '@/layouts/settings/Layout.vue';
import { initializeFlashToast } from '@/lib/flashToast';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';

import en from '../../lang/en/en.json';
import es from '../../lang/en/es.json';

const fallbackLocale = 'en';
const messages: Record<string, Record<string, string>> = {
    en: en as Record<string, string>,
    es: es as Record<string, string>,
};

const resolveLocale = (locale: unknown): keyof typeof messages => {
    if (typeof locale === 'string' && locale in messages) {
        return locale as keyof typeof messages;
    }

    return fallbackLocale;
};

const i18n = createI18n({
    legacy: false,
    locale: fallbackLocale,
    fallbackLocale,
    messages,
});

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    layout: (name) => {
        switch (true) {
            case name === 'Welcome':
                return null;
            case name.startsWith('auth/'):
                return AuthLayout;
            case name.startsWith('settings/'):
                return [AppLayout, SettingsLayout];
            default:
                return AppLayout;
        }
    },
    progress: {
        color: '#4B5563',
    },
    withApp(app, { page }) {
        i18n.global.locale.value = resolveLocale(page.props.locale);

        const ziggy = page.props.ziggy as any;
        const ziggyConfig = {
            ...ziggy,
            location: new URL(ziggy.location),
        };

        (globalThis as any).Ziggy = ziggyConfig;

        app.use(ZiggyVue, ziggyConfig).use(i18n);
    },
});

// This will set light / dark mode on page load...
initializeTheme();

// This will listen for flash toast data from the server...
initializeFlashToast();

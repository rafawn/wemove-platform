import { usePage } from '@inertiajs/vue3';
import { useI18n } from 'vue-i18n';

export function useTranslation() {
    const { t, locale } = useI18n();

    const __ = (
        text: string,
        params?: Record<string, string | number>,
    ): string => {
        const pageLocale = usePage().props.locale;

        if (typeof pageLocale === 'string') {
            locale.value = pageLocale;
        }

        const translated = params ? t(text, params) : t(text);

        if (!params) {
            return translated;
        }

        return Object.entries(params)
            .sort(([first], [second]) => second.length - first.length)
            .reduce(
                (result, [key, value]) =>
                    result.split(`:${key}`).join(String(value)),
                translated,
            );
    };

    return { __ };
}

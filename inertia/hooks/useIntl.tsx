import { asset } from '@/lib/utils';
import { usePage } from '@inertiajs/react';

export default function useIntl() {
    const { locale } = usePage<{ locale: string }>().props;
    const t = (esText, enText) => (locale === 'es' ? esText : enText);

    return {
        languages: [
            { code: 'es', name: t('Español', 'Spanish'), icon: asset('img/icons/ecuador.webp') },
            { code: 'en', name: t('Ingles', 'English'), icon: asset('img/icons/usa.webp') },
        ],
        locale,
        t,
    };
}

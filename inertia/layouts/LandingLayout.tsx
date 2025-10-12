import type { InfoT } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { asset } from '~/lib/utils';

export default function LandingLayout({ title = '', children }: { title?: string; children: React.ReactNode }) {
    const { info } = usePage<{ info: InfoT }>().props;
    const pageTitle = title ? `${title} - ${info.name}` : info.name;

    return (
        <>
            <Head title={pageTitle}>
                <link rel="shortcut icon" href={asset('info/favicon.webp')} />
            </Head>
            {children}
        </>
    );
}

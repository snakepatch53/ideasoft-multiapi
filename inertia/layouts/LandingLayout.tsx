import { Head } from '@inertiajs/react';
import { asset } from '~/lib/utils';

export default function LandingLayout({ title = '', children }: { title?: string; children: React.ReactNode }) {
    const pageTitle = title ? `${title} - Ideasoft Multi API` : 'Ideasoft Multi API';
    return (
        <>
            <Head title={pageTitle}>
                <link rel="icon" href={asset('info/favicon.webp')} />
            </Head>
            {children}
        </>
    );
}

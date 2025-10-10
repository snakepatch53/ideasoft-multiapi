import { Head } from '@inertiajs/react';
import { asset } from '~/lib/utils';

const appName = import.meta.env.VITE_APP_NAME;

export default function LandingLayout({ title = '', children }: { title?: string; children: React.ReactNode }) {
    const pageTitle = title ? `${title} - ${appName}` : appName;

    return (
        <>
            <Head title={pageTitle}>
                <link rel="shortcut icon" href={asset('info/favicon.webp')} />
            </Head>
            {children}
        </>
    );
}

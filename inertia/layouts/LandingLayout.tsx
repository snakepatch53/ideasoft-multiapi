import Footer from '@/components/landing/Footer';
import Header from '@/components/landing/Header';
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
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <Header />
                {children}
                <Footer />
            </div>
        </>
    );
}

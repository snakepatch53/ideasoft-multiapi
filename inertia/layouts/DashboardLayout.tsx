import type { BreadcrumbItem, InfoT } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import AppSidebarLayout from './AppSidebarLayout';

interface AppLayoutProps {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
}

export default function DashboardLayout({ title = '', breadcrumbs, children, ...props }: AppLayoutProps) {
    const { info } = usePage<{ info: InfoT }>().props;
    const pageTitle = title ? `${title} - ${info.name}` : info.name;

    return (
        <>
            <Head title={pageTitle}>
                <link rel="shortcut icon" href={info.favicon} />
            </Head>
            <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppSidebarLayout>
            <ToastContainer />
        </>
    );
}

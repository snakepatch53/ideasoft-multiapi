import type { BreadcrumbItem, InfoT } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { type ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import AppSidebarLayout from './AppSidebarLayout';

const appName = import.meta.env.VITE_APP_NAME;

interface AppLayoutProps {
    title?: string;
    breadcrumbs?: BreadcrumbItem[];
    children: ReactNode;
}

export default function DashboardLayout({ title = '', breadcrumbs, children, ...props }: AppLayoutProps) {
    const { info } = usePage<{ info: InfoT }>().props;
    const pageTitle = title ? `${title} - ${appName}` : appName;

    return (
        <>
            <link rel="shortcut icon" href={info.favicon} type="image/x-icon" />
            <Head title={pageTitle}>
                <link rel="icon" href={info.favicon} />
            </Head>
            <AppSidebarLayout breadcrumbs={breadcrumbs} {...props}>
                {children}
            </AppSidebarLayout>
            <ToastContainer />
        </>
    );
}

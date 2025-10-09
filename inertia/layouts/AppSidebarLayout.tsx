import { type BreadcrumbItem } from '@/types';
import { type PropsWithChildren } from 'react';
import { AppContent } from '~/components/dashboard/AppContent';
import { AppShell } from '~/components/dashboard/AppShell';
import { AppSidebar } from '~/components/dashboard/AppSidebar';
import { AppSidebarHeader } from '~/components/dashboard/AppSidebarHeader';

export default function AppSidebarLayout({ children, breadcrumbs = [] }: PropsWithChildren<{ breadcrumbs?: BreadcrumbItem[] }>) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <AppContent variant="sidebar">
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </AppContent>
        </AppShell>
    );
}

import type { FormDataConvertible } from '@inertiajs/core';
import type { LucideIcon } from 'lucide-react';
import type { Config } from 'ziggy-js';

export type FormDataType<T> = Record<T, FormDataConvertible>;

export interface BreadcrumbItem {
    title: string;
    href: string;
}

export interface NavGroup {
    title: string;
    items: NavItem[];
}

export interface NavItem {
    title: string;
    href: string;
    icon?: LucideIcon | null;
    isActive?: boolean;
}

export interface SharedData {
    name: string;
    quote: { message: string; author: string };
    auth: Auth;
    ziggy: Config & { location: string };
    sidebarOpen: boolean;
    [key: string]: unknown;
}

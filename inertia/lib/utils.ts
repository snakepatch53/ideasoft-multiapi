import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function asset(path: string) {
    return `/storage/${path}`;
}

export function fastTry(f) {
    try {
        return f();
    } catch {
        return false;
        /* ignore */
    }
}

// dates
export function getDiffNowYears(date: string | Date) {
    const startDate = new Date(date);
    const currentDate = new Date();
    return currentDate.getFullYear() - startDate.getFullYear();
}

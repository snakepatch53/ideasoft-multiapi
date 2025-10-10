import { cn } from '@/lib/utils';

export default function Button({
    as = 'button',
    variant = 'default',
    label = '',
    icon = null,
    tooltip = '',
    className = '',
    classIcon = '',
    children,
    ...props
}: {
    as?: React.ElementType;
    variant?: 'default' | 'destructive' | 'secondary';
    label?: string;
    icon?: React.ElementType | null;
    tooltip?: string;
    className?: string;
    classIcon?: string;
    children?: React.ReactNode;
} & (React.ButtonHTMLAttributes<HTMLButtonElement> | React.AnchorHTMLAttributes<HTMLAnchorElement>)) {
    const Component = as;
    const Icon = icon;

    return (
        <Component
            className={cn(
                'group/btn relative flex cursor-pointer items-center justify-center gap-1 rounded-md border bg-black px-4 py-2 text-sm font-medium text-white transition-all duration-200 hover:bg-black hover:text-white focus:ring-2 focus:ring-offset-2 focus:outline-none dark:bg-white/80 dark:text-black/80 dark:hover:bg-white dark:hover:text-black',
                {
                    'bg-red-500 text-white hover:bg-red-600 focus:ring-red-300 dark:bg-red-900 dark:text-white/80 dark:hover:bg-red-700 dark:hover:text-white':
                        variant === 'destructive',
                    'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300 dark:bg-blue-900 dark:text-white/80 dark:hover:bg-blue-700 dark:hover:text-white':
                        variant === 'secondary',
                    'aspect-square p-2.5': !label,
                },
                className
            )}
            {...props}
        >
            {tooltip && (
                <span className="absolute bottom-full left-1/2 hidden -translate-x-1/2 transform rounded bg-gray-700 px-2 py-1 text-xs text-white group-hover/btn:block">
                    {tooltip}
                </span>
            )}
            {label ? label : ''}
            {Icon && <Icon size={14} className={cn('', classIcon)} />}
            {children}
        </Component>
    );
}

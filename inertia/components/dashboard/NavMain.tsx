import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn, fastTry } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import { Info, MessageCircleQuestion } from 'lucide-react';
import { useState } from 'react';

export function NavMain() {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <NavOption title="Information" href={route('dashboard.home')} icon={Info} />
            </SidebarMenu>
        </SidebarGroup>
    );
}
function NavOption({ title, href, icon, description = '' }) {
    const [isActiveTooltip, setIsActiveTooltip] = useState(false);
    const Icon = icon;
    const isActive = fastTry(() => new URL(href).pathname === new URL(window.location.href).pathname);

    return (
        <SidebarMenuItem className="relative">
            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: title }}>
                <Link href={href} prefetch>
                    <Icon />
                    <span>{title}</span>
                    {description && (
                        <MessageCircleQuestion
                            className="ml-auto"
                            onMouseEnter={() => setIsActiveTooltip(true)}
                            onMouseLeave={() => setIsActiveTooltip(false)}
                        />
                    )}
                </Link>
            </SidebarMenuButton>
            {description && (
                <div
                    className={cn(
                        'border-primary/20 ring-primary/10 absolute bottom-full left-1/2 z-20 w-full -translate-x-1/2 rounded-xl bg-white/90 text-center text-sm text-gray-800 ring-1 backdrop-blur-lg transition-all duration-300 dark:bg-black/5 dark:text-gray-100',
                        'pointer-events-none scale-95 opacity-0',
                        { 'pointer-events-auto scale-100 border p-2 opacity-100': isActiveTooltip }
                    )}
                >
                    <div className="flex items-center justify-center gap-0.5">
                        <MessageCircleQuestion className="text-primary" size={13} />
                        <span className="text-primary text-xs font-semibold">{title}</span>
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">{description}</div>
                </div>
            )}
        </SidebarMenuItem>
    );
}

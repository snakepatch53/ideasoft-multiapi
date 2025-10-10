import { SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { LinkRouteParamT } from '@/types';
import { Info, LucideIcon, MessageCircleQuestion, Users } from 'lucide-react';
import { useState } from 'react';
import Link from '../Link';

export function NavMain() {
    return (
        <SidebarGroup className="px-2 py-0">
            <SidebarGroupLabel>Platform</SidebarGroupLabel>
            <SidebarMenu>
                <NavOption title="Information" route="dashboard.home" icon={Info} />
                <NavOption title="Users" route="dashboard.users" icon={Users} />
            </SidebarMenu>
            <SidebarGroupLabel>API</SidebarGroupLabel>
            <SidebarMenu>
                <NavOption title="Users" route="dashboard.api_users" icon={Users} />
            </SidebarMenu>
        </SidebarGroup>
    );
}
function NavOption({ title, route, icon, description = '' }: { title: string; route: LinkRouteParamT; icon: LucideIcon; description?: string }) {
    const [isActiveTooltip, setIsActiveTooltip] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const Icon = icon;

    return (
        <SidebarMenuItem className="relative">
            <SidebarMenuButton asChild isActive={isActive} tooltip={{ children: title }}>
                <Link route={route} onActive={setIsActive}>
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

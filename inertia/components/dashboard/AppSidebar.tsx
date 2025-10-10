import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import { Link } from '@inertiajs/react';
import AppLogo from './AppLogo';
import AppearanceToggleTab from './AppearanceToggleTab';
import { NavMain } from './NavMain';
import { NavUser } from './NavUser';

export function AppSidebar() {
    const { open } = useSidebar();

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route('dashboard.home')} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain />
            </SidebarContent>

            <SidebarFooter>
                <AppearanceToggleTab
                    variant="sidebar"
                    className={cn({
                        'flex-col': !open,
                    })}
                    classButton={cn({
                        'flex items-center justify-center p-0 py-1': !open,
                    })}
                />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import type { UserT } from '@/types';
import { useInitials } from '~/hooks/useInitials';

export function UserInfo({ user, showEmail = false, showType = false }: { user: UserT; showEmail?: boolean; showType?: boolean }) {
    const getInitials = useInitials();

    return (
        <>
            <Avatar className="h-8 w-8 overflow-hidden rounded-full">
                <AvatarImage alt={user.fullName} />
                <AvatarFallback className="rounded-lg bg-neutral-200 text-black dark:bg-neutral-700 dark:text-white">
                    {getInitials(user.fullName)}
                </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{user.fullName}</span>
                {showEmail && <span className="text-muted-foreground truncate text-xs">{user.email}</span>}
                {showType && <span className="text-muted-foreground truncate text-xs">{user.type}</span>}
            </div>
        </>
    );
}

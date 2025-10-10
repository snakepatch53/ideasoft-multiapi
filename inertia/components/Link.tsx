import { fastTry } from '@/lib/utils';
import type { LinkPropsT } from '@/types';
import { Link as LinkInertia } from '@inertiajs/react';
import { useEffect } from 'react';

export default function Link({ route: routeProp, href, children, onActive = () => {}, ...props }: LinkPropsT) {
    let hrefRoute: string = '';
    if (href) hrefRoute = href;
    else if (routeProp && typeof routeProp === 'string') hrefRoute = route(routeProp).url;
    else if (routeProp && typeof routeProp === 'function') hrefRoute = routeProp(route).url;
    else throw new Error('Link requires at least one of "route" or "href".');
    const Component: React.ElementType = fastTry(() => new URL(hrefRoute, window.location.origin).hostname !== window.location.hostname)
        ? 'a'
        : (LinkInertia as React.ElementType);
    const isActive = fastTry(() => new URL(hrefRoute, window.location.origin).pathname === new URL(window.location.href).pathname);
    useEffect(() => {
        if (isActive) onActive(true);
    }, [isActive, onActive]);

    return (
        <Component href={hrefRoute} {...props}>
            {children}
        </Component>
    );
}

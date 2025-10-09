import { route as routeFn } from '@izzyjs/route/client';

export type RouteT = typeof routeFn;

// export type RouteT = (routeName: Pick<typeof routeFn, 'routeName'>, options?: Pick<typeof routeFn, 'options'>) => string;

declare global {
    var route: RouteT;
    interface Window {
        route: RouteT;
    }
}

export {};

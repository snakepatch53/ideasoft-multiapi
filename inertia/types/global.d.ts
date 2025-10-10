import { Options, RouteName } from '@izzyjs/route/types';

export type RouteT = (routeName: RouteName, options?: Options) => string;

// export type RouteT = (routeName: Pick<typeof routeFn, 'routeName'>, options?: Pick<typeof routeFn, 'options'>) => string;

declare global {
    var route: RouteT;
    interface Window {
        route: RouteT;
    }
}

export {};

import { Options, RouteName, RouteWithParams } from '@izzyjs/route/types';

export type AtLeastOne<T, K extends keyof T = keyof T> = K extends keyof T ? Required<Pick<T, K>> & Partial<Omit<T, K>> : never;
export type RouteReturnT = RouteWithParams & { url: string };
export type RouteT = (routeName: RouteName, options?: Options) => RouteReturnT;
export type LinkRouteParamT = RouteName | ((route: (name: RouteName, options?: Options) => RouteReturnT) => RouteReturnT);
export type LinkRoutePropsT = AtLeastOne<{ route: LinkRouteParamT; href: string }>;

export type LinkPropsT = LinkRoutePropsT & {
    onActive?: (isActive: boolean) => void;
} & React.AnchorHTMLAttributes<HTMLAnchorElement> & {
        children: React.ReactNode;
    };

declare global {
    var route: RouteT;
    interface Window {
        route: RouteT;
    }
}

export {};

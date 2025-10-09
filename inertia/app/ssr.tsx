import { createInertiaApp } from '@inertiajs/react';
import { route } from '@izzyjs/route/client';
import ReactDOMServer from 'react-dom/server';
import { RouteT } from '~/types/global';

export default function render(page: any) {
    return createInertiaApp({
        page,
        render: ReactDOMServer.renderToString,
        resolve: (name) => {
            const pages = import.meta.glob('../pages/**/*.tsx', {
                eager: true,
            });
            return pages[`../pages/${name}.tsx`];
        },
        setup: ({ App, props }) => {
            globalThis.route = route as RouteT;
            return <App {...props} />;
        },
    });
}

/// <reference path="../../adonisrc.ts" />
/// <reference path="../../config/inertia.ts" />

import { resolvePageComponent } from '@adonisjs/inertia/helpers';
import { createInertiaApp } from '@inertiajs/react';
import { route } from '@izzyjs/route/client';
import { hydrateRoot } from 'react-dom/client';
import { RouteT } from '~/types/global';
import '../css/app.css';

// const appName = import.meta.env.VITE_APP_NAME || 'AdonisJS';

createInertiaApp({
    progress: { color: '#5468FF' },

    // title: (title) => `${title} - ${appName}`,
    title: (title) => `${title}`,

    resolve: (name) => {
        return resolvePageComponent(`../pages/${name}.tsx`, import.meta.glob('../pages/**/*.tsx'));
    },

    setup({ el, App, props }) {
        globalThis.route = route as unknown as RouteT;
        hydrateRoot(el, <App {...props} />);
    },
});

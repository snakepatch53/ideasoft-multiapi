import { getDirname } from '@adonisjs/core/helpers';
import inertia from '@adonisjs/inertia/client';
import adonisjs from '@adonisjs/vite/client';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
    server: {
        host: true, // permite conexiones externas (necesario si estás en un VPS)
        allowedHosts: ['api.ideasoft.site'], // 👈 agrega tu dominio o subdominio
        port: 5173, // o el puerto donde estés corriendo Vite
    },
    plugins: [
        tailwindcss(),
        inertia({ ssr: { enabled: true, entrypoint: 'inertia/app/ssr.tsx' } }),
        react(),
        adonisjs({
            entrypoints: ['inertia/app/app.tsx'],
            reload: ['resources/views/**/*.edge'],
        }),
    ],

    /**
     * Define aliases for importing modules from
     * your frontend code
     */
    resolve: {
        alias: {
            '~/': `${getDirname(import.meta.url)}/inertia/`,
            '@': `${getDirname(import.meta.url)}/inertia/`,
        },
    },
});

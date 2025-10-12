import type { InfoT } from '@/types';
import { usePage } from '@inertiajs/react';
import Link from '../Link';

export default function Header() {
    const { info } = usePage<{ info: InfoT }>().props;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-lg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between py-4">
                    <Link route="landing.home" className="flex items-center space-x-2">
                        <img src={info.logo} alt="Logo" className="size-8" />
                        <span className="text-xl font-bold text-white">{info.name}</span>
                    </Link>
                    <nav className="hidden space-x-8 md:flex">
                        <a href="#services" className="text-white/80 transition-colors hover:text-white">
                            Servicios
                        </a>
                        <a href="#features" className="text-white/80 transition-colors hover:text-white">
                            Características
                        </a>
                        <a href="#pricing" className="text-white/80 transition-colors hover:text-white">
                            Precios
                        </a>
                        <a href="#contact" className="text-white/80 transition-colors hover:text-white">
                            Contacto
                        </a>
                    </nav>
                    <div className="flex space-x-4">
                        <Link route="dashboard.login" className="flex items-center text-white/80 transition-colors hover:text-white">
                            Iniciar Sesión
                        </Link>
                        <Link
                            route="dashboard.login"
                            className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-white transition-all hover:from-blue-700 hover:to-cyan-700"
                        >
                            Comenzar Gratis
                        </Link>
                    </div>
                </div>
            </div>
        </header>
    );
}

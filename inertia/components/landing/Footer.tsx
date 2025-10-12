import type { InfoT } from '@/types';
import { usePage } from '@inertiajs/react';

export default function Footer() {
    const { info } = usePage<{ info: InfoT }>().props;

    return (
        <footer className="bg-black/40 px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <div className="mb-4 flex items-center space-x-2">
                            <img src={info.logo} alt="Logo" className="h-8 w-8" />
                            <span className="text-xl font-bold text-white">MultiAPI</span>
                        </div>
                        <p className="text-white/60">La plataforma de APIs más completa para desarrolladores modernos.</p>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold text-white">Servicios</h4>
                        <ul className="space-y-2 text-white/60">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Inteligencia Artificial
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Sistema de Reviews
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Servicios de Email
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    WebSockets
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold text-white">Recursos</h4>
                        <ul className="space-y-2 text-white/60">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Documentación
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Guías
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Soporte
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 font-semibold text-white">Empresa</h4>
                        <ul className="space-y-2 text-white/60">
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Acerca de
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Contacto
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Carreras
                                </a>
                            </li>
                            <li>
                                <a href="#" className="transition-colors hover:text-white">
                                    Privacidad
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-white/10 pt-8 text-center text-white/60">
                    <p>&copy; 2025 MultiAPI. Todos los derechos reservados.</p>
                </div>
            </div>
        </footer>
    );
}

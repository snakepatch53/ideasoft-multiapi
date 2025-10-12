import Link from '@/components/Link';
import LandingLayout from '@/layouts/LandingLayout';
import { motion } from 'framer-motion';
import { AlertTriangle, ArrowLeft, Home } from 'lucide-react';

export default function NotFound({ error = { status: 500 } }) {
    const formatError = (text?: string) => {
        return text.split('').map((part, index) =>
            index !== 0 && index !== text.length - 1 ? (
                <span key={index} className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    {part}
                </span>
            ) : (
                part
            )
        );
    };

    return (
        <LandingLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                {/* Hero Section */}
                <section className="flex min-h-screen items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            {/* Error Icon */}
                            <div className="mb-8 flex justify-center">
                                <div className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 p-6">
                                    <AlertTriangle className="h-16 w-16 text-white" />
                                </div>
                            </div>
                            {/* Error Code */}
                            <div className="mb-6">
                                <h1 className="text-8xl font-bold text-white md:text-9xl lg:text-[12rem]">{formatError(String(error.status))}</h1>
                            </div>
                            {/* Error Message */}
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl">Página No Encontrada</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/80 md:text-2xl">
                                Lo sentimos, la página que estás buscando no existe o ha sido movida. Pero no te preocupes, podemos ayudarte a
                                encontrar lo que necesitas.
                            </p>
                            {/* Action Buttons */}
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Link
                                    route="landing.home"
                                    className="flex transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:from-blue-700 hover:to-cyan-700"
                                >
                                    <Home className="mr-2 size-5" />
                                    Ir al Inicio
                                </Link>
                                <button
                                    onClick={() => window.history.back()}
                                    className="flex items-center justify-center rounded-lg border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10"
                                >
                                    <ArrowLeft className="mr-2 size-5" />
                                    Volver Atrás
                                </button>
                            </div>
                        </motion.div>
                        {/* Helpful Links */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="mt-16"
                        >
                            <h3 className="mb-6 text-xl font-semibold text-white">Enlaces Útiles</h3>
                            <div className="flex flex-col gap-4 sm:flex-row">
                                {[
                                    { as: Link, name: 'Inicio', desc: 'Página principal', href: route('landing.home').url },
                                    { as: 'a', name: 'Documentación', desc: 'Guías y tutoriales', href: '/docs' },
                                    { as: Link, name: 'Dashboard', desc: 'Accede a tu cuenta', href: route('dashboard.login').url },
                                ].map((item) => (
                                    <item.as
                                        key={item.name}
                                        href={item.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 rounded-lg border border-white/10 bg-white/5 p-4 text-white/80 backdrop-blur-lg transition-all hover:bg-white/10 hover:text-white"
                                    >
                                        <div className="mb-2 text-lg font-semibold">{item.name}</div>
                                        <div className="text-sm">{item.desc}</div>
                                    </item.as>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </section>
            </div>
        </LandingLayout>
    );
}

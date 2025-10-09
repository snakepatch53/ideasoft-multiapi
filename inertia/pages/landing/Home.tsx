import { motion } from 'framer-motion';
import { ArrowRight, Bot, CheckCircle, Clock, Code, Globe, Mail, Shield, Smartphone, Star, Users, Zap } from 'lucide-react';
import LandingLayout from '~/layouts/LandingLayout';
import { asset } from '~/lib/utils';

const services = [
    {
        icon: Bot,
        title: 'Inteligencia Artificial',
        description: 'APIs avanzadas de IA para análisis de texto, generación de contenido y procesamiento de lenguaje natural.',
        features: ['Análisis de sentimientos', 'Generación de texto', 'Procesamiento NLP', 'Modelos personalizados'],
    },
    {
        icon: Star,
        title: 'Sistema de Reviews',
        description: 'Gestión completa de reseñas y calificaciones con análisis de sentimientos y moderación automática.',
        features: ['Moderación automática', 'Análisis de sentimientos', 'API RESTful', 'Dashboard en tiempo real'],
    },
    {
        icon: Mail,
        title: 'Servicios de Email',
        description: 'Envío masivo de emails, templates personalizables y tracking avanzado de campañas.',
        features: ['Templates responsivos', 'Tracking de aperturas', 'Listas de contactos', 'Automatización'],
    },
    {
        icon: Zap,
        title: 'WebSockets en Tiempo Real',
        description: 'Comunicación bidireccional instantánea similar a Pusher para aplicaciones en tiempo real.',
        features: ['Canales privados', 'Presencia de usuarios', 'Broadcasting', 'Escalabilidad automática'],
    },
];
const features = [
    {
        icon: Shield,
        title: 'Seguridad Avanzada',
        description: 'Autenticación robusta y encriptación de extremo a extremo',
    },
    {
        icon: Code,
        title: 'APIs RESTful',
        description: 'Documentación completa y SDKs para múltiples lenguajes',
    },
    {
        icon: Users,
        title: 'Escalabilidad',
        description: 'Infraestructura que crece con tu aplicación',
    },
    {
        icon: Globe,
        title: 'Global CDN',
        description: 'Baja latencia desde cualquier parte del mundo',
    },
    {
        icon: Smartphone,
        title: 'Mobile First',
        description: 'Optimizado para aplicaciones móviles y web',
    },
    {
        icon: Clock,
        title: '99.9% Uptime',
        description: 'Disponibilidad garantizada con monitoreo 24/7',
    },
];
const plans = [
    {
        name: 'Starter',
        price: '$0',
        description: 'Perfecto para proyectos pequeños',
        features: ['10,000 requests/mes', '2 servicios incluidos', 'Soporte por email', 'Documentación básica'],
        popular: false,
    },
    {
        name: 'Professional',
        price: '$0',
        description: 'Para aplicaciones en crecimiento',
        features: ['100,000 requests/mes', 'Todos los servicios', 'Soporte prioritario', 'Analytics avanzado', 'Webhooks personalizados'],
        popular: true,
    },
    {
        name: 'Enterprise',
        price: 'Custom',
        description: 'Soluciones empresariales',
        features: ['Requests ilimitados', 'SLA garantizado', 'Soporte 24/7', 'Implementación personalizada', 'Consultoría técnica'],
        popular: false,
    },
];

export default function Home({ test }) {
    console.log(test);

    return (
        <LandingLayout>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                {/* Header */}
                <header className="fixed top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-lg">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between py-4">
                            <div className="flex items-center space-x-2">
                                <img src={asset('info/logo.webp')} alt="Logo" className="h-8 w-8" />
                                <span className="text-xl font-bold text-white">MultiAPI</span>
                            </div>
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
                                <button className="text-white/80 transition-colors hover:text-white">Iniciar Sesión</button>
                                <button className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-2 text-white transition-all hover:from-blue-700 hover:to-cyan-700">
                                    Comenzar Gratis
                                </button>
                            </div>
                        </div>
                    </div>
                </header>
                {/* Hero Section */}
                <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <h1 className="mb-6 text-4xl font-bold text-white md:text-6xl lg:text-7xl">
                                Una API para
                                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> Todo</span>
                            </h1>
                            <p className="mx-auto mb-8 max-w-3xl text-xl text-white/80 md:text-2xl">
                                Integra IA, reviews, emails y comunicación en tiempo real en una sola plataforma. Desarrolla más rápido, escala sin
                                límites.
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <button className="flex transform items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:scale-105 hover:from-blue-700 hover:to-cyan-700">
                                    Comenzar Gratis <ArrowRight className="ml-2 h-5 w-5" />
                                </button>
                                <button className="rounded-lg border border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10">
                                    Ver Documentación
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
                {/* Services Section */}
                <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Servicios Potentes</h2>
                            <p className="mx-auto max-w-3xl text-xl text-white/80">
                                Cada servicio está diseñado para integración perfecta y máximo rendimiento
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2">
                            {services.map((service, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-lg transition-all hover:bg-white/10"
                                >
                                    <div className="mb-6 flex items-center">
                                        <div className="rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 p-3">
                                            <service.icon className="h-8 w-8 text-white" />
                                        </div>
                                        <h3 className="ml-4 text-2xl font-bold text-white">{service.title}</h3>
                                    </div>
                                    <p className="mb-6 text-white/80">{service.description}</p>
                                    <ul className="space-y-2">
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-white/70">
                                                <CheckCircle className="mr-2 h-4 w-4 text-green-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Features Section */}
                <section id="features" className="bg-black/20 px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">¿Por qué Elegirnos?</h2>
                            <p className="mx-auto max-w-3xl text-xl text-white/80">
                                Tecnología de vanguardia con la confiabilidad que tu negocio necesita
                            </p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                            {features.map((feature, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className="text-center"
                                >
                                    <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-gradient-to-r from-blue-600 to-cyan-600 p-4">
                                        <feature.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-white">{feature.title}</h3>
                                    <p className="text-white/80">{feature.description}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* Pricing Section */}
                <section id="pricing" className="px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="mb-16 text-center"
                        >
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">Precios Transparentes</h2>
                            <p className="mx-auto max-w-3xl text-xl text-white/80">Planes diseñados para cada etapa de tu crecimiento</p>
                        </motion.div>

                        <div className="grid gap-8 md:grid-cols-3">
                            {plans.map((plan, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.8, delay: index * 0.1 }}
                                    className={`relative rounded-2xl border bg-white/5 p-8 backdrop-blur-lg ${
                                        plan.popular ? 'border-purple-500 ring-2 ring-purple-500/20' : 'border-white/10'
                                    }`}
                                >
                                    {plan.popular && (
                                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 transform">
                                            <span className="rounded-full bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-1 text-sm font-semibold text-white">
                                                Más Popular
                                            </span>
                                        </div>
                                    )}
                                    <div className="mb-8 text-center">
                                        <h3 className="mb-2 text-2xl font-bold text-white">{plan.name}</h3>
                                        <div className="mb-2 text-4xl font-bold text-white">
                                            {plan.price}
                                            {plan.price !== 'Custom' && <span className="text-lg text-white/60">/mes</span>}
                                        </div>
                                        <p className="text-white/80">{plan.description}</p>
                                    </div>
                                    <ul className="mb-8 space-y-3">
                                        {plan.features.map((feature, featureIndex) => (
                                            <li key={featureIndex} className="flex items-center text-white/80">
                                                <CheckCircle className="mr-3 h-4 w-4 text-green-400" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    <button
                                        className={`w-full rounded-lg py-3 font-semibold transition-all ${
                                            plan.popular
                                                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700'
                                                : 'border border-white/30 text-white hover:bg-white/10'
                                        }`}
                                    >
                                        {plan.price === 'Custom' ? 'Contactar Ventas' : 'Comenzar Ahora'}
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>
                {/* CTA Section */}
                <section className="bg-gradient-to-r from-blue-600 to-cyan-600 px-4 py-20 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-4xl text-center">
                        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
                            <h2 className="mb-6 text-3xl font-bold text-white md:text-5xl">¿Listo para Comenzar?</h2>
                            <p className="mx-auto mb-8 max-w-2xl text-xl text-white/90">
                                Únete a miles de desarrolladores que ya están construyendo el futuro con nuestras APIs
                            </p>
                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <button className="transform rounded-lg bg-white px-8 py-4 text-lg font-semibold text-blue-600 transition-all hover:scale-105 hover:bg-gray-100">
                                    Empezar Gratis
                                </button>
                                <button className="rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-white/10">
                                    Hablar con Ventas
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </section>
                {/* Footer */}
                <footer className="bg-black/40 px-4 py-12 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-7xl">
                        <div className="grid gap-8 md:grid-cols-4">
                            <div>
                                <div className="mb-4 flex items-center space-x-2">
                                    <img src={asset('info/logo.webp')} alt="Logo" className="h-8 w-8" />
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
            </div>
        </LandingLayout>
    );
}

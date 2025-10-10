import router from '@adonisjs/core/services/router';
const LandingController = () => import('#controllers/landing_controller');

// router.on('/').renderInertia('landing/Home').as('landing.home');

router
    .group(() => {
        router.get('/', [LandingController, 'home']).as('home');
    })
    .prefix('/')
    .as('landing');

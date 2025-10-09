import router from '@adonisjs/core/services/router';

const DashboardController = () => import('#controllers/dashboard_controller');

router
    .group(() => {
        router.get('/', [DashboardController, 'home']).as('home');
    })
    .prefix('/dashboard')
    .as('dashboard');

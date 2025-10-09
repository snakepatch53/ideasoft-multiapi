import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const DashboardController = () => import('#controllers/dashboard_controller');

router
    .group(() => {
        router.get('/', [DashboardController, 'home']).as('home');
    })
    .prefix('/dashboard')
    .as('dashboard')
    .middleware([middleware.auth()]);

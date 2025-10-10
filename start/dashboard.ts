import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const DashboardController = () => import('#controllers/dashboard_controller');
const UsersController = () => import('#controllers/users_controller');

router
    .group(() => {
        router.get('/', [DashboardController, 'home']).as('home');
    })
    .prefix('/dashboard')
    .as('dashboard')
    .middleware([middleware.auth()]);

router
    .group(() => {
        router.get('/login', [DashboardController, 'login']).as('login');
        router.post('/login', [UsersController, 'login']).as('auth');
    })
    .prefix('/dashboard')
    .as('dashboard')
    .middleware([middleware.guest()]);

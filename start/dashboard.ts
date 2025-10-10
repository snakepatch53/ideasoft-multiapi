import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const DashboardController = () => import('#controllers/dashboard_controller');
const InfosController = () => import('#controllers/infos_controller');
const UsersController = () => import('#controllers/users_controller');
const ApiUsersController = () => import('#controllers/api_users_controller');

router
    .group(() => {
        // nav routes
        router.get('/', [DashboardController, 'home']).as('home');
        router.get('/users', [DashboardController, 'users']).as('users');
        router.get('/api_users', [DashboardController, 'api_users']).as('api_users');
        // service routes
        router.post('/logout', [UsersController, 'logout']).as('logout');
        router.resource('crud_users', UsersController).as('crud_users');
        router.resource('crud_api_users', ApiUsersController).as('crud_api_users');
    })
    .prefix('/dashboard')
    .as('dashboard')
    .middleware([middleware.shield(), middleware.auth()]);

router
    .group(() => {
        // nav routes
        router.get('/login', [DashboardController, 'login']).as('login');
        // service routes
        router.post('/login', [UsersController, 'login']).as('auth');
        router.post('/info/update', [InfosController, 'update']).as('crud-info.update');
    })
    .prefix('/dashboard')
    .as('dashboard')
    .middleware([middleware.shield(), middleware.guest()]);

import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const ApiController = () => import('#controllers/api_controller');
router
    .group(() => {
        router.post('/ia', [ApiController, 'ia']).as('ia');
    })
    .prefix('/api')
    .as('api')
    .middleware([middleware.api()]);

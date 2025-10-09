import type { HttpContext } from '@adonisjs/core/http';

export default class DashboardController {
    public async home({ inertia }: HttpContext) {
        return inertia.render('dashboard/Home', {
            info: {
                favicon: 'storage/info/favicon.webp',
                logo: 'storage/info/logo.png',
            },
            auth: {
                user: {
                    id: 1,
                    name: 'John Doe',
                    email: 'john.doe@example.com',
                },
            },
        });
    }
}

import type { HttpContext } from '@adonisjs/core/http';

export default class DashboardController {
    public async home({ inertia }: HttpContext) {
        return inertia.render('dashboard/Home');
    }
}

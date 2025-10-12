import type { HttpContext } from '@adonisjs/core/http';

export default class LandingController {
    public async home({ inertia }: HttpContext) {
        return inertia.render('landing/Home');
    }
}

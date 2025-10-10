import User from '#models/user';
import { loginValidator } from '#validators/user';
import type { HttpContext } from '@adonisjs/core/http';
import hash from '@adonisjs/core/services/hash';

export default class UsersController {
    public async login({ request, auth, response, session }: HttpContext) {
        const { email, password } = await loginValidator.validate(request.all());
        const user = await User.findBy('email', email);
        if (!user) {
            session.flashErrors({ email: ['These credentials do not match our records.'] });
            return response.redirect().back();
        }
        if (!(await hash.verify(user.password, password))) {
            session.flashErrors({ email: ['These credentials do not match our records.'] });
            return response.redirect().back();
        }
        await auth.use('web').login(user);
        return response.redirect().toRoute('dashboard.home');
    }
}

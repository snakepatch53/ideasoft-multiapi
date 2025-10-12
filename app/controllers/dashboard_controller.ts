import ApiUser from '#models/api_user';
import User from '#models/user';
import { InfoFormatService } from '#services/info_format_service';
import type { HttpContext } from '@adonisjs/core/http';

export default class DashboardController {
    public async login({ inertia }: HttpContext) {
        return inertia.render('dashboard/Login');
    }

    public async home({ inertia }: HttpContext) {
        const [infos, info] = await InfoFormatService.format(null, false);
        return inertia.render('dashboard/Home', { infos, info });
    }

    public async users({ inertia }: HttpContext) {
        const users = await User.query().orderBy('id', 'asc');
        return inertia.render('dashboard/Users', { users });
    }

    public async api_users({ inertia }: HttpContext) {
        const apiUsers = await ApiUser.query().orderBy('id', 'asc');
        return inertia.render('dashboard/ApiUsers', { apiUsers });
    }
}

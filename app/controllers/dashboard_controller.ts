import ApiUser from '#models/api_user';
import User from '#models/user';
import { InfoFormatService } from '#services/info_format_service';
import type { HttpContext } from '@adonisjs/core/http';

export default class DashboardController {
    public async login({ inertia }: HttpContext) {
        const [, info] = await InfoFormatService.format(null, false);
        return inertia.render('dashboard/Login', { info });
    }

    public async home({ inertia, auth }: HttpContext) {
        const [infos, info] = await InfoFormatService.format(null, false);
        return inertia.render('dashboard/Home', { infos, info, user: auth.user });
    }

    public async users({ inertia, auth }: HttpContext) {
        const [infos, info] = await InfoFormatService.format(null, false);
        const users = await User.query().orderBy('id', 'asc');
        return inertia.render('dashboard/Users', { infos, info, users, user: auth.user });
    }

    public async api_users({ inertia, auth }: HttpContext) {
        const [infos, info] = await InfoFormatService.format(null, false);
        const apiUsers = await ApiUser.query().orderBy('id', 'asc');
        return inertia.render('dashboard/ApiUsers', { infos, info, apiUsers, user: auth.user });
    }
}

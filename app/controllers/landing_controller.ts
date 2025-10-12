import { InfoFormatService } from '#services/info_format_service';
import type { HttpContext } from '@adonisjs/core/http';

export default class LandingController {
    public async home({ inertia }: HttpContext) {
        const [, info] = await InfoFormatService.format(null, false);
        return inertia.render('landing/Home', { info });
    }
}

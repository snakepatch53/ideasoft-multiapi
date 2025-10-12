import { InfoFormatService } from '#services/info_format_service';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class ShareInertiaDataMiddleware {
    async handle({ inertia }: HttpContext, next: NextFn) {
        const [, info] = await InfoFormatService.format(null, false);
        inertia.share({ info });
        await next();
    }
}

import ApiUser from '#models/api_user';
import type { HttpContext } from '@adonisjs/core/http';
import type { NextFn } from '@adonisjs/core/types/http';

export default class ApiMiddleware {
    async handle(ctx: HttpContext, next: NextFn) {
        const { request, response } = ctx;
        request.headers()['accept'] = 'application/json';
        request.headers()['content-type'] = 'application/json';
        const apiKey = request.header('x-api-key') || request.qs().api_key;
        if (!apiKey) return response.unauthorized({ error: 'API key is required' });
        const apiUser = await ApiUser.findBy('key', apiKey);
        if (!apiUser) return response.unauthorized({ error: 'Invalid API key' });
        ctx.apiUser = apiUser;
        return await next();
    }
}

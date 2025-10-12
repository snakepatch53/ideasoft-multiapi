import User from '#models/user';
import type { Authenticators } from '@adonisjs/auth/types';
import type { HttpContext } from '@adonisjs/core/http';
import router from '@adonisjs/core/services/router';
import type { NextFn } from '@adonisjs/core/types/http';

/**
 * Auth middleware is used authenticate HTTP requests and deny
 * access to unauthenticated users.
 */
export default class AuthMiddleware {
    /**
     * The URL to redirect to, when authentication fails
     */
    redirectTo = router.makeUrl('dashboard.login');

    async handle({ auth, inertia }: HttpContext, next: NextFn, options: { guards?: (keyof Authenticators)[] } = {}) {
        await auth.authenticateUsing(options.guards, { loginRoute: this.redirectTo });
        inertia.share({ user: auth.user as User });
        return next();
    }
}

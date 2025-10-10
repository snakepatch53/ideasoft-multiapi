import ApiUser from '#models/api_user';

declare module '@adonisjs/core/http' {
    export interface HttpContext {
        apiUser: InstanceType<typeof ApiUser>;
    }
}

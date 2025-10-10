import { BaseModel, column, computed } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { PATH } from '../enums/resource_path.js';

export default class ApiUser extends BaseModel {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare logo: string;

    @column()
    declare name: string;

    @column()
    declare key: string;

    @column()
    declare domain: string;

    @column()
    declare origins: string;

    @column()
    declare emails: string;

    @column()
    declare isAdmin: boolean;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime;

    @computed()
    public get logoUrl() {
        if (!this.logo) return `/storage/${PATH.API_USER_LOGOS}/default.webp`;
        else return `/storage/${PATH.API_USER_LOGOS}/${this.logo}`;
    }

    @computed()
    public get originsList() {
        return this.origins
            .split('\n')
            .map((origin) => origin.trim())
            .filter((origin) => origin.length > 0);
    }

    @computed()
    public get emailsList() {
        return this.emails
            .split('\n')
            .map((email) => email.trim())
            .filter((email) => email.length > 0);
    }
}

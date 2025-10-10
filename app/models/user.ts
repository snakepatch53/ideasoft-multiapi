import { withAuthFinder } from '@adonisjs/auth/mixins/lucid';
import { compose } from '@adonisjs/core/helpers';
import hash from '@adonisjs/core/services/hash';
import { BaseModel, column, computed } from '@adonisjs/lucid/orm';
import { DateTime } from 'luxon';
import { PATH } from '../enums/resource_path.js';
import { UserType } from '../enums/user_type.js';

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
    uids: ['email'],
    passwordColumnName: 'password',
});

export default class User extends compose(BaseModel, AuthFinder) {
    @column({ isPrimary: true })
    declare id: number;

    @column()
    declare photo: string | null;

    @column()
    declare fullName: string | null;

    @column()
    declare email: string;

    @column({ serializeAs: null })
    declare password: string;

    @column()
    declare type: UserType;

    @column.dateTime({ autoCreate: true })
    declare createdAt: DateTime;

    @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare updatedAt: DateTime | null;

    @computed()
    public get photoUrl() {
        if (!this.photo) return `/storage/${PATH.USER_PHOTOS}/default.webp`;
        else return `/storage/${PATH.USER_PHOTOS}/${this.photo}`;
    }
}

import { BaseSchema } from '@adonisjs/lucid/schema';
import { UserType } from '../../app/enums/user_type.js';

export default class extends BaseSchema {
    protected tableName = 'users';

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id').notNullable();
            table.string('photo').nullable();
            table.string('full_name').nullable();
            table.string('email', 254).notNullable();
            table.string('password').notNullable();
            table.enum('type', Object.values(UserType)).notNullable().defaultTo(UserType.ADMIN);
            table.timestamp('created_at').notNullable();
            table.timestamp('updated_at').nullable();
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}

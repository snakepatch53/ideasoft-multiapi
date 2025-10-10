import { BaseSchema } from '@adonisjs/lucid/schema';

export default class extends BaseSchema {
    protected tableName = 'api_users';

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');

            table.string('logo');
            table.string('name');
            table.string('key', 191).unique();
            table.text('domain');
            table.text('origins');
            table.text('emails');
            table.boolean('is_admin').defaultTo(false);

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}

import { BaseSchema } from '@adonisjs/lucid/schema';
import { InfoType } from '../../app/enums/info_type.js';

export default class extends BaseSchema {
    protected tableName = 'infos';

    async up() {
        this.schema.createTable(this.tableName, (table) => {
            table.increments('id');

            table.enum('type', Object.values(InfoType)).notNullable().defaultTo(InfoType.TEXT);
            table.string('label');
            table.string('field');
            table.string('value').nullable();

            table.timestamp('created_at');
            table.timestamp('updated_at');
        });
    }

    async down() {
        this.schema.dropTable(this.tableName);
    }
}

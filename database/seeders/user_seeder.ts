import User from '#models/user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
    async run() {
        User.createMany([
            {
                fullName: 'Admin',
                email: 'admin@admin.com',
                password: 'admin',
            },
        ]);
    }
}

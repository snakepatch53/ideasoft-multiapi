import User from '#models/user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
    async run() {
        User.createMany([
            {
                fullName: 'Harold Hernández',
                email: 'snakepatch53@gmail.com',
                password: process.env.USER_PASSWORD,
            },
        ]);
    }
}

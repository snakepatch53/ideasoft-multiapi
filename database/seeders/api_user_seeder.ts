import ApiUser from '#models/api_user';
import { BaseSeeder } from '@adonisjs/lucid/seeders';

export default class extends BaseSeeder {
    async run() {
        ApiUser.createMany([
            {
                name: 'Ideasoft',
                key: 'MdKczLiTV6kr2F0XaYjH5su7AhdhVfJa',
                domain: 'https://ideasoft.site',
                origins: 'https://api.ideasoft.site\nhttps://ideasoft.site\nhttp://localhost:3333',
                emails: 'latinosupp@gmail.com',
                isAdmin: true,
            },
            {
                logo: 'lbsupport.webp',
                name: 'Latin Business Support',
                key: 'xTvRDxbh2hbIZ1BMrQYzGDuY2y6Q9TSP',
                domain: 'https://lbs.bz',
                origins: 'https://lbs.bz\nhttps://lbsupport.com\nhttp://localhost:3333',
                emails: 'latinosupp@gmail.com',
            },
            {
                logo: 'moronanet.webp',
                name: 'Moronanet',
                key: '5JRpz6KtUgnCzRWRNUX4lcWw8jdXWL7g',
                domain: 'https://moronanet.com',
                origins: 'https://moronanet.com\nhttp://localhost:3333',
                emails: 'info@moronanet.com',
            },
        ]);
    }
}

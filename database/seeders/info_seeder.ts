import Info from '#models/info';
import { BaseSeeder } from '@adonisjs/lucid/seeders';
import { InfoType } from '../../app/enums/info_type.js';

export default class extends BaseSeeder {
    async run() {
        Info.createMany([
            { label: 'Logo', field: 'logo', type: InfoType.IMAGE },
            { label: 'Favicon', field: 'favicon', type: InfoType.IMAGE },

            { label: 'Name', field: 'name', value: process.env.APP_NAME || '' },
            { label: 'Phone', field: 'phone', value: '+593 959 999 086' },
            { label: 'Email', field: 'email', value: 'info@ideasoft.site' },
            { label: 'Address', field: 'address', value: 'Barrio 27 de Febrero, Macas, Morona Santiago, Ecuador' },
        ]);
    }
}

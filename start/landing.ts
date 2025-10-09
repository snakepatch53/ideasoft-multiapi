import { cuid } from '@adonisjs/core/helpers';
import router from '@adonisjs/core/services/router';

router.on('/').renderInertia('landing/Home').as('landing.home');

router
    .post('/upload', async ({ request, response }) => {
        const file = request.file('file');
        if (!file) return response.status(400).send('No file uploaded');
        const image = request.file('file', {
            size: '2mb',
            extnames: ['jpeg', 'jpg', 'png'],
        });
        if (!image) return response.badRequest({ error: 'Image missing' });
        const key = `uploads/${cuid()}.${image.extname}`;
        await image.moveToDisk(key);
        return response.redirect().back();
    })
    .as('upload');

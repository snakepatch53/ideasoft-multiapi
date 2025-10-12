import { openapiSpecification } from '#config/swagger';
import router from '@adonisjs/core/services/router';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import swaggerUiDist from 'swagger-ui-dist';

const swaggerDistPath = swaggerUiDist.getAbsoluteFSPath();
const swaggerIndexPath = path.join(swaggerDistPath, 'index.html');

router.get('/swagger.json', async ({ response }) => {
    response.header('Content-Type', 'application/json');
    response.send(openapiSpecification);
});

router.get('/docs', async ({ response }) => {
    let html = await readFile(swaggerIndexPath, 'utf-8');
    html += `<script>window.onload = function() {const ui = SwaggerUIBundle({url: "/swagger.json",dom_id: '#swagger-ui',presets: [SwaggerUIBundle.presets.apis,SwaggerUIStandalonePreset],layout: "StandaloneLayout"});};</script>`;
    html = html.replace('<head>', '<head><base href="/docs/">');
    response.header('Content-Type', 'text/html');
    response.send(html);
});

router.get('/docs/*', async ({ params, response }) => {
    const fileName = Array.isArray(params['*']) ? params['*'].join('/') : params['*'];
    console.log(fileName);
    const filePath = path.join(swaggerDistPath, fileName);
    try {
        const file = await readFile(filePath);
        response.type(path.extname(fileName));
        response.send(file);
    } catch {
        response.notFound('Archivo no encontrado');
    }
});

router.get('/swagger-ui.css', async ({ response }) => {
    const filePath = path.join(swaggerDistPath, 'swagger-ui.css');
    const file = await readFile(filePath);
    response.type('text/css').send(file);
});

router.get('/index.css', async ({ response }) => {
    const filePath = path.join(swaggerDistPath, 'index.css');
    const file = await readFile(filePath);
    response.type('text/css').send(file);
});

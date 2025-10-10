import router from '@adonisjs/core/services/router';
import { middleware } from './kernel.js';

const ApiController = () => import('#controllers/api_controller');
router
    .group(() => {
        router.post('/ia', [ApiController, 'ia']).as('ia');
    })
    .prefix('/api')
    .as('api')
    .middleware([middleware.api()]);

// const messages: { role: 'user' | 'assistant'; content: string }[] = [];
// router
//     .get('/ollama', async function ({ inertia }) {
//         return inertia.render('Ollama', { messages });
//     })
//     .as('ollama');

// router
//     .post('/message', async function ({ request, response }) {
//         const userMessage = request.input('message');
//         const model = request.input('model', 'gemma:2b');
//         messages.push({ role: 'user', content: userMessage });
//         const ollamaResponse = await ollama.chat({ model, messages, stream: true });
//         let messageContent = '';
//         for await (const part of ollamaResponse) if (part.message?.content) messageContent += part.message.content;
//         messages.push({ role: 'assistant', content: messageContent });
//         return response.redirect().back();
//     })
//     .as('message');

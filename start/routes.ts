import router from '@adonisjs/core/services/router';
import ollama from 'ollama';

const DashboardController = () => import('#controllers/dashboard_controller');

// router.on('/').renderInertia('home');

const messages = [];
// let model = 'gpt-oss:120b-cloud';

router.get('/', async function ({ inertia }) {
    return inertia.render('Ollama', { messages, model: 'gpt-oss:120b-cloud' });
});

router.post('/message', async function ({ request, response }) {
    const userMessage = request.input('message');
    // model = request.input('model');
    messages.push({ role: 'user', content: userMessage });
    const ollamaResponse = await ollama.chat({ model: 'gpt-oss:120b-cloud', messages, stream: true });
    let messageContent = '';
    for await (const part of ollamaResponse) if (part.message?.content) messageContent += part.message.content;
    messages.push({ role: 'assistant', content: messageContent });
    return response.redirect().back();
});

router
    .group(() => {
        router.get('/', [DashboardController, 'home']).as('dashboard');
    })
    .prefix('/dashboard');

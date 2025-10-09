import router from '@adonisjs/core/services/router';
import ollama from 'ollama';

const DashboardController = () => import('#controllers/dashboard_controller');

// router.on('/').renderInertia('home');

const messages = [];

router.get('/', async function ({ inertia }) {
    return inertia.render('Ollama', { messages });
});

router.post('/message', async function ({ request, response }) {
    const userMessage = request.input('message');
    const model = request.input('model', 'gemma:2b');
    messages.push({ role: 'user', content: userMessage });
    const ollamaResponse = await ollama.chat({ model, messages, stream: true });
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

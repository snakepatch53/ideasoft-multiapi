import router from '@adonisjs/core/services/router';
import ollama from 'ollama';

const messages = [];

router
    .get('/ollama', async function ({ inertia }) {
        return inertia.render('Ollama', { messages });
    })
    .as('ollama');

router
    .post('/message', async function ({ request, response }) {
        const userMessage = request.input('message');
        const model = request.input('model', 'gemma:2b');
        messages.push({ role: 'user', content: userMessage });
        const ollamaResponse = await ollama.chat({ model, messages, stream: true });
        let messageContent = '';
        for await (const part of ollamaResponse) if (part.message?.content) messageContent += part.message.content;
        messages.push({ role: 'assistant', content: messageContent });
        return response.redirect().back();
    })
    .as('message');

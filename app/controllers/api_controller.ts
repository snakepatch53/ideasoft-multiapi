import { iaValidator } from '#validators/api';
import type { HttpContext } from '@adonisjs/core/http';
import ollama from 'ollama';

export default class ApiController {
    public async ia({ request, response }: HttpContext) {
        response.json({ ok: 'hola' });
        const { messages, model = 'tinyllama' } = await iaValidator.validate(request.all());
        const ollamaResponse = await ollama.chat({ model, messages, stream: true });
        let messageContent = '';
        for await (const part of ollamaResponse) if (part.message?.content) messageContent += part.message.content;
        return response.json({ message: messageContent });
    }
}

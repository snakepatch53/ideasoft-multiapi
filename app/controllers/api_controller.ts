import { iaValidator } from '#validators/api';
import type { HttpContext } from '@adonisjs/core/http';
import ollama from 'ollama';

export default class ApiController {
    /**
     * @openapi
     * /api/ia:
     *   post:
     *     summary: Generar respuesta de IA
     *     tags:
     *       - IA
     *     security:
     *       - ApiKeyAuth: []
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               messages:
     *                 type: array
     *                 description: Lista de mensajes enviados al modelo
     *                 items:
     *                   type: object
     *                   properties:
     *                     role:
     *                       type: string
     *                       description: Rol del mensaje
     *                       enum: ['system', 'user', 'assistant']
     *                       example: user
     *                     content:
     *                       type: string
     *                       example: Hola IA
     *               model:
     *                 type: string
     *                 description: Modelo a usar
     *                 enum: ['tinyllama', 'gemma:2b', 'gpt-oss:120b-cloud']
     *                 example: 'gpt-oss:120b-cloud'
     *     responses:
     *       200:
     *         description: Respuesta generada por el modelo
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 message:
     *                   type: string
     *                   description: Texto generado por la IA
     *                   example: Hola, ¿cómo estás?
     *                 model:
     *                   type: string
     *                   description: Modelo usado para generar la respuesta
     *                   example: gpt-oss:120b-cloud
     */
    public async ia({ request, response }: HttpContext) {
        const { messages, model = 'gpt-oss:120b-cloud' } = await iaValidator.validate(request.all());
        const ollamaResponse = await ollama.chat({ model, messages, stream: true });
        let messageContent = '';
        for await (const part of ollamaResponse) if (part.message?.content) messageContent += part.message.content;
        return response.json({ message: messageContent, model });
    }
}

import swaggerJsdoc from 'swagger-jsdoc';

export const openapiSpecification = swaggerJsdoc({
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'IdeaSoft MultiAPI',
            version: '1.0.0',
            description: 'API para múltiples modelos de IA utilizando Ollama',
        },
        servers: [
            {
                url: process.env.APP_URL,
                description: 'Servidor Ideasoft MultiAPI',
            },
        ],
        components: {
            securitySchemes: {
                ApiKeyAuth: {
                    type: 'apiKey',
                    in: 'header',
                    name: 'x-api-key',
                    description: 'Clave API para autenticar solicitudes',
                },
            },
        },
    },
    apis: ['app/controllers/**/*', 'start/api.*'],
});

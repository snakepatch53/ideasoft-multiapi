import vine from '@vinejs/vine';

export const iaValidator = vine.compile(
    vine.object({
        messages: vine.array(
            vine.object({
                role: vine.enum(['system', 'user', 'assistant']),
                content: vine.string(),
            })
        ),
        // 'tinyllama' | 'gemma:2b' | 'gpt-oss:120b-cloud'
        model: vine.enum(['tinyllama', 'gemma:2b', 'gpt-oss:120b-cloud']).optional(),
    })
);

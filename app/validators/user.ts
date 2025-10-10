import vine from '@vinejs/vine';

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().trim(),
        password: vine.string().minLength(5).maxLength(30),
        remember: vine.boolean().optional(),
    })
);

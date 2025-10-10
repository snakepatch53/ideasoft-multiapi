import vine from '@vinejs/vine';

export const loginValidator = vine.compile(
    vine.object({
        email: vine.string().email().trim(),
        password: vine.string().minLength(5).maxLength(30),
        remember: vine.boolean().optional(),
    })
);

export const storeValidator = vine.compile(
    vine.object({
        photo: vine.file().optional(),
        fullName: vine.string().minLength(3).maxLength(50).trim(),
        email: vine.string().email().trim(),
        password: vine.string().minLength(5).maxLength(30),
    })
);

export const updateValidator = vine.compile(
    vine.object({
        photo: vine.file().optional(),
        fullName: vine.string().minLength(3).maxLength(50).trim(),
        email: vine.string().email().trim(),
        password: vine.string().minLength(5).maxLength(30).optional(),
    })
);

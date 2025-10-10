import vine from '@vinejs/vine';

export const storeValidator = vine.compile(
    vine.object({
        logo: vine.file(),
        name: vine.string().minLength(3).maxLength(100),
        key: vine.string().minLength(16).maxLength(40),
        domain: vine.string().url(),
        origins: vine.string(),
        emails: vine.string(),
        isAdmin: vine.boolean().optional(),
    })
);

export const updateValidator = vine.compile(
    vine.object({
        logo: vine.file().optional(),
        name: vine.string().minLength(3).maxLength(100),
        key: vine.string().minLength(16).maxLength(40),
        domain: vine.string().url(),
        origins: vine.string(),
        emails: vine.string(),
        isAdmin: vine.boolean().optional(),
    })
);

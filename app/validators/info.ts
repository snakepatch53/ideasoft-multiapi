import vine from '@vinejs/vine';

export const updateValidator = vine.compile(
    vine.object({
        infos: vine.array(
            vine.object({
                id: vine.number().exists(async (db, value) => {
                    const info = await db.from('infos').where('id', value).first();
                    return !!info;
                }),
                type: vine.enum(['image', 'text', 'markdown']),
                label: vine.string().optional(),
                value: vine.any().optional(),
            })
        ),
    })
);

import Info from '#models/info';
import { updateValidator } from '#validators/info';
import type { HttpContext } from '@adonisjs/core/http';

export default class InfosController {
    public async update({ request, session, response }: HttpContext) {
        const { infos } = await updateValidator.validate(request.all());

        const errors: { [key: string]: string[] } = {};

        for (const [index, infoData] of infos.entries()) {
            const info = await Info.find(infoData.id);
            if (!info) {
                session.flashErrors({ [`infos.${index}.value`]: [`Info with id ${infoData.id} not found.`] });
                return response.redirect().back();
            }
            if (info && info.type === 'image' && request.file('value')) {
                // const file = request.file('value');
                // const uploadedFile = await file.move('uploads/info_images', {
                //     name: `${info.id}_${Date.now()}.${file.extname}`,
                //     overwrite: true,
                // });
                // await info.merge({ value: uploadedFile.fileName }).save();
            } else if (info.type === 'text' || info.type === 'markdown') {
                if (!infoData.value || typeof infoData.value !== 'string') {
                    if (!errors[`infos.${index}.value`]) errors[`infos.${index}.value`] = [];
                    errors[`infos.${index}.value`].push(`The field ${infoData.label || 'value'} is required.`);
                } else await info.merge({ value: infoData.value }).save();
            }
        }
        if (Object.keys(errors).length > 0) session.flashErrors(errors);
        return response.redirect().back();
    }
}

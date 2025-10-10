import ApiUser from '#models/api_user';
import { storeValidator, updateValidator } from '#validators/api_user';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import drive from '@adonisjs/drive/services/main';
import { PATH } from '../enums/resource_path.js';

export default class ApiUsersController {
    public async store({ request, response, session }: HttpContext) {
        const data = await storeValidator.validate(request.all());
        const logo = request.file('logo', { size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'gif', 'webp'] });
        const apiUserData = { ...data, logo: '' };
        if (logo) {
            const fileName = `${cuid()}.${logo.extname}`;
            await logo.moveToDisk(`${PATH.API_USER_LOGOS}/${fileName}`);
            apiUserData.logo = fileName;
        }
        await ApiUser.create(apiUserData);
        session.flash('success', 'Api user created successfully');
        return response.redirect().back();
    }

    public async update({ params, request, response, session }: HttpContext) {
        const apiUser = await ApiUser.findOrFail(params.id);
        const data = await updateValidator.validate(request.all());
        const logo = request.file('logo', { size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'gif', 'webp'] });
        const apiUserData = { ...data, logo: apiUser.logo };
        if (logo) {
            if (apiUser.logo) await drive.use('fs').delete(`${PATH.API_USER_LOGOS}/${apiUser.logo}`);
            const fileName = `${cuid()}.${logo.extname}`;
            await logo.moveToDisk(`${PATH.API_USER_LOGOS}/${fileName}`);
            apiUserData.logo = fileName;
        }
        apiUser.merge(apiUserData);
        await apiUser.save();
        session.flash('success', 'Api user updated successfully');
        return response.redirect().back();
    }

    public async destroy({ response, params, session }: HttpContext) {
        const apiUser = await ApiUser.findOrFail(params.id);
        if (apiUser.logo) await drive.use('fs').delete(`${PATH.API_USER_LOGOS}/${apiUser.logo}`);
        await apiUser.delete();
        session.flash('success', 'Api user deleted successfully');
        return response.redirect().back();
    }
}

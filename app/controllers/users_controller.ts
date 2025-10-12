import User from '#models/user';
import { loginValidator, storeValidator, updateValidator } from '#validators/user';
import { cuid } from '@adonisjs/core/helpers';
import type { HttpContext } from '@adonisjs/core/http';
import hash from '@adonisjs/core/services/hash';
import drive from '@adonisjs/drive/services/main';
import { PATH } from '../enums/resource_path.js';

export default class UsersController {
    public async login({ request, auth, response, session }: HttpContext) {
        const { email, password } = await loginValidator.validate(request.all());
        const user = await User.findBy('email', email);
        if (!user) {
            session.flashErrors({ email: ['El usuario no existe.'] });
            return response.redirect().back();
        }
        if (!(await hash.verify(user.password, password))) {
            session.flashErrors({ email: ['Las credenciales no coinciden con nuestros registros.'] });
            return response.redirect().back();
        }
        await auth.use('web').login(user);
        return response.redirect().toRoute('dashboard.home');
    }

    public async logout({ auth, response }: HttpContext) {
        await auth.use('web').logout();
        return response.redirect().toRoute('dashboard.login');
    }

    public async store({ request, response, session }: HttpContext) {
        const data = await storeValidator.validate(request.all());
        const photo = request.file('photo', { size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'gif', 'webp'] });
        const userData = { ...data, password: await hash.make(data.password), photo: '' };
        if (photo) {
            const fileName = `${cuid()}.${photo.extname}`;
            await photo.moveToDisk(`${PATH.USER_PHOTOS}/${fileName}`);
            userData.photo = fileName;
        }
        await User.create(userData);
        session.flash('success', 'User created successfully');
        return response.redirect().back();
    }

    public async update({ request, response, params, session }: HttpContext) {
        const data = await updateValidator.validate(request.all());
        const user = await User.findOrFail(params.id);
        const photo = request.file('photo', { size: '2mb', extnames: ['jpg', 'png', 'jpeg', 'gif', 'webp'] });
        const userData = { ...data, photo: user.photo };
        if (data.password === undefined) delete userData.password;
        else userData.password = await hash.make(data.password);
        if (photo) {
            if (user.photo) await drive.use('fs').delete(`${PATH.USER_PHOTOS}/${user.photo}`);
            const fileName = `${cuid()}.${photo.extname}`;
            await photo.moveToDisk(`${PATH.USER_PHOTOS}/${fileName}`);
            userData.photo = fileName;
        }
        await user.merge(userData).save();
        session.flash('success', 'User updated successfully');
        return response.redirect().back();
    }

    public async destroy({ response, params, session }: HttpContext) {
        const user = await User.findOrFail(params.id);
        if (user.photo) await drive.use('fs').delete(`${PATH.USER_PHOTOS}/${user.photo}`);
        await user.delete();
        session.flash('success', 'User deleted successfully');
        return response.redirect().back();
    }
}

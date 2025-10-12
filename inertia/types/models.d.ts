import ApiUser from '#models/api_user';
import User from '#models/user';

export type UserT = Pick<User, 'photo' | 'id' | 'fullName' | 'email' | 'password' | 'photoUrl' | 'type'>;
export type ApiUserT = Pick<
    ApiUser,
    'id' | 'logo' | 'name' | 'key' | 'domain' | 'origins' | 'emails' | 'isAdmin' | 'logoUrl' | 'originsList' | 'emailsList'
>;

export type InfosT = {
    id: number;
    label: string;
    type: string;
    field: string;
    value: string;
    formatted: string;
};

export type InfoT = {
    favicon: string;
    logo: string;
    name: string;
    phone: string;
    email: string;
    address: string;
};

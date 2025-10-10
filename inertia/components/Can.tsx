import { usePage } from '@inertiajs/react';

type CanProps = {
    permission: string | string[];
    children: React.ReactNode;
};

export default function Can({ permission, children }: CanProps) {
    const { permissions } = usePage().props as unknown as { permissions: { [key: string]: boolean } };
    // console.log(permissions);
    if (!permissions || typeof permissions !== 'object' || Object.keys(permissions).length === 0) return null;
    const permissionList = Array.isArray(permission) ? permission : [permission];
    const hasSomePermission = permissionList.some((perm) => {
        if (!(perm in permissions)) {
            console.error(`[Can] The permission "${perm}" does not exist. Available permissions: ${Object.keys(permissions).join(', ')}`);
            return false;
        }
        return permissions[perm];
    });
    if (!hasSomePermission) return null;
    return <>{children}</>;
}

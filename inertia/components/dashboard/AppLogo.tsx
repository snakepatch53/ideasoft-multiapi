import type { InfoT } from '@/types';
import { usePage } from '@inertiajs/react';
import AppLogoIcon from './AppLogoIcon';

export default function AppLogo() {
    const { info } = usePage<{ info: InfoT }>().props;

    return (
        <>
            <div className="flex aspect-square size-8 items-center justify-center rounded-md border">
                <AppLogoIcon className="size-5 fill-current text-white dark:text-black" />
            </div>
            <div className="ml-1 grid flex-1 text-left text-sm">
                <span className="mb-0.5 truncate leading-none font-semibold">{info.name}</span>
            </div>
        </>
    );
}

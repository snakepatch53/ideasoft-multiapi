import * as CustomIcons from '@/components/CustomIcons';
import type { IconProp } from '@fortawesome/fontawesome-svg-core';
import * as FontAwesomeIconBrands from '@fortawesome/free-brands-svg-icons';
import * as FontAwesomeIconSolids from '@fortawesome/free-solid-svg-icons';
import type { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { FontAwesomeIcon as FontAwesomeIconReal } from '@fortawesome/react-fontawesome';

export function FontAwesomeIcon({ icon, ...props }: { icon: string | IconProp } & Omit<FontAwesomeIconProps, 'icon'>) {
    if (typeof icon === 'string') {
        const icon_obj = (FontAwesomeIconBrands[icon] || FontAwesomeIconSolids[icon]) as IconProp;
        if (!icon_obj) {
            const CustomIcon = (CustomIcons as any)[icon];
            if (!CustomIcon) return null;
            return <CustomIcon {...props} />;
        }
        return <FontAwesomeIconReal icon={icon_obj} {...props} />;
    }
    return <FontAwesomeIconReal icon={icon} {...props} />;
}

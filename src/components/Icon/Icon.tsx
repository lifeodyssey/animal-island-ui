import React from 'react';
import { cn } from '../../utils/cn';

export type IconName =
    | 'icon-miles'
    | 'icon-camera'
    | 'icon-chat'
    | 'icon-critterpedia'
    | 'icon-design'
    | 'icon-diy'
    | 'icon-helicopter'
    | 'icon-map'
    | 'icon-shopping'
    | 'icon-variant';

export interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
    name: IconName;
    size?: number | string;
    bounce?: boolean;
}

export const Icon = React.forwardRef<HTMLSpanElement, IconProps>(
    (
        {
            name,
            size = 24,
            className,
            style,
            bounce = false,
            'aria-label': ariaLabel,
            'aria-labelledby': ariaLabelledBy,
            'aria-hidden': ariaHiddenProp,
            ...rest
        },
        ref
    ) => {
        // Icons are decorative by default; allow consumers to opt-in to an accessible name.
        const ariaHidden = ariaHiddenProp ?? (ariaLabel || ariaLabelledBy ? undefined : true);

        return (
            <span
                ref={ref}
                className={cn('animal-icon', `animal-${name}`, bounce && 'animal-icon-bounce', className)}
                aria-hidden={ariaHidden}
                style={{
                    width: size,
                    height: size,
                    ...style,
                }}
                {...rest}
            />
        );
    }
);

Icon.displayName = 'Icon';

export const ICON_LIST: { name: IconName; label: string }[] = [
    { name: 'icon-miles', label: 'NookMiles' },
    { name: 'icon-camera', label: 'Camera' },
    { name: 'icon-chat', label: 'Chat' },
    { name: 'icon-critterpedia', label: 'Critterpedia' },
    { name: 'icon-design', label: 'Design' },
    { name: 'icon-diy', label: 'DIY' },
    { name: 'icon-helicopter', label: 'Helicopter' },
    { name: 'icon-map', label: 'Map' },
    { name: 'icon-shopping', label: 'Shopping' },
    { name: 'icon-variant', label: 'Variant' },
];

import React from 'react';
import { cn } from '../../utils/cn';

export type FooterType = 'sea' | 'tree';

export interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Footer 类型 */
    type?: FooterType;
}

export const Footer = React.forwardRef<HTMLDivElement, FooterProps>(
    ({ type = 'tree', className, style, ...rest }, ref) => {
        return (
            <div
                ref={ref}
                className={cn('animal-footer', type === 'tree' && 'animal-footer-tree', className)}
                style={style}
                {...rest}
            />
        );
    }
);

Footer.displayName = 'Footer';

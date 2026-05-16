import React from 'react';
import { cn } from '../../utils/cn';

export interface CursorProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 子元素 */
    children?: React.ReactNode;
}

export const Cursor = React.forwardRef<HTMLDivElement, CursorProps>(
    ({ children, className, style, ...rest }, ref) => (
        <div
            ref={ref}
            className={cn('animal-cursor', className)}
            style={style}
            {...rest}
        >
            {children}
        </div>
    )
);

Cursor.displayName = 'Cursor';

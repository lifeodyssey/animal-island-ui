import React from 'react';
import { cn } from '../../utils/cn';

export type CardType = 'default' | 'title' | 'dashed';

export type CardColor =
    | 'default'
    | 'app-pink'
    | 'purple'
    | 'app-blue'
    | 'app-yellow'
    | 'app-orange'
    | 'app-teal'
    | 'app-green'
    | 'app-red'
    | 'lime-green'
    | 'yellow-green'
    | 'brown'
    | 'warm-peach-pink';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** 卡片类型 */
    type?: CardType;
    /** 背景颜色类型 */
    color?: CardColor;
    /** 自定义内容 */
    children?: React.ReactNode;
}

const cardTypeClassNames: Record<CardType, string | false> = {
    default: false,
    title: 'animal-card-title',
    dashed: 'animal-card-dashed',
};

const cardColorClassNames: Record<CardColor, string | false> = {
    default: false,
    'app-pink': 'animal-card-app-pink',
    purple: 'animal-card-purple',
    'app-blue': 'animal-card-app-blue',
    'app-yellow': 'animal-card-app-yellow',
    'app-orange': 'animal-card-app-orange',
    'app-teal': 'animal-card-app-teal',
    'app-green': 'animal-card-app-green',
    'app-red': 'animal-card-app-red',
    'lime-green': 'animal-card-lime-green',
    'yellow-green': 'animal-card-yellow-green',
    brown: 'animal-card-brown',
    'warm-peach-pink': 'animal-card-warm-peach-pink',
};

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
    (
        {
            type = 'default',
            color = 'default',
            children,
            className,
            style,
            ...rest
        },
        ref
    ) => {
        return (
            <div
                ref={ref}
                className={cn(
                    'animal-card',
                    cardTypeClassNames[type],
                    cardColorClassNames[color],
                    className
                )}
                style={style}
                {...rest}
            >
                {children}
            </div>
        );
    }
);

Card.displayName = 'Card';

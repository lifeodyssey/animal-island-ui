import React, { useEffect, useState } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cn } from '../../utils/cn';
import leafIcon from '../../assets/img/icons/icon-leaf.png';

export interface TabItem {
    key: string;
    label: React.ReactNode;
    children: React.ReactNode;
}

export interface TabsProps
    extends Omit<
        React.ComponentPropsWithoutRef<typeof RadixTabs.Root>,
        'value' | 'defaultValue' | 'onValueChange' | 'onChange'
    > {
    items: TabItem[];
    defaultActiveKey?: string;
    activeKey?: string;
    onChange?: (key: string) => void;
    leafAnimation?: boolean;
    shadow?: boolean;
}

export const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
    (
        {
            items,
            defaultActiveKey,
            activeKey,
            onChange,
            className,
            style,
            leafAnimation = true,
            shadow = true,
            ...rest
        },
        ref
    ) => {
        const fallbackActiveKey = defaultActiveKey ?? items[0]?.key;
        const isControlled = activeKey !== undefined;
        const [uncontrolledActiveKey, setUncontrolledActiveKey] = useState(fallbackActiveKey);
        const currentActiveKey = isControlled ? activeKey : uncontrolledActiveKey;

        useEffect(() => {
            if (isControlled) return;
            if (currentActiveKey === undefined) {
                setUncontrolledActiveKey(defaultActiveKey ?? items[0]?.key);
                return;
            }
            if (items.some((item) => item.key === currentActiveKey)) return;
            setUncontrolledActiveKey(defaultActiveKey ?? items[0]?.key);
        }, [currentActiveKey, defaultActiveKey, isControlled, items]);

        const handleValueChange = (key: string) => {
            if (!isControlled) {
                setUncontrolledActiveKey(key);
            }
            onChange?.(key);
        };

        return (
            <RadixTabs.Root
                ref={ref}
                className={cn('animal-tabs', className)}
                style={style}
                value={currentActiveKey ?? ''}
                onValueChange={handleValueChange}
                {...rest}
            >
                <RadixTabs.List className="animal-tabs-list">
                    {items.map((item) => {
                        const isActive = item.key === currentActiveKey;
                        return (
                            <RadixTabs.Trigger
                                key={item.key}
                                value={item.key}
                                className={cn(
                                    'animal-tab-trigger',
                                    isActive && shadow && 'animal-tab-shadow'
                                )}
                            >
                                <span className="animal-tab-icon">
                                    {isActive ? '●' : '○'}
                                </span>
                                <span className="animal-tab-label">{item.label}</span>
                                {isActive && (
                                    <img
                                        src={leafIcon}
                                        alt=""
                                        className={cn(
                                            'animal-tab-leaf',
                                            !leafAnimation && 'animal-tab-leaf-static'
                                        )}
                                    />
                                )}
                            </RadixTabs.Trigger>
                        );
                    })}
                </RadixTabs.List>
                {items.map((item) => (
                    <RadixTabs.Content
                        key={item.key}
                        value={item.key}
                        className="animal-tab-content"
                    >
                        <div className="animal-tab-content-inner">
                            {item.children}
                        </div>
                    </RadixTabs.Content>
                ))}
            </RadixTabs.Root>
        );
    }
);

Tabs.displayName = 'Tabs';

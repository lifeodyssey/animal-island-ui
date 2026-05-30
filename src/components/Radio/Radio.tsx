import React, { useId } from 'react';
import * as RadixRadioGroup from '@radix-ui/react-radio-group';
import { cn } from '../../utils/cn';

export type RadioSize = 'small' | 'middle' | 'large';

export interface RadioOption {
    /** 选项标签 */
    label: React.ReactNode;
    /** 选项值 */
    value: string | number;
    /** 是否禁用该选项 */
    disabled?: boolean;
}

export interface RadioProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'defaultValue' | 'onChange' | 'dir'> {
    /** 选中的值（受控） */
    value?: string | number;
    /** 默认选中的值 */
    defaultValue?: string | number;
    /** 选项列表 */
    options: RadioOption[];
    /** 尺寸 */
    size?: RadioSize;
    /** 禁用全部 */
    disabled?: boolean;
    /** 布局方向 */
    direction?: 'horizontal' | 'vertical';
    /** 变化回调 */
    onChange?: (value: string | number) => void;
}

const toRadixValue = (raw: string | number | undefined): string | undefined =>
    raw === undefined ? undefined : String(raw);

export const Radio = React.forwardRef<HTMLDivElement, RadioProps>(
    (
        {
            value,
            defaultValue,
            options,
            size = 'middle',
            disabled = false,
            direction = 'horizontal',
            onChange,
            className,
            style,
            ...rest
        },
        ref,
    ) => {
        const groupId = `animal-radio-${useId().replace(/:/g, '')}`;

        const handleValueChange = (next: string) => {
            const matched = options.find((opt) => String(opt.value) === next);
            if (matched && !matched.disabled) {
                onChange?.(matched.value);
            }
        };

        return (
            <RadixRadioGroup.Root
                ref={ref}
                className={cn(
                    'animal-radio-group',
                    direction === 'vertical'
                        ? 'animal-radio-group-vertical'
                        : 'animal-radio-group-horizontal',
                    disabled && 'animal-radio-group-disabled',
                    className,
                )}
                style={style}
                value={toRadixValue(value)}
                defaultValue={toRadixValue(defaultValue)}
                onValueChange={handleValueChange}
                disabled={disabled}
                orientation={direction}
                {...rest}
            >
                {options.map((option, index) => {
                    const isDisabled = disabled || option.disabled;
                    const checkedValue = value !== undefined ? value : undefined;
                    const isChecked = checkedValue !== undefined && checkedValue === option.value;
                    const itemId = `${groupId}-item-${index}`;
                    const labelId = `${groupId}-label-${index}`;

                    return (
                        <label
                            key={`${String(option.value)}-${index}`}
                            htmlFor={itemId}
                            className={cn(
                                'animal-radio-item',
                                `animal-radio-${size}`,
                                isChecked && 'animal-radio-checked',
                                isDisabled && 'animal-radio-disabled',
                            )}
                        >
                            <RadixRadioGroup.Item
                                id={itemId}
                                value={String(option.value)}
                                disabled={isDisabled}
                                aria-labelledby={labelId}
                                className="animal-radio-circle"
                            >
                                <RadixRadioGroup.Indicator className="animal-radio-indicator">
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M2 8L6 12L14 4"
                                            stroke="currentColor"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </RadixRadioGroup.Indicator>
                            </RadixRadioGroup.Item>
                            <span id={labelId} className="animal-radio-label">
                                {option.label}
                            </span>
                        </label>
                    );
                })}
            </RadixRadioGroup.Root>
        );
    },
);

Radio.displayName = 'Radio';

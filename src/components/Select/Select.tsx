import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cn } from '../../utils/cn';

export type SelectOption = {
    key: string;
    label: string;
};

export interface SelectProps extends Omit<
    React.ComponentPropsWithoutRef<typeof RadixSelect.Trigger>,
    'children' | 'defaultValue' | 'disabled' | 'onChange' | 'value'
> {
    options: SelectOption[];
    value: string;
    onChange: (key: string) => void;
    placeholder?: string;
    disabled?: boolean;
}

const RADIX_VALUE_PREFIX = 'animal-option-';

const toRadixValue = (index: number) => `${RADIX_VALUE_PREFIX}${index}`;

const parseRadixValue = (nextValue: string) => {
    // Guard against Radix's "empty string means cleared" behavior and any unexpected values.
    // Crucially, avoid Number('') => 0 which would incorrectly map to the first option.
    if (!nextValue.startsWith(RADIX_VALUE_PREFIX)) return null;
    const rawIndex = nextValue.slice(RADIX_VALUE_PREFIX.length);
    if (rawIndex.length === 0) return null;
    const optionIndex = Number(rawIndex);
    if (!Number.isInteger(optionIndex) || optionIndex < 0) return null;
    return optionIndex;
};

export const Select = React.forwardRef<HTMLButtonElement, SelectProps>(
    (
        {
            options,
            value,
            onChange,
            placeholder = '请选择',
            disabled = false,
            className,
            ...rest
        },
        ref,
    ) => {
        const selectedIndex = options.findIndex((option) => option.key === value);
        const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;
        const radixValue = selectedIndex >= 0 ? toRadixValue(selectedIndex) : undefined;

        return (
            <RadixSelect.Root
                value={radixValue ?? ''}
                onValueChange={(nextValue) => {
                    const optionIndex = parseRadixValue(nextValue);
                    if (optionIndex === null) return;
                    const option = options[optionIndex];
                    if (!option) return;
                    onChange(option.key);
                }}
                disabled={disabled}
            >
                <div className={cn('animal-select-wrapper', disabled && 'animal-select-disabled')}>
                    <RadixSelect.Trigger
                        ref={ref}
                        className={cn('animal-select-trigger', className)}
                        aria-label={placeholder}
                        {...rest}
                    >
                        <RadixSelect.Value
                            className={selectedOption ? 'animal-select-value' : 'animal-select-placeholder'}
                            placeholder={<span className="animal-select-placeholder">{placeholder}</span>}
                        >
                            {selectedOption?.label}
                        </RadixSelect.Value>
                        <RadixSelect.Icon className="animal-select-arrow">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </RadixSelect.Icon>
                    </RadixSelect.Trigger>
                    <RadixSelect.Portal>
                        <RadixSelect.Content
                            className="animal-select-content"
                            position="popper"
                            side="right"
                            sideOffset={6}
                            avoidCollisions
                        >
                            <RadixSelect.Viewport className="animal-select-viewport">
                                {options.map((option, index) => (
                                    <RadixSelect.Item
                                        key={`${option.key}-${index}`}
                                        value={toRadixValue(index)}
                                        className="animal-select-item"
                                    >
                                        <span className="animal-select-dot" />
                                        <RadixSelect.ItemText>{option.label}</RadixSelect.ItemText>
                                    </RadixSelect.Item>
                                ))}
                            </RadixSelect.Viewport>
                        </RadixSelect.Content>
                    </RadixSelect.Portal>
                </div>
            </RadixSelect.Root>
        );
    },
);

Select.displayName = 'Select';

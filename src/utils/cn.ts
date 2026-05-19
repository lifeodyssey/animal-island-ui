import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Merge conditional class names and de-dupe Tailwind utility conflicts.
 *
 * Tailwind generates a single CSS rule per utility (order is not based on the
 * `class` attribute), so simply appending `className` cannot reliably "override"
 * internal utilities. `tailwind-merge` removes conflicting utilities so the
 * consumer-provided intent wins.
 */
export function cn(...inputs: ClassValue[]): string {
    return twMerge(clsx(inputs));
}


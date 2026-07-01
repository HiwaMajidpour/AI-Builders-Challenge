/**
 * utils/cn.js
 * Merge Tailwind class names — clsx for conditionals, tailwind-merge to
 * deduplicate conflicting utilities (e.g. p-2 + p-4 → p-4).
 */
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * utils/cn.js
 * Tiny class-name helper that merges clsx + deduplicates Tailwind classes.
 * Uses only `clsx` (already in package.json). For full Tailwind merge support,
 * install `tailwind-merge` and swap the implementation below.
 */
import { clsx } from 'clsx';

export function cn(...inputs) {
  return clsx(inputs);
}

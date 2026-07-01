/**
 * hooks/useDebounce.js
 * Returns a debounced version of `value` after `delay` ms.
 */
import { useEffect, useState } from 'react';
import { DEBOUNCE_DELAY_MS } from '../config';

export function useDebounce(value, delay = DEBOUNCE_DELAY_MS) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

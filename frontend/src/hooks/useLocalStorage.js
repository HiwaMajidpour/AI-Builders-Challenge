/**
 * hooks/useLocalStorage.js
 * useState-compatible hook that persists state in localStorage.
 */
import { useCallback, useState } from 'react';
import { storage } from '../utils/storage';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() =>
    storage.get(key, initialValue),
  );

  const setValue = useCallback(
    (value) => {
      const next = value instanceof Function ? value(storedValue) : value;
      setStoredValue(next);
      storage.set(key, next);
    },
    [key, storedValue],
  );

  const removeValue = useCallback(() => {
    setStoredValue(initialValue);
    storage.remove(key);
  }, [key, initialValue]);

  return [storedValue, setValue, removeValue];
}

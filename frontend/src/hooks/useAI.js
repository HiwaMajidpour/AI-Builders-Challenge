/**
 * hooks/useAI.js
 * Convenience hook for consuming AIContext.
 */
import { useContext } from 'react';
import { AIContext } from '../contexts/AIContext';

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAI must be used inside <AIProvider>');
  return ctx;
}

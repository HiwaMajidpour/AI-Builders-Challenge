/**
 * hooks/useTemplates.js
 * Convenience hook for consuming TemplateContext.
 */
import { useContext } from 'react';
import { TemplateContext } from '../contexts/TemplateContext';

export function useTemplates() {
  const ctx = useContext(TemplateContext);
  if (!ctx) throw new Error('useTemplates must be used inside <TemplateProvider>');
  return ctx;
}

/**
 * hooks/useEditor.js
 * Convenience hook for consuming EditorContext.
 */
import { useContext } from 'react';
import { EditorContext } from '../contexts/EditorContext';

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used inside <EditorProvider>');
  return ctx;
}

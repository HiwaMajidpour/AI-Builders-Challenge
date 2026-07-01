/**
 * components/common/ThemeToggle.jsx
 * Icon button that switches between light and dark theme.
 */
import { RiMoonLine, RiSunLine } from 'react-icons/ri';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';

export default function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={className}
    >
      {isDark ? <RiSunLine size={18} /> : <RiMoonLine size={18} />}
    </Button>
  );
}

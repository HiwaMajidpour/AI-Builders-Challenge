/**
 * features/templates/TemplateSearch.jsx
 * Controlled search input — filters by title, description, or category.
 *
 * Props
 *   value       string
 *   onChange    fn(string)
 */
import Input from '../../components/ui/Input';

const SearchIcon = (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
    <circle cx="6" cy="6" r="5" />
    <path d="m13 13-3.5-3.5" />
  </svg>
);

export default function TemplateSearch({ value, onChange }) {
  return (
    <Input
      type="search"
      placeholder="Search templates…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search templates by title, description, or category"
      leadingIcon={SearchIcon}
      containerClassName="w-full sm:w-72"
    />
  );
}

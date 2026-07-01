/**
 * features/projects/ProjectSearch.jsx
 * Controlled search input — filters by title, genre, or description.
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

export default function ProjectSearch({ value, onChange }) {
  return (
    <Input
      type="search"
      placeholder="Search projects…"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label="Search projects by title, genre, or description"
      leadingIcon={SearchIcon}
      containerClassName="w-full sm:w-72"
    />
  );
}

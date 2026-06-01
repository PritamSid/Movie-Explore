export default function ThemeToggle({ theme, onToggle }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={isDark}
      className={`btn btn-lg d-inline-flex align-items-center gap-2 ${isDark ? 'btn-outline-light' : 'btn-outline-dark'}`}
    >
      <span className={`toggle-icon ${isDark ? 'icon-moon' : 'icon-sun'}`} aria-hidden>
        {isDark ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" fill="currentColor" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6.76 4.84l-1.8-1.79L3.17 5.84l1.79 1.79 1.8-1.79zM1 13h3v-2H1v2zm10 9h2v-3h-2v3zM20.24 19.16l1.79 1.79 1.79-1.79-1.79-1.79-1.79 1.79zM17 11a6 6 0 11-12 0 6 6 0 0112 0z" fill="currentColor" />
          </svg>
        )}
      </span>
      <span className="toggle-label">{isDark ? 'Light mode' : 'Dark mode'}</span>
    </button>
  );
}

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`sl-logo${light ? " sl-logo--light" : ""}`}>
      <svg className="sl-logo-mark" viewBox="0 0 40 40" aria-hidden="true">
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M20 31V13" stroke="currentColor" strokeWidth="1.2" fill="none" />
        <path d="M20 22c-5 0-8-3-8.5-8 5 0 8 3 8.5 8z" fill="currentColor" opacity=".85" />
        <path d="M20 18c4.5 0 7.5-2.8 8-7.5-4.5 0-7.5 2.8-8 7.5z" fill="currentColor" opacity=".55" />
      </svg>
      <span className="sl-logo-text">
        <span className="sl-logo-name">Ivy &amp; Oak</span>
        <span className="sl-logo-sub">Hair Studio</span>
      </span>
    </span>
  );
}

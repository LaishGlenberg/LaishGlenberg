export default function ArrowIcon({ up = false }) {
  return (
    <svg
      className="arrow-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {up ? (
        <path d="M12 19V5m-6 6 6-6 6 6" />
      ) : (
        <path d="M5 19 19 5M7 5h12v12" />
      )}
    </svg>
  );
}

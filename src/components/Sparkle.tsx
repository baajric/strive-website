/** The four-pointed star from the Strive mark. */
export function Sparkle({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <path
        d="M12 0C12.9 6.4 17.6 11.1 24 12 17.6 12.9 12.9 17.6 12 24 11.1 17.6 6.4 12.9 0 12 6.4 11.1 11.1 6.4 12 0Z"
        fill="currentColor"
      />
    </svg>
  );
}

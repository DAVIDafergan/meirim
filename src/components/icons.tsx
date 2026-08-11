type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function BookIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 5.5c2-1 4.5-1.2 8 .5 3.5-1.7 6-1.5 8-.5v13c-2-1-4.5-1.2-8 .5-3.5-1.7-6-1.5-8-.5V5.5Z" />
      <path d="M12 6v13" />
    </svg>
  );
}

export function CandleIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3c1 1.1 1.8 2.2 1.8 3.3A1.8 1.8 0 0 1 12 8.1a1.8 1.8 0 0 1-1.8-1.8C10.2 5.2 11 4.1 12 3Z" />
      <rect x="10" y="8.5" width="4" height="10.5" rx="0.6" />
      <path d="M7.5 19h9" />
    </svg>
  );
}

export function CapIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 4 2 8.5 12 13l10-4.5L12 4Z" />
      <path d="M6 10.5V16c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5.5" />
      <path d="M21 8.5v5" />
    </svg>
  );
}

export function CommunityIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3a9 9 0 1 0 3.5 17.3c.6-.3 1-.9 1-1.6 0-.5-.2-.9-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1 .8-1.6 1.8-1.6H18a4 4 0 0 0 4-4c0-4.4-4.5-8-10-8Z" />
      <circle cx="7.5" cy="10.5" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="10.5" cy="7.3" r="0.9" fill="currentColor" stroke="none" />
      <circle cx="14.3" cy="7.6" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function HandsIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M3 13.5 7 10l4.5 2-1 2.5" />
      <path d="M21 13.5 17 10l-4.5 2 1 2.5" />
      <path d="M9.5 14.5c1 2 3.5 2.9 5 1.4" />
      <path d="M6 16c1.5 2.5 4 3.7 6 3.7s4.5-1.2 6-3.7" />
    </svg>
  );
}

export function FlameIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3c2 2.3 4 4.8 4 7.7A4 4 0 0 1 12 14.7a4 4 0 0 1-4-4C8 7.8 10 5.3 12 3Z" />
      <path d="M9 15.5c0 1.9 1.3 3.5 3 3.5s3-1.6 3-3.5" />
    </svg>
  );
}

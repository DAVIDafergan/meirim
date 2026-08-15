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

export function StarIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 3.5 14.3 9.3 20.5 9.8 15.8 13.8 17.3 20 12 16.6 6.7 20 8.2 13.8 3.5 9.8 9.7 9.3Z" />
    </svg>
  );
}

export function RingIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="14.5" r="6" />
      <path d="M9.5 8.5 12 3l2.5 5.5" />
      <path d="M9.7 6.6h4.6" />
    </svg>
  );
}

export function CoinIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M9.3 15c0 1.1 1.2 2 2.7 2s2.7-.7 2.7-1.7c0-2.6-5.4-1-5.4-3.6 0-1 1.2-1.7 2.7-1.7s2.7.9 2.7 2" />
      <path d="M12 7.3v1.2M12 15.5v1.2" />
    </svg>
  );
}

export function HeartIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M12 20.2s-7.8-4.7-9.7-9.3C.8 7.4 2.9 4 6.3 4c2 0 3.5 1.1 4.2 2.5.4.9 1.6.9 2 0C13.2 5.1 14.7 4 16.7 4c3.4 0 5.5 3.4 4 6.9-1.9 4.6-9.7 9.3-9.7 9.3Z" />
    </svg>
  );
}

export function SynagogueIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 21V11L12 4l8 7v10" />
      <path d="M9 21v-6a3 3 0 0 1 6 0v6" />
      <path d="M12 4V2" />
    </svg>
  );
}

export function ScrollIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="4" width="3" height="16" rx="1.5" />
      <rect x="16" y="4" width="3" height="16" rx="1.5" />
      <path d="M8 7h8M8 12h8M8 17h8" />
    </svg>
  );
}

export function BlockIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="13" width="7" height="7" rx="1" />
      <rect x="14" y="13" width="7" height="7" rx="1" />
      <rect x="8.5" y="4" width="7" height="7" rx="1" />
    </svg>
  );
}

export function BowlIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <path d="M4 12h16a8 8 0 0 1-16 0Z" />
      <path d="M9 12V9M12 12V7M15 12V9" />
    </svg>
  );
}

export function ChalkboardIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="3" y="4" width="18" height="12" rx="1" />
      <path d="M7 9h6" />
      <path d="M8 20h8M12 16v4" />
    </svg>
  );
}

export function PrinterIcon({ className }: IconProps) {
  return (
    <svg {...base} className={className}>
      <rect x="5" y="9" width="14" height="7" rx="1" />
      <path d="M7 9V4h10v5" />
      <path d="M7 16v4h10v-4" />
    </svg>
  );
}

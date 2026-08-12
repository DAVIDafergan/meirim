const PHRASES = [
  "מאירים את הגליל",
  "דווקא עכשיו, תחת אש",
  "נחלי התורה צפת",
  "כל תרומה משנה חיים",
];

const LINE = PHRASES.join(" ✦ ") + " ✦ ";

export default function MarqueeTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 bg-white/[0.03] py-4">
      <div className="marquee-track flex w-max whitespace-nowrap text-sm font-semibold tracking-wide text-gold/70">
        <span className="pl-8">{LINE.repeat(6)}</span>
        <span className="pl-8" aria-hidden="true">
          {LINE.repeat(6)}
        </span>
      </div>
    </div>
  );
}

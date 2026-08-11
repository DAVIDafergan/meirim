export default function Divider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/60" />
      <span className="h-px flex-1 bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </div>
  );
}

export default function Divider() {
  return (
    <div className="mx-auto flex max-w-xs items-center gap-4">
      <span className="h-px flex-1 bg-line" />
      <span className="h-1.5 w-1.5 rotate-45 bg-gold/70" />
      <span className="h-px flex-1 bg-line" />
    </div>
  );
}

// Shown instead of a broken/blank layout when a table has no rows yet.
export default function EmptyState({ title, hint }) {
  return (
    <div className="glass-card p-10 text-center">
      <p className="text-ink font-display text-lg">{title}</p>
      {hint && <p className="text-muted text-sm mt-2">{hint}</p>}
    </div>
  );
}

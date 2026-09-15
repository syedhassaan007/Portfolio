export default function ErrorState({ message = 'Something went wrong loading this section.' }) {
  return (
    <div className="glass-card p-10 text-center border-amber/30">
      <p className="text-ink font-display text-lg">Couldn't load this content</p>
      <p className="text-muted text-sm mt-2">{message}</p>
    </div>
  );
}

export default function Loader({ label = 'Loading' }) {
  return (
    <div className="flex items-center justify-center py-20 gap-3 text-muted">
      <span className="w-2 h-2 rounded-full bg-cyan animate-pulse" />
      <span className="w-2 h-2 rounded-full bg-cyan animate-pulse [animation-delay:150ms]" />
      <span className="w-2 h-2 rounded-full bg-cyan animate-pulse [animation-delay:300ms]" />
      <span className="text-sm ml-2">{label}…</span>
    </div>
  );
}

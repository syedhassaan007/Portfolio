import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="pt-48 pb-24 px-6 max-w-lg mx-auto text-center">
      <p className="text-cyan font-display text-6xl mb-4">404</p>
      <h1 className="text-2xl font-display text-ink mb-3">This page doesn't exist</h1>
      <p className="text-muted mb-8">The page you're looking for may have moved or never existed.</p>
      <Link to="/" className="btn-primary">Back to home</Link>
    </section>
  );
}

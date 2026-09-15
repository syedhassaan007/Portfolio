import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(username, password);
      navigate(location.state?.from || '/admin', { replace: true });
    } catch (err) {
      setError(err.message || 'Login failed.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="min-h-screen flex items-center justify-center px-6">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-sm p-8 space-y-5">
        <div className="text-center mb-2">
          <h1 className="font-display text-xl text-ink">Admin sign in</h1>
          <p className="text-muted text-sm mt-1">Manage portfolio content</p>
        </div>

        <div>
          <label htmlFor="username" className="text-sm text-muted block mb-2">Username</label>
          <input
            id="username" required value={username} autoFocus
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm text-muted block mb-2">Password</label>
          <input
            id="password" type="password" required value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>

        {error && <p className="text-amber text-sm text-center">{error}</p>}

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center disabled:opacity-60">
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </section>
  );
}

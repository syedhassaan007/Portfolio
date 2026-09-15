import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Loader from '../Loader';

const FIELDS = [
  { name: 'full_name', label: 'Full name', type: 'text' },
  { name: 'title', label: 'Title', type: 'text' },
  { name: 'tagline', label: 'Tagline', type: 'text' },
  { name: 'bio', label: 'Bio', type: 'textarea' },
  { name: 'location', label: 'Location', type: 'text' },
  { name: 'email', label: 'Email', type: 'text' },
  { name: 'phone', label: 'Phone', type: 'text' },
  { name: 'avatar_url', label: 'Avatar image URL', type: 'text' },
  { name: 'resume_url', label: 'Resume PDF URL', type: 'text' },
];

export default function ProfileEditor() {
  const [form, setForm] = useState(null);
  const [status, setStatus] = useState('loading');
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api.getProfile()
      .then((data) => { setForm(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSaved(false);
    try {
      const updated = await api.updateProfile(form);
      setForm(updated);
      setSaved(true);
    } catch (err) {
      setError(err.message || 'Could not save profile.');
    } finally {
      setSaving(false);
    }
  }

  if (status === 'loading') return <Loader label="Loading profile" />;
  if (status === 'error' || !form) return <p className="text-amber text-sm">Couldn't load profile.</p>;

  return (
    <form onSubmit={handleSubmit} className="glass-panel p-6 space-y-4 max-w-2xl">
      <h2 className="font-display text-xl text-ink mb-2">About me / Profile</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {FIELDS.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'sm:col-span-2' : ''}>
            <label className="text-sm text-muted block mb-2">{f.label}</label>
            {f.type === 'textarea' ? (
              <textarea
                rows={6}
                className="input-field resize-none"
                value={form[f.name] || ''}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
              />
            ) : (
              <input
                className="input-field"
                value={form[f.name] || ''}
                onChange={(e) => setForm((s) => ({ ...s, [f.name]: e.target.value }))}
              />
            )}
          </div>
        ))}
      </div>
      {error && <p className="text-amber text-sm">{error}</p>}
      {saved && <p className="text-cyan text-sm">Saved.</p>}
      <button type="submit" disabled={saving} className="btn-primary py-2 px-6 text-sm disabled:opacity-60">
        {saving ? 'Saving…' : 'Save profile'}
      </button>
    </form>
  );
}

import { useEffect, useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { api } from '../services/api';

export default function About() {
  const [profile, setProfile] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getProfile()
      .then((data) => { setProfile(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  if (status === 'loading') return <Loader label="Loading" />;
  if (status === 'error') return <div className="pt-40 px-6 max-w-3xl mx-auto"><ErrorState /></div>;

  return (
    <section className="pt-40 pb-24 px-6 max-w-3xl mx-auto">
      <SectionReveal>
        <p className="text-cyan text-sm font-medium mb-3">About me</p>
        {profile.avatar_url && (
          <img
            src={profile.avatar_url}
            alt={profile.full_name || 'Profile photo'}
            className="w-24 h-24 rounded-full object-cover border-2 border-cyan/40 shadow-glow mb-6"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
          />
        )}
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-8">
          {profile.title}
        </h1>
        <div className="glass-panel p-8 sm:p-10 space-y-6 text-ink/90 leading-relaxed">
          <p>{profile.bio}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5 mt-8">
          <div className="glass-card p-6">
            <p className="text-muted text-sm">Location</p>
            <p className="text-ink mt-1">{profile.location}</p>
          </div>
          <div className="glass-card p-6">
            <p className="text-muted text-sm">Email</p>
            <p className="text-ink mt-1 break-all">{profile.email}</p>
          </div>
        </div>
      </SectionReveal>
    </section>
  );
}

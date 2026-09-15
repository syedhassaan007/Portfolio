import { useEffect, useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import CertificationCard from '../components/CertificationCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { api } from '../services/api';

export default function Certifications() {
  const [certs, setCerts] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getCertifications()
      .then((data) => { setCerts(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <p className="text-cyan text-sm font-medium mb-3">Certifications</p>
      <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-4">Verified credentials</h1>
      <p className="section-sub mb-12">Formal recognition of the skills I'm building.</p>

      {status === 'loading' && <Loader label="Loading certifications" />}
      {status === 'error' && <ErrorState />}
      {status === 'ready' && certs.length === 0 && (
        <EmptyState title="No certifications added yet" hint="Add your first certification from the admin panel." />
      )}

      {status === 'ready' && certs.length > 0 && (
        <SectionReveal>
          <div className="grid sm:grid-cols-2 gap-5">
            {certs.map((c) => <CertificationCard key={c.id} cert={c} />)}
          </div>
        </SectionReveal>
      )}
    </section>
  );
}

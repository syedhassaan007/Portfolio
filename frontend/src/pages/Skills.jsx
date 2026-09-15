import { useEffect, useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import SkillCard from '../components/SkillCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { api } from '../services/api';

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getSkills()
      .then((data) => { setSkills(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  const grouped = skills.reduce((acc, s) => {
    (acc[s.category] = acc[s.category] || []).push(s);
    return acc;
  }, {});

  return (
    <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <p className="text-cyan text-sm font-medium mb-3">Skills</p>
      <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-4">What I work with</h1>
      <p className="section-sub mb-12">
        A growing toolkit across languages, web development, databases, and cloud —
        built through hands-on projects rather than checklists.
      </p>

      {status === 'loading' && <Loader label="Loading skills" />}
      {status === 'error' && <ErrorState />}
      {status === 'ready' && skills.length === 0 && (
        <EmptyState title="No skills added yet" hint="Add skills from the admin panel." />
      )}

      {status === 'ready' && skills.length > 0 && (
        <div className="space-y-14">
          {Object.entries(grouped).map(([category, items], i) => (
            <SectionReveal key={category} delay={i * 0.05}>
              <h2 className="font-display text-xl text-ink mb-5">{category}</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((s) => <SkillCard key={s.id} skill={s} />)}
              </div>
            </SectionReveal>
          ))}
        </div>
      )}
    </section>
  );
}

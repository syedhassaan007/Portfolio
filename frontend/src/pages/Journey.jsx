import { useEffect, useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { api } from '../services/api';

export default function Journey() {
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([api.getEducation(), api.getExperience(), api.getAchievements()])
      .then(([edu, exp, ach]) => {
        if (edu.status === 'fulfilled') setEducation(edu.value);
        if (exp.status === 'fulfilled') setExperience(exp.value);
        if (ach.status === 'fulfilled') setAchievements(ach.value);
        setLoading(false);
      });
  }, []);

  if (loading) return <Loader label="Loading journey" />;

  return (
    <section className="pt-40 pb-24 px-6 max-w-3xl mx-auto">
      <p className="text-cyan text-sm font-medium mb-3">Education & Experience</p>
      <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-12">My journey so far</h1>

      <SectionReveal>
        <h2 className="font-display text-xl text-ink mb-6">Education</h2>
        {education.length === 0 ? (
          <EmptyState title="No education added yet" />
        ) : (
          <ol className="relative border-l border-line pl-6 space-y-8 mb-16">
            {education.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-cyan" />
                <p className="text-muted text-sm">{e.start_year} — {e.end_year}</p>
                <h3 className="font-display text-ink mt-1">{e.degree}</h3>
                <p className="text-muted text-sm mt-1">{e.institution}{e.grade ? ` · ${e.grade}` : ''}</p>
                {e.coursework && <p className="text-ink/70 text-sm mt-2">{e.coursework}</p>}
              </li>
            ))}
          </ol>
        )}
      </SectionReveal>

      <SectionReveal delay={0.1}>
        <h2 className="font-display text-xl text-ink mb-6">Experience</h2>
        {experience.length === 0 ? (
          <EmptyState title="No experience listed yet" hint="This section will appear once experience is added." />
        ) : (
          <ol className="relative border-l border-line pl-6 space-y-8 mb-16">
            {experience.map((e) => (
              <li key={e.id} className="relative">
                <span className="absolute -left-[27px] top-1.5 w-2.5 h-2.5 rounded-full bg-amber" />
                <p className="text-muted text-sm">{e.start_date} — {e.end_date || 'Present'}</p>
                <h3 className="font-display text-ink mt-1">{e.role}</h3>
                <p className="text-muted text-sm mt-1">{e.organization}</p>
                {e.description && <p className="text-ink/70 text-sm mt-2">{e.description}</p>}
              </li>
            ))}
          </ol>
        )}
      </SectionReveal>

      <SectionReveal delay={0.2}>
        <h2 className="font-display text-xl text-ink mb-6">Achievements</h2>
        {achievements.length === 0 ? (
          <EmptyState title="No achievements listed yet" hint="Hackathons, awards, and workshops will appear here." />
        ) : (
          <div className="grid sm:grid-cols-2 gap-4">
            {achievements.map((a) => (
              <div key={a.id} className="glass-card p-5">
                <p className="text-xs text-cyan">{a.category}</p>
                <h3 className="font-display text-ink mt-1">{a.title}</h3>
                {a.description && <p className="text-muted text-sm mt-2">{a.description}</p>}
              </div>
            ))}
          </div>
        )}
      </SectionReveal>
    </section>
  );
}

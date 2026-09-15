import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SectionReveal from '../components/SectionReveal';
import Loader from '../components/Loader';
import ErrorState from '../components/ErrorState';
import { api } from '../services/api';

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    setStatus('loading');
    api.getProject(id)
      .then((data) => { setProject(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, [id]);

  if (status === 'loading') return <Loader label="Loading project" />;
  if (status === 'error' || !project) {
    return (
      <div className="pt-40 px-6 max-w-3xl mx-auto">
        <ErrorState message="This project couldn't be found." />
        <Link to="/projects" className="text-cyan text-sm mt-6 inline-block">← Back to projects</Link>
      </div>
    );
  }

  const features = (project.features || '').split('\n').filter(Boolean);

  return (
    <section className="pt-40 pb-24 px-6 max-w-3xl mx-auto">
      <SectionReveal>
        <Link to="/projects" className="text-muted text-sm hover:text-cyan">← Back to projects</Link>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mt-4 mb-4">{project.title}</h1>
        <p className="text-muted mb-8">{project.summary}</p>

        <div className="flex flex-wrap gap-3 mb-10">
          {(project.tech_stack || '').split(',').filter(Boolean).map((t) => (
            <span key={t} className="tag-pill">{t.trim()}</span>
          ))}
        </div>

        <div className="flex gap-4 mb-12">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="btn-ghost">GitHub</a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noreferrer" className="btn-primary">Live demo</a>
          )}
        </div>

        {project.problem_statement && (
          <div className="glass-panel p-8 mb-8">
            <h2 className="font-display text-lg text-ink mb-3">The problem</h2>
            <p className="text-ink/80 leading-relaxed">{project.problem_statement}</p>
          </div>
        )}

        {project.description && (
          <div className="glass-panel p-8 mb-8">
            <h2 className="font-display text-lg text-ink mb-3">Overview</h2>
            <p className="text-ink/80 leading-relaxed">{project.description}</p>
          </div>
        )}

        {features.length > 0 && (
          <div className="glass-panel p-8">
            <h2 className="font-display text-lg text-ink mb-4">Key features</h2>
            <ul className="space-y-2">
              {features.map((f) => (
                <li key={f} className="flex gap-3 text-ink/80">
                  <span className="text-cyan">›</span>{f}
                </li>
              ))}
            </ul>
          </div>
        )}
      </SectionReveal>
    </section>
  );
}

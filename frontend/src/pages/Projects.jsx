import { useEffect, useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import ProjectCard from '../components/ProjectCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { api } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    api.getProjects()
      .then((data) => { setProjects(data); setStatus('ready'); })
      .catch(() => setStatus('error'));
  }, []);

  return (
    <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto">
      <p className="text-cyan text-sm font-medium mb-3">Projects</p>
      <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-4">Things I've built</h1>
      <p className="section-sub mb-12">Each one links out to code, and a live demo where available.</p>

      {status === 'loading' && <Loader label="Loading projects" />}
      {status === 'error' && <ErrorState />}
      {status === 'ready' && projects.length === 0 && (
        <EmptyState title="No projects added yet" hint="Projects are to be added." />
      )}

      {status === 'ready' && projects.length > 0 && (
        <SectionReveal>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projects.map((p, i) => <ProjectCard key={p.id} project={p} wide={i % 5 === 0} />)}
          </div>
        </SectionReveal>
      )}
    </section>
  );
}

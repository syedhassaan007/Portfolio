import { Link } from 'react-router-dom';

export default function ProjectCard({ project, wide = false }) {
  return (
    <Link
      to={`/projects/${project.id}`}
      className={`glass-card p-6 flex flex-col justify-between group ${wide ? 'sm:col-span-2' : ''}`}
    >
      <div>
        <h3 className="font-display text-xl text-ink group-hover:text-cyan transition-colors">{project.title}</h3>
        <p className="text-muted text-sm mt-2 line-clamp-2">{project.summary}</p>
      </div>
      <div className="flex flex-wrap gap-2 mt-5">
        {(project.tech_stack || '').split(',').filter(Boolean).slice(0, 4).map((t) => (
          <span key={t} className="tag-pill">{t.trim()}</span>
        ))}
      </div>
    </Link>
  );
}

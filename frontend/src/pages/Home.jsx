import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import TerminalCard from '../components/TerminalCard';
import SectionReveal from '../components/SectionReveal';
import SkillCard from '../components/SkillCard';
import ProjectCard from '../components/ProjectCard';
import CertificationCard from '../components/CertificationCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';
import { api } from '../services/api';

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      api.getProfile(),
      api.getSkills(),
      api.getProjects(),
      api.getCertifications(),
    ]).then(([p, s, pr, c]) => {
      if (p.status === 'fulfilled') setProfile(p.value);
      if (s.status === 'fulfilled') setSkills(s.value.slice(0, 6));
      if (pr.status === 'fulfilled') setProjects(pr.value.slice(0, 3));
      if (c.status === 'fulfilled') setCertifications(c.value.slice(0, 2));
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="pt-40 pb-24 px-6 max-w-6xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        <div>
          {profile?.avatar_url && (
            <img
              src={profile.avatar_url}
              alt={profile.full_name || 'Profile photo'}
              className="w-20 h-20 rounded-full object-cover border-2 border-cyan/40 shadow-glow mb-6"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          )}
          <p className="text-cyan text-sm font-medium mb-4">
            {profile?.title || 'Computer Science Engineering Student'}
          </p>
          <h1 className="text-4xl sm:text-5xl font-display font-semibold leading-tight">
            Hi, I'm {profile?.full_name?.split(' ')[0] || 'Syed Hassan'} — I build software
            that turns ideas into <span className="text-cyan">working models</span>.
          </h1>
          <p className="text-muted mt-6 max-w-lg">
            {profile?.tagline || 'Building impactful software and exploring cloud technologies.'}
          </p>
          <div className="flex flex-wrap gap-4 mt-9">
            <Link to="/about" className="btn-primary">About me</Link>
            <Link to="/projects" className="btn-ghost">View projects</Link>
            {profile?.resume_url && (
              <a href={profile.resume_url} download className="btn-ghost">Download resume</a>
            )}
          </div>
        </div>
        <TerminalCard />
      </section>

      {loading ? (
        <Loader label="Loading portfolio" />
      ) : (
        <>
          {/* Skills preview */}
          <SectionReveal className="px-6 max-w-6xl mx-auto py-16">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-heading">Core skills</h2>
                <p className="section-sub">The languages and tools I reach for most.</p>
              </div>
              <Link to="/skills" className="text-cyan text-sm whitespace-nowrap hover:text-cyan-soft">See all skills</Link>
            </div>
            {skills.length === 0 ? (
              <EmptyState title="Skills coming soon" hint="Add skills from the admin panel." />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {skills.map((s) => <SkillCard key={s.id} skill={s} />)}
              </div>
            )}
          </SectionReveal>

          {/* Projects preview */}
          <SectionReveal className="px-6 max-w-6xl mx-auto py-16">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-heading">Featured projects</h2>
                <p className="section-sub">A few things I've built recently.</p>
              </div>
              <Link to="/projects" className="text-cyan text-sm whitespace-nowrap hover:text-cyan-soft">All projects</Link>
            </div>
            {projects.length === 0 ? (
              <EmptyState title="Projects coming soon" hint="Add your first project from the admin panel." />
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {projects.map((p, i) => <ProjectCard key={p.id} project={p} wide={i === 0} />)}
              </div>
            )}
          </SectionReveal>

          {/* Certifications preview */}
          <SectionReveal className="px-6 max-w-6xl mx-auto py-16">
            <div className="flex items-end justify-between gap-4 mb-10">
              <div>
                <h2 className="section-heading">Certifications</h2>
                <p className="section-sub">Credentials that back up the skills above.</p>
              </div>
              <Link to="/certifications" className="text-cyan text-sm whitespace-nowrap hover:text-cyan-soft">See all</Link>
            </div>
            {certifications.length === 0 ? (
              <EmptyState title="Certifications coming soon" hint="Add your first certification from the admin panel." />
            ) : (
              <div className="grid sm:grid-cols-2 gap-5">
                {certifications.map((c) => <CertificationCard key={c.id} cert={c} />)}
              </div>
            )}
          </SectionReveal>
        </>
      )}
    </div>
  );
}

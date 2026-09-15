const PROFICIENCY_WIDTH = {
  Learning: 'w-1/4',
  Familiar: 'w-2/4',
  Proficient: 'w-3/4',
  Advanced: 'w-full',
};

export default function SkillCard({ skill }) {
  return (
    <div className="glass-card p-5">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-display font-medium text-ink">{skill.name}</h3>
        <span className="text-xs text-muted">{skill.proficiency}</span>
      </div>
      <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
        <div className={`h-full bg-gradient-to-r from-cyan to-cyan-soft rounded-full ${PROFICIENCY_WIDTH[skill.proficiency] || 'w-1/2'}`} />
      </div>
    </div>
  );
}

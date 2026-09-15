export default function CertificationCard({ cert }) {
  return (
    <div className="glass-card p-6 flex flex-col h-full">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-elevated2 border border-line flex items-center justify-center shrink-0">
          {cert.badge_url ? (
            <img src={cert.badge_url} alt="" className="w-8 h-8 object-contain" />
          ) : (
            <span className="text-cyan text-lg font-display">✓</span>
          )}
        </div>
        <div>
          <h3 className="font-display text-ink leading-snug">{cert.name}</h3>
          <p className="text-muted text-sm mt-1">{cert.issuer}</p>
        </div>
      </div>
      {cert.description && <p className="text-muted text-sm mt-4 flex-1">{cert.description}</p>}
      {cert.credential_url && (
        <a
          href={cert.credential_url}
          target="_blank"
          rel="noreferrer"
          className="mt-5 text-sm text-cyan hover:text-cyan-soft transition-colors self-start"
        >
          View credential
        </a>
      )}
    </div>
  );
}

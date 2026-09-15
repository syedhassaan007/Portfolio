import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Footer() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    api.getSocialLinks().then(setLinks).catch(() => setLinks([]));
  }, []);

  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-muted text-sm">© {new Date().getFullYear()} Syed Hassan. Built with React, Express & MySQL.</p>
        <div className="flex gap-4">
          {links.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target={link.url.startsWith('mailto:') ? undefined : '_blank'}
              rel="noreferrer"
              className="text-sm text-muted hover:text-cyan transition-colors"
            >
              {link.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

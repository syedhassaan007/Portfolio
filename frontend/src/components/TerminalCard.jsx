import { useEffect, useState } from 'react';
import TiltCard from './TiltCard';

const SNIPPETS = [
  {
    lang: 'python',
    lines: [
      { t: 'class ', c: 'text-cyan' }, { t: 'Engineer', c: 'text-amber' }, { t: '(Student):' },
      { t: '    def build(self, idea):', indent: true },
      { t: '        return Solution(idea)', indent: true },
    ],
  },
  {
    lang: 'sql',
    lines: [
      { t: 'SELECT skill, hours_practiced' },
      { t: 'FROM growth' },
      { t: "WHERE mindset = 'curious';" },
    ],
  },
  {
    lang: 'bash',
    lines: [
      { t: '$ aws s3 cp ./build s3://portfolio' },
      { t: 'upload: complete ✓', c: 'text-cyan' },
    ],
  },
];

export default function TerminalCard() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % SNIPPETS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const snippet = SNIPPETS[index];

  return (
    <TiltCard className="w-full max-w-sm mx-auto animate-float">
      <div className="glass-panel p-0 overflow-hidden">
        <div className="flex items-center gap-2 px-4 py-3 border-b border-line bg-elevated2/60">
          <span className="w-2.5 h-2.5 rounded-full bg-[#F5A623]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#4FD8C4]/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
          <span className="ml-auto text-xs text-muted font-body">{snippet.lang}</span>
        </div>
        <pre className="p-5 text-[13px] leading-relaxed font-mono min-h-[140px]">
          {snippet.lines.map((line, i) => (
            <div key={i} className={line.indent ? 'pl-4' : ''}>
              <span className={line.c || 'text-ink/80'}>{line.t}</span>
            </div>
          ))}
          <span className="inline-block w-2 h-4 bg-cyan/70 animate-pulse align-middle" />
        </pre>
      </div>
    </TiltCard>
  );
}

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ResourceManager from '../../components/admin/ResourceManager';
import MessagesPanel from '../../components/admin/MessagesPanel';
import ProfileEditor from '../../components/admin/ProfileEditor';
import { RESOURCES } from './resourceConfig';

const TABS = [
  { key: 'profile', label: 'Profile' },
  ...Object.keys(RESOURCES).map((key) => ({ key, label: RESOURCES[key].label })),
  { key: 'messages', label: 'Messages' },
];

export default function AdminDashboard() {
  const [active, setActive] = useState('profile');
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/admin/login', { replace: true });
  }

  return (
    <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
        <div>
          <p className="text-cyan text-sm font-medium mb-1">Admin</p>
          <h1 className="text-2xl font-display font-semibold">Manage portfolio content</h1>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm">Signed in as {username}</span>
          <button onClick={handleLogout} className="btn-ghost py-2 px-5 text-sm">Log out</button>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap mb-10 border-b border-line pb-4">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActive(tab.key)}
            className={`px-4 py-2 rounded-full text-sm transition-colors ${
              active === tab.key ? 'bg-cyan/10 text-cyan' : 'text-muted hover:text-ink'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {active === 'profile' && <ProfileEditor />}
      {active === 'messages' && <MessagesPanel />}
      {RESOURCES[active] && <ResourceManager resourceKey={active} />}
    </section>
  );
}

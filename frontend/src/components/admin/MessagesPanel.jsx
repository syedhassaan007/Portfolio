import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import Loader from '../Loader';
import EmptyState from '../EmptyState';

export default function MessagesPanel() {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setStatus('loading');
    try {
      const data = await api.getContactMessages();
      setMessages(data);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  async function handleRead(id) {
    await api.markMessageRead(id);
    setMessages((m) => m.map((msg) => (msg.id === id ? { ...msg, is_read: true } : msg)));
  }

  async function handleDelete(id) {
    if (!confirm('Delete this message?')) return;
    await api.deleteMessage(id);
    setMessages((m) => m.filter((msg) => msg.id !== id));
  }

  if (status === 'loading') return <Loader label="Loading messages" />;
  if (status === 'error') return <p className="text-amber text-sm">Couldn't load messages.</p>;
  if (messages.length === 0) return <EmptyState title="No messages yet" hint="Messages sent from the Contact page will appear here." />;

  return (
    <div className="space-y-4">
      {messages.map((msg) => (
        <div key={msg.id} className={`glass-card p-5 ${msg.is_read ? 'opacity-70' : ''}`}>
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-ink font-medium">{msg.name} <span className="text-muted font-normal">— {msg.email}</span></p>
              {msg.subject && <p className="text-cyan text-sm mt-1">{msg.subject}</p>}
            </div>
            <div className="flex gap-3 text-sm">
              {!msg.is_read && (
                <button onClick={() => handleRead(msg.id)} className="text-cyan hover:text-cyan-soft">Mark read</button>
              )}
              <button onClick={() => handleDelete(msg.id)} className="text-amber hover:text-amber-soft">Delete</button>
            </div>
          </div>
          <p className="text-ink/80 text-sm mt-3">{msg.message}</p>
          <p className="text-muted text-xs mt-3">{new Date(msg.created_at).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}

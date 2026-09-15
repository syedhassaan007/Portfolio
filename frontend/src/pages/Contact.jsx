import { useState } from 'react';
import SectionReveal from '../components/SectionReveal';
import { api } from '../services/api';

const INITIAL = { name: '', email: '', subject: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INITIAL);
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [errorMsg, setErrorMsg] = useState('');

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');
    try {
      await api.sendContactMessage(form);
      setStatus('sent');
      setForm(INITIAL);
    } catch (err) {
      setStatus('error');
      setErrorMsg(err.message || 'Could not send your message. Please try again.');
    }
  }

  return (
    <section className="pt-40 pb-24 px-6 max-w-2xl mx-auto">
      <SectionReveal>
        <p className="text-cyan text-sm font-medium mb-3">Contact</p>
        <h1 className="text-3xl sm:text-4xl font-display font-semibold mb-4">Let's talk</h1>
        <p className="section-sub mb-10">
          Have a role, project, or question in mind? Send a message and I'll get back to you.
        </p>

        <form onSubmit={handleSubmit} className="glass-panel p-8 space-y-5" noValidate>
          <div className="grid sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="text-sm text-muted block mb-2">Name</label>
              <input
                id="name" required value={form.name}
                onChange={(e) => update('name', e.target.value)}
                className="input-field" placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="text-sm text-muted block mb-2">Email</label>
              <input
                id="email" type="email" required value={form.email}
                onChange={(e) => update('email', e.target.value)}
                className="input-field" placeholder="you@example.com"
              />
            </div>
          </div>
          <div>
            <label htmlFor="subject" className="text-sm text-muted block mb-2">Subject</label>
            <input
              id="subject" value={form.subject}
              onChange={(e) => update('subject', e.target.value)}
              className="input-field" placeholder="What's this about?"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-sm text-muted block mb-2">Message</label>
            <textarea
              id="message" required rows={5} value={form.message}
              onChange={(e) => update('message', e.target.value)}
              className="input-field resize-none" placeholder="Write your message here…"
            />
          </div>

          <button type="submit" disabled={status === 'sending'} className="btn-primary w-full justify-center disabled:opacity-60">
            {status === 'sending' ? 'Sending…' : 'Send message'}
          </button>

          {status === 'sent' && (
            <p className="text-cyan text-sm text-center">Message sent. Thanks for reaching out — I'll reply soon.</p>
          )}
          {status === 'error' && (
            <p className="text-amber text-sm text-center">{errorMsg}</p>
          )}
        </form>
      </SectionReveal>
    </section>
  );
}

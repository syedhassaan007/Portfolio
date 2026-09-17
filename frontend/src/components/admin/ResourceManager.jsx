import { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { RESOURCES } from '../../pages/admin/resourceConfig';
import Loader from '../Loader';
import EmptyState from '../EmptyState';

const EMPTY_BY_TYPE = { checkbox: false, number: 0 };

function blankRecord(fields) {
  const record = {};
  fields.forEach((f) => { record[f.name] = EMPTY_BY_TYPE[f.type] ?? ''; });
  return record;
}

export default function ResourceManager({ resourceKey }) {
  const config = RESOURCES[resourceKey];
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading');
  const [editing, setEditing] = useState(null); // record being edited, or 'new'
  const [form, setForm] = useState({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resourceKey]);

  function load() {
    setStatus('loading');
    fetchAll();
  }

  async function fetchAll() {
    try {
      const data = await api.getAll(resourceKey);
      setItems(data);
      setStatus('ready');
    } catch {
      setStatus('error');
    }
  }

  function startCreate() {
    setForm(blankRecord(config.fields));
    setEditing('new');
    setError('');
  }

  function startEdit(item) {
    setForm({ ...item });
    setEditing(item.id);
    setError('');
  }

  function cancelEdit() {
    setEditing(null);
    setError('');
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError('');
    try {
      if (editing === 'new') {
        await api.create(resourceKey, form);
      } else {
        await api.update(resourceKey, editing, form);
      }
      setEditing(null);
      await fetchAll();
    } catch (err) {
      setError(err.message || 'Could not save.');
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!confirm('Delete this record? This cannot be undone.')) return;
    try {
      await api.remove(resourceKey, id);
      await fetchAll();
    } catch (err) {
      alert(err.message || 'Could not delete.');
    }
  }

  if (status === 'loading') return <Loader label={`Loading ${config.label.toLowerCase()}`} />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="font-display text-xl text-ink">{config.label}</h2>
        {!editing && (
          <button onClick={startCreate} className="btn-primary py-2 px-5 text-sm">Add {config.label.slice(0, -1)}</button>
        )}
      </div>

      {editing && (
        <form onSubmit={handleSave} className="glass-panel p-6 mb-8 space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            {config.fields.map((f) => (
              <FieldInput key={f.name} field={f} value={form[f.name]} onChange={(v) => setForm((s) => ({ ...s, [f.name]: v }))} />
            ))}
          </div>
          {error && <p className="text-amber text-sm">{error}</p>}
          <div className="flex gap-3">
            <button type="submit" disabled={saving} className="btn-primary py-2 px-6 text-sm disabled:opacity-60">
              {saving ? 'Saving…' : 'Save'}
            </button>
            <button type="button" onClick={cancelEdit} className="btn-ghost py-2 px-6 text-sm">Cancel</button>
          </div>
        </form>
      )}

      {status === 'error' && <p className="text-amber text-sm">Couldn't load {config.label.toLowerCase()}.</p>}

      {status === 'ready' && items.length === 0 && !editing && (
        <EmptyState title={`No ${config.label.toLowerCase()} yet`} hint="Use the Add button above to create the first one." />
      )}

      {items.length > 0 && (
        <div className="glass-panel overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-muted border-b border-line">
                <th className="p-4 font-normal">{config.fields[0]?.label}</th>
                <th className="p-4 font-normal w-40"></th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id} className="border-b border-line last:border-0">
                  <td className="p-4 text-ink">{item[config.titleField]}</td>
                  <td className="p-4">
                    <div className="flex gap-3 justify-end">
                      <button onClick={() => startEdit(item)} className="text-cyan hover:text-cyan-soft">Edit</button>
                      <button onClick={() => handleDelete(item.id)} className="text-amber hover:text-amber-soft">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

function FieldInput({ field, value, onChange }) {
  const wide = field.type === 'textarea';
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <label className="text-sm text-muted block mb-2">{field.label}{field.required && ' *'}</label>
      {field.type === 'textarea' && (
        <textarea rows={4} className="input-field resize-none" value={value ?? ''} onChange={(e) => onChange(e.target.value)} />
      )}
      {field.type === 'select' && (
        <select className="input-field" value={value ?? ''} onChange={(e) => onChange(e.target.value)}>
          <option value="">Select…</option>
          {field.options.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )}
      {field.type === 'checkbox' && (
        <input type="checkbox" checked={!!value} onChange={(e) => onChange(e.target.checked)} className="w-5 h-5 accent-[#4FD8C4]" />
      )}
      {['text', 'date', 'number'].includes(field.type) && (
        <input
          type={field.type}
          required={field.required}
          className="input-field"
          value={value ?? ''}
          onChange={(e) => onChange(field.type === 'number' ? Number(e.target.value) : e.target.value)}
        />
      )}
    </div>
  );
}

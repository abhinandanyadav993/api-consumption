import { useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'
import { User, Shield, Key, Copy, Check, Camera, Bolt, Mail, Building } from '../components/Icons.jsx'
import './profile.css'

const TABS = [
  { id: 'general', label: 'General', icon: User },
  { id: 'keys', label: 'API keys', icon: Key },
  { id: 'security', label: 'Security', icon: Shield },
]

const KEYS = [
  { name: 'Production · read', prefix: 'ck_live_9f2a', tail: '·············· 4c71', used: '2 min ago', env: 'live' },
  { name: 'Sandbox · read/write', prefix: 'ck_test_1b8d', tail: '·············· e300', used: '3 days ago', env: 'test' },
]

export default function Profile() {
  const { user, updateProfile, initials } = useAuth()
  const [tab, setTab] = useState('general')
  const [copied, setCopied] = useState(null)
  const [form, setForm] = useState({ name: user.name, email: user.email, org: user.org, timezone: user.timezone })
  const [saved, setSaved] = useState(false)

  const change = (k, v) => { setForm(f => ({ ...f, [k]: v })); setSaved(false) }
  const save = () => { updateProfile(form); setSaved(true); setTimeout(() => setSaved(false), 2200) }
  const copy = (id, text) => {
    navigator.clipboard?.writeText(text).catch(() => {})
    setCopied(id); setTimeout(() => setCopied(null), 1600)
  }

  return (
    <main className="prof">
      {/* banner */}
      <section className="card prof-banner">
        <div className="prof-cover" />
        <div className="prof-id">
          <div className="prof-avatar">
            {initials}
            <button className="prof-avatar-edit" aria-label="Change photo"><Camera size={15} /></button>
          </div>
          <div className="prof-id-text">
            <h1 className="display">{user.name}</h1>
            <p>{user.role} · {user.org}</p>
          </div>
          <div className="prof-id-badges">
            <span className="prof-badge amber"><i />DEV access</span>
            <span className="prof-badge teal"><Bolt size={13} />Platform admin</span>
          </div>
        </div>
      </section>

      <div className="prof-body">
        {/* left nav */}
        <nav className="prof-tabs">
          {TABS.map(t => (
            <button key={t.id} className={`prof-tab ${tab === t.id ? 'active' : ''}`} onClick={() => setTab(t.id)}>
              <t.icon size={17} />{t.label}
            </button>
          ))}
        </nav>

        {/* panels */}
        <div className="prof-panel">
          {tab === 'general' && (
            <section className="card prof-section">
              <div className="prof-section-head">
                <div><h2 className="display">Account details</h2><p>Update your personal information and workspace defaults.</p></div>
                <button className="btn btn-primary" onClick={save}>
                  {saved ? <><Check size={15} />Saved</> : 'Save changes'}
                </button>
              </div>
              <div className="prof-form">
                <div className="field span2"><label>Full name</label>
                  <div className="prof-ig"><User size={16} /><input className="control" value={form.name} onChange={e => change('name', e.target.value)} /></div>
                </div>
                <div className="field span2"><label>Email address</label>
                  <div className="prof-ig"><Mail size={16} /><input className="control" type="email" value={form.email} onChange={e => change('email', e.target.value)} /></div>
                </div>
                <div className="field"><label>Organisation</label>
                  <div className="prof-ig"><Building size={16} /><input className="control" value={form.org} onChange={e => change('org', e.target.value)} /></div>
                </div>
                <div className="field"><label>Timezone</label>
                  <select className="control" value={form.timezone} onChange={e => change('timezone', e.target.value)}>
                    <option>Asia/Kolkata (GMT+5:30)</option>
                    <option>Europe/London (GMT+0)</option>
                    <option>America/New_York (GMT-5)</option>
                  </select>
                </div>
                <div className="field"><label>Role</label><input className="control" value={user.role} disabled /></div>
              </div>
            </section>
          )}

          {tab === 'keys' && (
            <section className="card prof-section">
              <div className="prof-section-head">
                <div><h2 className="display">API keys</h2><p>Keys authenticate requests to the gateway. Keep them secret.</p></div>
                <button className="btn btn-primary"><Key size={15} />New key</button>
              </div>
              <ul className="prof-keys">
                {KEYS.map(k => (
                  <li key={k.prefix} className="prof-key">
                    <span className={`prof-key-env ${k.env}`}>{k.env}</span>
                    <div className="prof-key-main">
                      <b>{k.name}</b>
                      <code className="mono">{k.prefix}{k.tail}</code>
                    </div>
                    <span className="prof-key-used mono">Used {k.used}</span>
                    <button className="prof-key-copy" onClick={() => copy(k.prefix, k.prefix + k.tail)}>
                      {copied === k.prefix ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {tab === 'security' && (
            <section className="card prof-section">
              <div className="prof-section-head">
                <div><h2 className="display">Security</h2><p>Protect your account and manage active sessions.</p></div>
              </div>
              <div className="prof-rows">
                <Row title="Password" desc="Last changed 42 days ago" action="Update" />
                <Row title="Two-factor authentication" desc="Authenticator app enabled" ok action="Manage" />
                <Row title="Active sessions" desc="3 devices signed in" action="Review" />
                <Row title="Sign out everywhere" desc="End all sessions except this one" danger action="Sign out" />
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}

function Row({ title, desc, action, ok, danger }) {
  return (
    <div className="prof-row">
      <div className="prof-row-text">
        <b>{title} {ok && <span className="prof-ok"><Check size={12} />on</span>}</b>
        <small>{desc}</small>
      </div>
      <button className={`btn btn-ghost ${danger ? 'prof-danger' : ''}`} style={{ height: 38 }}>{action}</button>
    </div>
  )
}

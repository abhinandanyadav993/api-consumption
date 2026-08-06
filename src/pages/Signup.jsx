import { useState, useMemo } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { User, Mail, Lock, Building, Eye, EyeOff, Check, Shield, ArrowRight } from '../components/Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

const LABELS = ['', 'Weak', 'Fair', 'Good', 'Strong']

function scorePassword(pw) {
  let s = 0
  if (pw.length >= 8) s++
  if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++
  if (/\d/.test(pw)) s++
  if (/[^A-Za-z0-9]/.test(pw)) s++
  return pw ? Math.max(1, s) : 0
}

export default function Signup() {
  const [show, setShow] = useState(false)
  const [pw, setPw] = useState('')
  const [first, setFirst] = useState('')
  const [last, setLast] = useState('')
  const [email, setEmail] = useState('')
  const { login, isAuthed } = useAuth()
  const navigate = useNavigate()

  const strength = useMemo(() => scorePassword(pw), [pw])

  if (isAuthed) return <Navigate to="/" replace />

  const submit = e => {
    e.preventDefault()
    const name = `${first} ${last}`.trim()
    login({ name: name || 'New User', email: email || 'new.user@cardconsole.io' })
    navigate('/')
  }

  return (
    <AuthLayout
      eyebrow="Get started"
      heading="Create your account"
      sub="Set up access to the API management console in under a minute."
    >
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-name-row">
          <div className="auth-inputgroup">
            <User size={17} />
            <input className="control" placeholder="First name" autoComplete="given-name"
              value={first} onChange={e => setFirst(e.target.value)} required />
          </div>
          <div className="auth-inputgroup">
            <input className="control" placeholder="Last name" autoComplete="family-name"
              style={{ paddingLeft: 13 }} value={last} onChange={e => setLast(e.target.value)} required />
          </div>
        </div>

        <div className="auth-inputgroup">
          <Building size={17} />
          <input className="control" placeholder="Organisation" autoComplete="organization" required />
        </div>

        <div className="auth-inputgroup">
          <Mail size={17} />
          <input className="control" type="email" placeholder="Work email" autoComplete="email"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="auth-inputgroup has-btn">
          <Lock size={17} />
          <input className="control" type={show ? 'text' : 'password'} placeholder="Create password"
            autoComplete="new-password" value={pw} onChange={e => setPw(e.target.value)} required />
          <button type="button" className="auth-eye" onClick={() => setShow(v => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <div className={`auth-strength s${strength}`}>
          <div className="auth-bars"><span /><span /><span /><span /></div>
          <small>{strength ? `Password strength: ${LABELS[strength]}` : 'Use 8+ characters with a mix of letters, numbers & symbols'}</small>
        </div>

        <label className="auth-check" style={{ fontSize: 13, color: 'var(--text-mid)' }}>
          <input type="checkbox" required />
          <span className="box"><Check size={13} /></span>
          I agree to the <a href="#terms" className="auth-mini-link">Terms</a> &amp; <a href="#privacy" className="auth-mini-link">Privacy Policy</a>
        </label>

        <button className="btn btn-primary btn-block" type="submit">
          Create account <ArrowRight size={16} />
        </button>

        <div className="auth-divider">OR</div>

        <button type="button" className="auth-sso" onClick={submit}>
          <Shield size={17} /> Sign up with SSO
        </button>
      </form>

      <p className="auth-switch">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  )
}

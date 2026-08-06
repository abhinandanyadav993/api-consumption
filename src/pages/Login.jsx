import { useState } from 'react'
import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom'
import AuthLayout from '../components/AuthLayout.jsx'
import { Mail, Lock, Eye, EyeOff, Check, Shield, ArrowRight } from '../components/Icons.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [show, setShow] = useState(false)
  const [email, setEmail] = useState('')
  const { login, isAuthed } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const dest = location.state?.from || '/'

  if (isAuthed) return <Navigate to={dest} replace />

  const submit = e => {
    e.preventDefault()
    login(email ? { email } : {})
    navigate(dest, { replace: true })
  }
  const sso = () => { login({}); navigate(dest, { replace: true }) }

  return (
    <AuthLayout
      eyebrow="Welcome back"
      heading="Sign in to your console"
      sub="Use your organisation account to access APIM and Gateway."
    >
      <form className="auth-form" onSubmit={submit}>
        <div className="auth-inputgroup">
          <Mail size={17} />
          <input className="control" type="email" placeholder="you@company.com" autoComplete="email"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>

        <div className="auth-inputgroup has-btn">
          <Lock size={17} />
          <input className="control" type={show ? 'text' : 'password'} placeholder="Password"
            autoComplete="current-password" required />
          <button type="button" className="auth-eye" onClick={() => setShow(v => !v)}
            aria-label={show ? 'Hide password' : 'Show password'}>
            {show ? <EyeOff size={17} /> : <Eye size={17} />}
          </button>
        </div>

        <div className="auth-row">
          <label className="auth-check">
            <input type="checkbox" defaultChecked />
            <span className="box"><Check size={13} /></span>
            Keep me signed in
          </label>
          <a href="#reset" className="auth-mini-link">Forgot password?</a>
        </div>

        <button className="btn btn-primary btn-block" type="submit">
          Sign in <ArrowRight size={16} />
        </button>

        <div className="auth-divider">OR</div>

        <button type="button" className="auth-sso" onClick={sso}>
          <Shield size={17} /> Continue with SSO
        </button>
      </form>

      <p className="auth-switch">
        New to Card Console? <Link to="/signup">Create an account</Link>
      </p>
    </AuthLayout>
  )
}

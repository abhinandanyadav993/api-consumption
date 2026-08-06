import { Logo } from './Icons.jsx'
import './auth.css'

// Animated "live traffic" signal used on the brand panel.
function SignalArt() {
  const path = 'M0 120 C 60 120 70 60 120 60 S 190 150 240 150 300 40 360 40 420 130 480 110 540 70 600 90'
  return (
    <svg className="auth-signal" viewBox="0 0 600 200" preserveAspectRatio="none" aria-hidden="true">
      <defs>
        <linearGradient id="sigFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#2DD4BF" stopOpacity=".22" />
          <stop offset="1" stopColor="#2DD4BF" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={`${path} L 600 200 L 0 200 Z`} fill="url(#sigFill)" />
      <path className="auth-signal-line" d={path} fill="none" stroke="#2DD4BF" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export default function AuthLayout({ eyebrow, heading, sub, children }) {
  return (
    <div className="auth">
      {/* Brand / marketing panel */}
      <aside className="auth-brand">
        <div className="auth-grid-bg" aria-hidden="true" />
        <div className="auth-brand-top">
          <span className="auth-mark"><Logo size={19} color="#04201C" /></span>
          <div className="auth-wordmark">
            <b>Card Console</b><small>APIM · Gateway</small>
          </div>
        </div>

        <div className="auth-brand-mid">
          <p className="auth-eyebrow">Unified API management</p>
          <h2 className="auth-headline">See every call.<br />Trust every route.</h2>
          <p className="auth-lede">
            One console for your APIM policies and gateway traffic — consumption,
            latency and reliability, live across environments.
          </p>

          <div className="auth-chips">
            <span className="auth-chip"><i className="d-green" />99.98% uptime</span>
            <span className="auth-chip"><i className="d-teal" />1.2k calls/sec</span>
            <span className="auth-chip"><i className="d-blue" />p95 · 340ms</span>
          </div>
        </div>

        <SignalArt />

        <div className="auth-brand-foot">
          <span>SOC 2 · PCI-DSS ready</span>
          <span className="mono">stellar.nonprod</span>
        </div>
      </aside>

      {/* Form panel */}
      <main className="auth-panel">
        <div className="auth-form-wrap">
          <div className="auth-mobile-brand">
            <span className="auth-mark sm"><Logo size={16} color="#04201C" /></span>
            <b>Card Console</b>
          </div>
          {eyebrow && <p className="auth-form-eyebrow">{eyebrow}</p>}
          <h1 className="auth-title">{heading}</h1>
          {sub && <p className="auth-subtitle">{sub}</p>}
          {children}
        </div>
      </main>
    </div>
  )
}

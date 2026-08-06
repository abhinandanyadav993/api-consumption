import { useState, useRef, useEffect } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'
import { Logo, Bell, User, LogOut, Chevron, Menu, X, Sun, Moon } from './Icons.jsx'
import './Header.css'

export default function Header() {
  const { user, initials, logout } = useAuth()
  const { theme, toggle } = useTheme()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)   // profile dropdown
  const [navOpen, setNavOpen] = useState(false)     // mobile nav
  const ref = useRef(null)

  useEffect(() => {
    const onClick = e => { if (ref.current && !ref.current.contains(e.target)) setMenuOpen(false) }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const signOut = () => { setMenuOpen(false); logout(); navigate('/login') }

  return (
    <header className="hdr">
      <button className="hdr-burger" aria-label="Menu" onClick={() => setNavOpen(v => !v)}>
        {navOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <NavLink to="/" className="hdr-brand" onClick={() => setNavOpen(false)}>
        <span className="hdr-mark"><Logo size={17} color="#04201C" /></span>
        <span className="hdr-name">
          <b>Card Console</b>
          <small>Digital · Stellar</small>
        </span>
      </NavLink>

      <nav className={`hdr-nav ${navOpen ? 'open' : ''}`} aria-label="Primary">
        <NavLink to="/" end className="hdr-link" onClick={() => setNavOpen(false)}>
          <i className="hdr-dot" />APIM
        </NavLink>
        <NavLink to="/gateway" className="hdr-link" onClick={() => setNavOpen(false)}>
          <i className="hdr-dot" />Gateway
        </NavLink>
      </nav>

      <div className="hdr-spacer" />

      <span className="hdr-env"><i className="hdr-pulse" />DEV · Non-prod</span>

      <button className="hdr-icon" aria-label="Toggle theme" title="Toggle theme" onClick={toggle}>
        {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      </button>

      <button className="hdr-icon" aria-label="Notifications">
        <Bell size={18} /><i className="hdr-badge" />
      </button>

      <div className="hdr-profile-wrap" ref={ref}>
        <button className="hdr-profile" onClick={() => setMenuOpen(v => !v)} aria-expanded={menuOpen}>
          <span className="hdr-who">
            <b>{user.name}</b>
            <small>{user.role}</small>
          </span>
          <span className="hdr-av">{initials}</span>
          <Chevron size={15} className={`hdr-caret ${menuOpen ? 'up' : ''}`} />
        </button>

        {menuOpen && (
          <div className="hdr-menu" role="menu">
            <div className="hdr-menu-head">
              <span className="hdr-av lg">{initials}</span>
              <div>
                <b>{user.name}</b>
                <small>{user.email}</small>
              </div>
            </div>
            <button className="hdr-menu-item" role="menuitem"
              onClick={() => { setMenuOpen(false); navigate('/profile') }}>
              <User size={17} />View profile
            </button>
            <button className="hdr-menu-item danger" role="menuitem" onClick={signOut}>
              <LogOut size={17} />Sign out
            </button>
          </div>
        )}
      </div>
    </header>
  )
}

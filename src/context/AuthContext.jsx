import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export const initialsOf = (name = '') =>
  name.trim().split(/\s+/).slice(0, 2).map(w => w[0]?.toUpperCase() ?? '').join('') || 'CC'

export function AuthProvider({ children }) {
  const [isAuthed, setIsAuthed] = useState(() => {
    try { return localStorage.getItem('cc_authed') === '1' } catch { return false }
  })

  const [user, setUser] = useState({
    name: 'Aarav Sharma',
    email: 'aarav.sharma@cardconsole.io',
    role: 'Platform Ops',
    org: 'Meridian Bank',
    timezone: 'Asia/Kolkata (GMT+5:30)',
  })

  const login = (data = {}) => {
    setUser(u => ({ ...u, ...data }))
    setIsAuthed(true)
    try { localStorage.setItem('cc_authed', '1') } catch { /* ignore */ }
  }

  const logout = () => {
    setIsAuthed(false)
    try { localStorage.removeItem('cc_authed') } catch { /* ignore */ }
  }

  const updateProfile = (data = {}) => setUser(u => ({ ...u, ...data }))

  const value = {
    user,
    isAuthed,
    initials: initialsOf(user.name),
    login,
    logout,
    updateProfile,
    setUser,
  }
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

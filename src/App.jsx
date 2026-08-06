import { Routes, Route, Outlet, Navigate, useLocation } from 'react-router-dom'
import Header from './components/Header.jsx'
import Login from './pages/Login.jsx'
import Signup from './pages/Signup.jsx'
import Dashboard from './pages/Dashboard.jsx'
import Gateway from './pages/Gateway.jsx'
import Profile from './pages/Profile.jsx'
import { useAuth } from './context/AuthContext.jsx'

// Gate: only render the authenticated shell when signed in, else send to /login.
function RequireAuth() {
  const { isAuthed } = useAuth()
  const location = useLocation()
  if (!isAuthed) return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<RequireAuth />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/gateway" element={<Gateway />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

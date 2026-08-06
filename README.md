# Card Console

API management & consumption console (APIM · Gateway) built with **React + Vite**.
Fully responsive, with a **light/dark theme toggle**, **auth-gated** app routes, and polished
**login / signup / profile** screens — all sharing one "instrument-panel" design language
(Space Grotesk / Inter / IBM Plex Mono).

## Getting started

```bash
npm install
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build (http://localhost:4173)
```

> Requires **Node 18+** (check with `node -v`).

## Trying it out

A fresh visit is **not signed in**, so any app route redirects to **/login**.
Sign in with any email + password, or click **Continue with SSO** — you'll land on the
APIM dashboard. The header has:

- **APIM · Gateway** nav — two genuinely different views.
- **Theme toggle** (sun/moon) — switches light/dark, remembered across reloads.
- **Profile menu** (top-right) → *View profile* / *Sign out* (sign-out returns you to login).

## Routes

| Path        | Screen                                            | Gated |
|-------------|---------------------------------------------------|:-----:|
| `/login`    | Sign in (split-screen, animated panel)            |  no   |
| `/signup`   | Create account (password strength meter)          |  no   |
| `/`         | **APIM** — consumption analytics + top endpoints  |  yes  |
| `/gateway`  | **Gateway** — node health, routes, policies       |  yes  |
| `/profile`  | Profile (general · API keys · security)           |  yes  |

## The three enhancements

1. **Light-theme toggle** — `context/ThemeContext.jsx` sets `data-theme` on `<html>` and
   persists to `localStorage`. All colours are CSS variables in `src/index.css`; the
   `[data-theme="light"]` block re-maps them. Charts read theme-aware CSS vars too.
2. **Auth gating** — `context/AuthContext.jsx` holds `isAuthed` (persisted in `localStorage`).
   `RequireAuth` in `App.jsx` redirects to `/login` when signed out and remembers the page you
   were headed to. `login()` / `logout()` flip the flag.
3. **Distinct APIM vs Gateway** — separate pages. APIM = consumption metrics, trend, calls by
   app, top endpoints. Gateway = edge-node health strip, gateway KPIs (req/s, 5xx, p95),
   traffic-by-route, p95 latency, a routes table, and interactive traffic-policy switches.

## Project structure

```
src/
  main.jsx                 entry (Theme + Router + Auth providers)
  App.jsx                  routes + RequireAuth gate
  index.css                design tokens (dark + light), primitives (.btn/.control/.card)
  context/
    ThemeContext.jsx       light/dark toggle, persisted
    AuthContext.jsx        demo user + isAuthed
  components/
    Icons.jsx              inline SVG icon set (no icon dependency)
    Header.jsx / .css      APIM/Gateway nav, theme toggle, profile menu, mobile menu
    AuthLayout.jsx         shared split-screen shell for login/signup
    auth.css               auth styling
    Kpi.jsx / .css         shared metric tile (used by both dashboards)
    charts/                Sparkline, TrendChart, AppBarChart (dependency-free SVG)
  pages/
    Login.jsx  Signup.jsx  Dashboard.jsx (APIM)  Gateway.jsx  Profile.jsx
    *.css
```

## Notes

- **Data is placeholder.** Swap the arrays at the top of `Dashboard.jsx`, `Gateway.jsx`,
  and `Profile.jsx` for your real API responses.
- Auth is a lightweight demo (no backend). Wire `login()` in `context/AuthContext.jsx`
  to your real SSO / identity provider.
- Class names are namespaced per area (`hdr-`, `auth-`, `dash-`, `gw-`, `prof-`, `kpi-`)
  to avoid collisions.

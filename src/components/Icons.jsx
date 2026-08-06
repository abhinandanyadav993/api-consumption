// Lightweight inline icon set — no external dependency.
const base = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.9,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

const Svg = ({ size = 18, children, ...p }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" {...base} {...p}>{children}</svg>
)

export const Logo = ({ size = 18, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 13a8 8 0 0 1 8-8" /><path d="M4 18a13 13 0 0 1 13-13" />
    <circle cx="5" cy="19" r="1.4" fill={color} stroke="none" />
  </svg>
)

export const Bell = (p) => <Svg {...p}><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" /></Svg>
export const Check = (p) => <Svg {...p}><polyline points="5 12 10 17 19 8" /></Svg>
export const Chevron = (p) => <Svg {...p}><polyline points="6 9 12 15 18 9" /></Svg>
export const Search = (p) => <Svg {...p}><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></Svg>
export const Eye = (p) => <Svg {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></Svg>
export const EyeOff = (p) => <Svg {...p}><path d="M9.9 4.24A9.1 9.1 0 0 1 12 4c6.5 0 10 7 10 7a13.2 13.2 0 0 1-1.67 2.4M6.6 6.6A13.3 13.3 0 0 0 2 11s3.5 7 10 7a9 9 0 0 0 4.6-1.3" /><path d="m2 2 20 20" /></Svg>
export const User = (p) => <Svg {...p}><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></Svg>
export const Mail = (p) => <Svg {...p}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="m3 7 9 6 9-6" /></Svg>
export const Lock = (p) => <Svg {...p}><rect x="4" y="10" width="16" height="10" rx="2.5" /><path d="M8 10V7a4 4 0 0 1 8 0v3" /></Svg>
export const Building = (p) => <Svg {...p}><rect x="5" y="3" width="14" height="18" rx="1.5" /><path d="M9 8h1M14 8h1M9 12h1M14 12h1M9 16h1M14 16h1" /></Svg>
export const Shield = (p) => <Svg {...p}><path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" /></Svg>
export const Key = (p) => <Svg {...p}><circle cx="8" cy="15" r="4" /><path d="m10.8 12.2 8-8M18 4l2 2M15 7l2 2" /></Svg>
export const Copy = (p) => <Svg {...p}><rect x="9" y="9" width="12" height="12" rx="2.5" /><path d="M5 15V5a2 2 0 0 1 2-2h10" /></Svg>
export const LogOut = (p) => <Svg {...p}><path d="M15 4h3a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-3" /><path d="M10 17l-5-5 5-5M5 12h11" /></Svg>
export const ArrowRight = (p) => <Svg {...p}><path d="M5 12h14M13 6l6 6-6 6" /></Svg>
export const Bolt = (p) => <Svg {...p}><path d="M13 3 4 14h6l-1 7 9-11h-6l1-7Z" /></Svg>
export const Menu = (p) => <Svg {...p}><path d="M4 7h16M4 12h16M4 17h16" /></Svg>
export const X = (p) => <Svg {...p}><path d="M6 6l12 12M18 6 6 18" /></Svg>
export const Gauge = (p) => <Svg {...p}><path d="M12 13 16 9" /><path d="M4.5 18a9 9 0 1 1 15 0" /></Svg>
export const Camera = (p) => <Svg {...p}><path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" /><circle cx="12" cy="13" r="3.2" /></Svg>
export const Sun = (p) => <Svg {...p}><circle cx="12" cy="12" r="4" /><path d="M12 2v2.5M12 19.5V22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M2 12h2.5M19.5 12H22M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></Svg>
export const Moon = (p) => <Svg {...p}><path d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z" /></Svg>
export const Route = (p) => <Svg {...p}><circle cx="6" cy="19" r="2.4" /><circle cx="18" cy="5" r="2.4" /><path d="M8.4 19H15a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h6.6" /></Svg>

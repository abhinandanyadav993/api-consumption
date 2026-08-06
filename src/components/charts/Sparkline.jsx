import { useId } from 'react'

export default function Sparkline({ values, color = 'var(--teal)', height = 30 }) {
  const gid = useId().replace(/:/g, '')
  const w = 120, h = height, pad = 3
  const min = Math.min(...values), max = Math.max(...values), rng = (max - min) || 1
  const pts = values.map((v, i) => [
    pad + i * ((w - 2 * pad) / (values.length - 1)),
    h - pad - ((v - min) / rng) * (h - 2 * pad),
  ])
  const line = pts.map((p, i) => (i ? 'L' : 'M') + p[0].toFixed(1) + ' ' + p[1].toFixed(1)).join(' ')
  const area = `${line} L ${w - pad} ${h} L ${pad} ${h} Z`
  const last = pts[pts.length - 1]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" width="100%" height={h} style={{ display: 'block' }}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".28" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx={last[0].toFixed(1)} cy={last[1].toFixed(1)} r="2.4" fill={color} />
    </svg>
  )
}

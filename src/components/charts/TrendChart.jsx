import { useId } from 'react'
import './charts.css'

export default function TrendChart({
  data,
  max = 900,
  ticks = [0, 300, 600, 900],
  color = '#FF6600',
}) {
  const gid = useId().replace(/:/g, '')
  const W = 640, H = 260, L = 44, R = 16, T = 18, B = 34
  const iw = W - L - R, ih = H - T - B
  const min = 0
  const x = i => L + i * (iw / (data.length - 1))
  const y = v => T + ih - ((v - min) / (max - min)) * ih

  const line = data.map((p, i) => (i ? 'L' : 'M') + x(i).toFixed(1) + ' ' + y(p.v).toFixed(1)).join(' ')
  const area = `${line} L ${x(data.length - 1)} ${T + ih} L ${x(0)} ${T + ih} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Trend chart">
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={color} stopOpacity=".26" />
          <stop offset="1" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <g className="c-grid">
        {ticks.map(g => <line key={g} x1={L} y1={y(g)} x2={W - R} y2={y(g)} />)}
      </g>
      <path d={area} fill={`url(#${gid})`} />
      <path d={line} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((p, i) => (
        <circle key={i} cx={x(i).toFixed(1)} cy={y(p.v).toFixed(1)} r="3.6"
          fill="var(--surface-1)" stroke={color} strokeWidth="2" />
      ))}
      <g className="c-axis">
        {ticks.map(g => <text key={g} x={L - 10} y={y(g) + 3.5} textAnchor="end">{g.toLocaleString()}</text>)}
        {data.map((p, i) => <text key={i} x={x(i)} y={H - 12} textAnchor="middle">{p.d}</text>)}
      </g>
    </svg>
  )
}

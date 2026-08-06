import './charts.css'

const DEFAULT_COLORS = ['#FF6600', '#34D399', '#5B9DFF', '#A78BFA']

export default function AppBarChart({ data, colors = DEFAULT_COLORS }) {
  const W = 460, rowH = 26, gap = 6, top = 6, labelW = 118, valW = 42
  const barMax = W - labelW - valW - 8
  const max = Math.max(...data.map(d => d.v))
  const H = top + data.length * (rowH + gap)

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" role="img" aria-label="Bar chart">
      {data.map((d, i) => {
        const yy = top + i * (rowH + gap)
        const bw = (d.v / max) * barMax
        const c = colors[i % colors.length]
        return (
          <g key={d.n} className="c-bar">
            <text className="c-barlabel" x="0" y={yy + rowH / 2 + 4}>{d.n}</text>
            <rect x={labelW} y={yy} width={barMax} height={rowH} rx="6" fill="var(--surface-3)" />
            <rect x={labelW} y={yy} width={bw.toFixed(1)} height={rowH} rx="6" fill={c} opacity={1 - i * 0.06} />
            <text className="c-barval" x={labelW + barMax + 6} y={yy + rowH / 2 + 4} textAnchor="end">
              {d.v.toLocaleString()}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

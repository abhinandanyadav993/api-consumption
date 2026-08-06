import './Kpi.css'

export default function Kpi({ accent, label, tag, value, sub, children }) {
  return (
    <div className="kpi" style={{ '--accent': accent }}>
      <div className="kpi-top">
        <span className="kpi-label">{label}</span>
        <span className="kpi-status"><i />{tag}</span>
      </div>
      <div className="kpi-value mono">{value}</div>
      {sub && <div className="kpi-sub mono">{sub}</div>}
      {children && <div className="kpi-viz">{children}</div>}
    </div>
  )
}

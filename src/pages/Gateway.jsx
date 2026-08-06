import { useState } from 'react'
import Kpi from '../components/Kpi.jsx'
import Sparkline from '../components/charts/Sparkline.jsx'
import TrendChart from '../components/charts/TrendChart.jsx'
import AppBarChart from '../components/charts/AppBarChart.jsx'
import { Check } from '../components/Icons.jsx'
import './gateway.css'

const latency = [
  { d: '08/01', v: 312 }, { d: '08/02', v: 298 }, { d: '08/03', v: 355 },
  { d: '08/04', v: 402 }, { d: '08/05', v: 348 }, { d: '08/06', v: 340 },
]
const routeTraffic = [
  { n: '/v1/authorize', v: 1240 }, { n: '/v2/tokens/*', v: 892 }, { n: '/v1/cards/*', v: 604 },
  { n: '/v3/score/*', v: 471 }, { n: '/v1/ledger/*', v: 338 }, { n: '/v1/statements/*', v: 236 },
]
const routes = [
  { path: '/v1/authorize', up: 'auth-svc:8080', rl: '600 / min', p95: 410, status: 'healthy' },
  { path: '/v2/tokens/{action}', up: 'token-vault:8443', rl: '1k / min', p95: 210, status: 'healthy' },
  { path: '/v1/cards/{id}/status', up: 'issuer-svc:8080', rl: 'unlimited', p95: 180, status: 'healthy' },
  { path: '/v3/score/transaction', up: 'fraud-svc:9090', rl: '300 / min', p95: 1980, status: 'degraded' },
  { path: '/v1/ledger/sync', up: 'ledger-svc:8081', rl: '120 / min', p95: 720, status: 'down' },
]
const nodes = [
  { n: 'gw-01', ok: true }, { n: 'gw-02', ok: true }, { n: 'gw-03', ok: true },
  { n: 'gw-04', ok: true }, { n: 'gw-05', ok: true }, { n: 'gw-06', ok: false },
]
const initialPolicies = [
  { id: 'ratelimit', name: 'Rate limiting', desc: 'Token bucket · per client key', on: true, stat: '48 routes' },
  { id: 'jwt', name: 'JWT validation', desc: 'RS256 · issuer allowlist', on: true, stat: '2 issuers' },
  { id: 'cors', name: 'CORS', desc: 'Allowed origins policy', on: true, stat: '6 origins' },
  { id: 'mtls', name: 'Mutual TLS', desc: 'Upstream client certificates', on: false, stat: 'off' },
  { id: 'iplist', name: 'IP allowlist', desc: 'Restrict inbound CIDR ranges', on: false, stat: 'off' },
]
const blueViolet = ['#5B9DFF', '#FF6600', '#A78BFA', '#34D399']

export default function Gateway() {
  const [policies, setPolicies] = useState(initialPolicies)
  const healthy = nodes.filter(n => n.ok).length
  const toggle = id => setPolicies(ps => ps.map(p => p.id === id ? { ...p, on: !p.on, stat: p.on ? 'off' : p.stat === 'off' ? 'on' : p.stat } : p))

  return (
    <main className="gw">
      <div className="gw-head">
        <div>
          <h1 className="display">Gateway</h1>
          <p>Routing, upstream health and traffic policies across the edge fleet.</p>
        </div>
        <div className="gw-updated"><i />Live · updated 08/06/2026 08:38</div>
      </div>

      {/* Node health strip */}
      <section className="card gw-nodes-card">
        <div className="gw-nodes-head">
          <span className="gw-nodes-title">Edge nodes</span>
          <span className="gw-nodes-count mono">{healthy}/{nodes.length} healthy</span>
        </div>
        <div className="gw-nodes">
          {nodes.map(n => (
            <span key={n.n} className={`gw-node ${n.ok ? 'ok' : 'down'}`}>
              <i />{n.n}
            </span>
          ))}
        </div>
      </section>

      {/* KPIs */}
      <section className="gw-kpis">
        <Kpi accent="var(--teal)" label="Requests / sec" tag="now" value="1,240" sub={<><b>▲ 6%</b> vs last hour</>}>
          <Sparkline values={[980, 1040, 1120, 1080, 1190, 1240]} />
        </Kpi>
        <Kpi accent="var(--red)" label="5xx error rate" tag="watch" value={<>2.1<small>%</small></>} sub={<><b style={{ color: 'var(--red)' }}>12</b> of 570 req/s</>}>
          <Sparkline values={[0.9, 1.2, 1.1, 1.8, 2.4, 2.1]} color="var(--red)" />
        </Kpi>
        <Kpi accent="var(--blue)" label="p95 latency" tag="p95" value={<>340<small> ms</small></>} sub="target < 500 ms">
          <Sparkline values={[312, 298, 355, 402, 348, 340]} color="var(--blue)" />
        </Kpi>
        <Kpi accent="var(--violet)" label="Active routes" tag="live" value="48" sub="of 52 defined">
          <Sparkline values={[44, 45, 46, 47, 47, 48]} color="var(--violet)" />
        </Kpi>
        <Kpi accent="var(--green)" label="Upstreams up" tag="health" value={<>22<small>/24</small></>} sub={<><b style={{ color: 'var(--amber)' }}>2</b> degraded</>}>
          <Sparkline values={[24, 23, 24, 23, 22, 22]} color="var(--green)" />
        </Kpi>
      </section>

      {/* Charts */}
      <section className="gw-charts">
        <div className="card">
          <div className="gw-card-head">
            <h3 className="display">Traffic by route</h3>
            <span className="gw-hint">req/s · top 6</span>
          </div>
          <div className="gw-chart"><AppBarChart data={routeTraffic} colors={blueViolet} /></div>
        </div>
        <div className="card">
          <div className="gw-card-head">
            <h3 className="display">p95 latency</h3>
            <span className="gw-legend"><i style={{ background: 'var(--blue)' }} />ms</span>
          </div>
          <div className="gw-chart">
            <TrendChart data={latency} max={600} ticks={[0, 150, 300, 450, 600]} color="#5B9DFF" />
          </div>
        </div>
      </section>

      {/* Routes table */}
      <section className="card gw-table">
        <div className="gw-card-head bordered">
          <h3 className="display">Routes</h3>
          <span className="gw-hint">upstream bindings</span>
        </div>
        <div className="gw-scroll">
          <table>
            <thead>
              <tr><th>Route</th><th>Upstream</th><th>Rate limit</th><th className="num">p95 ms</th><th className="num">Status</th></tr>
            </thead>
            <tbody>
              {routes.map(r => (
                <tr key={r.path}>
                  <td><span className="gw-path">{r.path}</span></td>
                  <td className="gw-up mono">{r.up}</td>
                  <td className="gw-rl mono">{r.rl}</td>
                  <td className="num">{r.p95.toLocaleString()}</td>
                  <td className="num"><span className={`gw-pill ${r.status}`}><i />{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Policies */}
      <section className="card gw-policies">
        <div className="gw-card-head bordered">
          <h3 className="display">Traffic policies</h3>
          <span className="gw-hint">applied at the edge</span>
        </div>
        <div className="gw-policy-grid">
          {policies.map(p => (
            <div key={p.id} className={`gw-policy ${p.on ? 'on' : ''}`}>
              <div className="gw-policy-text">
                <b>{p.name}</b>
                <small>{p.desc}</small>
              </div>
              <div className="gw-policy-right">
                <span className="gw-policy-stat mono">{p.on ? p.stat : 'off'}</span>
                <button
                  className={`gw-switch ${p.on ? 'on' : ''}`}
                  role="switch"
                  aria-checked={p.on}
                  aria-label={`${p.name} ${p.on ? 'enabled' : 'disabled'}`}
                  onClick={() => toggle(p.id)}
                >
                  <span className="gw-knob" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}

import { useState } from 'react'
import Kpi from '../components/Kpi.jsx'
import Sparkline from '../components/charts/Sparkline.jsx'
import TrendChart from '../components/charts/TrendChart.jsx'
import AppBarChart from '../components/charts/AppBarChart.jsx'
import { Check, Chevron } from '../components/Icons.jsx'
import './dashboard.css'

const trend = [
  { d: '08/01', v: 612 }, { d: '08/02', v: 705 }, { d: '08/03', v: 588 },
  { d: '08/04', v: 831 }, { d: '08/05', v: 774 }, { d: '08/06', v: 607 },
]
const apps = [
  { n: 'Auth Gateway', v: 1240 }, { n: 'Token Vault', v: 892 }, { n: 'Card Issuance', v: 604 },
  { n: 'Fraud Scoring', v: 471 }, { n: 'Ledger Sync', v: 338 }, { n: 'Statements', v: 236 },
  { n: 'Rewards Engine', v: 201 }, { n: 'Dispute Center', v: 135 },
]
const endpoints = [
  { m: 'POST', p: '/v2/tokens/provision', app: 'Token Vault', calls: 892, ms: 410, rate: 99.1 },
  { m: 'POST', p: '/v1/authorize', app: 'Auth Gateway', calls: 760, ms: 1210, rate: 78.4 },
  { m: 'GET', p: '/v1/cards/{id}/status', app: 'Card Issuance', calls: 604, ms: 340, rate: 97.6 },
  { m: 'POST', p: '/v3/score/transaction', app: 'Fraud Scoring', calls: 471, ms: 1980, rate: 64.2 },
  { m: 'GET', p: '/v1/ledger/sync', app: 'Ledger Sync', calls: 338, ms: 720, rate: 95.8 },
  { m: 'PUT', p: '/v1/statements/generate', app: 'Statements', calls: 236, ms: 860, rate: 88.3 },
]
const rateClass = r => (r >= 95 ? 'ok' : r >= 80 ? 'warn' : 'bad')
const methodClass = m => ({ GET: 'get', POST: 'post', PUT: 'put' }[m])

export default function Dashboard() {
  const [advanced, setAdvanced] = useState(false)

  return (
    <main className="dash">
      <div className="dash-head">
        <div>
          <h1 className="display">API System Consumption</h1>
          <p>APIM analytics — traffic, latency and reliability across the card platform. Set a range and filters, then run the report.</p>
        </div>
        <div className="dash-updated"><i />Live · updated 08/06/2026 08:38</div>
      </div>

      {/* Filters */}
      <section className="card dash-filter">
        <div className="dash-fgrid">
          <div className="field"><label>Start date</label><input className="control" type="date" defaultValue="2026-08-01" /></div>
          <div className="field"><label>End date</label><input className="control" type="date" defaultValue="2026-08-06" /></div>
          <div className="field"><label>Client name</label>
            <select className="control"><option>All clients</option><option>Meridian Bank</option><option>Northwind Credit Union</option><option>Halcyon Financial</option></select>
          </div>
          <div className="field"><label>Application</label>
            <select className="control"><option>All applications</option><option>Auth Gateway</option><option>Token Vault</option><option>Card Issuance</option></select>
          </div>
          <div className="field span2"><label>API path</label><input className="control mono" placeholder="/v2/tokens/provision" /></div>

          {advanced && (
            <div className="dash-adv">
              <div className="field"><label>Client ID</label>
                <select className="control"><option>All IDs</option><option>CLT-40218</option><option>CLT-77930</option></select>
              </div>
              <div className="field"><label>Logo</label>
                <select className="control"><option>All logos</option><option>Visa</option><option>Mastercard</option></select>
              </div>
              <div className="field"><label>Status</label>
                <select className="control"><option>All statuses</option><option>Success (2xx)</option><option>Client error (4xx)</option><option>Server error (5xx)</option></select>
              </div>
            </div>
          )}
        </div>

        <div className="dash-factions">
          <button className="btn btn-primary"><Check size={15} />Run report</button>
          <button className={`btn btn-ghost ${advanced ? 'open' : ''}`} onClick={() => setAdvanced(v => !v)} aria-expanded={advanced}>
            {advanced ? 'Hide advanced filters' : 'Advanced filters'}
            <Chevron size={15} className="dash-adv-caret" />
          </button>
          <button className="dash-reset">Reset all</button>
        </div>
      </section>

      {/* KPIs */}
      <section className="dash-kpis">
        <Kpi accent="var(--teal)" label="Total calls" tag="6d" value="4,117" sub={<><b>▲ 8.2%</b> vs prior 6d</>}>
          <Sparkline values={[612, 705, 588, 831, 774, 607]} />
        </Kpi>
        <Kpi accent="var(--blue)" label="Avg response" tag="ms" value={<>992<small>.47 ms</small></>} sub={<><b style={{ color: 'var(--amber)' }}>▲ 14 ms</b> above p50 target</>}>
          <Sparkline values={[880, 910, 1040, 970, 1120, 992]} color="var(--blue)" />
        </Kpi>
        <Kpi accent="var(--amber)" label="Success rate" tag="watch" value={<>81.98<small>%</small></>}>
          <div className="kpi-gauge">
            <div className="kpi-gauge-track"><div className="kpi-gauge-fill" style={{ width: '81.98%' }} /></div>
            <div className="kpi-gauge-meta"><span>0%</span><span>target 95%</span></div>
          </div>
        </Kpi>
        <Kpi accent="var(--violet)" label="Unique apps" tag="active" value="8" sub="of 11 registered">
          <Sparkline values={[7, 8, 8, 8, 7, 8]} color="var(--violet)" />
        </Kpi>
        <Kpi accent="var(--green)" label="Unique APIs" tag="called" value="140" sub={<><b>▲ 6</b> new endpoints</>}>
          <Sparkline values={[128, 131, 134, 134, 138, 140]} color="var(--green)" />
        </Kpi>
      </section>

      {/* Charts */}
      <section className="dash-charts">
        <div className="card">
          <div className="dash-card-head">
            <h3 className="display">Calls trend by date</h3>
            <span className="dash-legend"><i style={{ background: 'var(--teal)' }} />Calls</span>
          </div>
          <div className="dash-chart"><TrendChart data={trend} /></div>
        </div>
        <div className="card">
          <div className="dash-card-head">
            <h3 className="display">Calls by application</h3>
            <span className="dash-hint">top 8</span>
          </div>
          <div className="dash-chart"><AppBarChart data={apps} /></div>
        </div>
      </section>

      {/* Endpoints table */}
      <section className="card dash-table">
        <div className="dash-card-head bordered">
          <h3 className="display">Top endpoints</h3>
          <span className="dash-hint">by call volume</span>
        </div>
        <div className="dash-scroll">
          <table>
            <thead>
              <tr><th>Endpoint</th><th>Application</th><th className="num">Calls</th><th className="num">Avg ms</th><th className="num">Success</th></tr>
            </thead>
            <tbody>
              {endpoints.map((r, i) => (
                <tr key={i}>
                  <td><span className="dash-path"><span className={`dash-method ${methodClass(r.m)}`}>{r.m}</span>{r.p}</span></td>
                  <td className="dash-tag">{r.app}</td>
                  <td className="num">{r.calls.toLocaleString()}</td>
                  <td className="num">{r.ms.toLocaleString()}</td>
                  <td className="num"><span className={`dash-rate ${rateClass(r.rate)}`}><i />{r.rate}%</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="dash-foot"><span>Showing 6 of 140 endpoints</span><a href="#top" className="dash-link">View all endpoints →</a></div>
      </section>
    </main>
  )
}

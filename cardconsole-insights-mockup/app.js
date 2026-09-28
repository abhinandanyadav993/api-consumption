
const app = {
  navItems: [
    ["home","⌂","Home","index.html"],
    ["overview","◫","Overview","overview.html"],
    ["application","◉","Application","application.html"],
    ["ux","◎","User Experience","user-experience.html"],
    ["logs","▤","Logs & Traces","logs-traces.html"],
    ["domain","◇","Domain Services","domain-services.html"],
    ["ai","✦","AI Assistant","ai-assistant.html"],
    ["alerts","♢","Alerts","alerts.html"],
    ["reports","▥","Reports","reports.html"],
    ["settings","⚙","Settings","settings.html"]
  ]
};

function layout(title, active, content){
  document.title = `${title} | CardConsole Insights`;
  const nav = app.navItems.map(([id,icon,label,href]) =>
    `<a class="${active===id?'active':''}" href="${href}"><span class="icon">${icon}</span><span>${label}</span>${id==="ai"?'<span class="badge-new">NEW</span>':''}</a>`
  ).join("");

  document.body.innerHTML = `
    <div class="app">
      <aside class="sidebar" id="sidebar">
        <div class="brand">
          <div class="logo"><i></i><i></i><i></i></div>
          <div><strong>CardConsole Insights</strong><small>Unified Observability & AI Assistant</small></div>
        </div>
        <nav class="nav">
          <div class="nav-section">Workspace</div>${nav}
        </nav>
        <div class="sidebar-bottom">
          <div class="copilot-card">
            <div class="spark">✦</div><strong>Your AI Copilot</strong>
            <p>Ask anything about logs, errors, users, performance and domain services.</p>
            <a class="btn" href="ai-assistant.html">Open Chat</a>
          </div>
        </div>
      </aside>
      <div class="overlay" id="overlay" onclick="toggleMenu()"></div>
      <main class="main">
        <header class="topbar">
          <button class="mobile-menu" onclick="toggleMenu()">☰</button>
          <div class="search">⌕ <input placeholder="Search by user, traceId, sessionId, cardholder, error, or ask anything..." onkeydown="globalSearch(event)"></div>
          <div class="top-actions">
            <select class="select"><option>Last 24 hours</option><option>Last 7 days</option><option>Last 30 days</option></select>
            <span style="font-size:18px">♧</span>
            <div class="avatar">AY</div><div class="user-mini"><strong>Abhinandan Yadav</strong><span>Advisor</span></div>
          </div>
        </header>
        <section class="content">${content}</section>
        <div class="footer-note">CardConsole Insights • Demo UI • Data shown is mock data</div>
      </main>
    </div>`;
}
function toggleMenu(){document.getElementById("sidebar")?.classList.toggle("open");document.getElementById("overlay")?.classList.toggle("show")}
function globalSearch(e){if(e.key==="Enter"){const q=e.target.value.trim();if(q) location.href="logs-traces.html?q="+encodeURIComponent(q)}}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}

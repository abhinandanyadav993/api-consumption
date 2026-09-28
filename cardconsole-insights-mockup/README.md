# CardConsole Insights — Static HTML/CSS Mockup

## Files
- `index.html` — Home dashboard
- `overview.html` — Unified observability overview
- `application.html` — Web / backend / domain-service performance
- `user-experience.html` — Datadog RUM sessions and user journey
- `logs-traces.html` — Splunk log search and trace correlation
- `domain-services.html` — External API inventory
- `ai-assistant.html` — AI chat mockup
- `alerts.html` — Correlated alerts
- `reports.html` — Operational reports
- `settings.html` — Data source and AI guardrail settings
- `trace-detail.html` — End-to-end trace investigation
- `domain-detail.html` — Domain service detail
- `styles.css` — Responsive design system
- `app.js` — Shared shell/navigation and utility functions

## Run
Open `index.html` directly in a browser, or serve the folder:

```bash
python3 -m http.server 8080
```

Then open:
`http://localhost:8080`

This is a frontend mockup. Splunk, Datadog and domain-service values are mocked; the links and UI interactions demonstrate the intended product flow.

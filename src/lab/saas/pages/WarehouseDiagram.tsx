import { Database } from "@phosphor-icons/react";
import { Logo } from "../ui";

const SOURCES = [
  { name: "Snowflake", detail: "PROD_ANALYTICS" },
  { name: "BigQuery", detail: "analytics-prod" },
  { name: "Databricks", detail: "main.gold" },
  { name: "Postgres", detail: "replica, read-only" },
];
const DESTS = ["Veyra web app", "Slack and Teams", "Email digests", "API and webhooks"];

function Links({ side }: { side: "in" | "out" }) {
  const ys = [12.5, 37.5, 62.5, 87.5];
  return (
    <svg
      className={`vy-dg-links vy-dg-links--${side}`}
      viewBox="0 0 48 100"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      {ys.map((y, i) => {
        const d = side === "in" ? `M0,${y} C28,${y} 20,50 48,50` : `M0,50 C28,50 20,${y} 48,${y}`;
        return (
          <g key={y}>
            <path d={d} className="vy-dg-path" vectorEffect="non-scaling-stroke" />
            <path
              d={d}
              className="vy-dg-flow"
              vectorEffect="non-scaling-stroke"
              style={{ animationDelay: `${i * 0.45 + (side === "out" ? 0.9 : 0)}s` }}
            />
          </g>
        );
      })}
    </svg>
  );
}

export function WarehouseDiagram() {
  return (
    <div
      className="vy-dg"
      role="img"
      aria-label="Queries run inside your warehouse through a read-only role; Veyra sends answers to the web app, chat, email and API"
    >
      <ul className="vy-dg-col" role="list">
        {SOURCES.map((s) => (
          <li key={s.name} className="vy-dg-node">
            <Database size={14} />
            <span>
              {s.name}
              <small>{s.detail}</small>
            </span>
          </li>
        ))}
      </ul>
      <Links side="in" />
      <div className="vy-dg-core">
        <Logo />
        <ul role="list">
          <li>Semantic layer</li>
          <li>Query planner</li>
          <li>Explain engine</li>
          <li>Monitors</li>
        </ul>
        <span className="vy-dg-role">Read-only role</span>
      </div>
      <Links side="out" />
      <ul className="vy-dg-col" role="list">
        {DESTS.map((d) => (
          <li key={d} className="vy-dg-node vy-dg-node--out">
            <span>{d}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

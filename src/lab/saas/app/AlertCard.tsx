import { useState } from "react";
import { BellRinging, BellSlash, CheckCircle, MagnifyingGlass } from "@phosphor-icons/react";
import { monitors, trialConversion, trialExpected } from "../data";
import { LineChart } from "./Charts";
import { useNav } from "../ui";

/** onExplain overrides the default action (jump to the Explain section of the product page). */
export function AlertCard({ onExplain }: { onExplain?: () => void } = {}) {
  const { goSection } = useNav();
  const [state, setState] = useState<"open" | "muted" | "ack">("open");
  const latest = trialConversion[trialConversion.length - 1].value;
  return (
    <div className={"vy-alert" + (state !== "open" ? " is-quiet" : "")}>
      <div className="vy-alert-top">
        <span className="vy-alert-icon" aria-hidden="true">
          <BellRinging size={14} />
        </span>
        <div>
          <p className="vy-alert-title">Trial to paid conversion (EU) is below its expected range</p>
          <p className="vy-alert-sub">Posted to #growth-alerts at 09:42 CET, 3 days in a row</p>
        </div>
      </div>
      <div className="vy-alert-body">
        <div className="vy-alert-stats">
          <div>
            <span className="vy-app-label">Today</span>
            <strong className="is-accent">{latest.toFixed(1)}%</strong>
          </div>
          <div>
            <span className="vy-app-label">Expected</span>
            <strong>
              {trialExpected.low.toFixed(1)} to {trialExpected.high.toFixed(1)}%
            </strong>
          </div>
        </div>
        <div className="vy-alert-spark">
          <LineChart
            data={trialConversion}
            height={64}
            compact
            expected={trialExpected}
            anomalyFrom={27}
            ariaLabel="Trial to paid conversion in the EU over 30 days, falling below range in the last 3 days"
          />
        </div>
      </div>
      <p className="vy-alert-why">
        Likely cause: new pricing page variant shown to 50% of EU visitors since Tuesday.
      </p>
      <div className="vy-alert-actions">
        {state === "open" ? (
          <>
            <button type="button" className="vy-app-btn is-primary" onClick={onExplain ?? (() => goSection("product", "explain"))}>
              <MagnifyingGlass size={14} /> Explain
            </button>
            <button type="button" className="vy-app-btn" onClick={() => setState("ack")}>
              <CheckCircle size={14} /> Acknowledge
            </button>
            <button type="button" className="vy-app-btn" onClick={() => setState("muted")}>
              <BellSlash size={14} /> Mute 24h
            </button>
          </>
        ) : (
          <>
            <span className="vy-alert-note">
              {state === "ack" ? "Acknowledged by you. Owner: Growth." : "Muted until tomorrow 09:42."}
            </span>
            <button type="button" className="vy-app-btn" onClick={() => setState("open")}>
              Undo
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export function MonitorList() {
  return (
    <div className="vy-monitors">
      <div className="vy-monitors-head">
        <span>Monitor</span>
        <span>Rule</span>
        <span>Sends to</span>
        <span>Status</span>
      </div>
      <ul role="list">
        {monitors.map((m) => (
          <li key={m.metric}>
            <span className="vy-mon-metric">
              {m.metric}
              <small>{m.scope}</small>
            </span>
            <span className="vy-mon-rule">{m.rule}</span>
            <span className="vy-mon-channel">{m.channel}</span>
            <span className={`vy-mon-state is-${m.state}`}>
              {m.state === "alert" ? "Alerting" : m.state === "muted" ? "Muted" : "Healthy"}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

import { useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { checkoutAnomalyFrom, checkoutConversion, checkoutDrivers, checkoutExpected } from "../data";
import { ImpactBar, LineChart } from "./Charts";

const pts = (v: number) => `${v < 0 ? "−" : "+"}${Math.abs(v).toFixed(2)} pts`;

export function ExplainPanel({ chartHeight = 200 }: { chartHeight?: number }) {
  const [open, setOpen] = useState(0);
  const recent = checkoutConversion.slice(checkoutAnomalyFrom);
  const prior = checkoutConversion.slice(checkoutAnomalyFrom - 7, checkoutAnomalyFrom);
  const avg = (xs: typeof recent) => xs.reduce((s, p) => s + p.value, 0) / xs.length;
  const now = avg(recent);
  const delta = now - avg(prior);
  const max = Math.max(...checkoutDrivers.map((d) => Math.abs(d.impact)));
  const explained = checkoutDrivers.filter((d) => d.name !== "Unexplained").reduce((s, d) => s + d.impact, 0);

  return (
    <div className="vy-explain">
      <div className="vy-explain-head">
        <div>
          <span className="vy-app-label">Checkout conversion, all platforms</span>
          <div className="vy-explain-value">
            <strong>{now.toFixed(2)}%</strong>
            <span className="vy-delta is-down">{pts(delta)}</span>
          </div>
        </div>
        <span className="vy-app-seg">Sep 16 to 22 vs Sep 9 to 15</span>
      </div>

      <LineChart
        data={checkoutConversion}
        height={chartHeight}
        unit="%"
        anomalyFrom={checkoutAnomalyFrom}
        expected={checkoutExpected}
        labelEvery={7}
        ariaLabel="Checkout conversion by day, Aug 26 to Sep 22, with a drop starting Sep 16"
      />

      <div className="vy-drivers">
        <div className="vy-drivers-head">
          <span>What changed</span>
          <span>
            {Math.round((explained / delta) * 100)}% of the change explained across 41 dimensions
          </span>
        </div>
        <ul role="list">
          {checkoutDrivers.map((d, i) => (
            <li key={d.name} className={open === i ? "is-open" : ""}>
              <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i}>
                <span className="vy-driver-name">{d.name}</span>
                <ImpactBar value={d.impact} max={max} />
                <span className="vy-driver-val">{pts(d.impact)}</span>
                <span className={`vy-conf vy-conf--${d.confidence.toLowerCase()}`}>{d.confidence}</span>
                <CaretDown size={12} className="vy-driver-caret" />
              </button>
              {open === i && <p className="vy-driver-detail">{d.detail}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

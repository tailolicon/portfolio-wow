import { useEffect, useId, useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import type { Point } from "../data";

/** Measures an element's width so charts draw in real pixels (crisp 1px lines, undistorted text). */
function useWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return { ref, width };
}

function niceTicks(min: number, max: number, count: number) {
  const span = max - min || 1;
  const raw = span / count;
  const mag = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? raw;
  const lo = Math.floor(min / step) * step;
  const hi = Math.ceil(max / step) * step;
  const ticks: number[] = [];
  for (let v = lo; v <= hi + step / 2; v += step) ticks.push(Number(v.toFixed(6)));
  return ticks;
}

const fmt = (v: number, unit: string) => {
  if (unit === "%") return `${v.toFixed(v < 10 ? 2 : 1)}%`;
  return v.toLocaleString("en-US", { maximumFractionDigits: 1 });
};

type LineChartProps = {
  data: Point[];
  height?: number;
  unit?: string;
  /** Index from which points are drawn as anomalous (accent). */
  anomalyFrom?: number;
  /** Index to mark with a callout dot. */
  markIndex?: number;
  expected?: { low: number; high: number };
  labelEvery?: number;
  compact?: boolean;
  ariaLabel: string;
};

export function LineChart({
  data,
  height = 220,
  unit = "",
  anomalyFrom,
  markIndex,
  expected,
  labelEvery = 3,
  compact = false,
  ariaLabel,
}: LineChartProps) {
  const { ref, width } = useWidth<HTMLDivElement>();
  const [hover, setHover] = useState<number | null>(null);
  const pad = compact ? { t: 6, r: 4, b: 6, l: 4 } : { t: 12, r: 12, b: 26, l: 44 };

  const geo = useMemo(() => {
    const values = data.map((d) => d.value);
    let min = Math.min(...values, expected?.low ?? Infinity);
    let max = Math.max(...values, expected?.high ?? -Infinity);
    const span = max - min;
    min -= span * 0.12;
    max += span * 0.08;
    const ticks = compact ? [] : niceTicks(min, max, 4);
    if (ticks.length) {
      min = ticks[0];
      max = ticks[ticks.length - 1];
    }
    const iw = Math.max(1, width - pad.l - pad.r);
    const ih = height - pad.t - pad.b;
    const x = (i: number) => pad.l + (i / (data.length - 1)) * iw;
    const y = (v: number) => pad.t + (1 - (v - min) / (max - min)) * ih;
    const path = (from: number, to: number) =>
      data
        .slice(from, to + 1)
        .map((d, j) => `${j ? "L" : "M"}${x(from + j).toFixed(1)},${y(d.value).toFixed(1)}`)
        .join("");
    return { ticks, x, y, path, iw, ih };
  }, [data, width, height, expected, compact, pad.l, pad.r, pad.t, pad.b]);

  const onMove = (e: PointerEvent<SVGSVGElement>) => {
    const box = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - box.left - pad.l) / Math.max(1, geo.iw);
    setHover(Math.max(0, Math.min(data.length - 1, Math.round(rel * (data.length - 1)))));
  };

  const last = data.length - 1;
  const splitAt = anomalyFrom ?? last + 1;
  const base = splitAt > last ? geo.path(0, last) : geo.path(0, splitAt - 1);
  const area = `${geo.path(0, last)}L${geo.x(last)},${height - pad.b}L${geo.x(0)},${height - pad.b}Z`;
  const tip = hover !== null ? data[hover] : null;
  const gradId = "vy-area-" + useId().replace(/[^a-zA-Z0-9]/g, "");

  return (
    <div ref={ref} className="vy-chart" style={{ height }}>
      {width > 0 && (
        <svg
          width={width}
          height={height}
          role="img"
          aria-label={ariaLabel}
          onPointerMove={compact ? undefined : onMove}
          onPointerLeave={() => setHover(null)}
        >
          <defs>
            <linearGradient id={gradId} x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--vy-series)" stopOpacity="0.12" />
              <stop offset="1" stopColor="var(--vy-series)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {geo.ticks.map((t) => (
            <g key={t}>
              <line className="vy-chart-grid" x1={pad.l} x2={width - pad.r} y1={geo.y(t)} y2={geo.y(t)} />
              <text className="vy-chart-tick" x={pad.l - 10} y={geo.y(t) + 4} textAnchor="end">
                {unit === "%" ? `${t.toFixed(1)}%` : t.toLocaleString("en-US")}
              </text>
            </g>
          ))}
          {expected && (
            <rect
              className="vy-chart-band"
              x={pad.l}
              width={geo.iw}
              y={geo.y(expected.high)}
              height={geo.y(expected.low) - geo.y(expected.high)}
            />
          )}
          {anomalyFrom !== undefined && (
            <rect
              className="vy-chart-anomaly"
              x={geo.x(anomalyFrom) - geo.iw / (data.length - 1) / 2}
              width={geo.x(last) - geo.x(anomalyFrom) + geo.iw / (data.length - 1) / 2}
              y={pad.t}
              height={geo.ih}
            />
          )}
          {!expected && <path d={area} fill={`url(#${gradId})`} />}
          <path className="vy-chart-line" d={base} />
          {splitAt <= last && <path className="vy-chart-line is-accent" d={geo.path(splitAt - 1, last)} />}
          {!compact &&
            data.map((d, i) =>
              i % labelEvery === 0 || i === last ? (
                <text key={d.label} className="vy-chart-tick" x={geo.x(i)} y={height - 6} textAnchor="middle">
                  {d.label}
                </text>
              ) : null,
            )}
          {markIndex !== undefined && (
            <circle className="vy-chart-mark" cx={geo.x(markIndex)} cy={geo.y(data[markIndex].value)} r={4} />
          )}
          {compact && <circle className="vy-chart-end" cx={geo.x(last)} cy={geo.y(data[last].value)} r={3} />}
          {hover !== null && (
            <g>
              <line className="vy-chart-cross" x1={geo.x(hover)} x2={geo.x(hover)} y1={pad.t} y2={height - pad.b} />
              <circle className="vy-chart-dot" cx={geo.x(hover)} cy={geo.y(data[hover].value)} r={4} />
            </g>
          )}
        </svg>
      )}
      {tip && hover !== null && (
        <div
          className="vy-chart-tip"
          style={{
            left: Math.min(Math.max(geo.x(hover), 70), width - 70),
            top: Math.max(geo.y(tip.value) - 52, 0),
          }}
        >
          <span>{tip.label}</span>
          <strong>
            {fmt(tip.value, unit)}
            {unit && unit !== "%" ? ` ${unit}` : ""}
          </strong>
        </div>
      )}
    </div>
  );
}

/** Horizontal bars with values; the first (largest) bar takes the accent. */
export function BarList({ data, unit = "%" }: { data: Point[]; unit?: string }) {
  const max = Math.max(...data.map((d) => d.value));
  return (
    <ul className="vy-bars" role="list">
      {data.map((d, i) => (
        <li key={d.label}>
          <span className="vy-bars-label">{d.label}</span>
          <span className="vy-bars-track">
            <span
              className={"vy-bars-fill" + (i === 0 ? " is-accent" : "")}
              style={{ width: `${(d.value / max) * 100}%` }}
            />
          </span>
          <span className="vy-bars-value">
            {d.value.toFixed(1)}
            {unit}
          </span>
        </li>
      ))}
    </ul>
  );
}

/** Diverging contribution bar used by Explain (negative values extend left from the axis). */
export function ImpactBar({ value, max }: { value: number; max: number }) {
  const w = (Math.abs(value) / max) * 100;
  return (
    <span className="vy-impact" aria-hidden="true">
      <span className="vy-impact-fill" style={{ width: `${w}%` }} />
    </span>
  );
}

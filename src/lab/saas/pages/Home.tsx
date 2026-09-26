import { useState } from "react";
import { ArrowRight, Eye, Key, Lock, ShieldCheck } from "@phosphor-icons/react";
import { demoImg } from "../../../demos/shared";
import { ThreeCanvas, lazyThree } from "../../shared";
import { askExamples, logoWall, stories } from "../data";
import { AskPanel } from "../app/AskPanel";
import { AlertCard } from "../app/AlertCard";
import { ExplainPanel } from "../app/ExplainPanel";
import { CustomerMark, Reveal, useNav } from "../ui";
import { WarehouseDiagram } from "./WarehouseDiagram";

const DataField = lazyThree(() => import("@designcodeio/threeui/components/DataField").then((m) => m.DataField));

/** Static stand-in for the WebGL field: the same family of stacked data lines, drawn once. */
function FieldFallback() {
  const lines = Array.from({ length: 34 }, (_, i) => {
    const pts: string[] = [];
    for (let x = 0; x <= 1200; x += 24) {
      const t = x / 1200;
      const y =
        120 + i * 7 + Math.sin(t * 7 + i * 0.22) * (18 + i * 0.9) + Math.sin(t * 17 + i * 0.5) * 6 * Math.sin(t * 3.1);
      pts.push(`${x},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  });
  return (
    <svg className="vy-field-fallback" viewBox="0 0 1200 520" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {lines.map((p, i) => (
        <polyline key={i} points={p} fill="none" stroke="currentColor" strokeWidth="1" opacity={0.1 + (i / 34) * 0.3} />
      ))}
    </svg>
  );
}

function Hero({ onExplain }: { onExplain: () => void }) {
  const { link } = useNav();
  return (
    <section className="vy-hero">
      <div className="vy-hero-field">
        <ThreeCanvas fallback={<FieldFallback />}>
          <DataField mode="dark" brightness={1.05} saturation={0} />
        </ThreeCanvas>
        <div className="vy-hero-fade" aria-hidden="true" />
      </div>
      <div className="vy-container vy-hero-inner">
        <h1 className="vy-display">Ask your warehouse anything. Get answers you can check.</h1>
        <p className="vy-lead vy-hero-sub">
          Veyra lets anyone on your team question Snowflake, BigQuery or Databricks in plain English, and explains why
          the numbers moved.
        </p>
        <div className="vy-hero-ctas">
          <a {...link("demo")} className="vy-btn vy-btn--primary vy-btn--lg">
            Book a demo
          </a>
          <a {...link("start")} className="vy-btn vy-btn--secondary vy-btn--lg">
            Start free
          </a>
        </div>
      </div>
      <div className="vy-container">
        <Reveal className="vy-hero-product">
          <div className="vy-window">
            <div className="vy-window-bar">
              <span className="vy-window-crumb">
                Pellam <span>/</span> Growth <span>/</span> Ask
              </span>
              <span className="vy-window-user" aria-hidden="true">
                DW
              </span>
            </div>
            <div className="vy-window-body">
              <AskPanel examples={askExamples} />
              <div className="vy-window-side">
                <span className="vy-app-label">Alerts</span>
                <AlertCard onExplain={onExplain} />
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Logos() {
  return (
    <section className="vy-logos" aria-label="Customers">
      <div className="vy-container">
        <p className="vy-logos-lead">Data teams at 1,140 companies send their questions through Veyra first.</p>
        <ul className="vy-logos-row" role="list">
          {logoWall.map((c) => (
            <li key={c.slug}>
              <CustomerMark customer={c} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

const TABS = [
  {
    id: "ask",
    title: "Ask",
    body: "Type a question the way you would ask a colleague. Veyra writes the SQL against your metrics and shows its work.",
  },
  {
    id: "explain",
    title: "Explain",
    body: "When a number moves, Veyra tests every dimension you track and ranks what actually drove the change.",
  },
  {
    id: "monitor",
    title: "Monitor",
    body: "Watch the metrics that run the business. Seasonality-aware ranges mean alerts for real changes, not Sundays.",
  },
];

function Capabilities({ tab, setTab }: { tab: string; setTab: (tab: string) => void }) {
  const { goSection } = useNav();
  return (
    <section id="vy-capabilities" className="vy-section vy-caps">
      <div className="vy-container">
        <div className="vy-section-head">
          <h2 className="vy-h2">From a question to its cause, before the meeting starts.</h2>
          <p className="vy-lead">
            Three tools on the same governed metrics, so the answer in Slack matches the one in the board deck.
          </p>
        </div>
        <div className="vy-caps-grid">
          <div className="vy-caps-tabs" role="tablist" aria-label="Capabilities">
            {TABS.map((t) => (
              <button
                key={t.id}
                role="tab"
                type="button"
                id={`vy-tab-${t.id}`}
                aria-selected={tab === t.id}
                aria-controls="vy-caps-panel"
                className={"vy-caps-tab" + (tab === t.id ? " is-on" : "")}
                onClick={() => setTab(t.id)}
              >
                <span className="vy-caps-title">{t.title}</span>
                <span className="vy-caps-body">{t.body}</span>
              </button>
            ))}
            <a
              href="#product"
              className="vy-textlink"
              onClick={(e) => {
                e.preventDefault();
                goSection("product", tab === "monitor" ? "monitors" : tab);
              }}
            >
              More on {TABS.find((t) => t.id === tab)?.title} <ArrowRight size={14} />
            </a>
          </div>
          <div className="vy-caps-panel" id="vy-caps-panel" role="tabpanel" aria-labelledby={`vy-tab-${tab}`}>
            {tab === "ask" && <AskPanel examples={askExamples} chips initial={1} />}
            {tab === "explain" && <ExplainPanel />}
            {tab === "monitor" && (
              <div className="vy-caps-monitor">
                <AlertCard onExplain={() => setTab("explain")} />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

function Warehouse() {
  const { goSection } = useNav();
  return (
    <section className="vy-section vy-wh">
      <div className="vy-container vy-wh-grid">
        <div className="vy-wh-copy">
          <h2 className="vy-h2">Your warehouse stays the source of truth.</h2>
          <p>
            Veyra connects with a read-only role and runs every query where your data already lives. Nothing is copied
            into another database, and your warehouse permissions apply to every answer.
          </p>
          <dl className="vy-wh-facts">
            <div>
              <dt>Setup</dt>
              <dd>About 20 minutes with an existing dbt project</dd>
            </div>
            <div>
              <dt>Result cache</dt>
              <dd>Encrypted, 24 hours or off</dd>
            </div>
            <div>
              <dt>Warehouses</dt>
              <dd>Snowflake, BigQuery, Databricks, Redshift, Postgres</dd>
            </div>
          </dl>
          <a
            href="#warehouse"
            className="vy-textlink"
            onClick={(e) => {
              e.preventDefault();
              goSection("product", "warehouse");
            }}
          >
            How queries run <ArrowRight size={14} />
          </a>
        </div>
        <Reveal className="vy-wh-visual">
          <WarehouseDiagram />
        </Reveal>
      </div>
    </section>
  );
}

function Featured() {
  const { openStory } = useNav();
  const s = stories[0];
  return (
    <section className="vy-feature">
      <div className="vy-container vy-feature-grid">
        <figure className="vy-feature-media">
          <img src={demoImg("lab-saas", "team-smiling")} alt="Pellam category managers reviewing answers together" loading="lazy" />
        </figure>
        <div className="vy-feature-copy">
          <blockquote>
            <p>&ldquo;{s.quote.text}&rdquo;</p>
            <footer>
              <img src={demoImg("people", s.quote.portrait)} alt="" loading="lazy" />
              <span>
                <strong>{s.quote.name}</strong>
                {s.quote.role}
              </span>
            </footer>
          </blockquote>
          <dl className="vy-feature-stats">
            {s.outcomes.map((o) => (
              <div key={o.label}>
                <dt>{o.label}</dt>
                <dd>{o.value}</dd>
              </div>
            ))}
          </dl>
          <a
            href="#story"
            className="vy-textlink"
            onClick={(e) => {
              e.preventDefault();
              openStory(s.slug);
            }}
          >
            Read the Pellam story <ArrowRight size={14} />
          </a>
        </div>
      </div>
    </section>
  );
}

const TRUST = [
  {
    icon: ShieldCheck,
    title: "SOC 2 Type II",
    body: "Audited annually. Report and pen test summary available under NDA.",
  },
  {
    icon: Lock,
    title: "Read-only by design",
    body: "Veyra never writes to your warehouse. Credentials are encrypted with per-workspace keys.",
  },
  {
    icon: Key,
    title: "Permissions inherited",
    body: "SSO passes each person's own warehouse role, so masking and row policies still apply.",
  },
  {
    icon: Eye,
    title: "Every query logged",
    body: "See who asked what, the SQL that ran and what came back, exportable to your SIEM.",
  },
];

function Trust() {
  const { goSection } = useNav();
  return (
    <section className="vy-section vy-trust">
      <div className="vy-container">
        <div className="vy-trust-head">
          <p className="vy-eyebrow">Security</p>
          <h2 className="vy-h2">Built to pass your security review the first time.</h2>
          <a
            href="#governance"
            className="vy-textlink"
            onClick={(e) => {
              e.preventDefault();
              goSection("product", "governance");
            }}
          >
            Governance and security <ArrowRight size={14} />
          </a>
        </div>
        <ul className="vy-trust-grid" role="list">
          {TRUST.map(({ icon: Icon, title, body }) => (
            <li key={title}>
              <Icon size={20} />
              <h3>{title}</h3>
              <p>{body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function ClosingCta({ title, body }: { title: string; body: string }) {
  const { link } = useNav();
  return (
    <section className="vy-close">
      <div className="vy-container vy-close-inner">
        <h2 className="vy-h2">{title}</h2>
        <p className="vy-lead">{body}</p>
        <div className="vy-hero-ctas">
          <a {...link("demo")} className="vy-btn vy-btn--primary vy-btn--lg">
            Book a demo
          </a>
          <a {...link("start")} className="vy-btn vy-btn--secondary vy-btn--lg">
            Start free
          </a>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [tab, setTab] = useState("explain");
  const { goSection } = useNav();
  const explain = () => {
    setTab("explain");
    goSection("home", "capabilities");
  };
  return (
    <>
      <Hero onExplain={explain} />
      <Logos />
      <Capabilities tab={tab} setTab={setTab} />
      <Warehouse />
      <Featured />
      <Trust />
      <ClosingCta
        title="Bring one question you have been waiting on."
        body="In a 30-minute call we connect a sandbox to your warehouse and answer it together."
      />
    </>
  );
}

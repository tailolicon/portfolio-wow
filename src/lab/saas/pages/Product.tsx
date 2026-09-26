import { Check } from "@phosphor-icons/react";
import { demoImg } from "../../../demos/shared";
import { askExamples, integrations } from "../data";
import { AskPanel } from "../app/AskPanel";
import { ExplainPanel } from "../app/ExplainPanel";
import { AlertCard, MonitorList } from "../app/AlertCard";
import { Reveal, useNav } from "../ui";
import { ClosingCta } from "./Home";

const SUBNAV: [string, string][] = [
  ["ask", "Ask"],
  ["explain", "Explain"],
  ["monitors", "Monitors"],
  ["warehouse", "Warehouse-native"],
  ["governance", "Governance"],
  ["integrations", "Integrations"],
];

function Ticks({ items }: { items: string[] }) {
  return (
    <ul className="vy-ticks" role="list">
      {items.map((t) => (
        <li key={t}>
          <Check size={14} />
          {t}
        </li>
      ))}
    </ul>
  );
}

const LIFECYCLE = [
  { t: "0 ms", title: "Question", body: "Typed in Veyra, Slack or Teams, with the asker's identity from SSO." },
  {
    t: "120 ms",
    title: "Metric match",
    body: "Mapped to governed metrics and dimensions from your dbt project and glossary.",
  },
  { t: "900 ms", title: "SQL written", body: "Generated for your dialect, checked against the schema, shown in full." },
  {
    t: "1.6 s",
    title: "Runs in your warehouse",
    body: "Executed with the asker's own role. Masking and row policies apply.",
  },
  {
    t: "1.8 s",
    title: "Answer",
    body: "Chart and summary returned. Results cached, encrypted, for 24 hours or not at all.",
  },
];

const GOVERNANCE = [
  ["SOC 2 Type II", "Audited every year by an independent firm. Report available under NDA."],
  ["SAML SSO and SCIM", "Okta, Entra ID and Google Workspace. Deprovisioning is immediate."],
  ["Warehouse permissions", "Each person queries with their own role, so existing policies hold."],
  ["Audit log", "Every question, generated query and result size, exportable to your SIEM."],
  ["Data residency", "US or EU hosting on Enterprise. Metadata never leaves the region."],
  ["Model privacy", "Zero-retention agreements with model providers. Nothing is used for training."],
];

export default function Product() {
  const { goSection } = useNav();
  return (
    <>
      <section className="vy-page-hero">
        <div className="vy-container">
          <h1 className="vy-display vy-page-title">Ask, explain and watch every metric in one place.</h1>
          <p className="vy-lead">
            Veyra sits on top of your warehouse and your dbt metrics. Everyone gets answers, and the data team keeps
            control of the definitions.
          </p>
          <nav className="vy-subnav" aria-label="Product sections">
            {SUBNAV.map(([id, label]) => (
              <a
                key={id}
                href={`#${id}`}
                onClick={(e) => {
                  e.preventDefault();
                  goSection("product", id);
                }}
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      <section id="vy-ask" className="vy-section vy-split-sec">
        <div className="vy-container vy-split">
          <div className="vy-split-copy">
            <h2 className="vy-h2">Ask in plain English. Check the SQL.</h2>
            <p className="vy-lead">
              Anyone can ask a question in plain English and get a chart, a short written answer and the SQL behind it.
              Follow-up questions keep the context, so &ldquo;and by region?&rdquo; just works.
            </p>
            <Ticks
              items={[
                "Uses your dbt metrics, never invented definitions",
                "SQL shown for every answer, editable by analysts",
                "Verified answers pinned by the data team",
                "Works in the web app, Slack and Teams",
              ]}
            />
          </div>
          <Reveal className="vy-split-visual vy-panel">
            <AskPanel examples={askExamples} chips initial={0} />
          </Reveal>
        </div>
      </section>

      <section id="vy-explain" className="vy-section vy-band">
        <div className="vy-container">
          <div className="vy-section-head">
            <h2 className="vy-h2">Explain tells you why a number moved.</h2>
            <p className="vy-lead">
              When a metric moves, Explain compares the two periods across every dimension you track and ranks the
              causes by how much of the change they account for.
            </p>
          </div>
          <Reveal className="vy-panel vy-explain-wide">
            <ExplainPanel chartHeight={260} />
          </Reveal>
          <dl className="vy-specrow">
            <div>
              <dt>Tests every dimension</dt>
              <dd>Platform, app version, channel, region, plan and any column you mark as a dimension.</dd>
            </div>
            <div>
              <dt>Separates mix from rate</dt>
              <dd>Tells a real drop apart from a shift in who showed up.</dd>
            </div>
            <div>
              <dt>Says how sure it is</dt>
              <dd>Each driver carries a confidence level, and whatever is left over stays visible.</dd>
            </div>
          </dl>
        </div>
      </section>

      <section id="vy-monitors" className="vy-section vy-split-sec">
        <div className="vy-container vy-split vy-split--rev">
          <div className="vy-split-copy">
            <h2 className="vy-h2">Monitors that know what normal looks like.</h2>
            <p className="vy-lead">
              Pick a metric, and Veyra learns its normal range from up to two years of history, including weekly and
              holiday patterns. When it leaves that range, the right channel hears about it with a likely cause
              attached.
            </p>
            <Ticks
              items={[
                "Checks every 5 minutes to daily",
                "Alerts to Slack, Teams, email or PagerDuty",
                "Acknowledge, mute or assign from the alert",
              ]}
            />
          </div>
          <Reveal className="vy-split-visual vy-monitor-stack">
            <MonitorList />
            <div className="vy-monitor-alert">
              <AlertCard />
            </div>
          </Reveal>
        </div>
      </section>

      <section id="vy-warehouse" className="vy-section vy-band">
        <div className="vy-container">
          <div className="vy-section-head">
            <h2 className="vy-h2">Warehouse-native, from question to answer.</h2>
            <p className="vy-lead">
              Veyra has no database of its own to keep in sync. Here is what happens in the 1.8 seconds after someone
              asks a question.
            </p>
          </div>
          <ol className="vy-timeline" role="list">
            {LIFECYCLE.map((s) => (
              <li key={s.title}>
                <span className="vy-timeline-t">{s.t}</span>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
          <p className="vy-footnote">
            Supported: Snowflake, BigQuery, Databricks SQL, Amazon Redshift and Postgres. ClickHouse in beta.
          </p>
        </div>
      </section>

      <section id="vy-governance" className="vy-section">
        <div className="vy-container vy-gov">
          <figure className="vy-gov-media">
            <img
              src={demoImg("lab-saas", "datacenter")}
              alt="Engineers walking through a data center aisle"
              loading="lazy"
            />
          </figure>
          <div>
            <h2 className="vy-h2">Governance your security team can sign off on.</h2>
            <p className="vy-lead vy-gov-lead">
              Built for companies whose security team reads the contract. Your data stays in your warehouse, and your
              existing rules decide who sees what.
            </p>
            <dl className="vy-gov-list">
              {GOVERNANCE.map(([t, d]) => (
                <div key={t}>
                  <dt>{t}</dt>
                  <dd>{d}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section id="vy-integrations" className="vy-section vy-band">
        <div className="vy-container">
          <div className="vy-section-head">
            <h2 className="vy-h2">Integrations with the tools you already run.</h2>
            <p className="vy-lead">
              Connect the warehouse you have and send answers to the places your team already works.
            </p>
          </div>
          <ul className="vy-integrations" role="list">
            {integrations.map((i) => (
              <li key={i.name}>
                <span className="vy-int-mono" aria-hidden="true">
                  {i.name.slice(0, 1)}
                </span>
                <span>
                  <strong>{i.name}</strong>
                  <small>{i.kind}</small>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        title="See it on your own warehouse."
        body="A solutions engineer connects Veyra to a sandbox of your schema and walks your team through Ask, Explain and Monitors."
      />
    </>
  );
}

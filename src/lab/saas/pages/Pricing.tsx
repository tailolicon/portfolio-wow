import { useState } from "react";
import { Check, Minus, Plus } from "@phosphor-icons/react";
import { comparison, faqs, plans } from "../data";
import type { Cell, Plan } from "../data";
import { useNav } from "../ui";

function Price({ plan, annual }: { plan: Plan; annual: boolean }) {
  if (plan.monthly === null) {
    return (
      <div className="vy-price">
        <strong>Custom</strong>
        <span>Annual contract</span>
      </div>
    );
  }
  const value = annual ? plan.annual : plan.monthly;
  return (
    <div className="vy-price">
      <strong>${value}</strong>
      <span>{value === 0 ? "Free forever" : annual ? "per editor / month, billed yearly" : "per editor / month"}</span>
    </div>
  );
}

function CellView({ value }: { value: Cell }) {
  if (value === true) return <Check size={16} className="vy-cmp-yes" aria-label="Included" />;
  if (value === false) return <Minus size={16} className="vy-cmp-no" aria-label="Not included" />;
  return <span>{value}</span>;
}

export default function Pricing() {
  const { link } = useNav();
  const [annual, setAnnual] = useState(true);
  const [open, setOpen] = useState<number | null>(0);

  return (
    <>
      <section className="vy-page-hero vy-page-hero--center">
        <div className="vy-container">
          <h1 className="vy-display vy-page-title">Pay for the people who build. Viewers are free.</h1>
          <p className="vy-lead">
            Every plan runs on your own warehouse. Start free, and add editors when the data team is ready to open
            answers to everyone.
          </p>
          <div className="vy-billing" role="group" aria-label="Billing period">
            <button
              type="button"
              aria-pressed={!annual}
              className={!annual ? "is-on" : ""}
              onClick={() => setAnnual(false)}
            >
              Monthly
            </button>
            <button
              type="button"
              aria-pressed={annual}
              className={annual ? "is-on" : ""}
              onClick={() => setAnnual(true)}
            >
              Annual <span>Save 20%</span>
            </button>
          </div>
        </div>
      </section>

      <section className="vy-plans-sec">
        <div className="vy-container">
          <ul className="vy-plans" role="list">
            {plans.map((p) => (
              <li key={p.id} className={"vy-plan" + (p.featured ? " is-featured" : "")}>
                <div className="vy-plan-top">
                  <h2>
                    {p.name}
                    {p.featured && <span className="vy-plan-tag">Most teams start here</span>}
                  </h2>
                  <p>{p.blurb}</p>
                </div>
                <Price plan={p} annual={annual} />
                <a {...link(p.cta.to)} className={"vy-btn " + (p.featured ? "vy-btn--primary" : "vy-btn--secondary")}>
                  {p.cta.label}
                </a>
                <div className="vy-plan-feats">
                  <span>{p.lead}</span>
                  <ul role="list">
                    {p.features.map((f) => (
                      <li key={f}>
                        <Check size={14} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ul>
          <p className="vy-plans-note">
            Prices in USD. Taxes may apply. Companies under 30 people and nonprofits get 50% off the first year.
          </p>
        </div>
      </section>

      <section className="vy-section vy-compare-sec" aria-labelledby="vy-compare-title">
        <div className="vy-container">
          <h2 id="vy-compare-title" className="vy-h2 vy-compare-title">
            Compare plans
          </h2>
          <div className="vy-compare-wrap">
            <table className="vy-compare">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="vy-sr">Feature</span>
                  </th>
                  {plans.map((p) => (
                    <th key={p.id} scope="col">
                      {p.name}
                      <small>
                        {p.monthly === null ? "Custom" : p.monthly === 0 ? "Free" : `$${annual ? p.annual : p.monthly}`}
                      </small>
                    </th>
                  ))}
                </tr>
              </thead>
              {comparison.map((g) => (
                <tbody key={g.group}>
                  <tr className="vy-compare-group">
                    <th scope="colgroup" colSpan={5}>
                      {g.group}
                    </th>
                  </tr>
                  {g.rows.map((r) => (
                    <tr key={r.name}>
                      <th scope="row">{r.name}</th>
                      {r.cells.map((c, i) => (
                        <td key={i}>
                          <CellView value={c} />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              ))}
            </table>
          </div>
        </div>
      </section>

      <section id="vy-faq" className="vy-section vy-faq-sec">
        <div className="vy-container vy-faq-grid">
          <div>
            <h2 className="vy-h2">Questions teams ask before they buy</h2>
            <p className="vy-faq-aside">
              Anything else? Write to <a href="mailto:sales@veyra.ai">sales@veyra.ai</a> or{" "}
              <a {...link("demo")}>book a demo</a>.
            </p>
          </div>
          <ul className="vy-faq" role="list">
            {faqs.map((f, i) => (
              <li key={f.q} className={open === i ? "is-open" : ""}>
                <button
                  type="button"
                  aria-expanded={open === i}
                  aria-controls={`vy-faq-${i}`}
                  onClick={() => setOpen(open === i ? null : i)}
                >
                  <span>{f.q}</span>
                  {open === i ? <Minus size={16} /> : <Plus size={16} />}
                </button>
                <div id={`vy-faq-${i}`} className="vy-faq-a" hidden={open !== i}>
                  <p>{f.a}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vy-ent">
        <div className="vy-container">
          <div className="vy-ent-inner vy-ent-box">
            <div>
              <h2 className="vy-h3">Rolling Veyra out to more than 200 people?</h2>
              <p>Enterprise includes SCIM, data residency, a HIPAA BAA and a rollout plan built with your data team.</p>
            </div>
            <a {...link("demo")} className="vy-btn vy-btn--primary">
              Book a demo
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

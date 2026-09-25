import { useState } from "react";
import { ArrowRight, CaretDown, Check, Minus } from "@phosphor-icons/react";
import { COMPARE, EXTRAS, FAQS, PLANS, PT_PACKS } from "../data";
import type { Cell, PageProps } from "../data";
import { AmenityGrid, CtaBand, PageHero, SectionHead, W } from "../components";

function CellValue({ value }: { value: Cell }) {
  if (value === true) return <Check size={20} weight={W} className="fx-yes" aria-label="Included" />;
  if (value === false) return <Minus size={18} weight={W} className="fx-no" aria-label="Not included" />;
  return <>{value}</>;
}

export default function Membership({ go }: PageProps) {
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const order = [PLANS[0], PLANS[2], PLANS[1]];

  return (
    <>
      <PageHero
        title="Membership and pricing"
        text="Every plan includes 24/7 key-card access, the locker rooms and the sauna. No sign-up fee, no annual contract."
        img="barbell-grip"
        alt="Close-up of a lifter gripping a loaded barbell"
      >
        <ul className="fx-phero-points">
          <li>
            <Check size={18} weight={W} aria-hidden="true" /> Month-to-month
          </li>
          <li>
            <Check size={18} weight={W} aria-hidden="true" /> $0 sign-up fee
          </li>
          <li>
            <Check size={18} weight={W} aria-hidden="true" /> Free first week
          </li>
        </ul>
      </PageHero>

      <section className="fx-section">
        <div className="fx-wrap">
          <SectionHead
            center
            title="Pick how you want to train"
            text="Billed monthly from the day you join. Students, teachers, military and first responders save 15%."
          />
          <div className="fx-plans">
            {order.map((p) => (
              <article key={p.id} className={`fx-plan${p.popular ? " is-popular" : ""}`}>
                {p.popular && <span className="fx-badge">Most popular</span>}
                <h3>{p.name}</h3>
                <p className="fx-plan-tag">{p.tagline}</p>
                <p className="fx-price fx-price--lg">
                  <strong>${p.price}</strong>
                  <span>{p.cadence}</span>
                </p>
                <ul className="fx-plan-list">
                  {p.features.map((f) => (
                    <li key={f}>
                      <Check size={18} weight={W} aria-hidden="true" /> <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  className={`fx-btn fx-btn--block ${p.popular ? "fx-btn--primary" : "fx-btn--dark"}`}
                  onClick={() => go("trial")}
                >
                  Start your free week
                </button>
              </article>
            ))}
          </div>
          <p className="fx-plans-note">
            Cancel with 7 days' notice. Freeze up to 3 months a year for $10 a month.
          </p>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <SectionHead
            title="Personal training and other options"
            text="One-on-one sessions are 60 minutes with the coach of your choice, with or without a membership."
          />
          <div className="fx-pt">
            <div>
              <h3 className="fx-h3">Personal training</h3>
              <ul className="fx-pricelist">
                {PT_PACKS.map((pt) => (
                  <li key={pt.name}>
                    <div>
                      <strong>{pt.name}</strong>
                      <span>{pt.note}</span>
                    </div>
                    <em>{pt.price}</em>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="fx-h3">Drop-ins and discounts</h3>
              <ul className="fx-pricelist">
                {EXTRAS.map((x) => (
                  <li key={x.name}>
                    <div>
                      <strong>{x.name}</strong>
                      <span>{x.note}</span>
                    </div>
                    <em>{x.price}</em>
                  </li>
                ))}
              </ul>
              <button type="button" className="fx-textlink" onClick={() => go("coaches")}>
                Meet the coaches <ArrowRight size={16} weight={W} aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap">
          <SectionHead center title="Compare plans" />
          <div className="fx-compare-scroll">
            <table className="fx-compare">
              <thead>
                <tr>
                  <th scope="col">
                    <span className="fx-sr">Feature</span>
                  </th>
                  <th scope="col">Open Gym</th>
                  <th scope="col">8 Classes</th>
                  <th scope="col" className="is-popular">
                    Unlimited
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARE.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.cells.map((c, i) => (
                      <td key={i} className={i === 2 ? "is-popular" : undefined}>
                        <CellValue value={c} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <SectionHead kicker="Included with every plan" title="Showers, sauna, parking and more" />
          <AmenityGrid />
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap fx-faq-wrap">
          <SectionHead
            title="Membership questions"
            text="Something we didn't cover? Call (720) 555-0139 or email team@forgestrength.club."
          />
          <div className="fx-faq">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q} className={`fx-faq-item${isOpen ? " is-open" : ""}`}>
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`fx-faq-${i}`}
                      onClick={() => setOpenFaq(isOpen ? null : i)}
                    >
                      {f.q}
                      <CaretDown size={20} weight={W} aria-hidden="true" />
                    </button>
                  </h3>
                  {isOpen && (
                    <p id={`fx-faq-${i}`} className="fx-faq-a">
                      {f.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CtaBand go={go} title="Try Forge free for 7 days" />
    </>
  );
}

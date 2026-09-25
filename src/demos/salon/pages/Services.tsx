import { Clock, ChatCircleText } from "@phosphor-icons/react";
import { FAQS, LEVELS, MENU } from "../data";
import type { PageProps } from "../types";

export function PageHero({ title, text }: { title: string; text: string }) {
  return (
    <section className="sl-pagehero">
      <div className="sl-wrap">
        <h1 className="sl-h1 sl-h1--page">{title}</h1>
        <p className="sl-lead">{text}</p>
      </div>
    </section>
  );
}

export function ServicesPage({ book }: PageProps) {
  const jump = (id: string) => {
    document.getElementById(`sl-menu-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero
        title="Services and pricing"
        text="Prices are starting prices and depend on your stylist's level and your hair's length and density. We always confirm the price before we start."
      />

      <section className="sl-section sl-section--tight">
        <div className="sl-wrap">
          <dl className="sl-levels">
            {LEVELS.map((l) => (
              <div key={l.name} className="sl-level">
                <dt>{l.name}</dt>
                <dd>{l.note}</dd>
              </div>
            ))}
          </dl>

          <div className="sl-chips sl-chips--menu" role="navigation" aria-label="Service categories">
            {MENU.map((g) => (
              <button key={g.id} type="button" className="sl-chip" onClick={() => jump(g.id)}>
                {g.title}
              </button>
            ))}
          </div>

          <div className="sl-consult">
            <ChatCircleText size={26} aria-hidden="true" />
            <div>
              <h3>Planning a big change?</h3>
              <p>
                Color corrections, blonde transformations and extensions start with a free 15 to 30
                minute consultation, in the studio or by video. You'll leave with a clear plan and
                an exact quote.
              </p>
            </div>
            <button type="button" className="sl-btn sl-btn--sm" onClick={() => book({ service: "Consultation" })}>
              Book a free consult
            </button>
          </div>

          {MENU.map((g) => (
            <section key={g.id} id={`sl-menu-${g.id}`} className="sl-menu-group" aria-labelledby={`sl-mh-${g.id}`}>
              <div className="sl-menu-head">
                <h2 id={`sl-mh-${g.id}`} className="sl-h2 sl-h2--sm">
                  {g.title}
                </h2>
                <p>{g.intro}</p>
              </div>
              <div className="sl-menu-table" role="table" aria-label={`${g.title} prices`}>
                <div className="sl-menu-row sl-menu-row--head" role="row">
                  <span role="columnheader">Service</span>
                  {LEVELS.map((l) => (
                    <span key={l.name} role="columnheader" className="sl-menu-price">
                      {l.name}
                    </span>
                  ))}
                </div>
                {g.items.map((it) => (
                  <div key={it.name} className="sl-menu-row" role="row">
                    <div role="cell" className="sl-menu-name">
                      <strong>{it.name}</strong>
                      {it.desc && <span>{it.desc}</span>}
                      <span className="sl-menu-time">
                        <Clock size={13} aria-hidden="true" /> {it.time}
                      </span>
                    </div>
                    {it.prices.map((p, i) => (
                      <span key={i} role="cell" className={`sl-menu-price${p ? "" : " sl-menu-na"}`} data-level={LEVELS[i].name}>
                        {p || "n/a"}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </section>
          ))}

          <p className="sl-menu-note">
            Extra color or time for very long or thick hair is $20 per additional 15 minutes. "n/a"
            means the service isn't offered at that level. Gratuity isn't included and can be left
            in cash or added to your card at checkout.
          </p>
        </div>
      </section>

      <section className="sl-section sl-section--tint">
        <div className="sl-wrap sl-faq-wrap">
          <div>
            <h2 className="sl-h2">Questions about pricing</h2>
          </div>
          <div className="sl-faq">
            {FAQS.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-cta">
        <div className="sl-wrap sl-cta-in">
          <h2 className="sl-h2">Found what you're after?</h2>
          <p>Booking online takes about two minutes. You can also call or text us at (480) 555-0193.</p>
          <button type="button" className="sl-btn sl-btn--light" onClick={() => book()}>
            Book appointment
          </button>
        </div>
      </section>
    </>
  );
}

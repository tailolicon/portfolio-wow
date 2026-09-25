import { useEffect, useState } from "react";
import { CaretDown, Check, Phone } from "@phosphor-icons/react";
import { FIRM } from "../data";
import { AREAS, type AreaId } from "../data-practice";
import { CtaBand, PageHero, type Go } from "../components";

export default function PracticeAreas({ go, focus }: { go: Go; focus: AreaId | null }) {
  const [active, setActive] = useState<AreaId>(focus ?? "injury");

  useEffect(() => {
    if (focus) setActive(focus);
  }, [focus]);

  const a = AREAS.find((x) => x.id === active) ?? AREAS[0];

  return (
    <>
      <PageHero
        crumb="Practice areas"
        title="Practice areas"
        text="We focus on three areas of law that affect families most directly, so we know them well."
      />

      <div className="lw-tabs-bar">
        <div className="lw-wrap lw-tabs" role="tablist" aria-label="Practice areas">
          {AREAS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="tab"
              id={`lw-tab-${x.id}`}
              aria-selected={x.id === active}
              aria-controls="lw-area-panel"
              className="lw-tab"
              onClick={() => setActive(x.id)}
            >
              {x.title}
            </button>
          ))}
        </div>
      </div>

      <div id="lw-area-panel" role="tabpanel" aria-labelledby={`lw-tab-${a.id}`} key={a.id}>
        <section className="lw-section">
          <div className="lw-wrap lw-area-top">
            <div>
              <h2>{a.title}</h2>
              <p className="lw-area-lead">{a.lead}</p>
              <p className="lw-area-intro">{a.intro}</p>
            </div>
            <img className="lw-area-img" src={a.image} alt={a.imageAlt} />
          </div>
        </section>

        <section className="lw-section lw-section-tint">
          <div className="lw-wrap">
            <h2 className="lw-h2-sm">What we handle</h2>
            <ul className="lw-handle-grid">
              {a.handle.map((h) => (
                <li key={h.name}>
                  <strong>{h.name}</strong>
                  <span>{h.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="lw-section">
          <div className="lw-wrap lw-area-layout">
            <div className="lw-area-main">
              <h2 className="lw-h2-sm">How we help</h2>
              <ul className="lw-help-list">
                {a.help.map((h) => (
                  <li key={h}>
                    <Check size={20} weight="bold" aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              <h2 className="lw-h2-sm lw-faq-title">Common questions</h2>
              <div className="lw-faq">
                {a.faqs.map((f, i) => (
                  <details key={f.q} open={i === 0}>
                    <summary>
                      <span>{f.q}</span>
                      <CaretDown size={20} aria-hidden="true" />
                    </summary>
                    <p>{f.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <aside className="lw-area-side">
              <div className="lw-side-card">
                <h3>{a.fee.title}</h3>
                <p>{a.fee.text}</p>
                <button type="button" className="lw-btn lw-btn-accent lw-btn-block" onClick={() => go("contact")}>
                  Free consultation
                </button>
                <a className="lw-side-phone" href={FIRM.phoneHref}>
                  <Phone size={18} aria-hidden="true" /> {FIRM.phone}
                </a>
                <p className="lw-side-note">Answered 24 hours a day, in English or Spanish</p>
              </div>
              <div className="lw-side-list">
                <h3>Other practice areas</h3>
                {AREAS.filter((o) => o.id !== a.id).map((o) => (
                  <button key={o.id} type="button" onClick={() => setActive(o.id)}>
                    {o.title}
                  </button>
                ))}
              </div>
            </aside>
          </div>
        </section>
      </div>

      <CtaBand go={go} />
    </>
  );
}

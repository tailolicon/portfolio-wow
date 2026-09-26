import { img, person } from "../data";
import { ARTISANS, TIMELINE } from "../data-maison";
import type { SiteApi } from "../ui";

const CARE_STEPS = [
  {
    title: "Bring it in, or post it",
    text: "Any boutique, any time, no appointment needed. Or request a prepaid insured box and send it to the atelier.",
  },
  {
    title: "Inspected at the bench",
    text: "A setter checks every claw and clasp under the loupe and tells you, in writing, what we found.",
  },
  {
    title: "Cleaned, polished, restrung",
    text: "Ultrasonic cleaning, a light polish, rhodium for white gold, new silk for pearls. Returned within 10 days.",
  },
];

const SOURCING = [
  { figure: "100%", label: "recycled 18k gold and platinum since 2019, alloyed in Paris" },
  { figure: "4", label: "diamond sources we buy from by name, plus recycled stones from estate pieces" },
  { figure: "0.30 ct", label: "and above: every diamond comes with an independent grading report" },
  { figure: "37", label: "pearl farms, cutters and refiners audited in our 2025 sourcing report" },
];

export default function Maison({ site }: { site: SiteApi }) {
  return (
    <>
      <section className="lx-maison-hero">
        <div className="lx-container lx-maison-hero-inner">
          <div className="lx-maison-hero-copy">
            <h1 className="lx-display-xl lx-rise">Four rooms above rue Saint-Honoré</h1>
            <p className="lx-lead lx-rise lx-rise-2">
              Since 1931, every Orvel piece has been drawn, set and polished upstairs from the boutique where it is
              sold. Three generations, one address.
            </p>
          </div>
          <figure className="lx-maison-hero-media lx-rise lx-rise-3">
            <img src={img("ring-tray")} alt="Finished rings resting in a velvet tray in the atelier" />
          </figure>
        </div>
      </section>

      <section className="lx-section" aria-labelledby="lx-history">
        <div className="lx-container lx-timeline-wrap">
          <div className="lx-timeline-intro">
            <h2 id="lx-history" className="lx-display-l">
              Our history
            </h2>
            <p>
              Lucien Orvel opened with three apprentices and a single rolling mill. His daughter Hélène ran the house
              for thirty-one years. Today it is led by his granddaughter, Claire Orvel, with the atelier under Agnès
              Morel.
            </p>
          </div>
          <ol className="lx-timeline">
            {TIMELINE.map((t) => (
              <li key={t.year} className="lx-reveal">
                <span className="lx-timeline-year">{t.year}</span>
                <div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lx-section lx-stone" aria-labelledby="lx-atelier">
        <div className="lx-container">
          <div className="lx-atelier-head">
            <h2 id="lx-atelier" className="lx-display-l">
              The atelier
            </h2>
            <p>
              Eleven craftspeople, four benches per room. A Lumière ring passes through six pairs of hands and about
              forty hours of work before it comes downstairs.
            </p>
          </div>
          <div className="lx-people">
            {ARTISANS.map((a) => (
              <figure key={a.name} className="lx-person lx-reveal">
                <img src={person(a.image)} alt={`Portrait of ${a.name}, ${a.role.toLowerCase()}`} loading="lazy" />
                <figcaption>
                  <span className="lx-person-name">{a.name}</span>
                  <span className="lx-muted">
                    {a.role}. {a.years}
                  </span>
                  <q>{a.quote}</q>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="lx-section" aria-labelledby="lx-sourcing">
        <div className="lx-container lx-sourcing">
          <figure className="lx-sourcing-media lx-reveal">
            <img src={img("rings-on-stone")} alt="Gold rings with carnelian and chrysoprase cabochons" loading="lazy" />
          </figure>
          <div className="lx-sourcing-copy">
            <h2 id="lx-sourcing" className="lx-display-l">
              Sourcing and responsibility
            </h2>
            <p>
              We would rather tell you exactly where a stone came from than call it ethical. Each piece travels with a
              record of its metal, its stones and the people who cut them, and we publish the full list every spring.
            </p>
            <dl className="lx-figures">
              {SOURCING.map((s) => (
                <div key={s.figure}>
                  <dt>{s.figure}</dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="lx-section lx-care" aria-labelledby="lx-care-title">
        <div className="lx-container">
          <div className="lx-care-head">
            <h2 id="lx-care-title" className="lx-display-l">
              Lifetime care
            </h2>
            <p>
              Included with every piece, for as long as it is yours, and for whoever you pass it on to. In 2025 the
              atelier cared for 2,614 pieces, the oldest a 1936 brooch.
            </p>
          </div>
          <ol className="lx-steps">
            {CARE_STEPS.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
          <div className="lx-care-cta">
            <button type="button" className="lx-btn lx-btn--light" onClick={() => site.bookViewing()}>
              Book a private viewing
            </button>
            <a className="lx-link lx-link--light" href="mailto:care@maisonorvel.com">
              care@maisonorvel.com
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

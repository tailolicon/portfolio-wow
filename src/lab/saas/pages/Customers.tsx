import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { demoImg } from "../../../demos/shared";
import { logoWall, quotes, stories } from "../data";
import { CustomerMark, Monogram, Reveal, useNav } from "../ui";
import { ClosingCta } from "./Home";

export default function Customers() {
  const { openStory } = useNav();
  const [lead, ...rest] = stories;

  return (
    <>
      <section className="vy-page-hero">
        <div className="vy-container">
          <h1 className="vy-display vy-page-title">The data team stops being a queue.</h1>
          <p className="vy-lead">
            How grocery, health, freight and payments companies put answers in front of everyone without losing control
            of the numbers.
          </p>
        </div>
      </section>

      <section className="vy-cs-lead-sec">
        <div className="vy-container">
          <a
            href={`#${lead.slug}`}
            className="vy-cs-lead"
            onClick={(e) => {
              e.preventDefault();
              openStory(lead.slug);
            }}
          >
            <figure className="vy-cs-lead-media">
              <img src={demoImg("lab-saas", lead.image)} alt={lead.imageAlt} />
            </figure>
            <div className="vy-cs-lead-body">
              <div className="vy-cs-lead-copy">
                <CustomerMark customer={{ name: "pellam", mark: lead.mark, style: "lower" }} />
                <h2 className="vy-h2">{lead.headline}</h2>
                <p>{lead.summary}</p>
                <span className="vy-textlink">
                  Read the story <ArrowRight size={14} />
                </span>
              </div>
              <dl className="vy-cs-lead-stats">
                {lead.outcomes.map((o) => (
                  <div key={o.label}>
                    <dd>{o.value}</dd>
                    <dt>{o.label}</dt>
                  </div>
                ))}
              </dl>
            </div>
          </a>
        </div>
      </section>

      <section className="vy-section vy-cs-list-sec">
        <div className="vy-container">
          <ul className="vy-cs-list" role="list">
            {rest.map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openStory(s.slug);
                  }}
                >
                  <span className="vy-cs-co">
                    <Monogram mark={s.mark} />
                    <span>
                      <strong>{s.company}</strong>
                      <small>
                        {s.industry}, {s.warehouse}
                      </small>
                    </span>
                  </span>
                  <span className="vy-cs-headline">{s.headline}</span>
                  <span className="vy-cs-stat">
                    <strong>{s.outcomes[0].value}</strong>
                    <small>{s.outcomes[0].label}</small>
                  </span>
                  <ArrowUpRight size={18} className="vy-cs-arrow" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="vy-section vy-wall-sec">
        <div className="vy-container">
          <div className="vy-section-head">
            <h2 className="vy-h2">In their words</h2>
          </div>
          <div className="vy-wall">
            {quotes.map((q, i) => (
              <Reveal as="figure" key={q.name} className="vy-wall-item" delay={(i % 3) * 80}>
                <blockquote>{q.text}</blockquote>
                <figcaption className="vy-person">
                  <img src={demoImg("people", q.portrait)} alt="" loading="lazy" />
                  <span>
                    <strong>{q.name}</strong>
                    {q.role}
                  </span>
                </figcaption>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="vy-logo-grid-sec">
        <div className="vy-container">
          <p className="vy-logos-lead">Also asking Veyra first</p>
          <ul className="vy-logo-grid" role="list">
            {logoWall.map((c) => (
              <li key={c.slug}>
                <CustomerMark customer={c} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <ClosingCta
        title="Be the next team to close the queue."
        body="Tell us what your team keeps asking for. We will show you how the first week would look."
      />
    </>
  );
}

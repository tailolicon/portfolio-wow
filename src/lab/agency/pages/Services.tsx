import { Plus } from "@phosphor-icons/react";
import { Arrow, ICON_WEIGHT, ProjectCover } from "../components";
import { projectBySlug } from "../projects";
import { CAPABILITIES, ENGAGEMENTS, FAQ, PROCESS } from "../content";
import type { Nav } from "../index";

export default function Services({ nav }: { nav: Nav }) {
  return (
    <>
      <section className="wv-page-head">
        <div className="wv-wrap wv-services-head">
          <h1 className="wv-page-title">Identity, motion and the systems that hold them together</h1>
          <p className="wv-page-lead">
            Four disciplines, one team. Most clients hire us for two or more at once, and that's where the work is
            strongest.
          </p>
        </div>
      </section>

      <section className="wv-section wv-caps">
        <div className="wv-wrap">
          {CAPABILITIES.map((cap) => {
            const example = projectBySlug(cap.example);
            return (
              <article key={cap.name} className="wv-cap wv-reveal">
                <div className="wv-cap-name">
                  <h2>{cap.name}</h2>
                  <p>{cap.line}</p>
                </div>
                <div className="wv-cap-body">
                  <p className="wv-body-l">{cap.text}</p>
                  <ul className="wv-cap-list">
                    {cap.includes.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  <p className="wv-cap-timing">
                    <span>Typical length</span> {cap.timing}
                  </p>
                </div>
                <a
                  className="wv-cap-example"
                  href={`#case-${example.slug}`}
                  onClick={(event) => {
                    event.preventDefault();
                    nav.openProject(example.slug);
                  }}
                >
                  <ProjectCover project={example} />
                  <span className="wv-cap-example-text">
                    {example.client} <Arrow />
                  </span>
                </a>
              </article>
            );
          })}
        </div>
      </section>

      <section className="wv-section wv-process">
        <div className="wv-wrap">
          <div className="wv-head-row">
            <h2 className="wv-h2">How a project runs</h2>
            <p className="wv-head-note">A typical 14-week identity and motion system. Sprints compress this to six.</p>
          </div>
          <ol className="wv-steps">
            {PROCESS.map((step) => (
              <li key={step.name} className="wv-step wv-reveal">
                <span className="wv-step-weeks">{step.weeks}</span>
                <h3>{step.name}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="wv-section wv-models">
        <div className="wv-wrap">
          <div className="wv-head-row">
            <h2 className="wv-h2">Ways to work with us</h2>
            <p className="wv-head-note">Budgets are starting points. Every proposal is scoped to the brief.</p>
          </div>
          <div className="wv-model-table">
            {ENGAGEMENTS.map((m, i) => (
              <article key={m.name} className={"wv-model wv-reveal" + (i === 1 ? " is-main" : "")}>
                <div className="wv-model-top">
                  <h3>{m.name}</h3>
                  <p className="wv-model-price">{m.price}</p>
                  <p className="wv-model-length">{m.length}</p>
                </div>
                <p className="wv-model-fit">{m.fit}</p>
                <ul>
                  {m.includes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="wv-section wv-faq">
        <div className="wv-wrap wv-faq-in">
          <h2 className="wv-h2">Questions we hear a lot</h2>
          <div className="wv-faq-list">
            {FAQ.map((item, i) => (
              <details key={item.q} className="wv-faq-item" open={i === 0}>
                <summary>
                  {item.q}
                  <Plus className="wv-faq-ico" weight={ICON_WEIGHT} aria-hidden />
                </summary>
                <p>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="wv-cta">
        <div className="wv-wrap wv-cta-in">
          <h2 className="wv-cta-title">Tell us what you're making.</h2>
          <div className="wv-cta-side">
            <p>A short brief is enough. We'll come back with questions, relevant work and a rough scope.</p>
            <div className="wv-actions">
              <a className="wv-btn wv-btn--ink" {...nav.link("contact")} aria-current={undefined}>
                Start a project <Arrow />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

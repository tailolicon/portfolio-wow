import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { demoImg } from "../../../demos/shared";
import { stories } from "../data";
import type { Story as StoryType } from "../data";
import { Monogram, useNav } from "../ui";
import { ClosingCta } from "./Home";

export default function Story({ story }: { story: StoryType }) {
  const { link, openStory } = useNav();
  const idx = stories.findIndex((s) => s.slug === story.slug);
  const next = stories[(idx + 1) % stories.length];

  return (
    <>
      <section className="vy-page-hero vy-story-hero">
        <div className="vy-container">
          <a {...link("customers")} className="vy-back">
            <ArrowLeft size={14} /> All customer stories
          </a>
          <div className="vy-story-co">
            <Monogram mark={story.mark} />
            <span>{story.company}</span>
          </div>
          <h1 className="vy-display vy-page-title vy-story-title">{story.headline}</h1>
          <p className="vy-lead">{story.summary}</p>
        </div>
      </section>

      <div className="vy-container">
        <figure className="vy-story-media">
          <img src={demoImg("lab-saas", story.image)} alt={story.imageAlt} />
        </figure>
        <dl className="vy-story-outcomes">
          {story.outcomes.map((o) => (
            <div key={o.label}>
              <dd>{o.value}</dd>
              <dt>{o.label}</dt>
            </div>
          ))}
        </dl>
      </div>

      <section className="vy-section vy-story-body-sec">
        <div className="vy-container vy-story-grid">
          <aside className="vy-story-facts" aria-label="Company facts">
            <dl>
              {[
                ["Industry", story.industry],
                ["Company size", story.size],
                ["Headquarters", story.hq],
                ["Warehouse", story.warehouse],
                ["Plan", story.plan],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
          </aside>
          <article className="vy-story-article">
            <h2>The problem</h2>
            {story.challenge.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <h2>What they did</h2>
            {story.approach.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <figure className="vy-story-quote">
              <blockquote>&ldquo;{story.quote.text}&rdquo;</blockquote>
              <figcaption className="vy-person">
                <img src={demoImg("people", story.quote.portrait)} alt="" loading="lazy" />
                <span>
                  <strong>{story.quote.name}</strong>
                  {story.quote.role}
                </span>
              </figcaption>
            </figure>
            <h2>Results</h2>
            {story.results.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </article>
        </div>
      </section>

      <section className="vy-story-next">
        <div className="vy-container">
          <a
            href={`#${next.slug}`}
            className="vy-story-next-link"
            onClick={(e) => {
              e.preventDefault();
              openStory(next.slug);
            }}
          >
            <span className="vy-app-label">Next story</span>
            <span className="vy-story-next-title">{next.headline}</span>
            <ArrowRight size={20} />
          </a>
        </div>
      </section>

      <ClosingCta
        title="Find out what your team would ask first."
        body="Most teams connect a warehouse and answer their first real question in the same afternoon."
      />
    </>
  );
}

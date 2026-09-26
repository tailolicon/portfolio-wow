import { useEffect, useState } from "react";
import { ThreeCanvas, lazyThree } from "../../shared";
import { demoImg } from "../../../demos/shared";
import { Arrow, Logotype, ProjectCard, ProjectCover } from "../components";
import { PROJECTS } from "../projects";
import { CULTURE, OTHER_CLIENTS, STUDIO } from "../content";
import type { Nav } from "../index";

const Vortex = lazyThree(() =>
  import("@designcodeio/threeui/components/TypographyVortexCanvas").then((m) => m.TypographyVortexCanvas),
);

const PHRASE = "WREN & VOLT / IDENTITY / MOTION / DIGITAL / CAMPAIGN / ";
const FEATURED = ["parallel", "kestrel", "loop", "solenne", "low-tide", "orbit-nine"];
const REEL = ["kestrel", "parallel", "undertow", "tern"];

/** Static typographic rings shown when WebGL/canvas motion is unavailable. */
function RingsFallback() {
  const rings = [60, 110, 165, 225, 290, 360];
  return (
    <svg className="wv-rings" viewBox="-400 -400 800 800" aria-hidden="true">
      <defs>
        {rings.map((r) => (
          <path key={r} id={`wv-ring-${r}`} d={`M ${-r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 ${-r * 2},0`} />
        ))}
      </defs>
      {rings.map((r, i) => (
        <text key={r} className="wv-rings-text" style={{ fontSize: 9 + i * 2.2, opacity: 0.25 + i * 0.1 }}>
          <textPath href={`#wv-ring-${r}`}>{PHRASE.repeat(Math.max(1, Math.round(r / 55)))}</textPath>
        </text>
      ))}
    </svg>
  );
}

function Hero({ nav }: { nav: Nav }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % REEL.length), 3800);
    return () => window.clearInterval(timer);
  }, []);
  const reel = REEL.map((slug) => PROJECTS.find((p) => p.slug === slug)!);
  const current = reel[index];

  return (
    <section className="wv-hero">
      <div className="wv-hero-stage">
        <ThreeCanvas fallback={<RingsFallback />}>
          <Vortex mode="dark" phrase={PHRASE} speed={0.7} ringGrowth={1.18} particleAmount={0.7} />
        </ThreeCanvas>
      </div>
      <div className="wv-wrap wv-hero-in">
        <div className="wv-hero-copy">
          <h1 className="wv-hero-title">
            <span>Brands built</span> <span>to move.</span>
          </h1>
          <p className="wv-hero-sub">
            An independent studio in Brooklyn making identities, motion systems and digital products for consumer
            and tech companies.
          </p>
          <div className="wv-actions">
            <a className="wv-btn wv-btn--primary" {...nav.link("contact")} aria-current={undefined}>
              Start a project <Arrow />
            </a>
            <a className="wv-btn wv-btn--ghost" {...nav.link("work")}>
              See all work
            </a>
          </div>
        </div>
        <a
          className="wv-reel"
          href={`#case-${current.slug}`}
          onClick={(event) => {
            event.preventDefault();
            nav.openProject(current.slug);
          }}
        >
          <div className="wv-reel-media">
            {reel.map((p, i) => (
              <div key={p.slug} className={"wv-reel-frame" + (i === index ? " is-on" : "")} aria-hidden={i !== index}>
                <ProjectCover project={p} eager />
              </div>
            ))}
          </div>
          <div className="wv-reel-text">
            <span className="wv-reel-client">{current.client}</span>
            <span className="wv-reel-view">
              View case study <Arrow up />
            </span>
          </div>
          <div className="wv-reel-bar" aria-hidden="true">
            {reel.map((p, i) => (
              <span key={p.slug} className={i === index ? "is-on" : i < index ? "is-done" : ""} />
            ))}
          </div>
        </a>
      </div>
    </section>
  );
}

export default function Home({ nav }: { nav: Nav }) {
  const featured = FEATURED.map((slug) => PROJECTS.find((p) => p.slug === slug)!);
  const quote = PROJECTS[0].quote;
  const clients = [...PROJECTS.map((p) => ({ name: p.client, mark: p.mark })), ...OTHER_CLIENTS];

  return (
    <>
      <Hero nav={nav} />

      <section className="wv-section wv-selected">
        <div className="wv-wrap">
          <div className="wv-head-row">
            <h2 className="wv-h2">Selected work</h2>
            <a className="wv-link" {...nav.link("work")}>
              See all work <Arrow />
            </a>
          </div>
          <div className="wv-selected-grid">
            {featured.map((p, i) => (
              <ProjectCard key={p.slug} project={p} onOpen={nav.openProject} size={i === 0 || i === 3 ? "l" : "m"} />
            ))}
          </div>
        </div>
      </section>

      <section className="wv-section wv-position">
        <div className="wv-wrap wv-position-in">
          <p className="wv-statement wv-reveal">
            Most brands now spend more of their life moving than standing still: in feeds, in apps, on screens in
            the street. We design identities that are built for that from the first sketch, so the logo, the type
            and the color already know how to behave at 30 frames a second.
          </p>
          <dl className="wv-facts wv-reveal">
            <div>
              <dt>Founded</dt>
              <dd>2015, by Ada Wren and Marcus Volt</dd>
            </div>
            <div>
              <dt>Studio</dt>
              <dd>22 designers, animators, writers and producers in DUMBO</dd>
            </div>
            <div>
              <dt>Launched</dt>
              <dd>63 identities and 140 campaigns for clients on four continents</dd>
            </div>
            <div>
              <dt>Typical team</dt>
              <dd>Four to seven people, led by a founder</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="wv-quote-band">
        <div className="wv-wrap">
          <figure className="wv-quote wv-reveal">
            <blockquote>{quote.text}</blockquote>
            <figcaption>
              <strong>{quote.name}</strong> {quote.role}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wv-section wv-clients" aria-labelledby="wv-clients-h">
        <div className="wv-wrap">
          <div className="wv-head-row">
            <h2 className="wv-h2" id="wv-clients-h">
              Clients we've built with
            </h2>
            <p className="wv-head-note">From seed-stage founders to companies with 2,000 people.</p>
          </div>
          <ul className="wv-client-wall">
            {clients.map((c) => (
              <li key={c.name} className="wv-reveal">
                <Logotype mark={c.mark} />
                <span className="wv-sr">{c.name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="wv-section wv-culture" id="studio">
        <div className="wv-wrap wv-culture-in">
          <div className="wv-culture-pics wv-reveal">
            <img className="wv-culture-a" src={demoImg("lab-agency", "studio-loft")} alt="The Wren & Volt studio floor in DUMBO" loading="lazy" />
            <img className="wv-culture-b" src={demoImg("lab-agency", "sticky-workshop")} alt="A strategy workshop at the studio" loading="lazy" />
            <img className="wv-culture-c" src={demoImg("lab-agency", "sketching")} alt="Early logotype sketches" loading="lazy" />
          </div>
          <div className="wv-culture-copy">
            <h2 className="wv-h2">A studio small enough to know everyone's name</h2>
            <p className="wv-body-l">
              We have stayed around twenty people on purpose. It keeps the founders on every project and means the
              person who presents the work is the person who made it.
            </p>
            <ul className="wv-culture-list">
              {CULTURE.map((item) => (
                <li key={item.title} className="wv-reveal">
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </li>
              ))}
            </ul>
            <a className="wv-link" href={`mailto:${STUDIO.careers}`}>
              We're hiring a senior motion designer <Arrow />
            </a>
          </div>
        </div>
      </section>

      <section className="wv-cta">
        <div className="wv-wrap wv-cta-in">
          <h2 className="wv-cta-title">Have something that needs to move?</h2>
          <div className="wv-cta-side">
            <p>
              Tell us what you're working on. Ada or Marcus will reply within two working days.
            </p>
            <div className="wv-actions">
              <a className="wv-btn wv-btn--ink" {...nav.link("contact")} aria-current={undefined}>
                Start a project <Arrow />
              </a>
              <a className="wv-link wv-link--ink" href={`mailto:${STUDIO.newBusiness}`}>
                {STUDIO.newBusiness}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

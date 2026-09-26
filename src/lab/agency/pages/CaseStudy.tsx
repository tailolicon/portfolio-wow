import type { CSSProperties } from "react";
import { ThreeCanvas, lazyThree } from "../../shared";
import { Arrow, Logotype, Poster, ProjectCover } from "../components";
import { PROJECTS, projectBySlug } from "../projects";
import type { Project } from "../projects";
import type { Nav } from "../index";

const LiquidForm = lazyThree(() =>
  import("@designcodeio/threeui/components/LiquidFormBackground").then((m) => m.LiquidFormBackground),
);

const SPECIMEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789";

function markFont(project: Project): CSSProperties {
  return {
    fontFamily: project.mark.font,
    fontWeight: project.mark.weight,
    fontStyle: project.mark.italic ? "italic" : "normal",
  };
}

function SystemSection({ project }: { project: Project }) {
  const [primary, dark, light] = project.colors;
  const widths = [40, 26, 20, 14];
  return (
    <section className="wv-system" aria-labelledby="wv-system-h">
      <div className="wv-wrap">
        <div className="wv-case-label-row">
          <h2 className="wv-h2" id="wv-system-h">
            The system
          </h2>
          <p className="wv-head-note">{project.typeface}.</p>
        </div>

        <div className="wv-marks wv-reveal">
          <div className="wv-mark-panel" style={{ background: primary.hex }}>
            <Logotype mark={project.mark} color={primary.ink} />
          </div>
          <div className="wv-mark-panel" style={{ background: light.hex }}>
            <Logotype mark={project.mark} color={dark.hex} />
          </div>
        </div>

        <div className="wv-swatches wv-reveal">
          {project.colors.map((c, i) => (
            <div key={c.name} className="wv-swatch" style={{ background: c.hex, color: c.ink, flexGrow: widths[i] }}>
              <span className="wv-swatch-name">{c.name}</span>
              <span className="wv-swatch-hex">{c.hex.toUpperCase()}</span>
            </div>
          ))}
        </div>

        <div className="wv-specimen wv-reveal" style={{ background: dark.hex, color: dark.ink }}>
          <span className="wv-specimen-aa" style={markFont(project)}>
            Aa
          </span>
          <div className="wv-specimen-side">
            <p className="wv-specimen-line" style={markFont(project)}>
              {project.posters[0]}
            </p>
            <p className="wv-specimen-set" style={markFont(project)}>
              {SPECIMEN}
            </p>
          </div>
        </div>

        <div className="wv-posters">
          <Poster project={project} index={0} className="wv-poster-a wv-reveal" />
          <Poster project={project} index={1} className="wv-poster-b wv-reveal" />
          <Poster project={project} index={2} className="wv-poster-c wv-reveal" />
        </div>
      </div>
    </section>
  );
}

function MotionSection({ project }: { project: Project }) {
  return (
    <section className="wv-motion" aria-labelledby="wv-motion-h">
      <div className="wv-motion-stage">
        <ThreeCanvas
          fallback={
            <div
              className="wv-motion-fallback"
              style={{
                background: `radial-gradient(60% 80% at 62% 45%, ${project.colors[0].hex}, ${project.colors[1].hex} 70%)`,
              }}
            />
          }
        >
          <LiquidForm tintHue={project.hue} tintAmount={0.72} speed={0.6} morph={0.9} metal={0.85} mouseAmount={0.1} />
        </ThreeCanvas>
        <div className="wv-motion-mark">
          <div className="wv-wrap">
            <Logotype mark={project.mark} />
          </div>
        </div>
      </div>
      <div className="wv-wrap wv-motion-in">
        <h2 className="wv-h2" id="wv-motion-h">
          How it moves
        </h2>
        <ol className="wv-principles">
          {project.principles.map((p) => (
            <li key={p.name} className="wv-reveal">
              <h3>{p.name}</h3>
              <p>{p.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export default function CaseStudy({ nav, slug }: { nav: Nav; slug: string }) {
  const project = projectBySlug(slug);
  const idx = PROJECTS.indexOf(project);
  const next = PROJECTS[(idx + 1) % PROJECTS.length];

  return (
    <article className="wv-case">
      <header className="wv-case-head">
        <div className="wv-wrap">
          <a className="wv-back" {...nav.link("work")}>
            All work
          </a>
          <p className="wv-case-client">{project.client}</p>
          <h1 className="wv-case-title">{project.title}</h1>
          <dl className="wv-case-meta">
            <div>
              <dt>Client</dt>
              <dd>{project.client}</dd>
            </div>
            <div>
              <dt>Sector</dt>
              <dd>{project.sector}</dd>
            </div>
            <div>
              <dt>Disciplines</dt>
              <dd>{project.disciplines.join(", ")}</dd>
            </div>
            <div>
              <dt>Year</dt>
              <dd>{project.year}</dd>
            </div>
            <div>
              <dt>Based in</dt>
              <dd>{project.location}</dd>
            </div>
          </dl>
        </div>
      </header>
      <div className="wv-case-cover-band">
        <div className="wv-wrap">
          <ProjectCover project={project} eager className="wv-case-cover" />
        </div>
      </div>

      <section className="wv-section wv-case-story">
        <div className="wv-wrap">
          <p className="wv-case-lead wv-reveal">{project.lead}</p>
          <div className="wv-story-cols">
            <div className="wv-story wv-reveal">
              <h2 className="wv-h3">The challenge</h2>
              {project.challenge.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
            <div className="wv-story wv-reveal">
              <h2 className="wv-h3">Our approach</h2>
              {project.approach.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <SystemSection project={project} />
      <MotionSection project={project} />

      <section className="wv-section wv-case-pics">
        <div className="wv-wrap wv-case-pics-in">
          <img className="wv-reveal" src={project.gallery[0].src} alt={project.gallery[0].alt} loading="lazy" />
          <img className="wv-reveal" src={project.gallery[1].src} alt={project.gallery[1].alt} loading="lazy" />
        </div>
      </section>

      <section className="wv-section wv-results">
        <div className="wv-wrap wv-results-in">
          <div className="wv-deliver">
            <h2 className="wv-h3">What we delivered</h2>
            <ul>
              {project.deliverables.map((d) => (
                <li key={d}>{d}</li>
              ))}
            </ul>
          </div>
          <div className="wv-outcomes">
            <h2 className="wv-h3">What happened next</h2>
            <ul>
              {project.outcomes.map((o) => (
                <li key={o.label} className="wv-reveal">
                  <span className="wv-outcome-n">{o.value}</span>
                  <span className="wv-outcome-l">{o.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="wv-case-quote">
        <div className="wv-wrap">
          <figure className="wv-quote wv-reveal">
            <blockquote>{project.quote.text}</blockquote>
            <figcaption>
              <strong>{project.quote.name}</strong> {project.quote.role}
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="wv-section wv-credits">
        <div className="wv-wrap wv-credits-in">
          <h2 className="wv-h3">Credits</h2>
          <dl>
            {project.credits.map((c) => (
              <div key={c.role}>
                <dt>{c.role}</dt>
                <dd>{c.names}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <a
        className="wv-next"
        href={`#case-${next.slug}`}
        onClick={(event) => {
          event.preventDefault();
          nav.openProject(next.slug);
        }}
      >
        <div className="wv-wrap wv-next-in">
          <div className="wv-next-text">
            <span className="wv-meta">Next project</span>
            <span className="wv-next-client">
              {next.client} <Arrow />
            </span>
            <span className="wv-next-title">{next.title}</span>
          </div>
          <div className="wv-next-media">
            <ProjectCover project={next} />
          </div>
        </div>
      </a>
    </article>
  );
}

import type { ReactNode } from "react";
import { ArrowLeft, ArrowRight } from "@phosphor-icons/react";
import { PROJECTS } from "../data";
import type { Project, Shot } from "../data";
import { Reveal } from "../ui";
import type { Nav } from "../ui";
import Drawings from "./Drawings";

const areaFmt = new Intl.NumberFormat("en-GB");

function Figure({ shot, className = "", ratio }: { shot: Shot; className?: string; ratio: string }) {
  return (
    <Reveal className={`oh-fig ${className}`}>
      <figure>
        <span className={`oh-media oh-media--${ratio}`}>
          <img src={shot.src} alt={shot.alt} loading="lazy" />
        </span>
        <figcaption>{shot.alt}</figcaption>
      </figure>
    </Reveal>
  );
}

function Facts({ project }: { project: Project }) {
  const rows: [string, ReactNode][] = [
    ["Client", project.client],
    ["Location", project.location],
    ["Sector", project.sector],
    ["Area", `${areaFmt.format(project.area)} m²`],
    ["Status", project.completion],
    ["Team", project.team.join(", ")],
    [
      "Collaborators",
      <ul>
        {project.collaborators.map(([role, name]) => (
          <li key={role}>
            <span className="oh-facts-role">{role}</span> {name}
          </li>
        ))}
      </ul>,
    ],
  ];
  if (project.awards.length > 0) {
    rows.push([
      "Awards",
      <ul>
        {project.awards.map((award) => (
          <li key={award}>{award}</li>
        ))}
      </ul>,
    ]);
  }
  return (
    <dl className="oh-facts">
      {rows.map(([term, value]) => (
        <div key={term} className="oh-facts-row">
          <dt>{term}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Narrative({ sections }: { sections: Project["sections"] }) {
  return (
    <>
      {sections.map((section) => (
        <section key={section.title} className="oh-narrative">
          <h2 className="oh-heading">{section.title}</h2>
          <div className="oh-narrative-body">
            {section.body.map((para) => (
              <p key={para.slice(0, 24)}>{para}</p>
            ))}
          </div>
        </section>
      ))}
    </>
  );
}

function Sibling({ project, dir, nav }: { project: Project; dir: "prev" | "next"; nav: Nav }) {
  return (
    <a
      className={`oh-sibling oh-sibling--${dir}`}
      href={`#project-${project.slug}`}
      onClick={(event) => {
        event.preventDefault();
        nav.openProject(project.slug);
      }}
    >
      <span className="oh-media oh-media--land">
        <img src={project.hero.src} alt={project.hero.alt} loading="lazy" />
      </span>
      <span className="oh-sibling-label oh-data">
        {dir === "prev" ? <ArrowLeft size={16} weight="light" aria-hidden="true" /> : null}
        {dir === "prev" ? "Previous project" : "Next project"}
        {dir === "next" ? <ArrowRight size={16} weight="light" aria-hidden="true" /> : null}
      </span>
      <span className="oh-sibling-name">{project.name}</span>
      <span className="oh-data oh-tile-meta">
        {project.location}, {project.year}
      </span>
    </a>
  );
}

export default function ProjectPage({ project, nav }: { project: Project; nav: Nav }) {
  const index = PROJECTS.findIndex((p) => p.slug === project.slug);
  const prev = PROJECTS[(index - 1 + PROJECTS.length) % PROJECTS.length];
  const next = PROJECTS[(index + 1) % PROJECTS.length];
  const [s0, s1, s2, s3, s4] = project.shots;
  const split = Math.min(2, Math.ceil(project.sections.length / 2));

  return (
    <article className="oh-case">
      <div className="oh-case-hero">
        <img src={project.hero.src} alt={project.hero.alt} />
      </div>

      <div className="oh-wrap oh-case-intro">
        <div className="oh-case-title">
          <a className="oh-back oh-data" {...nav.link("projects")}>
            <ArrowLeft size={14} weight="light" aria-hidden="true" />
            Projects
          </a>
          <h1 className="oh-display">{project.name}</h1>
          <p className="oh-data oh-case-loc">
            {project.location}, {project.year}
          </p>
          <p className="oh-lead">{project.summary}</p>
        </div>
        <aside className="oh-case-facts" aria-label="Project information">
          <Facts project={project} />
        </aside>
      </div>

      <div className="oh-wrap">
        <Narrative sections={project.sections.slice(0, split)} />
      </div>

      {s0 ? (
        <Reveal className="oh-bleed">
          <figure>
            <img src={s0.src} alt={s0.alt} loading="lazy" />
            <figcaption className="oh-wrap">{s0.alt}</figcaption>
          </figure>
        </Reveal>
      ) : null}

      <div className="oh-wrap">
        {project.sections.length > split ? <Narrative sections={project.sections.slice(split)} /> : null}

        {s1 || s2 ? (
          <div className="oh-pair">
            {s1 ? <Figure shot={s1} ratio="land" className="oh-pair-a" /> : null}
            {s2 ? <Figure shot={s2} ratio="port" className="oh-pair-b" /> : null}
          </div>
        ) : null}

        {s3 ? <Figure shot={s3} ratio="wide" className="oh-offset" /> : null}

        {s4 ? (
          <div className={`oh-portrait-note ${project.quote ? "" : "oh-portrait-note--solo"}`}>
            <Figure shot={s4} ratio="port" className="oh-portrait-note-fig" />
            {project.quote ? (
              <blockquote className="oh-quote">
                <p>{project.quote.text}</p>
                <footer className="oh-data">{project.quote.by}</footer>
              </blockquote>
            ) : null}
          </div>
        ) : project.quote ? (
          <blockquote className="oh-quote oh-quote--solo">
            <p>{project.quote.text}</p>
            <footer className="oh-data">{project.quote.by}</footer>
          </blockquote>
        ) : null}

        <section className="oh-drawings-wrap">
          <h2 className="oh-title">Drawings</h2>
          <Drawings project={project} />
        </section>
      </div>

      <nav className="oh-wrap oh-siblings" aria-label="More projects">
        <Sibling project={prev} dir="prev" nav={nav} />
        <Sibling project={next} dir="next" nav={nav} />
      </nav>
    </article>
  );
}

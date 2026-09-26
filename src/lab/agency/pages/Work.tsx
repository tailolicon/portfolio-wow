import { useRef, useState } from "react";
import { Rows, SquaresFour } from "@phosphor-icons/react";
import { Arrow, ICON_WEIGHT, ProjectCard, ProjectCover, useReveal } from "../components";
import { DISCIPLINES, PROJECTS } from "../projects";
import type { Discipline } from "../projects";
import type { Nav } from "../index";

type Filter = "All" | Discipline;
type View = "grid" | "index";

export default function Work({ nav }: { nav: Nav }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [view, setView] = useState<View>("grid");
  const [hover, setHover] = useState<string | null>(null);
  const listRef = useRef<HTMLElement>(null);
  useReveal(listRef, filter + view);

  const shown = filter === "All" ? PROJECTS : PROJECTS.filter((p) => p.disciplines.includes(filter));
  const count = (f: Filter) => (f === "All" ? PROJECTS.length : PROJECTS.filter((p) => p.disciplines.includes(f)).length);
  const hovered = PROJECTS.find((p) => p.slug === hover);

  return (
    <>
      <section className="wv-page-head">
        <div className="wv-wrap">
          <h1 className="wv-page-title">Work</h1>
          <p className="wv-page-lead">
            Ten recent projects for banks, headphones, festivals and a coffee roaster. Most include identity and
            motion together, because that's how we prefer to work.
          </p>
        </div>
      </section>

      <div className="wv-work-bar">
        <div className="wv-wrap wv-work-bar-in">
          <div className="wv-filters" role="group" aria-label="Filter by discipline">
            {(["All", ...DISCIPLINES] as Filter[]).map((f) => (
              <button
                key={f}
                type="button"
                className="wv-chip"
                aria-pressed={filter === f}
                onClick={() => setFilter(f)}
              >
                {f} <span className="wv-chip-n">{count(f)}</span>
              </button>
            ))}
          </div>
          <div className="wv-view" role="group" aria-label="Layout">
            <button type="button" className="wv-view-btn" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
              <SquaresFour weight={ICON_WEIGHT} aria-hidden /> Grid
            </button>
            <button type="button" className="wv-view-btn" aria-pressed={view === "index"} onClick={() => setView("index")}>
              <Rows weight={ICON_WEIGHT} aria-hidden /> Index
            </button>
          </div>
        </div>
      </div>

      <section className="wv-section wv-work-list" ref={listRef}>
        <div className="wv-wrap">
          {view === "grid" ? (
            <div className="wv-work-grid" key={filter}>
              {shown.map((p) => (
                <ProjectCard key={p.slug} project={p} onOpen={nav.openProject} />
              ))}
            </div>
          ) : (
            <div className="wv-index" onMouseLeave={() => setHover(null)}>
              <div className="wv-index-row wv-index-head" aria-hidden="true">
                <span>Client</span>
                <span>Project</span>
                <span>Disciplines</span>
                <span>Year</span>
              </div>
              <ul>
                {shown.map((p) => (
                  <li key={p.slug}>
                    <a
                      className="wv-index-row"
                      href={`#case-${p.slug}`}
                      onMouseEnter={() => setHover(p.slug)}
                      onFocus={() => setHover(p.slug)}
                      onClick={(event) => {
                        event.preventDefault();
                        nav.openProject(p.slug);
                      }}
                    >
                      <span className="wv-index-client">{p.client}</span>
                      <span className="wv-index-title">{p.title}</span>
                      <span className="wv-index-disc">{p.disciplines.join(", ")}</span>
                      <span className="wv-index-year">
                        {p.year} <Arrow />
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className={"wv-index-peek" + (hovered ? " is-on" : "")} aria-hidden="true">
                {hovered && <ProjectCover project={hovered} key={hovered.slug} />}
              </div>
            </div>
          )}
          {shown.length === 0 && <p className="wv-empty">No projects in this discipline yet.</p>}
        </div>
      </section>

      <section className="wv-section wv-work-more">
        <div className="wv-wrap wv-work-more-in">
          <h2 className="wv-h2">Some of our best work is under NDA</h2>
          <div>
            <p className="wv-body-l">
              About a third of what we make ships before we can talk about it. If you'd like to see unreleased work
              in your category, we're happy to walk you through it on a call.
            </p>
            <a className="wv-link" {...nav.link("contact")}>
              Ask for a private walkthrough <Arrow />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

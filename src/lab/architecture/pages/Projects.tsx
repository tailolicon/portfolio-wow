import { useState } from "react";
import { Rows, SquaresFour } from "@phosphor-icons/react";
import { PROJECTS, SECTORS, STATUSES } from "../data";
import type { Sector, Status } from "../data";
import { ProjectTile } from "../ui";
import type { Nav } from "../ui";

type Props = { nav: Nav; sector: Sector | "All"; onSector: (sector: Sector | "All") => void };

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
  count,
}: {
  label: string;
  options: T[];
  value: T | "All";
  onChange: (value: T | "All") => void;
  count: (value: T | "All") => number;
}) {
  const all: (T | "All")[] = ["All", ...options];
  return (
    <div className="oh-filter" role="group" aria-label={label}>
      <span className="oh-filter-label">{label}</span>
      <div className="oh-filter-options">
        {all.map((option) => (
          <button
            key={option}
            type="button"
            className="oh-filter-btn"
            aria-pressed={value === option}
            onClick={() => onChange(option)}
          >
            {option}
            <span className="oh-filter-count">{count(option)}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default function Projects({ nav, sector, onSector }: Props) {
  const [status, setStatus] = useState<Status | "All">("All");
  const [view, setView] = useState<"grid" | "list">("grid");

  const matchSector = (s: Sector | "All") => (p: (typeof PROJECTS)[number]) => s === "All" || p.sector === s;
  const matchStatus = (s: Status | "All") => (p: (typeof PROJECTS)[number]) => s === "All" || p.status === s;
  const visible = PROJECTS.filter(matchSector(sector)).filter(matchStatus(status)).sort((a, b) => b.year - a.year);

  return (
    <div className="oh-wrap oh-index">
      <header className="oh-page-head">
        <h1 className="oh-display">Projects</h1>
        <p className="oh-lead">
          Selected work from London and Lisbon, from single houses to civic buildings. Completed, on site and in design.
        </p>
      </header>

      <div className="oh-toolbar">
        <FilterGroup
          label="Sector"
          options={SECTORS}
          value={sector}
          onChange={onSector}
          count={(s) => PROJECTS.filter(matchSector(s)).filter(matchStatus(status)).length}
        />
        <FilterGroup
          label="Status"
          options={STATUSES}
          value={status}
          onChange={setStatus}
          count={(s) => PROJECTS.filter(matchSector(sector)).filter(matchStatus(s)).length}
        />
        <div className="oh-view-toggle" role="group" aria-label="View">
          <button type="button" aria-pressed={view === "grid"} onClick={() => setView("grid")}>
            <SquaresFour size={18} weight="light" aria-hidden="true" />
            <span>Grid</span>
          </button>
          <button type="button" aria-pressed={view === "list"} onClick={() => setView("list")}>
            <Rows size={18} weight="light" aria-hidden="true" />
            <span>List</span>
          </button>
        </div>
      </div>

      <p className="oh-result-count oh-data" aria-live="polite">
        {visible.length} {visible.length === 1 ? "project" : "projects"}
      </p>

      {visible.length === 0 ? (
        <div className="oh-empty">
          <p>No projects match these filters.</p>
          <button
            type="button"
            className="oh-button"
            onClick={() => {
              onSector("All");
              setStatus("All");
            }}
          >
            Clear filters
          </button>
        </div>
      ) : view === "grid" ? (
        <div className="oh-index-grid">
          {visible.map((project, i) => (
            <ProjectTile key={project.slug} project={project} nav={nav} ratio="land" lazy={i > 5} showSector />
          ))}
        </div>
      ) : (
        <div className="oh-index-list" role="table" aria-label="Projects">
          <div className="oh-list-row oh-list-head" role="row">
            <span role="columnheader" className="oh-list-thumb-col">
              <span className="oh-sr">Image</span>
            </span>
            <span role="columnheader">Project</span>
            <span role="columnheader">Location</span>
            <span role="columnheader">Sector</span>
            <span role="columnheader">Status</span>
            <span role="columnheader" className="oh-list-year">Year</span>
          </div>
          {visible.map((project) => (
            <a
              key={project.slug}
              role="row"
              className="oh-list-row"
              href={`#project-${project.slug}`}
              onClick={(event) => {
                event.preventDefault();
                nav.openProject(project.slug);
              }}
            >
              <span role="cell" className="oh-list-thumb-col">
                <img className="oh-list-thumb" src={project.hero.src} alt="" loading="lazy" />
              </span>
              <span role="cell" className="oh-list-name">{project.name}</span>
              <span role="cell">{project.location}</span>
              <span role="cell">{project.sector}</span>
              <span role="cell" className={project.status === "On site" ? "oh-status-live" : undefined}>
                {project.status}
              </span>
              <span role="cell" className="oh-list-year">{project.year}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

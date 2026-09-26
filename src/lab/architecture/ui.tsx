import type { MouseEvent, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import type { Project, Sector } from "./data";

export type PageId = "home" | "projects" | "project" | "studio" | "contact";

export type Nav = {
  go: (page: PageId) => void;
  link: (page: PageId) => {
    href: string;
    "aria-current": "page" | undefined;
    onClick: (event: MouseEvent<HTMLElement>) => void;
  };
  openProject: (slug: string) => void;
  openProjects: (sector?: Sector) => void;
};

/** Rises in as it enters the scrolling viewport (CSS scroll-driven animation, see tokens.css). */
export function Reveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`oh-reveal ${className}`}>{children}</div>;
}

export function TextLink({ children, onClick, href = "#" }: { children: ReactNode; onClick: () => void; href?: string }) {
  return (
    <a
      className="oh-textlink"
      href={href}
      onClick={(event) => {
        event.preventDefault();
        onClick();
      }}
    >
      <span>{children}</span>
      <ArrowRight size={16} weight="light" aria-hidden="true" />
    </a>
  );
}

type TileProps = {
  project: Project;
  nav: Nav;
  ratio?: "land" | "port" | "wide" | "square";
  lazy?: boolean;
  showSector?: boolean;
};

export function ProjectTile({ project, nav, ratio = "land", lazy = true, showSector = false }: TileProps) {
  return (
    <a
      className="oh-tile"
      href={`#project-${project.slug}`}
      onClick={(event) => {
        event.preventDefault();
        nav.openProject(project.slug);
      }}
    >
      <span className={`oh-media oh-media--${ratio}`}>
        <img src={project.hero.src} alt={project.hero.alt} loading={lazy ? "lazy" : "eager"} />
      </span>
      <span className="oh-tile-name">{project.name}</span>
      <span className="oh-data oh-tile-meta">
        {project.location}, {project.year}
        {showSector ? <span className="oh-tile-sector">{project.sector}</span> : null}
      </span>
    </a>
  );
}

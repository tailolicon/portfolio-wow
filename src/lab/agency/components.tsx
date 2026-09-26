import { useEffect } from "react";
import type { CSSProperties, RefObject } from "react";
import { ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import type { Mark, Project } from "./projects";

export const ICON_WEIGHT = "regular" as const;

export function Arrow({ up = false }: { up?: boolean }) {
  return up ? (
    <ArrowUpRight className="wv-ico" weight={ICON_WEIGHT} aria-hidden />
  ) : (
    <ArrowRight className="wv-ico" weight={ICON_WEIGHT} aria-hidden />
  );
}

/** A client logotype set in type. Size is controlled by the parent's font-size. */
export function Logotype({ mark, color, className = "" }: { mark: Mark; color?: string; className?: string }) {
  const style: CSSProperties = {
    fontFamily: mark.font,
    fontWeight: mark.weight,
    letterSpacing: mark.tracking,
    textTransform: mark.transform ?? "none",
    fontStyle: mark.italic ? "italic" : "normal",
    color,
  };
  return (
    <span className={"wv-logotype " + className} style={style}>
      {mark.text}
    </span>
  );
}

type CoverSpec = { place: "center" | "bottom" | "top" | "label" | "band" | "inset"; color: string; scale: number };

/** Art direction for each project's cover: where the client mark sits and in which color. */
const COVERS: Record<string, CoverSpec> = {
  parallel: { place: "center", color: "#ffffff", scale: 1.15 },
  kestrel: { place: "bottom", color: "#141414", scale: 1.2 },
  solenne: { place: "center", color: "#3a2233", scale: 1.05 },
  "orbit-nine": { place: "top", color: "#cfe8ff", scale: 0.62 },
  loop: { place: "inset", color: "#1d1b22", scale: 1.6 },
  fieldwork: { place: "label", color: "#231f1c", scale: 0.55 },
  mellow: { place: "top", color: "#17132b", scale: 0.9 },
  "low-tide": { place: "center", color: "#f4f1ff", scale: 1 },
  undertow: { place: "band", color: "#e9ecef", scale: 0.55 },
  tern: { place: "bottom", color: "#18e0a0", scale: 1.3 },
};

export function ProjectCover({
  project,
  eager = false,
  className = "",
}: {
  project: Project;
  eager?: boolean;
  className?: string;
}) {
  const spec = COVERS[project.slug] ?? COVERS.parallel;
  const style = { "--wv-mark-scale": spec.scale } as CSSProperties;
  return (
    <div
      className={`wv-cover wv-cover--${spec.place} ${className}`}
      style={spec.place === "inset" ? { ...style, background: project.colors[0].hex } : style}
    >
      <img src={project.cover.src} alt={project.cover.alt} loading={eager ? "eager" : "lazy"} />
      {spec.place === "band" && <span className="wv-cover-band" style={{ background: project.colors[1].hex }} />}
      <div
        className="wv-cover-mark"
        style={spec.place === "label" ? { background: project.colors[2].hex } : undefined}
      >
        <Logotype mark={project.mark} color={spec.color} />
      </div>
    </div>
  );
}

export function Disciplines({ project }: { project: Project }) {
  return (
    <span className="wv-meta">
      {project.disciplines.join(", ")} <span aria-hidden>·</span> {project.year}
    </span>
  );
}

export function ProjectCard({
  project,
  onOpen,
  size = "m",
}: {
  project: Project;
  onOpen: (slug: string) => void;
  size?: "l" | "m" | "s";
}) {
  return (
    <a
      className={`wv-card wv-card--${size} wv-reveal`}
      href={`#case-${project.slug}`}
      onClick={(event) => {
        event.preventDefault();
        onOpen(project.slug);
      }}
    >
      <div className="wv-card-media">
        <ProjectCover project={project} />
      </div>
      <div className="wv-card-text">
        <h3 className="wv-card-client">{project.client}</h3>
        <p className="wv-card-title">{project.title}</p>
        <Disciplines project={project} />
      </div>
    </a>
  );
}

/** Campaign poster composed in type over the client's colors and imagery. */
export function Poster({ project, index, className = "" }: { project: Project; index: number; className?: string }) {
  const [primary, dark, light] = project.colors;
  const line = project.posters[index % project.posters.length];
  const variant = index % 3;
  const img = variant === 1 ? project.cover : project.gallery[variant === 2 ? 1 : 0] ?? project.cover;
  const headStyle: CSSProperties = {
    fontFamily: project.mark.font,
    fontWeight: project.mark.weight,
    fontStyle: project.mark.italic ? "italic" : "normal",
    textTransform: project.mark.transform === "uppercase" ? "uppercase" : "none",
  };
  const bg = variant === 0 ? primary : variant === 1 ? dark : light;
  return (
    <figure className={`wv-poster wv-poster--${variant} ${className}`} style={{ background: bg.hex, color: bg.ink }}>
      <img src={img.src} alt={img.alt} loading="lazy" />
      <p className="wv-poster-line" style={headStyle}>
        {line}
      </p>
      <div className="wv-poster-foot">
        <Logotype mark={project.mark} />
        <span>{project.location}</span>
      </div>
    </figure>
  );
}

/** Adds .is-in to .wv-reveal elements as they scroll into view. Re-runs when `key` changes. */
export function useReveal(rootRef: RefObject<HTMLElement | null>, key: string) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>(".wv-reveal:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [rootRef, key]);
}

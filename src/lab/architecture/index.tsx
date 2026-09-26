import { useCallback, useState } from "react";
import type { MouseEvent } from "react";
import { List, X } from "@phosphor-icons/react";
import { useSitePages } from "../../demos/shared";
import { PROJECTS, projectBySlug } from "./data";
import type { Sector } from "./data";
import { OFFICES } from "./content";
import type { Nav, PageId } from "./ui";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectPage from "./pages/Project";
import Studio from "./pages/Studio";
import Contact from "./pages/Contact";
import "./tokens.css";
import "./layout.css";
import "./pages.css";
import "./studio.css";
import "./case.css";

const PAGES = ["home", "projects", "project", "studio", "contact"] as const;

const MENU: { id: PageId; label: string }[] = [
  { id: "projects", label: "Projects" },
  { id: "studio", label: "Studio" },
  { id: "contact", label: "Contact" },
];

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [slug, setSlug] = useState(PROJECTS[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [sector, setSector] = useState<Sector | "All">("All");

  const navigate = useCallback(
    (next: PageId) => {
      setMenuOpen(false);
      go(next);
    },
    [go],
  );

  const openProject = useCallback(
    (next: string) => {
      setSlug(next);
      navigate("project");
    },
    [navigate],
  );

  const openProjects = useCallback(
    (next?: Sector) => {
      setSector(next ?? "All");
      navigate("projects");
    },
    [navigate],
  );

  const navLink = (target: PageId) => {
    const props = link(target);
    return {
      ...props,
      "aria-current": (page === target || (target === "projects" && page === "project") ? "page" : undefined) as
        | "page"
        | undefined,
      onClick: (event: MouseEvent<HTMLElement>) => {
        setMenuOpen(false);
        props.onClick(event);
      },
    };
  };

  const nav: Nav = { go: navigate, link: navLink, openProject, openProjects };

  return (
    <div ref={rootRef} className="demo-site site-lab-architecture">
      <header className="oh-header">
        <div className="oh-header-inner">
          <a className="oh-wordmark" {...link("home")} aria-label="Oyelaran Hart Architects, home">
            Oyelaran Hart
          </a>
          <nav className="oh-nav" aria-label="Main">
            {MENU.map((item) => (
              <a key={item.id} className="oh-nav-link" {...navLink(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
          <button
            type="button"
            className="oh-menu-button"
            aria-expanded={menuOpen}
            aria-controls="oh-mobile-menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X size={22} weight="light" aria-hidden="true" /> : <List size={22} weight="light" aria-hidden="true" />}
            <span className="oh-sr">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>
        {menuOpen ? (
          <nav id="oh-mobile-menu" className="oh-mobile-menu" aria-label="Main">
            <a className="oh-mobile-link" {...navLink("home")}>
              Home
            </a>
            {MENU.map((item) => (
              <a key={item.id} className="oh-mobile-link" {...navLink(item.id)}>
                {item.label}
              </a>
            ))}
          </nav>
        ) : null}
      </header>

      <main className="oh-main" key={page === "project" ? `project-${slug}` : page}>
        {page === "home" && <Home nav={nav} />}
        {page === "projects" && <Projects nav={nav} sector={sector} onSector={setSector} />}
        {page === "project" && <ProjectPage nav={nav} project={projectBySlug(slug)} />}
        {page === "studio" && <Studio />}
        {page === "contact" && <Contact />}
      </main>

      <footer className="oh-footer">
        <div className="oh-footer-grid">
          <div className="oh-footer-brand">
            <p className="oh-footer-mark">Oyelaran Hart Architects</p>
            <p className="oh-footer-note">Architecture and interiors for homes, cultural buildings, workplaces and hotels.</p>
          </div>
          {OFFICES.map((office) => (
            <div key={office.city} className="oh-footer-col">
              <p className="oh-footer-head">{office.city}</p>
              <address>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <a href={`tel:${office.phone.replace(/\s/g, "")}`}>{office.phone}</a>
            </div>
          ))}
          <div className="oh-footer-col">
            <p className="oh-footer-head">Practice</p>
            <a {...link("projects")}>Projects</a>
            <a {...link("studio")}>Studio</a>
            <a {...link("contact")}>Contact</a>
            <a href="#careers" onClick={(event) => { event.preventDefault(); navigate("studio"); }}>
              Careers
            </a>
          </div>
          <div className="oh-footer-col">
            <p className="oh-footer-head">Follow</p>
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
            <a href="#newsletter">Newsletter</a>
          </div>
        </div>
        <div className="oh-footer-legal">
          <span>© 2026 Oyelaran Hart Architects Ltd. Registered in England and Wales, no. 06531874.</span>
          <span>VAT GB 948 2210 17</span>
          <span className="oh-footer-links">
            <a href="#privacy">Privacy</a>
            <a href="#cookies">Cookies</a>
            <a href="#modern-slavery">Modern slavery statement</a>
          </span>
        </div>
      </footer>
    </div>
  );
}

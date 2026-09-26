import { useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useSitePages } from "../../demos/shared";
import { ICON_WEIGHT, useReveal } from "./components";
import { PROJECTS } from "./projects";
import { STUDIO } from "./content";
import Home from "./pages/Home";
import Work from "./pages/Work";
import CaseStudy from "./pages/CaseStudy";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import "./styles/base.css";
import "./styles/components.css";
import "./styles/home.css";
import "./styles/work.css";
import "./styles/case.css";
import "./styles/services.css";
import "./styles/contact.css";

const PAGES = ["home", "work", "case", "services", "contact"] as const;
export type Page = (typeof PAGES)[number];

export type Nav = {
  go: (page: Page) => void;
  link: (page: Page) => {
    href: string;
    "aria-current": "page" | undefined;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  };
  openProject: (slug: string) => void;
};

const MENU: { page: Page; label: string }[] = [
  { page: "work", label: "Work" },
  { page: "services", label: "Services" },
  { page: "contact", label: "Contact" },
];

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [slug, setSlug] = useState(PROJECTS[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);

  useReveal(rootRef, page + slug);

  const navigate = (next: Page) => {
    setMenuOpen(false);
    go(next);
  };
  const navLink: Nav["link"] = (target) => {
    const base = link(target);
    return {
      ...base,
      "aria-current": target === "work" && page === "case" ? "page" : base["aria-current"],
      onClick: (event) => {
        setMenuOpen(false);
        base.onClick(event);
      },
    };
  };
  const openProject = (next: string) => {
    setSlug(next);
    navigate("case");
  };
  const nav: Nav = { go: navigate, link: navLink, openProject };

  return (
    <div ref={rootRef} className="demo-site site-lab-agency">
      <header className="wv-header">
        <div className="wv-header-in">
          <a className="wv-wordmark" {...navLink("home")} aria-label="Wren and Volt, home">
            Wren<span>&amp;</span>Volt
          </a>
          <nav className="wv-nav" aria-label="Main">
            {MENU.map((item) => (
              <a key={item.page} className="wv-nav-link" {...navLink(item.page)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="wv-btn wv-btn--primary wv-header-cta" {...navLink("contact")} aria-current={undefined}>
            Start a project
          </a>
          <button
            type="button"
            className="wv-menu-btn"
            aria-expanded={menuOpen}
            aria-controls="wv-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X weight={ICON_WEIGHT} /> : <List weight={ICON_WEIGHT} />}
          </button>
        </div>
        {menuOpen && (
          <div className="wv-menu" id="wv-menu">
            {MENU.map((item) => (
              <a key={item.page} className="wv-menu-link" {...navLink(item.page)}>
                {item.label}
              </a>
            ))}
            <a className="wv-btn wv-btn--primary" {...navLink("contact")} aria-current={undefined}>
              Start a project
            </a>
          </div>
        )}
      </header>

      <main className="wv-main" key={page === "case" ? `case-${slug}` : page}>
        {page === "home" && <Home nav={nav} />}
        {page === "work" && <Work nav={nav} />}
        {page === "case" && <CaseStudy nav={nav} slug={slug} />}
        {page === "services" && <Services nav={nav} />}
        {page === "contact" && <Contact />}
      </main>

      <Footer nav={nav} />
    </div>
  );
}

function Footer({ nav }: { nav: Nav }) {
  return (
    <footer className="wv-footer">
      <div className="wv-wrap">
        <div className="wv-footer-top">
          <p className="wv-footer-big">
            Wren<span>&amp;</span>Volt
          </p>
        </div>
        <div className="wv-footer-cols">
          <div>
            <h2 className="wv-footer-h">Studio</h2>
            <address>
              {STUDIO.street}
              <br />
              {STUDIO.city}
            </address>
            <p>{STUDIO.phone}</p>
          </div>
          <div>
            <h2 className="wv-footer-h">New business</h2>
            <a href={`mailto:${STUDIO.newBusiness}`}>{STUDIO.newBusiness}</a>
            <p>Booking projects from January 2027</p>
          </div>
          <div>
            <h2 className="wv-footer-h">Careers</h2>
            <a href={`mailto:${STUDIO.careers}`}>{STUDIO.careers}</a>
            <p>
              <a {...nav.link("contact")} aria-current={undefined}>
                3 open roles
              </a>
            </p>
          </div>
          <div>
            <h2 className="wv-footer-h">Elsewhere</h2>
            <ul className="wv-footer-list">
              <li><a href="#instagram">Instagram</a></li>
              <li><a href="#vimeo">Vimeo</a></li>
              <li><a href="#linkedin">LinkedIn</a></li>
              <li><a href="#newsletter">Newsletter</a></li>
            </ul>
          </div>
          <nav className="wv-footer-nav" aria-label="Footer">
            <h2 className="wv-footer-h">Pages</h2>
            <ul className="wv-footer-list">
              <li><a {...nav.link("work")}>Work</a></li>
              <li><a {...nav.link("services")}>Services</a></li>
              <li><a {...nav.link("contact")}>Contact</a></li>
            </ul>
          </nav>
        </div>
        <div className="wv-footer-legal">
          <span>© 2026 Wren &amp; Volt LLC. All client work shown with permission.</span>
          <span>
            <a href="#privacy">Privacy</a>
            <a href="#terms">Terms</a>
          </span>
        </div>
      </div>
    </footer>
  );
}

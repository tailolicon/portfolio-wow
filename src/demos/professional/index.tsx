import { useState } from "react";
import { Clock, EnvelopeSimple, FacebookLogo, LinkedinLogo, List, MapPin, Phone, Translate, X } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { FIRM, NAV, PAGES, type Page } from "./data";
import { AREAS, type AreaId } from "./data-practice";
import Home from "./pages/Home";
import PracticeAreas from "./pages/PracticeAreas";
import Attorneys from "./pages/Attorneys";
import Results from "./pages/Results";
import Contact from "./pages/Contact";
import "./professional.css";
import "./shell.css";
import "./pages.css";
import "./practice.css";
import "./pages-2.css";
import "./responsive.css";

function Logo() {
  return (
    <span className="lw-logo">
      <svg className="lw-logo-mark" viewBox="0 0 44 44" aria-hidden="true">
        <rect className="lw-mark-bg" width="44" height="44" rx="6" />
        <rect className="lw-mark-rule" x="4" y="4" width="36" height="36" rx="3" fill="none" strokeWidth="1" />
        <text className="lw-mark-text" x="22" y="28.5" textAnchor="middle" fontSize="15">
          H<tspan className="lw-mark-amp" fontSize="12">&amp;</tspan>R
        </text>
      </svg>
      <span className="lw-logo-text">
        <span className="lw-logo-name">Harper &amp; Reyes</span>
        <span className="lw-logo-sub">Law, PLLC · Charlotte, NC</span>
      </span>
    </span>
  );
}

export default function Site() {
  const { page, go: goPage, link, rootRef } = useSitePages(PAGES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [focusArea, setFocusArea] = useState<AreaId | null>(null);

  const go = (next: Page) => {
    setMenuOpen(false);
    setFocusArea(null);
    goPage(next);
  };
  const navLink = (target: Page) => {
    const props = link(target);
    return {
      ...props,
      onClick: (e: Parameters<typeof props.onClick>[0]) => {
        setMenuOpen(false);
        setFocusArea(null);
        props.onClick(e);
      },
    };
  };
  const openArea = (id: AreaId) => {
    setMenuOpen(false);
    setFocusArea(id);
    goPage("practice-areas");
  };

  return (
    <div ref={rootRef} className="demo-site site-professional">
      <header className="lw-header">
        <div className="lw-topbar">
          <div className="lw-wrap lw-topbar-inner">
            <span>
              <Translate size={16} aria-hidden="true" /> Se habla español
            </span>
            <span className="lw-topbar-mid">
              <MapPin size={16} aria-hidden="true" /> 1001 Morehead Square Dr, Suite 300, Charlotte
            </span>
            <a href={FIRM.phoneHref}>
              <Phone size={16} aria-hidden="true" /> Phones answered 24 hours a day
            </a>
          </div>
        </div>
        <div className="lw-mainbar">
          <div className="lw-wrap lw-mainbar-inner">
            <a className="lw-logo-link" {...navLink("home")} aria-current={undefined} aria-label="Harper & Reyes Law home">
              <Logo />
            </a>
            <nav className="lw-nav" aria-label="Main">
              {NAV.map((n) => (
                <a key={n.page} className="lw-nav-link" {...navLink(n.page)}>
                  {n.label}
                </a>
              ))}
            </nav>
            <div className="lw-header-cta">
              <a className="lw-header-phone" href={FIRM.phoneHref}>
                <span className="lw-header-phone-label">Call 24/7</span>
                <span className="lw-header-phone-num">{FIRM.phone}</span>
              </a>
              <button type="button" className="lw-btn lw-btn-accent lw-header-btn" onClick={() => go("contact")}>
                Free consultation
              </button>
              <a className="lw-header-call" href={FIRM.phoneHref} aria-label={`Call ${FIRM.phone}`}>
                <Phone size={22} />
              </a>
              <button
                type="button"
                className="lw-burger"
                aria-expanded={menuOpen}
                aria-controls="lw-mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((o) => !o)}
              >
                {menuOpen ? <X size={24} /> : <List size={24} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav id="lw-mobile-nav" className="lw-mobile-nav" aria-label="Mobile">
              {NAV.map((n) => (
                <a key={n.page} className="lw-mobile-link" {...navLink(n.page)}>
                  {n.label}
                </a>
              ))}
              <a className="lw-btn lw-btn-navy lw-btn-block" href={FIRM.phoneHref}>
                <Phone size={18} aria-hidden="true" /> Call {FIRM.phone}
              </a>
              <button type="button" className="lw-btn lw-btn-accent lw-btn-block" onClick={() => go("contact")}>
                Free consultation
              </button>
            </nav>
          )}
        </div>
      </header>

      <main>
        {page === "home" && <Home go={go} openArea={openArea} />}
        {page === "practice-areas" && <PracticeAreas go={go} focus={focusArea} />}
        {page === "attorneys" && <Attorneys go={go} />}
        {page === "results" && <Results go={go} />}
        {page === "contact" && <Contact />}
      </main>

      <footer className="lw-footer">
        <div className="lw-wrap lw-footer-grid">
          <div className="lw-footer-brand">
            <Logo />
            <p>
              Personal injury, family law and estate planning attorneys serving Charlotte and the surrounding
              counties since {FIRM.founded}. Hablamos español.
            </p>
            <div className="lw-social">
              <a href="#facebook" aria-label="Harper & Reyes Law on Facebook" onClick={(e) => e.preventDefault()}>
                <FacebookLogo size={20} />
              </a>
              <a href="#linkedin" aria-label="Harper & Reyes Law on LinkedIn" onClick={(e) => e.preventDefault()}>
                <LinkedinLogo size={20} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="lw-footer-h">Practice areas</h2>
            <ul className="lw-footer-list">
              {AREAS.map((a) => (
                <li key={a.id}>
                  <a
                    href="#practice-areas"
                    onClick={(e) => {
                      e.preventDefault();
                      openArea(a.id);
                    }}
                  >
                    {a.title}
                  </a>
                </li>
              ))}
            </ul>
            <h2 className="lw-footer-h lw-footer-h2">The firm</h2>
            <ul className="lw-footer-list">
              {NAV.filter((n) => n.page !== "home" && n.page !== "practice-areas").map((n) => (
                <li key={n.page}>
                  <a {...navLink(n.page)}>{n.label}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="lw-footer-h">Office</h2>
            <ul className="lw-footer-contact">
              <li>
                <MapPin size={18} aria-hidden="true" />
                <span>
                  {FIRM.street}
                  <br />
                  {FIRM.cityLine}
                </span>
              </li>
              <li>
                <Phone size={18} aria-hidden="true" />
                <a href={FIRM.phoneHref}>{FIRM.phone}</a>
              </li>
              <li>
                <EnvelopeSimple size={18} aria-hidden="true" />
                <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="lw-footer-h">Hours</h2>
            <ul className="lw-footer-hours">
              {FIRM.hours.map((h) => (
                <li key={h.days}>
                  <Clock size={17} aria-hidden="true" />
                  <span>
                    <strong>{h.days}</strong>
                    <br />
                    {h.time}
                  </span>
                </li>
              ))}
            </ul>
            <button type="button" className="lw-btn lw-btn-accent lw-footer-btn" onClick={() => go("contact")}>
              Free consultation
            </button>
          </div>
        </div>
        <div className="lw-wrap lw-footer-legal">
          <p>
            <strong>Attorney Advertising.</strong> This website is designed for general information only. The
            information presented at this site should not be construed to be formal legal advice nor the formation of
            a lawyer/client relationship. Prior results do not guarantee a similar outcome. Harper &amp; Reyes Law,
            PLLC is responsible for the content of this website. Attorneys are licensed by the North Carolina State
            Bar; Daniel J. Harper and Marcus T. Bell are also admitted in South Carolina. The North Carolina State Bar
            does not certify lawyers as specialists in personal injury law.
          </p>
          <details className="lw-privacy">
            <summary>Privacy Policy</summary>
            <p>
              We collect the information you choose to send us through our forms, phone, or email only to respond to
              your inquiry and evaluate a potential representation. We do not sell or share your information with third
              parties for marketing. Contact {FIRM.email} to request that we delete your information.
            </p>
          </details>
          <div className="lw-footer-bottom">
            <span>© 2026 {FIRM.legalName}. All rights reserved.</span>
            <span>
              {FIRM.street}, {FIRM.cityLine}
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}

import { useState } from "react";
import { Clock, Envelope, FacebookLogo, InstagramLogo, List, MapPin, Phone, X, YoutubeLogo } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { socialLink, useLegalDialog } from "../links";
import { BIZ, HOURS, PAGES } from "./data";
import type { Page } from "./data";
import { LogoMark, W } from "./components";
import Home from "./pages/Home";
import Classes from "./pages/Classes";
import Membership from "./pages/Membership";
import Coaches from "./pages/Coaches";
import Trial from "./pages/Trial";
import "./fitness.css";
import "./fitness-pages.css";

const NAV: { id: Page; label: string }[] = [
  { id: "classes", label: "Classes & Schedule" },
  { id: "membership", label: "Membership" },
  { id: "coaches", label: "Coaches" },
];

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [open, setOpen] = useState(false);

  const navLink = (id: Page) => {
    const base = link(id);
    return {
      ...base,
      onClick: (e: Parameters<typeof base.onClick>[0]) => {
        setOpen(false);
        base.onClick(e);
      },
    };
  };

  const props = { go, link };
  const legal = useLegalDialog(BIZ.name, BIZ.email);

  return (
    <div ref={rootRef} className="demo-site site-fitness">
      <div className="fx-topbar">
        <div className="fx-wrap fx-topbar-inner">
          <span>
            <MapPin size={15} weight={W} aria-hidden="true" /> {BIZ.street}, Denver. Free parking out back
          </span>
          <span className="fx-topbar-right">
            <span className="fx-topbar-hours">
              <Clock size={15} weight={W} aria-hidden="true" /> 24/7 access for members
            </span>
            <a href={BIZ.phoneHref}>
              <Phone size={15} weight={W} aria-hidden="true" /> {BIZ.phone}
            </a>
          </span>
        </div>
      </div>

      <header className="fx-header">
        <div className="fx-wrap fx-header-inner">
          <a className="fx-logo" {...navLink("home")} aria-label="Forge Strength Club home">
            <LogoMark />
            <span className="fx-logo-text">
              <strong>Forge</strong>
              <small>Strength Club</small>
            </span>
          </a>
          <nav className="fx-nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} className="fx-nav-link" {...navLink(n.id)}>
                {n.label}
              </a>
            ))}
          </nav>
          <div className="fx-header-actions">
            <a className="fx-header-login" {...navLink("membership")} aria-current={undefined}>
              Member login
            </a>
            <a className="fx-btn fx-btn--primary fx-btn--sm fx-header-cta" {...navLink("trial")}>
              Start your free week
            </a>
            <button
              type="button"
              className="fx-burger"
              aria-expanded={open}
              aria-controls="fx-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={24} weight={W} /> : <List size={24} weight={W} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="fx-mobile-nav" className="fx-mnav" aria-label="Mobile">
            <a {...navLink("home")}>Home</a>
            {NAV.map((n) => (
              <a key={n.id} {...navLink(n.id)}>
                {n.label}
              </a>
            ))}
            <a {...navLink("trial")} className="fx-btn fx-btn--primary">
              Start your free week
            </a>
            <a className="fx-mnav-phone" href={BIZ.phoneHref}>
              <Phone size={16} weight={W} aria-hidden="true" /> {BIZ.phone}
            </a>
          </nav>
        )}
      </header>

      <main>
        {page === "home" && <Home {...props} />}
        {page === "classes" && <Classes {...props} />}
        {page === "membership" && <Membership {...props} />}
        {page === "coaches" && <Coaches {...props} />}
        {page === "trial" && <Trial {...props} />}
      </main>

      <footer className="fx-footer">
        <div className="fx-wrap fx-footer-grid">
          <div className="fx-footer-brand">
            <a className="fx-logo" {...navLink("home")} aria-label="Forge Strength Club home">
              <LogoMark />
              <span className="fx-logo-text">
                <strong>Forge</strong>
                <small>Strength Club</small>
              </span>
            </a>
            <p>
              Coached strength and conditioning in RiNo since 2018. Small classes, honest programming and
              coaches who know your name.
            </p>
            <div className="fx-social">
              <a {...socialLink("instagram")} aria-label="Instagram">
                <InstagramLogo size={20} weight={W} />
              </a>
              <a {...socialLink("facebook")} aria-label="Facebook">
                <FacebookLogo size={20} weight={W} />
              </a>
              <a {...socialLink("youtube")} aria-label="YouTube">
                <YoutubeLogo size={20} weight={W} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="fx-footer-h">Visit</h2>
            <address className="fx-footer-list">
              <span>{BIZ.street}</span>
              <span>{BIZ.city}</span>
              <a href={BIZ.phoneHref}>
                <Phone size={15} weight={W} aria-hidden="true" /> {BIZ.phone}
              </a>
              <a href={`mailto:${BIZ.email}`}>
                <Envelope size={15} weight={W} aria-hidden="true" /> {BIZ.email}
              </a>
            </address>
          </div>
          <div>
            <h2 className="fx-footer-h">Staffed hours</h2>
            <ul className="fx-footer-list">
              {HOURS.map((h) => (
                <li key={h.day}>
                  <span className="fx-footer-day">{h.short}</span> <span>{h.time}</span>
                </li>
              ))}
              <li className="fx-footer-note">24/7 key-card access for members</li>
            </ul>
          </div>
          <div>
            <h2 className="fx-footer-h">Explore</h2>
            <ul className="fx-footer-list">
              <li>
                <a {...navLink("classes")}>Classes & Schedule</a>
              </li>
              <li>
                <a {...navLink("membership")}>Membership & Pricing</a>
              </li>
              <li>
                <a {...navLink("coaches")}>Our Coaches</a>
              </li>
              <li>
                <a {...navLink("trial")}>Free Trial Week</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="fx-wrap fx-footer-bottom">
          <p>© 2026 Forge Strength Club LLC. All rights reserved.</p>
          <p>
            <a {...legal.link("privacy")}>
              Privacy
            </a>
            <a {...legal.link("terms")}>
              Membership terms
            </a>
            <a href={`mailto:${BIZ.email}?subject=Coaching%20and%20front%20desk%20jobs`}>
              Careers
            </a>
          </p>
        </div>
      </footer>
      {legal.dialog}
    </div>
  );
}

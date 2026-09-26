import { useState } from "react";
import { Clock, EnvelopeSimple, FacebookLogo, IconContext, InstagramLogo, List, MapPin, Phone, SealCheck, Siren, Star, X, YoutubeLogo } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { socialLink, useLegalDialog } from "../links";
import { BIZ, HOURS, PAGES } from "./data";
import type { Page } from "./data";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Areas from "./pages/Areas";
import Reviews from "./pages/Reviews";
import Quote from "./pages/Quote";
import "./services.css";
import "./services-pages.css";

const NAV: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services" },
  { id: "areas", label: "Service areas" },
  { id: "reviews", label: "Reviews" },
  { id: "quote", label: "Get a quote" },
];

function Logo() {
  return (
    <span className="sv-logo">
      <svg viewBox="0 0 40 40" width="42" height="42" aria-hidden="true">
        <rect width="40" height="40" rx="8" fill="#0b2a4f" />
        <path d="M6 30 L16 13 L21 21 L25 16 L34 30 Z" fill="#fff" />
        <path d="M16 13 L19.2 18.4 L16 17 L12.9 18.3 Z" fill="#f26b1d" />
        <path d="M25 16 L27.6 20.3 L25 19.2 L22.6 20 Z" fill="#f26b1d" />
      </svg>
      <span className="sv-logo-text">
        <strong>SUMMIT</strong>
        <small>Plumbing &amp; Air</small>
      </span>
    </span>
  );
}

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const legal = useLegalDialog(BIZ.name, BIZ.email);
  const [menuOpen, setMenuOpen] = useState(false);

  const navLink = (id: Page) => {
    const l = link(id);
    return {
      ...l,
      onClick: (e: Parameters<typeof l.onClick>[0]) => {
        l.onClick(e);
        setMenuOpen(false);
      },
    };
  };

  const nav = { go, link };

  return (
    <IconContext.Provider value={{ weight: "bold" }}>
    <div ref={rootRef} className="demo-site site-services">
      <div className="sv-utility">
        <div className="sv-wrap sv-utility-inner">
          <p className="sv-util-emerg">
            <Siren size={15} aria-hidden="true" /> 24/7 emergency plumbing &amp; AC service
          </p>
          <div className="sv-util-right">
            <span className="sv-util-rating">
              <Star size={14} weight="fill" aria-hidden="true" /> {BIZ.rating} on Google
            </span>
            <a href={BIZ.tel} className="sv-util-phone">
              <Phone size={14} aria-hidden="true" /> {BIZ.phone}
            </a>
            <a href="mailto:careers@summitplumbingair.com?subject=Service%20technician%20application" className="sv-util-hiring">
              Now hiring techs
            </a>
          </div>
        </div>
      </div>

      <header className="sv-header">
        <div className="sv-wrap sv-header-inner">
          <a {...navLink("home")} className="sv-logo-link" aria-label="Summit Plumbing & Air home">
            <Logo />
          </a>
          <nav className="sv-nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} {...navLink(n.id)} className="sv-nav-link">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="sv-header-cta">
            <a href={BIZ.tel} className="sv-head-phone">
              <span className="sv-head-phone-icon" aria-hidden="true">
                <Phone size={20} />
              </span>
              <span>
                <small>Call 24/7</small>
                <strong>{BIZ.phone}</strong>
              </span>
            </a>
            <button type="button" className="sv-btn sv-btn-orange sv-book" onClick={() => go("quote")}>
              Book service
            </button>
            <button
              type="button"
              className="sv-burger"
              aria-expanded={menuOpen}
              aria-controls="sv-mobile-nav"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((o) => !o)}
            >
              {menuOpen ? <X size={24} /> : <List size={24} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav id="sv-mobile-nav" className="sv-mobile-nav" aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.id} {...navLink(n.id)}>
                {n.label}
              </a>
            ))}
            <a href={BIZ.tel} className="sv-btn sv-btn-orange sv-btn-block">
              <Phone size={18} /> {BIZ.phone}
            </a>
          </nav>
        )}
      </header>

      <main>
        {page === "home" && <Home {...nav} />}
        {page === "services" && <Services {...nav} />}
        {page === "areas" && <Areas {...nav} />}
        {page === "reviews" && <Reviews {...nav} />}
        {page === "quote" && <Quote {...nav} />}
      </main>

      <section className="sv-emerg-bar" aria-label="Emergency service">
        <div className="sv-wrap sv-emerg-inner">
          <span className="sv-emerg-icon" aria-hidden="true"><Siren size={30} /></span>
          <div className="sv-emerg-text">
            <h2>Burst pipe or no AC? We're dispatching right now.</h2>
            <p>Live answering 24 hours a day, 365 days a year. Most emergency calls get a tech the same night.</p>
          </div>
          <div className="sv-emerg-actions">
            <a href={BIZ.tel} className="sv-btn sv-btn-orange sv-btn-lg">
              <Phone size={20} /> {BIZ.phone}
            </a>
            <button type="button" className="sv-btn sv-btn-ghost sv-btn-lg" onClick={() => go("quote")}>
              Book service
            </button>
          </div>
        </div>
      </section>

      <footer className="sv-footer">
        <div className="sv-wrap sv-foot-grid">
          <div className="sv-foot-brand">
            <Logo />
            <p>
              Family-owned plumbing, heating &amp; air conditioning serving Mesa and the Phoenix East Valley since 2006.
            </p>
            <p className="sv-foot-lic">
              <SealCheck size={16} aria-hidden="true" /> <span>Licensed, bonded &amp; insured<br />Arizona {BIZ.roc}</span>
            </p>
            <div className="sv-social">
              <a {...socialLink("facebook")} aria-label="Facebook">
                <FacebookLogo size={18} />
              </a>
              <a {...socialLink("instagram")} aria-label="Instagram">
                <InstagramLogo size={18} />
              </a>
              <a {...socialLink("youtube")} aria-label="YouTube">
                <YoutubeLogo size={18} />
              </a>
            </div>
          </div>
          <div>
            <h2 className="sv-foot-h">Services</h2>
            <ul className="sv-foot-list">
              {["Plumbing repair", "Drain cleaning", "Water heaters", "AC repair", "AC replacement", "Heating repair"].map((s) => (
                <li key={s}>
                  <a {...link("services")}>{s}</a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="sv-foot-h">Company</h2>
            <ul className="sv-foot-list">
              <li><a {...link("home")}>About us</a></li>
              <li><a {...link("areas")}>Service areas</a></li>
              <li><a {...link("reviews")}>Reviews</a></li>
              <li><a {...link("services")}>Specials &amp; coupons</a></li>
              <li><a {...link("quote")}>Financing</a></li>
              <li><a href="mailto:careers@summitplumbingair.com?subject=Careers">Careers</a></li>
            </ul>
          </div>
          <div>
            <h2 className="sv-foot-h">Contact</h2>
            <ul className="sv-foot-contact">
              <li><Phone size={16} aria-hidden="true" /> <a href={BIZ.tel}>{BIZ.phone}</a></li>
              <li><EnvelopeSimple size={16} aria-hidden="true" /> <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></li>
              <li><MapPin size={16} aria-hidden="true" /> <span>{BIZ.street}<br />{BIZ.city}</span></li>
              <li>
                <Clock size={16} aria-hidden="true" />
                <span>
                  {HOURS.map((h) => (
                    <span key={h.d} className="sv-foot-hour">{h.d}: {h.h}</span>
                  ))}
                  <span className="sv-foot-hour sv-foot-247">Emergency service 24/7/365</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
        <div className="sv-foot-bottom">
          <div className="sv-wrap sv-foot-bottom-inner">
            <p>© 2026 Summit Plumbing &amp; Air LLC. All rights reserved. AZ {BIZ.roc}</p>
            <p className="sv-foot-legal">
              <a {...legal.link("privacy")}>Privacy policy</a>
              <a {...legal.link("terms")}>Terms of service</a>
              <a {...legal.link("accessibility")}>Accessibility</a>
            </p>
          </div>
        </div>
      </footer>
      {legal.dialog}
    </div>
    </IconContext.Provider>
  );
}

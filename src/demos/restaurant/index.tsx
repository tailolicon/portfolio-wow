import { useState } from "react";
import type { MouseEvent } from "react";
import { Clock, FacebookLogo, InstagramLogo, List, MapPin, Phone, X } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { socialLink } from "../links";
import { BIZ, HOURS_SHORT, NAV, PAGES } from "./data";
import type { RsPage } from "./data";
import { Logo, Newsletter } from "./parts";
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import About from "./pages/About";
import Reservations from "./pages/Reservations";
import Contact from "./pages/Contact";
import "./restaurant.css";
import "./restaurant-pages.css";

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [open, setOpen] = useState(false);

  const navTo = (target: RsPage) => {
    const base = link(target);
    return {
      ...base,
      onClick: (event: MouseEvent<HTMLElement>) => {
        setOpen(false);
        base.onClick(event);
      },
    };
  };
  const props = { go, link: navTo };

  /** Footer shortcuts: open a page, then bring one of its sections into view. */
  const toSection = (target: RsPage, id: string) => ({
    href: `#${id}`,
    onClick: (event: MouseEvent<HTMLElement>) => {
      event.preventDefault();
      go(target);
      window.setTimeout(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    },
  });

  return (
    <div ref={rootRef} className="demo-site site-restaurant">
      <div className="rs-topbar">
        <div className="rs-wrap rs-topbar-in">
          <span><MapPin size={15} aria-hidden /> {BIZ.street}, Austin</span>
          <span className="rs-topbar-hide"><Clock size={15} aria-hidden /> Open Tuesday to Sunday. Aperitivo hour Tue-Fri, 4-6pm</span>
          <a href={`tel:${BIZ.tel}`}><Phone size={15} aria-hidden /> {BIZ.phone}</a>
        </div>
      </div>

      <header className="rs-header">
        <div className="rs-wrap rs-header-in">
          <a className="rs-brand" {...navTo("home")} aria-current={undefined}>
            <Logo />
            <span className="rs-brand-text">
              <strong>Nonna Rosa</strong>
              <small>Trattoria &amp; wine bar</small>
            </span>
          </a>
          <nav className="rs-nav" aria-label="Main">
            {NAV.map((item) => (
              <a key={item.id} {...navTo(item.id)}>{item.label}</a>
            ))}
          </nav>
          <div className="rs-header-cta">
            <button type="button" className="rs-btn rs-btn-primary" onClick={() => go("reservations")}>
              Reserve a table
            </button>
            <button
              type="button"
              className="rs-burger"
              aria-expanded={open}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="rs-mobile-nav" aria-label="Mobile">
            {NAV.map((item) => (
              <a key={item.id} {...navTo(item.id)}>{item.label}</a>
            ))}
            <a className="rs-btn rs-btn-primary" {...navTo("reservations")} aria-current={undefined}>Reserve a table</a>
            <a className="rs-mobile-phone" href={`tel:${BIZ.tel}`}><Phone size={16} aria-hidden /> {BIZ.phone}</a>
          </nav>
        )}
      </header>

      <main>
        {page === "home" && <Home {...props} />}
        {page === "menu" && <MenuPage {...props} />}
        {page === "about" && <About {...props} />}
        {page === "reservations" && <Reservations {...props} />}
        {page === "contact" && <Contact {...props} />}
      </main>

      <Newsletter />

      <footer className="rs-footer">
        <div className="rs-wrap rs-footer-grid">
          <div className="rs-footer-brand">
            <div className="rs-brand rs-brand-light">
              <Logo />
              <span className="rs-brand-text">
                <strong>Nonna Rosa</strong>
                <small>Trattoria &amp; wine bar</small>
              </span>
            </div>
            <p>Handmade pasta, wood-fired pizza and a glass of something good. A Bellini family kitchen on South Lamar since 1998.</p>
            <div className="rs-social">
              <a {...socialLink("instagram")} aria-label="Instagram"><InstagramLogo size={20} /></a>
              <a {...socialLink("facebook")} aria-label="Facebook"><FacebookLogo size={20} /></a>
            </div>
          </div>
          <div>
            <h3>Visit</h3>
            <p>{BIZ.street}<br />{BIZ.city}</p>
            <p><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a><br /><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></p>
          </div>
          <div>
            <h3>Hours</h3>
            <ul className="rs-footer-hours">
              {HOURS_SHORT.map((h) => (
                <li key={h.day}><span>{h.day}</span><span>{h.time}</span></li>
              ))}
            </ul>
            <p className="rs-footer-note">Aperitivo hour Tue-Fri, 4-6pm at the bar</p>
          </div>
          <div>
            <h3>Explore</h3>
            <ul className="rs-footer-links">
              {NAV.map((item) => (
                <li key={item.id}><a {...navTo(item.id)}>{item.label}</a></li>
              ))}
              <li><a {...navTo("contact")} aria-current={undefined}>Private dining</a></li>
              <li><a {...toSection("home", "rs-gift-cards")}>Gift cards</a></li>
              <li><a {...toSection("contact", "rs-contact-form")}>Careers</a></li>
            </ul>
          </div>
        </div>
        <div className="rs-wrap rs-footer-bottom">
          <span>© 2026 Nonna Rosa Trattoria LLC</span>
          <span>An 18% service charge is added to parties of 7 or more. Please alert your server to any allergies.</span>
        </div>
      </footer>
    </div>
  );
}

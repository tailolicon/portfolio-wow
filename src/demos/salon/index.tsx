import { useState } from "react";
import type { MouseEvent } from "react";
import { IconContext, List, X, Phone, MapPin, Clock, InstagramLogo, FacebookLogo, EnvelopeSimple } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { PAGES, BIZ, HOURS } from "./data";
import type { Page } from "./data";
import type { BookPrefill, PageProps } from "./types";
import { HomePage } from "./pages/Home";
import { ServicesPage } from "./pages/Services";
import { StylistsPage } from "./pages/Stylists";
import { GalleryPage } from "./pages/Gallery";
import { BookPage } from "./pages/Book";
import { Logo } from "./Logo";
import "./salon.css";
import "./salon-pages.css";

const NAV: { id: Page; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "services", label: "Services & pricing" },
  { id: "stylists", label: "Our team" },
  { id: "gallery", label: "Gallery" },
];

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [open, setOpen] = useState(false);
  const [prefill, setPrefill] = useState<BookPrefill>({});

  const nav = (p: Page) => {
    setOpen(false);
    go(p);
  };
  const navLink = (p: Page) => {
    const l = link(p);
    return {
      ...l,
      onClick: (e: MouseEvent<HTMLElement>) => {
        setOpen(false);
        l.onClick(e);
      },
    };
  };
  const book = (next: BookPrefill = {}) => {
    setPrefill(next);
    nav("book");
  };
  const props: PageProps = { go: nav, link: navLink, book };

  return (
    <IconContext.Provider value={{ weight: "light" }}>
    <div ref={rootRef} className="demo-site site-salon">
      <div className="sl-promo">
        New guests save <strong>20% on their first color service.</strong>
        <button type="button" className="sl-promo-link" onClick={() => book({})}>
          Book appointment
        </button>
      </div>

      <header className="sl-header">
        <div className="sl-wrap sl-header-in">
          <a {...navLink("home")} className="sl-brand" aria-label="Ivy & Oak Hair Studio home page">
            <Logo />
          </a>
          <nav className="sl-nav" aria-label="Main">
            {NAV.map((n) => (
              <a key={n.id} {...navLink(n.id)} className="sl-nav-link">
                {n.label}
              </a>
            ))}
          </nav>
          <div className="sl-header-cta">
            <a className="sl-header-phone" href={`tel:${BIZ.tel}`}>
              <Phone size={15} aria-hidden="true" /> {BIZ.phone}
            </a>
            <button type="button" className="sl-btn sl-btn--sm" onClick={() => book({})}>
              Book appointment
            </button>
            <button
              type="button"
              className="sl-burger"
              aria-expanded={open}
              aria-controls="sl-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="sl-mobile-nav" className="sl-mobile-nav" aria-label="Mobile">
            {NAV.map((n) => (
              <a key={n.id} {...navLink(n.id)}>
                {n.label}
              </a>
            ))}
            <a {...navLink("book")}>Book online</a>
            <a href={`tel:${BIZ.tel}`} className="sl-mobile-phone">
              <Phone size={16} aria-hidden="true" /> Call or text {BIZ.phone}
            </a>
          </nav>
        )}
      </header>

      <main className="sl-main">
        {page === "home" && <HomePage {...props} />}
        {page === "services" && <ServicesPage {...props} />}
        {page === "stylists" && <StylistsPage {...props} />}
        {page === "gallery" && <GalleryPage {...props} />}
        {page === "book" && <BookPage {...props} prefill={prefill} key={JSON.stringify(prefill)} />}
      </main>

      <Footer link={navLink} />
    </div>
    </IconContext.Provider>
  );
}

function Footer({ link }: { link: PageProps["link"] }) {
  return (
    <footer className="sl-footer">
      <div className="sl-wrap sl-footer-grid">
        <div className="sl-footer-brand">
          <Logo light />
          <p>
            A small hair studio in Old Town Scottsdale for lived-in color, balayage, precision cuts,
            extensions and bridal styling. Open since 2016.
          </p>
          <div className="sl-social">
            <a href="#instagram" aria-label="Instagram" onClick={(e) => e.preventDefault()}>
              <InstagramLogo size={18} />
            </a>
            <a href="#facebook" aria-label="Facebook" onClick={(e) => e.preventDefault()}>
              <FacebookLogo size={18} />
            </a>
            <a href={`mailto:${BIZ.email}`} aria-label="Email">
              <EnvelopeSimple size={18} />
            </a>
          </div>
        </div>
        <div>
          <h3 className="sl-footer-h">Visit</h3>
          <p className="sl-footer-line">
            <MapPin size={15} aria-hidden="true" />
            <span>
              {BIZ.street}
              <br />
              {BIZ.city}
            </span>
          </p>
          <p className="sl-footer-line">
            <Phone size={15} aria-hidden="true" />
            <a href={`tel:${BIZ.tel}`}>{BIZ.phone} (call or text)</a>
          </p>
          <p className="sl-footer-line">
            <EnvelopeSimple size={15} aria-hidden="true" />
            <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>
          </p>
        </div>
        <div>
          <h3 className="sl-footer-h">
            <Clock size={15} aria-hidden="true" /> Hours
          </h3>
          <dl className="sl-footer-hours">
            {HOURS.map((h) => (
              <div key={h.day}>
                <dt>{h.day}</dt>
                <dd>{h.time}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div>
          <h3 className="sl-footer-h">Studio</h3>
          <ul className="sl-footer-links">
            <li><a {...link("services")}>Services &amp; pricing</a></li>
            <li><a {...link("stylists")}>Our team</a></li>
            <li><a {...link("gallery")}>Gallery</a></li>
            <li><a {...link("book")}>Book online</a></li>
            <li><a {...link("home")}>Gift cards</a></li>
            <li><a {...link("stylists")}>Careers</a></li>
          </ul>
        </div>
      </div>
      <div className="sl-wrap sl-footer-base">
        <span>© 2026 Ivy &amp; Oak Hair Studio LLC. All rights reserved.</span>
        <span className="sl-footer-legal"><a {...link("book")}>Booking policies</a><a href="#privacy" onClick={(e) => e.preventDefault()}>Privacy</a><a href="#accessibility" onClick={(e) => e.preventDefault()}>Accessibility</a></span>
      </div>
    </footer>
  );
}

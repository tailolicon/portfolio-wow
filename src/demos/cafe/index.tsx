import { useState } from "react";
import type { MouseEvent } from "react";
import { ListIcon, XIcon, InstagramLogoIcon, FacebookLogoIcon, EnvelopeSimpleIcon, PhoneIcon, MapPinIcon } from "@phosphor-icons/react";
import { useSitePages } from "../shared";
import { socialLink, useLegalDialog } from "../links";
import { PAGES, NAV, LOCATIONS, BRAND } from "./data";
import { Logo, Newsletter } from "./parts";
import Home from "./pages/Home";
import MenuPage from "./pages/Menu";
import Story from "./pages/Story";
import Catering from "./pages/Catering";
import Visit from "./pages/Visit";
import "./styles/base.css";
import "./styles/parts.css";
import "./styles/home-menu.css";
import "./styles/inner.css";
import "./styles/responsive.css";

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [open, setOpen] = useState(false);

  const navLink = (target: (typeof PAGES)[number]) => {
    const props = link(target);
    return {
      ...props,
      onClick: (e: MouseEvent<HTMLElement>) => {
        setOpen(false);
        props.onClick(e);
      },
    };
  };

  const pageProps = { go, link };
  const legal = useLegalDialog(BRAND.full, BRAND.email);
  const jobsLink = {
    href: "#jobs",
    onClick: (e: MouseEvent<HTMLElement>) => {
      e.preventDefault();
      go("visit");
      window.setTimeout(() => document.getElementById("jobs")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
    },
  };

  return (
    <div ref={rootRef} className="demo-site site-cafe">
      <a className="cf-skip" href="#cf-main">
        Skip to content
      </a>
      <div className="cf-announce">
        <p>
          The <strong>Maple Pecan Latte</strong> is back for fall.{" "}
          <a {...link("menu")}>See the seasonal menu</a>
        </p>
      </div>
      <header className="cf-header">
        <div className="cf-wrap cf-header-inner">
          <a {...navLink("home")} aria-label="Hearth & Honey Coffee Co., home" className="cf-header-logo">
            <Logo />
          </a>
          <nav className="cf-nav" aria-label="Main">
            <ul>
              {NAV.map((n) => (
                <li key={n.page}>
                  <a {...link(n.page)}>{n.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="cf-header-cta">
            <a className="cf-header-phone" href={`tel:${LOCATIONS[0].phone.replace(/\D/g, "")}`}>
              <PhoneIcon size={17} aria-hidden="true" /> {LOCATIONS[0].phone}
            </a>
            <button className="cf-btn cf-btn--primary cf-btn--sm" onClick={() => go("menu")}>
              Order ahead
            </button>
            <button
              className="cf-burger"
              aria-expanded={open}
              aria-controls="cf-mobile-nav"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <XIcon size={24} /> : <ListIcon size={24} />}
            </button>
          </div>
        </div>
        {open && (
          <nav id="cf-mobile-nav" className="cf-mobile-nav" aria-label="Mobile">
            <ul>
              <li>
                <a {...navLink("home")}>Home</a>
              </li>
              {NAV.map((n) => (
                <li key={n.page}>
                  <a {...navLink(n.page)}>{n.label}</a>
                </li>
              ))}
            </ul>
            <button
              className="cf-btn cf-btn--primary"
              onClick={() => {
                setOpen(false);
                go("menu");
              }}
            >
              Order ahead
            </button>
          </nav>
        )}
      </header>

      <main id="cf-main">
        {page === "home" && <Home {...pageProps} />}
        {page === "menu" && <MenuPage {...pageProps} />}
        {page === "story" && <Story {...pageProps} />}
        {page === "catering" && <Catering {...pageProps} />}
        {page === "visit" && <Visit {...pageProps} />}
      </main>

      <Newsletter />

      <footer className="cf-footer">
        <div className="cf-wrap cf-footer-grid">
          <div className="cf-footer-brand">
            <Logo light />
            <p>
              Small-batch coffee roasters and from-scratch bakers in Asheville, North Carolina, since {BRAND.since}.
            </p>
            <div className="cf-social">
              <a {...socialLink("instagram")} aria-label="Instagram">
                <InstagramLogoIcon size={20} />
              </a>
              <a {...socialLink("facebook")} aria-label="Facebook">
                <FacebookLogoIcon size={20} />
              </a>
              <a href={`mailto:${BRAND.email}`} aria-label="Email us">
                <EnvelopeSimpleIcon size={20} />
              </a>
            </div>
          </div>
          {LOCATIONS.map((l) => (
            <div key={l.id} className="cf-footer-col">
              <h3>{l.name}</h3>
              <p>
                <MapPinIcon size={16} aria-hidden="true" /> {l.street}
                <br />
                <span className="cf-footer-indent">{l.city}</span>
              </p>
              <p>
                <a href={`tel:${l.phone.replace(/\D/g, "")}`}>{l.phone}</a>
              </p>
              <ul className="cf-footer-hours">
                {l.hours.map((h) => (
                  <li key={h.days}>
                    <span>{h.days}</span> <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div className="cf-footer-col">
            <h3>Explore</h3>
            <ul className="cf-footer-links">
              <li>
                <a {...link("menu")}>Menu</a>
              </li>
              <li>
                <a {...link("menu")}>Whole bean coffee</a>
              </li>
              <li>
                <a {...link("story")}>Our story</a>
              </li>
              <li>
                <a {...link("catering")}>Catering</a>
              </li>
              <li>
                <a {...link("visit")}>Locations &amp; hours</a>
              </li>
              <li>
                <a {...jobsLink}>Jobs</a>
              </li>
              <li>
                <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="cf-wrap cf-footer-bottom">
          <p>© 2026 Hearth &amp; Honey Coffee Co. LLC. All rights reserved.</p>
          <p className="cf-footer-legal">
            <a {...legal.link("privacy")}>
              Privacy
            </a>
            <a {...legal.link("accessibility")}>
              Accessibility
            </a>
            <span>Gift cards sold at both shops</span>
          </p>
        </div>
      </footer>
      {legal.dialog}
    </div>
  );
}

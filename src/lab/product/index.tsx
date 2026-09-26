import { useState } from "react";
import { HandbagSimple, List, X } from "@phosphor-icons/react";
import { useSitePages } from "../../demos/shared";
import { useLegalDialog } from "../../demos/links";
import { NAV, PAGES, SITE_FOOTER } from "./data";
import type { ColorId, Page } from "./data";
import Home from "./pages/Home";
import Specs from "./pages/Specs";
import Compare from "./pages/Compare";
import Support from "./pages/Support";
import Buy from "./pages/Buy";
import "./tokens.css";
import "./home.css";
import "./home-more.css";
import "./support.css";
import "./pages.css";
import "./buy.css";

/** Where each footer label goes: a page, and optionally a section id on that page to scroll to. */
const FOOTER_TARGET: Record<string, { page: Page; section?: string }> = {
  "Kova One": { page: "home" },
  "Kova Air": { page: "compare" },
  "Kova Buds": { page: "compare" },
  "Cushions and parts": { page: "home", section: "kv-materials-title" },
  "Gift cards": { page: "support", section: "kv-contact-title" },
  "Setup guides": { page: "support", section: "kv-setup-title" },
  Firmware: { page: "support", section: "kv-firmware" },
  Warranty: { page: "support", section: "kv-warranty" },
  Repair: { page: "support", section: "kv-warranty" },
  "Contact us": { page: "support", section: "kv-contact-title" },
  "About us": { page: "home" },
  Journal: { page: "home", section: "kv-sound-title" },
  Careers: { page: "support", section: "kv-contact-title" },
  Press: { page: "support", section: "kv-contact-title" },
  Environment: { page: "home", section: "kv-materials-title" },
};

/** Smooth-scroll to a section; if the smooth scroll gets dropped while the new page settles, jump there. */
function scrollToSection(el: Element | null | undefined) {
  if (!el) return;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  window.setTimeout(() => {
    const top = el.getBoundingClientRect().top;
    if (top > window.innerHeight * 0.4 || top < -40) el.scrollIntoView({ block: "start" });
  }, 900);
}

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [color, setColor] = useState<ColorId>("graphite");
  const [bagCount, setBagCount] = useState(0);
  const legal = useLegalDialog("Kova Audio", "support@kova.audio");

  const navigate = (next: Page) => {
    setMenuOpen(false);
    go(next);
  };
  const navLink = (target: Page) => ({
    ...link(target),
    onClick: (event: { preventDefault: () => void }) => {
      event.preventDefault();
      navigate(target);
    },
  });
  const footerLink = (label: string) => {
    const target = FOOTER_TARGET[label] ?? { page: "support", section: "kv-contact-title" };
    return {
      href: `#${target.page}`,
      onClick: (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate(target.page);
        if (!target.section) return;
        const id = target.section;
        window.setTimeout(() => {
          const el = rootRef.current?.querySelector(`#${id}`);
          scrollToSection(el?.closest("section, article") ?? el);
        }, 60);
      },
    };
  };
  const buyIn = (next: ColorId) => {
    setColor(next);
    navigate("buy");
  };

  return (
    <div ref={rootRef} className="demo-site site-lab-product">
      <header className="kv-nav">
        <div className="kv-nav-inner">
          <a className="kv-wordmark" {...navLink("home")} aria-label="Kova Audio, home">
            kova
          </a>
          <nav className="kv-nav-links" aria-label="Main">
            {NAV.map((item) => (
              <a key={item.page} {...navLink(item.page)}>
                {item.label}
              </a>
            ))}
          </nav>
          <div className="kv-nav-actions">
            <button type="button" className="kv-bag" aria-label={`Bag, ${bagCount} items`} onClick={() => navigate("buy")}>
              <HandbagSimple size={20} />
              {bagCount > 0 && <span className="kv-bag-count">{bagCount}</span>}
            </button>
            <a className="kv-btn kv-btn-small" {...navLink("buy")}>
              Buy
            </a>
            <button
              type="button"
              className="kv-menu-toggle"
              aria-expanded={menuOpen}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? <X size={22} /> : <List size={22} />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="kv-mobile-menu" aria-label="Mobile">
            {NAV.map((item) => (
              <a key={item.page} {...navLink(item.page)}>
                {item.label}
              </a>
            ))}
            <a {...navLink("buy")}>Buy Kova One</a>
          </nav>
        )}
      </header>

      <main>
        {page === "home" && <Home go={navigate} onPickColor={buyIn} />}
        {page === "specs" && <Specs go={navigate} />}
        {page === "compare" && <Compare go={navigate} />}
        {page === "support" && <Support />}
        {page === "buy" && (
          <Buy
            key={color}
            initialColor={color}
            go={navigate}
            onAdd={(quantity) => setBagCount((count) => count + quantity)}
          />
        )}
      </main>

      <footer className="kv-footer">
        <div className="kv-container">
          <div className="kv-footer-top">
            <div className="kv-footer-brand">
              <span className="kv-wordmark kv-wordmark-ink">kova</span>
              <p>
                Headphones designed and tuned in Copenhagen since 2017. Free delivery and 30-day returns on every
                order.
              </p>
            </div>
            {SITE_FOOTER.map((col) => (
              <div key={col.title} className="kv-footer-col">
                <h2>{col.title}</h2>
                <ul>
                  {col.links.map((label) => (
                    <li key={label}>
                      <a {...footerLink(label)}>{label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="kv-footer-legal">
            <p>Copyright 2026 Kova Audio ApS. Refshalevej 163A, 1432 Copenhagen K, Denmark. CVR 38417290.</p>
            <ul>
              <li><a {...legal.link("privacy")}>Privacy</a></li>
              <li><a {...legal.link("terms")}>Terms of sale</a></li>
              <li><a {...legal.link("cookies")}>Cookies</a></li>
              <li>United States, USD</li>
            </ul>
          </div>
        </div>
      </footer>
      {legal.dialog}
    </div>
  );
}

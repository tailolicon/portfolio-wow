import { useState } from "react";
import { HandbagSimple, List, X } from "@phosphor-icons/react";
import { useSitePages } from "../../demos/shared";
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

const FOOTER_TARGET: Record<string, Page> = {
  "Kova One": "home",
  "Kova Air": "compare",
  "Kova Buds": "compare",
  "Setup guides": "support",
  Firmware: "support",
  Warranty: "support",
  Repair: "support",
  "Contact us": "support",
};

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [menuOpen, setMenuOpen] = useState(false);
  const [color, setColor] = useState<ColorId>("graphite");
  const [bagCount, setBagCount] = useState(0);

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
                  {col.links.map((label) => {
                    const target = FOOTER_TARGET[label];
                    return (
                      <li key={label}>
                        {target ? <a {...navLink(target)}>{label}</a> : <a href="#home" onClick={(e) => e.preventDefault()}>{label}</a>}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
          <div className="kv-footer-legal">
            <p>Copyright 2026 Kova Audio ApS. Refshalevej 163A, 1432 Copenhagen K, Denmark. CVR 38417290.</p>
            <ul>
              <li><a href="#home" onClick={(e) => e.preventDefault()}>Privacy</a></li>
              <li><a href="#home" onClick={(e) => e.preventDefault()}>Terms of sale</a></li>
              <li><a href="#home" onClick={(e) => e.preventDefault()}>Cookies</a></li>
              <li>United States, USD</li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}

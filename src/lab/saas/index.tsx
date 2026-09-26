import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { List, X } from "@phosphor-icons/react";
import { useSitePages } from "../../demos/shared";
import { PAGES, stories } from "./data";
import type { Page } from "./data";
import { Logo, NavContext, useNav } from "./ui";
import type { Nav } from "./ui";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Customers from "./pages/Customers";
import Story from "./pages/Story";
import Demo from "./pages/Demo";
import Start from "./pages/Start";
import "./styles/tokens.css";
import "./styles/app.css";
import "./styles/charts.css";
import "./styles/parts.css";
import "./styles/home.css";
import "./styles/product.css";
import "./styles/pricing.css";
import "./styles/customers.css";
import "./styles/forms.css";

const MAIN_NAV: { page: Page; label: string }[] = [
  { page: "product", label: "Product" },
  { page: "customers", label: "Customers" },
  { page: "pricing", label: "Pricing" },
];

export default function Site() {
  const { page, go, link, rootRef } = useSitePages(PAGES);
  const [storySlug, setStorySlug] = useState(stories[0].slug);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const sentinel = useRef<HTMLDivElement>(null);

  const goPage = useCallback(
    (next: Page) => {
      setMenuOpen(false);
      go(next);
    },
    [go],
  );

  const goSection = useCallback(
    (next: Page, id: string) => {
      setMenuOpen(false);
      if (next !== page) go(next);
      window.setTimeout(
        () => {
          const el = rootRef.current?.querySelector(`#vy-${id}`);
          if (!el) return;
          el.scrollIntoView({ behavior: "smooth", block: "start" });
          // If the smooth scroll is dropped while a new page settles, jump there instead.
          window.setTimeout(() => {
            const top = el.getBoundingClientRect().top;
            if (top > window.innerHeight * 0.4 || top < -40) el.scrollIntoView({ block: "start" });
          }, 900);
        },
        next !== page ? 60 : 0,
      );
    },
    [go, page, rootRef],
  );

  const nav: Nav = useMemo(
    () => ({
      go: goPage,
      goSection,
      openStory: (slug: string) => {
        setStorySlug(slug);
        goPage("story");
      },
      link: (target: Page) => {
        const base = link(target);
        return {
          ...base,
          onClick: (event: React.MouseEvent<HTMLElement>) => {
            setMenuOpen(false);
            base.onClick(event);
          },
        };
      },
    }),
    [goPage, goSection, link],
  );

  useEffect(() => {
    const el = sentinel.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const story = stories.find((s) => s.slug === storySlug) ?? stories[0];
  const current = page === "story" ? "customers" : page;

  return (
    <NavContext.Provider value={nav}>
      <div ref={rootRef} className="demo-site site-lab-saas">
        <div ref={sentinel} className="vy-sentinel" aria-hidden="true" />
        <header className={"vy-header" + (scrolled || menuOpen ? " is-scrolled" : "")}>
          <div className="vy-header-inner">
            <a {...nav.link("home")} className="vy-header-logo" aria-label="Veyra home">
              <Logo />
            </a>
            <nav className="vy-nav" aria-label="Main">
              {MAIN_NAV.map((item) => (
                <a
                  key={item.page}
                  {...nav.link(item.page)}
                  aria-current={current === item.page ? "page" : undefined}
                  className="vy-nav-link"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#security"
                className="vy-nav-link"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("product", "governance");
                }}
              >
                Security
              </a>
            </nav>
            <div className="vy-header-cta">
              <a {...nav.link("start")} className="vy-nav-link vy-nav-quiet">
                Start free
              </a>
              <a {...nav.link("demo")} className="vy-btn vy-btn--primary vy-btn--sm">
                Book a demo
              </a>
              <button
                type="button"
                className="vy-menu-btn"
                aria-expanded={menuOpen}
                aria-controls="vy-mobile-nav"
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                onClick={() => setMenuOpen((v) => !v)}
              >
                {menuOpen ? <X size={20} /> : <List size={20} />}
              </button>
            </div>
          </div>
          {menuOpen && (
            <nav id="vy-mobile-nav" className="vy-mobile-nav" aria-label="Mobile">
              {MAIN_NAV.map((item) => (
                <a key={item.page} {...nav.link(item.page)} className="vy-mobile-link">
                  {item.label}
                </a>
              ))}
              <a
                href="#security"
                className="vy-mobile-link"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("product", "governance");
                }}
              >
                Security
              </a>
              <div className="vy-mobile-ctas">
                <a {...nav.link("start")} className="vy-btn vy-btn--secondary">
                  Start free
                </a>
                <a {...nav.link("demo")} className="vy-btn vy-btn--primary">
                  Book a demo
                </a>
              </div>
            </nav>
          )}
        </header>

        <main className="vy-main" key={page === "story" ? `story-${story.slug}` : page}>
          {page === "home" && <Home />}
          {page === "product" && <Product />}
          {page === "pricing" && <Pricing />}
          {page === "customers" && <Customers />}
          {page === "story" && <Story story={story} />}
          {page === "demo" && <Demo />}
          {page === "start" && <Start />}
        </main>

        <Footer />
      </div>
    </NavContext.Provider>
  );
}

function Footer() {
  const { link, goSection, openStory } = useNav();
  const productLinks: [string, string][] = [
    ["Ask", "ask"],
    ["Explain", "explain"],
    ["Monitors", "monitors"],
    ["Warehouse-native", "warehouse"],
    ["Integrations", "integrations"],
  ];
  return (
    <footer className="vy-footer">
      <div className="vy-container vy-footer-grid">
        <div className="vy-footer-brand">
          <Logo />
          <p>Answers from your warehouse, for everyone who needs them.</p>
          <p className="vy-footer-soc">SOC 2 Type II. Your data stays in your warehouse.</p>
        </div>
        <div>
          <h3>Product</h3>
          <ul role="list">
            {productLinks.map(([label, id]) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    goSection("product", id);
                  }}
                >
                  {label}
                </a>
              </li>
            ))}
            <li>
              <a {...link("pricing")}>Pricing</a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Customers</h3>
          <ul role="list">
            <li>
              <a {...link("customers")}>All stories</a>
            </li>
            {stories.slice(0, 4).map((s) => (
              <li key={s.slug}>
                <a
                  href={`#${s.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    openStory(s.slug);
                  }}
                >
                  {s.company}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3>Security</h3>
          <ul role="list">
            <li>
              <a
                href="#governance"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("product", "governance");
                }}
              >
                Governance
              </a>
            </li>
            <li>
              <a
                href="#warehouse"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("product", "warehouse");
                }}
              >
                Data handling
              </a>
            </li>
            <li>
              <a
                href="#faq"
                onClick={(e) => {
                  e.preventDefault();
                  goSection("pricing", "faq");
                }}
              >
                Pricing FAQ
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul role="list">
            <li>
              <a {...link("demo")}>Book a demo</a>
            </li>
            <li>
              <a {...link("start")}>Start free</a>
            </li>
            <li>
              <a href="mailto:hello@veyra.ai">hello@veyra.ai</a>
            </li>
            <li>
              <a href="tel:+14155550142">+1 (415) 555-0142</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="vy-container">
        <div className="vy-footer-legal">
          <span>&copy; 2026 Veyra Analytics, Inc. 301 Howard Street, Floor 9, San Francisco, CA 94105</span>
          <span>Privacy</span>
          <span>Terms</span>
          <span>DPA</span>
        </div>
      </div>
    </footer>
  );
}

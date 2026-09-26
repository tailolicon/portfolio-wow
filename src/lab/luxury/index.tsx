import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Handbag, List, MagnifyingGlass, User, X } from "@phosphor-icons/react";
import { useDemoForm, useSitePages } from "../../demos/shared";
import { useLegalDialog } from "../../demos/links";
import { HeaderPanel } from "./panels";
import type { BagItem, PanelId } from "./panels";
import { CATEGORIES, PRODUCTS } from "./data";
import { PAGES } from "./ui";
import type { Filter, Page, SiteApi } from "./ui";
import Home from "./pages/Home";
import Collections from "./pages/Collections";
import ProductPage from "./pages/Product";
import Maison from "./pages/Maison";
import Appointments from "./pages/Appointments";
import "./luxury-parts.css";
import "./luxury.css";
import "./luxury-pages.css";
import "./luxury-maison.css";
import "./luxury-product.css";
import "./luxury-panels.css";
import "./luxury-responsive.css";

const NAV: { label: string; page: Page; filter?: Partial<Filter> }[] = [
  { label: "Collections", page: "collections" },
  { label: "Bridal", page: "collections", filter: { category: "Bridal", collection: "all" } },
  { label: "Maison", page: "maison" },
  { label: "Appointments", page: "appointments" },
];

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
  const [slug, setSlug] = useState(PRODUCTS[0].slug);
  const [filter, setFilter] = useState<Filter>({ category: "All", collection: "all" });
  const [interest, setInterest] = useState<string | undefined>(undefined);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [panel, setPanel] = useState<PanelId | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const newsletter = useDemoForm();
  const legal = useLegalDialog("Maison Orvel", "care@maisonorvel.com");

  const navigate = useCallback(
    (next: Page) => {
      setMenuOpen(false);
      setPanel(null);
      go(next);
    },
    [go],
  );

  const togglePanel = (next: PanelId) => {
    setMenuOpen(false);
    setPanel((open) => (open === next ? null : next));
  };

  // Header panels close on Escape and on any click outside the header.
  useEffect(() => {
    if (!panel) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      // Stop here so the portfolio viewer (listening on window) stays open.
      event.stopPropagation();
      setPanel(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) setPanel(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [panel]);

  const goToSection = (target: Page, id: string) => {
    navigate(target);
    window.setTimeout(() => scrollToSection(rootRef.current?.querySelector("#" + id)), 60);
  };
  const openCare = () => goToSection("maison", "lx-care-title");
  const sectionLink = (target: Page, id: string) => ({
    href: "#" + target,
    onClick: (event: { preventDefault: () => void }) => {
      event.preventDefault();
      goToSection(target, id);
    },
  });

  const site: SiteApi = useMemo(
    () => ({
      go: navigate,
      link: (target: Page) => {
        const base = link(target);
        return {
          ...base,
          onClick: (event) => {
            setMenuOpen(false);
            setPanel(null);
            base.onClick(event);
          },
        };
      },
      openProduct: (next) => {
        setSlug(next);
        navigate("product");
      },
      openCollections: (next) => {
        setFilter({ category: "All", collection: "all", ...next });
        navigate("collections");
      },
      bookViewing: (next) => {
        setInterest(next);
        navigate("appointments");
      },
      addToBag: (slug, detail) =>
        setBag((items) => [
          ...items,
          { id: Date.now() + items.length, slug, price: detail?.price ?? PRODUCTS.find((p) => p.slug === slug)?.price ?? 0, note: detail?.note ?? "" },
        ]),
    }),
    [link, navigate],
  );

  // Slow reveal for elements marked .lx-reveal, re-armed on each page change.
  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const targets = Array.from(root.querySelectorAll<HTMLElement>(".lx-reveal:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      targets.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            observer.unobserve(entry.target);
          }
        }),
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [page, slug, filter, rootRef]);

  const navHref = (item: (typeof NAV)[number]) => ({
    href: "#" + item.page,
    "aria-current":
      page === item.page &&
      (item.filter ? filter.category === item.filter.category : !(item.label === "Collections" && filter.category === "Bridal"))
        ? ("page" as const)
        : undefined,
    onClick: (event: { preventDefault: () => void }) => {
      event.preventDefault();
      if (item.page === "collections") site.openCollections(item.filter);
      else navigate(item.page);
    },
  });

  return (
    <div ref={rootRef} className="demo-site site-lab-luxury">
      <p className="lx-announce">Complimentary delivery, returns and engraving</p>
      <header className="lx-header" ref={headerRef}>
        <div className="lx-header-inner">
          <button
            type="button"
            className="lx-icon-btn lx-menu-btn"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => {
              setPanel(null);
              setMenuOpen((open) => !open);
            }}
          >
            {menuOpen ? <X size={22} weight="light" /> : <List size={22} weight="light" />}
          </button>
          <nav className="lx-nav" aria-label="Main">
            {NAV.map((item) => (
              <a key={item.label} {...navHref(item)}>
                {item.label}
              </a>
            ))}
          </nav>
          <a className="lx-wordmark" {...site.link("home")} aria-label="Maison Orvel, home">
            Maison Orvel
          </a>
          <div className="lx-tools">
            <button
              type="button"
              className="lx-icon-btn lx-hide-sm"
              aria-label="Search"
              aria-expanded={panel === "search"}
              onClick={() => togglePanel("search")}
            >
              <MagnifyingGlass size={20} weight="light" />
            </button>
            <button
              type="button"
              className="lx-icon-btn lx-hide-sm"
              aria-label="Account"
              aria-expanded={panel === "account"}
              onClick={() => togglePanel("account")}
            >
              <User size={20} weight="light" />
            </button>
            <button
              type="button"
              className="lx-icon-btn lx-bag"
              aria-label={`Bag, ${bag.length} items`}
              aria-expanded={panel === "bag"}
              onClick={() => togglePanel("bag")}
            >
              <Handbag size={20} weight="light" />
              {bag.length > 0 ? <span className="lx-bag-count">{bag.length}</span> : null}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <div className="lx-menu-panel">
            <nav aria-label="Mobile">
              <a {...site.link("home")}>Home</a>
              {NAV.map((item) => (
                <a key={item.label} {...navHref(item)}>
                  {item.label}
                </a>
              ))}
            </nav>
            <p className="lx-menu-foot">Client services +1 (212) 555-0147</p>
          </div>
        ) : null}
        {panel ? (
          <HeaderPanel
            panel={panel}
            site={site}
            bag={bag}
            onCare={openCare}
            onRemove={(id) => setBag((items) => items.filter((item) => item.id !== id))}
            onCheckout={() => setBag([])}
          />
        ) : null}
      </header>

      <main className="lx-main" key={page === "product" ? "product-" + slug : page}>
        {page === "home" && <Home site={site} />}
        {page === "collections" && <Collections site={site} filter={filter} setFilter={setFilter} />}
        {page === "product" && <ProductPage site={site} slug={slug} />}
        {page === "maison" && <Maison site={site} />}
        {page === "appointments" && <Appointments site={site} interest={interest} />}
      </main>

      <footer className="lx-footer">
        <div className="lx-container">
          <div className="lx-footer-top">
            <div className="lx-footer-letter">
              <h2>Letters from the atelier</h2>
              <p>New pieces, boutique events and the occasional note from the bench. Four times a year.</p>
            </div>
            {newsletter.sent ? (
              <p className="lx-footer-thanks" role="status">
                Thank you. The next letter arrives in December.
              </p>
            ) : (
              <form className="lx-footer-form" onSubmit={newsletter.onSubmit}>
                <label htmlFor="lx-news-email">Email address</label>
                <div className="lx-footer-field">
                  <input id="lx-news-email" type="email" required placeholder="name@example.com" autoComplete="email" />
                  <button type="submit" className="lx-btn lx-btn--light">
                    Subscribe
                  </button>
                </div>
              </form>
            )}
          </div>
          <div className="lx-footer-cols">
            <div>
              <h3>Jewelry</h3>
              {CATEGORIES.map((category) => (
                <a
                  key={category}
                  href="#collections"
                  onClick={(event) => {
                    event.preventDefault();
                    site.openCollections({ category });
                  }}
                >
                  {category}
                </a>
              ))}
            </div>
            <div>
              <h3>The maison</h3>
              <a {...sectionLink("maison", "lx-history")}>Our history</a>
              <a {...sectionLink("maison", "lx-atelier")}>The atelier</a>
              <a {...sectionLink("maison", "lx-sourcing")}>Sourcing</a>
              <a {...sectionLink("maison", "lx-care-title")}>Lifetime care</a>
            </div>
            <div>
              <h3>Client services</h3>
              <a {...site.link("appointments")}>Book a private viewing</a>
              <a {...site.link("product")}>Delivery and returns</a>
              <a {...site.link("product")}>Size guide</a>
              <a href="mailto:care@maisonorvel.com">care@maisonorvel.com</a>
            </div>
            <div>
              <h3>Boutiques</h3>
              <p>214 rue Saint-Honoré, Paris</p>
              <p>781 Madison Avenue, New York</p>
              <p>5-4-7 Ginza, Tokyo</p>
              <p>+1 (212) 555-0147</p>
            </div>
          </div>
          <div className="lx-footer-legal">
            <span className="lx-footer-mark">Maison Orvel</span>
            <span>© 2026 Maison Orvel SAS, Paris. All prices in USD, including duties.</span>
            <span className="lx-footer-links">
              <a {...legal.link("terms")}>Terms of sale</a>
              <a {...legal.link("privacy")}>Privacy</a>
              <a {...legal.link("accessibility")}>Accessibility</a>
              <span>United States (USD)</span>
            </span>
          </div>
        </div>
      </footer>
      {legal.dialog}
    </div>
  );
}

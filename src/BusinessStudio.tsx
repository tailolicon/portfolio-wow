import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clipboard,
  Coffee,
  Dumbbell,
  Expand,
  Hammer,
  Laptop,
  Scissors,
  Store,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  BusinessDemo,
  businessDemoMeta,
  type BusinessDemoId,
} from "./BusinessDemos";
import "./business.css";

const plans = [
  {
    name: "Launch",
    price: "$650",
    note: "One sharp page with the essentials",
    items: ["Custom visual direction", "Mobile responsive", "Core offer + CTA", "Map/contact/social", "Static deployment"],
  },
  {
    name: "Growth",
    price: "$1,100",
    note: "The practical choice for most local businesses",
    featured: true,
    items: ["Up to 5 pages", "Industry-specific UX", "Menu/services/gallery", "Booking or enquiry flow", "Basic SEO + analytics"],
  },
  {
    name: "Signature",
    price: "$1,750",
    note: "More custom interaction and content depth",
    items: ["Up to 7 pages", "Premium art direction", "Advanced sections", "Light CMS workflow", "Launch support"],
  },
];

const icons: Record<BusinessDemoId, typeof Store> = {
  restaurant: UtensilsCrossed,
  cafe: Coffee,
  salon: Scissors,
  services: Hammer,
  fitness: Dumbbell,
  professional: Laptop,
};

function DemoChrome({
  activeId,
  setActiveId,
  onOpen,
  onCopy,
}: {
  activeId: BusinessDemoId;
  setActiveId: (id: BusinessDemoId) => void;
  onOpen: () => void;
  onCopy: () => void;
}) {
  const active = businessDemoMeta.find((item) => item.id === activeId)!;

  return (
    <div className="biz-showcase-chrome">
      <div className="biz-showcase-title">
        <span style={{ background: active.color }} />
        <div>
          <small>LIVE CONCEPT / COMPLETE PAGE</small>
          <b>{active.label}</b>
          <em>{active.kicker}</em>
        </div>
      </div>

      <div className="biz-demo-switcher" aria-label="Choose a complete demo">
        {businessDemoMeta.map((item) => {
          const Icon = icons[item.id];
          return (
            <button
              type="button"
              key={item.id}
              className={activeId === item.id ? "is-active" : ""}
              onClick={() => setActiveId(item.id)}
              title={item.label}
            >
              <Icon size={15} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="biz-demo-actions">
        <button type="button" onClick={onCopy}><Clipboard size={15} /> Copy link</button>
        <button type="button" className="is-primary" onClick={onOpen}><Expand size={15} /> Open full demo</button>
      </div>
    </div>
  );
}

export default function BusinessStudio({ onClose }: { onClose: () => void }) {
  const initialDemo = new URLSearchParams(window.location.search).get("demo") as BusinessDemoId | null;
  const validInitial = businessDemoMeta.some((item) => item.id === initialDemo) ? initialDemo : null;

  const [activeId, setActiveIdState] = useState<BusinessDemoId>(validInitial ?? "restaurant");
  const [fullDemo, setFullDemo] = useState(Boolean(validInitial));
  const [copied, setCopied] = useState(false);
  const [budget, setBudget] = useState(1100);

  const active = useMemo(
    () => businessDemoMeta.find((item) => item.id === activeId)!,
    [activeId],
  );

  const setActiveId = (id: BusinessDemoId) => {
    setActiveIdState(id);
    if (fullDemo) {
      const url = new URL(window.location.href);
      url.searchParams.set("demo", id);
      window.history.replaceState({ view: "business", demo: id }, "", url);
    }
  };

  const openFullDemo = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "business");
    url.searchParams.set("demo", activeId);
    window.history.pushState({ view: "business", demo: activeId }, "", url);
    setFullDemo(true);
  };

  const closeFullDemo = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("demo");
    window.history.pushState({ view: "business" }, "", url);
    setFullDemo(false);
  };

  const copyDemoLink = async () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "business");
    url.searchParams.set("demo", activeId);
    try {
      await navigator.clipboard.writeText(url.toString());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      // Clipboard may be unavailable in some browser contexts; the URL remains visible via Open full demo.
    }
  };

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden auto";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (fullDemo) closeFullDemo();
      else onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [fullDemo, onClose]);

  useEffect(() => {
    const syncFromUrl = () => {
      const requested = new URLSearchParams(window.location.search).get("demo") as BusinessDemoId | null;
      const valid = businessDemoMeta.some((item) => item.id === requested);
      if (valid && requested) {
        setActiveIdState(requested);
        setFullDemo(true);
      } else {
        setFullDemo(false);
      }
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const suggestedPlan = budget < 850 ? "Launch" : budget < 1450 ? "Growth" : "Signature";

  if (fullDemo) {
    return (
      <div className="biz-full-demo" role="dialog" aria-modal="true" aria-label={active.label + " full website demo"}>
        <header className="biz-full-demo-header">
          <button type="button" onClick={closeFullDemo}><ArrowLeft size={16} /> Showroom</button>
          <div>
            <small>PRISM / BUSINESS — COMPLETE CONCEPT</small>
            <strong>{active.label}</strong>
            <span>{active.kicker}</span>
          </div>
          <div className="biz-full-demo-switch">
            {businessDemoMeta.map((item) => (
              <button
                type="button"
                key={item.id}
                className={activeId === item.id ? "is-active" : ""}
                onClick={() => setActiveId(item.id)}
                aria-label={"Switch to " + item.label}
              >
                <i style={{ background: item.color }} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
          <button type="button" className="biz-full-demo-close" onClick={onClose}><X size={17} /> Exit</button>
        </header>

        <div className="biz-full-demo-scroll">
          <BusinessDemo id={activeId} />
        </div>

        <div className="biz-full-demo-note">
          <span>Concept demo — scroll the actual page</span>
          <button type="button" onClick={copyDemoLink}>{copied ? "Copied!" : "Copy share link"}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="business-studio" role="dialog" aria-modal="true" aria-label="Small business website studio">
      <div className="biz-transition" aria-hidden="true" />

      <header className="biz-header">
        <div className="biz-brand">
          <span className="biz-brand-dot" />
          <b>PRISM / BUSINESS</b>
          <small>Complete websites for local businesses</small>
        </div>
        <div className="biz-header-note">Typical project range · $650—$1,850</div>
        <button type="button" className="biz-back" onClick={onClose}>
          <span>Back to Creative Lab</span>
          <X size={17} />
        </button>
      </header>

      <main>
        <section className="biz-hero biz-hero-v2">
          <div className="biz-hero-copy">
            <div className="biz-eyebrow">
              <span>NOT SIX SKINS OF ONE TEMPLATE</span>
              <i />
              <span>SIX DIFFERENT PRODUCTS</span>
            </div>
            <h1>
              SEE THE SITE
              <br />
              YOU COULD <em>GET.</em>
            </h1>
            <p>
              Different businesses need different websites. A restaurant needs reservations and a menu.
              A contractor needs trust and quote capture. A studio needs a schedule. Each concept below
              is a complete page built around that outcome.
            </p>
            <div className="biz-hero-points">
              <span><Check size={15} /> Complete page demos</span>
              <span><Check size={15} /> Different UX per industry</span>
              <span><Check size={15} /> Shareable demo links</span>
            </div>
          </div>

          <div className="biz-outcome-card">
            <small>WHAT CHANGED</small>
            <strong>Each demo now has its own:</strong>
            <ul>
              <li><span>01</span> visual system</li>
              <li><span>02</span> information architecture</li>
              <li><span>03</span> conversion flow</li>
              <li><span>04</span> industry-specific sections</li>
            </ul>
            <p>Scroll the actual site inside the showroom, or open it fullscreen and send that exact URL to a client.</p>
          </div>
        </section>

        <section className="biz-showroom biz-showroom-v2" id="business-showroom">
          <div className="biz-section-head">
            <div>
              <small>01 / COMPLETE WEBSITE SHOWROOM</small>
              <h2>Pick an industry.<br /><em>Then scroll the result.</em></h2>
            </div>
            <p>No shared hero component. No “change the color and logo.” Each site solves a different customer journey.</p>
          </div>

          <DemoChrome
            activeId={activeId}
            setActiveId={setActiveId}
            onOpen={openFullDemo}
            onCopy={copyDemoLink}
          />

          <div className="biz-product-frame">
            <div className="biz-product-browser">
              <div><i /><i /><i /></div>
              <span>{active.id === "restaurant" ? "emberandoak.com" : active.id === "cafe" ? "daylight.cafe" : active.id === "salon" ? "soraskin.studio" : active.id === "services" ? "northlinehome.com" : active.id === "fitness" ? "resetclub.fit" : "valeandco.com"}</span>
              <b>SCROLL ↓</b>
            </div>
            <div className="biz-product-scroll">
              <BusinessDemo id={activeId} />
            </div>
          </div>

          <div className="biz-result-summary">
            {[
              ["Restaurant", "Menu + real reservation moment + visit details"],
              ["Café", "Brand personality + menu board + location + loyalty"],
              ["Salon", "Treatments + pricing + available appointments"],
              ["Home Services", "Trust proof + service list + quote capture"],
              ["Fitness", "Class schedule + membership comparison + first-class CTA"],
              ["Professional", "Engagement examples + method + project enquiry"],
            ].map(([name, result]) => (
              <div key={name}><b>{name}</b><span>{result}</span></div>
            ))}
          </div>
        </section>

        <section className="biz-pricing">
          <div className="biz-section-head">
            <div>
              <small>02 / PRODUCTIZED STARTING POINTS</small>
              <h2>Under $2k.<br /><em>Not under-designed.</em></h2>
            </div>
            <p>
              The examples show the level of thinking. Scope controls the price — not reusing one generic layout for every business.
            </p>
          </div>

          <div className="biz-plan-grid">
            {plans.map((plan) => (
              <article className={"biz-plan " + (plan.featured ? "is-featured" : "")} key={plan.name}>
                {plan.featured && <span className="biz-plan-badge">Best fit</span>}
                <small>{plan.name}</small>
                <strong>{plan.price}</strong>
                <p>{plan.note}</p>
                <ul>
                  {plan.items.map((item) => <li key={item}><Check size={14} /> {item}</li>)}
                </ul>
                <a href="mailto:hello@example.com?subject=Website%20project">
                  Ask about {plan.name} <ArrowRight size={15} />
                </a>
              </article>
            ))}
          </div>

          <div className="biz-budget-builder">
            <div>
              <small>QUICK FIT CHECK</small>
              <h3>What feels comfortable?</h3>
              <p>Useful as a starting point, not an automatic quote.</p>
            </div>
            <div className="biz-budget-control">
              <div className="biz-budget-value"><span>YOUR RANGE</span><b>{"$" + budget.toLocaleString()}</b></div>
              <input type="range" min="500" max="2000" step="50" value={budget} onChange={(event) => setBudget(Number(event.target.value))} aria-label="Website budget" />
              <div className="biz-budget-scale"><span>$500</span><span>$2,000</span></div>
            </div>
            <div className="biz-budget-result">
              <span>SUGGESTED START</span>
              <strong>{suggestedPlan}</strong>
              <p>{suggestedPlan === "Launch" ? "A concentrated one-page result." : suggestedPlan === "Growth" ? "Enough room for a real customer journey." : "More depth, content and bespoke interaction."}</p>
            </div>
          </div>
        </section>

        <section className="biz-final biz-final-v2">
          <div>
            <small>THE GOAL IS NOT “A PRETTY WEBSITE”.</small>
            <h2>The goal is for a client to recognize <em>their business</em> in the solution.</h2>
          </div>
          <div className="biz-final-actions">
            <button type="button" onClick={openFullDemo}>
              Open {active.label} demo <ArrowRight size={18} />
            </button>
            <a href="mailto:hello@example.com?subject=Small%20business%20website">
              Tell me about your business <ArrowRight size={18} />
            </a>
          </div>
        </section>
      </main>

      <footer className="biz-footer">
        <b>PRISM / BUSINESS</b>
        <span>All six examples are concept work, not claimed client projects.</span>
        <button type="button" onClick={onClose}>Creative Lab <ArrowRight size={14} /></button>
      </footer>
    </div>
  );
}

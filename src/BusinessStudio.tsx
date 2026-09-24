import { useEffect, useMemo, useState } from "react";
import type { CSSProperties } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronRight,
  Coffee,
  Dumbbell,
  ExternalLink,
  Hammer,
  Laptop,
  MapPin,
  Menu,
  MessageCircle,
  Monitor,
  Scissors,
  Smartphone,
  Sparkles,
  Star,
  UtensilsCrossed,
  X,
} from "lucide-react";
import "./business.css";

type BusinessId = "restaurant" | "cafe" | "salon" | "services" | "fitness" | "professional";

type BusinessTemplate = {
  id: BusinessId;
  label: string;
  icon: typeof Coffee;
  name: string;
  eyebrow: string;
  headline: string;
  description: string;
  primary: string;
  secondary: string;
  ink: string;
  soft: string;
  action: string;
  detailA: string;
  detailB: string;
  badge: string;
};

const templates: BusinessTemplate[] = [
  {
    id: "restaurant",
    label: "Restaurant",
    icon: UtensilsCrossed,
    name: "EMBER & OAK",
    eyebrow: "Neighborhood kitchen · Dinner nightly",
    headline: "Good food deserves a full room.",
    description: "Seasonal plates, wood-fired favorites and a reservation flow that stays out of the way.",
    primary: "#d6462f",
    secondary: "#f0c26b",
    ink: "#22160f",
    soft: "#f3ead9",
    action: "Reserve a table",
    detailA: "Seasonal dinner",
    detailB: "Menu · Reservations · Location",
    badge: "Restaurant concept",
  },
  {
    id: "cafe",
    label: "Café / Drinks",
    icon: Coffee,
    name: "DAYLIGHT",
    eyebrow: "Coffee · Matcha · Slow mornings",
    headline: "Your new favorite corner.",
    description: "A warm, playful café site made for menus, opening hours, maps and social discovery.",
    primary: "#2d7b58",
    secondary: "#f2b84b",
    ink: "#173126",
    soft: "#eef0d8",
    action: "See today's menu",
    detailA: "Open 7:00 — 18:00",
    detailB: "Coffee · Matcha · Pastry",
    badge: "Café concept",
  },
  {
    id: "salon",
    label: "Salon / Beauty",
    icon: Scissors,
    name: "SORA SKIN",
    eyebrow: "Skin studio · By appointment",
    headline: "Quiet confidence, beautifully booked.",
    description: "A calm service-led site that makes treatments easy to understand and appointments easy to start.",
    primary: "#b47a82",
    secondary: "#e8cfc0",
    ink: "#3b2d30",
    soft: "#f6efeb",
    action: "Book a treatment",
    detailA: "Facials · Brows · Skin",
    detailB: "Services · Pricing · Booking",
    badge: "Beauty concept",
  },
  {
    id: "services",
    label: "Home Services",
    icon: Hammer,
    name: "NORTHLINE",
    eyebrow: "Local repair · Honest estimates",
    headline: "Need it fixed? Make the next step obvious.",
    description: "Built around calls, quote requests, trust signals and service areas — not design jargon.",
    primary: "#1b5aa5",
    secondary: "#f3bf3c",
    ink: "#10243d",
    soft: "#edf4fb",
    action: "Get a free estimate",
    detailA: "Same-week availability",
    detailB: "Services · Areas · Quote",
    badge: "Local service concept",
  },
  {
    id: "fitness",
    label: "Fitness / Studio",
    icon: Dumbbell,
    name: "RESET CLUB",
    eyebrow: "Small-group training · Downtown",
    headline: "Show up. Feel stronger. Repeat.",
    description: "A high-energy site for schedules, memberships, trainer profiles and a very clear first visit.",
    primary: "#673de6",
    secondary: "#bfff4d",
    ink: "#17131f",
    soft: "#f0ecff",
    action: "Try your first class",
    detailA: "Strength · Mobility · Conditioning",
    detailB: "Schedule · Coaches · Join",
    badge: "Fitness concept",
  },
  {
    id: "professional",
    label: "Professional",
    icon: Laptop,
    name: "VALE & CO.",
    eyebrow: "Independent advisory · Remote friendly",
    headline: "Look established before the first call.",
    description: "A focused professional site that explains the offer, builds trust and turns interest into an enquiry.",
    primary: "#173e4f",
    secondary: "#d7a85d",
    ink: "#17272d",
    soft: "#edf0ee",
    action: "Start a conversation",
    detailA: "Strategy · Advisory · Projects",
    detailB: "Expertise · Work · Contact",
    badge: "Professional concept",
  },
];

const plans = [
  {
    name: "Launch",
    price: "$650",
    note: "For a simple local presence",
    items: ["1 focused page", "Mobile-first design", "Services/menu + contact", "Map & social links", "Static hosting setup"],
  },
  {
    name: "Growth",
    price: "$1,100",
    note: "For most small businesses",
    featured: true,
    items: ["Up to 5 pages", "Custom visual direction", "Gallery / menu / services", "Booking or enquiry integration", "Basic SEO + analytics"],
  },
  {
    name: "Signature",
    price: "$1,750",
    note: "For a stronger first impression",
    items: ["Up to 7 pages", "Premium motion & polish", "More custom sections", "CMS/light content workflow", "Launch support"],
  },
];

function MiniSite({
  template,
  mobile,
}: {
  template: BusinessTemplate;
  mobile: boolean;
}) {
  const style = {
    "--biz-primary": template.primary,
    "--biz-secondary": template.secondary,
    "--biz-ink": template.ink,
    "--biz-soft": template.soft,
  } as CSSProperties;

  return (
    <div className={"biz-device " + (mobile ? "is-mobile" : "is-desktop")} style={style}>
      <div className="biz-browser-bar">
        <div className="biz-browser-dots"><i /><i /><i /></div>
        <div className="biz-browser-url">{template.name.toLowerCase().replaceAll(" ", "").replace("&", "and")}.com</div>
        <span>{mobile ? "MOBILE" : "DESKTOP"}</span>
      </div>

      <div className={"biz-mini biz-mini-" + template.id}>
        <header className="biz-mini-nav">
          <b>{template.name}</b>
          <nav>
            <span>About</span>
            <span>Services</span>
            <span>Contact</span>
          </nav>
          <button type="button">{template.action}</button>
          <Menu className="biz-mini-menu" size={19} />
        </header>

        <section className="biz-mini-hero">
          <div className="biz-mini-copy">
            <small>{template.eyebrow}</small>
            <h3>{template.headline}</h3>
            <p>{template.description}</p>
            <div className="biz-mini-actions">
              <button type="button">{template.action} <ArrowRight size={15} /></button>
              <span>See what we offer</span>
            </div>
          </div>
          <div className="biz-mini-art" aria-hidden="true">
            <div className="biz-art-card biz-art-card-a">
              <span>{template.detailA}</span>
              <b>{template.id === "restaurant" ? "7:30" : template.id === "cafe" ? "☕" : template.id === "fitness" ? "08" : "01"}</b>
            </div>
            <div className="biz-art-card biz-art-card-b">
              <Sparkles size={18} />
              <small>{template.badge}</small>
            </div>
            <div className="biz-art-orb" />
          </div>
        </section>

        <div className="biz-mini-trust">
          <span><Star size={13} fill="currentColor" /> Clear offer</span>
          <span><MapPin size={13} /> Easy to find</span>
          <span><CalendarDays size={13} /> Easy to book</span>
        </div>

        <section className="biz-mini-strip">
          <strong>{template.detailB}</strong>
          <span>Everything a customer needs before they call, visit or book.</span>
          <ChevronRight size={18} />
        </section>
      </div>
    </div>
  );
}

export default function BusinessStudio({ onClose }: { onClose: () => void }) {
  const [activeId, setActiveId] = useState<BusinessId>("restaurant");
  const [mobile, setMobile] = useState(false);
  const [budget, setBudget] = useState(1100);

  const active = useMemo(
    () => templates.find((item) => item.id === activeId) ?? templates[0],
    [activeId],
  );

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden auto";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const suggestedPlan = budget < 850 ? "Launch" : budget < 1450 ? "Growth" : "Signature";

  return (
    <div className="business-studio" role="dialog" aria-modal="true" aria-label="Small business website studio">
      <div className="biz-transition" aria-hidden="true" />

      <header className="biz-header">
        <div className="biz-brand">
          <span className="biz-brand-dot" />
          <b>PRISM / BUSINESS</b>
          <small>Websites for real local businesses</small>
        </div>

        <div className="biz-header-note">Typical project range · $650—$1,850</div>

        <button type="button" className="biz-back" onClick={onClose}>
          <span>Back to Creative Lab</span>
          <X size={17} />
        </button>
      </header>

      <main>
        <section className="biz-hero">
          <div className="biz-hero-copy">
            <div className="biz-eyebrow">
              <span>SMALL BUSINESS STUDIO</span>
              <i />
              <span>CONCEPT SHOWROOM</span>
            </div>
            <h1>
              A WEBSITE YOUR
              <br />
              CUSTOMERS <em>GET.</em>
            </h1>
            <p>
              For restaurants, cafés, salons, studios and independent services that need to look
              trustworthy, make the offer clear and turn visits into calls, bookings or walk-ins.
            </p>
            <div className="biz-hero-points">
              <span><Check size={15} /> Mobile-first</span>
              <span><Check size={15} /> Easy to update</span>
              <span><Check size={15} /> No VPS required</span>
            </div>
          </div>

          <div className="biz-hero-card">
            <span>NOT SURE WHAT YOU NEED?</span>
            <strong>Start with the business, not the technology.</strong>
            <p>Pick your type below. Every example is designed around what a real customer needs to do next.</p>
            <a href="#business-showroom">Browse examples <ArrowRight size={17} /></a>
          </div>
        </section>

        <section className="biz-showroom" id="business-showroom">
          <div className="biz-section-head">
            <div>
              <small>01 / PICK YOUR BUSINESS</small>
              <h2>See something that feels like <em>you.</em></h2>
            </div>
            <div className="biz-device-toggle" aria-label="Preview size">
              <button type="button" className={!mobile ? "is-active" : ""} onClick={() => setMobile(false)}>
                <Monitor size={16} /> Desktop
              </button>
              <button type="button" className={mobile ? "is-active" : ""} onClick={() => setMobile(true)}>
                <Smartphone size={16} /> Mobile
              </button>
            </div>
          </div>

          <div className="biz-template-tabs">
            {templates.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  type="button"
                  key={item.id}
                  className={activeId === item.id ? "is-active" : ""}
                  onClick={() => setActiveId(item.id)}
                >
                  <Icon size={17} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="biz-preview-shell">
            <div className="biz-preview-info">
              <div>
                <small>{active.badge}</small>
                <h3>{active.name}</h3>
                <p>{active.description}</p>
              </div>
              <div className="biz-preview-meta">
                <span>Built around</span>
                <b>{active.detailB}</b>
              </div>
            </div>
            <MiniSite template={active} mobile={mobile} />
          </div>
        </section>

        <section className="biz-pricing">
          <div className="biz-section-head">
            <div>
              <small>02 / SIMPLE PRICING</small>
              <h2>Small-business budget.<br /><em>Still custom.</em></h2>
            </div>
            <p>
              Clear starting points instead of vague agency quotes. Final scope can move, but the client always knows the size of the decision.
            </p>
          </div>

          <div className="biz-plan-grid">
            {plans.map((plan) => (
              <article className={"biz-plan " + (plan.featured ? "is-featured" : "")} key={plan.name}>
                {plan.featured && <span className="biz-plan-badge">Most common</span>}
                <small>{plan.name}</small>
                <strong>{plan.price}</strong>
                <p>{plan.note}</p>
                <ul>
                  {plan.items.map((item) => (
                    <li key={item}><Check size={14} /> {item}</li>
                  ))}
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
              <p>Slide your rough budget. This is only a starting-point guide, not an automatic quote.</p>
            </div>
            <div className="biz-budget-control">
              <div className="biz-budget-value">
                <span>YOUR RANGE</span>
                <b>{"$" + budget.toLocaleString()}</b>
              </div>
              <input
                type="range"
                min="500"
                max="2000"
                step="50"
                value={budget}
                onChange={(event) => setBudget(Number(event.target.value))}
                aria-label="Website budget"
              />
              <div className="biz-budget-scale"><span>$500</span><span>$2,000</span></div>
            </div>
            <div className="biz-budget-result">
              <span>SUGGESTED START</span>
              <strong>{suggestedPlan}</strong>
              <p>{suggestedPlan === "Launch" ? "One sharp page with the essentials." : suggestedPlan === "Growth" ? "Enough room for most local businesses." : "More polish, pages and custom interaction."}</p>
            </div>
          </div>
        </section>

        <section className="biz-included">
          <div className="biz-included-copy">
            <small>03 / WHAT ACTUALLY MATTERS</small>
            <h2>No tech lecture.<br />Just the things customers use.</h2>
          </div>

          <div className="biz-included-grid">
            <article>
              <span>01</span>
              <MapPin />
              <h3>Find you</h3>
              <p>Location, hours, service area and directions exactly where people expect them.</p>
            </article>
            <article>
              <span>02</span>
              <MessageCircle />
              <h3>Contact you</h3>
              <p>Phone, WhatsApp, enquiry or booking actions without making visitors hunt.</p>
            </article>
            <article>
              <span>03</span>
              <ExternalLink />
              <h3>Trust you</h3>
              <p>Clear services, real photos, useful proof and a site that does not look abandoned.</p>
            </article>
            <article>
              <span>04</span>
              <Smartphone />
              <h3>Use it on mobile</h3>
              <p>Designed for the device your customers are actually holding when they search.</p>
            </article>
          </div>
        </section>

        <section className="biz-final">
          <div>
            <small>YOU DO NOT NEED AN “AGENCY WEBSITE”.</small>
            <h2>You need a site that makes the next customer say <em>yes.</em></h2>
          </div>
          <div className="biz-final-actions">
            <a href="mailto:hello@example.com?subject=Small%20business%20website">
              Tell me about your business <ArrowRight size={18} />
            </a>
            <button type="button" onClick={onClose}>See the Creative Lab</button>
          </div>
        </section>
      </main>

      <footer className="biz-footer">
        <b>PRISM / BUSINESS</b>
        <span>Concept examples — not claimed client work.</span>
        <button type="button" onClick={onClose}>Creative Lab <ArrowRight size={14} /></button>
      </footer>
    </div>
  );
}

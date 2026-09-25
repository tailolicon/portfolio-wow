import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import {
  CaretDown,
  Check,
  CreditCard,
  Drop,
  Fan,
  Fire,
  Gauge,
  Phone,
  Pipe,
  Scissors,
  Shower,
  Snowflake,
  Star,
  ThermometerCold,
  Toolbox,
  Waves,
  Wind,
  Wrench,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { BIZ, CLUB_PERKS, COUPONS, FAQS } from "./data";
import type { Page } from "./data";

export interface NavProps {
  go: (p: Page) => void;
  link: (p: Page) => {
    href: string;
    "aria-current"?: "page";
    onClick: (e: MouseEvent<HTMLElement>) => void;
  };
}

const ICONS: Record<string, Icon> = {
  "Leak detection & repair": Drop,
  "Drain cleaning": Waves,
  "Water heaters & tankless": Fire,
  "Whole-home repiping": Pipe,
  "Sewer line repair": Gauge,
  "Water softeners & filtration": Shower,
  "AC repair": Snowflake,
  "AC replacement": ThermometerCold,
  "Maintenance & tune-ups": Toolbox,
  "Heating repair": Fire,
  Ductwork: Wind,
  "Indoor air quality": Fan,
};

export function ServiceIcon({ name }: { name: string }) {
  const I = ICONS[name] ?? Wrench;
  return (
    <span className="sv-svc-icon" aria-hidden="true">
      <I size={22} />
    </span>
  );
}

export function Stars({ n = 5, size = 16 }: { n?: number; size?: number }) {
  return (
    <span className="sv-stars" role="img" aria-label={`${n} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={size} weight="fill" className={i <= n ? "sv-star-on" : "sv-star-off"} />
      ))}
    </span>
  );
}

export function SectionHead({ kicker, title, children, center }: { kicker?: string; title: string; children?: ReactNode; center?: boolean }) {
  return (
    <div className={`sv-sec-head${center ? " sv-center" : ""}`}>
      {kicker && <p className="sv-kicker">{kicker}</p>}
      <h2>{title}</h2>
      {children && <p className="sv-sec-lead">{children}</p>}
    </div>
  );
}

export function CallButton({ variant = "outline", size }: { variant?: "orange" | "outline" | "white" | "navy"; size?: "lg" | "block" }) {
  return (
    <a className={`sv-btn sv-btn-${variant}${size ? ` sv-btn-${size}` : ""}`} href={BIZ.tel}>
      <Phone size={18} /> {BIZ.phone}
    </a>
  );
}

export function BookButton({ go, variant = "orange", size }: Pick<NavProps, "go"> & { variant?: "orange" | "navy"; size?: "lg" | "sm" | "block" }) {
  return (
    <button type="button" className={`sv-btn sv-btn-${variant}${size ? ` sv-btn-${size}` : ""}`} onClick={() => go("quote")}>
      Book service
    </button>
  );
}

export function Coupons({ go }: Pick<NavProps, "go">) {
  const [lead, ...rest] = COUPONS;
  return (
    <div className="sv-coupons">
      <article className="sv-coupon sv-coupon-lead">
        <Scissors className="sv-coupon-cut" size={20} aria-hidden="true" />
        <p className="sv-coupon-amt">{lead.amount}</p>
        <h3>{lead.title}</h3>
        <p className="sv-coupon-text">{lead.text}</p>
        <button type="button" className="sv-btn sv-btn-orange" onClick={() => go("quote")}>
          Claim offer
        </button>
        <p className="sv-fine">{lead.fine}</p>
      </article>
      <div className="sv-coupon-stack">
        {rest.map((c) => (
          <article className="sv-coupon sv-coupon-row" key={c.title}>
            <Scissors className="sv-coupon-cut" size={18} aria-hidden="true" />
            <p className="sv-coupon-amt">{c.amount}</p>
            <div className="sv-coupon-body">
              <h3>{c.title}</h3>
              <p className="sv-coupon-text">{c.text}</p>
              <p className="sv-fine">{c.fine}</p>
            </div>
            <button type="button" className="sv-btn sv-btn-navy sv-btn-sm" onClick={() => go("quote")}>
              Claim offer
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}

export function ComfortClub({ go }: Pick<NavProps, "go">) {
  return (
    <section className="sv-club" aria-labelledby="sv-club-h">
      <div className="sv-wrap sv-club-grid">
        <div>
          <h2 id="sv-club-h">Summit Comfort Club</h2>
          <p className="sv-club-lead">
            Our maintenance plan for East Valley homes. Two AC and heating visits a year, a plumbing check, and you go
            to the front of the line when something breaks.
          </p>
          <ul className="sv-checks sv-checks-light">
            {CLUB_PERKS.map((p) => (
              <li key={p}>
                <Check size={18} aria-hidden="true" /> {p}
              </li>
            ))}
          </ul>
        </div>
        <div className="sv-club-card">
          <p className="sv-club-plan">Membership, per system</p>
          <p className="sv-club-price">
            $14<sup>.95</sup>
            <span>/month</span>
          </p>
          <p className="sv-club-sub">Cancel anytime, or pay $159 once a year.</p>
          <button type="button" className="sv-btn sv-btn-orange sv-btn-block" onClick={() => go("quote")}>
            Join the club
          </button>
          <p className="sv-club-note">3,417 East Valley households are members.</p>
        </div>
      </div>
    </section>
  );
}

export function Financing({ go }: Pick<NavProps, "go">) {
  return (
    <div className="sv-finance">
      <span className="sv-finance-icon" aria-hidden="true">
        <CreditCard size={30} />
      </span>
      <div className="sv-finance-body">
        <h3>0% APR for 18 months on new systems</h3>
        <p>
          A surprise replacement shouldn't wreck the budget. Pay no interest for 18 months, or spread it out over as long
          as 120 months. Pre-qualifying takes 5 minutes and won't touch your credit score.
        </p>
        <p className="sv-fine">On approved credit (OAC). $2,500 minimum purchase. Ask our office for full terms.</p>
      </div>
      <button type="button" className="sv-btn sv-btn-navy" onClick={() => go("quote")}>
        See financing options
      </button>
    </div>
  );
}

export function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="sv-faq">
      {FAQS.map((f, i) => {
        const isOpen = open === i;
        return (
          <div className={`sv-faq-item${isOpen ? " sv-open" : ""}`} key={f.q}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`sv-faq-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                {f.q}
                <CaretDown size={18} aria-hidden="true" />
              </button>
            </h3>
            <div id={`sv-faq-${i}`} className="sv-faq-a" hidden={!isOpen}>
              <p>{f.a}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function PageHero({ crumb, title, text, children, link }: { crumb: string; title: string; text: string; children?: ReactNode } & Pick<NavProps, "link">) {
  return (
    <section className="sv-page-hero">
      <div className="sv-wrap">
        <nav className="sv-crumb" aria-label="Breadcrumb">
          <a {...link("home")}>Home</a> <span aria-hidden="true">/</span> <span>{crumb}</span>
        </nav>
        <h1>{title}</h1>
        <p className="sv-page-lead">{text}</p>
        {children}
      </div>
    </section>
  );
}

import type { ReactNode } from "react";
import { ArrowRight, Barbell, Car, Coffee, Fire, Key, Lock, PersonSimpleRun, Shower, Star } from "@phosphor-icons/react";
import { demoImg } from "../shared";
import { AMENITIES, BIZ, REVIEWS } from "./data";
import type { GoFn } from "./data";

export const W = "bold" as const;

export const levelClass = (level: string) =>
  `fx-level fx-level--${level === "Beginner" ? "beg" : level === "Intermediate" ? "int" : "all"}`;

export function LogoMark() {
  return (
    <svg className="fx-logo-mark" viewBox="0 0 40 40" aria-hidden="true">
      <rect width="40" height="40" rx="6" fill="#f0461b" />
      <path d="M12 9h17v6H19v4h8.5v6H19v6h-7z" fill="#1b1b1e" />
    </svg>
  );
}

export function Stars({ label = "5 out of 5 stars" }: { label?: string }) {
  return (
    <span className="fx-stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={15} weight="fill" aria-hidden="true" />
      ))}
    </span>
  );
}

export function SectionHead({
  kicker,
  title,
  text,
  center,
}: {
  kicker?: string;
  title: ReactNode;
  text?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`fx-head${center ? " fx-head--center" : ""}`}>
      {kicker && <p className="fx-kicker">{kicker}</p>}
      <h2 className="fx-h2">{title}</h2>
      {text && <p className="fx-lead">{text}</p>}
    </div>
  );
}

export function PageHero({
  title,
  text,
  img,
  alt,
  pos,
  children,
}: {
  title: ReactNode;
  text: ReactNode;
  img: string;
  alt: string;
  pos?: string;
  children?: ReactNode;
}) {
  return (
    <section className="fx-phero">
      <img className="fx-phero-img" src={demoImg("fitness", img)} alt={alt} style={{ objectPosition: pos }} />
      <div className="fx-wrap fx-phero-inner">
        <h1 className="fx-phero-title">{title}</h1>
        <p className="fx-phero-text">{text}</p>
        {children}
      </div>
    </section>
  );
}

const AMENITY_ICONS = {
  key: Key,
  shower: Shower,
  lock: Lock,
  car: Car,
  turf: PersonSimpleRun,
  sauna: Fire,
  dumbbell: Barbell,
  coffee: Coffee,
};

export function AmenityGrid() {
  return (
    <ul className="fx-amenities">
      {AMENITIES.map((a) => {
        const Icon = AMENITY_ICONS[a.icon];
        return (
          <li key={a.title} className="fx-amenity">
            <Icon size={24} weight={W} aria-hidden="true" />
            <div>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function GoogleSummary() {
  return (
    <div className="fx-gsum">
      <span className="fx-gsum-score">{BIZ.rating}</span>
      <div>
        <Stars label={`Rated ${BIZ.rating} out of 5`} />
        <p>{BIZ.reviews} reviews on Google</p>
      </div>
    </div>
  );
}

export function ReviewCards() {
  return (
    <>
      {REVIEWS.map((r) => (
        <figure key={r.name} className="fx-review">
          <Stars />
          <blockquote>{r.text}</blockquote>
          <figcaption>
            <strong>{r.name}</strong> <span>Google, {r.date}</span>
          </figcaption>
        </figure>
      ))}
    </>
  );
}

export function CtaBand({ go, title, text }: { go: GoFn; title?: string; text?: string }) {
  return (
    <section className="fx-cta">
      <div className="fx-wrap fx-cta-inner">
        <div>
          <h2 className="fx-h2">{title ?? "Your first week is free"}</h2>
          <p>
            {text ??
              "Seven days of classes and open gym, plus a one-on-one intro with a coach. No card needed."}
          </p>
        </div>
        <div className="fx-cta-actions">
          <button type="button" className="fx-btn fx-btn--dark fx-btn--lg" onClick={() => go("trial")}>
            Start your free week <ArrowRight size={18} weight={W} aria-hidden="true" />
          </button>
          <a className="fx-cta-phone" href={BIZ.phoneHref}>
            or call {BIZ.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

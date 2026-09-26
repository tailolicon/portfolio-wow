import type { ReactNode } from "react";
import { StarIcon, InstagramLogoIcon } from "@phosphor-icons/react";
import { demoImg, useDemoForm, useSitePages } from "../shared";
import { socialLink } from "../links";
import { INSTAGRAM, REVIEWS, RATING, LOCATIONS } from "./data";
import type { Page } from "./data";

type Nav = ReturnType<typeof useSitePages<Page>>;
export type PageProps = { go: Nav["go"]; link: Nav["link"] };

export const img = (name: string) => demoImg("cafe", name);
export const person = (name: string) => demoImg("people", name);

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className={`cf-logo${light ? " cf-logo--light" : ""}`}>
      <svg className="cf-logo-mark" viewBox="0 0 40 40" aria-hidden="true">
        <path d="M20 2.5 35.2 11.25v17.5L20 37.5 4.8 28.75v-17.5Z" fill="currentColor" />
        <path
          d="M20 10.5c-3.6 4.6-5.8 8-5.8 11.1a5.8 5.8 0 0 0 11.6 0c0-3.1-2.2-6.5-5.8-11.1Z"
          fill="var(--color-honey)"
        />
        <path d="M17.6 22.4c.2 1.6 1.2 2.7 2.8 3" stroke="var(--color-bone)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </svg>
      <span className="cf-logo-text">
        <span className="cf-logo-name">Hearth &amp; Honey</span>
        <span className="cf-logo-sub">Coffee Co. · Asheville</span>
      </span>
    </span>
  );
}

export function Stars({ n = 5, size = 16 }: { n?: number; size?: number }) {
  return (
    <span className="cf-stars" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarIcon key={i} size={size} weight={i < n ? "fill" : "regular"} aria-hidden="true" />
      ))}
    </span>
  );
}

export function SectionHead({
  eyebrow,
  title,
  lead,
  center = false,
  action,
}: {
  eyebrow?: string;
  title: ReactNode;
  lead?: ReactNode;
  center?: boolean;
  action?: ReactNode;
}) {
  return (
    <div className={`cf-head${center ? " cf-head--center" : ""}`}>
      <div>
        {eyebrow && <p className="cf-eyebrow">{eyebrow}</p>}
        <h2 className="cf-h2">{title}</h2>
        {lead && <p className="cf-lead">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function PageHero({ eyebrow, title, lead, image, alt }: { eyebrow?: string; title: ReactNode; lead: ReactNode; image: string; alt: string }) {
  return (
    <section className="cf-pagehero">
      <div className="cf-wrap cf-pagehero-grid">
        <div className="cf-pagehero-copy">
          {eyebrow && <p className="cf-eyebrow">{eyebrow}</p>}
          <h1 className="cf-h1">{title}</h1>
          <p className="cf-lead">{lead}</p>
        </div>
        <img className="cf-pagehero-img" src={img(image)} alt={alt} />
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="cf-section cf-reviews">
      <div className="cf-wrap">
        <SectionHead
          title="What regulars say"
          lead={
            <span className="cf-rating-line">
              <Stars size={17} /> <strong>{RATING.score}</strong> from {RATING.count} reviews on Google and Yelp
            </span>
          }
        />
        <div className="cf-review-grid">
          {REVIEWS.map((r) => (
            <figure key={r.name} className="cf-review">
              <Stars n={r.stars} />
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                <img src={person(r.photo)} alt="" loading="lazy" />
                <span>
                  <strong>{r.name}</strong>
                  <small>
                    {r.place} · {r.source}, {r.date}
                  </small>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstaGrid() {
  return (
    <section className="cf-section cf-insta">
      <div className="cf-wrap">
        <SectionHead
          eyebrow="@hearthandhoneycoffee"
          title="Follow along on Instagram"
          lead="New bakes, roast days, and the occasional patio dog."
          action={
            <a className="cf-btn cf-btn--ghost" {...socialLink("instagram")}>
              <InstagramLogoIcon size={18} aria-hidden="true" /> Follow us
            </a>
          }
        />
        <ul className="cf-insta-grid">
          {INSTAGRAM.map((p) => (
            <li key={p.image}>
              <img src={img(p.image)} alt={p.alt} loading="lazy" />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Newsletter() {
  const { sent, onSubmit } = useDemoForm();
  return (
    <section className="cf-newsletter">
      <div className="cf-wrap cf-newsletter-inner">
        <div>
          <h2 className="cf-h2">The Honey Letter</h2>
          <p>
            One email a month about new drinks, fresh roasts, and holiday pie preorders. We send a free pastry coupon
            when you sign up.
          </p>
        </div>
        {sent ? (
          <p className="cf-newsletter-done" role="status">
            Thanks, you’re on the list. Your free pastry coupon is on its way to your inbox.
          </p>
        ) : (
          <form className="cf-newsletter-form" onSubmit={onSubmit}>
            <div className="cf-field">
              <label htmlFor="cf-news-email">Email address</label>
              <input id="cf-news-email" type="email" required autoComplete="email" />
            </div>
            <button className="cf-btn cf-btn--primary" type="submit">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

/** Today's hours for a location, based on the visitor's day of week. */
export function todayHours(locIndex: number) {
  return LOCATIONS[locIndex].daily[new Date().getDay()];
}

export function mapSrc(street: string, city: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(`${street}, ${city}`)}&z=15&output=embed`;
}

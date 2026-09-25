import type { ReactNode } from "react";
import { Moped, ShoppingBag, Star } from "@phosphor-icons/react";
import { useDemoForm } from "../shared";
import { ORDER_LINKS, TAG_LABEL } from "./data";
import type { Tag } from "./data";

export function Logo() {
  return (
    <svg className="rs-logo" viewBox="0 0 48 48" aria-hidden="true">
      <circle cx="24" cy="24" r="22.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="19" fill="none" stroke="currentColor" strokeWidth="0.75" opacity="0.6" />
      <text x="24" y="30.5" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="19" fontStyle="italic" fontWeight="600" fill="currentColor">
        NR
      </text>
    </svg>
  );
}

export function Stars({ value = 5, size = 16 }: { value?: number; size?: number }) {
  return (
    <span className="rs-stars" aria-label={`${value} out of 5 stars`}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Star key={n} size={size} weight={n <= Math.round(value) ? "fill" : "regular"} aria-hidden />
      ))}
    </span>
  );
}

export function Tags({ tags }: { tags?: Tag[] }) {
  if (!tags?.length) return null;
  return (
    <span className="rs-tags">
      {tags.map((t) => (
        <abbr key={t} title={TAG_LABEL[t]} className={`rs-tag rs-tag-${t.toLowerCase()}`}>
          {t}
        </abbr>
      ))}
    </span>
  );
}

export function OrderButtons({ compact = false }: { compact?: boolean }) {
  return (
    <div className={`rs-order ${compact ? "rs-order-compact" : ""}`}>
      {ORDER_LINKS.map((o) => (
        <a
          key={o.label}
          href="#order"
          onClick={(e) => e.preventDefault()}
          className={`rs-order-btn ${o.primary ? "rs-order-primary" : ""}`}
        >
          {o.primary ? <ShoppingBag size={20} aria-hidden /> : <Moped size={20} aria-hidden />}
          <span>
            <strong>{o.label}</strong>
            {!compact && <small>{o.sub}</small>}
          </span>
        </a>
      ))}
    </div>
  );
}

export function PageHero({ image, title, children, pos = "center" }: {
  image: string;
  title: string;
  children?: ReactNode;
  pos?: string;
}) {
  return (
    <section className="rs-pagehero">
      <img src={image} alt="" style={{ objectPosition: pos }} />
      <div className="rs-wrap rs-pagehero-in">
        <h1>{title}</h1>
        {children && <p className="rs-pagehero-sub">{children}</p>}
      </div>
    </section>
  );
}

export function Newsletter() {
  const { sent, onSubmit } = useDemoForm();
  return (
    <section className="rs-newsletter" aria-labelledby="rs-news-title">
      <div className="rs-wrap rs-newsletter-in">
        <div>
          <h2 id="rs-news-title">Join the famiglia</h2>
          <p>A short monthly letter from Marco's kitchen: new dishes, wine dinners, holiday menus. Plus a birthday dessert on us.</p>
        </div>
        {sent ? (
          <p className="rs-newsletter-done" role="status">Grazie. Elena's welcome note is on its way to your inbox.</p>
        ) : (
          <form className="rs-newsletter-form" onSubmit={onSubmit}>
            <label htmlFor="rs-news-email">Email address</label>
            <div className="rs-newsletter-row">
              <input id="rs-news-email" type="email" required autoComplete="email" />
              <button type="submit" className="rs-btn rs-btn-primary">Subscribe</button>
            </div>
            <small>One email a month. Unsubscribe anytime.</small>
          </form>
        )}
      </div>
    </section>
  );
}

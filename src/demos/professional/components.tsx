import type { MouseEvent, ReactNode } from "react";
import {
  CalendarCheck,
  ChatCircleText,
  Check,
  HandCoins,
  Phone,
  Star,
  Translate,
  Users,
} from "@phosphor-icons/react";
import { useDemoForm } from "../shared";
import { FIRM, type Page } from "./data";
import { AREAS, HEAR_OPTIONS } from "./data-practice";

export type Go = (page: Page) => void;
export type LinkFn = (page: Page) => {
  href: string;
  "aria-current": "page" | undefined;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export const ICONS = {
  phone: Phone,
  users: Users,
  coins: HandCoins,
  languages: Translate,
  calendar: CalendarCheck,
  chat: ChatCircleText,
} as const;

export function Stars({ count = 5, size = 16 }: { count?: number; size?: number }) {
  return (
    <span className="lw-stars" aria-label={`${count} out of 5 stars`} role="img">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={size} weight="fill" className={i < count ? "lw-star-on" : "lw-star-off"} aria-hidden="true" />
      ))}
    </span>
  );
}

export function PageHero({ crumb, title, text, children }: { crumb: string; title: string; text: string; children?: ReactNode }) {
  return (
    <section className="lw-pagehero">
      <div className="lw-wrap">
        <p className="lw-crumb">
          Home <span aria-hidden="true">/</span> {crumb}
        </p>
        <h1>{title}</h1>
        <p className="lw-pagehero-text">{text}</p>
        {children}
      </div>
    </section>
  );
}

export function CallLink({ className = "" }: { className?: string }) {
  return (
    <a className={`lw-btn lw-btn-outline ${className}`} href={FIRM.phoneHref}>
      <Phone size={18} aria-hidden="true" /> {FIRM.phone}
    </a>
  );
}

export function CtaBand({ go }: { go: Go }) {
  return (
    <section className="lw-cta">
      <div className="lw-wrap lw-cta-inner">
        <div>
          <h2>Talk with a Charlotte attorney today</h2>
          <p>The first meeting is free and confidential. Evening, Saturday and video appointments are available.</p>
        </div>
        <div className="lw-cta-actions">
          <button type="button" className="lw-btn lw-btn-accent" onClick={() => go("contact")}>
            Free consultation
          </button>
          <a className="lw-cta-phone" href={FIRM.phoneHref}>
            <Phone size={20} aria-hidden="true" /> {FIRM.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/** Consultation form. `full` adds the extra intake fields used on the Contact page. */
export function ConsultForm({ full = false, idPrefix }: { full?: boolean; idPrefix: string }) {
  const { sent, onSubmit, reset } = useDemoForm();
  const id = (name: string) => `${idPrefix}-${name}`;

  if (sent) {
    return (
      <div className="lw-form-sent" role="status">
        <span className="lw-sent-icon" aria-hidden="true">
          <Check size={26} weight="bold" />
        </span>
        <h3>Thank you. We have your request.</h3>
        <p>
          Someone from our intake team will call you within one business hour, or first thing the next morning if
          you wrote after hours. If it's urgent, call us any time at{" "}
          <a href={FIRM.phoneHref}>{FIRM.phone}</a>.
        </p>
        <button type="button" className="lw-textbtn" onClick={reset}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className={`lw-form ${full ? "lw-form-full" : ""}`} onSubmit={onSubmit}>
      <div className="lw-field">
        <label htmlFor={id("name")}>Full name</label>
        <input id={id("name")} name="name" autoComplete="name" required />
      </div>
      <div className="lw-field-row">
        <div className="lw-field">
          <label htmlFor={id("phone")}>Phone</label>
          <input id={id("phone")} name="phone" type="tel" autoComplete="tel" required />
        </div>
        <div className="lw-field">
          <label htmlFor={id("email")}>Email</label>
          <input id={id("email")} name="email" type="email" autoComplete="email" required={full} />
        </div>
      </div>
      <div className={full ? "lw-field-row" : ""}>
        <div className="lw-field">
          <label htmlFor={id("area")}>How can we help?</label>
          <select id={id("area")} name="area" required defaultValue="">
            <option value="" disabled>
              Select a practice area
            </option>
            {AREAS.map((a) => (
              <option key={a.id}>{a.title}</option>
            ))}
            <option>Something else</option>
          </select>
        </div>
        {full && (
          <div className="lw-field">
            <label htmlFor={id("hear")}>How did you hear about us?</label>
            <select id={id("hear")} name="hear" defaultValue="">
              <option value="" disabled>
                Choose one
              </option>
              {HEAR_OPTIONS.map((o) => (
                <option key={o}>{o}</option>
              ))}
            </select>
          </div>
        )}
      </div>
      <div className="lw-field">
        <label htmlFor={id("msg")}>Briefly describe your situation</label>
        <textarea
          id={id("msg")}
          name="message"
          rows={full ? 5 : 3}
        />
        <span className="lw-help">A few sentences is plenty. When did it happen, and what do you need help with?</span>
      </div>
      {full && (
        <div className="lw-field-row">
          <div className="lw-field">
            <label htmlFor={id("contact")}>Best way to reach you</label>
            <select id={id("contact")} name="contact" defaultValue="Phone call">
              <option>Phone call</option>
              <option>Text message</option>
              <option>Email</option>
            </select>
          </div>
          <div className="lw-field">
            <label htmlFor={id("lang")}>Preferred language</label>
            <select id={id("lang")} name="lang" defaultValue="English">
              <option>English</option>
              <option>Español</option>
            </select>
          </div>
        </div>
      )}
      <label className="lw-consent">
        <input type="checkbox" required />
        <span>
          I understand that sending this form does not create an attorney-client relationship, and I should not
          send confidential details until one is established.
        </span>
      </label>
      <button type="submit" className="lw-btn lw-btn-accent lw-btn-block">
        Send my request
      </button>
      <p className="lw-form-note">Free and confidential. We reply within one business hour.</p>
    </form>
  );
}

import { ArrowRight, CalendarCheck, CheckCircle, ClipboardText, Clock, CurrencyDollar, Phone, SealCheck, ShieldCheck, Truck, UserCheck } from "@phosphor-icons/react";
import { demoImg, useDemoForm } from "../../shared";
import { BIZ, REVIEWS, SERVICES, STEPS, TEAM, WHY } from "../data";
import type { ServiceGroup } from "../data";
import { BookButton, CallButton, ComfortClub, Coupons, Faq, Financing, SectionHead, ServiceIcon, Stars } from "../components";
import type { NavProps } from "../components";

const WHY_ICONS = [UserCheck, Clock, CurrencyDollar, ShieldCheck];
const STEP_ICONS = [Phone, Truck, ClipboardText, CheckCircle];

function HeroForm() {
  const { sent, onSubmit } = useDemoForm();
  return (
    <div className="sv-hero-card">
      {sent ? (
        <div className="sv-sent" role="status">
          <SealCheck size={36} aria-hidden="true" />
          <h2>Request received</h2>
          <p>Thanks. A Summit dispatcher will call you within 15 minutes to confirm your arrival window.</p>
        </div>
      ) : (
        <form onSubmit={onSubmit}>
          <h2>Request service</h2>
          <p className="sv-hero-card-sub">Same-day appointments available today</p>
          <label className="sv-field">
            <span>What do you need help with?</span>
            <select required defaultValue="">
              <option value="" disabled>Select a service</option>
              <option>AC not cooling</option>
              <option>AC tune-up ($79 special)</option>
              <option>Leak or burst pipe</option>
              <option>Clogged drain</option>
              <option>Water heater</option>
              <option>Free replacement estimate</option>
              <option>Something else</option>
            </select>
          </label>
          <div className="sv-field-row">
            <label className="sv-field">
              <span>Name</span>
              <input required autoComplete="name" />
            </label>
            <label className="sv-field">
              <span>Phone</span>
              <input required type="tel" autoComplete="tel" />
            </label>
          </div>
          <label className="sv-field">
            <span>ZIP code</span>
            <input required inputMode="numeric" maxLength={5} autoComplete="postal-code" />
          </label>
          <button type="submit" className="sv-btn sv-btn-orange sv-btn-block">
            Request service
          </button>
        </form>
      )}
    </div>
  );
}

function CategoryPanel({ group, go }: { group: ServiceGroup } & Pick<NavProps, "go">) {
  const isPlumb = group === "plumbing";
  const items = SERVICES.filter((s) => s.group === group);
  return (
    <article className="sv-cat">
      <img
        className="sv-cat-img"
        src={demoImg("services", isPlumb ? "faucet-chrome" : "house-2")}
        alt={isPlumb ? "Chrome bathtub faucet and hand shower" : "Stucco home with palm trees and a backyard pool"}
        loading="lazy"
      />
      <div className="sv-cat-body">
        <h3>{isPlumb ? "Plumbing" : "Heating & cooling"}</h3>
        <p>{isPlumb ? "Repairs, drains, water heaters and repipes for every kind of East Valley home." : "AC and heat pump repair, new systems and the tune-ups that keep them running."}</p>
        <ul className="sv-cat-list">
          {items.map((s) => (
            <li key={s.name}>
              <button type="button" onClick={() => go("services")}>
                <ServiceIcon name={s.name} />
                <span>{s.name}</span>
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      </div>
    </article>
  );
}

export default function Home({ go, link }: NavProps) {
  const featured = [REVIEWS[0], REVIEWS[1], REVIEWS[3]];
  return (
    <>
      <section className="sv-hero">
        <img className="sv-hero-bg" src={demoImg("services", "plumber")} alt="" />
        <div className="sv-wrap sv-hero-grid">
          <div className="sv-hero-copy">
            <h1>Fast, honest plumbing &amp; AC repair in the East Valley</h1>
            <p className="sv-hero-lead">
              Family-owned in Mesa since 2006. On-time techs, a flat price before we start, and work we stand behind.
            </p>
            <div className="sv-hero-ctas">
              <button type="button" className="sv-btn sv-btn-orange sv-btn-lg" onClick={() => go("quote")}>
                <CalendarCheck size={20} /> Book service
              </button>
              <CallButton variant="white" size="lg" />
            </div>
          </div>
          <HeroForm />
        </div>
      </section>

      <section className="sv-trust" aria-label="Why homeowners trust us">
        <ul className="sv-wrap sv-trust-grid">
          <li>
            <span className="sv-trust-g" aria-hidden="true">G</span>
            <span>
              <strong>Google ★{BIZ.rating}</strong>
              {BIZ.reviewCount} reviews
            </span>
          </li>
          <li>
            <ShieldCheck size={28} aria-hidden="true" />
            <span><strong>Licensed &amp; insured</strong>AZ {BIZ.roc}</span>
          </li>
          <li>
            <CurrencyDollar size={28} aria-hidden="true" />
            <span><strong>Upfront pricing</strong>Approved before we start</span>
          </li>
          <li>
            <Clock size={28} aria-hidden="true" />
            <span><strong>Same-day service</strong>7 days a week</span>
          </li>
        </ul>
      </section>

      <section className="sv-section">
        <div className="sv-wrap">
          <SectionHead title="Plumbing, heating and air conditioning under one roof">
            Repairs, maintenance and replacements for homes from Scottsdale to San Tan Valley.
          </SectionHead>
          <div className="sv-cats">
            <CategoryPanel group="plumbing" go={go} />
            <CategoryPanel group="hvac" go={go} />
          </div>
        </div>
      </section>

      <section className="sv-section sv-gray">
        <div className="sv-wrap">
          <SectionHead kicker="Fall specials" title="Save on your next service call">
            Mention the offer when you call, or pick it in the online booking form.
          </SectionHead>
          <Coupons go={go} />
        </div>
      </section>

      <section className="sv-section">
        <div className="sv-wrap sv-why">
          <img className="sv-why-img" src={demoImg("services", "tech-3")} alt="Summit technician in a hard hat and safety glasses" loading="lazy" />
          <div>
            <SectionHead title="Why neighbors keep calling us back">
              We've grown from one van in Dave's driveway to 31 trucks. We still run every job like our name is on the door, because it is.
            </SectionHead>
            <div className="sv-why-grid">
              {WHY.map((w, i) => {
                const I = WHY_ICONS[i];
                return (
                  <div className="sv-why-item" key={w.title}>
                    <span className="sv-why-icon" aria-hidden="true"><I size={24} /></span>
                    <div>
                      <h3>{w.title}</h3>
                      <p>{w.text}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="sv-section sv-gray">
        <div className="sv-wrap">
          <SectionHead title="What to expect when you call" center />
          <ol className="sv-steps">
            {STEPS.map((s, i) => {
              const I = STEP_ICONS[i];
              return (
                <li key={s.title}>
                  <span className="sv-step-icon" aria-hidden="true"><I size={26} /></span>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <ComfortClub go={go} />

      <section className="sv-section">
        <div className="sv-wrap sv-rev-wall">
          <div className="sv-rev-score">
            <h2>What our customers say</h2>
            <p className="sv-rev-big">{BIZ.rating}</p>
            <Stars size={22} />
            <p className="sv-rev-count">{BIZ.reviewCount} Google reviews</p>
            <a {...link("reviews")} className="sv-textlink">
              Read more reviews <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
          <div className="sv-rev-quotes">
            {featured.map((r) => (
              <figure className="sv-rev-card" key={r.name}>
                <Stars n={r.stars} />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong> {r.city}, AZ · {r.job}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-section sv-gray">
        <div className="sv-wrap">
          <div className="sv-story">
            <h2>A family business, not a franchise</h2>
            <p>
              Dave Kowalski started Summit in 2006 with a used van and a set of pipe wrenches. Maria took over the phones a
              year later and made sure every customer got a call back the same day. Twenty years on, we still work out of
              the same shop on Southern Avenue, and most of our technicians have been with us more than eight years.
            </p>
            <p>
              Every December, our Summit Gives Back crew fixes AC systems and water heaters for Mesa families who can't
              afford the repair, at no charge.
            </p>
          </div>
          <div className="sv-team">
            {TEAM.map((t) => (
              <figure key={t.name} className="sv-team-card">
                <img src={demoImg("people", t.img)} alt={t.name} loading="lazy" />
                <figcaption>
                  <strong>{t.name}</strong>
                  <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-section">
        <div className="sv-wrap">
          <Financing go={go} />
        </div>
      </section>

      <section className="sv-section sv-pt0">
        <div className="sv-wrap sv-faq-wrap">
          <div className="sv-faq-side">
            <h2>Common questions</h2>
            <p>
              Don't see yours? Call and ask. Someone in our Mesa office picks up day or night.
            </p>
            <div className="sv-faq-btns">
              <CallButton variant="navy" />
              <BookButton go={go} variant="orange" />
            </div>
          </div>
          <Faq />
        </div>
      </section>
    </>
  );
}

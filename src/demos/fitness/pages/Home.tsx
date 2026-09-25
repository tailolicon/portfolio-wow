import { ArrowRight, Check, Clock, Envelope, MapPin, Phone } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { BIZ, CLASSES, HOURS, PLANS, STORIES } from "../data";
import type { ClassType, PageProps } from "../data";
import { AmenityGrid, CtaBand, GoogleSummary, ReviewCards, SectionHead, Stars, W, levelClass } from "../components";

function ClassTile({ c, wide }: { c: ClassType; wide?: boolean }) {
  return (
    <article className={`fx-tile${wide ? " fx-tile--wide" : ""}`}>
      <img src={demoImg("fitness", c.img)} alt={c.alt} loading="lazy" />
      <div className="fx-tile-body">
        <h3>{c.name}</h3>
        <p className="fx-class-meta">
          <span className={levelClass(c.level)}>{c.level}</span>
          <span>
            <Clock size={15} weight={W} aria-hidden="true" /> {c.duration}
          </span>
        </p>
        <p>{c.blurb}</p>
      </div>
    </article>
  );
}

export default function Home({ go, link }: PageProps) {
  const [strength, conditioning, oly, mobility, foundations, open] = CLASSES;
  return (
    <>
      <section className="fx-hero">
        <img
          className="fx-hero-img"
          src={demoImg("fitness", "barbell-bw")}
          alt="Member setting up under a barbell for a back squat"
        />
        <div className="fx-wrap fx-hero-inner">
          <p className="fx-kicker">Strength & conditioning in RiNo, Denver</p>
          <h1 className="fx-hero-title">Get stronger than you thought you could</h1>
          <p className="fx-hero-text">
            Coached small-group classes, open gym and personal training. Beginners welcome, and no contracts.
          </p>
          <div className="fx-hero-actions">
            <button type="button" className="fx-btn fx-btn--primary fx-btn--lg" onClick={() => go("trial")}>
              Start your free week <ArrowRight size={18} weight={W} aria-hidden="true" />
            </button>
            <button type="button" className="fx-btn fx-btn--ghost fx-btn--lg" onClick={() => go("classes")}>
              View schedule
            </button>
          </div>
        </div>
      </section>

      <section className="fx-trust" aria-label="Forge at a glance">
        <div className="fx-wrap fx-trust-inner">
          <div className="fx-trust-item">
            <strong>
              {BIZ.rating} <Stars label={`Rated ${BIZ.rating} out of 5`} />
            </strong>
            <span>{BIZ.reviews} Google reviews</span>
          </div>
          <div className="fx-trust-item">
            <strong>{BIZ.members}</strong>
            <span>active members</span>
          </div>
          <div className="fx-trust-item">
            <strong>52</strong>
            <span>coached classes a week</span>
          </div>
          <div className="fx-trust-item">
            <strong>24/7</strong>
            <span>key-card access</span>
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap fx-intro">
          <div className="fx-intro-media">
            <img
              src={demoImg("fitness", "group-class")}
              alt="Members working through a coached bodyweight session"
              loading="lazy"
            />
          </div>
          <div>
            <SectionHead
              title="Never lifted before? You're exactly who we built this for."
              text="About half our members walked in with zero barbell experience. Classes are capped at 14, so your coach actually sees your squat, and every weight is scaled to you."
            />
            <ul className="fx-checks">
              <li>
                <Check size={20} weight={W} aria-hidden="true" />
                <span>
                  <strong>A free one-on-one intro</strong> before your first class, so you never walk in cold.
                </span>
              </li>
              <li>
                <Check size={20} weight={W} aria-hidden="true" />
                <span>
                  <strong>Programming that progresses</strong> in 6-week cycles, logged in the Forge app.
                </span>
              </li>
              <li>
                <Check size={20} weight={W} aria-hidden="true" />
                <span>
                  <strong>Month-to-month plans.</strong> No sign-up fee and no annual contract.
                </span>
              </li>
            </ul>
            <a className="fx-textlink" {...link("coaches")}>
              Meet the coaches <ArrowRight size={16} weight={W} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <div className="fx-head-row">
            <SectionHead
              title="Classes for every level"
              text="From your very first squat to your first weightlifting meet."
            />
            <button type="button" className="fx-btn fx-btn--outline" onClick={() => go("classes")}>
              View schedule
            </button>
          </div>
          <div className="fx-bento">
            <ClassTile c={strength} wide />
            <ClassTile c={conditioning} />
            <ClassTile c={oly} />
            <ClassTile c={mobility} />
            <ClassTile c={foundations} />
            <ClassTile c={open} wide />
            <div className="fx-tile fx-tile--help">
              <h3>Not sure where to start?</h3>
              <p>
                Most new members begin with Foundations and one or two Forge Strength classes a week. Your coach
                will set it up with you at your intro.
              </p>
              <button type="button" className="fx-btn fx-btn--primary" onClick={() => go("trial")}>
                Start your free week
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap">
          <div className="fx-head-row">
            <SectionHead title="What members say" />
            <GoogleSummary />
          </div>
          <div className="fx-wall">
            {STORIES.map((st) => (
              <article key={st.name} className="fx-story">
                <img src={demoImg("people", st.img)} alt={`${st.name}, Forge member`} loading="lazy" />
                <div className="fx-story-body">
                  <p className="fx-story-stat">
                    <strong>{st.stat}</strong> {st.statLabel}
                  </p>
                  <blockquote>“{st.quote}”</blockquote>
                  <p className="fx-story-name">
                    <strong>{st.name}</strong>, {st.detail}
                  </p>
                </div>
              </article>
            ))}
            <ReviewCards />
          </div>
        </div>
      </section>

      <section className="fx-band">
        <img
          className="fx-band-img"
          src={demoImg("fitness", "warehouse-gym")}
          alt="The Forge training floor in a converted RiNo warehouse"
          loading="lazy"
        />
        <div className="fx-wrap fx-band-inner">
          <SectionHead
            title="A converted warehouse with room to train"
            text="10,000 square feet on Brighton Blvd, with everything you need before and after a session."
          />
          <AmenityGrid />
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap fx-pricing-teaser">
          <div>
            <SectionHead
              title="Straightforward pricing"
              text="Month-to-month, no sign-up fee. Students, teachers and first responders get 15% off."
            />
            <a className="fx-textlink" {...link("membership")}>
              Compare plans <ArrowRight size={16} weight={W} aria-hidden="true" />
            </a>
          </div>
          <ul className="fx-price-rows">
            {PLANS.map((p) => (
              <li key={p.id} className={p.popular ? "is-popular" : undefined}>
                <div>
                  <h3>
                    {p.name}
                    {p.popular && <span className="fx-badge">Most popular</span>}
                  </h3>
                  <p>{p.tagline}</p>
                </div>
                <p className="fx-price">
                  <strong>${p.price}</strong>
                  <span>{p.cadence}</span>
                </p>
              </li>
            ))}
            <li>
              <div>
                <h3>Drop-in</h3>
                <p>Any class or open gym, one visit.</p>
              </div>
              <p className="fx-price">
                <strong>$25</strong>
                <span>/visit</span>
              </p>
            </li>
          </ul>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <SectionHead title="Find us in RiNo" />
          <div className="fx-visit">
            <div className="fx-visit-col">
              <MapPin size={24} weight={W} aria-hidden="true" />
              <h3>Address</h3>
              <p>
                {BIZ.street}
                <br />
                {BIZ.city}
              </p>
              <p className="fx-muted">Free lot behind the building off 34th St. Nine minutes' walk from 38th & Blake station.</p>
            </div>
            <div className="fx-visit-col">
              <Clock size={24} weight={W} aria-hidden="true" />
              <h3>Staffed hours</h3>
              {HOURS.map((h) => (
                <p key={h.day} className="fx-visit-hours">
                  <span>{h.day}</span> <span>{h.time}</span>
                </p>
              ))}
              <p className="fx-muted">Members have 24/7 key-card access.</p>
            </div>
            <div className="fx-visit-col">
              <Phone size={24} weight={W} aria-hidden="true" />
              <h3>Contact</h3>
              <p>
                <a href={BIZ.phoneHref}>{BIZ.phone}</a>
              </p>
              <p>
                <a href={`mailto:${BIZ.email}`}>
                  <Envelope size={16} weight={W} aria-hidden="true" /> {BIZ.email}
                </a>
              </p>
              <p className="fx-muted">We reply within one business day.</p>
            </div>
          </div>
          <iframe className="fx-map" title="Map to Forge Strength Club" loading="lazy" src={BIZ.mapSrc} />
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}

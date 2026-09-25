import { ArrowRight, Check, Clock, MapPin, Phone } from "@phosphor-icons/react";
import { ASSOCIATES, FIRM, PARTNERS, STEPS, TRUST, WHY, img } from "../data";
import { AREAS, RESULTS, REVIEWS, type AreaId } from "../data-practice";
import { ConsultForm, ICONS, Stars, type Go } from "../components";

const HOME_RESULTS = [RESULTS[0], RESULTS[1], RESULTS[6], RESULTS[10]];
const HOME_REVIEWS = [REVIEWS[0], REVIEWS[3], REVIEWS[4]];
const [MAIN_AREA, ...OTHER_AREAS] = AREAS;

export default function Home({ go, openArea }: { go: Go; openArea: (id: AreaId) => void }) {
  return (
    <>
      <section className="lw-hero">
        <img className="lw-hero-bg" src={img.heroBg} alt="" />
        <div className="lw-wrap lw-hero-inner">
          <h1>Charlotte attorneys who treat your case like it's personal</h1>
          <p className="lw-hero-lead">
            Personal injury, family law and estate planning. Free consultations in English or Spanish.
          </p>
          <div className="lw-hero-actions">
            <button type="button" className="lw-btn lw-btn-accent" onClick={() => go("contact")}>
              Free consultation
            </button>
            <a className="lw-btn lw-btn-ghost" href={FIRM.phoneHref}>
              <Phone size={18} aria-hidden="true" /> {FIRM.phone}
            </a>
          </div>
        </div>
      </section>

      <section className="lw-trust" aria-label="About our firm at a glance">
        <div className="lw-wrap lw-trust-grid">
          {TRUST.map((t) => (
            <div key={t.value} className="lw-trust-item">
              <strong>{t.value}</strong>
              <span>{t.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-wrap lw-intro">
          <img
            className="lw-intro-img"
            src={img.meeting}
            alt="Sofia Reyes meeting with a client in our Charlotte office"
            loading="lazy"
          />
          <div className="lw-intro-copy">
            <p className="lw-eyebrow">About the firm</p>
            <h2>A neighborhood law firm that answers the phone</h2>
            <p>
              Daniel Harper and Sofia Reyes opened our Dilworth office in {FIRM.founded}. They wanted a practice where
              people could reach their lawyer, understand what was happening, and feel that someone was in their
              corner.
            </p>
            <p>
              Today four attorneys and our support staff represent clients in Mecklenburg, Gaston, Union, Cabarrus and
              Iredell counties. We are big enough to stand up to insurance companies, and small enough that you will
              always know who is handling your case.
            </p>
            <a
              className="lw-arrowlink"
              href="#attorneys"
              onClick={(e) => {
                e.preventDefault();
                go("attorneys");
              }}
            >
              Meet our attorneys <ArrowRight size={18} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap">
          <div className="lw-section-head">
            <h2>How we can help</h2>
            <p>We practice in three areas and know them well.</p>
          </div>
          <div className="lw-area-bento">
            <article className="lw-area-card lw-area-card-main">
              <img src={MAIN_AREA.image} alt={MAIN_AREA.imageAlt} loading="lazy" />
              <div className="lw-area-body">
                <h3>{MAIN_AREA.title}</h3>
                <p>{MAIN_AREA.short}</p>
                <ul>
                  {MAIN_AREA.cardItems.map((c) => (
                    <li key={c}>
                      <Check size={16} weight="bold" aria-hidden="true" /> {c}
                    </li>
                  ))}
                </ul>
                <p className="lw-area-fee">No fee unless we win.</p>
                <button type="button" className="lw-arrowlink" onClick={() => openArea(MAIN_AREA.id)}>
                  Personal injury cases <ArrowRight size={18} aria-hidden="true" />
                </button>
              </div>
            </article>
            {OTHER_AREAS.map((a) => (
              <article key={a.id} className="lw-area-card lw-area-card-side">
                <img src={a.image} alt={a.imageAlt} loading="lazy" />
                <div className="lw-area-body">
                  <h3>{a.title}</h3>
                  <p>{a.short}</p>
                  <button type="button" className="lw-arrowlink" onClick={() => openArea(a.id)}>
                    {a.id === "family" ? "Family law services" : "Estate planning services"}{" "}
                    <ArrowRight size={18} aria-hidden="true" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-wrap lw-why">
          <div className="lw-why-head">
            <h2>What working with us is like</h2>
            <p>
              Most of our clients have never hired a lawyer before. These are the promises we make to every one of
              them.
            </p>
          </div>
          <div className="lw-why-list">
            {WHY.map((w) => {
              const Icon = ICONS[w.icon];
              return (
                <div key={w.title} className="lw-why-item">
                  <Icon size={28} className="lw-why-icon" aria-hidden="true" />
                  <div>
                    <h3>{w.title}</h3>
                    <p>{w.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap">
          <div className="lw-section-head">
            <h2>What happens after you call</h2>
          </div>
          <ol className="lw-steps">
            {STEPS.map((s) => (
              <li key={s.title} className="lw-step">
                <span className="lw-step-when">{s.when}</span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="lw-section lw-results-band">
        <div className="lw-wrap">
          <div className="lw-section-head lw-section-head-row">
            <h2>Recent results for our clients</h2>
            <button type="button" className="lw-btn lw-btn-ghost" onClick={() => go("results")}>
              All case results
            </button>
          </div>
          <div className="lw-home-results">
            {HOME_RESULTS.map((r) => (
              <div key={r.type} className="lw-home-result">
                <strong>{r.amount}</strong>
                <h3>{r.type}</h3>
                <p>{r.summary}</p>
              </div>
            ))}
          </div>
          <p className="lw-disclaimer-light">
            Past results do not guarantee a similar outcome. Every case depends on its own facts.
          </p>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-wrap lw-home-reviews">
          <div className="lw-rating-card">
            <p className="lw-eyebrow">Client reviews</p>
            <strong className="lw-rating-big">4.9</strong>
            <Stars size={22} />
            <span>212 reviews on Google</span>
            <button type="button" className="lw-arrowlink" onClick={() => go("results")}>
              Read more reviews <ArrowRight size={18} aria-hidden="true" />
            </button>
          </div>
          <div className="lw-review-stack">
            {HOME_REVIEWS.map((r) => (
              <figure key={r.name} className="lw-review">
                <Stars count={r.stars} size={16} />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>, {r.place}
                  <span>
                    {r.area}, {r.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap">
          <div className="lw-section-head">
            <h2>The people who will handle your case</h2>
          </div>
          <div className="lw-team-strip">
            {[...PARTNERS, ...ASSOCIATES].map((p) => (
              <button key={p.id} type="button" className="lw-team-mini" onClick={() => go("attorneys")}>
                <img src={p.photo} alt={`${p.name}, ${p.title}`} loading="lazy" />
                <strong>{p.name}</strong>
                <span>{p.title}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section lw-home-consult">
        <div className="lw-wrap lw-consult-split">
          <div className="lw-consult-copy">
            <p className="lw-eyebrow">Free consultation</p>
            <h2>Tell us what happened</h2>
            <p>
              An attorney reviews every request. We will call you back, usually within the hour during office hours.
            </p>
            <ul className="lw-consult-facts">
              <li>
                <Phone size={20} aria-hidden="true" />
                <span>
                  Prefer to talk? Call <a href={FIRM.phoneHref}>{FIRM.phone}</a>, any time.
                </span>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <span>Office open weekdays 8:30am to 5:30pm, evenings and Saturdays by appointment</span>
              </li>
              <li>
                <MapPin size={20} aria-hidden="true" />
                <span>
                  {FIRM.street}, {FIRM.cityLine}
                </span>
              </li>
            </ul>
          </div>
          <div className="lw-consult-form">
            <ConsultForm idPrefix="home" />
          </div>
        </div>
      </section>
    </>
  );
}

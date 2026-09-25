import { ArrowRightIcon, CoffeeIcon, GrainsIcon, LeafIcon, StarIcon } from "@phosphor-icons/react";
import { LOCATIONS, SPECIALS, BEANS, RATING } from "../data";
import { img, SectionHead, Reviews, InstaGrid, todayHours } from "../parts";
import type { PageProps } from "../parts";

export default function Home({ go, link }: PageProps) {
  const [feature, ...rest] = SPECIALS;
  return (
    <>
      <section className="cf-hero">
        <img className="cf-hero-bg" src={img("interior-wide")} alt="Morning light over the tables in our Downtown shop" />
        <div className="cf-wrap cf-hero-inner">
          <h1 className="cf-h1">Coffee roasted here. Pastries baked before sunrise.</h1>
          <p className="cf-hero-sub">
            Two Asheville shops, open every day. Stay a while, or order ahead and skip the line.
          </p>
          <div className="cf-btn-row">
            <button className="cf-btn cf-btn--primary" onClick={() => go("menu")}>
              Order ahead
            </button>
            <button className="cf-btn cf-btn--light" onClick={() => go("menu")}>
              View menu
            </button>
          </div>
        </div>
      </section>

      <section className="cf-trust" aria-label="Hours today and ratings">
        <div className="cf-wrap cf-trust-inner">
          <div className="cf-trust-rating">
            <StarIcon size={20} weight="fill" aria-hidden="true" />
            <span>
              <strong>{RATING.score}</strong> ({RATING.count} Google and Yelp reviews)
            </span>
          </div>
          {LOCATIONS.map((l, i) => (
            <div key={l.id} className="cf-trust-loc">
              <strong>{l.name}</strong>
              <span>
                Open today {todayHours(i)}
                {l.id === "west" && ", drive-up"}
              </span>
            </div>
          ))}
          <a className="cf-textlink" {...link("visit")}>
            Hours and directions <ArrowRightIcon size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap">
          <SectionHead
            eyebrow="Fall menu"
            title="Seasonal drinks and bakes"
            lead="At both shops through November, or until the apple butter runs out."
            action={
              <a className="cf-textlink" {...link("menu")}>
                Full menu <ArrowRightIcon size={16} aria-hidden="true" />
              </a>
            }
          />
          <div className="cf-bento">
            <article className="cf-bento-main">
              <img src={img(feature.image)} alt={feature.alt} loading="lazy" />
              <div className="cf-bento-body">
                <div className="cf-special-top">
                  <h3>{feature.name}</h3>
                  <span className="cf-price">{feature.price}</span>
                </div>
                <p>{feature.desc}</p>
              </div>
            </article>
            {rest.map((s) => (
              <article key={s.name} className="cf-bento-side">
                <img src={img(s.image)} alt={s.alt} loading="lazy" />
                <div className="cf-bento-body">
                  <p className="cf-bento-kind">{s.label}</p>
                  <div className="cf-special-top">
                    <h3>{s.name}</h3>
                    <span className="cf-price">{s.price}</span>
                  </div>
                  <p>{s.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="cf-section cf-section--tint">
        <div className="cf-wrap cf-split">
          <div className="cf-split-media">
            <img src={img("espresso-tools")} alt="Espresso, ground coffee and whole beans on a wooden board" loading="lazy" />
          </div>
          <div className="cf-split-copy">
            <h2 className="cf-h2">Roasted a few feet from where it’s poured</h2>
            <p>
              Sam roasts every batch on the 15-kilo roaster in the back of our Downtown shop, usually less than a week
              before it reaches your cup. The beans come from a handful of farms we know by name.
            </p>
            <ul className="cf-checks">
              <li>
                <CoffeeIcon size={20} aria-hidden="true" /> Roast days are Tuesday and Friday
              </li>
              <li>
                <GrainsIcon size={20} aria-hidden="true" /> Pastries, bread and biscuits made from scratch
              </li>
              <li>
                <LeafIcon size={20} aria-hidden="true" /> Milk from a Fairview dairy, honey from Leicester
              </li>
            </ul>
            <a className="cf-btn cf-btn--ghost" {...link("story")}>
              Read our story
            </a>
          </div>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap cf-duo">
          <div className="cf-rewards">
            <h2 className="cf-h3">The Honey Card</h2>
            <p>
              One stamp per drink. <strong>Your 10th drink is free</strong>, any size and any milk. You also get a pastry
              on your birthday.
            </p>
            <div className="cf-stamps" aria-hidden="true">
              {Array.from({ length: 10 }, (_, i) => (
                <span key={i} className={i < 7 ? "is-on" : i === 9 ? "is-free" : ""}>
                  {i === 9 ? "Free" : i < 7 ? <CoffeeIcon size={20} weight="fill" /> : ""}
                </span>
              ))}
            </div>
            <p className="cf-small">Ask for a card at the register, or give us your phone number and we’ll keep track.</p>
          </div>
          <div className="cf-beans-teaser">
            <img src={img("beans")} alt="Freshly roasted coffee beans" loading="lazy" />
            <div className="cf-beans-teaser-body">
              <h2 className="cf-h3">Take a bag home</h2>
              <p>
                {BEANS.length} roasts in 12oz bags, $17 to $19. We grind for free if you tell us how you brew.
              </p>
              <p className="cf-small">Subscribe for delivery every 2 or 4 weeks and save 10%.</p>
              <a className="cf-btn cf-btn--ghost" {...link("menu")}>
                Shop coffee
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="cf-cta-strip">
        <div className="cf-wrap cf-cta-strip-inner">
          <div>
            <h2 className="cf-h2">Coffee for the office?</h2>
            <p>Coffee boxes serve 10 to 12 for $38. Add a pastry platter and we’ll deliver it before your meeting.</p>
          </div>
          <button className="cf-btn cf-btn--primary" onClick={() => go("catering")}>
            See catering
          </button>
        </div>
      </section>

      <Reviews />
      <InstaGrid />
    </>
  );
}

import { ArrowRight, Star, Leaf, MapPin, Phone, InstagramLogo, CalendarCheck, Scissors, Car } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { BIZ, HOURS, RATING, REVIEWS, SIGNATURE } from "../data";
import type { PageProps } from "../types";
import { Logo } from "../Logo";

export function Stars({ size = 15 }: { size?: number }) {
  return (
    <span className="sl-stars" aria-label="5 out of 5 stars">
      {[0, 1, 2, 3, 4].map((i) => (
        <Star key={i} size={size} weight="fill" aria-hidden="true" />
      ))}
    </span>
  );
}

const BENTO = [
  { img: "color-lavender", alt: "Silver lilac blonde with loose waves" },
  { img: "updo", alt: "Textured bridal updo being pinned" },
  { img: "curls-portrait", alt: "Defined natural curls after a curly cut" },
  { img: "blowdry", alt: "Round-brush blowout on long layers" },
  { img: "color-pink", alt: "Rose pink vivid color" },
];

export function HomePage({ link, book }: PageProps) {
  return (
    <>
      <section className="sl-hero">
        <div className="sl-wrap sl-hero-grid">
          <div className="sl-hero-copy">
            <h1 className="sl-h1">Color and cuts that grow out beautifully</h1>
            <p className="sl-lead">
              A small studio on Marshall Way for lived-in color, balayage, precision cuts and bridal
              hair.
            </p>
            <div className="sl-actions">
              <button type="button" className="sl-btn" onClick={() => book()}>
                Book appointment
              </button>
              <a {...link("services")} className="sl-btn sl-btn--ghost">
                Services &amp; pricing
              </a>
            </div>
          </div>
          <div className="sl-hero-media">
            <img
              className="sl-hero-arch"
              src={demoImg("salon", "waves-back")}
              alt="Long brunette hair with soft caramel balayage"
            />
            <img
              className="sl-hero-inset"
              src={demoImg("salon", "interior-bw")}
              alt="Bright styling floor at Ivy & Oak Hair Studio"
            />
          </div>
        </div>
      </section>

      <section className="sl-trust" aria-label="About the studio at a glance">
        <div className="sl-wrap sl-trust-row">
          <div className="sl-trust-item">
            <Stars />
            <span>
              <strong>{RATING.score}</strong> on Google ({RATING.count} reviews)
            </span>
          </div>
          <div className="sl-trust-item">
            <CalendarCheck size={20} aria-hidden="true" />
            <span>Free color consultations</span>
          </div>
          <div className="sl-trust-item">
            <Leaf size={20} aria-hidden="true" />
            <span>Professional, cruelty-free products</span>
          </div>
          <div className="sl-trust-item">
            <Scissors size={20} aria-hidden="true" />
            <span>Six stylists, open since 2016</span>
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap sl-known">
          <div className="sl-known-media">
            <img src={demoImg("salon", "blowdry-stylist")} alt="Jenna finishing a cut with a round-brush blowout" loading="lazy" />
          </div>
          <div className="sl-known-list">
            <h2 className="sl-h2">What we're known for</h2>
            <p className="sl-sub">
              Every visit starts with a real conversation about your hair, your routine and how
              often you want to come back.
            </p>
            <ul>
              {SIGNATURE.map((s) => (
                <li key={s.title} className="sl-known-item">
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.text}</p>
                  </div>
                  <span className="sl-known-price">{s.price}</span>
                </li>
              ))}
            </ul>
            <a {...link("services")} className="sl-textlink">
              See the full menu and prices <ArrowRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </section>

      <section className="sl-offer" aria-labelledby="sl-offer-h">
        <img src={demoImg("salon", "hair-wash")} alt="" loading="lazy" className="sl-offer-bg" />
        <div className="sl-wrap">
          <div className="sl-offer-panel">
            <p className="sl-eyebrow">New guest offer</p>
            <h2 id="sl-offer-h" className="sl-h2">20% off your first color service</h2>
            <p>
              First time with us? Take 20% off any color, balayage or blonding service with any
              stylist. Tick “first visit” when you book online and we'll apply it at checkout.
            </p>
            <button type="button" className="sl-btn" onClick={() => book()}>
              Book appointment
            </button>
            <p className="sl-fine">
              First-time guests only. Not valid on extensions, bridal or retail, and can't be
              combined with other offers.
            </p>
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap sl-about">
          <div className="sl-about-media">
            <img src={demoImg("salon", "team")} alt="Jenna Morales laughing with two Ivy & Oak stylists" loading="lazy" />
          </div>
          <div className="sl-about-copy">
            <p className="sl-eyebrow">Since 2016</p>
            <h2 className="sl-h2">Started with three chairs on Marshall Way</h2>
            <p>
              Jenna Morales opened Ivy &amp; Oak after twelve years working in busy salons. She
              wanted a place where appointments aren't rushed, the music is low, and you leave
              knowing how to style your hair at home.
            </p>
            <p>
              Ten years on we have six stylists, a backbar full of plants and a lot of regulars.
              Everyone on the team does advanced education every year, and Jenna still takes
              guests four days a week.
            </p>
            <a {...link("stylists")} className="sl-btn sl-btn--ghost">
              Meet the team
            </a>
          </div>
        </div>
      </section>

      <section className="sl-section sl-section--tint">
        <div className="sl-wrap">
          <div className="sl-head sl-head--row">
            <h2 className="sl-h2">What guests are saying</h2>
            <div className="sl-google">
              <span className="sl-google-score">{RATING.score}</span>
              <div>
                <Stars />
                <span>{RATING.count} reviews on Google</span>
              </div>
            </div>
          </div>
          <div className="sl-wall">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="sl-review">
                <Stars size={14} />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>
                  <span>
                    {r.place}, Google review, {r.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap">
          <div className="sl-head sl-head--row">
            <h2 className="sl-h2">Recent work</h2>
            <a {...link("gallery")} className="sl-textlink">
              <InstagramLogo size={18} aria-hidden="true" /> See more in the gallery
            </a>
          </div>
          <div className="sl-bento">
            {BENTO.map((b) => (
              <a key={b.img} {...link("gallery")} className="sl-bento-item">
                <img src={demoImg("salon", b.img)} alt={b.alt} loading="lazy" />
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-section sl-section--flush">
        <div className="sl-wrap sl-extras">
          <article className="sl-giftcard">
            <div className="sl-giftcard-copy">
              <h2 className="sl-h2 sl-h2--sm">Gift cards</h2>
              <p>
                Any amount, never expire. We can email one the same day or have it waiting at the
                front desk in a linen envelope.
              </p>
              <a href={`tel:${BIZ.tel}`} className="sl-textlink">
                Call {BIZ.phone} to order <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
            <div className="sl-giftcard-visual" aria-hidden="true">
              <Logo light />
              <span className="sl-giftcard-amt">$150</span>
            </div>
          </article>
          <article className="sl-retail">
            <img src={demoImg("salon", "tools")} alt="Brushes, dryer and styling tools on a white counter" loading="lazy" />
            <div className="sl-retail-body">
              <h2 className="sl-h3">Take it home</h2>
              <p>
                A short, edited shelf of professional, cruelty-free shampoos, treatments and
                stylers. Current guests save 10% on retail.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap sl-visit">
          <div className="sl-visit-info">
            <p className="sl-eyebrow">Visit</p>
            <h2 className="sl-h2">Find us in Old Town</h2>
            <p className="sl-visit-line">
              <MapPin size={20} aria-hidden="true" />
              <span>
                {BIZ.street}
                <br />
                {BIZ.city}
              </span>
            </p>
            <p className="sl-visit-line">
              <Phone size={20} aria-hidden="true" />
              <a href={`tel:${BIZ.tel}`}>{BIZ.phone} (call or text)</a>
            </p>
            <p className="sl-visit-line">
              <Car size={20} aria-hidden="true" />
              <span>Free covered parking in the Marshall Way garage behind the studio.</span>
            </p>
            <dl className="sl-hours">
              {HOURS.map((h) => (
                <div key={h.day}>
                  <dt>{h.day}</dt>
                  <dd className={h.time === "Closed" ? "sl-closed" : undefined}>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="sl-map">
            <iframe
              title="Map to Ivy & Oak Hair Studio"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(BIZ.mapQuery)}&z=15&output=embed`}
            />
          </div>
        </div>
      </section>
    </>
  );
}

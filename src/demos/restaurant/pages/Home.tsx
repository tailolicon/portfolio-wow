import { ArrowRight, Clock, MapPin, Phone } from "@phosphor-icons/react";
import { BIZ, HOURS_SHORT, RATING, REVIEWS, SIGNATURES, img, person } from "../data";
import type { PageProps } from "../data";
import { OrderButtons, Stars } from "../parts";

export default function Home({ go, link }: PageProps) {
  const scrollToOrder = () => {
    document.getElementById("rs-order")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };
  const buyGiftCard = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    go("contact");
    window.setTimeout(() => document.getElementById("rs-contact-form")?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  };
  const [lead, ...rest] = SIGNATURES;

  return (
    <>
      <section className="rs-hero">
        <img className="rs-hero-img" src={img("pizza-margherita")} alt="Margherita pizza with fresh basil, straight from our wood oven" />
        <div className="rs-wrap rs-hero-in">
          <h1>Handmade pasta and wood&#8209;fired pizza since 1998</h1>
          <p className="rs-hero-sub">The Bellini family's trattoria on South Lamar. Pasta rolled every morning, Nonna's ragù always on the stove.</p>
          <div className="rs-hero-actions">
            <button type="button" className="rs-btn rs-btn-primary rs-btn-lg" onClick={() => go("reservations")}>
              Reserve a table
            </button>
            <button type="button" className="rs-btn rs-btn-light rs-btn-lg" onClick={scrollToOrder}>
              Order online
            </button>
          </div>
        </div>
      </section>

      <section className="rs-infobar" aria-label="Hours, location and reviews">
        <div className="rs-wrap rs-infobar-grid">
          <div className="rs-info-item">
            <Clock size={24} aria-hidden />
            <div>
              <h2>Hours</h2>
              <ul className="rs-info-hours">
                {HOURS_SHORT.map((h) => (
                  <li key={h.day}><span>{h.day}</span> {h.time}</li>
                ))}
              </ul>
            </div>
          </div>
          <div className="rs-info-item">
            <MapPin size={24} aria-hidden />
            <div>
              <h2>Find us</h2>
              <p>{BIZ.street}<br />{BIZ.city}</p>
              <a className="rs-textlink" {...link("contact")}>Directions and parking <ArrowRight size={14} aria-hidden /></a>
            </div>
          </div>
          <div className="rs-info-item">
            <Phone size={24} aria-hidden />
            <div>
              <h2>Call us</h2>
              <p><a className="rs-info-phone" href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></p>
              <p className="rs-info-rating">
                <Stars value={5} size={14} /> {RATING.score} from {RATING.count} Google reviews
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-wrap rs-split">
          <div className="rs-split-media">
            <img src={img("fresh-pasta")} alt="Fresh tagliatelle nests with cherry tomatoes" loading="lazy" />
            <img className="rs-split-inset" src={img("chef-portrait")} alt="Chef Marco Bellini plating at the pass" loading="lazy" />
          </div>
          <div className="rs-split-text">
            <h2>A neighborhood trattoria, run the way Nonna always ran it</h2>
            <p>
              When Rosa Bellini opened on South Lamar in 1998, she had twelve tables, one pasta machine and a pot of ragù
              that never left the stove. Her son Marco cooks now, and his wife Elena will likely be the one who seats you.
              The recipes haven't changed.
            </p>
            <p>
              We make the pasta, bread, sausage and limoncello here. Produce comes from Central Texas farms when we can
              get it; tomatoes, cheese and olive oil come from Italy.
            </p>
            <a className="rs-btn rs-btn-outline" {...link("about")}>Read our story</a>
          </div>
        </div>
      </section>

      <section className="rs-section rs-section-alt">
        <div className="rs-wrap">
          <div className="rs-favs-head">
            <h2>What regulars order</h2>
            <a className="rs-textlink" {...link("menu")}>See the full menu <ArrowRight size={14} aria-hidden /></a>
          </div>
          <div className="rs-favs">
            <article className="rs-fav-lead">
              <img src={img(lead.image)} alt={lead.name} loading="lazy" />
              <div className="rs-fav-lead-body">
                <div className="rs-dish-top">
                  <h3>{lead.name}</h3>
                  <span className="rs-price">${lead.price}</span>
                </div>
                <p>{lead.desc}</p>
              </div>
            </article>
            <ul className="rs-fav-list">
              {rest.map((d) => (
                <li key={d.name}>
                  <img src={img(d.image)} alt={d.name} loading="lazy" />
                  <div>
                    <div className="rs-dish-top">
                      <h3>{d.name}</h3>
                      <span className="rs-price">${d.price}</span>
                    </div>
                    <p>{d.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rs-band">
        <img src={img("wine-toast")} alt="Friends toasting with red wine at the bar" loading="lazy" />
        <div className="rs-wrap rs-band-in">
          <div className="rs-band-card">
            <h2>Aperitivo hour, Tuesday to Friday from 4 to 6</h2>
            <p>A spritz and a few bites before dinner, the way they do it in Modena. Bar and patio only, no reservation needed.</p>
            <ul className="rs-deals">
              <li><strong>$8</strong><span>Aperol, Campari and limoncello spritzes</span></li>
              <li><strong>$7</strong><span>House red, white and prosecco by the glass</span></li>
              <li><strong>Half off</strong><span>Arancini, polpette, calamari and the Margherita</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-wrap rs-bento">
          <article className="rs-tile rs-tile-photo rs-tile-supper">
            <img src={img("friends-dining")} alt="Guests sharing plates at a long table" loading="lazy" />
            <div className="rs-tile-body">
              <h2>Sunday family supper</h2>
              <p>
                Rosa's tradition since the first year. Antipasti, two pastas, meatballs in Sunday gravy, a roast from the
                wood oven and tiramisù, all passed around the table. $42 per adult, $18 for kids under 12.
              </p>
              <button type="button" className="rs-btn rs-btn-light" onClick={() => go("reservations")}>Reserve a table</button>
            </div>
          </article>

          <article className="rs-tile rs-tile-order" id="rs-order">
            <h2>Order online</h2>
            <p>The full dinner menu for pickup, Tuesday to Sunday. Take-and-bake lasagna and fresh pasta by the pound too.</p>
            <OrderButtons />
          </article>

          <article className="rs-tile rs-tile-plain">
            <img src={img("interior-2")} alt="The Cantina private dining room" loading="lazy" />
            <div className="rs-tile-text">
              <h3>Private dining and catering</h3>
              <p>The Cantina seats 40. Buy out the whole place for up to 120, or let us bring trays to your office.</p>
              <a className="rs-textlink" {...link("contact")}>Plan an event <ArrowRight size={14} aria-hidden /></a>
            </div>
          </article>

          <article className="rs-tile rs-tile-plain rs-tile-wide" id="rs-gift-cards">
            <img src={img("fine-table")} alt="A table set for dinner" loading="lazy" />
            <div className="rs-tile-text">
              <h3>Gift cards</h3>
              <p>Sent by email in a few minutes, or pick one up at the host stand. Buy $100, get a $20 bonus card.</p>
              <a className="rs-textlink" href="#rs-contact-form" onClick={buyGiftCard}>Buy a gift card <ArrowRight size={14} aria-hidden /></a>
            </div>
          </article>
        </div>
      </section>

      <section className="rs-section rs-section-alt">
        <div className="rs-wrap">
          <div className="rs-reviews-head">
            <h2>From our guests</h2>
            <div className="rs-rating-badge">
              <strong>{RATING.score}</strong>
              <div>
                <Stars value={5} />
                <span>{RATING.count} reviews on Google</span>
              </div>
            </div>
          </div>
          <div className="rs-wall">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="rs-review">
                <Stars value={5} size={14} />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <img src={person(r.photo)} alt="" loading="lazy" />
                  <span><strong>{r.name}</strong>{r.where}, {r.source}, {r.date}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-visit">
        <div className="rs-wrap rs-visit-grid">
          <div className="rs-visit-text">
            <h2>Come find us on South Lamar</h2>
            <p>Between Oltorf and Bluebonnet, with a free lot out back. The covered patio is heated in winter and dogs are welcome.</p>
            <ul className="rs-visit-hours">
              {HOURS_SHORT.map((h) => (
                <li key={h.day}><span>{h.day}</span><span>{h.time}</span></li>
              ))}
            </ul>
            <div className="rs-btn-row">
              <button type="button" className="rs-btn rs-btn-primary" onClick={() => go("reservations")}>Reserve a table</button>
              <a className="rs-btn rs-btn-outline" href={`tel:${BIZ.tel}`}>Call {BIZ.phone}</a>
            </div>
          </div>
          <div className="rs-map">
            <iframe title="Map to Nonna Rosa Trattoria" loading="lazy" src={`https://maps.google.com/maps?q=${BIZ.mapQuery}&z=14&output=embed`} />
          </div>
        </div>
      </section>
    </>
  );
}

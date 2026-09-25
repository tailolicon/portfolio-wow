import { Bus, Car, Clock, EnvelopeSimple, MapPin, Phone, Translate } from "@phosphor-icons/react";
import { FIRM } from "../data";
import { ConsultForm, PageHero } from "../components";

const BRING = [
  "Police or accident report, and photos of the scene or injuries",
  "Insurance cards and any letters from insurance companies",
  "Medical bills and records you already have",
  "Court papers, separation agreements or existing custody orders",
  "Current wills, deeds, and a list of accounts for estate planning",
];

export default function Contact() {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(FIRM.mapQuery)}&z=15&output=embed`;

  return (
    <>
      <PageHero
        crumb="Contact"
        title="Schedule your free consultation"
        text="Send us a few details or call. There is no cost and no obligation."
      />

      <section className="lw-section">
        <div className="lw-wrap lw-contact-layout">
          <div className="lw-contact-form">
            <h2 className="lw-h2-sm">Request a consultation</h2>
            <p className="lw-contact-intro">
              An attorney reviews every request the same business day. Please don't include confidential details yet.
            </p>
            <ConsultForm full idPrefix="contact" />
          </div>

          <aside className="lw-contact-info">
            <div className="lw-info-block">
              <h3>Call us any time</h3>
              <a className="lw-info-phone" href={FIRM.phoneHref}>
                <Phone size={22} aria-hidden="true" /> {FIRM.phone}
              </a>
              <p>Our phones are answered 24 hours a day, 7 days a week.</p>
            </div>
            <ul className="lw-info-list">
              <li>
                <MapPin size={20} aria-hidden="true" />
                <span>
                  <strong>Office</strong>
                  {FIRM.street}
                  <br />
                  {FIRM.cityLine}
                </span>
              </li>
              <li>
                <EnvelopeSimple size={20} aria-hidden="true" />
                <span>
                  <strong>Email</strong>
                  <a href={`mailto:${FIRM.email}`}>{FIRM.email}</a>
                </span>
              </li>
              <li>
                <Clock size={20} aria-hidden="true" />
                <span>
                  <strong>Office hours</strong>
                  Monday to Friday, 8:30am to 5:30pm
                  <br />
                  Evenings and Saturdays by appointment
                </span>
              </li>
              <li>
                <Translate size={20} aria-hidden="true" />
                <span>
                  <strong>Se habla español</strong>
                  Llámenos y pida hablar con Sofia o Andrés.
                </span>
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap lw-visit">
          <div className="lw-map">
            <iframe title="Map to Harper & Reyes Law" loading="lazy" src={mapSrc} />
          </div>
          <div className="lw-visit-copy">
            <h2 className="lw-h2-sm">Visiting our office</h2>
            <p>
              We are on the third floor of the Morehead Square building in Dilworth, just off South Boulevard and a few
              minutes from uptown.
            </p>
            <div className="lw-visit-item">
              <Car size={22} aria-hidden="true" />
              <div>
                <h3>Parking</h3>
                <p>
                  Free visitor parking in the deck behind the building, entered from Morehead Square Dr. Bring your
                  ticket to the front desk and we'll validate it.
                </p>
              </div>
            </div>
            <div className="lw-visit-item">
              <Bus size={22} aria-hidden="true" />
              <div>
                <h3>Transit</h3>
                <p>
                  The LYNX Blue Line East/West Blvd station is about a 10 minute walk. CATS buses stop at Morehead St
                  and South Blvd.
                </p>
              </div>
            </div>
            <div className="lw-visit-item">
              <MapPin size={22} aria-hidden="true" />
              <div>
                <h3>Can't come to us?</h3>
                <p>We meet clients by video, at home, or in the hospital when needed.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-wrap lw-bring">
          <div>
            <h2 className="lw-h2-sm">What to bring to your consultation</h2>
            <p>
              Don't worry if you don't have everything. Bring what you can, and we'll help you track down the rest.
            </p>
          </div>
          <ul>
            {BRING.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

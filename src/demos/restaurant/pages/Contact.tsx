import { Car, Envelope, MapPin, Phone, Wheelchair } from "@phosphor-icons/react";
import { useDemoForm } from "../../shared";
import { BIZ, HOURS, img } from "../data";
import type { PageProps } from "../data";
import { PageHero } from "../parts";

const SPACES = [
  { name: "The Cantina", seats: "Seats 40, or 55 standing", text: "Our private room lined with wine racks, with its own entrance, AV screen and a long family table.", image: "interior-2" },
  { name: "Covered Patio", seats: "Seats 60, or 80 standing", text: "Heated in winter, fans and misters in summer. String lights, a small stage and room for a band.", image: "wine-toast" },
  { name: "Full Buyout", seats: "Seats 120, or 160 standing", text: "The whole trattoria, bar and patio. Most often booked for rehearsal dinners, weddings and company parties.", image: "interior-3" },
];

const FAQ = [
  { q: "Is there a minimum spend for private events?", a: "Yes. The Cantina starts at $1,500 on weeknights and $2,500 Friday to Sunday. Buyout minimums depend on the date." },
  { q: "Do you cater off-site?", a: "We do. Family-style trays of pasta, salads, meatballs and tiramisù for 10 to 200 guests, delivered anywhere within 20 miles of South Lamar." },
  { q: "Can we bring our own wine or cake?", a: "Corkage is $25 per 750 ml bottle (limit two). Celebration cakes are welcome with a $3 per-guest plating fee." },
];

function ContactForm() {
  const { sent, onSubmit } = useDemoForm();
  if (sent) {
    return <p className="rs-form-done" role="status">Thanks for writing. Someone on our team will reply within one business day.</p>;
  }
  return (
    <form className="rs-form" onSubmit={onSubmit}>
      <div className="rs-book-row rs-book-row-2">
        <label className="rs-field"><span>Name</span><input required autoComplete="name" /></label>
        <label className="rs-field"><span>Email</span><input required type="email" autoComplete="email" /></label>
      </div>
      <label className="rs-field">
        <span>Subject</span>
        <select defaultValue="General question">
          <option>General question</option>
          <option>Feedback about a visit</option>
          <option>Gift cards</option>
          <option>Lost &amp; found</option>
          <option>Careers</option>
        </select>
      </label>
      <label className="rs-field"><span>Message</span><textarea required rows={4} /></label>
      <button type="submit" className="rs-btn rs-btn-primary">Send message</button>
    </form>
  );
}

function EventsForm() {
  const { sent, onSubmit } = useDemoForm();
  if (sent) {
    return (
      <div className="rs-form-done" role="status">
        <h3>Grazie, we have your inquiry.</h3>
        <p>Our events coordinator will email you within 24 hours with availability, sample menus and pricing.</p>
      </div>
    );
  }
  return (
    <form className="rs-form" onSubmit={onSubmit}>
      <div className="rs-book-row rs-book-row-2">
        <label className="rs-field"><span>Full name</span><input required autoComplete="name" /></label>
        <label className="rs-field"><span>Phone</span><input required type="tel" autoComplete="tel" /></label>
        <label className="rs-field"><span>Email</span><input required type="email" autoComplete="email" /></label>
        <label className="rs-field">
          <span>Type of event</span>
          <select defaultValue="Birthday">
            <option>Birthday</option>
            <option>Rehearsal dinner</option>
            <option>Wedding reception</option>
            <option>Corporate event</option>
            <option>Holiday party</option>
            <option>Memorial / celebration of life</option>
            <option>Off-site catering</option>
            <option>Other</option>
          </select>
        </label>
        <label className="rs-field"><span>Preferred date</span><input type="date" required /></label>
        <label className="rs-field"><span>Number of guests</span><input type="number" min={7} max={200} required /></label>
        <label className="rs-field">
          <span>Space</span>
          <select defaultValue="Not sure yet">
            <option>Not sure yet</option>
            <option>The Cantina</option>
            <option>Covered Patio</option>
            <option>Full Buyout</option>
            <option>Catering (off-site)</option>
          </select>
        </label>
        <label className="rs-field">
          <span>Approximate budget</span>
          <select defaultValue="$1,500 to $3,000">
            <option>Under $1,500</option>
            <option>$1,500 to $3,000</option>
            <option>$3,000 to $6,000</option>
            <option>$6,000+</option>
          </select>
        </label>
      </div>
      <label className="rs-field"><span>Tell us about your event</span><textarea rows={4} /><small>Time of day, menu ideas, dietary needs, anything else we should know.</small></label>
      <button type="submit" className="rs-btn rs-btn-primary rs-btn-lg">Send inquiry</button>
    </form>
  );
}

export default function Contact({ go }: PageProps) {
  return (
    <>
      <PageHero image={img("bar")} title="Contact and private events" pos="center 45%">
        For a table tonight, calling is quickest. For everything else, write to us below.
      </PageHero>

      <section className="rs-section">
        <div className="rs-wrap rs-contact-grid">
          <div className="rs-contact-info">
            <ul className="rs-contact-list">
              <li>
                <Phone size={22} aria-hidden />
                <span><strong>Phone</strong><a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a></span>
              </li>
              <li>
                <Envelope size={22} aria-hidden />
                <span><strong>Email</strong><a href={`mailto:${BIZ.email}`}>{BIZ.email}</a></span>
              </li>
              <li>
                <MapPin size={22} aria-hidden />
                <span><strong>Address</strong>{BIZ.street}, {BIZ.city}</span>
              </li>
            </ul>
            <h2>Hours</h2>
            <table className="rs-hours-table">
              <tbody>
                {HOURS.map((h) => (
                  <tr key={h.day}>
                    <th scope="row">{h.day}</th>
                    <td>{h.time}{h.note && <small>{h.note}</small>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="rs-muted">Closed Thanksgiving and Christmas Day. Holiday hours go up on Instagram.</p>
          </div>
          <div className="rs-contact-side">
            <div className="rs-map rs-map-tall">
              <iframe title="Map to Nonna Rosa Trattoria" loading="lazy" src={`https://maps.google.com/maps?q=${BIZ.mapQuery}&z=15&output=embed`} />
            </div>
            <div className="rs-parking">
              <div>
                <h3><Car size={20} aria-hidden /> Parking</h3>
                <p>Free lot behind the building, entrance on Bluebonnet Ln. Street parking on Lamar and the side streets. Free valet Friday and Saturday after 6pm. The Route 3 bus stops out front.</p>
              </div>
              <div>
                <h3><Wheelchair size={20} aria-hidden /> Accessibility</h3>
                <p>Step-free entrance from the parking lot. Accessible restrooms, and the patio is on one level.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rs-section rs-section-alt">
        <div className="rs-wrap rs-contact-form-wrap">
          <div>
            <h2>Send us a note</h2>
            <p>Questions, compliments, or something you left behind. For reservations, please use our <button type="button" className="rs-inline-link" onClick={() => go("reservations")}>booking page</button>.</p>
          </div>
          <ContactForm />
        </div>
      </section>

      <section className="rs-section" id="rs-events">
        <div className="rs-wrap">
          <div className="rs-section-head">
            <p className="rs-kicker">Private dining and catering</p>
            <h2>Host your celebration at Nonna Rosa</h2>
            <p>Birthday dinners for 12, wedding receptions for 150. Our events team plans the menu, wine and timeline with you. Family-style menus start at $55 per guest.</p>
          </div>
          <div className="rs-spaces">
            {SPACES.map((sp) => (
              <article key={sp.name} className="rs-space">
                <img src={img(sp.image)} alt={sp.name} loading="lazy" />
                <div className="rs-space-body">
                  <h3>{sp.name}</h3>
                  <p className="rs-space-seats">{sp.seats}</p>
                  <p>{sp.text}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="rs-events-grid">
            <div className="rs-events-form">
              <h2>Private events inquiry</h2>
              <p className="rs-muted">You can also email {BIZ.events} or call {BIZ.phone}.</p>
              <EventsForm />
            </div>
            <div className="rs-faq">
              <h2>Events FAQ</h2>
              {FAQ.map((f) => (
                <details key={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
              <img src={img("pasta-penne")} alt="Penne in tomato sauce, one of our catering trays" loading="lazy" className="rs-faq-img" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

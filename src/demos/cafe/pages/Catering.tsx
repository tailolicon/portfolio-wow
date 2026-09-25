import { CalendarCheckIcon, TruckIcon, ClipboardTextIcon, PhoneIcon, EnvelopeSimpleIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useDemoForm } from "../../shared";
import { CATERING, CATERING_FAQ, LOCATIONS, BRAND } from "../data";
import { img, person, PageHero, SectionHead, Stars } from "../parts";
import type { PageProps } from "../parts";

const STEPS = [
  { icon: ClipboardTextIcon, title: "Send your request", text: "Tell us the date, headcount, and what you’re craving using the form below." },
  { icon: PhoneIcon, title: "We confirm within a business day", text: "Maya, who runs our catering, will call or email with a quote and any questions." },
  { icon: TruckIcon, title: "Pick it up or we deliver", text: "Everything comes labeled, with plates, napkins, cups, and stir sticks." },
];

function InquiryForm() {
  const { sent, onSubmit, reset } = useDemoForm();
  if (sent) {
    return (
      <div className="cf-form-done" role="status">
        <CheckCircleIcon size={36} aria-hidden="true" />
        <h3 className="cf-h3">Thanks, we have your request.</h3>
        <p>
          Maya will email you a quote within one business day. Need it sooner? Call the
          Downtown shop at {LOCATIONS[0].phone}.
        </p>
        <button className="cf-btn cf-btn--ghost" onClick={reset}>
          Send another request
        </button>
      </div>
    );
  }
  return (
    <form className="cf-form" onSubmit={onSubmit}>
      <div className="cf-field">
        <label htmlFor="cf-c-name">Your name</label>
        <input id="cf-c-name" required autoComplete="name" />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-org">Company or organization</label>
        <input id="cf-c-org" autoComplete="organization" />
        <small>Optional</small>
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-email">Email</label>
        <input id="cf-c-email" type="email" required autoComplete="email" />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-phone">Phone</label>
        <input id="cf-c-phone" type="tel" required autoComplete="tel" />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-date">Event date</label>
        <input id="cf-c-date" type="date" required />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-time">Ready by</label>
        <input id="cf-c-time" type="time" required defaultValue="08:30" />
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-guests">Number of guests</label>
        <input id="cf-c-guests" type="number" min={8} required />
        <small>Minimum 8 for boxed lunches, 10 for breakfast spreads</small>
      </div>
      <div className="cf-field">
        <label htmlFor="cf-c-how">Pickup or delivery</label>
        <select id="cf-c-how" defaultValue="delivery">
          <option value="delivery">Delivery (Asheville)</option>
          <option value="downtown">Pickup at Downtown</option>
          <option value="west">Pickup at West Asheville</option>
        </select>
      </div>
      <fieldset className="cf-field cf-field--full cf-checkset">
        <legend>What are you interested in?</legend>
        {CATERING.map((c) => (
          <label key={c.name}>
            <input type="checkbox" name="items" value={c.name} /> {c.name}
          </label>
        ))}
        <label>
          <input type="checkbox" name="items" value="Espresso bar" /> Mobile espresso bar
        </label>
      </fieldset>
      <div className="cf-field cf-field--full">
        <label htmlFor="cf-c-notes">Anything else? (address, dietary needs, budget)</label>
        <textarea id="cf-c-notes" rows={4} />
      </div>
      <div className="cf-field--full cf-form-foot">
        <button className="cf-btn cf-btn--primary" type="submit">
          Request a quote
        </button>
        <p className="cf-small">No payment needed now. We’ll confirm details and send an invoice.</p>
      </div>
    </form>
  );
}

export default function Catering({ link }: PageProps) {
  return (
    <>
      <PageHero
        title="Catering"
        lead="Coffee, pastries, and breakfast for staff meetings, showers, and wedding weekends. Pick up at either shop, or we deliver anywhere in Asheville."
        image="brunch-spread"
        alt="A breakfast spread with waffles, fruit, and juice"
      />

      <section className="cf-section cf-section--tight">
        <div className="cf-wrap cf-steps">
          {STEPS.map((s) => (
            <div key={s.title} className="cf-step">
              <span className="cf-step-icon">
                <s.icon size={26} aria-hidden="true" />
              </span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="cf-section cf-section--oat">
        <div className="cf-wrap">
          <SectionHead
            title="What we can bring"
            lead="Prices before tax and delivery. Not sure how much to order? Tell us your headcount and we’ll suggest quantities."
          />
          <div className="cf-cater-grid">
            {CATERING.map((c) => (
              <article key={c.name} className="cf-cater">
                <img src={img(c.image)} alt={c.alt} loading="lazy" />
                <div className="cf-cater-body">
                  <div className="cf-special-top">
                    <h3>{c.name}</h3>
                    <span className="cf-price">{c.price}</span>
                  </div>
                  <p className="cf-cater-serves">{c.serves}</p>
                  <p>{c.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="cf-small cf-center">
            Also available: a gallon of cold brew ($32), a hot chai box ($40), and whole bean gift bags from $17. See our{" "}
            <a {...link("menu")}>full menu</a>.
          </p>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap cf-office">
          <img src={img("notebook-table")} alt="Coffee and a notebook on a window table" loading="lazy" />
          <div>
            <h2 className="cf-h2">Standing orders for offices</h2>
            <p>
              Set up a weekly or monthly delivery and we’ll show up on schedule without a reminder. Standing orders get 10%
              off, net-30 invoicing, and first pick of delivery slots during the holidays.
            </p>
            <ul className="cf-checks">
              <li>
                <TruckIcon size={20} aria-hidden="true" /> Delivery Mon-Sat, 7am-1pm. $15, or free over $250
              </li>
              <li>
                <CalendarCheckIcon size={20} aria-hidden="true" /> 48 hours’ notice for most orders
              </li>
            </ul>
            <figure className="cf-quote">
              <Stars size={15} />
              <blockquote>
                “They’ve done our Monday staff meeting for two years. Always on time, coffee still hot, and the morning
                buns are gone in ten minutes.”
              </blockquote>
              <figcaption>
                <img src={person("woman-blazer")} alt="" loading="lazy" />
                <span>
                  <strong>Dana L.</strong> Office manager, Riverside Design Group, Google review
                </span>
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="cf-section cf-section--oat" id="inquiry">
        <div className="cf-wrap cf-inquiry">
          <div className="cf-inquiry-intro">
            <p className="cf-eyebrow">Catering inquiry</p>
            <h2 className="cf-h2">Tell us about your event</h2>
            <p>We’ll get back to you within one business day with a quote.</p>
            <div className="cf-aside-box">
              <h4>
                <CalendarCheckIcon size={18} aria-hidden="true" /> Lead time
              </h4>
              <p>
                48 hours for most orders. Coffee boxes and pastry platters: 24 hours when possible. Orders for 50+ guests:
                5 days.
              </p>
            </div>
            <div className="cf-aside-box">
              <h4>
                <PhoneIcon size={18} aria-hidden="true" /> Rather talk?
              </h4>
              <p>
                <a href={`tel:${LOCATIONS[0].phone.replace(/\D/g, "")}`}>{LOCATIONS[0].phone}</a>
                <br />
                <EnvelopeSimpleIcon size={16} aria-hidden="true" /> <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
              </p>
            </div>
          </div>
          <div className="cf-form-card">
            <InquiryForm />
          </div>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap cf-faq-wrap">
          <SectionHead title="Catering questions" />
          <div className="cf-faq">
            {CATERING_FAQ.map((f) => (
              <details key={f.q}>
                <summary>{f.q}</summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

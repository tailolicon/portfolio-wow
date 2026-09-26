import { useDemoForm } from "../../../demos/shared";
import { CONTACTS, OFFICES } from "../content";
import { SECTORS } from "../data";

/* Street plans drawn in the same line language as the project drawings. */
function LondonMap() {
  return (
    <svg viewBox="0 0 480 340" role="img" aria-label="Map of Hardwick Street, Clerkenwell">
      <rect width="480" height="340" className="oh-map-ground" />
      <g className="oh-map-block">
        <path d="M0 0 H150 L128 120 H0 Z" />
        <path d="M176 0 H330 L318 104 L160 124 Z" />
        <path d="M356 0 H480 V150 L344 128 Z" />
        <path d="M0 148 H122 L108 340 H0 Z" />
        <path d="M150 152 L312 132 L300 262 L140 280 Z" />
        <path d="M340 156 L480 178 V340 H320 Z" />
        <path d="M134 306 L296 290 L292 340 H132 Z" />
      </g>
      <rect x="226" y="176" width="56" height="44" className="oh-map-park" />
      <g className="oh-map-street-name">
        <text x="200" y="146" transform="rotate(-7 200 146)">Hardwick Street</text>
        <text x="330" y="250" transform="rotate(-84 330 250)">Rosebery Avenue</text>
        <text x="16" y="138">Amwell Street</text>
      </g>
      <rect x="300" y="100" width="14" height="14" className="oh-map-pin" />
    </svg>
  );
}

function LisbonMap() {
  return (
    <svg viewBox="0 0 480 340" role="img" aria-label="Map of Rua da Boavista, Santos">
      <rect width="480" height="340" className="oh-map-ground" />
      <g className="oh-map-block">
        <path d="M0 0 H200 L190 70 L0 92 Z" />
        <path d="M226 0 H480 V58 L216 72 Z" />
        <path d="M0 118 L188 96 L180 186 L0 204 Z" />
        <path d="M214 98 L480 84 V170 L206 186 Z" />
        <path d="M0 230 L176 212 L172 250 L0 262 Z" />
        <path d="M204 210 L480 196 V236 L200 252 Z" />
      </g>
      <path d="M0 290 C120 276 300 268 480 272 V340 H0 Z" className="oh-map-water" />
      <g className="oh-map-street-name">
        <text x="228" y="196" transform="rotate(-3 228 196)">Rua da Boavista</text>
        <text x="24" y="224" transform="rotate(-5 24 224)">Avenida 24 de Julho</text>
        <text x="330" y="316">Rio Tejo</text>
      </g>
      <rect x="384" y="170" width="14" height="14" className="oh-map-pin" />
    </svg>
  );
}

export default function Contact() {
  const { sent, onSubmit, reset } = useDemoForm();

  return (
    <div className="oh-contact">
      <header className="oh-wrap oh-page-head oh-page-head--split">
        <h1 className="oh-display">Contact</h1>
        <p className="oh-lead">
          We work from two studios, in Clerkenwell and in Santos. Visitors are welcome by appointment.
        </p>
      </header>

      <section className="oh-wrap oh-offices">
        {OFFICES.map((office) => (
          <div key={office.city} className="oh-office">
            <div className="oh-map">{office.city === "London" ? <LondonMap /> : <LisbonMap />}</div>
            <h2 className="oh-title">{office.city}</h2>
            <div className="oh-office-grid">
              <address>
                {office.lines.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </address>
              <div className="oh-office-links">
                <a className="oh-inline" href={`tel:${office.phone.replace(/\s/g, "")}`}>
                  {office.phone}
                </a>
                <a className="oh-inline" href={`mailto:${office.email}`}>
                  {office.email}
                </a>
              </div>
            </div>
            <p className="oh-small oh-mute">
              {office.hours}. {office.travel}.
            </p>
          </div>
        ))}
      </section>

      <section className="oh-section oh-wrap oh-direct">
        <h2 className="oh-title">Direct contacts</h2>
        <ul>
          {CONTACTS.map((contact) => (
            <li key={contact.topic}>
              <span className="oh-heading">{contact.topic}</span>
              <span>{contact.name}</span>
              <a className="oh-inline" href={`mailto:${contact.email}`}>
                {contact.email}
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section className="oh-section oh-wrap oh-enquiry" aria-labelledby="oh-enquiry-title">
        <div className="oh-enquiry-intro">
          <h2 className="oh-title" id="oh-enquiry-title">
            New project enquiry
          </h2>
          <p>
            A few lines are enough to start. Tell us where the site is, what you would like to build and roughly when.
            One of the directors will reply within two working days.
          </p>
        </div>

        {sent ? (
          <div className="oh-sent" role="status">
            <h3 className="oh-heading">Thank you, your enquiry has reached the studio.</h3>
            <p>Ruth Adebayo or one of the directors will reply within two working days.</p>
            <button type="button" className="oh-button oh-button--ghost" onClick={reset}>
              Send another enquiry
            </button>
          </div>
        ) : (
          <form className="oh-form" onSubmit={onSubmit}>
            <div className="oh-field">
              <label htmlFor="oh-name">Name</label>
              <input id="oh-name" name="name" autoComplete="name" required />
            </div>
            <div className="oh-field">
              <label htmlFor="oh-email">Email</label>
              <input id="oh-email" name="email" type="email" autoComplete="email" required />
            </div>
            <div className="oh-field">
              <label htmlFor="oh-org">Organisation</label>
              <input id="oh-org" name="organisation" autoComplete="organization" aria-describedby="oh-org-help" />
              <small id="oh-org-help">Optional. Leave blank for a private commission.</small>
            </div>
            <div className="oh-field">
              <label htmlFor="oh-type">Type of project</label>
              <select id="oh-type" name="type" defaultValue="">
                <option value="" disabled>
                  Choose one
                </option>
                {SECTORS.map((sector) => (
                  <option key={sector}>{sector}</option>
                ))}
                <option>Something else</option>
              </select>
            </div>
            <div className="oh-field oh-field--wide">
              <label htmlFor="oh-site">Site location</label>
              <input id="oh-site" name="site" placeholder="Town or postcode" />
            </div>
            <div className="oh-field oh-field--wide">
              <label htmlFor="oh-message">About the project</label>
              <textarea id="oh-message" name="message" rows={5} required aria-describedby="oh-message-help" />
              <small id="oh-message-help">Budget and timescale help us, if you know them.</small>
            </div>
            <div className="oh-form-foot">
              <button type="submit" className="oh-button">
                Send enquiry
              </button>
              <p className="oh-small oh-mute">We use your details only to reply to this enquiry.</p>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

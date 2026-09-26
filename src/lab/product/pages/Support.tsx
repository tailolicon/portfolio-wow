import { useState } from "react";
import {
  ArrowsClockwise,
  BatteryHigh,
  Bluetooth,
  ChatCircle,
  DeviceMobile,
  EnvelopeSimple,
  Headphones,
  MagnifyingGlass,
  Phone,
  Plus,
  Storefront,
  Waveform,
  Wrench,
} from "@phosphor-icons/react";
import { useDemoForm } from "../../../demos/shared";
import { FAQ, FIRMWARE, SETUP_STEPS, SUPPORT_TOPICS } from "../data";

const TOPIC_ICONS = [
  Headphones,
  Bluetooth,
  Waveform,
  BatteryHigh,
  DeviceMobile,
  ArrowsClockwise,
];

export default function Support() {
  const [query, setQuery] = useState("");
  const q = query.trim().toLowerCase();
  const faqs = q
    ? FAQ.filter((f) => (f.q + f.a).toLowerCase().includes(q))
    : FAQ;

  return (
    <div className="kv-support">
      <section className="kv-support-hero">
        <div className="kv-narrow">
          <h1>Kova One support</h1>
          <p className="kv-lead">
            Setup, answers, firmware and repairs. Real people in Copenhagen and
            New York.
          </p>
          <label className="kv-search">
            <MagnifyingGlass size={20} aria-hidden="true" />
            <span className="kv-visually-hidden">Search support</span>
            <input
              type="search"
              placeholder="Search, for example multipoint or reset"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </label>
        </div>
      </section>

      {!q && (
        <section className="kv-container kv-topics" aria-label="Topics">
          {SUPPORT_TOPICS.map((t, i) => {
            const Icon = TOPIC_ICONS[i];
            return (
              <a
                key={t.title}
                href="#faq"
                className="kv-topic"
                onClick={(e) => {
                  e.preventDefault();
                  document
                    .getElementById("kv-setup-title")
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                <Icon size={24} aria-hidden="true" />
                <strong>{t.title}</strong>
                <span>{t.detail}</span>
              </a>
            );
          })}
        </section>
      )}

      {!q && (
        <section
          className="kv-section kv-setup"
          aria-labelledby="kv-setup-title"
        >
          <div className="kv-container kv-setup-grid">
            <div>
              <h2 id="kv-setup-title" className="kv-h2">
                Set up Kova One
              </h2>
              <p className="kv-lead">
                About five minutes from box to first song.
              </p>
            </div>
            <ol className="kv-steps">
              {SETUP_STEPS.map((step) => (
                <li key={step.title}>
                  <h3>{step.title}</h3>
                  <p>{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      )}

      <section
        className="kv-section kv-faq"
        id="faq"
        aria-labelledby="kv-faq-title"
      >
        <div className="kv-narrow">
          <h2 id="kv-faq-title" className="kv-h2">
            {q ? `Results for "${query.trim()}"` : "Common questions"}
          </h2>
          {faqs.length === 0 ? (
            <p className="kv-faq-empty">
              Nothing matched. Try fewer words, or message us below and we will
              answer within a few hours.
            </p>
          ) : (
            <div className="kv-faq-list">
              {faqs.map((f) => (
                <details key={f.q} className="kv-faq-item">
                  <summary>
                    {f.q}
                    <Plus size={18} aria-hidden="true" />
                  </summary>
                  <p>{f.a}</p>
                </details>
              ))}
            </div>
          )}
        </div>
      </section>

      <section
        className="kv-section kv-service"
        aria-label="Firmware, warranty and repair"
      >
        <div className="kv-container kv-service-grid">
          <article className="kv-firmware" id="kv-firmware">
            <h2 className="kv-h3">Firmware {FIRMWARE.version}</h2>
            <p className="kv-muted">
              Released {FIRMWARE.date}. Installs automatically through the Kova
              app.
            </p>
            <ul>
              {FIRMWARE.notes.map((n) => (
                <li key={n}>{n}</li>
              ))}
            </ul>
            <h3>Earlier versions</h3>
            <dl>
              {FIRMWARE.previous.map((p) => (
                <div key={p.version}>
                  <dt>
                    {p.version} <span>{p.date}</span>
                  </dt>
                  <dd>{p.note}</dd>
                </div>
              ))}
            </dl>
          </article>
          <article className="kv-warranty" id="kv-warranty">
            <h2 className="kv-h3">Warranty and repair</h2>
            <p>
              Every Kova One is covered for 2 years against defects in materials
              and workmanship, in every country we sell. Kova Care+ extends that
              to 3 years and adds accidental damage.
            </p>
            <dl className="kv-repair-prices">
              <div>
                <dt>Ear cushions, pair</dt>
                <dd>$39</dd>
              </div>
              <div>
                <dt>Headband cover</dt>
                <dd>$29</dd>
              </div>
              <div>
                <dt>Battery service</dt>
                <dd>$59</dd>
              </div>
              <div>
                <dt>Out-of-warranty repair</dt>
                <dd>from $119</dd>
              </div>
            </dl>
            <RepairForm />
          </article>
        </div>
      </section>

      <section
        className="kv-section kv-contact"
        aria-labelledby="kv-contact-title"
      >
        <div className="kv-container">
          <h2 id="kv-contact-title" className="kv-h2">
            Talk to us
          </h2>
          <ul className="kv-contact-list">
            <li>
              <ChatCircle size={24} aria-hidden="true" />
              <strong>Chat</strong>
              <span>
                Every day, 8:00 to 22:00 ET. Average reply in 3 minutes.
              </span>
            </li>
            <li>
              <Phone size={24} aria-hidden="true" />
              <strong>+1 (212) 555-0147</strong>
              <span>Monday to Friday, 9:00 to 18:00 ET.</span>
            </li>
            <li>
              <EnvelopeSimple size={24} aria-hidden="true" />
              <strong>support@kova.audio</strong>
              <span>We answer within one business day.</span>
            </li>
            <li>
              <Storefront size={24} aria-hidden="true" />
              <strong>Kova Copenhagen</strong>
              <span>
                Store and service desk, Pilestraede 41, 1112 Copenhagen K.
              </span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
}

function RepairForm() {
  const { sent, onSubmit, reset } = useDemoForm();
  const [serial, setSerial] = useState("");
  const [touched, setTouched] = useState(false);
  const serialValid = /^KV1[A-Z0-9]{7}$/i.test(serial.trim());

  if (sent) {
    return (
      <div className="kv-form-done" role="status">
        <Wrench size={22} aria-hidden="true" />
        <div>
          <strong>Repair request KR-48213 received.</strong>
          <p>
            We have emailed a prepaid shipping label. Most repairs are back with
            you within 7 business days.
          </p>
          <button type="button" className="kv-link" onClick={reset}>
            Start another request
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      className="kv-form"
      onSubmit={(e) => {
        setTouched(true);
        if (!serialValid) {
          e.preventDefault();
          return;
        }
        onSubmit(e);
      }}
      noValidate
    >
      <h3>Request a repair</h3>
      <div className="kv-field">
        <label htmlFor="kv-serial">Serial number</label>
        <input
          id="kv-serial"
          value={serial}
          onChange={(e) => setSerial(e.target.value)}
          onBlur={() => setTouched(true)}
          placeholder="KV1A7Q2M9X"
          aria-describedby="kv-serial-help"
          aria-invalid={touched && !serialValid}
          autoComplete="off"
        />
        <p
          id="kv-serial-help"
          className={
            touched && !serialValid ? "kv-field-error" : "kv-field-help"
          }
        >
          {touched && !serialValid
            ? "Serial numbers start with KV1 and have 10 characters."
            : "Inside the left headband slider, or in the Kova app under About."}
        </p>
      </div>
      <div className="kv-field">
        <label htmlFor="kv-issue">What is happening?</label>
        <select id="kv-issue" defaultValue="battery">
          <option value="battery">Battery drains quickly</option>
          <option value="sound">No sound from one side</option>
          <option value="anc">Noise cancelling sounds wrong</option>
          <option value="physical">Physical damage</option>
          <option value="other">Something else</option>
        </select>
      </div>
      <div className="kv-field">
        <label htmlFor="kv-email">Email</label>
        <input
          id="kv-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
        />
      </div>
      <button type="submit" className="kv-btn">
        Request repair
      </button>
    </form>
  );
}

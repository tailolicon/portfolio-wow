import { useState } from "react";
import { useDemoForm } from "../../../demos/shared";
import { Arrow } from "../components";
import { DISCIPLINES } from "../projects";
import { BUDGETS, ROLES, STUDIO, TEAM, TIMELINES } from "../content";

export default function Contact() {
  const { sent, onSubmit } = useDemoForm();
  const [name, setName] = useState("");
  const lead = TEAM[0];

  return (
    <>
      <section className="wv-page-head wv-contact-head">
        <div className="wv-wrap">
          <h1 className="wv-page-title">Start a project</h1>
          <p className="wv-page-lead">
            Tell us a little about the company and what you need. A founder reads every brief and replies within two
            working days.
          </p>
        </div>
      </section>

      <section className="wv-section wv-contact">
        <div className="wv-wrap wv-contact-in">
          <div className="wv-form-wrap">
            {sent ? (
              <div className="wv-sent" role="status">
                <h2 className="wv-h2">Thanks{name ? `, ${name.split(" ")[0]}` : ""}. Your brief is with us.</h2>
                <p className="wv-body-l">
                  Ada or Marcus will reply within two working days, usually with a few questions and a time to talk.
                  If it's urgent, call the studio on {STUDIO.phone}.
                </p>
              </div>
            ) : (
              <form className="wv-form" onSubmit={onSubmit}>
                <div className="wv-form-row">
                  <div className="wv-field">
                    <label htmlFor="wv-name">Name</label>
                    <input id="wv-name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} />
                  </div>
                  <div className="wv-field">
                    <label htmlFor="wv-email">Work email</label>
                    <input id="wv-email" name="email" type="email" autoComplete="email" required />
                  </div>
                </div>
                <div className="wv-field">
                  <label htmlFor="wv-company">Company</label>
                  <input id="wv-company" name="company" autoComplete="organization" />
                  <p className="wv-help">And a link, if there's one we should look at.</p>
                </div>

                <fieldset className="wv-fieldset">
                  <legend>What do you need?</legend>
                  <div className="wv-checks">
                    {DISCIPLINES.map((d) => (
                      <label key={d} className="wv-check">
                        <input type="checkbox" name="services" value={d} />
                        <span>{d}</span>
                      </label>
                    ))}
                  </div>
                  <p className="wv-help">Choose as many as apply.</p>
                </fieldset>

                <fieldset className="wv-fieldset">
                  <legend>Budget</legend>
                  <div className="wv-checks">
                    {BUDGETS.map((b) => (
                      <label key={b} className="wv-check">
                        <input type="radio" name="budget" value={b} />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                  <p className="wv-help">Brand sprints start at $45,000. Full systems usually start at $140,000.</p>
                </fieldset>

                <div className="wv-field">
                  <label htmlFor="wv-timeline">Timeline</label>
                  <select id="wv-timeline" name="timeline" defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    {TIMELINES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div className="wv-field">
                  <label htmlFor="wv-message">About the project</label>
                  <textarea id="wv-message" name="message" rows={6} required />
                  <p className="wv-help">What's changing at the company, and why now? A few sentences is plenty.</p>
                </div>

                <div className="wv-form-foot">
                  <button type="submit" className="wv-btn wv-btn--primary">
                    Send brief <Arrow />
                  </button>
                  <p className="wv-help">We never share your brief outside the studio.</p>
                </div>
              </form>
            )}
          </div>

          <aside className="wv-contact-side">
            <div className="wv-contact-person">
              <img src={lead.img} alt={lead.name} loading="lazy" />
              <div>
                <p className="wv-contact-name">{lead.name}</p>
                <p className="wv-meta">{lead.role}. Reads every new brief.</p>
              </div>
            </div>

            <div className="wv-contact-block">
              <h2 className="wv-h3">New business</h2>
              <a className="wv-link" href={`mailto:${STUDIO.newBusiness}`}>{STUDIO.newBusiness}</a>
              <p>{STUDIO.phone}</p>
            </div>

            <div className="wv-contact-block">
              <h2 className="wv-h3">Studio</h2>
              <address>
                {STUDIO.street}
                <br />
                {STUDIO.city}
              </address>
              <p>{STUDIO.hours}</p>
              <p>Ten minutes from the York St F train. Visitors welcome by appointment.</p>
            </div>

            <div className="wv-contact-block" id="wv-careers">
              <h2 className="wv-h3">Careers</h2>
              <ul className="wv-roles">
                {ROLES.map((r) => (
                  <li key={r.title}>
                    <span>{r.title}</span>
                    <span className="wv-meta">{r.type}</span>
                  </li>
                ))}
              </ul>
              <a className="wv-link" href={`mailto:${STUDIO.careers}`}>{STUDIO.careers}</a>
            </div>

            <div className="wv-contact-block">
              <h2 className="wv-h3">Press</h2>
              <a className="wv-link" href={`mailto:${STUDIO.press}`}>{STUDIO.press}</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

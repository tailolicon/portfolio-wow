import { useState } from "react";
import { Car, Check, Clock, Drop, SneakerMove, Tote } from "@phosphor-icons/react";
import { useDemoForm } from "../../shared";
import { BIZ, FIRST_WEEK } from "../data";
import type { PageProps } from "../data";
import { GoogleSummary, SectionHead, W } from "../components";

const GOALS = [
  "Get stronger",
  "Lose body fat",
  "Build muscle",
  "Improve conditioning",
  "Move better, less pain",
  "Train for a sport or event",
];
const LEVELS = ["Brand new", "Some experience", "Lift regularly"];
const TIMES = [
  "Early morning (5:30 to 7:30am)",
  "Late morning (9am to noon)",
  "Lunch (12pm)",
  "Evening (4:30 to 7:15pm)",
  "Weekend mornings",
];

export default function Trial({ link }: PageProps) {
  const { sent, onSubmit } = useDemoForm();
  const [name, setName] = useState("");

  return (
    <>
      <section className="fx-trial">
        <div className="fx-wrap fx-trial-grid">
          <div className="fx-trial-intro">
            <h1 className="fx-phero-title">Start your free week</h1>
            <p className="fx-phero-text">
              Seven days of classes and open gym, plus a one-on-one intro with a coach. No card needed and nothing
              to cancel.
            </p>
            <ul className="fx-trial-list">
              <li>
                <Check size={20} weight={W} aria-hidden="true" /> 30-minute intro session and gym tour
              </li>
              <li>
                <Check size={20} weight={W} aria-hidden="true" /> Unlimited classes for 7 days, any level
              </li>
              <li>
                <Check size={20} weight={W} aria-hidden="true" /> Open gym, sauna and locker room access
              </li>
              <li>
                <Check size={20} weight={W} aria-hidden="true" /> A plan recommendation at the end, if you want one
              </li>
            </ul>
            <GoogleSummary />
          </div>

          <div className="fx-form-card">
            {sent ? (
              <div className="fx-sent" role="status">
                <h2 className="fx-h3">Thanks, {name.trim() || "friend"}. You're on the list.</h2>
                <p>
                  Someone from our team will text you within one business day to book your intro session. If you'd
                  rather talk now, call us at <a href={BIZ.phoneHref}>{BIZ.phone}</a>.
                </p>
                <a className="fx-textlink" {...link("classes")}>
                  Browse the class schedule
                </a>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="fx-form">
                <h2 className="fx-h3">Claim your free week</h2>
                <p className="fx-form-sub">Takes about a minute. We'll text you to set up your first visit.</p>
                <div className="fx-field-row">
                  <div className="fx-field">
                    <label htmlFor="fx-first">First name</label>
                    <input
                      id="fx-first"
                      name="first"
                      autoComplete="given-name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="fx-field">
                    <label htmlFor="fx-last">Last name</label>
                    <input id="fx-last" name="last" autoComplete="family-name" required />
                  </div>
                </div>
                <div className="fx-field-row">
                  <div className="fx-field">
                    <label htmlFor="fx-email">Email</label>
                    <input id="fx-email" name="email" type="email" autoComplete="email" required />
                  </div>
                  <div className="fx-field">
                    <label htmlFor="fx-phone">Mobile phone</label>
                    <input id="fx-phone" name="phone" type="tel" autoComplete="tel" required />
                    <small>We'll text to confirm your intro session.</small>
                  </div>
                </div>
                <div className="fx-field">
                  <label htmlFor="fx-goal">Main goal</label>
                  <select id="fx-goal" name="goal" required defaultValue="">
                    <option value="" disabled>
                      Choose one
                    </option>
                    {GOALS.map((g) => (
                      <option key={g}>{g}</option>
                    ))}
                  </select>
                </div>
                <fieldset className="fx-field">
                  <legend>Experience with strength training</legend>
                  <div className="fx-radios">
                    {LEVELS.map((l, i) => (
                      <label key={l} className="fx-radio">
                        <input type="radio" name="level" value={l} defaultChecked={i === 0} />
                        <span>{l}</span>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="fx-field">
                  <label htmlFor="fx-time">Best time for your first class</label>
                  <select id="fx-time" name="time" required defaultValue="">
                    <option value="" disabled>
                      Choose a time
                    </option>
                    {TIMES.map((t) => (
                      <option key={t}>{t}</option>
                    ))}
                  </select>
                </div>
                <div className="fx-field">
                  <label htmlFor="fx-notes">Injuries or anything we should know (optional)</label>
                  <textarea id="fx-notes" name="notes" rows={3} />
                </div>
                <button type="submit" className="fx-btn fx-btn--primary fx-btn--lg fx-btn--block">
                  Start your free week
                </button>
                <p className="fx-form-fine">
                  Free week is for Colorado residents 16+ who haven't trialed with us in the past 12 months. We never
                  share your details.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <section className="fx-section">
        <div className="fx-wrap fx-week">
          <SectionHead
            title="What your first week looks like"
            text="No one is thrown into a hard workout on day one. Here's how most free weeks go."
          />
          <ol className="fx-timeline">
            {FIRST_WEEK.map((d) => (
              <li key={d.when}>
                <p className="fx-timeline-when">{d.when}</p>
                <div>
                  <h3>{d.title}</h3>
                  <p>{d.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <SectionHead title="Before your first visit" />
          <ul className="fx-bring">
            <li>
              <SneakerMove size={26} weight={W} aria-hidden="true" />
              <h3>Wear</h3>
              <p>Clothes you can move in and flat-soled shoes. We have loaner lifting shoes if you're curious.</p>
            </li>
            <li>
              <Drop size={26} weight={W} aria-hidden="true" />
              <h3>Bring</h3>
              <p>A water bottle. Towels, chalk and all equipment are on us.</p>
            </li>
            <li>
              <Clock size={26} weight={W} aria-hidden="true" />
              <h3>Arrive</h3>
              <p>10 minutes early for your intro so we can sign a waiver and show you around.</p>
            </li>
            <li>
              <Car size={26} weight={W} aria-hidden="true" />
              <h3>Park</h3>
              <p>Free lot behind the building, entrance off 34th St. Bike racks by the front door.</p>
            </li>
            <li>
              <Tote size={26} weight={W} aria-hidden="true" />
              <h3>Change</h3>
              <p>Lockers and showers are open to you all week, so come straight from work.</p>
            </li>
          </ul>
          <p className="fx-bring-note">
            Questions before you come in? Call <a href={BIZ.phoneHref}>{BIZ.phone}</a> or email{" "}
            <a href={`mailto:${BIZ.email}`}>{BIZ.email}</a>. We're at {BIZ.street}, {BIZ.city}.
          </p>
        </div>
      </section>
    </>
  );
}

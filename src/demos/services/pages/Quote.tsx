import { useState } from "react";
import { Briefcase, Check, Phone, SealCheck, Siren } from "@phosphor-icons/react";
import { useDemoForm } from "../../shared";
import { BIZ } from "../data";
import { PageHero } from "../components";
import type { NavProps } from "../components";

const NEXT = [
  "A dispatcher reviews your request and calls within 15 minutes during business hours.",
  "We confirm a 2-hour arrival window that works for you.",
  "You get a text with your technician's photo and live ETA.",
  "Your tech diagnoses the issue and gives you flat-rate options before any work starts.",
];

const WINDOWS = ["8 to 10am", "10am to 12pm", "12 to 2pm", "2 to 4pm", "4 to 6pm", "First available"];

export default function Quote({ link }: NavProps) {
  const { sent, onSubmit, reset } = useDemoForm();
  const [first, setFirst] = useState("");
  const [emergency, setEmergency] = useState("no");

  return (
    <>
      <PageHero
        link={link}
        crumb="Get a quote"
        title="Book service or get a free estimate"
        text="Tell us what's going on and we'll get you on the schedule, usually the same day. Replacement estimates are free."
      />

      <section className="sv-section sv-pt-sm">
        <div className="sv-wrap sv-quote-grid">
          <div className="sv-quote-card">
            {sent ? (
              <div className="sv-sent sv-sent-lg" role="status">
                <SealCheck size={48} aria-hidden="true" />
                <h2>Thanks{first ? `, ${first}` : ""}. Your request is in.</h2>
                <p>
                  {emergency === "yes"
                    ? `Because this is an emergency, our on-call dispatcher will phone you within 10 minutes. If water is actively leaking, shut off your main valve and call ${BIZ.phone}.`
                    : "A Summit dispatcher will call you within 15 minutes (during office hours) to confirm your arrival window. You'll get a text confirmation too."}
                </p>
                <button type="button" className="sv-btn sv-btn-navy" onClick={reset}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="sv-quote-form">
                <fieldset>
                  <legend>What do you need?</legend>
                  <div className="sv-field-row">
                    <label className="sv-field">
                      <span>Service type</span>
                      <select required defaultValue="">
                        <option value="" disabled>Choose one</option>
                        <optgroup label="Plumbing">
                          <option>Leak / burst pipe</option>
                          <option>Clogged drain or sewer backup</option>
                          <option>Water heater / tankless</option>
                          <option>Repiping estimate</option>
                          <option>Water softener / filtration</option>
                          <option>Faucet, toilet or fixture</option>
                        </optgroup>
                        <optgroup label="Heating & cooling">
                          <option>AC not cooling / AC repair</option>
                          <option>New AC system estimate</option>
                          <option>AC tune-up ($79 special)</option>
                          <option>Heating repair</option>
                          <option>Ductwork / air quality</option>
                        </optgroup>
                        <option>Comfort Club membership</option>
                        <option>Other</option>
                      </select>
                    </label>
                    <div className="sv-field">
                      <span id="sv-emerg-l">Is this an emergency?</span>
                      <div className="sv-radio-row" role="radiogroup" aria-labelledby="sv-emerg-l">
                        <label className={`sv-radio${emergency === "yes" ? " sv-on sv-radio-hot" : ""}`}>
                          <input type="radio" name="emerg" value="yes" checked={emergency === "yes"} onChange={() => setEmergency("yes")} />
                          Yes, ASAP
                        </label>
                        <label className={`sv-radio${emergency === "no" ? " sv-on" : ""}`}>
                          <input type="radio" name="emerg" value="no" checked={emergency === "no"} onChange={() => setEmergency("no")} />
                          No, schedule it
                        </label>
                      </div>
                    </div>
                  </div>
                  {emergency === "yes" && (
                    <p className="sv-emerg-note">
                      <Siren size={18} aria-hidden="true" /> For the fastest response, please also call{" "}
                      <a href={BIZ.tel}>{BIZ.phone}</a>. If water is leaking, shut off the main valve.
                    </p>
                  )}
                  <label className="sv-field">
                    <span>Describe the problem</span>
                    <textarea rows={4} aria-describedby="sv-desc-help" />
                    <small id="sv-desc-help" className="sv-help">The age and brand of the unit helps us bring the right parts.</small>
                  </label>
                </fieldset>

                <fieldset>
                  <legend>Where and when?</legend>
                  <div className="sv-field-row sv-row-addr">
                    <label className="sv-field">
                      <span>Street address</span>
                      <input required autoComplete="street-address" />
                    </label>
                    <label className="sv-field">
                      <span>ZIP</span>
                      <input required inputMode="numeric" maxLength={5} autoComplete="postal-code" />
                    </label>
                  </div>
                  <div className="sv-field-row">
                    <label className="sv-field">
                      <span>Preferred date</span>
                      <input type="date" />
                    </label>
                    <label className="sv-field">
                      <span>Time window</span>
                      <select defaultValue="First available">
                        {WINDOWS.map((w) => <option key={w}>{w}</option>)}
                      </select>
                    </label>
                  </div>
                </fieldset>

                <fieldset>
                  <legend>How do we reach you?</legend>
                  <div className="sv-field-row">
                    <label className="sv-field">
                      <span>First name</span>
                      <input required autoComplete="given-name" value={first} onChange={(e) => setFirst(e.target.value)} />
                    </label>
                    <label className="sv-field">
                      <span>Last name</span>
                      <input required autoComplete="family-name" />
                    </label>
                  </div>
                  <div className="sv-field-row">
                    <label className="sv-field">
                      <span>Phone</span>
                      <input required type="tel" autoComplete="tel" />
                    </label>
                    <label className="sv-field">
                      <span>Email <em>(optional)</em></span>
                      <input type="email" autoComplete="email" />
                    </label>
                  </div>
                  <div className="sv-field-row">
                    <label className="sv-field">
                      <span>Do you own or rent?</span>
                      <select defaultValue="Own">
                        <option>Own</option>
                        <option>Rent</option>
                        <option>Property manager</option>
                      </select>
                    </label>
                    <label className="sv-field">
                      <span>How did you hear about us?</span>
                      <select defaultValue="">
                        <option value="">Select</option>
                        <option>Google</option>
                        <option>Friend or neighbor</option>
                        <option>Saw a Summit truck</option>
                        <option>Nextdoor</option>
                        <option>Repeat customer</option>
                      </select>
                    </label>
                  </div>
                  <label className="sv-check">
                    <input type="checkbox" defaultChecked /> Text me appointment updates
                  </label>
                </fieldset>

                <button type="submit" className="sv-btn sv-btn-orange sv-btn-lg sv-btn-block">
                  Request service
                </button>
                <p className="sv-form-fine">
                  By submitting, you agree to be contacted about your request. We never share your information.
                </p>
              </form>
            )}
          </div>

          <aside className="sv-quote-side">
            <div className="sv-emerg-box">
              <Siren size={30} aria-hidden="true" />
              <h2>Emergency? Call now</h2>
              <p>Burst pipe, gas smell, sewage backup or no AC in triple-digit heat. Don't wait for a callback.</p>
              <a href={BIZ.tel} className="sv-btn sv-btn-white sv-btn-block sv-btn-lg">
                <Phone size={20} /> {BIZ.phone}
              </a>
              <p className="sv-emerg-small">A live person answers 24 hours a day.</p>
            </div>

            <div className="sv-side-card">
              <h2>What happens next</h2>
              <ol className="sv-next">
                {NEXT.map((n, i) => (
                  <li key={n}>
                    <span>{i + 1}</span>
                    {n}
                  </li>
                ))}
              </ol>
            </div>

            <div className="sv-side-card">
              <h2>Every visit includes</h2>
              <ul className="sv-checks">
                {["Flat-rate price before work begins", "Background-checked technician", "Boot covers & clean-up", "1-year labor warranty", "$89 diagnostic credited to repair"].map((t) => (
                  <li key={t}><Check size={16} aria-hidden="true" /> {t}</li>
                ))}
              </ul>
            </div>

            <div className="sv-side-card sv-hiring" id="careers">
              <Briefcase size={22} aria-hidden="true" />
              <h2>We're hiring technicians</h2>
              <p>
                Service plumbers, HVAC techs and apprentices: paid training, company truck, 401(k) match and no on-call
                nights more than once a month. Email <a href="mailto:careers@summitplumbingair.com">careers@summitplumbingair.com</a>.
              </p>
              <a {...link("home")} className="sv-textlink">Meet our team</a>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

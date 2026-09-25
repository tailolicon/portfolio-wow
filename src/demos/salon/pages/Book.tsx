import { useMemo, useState } from "react";
import { CalendarBlank, Check, Clock, UsersThree, MapPin, Phone, CreditCard, User } from "@phosphor-icons/react";
import { useDemoForm, demoImg } from "../../shared";
import { BIZ, MENU, POLICIES, STYLISTS, LEVELS } from "../data";
import type { BookPrefill, PageProps } from "../types";

const CONSULT = "Complimentary Consultation";

function isoDate(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

function firstOpenDay() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (d.getDay() === 0 || d.getDay() === 1) d.setDate(d.getDate() + 1);
  return isoDate(d);
}

function slotsFor(date: string) {
  const d = new Date(`${date}T12:00:00`);
  const dow = d.getDay();
  if (Number.isNaN(dow) || dow === 0 || dow === 1) return [];
  const [start, end] = dow === 6 ? [8, 15] : dow === 5 ? [9, 17] : [9, 18];
  const seed = date.split("-").reduce((a, n) => a + Number(n), 0);
  const out: { label: string; taken: boolean }[] = [];
  for (let h = start; h < end; h++) {
    for (const min of [0, 30]) {
      if (h === end - 1 && min === 30) continue;
      const hr = h > 12 ? h - 12 : h;
      const label = `${hr}:${min === 0 ? "00" : "30"} ${h >= 12 ? "pm" : "am"}`;
      out.push({ label, taken: (h * 7 + min + seed) % 5 === 0 || (h + seed) % 6 === 0 });
    }
  }
  return out;
}

function findService(name: string) {
  for (const g of MENU) {
    const it = g.items.find((i) => i.name === name);
    if (it) return it;
  }
  return undefined;
}

export function BookPage({ prefill }: PageProps & { prefill: BookPrefill }) {
  const { sent, onSubmit, reset } = useDemoForm();
  const [service, setService] = useState(prefill.service === "Consultation" ? CONSULT : prefill.service ?? "");
  const [stylist, setStylist] = useState(prefill.stylist ?? "any");
  const [date, setDate] = useState(firstOpenDay);
  const [time, setTime] = useState("");
  const [firstVisit, setFirstVisit] = useState(false);
  const [name, setName] = useState("");

  const slots = useMemo(() => slotsFor(date), [date]);
  const chosen = STYLISTS.find((s) => s.id === stylist);
  const item = findService(service);
  const levelIdx = chosen ? LEVELS.findIndex((l) => l.name === chosen.level) : 0;
  const price = service === CONSULT ? "Free" : item ? item.prices[levelIdx] || "Not offered at this level" : "Select a service";
  const prettyDate = date
    ? new Date(`${date}T12:00:00`).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
    : "";
  const closed = slots.length === 0;

  if (sent) {
    return (
      <section className="sl-section">
        <div className="sl-wrap sl-confirm">
          <span className="sl-confirm-icon">
            <Check size={30} aria-hidden="true" />
          </span>
          <h1 className="sl-h2">Thanks, {name.split(" ")[0] || "see you soon"}. You're booked.</h1>
          <p>
            We've reserved <strong>{service || "your appointment"}</strong>
            {chosen ? ` with ${chosen.first}` : ""} on <strong>{prettyDate}</strong>
            {time ? ` at ${time}` : ""}. You'll get a confirmation text and email in a few minutes,
            and a reminder two days before.
          </p>
          {firstVisit && <p className="sl-muted">We've noted your 20% new guest color discount.</p>}
          <button type="button" className="sl-btn sl-btn--ghost" onClick={reset}>
            Book another appointment
          </button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="sl-pagehero sl-pagehero--compact">
        <div className="sl-wrap">
          <h1 className="sl-h1 sl-h1--page">Book online</h1>
          <p className="sl-lead">
            Pick a service, stylist and time. Rather talk it through? Call or text{" "}
            <a href={`tel:${BIZ.tel}`}>{BIZ.phone}</a>.
          </p>
        </div>
      </section>

      <section className="sl-section sl-section--tight">
        <div className="sl-wrap sl-book">
          <form className="sl-widget" onSubmit={onSubmit}>
            <fieldset className="sl-step">
              <legend>Service</legend>
              <label className="sl-field">
                <span>Select a service</span>
                <select required value={service} onChange={(e) => setService(e.target.value)}>
                  <option value="" disabled>Choose a service…</option>
                  <optgroup label="Consultations">
                    <option value={CONSULT}>{CONSULT} (15 to 30 min)</option>
                  </optgroup>
                  {MENU.map((g) => (
                    <optgroup key={g.id} label={g.title}>
                      {g.items.map((i) => (
                        <option key={i.name} value={i.name}>
                          {i.name} ({i.time})
                        </option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </label>
            </fieldset>

            <fieldset className="sl-step">
              <legend>Stylist</legend>
              <div className="sl-pick" role="radiogroup" aria-label="Choose a stylist">
                <button type="button" role="radio" aria-checked={stylist === "any"} className="sl-pick-item" onClick={() => setStylist("any")}>
                  <span className="sl-pick-any"><User size={20} aria-hidden="true" /></span>
                  <span><strong>No preference</strong><small>First available</small></span>
                </button>
                {STYLISTS.map((s) => (
                  <button key={s.id} type="button" role="radio" aria-checked={stylist === s.id} className="sl-pick-item" onClick={() => setStylist(s.id)}>
                    <img src={demoImg(s.img.folder, s.img.name)} alt="" style={s.img.pos ? { objectPosition: s.img.pos } : undefined} />
                    <span><strong>{s.first}</strong><small>{s.level}</small></span>
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset className="sl-step">
              <legend>Date and time</legend>
              <label className="sl-field sl-field--date">
                <span>Preferred date</span>
                <input type="date" required value={date} min={isoDate(new Date())} onChange={(e) => { setDate(e.target.value); setTime(""); }} />
              </label>
              {closed ? (
                <p className="sl-closed-note">We're closed on Sundays and Mondays. Please pick a day from Tuesday to Saturday.</p>
              ) : (
                <div className="sl-slots" role="radiogroup" aria-label="Available times">
                  {slots.map((s) => (
                    <button
                      key={s.label}
                      type="button"
                      role="radio"
                      aria-checked={time === s.label}
                      disabled={s.taken}
                      className="sl-slot"
                      onClick={() => setTime(s.label)}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              )}
            </fieldset>

            <fieldset className="sl-step">
              <legend>Your details</legend>
              <label className="sl-check">
                <input type="checkbox" checked={firstVisit} onChange={(e) => setFirstVisit(e.target.checked)} />
                <span>This is my first visit to Ivy &amp; Oak <em>(20% off your first color service)</em></span>
              </label>
              <div className="sl-fields">
                <label className="sl-field">
                  <span>Full name</span>
                  <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label className="sl-field">
                  <span>Mobile phone</span>
                  <input required type="tel" autoComplete="tel" aria-describedby="sl-phone-help" />
                  <small id="sl-phone-help" className="sl-help">We text confirmations and reminders here.</small>
                </label>
                <label className="sl-field sl-field--wide">
                  <span>Email</span>
                  <input required type="email" autoComplete="email" />
                </label>
                <label className="sl-field sl-field--wide">
                  <span>Notes for your stylist <small>(optional)</small></span>
                  <textarea rows={3} aria-describedby="sl-notes-help" />
                  <small id="sl-notes-help" className="sl-help">Color history, box dye, inspiration, anything we should know.</small>
                </label>
              </div>
            </fieldset>

            <div className="sl-widget-foot">
              <p className="sl-muted">
                <CreditCard size={16} aria-hidden="true" /> Nothing to pay today. We only take a
                card for extension and bridal deposits.
              </p>
              <button type="submit" className="sl-btn" disabled={closed || !time}>
                Confirm booking
              </button>
            </div>
          </form>

          <aside className="sl-book-side">
            <div className="sl-summary">
              <h2 className="sl-h3">Appointment summary</h2>
              <dl>
                <div><dt>Service</dt><dd>{service || "Not selected"}</dd></div>
                <div><dt>Stylist</dt><dd>{chosen ? `${chosen.name} · ${chosen.level}` : "No preference"}</dd></div>
                <div><dt><CalendarBlank size={15} aria-hidden="true" /> Date</dt><dd>{closed ? "Pick a day" : prettyDate}</dd></div>
                <div><dt><Clock size={15} aria-hidden="true" /> Time</dt><dd>{time || "Pick a time"}</dd></div>
                <div className="sl-summary-total">
                  <dt>Starting at</dt>
                  <dd>{price}{item && firstVisit && ["color", "blonde"].some((g) => MENU.find((m) => m.id === g)?.items.includes(item)) ? " · 20% off" : ""}</dd>
                </div>
              </dl>
              <p className="sl-muted">
                <MapPin size={16} aria-hidden="true" /> {BIZ.street}, Scottsdale
              </p>
            </div>

            <div className="sl-policies">
              <h2 className="sl-h3">Booking policies</h2>
              {POLICIES.map((p) => (
                <div key={p.title} className="sl-policy">
                  <h3>{p.title}</h3>
                  <p>{p.text}</p>
                </div>
              ))}
            </div>

            <div className="sl-side-help">
              <UsersThree size={22} aria-hidden="true" />
              <p>
                Booking for a group or a wedding party? Call or text{" "}
                <a href={`tel:${BIZ.tel}`}><Phone size={14} aria-hidden="true" /> {BIZ.phone}</a> and our events
                coordinator will set it up.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

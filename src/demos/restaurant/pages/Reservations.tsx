import { useState } from "react";
import { CalendarBlank, CalendarCheck, Clock, Phone, Sun, Timer, UsersThree } from "@phosphor-icons/react";
import { useDemoForm } from "../../shared";
import { BIZ, img } from "../data";
import type { PageProps } from "../data";
import { PageHero } from "../parts";

const TIMES = ["5:00 pm", "5:30 pm", "6:00 pm", "6:30 pm", "7:00 pm", "7:30 pm", "8:00 pm", "8:30 pm", "9:00 pm"];
const FULL = new Set(["7:00 pm", "7:30 pm"]);
const PARTY = ["1", "2", "3", "4", "5", "6"];
const OCCASIONS = ["None", "Birthday", "Anniversary", "Date night", "Business dinner", "Celebration", "Sunday family supper"];

const POLICIES = [
  { icon: UsersThree, title: "Parties of 7 or more", text: `Call us at ${BIZ.phone} or send a private events inquiry. Larger groups sit family-style, and an 18% service charge applies.` },
  { icon: Timer, title: "15-minute grace period", text: "We hold tables for 15 minutes past the reservation time. Running late? Give us a call and we'll do our best." },
  { icon: Sun, title: "Patio seating", text: "Our covered, heated patio is dog-friendly. Patio requests are honored when weather and availability allow." },
  { icon: CalendarBlank, title: "Changes and cancellations", text: "Please let us know at least 4 hours ahead. Reservations open 30 days in advance; walk-ins are always welcome at the bar." },
];

function nextDate() {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  if (d.getDay() === 1) d.setDate(d.getDate() + 1);
  return d.toISOString().slice(0, 10);
}

function formatDate(value: string) {
  const d = new Date(`${value}T12:00:00`);
  return d.toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" });
}

export default function Reservations({ link }: PageProps) {
  const { sent, onSubmit, reset } = useDemoForm();
  const [party, setParty] = useState("2");
  const [date, setDate] = useState(nextDate);
  const [time, setTime] = useState("6:30 pm");
  const [name, setName] = useState("");
  const [seating, setSeating] = useState("No preference");

  const isMonday = new Date(`${date}T12:00:00`).getDay() === 1;

  return (
    <>
      <PageHero image={img("interior-3")} title="Reserve a table" pos="center 55%">
        Book up to 30 days ahead for parties of up to six. For seven or more, please call us.
      </PageHero>

      <section className="rs-section">
        <div className="rs-wrap rs-book-layout">
          <div className="rs-book">
            <div className="rs-book-head">
              <CalendarCheck size={22} aria-hidden />
              <div>
                <h2>Nonna Rosa Trattoria</h2>
                <p>{BIZ.street}, Austin. Italian, $$</p>
              </div>
            </div>

            {sent ? (
              <div className="rs-book-done" role="status">
                <h3>You're booked, {name.split(" ")[0] || "see you soon"}.</h3>
                <p>
                  Table for {party} on <strong>{formatDate(date)}</strong> at <strong>{time}</strong>
                  {seating !== "No preference" ? `, ${seating.toLowerCase()} seating requested` : ""}.
                </p>
                <p>We've sent a confirmation by email and text. Your table is held for 15 minutes past your time.</p>
                <button type="button" className="rs-btn rs-btn-outline" onClick={reset}>Make another reservation</button>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="rs-book-form">
                <div className="rs-book-row">
                  <label className="rs-field">
                    <span>Party size</span>
                    <select value={party} onChange={(e) => setParty(e.target.value)}>
                      {PARTY.map((p) => (
                        <option key={p} value={p}>{p} {p === "1" ? "guest" : "guests"}</option>
                      ))}
                      <option value="7+" disabled>7+ guests, please call</option>
                    </select>
                  </label>
                  <label className="rs-field">
                    <span>Date</span>
                    <input type="date" required value={date} onChange={(e) => setDate(e.target.value)} />
                  </label>
                  <label className="rs-field">
                    <span>Seating</span>
                    <select value={seating} onChange={(e) => setSeating(e.target.value)}>
                      <option>No preference</option>
                      <option>Dining room</option>
                      <option>Patio</option>
                      <option>Bar</option>
                    </select>
                  </label>
                </div>

                <fieldset className="rs-times">
                  <legend><Clock size={18} aria-hidden /> Select a time</legend>
                  {isMonday ? (
                    <p className="rs-book-closed">We're closed on Mondays. Please choose another date.</p>
                  ) : (
                    <div className="rs-time-grid">
                      {TIMES.map((t) => (
                        <button
                          key={t}
                          type="button"
                          disabled={FULL.has(t)}
                          className={time === t ? "is-active" : ""}
                          aria-pressed={time === t}
                          onClick={() => setTime(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                  <p className="rs-hint">Greyed-out times are fully booked. Bar and patio walk-ins are welcome.</p>
                </fieldset>

                <h3 className="rs-book-sub">Your details</h3>
                <div className="rs-book-row rs-book-row-2">
                  <label className="rs-field">
                    <span>Full name</span>
                    <input required autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />
                  </label>
                  <label className="rs-field">
                    <span>Phone</span>
                    <input required type="tel" autoComplete="tel" />
                    <small>We text a confirmation to this number.</small>
                  </label>
                  <label className="rs-field">
                    <span>Email</span>
                    <input required type="email" autoComplete="email" />
                  </label>
                  <label className="rs-field">
                    <span>Occasion</span>
                    <select defaultValue="None">
                      {OCCASIONS.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                </div>
                <label className="rs-field">
                  <span>Special requests <em>(optional)</em></span>
                  <textarea rows={3} />
                  <small>Allergies, a high chair, step-free seating, a candle in the tiramisù.</small>
                </label>
                <label className="rs-check">
                  <input type="checkbox" defaultChecked />
                  <span>Text me a reminder the day of my reservation</span>
                </label>
                {!isMonday && (
                  <p className="rs-book-summary">
                    Table for {party}, {formatDate(date)} at {time}
                  </p>
                )}
                <button type="submit" className="rs-btn rs-btn-primary rs-btn-lg rs-btn-block" disabled={isMonday}>
                  Reserve a table
                </button>
                <p className="rs-hint rs-center">By booking you agree to our 15-minute grace period and cancellation policy.</p>
              </form>
            )}
          </div>

          <aside className="rs-book-aside">
            <div className="rs-aside-card rs-aside-accent">
              <h2>Parties of 7 or more</h2>
              <p>Call us and we'll set up a family-style table, or book the Cantina room for up to 40 guests.</p>
              <a className="rs-btn rs-btn-light rs-btn-block" href={`tel:${BIZ.tel}`}><Phone size={18} aria-hidden /> {BIZ.phone}</a>
              <a className="rs-textlink rs-textlink-light" {...link("contact")}>Send a private events inquiry</a>
            </div>
            <div className="rs-aside-card">
              <h2>Good to know</h2>
              <ul className="rs-policies">
                {POLICIES.map((p) => (
                  <li key={p.title}>
                    <p.icon size={20} aria-hidden />
                    <div><strong>{p.title}</strong><p>{p.text}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <img className="rs-aside-img" src={img("fine-table")} alt="A table set for dinner with wine glasses" loading="lazy" />
          </aside>
        </div>
      </section>
    </>
  );
}

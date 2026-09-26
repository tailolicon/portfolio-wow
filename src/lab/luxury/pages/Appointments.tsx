import { useState } from "react";
import { Storefront, VideoCamera } from "@phosphor-icons/react";
import { useDemoForm } from "../../../demos/shared";
import { ThreeCanvas } from "../../shared";
import { PRODUCTS, img, productBySlug } from "../data";
import { BOUTIQUES } from "../data-maison";
import type { SiteApi } from "../ui";
import { Horizon } from "./Home";

const OCCASIONS = ["Engagement", "Wedding bands", "Anniversary", "A gift", "For myself", "Care or repair"];
const INTERESTS = ["Rings", "Necklaces", "Earrings", "Bracelets", "Pearls", "A commission"];
const TIMES = ["10:30", "11:30", "12:30", "14:00", "15:00", "16:00", "17:00"];

const nextDays = () => {
  const out: { value: string; day: string; date: string }[] = [];
  const d = new Date(2026, 9, 5);
  while (out.length < 6) {
    if (d.getDay() !== 0) {
      out.push({
        value: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-US", { weekday: "short" }),
        date: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
};
const DAYS = nextDays();

export default function Appointments({ site, interest }: { site: SiteApi; interest?: string }) {
  const { sent, onSubmit, reset } = useDemoForm();
  const [mode, setMode] = useState<"boutique" | "video">("boutique");
  const [boutique, setBoutique] = useState("paris");
  const [day, setDay] = useState(DAYS[1].value);
  const [time, setTime] = useState("15:00");
  const [occasion, setOccasion] = useState("");
  const [picked, setPicked] = useState<string[]>([]);
  const piece = interest ? productBySlug(interest) : undefined;

  const toggle = (item: string) =>
    setPicked((list) => (list.includes(item) ? list.filter((x) => x !== item) : [...list, item]));
  const place = BOUTIQUES.find((b) => b.id === boutique) ?? BOUTIQUES[0];
  const chosenDay = DAYS.find((d) => d.value === day) ?? DAYS[0];

  return (
    <>
      <section className="lx-appt-head">
        <div className="lx-appt-bg">
          <ThreeCanvas fallback={<div className="lx-signature-fallback" />}>
            <Horizon speed={0.2} glow={0.42} hue={20} vignette={1.1} waveScale={0.75} variation={0.6} />
          </ThreeCanvas>
        </div>
        <div className="lx-container lx-appt-head-inner">
          <h1 className="lx-display-xl lx-rise">A private viewing</h1>
          <p className="lx-lead lx-rise lx-rise-2">
            One hour with an adviser, in a boutique salon or by video from the atelier. There is never an
            obligation to buy.
          </p>
        </div>
      </section>

      <section className="lx-section lx-section--form">
        <div className="lx-container lx-appt">
          {sent ? (
            <div className="lx-confirm" role="status">
              <h2 className="lx-display-l">Your viewing is requested</h2>
              <p>
                {mode === "video" ? "Video consultation" : place.city + ", " + place.name}, {chosenDay.day}{" "}
                {chosenDay.date} at {time}. An adviser will confirm by email within one business day and prepare
                the pieces you chose.
              </p>
              <div className="lx-actions">
                <button type="button" className="lx-btn" onClick={() => site.openCollections()}>
                  Discover the collections
                </button>
                <button type="button" className="lx-link lx-link-btn" onClick={reset}>
                  Change the request
                </button>
              </div>
            </div>
          ) : (
            <form className="lx-form" onSubmit={onSubmit}>
              <fieldset className="lx-option">
                <legend>How would you like to meet?</legend>
                <div className="lx-mode">
                  <button type="button" className="lx-mode-btn" aria-pressed={mode === "boutique"} onClick={() => setMode("boutique")}>
                    <Storefront size={22} weight="light" />
                    <span>
                      <strong>In a boutique</strong>
                      <span className="lx-muted">Paris, New York or Tokyo</span>
                    </span>
                  </button>
                  <button type="button" className="lx-mode-btn" aria-pressed={mode === "video"} onClick={() => setMode("video")}>
                    <VideoCamera size={22} weight="light" />
                    <span>
                      <strong>By video</strong>
                      <span className="lx-muted">From the Paris atelier, 45 minutes</span>
                    </span>
                  </button>
                </div>
              </fieldset>

              {mode === "boutique" ? (
                <div className="lx-field">
                  <label htmlFor="lx-boutique">Boutique</label>
                  <select id="lx-boutique" value={boutique} onChange={(e) => setBoutique(e.target.value)}>
                    {BOUTIQUES.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.city}, {b.name}
                      </option>
                    ))}
                  </select>
                </div>
              ) : null}

              <fieldset className="lx-option">
                <legend>Date</legend>
                <div className="lx-days">
                  {DAYS.map((d) => (
                    <button key={d.value} type="button" className="lx-day" aria-pressed={day === d.value} onClick={() => setDay(d.value)}>
                      <span>{d.day}</span>
                      <strong>{d.date}</strong>
                    </button>
                  ))}
                </div>
              </fieldset>

              <fieldset className="lx-option">
                <legend>
                  Time <span className="lx-muted">{mode === "video" ? "Paris time" : place.city + " time"}</span>
                </legend>
                <div className="lx-choices">
                  {TIMES.map((t) => (
                    <button key={t} type="button" className="lx-choice lx-choice--size" aria-pressed={time === t} onClick={() => setTime(t)}>
                      {t}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="lx-field">
                <label htmlFor="lx-occasion">Occasion</label>
                <select id="lx-occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)} required>
                  <option value="" disabled>
                    Choose an occasion
                  </option>
                  {OCCASIONS.map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
              </div>

              <fieldset className="lx-option">
                <legend>Pieces of interest</legend>
                {piece ? (
                  <div className="lx-interest">
                    <img src={img(piece.image)} alt="" />
                    <span>
                      <strong>{piece.name}</strong>
                      <span className="lx-muted">Reserved for your viewing</span>
                    </span>
                  </div>
                ) : null}
                <div className="lx-choices">
                  {INTERESTS.map((i) => (
                    <button key={i} type="button" className="lx-choice" aria-pressed={picked.includes(i)} onClick={() => toggle(i)}>
                      {i}
                    </button>
                  ))}
                </div>
              </fieldset>

              <div className="lx-form-row">
                <div className="lx-field">
                  <label htmlFor="lx-name">Full name</label>
                  <input id="lx-name" required autoComplete="name" />
                </div>
                <div className="lx-field">
                  <label htmlFor="lx-email">Email</label>
                  <input id="lx-email" type="email" required autoComplete="email" />
                  <p className="lx-help">We send your confirmation here.</p>
                </div>
              </div>
              <div className="lx-field">
                <label htmlFor="lx-phone">Phone (optional)</label>
                <input id="lx-phone" type="tel" autoComplete="tel" />
              </div>
              <div className="lx-field">
                <label htmlFor="lx-notes">Anything we should prepare?</label>
                <textarea id="lx-notes" rows={3} placeholder="Ring size, budget, a piece you saw online" />
              </div>
              <button type="submit" className="lx-btn">
                Request appointment
              </button>
            </form>
          )}

          <aside className="lx-appt-aside" aria-label="What to expect">
            <h2 className="lx-display-m">What to expect</h2>
            <ul>
              <li>Up to eight pieces prepared in advance, including pieces not shown online.</li>
              <li>Diamonds compared side by side under daylight and boutique light.</li>
              <li>Sizing, engraving and delivery arranged on the spot.</li>
              <li>{PRODUCTS.length} pieces online, around 340 across our three boutiques.</li>
            </ul>
            <p className="lx-muted">
              Prefer to talk first? Call client services on +1 (212) 555-0147, Monday to Saturday.
            </p>
          </aside>
        </div>
      </section>

      <section className="lx-section lx-stone" aria-labelledby="lx-boutiques">
        <div className="lx-container">
          <h2 id="lx-boutiques" className="lx-display-l lx-boutiques-title">
            Our boutiques
          </h2>
          <div className="lx-boutiques">
            {BOUTIQUES.map((b) => (
              <article key={b.id} className="lx-boutique">
                <div className="lx-boutique-media">
                  <img src={img(b.image)} alt={b.alt} loading="lazy" />
                </div>
                <h3>{b.city}</h3>
                <p className="lx-boutique-name">{b.name}</p>
                <address>
                  {b.address.map((line) => (
                    <span key={line}>{line}</span>
                  ))}
                </address>
                <p>
                  {b.hours.map((h) => (
                    <span key={h} className="lx-block">
                      {h}
                    </span>
                  ))}
                </p>
                <p>{b.phone}</p>
                <p className="lx-muted">{b.note}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

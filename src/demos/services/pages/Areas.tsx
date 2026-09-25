import { useState } from "react";
import type { FormEvent } from "react";
import { CheckCircle, Clock, MagnifyingGlass, MapPin, Phone, Truck, Warning } from "@phosphor-icons/react";
import { BIZ, CITIES, HOURS } from "../data";
import { PageHero, SectionHead } from "../components";
import type { NavProps } from "../components";

type ZipResult = { status: "in"; city: string } | { status: "out" } | { status: "invalid" } | null;

function ZipCheck({ go }: Pick<NavProps, "go">) {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<ZipResult>(null);

  const check = (e: FormEvent) => {
    e.preventDefault();
    const z = zip.trim();
    if (!/^\d{5}$/.test(z)) {
      setResult({ status: "invalid" });
      return;
    }
    const city = CITIES.find((c) => c.zips.includes(z));
    setResult(city ? { status: "in", city: city.name } : { status: "out" });
  };

  return (
    <div className="sv-zip">
      <h2>Check your ZIP code</h2>
      <form className="sv-zip-form" onSubmit={check}>
        <label className="sv-field sv-zip-field" htmlFor="sv-zip-input">
          <span>Your 5-digit ZIP</span>
          <input
            id="sv-zip-input"
            inputMode="numeric"
            maxLength={5}
            value={zip}
            onChange={(e) => setZip(e.target.value.replace(/\D/g, ""))}
          />
        </label>
        <button type="submit" className="sv-btn sv-btn-orange">
          <MagnifyingGlass size={18} /> Check ZIP
        </button>
      </form>
      <div aria-live="polite">
        {result?.status === "in" && (
          <p className="sv-zip-res sv-zip-ok">
            <CheckCircle size={20} aria-hidden="true" />
            <span>
              Yes, we cover {zip} in {result.city}. Same-day appointments, no trip charge.{" "}
              <button type="button" className="sv-linkbtn" onClick={() => go("quote")}>Book service</button>
            </span>
          </p>
        )}
        {result?.status === "out" && (
          <p className="sv-zip-res sv-zip-warn">
            <Warning size={20} aria-hidden="true" />
            <span>
              {zip} is just outside our regular routes, but we may still be able to help. Call{" "}
              <a href={BIZ.tel}>{BIZ.phone}</a> and we'll check today's schedule.
            </span>
          </p>
        )}
        {result?.status === "invalid" && (
          <p className="sv-zip-res sv-zip-warn">
            <Warning size={20} aria-hidden="true" /> <span>Please enter a 5-digit ZIP code.</span>
          </p>
        )}
      </div>
    </div>
  );
}

export default function Areas({ go, link }: NavProps) {
  return (
    <>
      <PageHero
        link={link}
        crumb="Service areas"
        title="Serving Mesa and the East Valley"
        text="Our techs take their trucks home at night all over the East Valley, so someone is usually less than 40 minutes from you."
      >
        <ZipCheck go={go} />
      </PageHero>

      <section className="sv-section">
        <div className="sv-wrap">
          <SectionHead title="Cities we serve">
            No trip charge anywhere on this list, and same-day appointments in every city.
          </SectionHead>
          <div className="sv-city-grid">
            {CITIES.map((c) => (
              <article className="sv-city" key={c.name}>
                <div className="sv-city-top">
                  <MapPin size={20} aria-hidden="true" />
                  <h3>{c.name}, AZ</h3>
                </div>
                <p className="sv-city-note">{c.note}</p>
                <p className="sv-city-zips">
                  <span>ZIPs:</span> {c.zips.join(", ")}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sv-section sv-gray">
        <div className="sv-wrap sv-map-grid">
          <div className="sv-map">
            <iframe
              title="Map of Summit Plumbing & Air office in Mesa, AZ"
              loading="lazy"
              src="https://maps.google.com/maps?q=1450%20W%20Southern%20Ave%2C%20Mesa%2C%20AZ%2085202&z=11&output=embed"
            />
          </div>
          <div className="sv-office">
            <h2>Our Mesa shop</h2>
            <ul className="sv-office-list">
              <li><MapPin size={18} aria-hidden="true" /> <span>{BIZ.street}<br />{BIZ.city}</span></li>
              <li><Phone size={18} aria-hidden="true" /> <a href={BIZ.tel}>{BIZ.phone}</a></li>
              <li>
                <Clock size={18} aria-hidden="true" />
                <span>
                  {HOURS.map((h) => (
                    <span className="sv-office-hour" key={h.d}><b>{h.d}</b>{h.h}</span>
                  ))}
                </span>
              </li>
              <li><Truck size={18} aria-hidden="true" /> <span>Emergency dispatch around the clock, every day of the year</span></li>
            </ul>
          </div>
        </div>
      </section>

      <section className="sv-section">
        <div className="sv-wrap sv-area-notes">
          <div>
            <h3>Arrival windows</h3>
            <p>We schedule 2-hour windows and text you when your tech is on the way, with a photo and live ETA.</p>
          </div>
          <div>
            <h3>Outside our area?</h3>
            <p>We regularly help in Fountain Hills, Maricopa and Florence for replacement projects. Call to ask.</p>
          </div>
          <div>
            <h3>Property managers</h3>
            <p>We service rental homes across all nine cities, with tenant scheduling and invoicing to your office.</p>
          </div>
        </div>
      </section>
    </>
  );
}

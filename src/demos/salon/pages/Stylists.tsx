import { InstagramLogo, CalendarBlank, Check } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { BIZ, STYLISTS } from "../data";
import type { PageProps } from "../types";
import { PageHero } from "./Services";

export function StylistsPage({ book }: PageProps) {
  return (
    <>
      <PageHero
        title="Our team"
        text="Six stylists with different specialties and price points. Everyone follows the same consultation process and trains with us every year."
      />

      <section className="sl-section sl-section--tight">
        <div className="sl-wrap sl-team-grid">
          {STYLISTS.map((s) => (
            <article key={s.id} className="sl-stylist">
              <div className="sl-stylist-img">
                <img
                  src={demoImg(s.img.folder, s.img.name)}
                  alt={`Portrait of ${s.name}`}
                  loading="lazy"
                  style={s.img.pos ? { objectPosition: s.img.pos } : undefined}
                />
              </div>
              <div className="sl-stylist-body">
                <div className="sl-stylist-top">
                  <h2 className="sl-h3">{s.name}</h2>
                  <span className="sl-stylist-level">{s.level}</span>
                </div>
                <p className="sl-stylist-title">{s.title}</p>
                <ul className="sl-tags" aria-label="Specialties">
                  {s.specialties.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
                <p className="sl-stylist-bio">{s.bio}</p>
                <div className="sl-stylist-meta">
                  <a href="#instagram" onClick={(e) => e.preventDefault()}>
                    <InstagramLogo size={16} aria-hidden="true" /> {s.ig}
                  </a>
                  <span>
                    <CalendarBlank size={16} aria-hidden="true" /> {s.days}
                  </span>
                </div>
                <button type="button" className="sl-btn sl-btn--block" onClick={() => book({ stylist: s.id })}>
                  Book with {s.first}
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="sl-section sl-section--tint">
        <div className="sl-wrap sl-levels-explain">
          <div>
            <h2 className="sl-h2">How stylist levels work</h2>
            <p>
              Prices go up with experience and demand, not with the level of care. Every stylist
              uses the same products, follows the same consultation process and is covered by our
              7-day guarantee.
            </p>
          </div>
          <ul className="sl-checks">
            <li><Check size={18} aria-hidden="true" /><span><strong>New Talent</strong> stylists have finished our 18-month apprenticeship and usually have the most openings.</span></li>
            <li><Check size={18} aria-hidden="true" /><span><strong>Senior</strong> stylists have 5+ years behind the chair and advanced training in color, curls or extensions.</span></li>
            <li><Check size={18} aria-hidden="true" /><span><strong>Master</strong> stylists have 10+ years of experience and teach our in-house classes.</span></li>
            <li><Check size={18} aria-hidden="true" /><span>Not happy with something? Tell us within 7 days and we'll fix it at no charge.</span></li>
          </ul>
        </div>
      </section>

      <section className="sl-section">
        <div className="sl-wrap sl-careers">
          <img src={demoImg("salon", "interior-bw")} alt="The Ivy & Oak styling floor" loading="lazy" />
          <div className="sl-careers-copy">
            <p className="sl-eyebrow">Careers</p>
            <h2 className="sl-h2">Join the Ivy &amp; Oak team</h2>
            <p>
              We're always happy to meet good, kind stylists. We offer commission or hourly plus
              commission, paid advanced education, a steady flow of new guests, a health stipend
              and no Sunday or Monday shifts.
            </p>
            <p>
              Currently hiring: <strong>Senior Stylist (color focus)</strong> and{" "}
              <strong>Apprentice, winter 2027 class</strong>.
            </p>
            <a href={`mailto:${BIZ.email}?subject=Careers`} className="sl-btn sl-btn--ghost">
              Email your portfolio
            </a>
          </div>
        </div>
      </section>
    </>
  );
}

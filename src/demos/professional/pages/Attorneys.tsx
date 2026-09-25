import { EnvelopeSimple, GraduationCap, Phone, Scales, Translate } from "@phosphor-icons/react";
import { ASSOCIATES, FIRM, PARTNERS, STAFF, img, type Person } from "../data";
import { CtaBand, PageHero, type Go } from "../components";

function Credentials({ p }: { p: Person }) {
  return (
    <dl className="lw-creds">
      <div>
        <dt>
          <GraduationCap size={18} aria-hidden="true" /> Education
        </dt>
        {p.education.map((e) => (
          <dd key={e}>{e}</dd>
        ))}
      </div>
      <div>
        <dt>
          <Scales size={18} aria-hidden="true" /> Bar admissions
        </dt>
        {p.admissions.map((e) => (
          <dd key={e}>{e}</dd>
        ))}
      </div>
      <div>
        <dt>
          <Translate size={18} aria-hidden="true" /> Languages
        </dt>
        <dd>{p.languages}</dd>
      </div>
    </dl>
  );
}

function ContactLine({ p }: { p: Person }) {
  return (
    <p className="lw-person-contact">
      <a href={`mailto:${p.email}`}>
        <EnvelopeSimple size={17} aria-hidden="true" /> {p.email}
      </a>
      <a href={FIRM.phoneHref}>
        <Phone size={17} aria-hidden="true" /> {FIRM.phone}, ext. {p.ext}
      </a>
    </p>
  );
}

export default function Attorneys({ go }: { go: Go }) {
  return (
    <>
      <PageHero
        crumb="Attorneys"
        title="Our attorneys and staff"
        text="A small team that knows every client by name. Here is who you will work with."
      />

      <section className="lw-section">
        <div className="lw-wrap lw-partners">
          {PARTNERS.map((p) => (
            <article key={p.id} className="lw-partner">
              <img className="lw-partner-photo" src={p.photo} alt={`Portrait of ${p.name}`} />
              <div className="lw-partner-body">
                <h2>{p.name}</h2>
                <p className="lw-person-title">
                  {p.title}. {p.focus}
                </p>
                {p.bio.map((b) => (
                  <p key={b.slice(0, 24)} className="lw-person-bio">
                    {b}
                  </p>
                ))}
                <Credentials p={p} />
                <ContactLine p={p} />
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap">
          <div className="lw-section-head">
            <h2>Associate attorneys</h2>
          </div>
          <div className="lw-assoc-grid">
            {ASSOCIATES.map((p) => (
              <article key={p.id} className="lw-assoc">
                <div className="lw-assoc-top">
                  <img src={p.photo} alt={`Portrait of ${p.name}`} loading="lazy" />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="lw-person-title">{p.title}</p>
                    <p className="lw-assoc-focus">{p.focus}</p>
                  </div>
                </div>
                <p className="lw-person-bio">{p.bio[0]}</p>
                <Credentials p={p} />
                <ContactLine p={p} />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="lw-section">
        <div className="lw-wrap lw-staff">
          <img className="lw-staff-photo" src={STAFF.photo} alt={`Portrait of ${STAFF.name}`} loading="lazy" />
          <div className="lw-staff-body">
            <h2 className="lw-h2-sm">{STAFF.name}</h2>
            <p className="lw-person-title">{STAFF.title}</p>
            <p className="lw-person-bio">{STAFF.bio[0]}</p>
            <p className="lw-staff-meta">
              {STAFF.admissions[0]}. Speaks {STAFF.languages.replace(", ", " and ")}.
            </p>
            <ContactLine p={STAFF} />
          </div>
          <div className="lw-staff-office">
            <img src={img.lounge} alt="Client waiting area at our Morehead Square office" loading="lazy" />
            <p>
              Our intake coordinators, Tamara and Grace, answer the phones and schedule consultations. If you call after
              hours, our on-call team takes your details and an attorney follows up the next morning.
            </p>
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}

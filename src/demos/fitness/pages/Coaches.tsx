import { Certificate } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { COACHES } from "../data";
import type { PageProps } from "../data";
import { CtaBand, PageHero, SectionHead, W } from "../components";

export default function Coaches({ go }: PageProps) {
  const [head, ...team] = COACHES;
  return (
    <>
      <PageHero
        title="Meet the coaches"
        text="Six certified coaches with backgrounds in college strength, physical therapy and competitive weightlifting."
        img="dark-gym"
        alt="The Forge gym floor before the 5:30am class"
      />

      <section className="fx-section">
        <div className="fx-wrap fx-founder">
          <img
            className="fx-founder-img"
            src={demoImg("people", head.img)}
            alt={`${head.name}, ${head.role}`}
            loading="lazy"
          />
          <div>
            <p className="fx-kicker">Founder and head coach</p>
            <h2 className="fx-h2">{head.name}</h2>
            <p className="fx-certs">
              <Certificate size={18} weight={W} aria-hidden="true" /> {head.certs.join(", ")}
            </p>
            <p className="fx-founder-text">{head.bio}</p>
            <p className="fx-founder-text">
              “I opened Forge because I kept meeting people who wanted to get strong but felt out of place in a
              typical gym. Our job is to teach you to lift well, give you a plan that works, and make this the
              best hour of your day.”
            </p>
          </div>
        </div>
      </section>

      <section className="fx-section fx-tint">
        <div className="fx-wrap">
          <SectionHead
            title="The coaching team"
            text="Book personal training with any coach, or find them on the class schedule."
          />
          <div className="fx-coaches">
            {team.map((c) => (
              <article key={c.id} className="fx-coach">
                <img src={demoImg("people", c.img)} alt={`${c.name}, ${c.role}`} loading="lazy" />
                <div className="fx-coach-body">
                  <h3>{c.name}</h3>
                  <p className="fx-coach-role">{c.role}</p>
                  <p className="fx-certs">
                    <Certificate size={17} weight={W} aria-hidden="true" /> {c.certs.join(", ")}
                  </p>
                  <p className="fx-coach-bio">{c.bio}</p>
                  <p className="fx-coach-spec">
                    <strong>Specialties:</strong> {c.specialties.join(", ")}
                  </p>
                  <p className="fx-coach-since">{c.since}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="fx-section fx-dark">
        <div className="fx-wrap fx-standard">
          <SectionHead
            title="How we coach"
            text="Every Forge coach holds a national certification, current CPR/AED, and completes at least 20 hours of continuing education a year, paid for by the gym."
          />
          <dl className="fx-stats">
            <div>
              <dt>63 years</dt>
              <dd>of combined coaching experience</dd>
            </div>
            <div>
              <dt>14</dt>
              <dd>members max per class</dd>
            </div>
            <div>
              <dt>41</dt>
              <dd>members coached to their first meet</dd>
            </div>
          </dl>
        </div>
      </section>

      <CtaBand
        go={go}
        title="Train with us for a week"
        text="Your free week starts with a one-on-one intro session with one of these coaches."
      />
    </>
  );
}

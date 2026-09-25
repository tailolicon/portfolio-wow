import { Check, Drop, Snowflake } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { BIZ, SERVICES } from "../data";
import type { Service } from "../data";
import { BookButton, CallButton, ComfortClub, Coupons, Financing, PageHero, SectionHead, ServiceIcon } from "../components";
import type { NavProps } from "../components";

function Points({ items }: { items: string[] }) {
  return (
    <ul className="sv-checks">
      {items.map((p) => (
        <li key={p}>
          <Check size={16} aria-hidden="true" /> {p}
        </li>
      ))}
    </ul>
  );
}

function ServiceCard({ s, go }: { s: Service } & Pick<NavProps, "go">) {
  return (
    <article className="sv-svc-card">
      <div className="sv-svc-top">
        <ServiceIcon name={s.name} />
        <h3>{s.name}</h3>
      </div>
      <p>{s.blurb}</p>
      <Points items={s.points} />
      <div className="sv-svc-foot">
        <span className="sv-svc-from">
          <small>{s.priceLabel}</small> {s.price}
        </span>
        <BookButton go={go} variant="navy" size="sm" />
      </div>
    </article>
  );
}

function ServiceRow({ s, go }: { s: Service } & Pick<NavProps, "go">) {
  return (
    <article className="sv-svc-row">
      <ServiceIcon name={s.name} />
      <div className="sv-svc-row-body">
        <h3>{s.name}</h3>
        <p>{s.blurb}</p>
        <Points items={s.points} />
      </div>
      <div className="sv-svc-row-side">
        <span className="sv-svc-from">
          <small>{s.priceLabel}</small> {s.price}
        </span>
        <BookButton go={go} variant="navy" size="sm" />
      </div>
    </article>
  );
}

const jump = (id: string) => (e: { preventDefault: () => void }) => {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
};

export default function Services({ go, link }: NavProps) {
  const plumbing = SERVICES.filter((s) => s.group === "plumbing");
  const hvac = SERVICES.filter((s) => s.group === "hvac");
  return (
    <>
      <PageHero
        link={link}
        crumb="Services"
        title="Plumbing, heating and air conditioning services"
        text="Repairs, maintenance and replacements across the East Valley, with flat-rate pricing and a 1-year labor warranty on every repair."
      >
        <div className="sv-jump">
          <a href="#sv-plumbing" onClick={jump("sv-plumbing")}>
            <Drop size={18} aria-hidden="true" /> Plumbing
          </a>
          <a href="#sv-hvac" onClick={jump("sv-hvac")}>
            <Snowflake size={18} aria-hidden="true" /> Heating &amp; cooling
          </a>
          <a href="#sv-specials" onClick={jump("sv-specials")}>Specials</a>
        </div>
      </PageHero>

      <section id="sv-plumbing" className="sv-section">
        <div className="sv-wrap">
          <div className="sv-group-intro">
            <img src={demoImg("services", "faucet-splash")} alt="Hand turning on a kitchen faucet over a dark sink" />
            <div>
              <SectionHead title="Plumbing">
                Hard water, aging copper and shifting clay soil make plumbing out here a little different. Our master
                plumbers handle everything from a dripping faucet to a full repipe, and the trucks carry the parts to finish
                most jobs in one visit.
              </SectionHead>
              <div className="sv-group-ctas">
                <BookButton go={go} />
                <CallButton />
              </div>
            </div>
          </div>
          <div className="sv-svc-grid">
            {plumbing.map((s) => (
              <ServiceCard key={s.name} s={s} go={go} />
            ))}
          </div>
        </div>
      </section>

      <section id="sv-hvac" className="sv-section sv-gray">
        <div className="sv-wrap sv-hvac">
          <div className="sv-hvac-aside">
            <SectionHead title="Heating & cooling">
              An AC in Mesa runs more hours in one summer than most systems back east run all year. We repair, maintain and
              replace every major brand of air conditioner, heat pump and gas furnace.
            </SectionHead>
            <img src={demoImg("services", "living-room")} alt="Bright living room with a leather sofa and big windows" loading="lazy" />
            <p className="sv-hvac-note">
              No cooling and someone at home is elderly, pregnant or has a medical condition? Tell the dispatcher at{" "}
              <a href={BIZ.tel}>{BIZ.phone}</a> and we'll move you up.
            </p>
          </div>
          <div className="sv-svc-rows">
            {hvac.map((s) => (
              <ServiceRow key={s.name} s={s} go={go} />
            ))}
          </div>
        </div>
      </section>

      <section id="sv-specials" className="sv-section">
        <div className="sv-wrap">
          <SectionHead title="Specials and coupons">Offers are for residential customers inside our service area.</SectionHead>
          <Coupons go={go} />
        </div>
      </section>

      <ComfortClub go={go} />

      <section className="sv-section">
        <div className="sv-wrap">
          <Financing go={go} />
        </div>
      </section>
    </>
  );
}

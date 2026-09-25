import { HandHeartIcon, PlantIcon, UsersIcon, BreadIcon } from "@phosphor-icons/react";
import { img, person, PageHero, SectionHead, Reviews } from "../parts";
import type { PageProps } from "../parts";

const MILESTONES = [
  { year: "2014", text: "Leah and Sam open a 20-seat coffee bar at 118 Haywood St with a borrowed espresso machine and Leah’s grandmother’s biscuit recipe." },
  { year: "2016", text: "We start roasting our own coffee on a secondhand 15-kilo roaster, squeezed into what used to be the storage room." },
  { year: "2019", text: "The bakery gets a real kitchen and a head baker, Rosa. The ovens have come on at 4am every day since, except Christmas." },
  { year: "2022", text: "Our second shop opens on Haywood Road in West Asheville, with a back patio, a drive-up window, and a lot of plants." },
  { year: "2025", text: "Coffee subscriptions launch. We now ship beans to customers in 38 states." },
];

const FARMS = [
  {
    name: "Finca La Esperanza",
    place: "Huila, Colombia",
    text: "The Rivera family has grown the base of our Hearthstone Blend for eight harvests in a row.",
  },
  {
    name: "Guji Highlands Cooperative",
    place: "Hambela, Ethiopia",
    text: "A co-op of about 600 growers. Their washed coffee tastes like blueberries, and we buy their full lot every spring.",
  },
  {
    name: "Beneficio San Miguel",
    place: "Huehuetenango, Guatemala",
    text: "The backbone of Front Porch Dark. Sam visited in 2023 and came home with a new favorite coffee.",
  },
];

const STATS = [
  { value: "12", label: "years on Haywood St" },
  { value: "38", label: "people on our team" },
  { value: "940", label: "pastries baked on an average day" },
  { value: "$41,300", label: "given to local food pantries" },
];

export default function Story({ go }: PageProps) {
  return (
    <>
      <PageHero
        title="Our story"
        lead="Hearth & Honey started in 2014 with two people and one espresso machine. We still make almost everything the slow way, and we still try to learn every regular’s name."
        image="latte-cheers"
        alt="Friends raising their lattes at one of our tables"
      />

      <section className="cf-section">
        <div className="cf-wrap cf-split">
          <div className="cf-founders">
            <figure>
              <img src={person("woman-2")} alt="Leah Harlan, co-founder and head of the bakery" loading="lazy" />
              <figcaption>
                <strong>Leah Harlan</strong>
                <span>Co-founder, bakery</span>
              </figcaption>
            </figure>
            <figure>
              <img src={person("man-cap")} alt="Sam Harlan, co-founder and roaster" loading="lazy" />
              <figcaption>
                <strong>Sam Harlan</strong>
                <span>Co-founder, roaster</span>
              </figcaption>
            </figure>
          </div>
          <div className="cf-split-copy">
            <h2 className="cf-h2">Two Asheville locals and a biscuit recipe</h2>
            <p>
              Leah grew up baking in her grandmother’s kitchen in Weaverville. Sam spent six years pulling shots and
              roasting coffee in Portland before he moved back to the mountains. They met at a Saturday tailgate market,
              where she was selling scones and he was handing out cold brew samples. Two years later they signed the lease
              on Haywood Street.
            </p>
            <p>
              Leah still shapes the morning buns, and Sam still roasts every batch himself on Tuesdays and Fridays. Most
              mornings you’ll find one of them behind the counter.
            </p>
          </div>
        </div>
      </section>

      <section className="cf-stats">
        <div className="cf-wrap cf-stats-grid">
          {STATS.map((s) => (
            <div key={s.label}>
              <strong>{s.value}</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="cf-photo-band">
        <img src={img("pour-over")} alt="A barista brewing coffee through a pour-over" loading="lazy" />
        <div className="cf-wrap">
          <div className="cf-photo-band-card">
            <h2 className="cf-h2">Small batches, roasted twice a week</h2>
            <p>
              We roast 15 kilos at a time, which is small enough for Sam to taste every batch. We aim for sweet and
              balanced coffee, never bitter or smoky. Bags reach the shelf within four days of roasting, and we pull
              anything older than three weeks.
            </p>
            <p>Free roastery tours and tastings every Saturday at 10am, Downtown. Just show up.</p>
          </div>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap cf-sourcing">
          <div className="cf-sourcing-intro">
            <SectionHead
              eyebrow="Where our coffee comes from"
              title="We know the people who grow it"
              lead="We buy directly or through two importers we trust, and last year we paid an average of 2.1 times the Fair Trade minimum."
            />
          </div>
          <ul className="cf-farm-list">
              {FARMS.map((f) => (
                <li key={f.name}>
                  <h3>{f.name}</h3>
                  <p className="cf-bean-origin">{f.place}</p>
                  <p>{f.text}</p>
                </li>
              ))}
          </ul>
        </div>
      </section>

      <section className="cf-section cf-section--tint">
        <div className="cf-wrap">
          <SectionHead title="How we got here" />
          <ol className="cf-timeline">
            {MILESTONES.map((m) => (
              <li key={m.year}>
                <span className="cf-timeline-year">{m.year}</span>
                <p>{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="cf-section">
        <div className="cf-wrap cf-community">
          <SectionHead
            center
            title="Being a good neighbor"
            lead="We pay a living wage, split tips evenly, and offer health coverage to anyone working 25 hours a week or more. A few other things we do:"
          />
          <ul className="cf-community-list">
            <li>
              <BreadIcon size={28} aria-hidden="true" />
              <h3>Nothing goes to waste</h3>
              <p>Unsold bread and pastries go to Blue Ridge Community Pantry at closing.</p>
            </li>
            <li>
              <HandHeartIcon size={28} aria-hidden="true" />
              <h3>Giving Mondays</h3>
              <p>On the first Monday of each month, 5% of sales go to a local nonprofit our staff picks.</p>
            </li>
            <li>
              <UsersIcon size={28} aria-hidden="true" />
              <h3>Room for local groups</h3>
              <p>The Downtown back room is free for evening meetings. Email us for dates.</p>
            </li>
            <li>
              <PlantIcon size={28} aria-hidden="true" />
              <h3>Grounds for gardeners</h3>
              <p>Used coffee grounds for your compost, bagged and free. Ask at the counter.</p>
            </li>
          </ul>
          <div className="cf-btn-row cf-btn-row--center">
            <button className="cf-btn cf-btn--primary" onClick={() => go("visit")}>
              Visit a shop
            </button>
            <button className="cf-btn cf-btn--ghost" onClick={() => go("visit")}>
              See open jobs
            </button>
          </div>
        </div>
      </section>

      <Reviews />
    </>
  );
}

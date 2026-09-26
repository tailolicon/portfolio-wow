import { useState } from "react";
import { PROJECTS, SECTORS, img, projectBySlug } from "../data";
import type { Sector } from "../data";
import { NEWS } from "../content";
import { ProjectTile, Reveal, TextLink } from "../ui";
import type { Nav } from "../ui";

const SECTOR_NOTES: Record<Sector, { text: string; image: string; alt: string }> = {
  Residential: {
    text: "Private houses, retrofit and cooperative and social housing.",
    image: "house-timber",
    alt: "Cedar House in Hampstead",
  },
  Cultural: {
    text: "Libraries, galleries and archives for public bodies and trusts.",
    image: "museum-angular",
    alt: "Kirkgate Library and Archive in Leeds",
  },
  Workplace: {
    text: "Office refits and reuse of existing buildings for companies of 40 to 900 people.",
    image: "office-glass",
    alt: "Meeting rooms at St John Street Workplace",
  },
  Hospitality: {
    text: "Small hotels and restaurants, mostly in Portugal.",
    image: "pavilion-pool",
    alt: "The pool pavilion at Casa Pinhal Hotel",
  },
};

export default function Home({ nav }: { nav: Nav }) {
  const hero = projectBySlug("hollow-lane");
  const [a, b, c, d, e] = ["casa-pinhal", "harrowden-pavilion", "kirkgate-library", "st-john-street", "alcantara-quay"].map(
    projectBySlug,
  );
  const [activeSector, setActiveSector] = useState<Sector>("Residential");
  const counts = (sector: Sector) => PROJECTS.filter((p) => p.sector === sector).length;

  return (
    <>
      <section className="oh-hero">
        <img className="oh-hero-img" src={hero.hero.src} alt={hero.hero.alt} />
        <div className="oh-hero-shade" aria-hidden="true" />
        <div className="oh-hero-copy">
          <h1 className="oh-display">Buildings made for the places they stand in</h1>
          <p className="oh-hero-sub">
            An architecture practice of 41 people in London and Lisbon, designing homes, cultural buildings, workplaces
            and hotels.
          </p>
          <div className="oh-hero-actions">
            <a className="oh-button oh-button--light" {...nav.link("projects")}>
              View projects
            </a>
          </div>
        </div>
        <a
          className="oh-hero-caption oh-data"
          href="#project-hollow-lane"
          onClick={(event) => {
            event.preventDefault();
            nav.openProject(hero.slug);
          }}
        >
          {hero.name}, {hero.location}
        </a>
      </section>

      <section className="oh-section oh-wrap">
        <div className="oh-section-head">
          <h2 className="oh-title">Selected projects</h2>
          <TextLink onClick={() => nav.openProjects()}>All projects</TextLink>
        </div>
        <div className="oh-feature">
          <Reveal className="oh-feature-a">
            <ProjectTile project={a} nav={nav} ratio="land" />
          </Reveal>
          <Reveal className="oh-feature-b">
            <ProjectTile project={b} nav={nav} ratio="port" />
          </Reveal>
          <Reveal className="oh-feature-c">
            <ProjectTile project={c} nav={nav} ratio="wide" />
          </Reveal>
          <Reveal className="oh-feature-d">
            <ProjectTile project={e} nav={nav} ratio="port" />
          </Reveal>
          <Reveal className="oh-feature-e">
            <ProjectTile project={d} nav={nav} ratio="land" />
          </Reveal>
        </div>
      </section>

      <section className="oh-section oh-wrap oh-practice">
        <p className="oh-lead-xl">
          We set up the practice in 2008 in two rooms above a print shop on Hardwick Street. We still take on a small
          number of projects at a time, and one of the two founders leads each of them.
        </p>
        <div className="oh-practice-side">
          <p>
            Our work ranges from a 245m² retrofit in Belsize Park to a 128-home cooperative on the Lisbon waterfront.
            What connects it is a way of working: long site visits, few materials, and careful reuse of what is already
            there. Around 60% of our current work keeps an existing structure.
          </p>
          <dl className="oh-facts-inline">
            <div>
              <dt>Founded</dt>
              <dd>2008</dd>
            </div>
            <div>
              <dt>People</dt>
              <dd>41</dd>
            </div>
            <div>
              <dt>Studios</dt>
              <dd>London, Lisbon</dd>
            </div>
            <div>
              <dt>Buildings completed</dt>
              <dd>86</dd>
            </div>
          </dl>
          <TextLink onClick={() => nav.go("studio")}>About the studio</TextLink>
        </div>
      </section>

      <section className="oh-section oh-wrap oh-sectors">
        <div className="oh-sectors-list">
          <h2 className="oh-title">Sectors</h2>
          <ul>
            {SECTORS.map((sector) => (
              <li key={sector}>
                <button
                  type="button"
                  className={`oh-sector-row ${activeSector === sector ? "is-active" : ""}`}
                  onMouseEnter={() => setActiveSector(sector)}
                  onFocus={() => setActiveSector(sector)}
                  onClick={() => nav.openProjects(sector)}
                >
                  <span className="oh-sector-name">{sector}</span>
                  <span className="oh-sector-text">{SECTOR_NOTES[sector].text}</span>
                  <span className="oh-data oh-sector-count">{counts(sector)} projects</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="oh-sectors-media">
          {SECTORS.map((sector) => (
            <img
              key={sector}
              className={activeSector === sector ? "is-active" : ""}
              src={img(SECTOR_NOTES[sector].image)}
              alt={SECTOR_NOTES[sector].alt}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="oh-section oh-wrap oh-news">
        <h2 className="oh-title">News</h2>
        <ol className="oh-news-list">
          {NEWS.map((item) => (
            <li key={item.title}>
              <time className="oh-data">{item.date}</time>
              <div>
                <h3 className="oh-heading">{item.title}</h3>
                <p>{item.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      <section className="oh-closing">
        <img src={img("villa-terrace")} alt="A garden suite at Casa Pinhal Hotel" loading="lazy" />
        <div className="oh-closing-copy oh-wrap">
          <h2 className="oh-title">Planning a building?</h2>
          <p>We like to be involved early, before there is a brief. Tell us about the site and what you have in mind.</p>
          <a className="oh-button oh-button--light" {...nav.link("contact")}>
            Contact the studio
          </a>
        </div>
      </section>
    </>
  );
}

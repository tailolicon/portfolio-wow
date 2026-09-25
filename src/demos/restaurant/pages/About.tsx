import { img, person } from "../data";
import type { PageProps } from "../data";
import { PageHero } from "../parts";

const TIMELINE = [
  { year: "1998", text: "Rosa Bellini, newly arrived from Modena by way of Houston, opens a 12-table trattoria on South Lamar with her late husband Carlo." },
  { year: "2005", text: "The wood-fired oven arrives from Naples, and the Margherita becomes the most-ordered dish on the menu." },
  { year: "2012", text: "Marco returns home after cooking in Bologna and Chicago and takes over the kitchen alongside his mother." },
  { year: "2017", text: "We expand next door, adding the wine bar, the covered patio and the Cantina private dining room." },
  { year: "2026", text: "Rosa still comes in most Sundays to taste the ragù and make sure Marco hasn't changed it." },
];

const TEAM = [
  { name: "Marco Bellini", role: "Chef & Co-owner", photo: "chef-portrait", folder: "restaurant", text: "Trained at a trattoria in Bologna and cooked in Chicago before coming home in 2012. Marco rolls the first batch of pasta himself every morning at 7." },
  { name: "Elena Bellini", role: "General Manager & Wine Director", photo: "woman-2", folder: "people", text: "Elena built our list of 90+ Italian wines, most from small family producers. She runs the dining room and will happily talk you into a second glass." },
  { name: "Luca Moretti", role: "Bar Manager", photo: "man-restaurant", folder: "people", text: "Luca has been behind our bar since 2017. His Negroni della Casa and house limoncello are the reason aperitivo hour is always full." },
];

const STATS = [
  { value: "28", label: "years on South Lamar" },
  { value: "6 hrs", label: "for every pot of ragù" },
  { value: "94", label: "Italian wines on the list" },
  { value: "11", label: "of our team have been here 10+ years" },
];

export default function About({ go, link }: PageProps) {
  return (
    <>
      <PageHero image={img("kitchen")} title="Our story" pos="center 40%">
        Three generations of the Bellini family, one kitchen on South Lamar.
      </PageHero>

      <section className="rs-section">
        <div className="rs-wrap rs-split">
          <div className="rs-split-media rs-split-media-single">
            <img src={img("fresh-pasta")} alt="Fresh egg pasta nests and tomatoes on the kitchen counter" loading="lazy" />
          </div>
          <div className="rs-split-text">
            <h2>It began with Rosa's Sunday table</h2>
            <p>
              Growing up outside Modena, Rosa Bellini learned to make pasta standing on a chair next to her own nonna.
              When she and Carlo moved to Austin in the early '90s, their Sunday dinners got a reputation: long tables in
              the backyard, platters of tagliatelle, neighbors who stayed until midnight. Friends kept telling her to open
              a restaurant.
            </p>
            <p>
              In 1998 she did. Twelve tables, a hand-cranked pasta machine and a pot of ragù that simmered for six hours.
              People came for the food and stayed because Rosa treated every guest like they'd been invited to her home.
            </p>
            <blockquote className="rs-pull">
              “Make it with your hands, make enough for everyone, and never let anyone leave hungry.”
              <cite>Rosa Bellini, founder</cite>
            </blockquote>
          </div>
        </div>
      </section>

      <section className="rs-section rs-section-alt">
        <div className="rs-wrap">
          <div className="rs-section-head">
            <h2>How we got here</h2>
          </div>
          <ol className="rs-timeline">
            {TIMELINE.map((t) => (
              <li key={t.year}>
                <strong>{t.year}</strong>
                <p>{t.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-wrap">
          <div className="rs-section-head">
            <h2>Who's cooking and pouring</h2>
          </div>
          <div className="rs-team">
            {TEAM.map((m) => (
              <article key={m.name} className="rs-member">
                <img
                  src={m.folder === "restaurant" ? img(m.photo) : person(m.photo)}
                  alt={`${m.name}, ${m.role}`}
                  loading="lazy"
                />
                <div className="rs-member-body">
                  <h3>{m.name}</h3>
                  <p className="rs-member-role">{m.role}</p>
                  <p>{m.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="rs-stats" aria-label="Nonna Rosa by the numbers">
        <div className="rs-wrap rs-stats-row">
          {STATS.map((st) => (
            <div key={st.label} className="rs-stat">
              <strong>{st.value}</strong>
              <span>{st.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="rs-section">
        <div className="rs-wrap">
          <div className="rs-section-head">
            <h2>Inside the trattoria</h2>
          </div>
          <div className="rs-gallery">
            <img src={img("interior-3")} alt="The main dining room in the evening" loading="lazy" />
            <img src={img("chef-flame")} alt="A cook flambéing at the stove" loading="lazy" />
            <img src={img("bar")} alt="The wine bar and its chalkboard list" loading="lazy" />
            <img src={img("pizza-2")} alt="A pizza fresh from the wood-fired oven" loading="lazy" />
            <img src={img("salad")} alt="A seasonal salad" loading="lazy" />
          </div>
          <div className="rs-cta-inline">
            <p>Come taste the story for yourself.</p>
            <div className="rs-btn-row">
              <button type="button" className="rs-btn rs-btn-primary" onClick={() => go("reservations")}>Reserve a table</button>
              <a className="rs-btn rs-btn-outline" {...link("menu")}>See the menu</a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

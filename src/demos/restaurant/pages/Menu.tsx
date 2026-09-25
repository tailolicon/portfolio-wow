import { useState } from "react";
import { Leaf, Star } from "@phosphor-icons/react";
import { MENU, img } from "../data";
import type { PageProps } from "../data";
import { OrderButtons, PageHero, Tags } from "../parts";

const SECTION_IMAGES: Record<string, { src: string; alt: string }> = {
  antipasti: { src: "fish-plate", alt: "Antipasti platter with grilled seafood and bread" },
  pasta: { src: "pasta-bolognese", alt: "Tagliatelle bolognese served in a bowl" },
  pizze: { src: "pizza-3", alt: "Wood-fired pizza sliced on a board" },
  drinks: { src: "cocktail", alt: "A cocktail being poured over a large ice cube" },
};

const BRUNCH = [
  { name: "Uova in Purgatorio", desc: "Eggs baked in spicy tomato sauce, grilled focaccia", price: "16" },
  { name: "Ricotta Pancakes", desc: "Lemon ricotta, berries, Texas honey", price: "14" },
  { name: "Breakfast Pizza", desc: "Pancetta, potato, fontina, two sunny eggs", price: "18" },
  { name: "Bottomless Bellinis", desc: "With any entrée, for 90 minutes", price: "22" },
];

export default function MenuPage({ go }: PageProps) {
  const [active, setActive] = useState(MENU[0].id);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(`rs-menu-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <PageHero image={img("pasta-carbonara")} title="Dinner menu" pos="center 60%">
        Served Tuesday to Sunday. A few dishes change with the seasons.
      </PageHero>

      <div className="rs-menu-tabs-wrap">
        <nav className="rs-wrap rs-menu-tabs" aria-label="Menu categories">
          {MENU.map((s) => (
            <button
              key={s.id}
              type="button"
              className={active === s.id ? "is-active" : ""}
              aria-pressed={active === s.id}
              onClick={() => jump(s.id)}
            >
              {s.title}
            </button>
          ))}
        </nav>
      </div>

      <section className="rs-section rs-menu">
        <div className="rs-wrap rs-menu-layout">
          <div className="rs-menu-main">
            <div className="rs-menu-legend">
              <span><Star size={14} weight="fill" className="rs-house" aria-hidden /> House favorite</span>
              <span><abbr className="rs-tag rs-tag-v">V</abbr> Vegetarian</span>
              <span><abbr className="rs-tag rs-tag-vg">VG</abbr> Vegan</span>
              <span><abbr className="rs-tag rs-tag-gf">GF</abbr> Gluten-free</span>
              <span><abbr className="rs-tag rs-tag-gfa">GFA</abbr> Gluten-free available</span>
            </div>

            {MENU.map((section) => {
              const pic = SECTION_IMAGES[section.id];
              return (
                <section key={section.id} id={`rs-menu-${section.id}`} className="rs-menu-section">
                  {pic && <img className="rs-menu-banner" src={img(pic.src)} alt={pic.alt} loading="lazy" />}
                  <header className="rs-menu-section-head">
                    <h2>{section.title}</h2>
                    {section.note && <p>{section.note}</p>}
                  </header>
                  <ul className="rs-menu-list">
                    {section.items.map((item) => (
                      <li key={item.name} className="rs-menu-item">
                        <div className="rs-menu-item-top">
                          <h3>
                            {item.name}
                            {item.house && <Star className="rs-house" size={14} weight="fill" aria-label="House favorite" />}
                          </h3>
                          <span className="rs-leader" aria-hidden />
                          <span className="rs-price">{item.price}</span>
                        </div>
                        <p>{item.desc}</p>
                        <Tags tags={item.tags} />
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}

            <p className="rs-menu-foot">
              Consuming raw or undercooked meats, seafood or eggs may increase your risk of foodborne illness. Our kitchen
              handles wheat, nuts, dairy and shellfish; gluten-free items are prepared with care but in a shared kitchen.
              Please tell your server about any allergies. An 18% service charge is added to parties of 7 or more.
            </p>
          </div>

          <aside className="rs-menu-aside">
            <div className="rs-aside-card rs-aside-accent">
              <h2>Order for pickup or delivery</h2>
              <p>The full dinner menu, Tuesday to Sunday. Bottles of wine can go home with pickup orders.</p>
              <OrderButtons compact />
            </div>
            <div className="rs-aside-card">
              <h2>Sunday brunch</h2>
              <p className="rs-muted">Sundays, 11am to 2:30pm</p>
              <ul className="rs-aside-list">
                {BRUNCH.map((b) => (
                  <li key={b.name}>
                    <div><strong>{b.name}</strong><span>{b.desc}</span></div>
                    <span className="rs-price">{b.price}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rs-aside-card">
              <h2><Leaf size={20} aria-hidden /> Allergies and diets</h2>
              <p>Any pasta can be swapped for gluten-free penne and any pizza for a gluten-free crust. Many dishes can be made vegan, so ask your server.</p>
            </div>
            <div className="rs-aside-card">
              <h2>Joining us this weekend?</h2>
              <p>We fill up Friday to Sunday, so book ahead if you can.</p>
              <button type="button" className="rs-btn rs-btn-primary rs-btn-block" onClick={() => go("reservations")}>Reserve a table</button>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

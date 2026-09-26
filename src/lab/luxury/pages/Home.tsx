import { ThreeCanvas, lazyThree } from "../../shared";
import { PRODUCTS, img } from "../data";
import { BOUTIQUES } from "../data-maison";
import type { Category } from "../data";
import { ProductCard } from "../ui";
import type { SiteApi } from "../ui";

export const Horizon = lazyThree(() =>
  import("@designcodeio/threeui/components/EmeraldHorizonBackground").then((m) => m.EmeraldHorizonBackground),
);

const CATEGORY_TILES: { category: Category; image: string; alt: string }[] = [
  { category: "Rings", image: "halo-ring", alt: "Diamond halo ring on black" },
  { category: "Necklaces", image: "diamond-pendant", alt: "Diamond cushion pendant" },
  { category: "Earrings", image: "sapphire-earrings", alt: "Sapphire drop earrings" },
  { category: "Bracelets", image: "gold-link-bracelet", alt: "Gold marine link bracelet" },
  { category: "Bridal", image: "wedding-bands", alt: "Pair of wedding bands" },
];

const NEW_SLUGS = [
  "lumiere-pear-halo-ring",
  "lumiere-cushion-pendant",
  "perle-de-seine-pendant",
  "or-vivant-twist-hoops",
];

export default function Home({ site }: { site: SiteApi }) {
  const newPieces = NEW_SLUGS.map((slug) => PRODUCTS.find((p) => p.slug === slug)!).filter(Boolean);

  return (
    <>
      <section className="lx-hero">
        <div className="lx-hero-copy">
          <h1 className="lx-display-xl lx-rise">Made in Paris, above the shop, since 1931</h1>
          <p className="lx-lead lx-rise lx-rise-2">
            Fine jewelry in recycled gold and traceable stones, finished by hand in our atelier and looked
            after for life.
          </p>
          <div className="lx-actions lx-rise lx-rise-3">
            <button type="button" className="lx-btn" onClick={() => site.openCollections()}>
              Discover the collections
            </button>
            <button type="button" className="lx-btn lx-btn--ghost" onClick={() => site.bookViewing()}>
              Book a private viewing
            </button>
          </div>
        </div>
        <figure className="lx-hero-media">
          <img src={img("necklace-model")} alt="Perle de Seine goutte necklace worn with a white linen shirt" />
        </figure>
      </section>

      <section className="lx-section lx-cats" aria-labelledby="lx-cats-title">
        <div className="lx-container">
          <div className="lx-row-head">
            <h2 id="lx-cats-title" className="lx-display-m">
              Shop by category
            </h2>
            <a
              className="lx-link"
              href="#collections"
              onClick={(event) => {
                event.preventDefault();
                site.openCollections();
              }}
            >
              View all jewelry
            </a>
          </div>
          <div className="lx-cat-rail">
            {CATEGORY_TILES.map((tile) => (
              <a
                key={tile.category}
                className="lx-cat lx-reveal"
                href="#collections"
                onClick={(event) => {
                  event.preventDefault();
                  site.openCollections({ category: tile.category });
                }}
              >
                <span className="lx-cat-media">
                  <img src={img(tile.image)} alt={tile.alt} loading="lazy" />
                </span>
                <span className="lx-cat-name">{tile.category}</span>
                <span className="lx-cat-count">
                  {PRODUCTS.filter((p) => p.categories.includes(tile.category)).length} pieces
                </span>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="lx-signature" aria-labelledby="lx-sig-title">
        <div className="lx-signature-bg">
          <ThreeCanvas fallback={<div className="lx-signature-fallback" />}>
            <Horizon speed={0.25} glow={0.32} hue={20} vignette={1.25} waveScale={0.85} variation={0.7} />
          </ThreeCanvas>
        </div>
        <div className="lx-container lx-signature-inner">
          <div className="lx-signature-copy lx-reveal">
            <p className="lx-eyebrow">New in 2026</p>
            <h2 id="lx-sig-title" className="lx-display-l">
              Lumière, the diamond line
            </h2>
            <p>
              Low claws and open galleries, so light reaches each stone from every side. Our first new diamond
              line in thirty years, drawn and set in the Saint-Honoré atelier.
            </p>
            <button
              type="button"
              className="lx-btn lx-btn--light"
              onClick={() => site.openCollections({ collection: "lumiere" })}
            >
              Discover the collection
            </button>
          </div>
          <button
            type="button"
            className="lx-signature-piece lx-reveal"
            onClick={() => site.openProduct("lumiere-riviere-bracelet")}
            aria-label="Lumière rivière bracelet, $18,200"
          >
            <img
              src={img("diamond-bracelet-dark")}
              alt="Lumière rivière bracelet in white gold, set with 219 diamonds"
              loading="lazy"
            />
            <span className="lx-signature-caption">
              <span>Lumière rivière bracelet</span>
              <span>$18,200</span>
            </span>
          </button>
        </div>
      </section>

      <section className="lx-section" aria-labelledby="lx-new-title">
        <div className="lx-container">
          <div className="lx-row-head">
            <h2 id="lx-new-title" className="lx-display-m">
              New this season
            </h2>
            <a
              className="lx-link"
              href="#collections"
              onClick={(event) => {
                event.preventDefault();
                site.openCollections();
              }}
            >
              View all jewelry
            </a>
          </div>
          <div className="lx-grid lx-grid--4">
            {newPieces.map((product) => (
              <ProductCard key={product.slug} product={product} site={site} />
            ))}
          </div>
        </div>
      </section>

      <section className="lx-section lx-section--tight">
        <div className="lx-container">
          <article className="lx-feature lx-reveal">
            <div className="lx-feature-media lx-feature-media--wide">
              <img
                src={img("pearl-box")}
                alt="A Perle de Seine Akoya strand with a diamond clasp, in its box"
                loading="lazy"
              />
            </div>
            <div className="lx-feature-copy">
              <h2 className="lx-display-l">Perle de Seine</h2>
              <p>
                Akoya pearls from Ago Bay, matched by eye in the atelier and knotted on silk between every
                pearl. We restring each piece every three years, at no charge, for as long as you own it.
              </p>
              <button
                type="button"
                className="lx-link lx-link-btn"
                onClick={() => site.openCollections({ collection: "perle" })}
              >
                Discover the collection
              </button>
            </div>
          </article>
          <article className="lx-feature lx-feature--flip lx-reveal">
            <div className="lx-feature-media">
              <img
                src={img("layered-necklaces")}
                alt="Or Vivant layered chains worn with a white shirt, rings and an open bangle"
                loading="lazy"
              />
            </div>
            <div className="lx-feature-copy">
              <h2 className="lx-display-l">Or Vivant</h2>
              <p>
                Links, hoops and signets in recycled 18k gold. The first Or Vivant link was drawn by Hélène
                Orvel in 1972 and is still hammered by hand on the same bench.
              </p>
              <button
                type="button"
                className="lx-link lx-link-btn"
                onClick={() => site.openCollections({ collection: "or-vivant" })}
              >
                Discover the collection
              </button>
            </div>
          </article>
        </div>
      </section>

      <section className="lx-section lx-stone lx-maison-teaser">
        <div className="lx-container lx-narrow lx-reveal">
          <p className="lx-statement">
            Every piece is made in the four rooms above our boutique on rue Saint-Honoré, by eleven people who
            know each other's hands.
          </p>
          <div className="lx-facts">
            <div>
              <h3>Recycled gold</h3>
              <p>All of our gold has been recycled since 2019, alloyed and cast in Paris.</p>
            </div>
            <div>
              <h3>Traced stones</h3>
              <p>Every diamond over 0.30 ct travels with its grading report and a record of its origin.</p>
            </div>
            <div>
              <h3>Care for life</h3>
              <p>Cleaning, claw checks and pearl restringing, free for as long as the piece is yours.</p>
            </div>
          </div>
          <button type="button" className="lx-link lx-link-btn" onClick={() => site.go("maison")}>
            Our history
          </button>
        </div>
      </section>

      <section className="lx-section lx-visit" aria-labelledby="lx-visit-title">
        <div className="lx-container">
          <div className="lx-visit-head lx-reveal">
            <h2 id="lx-visit-title" className="lx-display-l">
              See it in person
            </h2>
            <p>
              An hour with one of our advisers, in a boutique or by video. Try pieces, compare stones, and ask
              anything about sizing, engraving or a commission.
            </p>
            <button type="button" className="lx-btn" onClick={() => site.bookViewing()}>
              Book a private viewing
            </button>
          </div>
          <ul className="lx-visit-list">
            {BOUTIQUES.map((b) => (
              <li key={b.id}>
                <h3>{b.city}</h3>
                <p>{b.address[0]}</p>
                <p className="lx-muted">{b.hours[0]}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

import { useMemo, useState } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { CATEGORIES, COLLECTIONS, PRODUCTS, collectionById, img } from "../data";
import type { Category, CollectionId } from "../data";
import { ProductCard } from "../ui";
import type { Filter, SiteApi } from "../ui";

type Sort = "recommended" | "low" | "high";

export default function Collections({
  site,
  filter,
  setFilter,
}: {
  site: SiteApi;
  filter: Filter;
  setFilter: (next: Filter) => void;
}) {
  const [sort, setSort] = useState<Sort>("recommended");

  const items = useMemo(() => {
    const list = PRODUCTS.filter(
      (p) =>
        (filter.collection === "all" || p.collection === filter.collection) &&
        (filter.category === "All" || p.categories.includes(filter.category)),
    );
    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    return list;
  }, [filter, sort]);

  const setCollection = (collection: CollectionId | "all") => setFilter({ ...filter, collection });
  const setCategory = (category: Category | "All") => setFilter({ ...filter, category });
  const active = filter.collection === "all" ? null : collectionById(filter.collection);

  return (
    <>
      <section className="lx-page-head">
        <div className="lx-container">
          <h1 className="lx-display-xl">{filter.category === "Bridal" ? "Bridal" : "Collections"}</h1>
          <p className="lx-lead">
            {filter.category === "Bridal"
              ? "Engagement rings, wedding bands and pearls for the day, each sized and engraved in Paris."
              : "Three lines, one atelier. Every piece is made to order or finished by hand before it leaves Paris."}
          </p>
          <div className="lx-tabs" role="tablist" aria-label="Collection">
            <button
              type="button"
              role="tab"
              aria-selected={filter.collection === "all"}
              onClick={() => setCollection("all")}
            >
              All jewelry
            </button>
            {COLLECTIONS.map((c) => (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={filter.collection === c.id}
                onClick={() => setCollection(c.id)}
              >
                {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {active ? (
        <section className="lx-container">
          <article className="lx-story" key={active.id}>
            <div className="lx-story-media">
              <img src={img(active.image)} alt={active.imageAlt} />
            </div>
            <div className="lx-story-copy">
              <p className="lx-story-line">{active.line}</p>
              <h2 className="lx-display-l">{active.name}</h2>
              <p>{active.story}</p>
              <p className="lx-muted">{active.detail}</p>
            </div>
          </article>
        </section>
      ) : (
        <section className="lx-container">
          <div className="lx-mosaic">
            {COLLECTIONS.map((c, index) => (
              <button
                key={c.id}
                type="button"
                className={"lx-mosaic-item" + (index === 0 ? " is-lead" : "")}
                onClick={() => setCollection(c.id)}
              >
                <span className="lx-mosaic-media">
                  <img src={img(c.image)} alt={c.imageAlt} />
                </span>
                <span className="lx-mosaic-text">
                  <span className="lx-mosaic-name">{c.name}</span>
                  <span className="lx-mosaic-line">{c.line}</span>
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      <section className="lx-section lx-section--listing" aria-label="Pieces">
        <div className="lx-container">
          <div className="lx-toolbar">
            <div className="lx-chips" role="group" aria-label="Category">
              {(["All", ...CATEGORIES] as const).map((category) => (
                <button
                  key={category}
                  type="button"
                  className="lx-filter"
                  aria-pressed={filter.category === category}
                  onClick={() => setCategory(category)}
                >
                  {category === "All" ? "All pieces" : category}
                </button>
              ))}
            </div>
            <div className="lx-toolbar-end">
              <span className="lx-muted" aria-live="polite">
                {items.length} {items.length === 1 ? "piece" : "pieces"}
              </span>
              <label className="lx-sort">
                <span className="lx-visually-hidden">Sort by</span>
                <select value={sort} onChange={(e) => setSort(e.target.value as Sort)}>
                  <option value="recommended">Sort: Recommended</option>
                  <option value="low">Price, low to high</option>
                  <option value="high">Price, high to low</option>
                </select>
                <CaretDown size={14} weight="light" aria-hidden="true" />
              </label>
            </div>
          </div>

          {items.length > 0 ? (
            <div className="lx-grid lx-grid--4 lx-grid--listing">
              {items.map((product, index) => (
                <ProductCard key={product.slug} product={product} site={site} lazy={index > 3} />
              ))}
            </div>
          ) : (
            <div className="lx-empty">
              <p>No {filter.category.toLowerCase()} in {active?.name} at the moment.</p>
              <button type="button" className="lx-link lx-link-btn" onClick={() => setCategory("All")}>
                Show all pieces
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="lx-section lx-stone">
        <div className="lx-container lx-assist">
          <div>
            <h2 className="lx-display-m">Not sure of a size, or a stone?</h2>
            <p>
              Our advisers can send a ring sizer, compare diamonds side by side on video, or reserve pieces for
              you to try in Paris, New York or Tokyo.
            </p>
          </div>
          <button type="button" className="lx-btn lx-btn--ghost" onClick={() => site.bookViewing()}>
            Book a private viewing
          </button>
        </div>
      </section>
    </>
  );
}

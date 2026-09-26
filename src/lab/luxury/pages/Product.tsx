import { useState } from "react";
import { Check, Ruler, X } from "@phosphor-icons/react";
import { METAL_DETAIL, PRODUCTS, collectionById, formatPrice, img, productBySlug } from "../data";
import type { Metal, Product } from "../data";
import { Accordion, ProductCard } from "../ui";
import type { SiteApi } from "../ui";

const RING_SIZES = ["4", "4.5", "5", "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9"];
const SIZES: Record<Product["sizing"], string[]> = {
  ring: RING_SIZES,
  bracelet: ["S, 15 cm", "M, 16.5 cm", "L, 18 cm"],
  necklace: ["40 cm", "42 cm", "45 cm"],
  none: [],
};

const RING_GUIDE = [
  ["4", "46.8", "14.9"],
  ["5", "49.3", "15.7"],
  ["6", "51.9", "16.5"],
  ["7", "54.4", "17.3"],
  ["8", "57.0", "18.1"],
  ["9", "59.5", "18.9"],
];

function SizeGuide({ sizing, onClose }: { sizing: Product["sizing"]; onClose: () => void }) {
  return (
    <div className="lx-guide" role="dialog" aria-label="Size guide">
      <div className="lx-guide-head">
        <h3>Size guide</h3>
        <button type="button" className="lx-icon-btn" aria-label="Close size guide" onClick={onClose}>
          <X size={18} weight="light" />
        </button>
      </div>
      {sizing === "ring" ? (
        <>
          <table className="lx-table">
            <thead>
              <tr>
                <th scope="col">US size</th>
                <th scope="col">Circumference (mm)</th>
                <th scope="col">Diameter (mm)</th>
              </tr>
            </thead>
            <tbody>
              {RING_GUIDE.map(([us, c, d]) => (
                <tr key={us}>
                  <td>{us}</td>
                  <td>{c}</td>
                  <td>{d}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="lx-muted">
            Between sizes, choose the larger. We resize free of charge within the first year, and send a brass
            ring sizer on request.
          </p>
        </>
      ) : sizing === "bracelet" ? (
        <p>
          Measure your wrist just below the bone and add 1.5 cm for a close fit or 2.5 cm for a looser drape. S
          fits wrists of 13 to 14 cm, M 14.5 to 15.5 cm, L 16 to 17 cm.
        </p>
      ) : (
        <p>
          40 cm sits at the base of the neck, 42 cm at the collarbone, 45 cm just below it. Every chain has a
          jump ring at 38 cm so it can be worn shorter.
        </p>
      )}
    </div>
  );
}

export default function ProductPage({ site, slug }: { site: SiteApi; slug: string }) {
  const product = productBySlug(slug);
  const collection = collectionById(product.collection);
  const [shot, setShot] = useState(0);
  const [metal, setMetal] = useState<Metal>(product.metals[0]);
  const sizes = SIZES[product.sizing];
  const [size, setSize] = useState<string | null>(null);
  const [guide, setGuide] = useState(false);
  const [engrave, setEngrave] = useState(false);
  const [engraving, setEngraving] = useState("");
  const [added, setAdded] = useState(false);
  const [sizeError, setSizeError] = useState(false);

  const price = product.price * (1 + METAL_DETAIL[metal].surcharge);
  const related = PRODUCTS.filter((p) => p.collection === product.collection && p.slug !== product.slug).slice(0, 4);
  const current = product.gallery[shot] ?? product.gallery[0];

  const addToBag = () => {
    if (sizes.length > 0 && !size) {
      setSizeError(true);
      return;
    }
    site.addToBag(product.slug);
    setAdded(true);
  };

  return (
    <>
      <div className="lx-container">
        <nav className="lx-crumbs" aria-label="Breadcrumb">
          <a {...site.link("home")}>Home</a>
          <span aria-hidden="true">/</span>
          <a
            href="#collections"
            onClick={(event) => {
              event.preventDefault();
              site.openCollections({ collection: product.collection });
            }}
          >
            {collection.name}
          </a>
          <span aria-hidden="true">/</span>
          <span aria-current="page">{product.name}</span>
        </nav>
      </div>

      <section className="lx-container lx-pdp">
        <div className="lx-gallery">
          <div className="lx-gallery-main">
            <img
              key={shot}
              src={img(current.src)}
              alt={current.alt}
              style={current.zoom ? { objectPosition: current.zoom, transform: "scale(1.9)", transformOrigin: current.zoom } : undefined}
            />
          </div>
          <div className="lx-thumbs" role="group" aria-label="Images">
            {product.gallery.map((g, index) => (
              <button
                key={index}
                type="button"
                className="lx-thumb"
                aria-pressed={shot === index}
                aria-label={`Show image ${index + 1}: ${g.alt}`}
                onClick={() => setShot(index)}
              >
                <img
                  src={img(g.src)}
                  alt=""
                  style={g.zoom ? { objectPosition: g.zoom, transform: "scale(1.9)", transformOrigin: g.zoom } : undefined}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="lx-buy">
          <p className="lx-buy-collection">{collection.name}</p>
          <h1 className="lx-display-l">{product.name}</h1>
          <p className="lx-buy-price">{formatPrice(price)}</p>
          <p className="lx-buy-summary">{product.summary}</p>

          <fieldset className="lx-option">
            <legend>
              Metal <span className="lx-muted">{METAL_DETAIL[metal].label}</span>
            </legend>
            <div className="lx-choices">
              {product.metals.map((m) => (
                <button
                  key={m}
                  type="button"
                  className="lx-choice"
                  aria-pressed={metal === m}
                  onClick={() => setMetal(m)}
                >
                  <span className="lx-swatch" style={{ background: METAL_DETAIL[m].swatch }} aria-hidden="true" />
                  {m}
                </button>
              ))}
            </div>
          </fieldset>

          {sizes.length > 0 ? (
            <fieldset className="lx-option">
              <legend>
                {product.sizing === "necklace" ? "Length" : "Size"}
                {product.sizing === "ring" ? <span className="lx-muted">US sizes</span> : null}
              </legend>
              <div className={"lx-choices" + (product.sizing === "ring" ? " lx-choices--sizes" : "")}>
                {sizes.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className="lx-choice lx-choice--size"
                    aria-pressed={size === s}
                    onClick={() => {
                      setSize(s);
                      setSizeError(false);
                    }}
                  >
                    {s}
                  </button>
                ))}
              </div>
              {sizeError ? <p className="lx-error">Please choose a {product.sizing === "necklace" ? "length" : "size"}.</p> : null}
              <button type="button" className="lx-guide-btn" onClick={() => setGuide((g) => !g)} aria-expanded={guide}>
                <Ruler size={16} weight="light" />
                Size guide
              </button>
              {guide ? <SizeGuide sizing={product.sizing} onClose={() => setGuide(false)} /> : null}
            </fieldset>
          ) : null}

          <div className="lx-option">
            <label className="lx-check">
              <input type="checkbox" checked={engrave} onChange={(e) => setEngrave(e.target.checked)} />
              <span>Add a complimentary engraving</span>
            </label>
            {engrave ? (
              <div className="lx-field lx-field--engrave">
                <label htmlFor="lx-engraving">Engraving text</label>
                <input
                  id="lx-engraving"
                  maxLength={18}
                  value={engraving}
                  onChange={(e) => setEngraving(e.target.value)}
                  placeholder="L. & M. 14.06.2026"
                />
                <p className="lx-help">{18 - engraving.length} characters left. Engraved by hand, adds 3 days.</p>
              </div>
            ) : null}
          </div>

          <div className="lx-buy-actions">
            <button type="button" className="lx-btn lx-btn--block" onClick={addToBag}>
              Add to bag
            </button>
            <button type="button" className="lx-btn lx-btn--ghost lx-btn--block" onClick={() => site.bookViewing(product.slug)}>
              Book a private viewing
            </button>
          </div>
          {added ? (
            <p className="lx-added" role="status">
              <Check size={16} weight="light" /> Added to your bag. {metal}
              {size ? `, ${size}` : ""}
              {engrave && engraving ? `, engraved "${engraving}"` : ""}.
            </p>
          ) : null}
          <p className="lx-muted lx-buy-note">
            {product.sizing === "ring" ? "Made to order in 3 to 4 weeks." : "In stock. Ships from Paris in 2 business days."} Complimentary
            insured delivery.
          </p>

          <div className="lx-stones">
            <h2 className="lx-stones-title">Stones and certification</h2>
            <dl>
              <div>
                <dt>Metal</dt>
                <dd>{METAL_DETAIL[metal].label}</dd>
              </div>
              {product.stones.map((s) => (
                <div key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
              {product.certificate ? (
                <div>
                  <dt>Certification</dt>
                  <dd>{product.certificate}</dd>
                </div>
              ) : null}
              <div>
                <dt>Reference</dt>
                <dd>MO-{product.slug.length * 131 + product.price % 997}</dd>
              </div>
            </dl>
          </div>

          <Accordion
            items={[
              {
                title: "Delivery",
                body: (
                  <p>
                    Complimentary insured delivery in our signature box, signed for on arrival. United States 2 to 4
                    business days, Europe 1 to 3, Japan 3 to 5. Duties are included in the price shown.
                  </p>
                ),
              },
              {
                title: "Returns and exchanges",
                body: (
                  <p>
                    Return or exchange within 30 days in original condition, with a prepaid label. Engraved and
                    made-to-order pieces can be exchanged but not refunded.
                  </p>
                ),
              },
              {
                title: "Care",
                body: (
                  <p>
                    Keep pieces apart in their pouch, away from perfume and pools. Every Orvel piece includes
                    lifetime care: cleaning, claw checks and pearl restringing at any boutique, or by insured post
                    to the atelier.
                  </p>
                ),
              },
            ]}
          />
        </div>
      </section>

      {related.length > 0 ? (
        <section className="lx-section" aria-labelledby="lx-related">
          <div className="lx-container">
            <div className="lx-row-head">
              <h2 id="lx-related" className="lx-display-m">
                More from {collection.name}
              </h2>
              <a
                className="lx-link"
                href="#collections"
                onClick={(event) => {
                  event.preventDefault();
                  site.openCollections({ collection: product.collection });
                }}
              >
                Discover the collection
              </a>
            </div>
            <div className="lx-grid lx-grid--4">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} site={site} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}

import { Check, Minus } from "@phosphor-icons/react";
import { COMPARE_GROUPS, IMG, MODELS } from "../data";
import type { CompareCell, ModelId, Page } from "../data";
import { money } from "../ui";

function Cell({ value }: { value: CompareCell }) {
  if (value === true) return <Check size={18} aria-label="Yes" className="kv-cmp-yes" />;
  if (value === false) return <Minus size={18} aria-label="No" className="kv-cmp-no" />;
  return <>{value}</>;
}

function ModelVisual({ id }: { id: ModelId }) {
  if (id === "one") return <img src={IMG.one} alt="Kova One over-ear headphones in Graphite" />;
  if (id === "air") return <img src={IMG.air} alt="Kova Air on-ear headphones in Silver" />;
  return (
    <svg viewBox="0 0 200 150" role="img" aria-label="Kova Buds in their open charging case" className="kv-buds-art">
      <rect x="44" y="34" width="112" height="84" rx="38" />
      <path d="M58 60 H142" className="kv-buds-seam" />
      <ellipse cx="80" cy="86" rx="17" ry="19" className="kv-buds-well" />
      <ellipse cx="120" cy="86" rx="17" ry="19" className="kv-buds-well" />
      <circle cx="80" cy="84" r="11" />
      <circle cx="120" cy="84" r="11" />
      <circle cx="80" cy="84" r="4" className="kv-buds-mesh" />
      <circle cx="120" cy="84" r="4" className="kv-buds-mesh" />
      <circle cx="100" cy="108" r="2.2" className="kv-buds-led" />
    </svg>
  );
}

export default function Compare({ go }: { go: (page: Page) => void }) {
  return (
    <div className="kv-compare">
      <header className="kv-page-head kv-container">
        <h1>Which Kova is right for you?</h1>
        <p className="kv-lead">
          Three ways to listen, one sound signature. Every model is tuned to the same Kova Reference target.
        </p>
      </header>

      <div className="kv-container">
        <div className="kv-cmp-scroll">
          <table className="kv-cmp">
            <caption className="kv-visually-hidden">Kova One, Kova Air and Kova Buds compared</caption>
            <thead>
              <tr className="kv-cmp-models">
                <td />
                {MODELS.map((m) => (
                  <th key={m.id} scope="col">
                    <div className={`kv-cmp-visual kv-cmp-visual-${m.id}`}>
                      <ModelVisual id={m.id} />
                    </div>
                    <span className="kv-cmp-kind">{m.kind}</span>
                    <span className="kv-cmp-name">{m.name}</span>
                    <span className="kv-cmp-line">{m.line}</span>
                    <span className="kv-cmp-price">{money(m.price)}</span>
                    {m.id === "one" ? (
                      <button type="button" className="kv-btn kv-btn-small" onClick={() => go("buy")}>
                        Buy
                      </button>
                    ) : (
                      <span className="kv-cmp-soon">In stock, ships in 1 to 2 days</span>
                    )}
                  </th>
                ))}
              </tr>
            </thead>
            {COMPARE_GROUPS.map((group) => (
              <tbody key={group.title}>
                <tr className="kv-cmp-group">
                  <th scope="rowgroup" colSpan={4}>
                    {group.title}
                  </th>
                </tr>
                {group.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    {row.values.map((value, i) => (
                      <td key={MODELS[i].id} className={i === 0 ? "kv-cmp-first" : undefined}>
                        <Cell value={value} />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            ))}
          </table>
        </div>
      </div>

      <section className="kv-section kv-cmp-advice">
        <div className="kv-container kv-cmp-advice-grid">
          <h2 className="kv-h2">Still deciding?</h2>
          <div className="kv-cmp-advice-list">
            <p>
              <strong>Long flights and open offices.</strong> Kova One has the strongest noise cancelling, the
              longest battery and the biggest sound. It is also the one you can repair for years.
            </p>
            <p>
              <strong>Every day, everywhere.</strong> Kova Air weighs 182 g and folds into a jacket pocket. Noise
              cancelling is standard rather than adaptive.
            </p>
            <p>
              <strong>Runs, gyms and small bags.</strong> Kova Buds are IPX4 rated and charge wirelessly. You trade
              some battery and bass for freedom.
            </p>
            <button type="button" className="kv-link" onClick={() => go("support")}>
              Ask a Kova specialist
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

import { useState } from "react";
import { Info } from "@phosphor-icons/react";
import { AREAS, RATING_BARS, RESULTS, REVIEWS, type AreaId } from "../data-practice";
import { CtaBand, PageHero, Stars, type Go } from "../components";

type Filter = "all" | AreaId;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All results" },
  ...AREAS.map((a) => ({ id: a.id as Filter, label: a.title })),
];

export default function Results({ go }: { go: Go }) {
  const [filter, setFilter] = useState<Filter>("all");
  const list = filter === "all" ? RESULTS : RESULTS.filter((r) => r.area === filter);

  return (
    <>
      <PageHero
        crumb="Results & reviews"
        title="Case results and client reviews"
        text="A sample of recent outcomes, and what clients say about working with us."
      />

      <section className="lw-section">
        <div className="lw-wrap">
          <div className="lw-section-head lw-section-head-row">
            <h2>Selected case results</h2>
            <div className="lw-filter" role="group" aria-label="Filter results by practice area">
              {FILTERS.map((f) => (
                <button key={f.id} type="button" aria-pressed={filter === f.id} onClick={() => setFilter(f.id)}>
                  {f.label}
                </button>
              ))}
            </div>
          </div>
          <div className="lw-result-grid">
            {list.map((r) => (
              <article key={r.type + r.amount} className="lw-result">
                <strong className="lw-result-amount">{r.amount}</strong>
                <h3>{r.type}</h3>
                <p>{r.summary}</p>
                <span className="lw-result-where">{r.where}</span>
              </article>
            ))}
          </div>
          <p className="lw-disclaimer">
            <Info size={20} aria-hidden="true" />
            <span>
              <strong>Past results do not guarantee a similar outcome.</strong> Each case is different and the results
              above depend on the facts of those cases. Settlement amounts are gross figures before attorney fees and
              case costs. Client names are withheld to protect their privacy.
            </span>
          </p>
        </div>
      </section>

      <section className="lw-section lw-section-tint">
        <div className="lw-wrap lw-reviews-layout">
          <aside className="lw-rating-summary">
            <h2 className="lw-h2-sm">Client reviews</h2>
            <div className="lw-rating-score">
              <strong>4.9</strong>
              <div>
                <Stars size={20} />
                <span>212 Google reviews</span>
              </div>
            </div>
            <ul className="lw-rating-bars">
              {RATING_BARS.map((b) => (
                <li key={b.stars}>
                  <span>{b.stars} star</span>
                  <span className="lw-bar" aria-hidden="true">
                    <span style={{ width: `${b.pct}%` }} />
                  </span>
                  <span>{b.pct}%</span>
                </li>
              ))}
            </ul>
            <a className="lw-btn lw-btn-outline lw-btn-block" href="#review" onClick={(e) => e.preventDefault()}>
              Leave a review on Google
            </a>
          </aside>
          <div className="lw-review-wall">
            {REVIEWS.map((r) => (
              <figure key={r.name} className="lw-review">
                <Stars count={r.stars} size={16} />
                <blockquote>“{r.text}”</blockquote>
                <figcaption>
                  <strong>{r.name}</strong>, {r.place}
                  <span>
                    {r.area}, {r.date}
                  </span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <CtaBand go={go} />
    </>
  );
}

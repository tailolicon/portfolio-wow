import { useState } from "react";
import { PencilSimpleLine } from "@phosphor-icons/react";
import { BIZ, RATING_BARS, REVIEWS } from "../data";
import type { ServiceGroup } from "../data";
import { PageHero, Stars } from "../components";
import type { NavProps } from "../components";

type Filter = "all" | ServiceGroup;

const FILTERS: { id: Filter; label: string }[] = [
  { id: "all", label: "All reviews" },
  { id: "plumbing", label: "Plumbing" },
  { id: "hvac", label: "Heating & AC" },
];

const TOTAL = RATING_BARS.reduce((sum, b) => sum + b.count, 0);

export default function Reviews({ link }: NavProps) {
  const [filter, setFilter] = useState<Filter>("all");
  const shown = filter === "all" ? REVIEWS : REVIEWS.filter((r) => r.group === filter);

  return (
    <>
      <PageHero
        link={link}
        crumb="Reviews"
        title="Reviews from East Valley homeowners"
        text="Maria reads every review herself. If you weren't happy with a visit, expect a call from her."
      />

      <section className="sv-section sv-pt-sm">
        <div className="sv-wrap sv-rev-layout">
          <aside className="sv-summary" aria-label="Rating summary">
            <p className="sv-summary-score">{BIZ.rating}</p>
            <Stars size={22} />
            <p className="sv-summary-count">{BIZ.reviewCount} Google reviews</p>
            <ul className="sv-bars">
              {RATING_BARS.map((b) => {
                const pct = Math.round((b.count / TOTAL) * 100);
                return (
                  <li key={b.stars}>
                    <span className="sv-bar-label">{b.stars} star</span>
                    <span className="sv-bar-track" aria-hidden="true">
                      <span className="sv-bar-fill" style={{ width: `${Math.max(pct, 1)}%` }} />
                    </span>
                    <span className="sv-bar-pct">{pct}%</span>
                  </li>
                );
              })}
            </ul>
            <div className="sv-summary-other">
              <p><strong>4.8</strong> Yelp · 410 reviews</p>
              <p><strong>4.9</strong> Facebook · 285 reviews</p>
            </div>
            <a
              href="#write-review"
              onClick={(e) => e.preventDefault()}
              className="sv-btn sv-btn-navy sv-btn-block"
            >
              <PencilSimpleLine size={18} /> Write a review
            </a>
          </aside>

          <div>
            <div className="sv-filter" role="group" aria-label="Filter reviews">
              {FILTERS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className={filter === f.id ? "sv-on" : undefined}
                  aria-pressed={filter === f.id}
                  onClick={() => setFilter(f.id)}
                >
                  {f.label}
                  <span>{f.id === "all" ? REVIEWS.length : REVIEWS.filter((r) => r.group === f.id).length}</span>
                </button>
              ))}
            </div>
            <div className="sv-rev-list">
              {shown.map((r) => (
                <article className="sv-rev-item" key={r.name + r.date}>
                  <header>
                    <span className="sv-avatar" aria-hidden="true">{r.name[0]}</span>
                    <div>
                      <p className="sv-rev-name">{r.name}</p>
                      <p className="sv-rev-where">{r.city}, AZ · {r.date}</p>
                    </div>
                    <span className="sv-rev-src">Google</span>
                  </header>
                  <Stars n={r.stars} />
                  <p className="sv-rev-body">{r.text}</p>
                  <p className="sv-rev-tags">
                    <span className={`sv-tag sv-tag-${r.group}`}>{r.job}</span>
                    <span className="sv-tag">Technician: {r.tech}</span>
                  </p>
                </article>
              ))}
            </div>
            <p className="sv-rev-more">Showing the {shown.length} most recent. See all {BIZ.reviewCount} on Google.</p>
          </div>
        </div>
      </section>
    </>
  );
}

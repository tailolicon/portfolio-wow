import { useEffect, useRef, useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { COLORS, IMG, SPEC_GROUPS } from "../data";
import type { Page } from "../data";
import { FinishChip } from "../ui";

export default function Specs({ go }: { go: (page: Page) => void }) {
  const [active, setActive] = useState(SPEC_GROUPS[0].id);
  const groupRefs = useRef<Record<string, HTMLElement | null>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0])
          setActive(visible[0].target.id.replace("kv-group-", ""));
      },
      { rootMargin: "-20% 0px -60% 0px" },
    );
    Object.values(groupRefs.current).forEach(
      (el) => el && observer.observe(el),
    );
    return () => observer.disconnect();
  }, []);

  const jump = (id: string) => {
    setActive(id);
    groupRefs.current[id]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <div className="kv-specs">
      <section className="kv-specs-hero">
        <div className="kv-container kv-specs-hero-grid">
          <div>
            <h1 className="kv-specs-title">Kova One tech specs</h1>
            <p className="kv-lead">
              Over-ear wireless headphones with adaptive noise cancelling. Model
              KV-O1.
            </p>
            <div className="kv-specs-colors" aria-label="Available colours">
              {COLORS.map((c) => (
                <span key={c.id} className="kv-specs-color">
                  <FinishChip color={c.id} size={28} />
                  {c.name}
                </span>
              ))}
            </div>
            <div className="kv-specs-actions">
              <button
                type="button"
                className="kv-btn"
                onClick={() => go("buy")}
              >
                Buy
              </button>
              <button
                type="button"
                className="kv-link"
                onClick={() => go("compare")}
              >
                Compare models <CaretRight size={14} />
              </button>
            </div>
          </div>
          <div className="kv-specs-photo">
            <img src={IMG.one} alt="Kova One in Graphite" />
          </div>
        </div>
      </section>

      <section className="kv-specs-keys" aria-label="Key figures">
        <div className="kv-container">
          <dl className="kv-keys">
            <div>
              <dt>268 g</dt>
              <dd>weight</dd>
            </div>
            <div>
              <dt>42 h</dt>
              <dd>with noise cancelling</dd>
            </div>
            <div>
              <dt>40 mm</dt>
              <dd>custom dynamic drivers</dd>
            </div>
            <div>
              <dt>Up to 38 dB</dt>
              <dd>noise reduction</dd>
            </div>
            <div>
              <dt>Bluetooth 5.3</dt>
              <dd>multipoint, 2 devices</dd>
            </div>
          </dl>
        </div>
      </section>

      <section className="kv-specs-body">
        <div className="kv-container kv-specs-layout">
          <nav className="kv-specs-index" aria-label="Specification sections">
            {SPEC_GROUPS.map((g) => (
              <button
                key={g.id}
                type="button"
                className="kv-specs-index-link"
                aria-current={active === g.id ? "true" : undefined}
                onClick={() => jump(g.id)}
              >
                {g.title}
              </button>
            ))}
          </nav>
          <div className="kv-specs-groups">
            {SPEC_GROUPS.map((g) => (
              <section
                key={g.id}
                id={`kv-group-${g.id}`}
                ref={(el) => {
                  groupRefs.current[g.id] = el;
                }}
                className="kv-spec-card"
                aria-labelledby={`kv-spec-${g.id}`}
              >
                <h2 id={`kv-spec-${g.id}`}>{g.title}</h2>
                <dl>
                  {g.rows.map(([label, value]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{value}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            ))}
            <p className="kv-fine kv-specs-foot">
              Battery life measured by Kova in August 2026 with pre-production
              units streaming AAC at 50% volume. Results vary with use, settings
              and environment. Weight excludes cable and case.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

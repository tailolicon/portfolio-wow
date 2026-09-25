import { useState } from "react";
import { InstagramLogo } from "@phosphor-icons/react";
import { demoImg } from "../../shared";
import { BIZ, GALLERY } from "../data";
import type { GalleryTag } from "../data";
import type { PageProps } from "../types";
import { PageHero } from "./Services";

const FILTERS: ("All" | GalleryTag)[] = ["All", "Color", "Blonde", "Cuts", "Bridal"];

export function GalleryPage({ book }: PageProps) {
  const [filter, setFilter] = useState<"All" | GalleryTag>("All");
  const items = filter === "All" ? GALLERY : GALLERY.filter((g) => g.tag === filter);

  return (
    <>
      <PageHero
        title="Gallery"
        text="Recent color, cuts and bridal work from the team. We post new looks most days on Instagram."
      />

      <section className="sl-section sl-section--tight">
        <div className="sl-wrap">
          <div className="sl-gallery-bar">
            <div className="sl-chips" role="group" aria-label="Filter gallery">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  className="sl-chip"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                >
                  {f}
                </button>
              ))}
            </div>
            <span className="sl-muted">
              Showing {items.length} {items.length === 1 ? "look" : "looks"}
            </span>
          </div>

          <div className="sl-gallery">
            {items.map((g) => (
              <figure key={g.img} className={`sl-gitem${g.tall ? " sl-gitem--tall" : ""}`}>
                <img src={demoImg("salon", g.img)} alt={g.alt} loading="lazy" />
                <figcaption>
                  <strong>{g.look}</strong>
                  <span>{g.by}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="sl-cta">
        <div className="sl-wrap sl-cta-in">
          <InstagramLogo size={30} aria-hidden="true" />
          <h2 className="sl-h2">Bring your inspiration photos</h2>
          <p>
            Screenshots help a lot. Bring a few to your appointment, or send them to{" "}
            {BIZ.instagram} before your visit and your stylist will take a look.
          </p>
          <button type="button" className="sl-btn sl-btn--light" onClick={() => book()}>
            Book appointment
          </button>
        </div>
      </section>
    </>
  );
}

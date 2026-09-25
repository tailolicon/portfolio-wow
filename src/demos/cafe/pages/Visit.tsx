import {
  MapPinIcon,
  PhoneIcon,
  ClockIcon,
  CarIcon,
  WifiHighIcon,
  DogIcon,
  SunIcon,
  BabyIcon,
  CoffeeIcon,
  NavigationArrowIcon,
  WheelchairIcon,
} from "@phosphor-icons/react";
import type { Icon } from "@phosphor-icons/react";
import { LOCATIONS, JOBS, BRAND } from "../data";
import type { Location } from "../data";
import { img, PageHero, SectionHead, InstaGrid, mapSrc } from "../parts";
import type { PageProps } from "../parts";

const DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const WEEK_ORDER = [1, 2, 3, 4, 5, 6, 0];

const AMENITY_ICON: Record<string, Icon> = {
  "Free Wi‑Fi": WifiHighIcon,
  "Sidewalk patio": SunIcon,
  "Back patio": SunIcon,
  "Dog friendly patio": DogIcon,
  "Dog friendly": DogIcon,
  "Drive-up window": CarIcon,
  "Kids’ corner": BabyIcon,
  "Accessible restroom": WheelchairIcon,
};

function LocationCard({ loc }: { loc: Location }) {
  const today = new Date().getDay();
  const tel = loc.phone.replace(/\D/g, "");
  const directions = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.street}, ${loc.city}`)}`;
  return (
    <article className="cf-loc" id={`cf-loc-${loc.id}`}>
      <img className="cf-loc-img" src={img(loc.image)} alt={loc.imageAlt} />
      <div className="cf-loc-body">
        <h2 className="cf-h2">{loc.name}</h2>
        <p className="cf-loc-blurb">{loc.blurb}</p>
        <div className="cf-loc-cols">
          <div>
            <h3>
              <MapPinIcon size={18} aria-hidden="true" /> Address
            </h3>
            <p>
              {loc.street}
              <br />
              {loc.city}
            </p>
            <h3>
              <PhoneIcon size={18} aria-hidden="true" /> Phone
            </h3>
            <p>
              <a href={`tel:${tel}`}>{loc.phone}</a>
            </p>
            <h3>
              <CarIcon size={18} aria-hidden="true" /> Parking
            </h3>
            <p>{loc.parking}</p>
          </div>
          <div>
            <h3>
              <ClockIcon size={18} aria-hidden="true" /> Hours
            </h3>
            <table className="cf-hours">
              <tbody>
                {WEEK_ORDER.map((d) => (
                  <tr key={d} className={d === today ? "is-today" : ""}>
                    <th scope="row">
                      {DAYS[d]}
                      {d === today && <span className="cf-sr"> (today)</span>}
                    </th>
                    <td>{loc.daily[d]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <ul className="cf-amenities" aria-label="Amenities">
          {loc.amenities.map((a) => {
            const AmenityIcon = AMENITY_ICON[a] ?? CoffeeIcon;
            return (
              <li key={a}>
                <AmenityIcon size={17} aria-hidden="true" /> {a}
              </li>
            );
          })}
        </ul>
        <div className="cf-btn-row">
          <a className="cf-btn cf-btn--primary" href={directions} target="_blank" rel="noreferrer">
            <NavigationArrowIcon size={18} aria-hidden="true" /> Get directions
          </a>
          <a className="cf-btn cf-btn--ghost" href={`tel:${tel}`}>
            <PhoneIcon size={18} aria-hidden="true" /> Call {loc.name}
          </a>
        </div>
      </div>
      <iframe className="cf-map" title={`Map to our ${loc.name} location`} loading="lazy" src={mapSrc(loc.street, loc.city)} />
    </article>
  );
}

export default function Visit({ go }: PageProps) {
  return (
    <>
      <PageHero
        title="Locations and hours"
        lead="Downtown on Haywood Street, and out west on Haywood Road. Both shops serve the full menu. We post holiday hours on Instagram."
        image="street-patio"
        alt="Café tables on a sunny sidewalk patio"
      />

      <section className="cf-section cf-section--tight">
        <div className="cf-wrap cf-locs">
          {LOCATIONS.map((l) => (
            <LocationCard key={l.id} loc={l} />
          ))}
        </div>
      </section>

      <section className="cf-section cf-section--oat">
        <div className="cf-wrap">
          <SectionHead title="Good to know before you come" />
          <div className="cf-know-grid">
            <div className="cf-know">
              <WifiHighIcon size={28} aria-hidden="true" />
              <h3>Working from here</h3>
              <p>Free Wi‑Fi at both shops, with outlets along the window bar. On weekends from 9am to 1pm, please share the big tables.</p>
            </div>
            <div className="cf-know">
              <DogIcon size={28} aria-hidden="true" />
              <h3>Bring the pup</h3>
              <p>Dogs are welcome on both patios. Water bowls are out every day and pup cups are free.</p>
            </div>
            <div className="cf-know">
              <WheelchairIcon size={28} aria-hidden="true" />
              <h3>Accessibility</h3>
              <p>Both shops have step-free entrances and accessible restrooms. Large-print menus are available at the register.</p>
            </div>
            <div className="cf-know">
              <CarIcon size={28} aria-hidden="true" />
              <h3>Drive-up window</h3>
              <p>West Asheville only, 7am to 3pm daily. Order ahead and your cup will be waiting at the window.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cf-section" id="jobs">
        <div className="cf-wrap cf-jobs">
          <div>
            <p className="cf-eyebrow">Jobs</p>
            <h2 className="cf-h2">Work with us</h2>
            <p>
              We’re hiring at both shops. Everyone gets a living wage, an even share of tips, health coverage at 25 hours a
              week, free drinks on shift, and a bag of coffee every week.
            </p>
            <p className="cf-small">
              To apply, email a résumé or a few sentences about yourself to{" "}
              <a href={`mailto:jobs@${BRAND.domain}`}>jobs@{BRAND.domain}</a>, or drop it off at either shop.
            </p>
          </div>
          <ul className="cf-job-list">
            {JOBS.map((j) => (
              <li key={j.title}>
                <div>
                  <h3>{j.title}</h3>
                  <p>{j.place}</p>
                </div>
                <span>{j.pay}</span>
                <a className="cf-btn cf-btn--ghost cf-btn--sm" href={`mailto:jobs@${BRAND.domain}?subject=${encodeURIComponent(j.title)}`}>
                  Apply
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="cf-section cf-section--tight">
        <div className="cf-wrap">
          <div className="cf-cta-band">
            <div>
              <h2 className="cf-h3">Hosting a meeting or party?</h2>
              <p>Coffee boxes for 10 to 12 people are $38, delivered anywhere in Asheville.</p>
            </div>
            <button className="cf-btn cf-btn--primary" onClick={() => go("catering")}>
              See catering
            </button>
          </div>
        </div>
      </section>

      <InstaGrid />
    </>
  );
}

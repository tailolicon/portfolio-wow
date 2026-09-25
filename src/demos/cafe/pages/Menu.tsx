import { useState } from "react";
import { ShoppingBagIcon, RepeatIcon, TruckIcon, GiftIcon, LeafIcon } from "@phosphor-icons/react";
import { MENU, MILKS, SYRUPS, BEANS, TAG_LABEL, LOCATIONS } from "../data";
import type { MenuItem, MenuSection, Tag } from "../data";
import { img, todayHours } from "../parts";
import type { PageProps } from "../parts";

function Tags({ tags }: { tags?: Tag[] }) {
  if (!tags?.length) return null;
  return (
    <span className="cf-diet">
      {tags.map((t) => (
        <abbr key={t} title={TAG_LABEL[t]}>
          {t}
        </abbr>
      ))}
    </span>
  );
}

function Item({ item, sized }: { item: MenuItem; sized?: boolean }) {
  return (
    <li className="cf-item">
      <div className="cf-item-main">
        <h4>
          {item.name} <Tags tags={item.tags} />
          {item.isNew && <span className="cf-new">New</span>}
        </h4>
        {item.desc && <p>{item.desc}</p>}
      </div>
      {sized ? (
        <span className="cf-item-sizes">
          <span>{item.sizes ? item.sizes[0] : item.price}</span>
          <span>{item.sizes ? item.sizes[1] : ""}</span>
        </span>
      ) : (
        <span className="cf-item-price">{item.price}</span>
      )}
    </li>
  );
}

function Section({ section }: { section: MenuSection }) {
  return (
    <section id={`cf-menu-${section.id}`} className="cf-menu-sec" aria-labelledby={`cf-menu-h-${section.id}`}>
      <div className="cf-menu-sec-head">
        <h3 id={`cf-menu-h-${section.id}`} className="cf-h3">
          {section.title}
        </h3>
        {section.sized && (
          <span className="cf-item-sizes cf-item-sizes--head" aria-label="Sizes">
            <span>12oz</span>
            <span>16oz</span>
          </span>
        )}
      </div>
      {section.note && <p className="cf-menu-note">{section.note}</p>}
      <ul className={`cf-items${section.sized ? "" : " cf-items--two"}`}>
        {section.items.map((it) => (
          <Item key={it.name} item={it} sized={section.sized} />
        ))}
      </ul>
    </section>
  );
}

export default function Menu({ link }: PageProps) {
  const [active, setActive] = useState(MENU[0].id);

  const jump = (id: string) => {
    setActive(id);
    document.getElementById(`cf-menu-${id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <>
      <section className="cf-menu-hero">
        <div className="cf-wrap cf-menu-hero-grid">
          <div>
            <h1 className="cf-h1">Menu</h1>
            <p className="cf-lead">
              Same menu at both locations. Everything in the pastry case is baked in our Downtown kitchen each morning,
              and we make every syrup, sauce, and soup from scratch.
            </p>
          </div>
          <div className="cf-order-card" id="order">
            <h2 className="cf-h3">
              <ShoppingBagIcon size={22} aria-hidden="true" /> Order ahead for pickup
            </h2>
            <p>Pick a shop and your order will be ready in about 10 minutes.</p>
            <div className="cf-order-locs">
              {LOCATIONS.map((l, i) => (
                <a key={l.id} href={`#order-${l.id}`} onClick={(e) => e.preventDefault()} className="cf-order-loc">
                  <strong>{l.name}</strong>
                  <small>
                    {l.street}, open today {todayHours(i)}
                  </small>
                </a>
              ))}
            </div>
            <p className="cf-small">
              Prefer to call? Downtown {LOCATIONS[0].phone}, West Asheville {LOCATIONS[1].phone}
            </p>
          </div>
        </div>
      </section>

      <nav className="cf-menu-tabs" aria-label="Menu sections">
        <div className="cf-wrap">
          <ul>
            {MENU.map((s) => (
              <li key={s.id}>
                <button className={active === s.id ? "is-active" : ""} onClick={() => jump(s.id)}>
                  {s.title}
                </button>
              </li>
            ))}
            <li>
              <button className={active === "beans" ? "is-active" : ""} onClick={() => jump("beans")}>
                Whole bean
              </button>
            </li>
          </ul>
        </div>
      </nav>

      <div className="cf-wrap cf-menu-layout">
        <div className="cf-menu-main">
          {MENU.slice(0, 2).map((s) => (
            <Section key={s.id} section={s} />
          ))}
          <div className="cf-extras">
            <div>
              <h4>Milk options</h4>
              <p>{MILKS.join(", ")}</p>
            </div>
            <div>
              <h4>Syrups +$0.60</h4>
              <p>{SYRUPS.join(", ")}. We make all of them in-house except the sugar-free vanilla.</p>
            </div>
            <div>
              <h4>Extras</h4>
              <p>Extra shot +$1.00, cold foam +$1.00. Any drink can be made iced or half-caf at no charge.</p>
            </div>
          </div>
          {MENU.slice(2).map((s) => (
            <Section key={s.id} section={s} />
          ))}
        </div>
        <aside className="cf-menu-aside">
          <img src={img("bakery-case")} alt="Our pastry case stocked in the morning" loading="lazy" />
          <div className="cf-aside-box">
            <h4>
              <LeafIcon size={18} aria-hidden="true" /> Dietary key
            </h4>
            <ul className="cf-legend">
              {(Object.keys(TAG_LABEL) as Tag[]).map((t) => (
                <li key={t}>
                  <abbr className="cf-diet-badge">{t}</abbr> {TAG_LABEL[t]}
                </li>
              ))}
            </ul>
            <p className="cf-small">
              Our kitchen uses wheat, dairy, eggs, and tree nuts. Please tell your barista about any allergies.
            </p>
          </div>
          <div className="cf-aside-box cf-aside-box--honey">
            <h4>
              <GiftIcon size={18} aria-hidden="true" /> Honey Card
            </h4>
            <p>Every 10th drink is free. Ask for a card at the register.</p>
          </div>
        </aside>
      </div>

      <section id="cf-menu-beans" className="cf-section cf-section--oat cf-beans">
        <div className="cf-wrap">
          <div className="cf-head">
            <div>
              <p className="cf-eyebrow">Whole bean coffee</p>
              <h2 className="cf-h2">Take our coffee home</h2>
              <p className="cf-lead">
                12oz bags, roasted in Asheville within the week. Whole bean, or ground for your brewer at no charge.
              </p>
            </div>
          </div>
          <div className="cf-bean-grid">
            {BEANS.map((b) => (
              <article key={b.name} className="cf-bean">
                <span className={`cf-roast cf-roast--${b.roast.toLowerCase()}`}>{b.roast} roast</span>
                <h3>{b.name}</h3>
                <p className="cf-bean-origin">{b.origin}</p>
                <p className="cf-bean-notes">{b.notes}</p>
                <div className="cf-bean-foot">
                  <span className="cf-price">{b.price}</span>
                  <span className="cf-small">12oz bag</span>
                </div>
              </article>
            ))}
          </div>
          <div className="cf-sub">
            <div>
              <RepeatIcon size={24} aria-hidden="true" />
              <p>
                <strong>Coffee subscription:</strong> any roast every 2 or 4 weeks, save 10% on every bag.
              </p>
            </div>
            <div>
              <TruckIcon size={24} aria-hidden="true" />
              <p>
                <strong>Free local delivery</strong> in Asheville; $6 flat-rate shipping everywhere else.
              </p>
            </div>
            <a className="cf-btn cf-btn--primary" href="#subscribe" onClick={(e) => e.preventDefault()}>
              Start a subscription
            </a>
          </div>
          <p className="cf-small cf-center">
            Need coffee for a crowd? See our <a {...link("catering")}>catering coffee boxes</a>.
          </p>
        </div>
      </section>
    </>
  );
}

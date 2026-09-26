import { useState } from "react";
import type { FormEvent } from "react";
import { ArrowRight, Check, X } from "@phosphor-icons/react";
import { COLLECTIONS, PRODUCTS, collectionById, formatPrice, img } from "./data";
import type { SiteApi } from "./ui";

/* Header drop-down panels for Maison Orvel: search, account and the mini bag. */

export type PanelId = "search" | "account" | "bag";
export type BagItem = { id: number; slug: string; price: number; note: string };

const fold = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase();

function SearchPanel({ site }: { site: SiteApi }) {
  const [query, setQuery] = useState("");
  const q = fold(query.trim());
  const results = q
    ? PRODUCTS.filter((p) => fold(p.name).includes(q) || fold(collectionById(p.collection).name).includes(q)).slice(0, 6)
    : [];

  return (
    <div className="lx-panel-inner lx-search">
      <label htmlFor="lx-search-input" className="lx-visually-hidden">
        Search the maison
      </label>
      <input
        id="lx-search-input"
        className="lx-search-input"
        type="search"
        placeholder="Search pieces or collections"
        autoComplete="off"
        autoFocus
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      {!q ? (
        <div className="lx-search-suggest">
          <p className="lx-panel-label">Collections</p>
          <div className="lx-search-chips">
            {COLLECTIONS.map((c) => (
              <button key={c.id} type="button" className="lx-search-chip" onClick={() => site.openCollections({ collection: c.id })}>
                {c.name}
              </button>
            ))}
          </div>
        </div>
      ) : results.length === 0 ? (
        <p className="lx-panel-empty" role="status">
          No pieces match "{query.trim()}".{" "}
          <button type="button" className="lx-link lx-link-btn" onClick={() => site.openCollections()}>
            View all collections
          </button>
        </p>
      ) : (
        <ul className="lx-search-results" role="list" aria-live="polite">
          {results.map((p) => (
            <li key={p.slug}>
              <button type="button" className="lx-search-hit" onClick={() => site.openProduct(p.slug)}>
                <img src={img(p.image)} alt="" loading="lazy" />
                <span>
                  <span className="lx-search-name">{p.name}</span>
                  <span className="lx-search-meta">{collectionById(p.collection).name}</span>
                </span>
                <span className="lx-search-price">{formatPrice(p.price)}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function AccountPanel({ site, onCare }: { site: SiteApi; onCare: () => void }) {
  const [signedIn, setSignedIn] = useState(false);
  const submit = (event: FormEvent) => {
    event.preventDefault();
    setSignedIn(true);
  };

  return (
    <div className="lx-panel-inner lx-panel-narrow">
      <p className="lx-panel-title">Client account</p>
      {signedIn ? (
        <p className="lx-panel-note" role="status">
          <Check size={16} weight="light" /> Welcome back. Your saved pieces and appointments are kept by your client advisor.
        </p>
      ) : (
        <form className="lx-account-form" onSubmit={submit}>
          <div className="lx-field">
            <label htmlFor="lx-acc-email">Email address</label>
            <input id="lx-acc-email" type="email" required autoComplete="email" />
          </div>
          <div className="lx-field">
            <label htmlFor="lx-acc-pass">Password</label>
            <input id="lx-acc-pass" type="password" required autoComplete="current-password" />
          </div>
          <button type="submit" className="lx-btn lx-btn--block">
            Sign in
          </button>
        </form>
      )}
      <div className="lx-panel-links">
        <a {...site.link("appointments")}>
          Book a private viewing <ArrowRight size={14} weight="light" />
        </a>
        <a
          href="#maison"
          onClick={(event) => {
            event.preventDefault();
            onCare();
          }}
        >
          Lifetime care <ArrowRight size={14} weight="light" />
        </a>
      </div>
    </div>
  );
}

function BagPanel({ site, bag, onRemove, onCheckout }: { site: SiteApi; bag: BagItem[]; onRemove: (id: number) => void; onCheckout: () => void }) {
  const [confirmed, setConfirmed] = useState(false);
  const subtotal = bag.reduce((sum, item) => sum + item.price, 0);

  if (confirmed) {
    return (
      <div className="lx-panel-inner lx-panel-narrow">
        <p className="lx-panel-title">Thank you</p>
        <p className="lx-panel-note" role="status">
          <Check size={16} weight="light" /> Your pieces are reserved. A client advisor will call within one business day to confirm
          sizing and arrange insured delivery.
        </p>
        <div className="lx-panel-links">
          <a {...site.link("appointments")}>
            Prefer to see them first? Book a private viewing <ArrowRight size={14} weight="light" />
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="lx-panel-inner lx-panel-narrow">
      <p className="lx-panel-title">Your bag</p>
      {bag.length === 0 ? (
        <>
          <p className="lx-panel-empty">Your bag is empty.</p>
          <button type="button" className="lx-btn lx-btn--ghost lx-btn--block" onClick={() => site.openCollections()}>
            Explore the collections
          </button>
        </>
      ) : (
        <>
          <ul className="lx-bag-list" role="list">
            {bag.map((item) => {
              const product = PRODUCTS.find((p) => p.slug === item.slug) ?? PRODUCTS[0];
              return (
                <li key={item.id}>
                  <button type="button" className="lx-bag-thumb" onClick={() => site.openProduct(product.slug)} aria-label={product.name}>
                    <img src={img(product.image)} alt="" loading="lazy" />
                  </button>
                  <span className="lx-bag-info">
                    <span className="lx-search-name">{product.name}</span>
                    <span className="lx-search-meta">{item.note}</span>
                  </span>
                  <span className="lx-search-price">{formatPrice(item.price)}</span>
                  <button type="button" className="lx-icon-btn lx-bag-remove" aria-label={`Remove ${product.name}`} onClick={() => onRemove(item.id)}>
                    <X size={14} weight="light" />
                  </button>
                </li>
              );
            })}
          </ul>
          <p className="lx-bag-subtotal">
            <span>Subtotal</span>
            <strong>{formatPrice(subtotal)}</strong>
          </p>
          <p className="lx-help">Complimentary insured delivery, duties included.</p>
          <button
            type="button"
            className="lx-btn lx-btn--block"
            onClick={() => {
              setConfirmed(true);
              onCheckout();
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export function HeaderPanel({
  panel,
  site,
  bag,
  onCare,
  onRemove,
  onCheckout,
}: {
  panel: PanelId;
  site: SiteApi;
  bag: BagItem[];
  onCare: () => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) {
  const labels: Record<PanelId, string> = { search: "Search", account: "Account", bag: "Bag" };
  return (
    <div className={"lx-panel lx-panel--" + panel} role="region" aria-label={labels[panel]}>
      {panel === "search" && <SearchPanel site={site} />}
      {panel === "account" && <AccountPanel site={site} onCare={onCare} />}
      {panel === "bag" && <BagPanel site={site} bag={bag} onRemove={onRemove} onCheckout={onCheckout} />}
    </div>
  );
}

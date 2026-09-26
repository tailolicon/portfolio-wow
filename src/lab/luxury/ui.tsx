import { useState } from "react";
import type { MouseEvent, ReactNode } from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import type { Category, CollectionId, Product } from "./data";
import { collectionById, formatPrice, img } from "./data";

export const PAGES = ["home", "collections", "product", "maison", "appointments"] as const;
export type Page = (typeof PAGES)[number];

export type Filter = { category: Category | "All"; collection: CollectionId | "all" };

export type SiteApi = {
  go: (page: Page) => void;
  link: (page: Page) => {
    href: string;
    "aria-current"?: "page";
    onClick: (event: MouseEvent<HTMLElement>) => void;
  };
  openProduct: (slug: string) => void;
  openCollections: (filter?: Partial<Filter>) => void;
  bookViewing: (slug?: string) => void;
  addToBag: (label: string) => void;
};

export function ProductCard({
  product,
  site,
  lazy = true,
  sizes = "md",
}: {
  product: Product;
  site: SiteApi;
  lazy?: boolean;
  sizes?: "md" | "lg";
}) {
  const collection = collectionById(product.collection);
  return (
    <a
      className={"lx-card lx-card--" + sizes}
      href="#product"
      onClick={(event) => {
        event.preventDefault();
        site.openProduct(product.slug);
      }}
    >
      <span className="lx-card-media">
        <img src={img(product.image)} alt={product.alt} loading={lazy ? "lazy" : undefined} />
      </span>
      <span className="lx-card-meta">
        <span className="lx-card-name">{product.name}</span>
        <span className="lx-card-line">
          {collection.name}
          {product.isNew ? <span className="lx-card-new">New</span> : null}
        </span>
        <span className="lx-card-price">{formatPrice(product.price)}</span>
      </span>
    </a>
  );
}

export function Accordion({ items }: { items: { title: string; body: ReactNode }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="lx-accordion">
      {items.map((item, index) => {
        const isOpen = open === index;
        const id = "lx-acc-" + item.title.toLowerCase().replace(/[^a-z]+/g, "-");
        return (
          <div className={"lx-acc-item" + (isOpen ? " is-open" : "")} key={item.title}>
            <button
              type="button"
              className="lx-acc-head"
              aria-expanded={isOpen}
              aria-controls={id}
              onClick={() => setOpen(isOpen ? null : index)}
            >
              <span>{item.title}</span>
              {isOpen ? <Minus size={16} weight="light" /> : <Plus size={16} weight="light" />}
            </button>
            <div className="lx-acc-panel" id={id} role="region">
              <div className="lx-acc-inner">{item.body}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

import { lazy, Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export type LabSiteId = "luxury" | "saas" | "architecture" | "agency" | "product";

export type LabSiteMeta = {
  id: LabSiteId;
  brand: string;
  industry: string;
  summary: string;
  domain: string;
  /** Accent used to theme the portfolio page while this site is selected. */
  color: string;
  secondary: string;
  glow: string;
};

export const labSites: LabSiteMeta[] = [
  {
    id: "luxury",
    brand: "Maison Orvel",
    industry: "Fine jewelry",
    summary: "Collections, product pages and private appointments for a Paris jewelry house.",
    domain: "maisonorvel.com",
    color: "#ff4fd8",
    secondary: "#ffc857",
    glow: "255, 79, 216",
  },
  {
    id: "saas",
    brand: "Veyra",
    industry: "AI analytics SaaS",
    summary: "Product tour, pricing, customer stories and a demo request flow for a data platform.",
    domain: "veyra.ai",
    color: "#7c5cff",
    secondary: "#00f0ff",
    glow: "0, 240, 255",
  },
  {
    id: "architecture",
    brand: "Oyelaran Hart",
    industry: "Architecture studio",
    summary: "A project archive, detailed case pages and studio profile for a London practice.",
    domain: "oyelaranhart.com",
    color: "#f0ff74",
    secondary: "#ff6337",
    glow: "240, 255, 116",
  },
  {
    id: "agency",
    brand: "Wren & Volt",
    industry: "Brand & motion studio",
    summary: "Selected work, case studies, services and a project brief for a Brooklyn studio.",
    domain: "wrenandvolt.studio",
    color: "#ff3d6e",
    secondary: "#a85cff",
    glow: "255, 61, 110",
  },
  {
    id: "product",
    brand: "Kova One",
    industry: "Headphone launch",
    summary: "Launch page, tech specs, model comparison, support and checkout for a flagship product.",
    domain: "kova.audio",
    color: "#50ffb1",
    secondary: "#4ab8ff",
    glow: "80, 255, 177",
  },
];

// Each brand site is its own chunk, loaded only when it is shown.
const sites: Record<LabSiteId, LazyExoticComponent<ComponentType>> = {
  luxury: lazy(() => import("./lab/luxury")),
  saas: lazy(() => import("./lab/saas")),
  architecture: lazy(() => import("./lab/architecture")),
  agency: lazy(() => import("./lab/agency")),
  product: lazy(() => import("./lab/product")),
};

export const isLabSiteId = (value: string | null): value is LabSiteId =>
  labSites.some((site) => site.id === value);

export function LabSite({ id }: { id: LabSiteId }) {
  const Site = sites[id];
  return (
    <Suspense fallback={<div className="demo-site lab-site-loading" />}>
      <Site key={id} />
    </Suspense>
  );
}

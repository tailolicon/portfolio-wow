import { lazy, Suspense } from "react";
import type { ComponentType, LazyExoticComponent } from "react";

export type BusinessDemoId =
  | "restaurant"
  | "cafe"
  | "salon"
  | "services"
  | "fitness"
  | "professional";

export const businessDemoMeta = [
  { id: "restaurant" as const, label: "Restaurant", kicker: "Menu · reservations · online order", color: "#9b2f22", domain: "nonnarosaatx.com" },
  { id: "cafe" as const, label: "Café / Bakery", kicker: "Menu · locations · catering", color: "#b5763a", domain: "hearthandhoney.coffee" },
  { id: "salon" as const, label: "Hair Salon", kicker: "Services · stylists · booking", color: "#7d8a6a", domain: "ivyandoakstudio.com" },
  { id: "services" as const, label: "Plumbing & HVAC", kicker: "Services · service area · quote", color: "#0a4fa3", domain: "summitplumbingair.com" },
  { id: "fitness" as const, label: "Gym / Studio", kicker: "Schedule · membership · free trial", color: "#e2461d", domain: "forgestrength.club" },
  { id: "professional" as const, label: "Law Firm", kicker: "Practice areas · attorneys · consult", color: "#1d2e45", domain: "harperreyeslaw.com" },
];

// Each demo site is its own chunk, loaded only when a visitor opens that industry.
const sites: Record<BusinessDemoId, LazyExoticComponent<ComponentType>> = {
  restaurant: lazy(() => import("./demos/restaurant")),
  cafe: lazy(() => import("./demos/cafe")),
  salon: lazy(() => import("./demos/salon")),
  services: lazy(() => import("./demos/services")),
  fitness: lazy(() => import("./demos/fitness")),
  professional: lazy(() => import("./demos/professional")),
};

export function BusinessDemo({ id }: { id: BusinessDemoId }) {
  const Site = sites[id];
  // key resets page state when switching industries
  return (
    <Suspense fallback={<div className="demo-site" style={{ minHeight: "60vh" }} />}>
      <Site key={id} />
    </Suspense>
  );
}

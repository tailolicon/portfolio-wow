import { useCallback, useRef, useState } from "react";
import type { MouseEvent } from "react";
import "./base.css";

export type DemoImageFolder =
  | "restaurant"
  | "cafe"
  | "salon"
  | "services"
  | "fitness"
  | "professional"
  | "people"
  | "lab-luxury"
  | "lab-saas"
  | "lab-architecture"
  | "lab-agency"
  | "lab-product";

/** Local stock photo shipped in public/demos/<folder>/<name>.webp */
export const demoImg = (folder: DemoImageFolder, name: string) => `./demos/${folder}/${name}.webp`;

const SCROLLERS = ".biz-product-scroll, .biz-full-demo-scroll, .lab-preview-scroll, .lab-full-scroll";

/** True when the site is open fullscreen from a shareable URL (?demo= for business, ?site= for brand sites). */
const isFullscreenUrl = (params: URLSearchParams) => params.has("demo") || params.has("site");

function readInitialPage<P extends string>(pages: readonly P[]): P {
  const params = new URLSearchParams(window.location.search);
  const requested = params.get("page");
  if (isFullscreenUrl(params) && requested && (pages as readonly string[]).includes(requested)) {
    return requested as P;
  }
  return pages[0];
}

/**
 * Multi-page navigation for a demo site. Pages live in React state; in the fullscreen
 * demo the current page is mirrored to ?page= so a shared link opens the same page.
 */
export function useSitePages<P extends string>(pages: readonly P[]) {
  const [page, setPage] = useState<P>(() => readInitialPage(pages));
  const rootRef = useRef<HTMLDivElement>(null);

  const go = useCallback(
    (next: P) => {
      setPage(next);
      const url = new URL(window.location.href);
      if (isFullscreenUrl(url.searchParams)) {
        if (next === pages[0]) url.searchParams.delete("page");
        else url.searchParams.set("page", next);
        window.history.replaceState(window.history.state, "", url);
      }
      rootRef.current?.closest(SCROLLERS)?.scrollTo({ top: 0 });
    },
    [pages],
  );

  /** Spread onto an <a>: <a {...link("menu")}>Menu</a> */
  const link = useCallback(
    (target: P) => ({
      href: `#${target}`,
      "aria-current": page === target ? ("page" as const) : undefined,
      onClick: (event: MouseEvent<HTMLElement>) => {
        event.preventDefault();
        go(target);
      },
    }),
    [go, page],
  );

  return { page, go, link, rootRef };
}

/** Prevents a real submit and flips a "sent" flag so demo forms can show a thank-you state. */
export function useDemoForm() {
  const [sent, setSent] = useState(false);
  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setSent(true);
  };
  return { sent, onSubmit, reset: () => setSent(false) };
}

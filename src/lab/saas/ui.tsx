import { createContext, useContext, useEffect, useRef, useState } from "react";
import type { ElementType, ReactNode } from "react";
import type { Customer, Page } from "./data";

/* ------------------------------------------------------------------ navigation context */

export type Nav = {
  go: (page: Page) => void;
  link: (page: Page) => {
    href: string;
    "aria-current": "page" | undefined;
    onClick: (event: React.MouseEvent<HTMLElement>) => void;
  };
  goSection: (page: Page, id: string) => void;
  openStory: (slug: string) => void;
};

export const NavContext = createContext<Nav | null>(null);
export function useNav() {
  const nav = useContext(NavContext);
  if (!nav) throw new Error("useNav must be used inside the Veyra site");
  return nav;
}

/* ------------------------------------------------------------------ visibility */

/** True once the element has entered the viewport (or immediately when motion is reduced). */
export function useInView<T extends Element>(threshold = 0.2) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export function Reveal({
  as: Tag = "div",
  className = "",
  children,
  delay = 0,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
  delay?: number;
}) {
  const { ref, inView } = useInView<HTMLElement>(0.12);
  return (
    <Tag
      ref={ref}
      className={`vy-reveal ${inView ? "is-in" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}

/* ------------------------------------------------------------------ brand */

export function Logo() {
  return (
    <span className="vy-logo">
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true">
        <rect x="0.5" y="0.5" width="21" height="21" rx="5.5" className="vy-logo-tile" />
        <path d="M5.5 7 L11 16 L13.6 11.6" className="vy-logo-stroke" />
        <path d="M13.6 11.6 L16.5 6.5" className="vy-logo-accent" />
      </svg>
      <span className="vy-logo-word">veyra</span>
    </span>
  );
}

const MARKS: Record<Customer["mark"], ReactNode> = {
  ring: <circle cx="9" cy="9" r="6" fill="none" strokeWidth="3" stroke="currentColor" />,
  half: (
    <>
      <circle cx="9" cy="9" r="7" fill="none" strokeWidth="1.8" stroke="currentColor" />
      <path d="M9 2 a7 7 0 0 1 0 14 z" fill="currentColor" />
    </>
  ),
  stack: (
    <>
      <rect x="2" y="3" width="14" height="3" fill="currentColor" />
      <rect x="2" y="7.5" width="10" height="3" fill="currentColor" />
      <rect x="2" y="12" width="6" height="3" fill="currentColor" />
    </>
  ),
  slash: <path d="M4 16 L11 2 H15 L8 16 Z" fill="currentColor" />,
  notch: <path d="M2 2 H16 V16 H9 V9 H2 Z" fill="currentColor" />,
  arc: <path d="M2 15 A7 7 0 0 1 16 15 Z" fill="currentColor" />,
  bar: (
    <>
      <rect x="3" y="2" width="3" height="14" fill="currentColor" />
      <rect x="8" y="6" width="3" height="10" fill="currentColor" />
      <rect x="13" y="10" width="3" height="6" fill="currentColor" />
    </>
  ),
  grid: (
    <>
      <rect x="2" y="2" width="6" height="6" fill="currentColor" />
      <rect x="10" y="10" width="6" height="6" fill="currentColor" />
      <rect x="10" y="2" width="6" height="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
    </>
  ),
};

/** Fictional customer wordmark: a simple geometric glyph plus a typeset name. */
export function CustomerMark({ customer, size = "md" }: { customer: Pick<Customer, "name" | "mark" | "style">; size?: "md" | "sm" }) {
  return (
    <span className={`vy-cmark vy-cmark--${customer.style} vy-cmark--${size}`}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        {MARKS[customer.mark]}
      </svg>
      <span>{customer.name}</span>
    </span>
  );
}

/** Square monogram tile for story cards. */
export function Monogram({ mark }: { mark: Customer["mark"] }) {
  return (
    <span className="vy-monogram" aria-hidden="true">
      <svg width="18" height="18" viewBox="0 0 18 18">
        {MARKS[mark]}
      </svg>
    </span>
  );
}

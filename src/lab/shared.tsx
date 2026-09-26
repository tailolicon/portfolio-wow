import { Component, lazy, Suspense, useEffect, useRef, useState } from "react";
import type { ComponentType, ReactNode } from "react";

/**
 * Lazy-load one ThreeUI component so its WebGL code ships only with the site that uses it.
 *   const Nebula = lazyThree(() =>
 *     import("@designcodeio/threeui/components/NebulaBackground").then((m) => m.NebulaBackground));
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- keeps each component's own prop types
export function lazyThree<C extends ComponentType<any>>(loader: () => Promise<C>) {
  return lazy(async () => ({ default: await loader() }));
}

class SceneBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return reduced;
}

/**
 * Hosts a WebGL scene. The scene mounts only while the host is near the viewport (so a page never
 * holds many GPU contexts), and `fallback` (usually a still image or gradient) is shown instead when
 * WebGL fails, while loading, or when the visitor prefers reduced motion.
 * The host fills its positioned parent; give the parent a size.
 */
export function ThreeCanvas({
  children,
  fallback,
  className = "",
}: {
  children: ReactNode;
  fallback: ReactNode;
  className?: string;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    const observer = new IntersectionObserver(([entry]) => setNear(entry.isIntersecting), {
      rootMargin: "300px 0px",
    });
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const showScene = near && !reduced;

  return (
    <div ref={hostRef} className={"lab-three " + className} aria-hidden="true">
      {showScene ? (
        <SceneBoundary fallback={fallback}>
          <Suspense fallback={fallback}>{children}</Suspense>
        </SceneBoundary>
      ) : (
        fallback
      )}
    </div>
  );
}

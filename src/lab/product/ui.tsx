import { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import { COLORS } from "./data";
import type { ColorId } from "./data";

/** Adds .kv-in to every .kv-reveal inside the returned ref once it enters the viewport. */
export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const targets = root.querySelectorAll(".kv-reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("kv-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, []);
  return ref;
}

/** A rendered finish chip: anodised cup ring around the cushion colour. Not a photograph. */
export function FinishChip({ color, size = 56 }: { color: ColorId; size?: number }) {
  const finish = COLORS.find((c) => c.id === color) ?? COLORS[0];
  const style = {
    "--kv-chip-cup": finish.cup,
    "--kv-chip-cushion": finish.cushion,
    width: size,
    height: size,
  } as CSSProperties;
  return <span className="kv-chip" style={style} aria-hidden="true" />;
}

export const money = (value: number) =>
  value.toLocaleString("en-US", { style: "currency", currency: "USD", minimumFractionDigits: value % 1 ? 2 : 0 });

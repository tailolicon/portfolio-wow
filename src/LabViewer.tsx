import { useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import { LabSite, labSites } from "./LabSites";
import type { LabSiteId } from "./LabSites";
import "./lab.css";

/** Fullscreen view of one brand site, with a switcher bar. Mirrors ?view=lab&site=<id>. */
export default function LabViewer({
  activeId,
  onSelect,
  onClose,
}: {
  activeId: LabSiteId;
  onSelect: (id: LabSiteId) => void;
  onClose: () => void;
}) {
  const active = labSites.find((site) => site.id === activeId) ?? labSites[0];

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="lab-full" role="dialog" aria-modal="true" aria-label={active.brand + " website"}>
      <header className="lab-full-header">
        <button type="button" className="lab-full-back" onClick={onClose}>
          <ArrowLeft size={16} /> Portfolio
        </button>
        <div className="lab-full-title">
          <strong>{active.brand}</strong>
          <span>{active.industry} · {active.domain}</span>
        </div>
        <nav className="lab-full-switch" aria-label="Switch brand website">
          {labSites.map((site) => (
            <button
              type="button"
              key={site.id}
              className={site.id === activeId ? "is-active" : ""}
              aria-pressed={site.id === activeId}
              onClick={() => onSelect(site.id)}
            >
              {site.brand}
            </button>
          ))}
        </nav>
        <button type="button" className="lab-full-close" onClick={onClose} aria-label="Close">
          <X size={17} />
        </button>
      </header>
      <div className="lab-full-scroll">
        <LabSite id={activeId} />
      </div>
    </div>
  );
}

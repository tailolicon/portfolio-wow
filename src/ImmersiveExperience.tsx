import {
  lazy,
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  CircleStop,
  Command,
  CornerUpLeft,
  Move,
  RotateCw,
  ScanLine,
  Sparkles,
  X,
} from "lucide-react";
import "./immersive.css";

export type ImmersiveWorldId =
  | "luxury"
  | "future"
  | "editorial"
  | "experimental"
  | "product";

export type ImmersiveWorld = {
  id: ImmersiveWorldId;
  index: string;
  label: string;
  eyebrow: string;
  title: string;
  note: string;
  color: string;
  secondary: string;
  glow: string;
};

type Props = {
  world: ImmersiveWorld;
  worlds: ImmersiveWorld[];
  reducedMotion: boolean;
  autoPlay?: boolean;
  onClose: () => void;
  onWorldChange?: (id: ImmersiveWorldId) => void;
  onInteract?: () => void;
};

const NebulaBackground = lazy(() =>
  import("@designcodeio/threeui/components/NebulaBackground").then((module) => ({
    default: module.NebulaBackground,
  })),
);
const OrbitalSphereBackground = lazy(() =>
  import("@designcodeio/threeui/components/OrbitalSphereBackground").then((module) => ({
    default: module.OrbitalSphereBackground,
  })),
);
const HalftoneFlow = lazy(() =>
  import("@designcodeio/threeui/components/HalftoneFlow").then((module) => ({
    default: module.HalftoneFlow,
  })),
);
const TopologyField = lazy(() =>
  import("@designcodeio/threeui/components/TopologyField").then((module) => ({
    default: module.TopologyField,
  })),
);
const ParticleNetwork = lazy(() =>
  import("@designcodeio/threeui/components/ParticleNetwork").then((module) => ({
    default: module.ParticleNetwork,
  })),
);

const screenCopy: Record<
  ImmersiveWorldId,
  Array<{ label: string; title: string; copy: string; stamp: string }>
> = {
  luxury: [
    {
      label: "Maison / 01",
      title: "Desire, staged in silence.",
      copy: "A digital flagship where restraint makes every material feel more expensive.",
      stamp: "Private collection",
    },
    {
      label: "Material / 02",
      title: "Touch the collection.",
      copy: "Drag through the surface study. The interface behaves like a sample book, not a catalogue.",
      stamp: "Atelier interaction",
    },
    {
      label: "Edition / 03",
      title: "Scarcity becomes interface.",
      copy: "Details arrive slowly, intentionally — the same rhythm as a private showroom appointment.",
      stamp: "Edition 01 / 24",
    },
  ],
  future: [
    {
      label: "System / 01",
      title: "Make complexity feel obvious.",
      copy: "Signals, models and infrastructure become a readable live system rather than a wall of dashboards.",
      stamp: "Orbit intelligence",
    },
    {
      label: "Console / 02",
      title: "Ask the interface to prove itself.",
      copy: "Run a scan and watch the system explain what it sees. Technical credibility becomes theatre.",
      stamp: "Realtime command layer",
    },
    {
      label: "Network / 03",
      title: "Every node tells a story.",
      copy: "Data is shaped into motion, priority and confidence so the product feels alive before sign-up.",
      stamp: "Signal fabric",
    },
  ],
  editorial: [
    {
      label: "Volume / 01",
      title: "Whitespace is architecture.",
      copy: "An editorial system where scale, silence and imbalance give the work authority.",
      stamp: "Monolith journal",
    },
    {
      label: "Grid / 02",
      title: "Break the grid on purpose.",
      copy: "Drag the field. Layout becomes a living composition while type remains calm and legible.",
      stamp: "12-column study",
    },
    {
      label: "Archive / 03",
      title: "A catalogue that breathes.",
      copy: "Projects are treated like pages in a monograph — numbered, paced, and allowed to hold space.",
      stamp: "Archive / 2026",
    },
  ],
  experimental: [
    {
      label: "Signal / 01",
      title: "Useful can still feel dangerous.",
      copy: "A reactive identity built from distortion, type collisions and controlled visual instability.",
      stamp: "Void protocol",
    },
    {
      label: "Interference / 02",
      title: "Move through the noise.",
      copy: "Your pointer becomes part of the artwork. The interface responds like a live instrument.",
      stamp: "Reactive state",
    },
    {
      label: "Broadcast / 03",
      title: "Never the same frame twice.",
      copy: "The brand behaves as a system, not a logo — recognisable even when the composition mutates.",
      stamp: "Transmission X-09",
    },
  ],
  product: [
    {
      label: "Object / 01",
      title: "Make one object feel inevitable.",
      copy: "Light, perspective and motion remove everything except the product and the urge to inspect it.",
      stamp: "Object study 001",
    },
    {
      label: "Finish / 02",
      title: "Turn it. Choose a finish.",
      copy: "A tactile configurator that makes the product feel physical without requiring a video or asset-heavy viewer.",
      stamp: "Material laboratory",
    },
    {
      label: "Launch / 03",
      title: "One object. One decision.",
      copy: "The final screen collapses the spectacle into a clear commercial moment: understand it, want it, act.",
      stamp: "Launch edition",
    },
  ],
};

const finishOptions = [
  { name: "Pearl", value: "#e9fff7" },
  { name: "Graphite", value: "#596168" },
  { name: "Signal", value: "#77ffbf" },
];

function WorldBackdrop({
  id,
  reducedMotion,
}: {
  id: ImmersiveWorldId;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return <div className="ix-static-backdrop" aria-hidden="true" />;

  return (
    <Suspense fallback={<div className="ix-static-backdrop" aria-hidden="true" />}>
      {id === "luxury" && (
        <NebulaBackground
          className="ix-three"
          mode="dark"
          hue={324}
          saturation={1.28}
          brightness={0.78}
        />
      )}
      {id === "future" && <OrbitalSphereBackground className="ix-three" />}
      {id === "editorial" && (
        <HalftoneFlow
          className="ix-three"
          mode="dark"
          hue={64}
          saturation={1.05}
          brightness={0.9}
        />
      )}
      {id === "experimental" && (
        <TopologyField
          className="ix-three"
          mode="dark"
          hue={350}
          saturation={1.35}
          brightness={0.9}
        />
      )}
      {id === "product" && (
        <ParticleNetwork
          className="ix-three"
          mode="dark"
          hue={155}
          saturation={1.1}
          brightness={0.92}
        />
      )}
    </Suspense>
  );
}

function LuxuryInteraction({ onInteract }: { onInteract?: () => void }) {
  const [reveal, setReveal] = useState(52);
  const dragging = useRef(false);

  const setFromPointer = (event: ReactPointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const next = ((event.clientX - rect.left) / rect.width) * 100;
    setReveal(Math.max(8, Math.min(92, next)));
  };

  return (
    <div
      className="ix-luxury-swatch"
      style={{ "--reveal": reveal + "%" } as CSSProperties}
      onPointerDown={(event) => {
        dragging.current = true;
        event.currentTarget.setPointerCapture(event.pointerId);
        setFromPointer(event);
        onInteract?.();
      }}
      onPointerMove={(event) => {
        if (dragging.current) setFromPointer(event);
      }}
      onPointerUp={() => {
        dragging.current = false;
      }}
      aria-label="Drag across the material card to reveal the alternate finish"
    >
      <div className="ix-luxury-layer ix-luxury-layer-a">
        <span>SILK / ONYX</span>
        <b>NOIR</b>
      </div>
      <div className="ix-luxury-layer ix-luxury-layer-b">
        <span>SATIN / ROSE</span>
        <b>ÉCLAT</b>
      </div>
      <div className="ix-reveal-rule">
        <i />
        <span>DRAG</span>
      </div>
    </div>
  );
}

function FutureInteraction({ onInteract }: { onInteract?: () => void }) {
  const [scan, setScan] = useState(0);
  const logs = [
    ["EDGE_14", "stable", "11 ms"],
    ["VISION_02", "synced", "99.8%"],
    ["VECTOR_88", "ready", "1.2 M"],
    ["MODEL_A7", "online", "24 tok/s"],
  ];
  const active = logs[scan % logs.length];

  return (
    <div className="ix-console">
      <div className="ix-console-head">
        <span><Command size={14} /> ORBIT COMMAND</span>
        <i>live</i>
      </div>
      <div className="ix-console-grid" aria-hidden="true">
        {Array.from({ length: 18 }).map((_, index) => (
          <span key={index} style={{ "--delay": index } as CSSProperties} />
        ))}
        <ScanLine className="ix-scan-icon" />
      </div>
      <div className="ix-console-readout">
        <small>NODE</small><b>{active[0]}</b>
        <small>STATE</small><b>{active[1]}</b>
        <small>RESPONSE</small><b>{active[2]}</b>
      </div>
      <button
        type="button"
        className="ix-action-button"
        onClick={() => {
          setScan((value) => value + 1);
          onInteract?.();
        }}
      >
        RUN NEXT SCAN <ArrowRight size={15} />
      </button>
    </div>
  );
}

function EditorialInteraction({ onInteract }: { onInteract?: () => void }) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const origin = useRef<{ x: number; y: number; ox: number; oy: number } | null>(null);

  return (
    <div
      className="ix-editorial-grid"
      style={
        {
          "--grid-x": offset.x + "px",
          "--grid-y": offset.y + "px",
        } as CSSProperties
      }
      onPointerDown={(event) => {
        origin.current = {
          x: event.clientX,
          y: event.clientY,
          ox: offset.x,
          oy: offset.y,
        };
        event.currentTarget.setPointerCapture(event.pointerId);
        onInteract?.();
      }}
      onPointerMove={(event) => {
        if (!origin.current) return;
        setOffset({
          x: Math.max(-90, Math.min(90, origin.current.ox + event.clientX - origin.current.x)),
          y: Math.max(-70, Math.min(70, origin.current.oy + event.clientY - origin.current.y)),
        });
      }}
      onPointerUp={() => {
        origin.current = null;
      }}
      aria-label="Drag the editorial grid to shift the composition"
    >
      <div className="ix-grid-lines" />
      <div className="ix-architecture-form form-a" />
      <div className="ix-architecture-form form-b" />
      <strong>FORM<br />FOLLOWS<br /><em>FEELING.</em></strong>
      <span><Move size={14} /> DRAG THE GRID</span>
    </div>
  );
}

function ExperimentalInteraction({ onInteract }: { onInteract?: () => void }) {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [hits, setHits] = useState(0);

  return (
    <div
      className="ix-glitch-field"
      style={
        {
          "--gx": position.x + "%",
          "--gy": position.y + "%",
          "--glitch": String((hits % 5) + 1),
        } as CSSProperties
      }
      onPointerMove={(event) => {
        const rect = event.currentTarget.getBoundingClientRect();
        setPosition({
          x: ((event.clientX - rect.left) / rect.width) * 100,
          y: ((event.clientY - rect.top) / rect.height) * 100,
        });
      }}
      onPointerDown={() => {
        setHits((value) => value + 1);
        onInteract?.();
      }}
      aria-label="Move the pointer across the signal field to distort it"
    >
      <div className="ix-glitch-noise" />
      <span className="ix-glitch-copy ghost-a">NO SIGNAL</span>
      <span className="ix-glitch-copy ghost-b">NO SIGNAL</span>
      <span className="ix-glitch-copy">NO SIGNAL</span>
      <div className="ix-glitch-cursor" />
      <small>MOVE / PRESS / INTERFERE</small>
    </div>
  );
}

function ProductInteraction({ onInteract }: { onInteract?: () => void }) {
  const [rotation, setRotation] = useState({ x: -10, y: 30 });
  const [finish, setFinish] = useState(finishOptions[0]);
  const origin = useRef<{ x: number; y: number; rx: number; ry: number } | null>(null);

  return (
    <div className="ix-product-lab">
      <div
        className="ix-product-turntable"
        onPointerDown={(event) => {
          origin.current = {
            x: event.clientX,
            y: event.clientY,
            rx: rotation.x,
            ry: rotation.y,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
          onInteract?.();
        }}
        onPointerMove={(event) => {
          if (!origin.current) return;
          setRotation({
            x: Math.max(-32, Math.min(22, origin.current.rx - (event.clientY - origin.current.y) * 0.2)),
            y: origin.current.ry + (event.clientX - origin.current.x) * 0.35,
          });
        }}
        onPointerUp={() => {
          origin.current = null;
        }}
        aria-label="Drag to rotate the product"
      >
        <div
          className="ix-product-cube"
          style={
            {
              "--rx": rotation.x + "deg",
              "--ry": rotation.y + "deg",
              "--finish": finish.value,
            } as CSSProperties
          }
        >
          <div className="ix-cube-face ix-cube-front"><i /></div>
          <div className="ix-cube-face ix-cube-back" />
          <div className="ix-cube-face ix-cube-left" />
          <div className="ix-cube-face ix-cube-right" />
          <div className="ix-cube-face ix-cube-top" />
          <div className="ix-cube-face ix-cube-bottom" />
        </div>
        <span><RotateCw size={14} /> DRAG TO ROTATE</span>
      </div>
      <div className="ix-finishes" aria-label="Choose a product finish">
        {finishOptions.map((option) => (
          <button
            type="button"
            key={option.name}
            className={finish.name === option.name ? "is-active" : ""}
            onClick={() => {
              setFinish(option);
              onInteract?.();
            }}
          >
            <i style={{ background: option.value }} />
            {option.name}
          </button>
        ))}
      </div>
    </div>
  );
}

function WorldInteraction({
  id,
  onInteract,
}: {
  id: ImmersiveWorldId;
  onInteract?: () => void;
}) {
  if (id === "luxury") return <LuxuryInteraction onInteract={onInteract} />;
  if (id === "future") return <FutureInteraction onInteract={onInteract} />;
  if (id === "editorial") return <EditorialInteraction onInteract={onInteract} />;
  if (id === "experimental") return <ExperimentalInteraction onInteract={onInteract} />;
  return <ProductInteraction onInteract={onInteract} />;
}

function StoryPanel({
  world,
  screen,
}: {
  world: ImmersiveWorld;
  screen: number;
}) {
  const copy = screenCopy[world.id][screen];

  if (screen === 0) {
    return (
      <div className="ix-story ix-story-opening">
        <small>{copy.label}</small>
        <h2>{copy.title}</h2>
        <p>{copy.copy}</p>
        <span className="ix-story-stamp">{copy.stamp}</span>
      </div>
    );
  }

  if (screen === 1) {
    return (
      <div className="ix-story ix-story-interaction">
        <div>
          <small>{copy.label}</small>
          <h2>{copy.title}</h2>
          <p>{copy.copy}</p>
        </div>
        <WorldInteraction id={world.id} />
      </div>
    );
  }

  return (
    <div className="ix-story ix-story-finale">
      <div className="ix-finale-index">{world.index}</div>
      <div>
        <small>{copy.label}</small>
        <h2>{copy.title}</h2>
        <p>{copy.copy}</p>
        <div className="ix-finale-tags">
          <span>ART DIRECTION</span>
          <span>INTERACTION</span>
          <span>FRONTEND</span>
        </div>
      </div>
    </div>
  );
}

export default function ImmersiveExperience({
  world,
  worlds,
  reducedMotion,
  autoPlay = false,
  onClose,
  onWorldChange,
  onInteract,
}: Props) {
  const [screen, setScreen] = useState(0);
  const [exiting, setExiting] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  const copy = useMemo(() => screenCopy[world.id], [world.id]);
  const worldIndex = worlds.findIndex((candidate) => candidate.id === world.id);

  const requestClose = useCallback(() => {
    if (exiting) return;
    setExiting(true);
    if (reducedMotion) {
      onClose();
      return;
    }
    window.setTimeout(onClose, 520);
  }, [exiting, onClose, reducedMotion]);

  const go = useCallback(
    (direction: 1 | -1) => {
      const next = screen + direction;
      if (next >= 0 && next < copy.length) {
        setScreen(next);
        onInteract?.();
        return;
      }
      const nextWorldIndex = (worldIndex + direction + worlds.length) % worlds.length;
      const nextWorld = worlds[nextWorldIndex];
      onWorldChange?.(nextWorld.id);
      setScreen(direction === 1 ? 0 : 2);
      onInteract?.();
    },
    [copy.length, onInteract, onWorldChange, screen, worldIndex, worlds],
  );

  useEffect(() => {
    previousFocus.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocus.current?.focus?.();
    };
  }, []);

  useEffect(() => {
    setScreen(0);
  }, [world.id]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") requestClose();
      if (event.key === "ArrowRight") go(1);
      if (event.key === "ArrowLeft") go(-1);
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = Array.from(
          dialogRef.current.querySelectorAll<HTMLElement>(
            'button,[href],[tabindex]:not([tabindex="-1"])',
          ),
        ).filter((element) => !element.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, requestClose]);

  useEffect(() => {
    if (!autoPlay || reducedMotion || exiting) return;
    const timer = window.setTimeout(() => go(1), 2600);
    return () => window.clearTimeout(timer);
  }, [autoPlay, exiting, go, reducedMotion, screen, world.id]);

  const interaction = screen === 1;

  return (
    <div
      ref={dialogRef}
      className={
        "immersive " +
        "immersive-" +
        world.id +
        (exiting ? " is-exiting" : "") +
        (autoPlay ? " is-showreel" : "")
      }
      role="dialog"
      aria-modal="true"
      aria-label={autoPlay ? "PRISM LAB showreel" : world.label + " immersive concept"}
      style={
        {
          "--ix-accent": world.color,
          "--ix-secondary": world.secondary,
          "--ix-rgb": world.glow,
        } as CSSProperties
      }
    >
      <div className="ix-curtain ix-curtain-a" aria-hidden="true" />
      <div className="ix-curtain ix-curtain-b" aria-hidden="true" />

      <div className="ix-backdrop" aria-hidden="true">
        <WorldBackdrop id={world.id} reducedMotion={reducedMotion} />
        <div className="ix-backdrop-scrim" />
      </div>

      <header className="ix-header">
        <div className="ix-brand">
          <i />
          <span>{autoPlay ? "PRISM / SHOWREEL" : world.title}</span>
        </div>

        <nav aria-label="Immersive world sections">
          {copy.map((item, index) => (
            <button
              type="button"
              key={item.label}
              className={screen === index ? "is-active" : ""}
              onClick={() => {
                setScreen(index);
                onInteract?.();
              }}
              aria-current={screen === index ? "page" : undefined}
            >
              0{index + 1}
              <span>{item.label.split(" / ")[0]}</span>
            </button>
          ))}
        </nav>

        <button
          type="button"
          ref={closeButtonRef}
          className="ix-close"
          onClick={requestClose}
          aria-label="Return to portfolio"
        >
          <span>RETURN</span>
          <X size={18} />
        </button>
      </header>

      <div className="ix-world-rail" aria-label="Switch immersive world">
        {worlds.map((item) => (
          <button
            type="button"
            key={item.id}
            className={item.id === world.id ? "is-active" : ""}
            onClick={() => {
              onWorldChange?.(item.id);
              setScreen(0);
              onInteract?.();
            }}
            aria-label={"Open " + item.label + " world"}
          >
            <span>{item.index}</span>
            <i />
          </button>
        ))}
      </div>

      <main className={"ix-content " + (interaction ? "is-interaction" : "")}>
        <div className="ix-scene-number" aria-hidden="true">
          {world.index}.{screen + 1}
        </div>

        <div className="ix-screen" key={world.id + "-" + screen}>
          {screen === 1 ? (
            <div className="ix-interactive-layout">
              <div className="ix-interactive-copy">
                <small>{copy[screen].label}</small>
                <h2>{copy[screen].title}</h2>
                <p>{copy[screen].copy}</p>
                <span>{copy[screen].stamp}</span>
              </div>
              <WorldInteraction id={world.id} onInteract={onInteract} />
            </div>
          ) : (
            <StoryPanel world={world} screen={screen} />
          )}
        </div>
      </main>

      <div className="ix-hud">
        <div>
          <span>WORLD</span>
          <b>{world.label}</b>
        </div>
        <div>
          <span>SCENE</span>
          <b>{screen + 1} / 3</b>
        </div>
        <div>
          <span>MODE</span>
          <b>{autoPlay ? (reducedMotion ? "MANUAL / REDUCED MOTION" : "AUTO SHOWREEL") : "EXPLORE"}</b>
        </div>
      </div>

      <footer className="ix-controls">
        <button type="button" onClick={() => go(-1)} aria-label="Previous immersive scene">
          <ChevronLeft size={19} />
          <span>PREV</span>
        </button>

        <div className="ix-progress" aria-label={"Scene " + (screen + 1) + " of 3"}>
          {copy.map((_, index) => (
            <i
              key={index}
              className={index === screen ? "is-active" : index < screen ? "is-past" : ""}
            />
          ))}
        </div>

        <button type="button" onClick={() => go(1)} aria-label="Next immersive scene">
          <span>NEXT</span>
          <ChevronRight size={19} />
        </button>
      </footer>

      {autoPlay && (
        <button type="button" className="ix-stop-reel" onClick={requestClose}>
          <CircleStop size={15} />
          STOP SHOWREEL
        </button>
      )}

      <div className="ix-corner-note" aria-hidden="true">
        {interaction ? "INTERACTIVE / TOUCH OR POINTER" : "CONCEPT EXPERIENCE"}
      </div>

      <div className="ix-key-hint" aria-hidden="true">
        <ArrowLeft size={12} /> <ArrowRight size={12} /> NAVIGATE
        <CornerUpLeft size={12} /> ESC RETURN
        <Sparkles size={12} /> LIVE
      </div>
    </div>
  );
}

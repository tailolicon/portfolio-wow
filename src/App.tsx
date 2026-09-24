import {
  Component,
  lazy,
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import type {
  CSSProperties,
  PointerEvent as ReactPointerEvent,
  ReactNode,
} from "react";
import {
  Activity,
  ArrowDownRight,
  ArrowUpRight,
  Asterisk,
  AudioWaveform,
  Box,
  CircleDot,
  Cpu,
  Layers3,
  Maximize2,
  MousePointer2,
  Orbit,
  Play,
  Sparkles,
  Store,
  Zap,
} from "lucide-react";

const LiquidFormBackground = lazy(() =>
  import("@designcodeio/threeui/components/LiquidFormBackground").then((module) => ({
    default: module.LiquidFormBackground,
  })),
);
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
const EmberStorm = lazy(() =>
  import("@designcodeio/threeui/components/EmberStorm").then((module) => ({
    default: module.EmberStorm,
  })),
);

const ImmersiveExperience = lazy(() => import("./ImmersiveExperience"));
const BusinessStudio = lazy(() => import("./BusinessStudio"));

type WorldId = "luxury" | "future" | "editorial" | "experimental" | "product";

type World = {
  id: WorldId;
  index: string;
  label: string;
  eyebrow: string;
  title: string;
  note: string;
  color: string;
  secondary: string;
  glow: string;
  metric: string;
  metricLabel: string;
};

const worlds: World[] = [
  {
    id: "luxury",
    index: "01",
    label: "Luxury",
    eyebrow: "Sculpted for desire",
    title: "NOIR / ÉCLAT",
    note: "A fashion house that feels less like a website and more like stepping into a private showroom.",
    color: "#ff4fd8",
    secondary: "#ffc857",
    glow: "255, 79, 216",
    metric: "4.8×",
    metricLabel: "more memorable",
  },
  {
    id: "future",
    index: "02",
    label: "Future SaaS",
    eyebrow: "Clarity in motion",
    title: "ORBIT / OS",
    note: "Complex technology translated into a living interface that feels effortless before the first click.",
    color: "#7c5cff",
    secondary: "#00f0ff",
    glow: "0, 240, 255",
    metric: "120fps",
    metricLabel: "motion target",
  },
  {
    id: "editorial",
    index: "03",
    label: "Editorial",
    eyebrow: "Space becomes status",
    title: "MONOLITH / 24",
    note: "Architecture, culture and restraint — with motion that behaves like an art director, not a slideshow.",
    color: "#f0ff74",
    secondary: "#ff6337",
    glow: "240, 255, 116",
    metric: "12 cols",
    metricLabel: "broken beautifully",
  },
  {
    id: "experimental",
    index: "04",
    label: "Experimental",
    eyebrow: "Designed to be felt",
    title: "SIGNAL / VOID",
    note: "A controlled collision of type, distortion, depth and reactive systems for brands that refuse safe.",
    color: "#ff3d6e",
    secondary: "#a85cff",
    glow: "255, 61, 110",
    metric: "∞",
    metricLabel: "possible states",
  },
  {
    id: "product",
    index: "05",
    label: "Product",
    eyebrow: "Make the object heroic",
    title: "OBJECT / ONE",
    note: "A product launch where light, depth and interaction do the selling before the copy needs to.",
    color: "#50ffb1",
    secondary: "#4ab8ff",
    glow: "80, 255, 177",
    metric: "3D",
    metricLabel: "native storytelling",
  },
];

const capabilities = [
  {
    icon: Orbit,
    title: "Interactive worlds",
    text: "WebGL scenes that react to motion, pointer, scroll and intent.",
  },
  {
    icon: AudioWaveform,
    title: "Kinetic identity",
    text: "Type, rhythm and transitions designed as part of the brand voice.",
  },
  {
    icon: Layers3,
    title: "Depth without clutter",
    text: "Layered motion that feels cinematic while keeping the message obvious.",
  },
  {
    icon: Zap,
    title: "Fast enough to sell",
    text: "Heavy visuals loaded intelligently, with fallbacks for real-world devices.",
  },
];

const projects = [
  {
    number: "A",
    category: "Hospitality / Concept",
    name: "AFTERGLOW",
    copy: "A midnight reservation experience where the menu behaves like light through smoked glass.",
    className: "project-a",
  },
  {
    number: "B",
    category: "Technology / Concept",
    name: "NEURAL ATLAS",
    copy: "A data product introduced through a responsive field of signals, nodes and impossible depth.",
    className: "project-b",
  },
  {
    number: "C",
    category: "Architecture / Concept",
    name: "VOLUME ZERO",
    copy: "Editorial restraint, architectural scale and motion that lets the work breathe.",
    className: "project-c",
  },
];

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  return reduced;
}

function usePageEffects(reducedMotion: boolean) {
  useEffect(() => {
    const root = document.documentElement;
    let frame = 0;

    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        root.style.setProperty("--mx", String(event.clientX) + "px");
        root.style.setProperty("--my", String(event.clientY) + "px");
      });
    };

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = max > 0 ? window.scrollY / max : 0;
      root.style.setProperty("--scroll-progress", String(progress));
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -7% 0px" },
    );
    elements.forEach((element) => observer.observe(element));

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("scroll", onScroll);
      observer.disconnect();
    };
  }, [reducedMotion]);
}

class SceneBoundary extends Component<
  { children: ReactNode; className?: string },
  { failed: boolean }
> {
  state = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  render() {
    if (this.state.failed) {
      return <div className={"scene-fallback " + (this.props.className ?? "")} aria-hidden="true" />;
    }
    return this.props.children;
  }
}

function SceneLoader() {
  return (
    <div className="scene-loader" aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  if (reducedMotion) {
    return <div className="hero-static-scene" aria-hidden="true" />;
  }

  return (
    <SceneBoundary className="hero-static-scene">
      <Suspense fallback={<SceneLoader />}>
        <LiquidFormBackground
          className="three-scene"
          speed={0.55}
          morph={1.1}
          noiseScale={1.15}
          mouseAmount={0.28}
          metal={0.92}
          camera={5.2}
          tintHue={285}
          tintAmount={0.52}
        />
      </Suspense>
    </SceneBoundary>
  );
}

function WorldEffect({
  id,
  color,
  reducedMotion,
}: {
  id: WorldId;
  color: string;
  reducedMotion: boolean;
}) {
  if (reducedMotion) return <div className="world-static" style={{ "--world": color } as CSSProperties} />;

  return (
    <SceneBoundary className="world-static">
      <Suspense fallback={<SceneLoader />}>
        {id === "luxury" && (
          <NebulaBackground className="three-scene" mode="dark" hue={324} saturation={1.28} brightness={0.88} />
        )}
        {id === "future" && <OrbitalSphereBackground className="three-scene" />}
        {id === "editorial" && (
          <HalftoneFlow className="three-scene" mode="dark" hue={66} saturation={1.12} brightness={1.05} />
        )}
        {id === "experimental" && (
          <TopologyField className="three-scene" mode="dark" hue={350} saturation={1.35} brightness={0.95} />
        )}
        {id === "product" && (
          <ParticleNetwork className="three-scene" mode="dark" hue={155} saturation={1.18} brightness={1.03} />
        )}
      </Suspense>
    </SceneBoundary>
  );
}

function MagneticLink({
  children,
  href,
  className = "",
}: {
  children: ReactNode;
  href: string;
  className?: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);

  const move = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * 0.16;
    const y = (event.clientY - rect.top - rect.height / 2) * 0.16;
    element.style.transform = "translate3d(" + x + "px," + y + "px,0)";
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <a
      ref={ref}
      className={"magnetic " + className}
      href={href}
      onPointerMove={move}
      onPointerLeave={reset}
    >
      {children}
    </a>
  );
}

function TiltCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const move = (event: ReactPointerEvent<HTMLDivElement>) => {
    const card = ref.current;
    if (!card || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = card.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    card.style.setProperty("--tilt-x", String(py * -7) + "deg");
    card.style.setProperty("--tilt-y", String(px * 9) + "deg");
    card.style.setProperty("--spot-x", String((px + 0.5) * 100) + "%");
    card.style.setProperty("--spot-y", String((py + 0.5) * 100) + "%");
  };

  const reset = () => {
    const card = ref.current;
    if (!card) return;
    card.style.setProperty("--tilt-x", "0deg");
    card.style.setProperty("--tilt-y", "0deg");
  };

  return (
    <div ref={ref} className={"tilt-card " + className} onPointerMove={move} onPointerLeave={reset}>
      {children}
    </div>
  );
}

function WorldComposition({ world }: { world: World }) {
  if (world.id === "luxury") {
    return (
      <div className="composition composition-luxury">
        <div className="luxury-word">ÉCLAT</div>
        <div className="luxury-ring" />
        <div className="luxury-label">PARIS · 2026</div>
        <div className="luxury-copy">PRIVATE COLLECTION / 01</div>
      </div>
    );
  }

  if (world.id === "future") {
    return (
      <div className="composition composition-future">
        <div className="future-grid" />
        <div className="future-orbit future-orbit-a" />
        <div className="future-orbit future-orbit-b" />
        <div className="future-chip">LIVE SYSTEM</div>
        <div className="future-number">97.4</div>
        <div className="future-caption">SIGNAL CONFIDENCE</div>
      </div>
    );
  }

  if (world.id === "editorial") {
    return (
      <div className="composition composition-editorial">
        <div className="editorial-index">V/24</div>
        <div className="editorial-block block-one" />
        <div className="editorial-block block-two" />
        <div className="editorial-title">FORM<br />FOLLOWS<br />FEELING.</div>
        <div className="editorial-rule" />
      </div>
    );
  }

  if (world.id === "experimental") {
    return (
      <div className="composition composition-experimental">
        <div className="signal signal-a">NO SIGNAL</div>
        <div className="signal signal-b">NO SIGNAL</div>
        <div className="signal signal-c">NO SIGNAL</div>
        <div className="void-eye">
          <span />
        </div>
        <div className="void-code">X-09 / REACTIVE STATE</div>
      </div>
    );
  }

  return (
    <div className="composition composition-product">
      <div className="product-halo" />
      <div className="product-object">
        <div className="product-face front" />
        <div className="product-face side" />
        <div className="product-face top" />
      </div>
      <div className="product-name">MONO / ONE</div>
      <div className="product-price">OBJECT STUDY · 001</div>
    </div>
  );
}

function App() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<WorldId>("luxury");
  const [immersiveId, setImmersiveId] = useState<WorldId | null>(null);
  const [showreel, setShowreel] = useState(false);
  const [businessOpen, setBusinessOpen] = useState(
    () => new URLSearchParams(window.location.search).get("view") === "business",
  );
  const [interactionCount, setInteractionCount] = useState(0);
  usePageEffects(reducedMotion);

  const activeWorld = useMemo(
    () => worlds.find((world) => world.id === activeId) ?? worlds[0],
    [activeId],
  );

  const immersiveWorld = useMemo(
    () => worlds.find((world) => world.id === immersiveId) ?? null,
    [immersiveId],
  );

  const bumpInteraction = () => setInteractionCount((value) => value + 1);

  const launchWorld = (id: WorldId, auto = false) => {
    setActiveId(id);
    setImmersiveId(id);
    setShowreel(auto);
    bumpInteraction();
  };

  const openBusinessStudio = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "business");
    window.history.pushState({ view: "business" }, "", url);
    setBusinessOpen(true);
    bumpInteraction();
  };

  const closeBusinessStudio = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    window.history.pushState({}, "", url);
    setBusinessOpen(false);
  };

  useEffect(() => {
    const syncFromUrl = () => {
      setBusinessOpen(new URLSearchParams(window.location.search).get("view") === "business");
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const themeStyle = {
    "--accent": activeWorld.color,
    "--accent-2": activeWorld.secondary,
    "--accent-rgb": activeWorld.glow,
  } as CSSProperties;

  return (
    <main className="site" style={themeStyle}>
      <div className="noise" aria-hidden="true" />
      <div className="cursor-orb" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <button
        type="button"
        className="business-entry"
        onClick={openBusinessStudio}
        aria-label="Open practical website examples for small businesses"
      >
        <span>
          <small>RESTAURANT · CAFÉ · LOCAL SERVICES</small>
          <b>NEED A SMALL BUSINESS WEBSITE?</b>
        </span>
        <i><Store size={16} /></i>
      </button>

      <div className="craft-hud" aria-label="Illustrative demo status">
        <div className="craft-hud-head">
          <Activity size={12} />
          <span>DEMO HUD · ILLUSTRATIVE</span>
        </div>
        <div className="craft-hud-row">
          <span>MOTION TARGET</span><b>60HZ</b>
        </div>
        <div className="craft-hud-row">
          <span>INTERACTIONS</span><b>{String(interactionCount).padStart(2, "0")}</b>
        </div>
        <div className="craft-hud-row">
          <span>DELIVERY</span><b>STATIC / EDGE</b>
        </div>
      </div>

      <header className="nav">
        <a className="brand" href="#top" aria-label="Prism Studio home">
          <span className="brand-mark"><Asterisk size={17} /></span>
          <span>PRISM / LAB</span>
        </a>
        <div className="nav-meta">
          <span className="availability"><i /> Available for selected projects</span>
          <a href="#worlds">Experiments</a>
          <a href="#work">Work</a>
        </div>
        <MagneticLink href="#contact" className="nav-cta">
          Start a project <ArrowUpRight size={15} />
        </MagneticLink>
      </header>

      <section className="hero" id="top">
        <div className="hero-scene" aria-hidden="true">
          <HeroScene reducedMotion={reducedMotion || immersiveId !== null || businessOpen} />
          <div className="hero-vignette" />
          <div className="hero-grid" />
        </div>

        <div className="hero-kicker reveal-now">
          <span>Independent digital atelier</span>
          <span>Hanoi / Worldwide</span>
          <span>2026</span>
        </div>

        <div className="hero-copy">
          <h1 className="hero-title" aria-label="Web experiences people remember">
            <span className="line line-a">WEB</span>
            <span className="line line-b">EXPERIENCES</span>
            <span className="line line-c">
              PEOPLE <em>REMEMBER.</em>
            </span>
          </h1>

          <div className="hero-bottom">
            <p>
              Not pages. <strong>Presence.</strong> Interactive brand worlds built to make the first
              five seconds impossible to ignore.
            </p>
            <button
              type="button"
              className="showreel-launch"
              onClick={() => launchWorld(activeId, true)}
              aria-label="Start fullscreen showreel mode"
            >
              <span className="showreel-play"><Play size={15} fill="currentColor" /></span>
              <span>
                <small>DON&apos;T EXPLAIN IT</small>
                <b>SHOWREEL MODE</b>
              </span>
            </button>
            <MagneticLink href="#worlds" className="round-action" aria-label="Explore the worlds">
              <ArrowDownRight size={22} />
            </MagneticLink>
          </div>
        </div>

        <div className="hero-floating-card hero-card-a" aria-hidden="true">
          <span>REALTIME</span>
          <b>WEBGL</b>
          <small>Reactive scene / 01</small>
        </div>
        <div className="hero-floating-card hero-card-b" aria-hidden="true">
          <MousePointer2 size={15} />
          <span>MOVE<br />TO BEND<br />THE LIGHT</span>
        </div>
      </section>

      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          <span>DESIGN THAT MOVES</span><i>✦</i>
          <span>CODE THAT PERFORMS</span><i>✦</i>
          <span>3D THAT SELLS</span><i>✦</i>
          <span>DETAILS PEOPLE FEEL</span><i>✦</i>
          <span>DESIGN THAT MOVES</span><i>✦</i>
          <span>CODE THAT PERFORMS</span><i>✦</i>
          <span>3D THAT SELLS</span><i>✦</i>
          <span>DETAILS PEOPLE FEEL</span><i>✦</i>
        </div>
      </div>

      <section className="manifesto section-shell" data-reveal>
        <div className="section-label">
          <span>01 / POSITIONING</span>
          <span className="dot-line" />
        </div>
        <div className="manifesto-grid">
          <h2>
            BEAUTIFUL IS<br />
            THE <span className="gradient-word">BARE MINIMUM.</span>
          </h2>
          <div className="manifesto-copy">
            <p>
              Your customer does not care what framework is underneath. They care that your business
              feels credible, distinct, effortless and worth remembering.
            </p>
            <p className="muted">
              So every scroll, hover, transition and frame earns attention — then gets out of the
              message&apos;s way.
            </p>
          </div>
        </div>
      </section>

      <section className="worlds section-shell" id="worlds" data-reveal>
        <div className="section-label">
          <span>02 / LIVE DIRECTION FINDER</span>
          <span>Pick your world ↓</span>
        </div>

        <div className="world-layout">
          <div className="world-tabs" aria-label="Visual worlds">
            {worlds.map((world) => (
              <button
                key={world.id}
                type="button"
                className={"world-tab " + (activeId === world.id ? "is-active" : "")}
                onClick={() => setActiveId(world.id)}
                aria-pressed={activeId === world.id}
              >
                <span>{world.index}</span>
                <strong>{world.label}</strong>
                <i />
              </button>
            ))}
          </div>

          <div className="world-stage-wrap">
            <div className="world-stage" key={activeWorld.id}>
              <WorldEffect
                id={activeWorld.id}
                color={activeWorld.color}
                reducedMotion={reducedMotion || immersiveId !== null || businessOpen}
              />
              <div className="stage-scrim" />
              <WorldComposition world={activeWorld} />
              <div className="stage-ui">
                <div className="stage-topline">
                  <span>{activeWorld.eyebrow}</span>
                  <span>LIVE / {activeWorld.index}</span>
                </div>
                <div className="stage-bottomline">
                  <div>
                    <small>Direction</small>
                    <b>{activeWorld.title}</b>
                  </div>
                  <div className="stage-metric">
                    <strong>{activeWorld.metric}</strong>
                    <small>{activeWorld.metricLabel}</small>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="enter-world"
                onClick={() => launchWorld(activeWorld.id)}
                aria-label={"Enter the " + activeWorld.label + " immersive mini-site"}
              >
                <Maximize2 size={16} />
                <span>ENTER WORLD</span>
                <i>03 SCENES</i>
              </button>
            </div>

            <div className="world-description">
              <p>{activeWorld.note}</p>
              <span>
                Click another direction. The visual system changes with it — not just the color.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="capabilities section-shell" data-reveal>
        <div className="section-label">
          <span>03 / CAPABILITIES</span>
          <span>Made to be noticed</span>
        </div>

        <div className="capabilities-intro">
          <h2>THE SCREEN<br />IS A <em>STAGE.</em></h2>
          <div className="rotating-seal" aria-hidden="true">
            <span>INTERACTION · MOTION · DEPTH · CRAFT · </span>
            <CircleDot size={20} />
          </div>
        </div>

        <div className="capability-grid">
          {capabilities.map((item, index) => {
            const Icon = item.icon;
            return (
              <TiltCard className="capability-card" key={item.title}>
                <div className="card-glare" />
                <div className="capability-number">0{index + 1}</div>
                <Icon size={30} strokeWidth={1.5} />
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <ArrowUpRight className="capability-arrow" size={18} />
              </TiltCard>
            );
          })}
        </div>
      </section>

      <section className="work section-shell" id="work" data-reveal>
        <div className="section-label">
          <span>04 / SELECTED EXPERIMENTS</span>
          <span>Concept work / live systems</span>
        </div>

        <div className="work-heading">
          <h2>THREE WAYS<br />TO STOP A <span>SCROLL.</span></h2>
          <p>
            Each concept starts from the feeling the client needs to own — then the technology
            disappears behind it.
          </p>
        </div>

        <div className="projects">
          {projects.map((project) => (
            <TiltCard className={"project " + project.className} key={project.name}>
              <div className="project-art" aria-hidden="true">
                <div className="project-orbit" />
                <div className="project-core" />
                <div className="project-scanlines" />
                <span className="project-ghost">{project.number}</span>
              </div>
              <div className="project-meta">
                <span>{project.category}</span>
                <span>2026</span>
              </div>
              <div className="project-title-row">
                <h3>{project.name}</h3>
                <div className="project-arrow"><ArrowUpRight /></div>
              </div>
              <p>{project.copy}</p>
            </TiltCard>
          ))}
        </div>
      </section>

      <section className="proof section-shell" data-reveal>
        <div className="proof-visual" aria-hidden="true">
          {reducedMotion || immersiveId !== null || businessOpen ? (
            <div className="proof-static" />
          ) : (
            <SceneBoundary className="proof-static">
              <Suspense fallback={<SceneLoader />}>
                <EmberStorm
                  className="three-scene"
                  mode="dark"
                  hue={332}
                  saturation={1.35}
                  brightness={0.9}
                />
              </Suspense>
            </SceneBoundary>
          )}
          <div className="proof-mask" />
          <div className="proof-big">FEEL</div>
        </div>

        <div className="proof-copy">
          <div className="section-label compact">
            <span>05 / THE POINT</span>
          </div>
          <h2>
            CLIENTS DON&apos;T BUY
            <br />
            <span>CODE.</span>
          </h2>
          <p>
            They buy the feeling that their brand belongs in the room with the best. The code is
            simply how we make that feeling real, responsive and repeatable.
          </p>
          <MagneticLink href="#contact" className="text-link">
            Build something unforgettable <ArrowUpRight size={18} />
          </MagneticLink>
        </div>
      </section>

      <section className="underhood section-shell" data-reveal>
        <div className="section-label">
          <span>06 / UNDER THE HOOD</span>
          <span>For the curious</span>
        </div>

        <div className="underhood-grid">
          <div className="terminal">
            <div className="terminal-bar">
              <span /><span /><span />
              <small>PRISM_RENDER_PIPELINE</small>
            </div>
            <div className="terminal-body">
              <div><i>01</i><span>Realtime visual field</span><b>THREEUI</b></div>
              <div><i>02</i><span>Scene orchestration</span><b>THREE.JS</b></div>
              <div><i>03</i><span>Interface layer</span><b>REACT</b></div>
              <div><i>04</i><span>GPU-aware motion</span><b>WEBGL</b></div>
              <div><i>05</i><span>Static deployment</span><b>EDGE CDN</b></div>
            </div>
          </div>

          <div className="tech-copy">
            <div className="tech-icons">
              <span><Cpu size={19} /> GPU</span>
              <span><Box size={19} /> 3D</span>
              <span><Sparkles size={19} /> FX</span>
            </div>
            <h3>Complex underneath.<br />Effortless on top.</h3>
            <p>
              Heavy scenes are isolated, loaded only when needed and given accessible fallbacks.
              Reduced-motion users get the same art direction without the spectacle.
            </p>
          </div>
        </div>
      </section>

      <section className="contact" id="contact" data-reveal>
        <div className="contact-radiance" aria-hidden="true" />
        <div className="contact-orbit" aria-hidden="true" />
        <div className="contact-copy">
          <span className="contact-kicker">Have something worth making unforgettable?</span>
          <h2>MAKE<br /><em>NOISE.</em></h2>
          <p>One sharp idea. One beautiful system. Zero boring screens.</p>
          <MagneticLink href="mailto:hello@example.com" className="contact-button">
            hello@example.com
            <ArrowUpRight size={24} />
          </MagneticLink>
        </div>
        <footer>
          <span>PRISM / LAB © 2026</span>
          <span>Built for the browser. Designed for the memory.</span>
          <a href="#top">Back to top ↑</a>
        </footer>
      </section>

      {businessOpen && (
        <Suspense
          fallback={
            <div className="immersive-loading" role="status" aria-live="polite">
              <span />
              <b>OPENING BUSINESS STUDIO</b>
            </div>
          }
        >
          <BusinessStudio onClose={closeBusinessStudio} />
        </Suspense>
      )}

      {immersiveWorld && (
        <Suspense
          fallback={
            <div className="immersive-loading" role="status" aria-live="polite">
              <span />
              <b>BUILDING WORLD</b>
            </div>
          }
        >
          <ImmersiveExperience
            world={immersiveWorld}
            worlds={worlds}
            reducedMotion={reducedMotion}
            autoPlay={showreel}
            onClose={() => {
              setImmersiveId(null);
              setShowreel(false);
            }}
            onWorldChange={(id) => {
              setImmersiveId(id);
              setActiveId(id);
            }}
            onInteract={bumpInteraction}
          />
        </Suspense>
      )}
    </main>
  );
}

export default App;

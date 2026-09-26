import {
  Component,
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
  ReactNode,
} from "react";
import {
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
const EmberStorm = lazy(() =>
  import("@designcodeio/threeui/components/EmberStorm").then((module) => ({
    default: module.EmberStorm,
  })),
);

import { LabSite, isLabSiteId, labSites } from "./LabSites";
import type { LabSiteId } from "./LabSites";
import "./lab.css";

const LabViewer = lazy(() => import("./LabViewer"));
const BusinessStudio = lazy(() => import("./BusinessStudio"));

const labSiteFromUrl = (): LabSiteId | null => {
  const params = new URLSearchParams(window.location.search);
  const site = params.get("site");
  return params.get("view") === "lab" && isLabSiteId(site) ? site : null;
};

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
    const orb = document.querySelector<HTMLElement>(".cursor-orb");
    let frame = 0;

    // Move the glow with a compositor-only transform; writing CSS variables on <html> restyled the whole page.
    const onPointerMove = (event: PointerEvent) => {
      if (reducedMotion || !orb) return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        orb.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      });
    };

    const progressBar = document.querySelector<HTMLElement>(".scroll-progress");
    let scrollFrame = 0;
    const onScroll = () => {
      if (scrollFrame || !progressBar) return;
      scrollFrame = requestAnimationFrame(() => {
        scrollFrame = 0;
        const max = root.scrollHeight - window.innerHeight;
        const progress = max > 0 ? window.scrollY / max : 0;
        progressBar.style.transform = `scaleX(${progress})`;
      });
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
      cancelAnimationFrame(scrollFrame);
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

function App() {
  const reducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<LabSiteId>(() => labSiteFromUrl() ?? "luxury");
  const [labOpen, setLabOpen] = useState(() => labSiteFromUrl() !== null);
  const [businessOpen, setBusinessOpen] = useState(
    () => new URLSearchParams(window.location.search).get("view") === "business",
  );
  const [labInView, setLabInView] = useState(false);
  const labSectionRef = useRef<HTMLElement>(null);
  usePageEffects(reducedMotion);

  // The floating small-business pill would cover the live preview, so it steps aside while that section is on screen.
  useEffect(() => {
    const section = labSectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setLabInView(entry.isIntersecting), {
      rootMargin: "-20% 0px -20% 0px",
    });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const activeSite = useMemo(
    () => labSites.find((site) => site.id === activeId) ?? labSites[0],
    [activeId],
  );

  const openLabSite = (id: LabSiteId) => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "lab");
    url.searchParams.set("site", id);
    url.searchParams.delete("page");
    window.history.pushState({ view: "lab", site: id }, "", url);
    setActiveId(id);
    setLabOpen(true);
  };

  const switchLabSite = (id: LabSiteId) => {
    const url = new URL(window.location.href);
    url.searchParams.set("site", id);
    url.searchParams.delete("page");
    window.history.replaceState({ view: "lab", site: id }, "", url);
    setActiveId(id);
  };

  const closeLabSite = useCallback(() => {
    const url = new URL(window.location.href);
    ["view", "site", "page"].forEach((key) => url.searchParams.delete(key));
    window.history.pushState({}, "", url);
    setLabOpen(false);
  }, []);

  const openBusinessStudio = () => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "business");
    window.history.pushState({ view: "business" }, "", url);
    setBusinessOpen(true);
  };

  const closeBusinessStudio = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("view");
    url.searchParams.delete("demo");
    window.history.pushState({}, "", url);
    setBusinessOpen(false);
  };

  useEffect(() => {
    const syncFromUrl = () => {
      setBusinessOpen(new URLSearchParams(window.location.search).get("view") === "business");
      const site = labSiteFromUrl();
      setLabOpen(site !== null);
      if (site) setActiveId(site);
    };
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, []);

  const themeStyle = {
    "--accent": activeSite.color,
    "--accent-2": activeSite.secondary,
    "--accent-rgb": activeSite.glow,
  } as CSSProperties;

  return (
    <main className="site" style={themeStyle}>
      <div className="noise" aria-hidden="true" />
      <div className="cursor-orb" aria-hidden="true" />
      <div className="scroll-progress" aria-hidden="true" />

      <button
        type="button"
        className={"business-entry" + (labInView ? " is-tucked" : "")}
        onClick={openBusinessStudio}
        aria-label="Open practical website examples for small businesses"
      >
        <span>
          <small>RESTAURANT · CAFÉ · LOCAL SERVICES</small>
          <b>NEED A SMALL BUSINESS WEBSITE?</b>
        </span>
        <i><Store size={16} /></i>
      </button>

      <header className="nav">
        <a className="brand" href="#top" aria-label="Prism Studio home">
          <span className="brand-mark"><Asterisk size={17} /></span>
          <span>PRISM / LAB</span>
        </a>
        <div className="nav-meta">
          <span className="availability"><i /> Available for selected projects</span>
          <a href="#worlds">Brand sites</a>
          <a href="#work">Work</a>
        </div>
        <MagneticLink href="#contact" className="nav-cta">
          Start a project <ArrowUpRight size={15} />
        </MagneticLink>
      </header>

      <section className="hero" id="top">
        <div className="hero-scene" aria-hidden="true">
          <HeroScene reducedMotion={reducedMotion || labOpen || businessOpen} />
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
              onClick={() => openLabSite(activeId)}
              aria-label="Open the brand websites fullscreen"
            >
              <span className="showreel-play"><Play size={15} fill="currentColor" /></span>
              <span>
                <small>FIVE BRAND SITES</small>
                <b>SEE THE WORK LIVE</b>
              </span>
            </button>
            <MagneticLink href="#worlds" className="round-action" aria-label="Jump to the brand websites">
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
        <div className="section-marker">
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
              So every scroll, hover, transition and frame earns attention, then gets out of the
              message&apos;s way.
            </p>
          </div>
        </div>
      </section>

      <section ref={labSectionRef} className="worlds section-shell" id="worlds" data-reveal>
        <div className="section-marker">
          <span>02 / BRAND WEBSITES</span>
          <span>Five complete sites</span>
        </div>

        <div className="lab-intro">
          <h2>Built like the real thing.</h2>
          <p>
            Five fictional brands, each with a complete multi-page website. Scroll one here, or open it
            fullscreen and click through every page.
          </p>
        </div>

        <div className="lab-layout">
          <div className="lab-tabs" role="tablist" aria-label="Brand websites">
            {labSites.map((site) => (
              <button
                key={site.id}
                type="button"
                role="tab"
                className={"lab-tab " + (activeId === site.id ? "is-active" : "")}
                onClick={() => setActiveId(site.id)}
                aria-selected={activeId === site.id}
              >
                <strong>{site.brand}</strong>
                <span>{site.industry}</span>
              </button>
            ))}
          </div>

          <div className="lab-stage">
            <div className="lab-browser">
              <div className="lab-browser-bar">
                <span className="lab-browser-dots" aria-hidden="true"><i /><i /><i /></span>
                <span className="lab-browser-url">{activeSite.domain}</span>
                <button type="button" className="lab-open" onClick={() => openLabSite(activeSite.id)}>
                  <Maximize2 size={14} /> Open full site
                </button>
              </div>
              <div className="lab-preview-scroll">
                {!labOpen && <LabSite id={activeSite.id} />}
              </div>
            </div>
            <p className="lab-summary">{activeSite.summary}</p>
          </div>
        </div>
      </section>

      <section className="capabilities section-shell" data-reveal>
        <div className="section-marker">
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
        <div className="section-marker">
          <span>04 / SELECTED EXPERIMENTS</span>
          <span>Concept work / live systems</span>
        </div>

        <div className="work-heading">
          <h2>THREE WAYS<br />TO STOP A <span>SCROLL.</span></h2>
          <p>
            Each concept starts from the feeling the client needs to own. Then the technology
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
          {reducedMotion || labOpen || businessOpen ? (
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
          <div className="section-marker compact">
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
        <div className="section-marker">
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

      {labOpen && (
        <Suspense fallback={
            <div className="immersive-loading" role="status" aria-live="polite">
              <span />
              <b>OPENING SITE</b>
            </div>
          }>
          <LabViewer activeId={activeId} onSelect={switchLabSite} onClose={closeLabSite} />
        </Suspense>
      )}
    </main>
  );
}

export default App;

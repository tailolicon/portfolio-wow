import { useState } from "react";
import { CaretRight } from "@phosphor-icons/react";
import { ThreeCanvas, lazyThree } from "../../shared";
import { IMG, STORY_MODES } from "../data";
import type { ColorId, Page } from "../data";
import { useReveal } from "../ui";
import HomeMore from "./HomeMore";

const Streams = lazyThree(() =>
  import("@designcodeio/threeui/components/StreamConvergenceBackground").then(
    (m) => m.StreamConvergenceBackground,
  ),
);

type Props = {
  go: (page: Page) => void;
  onPickColor: (color: ColorId) => void;
};

export default function Home({ go, onPickColor }: Props) {
  const ref = useReveal<HTMLDivElement>();
  return (
    <div ref={ref}>
      <Hero go={go} />
      <Silence />
      <Sound go={go} />
      <Battery />
      <Materials />
      <HomeMore go={go} onPickColor={onPickColor} />
    </div>
  );
}

function Hero({ go }: { go: (page: Page) => void }) {
  return (
    <section className="kv-hero kv-dark" aria-labelledby="kv-hero-title">
      <div className="kv-hero-copy">
        <h1 id="kv-hero-title">Kova One</h1>
        <p className="kv-hero-tag">Quiet, in every sense.</p>
        <p className="kv-hero-sub">
          Adaptive noise cancelling and 42 hours on a single charge.
        </p>
        <div className="kv-hero-actions">
          <button type="button" className="kv-btn" onClick={() => go("buy")}>
            Buy
          </button>
          <button
            type="button"
            className="kv-btn kv-btn-ghost"
            onClick={() => go("specs")}
          >
            Tech specs
          </button>
        </div>
        <p className="kv-hero-price">
          $449. Free delivery in 2 to 4 business days.
        </p>
      </div>
      <div className="kv-hero-media">
        <img
          src={IMG.one}
          alt="Kova One headphones in Graphite, lying flat on a dark surface"
        />
      </div>
    </section>
  );
}

function Silence() {
  const [mode, setMode] =
    useState<(typeof STORY_MODES)[number]["id"]>("adaptive");
  const active = STORY_MODES.find((m) => m.id === mode) ?? STORY_MODES[0];
  // The field calms down as cancellation increases, and livens up in Aware.
  const field = {
    adaptive: { speed: 0.35, brightness: 0.6 },
    anc: { speed: 0.12, brightness: 0.4 },
    aware: { speed: 0.9, brightness: 0.85 },
  }[mode];
  return (
    <section className="kv-silence kv-dark" aria-labelledby="kv-silence-title">
      <div className="kv-silence-field">
        <ThreeCanvas
          fallback={
            <img className="kv-silence-fallback" src={IMG.city} alt="" />
          }
        >
          <Streams
            saturation={0}
            brightness={field.brightness}
            speed={field.speed}
            scale={1.1}
          />
        </ThreeCanvas>
      </div>
      <div className="kv-container kv-silence-inner">
        <div className="kv-silence-copy kv-reveal">
          <h2 id="kv-silence-title" className="kv-h2">
            The city keeps moving. You just stop hearing it.
          </h2>
          <p className="kv-lead">
            Adaptive noise cancelling reads the world around you and the fit
            around your ears, then quietly takes the rumble, chatter and hum
            away.
          </p>
        </div>
        <div className="kv-modes kv-reveal">
          <div
            className="kv-modes-tabs"
            role="tablist"
            aria-label="Noise control modes"
          >
            {STORY_MODES.map((m) => (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={mode === m.id}
                className="kv-modes-tab"
                onClick={() => setMode(m.id)}
              >
                {m.name}
              </button>
            ))}
          </div>
          <p className="kv-modes-text" role="tabpanel" aria-live="polite">
            {active.text}
          </p>
        </div>
        <dl className="kv-silence-facts kv-reveal">
          <div>
            <dt>Up to 38 dB</dt>
            <dd>of noise reduction at low frequencies</dd>
          </div>
          <div>
            <dt>8 microphones</dt>
            <dd>6 for noise control, 4 for your voice</dd>
          </div>
          <div>
            <dt>48 kHz</dt>
            <dd>sampling, adjusted continuously</dd>
          </div>
        </dl>
      </div>
    </section>
  );
}

function Sound({ go }: { go: (page: Page) => void }) {
  return (
    <section className="kv-sound kv-dark" aria-labelledby="kv-sound-title">
      <div className="kv-container kv-sound-grid">
        <div className="kv-sound-media kv-reveal">
          <img
            src={IMG.one}
            alt="Close view of the Kova One ear cup and cushion"
            loading="lazy"
          />
        </div>
        <div className="kv-sound-copy kv-reveal">
          <h2 id="kv-sound-title" className="kv-h2">
            40 mm drivers, tuned by ear and checked by instrument.
          </h2>
          <p className="kv-lead">
            We designed the driver around a carbon-reinforced diaphragm that
            stays stiff at volume, then spent fourteen months tuning it against
            our own reference target. Bass is deep and controlled, voices sit
            forward, and the top end never turns sharp.
          </p>
          <ul className="kv-sound-list">
            <li>
              <strong>4 Hz to 40 kHz</strong>
              <span>frequency response</span>
            </li>
            <li>
              <strong>Below 0.08%</strong>
              <span>harmonic distortion</span>
            </li>
            <li>
              <strong>24-bit, 96 kHz</strong>
              <span>over USB-C</span>
            </li>
          </ul>
          <button type="button" className="kv-link" onClick={() => go("specs")}>
            Audio specifications <CaretRight size={14} />
          </button>
        </div>
      </div>
    </section>
  );
}

function Battery() {
  return (
    <section className="kv-battery kv-dark" aria-labelledby="kv-battery-title">
      <img className="kv-battery-bg" src={IMG.night} alt="" loading="lazy" />
      <div className="kv-container kv-battery-inner">
        <h2 id="kv-battery-title" className="kv-battery-figure kv-reveal">
          42 hours
          <span>with noise cancelling on.</span>
        </h2>
        <div className="kv-battery-grid kv-reveal">
          <p className="kv-lead">
            Copenhagen to Tokyo and back is about 26 hours in the air. Kova One
            lasts the round trip, the layover and most of the week after.
          </p>
          <dl className="kv-battery-facts">
            <div>
              <dt>5 min</dt>
              <dd>of charging gives you 4 hours of listening</dd>
            </div>
            <div>
              <dt>60 h</dt>
              <dd>with noise cancelling switched off</dd>
            </div>
            <div>
              <dt>USB-C</dt>
              <dd>charge and listen at the same time</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>
  );
}

function Materials() {
  return (
    <section
      className="kv-section kv-materials"
      aria-labelledby="kv-materials-title"
    >
      <div className="kv-container">
        <div className="kv-materials-head kv-reveal">
          <h2 id="kv-materials-title" className="kv-h2">
            Comfortable for a long day. Built for a long life.
          </h2>
          <p className="kv-lead">
            Every part you touch was chosen twice: once for how it feels, once
            for how it ages.
          </p>
        </div>
        <div className="kv-bento">
          <figure className="kv-bento-tile kv-bento-photo kv-reveal">
            <img
              src={IMG.one}
              alt="The Kova One headband and cushions in Graphite"
              loading="lazy"
            />
            <figcaption>
              <h3 className="kv-h3">Cushions that come off with a pull.</h3>
              <p>
                Protein leather over slow-recovery foam, held by magnets. When
                they wear, a new pair clicks on in seconds.
              </p>
            </figcaption>
          </figure>
          <div className="kv-bento-tile kv-bento-figure kv-reveal">
            <strong>268 g</strong>
            <p>
              The weight rests on a wide, knitted headband instead of your ears,
              with 4.2 N of clamp force. Low enough for glasses, firm enough for
              a brisk walk.
            </p>
          </div>
          <div className="kv-bento-tile kv-bento-figure kv-reveal">
            <strong>78%</strong>
            <p>
              recycled aluminium in the yokes and cups, bead-blasted and
              anodised so the finish holds up to keys, bags and years of use.
            </p>
          </div>
          <figure className="kv-bento-tile kv-bento-wide kv-reveal">
            <img
              src={IMG.city2}
              alt="Manhattan skyline at golden hour"
              loading="lazy"
            />
            <figcaption>
              <h3 className="kv-h3">It folds flat and goes anywhere.</h3>
              <p>
                The cups rotate and tuck in, and the felt travel case is barely
                thicker than a paperback. Spare parts stay in stock for at least
                seven years.
              </p>
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}

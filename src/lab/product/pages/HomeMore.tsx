import { useState } from "react";
import { ArrowCounterClockwise, CaretRight, Check } from "@phosphor-icons/react";
import { ThreeCanvas, lazyThree } from "../../shared";
import { COLORS, EQ_BANDS, EQ_PRESETS, IMG, IN_THE_BOX } from "../data";
import type { ColorId, Page } from "../data";
import { FinishChip } from "../ui";

const BellField = lazyThree(() =>
  import("@designcodeio/threeui/components/BellFieldBackground").then((m) => m.BellFieldBackground),
);

type Props = { go: (page: Page) => void; onPickColor: (color: ColorId) => void };

export default function HomeMore({ go, onPickColor }: Props) {
  return (
    <>
      <Spatial />
      <AppSection />
      <Colors onPickColor={onPickColor} />
      <InTheBox />
      <Closing go={go} />
    </>
  );
}

function Spatial() {
  return (
    <section className="kv-section kv-spatial" aria-labelledby="kv-spatial-title">
      <div className="kv-container">
        <div className="kv-spatial-panel kv-reveal">
          <ThreeCanvas fallback={<div className="kv-spatial-fallback" />}>
            <BellField saturation={0.05} brightness={0.85} speed={0.6} emberAmount={0.2} pointerAmount={0.6} />
          </ThreeCanvas>
          <div className="kv-spatial-copy">
            <h2 id="kv-spatial-title" className="kv-h2">
              Sound that stays where it was playing.
            </h2>
            <p className="kv-lead">
              Turn your head during a film and the dialogue stays with the screen. Spatial audio with head tracking
              places every instrument around you, the way a room would.
            </p>
          </div>
        </div>
        <div className="kv-spatial-notes kv-reveal">
          <p>
            <strong>Kova Space rendering.</strong> A 6-axis motion sensor tracks your head 100 times a second, and
            the image recentres by itself when you settle in.
          </p>
          <p>
            <strong>Works with what you already play.</strong> Multichannel films and albums get the full effect.
            Stereo music can stay as the artist mixed it, or open up with Kova Space.
          </p>
        </div>
      </div>
    </section>
  );
}

function curvePath(values: number[]) {
  const w = 400;
  const h = 160;
  const pts = values.map((v, i) => [20 + (i * (w - 40)) / (values.length - 1), h / 2 - v * 11]);
  let d = `M0 ${pts[0][1]} L${pts[0][0]} ${pts[0][1]}`;
  for (let i = 1; i < pts.length; i += 1) {
    const [x0, y0] = pts[i - 1];
    const [x1, y1] = pts[i];
    const cx = (x0 + x1) / 2;
    d += ` C${cx} ${y0} ${cx} ${y1} ${x1} ${y1}`;
  }
  return `${d} L${w} ${pts[pts.length - 1][1]}`;
}

function EqTool() {
  const [preset, setPreset] = useState<string>("Balanced");
  const [values, setValues] = useState<number[]>(EQ_PRESETS.Balanced);

  const choose = (name: string) => {
    setPreset(name);
    setValues(EQ_PRESETS[name]);
  };
  const setBand = (index: number, value: number) => {
    setPreset("Custom");
    setValues((prev) => prev.map((v, i) => (i === index ? value : v)));
  };

  return (
    <div className="kv-eq" aria-label="Kova app equaliser">
      <div className="kv-eq-head">
        <p className="kv-eq-title">Equaliser</p>
        <button type="button" className="kv-eq-reset" onClick={() => choose("Balanced")}>
          <ArrowCounterClockwise size={14} /> Reset
        </button>
      </div>
      <div className="kv-eq-presets" role="radiogroup" aria-label="Presets">
        {[...Object.keys(EQ_PRESETS), "Custom"].map((name) => (
          <button
            key={name}
            type="button"
            role="radio"
            aria-checked={preset === name}
            disabled={name === "Custom" && preset !== "Custom"}
            className="kv-eq-preset"
            onClick={() => choose(name)}
          >
            {name}
          </button>
        ))}
      </div>
      <svg className="kv-eq-curve" viewBox="0 0 400 160" preserveAspectRatio="none" aria-hidden="true">
        <line x1="0" y1="80" x2="400" y2="80" />
        <path d={curvePath(values)} />
      </svg>
      <div className="kv-eq-bands">
        {EQ_BANDS.map((band, i) => (
          <label key={band} className="kv-eq-band">
            <span className="kv-eq-value">{values[i] > 0 ? `+${values[i]}` : values[i]} dB</span>
            <input
              type="range"
              min={-6}
              max={6}
              step={1}
              value={values[i]}
              onChange={(e) => setBand(i, Number(e.target.value))}
              aria-label={`${band} gain`}
            />
            <span className="kv-eq-freq">{band}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function AppSection() {
  return (
    <section className="kv-section kv-app" aria-labelledby="kv-app-title">
      <div className="kv-container kv-app-grid">
        <div className="kv-app-copy kv-reveal">
          <h2 id="kv-app-title" className="kv-h2">
            Make it sound like yours.
          </h2>
          <p className="kv-lead">
            The Kova app sets up your headphones, keeps them updated and lets you shape the sound. Your EQ is
            saved to Kova One, so it follows you to every device.
          </p>
          <ul className="kv-checks">
            <li><Check size={18} /> 5-band EQ with presets you can edit</li>
            <li><Check size={18} /> A 3-minute hearing profile</li>
            <li><Check size={18} /> Multipoint device switching</li>
            <li><Check size={18} /> Over-the-air firmware updates</li>
          </ul>
          <p className="kv-muted kv-app-note">Free for iOS 16 and Android 10 or later.</p>
        </div>
        <div className="kv-reveal">
          <EqTool />
        </div>
      </div>
    </section>
  );
}

function Colors({ onPickColor }: { onPickColor: (color: ColorId) => void }) {
  return (
    <section className="kv-section kv-colors" aria-labelledby="kv-colors-title">
      <div className="kv-container">
        <h2 id="kv-colors-title" className="kv-h2 kv-center kv-reveal">
          Graphite, Sand and Silver.
        </h2>
        <p className="kv-lead kv-center kv-reveal">
          Three anodised finishes, each with its own cushion and headband colour.
        </p>
        <ul className="kv-color-row">
          {COLORS.map((c) => (
            <li key={c.id} className="kv-color-item kv-reveal">
              <FinishChip color={c.id} size={132} />
              <h3>{c.name}</h3>
              <p className="kv-muted">{c.note}</p>
              <button type="button" className="kv-link" onClick={() => onPickColor(c.id)}>
                Buy in {c.name} <CaretRight size={14} />
              </button>
            </li>
          ))}
        </ul>
        <p className="kv-fine kv-center">Product photographs on this page show Kova One in Graphite.</p>
      </div>
    </section>
  );
}

function InTheBox() {
  return (
    <section className="kv-section kv-box" aria-labelledby="kv-box-title">
      <div className="kv-container kv-box-grid">
        <h2 id="kv-box-title" className="kv-h2 kv-reveal">
          In the box
        </h2>
        <ul className="kv-box-list kv-reveal">
          {IN_THE_BOX.map((item) => (
            <li key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Closing({ go }: { go: (page: Page) => void }) {
  return (
    <section className="kv-closing" aria-labelledby="kv-closing-title">
      <div className="kv-container">
        <div className="kv-closing-card kv-dark kv-reveal">
          <div className="kv-closing-copy">
            <h2 id="kv-closing-title" className="kv-h2">
              Kova One
            </h2>
            <p className="kv-lead">$449, or $112.25 a month for 4 months with no interest.</p>
            <div className="kv-hero-actions">
              <button type="button" className="kv-btn kv-btn-large" onClick={() => go("buy")}>
                Buy
              </button>
              <button type="button" className="kv-link" onClick={() => go("compare")}>
                Compare models <CaretRight size={14} />
              </button>
            </div>
            <ul className="kv-closing-perks">
              <li>Free delivery and returns</li>
              <li>30 days to decide</li>
              <li>2-year warranty</li>
            </ul>
          </div>
          <div className="kv-closing-media">
            <img src={IMG.one} alt="Kova One in Graphite" loading="lazy" />
          </div>
        </div>
      </div>
    </section>
  );
}

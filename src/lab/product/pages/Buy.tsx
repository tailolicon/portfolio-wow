import { useMemo, useState } from "react";
import { CheckCircle, Minus, Plus, Star, Truck } from "@phosphor-icons/react";
import { CARE_PLANS, COLORS, IMG, PRICE } from "../data";
import type { CareId, ColorId, Page } from "../data";
import { FinishChip, money } from "../ui";

const ENGRAVING_PRICE = 0;
const MAX_ENGRAVE = 16;
const VIEWS = [
  { id: "photo", label: "Front", pos: "50% 55%", zoom: 1 },
  { id: "cup", label: "Ear cup", pos: "30% 78%", zoom: 2.1 },
  { id: "band", label: "Headband", pos: "50% 18%", zoom: 1.9 },
  { id: "finish", label: "Finish", pos: "", zoom: 1 },
] as const;

type ViewId = (typeof VIEWS)[number]["id"];

function addBusinessDays(from: Date, days: number) {
  const date = new Date(from);
  let added = 0;
  while (added < days) {
    date.setDate(date.getDate() + 1);
    const day = date.getDay();
    if (day !== 0 && day !== 6) added += 1;
  }
  return date;
}
const fmtDay = (d: Date) => d.toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" });

type Props = { initialColor: ColorId; go: (page: Page) => void; onAdd: (quantity: number) => void };

export default function Buy({ initialColor, go, onAdd }: Props) {
  const [color, setColor] = useState<ColorId>(initialColor);
  const [view, setView] = useState<ViewId>(initialColor === "graphite" ? "photo" : "finish");
  const [engrave, setEngrave] = useState(false);
  const [text, setText] = useState("");
  const [care, setCare] = useState<CareId>("none");
  const [qty, setQty] = useState(1);
  const [pay, setPay] = useState<"full" | "split">("full");
  const [added, setAdded] = useState(false);
  const [ordered, setOrdered] = useState(false);

  const finish = COLORS.find((c) => c.id === color) ?? COLORS[0];
  const plan = CARE_PLANS.find((p) => p.id === care) ?? CARE_PLANS[0];
  const cleanText = text.replace(/[^A-Za-z0-9 .&'-]/g, "");
  const engraveError = engrave && text !== cleanText ? "Letters, numbers, spaces and . & ' - only." : "";
  const engraveActive = engrave && cleanText.trim().length > 0;

  const unit = PRICE + plan.price + (engraveActive ? ENGRAVING_PRICE : 0);
  const total = unit * qty;

  const delivery = useMemo(() => {
    const extra = engraveActive ? 2 : 0;
    const today = new Date();
    return `${fmtDay(addBusinessDays(today, 2 + extra))} to ${fmtDay(addBusinessDays(today, 4 + extra))}`;
  }, [engraveActive]);

  const pickColor = (id: ColorId) => {
    setColor(id);
    setView(id === "graphite" ? "photo" : "finish");
    setAdded(false);
  };

  const current = VIEWS.find((v) => v.id === view) ?? VIEWS[0];

  return (
    <div className="kv-buy">
      <div className="kv-container kv-buy-grid">
        <div className="kv-buy-gallery">
          <div className="kv-buy-stage">
            {view === "finish" ? (
              <div className="kv-buy-finish">
                <div className="kv-buy-finish-chip">
                  <FinishChip color={color} size={260} />
                  {engraveActive && <span className={`kv-engrave-preview${color === "graphite" ? "" : " kv-engrave-dark"}`}>{cleanText}</span>}
                </div>
                <p>
                  {finish.name} finish. {finish.note}
                </p>
              </div>
            ) : (
              <img
                src={IMG.one}
                alt={`Kova One in Graphite, ${current.label.toLowerCase()} view`}
                style={{ objectPosition: current.pos, transform: `scale(${current.zoom})`, transformOrigin: current.pos }}
              />
            )}
          </div>
          <div className="kv-buy-thumbs" role="tablist" aria-label="Views">
            {VIEWS.map((v) => (
              <button
                key={v.id}
                type="button"
                role="tab"
                aria-selected={view === v.id}
                className="kv-buy-thumb"
                onClick={() => setView(v.id)}
              >
                {v.id === "finish" ? (
                  <FinishChip color={color} size={44} />
                ) : (
                  <img
                    src={IMG.one}
                    alt=""
                    style={{ objectPosition: v.pos, transform: `scale(${v.zoom})`, transformOrigin: v.pos }}
                  />
                )}
                <span className="kv-visually-hidden">{v.label}</span>
              </button>
            ))}
          </div>
          <p className="kv-fine">Photographs show Graphite. The Finish view shows your selected colour.</p>
        </div>

        <div className="kv-buy-config">
          <h1 className="kv-buy-title">Buy Kova One</h1>
          <p className="kv-buy-rating">
            <Star size={16} weight="fill" aria-hidden="true" /> 4.8 from 1,236 reviews
          </p>
          <p className="kv-buy-price">{money(PRICE)}</p>

          <fieldset className="kv-opt">
            <legend>
              Colour <span>{finish.name}</span>
            </legend>
            <div className="kv-swatches">
              {COLORS.map((c) => (
                <label key={c.id} className="kv-swatch">
                  <input
                    type="radio"
                    name="kv-color"
                    value={c.id}
                    checked={color === c.id}
                    onChange={() => pickColor(c.id)}
                  />
                  <FinishChip color={c.id} size={40} />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="kv-opt">
            <legend>
              Engraving <span>Free</span>
            </legend>
            <label className="kv-toggle-row">
              <input
                type="checkbox"
                checked={engrave}
                onChange={(e) => {
                  setEngrave(e.target.checked);
                  setAdded(false);
                }}
              />
              <span>Add a name or a few words to the left cup</span>
            </label>
            {engrave && (
              <div className="kv-field">
                <label htmlFor="kv-engrave">Engraving text</label>
                <input
                  id="kv-engrave"
                  value={text}
                  maxLength={MAX_ENGRAVE}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="For Mathilde"
                  aria-describedby="kv-engrave-help"
                  aria-invalid={Boolean(engraveError)}
                />
                <p id="kv-engrave-help" className={engraveError ? "kv-field-error" : "kv-field-help"}>
                  {engraveError || `${MAX_ENGRAVE - text.length} characters left. Engraved orders can't be returned.`}
                </p>
              </div>
            )}
          </fieldset>

          <fieldset className="kv-opt">
            <legend>Protection</legend>
            <div className="kv-plans">
              {CARE_PLANS.map((p) => (
                <label key={p.id} className="kv-plan">
                  <input
                    type="radio"
                    name="kv-care"
                    value={p.id}
                    checked={care === p.id}
                    onChange={() => {
                      setCare(p.id);
                      setAdded(false);
                    }}
                  />
                  <span className="kv-plan-body">
                    <span className="kv-plan-head">
                      <strong>{p.name}</strong>
                      <span>{money(p.price)}</span>
                    </span>
                    <span className="kv-plan-detail">{p.detail}</span>
                  </span>
                </label>
              ))}
            </div>
          </fieldset>

          <fieldset className="kv-opt kv-opt-inline">
            <legend>Quantity</legend>
            <div className="kv-qty">
              <button type="button" aria-label="Fewer" disabled={qty <= 1} onClick={() => setQty((n) => n - 1)}>
                <Minus size={16} />
              </button>
              <output aria-live="polite">{qty}</output>
              <button type="button" aria-label="More" disabled={qty >= 4} onClick={() => setQty((n) => n + 1)}>
                <Plus size={16} />
              </button>
            </div>
          </fieldset>
        </div>

        <aside className="kv-summary" aria-label="Order summary">
          <h2>Your Kova One</h2>
          <ul className="kv-summary-lines">
            <li>
              <span>
                Kova One, {finish.name}
                {qty > 1 ? ` x ${qty}` : ""}
              </span>
              <span>{money(PRICE * qty)}</span>
            </li>
            {engraveActive && (
              <li>
                <span>Engraving, "{cleanText}"</span>
                <span>Free</span>
              </li>
            )}
            {plan.price > 0 && (
              <li>
                <span>{plan.name}</span>
                <span>{money(plan.price * qty)}</span>
              </li>
            )}
            <li>
              <span>Delivery</span>
              <span>Free</span>
            </li>
          </ul>
          <p className="kv-summary-total">
            <span>Total</span>
            <strong>{money(total)}</strong>
          </p>
          <p className="kv-fine">Sales tax is calculated at checkout.</p>

          <div className="kv-pay" role="radiogroup" aria-label="Payment">
            <label className="kv-pay-opt">
              <input type="radio" name="kv-pay" checked={pay === "full"} onChange={() => setPay("full")} />
              <span>Pay {money(total)} today</span>
            </label>
            <label className="kv-pay-opt">
              <input type="radio" name="kv-pay" checked={pay === "split"} onChange={() => setPay("split")} />
              <span>4 payments of {money(Math.round((total / 4) * 100) / 100)}, 0% interest</span>
            </label>
            <p className="kv-fine">Card, digital wallet or bank transfer. Payments of 4 need a US billing address.</p>
          </div>

          <p className="kv-delivery">
            <Truck size={20} aria-hidden="true" />
            <span>
              Arrives <strong>{delivery}</strong>
              {engraveActive ? ", engraving adds 2 days" : ""}
            </span>
          </p>

          {ordered ? (
            <div className="kv-added" role="status">
              <CheckCircle size={22} weight="fill" aria-hidden="true" />
              <div>
                <strong>Order confirmed.</strong>
                <p>
                  {qty} x Kova One in {finish.name}, {money(total)}. Arriving {delivery}. A receipt is on its way to your inbox.
                </p>
                <div className="kv-added-actions">
                  <button type="button" className="kv-link" onClick={() => go("support")}>
                    Setup and support
                  </button>
                  <button type="button" className="kv-link" onClick={() => go("home")}>
                    Keep browsing
                  </button>
                </div>
              </div>
            </div>
          ) : added ? (
            <div className="kv-added" role="status">
              <CheckCircle size={22} weight="fill" aria-hidden="true" />
              <div>
                <strong>Added to your bag.</strong>
                <p>
                  {qty} x Kova One in {finish.name}
                  {plan.price > 0 ? ` with ${plan.name}` : ""}.
                </p>
                <div className="kv-added-actions">
                  <button type="button" className="kv-btn kv-btn-small" onClick={() => setOrdered(true)}>
                    Check out
                  </button>
                  <button type="button" className="kv-link" onClick={() => go("home")}>
                    Keep browsing
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <button
              type="button"
              className="kv-btn kv-btn-large kv-summary-cta"
              disabled={Boolean(engraveError)}
              onClick={() => {
                setAdded(true);
                onAdd(qty);
              }}
            >
              Add to bag
            </button>
          )}
        </aside>
      </div>
    </div>
  );
}

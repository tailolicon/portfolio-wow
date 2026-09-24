import { useState } from "react";
import "./business-demos.css";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Clock3,
  Dumbbell,
  Hammer,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
} from "lucide-react";

export type BusinessDemoId =
  | "restaurant"
  | "cafe"
  | "salon"
  | "services"
  | "fitness"
  | "professional";

export const businessDemoMeta = [
  { id: "restaurant" as const, label: "Restaurant", kicker: "Reservations + menu", color: "#c74b32" },
  { id: "cafe" as const, label: "Café / Drinks", kicker: "Menu + location", color: "#22795a" },
  { id: "salon" as const, label: "Salon / Beauty", kicker: "Services + booking", color: "#9b6878" },
  { id: "services" as const, label: "Home Services", kicker: "Trust + quote", color: "#0753aa" },
  { id: "fitness" as const, label: "Fitness / Studio", kicker: "Schedule + membership", color: "#b7ff2d" },
  { id: "professional" as const, label: "Professional", kicker: "Proof + enquiry", color: "#163d50" },
];

function RestaurantDemo() {
  const [reservation, setReservation] = useState<string | null>(null);
  const [reservationConfirmed, setReservationConfirmed] = useState(false);

  return (
    <div className="demo-site demo-restaurant">
      <header className="r-nav">
        <div className="r-mark">E&O</div>
        <nav><span>Story</span><span>Menu</span><span>Visit</span></nav>
        <button>Reserve <ArrowRight size={14} /></button>
      </header>

      <section className="r-hero">
        <div className="r-photo"><img src="./demos/restaurant.webp" alt="" /></div>
        <div className="r-hero-copy">
          <small>NEIGHBORHOOD FIRE KITCHEN · PORTLAND</small>
          <h1>Food worth<br /><em>leaving home for.</em></h1>
          <p>Seasonal plates, a wood-fired menu, and a dining room built for long evenings.</p>
          <div className="r-actions">
            <button>Reserve a table</button>
            <span>Tonight · 5:00—11:00</span>
          </div>
        </div>
        <aside className="r-reserve-card">
          <span>TONIGHT</span>
          <strong>2 seats available</strong>
          <div>
            {["7:30", "8:15", "9:00"].map((time) => (
              <button
                type="button"
                key={time}
                className={reservation === time ? "is-selected" : ""}
                onClick={() => setReservation(time)}
              >
                {time}
              </button>
            ))}
          </div>
          {reservation ? (
            <>
              <small>{reservationConfirmed ? "Confirmed for two · " + reservation + " · confirmation sent" : "Table held for 2 · " + reservation}</small>
              <button type="button" className="r-confirm" onClick={() => setReservationConfirmed(true)}>
                {reservationConfirmed ? "✓ Reservation confirmed" : "Confirm reservation"}
              </button>
            </>
          ) : <small>Choose a time to reserve for two</small>}
        </aside>
      </section>

      <div className="r-ticker">
        <span>WOOD FIRE</span><i>✦</i><span>LOCAL PRODUCE</span><i>✦</i><span>NATURAL WINE</span><i>✦</i><span>DINNER NIGHTLY</span><i>✦</i>
      </div>

      <section className="r-menu">
        <div className="r-menu-title">
          <small>TONIGHT'S MENU</small>
          <h2>Short menu.<br />Good decisions.</h2>
        </div>
        <div className="r-menu-list">
          {[
            ["Charred carrots", "labneh · pistachio · mint", "$14"],
            ["Coal-roasted trout", "brown butter · caper · lemon", "$28"],
            ["Fire chicken", "preserved citrus · jus · greens", "$31"],
            ["Burnt honey cake", "crème fraîche · sea salt", "$12"],
          ].map(([name, desc, price]) => (
            <div key={name}><span><b>{name}</b><small>{desc}</small></span><strong>{price}</strong></div>
          ))}
        </div>
      </section>

      <section className="r-story">
        <div><small>WHY COME HERE</small><h2>A room with a pulse.</h2></div>
        <p>Low light, loud plates, good wine. Come early for the bar, stay late for dessert, and ask us what just came off the fire.</p>
        <div className="r-story-cards">
          <article><Clock3 /><b>Open nightly</b><span>5pm—11pm</span></article>
          <article><MapPin /><b>12 Alder Street</b><span>Downtown · 3 min from Central</span><a href="#r-footer">Directions ↓</a></article>
          <article><Star /><b>Walk-ins welcome</b><span>Bar seats daily</span></article>
        </div>
      </section>

      <footer className="r-footer" id="r-footer"><strong>EMBER & OAK</strong><span>Menu · Reservations · Location · Instagram</span><button>Reserve tonight</button></footer>
    </div>
  );
}

function CafeDemo() {
  const [loyalty, setLoyalty] = useState(false);
  const [pickup, setPickup] = useState(false);

  return (
    <div className="demo-site demo-cafe">
      <header className="c-nav">
        <strong>DAYLIGHT ☀</strong>
        <div>COFFEE / MATCHA / PASTRY</div>
        <button>Menu</button>
      </header>

      <section className="c-hero">
        <div className="c-sticker c-sticker-a">OPEN<br />7—6</div>
        <div className="c-sticker c-sticker-b">GOOD<br />MORNING!</div>
        <div className="c-copy">
          <small>YOUR DAILY LITTLE RITUAL</small>
          <h1>COME FOR THE<br /><em>COFFEE.</em><br />STAY A WHILE.</h1>
          <p>Bright drinks, warm pastry and enough outlets to accidentally stay all afternoon.</p>
          <button type="button" onClick={() => setPickup(true)}>
            {pickup ? "✓ Pickup cart started · ~15 min" : <>Start a pickup order <ArrowRight size={15} /></>}
          </button>
        </div>
        <div className="c-photo"><img src="./demos/cafe.webp" alt="" /></div>
      </section>

      <section className="c-menu-board">
        <div className="c-board-head"><span>TODAY’S BOARD</span><span>SEPT / 24</span></div>
        <div className="c-drinks">
          {[
            ["Espresso", "$3.5", "small / mighty"],
            ["Cloud latte", "$5.5", "oat / vanilla salt"],
            ["Strawberry matcha", "$6", "seasonal favorite"],
            ["Black sesame bun", "$4.5", "baked this morning"],
          ].map(([name, price, note], i) => (
            <article key={name} className={"c-drink c-drink-" + i}>
              <span>0{i + 1}</span><h3>{name}</h3><b>{price}</b><p>{note}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="c-location">
        <div className="c-map-card">
          <div className="c-map-grid" />
          <MapPin />
          <strong>48 Willow Ave</strong>
          <span>3 min from Central Station</span>
        </div>
        <div className="c-loyalty">
          <small>DAYLIGHT CLUB</small>
          <h2>Your 7th drink is on us.</h2>
          <p>One stamp per drink. Your seventh is free, birthday drinks count double, and the pass lives on your phone.</p>
          <button type="button" className={loyalty ? "is-added" : ""} onClick={() => setLoyalty((value) => !value)}>
            {loyalty ? "✓ Daylight Pass added" : "Add loyalty pass"}
          </button>
        </div>
      </section>

      <footer className="c-footer"><strong>DAYLIGHT</strong><span>Mon—Sun · 7:00—18:00</span><span>Instagram ↗</span></footer>
    </div>
  );
}

function SalonDemo() {
  const [slot, setSlot] = useState<string | null>(null);
  const [appointmentConfirmed, setAppointmentConfirmed] = useState(false);

  return (
    <div className="demo-site demo-salon">
      <header className="s-nav">
        <strong>SORA / SKIN</strong>
        <nav><span>Treatments</span><span>Studio</span><span>Journal</span></nav>
        <button>Book</button>
      </header>

      <section className="s-hero">
        <div className="s-copy">
          <small>SKIN STUDIO · BY APPOINTMENT</small>
          <h1>Skin, but<br /><em>less complicated.</em></h1>
          <p>Thoughtful treatments, honest guidance, and a booking experience that feels as calm as the studio.</p>
          <button>Find your treatment</button>
        </div>
        <div className="s-photo"><img src="./demos/salon.webp" alt="" /></div>
        <div className="s-floating-note"><Sparkles /><span>New client facial<br /><b>75 min · $145</b></span></div>
      </section>

      <section className="s-services">
        <div className="s-services-intro">
          <small>01 / TREATMENTS</small><h2>Choose by how you want to feel.</h2>
        </div>
        <div className="s-service-list">
          {[
            ["RESET", "Deep cleanse + calm", "60 min", "$120"],
            ["GLOW", "Brighten + resurface", "75 min", "$145"],
            ["SCULPT", "Massage + lift", "75 min", "$160"],
          ].map(([name, desc, time, price]) => (
            <article key={name}><span>{name}</span><h3>{desc}</h3><small>{time}</small><b>{price}</b><ChevronDown /></article>
          ))}
        </div>
      </section>

      <section className="s-book">
        <div>
          <small>NEXT AVAILABLE</small>
          <h2>Book without calling.</h2>
          <p>Visitors can understand the service, choose a time and arrive prepared.</p>
        </div>
        <div className="s-calendar">
          <div className="s-calendar-head"><b>September</b><span>24—28</span></div>
          <div className="s-time-grid">
            {["Tue 24", "Wed 25", "Thu 26", "Fri 27"].map((day, i) => {
              const times = i % 2 ? ["11:30", "15:00"] : ["10:00", "13:30"];
              return (
                <div key={day}>
                  <strong>{day}</strong>
                  {times.map((time) => {
                    const value = day + " · " + time;
                    return <button type="button" key={time} className={slot === value ? "is-selected" : ""} onClick={() => setSlot(value)}>{time}</button>;
                  })}
                </div>
              );
            })}
          </div>
          {slot && <div className="s-book-confirm">
            <Check size={15} />
            <span>{appointmentConfirmed ? slot + " · New Client Facial · appointment confirmed" : slot + " selected · New Client Facial"}</span>
            <button type="button" onClick={() => setAppointmentConfirmed(true)}>{appointmentConfirmed ? "✓ Confirmed" : "Confirm booking"}</button>
          </div>}
        </div>
      </section>

      <section className="s-philosophy">
        <Quote />
        <h2>No ten-step routine.<br />Just what your skin needs.</h2>
        <span>SORA METHOD · FEWER PRODUCTS · BETTER CONSISTENCY</span>
      </section>

      <footer className="s-footer"><strong>SORA / SKIN</strong><span>Studio · Treatments · Book · FAQ</span><button>Book an appointment</button></footer>
    </div>
  );
}

function ServicesDemo() {
  const [quoteSent, setQuoteSent] = useState(false);

  return (
    <div className="demo-site demo-services">
      <header className="h-topbar"><span>LICENSED · INSURED · LOCAL</span><span>MON—SAT 7AM—7PM</span><span><Phone size={13} /> (555) 014-8820</span></header>
      <header className="h-nav"><strong>NORTHLINE <i>HOME</i></strong><nav><span>Services</span><span>Service Area</span><span>Reviews</span></nav><button>Get estimate</button></header>

      <section className="h-hero">
        <div className="h-copy">
          <div className="h-rating"><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><Star fill="currentColor" /><span>4.9 local rating</span></div>
          <h1>FIX IT ONCE.<br /><span>FIX IT RIGHT.</span></h1>
          <p>Repairs, installs and small renovations with clear arrival windows and written estimates.</p>
          <div className="h-actions"><button>Get a free estimate</button><a href="tel:+15550148820"><Phone size={15} /> Call now</a></div>
          <div className="h-trust"><span><ShieldCheck /> Background checked</span><span><Check /> Work guaranteed</span><span><Clock3 /> Same-week slots</span></div>
        </div>
        <div className="h-photo"><img src="./demos/services.webp" alt="" /><div className="h-photo-badge"><b>12+</b><span>years serving<br />local homes</span></div></div>
      </section>

      <section className="h-services">
        <div className="h-title"><small>POPULAR SERVICES</small><h2>What can we take off your list?</h2></div>
        <div className="h-service-grid">
          {[
            [Wrench, "Repairs", "Doors, drywall, fixtures, hardware"],
            [Hammer, "Installations", "Shelves, TVs, fans, cabinets"],
            [Sparkles, "Refresh", "Paint, trim, punch lists"],
          ].map(([Icon, name, text], index) => {
            const I = Icon as typeof Wrench;
            return <article key={String(name)}><I /><span>0{index + 1}</span><h3>{name as string}</h3><p>{text as string}</p><button>See service <ArrowRight /></button></article>;
          })}
        </div>
      </section>

      <section className="h-quote">
        <div className="h-quote-copy"><small>FREE ESTIMATE</small><h2>Tell us what needs doing.</h2><p>Share the job, your ZIP and the best way to reach you. We’ll confirm the scope and give you a written estimate before work begins.</p></div>
        <form className={"h-form " + (quoteSent ? "is-sent" : "")} onSubmit={(e) => { e.preventDefault(); setQuoteSent(true); }}>
          <label><span>Your name</span><input required placeholder="Alex Morgan" /></label>
          <label><span>Phone or email</span><input required placeholder="alex@email.com" /></label>
          <label><span>What do you need help with?</span><select required defaultValue=""><option value="" disabled>Select a service</option><option>Repair</option><option>Installation</option><option>Painting / refresh</option></select></label>
          <label><span>ZIP code</span><input required placeholder="97205" /></label>
          <label className="h-wide"><span>Tell us a little more</span><textarea required placeholder="Example: mount a TV and repair two drywall holes…" /></label>
          <button className="h-wide">{quoteSent ? "✓ Request captured — we’d follow up next" : <>Request my estimate <ArrowRight /></>}</button>
          {quoteSent && <p className="h-form-success h-wide">Thanks — your estimate request is in. We’ll confirm the visit window within one business day.</p>}
        </form>
      </section>

      <section className="h-service-area"><div><MapPin /><h2>Serving the west side.</h2><p>Downtown · Pearl · Northwest · Beaverton · Hillsboro</p></div><button>Check your ZIP</button></section>
      <footer className="h-footer"><strong>NORTHLINE HOME</strong><span>License #DEMO-2026 · Concept site</span><button>Get estimate</button></footer>
    </div>
  );
}

function FitnessDemo() {
  const [bookedClass, setBookedClass] = useState<string | null>(null);
  const schedule = [
    ["06:00", "FORGE", "Strength", "Maya"],
    ["07:30", "ENGINE", "Conditioning", "Theo"],
    ["12:00", "RESET", "Mobility", "Liv"],
    ["17:30", "FORGE", "Strength", "Maya"],
    ["19:00", "ENGINE", "Conditioning", "Noah"],
  ];

  return (
    <div className="demo-site demo-fitness">
      <header className="f-nav"><strong>RESET<br />CLUB</strong><nav><span>Classes</span><span>Schedule</span><span>Coaches</span><span>Membership</span></nav><button>First class $10</button></header>

      <section className="f-hero">
        <div className="f-photo"><img src="./demos/fitness.webp" alt="" /></div>
        <div className="f-copy">
          <small>SMALL GROUP TRAINING · NO EGO</small>
          <h1>SHOW UP.<br /><i>GET STRONGER.</i><br />REPEAT.</h1>
          <p>Strength, conditioning and mobility coached in groups small enough to know your name.</p>
          <button>Book your first class <ArrowRight /></button>
        </div>
        <div className="f-counter"><b>08</b><span>people max<br />per class</span></div>
      </section>

      <div className="f-marquee"><span>STRENGTH ✦ CONDITIONING ✦ MOBILITY ✦ COACHING ✦ COMMUNITY ✦</span></div>

      <section className="f-schedule">
        <div className="f-section-head"><small>TODAY / WED 24</small><h2>Pick a time.<br />We’ll handle the plan.</h2></div>
        <div className="f-table">
          {schedule.map(([time, cls, type, coach]) => (
            <div key={time + cls} className={bookedClass === time + " " + cls ? "is-booked" : ""}><b>{time}</b><strong>{cls}</strong><span>{type}</span><span>Coach {coach}</span><button type="button" onClick={() => setBookedClass(time + " " + cls)}>{bookedClass === time + " " + cls ? "✓ Booked" : "Book"}</button></div>
          ))}
        </div>
      </section>

      <section className="f-membership">
        <div><small>MEMBERSHIP</small><h2>Simple enough to actually compare.</h2></div>
        <div className="f-plan"><span>8 classes / month</span><b>$149 <small>/ month</small></b><p>Month-to-month · no joining fee · unused classes roll for 30 days.</p><button>Choose 8</button></div>
        <div className="f-plan f-plan-hot"><span>Unlimited</span><b>$189 <small>/ month</small></b><p>Month-to-month · no joining fee · cancel before the next billing date.</p><button>Go unlimited</button></div>
      </section>

      <section className="f-proof">
        <Dumbbell />
        <h2>Programming changes weekly.<br />The habit is the product.</h2>
        <div><span><b>45</b> min classes</span><span><b>08</b> max athletes</span><span><b>03</b> training tracks</span></div>
      </section>
      <footer className="f-footer"><strong>RESET CLUB</strong><span>Schedule · Membership · Coaches</span><button>Book class</button></footer>
    </div>
  );
}

function ProfessionalDemo() {
  const [briefSent, setBriefSent] = useState(false);

  return (
    <div className="demo-site demo-professional">
      <header className="p-nav"><strong>VALE<br />& CO.</strong><nav><span>Expertise</span><span>Engagements</span><span>Approach</span></nav><button>Start a conversation</button></header>

      <section className="p-hero">
        <div className="p-index">01—06</div>
        <div className="p-copy">
          <small>INDEPENDENT STRATEGY & OPERATIONS</small>
          <h1>Make the next<br />move <em>clear.</em></h1>
          <p>Focused advisory for founder-led companies navigating growth, positioning and operational complexity.</p>
          <button>Discuss a project <ArrowRight /></button>
        </div>
        <div className="p-photo"><img src="./demos/professional.webp" alt="" /></div>
      </section>

      <section className="p-proof-strip">
        <span>STRATEGY</span><span>OPERATIONS</span><span>POSITIONING</span><span>GROWTH SYSTEMS</span>
      </section>

      <section className="p-work">
        <div className="p-work-intro"><small>WAYS TO WORK TOGETHER</small><h2>Start with the decision,<br />then choose the engagement.</h2><p>Three example scopes show what a client would actually receive from a focused advisory project.</p></div>
        <div className="p-cases">
          {[
            ["01", "Market entry", "Turn a messy expansion idea into a decision-ready plan.", "Research · Positioning · GTM"],
            ["02", "Operating model", "Clarify ownership, cadence and the handoffs slowing the team down.", "Process · Roles · Systems"],
            ["03", "Offer redesign", "Package expertise so buyers understand value before the sales call.", "Offer · Messaging · Journey"],
          ].map(([n, title, copy, tags]) => (
            <article key={n}><span>{n}</span><h3>{title}</h3><p>{copy}</p><small>{tags}</small><ArrowRight /></article>
          ))}
        </div>
      </section>

      <section className="p-method">
        <div className="p-method-photo"><div className="p-blueprint"><i /><i /><i /></div><strong>CLARITY<br />BEFORE<br />ACTIVITY.</strong></div>
        <div className="p-method-copy"><small>HOW IT WORKS</small><h2>Short engagements.<br />Useful outputs.</h2>
          {[
            ["01", "Diagnose", "What is actually blocking the decision?"],
            ["02", "Structure", "Turn ambiguity into a shared model."],
            ["03", "Deliver", "Leave with artifacts the team can use."],
          ].map(([n,t,c]) => <div key={n}><b>{n}</b><span><strong>{t}</strong><p>{c}</p></span></div>)}
        </div>
      </section>

      <section className="p-contact">
        <div><small>START HERE</small><h2>A useful first call<br />should already create clarity.</h2></div>
        <form className={briefSent ? "is-sent" : ""} onSubmit={(e) => { e.preventDefault(); setBriefSent(true); }}>
          <input required placeholder="Name" />
          <input required type="email" placeholder="Work email" />
          <input placeholder="Company / team" />
          <select defaultValue=""><option value="">Approx. project budget</option><option>$1k–$3k</option><option>$3k–$10k</option><option>$10k+</option></select>
          <textarea required placeholder="What decision or problem are you trying to solve?" />
          <button>{briefSent ? "✓ Brief received" : <>Send brief <ArrowRight /></>}</button>
          {briefSent && <p className="p-form-success">Thanks — your brief is in. Expect a reply with next steps within two business days.</p>}
        </form>
      </section>
      <footer className="p-footer"><strong>VALE & CO.</strong><span>Independent advisory · Remote / selective onsite</span><button>Contact</button></footer>
    </div>
  );
}

export function BusinessDemo({ id }: { id: BusinessDemoId }) {
  if (id === "restaurant") return <RestaurantDemo />;
  if (id === "cafe") return <CafeDemo />;
  if (id === "salon") return <SalonDemo />;
  if (id === "services") return <ServicesDemo />;
  if (id === "fitness") return <FitnessDemo />;
  return <ProfessionalDemo />;
}

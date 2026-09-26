import { demoImg } from "../../demos/shared";
import type { DemoImageFolder } from "../../demos/shared";

export type Discipline = "Identity" | "Motion" | "Digital" | "Campaign";
export const DISCIPLINES: Discipline[] = ["Identity", "Motion", "Digital", "Campaign"];

export type Mark = {
  text: string;
  font: string;
  weight: number;
  tracking: string;
  transform?: "uppercase" | "lowercase" | "none";
  italic?: boolean;
};

export type Swatch = { name: string; hex: string; ink: string };
export type Pic = { src: string; alt: string };

export type Project = {
  slug: string;
  client: string;
  title: string;
  year: number;
  disciplines: Discipline[];
  sector: string;
  location: string;
  summary: string;
  lead: string;
  challenge: string[];
  approach: string[];
  principles: { name: string; text: string }[];
  mark: Mark;
  typeface: string;
  colors: Swatch[];
  hue: number;
  cover: Pic;
  gallery: Pic[];
  posters: string[];
  deliverables: string[];
  outcomes: { value: string; label: string }[];
  quote: { text: string; name: string; role: string };
  credits: { role: string; names: string }[];
};

const pic = (folder: DemoImageFolder, name: string, alt: string): Pic => ({ src: demoImg(folder, name), alt });

export const PROJECTS: Project[] = [
  {
    slug: "parallel",
    client: "Parallel",
    title: "A bank that sounds like the people who use it",
    year: 2025,
    disciplines: ["Identity", "Digital", "Motion"],
    sector: "Fintech",
    location: "New York and London",
    summary: "Rebrand, product language and motion system for a bank built for freelancers.",
    lead: "Parallel holds the money of 410,000 freelancers across the US and UK. After its Series C it needed to stop looking like every other neobank and start looking like the people it serves: busy, independent, a little irreverent about money.",
    challenge: [
      "The old identity was a blue gradient and a rounded sans, chosen in a weekend at launch. It tested fine and meant nothing. In interviews, customers described Parallel as \"the bank that gets invoices\", yet nothing in the brand said so.",
      "The team also shipped product weekly across iOS, Android and web, with no shared rules for illustration, motion or tone. Every squad had quietly built its own version of the brand.",
    ],
    approach: [
      "We built the identity around one idea from the name: two lines that run side by side, your work and your money. The pair becomes the logo, the grid, the progress bar and the transition between screens.",
      "Rather than a brand book, we shipped a Figma library and a Lottie motion kit the product team could use on day one, then sat with three squads for six weeks while they rebuilt onboarding, invoicing and the card flow.",
    ],
    principles: [
      { name: "Two lines, always", text: "Every transition moves on a pair of parallel paths. Nothing enters alone." },
      { name: "Numbers first", text: "Balances and due dates are set larger than any headline. Money is the hero." },
      { name: "Plain words", text: "No finance jargon. \"You got paid\" instead of \"Incoming transfer received\"." },
    ],
    mark: { text: "parallel", font: "'Archivo', sans-serif", weight: 800, tracking: "-0.045em", transform: "lowercase" },
    typeface: "Parallel Grotesk, a sharpened cut of Archivo with squared dots",
    colors: [
      { name: "Parallel Blue", hex: "#2438ff", ink: "#ffffff" },
      { name: "Night", hex: "#0b1030", ink: "#ffffff" },
      { name: "Fog", hex: "#dfe3ff", ink: "#0b1030" },
      { name: "Coral", hex: "#ff8a6b", ink: "#0b1030" },
    ],
    hue: 232,
    cover: pic("lab-agency", "gradient-waves", "Blue and violet brand gradient from the Parallel identity"),
    gallery: [
      pic("people", "woman-red", "Parallel customer portrait from the launch campaign"),
      pic("lab-saas", "laptop-code", "Parallel product team working on the component library"),
    ],
    posters: ["You got paid.", "Invoices that chase themselves.", "Your work. Your money. Side by side."],
    deliverables: ["Brand strategy", "Logo and identity system", "Product design language", "Lottie motion kit", "Figma component library", "Launch film, 60s and 15s"],
    outcomes: [
      { value: "38.2%", label: "more sign-ups completed in the first month after launch" },
      { value: "4.7", label: "App Store rating, up from 4.1, across 23,800 reviews" },
      { value: "11 days", label: "for a new squad to ship on-brand features, down from six weeks" },
    ],
    quote: {
      text: "They gave us a brand our engineers actually use. Six months on, nobody has asked where the logo files are.",
      name: "Imogen Tate",
      role: "VP Brand, Parallel",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren" },
      { role: "Motion direction", names: "Marcus Volt" },
      { role: "Design", names: "Priya Natarajan, Jonah Brandt, Maya Lindqvist" },
      { role: "Motion", names: "Lea Okafor, Tomás Iglesias" },
      { role: "Strategy", names: "Sam Whitlock" },
      { role: "Production", names: "Hana Kobayashi" },
    ],
  },
  {
    slug: "kestrel",
    client: "Kestrel Audio",
    title: "Launching the K2 in forty-one seconds",
    year: 2025,
    disciplines: ["Campaign", "Motion"],
    sector: "Consumer electronics",
    location: "Copenhagen",
    summary: "Launch film, product motion and out-of-home for the K2 over-ear headphone.",
    lead: "Kestrel had an excellent headphone and a nine-week runway to launch it in 14 markets. They asked for one film. We gave them a motion system that cut into 212 assets without a single reshoot.",
    challenge: [
      "Headphone launches all look the same: a slow orbit around the product on a dark sweep. Kestrel's K2 is loud, yellow and made for commuting, and the category conventions sanded that away.",
      "The media plan ran from 6-sheet posters to 6-second pre-roll, and the internal team was two people.",
    ],
    approach: [
      "We shot the K2 once, in a single 3D scan, and built the campaign in CG. Every frame of the hero film is a still that also works as a poster.",
      "The edit follows a strict 41-second structure of seven beats, so regional teams could re-cut it for their markets using a template instead of an agency.",
    ],
    principles: [
      { name: "Cut on the beat", text: "Every cut lands on a kick drum. The film is edited to the track, not the other way round." },
      { name: "Yellow is loud", text: "Kestrel Yellow fills at least a third of every frame, or it isn't a Kestrel frame." },
      { name: "Hard light only", text: "No soft gradients, no bokeh. One key light, deep shadow, sharp edges." },
    ],
    mark: { text: "KESTREL", font: "'Bebas Neue', sans-serif", weight: 400, tracking: "0.08em", transform: "uppercase" },
    typeface: "Bebas Neue for display, set tight and always uppercase",
    colors: [
      { name: "Kestrel Yellow", hex: "#f5d10a", ink: "#141414" },
      { name: "Graphite", hex: "#1c1c1c", ink: "#f5d10a" },
      { name: "Bone", hex: "#eceae3", ink: "#141414" },
      { name: "Signal", hex: "#d8321e", ink: "#ffffff" },
    ],
    hue: 50,
    cover: pic("lab-product", "black-yellow", "Kestrel K2 headphones on a yellow set"),
    gallery: [
      pic("lab-product", "black-on-black", "Kestrel K2 in hard studio light"),
      pic("lab-product", "black-white-bg", "Kestrel K2 in Bone, top view"),
    ],
    posters: ["Louder than the L train.", "K2. Forty hours.", "Hear it before it happens."],
    deliverables: ["Launch film, 41s", "Product motion library", "Out-of-home in 14 markets", "Social cut-downs", "Retail screens", "Re-cut templates"],
    outcomes: [
      { value: "212", label: "launch assets cut from one film and one scan" },
      { value: "2.9M", label: "views of the launch film in the first 72 hours" },
      { value: "63%", label: "of first-run stock sold before the in-store date" },
    ],
    quote: {
      text: "We planned a film and got a whole launch. Our Tokyo team re-cut it on a Tuesday afternoon.",
      name: "Rasmus Holm",
      role: "Head of Marketing, Kestrel Audio",
    },
    credits: [
      { role: "Creative direction", names: "Marcus Volt" },
      { role: "3D and lighting", names: "Tomás Iglesias" },
      { role: "Motion", names: "Lea Okafor, Dev Ramaswamy" },
      { role: "Design", names: "Jonah Brandt" },
      { role: "Sound", names: "Low Hum Audio" },
      { role: "Production", names: "Hana Kobayashi" },
    ],
  },
  {
    slug: "solenne",
    client: "Solenne",
    title: "Skincare in slow motion",
    year: 2024,
    disciplines: ["Identity", "Campaign"],
    sector: "Beauty",
    location: "Paris and New York",
    summary: "Identity and first campaign for a barrier-repair skincare line.",
    lead: "Solenne was founded by two dermatologists with four products and a strong opinion: skin changes slowly, so the brand should too. We designed an identity that moves at the speed of a sunrise.",
    challenge: [
      "Clinical skincare looks like a pharmacy and luxury skincare looks like perfume. Solenne sits between the two, and needed to feel trustworthy without feeling medical.",
      "The founders were launching direct to consumer, with a first retail partner in Paris eight months later.",
    ],
    approach: [
      "We paired a high-contrast Didone logotype with a soft, diffused color field that drifts over 20 seconds in every piece of motion. Nothing in the brand moves faster than a breath.",
      "Packaging uses one color per product, stepping through the palette, so the full routine reads as a gradient on the shelf.",
    ],
    principles: [
      { name: "Slower than you think", text: "Minimum transition length is 1.6 seconds. If it feels slow, it's right." },
      { name: "One gradient per product", text: "Each formula owns a stop in the palette, from Milk to Plum." },
      { name: "Science in small type", text: "Actives and percentages always appear, set small and precise." },
    ],
    mark: { text: "Solenne", font: "'Bodoni Moda', serif", weight: 500, tracking: "-0.01em", italic: true },
    typeface: "Bodoni Moda italic for the mark, a light grotesk for everything else",
    colors: [
      { name: "Petal", hex: "#f3c9d4", ink: "#3a2233" },
      { name: "Lilac", hex: "#b9a6e8", ink: "#231a33" },
      { name: "Milk", hex: "#f7f5f7", ink: "#3a2233" },
      { name: "Plum", hex: "#3a2233", ink: "#f3c9d4" },
    ],
    hue: 320,
    cover: pic("lab-agency", "gradient-soft", "Soft pink and blue color field from the Solenne identity"),
    gallery: [
      pic("people", "woman-2", "Portrait from the Solenne launch campaign"),
      pic("lab-agency", "abstract-white-waves", "White sculpted texture used on Solenne packaging"),
    ],
    posters: ["Skin keeps time.", "Barrier repair, 4% niacinamide.", "Slowly, then all at once."],
    deliverables: ["Naming support", "Logotype and identity", "Packaging system, 4 SKUs", "Launch campaign", "Retail fixture for Paris", "Brand motion guidelines"],
    outcomes: [
      { value: "€1.8M", label: "first-year sales, 40% above the founders' plan" },
      { value: "31%", label: "of first orders were the full four-step routine" },
      { value: "4", label: "retail partners signed within the first year" },
    ],
    quote: {
      text: "The brand tells people to slow down before they read a word. That's exactly what our skin advice says.",
      name: "Dr. Claire Moreau",
      role: "Co-founder, Solenne",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren" },
      { role: "Design", names: "Maya Lindqvist, Priya Natarajan" },
      { role: "Packaging", names: "Jonah Brandt" },
      { role: "Motion", names: "Lea Okafor" },
      { role: "Copy", names: "Owen Pryce" },
      { role: "Production", names: "Hana Kobayashi" },
    ],
  },
  {
    slug: "orbit-nine",
    client: "Orbit Nine",
    title: "Making satellite data legible",
    year: 2024,
    disciplines: ["Identity", "Motion"],
    sector: "Space and data",
    location: "Denver",
    summary: "Identity and data motion language for an earth observation company.",
    lead: "Orbit Nine runs nine imaging satellites and sells what they see to insurers, farmers and city planners. Its customers aren't space nerds, so the brand had to make orbital data feel ordinary and useful.",
    challenge: [
      "Space companies default to black backgrounds, lens flares and rocket footage. None of Orbit Nine's buyers care about rockets. They care about whether a field flooded on Tuesday.",
      "The company also needed one visual language that worked for a sales deck, a conference booth and a live data product.",
    ],
    approach: [
      "The mark is a slash through a nine, the path of a satellite across a frame. The same angle drives a grid used across layouts, maps and charts.",
      "We built the motion language from the satellites' real revisit cycle: every animation completes in 0.9 seconds or a multiple of it, so data and brand share one rhythm.",
    ],
    principles: [
      { name: "The ground is the hero", text: "Imagery shows places people know, never the satellite itself." },
      { name: "Revisit rhythm", text: "Durations are multiples of 0.9 seconds, matching the constellation's revisit." },
      { name: "Honest data", text: "Charts show confidence ranges. The brand never rounds up." },
    ],
    mark: { text: "ORBIT/9", font: "'Jost', sans-serif", weight: 500, tracking: "0.18em", transform: "uppercase" },
    typeface: "Jost in medium weight, widely tracked for the mark and labels",
    colors: [
      { name: "Deep Orbit", hex: "#0a1428", ink: "#cfe8ff" },
      { name: "Terminator", hex: "#ff9f45", ink: "#0a1428" },
      { name: "Ice", hex: "#cfe8ff", ink: "#0a1428" },
      { name: "Grid Gray", hex: "#7b8698", ink: "#0a1428" },
    ],
    hue: 210,
    cover: pic("lab-saas", "earth-night", "Earth at night, the visual anchor of the Orbit Nine identity"),
    gallery: [
      pic("lab-agency", "blueprint", "Orbit Nine grid studies on dark blue"),
      pic("lab-saas", "datacenter", "Orbit Nine ground station interior"),
    ],
    posters: ["Tuesday, 06:12. The field flooded.", "Nine satellites. One planet.", "See it change."],
    deliverables: ["Brand platform", "Logo and grid system", "Data visualization language", "Motion toolkit", "Conference booth system", "Investor film"],
    outcomes: [
      { value: "$74M", label: "Series B closed four months after the rebrand" },
      { value: "3x", label: "more inbound enterprise leads year over year" },
      { value: "0.9s", label: "base unit shared by every brand and product animation" },
    ],
    quote: {
      text: "Our salespeople stopped explaining orbits and started showing farms. That was the whole brief, and they nailed it.",
      name: "Daniel Okoro",
      role: "CEO, Orbit Nine",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren, Marcus Volt" },
      { role: "Design", names: "Jonah Brandt, Maya Lindqvist" },
      { role: "Data design", names: "Priya Natarajan" },
      { role: "Motion", names: "Dev Ramaswamy" },
      { role: "Strategy", names: "Sam Whitlock" },
    ],
  },
  {
    slug: "loop",
    client: "Loop",
    title: "A city system you can read at 20 mph",
    year: 2024,
    disciplines: ["Motion", "Campaign", "Digital"],
    sector: "Mobility",
    location: "Philadelphia",
    summary: "Station motion, app language and launch campaign for Philadelphia's new bike share.",
    lead: "Loop replaced Philadelphia's aging bike share with 3,400 e-bikes and 260 stations. We designed how the system talks: on station screens, in the app, and across the city during launch month.",
    challenge: [
      "A bike share lives on the street. Riders read a station screen for two seconds, often in glare, often while moving. The brand had to survive at that distance and speed.",
      "The city also required every public surface to meet strict accessibility rules, including color-blind safe status signals.",
    ],
    approach: [
      "We designed the motion first and the logo second. Station states (available, low, docked, charging) each have one clear animated signal that reads from 12 meters away.",
      "The launch campaign turned those signals into posters: each neighborhood got a line written for its own streets.",
    ],
    principles: [
      { name: "Two-second read", text: "Every screen state is tested at two seconds, in sunlight, from a moving bike." },
      { name: "Shape before color", text: "Status is carried by shape and motion, so color is never the only signal." },
      { name: "Local voice", text: "Posters speak to one neighborhood at a time. No city-wide slogans." },
    ],
    mark: { text: "loop", font: "'Manrope', sans-serif", weight: 800, tracking: "-0.05em", transform: "lowercase" },
    typeface: "Manrope ExtraBold, tightened for signage at distance",
    colors: [
      { name: "Loop Red", hex: "#ff2d3d", ink: "#ffffff" },
      { name: "Asphalt", hex: "#1d1b22", ink: "#f1f1ee" },
      { name: "Lane Blue", hex: "#3e5bff", ink: "#ffffff" },
      { name: "Chalk", hex: "#f1f1ee", ink: "#1d1b22" },
    ],
    hue: 355,
    cover: pic("lab-agency", "gradient-dark", "Red and violet motion field from the Loop launch"),
    gallery: [
      pic("people", "man-cap", "Loop rider portrait from the launch campaign"),
      pic("lab-architecture", "towers-dark", "Philadelphia skyline at dusk"),
    ],
    posters: ["Fishtown, you're 9 minutes from Old City.", "260 stations. Zero hills worth mentioning.", "Dock it, done."],
    deliverables: ["Station screen motion", "App motion language", "Wayfinding animation", "Launch campaign, 22 neighborhoods", "Transit shelter posters", "Accessibility audit"],
    outcomes: [
      { value: "1.2M", label: "rides in the first 90 days, double the old system" },
      { value: "0.4s", label: "faster average time to read a station screen in field tests" },
      { value: "22", label: "neighborhood campaigns written and placed" },
    ],
    quote: {
      text: "Riders don't notice the design, they just know where the bikes are. For a public system that's the highest praise.",
      name: "Teresa Villanueva",
      role: "Director, Loop Philadelphia",
    },
    credits: [
      { role: "Motion direction", names: "Marcus Volt" },
      { role: "Design", names: "Priya Natarajan, Jonah Brandt" },
      { role: "Motion", names: "Lea Okafor, Dev Ramaswamy" },
      { role: "Copy", names: "Owen Pryce" },
      { role: "Accessibility", names: "Felix Hart" },
      { role: "Production", names: "Hana Kobayashi" },
    ],
  },
  {
    slug: "fieldwork",
    client: "Fieldwork Coffee",
    title: "Labels that read like field notes",
    year: 2023,
    disciplines: ["Identity"],
    sector: "Food and drink",
    location: "Portland, Oregon",
    summary: "Identity and packaging for a direct-trade roaster with 38 farm partners.",
    lead: "Fieldwork buys coffee from 38 farms it visits every season. Its old bags said \"ethically sourced\" like everyone else. We redesigned them to show the actual notes from those visits.",
    challenge: [
      "Specialty coffee packaging is crowded with the same claims. Fieldwork had real stories, names and altitudes, but no way to fit them on a bag without clutter.",
      "Lots change every eight weeks, so any system had to be printable in-house on a label printer.",
    ],
    approach: [
      "We designed a notebook-page label: a fixed masthead and a flexible field-notes block that the roasting team fills in from a template, lot by lot.",
      "A small set of earth tones maps to origin regions, so the shelf sorts itself by continent.",
    ],
    principles: [
      { name: "Write it down", text: "Every bag carries a farm name, altitude and harvest month." },
      { name: "Print in-house", text: "Everything variable prints on one thermal label. No reprints per lot." },
      { name: "Color by origin", text: "Clay for Africa, Moss for the Americas, Char for Asia-Pacific." },
    ],
    mark: { text: "Fieldwork", font: "'Libre Baskerville', serif", weight: 700, tracking: "-0.02em" },
    typeface: "Libre Baskerville for the mark, a typewriter face for field notes",
    colors: [
      { name: "Clay", hex: "#b4532a", ink: "#f3ede2" },
      { name: "Moss", hex: "#3f4a2c", ink: "#f3ede2" },
      { name: "Kraft", hex: "#e6dac4", ink: "#231f1c" },
      { name: "Char", hex: "#231f1c", ink: "#e6dac4" },
    ],
    hue: 20,
    cover: pic("lab-agency", "desk-flatlay", "Fieldwork coffee and notebooks on a roastery desk"),
    gallery: [
      pic("lab-agency", "color-swatches", "Fieldwork origin color studies"),
      pic("lab-agency", "sketching", "Label layout sketches for Fieldwork"),
    ],
    posters: ["Huila, 1,720 m. Picked in May.", "38 farms. We've met all of them.", "Notes from the field."],
    deliverables: ["Logotype", "Packaging system", "Label templates", "Café signage", "Wholesale guide"],
    outcomes: [
      { value: "27%", label: "growth in subscription orders in the six months after launch" },
      { value: "0", label: "reprints needed across 19 lot changes" },
      { value: "5", label: "new café wholesale accounts in Seattle and Portland" },
    ],
    quote: {
      text: "Our roasters now fill in the labels themselves, and customers read them. People ask about the farms by name.",
      name: "Nate Albright",
      role: "Founder, Fieldwork Coffee",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren" },
      { role: "Design", names: "Maya Lindqvist" },
      { role: "Typography", names: "Ruth Adeyemi" },
      { role: "Copy", names: "Owen Pryce" },
    ],
  },
  {
    slug: "mellow",
    client: "Mellow",
    title: "Designing for the last screen of the day",
    year: 2024,
    disciplines: ["Digital", "Motion"],
    sector: "Health and wellbeing",
    location: "San Francisco",
    summary: "Product redesign and motion language for a sleep app with 2.3M members.",
    lead: "Mellow is the app people open in bed. We redesigned it for the moment it's used: low light, tired eyes, one hand. The result is a product that gets quieter the later it gets.",
    challenge: [
      "The old app was bright, busy and full of streaks and badges, the opposite of what someone needs at 11pm.",
      "Mellow's retention dropped sharply after week three, and exit surveys kept saying the same thing: it felt like another thing to keep up with.",
    ],
    approach: [
      "The interface dims and slows as bedtime approaches. After 10pm the palette shifts to warm, contrast drops and every transition doubles in length.",
      "We replaced streaks with a single soft form that grows as you sleep. No numbers on screen after dark.",
    ],
    principles: [
      { name: "Dimmer after dark", text: "Palette, contrast and pace follow the user's own bedtime." },
      { name: "No scores at night", text: "Numbers wait for the morning. The night view is shape only." },
      { name: "One thumb", text: "Every nighttime action sits in the lower third of the screen." },
    ],
    mark: { text: "mellow", font: "'Jost', sans-serif", weight: 400, tracking: "0.02em", transform: "lowercase" },
    typeface: "Jost Regular, lowercase, with a softened o",
    colors: [
      { name: "Dusk", hex: "#6d5bd0", ink: "#ffffff" },
      { name: "Haze", hex: "#c9c3f2", ink: "#17132b" },
      { name: "Ember", hex: "#ffc4a8", ink: "#17132b" },
      { name: "Night", hex: "#17132b", ink: "#c9c3f2" },
    ],
    hue: 255,
    cover: pic("lab-agency", "sphere-3d", "Soft sphere from the Mellow motion language"),
    gallery: [
      pic("people", "woman-1", "Mellow member portrait"),
      pic("lab-agency", "abstract-white-waves", "Soft sculpted texture from Mellow's morning view"),
    ],
    posters: ["Put the day down.", "Nothing to keep up with.", "See you in the morning."],
    deliverables: ["Product design", "Night mode system", "Motion language", "Sleep form in 3D", "App Store creative"],
    outcomes: [
      { value: "+19.6%", label: "week-four retention after the redesign" },
      { value: "2.3M", label: "members using the new night mode" },
      { value: "11", label: "countries where Mellow reached the top ten in Health" },
    ],
    quote: {
      text: "They were the only team that asked what the app should feel like at 1am. Everything followed from that.",
      name: "Lena Park",
      role: "Head of Product, Mellow",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren" },
      { role: "Product design", names: "Priya Natarajan, Felix Hart" },
      { role: "Motion and 3D", names: "Tomás Iglesias, Lea Okafor" },
      { role: "Research", names: "Sam Whitlock" },
    ],
  },
  {
    slug: "low-tide",
    client: "Low Tide",
    title: "Three days, one tide chart",
    year: 2023,
    disciplines: ["Campaign", "Identity"],
    sector: "Music and culture",
    location: "Rockaway Beach, New York",
    summary: "Identity and campaign for a music and ideas festival that runs on the tides.",
    lead: "Low Tide is a three-day festival on Rockaway Beach where set times follow the tide chart. We built its identity from that chart, then turned it into a campaign across the subway and the beach.",
    challenge: [
      "Festival branding is a lineup poster and a logo. Low Tide's founders wanted something that could change every year without starting over.",
      "The whole campaign budget was smaller than most festivals spend on one billboard.",
    ],
    approach: [
      "Each year's identity is generated from that summer's actual tide data. The wave in the posters is the real water level over the festival weekend.",
      "We focused spend on two subway lines to the beach and made the posters collectible, printed in a numbered edition of 500.",
    ],
    principles: [
      { name: "The data is the design", text: "The tide curve is never drawn by hand." },
      { name: "Loud type, one color", text: "One heavy face, one fluorescent ink per year." },
      { name: "Made for the A train", text: "Every piece is designed to be read on the way there." },
    ],
    mark: { text: "LOW TIDE", font: "'Archivo', sans-serif", weight: 900, tracking: "-0.03em", transform: "uppercase" },
    typeface: "Archivo Black, set tight, one weight only",
    colors: [
      { name: "Tide Magenta", hex: "#ff3fa4", ink: "#1b0f3d" },
      { name: "Deep Water", hex: "#1b0f3d", ink: "#ff3fa4" },
      { name: "Foam", hex: "#f4f1ff", ink: "#1b0f3d" },
      { name: "Sodium", hex: "#ffb000", ink: "#1b0f3d" },
    ],
    hue: 300,
    cover: pic("lab-agency", "gradient-purple", "Magenta tide field from the Low Tide identity"),
    gallery: [
      pic("lab-agency", "retro-neon", "Low Tide night program visual"),
      pic("people", "woman-redhead", "Festival goer portrait for Low Tide"),
    ],
    posters: ["Sets start when the water goes out.", "Aug 18 to 20. Beach 97th St.", "Take the A to the end."],
    deliverables: ["Identity system", "Tide-driven poster generator", "Subway campaign", "Merchandise", "Site signage", "Social toolkit"],
    outcomes: [
      { value: "Sold out", label: "all 9,000 weekend passes, six weeks before the gates opened" },
      { value: "500", label: "numbered posters, gone in two days" },
      { value: "3", label: "years running on the same generative system" },
    ],
    quote: {
      text: "Our identity now changes with the ocean. People collect the posters like records.",
      name: "Jules Carver",
      role: "Co-founder, Low Tide",
    },
    credits: [
      { role: "Creative direction", names: "Marcus Volt" },
      { role: "Design", names: "Jonah Brandt, Maya Lindqvist" },
      { role: "Creative code", names: "Felix Hart" },
      { role: "Copy", names: "Owen Pryce" },
    ],
  },
  {
    slug: "undertow",
    client: "Undertow Records",
    title: "A label that changes with every record",
    year: 2022,
    disciplines: ["Identity", "Motion"],
    sector: "Music",
    location: "Brooklyn",
    summary: "Identity and release system for an independent label with 40 artists.",
    lead: "Undertow puts out around 30 records a year, from ambient to hardcore. We gave it an identity that stays recognisable while every release looks completely different.",
    challenge: [
      "A label's logo sits on artists' covers, and artists hate that. Undertow needed a presence that artists would welcome rather than tolerate.",
      "With 30 releases a year and no in-house designer, the system had to be simple enough for artists' own designers to follow.",
    ],
    approach: [
      "The identity is a single rule: a thin band of fluid color along the bottom edge, pulled from the record's own artwork. The wordmark only appears on the spine.",
      "For motion, each release gets a 10-second loop of its artwork dissolving into the band, used on streaming canvases and at shows.",
    ],
    principles: [
      { name: "The artist's cover first", text: "The label takes up no more than 6% of any cover." },
      { name: "One band, every time", text: "Color comes from the art, position never changes." },
      { name: "Loops, not ads", text: "Release motion is made to be watched on repeat." },
    ],
    mark: { text: "UNDERTOW", font: "'Cormorant Garamond', serif", weight: 700, tracking: "0.14em", transform: "uppercase" },
    typeface: "Cormorant Garamond Bold, widely spaced capitals",
    colors: [
      { name: "Undertow Blue", hex: "#1446ff", ink: "#ffffff" },
      { name: "Rust", hex: "#e0662a", ink: "#0c1320" },
      { name: "Black Water", hex: "#0c1320", ink: "#e9ecef" },
      { name: "Salt", hex: "#e9ecef", ink: "#0c1320" },
    ],
    hue: 220,
    cover: pic("lab-agency", "fluid-paint", "Fluid paint artwork from an Undertow release"),
    gallery: [
      pic("people", "man-glasses", "Undertow artist portrait"),
      pic("lab-agency", "blue-lines", "Undertow release artwork in blue"),
    ],
    posters: ["New from Undertow.", "Tidewater, Vol. 2. Out Friday.", "Live at the Marsh Room, Nov 4."],
    deliverables: ["Identity rules", "Release template", "Motion loops", "Vinyl spine system", "Merch", "Show posters"],
    outcomes: [
      { value: "74", label: "releases on the system since launch" },
      { value: "0", label: "artists who have asked to remove the band" },
      { value: "41%", label: "longer average listen on releases with motion loops" },
    ],
    quote: {
      text: "Artists used to ask us to shrink the logo. Now they ask which color their band will be.",
      name: "Theo Marsh",
      role: "Founder, Undertow Records",
    },
    credits: [
      { role: "Creative direction", names: "Marcus Volt" },
      { role: "Design", names: "Maya Lindqvist" },
      { role: "Motion", names: "Lea Okafor" },
      { role: "Typography", names: "Ruth Adeyemi" },
    ],
  },
  {
    slug: "tern",
    client: "Tern",
    title: "Charging that shows its working",
    year: 2023,
    disciplines: ["Digital", "Identity"],
    sector: "Energy",
    location: "Austin",
    summary: "Identity, app and charger screens for a fast-charging network across Texas.",
    lead: "Tern operates 180 fast-charging sites across Texas. Drivers told us the worst part of charging isn't waiting, it's not knowing. We designed a brand and product that always show what's happening.",
    challenge: [
      "Charger screens are small, slow and unreliable. When something goes wrong, drivers see a spinner and nothing else.",
      "Tern wanted a brand that felt calm and technical at once, and that worked on an 8-inch charger screen as well as a highway sign.",
    ],
    approach: [
      "The logo is a bird in two strokes that also works as a charge indicator: it fills from left to right as the car charges.",
      "We rewrote every charger state in plain language and gave each one a visible next step, then carried the same states into the app.",
    ],
    principles: [
      { name: "Always a next step", text: "No state without an action or a time estimate." },
      { name: "Readable from the car", text: "Key numbers are set large enough to read through a windshield." },
      { name: "Calm under pressure", text: "Errors use the same tone and color as everything else. No red alarms." },
    ],
    mark: { text: "tern", font: "'Mulish', sans-serif", weight: 800, tracking: "-0.04em", transform: "lowercase", italic: true },
    typeface: "Mulish ExtraBold italic, cut for forward motion",
    colors: [
      { name: "Current", hex: "#18e0a0", ink: "#0f1b17" },
      { name: "Electric", hex: "#0057ff", ink: "#ffffff" },
      { name: "Asphalt", hex: "#15181d", ink: "#18e0a0" },
      { name: "Cloud", hex: "#eef1f4", ink: "#15181d" },
    ],
    hue: 190,
    cover: pic("lab-agency", "blue-lines", "Flowing blue lines from the Tern identity"),
    gallery: [
      pic("lab-architecture", "facade-curves", "Curved facade at a Tern flagship site in Austin"),
      pic("people", "man-smile", "Tern driver portrait"),
    ],
    posters: ["80% in 22 minutes. We'll tell you when.", "180 sites. Every one shows its working.", "Charge like you mean it."],
    deliverables: ["Brand identity", "Charger screen UI", "iOS and Android app", "Highway signage", "Motion states"],
    outcomes: [
      { value: "-52%", label: "support calls from charger sites in the first quarter" },
      { value: "4.8", label: "average app rating from 12,406 reviews" },
      { value: "180", label: "sites updated over the air in one week" },
    ],
    quote: {
      text: "The charger finally tells drivers what it's doing. Our support team noticed before our marketing team did.",
      name: "Marco Ruiz",
      role: "COO, Tern",
    },
    credits: [
      { role: "Creative direction", names: "Ada Wren" },
      { role: "Product design", names: "Felix Hart, Priya Natarajan" },
      { role: "Motion", names: "Dev Ramaswamy" },
      { role: "Copy", names: "Owen Pryce" },
      { role: "Production", names: "Hana Kobayashi" },
    ],
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug) ?? PROJECTS[0];

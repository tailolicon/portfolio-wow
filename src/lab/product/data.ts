import { demoImg } from "../../demos/shared";

export const PAGES = ["home", "specs", "compare", "support", "buy"] as const;
export type Page = (typeof PAGES)[number];

export const NAV: { page: Page; label: string }[] = [
  { page: "home", label: "Kova One" },
  { page: "specs", label: "Tech specs" },
  { page: "compare", label: "Compare" },
  { page: "support", label: "Support" },
];

export const IMG = {
  one: demoImg("lab-product", "black-on-black"),
  air: demoImg("lab-product", "black-studio"),
  city: demoImg("lab-architecture", "towers-fog"),
  night: demoImg("lab-saas", "earth-night"),
  city2: demoImg("lab-architecture", "city-sunset"),
};

export type ColorId = "graphite" | "sand" | "silver";

export const COLORS: { id: ColorId; name: string; swatch: string; cup: string; cushion: string; note: string }[] = [
  {
    id: "graphite",
    name: "Graphite",
    swatch: "#3A3C3F",
    cup: "#2E3033",
    cushion: "#1A1B1D",
    note: "Bead-blasted aluminium with a dark anodised finish and black cushions.",
  },
  {
    id: "sand",
    name: "Sand",
    swatch: "#CDBFA8",
    cup: "#C9BBA3",
    cushion: "#8C7F6C",
    note: "A warm, pale anodised finish with taupe cushions and a stone headband.",
  },
  {
    id: "silver",
    name: "Silver",
    swatch: "#C9CCCF",
    cup: "#BFC3C7",
    cushion: "#3B3E42",
    note: "Natural brushed aluminium with charcoal cushions.",
  },
];

export const PRICE = 449;

export const CARE_PLANS = [
  { id: "none", name: "No coverage", price: 0, detail: "Includes the standard 2-year Kova warranty." },
  {
    id: "care",
    name: "Kova Care+",
    price: 49,
    detail: "3 years of cover, including 2 accidental damage repairs at $29 each and a free battery service.",
  },
  {
    id: "care-theft",
    name: "Kova Care+ with loss and theft",
    price: 79,
    detail: "Everything in Care+, plus up to 2 replacements if your headphones are lost or stolen.",
  },
] as const;

export type CareId = (typeof CARE_PLANS)[number]["id"];

export const STORY_MODES = [
  {
    id: "adaptive",
    name: "Adaptive",
    text: "Kova One listens to the room and to the seal around your ears, then sets the right amount of cancellation on its own. A quiet office gets a light touch. A train platform gets all of it.",
  },
  {
    id: "anc",
    name: "Noise cancelling",
    text: "Maximum cancellation, held steady. Eight microphones sample the outside world 48,000 times a second and remove up to 38 dB of low rumble, voices and air conditioning.",
  },
  {
    id: "aware",
    name: "Aware",
    text: "Let the world back in without taking them off. Voices come through clearly, engines and wind stay soft, and your music drops by 60 percent when you start talking.",
  },
] as const;

export const EQ_PRESETS: Record<string, number[]> = {
  Balanced: [0, 0, 0, 0, 0],
  Studio: [-1, 0, 1, 1, 2],
  "Low end": [5, 3, 0, -1, 0],
  Voice: [-3, -1, 3, 4, 1],
  Commute: [2, 1, -1, 1, 2],
};

export const EQ_BANDS = ["60 Hz", "250 Hz", "1 kHz", "4 kHz", "12 kHz"];

export const IN_THE_BOX = [
  { name: "Kova One", detail: "In the colour you choose" },
  { name: "Folding travel case", detail: "Recycled felt, magnetic closure" },
  { name: "USB-C to USB-C cable", detail: "1.2 m, braided" },
  { name: "3.5 mm audio cable", detail: "1.2 m, for wired listening" },
  { name: "Flight adapter", detail: "Dual 3.5 mm plug" },
  { name: "Quick start guide", detail: "Printed on recycled paper" },
];

export type SpecGroup = { id: string; title: string; rows: [string, string][] };

export const SPEC_GROUPS: SpecGroup[] = [
  {
    id: "design",
    title: "Design and weight",
    rows: [
      ["Weight", "268 g"],
      ["Dimensions, unfolded", "188 x 164 x 79 mm"],
      ["Dimensions, folded", "164 x 142 x 52 mm"],
      ["Headband", "Stainless steel core, knitted polyester cover (100% recycled yarn)"],
      ["Yokes and cups", "Recycled aluminium (78% post-consumer), anodised"],
      ["Ear cushions", "Protein leather over slow-recovery memory foam, magnetic and replaceable"],
      ["Colours", "Graphite, Sand, Silver"],
    ],
  },
  {
    id: "audio",
    title: "Audio",
    rows: [
      ["Driver", "40 mm dynamic, carbon-reinforced diaphragm, neodymium magnet"],
      ["Frequency response", "4 Hz to 40,000 Hz"],
      ["Impedance", "32 ohm (passive mode)"],
      ["Sensitivity", "101 dB SPL at 1 kHz, 1 mW"],
      ["Total harmonic distortion", "Below 0.08% at 1 kHz, 94 dB SPL"],
      ["Tuning", "Kova Reference target, measured on our Copenhagen head and torso rig"],
      ["Wired listening", "USB-C digital audio up to 24-bit, 96 kHz; 3.5 mm analogue"],
    ],
  },
  {
    id: "noise",
    title: "Noise control",
    rows: [
      ["Noise cancelling", "Adaptive hybrid (feedforward and feedback)"],
      ["Microphones for noise control", "6 of 8"],
      ["Peak reduction", "Up to 38 dB"],
      ["Modes", "Adaptive, Noise cancelling, Aware"],
      ["Wind handling", "Automatic wind noise reduction on the outer microphones"],
      ["Speak to chat", "Pauses or lowers audio when you start talking (optional)"],
    ],
  },
  {
    id: "calls",
    title: "Calls",
    rows: [
      ["Microphones for voice", "4 beamforming, 2 shared with noise control"],
      ["Voice pickup", "Bone-conduction sensor in the right cup"],
      ["Sidetone", "Adjustable in the Kova app, 5 levels"],
      ["Wideband voice", "Yes, with LC3 on supported devices"],
    ],
  },
  {
    id: "battery",
    title: "Battery and charging",
    rows: [
      ["Listening time, noise cancelling on", "Up to 42 hours"],
      ["Listening time, noise cancelling off", "Up to 60 hours"],
      ["Talk time", "Up to 30 hours"],
      ["Fast charge", "5 minutes for 4 hours of playback"],
      ["Full charge", "1 hour 50 minutes with a 20 W USB-C adapter"],
      ["Battery", "1,020 mAh lithium-ion, replaceable by Kova Service"],
    ],
  },
  {
    id: "connectivity",
    title: "Connectivity",
    rows: [
      ["Bluetooth", "5.3, Class 1"],
      ["Multipoint", "2 devices at once, 8 remembered"],
      ["Codecs", "SBC, AAC, LC3"],
      ["Range", "Up to 15 m in open air"],
      ["Latency", "Low-latency mode, 64 ms"],
      ["Ports", "USB-C (charging and audio), 3.5 mm"],
    ],
  },
  {
    id: "spatial",
    title: "Spatial audio and sensors",
    rows: [
      ["Spatial audio", "Kova Space rendering with dynamic head tracking"],
      ["Head tracking", "6-axis motion sensor, recentres after 8 seconds of stillness"],
      ["Wear detection", "Optical sensor in each cup; pauses when you lift one off"],
      ["Controls", "Touch surface on the right cup; physical power and mode buttons"],
    ],
  },
  {
    id: "software",
    title: "App and software",
    rows: [
      ["Kova app", "iOS 16 or later, Android 10 or later"],
      ["EQ", "5-band custom EQ with 5 editable presets, saved to the headphones"],
      ["Hearing profile", "Guided 3-minute test that tunes playback to your hearing"],
      ["Updates", "Over the air through the Kova app"],
      ["Current firmware", "2.4.1"],
    ],
  },
  {
    id: "environment",
    title: "Environment",
    rows: [
      ["Recycled content", "41% of total product weight"],
      ["Packaging", "Plastic-free, FSC-certified fibre"],
      ["Repairability", "Cushions, headband cover and battery are replaceable"],
      ["Spare parts", "Available for at least 7 years after the last unit is sold"],
    ],
  },
];

export type ModelId = "one" | "air" | "buds";

export const MODELS: { id: ModelId; name: string; kind: string; price: number; line: string }[] = [
  { id: "one", name: "Kova One", kind: "Over-ear", price: 449, line: "Our quietest, most complete headphones." },
  { id: "air", name: "Kova Air", kind: "On-ear", price: 249, line: "Light, foldable and made to be carried every day." },
  { id: "buds", name: "Kova Buds", kind: "In-ear", price: 199, line: "Everything you need in a case that fits a coin pocket." },
];

export type CompareCell = string | boolean;
export type CompareRow = { label: string; values: [CompareCell, CompareCell, CompareCell] };

export const COMPARE_GROUPS: { title: string; rows: CompareRow[] }[] = [
  {
    title: "Sound",
    rows: [
      { label: "Driver", values: ["40 mm dynamic", "32 mm dynamic", "11 mm dynamic"] },
      { label: "Frequency response", values: ["4 Hz to 40 kHz", "10 Hz to 22 kHz", "20 Hz to 20 kHz"] },
      { label: "Spatial audio", values: ["With head tracking", "Fixed", "With head tracking"] },
      { label: "Custom EQ", values: ["5 bands", "5 bands", "5 bands"] },
      { label: "Wired listening", values: ["USB-C and 3.5 mm", "3.5 mm", false] },
    ],
  },
  {
    title: "Noise control",
    rows: [
      { label: "Noise cancelling", values: ["Adaptive, up to 38 dB", "Standard, up to 27 dB", "Adaptive, up to 33 dB"] },
      { label: "Aware mode", values: [true, true, true] },
      { label: "Microphones", values: ["8", "4", "6 (3 per bud)"] },
      { label: "Wind noise reduction", values: [true, false, true] },
    ],
  },
  {
    title: "Battery",
    rows: [
      { label: "Listening time", values: ["42 h", "36 h", "8 h, 30 h with case"] },
      { label: "Fast charge", values: ["5 min for 4 h", "10 min for 3 h", "5 min for 1 h"] },
      { label: "Wireless charging", values: [false, false, "Qi case"] },
    ],
  },
  {
    title: "Design",
    rows: [
      { label: "Fit", values: ["Over-ear", "On-ear", "In-ear, 4 tip sizes"] },
      { label: "Weight", values: ["268 g", "182 g", "5.1 g per bud"] },
      { label: "Materials", values: ["Recycled aluminium, protein leather", "Recycled aluminium, fabric cushions", "Recycled plastics"] },
      { label: "Water resistance", values: [false, false, "IPX4"] },
      { label: "Folds flat", values: [true, true, false] },
      { label: "Case", values: ["Folding felt case", "Soft pouch", "Charging case"] },
      { label: "Colours", values: ["Graphite, Sand, Silver", "Silver, Graphite", "Graphite, Sand"] },
    ],
  },
  {
    title: "Connectivity",
    rows: [
      { label: "Bluetooth", values: ["5.3", "5.3", "5.3"] },
      { label: "Multipoint", values: ["2 devices", "2 devices", "2 devices"] },
      { label: "Wear detection", values: [true, false, true] },
    ],
  },
];

export const SUPPORT_TOPICS = [
  { title: "Getting started", detail: "Unbox, charge and pair in under five minutes." },
  { title: "Pairing and multipoint", detail: "Connect a phone and a laptop at the same time." },
  { title: "Noise control", detail: "Adaptive, Noise cancelling and Aware explained." },
  { title: "Battery and charging", detail: "Fast charge, storage and battery health." },
  { title: "Kova app", detail: "EQ, hearing profile and settings." },
  { title: "Cushions and care", detail: "Cleaning and replacing the ear cushions." },
];

export const SETUP_STEPS = [
  {
    title: "Charge for a few minutes",
    text: "Kova One ships at around 40 percent. Plug in the USB-C cable for five minutes if the light on the right cup blinks amber.",
  },
  {
    title: "Hold the power button for 3 seconds",
    text: "The first time you switch them on, Kova One goes straight into pairing mode. The light pulses white.",
  },
  {
    title: "Choose Kova One on your device",
    text: "Open Bluetooth settings on your phone or computer and select Kova One. You will hear a short tone when it connects.",
  },
  {
    title: "Open the Kova app",
    text: "The app finds your headphones, installs the latest firmware and walks you through the fit test and hearing profile.",
  },
];

export const FAQ = [
  {
    q: "How do I connect Kova One to two devices at once?",
    a: "Pair the first device as usual. Then hold the mode button and the power button together for 2 seconds to pair a second one. Kova One stays connected to both and switches to whichever starts playing.",
  },
  {
    q: "Can I use Kova One while it charges?",
    a: "Yes. Over USB-C it keeps playing while it charges, and it works as a wired USB audio device on computers and most phones.",
  },
  {
    q: "Does noise cancelling work with the 3.5 mm cable?",
    a: "Yes, as long as the headphones are switched on. With the battery empty, Kova One still plays passively through the cable, without noise cancelling or EQ.",
  },
  {
    q: "The ear cushions are wearing. Can I replace them?",
    a: "The cushions are held by magnets and come off by hand. Replacement pairs cost $39 in all three colours, and Kova Care+ members get one pair free each year.",
  },
  {
    q: "Why does spatial audio sound different in some apps?",
    a: "Head tracking works with any stereo source, but the full spatial effect needs a multichannel mix. Films and some albums are mixed that way; most podcasts are not.",
  },
  {
    q: "How do I reset Kova One?",
    a: "Hold the power and mode buttons for 12 seconds until the light flashes amber three times. This clears pairings and returns EQ and settings to their defaults.",
  },
];

export const FIRMWARE = {
  version: "2.4.1",
  date: "September 16, 2026",
  notes: [
    "Improves Adaptive mode response when moving between indoor and outdoor spaces.",
    "Reduces wind noise on calls at speeds above 20 km/h.",
    "Adds a fifth sidetone level for calls.",
    "Fixes an issue where the second multipoint device could reconnect with a short delay.",
  ],
  previous: [
    { version: "2.3.0", date: "July 28, 2026", note: "Low-latency mode for video and games." },
    { version: "2.2.4", date: "June 9, 2026", note: "Battery reporting accuracy and charging stability." },
  ],
};

export const SITE_FOOTER = [
  {
    title: "Shop",
    links: ["Kova One", "Kova Air", "Kova Buds", "Cushions and parts", "Gift cards"],
  },
  {
    title: "Support",
    links: ["Setup guides", "Firmware", "Warranty", "Repair", "Contact us"],
  },
  {
    title: "Kova",
    links: ["About us", "Journal", "Careers", "Press", "Environment"],
  },
];

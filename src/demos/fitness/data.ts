import type { MouseEvent } from "react";

export const PAGES = ["home", "classes", "membership", "coaches", "trial"] as const;
export type Page = (typeof PAGES)[number];

export type LinkFn = (target: Page) => {
  href: string;
  "aria-current": "page" | undefined;
  onClick: (event: MouseEvent<HTMLElement>) => void;
};
export type GoFn = (target: Page) => void;
export interface PageProps {
  go: GoFn;
  link: LinkFn;
}

export const BIZ = {
  name: "Forge Strength Club",
  short: "Forge",
  street: "3350 Brighton Blvd",
  city: "Denver, CO 80216",
  hood: "RiNo, Denver",
  phone: "(720) 555-0139",
  phoneHref: "tel:+17205550139",
  email: "team@forgestrength.club",
  rating: "4.9",
  reviews: "486",
  members: "612",
  mapSrc: "https://maps.google.com/maps?q=3350%20Brighton%20Blvd%2C%20Denver%2C%20CO%2080216&z=14&output=embed",
};

export const HOURS = [
  { day: "Monday to Friday", short: "Mon-Fri", time: "5:30am-8pm" },
  { day: "Saturday", short: "Saturday", time: "7am-12pm" },
  { day: "Sunday", short: "Sunday", time: "8am-11am" },
];

export type ClassId = "strength" | "conditioning" | "oly" | "mobility" | "foundations" | "open";

export interface ClassType {
  id: ClassId;
  name: string;
  level: string;
  duration: string;
  img: string;
  alt: string;
  blurb: string;
  details: string;
  goodFor: string;
}

export const CLASSES: ClassType[] = [
  {
    id: "strength",
    name: "Forge Strength",
    level: "All levels",
    duration: "60 min",
    img: "squat-rack",
    alt: "Member pressing a barbell overhead in a squat rack",
    blurb: "Our flagship class. Squat, press, deadlift and pull, coached in small groups with weights scaled to you.",
    details:
      "Every session starts with a guided warm-up, then a main barbell lift and accessory work in 6-week progressive cycles. You log your numbers, your coach adjusts the load, and you watch them climb.",
    goodFor: "Building real strength, muscle and confidence under the bar",
  },
  {
    id: "conditioning",
    name: "Conditioning / HIIT",
    level: "All levels",
    duration: "45 min",
    img: "battle-ropes",
    alt: "Athlete using battle ropes in an open industrial gym",
    blurb: "Intervals on the rower, bike, sled and ropes. Hard, fast, and scalable for every fitness level.",
    details:
      "Work-to-rest intervals built around heart-rate zones, with sled pushes, kettlebells, bikes and rowers. Pair it with Forge Strength two or three times a week for a complete program.",
    goodFor: "Fat loss, heart health and engine for sport",
  },
  {
    id: "oly",
    name: "Olympic Lifting",
    level: "Intermediate",
    duration: "75 min",
    img: "deadlift",
    alt: "Lifter setting up a loaded barbell on a rubber gym floor",
    blurb: "Technique-first snatch and clean & jerk coaching on our six competition platforms.",
    details:
      "Drill-based skill work, positional strength and complexes, led by a USAW-certified coach. Members must complete Foundations or show comfort with a hang clean and overhead squat.",
    goodFor: "Speed, power and lifters chasing a first meet",
  },
  {
    id: "mobility",
    name: "Mobility & Recovery",
    level: "All levels",
    duration: "45 min",
    img: "yoga",
    alt: "Woman stretching in a low lunge at sunrise",
    blurb: "Joint prep, controlled stretching and breath work to keep you moving well and training longer.",
    details:
      "A slower session led by our physical therapist. Expect hip and shoulder mobility flows, soft-tissue work and guided breathing, finishing in the sauna if you like.",
    goodFor: "Stiff hips, desk backs and heavy training weeks",
  },
  {
    id: "foundations",
    name: "Foundations",
    level: "Beginner",
    duration: "60 min",
    img: "pushup",
    alt: "Man doing a push-up on dumbbells on a wooden floor",
    blurb: "A 4-week course for new members. Learn the squat, hinge, press and pull in groups of six or fewer.",
    details:
      "Eight sessions, two per week, covering every movement you'll see in class. No experience needed, no ego allowed. New cohorts start the first Monday of each month.",
    goodFor: "Brand-new lifters or anyone returning after a long break",
  },
  {
    id: "open",
    name: "Open Gym",
    level: "Members",
    duration: "Anytime",
    img: "warehouse-gym",
    alt: "Open warehouse gym floor with benches, racks and skylights",
    blurb: "Train on your own program with 12 racks, platforms, turf and a full dumbbell run to 150 lb.",
    details:
      "Available 24/7 with your key card. During staffed hours a coach is on the floor for form checks and spotting. Classes have priority on the racks marked with orange tape.",
    goodFor: "Experienced lifters following their own plan",
  },
];

export const classById = (id: ClassId) => CLASSES.find((c) => c.id === id) as ClassType;

export const COACH_NAMES: Record<string, string> = {
  marcus: "Marcus H.",
  jess: "Jess R.",
  tyler: "Tyler B.",
  hannah: "Hannah K.",
  luke: "Luke B.",
  sofia: "Sofia M.",
  floor: "Floor coach",
};

export interface Slot {
  time: string;
  cls: ClassId;
  coach: keyof typeof COACH_NAMES;
  cap: number;
  booked: number;
}

const s = (time: string, cls: ClassId, coach: string, cap: number, booked: number): Slot => ({
  time,
  cls,
  coach,
  cap,
  booked,
});

const WEEKDAY_A: Slot[] = [
  s("5:30 AM", "strength", "marcus", 14, 13),
  s("6:30 AM", "conditioning", "tyler", 16, 11),
  s("7:30 AM", "strength", "luke", 14, 8),
  s("9:00 AM", "mobility", "hannah", 12, 5),
  s("12:00 PM", "conditioning", "tyler", 16, 9),
  s("4:30 PM", "foundations", "sofia", 6, 4),
  s("5:30 PM", "strength", "marcus", 14, 14),
  s("6:30 PM", "oly", "jess", 10, 7),
];

const WEEKDAY_B: Slot[] = [
  s("5:30 AM", "conditioning", "tyler", 16, 12),
  s("6:30 AM", "strength", "luke", 14, 12),
  s("7:30 AM", "oly", "jess", 10, 4),
  s("12:00 PM", "strength", "marcus", 14, 10),
  s("4:30 PM", "mobility", "hannah", 12, 6),
  s("5:30 PM", "conditioning", "sofia", 16, 16),
  s("6:30 PM", "strength", "marcus", 14, 11),
  s("7:15 PM", "foundations", "luke", 6, 3),
];

const withOpen = (slots: Slot[], open: string): Slot[] => [
  s(open, "open", "floor", 40, 0),
  ...slots,
];

export const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] as const;
export type Day = (typeof DAYS)[number];

export const SCHEDULE: Record<Day, Slot[]> = {
  Mon: withOpen(WEEKDAY_A, "All day"),
  Tue: withOpen(WEEKDAY_B, "All day"),
  Wed: withOpen(
    WEEKDAY_A.map((x) => ({ ...x, booked: Math.max(2, x.booked - 2) })),
    "All day",
  ),
  Thu: withOpen(
    WEEKDAY_B.map((x) => ({ ...x, booked: Math.max(2, x.booked - 1) })),
    "All day",
  ),
  Fri: withOpen(
    [
      s("5:30 AM", "strength", "marcus", 14, 12),
      s("6:30 AM", "conditioning", "tyler", 16, 10),
      s("7:30 AM", "strength", "luke", 14, 6),
      s("12:00 PM", "conditioning", "sofia", 16, 7),
      s("4:30 PM", "oly", "jess", 10, 5),
      s("5:30 PM", "strength", "marcus", 14, 9),
    ],
    "All day",
  ),
  Sat: withOpen(
    [
      s("7:30 AM", "conditioning", "tyler", 20, 17),
      s("8:30 AM", "strength", "marcus", 16, 16),
      s("9:30 AM", "foundations", "sofia", 6, 5),
      s("10:00 AM", "oly", "jess", 10, 8),
      s("11:00 AM", "mobility", "hannah", 12, 7),
    ],
    "All day",
  ),
  Sun: withOpen(
    [
      s("8:30 AM", "mobility", "hannah", 14, 9),
      s("9:30 AM", "conditioning", "sofia", 16, 10),
    ],
    "All day",
  ),
};

export interface Plan {
  id: string;
  name: string;
  price: number;
  cadence: string;
  tagline: string;
  popular?: boolean;
  features: string[];
}

export const PLANS: Plan[] = [
  {
    id: "open",
    name: "Open Gym",
    price: 89,
    cadence: "/month",
    tagline: "For lifters with their own program.",
    features: [
      "24/7 key-card access",
      "Full use of racks, platforms & turf",
      "Floor coach during staffed hours",
      "Locker room, showers & sauna",
      "Quarterly InBody scan",
    ],
  },
  {
    id: "unlimited",
    name: "Unlimited Classes",
    price: 169,
    cadence: "/month",
    tagline: "Train as often as you like.",
    popular: true,
    features: [
      "Unlimited coached classes, all types",
      "24/7 open gym access included",
      "Free Foundations course for new members",
      "Goal-setting session every 90 days",
      "Monthly InBody scan",
      "10% off personal training & gear",
    ],
  },
  {
    id: "eight",
    name: "8 Classes",
    price: 129,
    cadence: "/month",
    tagline: "Two coached sessions a week.",
    features: [
      "8 coached classes per month",
      "24/7 open gym access included",
      "Unused classes roll over one month",
      "Goal-setting session every 90 days",
      "Quarterly InBody scan",
    ],
  },
];

export const PT_PACKS = [
  { name: "Single session", price: "$95", note: "60 minutes, one-on-one" },
  { name: "5-session pack", price: "$450", note: "$90 a session, use within 3 months" },
  { name: "10-session pack", price: "$850", note: "$85 a session, use within 6 months" },
  { name: "Semi-private (2 people)", price: "$60", note: "Per person, per session" },
];

export const EXTRAS = [
  { name: "Drop-in class or open gym", price: "$25", note: "Visiting Denver? Bring a friend? Book any class." },
  { name: "10-visit punch card", price: "$220", note: "Classes or open gym, valid 6 months" },
  { name: "Student & first responder", price: "15% off", note: "Students, teachers, military, police, fire & EMS" },
];

export type Cell = boolean | string;
export const COMPARE: { label: string; cells: [Cell, Cell, Cell] }[] = [
  { label: "Monthly price", cells: ["$89", "$129", "$169"] },
  { label: "24/7 key-card access", cells: [true, true, true] },
  { label: "Coached classes", cells: [false, "8 / month", "Unlimited"] },
  { label: "Foundations course", cells: ["$149", "$149", "Included"] },
  { label: "Floor coach during staffed hours", cells: [true, true, true] },
  { label: "Goal-setting sessions", cells: [false, "Every 90 days", "Every 90 days"] },
  { label: "InBody body-composition scan", cells: ["Quarterly", "Quarterly", "Monthly"] },
  { label: "Sauna, showers & lockers", cells: [true, true, true] },
  { label: "Personal training discount", cells: [false, false, "10% off"] },
  { label: "Bring a friend free", cells: ["1 / month", "2 / month", "Unlimited"] },
];

export const FAQS = [
  {
    q: "Is there a contract or sign-up fee?",
    a: "No. Every membership is month-to-month with no enrollment fee. Cancel anytime by emailing team@forgestrength.club at least 7 days before your next billing date.",
  },
  {
    q: "I've never lifted a barbell. Is Forge right for me?",
    a: "Yes, and you're in good company. About half of our members started with zero lifting experience. You'll begin with a one-on-one intro session and our Foundations course, and every class is scaled to your level.",
  },
  {
    q: "Can I pause my membership?",
    a: "You can freeze for up to 3 months per year for travel, injury or life stuff. A freeze is $10/month and keeps your rate locked in.",
  },
  {
    q: "How do I book classes?",
    a: "Members book through the Forge app (iOS and Android). Class booking opens 7 days ahead and you can cancel up to 2 hours before without losing the class.",
  },
  {
    q: "What does the student / first responder discount cover?",
    a: "15% off any monthly membership for full-time students, K-12 teachers, active military and veterans, police, fire and EMS. Just bring a valid ID to the front desk.",
  },
  {
    q: "Where do I park?",
    a: "We have a free 30-car lot behind the building off 34th Street, plus bike racks by the front door. The 38th & Blake light-rail station is a 9-minute walk.",
  },
];

export interface Coach {
  id: string;
  name: string;
  role: string;
  img: string;
  certs: string[];
  specialties: string[];
  bio: string;
  since: string;
}

export const COACHES: Coach[] = [
  {
    id: "marcus",
    name: "Marcus Hale",
    role: "Founder & Head Coach",
    img: "man-smile",
    certs: ["NSCA-CSCS", "USAW Level 2", "Precision Nutrition L1"],
    specialties: ["Strength programming", "Powerlifting", "Beginners"],
    bio: "Marcus spent eight years coaching college strength and conditioning at a Front Range university before opening Forge in 2018. He writes every Forge Strength cycle and still coaches the 5:30am class most days.",
    since: "Coaching since 2011",
  },
  {
    id: "jess",
    name: "Jess Ramirez",
    role: "Olympic Lifting Coach",
    img: "woman-2",
    certs: ["USAW Level 2", "NASM-CPT"],
    specialties: ["Snatch & clean and jerk", "Meet prep", "Mobility for lifters"],
    bio: "A former national-level weightlifter, Jess runs our Olympic Lifting program and the Forge Barbell team. She has coached more than 40 members through their first sanctioned meet.",
    since: "At Forge since 2019",
  },
  {
    id: "tyler",
    name: "Tyler Brooks",
    role: "Conditioning Lead",
    img: "man-cap",
    certs: ["NSCA-CPT", "StrongFirst SFG I", "CPR/AED"],
    specialties: ["HIIT & endurance", "Kettlebells", "Hybrid athletes"],
    bio: "Tyler is a trail runner and kettlebell nerd who designs our Conditioning classes. He works with a lot of skiers and runners who want strength that carries over to the mountains.",
    since: "At Forge since 2020",
  },
  {
    id: "hannah",
    name: "Dr. Hannah Kessler, DPT",
    role: "Mobility & Recovery Coach",
    img: "woman-1",
    certs: ["Doctor of Physical Therapy", "FRC Mobility Specialist"],
    specialties: ["Injury return", "Mobility", "Low back & shoulders"],
    bio: "Hannah is a licensed physical therapist who leads Mobility & Recovery and offers 30-minute movement screens for members coming back from injury.",
    since: "At Forge since 2021",
  },
  {
    id: "luke",
    name: "Luke Brennan",
    role: "Coach & Personal Trainer",
    img: "man-1",
    certs: ["NSCA-CPT", "Precision Nutrition L1"],
    specialties: ["Personal training", "Fat loss", "Nutrition habits"],
    bio: "Luke handles most of our one-on-one clients and runs the evening Foundations cohorts. His specialty is helping busy parents and desk workers build habits that stick.",
    since: "At Forge since 2022",
  },
  {
    id: "sofia",
    name: "Sofia Marino",
    role: "Coach, Foundations & Women's Strength",
    img: "woman-red",
    certs: ["ACE-CPT", "Pre/Postnatal Coaching Cert.", "USAW Level 1"],
    specialties: ["Women's strength", "Pre & postnatal", "First-timers"],
    bio: "Sofia came to Forge as a nervous new member in 2019 and never left. She coaches Foundations, Saturday classes and our pre- and postnatal members.",
    since: "At Forge since 2021",
  },
];

export const STORIES = [
  {
    name: "Rob Whitaker",
    detail: "58, member since 2021",
    img: "man-glasses",
    stat: "32 lb down",
    statLabel: "and a 275 lb deadlift",
    quote: "I hadn't lifted since high school. Marcus started me on a 20 lb kettlebell. My back hasn't hurt in two years.",
  },
  {
    name: "Denise Alvarez",
    detail: "46, member since 2022",
    img: "woman-smile-1",
    stat: "First pull-up",
    statLabel: "at 45 years old",
    quote: "I nearly turned around in the parking lot on day one. By week two everyone knew my name.",
  },
  {
    name: "Jordan Pike",
    detail: "29, member since 2020",
    img: "man-restaurant",
    stat: "185 to 315",
    statLabel: "lb back squat",
    quote: "Years of big-box gyms and no plan. Here the program actually progresses, so I stopped guessing.",
  },
];

export const REVIEWS = [
  {
    name: "Kelsey M.",
    date: "2 weeks ago",
    text: "Coaches actually watch your form and nobody makes you feel dumb for asking. The sauna after 6am class is the best part of my day.",
  },
  {
    name: "Andre W.",
    date: "a month ago",
    text: "Came in for the free week, signed up on day four. Clean, well equipped, and Foundations was exactly what I needed.",
  },
  {
    name: "Priya S.",
    date: "3 months ago",
    text: "Three years in. Hannah and Marcus got me through knee surgery and back to squatting more than before.",
  },
  {
    name: "Chris D.",
    date: "5 months ago",
    text: "Best gym in Denver, not close.",
  },
];

export const AMENITIES = [
  { icon: "key", title: "24/7 key-card access", text: "Members train any hour, any day." },
  { icon: "shower", title: "Showers & towels", text: "Four private showers, fresh towels, Dyson dryers." },
  { icon: "lock", title: "Day lockers", text: "Keypad lockers, no padlock needed." },
  { icon: "car", title: "Free parking", text: "30-car lot behind the building off 34th St." },
  { icon: "turf", title: "40-yard turf", text: "Sled pushes, carries and sprints indoors." },
  { icon: "sauna", title: "Infrared sauna", text: "Six-person sauna in the recovery room." },
  { icon: "dumbbell", title: "12 racks & 6 platforms", text: "Competition racks, bumper plates, 5 to 150 lb dumbbells." },
  { icon: "coffee", title: "Lounge & Wi-Fi", text: "Cold brew on tap and a place to work before class." },
] as const;

export const FIRST_WEEK = [
  {
    when: "Day 1",
    title: "Intro session with a coach",
    text: "30 minutes, one-on-one. We talk goals, injuries and schedule, run a simple movement screen and give you a tour.",
  },
  {
    when: "Days 2 and 3",
    title: "Your first classes",
    text: "Jump into Foundations or any All-levels class. Your coach will know you're new and scale everything for you.",
  },
  {
    when: "Days 4 to 6",
    title: "Try it all",
    text: "Take Conditioning, Mobility & Recovery, use the open gym and the sauna. Come as often as you like.",
  },
  {
    when: "Day 7",
    title: "Check-in, no pressure",
    text: "We'll recommend a plan that fits your goals and budget. If Forge isn't for you, no hard feelings and no sales calls.",
  },
];

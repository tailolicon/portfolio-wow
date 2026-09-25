export const PAGES = ["home", "services", "stylists", "gallery", "book"] as const;
export type Page = (typeof PAGES)[number];

export const BIZ = {
  name: "Ivy & Oak",
  full: "Ivy & Oak Hair Studio",
  street: "4250 N Marshall Way, Suite 110",
  city: "Scottsdale, AZ 85251",
  phone: "(480) 555-0193",
  tel: "+14805550193",
  email: "hello@ivyandoakstudio.com",
  instagram: "@ivyandoakstudio",
  mapQuery: "4250 N Marshall Way, Scottsdale, AZ 85251",
};

export const HOURS: { day: string; time: string }[] = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "9am to 7pm" },
  { day: "Wednesday", time: "9am to 7pm" },
  { day: "Thursday", time: "9am to 7pm" },
  { day: "Friday", time: "9am to 6pm" },
  { day: "Saturday", time: "8am to 4pm" },
  { day: "Sunday", time: "Closed" },
];

export const SIGNATURE = [
  {
    title: "Lived-in color",
    text: "Soft, dimensional color placed so it grows out well. Most guests go 12 to 16 weeks between visits.",
    price: "from $165",
    img: "waves-back",
    alt: "Long brunette hair with soft caramel lived-in color",
  },
  {
    title: "Balayage and blonding",
    text: "Hand-painted brightness, foilayage and bright blondes, finished with a custom gloss and a bond treatment.",
    price: "from $225",
    img: "color-lavender",
    alt: "Long wavy hair with silver lavender toned blonde",
  },
  {
    title: "Precision cuts",
    text: "Shape-driven cuts designed around your texture, cowlicks and routine, finished with a styling lesson.",
    price: "from $65",
    img: "blowdry-stylist",
    alt: "Stylist smiling while blow-drying a client's fresh cut",
  },
  {
    title: "Bridal and events",
    text: "Soft updos and polished waves, in the studio or on location for wedding parties across the Valley.",
    price: "from $150",
    img: "updo",
    alt: "Stylist pinning an elegant bridal updo",
  },
];

export type Level = "New Talent" | "Senior" | "Master";
export type MenuItem = {
  name: string;
  desc?: string;
  time: string;
  prices: [string, string, string];
};
export type MenuGroup = { id: string; title: string; intro: string; items: MenuItem[] };

export const LEVELS: { name: Level; note: string }[] = [
  { name: "New Talent", note: "Graduated from our 18-month in-house training program" },
  { name: "Senior", note: "5+ years behind the chair, advanced color certified" },
  { name: "Master", note: "10+ years, educators and specialists in their craft" },
];

export const MENU: MenuGroup[] = [
  {
    id: "cuts",
    title: "Cuts and styling",
    intro: "Every cut includes a consultation, relaxing wash with scalp massage and a finished style.",
    items: [
      { name: "Women's Haircut", desc: "Shoulder length and longer", time: "60 min", prices: ["$65", "$85", "$110"] },
      { name: "Short Cut & Style", desc: "Pixies, bobs and anything above the shoulder", time: "45 min", prices: ["$55", "$75", "$95"] },
      { name: "Men's Cut", desc: "Includes wash and neck clean-up", time: "30 min", prices: ["$40", "$50", "$65"] },
      { name: "Kids' Cut", desc: "Ages 12 and under", time: "30 min", prices: ["$30", "$40", "$50"] },
      { name: "Bang Trim", desc: "Complimentary for current guests between cuts", time: "15 min", prices: ["$15", "$15", "$15"] },
      { name: "Signature Blowout", desc: "Smooth, full or bouncy, your choice", time: "45 min", prices: ["$50", "$60", "$75"] },
      { name: "Curly Cut", desc: "Cut dry, curl by curl, with a diffused finish", time: "90 min", prices: ["$85", "$110", "$140"] },
    ],
  },
  {
    id: "color",
    title: "Color",
    intro: "All color services include a finished blowout. Toner and gloss are priced separately unless noted.",
    items: [
      { name: "Root Touch-Up", desc: "Up to 1 inch of regrowth", time: "90 min", prices: ["$85", "$100", "$120"] },
      { name: "All-Over Color", desc: "Single process, roots to ends", time: "2 hr", prices: ["$110", "$135", "$160"] },
      { name: "Lived-In Color", desc: "Soft root shadow with dimensional pieces", time: "2.5 hr", prices: ["$165", "$195", "$235"] },
      { name: "Gloss / Toner", desc: "Add shine and refresh tone", time: "30 min", prices: ["$45", "$55", "$65"] },
      { name: "Gray Blending", desc: "Soft transition for natural silver", time: "2 hr", prices: ["$130", "$160", "$190"] },
      { name: "Color Correction", desc: "By consultation only, priced hourly", time: "3+ hr", prices: ["$95/hr", "$115/hr", "$140/hr"] },
    ],
  },
  {
    id: "blonde",
    title: "Blonding and balayage",
    intro: "Includes bond-building treatment, custom toner and finished style. Lightening sessions over 4 hours may be split into two visits.",
    items: [
      { name: "Partial Balayage", desc: "Face-framing and top section", time: "2.5 hr", prices: ["$185", "$215", "$260"] },
      { name: "Full Balayage", desc: "Hand-painted throughout", time: "3.5 hr", prices: ["$225", "$265", "$320"] },
      { name: "Partial Foil Highlights", time: "2 hr", prices: ["$150", "$180", "$215"] },
      { name: "Full Foil Highlights", time: "3 hr", prices: ["$195", "$235", "$285"] },
      { name: "Blonde Transformation", desc: "Dark to bright; consultation required", time: "5+ hr", prices: ["$350", "$425", "$525"] },
      { name: "Money Piece", desc: "Bright face-framing pieces only", time: "75 min", prices: ["$75", "$90", "$110"] },
    ],
  },
  {
    id: "extensions",
    title: "Extensions",
    intro: "Hand-tied and tape-in methods with 100% Remy human hair. Hair is ordered after your consultation; a deposit is required.",
    items: [
      { name: "Extension Consultation", desc: "Color match, method and pricing plan", time: "30 min", prices: ["Free", "Free", "Free"] },
      { name: "Hand-Tied Install (per row)", desc: "Hair priced separately", time: "2 hr", prices: ["", "$250", "$325"] },
      { name: "Tape-In Install", desc: "Hair priced separately", time: "90 min", prices: ["$175", "$225", "$275"] },
      { name: "Move-Up / Maintenance", desc: "Every 6 to 8 weeks", time: "2 hr", prices: ["", "$175", "$225"] },
      { name: "Extension Removal", time: "60 min", prices: ["$75", "$90", "$110"] },
    ],
  },
  {
    id: "treatments",
    title: "Treatments",
    intro: "Add any treatment to a cut or color service, or book on its own with a blowout.",
    items: [
      { name: "Bond Repair Treatment", desc: "Rebuilds strength after lightening", time: "20 min", prices: ["$35", "$35", "$35"] },
      { name: "Deep Conditioning Ritual", desc: "With hot towel and scalp massage", time: "20 min", prices: ["$30", "$30", "$30"] },
      { name: "Keratin Smoothing", desc: "Reduces frizz for up to 4 months", time: "3 hr", prices: ["$250", "$300", "$350"] },
      { name: "Scalp Detox", desc: "Exfoliating scrub and steam", time: "30 min", prices: ["$45", "$45", "$45"] },
    ],
  },
  {
    id: "bridal",
    title: "Bridal and events",
    intro: "Bridal services are booked through our events coordinator. On-location travel fee starts at $75 within Scottsdale.",
    items: [
      { name: "Bridal Trial", desc: "Best booked 6 to 8 weeks before the date", time: "90 min", prices: ["", "$150", "$185"] },
      { name: "Bridal Hair, Day Of", desc: "Includes veil or accessory placement", time: "90 min", prices: ["", "$195", "$250"] },
      { name: "Bridesmaid / Guest Style", time: "60 min", prices: ["$95", "$110", "$130"] },
      { name: "Special Occasion Updo", desc: "Proms, galas, photo shoots", time: "60 min", prices: ["$85", "$100", "$125"] },
      { name: "Flower Girl Style", desc: "Ages 12 and under", time: "30 min", prices: ["$45", "$50", "$55"] },
    ],
  },
];

export type Stylist = {
  id: string;
  name: string;
  first: string;
  level: Level;
  title: string;
  img: { folder: "people" | "salon"; name: string; pos?: string };
  specialties: string[];
  bio: string;
  ig: string;
  days: string;
};

export const STYLISTS: Stylist[] = [
  {
    id: "jenna",
    name: "Jenna Morales",
    first: "Jenna",
    level: "Master",
    title: "Owner and master stylist",
    img: { folder: "people", name: "woman-red" },
    specialties: ["Lived-in color", "Blonding", "Bridal"],
    bio: "Jenna opened Ivy & Oak in 2016 after twelve years in salons in Chicago and Scottsdale. She still takes guests four days a week and runs our color education.",
    ig: "@jennamorales.hair",
    days: "Tue to Fri",
  },
  {
    id: "sofia",
    name: "Sofia Reyes",
    first: "Sofia",
    level: "Master",
    title: "Master colorist",
    img: { folder: "people", name: "woman-1" },
    specialties: ["Balayage", "Color correction", "Gray blending"],
    bio: "Sofia is who we send the tricky ones to: color corrections, box-dye removal and soft gray blending. Fourteen years in and still very patient.",
    ig: "@sofiapaintshair",
    days: "Wed to Sat",
  },
  {
    id: "brooke",
    name: "Brooke Lindqvist",
    first: "Brooke",
    level: "Senior",
    title: "Senior stylist, extension specialist",
    img: { folder: "people", name: "woman-smile-1" },
    specialties: ["Hand-tied extensions", "Tape-ins", "Blowouts"],
    bio: "Certified in hand-tied and tape-in methods. Brooke matches extensions to your own color and cut so the length looks like it grew there.",
    ig: "@brooke.extensions",
    days: "Tue, Thu, Fri, Sat",
  },
  {
    id: "marco",
    name: "Marco Delgado",
    first: "Marco",
    level: "Senior",
    title: "Senior stylist",
    img: { folder: "people", name: "man-smile" },
    specialties: ["Precision cuts", "Men's grooming", "Short shapes"],
    bio: "Marco trained in London and cuts with a lot of structure, whether it's a clean taper or a soft, grown-out bob.",
    ig: "@marcocutsaz",
    days: "Tue to Sat",
  },
  {
    id: "kayla",
    name: "Kayla Brooks",
    first: "Kayla",
    level: "Senior",
    title: "Senior stylist, curl specialist",
    img: { folder: "people", name: "woman-2" },
    specialties: ["Curly cuts", "Keratin smoothing", "Updos"],
    bio: "Kayla cuts curls dry, one at a time, and will show you how to style your texture at home. She also leads most of our wedding teams.",
    ig: "@kaylacurlsaz",
    days: "Tue, Wed, Thu, Sat",
  },
  {
    id: "maddie",
    name: "Maddie Carter",
    first: "Maddie",
    level: "New Talent",
    title: "New Talent stylist",
    img: { folder: "people", name: "woman-redhead" },
    specialties: ["Cuts & blowouts", "Glosses", "Root touch-ups"],
    bio: "Maddie finished our apprenticeship program in 2025. Great for cuts, blowouts and glosses, with our lowest prices and openings most weeks.",
    ig: "@maddie.ativyandoak",
    days: "Tue to Sat",
  },
];

export const RATING = { score: "4.9", count: "643" };

export const REVIEWS = [
  {
    name: "Alyssa M.",
    place: "Tempe, AZ",
    date: "Aug 2026",
    text: "Sofia fixed a box-dye mess I'd been hiding for a year. She was upfront that it would take two sessions, and it's exactly the soft brunette I wanted.",
  },
  {
    name: "Rachel T.",
    place: "Scottsdale, AZ",
    date: "Jul 2026",
    text: "Best balayage I've had, and it's grown out so well. Calm studio and they actually run on time.",
  },
  {
    name: "Danielle K.",
    place: "Phoenix, AZ",
    date: "May 2026",
    text: "Kayla did hair for me and six bridesmaids at our venue in Paradise Valley. It held all night in 104 degree heat.",
  },
  {
    name: "Chris P.",
    place: "Scottsdale, AZ",
    date: "Sep 2026",
    text: "Three years with Marco. Consistent cuts, easy online booking, and he remembers how I like it.",
  },
  {
    name: "Megan L.",
    place: "Mesa, AZ",
    date: "Jun 2026",
    text: "Came in for extensions with Brooke. Nobody at work could tell, which was the whole point.",
  },
  {
    name: "Priya S.",
    place: "Chandler, AZ",
    date: "Apr 2026",
    text: "Maddie gave me a great cut for a very fair price. Booked my next one before I left.",
  },
];

export type GalleryTag = "Color" | "Blonde" | "Cuts" | "Bridal";
export const GALLERY: { img: string; alt: string; tag: GalleryTag; look: string; by: string; tall?: boolean }[] = [
  { img: "waves-back", alt: "Long caramel balayage waves from behind", tag: "Blonde", look: "Caramel balayage", by: "Jenna" },
  { img: "color-lavender", alt: "Silver lavender blonde with loose curls", tag: "Blonde", look: "Silver lilac blonde", by: "Sofia", tall: true },
  { img: "color-pink", alt: "Vivid rose pink color in motion", tag: "Color", look: "Rose vivid", by: "Sofia" },
  { img: "updo", alt: "Stylist pinning a textured bridal updo", tag: "Bridal", look: "Textured bridal updo", by: "Kayla" },
  { img: "curls-portrait", alt: "Natural curls shaped with a curly cut", tag: "Cuts", look: "Curly cut, diffused", by: "Kayla", tall: true },
  { img: "mens-cut", alt: "Men's taper cut being blow-dried", tag: "Cuts", look: "Classic taper", by: "Marco", tall: true },
  { img: "blowdry", alt: "Round-brush blowout on a medium length cut", tag: "Cuts", look: "Long layers and blowout", by: "Maddie" },
  { img: "stylist-smile", alt: "Stylist rinsing color at the backbar", tag: "Color", look: "Root shadow", by: "Jenna", tall: true },
  { img: "makeup", alt: "Bride getting final touches before the ceremony", tag: "Bridal", look: "Bridal trial", by: "Jenna" },
  { img: "hair-wash", alt: "Gloss rinse at the shampoo bowl", tag: "Color", look: "Gloss refresh", by: "Brooke" },
  { img: "blowdry-stylist", alt: "Soft layered bob finished with a blowout", tag: "Cuts", look: "Soft layered bob", by: "Jenna" },
];

export const POLICIES = [
  {
    title: "24-hour cancellation",
    text: "Please give us at least 24 hours' notice to cancel or reschedule. Late cancellations are charged 50% of the booked service, and no-shows are charged in full.",
  },
  {
    title: "Deposits",
    text: "Extensions and bridal services need a non-refundable deposit when you book: 50% of the hair cost for extensions, $100 for bridal. It comes off your final total.",
  },
  {
    title: "Late arrivals",
    text: "If you're more than 15 minutes late we may need to shorten your service or move you to another day, so the next guest isn't kept waiting.",
  },
  {
    title: "Children",
    text: "Kids are welcome for their own appointments. Please arrange care for children who aren't getting a service, since color and hot tools are in use all day.",
  },
];

export const FAQS = [
  {
    q: "Do I need a consultation before color?",
    a: "For big changes, yes: going more than three shades lighter, color corrections and extensions. Consultations are free, take 15 to 30 minutes and can be done in person or by video.",
  },
  {
    q: "Why are prices listed as \u201cstarting at\u201d?",
    a: "Final pricing depends on hair length, density and the amount of product needed. Your stylist will always confirm the price before we begin.",
  },
  {
    q: "Is there parking?",
    a: "Yes. Free covered parking is available in the Marshall Way garage directly behind the studio, plus two-hour street parking on Marshall Way.",
  },
];

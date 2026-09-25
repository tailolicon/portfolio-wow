export const PAGES = ["home", "services", "areas", "reviews", "quote"] as const;
export type Page = (typeof PAGES)[number];

export const BIZ = {
  name: "Summit Plumbing & Air",
  phone: "(480) 555-0126",
  tel: "tel:+14805550126",
  email: "service@summitplumbingair.com",
  street: "1450 W Southern Ave",
  city: "Mesa, AZ 85202",
  roc: "ROC #318422",
  rating: "4.9",
  reviewCount: "2,312",
};

export const HOURS = [
  { d: "Monday to Friday", h: "7am to 6pm" },
  { d: "Saturday", h: "8am to 2pm" },
  { d: "Sunday", h: "Emergency calls only" },
];

export type ServiceGroup = "plumbing" | "hvac";

export interface Service {
  name: string;
  group: ServiceGroup;
  blurb: string;
  points: string[];
  price: string;
  priceLabel: string;
}

export const SERVICES: Service[] = [
  {
    name: "Leak detection & repair",
    group: "plumbing",
    blurb: "Slab leaks, burst pipes and hidden leaks behind drywall, found with acoustic and thermal equipment instead of guesswork.",
    points: ["Electronic slab leak detection", "Pinhole and burst pipe repair", "Faucet, toilet and valve repair"],
    priceLabel: "Leak locate from",
    price: "$149",
  },
  {
    name: "Drain cleaning",
    group: "plumbing",
    blurb: "Kitchen sinks, showers, tubs and main lines cleared the same day. A camera inspection shows you what caused the backup.",
    points: ["Snaking and hydro-jetting", "Sewer camera inspection", "Main line stoppages"],
    priceLabel: "Starting at",
    price: "$129",
  },
  {
    name: "Water heaters & tankless",
    group: "plumbing",
    blurb: "Repairs, flushes and replacement of gas and electric tanks, plus Rinnai and Navien tankless installs. Most tank swaps are done same day.",
    points: ["Same-day tank replacement", "Tankless install and descaling", "Expansion tank and pan brought to code"],
    priceLabel: "Flush from",
    price: "$89",
  },
  {
    name: "Whole-home repiping",
    group: "plumbing",
    blurb: "We replace failing polybutylene or pinholed copper with PEX or copper. Most homes take one or two days, drywall patching included.",
    points: ["PEX-A and Type L copper", "Drywall patch and texture included", "City permit and inspection handled"],
    priceLabel: "Pricing",
    price: "Free estimate",
  },
  {
    name: "Sewer line repair",
    group: "plumbing",
    blurb: "Root intrusion, bellied or collapsed lines are located on camera, then fixed with a spot repair or full replacement.",
    points: ["Video line locating", "Spot repair or full replacement", "Cleanout installation"],
    priceLabel: "Camera inspection",
    price: "$195",
  },
  {
    name: "Water softeners & filtration",
    group: "plumbing",
    blurb: "East Valley water runs 15 to 20 grains hard. A softener or RO system protects your fixtures, water heater and appliances.",
    points: ["Softener install and repair", "Reverse osmosis drinking water", "Whole-home carbon filtration"],
    priceLabel: "Pricing",
    price: "Free water test",
  },
  {
    name: "AC repair",
    group: "hvac",
    blurb: "Our trucks carry capacitors, contactors, fan motors and refrigerant, so most repairs are finished on the first visit.",
    points: ["All makes and models", "Refrigerant leak search and recharge", "Same-day and after-hours service"],
    priceLabel: "Diagnostic",
    price: "$89",
  },
  {
    name: "AC replacement",
    group: "hvac",
    blurb: "Split systems and package units sized with a real load calculation, with written line-item pricing at your kitchen table.",
    points: ["Trane, Carrier and Goodman systems", "Up to 10-year parts and labor", "SRP and APS rebates filed for you"],
    priceLabel: "Pricing",
    price: "Free estimate",
  },
  {
    name: "Maintenance & tune-ups",
    group: "hvac",
    blurb: "A 21-point spring AC tune-up and a fall heating check keep bills down and catch small problems early.",
    points: ["Coil rinse and drain line flush", "Electrical and refrigerant checks", "Written system report"],
    priceLabel: "Special",
    price: "$79",
  },
  {
    name: "Heating repair",
    group: "hvac",
    blurb: "Heat pumps, gas furnaces and dual-fuel systems, with a carbon monoxide check on every gas appliance we touch.",
    points: ["Heat pump defrost and reversing valves", "Furnace ignitors and flame sensors", "CO safety testing"],
    priceLabel: "Diagnostic",
    price: "$89",
  },
  {
    name: "Ductwork",
    group: "hvac",
    blurb: "Leaky or crushed attic ducts can waste close to a third of your cooling. We test, seal, repair and replace them.",
    points: ["Duct leakage testing", "Sealing and R-8 insulation", "Full duct replacement"],
    priceLabel: "Pricing",
    price: "Free estimate",
  },
  {
    name: "Indoor air quality",
    group: "hvac",
    blurb: "Haboob season and spring pollen are hard on Arizona homes. Better filtration and UV lights help everyone breathe easier.",
    points: ["Media and electronic air cleaners", "UV germicidal lights", "Smart thermostat installs"],
    priceLabel: "Pricing",
    price: "Free estimate",
  },
];

export const COUPONS = [
  {
    amount: "$79",
    title: "AC tune-up",
    text: "Our 21-point precision tune-up with coil rinse and drain line flush. Regularly $139.",
    fine: "Per system. Not valid with other offers. Expires 10/31/2026.",
  },
  {
    amount: "$50 off",
    title: "Any repair over $300",
    text: "Plumbing or HVAC. Mention this coupon when you book.",
    fine: "One per household. Excludes replacements. Expires 10/31/2026.",
  },
  {
    amount: "Free",
    title: "Replacement estimate",
    text: "New AC system, water heater or repipe, quoted in writing.",
    fine: "Quote valid 30 days. Financing available OAC.",
  },
];

export const CLUB_PERKS = [
  "Spring AC tune-up and fall heating check",
  "Yearly water heater flush and plumbing inspection",
  "15% off every repair",
  "Priority scheduling when it's 115° out",
  "No overtime or weekend charges",
  "Diagnostic fee waived on repair visits",
];

export const WHY = [
  { title: "Background-checked techs", text: "Every technician is drug-tested, background-checked and a full-time Summit employee. We don't subcontract." },
  { title: "On-time guarantee", text: "You get a 2-hour arrival window and a text when we're on the way. If we're late, the diagnostic fee is on us." },
  { title: "Upfront, flat-rate pricing", text: "You approve the price before we start, and it doesn't change if the job runs long." },
  { title: "1-year labor warranty", text: "Repairs carry a full year of labor coverage on top of the manufacturer's parts warranty." },
];

export const STEPS = [
  { title: "Call or book online", text: "Someone in our Mesa office answers around the clock and gets you on today's schedule when we can." },
  { title: "Your tech shows up on time", text: "You'll get a text with your technician's photo and ETA. Boot covers go on at the door." },
  { title: "You pick the option", text: "We find the problem and give you a flat price for each way to fix it. No pressure." },
  { title: "Fixed and guaranteed", text: "We clean up, walk you through the work and back it with our 1-year labor warranty." },
];

export const TEAM = [
  { name: "Dave Kowalski", role: "Co-owner, master plumber", img: "man-glasses" },
  { name: "Maria Kowalski", role: "Co-owner, operations", img: "woman-smile-1" },
  { name: "Luis Romero", role: "Lead service plumber", img: "man-smile" },
  { name: "Jake Morrison", role: "HVAC service manager", img: "man-cap" },
];

export const FAQS = [
  {
    q: "Do you charge extra for nights, weekends or holidays?",
    a: "Our emergency line is answered 24/7/365. After-hours visits have a flat $99 after-hours fee, and we tell you about it before we dispatch. Comfort Club members never pay it.",
  },
  {
    q: "How much does a service call cost?",
    a: "Our diagnostic visit is $89 for plumbing or HVAC. If you go ahead with the repair, that $89 is credited toward the job. You always get a flat price before any work starts.",
  },
  {
    q: "How quickly can you get here?",
    a: "Most calls that come in before 2pm are handled the same day. When it's over 100° and the AC is out, we move homes with seniors, babies or medical needs to the front of the line.",
  },
  {
    q: "Do you offer financing on new systems?",
    a: "Yes. Approved buyers can get 0% APR for 18 months, or low monthly payments for up to 10 years. Pre-qualifying takes about 5 minutes and doesn't affect your credit score.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Yes. We're licensed with the Arizona Registrar of Contractors (ROC #318422), bonded, and carry general liability and workers' comp insurance.",
  },
  {
    q: "What brands do you work on?",
    a: "All the major ones, including Trane, Carrier, Lennox, Goodman, Rheem, AO Smith, Bradford White, Rinnai and Navien.",
  },
];

export const CITIES = [
  { name: "Mesa", note: "Our home base, fastest response times", zips: ["85201", "85202", "85203", "85204", "85205", "85206", "85207", "85208", "85209", "85210", "85212", "85213", "85215"] },
  { name: "Gilbert", note: "Val Vista Lakes, Power Ranch, Agritopia", zips: ["85233", "85234", "85295", "85296", "85297", "85298"] },
  { name: "Chandler", note: "Ocotillo, Fulton Ranch, Sun Lakes", zips: ["85224", "85225", "85226", "85248", "85249", "85286"] },
  { name: "Tempe", note: "Kyrene corridor and South Tempe", zips: ["85281", "85282", "85283", "85284"] },
  { name: "Scottsdale", note: "South and Central Scottsdale", zips: ["85250", "85251", "85254", "85257", "85258", "85260"] },
  { name: "Phoenix", note: "Ahwatukee, Arcadia, Central Phoenix", zips: ["85044", "85045", "85048", "85018", "85016", "85014"] },
  { name: "Queen Creek", note: "Encanterra and Hastings Farms", zips: ["85140", "85142"] },
  { name: "Apache Junction", note: "Including Gold Canyon", zips: ["85118", "85119", "85120"] },
  { name: "San Tan Valley", note: "Johnson Ranch and surrounding areas", zips: ["85143", "85144"] },
];

export interface Review {
  name: string;
  city: string;
  date: string;
  stars: number;
  group: ServiceGroup;
  job: string;
  tech: string;
  text: string;
}

export const REVIEWS: Review[] = [
  { name: "Jennifer M.", city: "Gilbert", date: "Sep 19, 2026", stars: 5, group: "hvac", job: "AC repair", tech: "Jake", text: "AC quit at 9pm on a 111° day. A real person answered and Jake was here by 10:30. Bad capacitor, fixed in 20 minutes, and the price matched the quote." },
  { name: "Robert T.", city: "Mesa", date: "Sep 16, 2026", stars: 5, group: "plumbing", job: "Water heater", tech: "Luis", text: "Luis swapped our 14-year-old water heater the same afternoon and hauled the old one away. Garage was cleaner than he found it." },
  { name: "Priya S.", city: "Chandler", date: "Sep 3, 2026", stars: 5, group: "hvac", job: "AC replacement", tech: "Jake", text: "Only company out of three that did a real load calculation. Not the cheapest bid, but the install was spotless and our August bill dropped about $90." },
  { name: "Mark and Debbie L.", city: "Queen Creek", date: "Aug 29, 2026", stars: 5, group: "plumbing", job: "Slab leak", tech: "Andre", text: "Andre found the slab leak in under an hour and rerouted the line through the attic so nobody had to jackhammer our floors." },
  { name: "Carlos V.", city: "Tempe", date: "Aug 22, 2026", stars: 5, group: "plumbing", job: "Drain cleaning", tech: "Luis", text: "Kitchen sink backed up at my mom's house. Luis cleared it and showed us the grease buildup on camera. Fair price." },
  { name: "Heather K.", city: "Mesa", date: "Aug 12, 2026", stars: 4, group: "hvac", job: "Tune-up", tech: "Tony", text: "Tony caught a clogged condensate line before it overflowed into the hallway. He came near the end of the window but they texted ahead." },
  { name: "Greg W.", city: "Scottsdale", date: "Aug 5, 2026", stars: 5, group: "plumbing", job: "Repiping", tech: "Luis", text: "Three pinhole leaks in two years, so we repiped with PEX. Two days, drywall patched and textured, passed city inspection the first time." },
  { name: "Amanda R.", city: "San Tan Valley", date: "Jul 30, 2026", stars: 5, group: "hvac", job: "AC repair", tech: "Tony", text: "Upstairs unit blowing warm. Tony showed me the leak at the coil and gave me a repair price and a replace price side by side. Zero upselling." },
  { name: "Steve N.", city: "Apache Junction", date: "Jul 24, 2026", stars: 5, group: "plumbing", job: "Water softener", tech: "Andre", text: "Softener plus RO under the sink. No more white spots on everything." },
  { name: "Lisa H.", city: "Gilbert", date: "Jul 13, 2026", stars: 5, group: "hvac", job: "Comfort Club", tech: "Jake", text: "AC went out on a Sunday in July. Being Comfort Club members we were first on the list, and there was no weekend charge." },
  { name: "Daniel P.", city: "Phoenix", date: "Jul 8, 2026", stars: 5, group: "plumbing", job: "Sewer line", tech: "Andre", text: "Roots kept coming back in the main line. They located the break on camera and did a spot repair instead of replacing the whole line." },
  { name: "Tanya B.", city: "Chandler", date: "Jun 30, 2026", stars: 5, group: "hvac", job: "Ductwork", tech: "Tony", text: "Back bedroom ran 8 degrees hotter than the rest of the house. Tony found a crushed duct in the attic. Room is finally comfortable." },
  { name: "Kevin D.", city: "Mesa", date: "Jun 21, 2026", stars: 3, group: "hvac", job: "AC repair", tech: "Tony", text: "Good repair, friendly tech, but the motor had to be ordered so it took two visits. Maria from the office followed up and credited the second trip." },
  { name: "Olivia G.", city: "Tempe", date: "Jun 11, 2026", stars: 5, group: "plumbing", job: "Tankless install", tech: "Luis", text: "Luis walked us through sizing and recirculation for our new Navien. Endless hot water and we got a corner of the garage back." },
  { name: "Frank A.", city: "Scottsdale", date: "May 27, 2026", stars: 5, group: "hvac", job: "Heat pump", tech: "Jake", text: "Only company that picked up on a Saturday. Heat pump running again in an hour." },
  { name: "Rachel C.", city: "Gilbert", date: "May 14, 2026", stars: 5, group: "plumbing", job: "Toilet and faucet", tech: "Andre", text: "Small job, a running toilet and a drippy faucet, but they treated it like it mattered. On time and reasonably priced." },
];

export const RATING_BARS = [
  { stars: 5, count: 2164 },
  { stars: 4, count: 102 },
  { stars: 3, count: 23 },
  { stars: 2, count: 9 },
  { stars: 1, count: 14 },
];

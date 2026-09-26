import { demoImg } from "../../demos/shared";
import type { Mark } from "./projects";

export const STUDIO = {
  name: "Wren & Volt",
  street: "181 Water Street, 4th floor",
  city: "Brooklyn, NY 11201",
  phone: "(718) 555-0142",
  newBusiness: "newbusiness@wrenandvolt.studio",
  careers: "careers@wrenandvolt.studio",
  press: "press@wrenandvolt.studio",
  hours: "Monday to Thursday, 9:30 to 6. Fridays until 4.",
};

/** Extra client marks for the home page wall (the ten case study clients are added from PROJECTS). */
export const OTHER_CLIENTS: { name: string; mark: Mark }[] = [
  { name: "Harbor & Pine", mark: { text: "Harbor&Pine", font: "'Cormorant Garamond', serif", weight: 600, tracking: "0em" } },
  { name: "Quill", mark: { text: "QUILL", font: "'Archivo', sans-serif", weight: 600, tracking: "0.3em", transform: "uppercase" } },
];

export const CULTURE = [
  { title: "Friday crit", text: "Every Friday at 2, the whole studio pins up work in progress. Anyone can ask anything." },
  { title: "Four-day weeks in August", text: "The studio closes on Fridays all August. Clients get a heads-up in March." },
  { title: "Paid side projects", text: "Everyone gets 24 paid days a year for their own work. Two type families started here." },
];

export const TEAM = [
  { name: "Ada Wren", role: "Co-founder, creative director", img: demoImg("people", "woman-blazer") },
  { name: "Marcus Volt", role: "Co-founder, motion director", img: demoImg("people", "man-suit") },
  { name: "Hana Kobayashi", role: "Head of production", img: demoImg("people", "woman-smile-1") },
  { name: "Sam Whitlock", role: "Strategy lead", img: demoImg("people", "man-1") },
];

export type Capability = {
  name: "Identity" | "Motion" | "Digital" | "Campaign";
  line: string;
  text: string;
  includes: string[];
  timing: string;
  example: string;
};

export const CAPABILITIES: Capability[] = [
  {
    name: "Identity",
    line: "Brand strategy, naming support, logo, type and color.",
    text: "We start with what the company actually does and who it does it for, then build a visual identity that can hold up for a decade. Every identity ships with motion rules, not as a later add-on.",
    includes: ["Positioning and brand platform", "Logotype and symbol", "Typography, including custom cuts", "Color and image direction", "Guidelines as a living Figma library"],
    timing: "10 to 16 weeks",
    example: "parallel",
  },
  {
    name: "Motion",
    line: "Motion systems, brand films, product animation and 3D.",
    text: "Motion is where most brands now spend their life, so we treat it as a system: principles, timing, easing and a toolkit your team can use without us. Films and 3D sit on top of that foundation.",
    includes: ["Motion principles and timing", "Logo animation and idents", "Lottie and After Effects toolkits", "Brand and launch films", "3D product and CG"],
    timing: "6 to 14 weeks",
    example: "kestrel",
  },
  {
    name: "Digital",
    line: "Product design language, apps and interfaces.",
    text: "We bring the brand into the product with your designers and engineers, not around them. That usually means a design language, a component library and a few weeks embedded with product squads.",
    includes: ["Product design language", "Component library in Figma", "Key flows and prototypes", "Interface motion", "Embedded weeks with product teams"],
    timing: "8 to 20 weeks",
    example: "mellow",
  },
  {
    name: "Campaign",
    line: "Launches, out-of-home, social and retail.",
    text: "For launches we write, design and animate the campaign, then build templates so your regional and in-house teams can keep it running after we step back.",
    includes: ["Campaign idea and copy", "Key visuals and out-of-home", "Social and pre-roll cut-downs", "Retail and event design", "Re-cut templates for local teams"],
    timing: "4 to 10 weeks",
    example: "low-tide",
  },
];

export const PROCESS = [
  { name: "Listen", weeks: "Weeks 1 to 3", text: "Interviews with your team and customers, a close read of the category, and a written brief we both sign." },
  { name: "Define", weeks: "Weeks 3 to 5", text: "Two or three strategic routes, each shown with type, color and motion from the start." },
  { name: "Design", weeks: "Weeks 5 to 11", text: "One route, built out across your real touchpoints. Weekly reviews, work in progress shared in Figma." },
  { name: "Build", weeks: "Weeks 9 to 14", text: "Guidelines, libraries, motion toolkits and templates, tested by your team before handover." },
  { name: "Launch", weeks: "Weeks 14 and on", text: "We stay close through launch and check in at 30 and 90 days to fix what the real world finds." },
];

export const ENGAGEMENTS = [
  {
    name: "Brand sprint",
    price: "From $45,000",
    length: "6 weeks",
    fit: "Early-stage companies that need a strong first identity before a raise or launch.",
    includes: ["Positioning workshop", "Logotype, type and color", "Core motion principles", "Starter guidelines"],
  },
  {
    name: "Identity and motion system",
    price: "From $140,000",
    length: "12 to 16 weeks",
    fit: "Rebrands and scale-ups that need a full system across product, marketing and motion.",
    includes: ["Everything in the sprint", "Full identity and Figma library", "Motion toolkit and brand film", "Product design language", "30 and 90 day check-ins"],
  },
  {
    name: "Studio retainer",
    price: "From $28,000",
    length: "Per month, 6 month minimum",
    fit: "Teams with a steady flow of launches, campaigns and product work.",
    includes: ["A dedicated lead and core team", "Monthly planning with your team", "Campaigns, films and product support", "Priority scheduling"],
  },
];

export const FAQ = [
  { q: "How far ahead do you book?", a: "Usually eight to ten weeks. We're currently scheduling projects that start in January 2027. Brand sprints can sometimes start sooner." },
  { q: "Do you work with early-stage companies?", a: "Yes. The brand sprint was built for them. About a third of our work is with companies before or just after their Series A." },
  { q: "Who will actually work on our project?", a: "A small team of four to seven people, led by Ada or Marcus. The people you meet in the pitch are the people who do the work." },
  { q: "Do you take on motion or campaign work for an identity we didn't design?", a: "Often. We'll spend the first week learning your system and tell you honestly if anything needs fixing before we build on it." },
  { q: "Where are you based, and do you work remotely?", a: "Our studio is in DUMBO, Brooklyn. About half our clients are outside New York, including London, Copenhagen and Austin. We travel for kickoff and key reviews." },
  { q: "Do you do pitches?", a: "We don't do unpaid creative pitches. We're happy to meet, share relevant work and write a detailed proposal, usually within a week." },
];

export const BUDGETS = ["$45k to $100k", "$100k to $200k", "$200k and up", "Not sure yet"];
export const TIMELINES = ["As soon as possible", "Within 3 months", "3 to 6 months", "Just exploring"];

export const ROLES = [
  { title: "Senior motion designer", type: "Full time, Brooklyn" },
  { title: "Design director, brand", type: "Full time, Brooklyn" },
  { title: "Producer", type: "Full time, hybrid" },
];

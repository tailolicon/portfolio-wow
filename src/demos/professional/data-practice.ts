import { demoImg } from "../shared";

export type AreaId = "injury" | "family" | "estate";

export type PracticeArea = {
  id: AreaId;
  title: string;
  short: string;
  cardItems: string[];
  image: string;
  imageAlt: string;
  intro: string;
  handle: { name: string; text: string }[];
  help: string[];
  fee: { title: string; text: string };
  lead: string;
  faqs: { q: string; a: string }[];
};

export const AREAS: PracticeArea[] = [
  {
    id: "injury",
    title: "Personal injury",
    short:
      "Hurt in a crash or by someone else's carelessness? We handle the insurance companies while you focus on getting better.",
    cardItems: ["Car & truck accidents", "Slip and fall injuries", "Wrongful death"],
    image: demoImg("professional", "signing"),
    imageAlt: "Attorney reviewing and signing settlement documents",
    intro:
      "An injury can upend your health, your paycheck, and your family's plans in a single moment. Insurance companies know this and often push for a quick, low settlement before you understand the full cost of your injuries. We even the odds, and we don't get paid unless you do.",
    handle: [
      { name: "Car accidents", text: "Rear-end, T-bone, and highway collisions, including uninsured and underinsured motorist claims." },
      { name: "Truck & commercial vehicle accidents", text: "Tractor-trailers, delivery vans, and company vehicles on I-77, I-85, and I-485." },
      { name: "Motorcycle & pedestrian accidents", text: "Cases where riders and walkers are unfairly blamed for a driver's mistake." },
      { name: "Slip and fall / premises liability", text: "Injuries in stores, apartment complexes, parking decks, and other properties." },
      { name: "Wrongful death", text: "Compassionate representation for families who have lost a loved one to negligence." },
      { name: "Rideshare & bus accidents", text: "Claims involving Uber, Lyft, CATS buses, and other passenger carriers." },
    ],
    help: [
      "Investigate right away: photographs, scene measurements, witness statements, dash-cam and surveillance video before it's erased.",
      "Handle every call and letter from the insurance companies so you don't accidentally hurt your claim.",
      "Help you get medical care, even if you don't have health insurance, and track every bill and lost paycheck.",
      "Calculate the full value of your claim, including future treatment, lost earning capacity, and pain and suffering.",
      "Negotiate from strength, and file suit and go to trial when an insurer refuses to be fair.",
    ],
    fee: {
      title: "No fee unless we win",
      text: "We handle injury cases on a contingency fee. There's nothing to pay up front, we advance the case costs, and if we don't recover money for you, you owe us nothing.",
    },
    lead: "Led by Daniel J. Harper",
    faqs: [
      {
        q: "How long do I have to file a personal injury claim in North Carolina?",
        a: "In most cases, three years from the date of the injury. Wrongful death claims generally must be filed within two years of the date of death, and claims against government entities can have much shorter notice deadlines. Call us as early as possible so evidence isn't lost.",
      },
      {
        q: "North Carolina has a contributory negligence rule. What does that mean for me?",
        a: "North Carolina is one of the few states where an injured person can be barred from recovery if they are found even slightly at fault. Insurers use this rule aggressively, which is why it matters to have an attorney build the evidence early.",
      },
      {
        q: "Should I give a recorded statement to the other driver's insurance company?",
        a: "We recommend that you don't. You are not required to, and adjusters often use those statements to minimize or deny claims. Let us handle that conversation for you.",
      },
      {
        q: "What is my case worth?",
        a: "It depends on your medical expenses, lost income, the long-term impact of your injuries, and the available insurance coverage. After reviewing your records, we'll give you an honest range, not a sales pitch.",
      },
    ],
  },
  {
    id: "family",
    title: "Family law",
    short:
      "Divorce, custody, and support matters handled with discretion, steady guidance, and a focus on what's best for your children.",
    cardItems: ["Divorce & separation", "Child custody & support", "Adoption"],
    image: demoImg("professional", "lounge"),
    imageAlt: "Quiet client meeting room at our Dilworth office",
    intro:
      "Family matters are personal, and the decisions you make now will shape your family's future for years. We give you honest advice, help you avoid unnecessary conflict when possible, and stand firm in court when we need to protect you and your children.",
    handle: [
      { name: "Divorce & separation agreements", text: "Absolute divorce, separation agreements, and property settlements, contested or uncontested." },
      { name: "Child custody & visitation", text: "Custody schedules, modifications, relocation, and emergency custody orders." },
      { name: "Child support", text: "Establishing, modifying, and enforcing support under the North Carolina guidelines." },
      { name: "Equitable distribution", text: "Fair division of homes, retirement accounts, businesses, and debt." },
      { name: "Alimony & post-separation support", text: "Requesting or defending spousal support claims." },
      { name: "Adoption", text: "Step-parent, relative, and adult adoptions, handled from petition to final decree." },
    ],
    help: [
      "Listen first and explain your rights and realistic options under North Carolina law.",
      "Put agreements in writing that protect your children, your home, and your finances.",
      "Resolve matters through negotiation or mediation when it's in your interest. It's usually faster and less expensive.",
      "Prepare thoroughly and advocate firmly in Mecklenburg County District Court when agreement isn't possible.",
    ],
    fee: {
      title: "Clear, upfront pricing",
      text: "Many uncontested divorces and step-parent adoptions are handled for a flat fee. For contested matters, we explain our hourly rates and estimated costs in writing before you commit.",
    },
    lead: "Led by Sofia M. Reyes",
    faqs: [
      {
        q: "How long do we have to be separated before filing for divorce in North Carolina?",
        a: "You and your spouse must live separate and apart for one full year, and at least one of you must have lived in North Carolina for six months before filing. Custody, support, and property issues can be addressed during that year.",
      },
      {
        q: "How do courts decide child custody?",
        a: "The judge decides based on the best interest of the child, looking at factors like each parent's involvement, stability, the child's needs, and any safety concerns. Most families reach a parenting agreement without a trial.",
      },
      {
        q: "Can a custody or child support order be changed later?",
        a: "Yes. Either parent can ask the court to modify an order when there has been a substantial change in circumstances, such as a move, a job change, or a change in the child's needs.",
      },
      {
        q: "Do I have to go to court?",
        a: "Not always. Many of our clients resolve their cases through negotiation or mediation and only appear in court briefly, or not at all. When court is necessary, we prepare you for every step.",
      },
    ],
  },
  {
    id: "estate",
    title: "Estate planning and probate",
    short:
      "Wills, trusts, and powers of attorney that protect the people you love, plus clear guidance through probate.",
    cardItems: ["Wills & trusts", "Powers of attorney", "Probate & estate administration"],
    image: demoImg("professional", "signing-2"),
    imageAlt: "Client signing a will at the attorney's office",
    intro:
      "A good estate plan isn't only for the wealthy. It's how you decide who cares for your children, who makes medical decisions if you can't, and how your home and savings pass to your family without unnecessary cost or conflict. When a loved one passes, we guide families through probate with patience and care.",
    handle: [
      { name: "Wills", text: "Simple and complex wills, including guardianship designations for minor children." },
      { name: "Revocable living trusts", text: "Trusts that help avoid probate and keep family affairs private." },
      { name: "Powers of attorney", text: "Durable financial powers of attorney and health care powers of attorney." },
      { name: "Living wills & advance directives", text: "Written wishes about end-of-life medical care." },
      { name: "Probate & estate administration", text: "Guidance for executors from qualifying through final accounting." },
      { name: "Special needs planning", text: "Supplemental needs trusts that protect benefits for a loved one with a disability." },
    ],
    help: [
      "Meet with you at our office, by video, or at home if travel is hard for you, to understand your family and goals.",
      "Prepare a plan in plain English, with a summary sheet so your family knows where everything is.",
      "Host a relaxed signing appointment with notary and witnesses provided at no extra charge.",
      "Review your plan free of charge for one year and whenever life changes: a marriage, a new child, a move.",
    ],
    fee: {
      title: "Flat-fee estate plans",
      text: "Most estate plans are prepared for a single flat fee quoted at your first meeting, so there are no surprise bills. Individual wills start at $650; couples' packages start at $1,450.",
    },
    lead: "Led by Sofia M. Reyes & Emily R. Carter",
    faqs: [
      {
        q: "What happens if I die without a will in North Carolina?",
        a: "State intestacy laws decide who inherits your property, which may not match your wishes, and the court will choose a guardian for your minor children. A will lets you make those decisions yourself.",
      },
      {
        q: "Do I need a trust, or is a will enough?",
        a: "Many families only need a well-drafted will and powers of attorney. A trust can make sense if you own property in more than one state, want to avoid probate, or need to manage how money is distributed to beneficiaries.",
      },
      {
        q: "How long does probate take in Mecklenburg County?",
        a: "Most estates take between nine months and a year to settle, since creditors have at least 90 days to present claims. Estates with real estate, disputes, or tax issues can take longer.",
      },
      {
        q: "Can you help if a family member has already passed?",
        a: "Yes. We help executors and administrators open the estate with the Clerk of Superior Court, notify creditors, transfer assets, and file the required accountings.",
      },
    ],
  },
];

export type Result = { amount: string; type: string; area: AreaId; summary: string; where: string };

export const RESULTS: Result[] = [
  { amount: "$1.2M", type: "Trucking accident settlement", area: "injury", summary: "Tractor-trailer rear-ended our client's car on I-77, causing spinal fractures that required surgery.", where: "Mecklenburg County, 2024" },
  { amount: "$875,000", type: "Wrongful death settlement", area: "injury", summary: "Recovered for the family of a pedestrian struck in a marked crosswalk by a distracted delivery driver.", where: "Mecklenburg County, 2023" },
  { amount: "$640,000", type: "Car accident jury verdict", area: "injury", summary: "Insurer offered $45,000 before trial; the jury found the other driver fully at fault for running a red light.", where: "Gaston County, 2023" },
  { amount: "$415,000", type: "Motorcycle accident settlement", area: "injury", summary: "Rider suffered a broken femur when a driver turned left across his lane on South Boulevard.", where: "Mecklenburg County, 2024" },
  { amount: "$285,000", type: "Slip and fall settlement", area: "injury", summary: "Client fell on an unmarked wet floor at a grocery store and tore her rotator cuff.", where: "Union County, 2022" },
  { amount: "$190,000", type: "Uninsured motorist claim", area: "injury", summary: "Hit-and-run crash left our client with a wrist fracture; recovered through her own UM coverage.", where: "Mecklenburg County, 2025" },
  { amount: "Primary custody", type: "Contested custody case", area: "family", summary: "Secured primary physical custody for a father after the other parent's planned out-of-state move.", where: "Mecklenburg County, 2024" },
  { amount: "$310,000", type: "Equitable distribution award", area: "family", summary: "Recovered our client's share of a spouse's undisclosed retirement account and business interest.", where: "Mecklenburg County, 2023" },
  { amount: "11 weeks", type: "Step-parent adoption finalized", area: "family", summary: "Petition to final decree in under three months so the family could celebrate before the holidays.", where: "Cabarrus County, 2025" },
  { amount: "Dismissed", type: "Will contest defended", area: "estate", summary: "Challenge to our client's late mother's will dismissed at summary judgment; estate distributed as written.", where: "Mecklenburg County, 2024" },
  { amount: "$2.3M estate", type: "Probate closed in 9 months", area: "estate", summary: "Guided an out-of-state executor through administration of a Charlotte estate with three properties.", where: "Mecklenburg County, 2025" },
  { amount: "$62,000", type: "Guardianship & benefits trust", area: "estate", summary: "Set up a special needs trust that preserved an adult son's Medicaid eligibility after an inheritance.", where: "Iredell County, 2023" },
];

export type Review = { name: string; place: string; date: string; area: string; stars: number; text: string };

export const REVIEWS: Review[] = [
  { name: "Jasmine W.", place: "Charlotte", date: "Aug 2026", area: "Car accident", stars: 5, text: "The insurance company kept calling me after my wreck on Independence. Marcus and Andrés took over, answered every text, and got me three times their first offer." },
  { name: "Luis G.", place: "Matthews", date: "Jul 2026", area: "Estate planning", stars: 5, text: "Sofia went over my parents' wills in Spanish so they understood every page. Muy profesionales." },
  { name: "Robert T.", place: "Gastonia", date: "Jun 2026", area: "Truck accident", stars: 5, text: "Dan knew exactly how the trucking company would fight us and was ready for it. I never felt like a file number." },
  { name: "Megan S.", place: "Huntersville", date: "May 2026", area: "Divorce", stars: 5, text: "Sofia was calm, honest, and always a step ahead. We settled in mediation and I got a schedule that works for my girls." },
  { name: "Kevin D.", place: "Columbus, OH", date: "Apr 2026", area: "Probate", stars: 5, text: "I was executor for my aunt's estate from out of state. Emily handled nearly all of it remotely and probate closed sooner than I expected." },
  { name: "Angela P.", place: "Monroe", date: "Mar 2026", area: "Slip and fall", stars: 4, text: "Took longer than I hoped, but they told me why and it was worth the wait. Andrés always called back the same day." },
  { name: "Marcus R.", place: "Concord", date: "Feb 2026", area: "Child custody", stars: 5, text: "My son's mom wanted to move him to Atlanta. Sofia got me ready for court and we won primary custody." },
  { name: "Diane H.", place: "Mint Hill", date: "Jan 2026", area: "Wills and POA", stars: 5, text: "Emily came to our house because my husband can't get around easily. Patient, thorough, and a fair flat price." },
  { name: "José M.", place: "Charlotte", date: "Nov 2025", area: "Car accident", stars: 5, text: "Me explicaron todo en español y siempre me mantuvieron informado. Excelente servicio." },
];

export const RATING_BARS = [
  { stars: 5, pct: 93 },
  { stars: 4, pct: 5 },
  { stars: 3, pct: 1 },
  { stars: 2, pct: 0 },
  { stars: 1, pct: 1 },
];

export const HEAR_OPTIONS = [
  "Google search",
  "Referred by a friend or family member",
  "Referred by another attorney",
  "Facebook or Instagram",
  "Radio or TV",
  "Past client",
  "Other",
];

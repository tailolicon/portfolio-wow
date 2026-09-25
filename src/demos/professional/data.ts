import { demoImg } from "../shared";

export const PAGES = ["home", "practice-areas", "attorneys", "results", "contact"] as const;
export type Page = (typeof PAGES)[number];

export const NAV: { page: Page; label: string }[] = [
  { page: "home", label: "Home" },
  { page: "practice-areas", label: "Practice areas" },
  { page: "attorneys", label: "Attorneys" },
  { page: "results", label: "Results & reviews" },
  { page: "contact", label: "Contact" },
];

export const FIRM = {
  name: "Harper & Reyes Law",
  legalName: "Harper & Reyes Law, PLLC",
  phone: "(704) 555-0172",
  phoneHref: "tel:+17045550172",
  email: "intake@harperreyeslaw.com",
  street: "1001 Morehead Square Dr, Suite 300",
  cityLine: "Charlotte, NC 28203",
  mapQuery: "1001 Morehead Square Dr, Charlotte, NC 28203",
  hours: [
    { days: "Monday to Friday", time: "8:30am to 5:30pm" },
    { days: "Evenings & weekends", time: "By appointment" },
    { days: "Phone line", time: "Answered 24/7" },
  ],
  founded: 2009,
};

export const img = {
  heroBg: demoImg("professional", "office-2"),
  meeting: demoImg("professional", "meeting"),
  signing: demoImg("professional", "signing"),
  signing2: demoImg("professional", "signing-2"),
  library: demoImg("professional", "library"),
  laptop: demoImg("professional", "laptop-notes"),
  lounge: demoImg("professional", "lounge"),
  skyline: demoImg("professional", "skyline"),
  office1: demoImg("professional", "office-1"),
  desk: demoImg("professional", "office-desk"),
  books: demoImg("professional", "books"),
};

export const TRUST = [
  { value: "Since 2009", label: "Serving Charlotte families for 17 years" },
  { value: "$48.6 million", label: "Recovered for injured clients" },
  { value: "4.9 on Google", label: "From 212 client reviews" },
  { value: "Se habla español", label: "Bilingual attorney and staff" },
];

export const WHY = [
  {
    icon: "phone",
    title: "You'll talk to a real person",
    text: "Our phone is answered 24 hours a day by our own intake team, not a call center. Most callers speak with an attorney the same day.",
  },
  {
    icon: "users",
    title: "Your attorney knows your name",
    text: "We take a limited number of cases so every client has a direct line to the lawyer handling their matter, not just a case number.",
  },
  {
    icon: "coins",
    title: "No fee unless we win",
    text: "Personal injury cases are handled on contingency. You pay nothing up front, and nothing at all if we don't recover compensation.",
  },
  {
    icon: "languages",
    title: "Hablamos español",
    text: "Sofia Reyes and our case manager, Andrés Molina, are fluent in Spanish. Tell us what happened in the language you're most comfortable with.",
  },
  {
    icon: "calendar",
    title: "Appointments that fit your life",
    text: "Evening and Saturday meetings are available, and we can meet by video, at our Dilworth office, or at the hospital if you can't travel.",
  },
  {
    icon: "chat",
    title: "Clear updates, no surprises",
    text: "You'll get a written plan at the start and a status update at least every 30 days, and we return calls within one business day.",
  },
] as const;

export const STEPS = [
  {
    title: "Free consultation",
    when: "Today",
    text: "Call, send the form, or stop by. We'll listen to what happened and answer your first questions at no cost and with no obligation.",
  },
  {
    title: "Case review",
    when: "First week",
    text: "We gather the documents, reports, and facts, then tell you honestly what your options are and what your case may be worth.",
  },
  {
    title: "A written plan",
    when: "Within 30 days",
    text: "You get a written plan with next steps, timelines, and costs explained in plain English before we take any action for you.",
  },
  {
    title: "Resolution",
    when: "Until it's done",
    text: "We negotiate firmly and prepare every case as if it will go to court, so you're ready for the best outcome either way.",
  },
];

export type Person = {
  id: string;
  name: string;
  title: string;
  photo: string;
  focus: string;
  education: string[];
  admissions: string[];
  languages: string;
  bio: string[];
  email: string;
  ext: string;
};

export const PARTNERS: Person[] = [
  {
    id: "harper",
    name: "Daniel J. Harper",
    title: "Founding Partner",
    photo: demoImg("people", "man-glasses"),
    focus: "Personal injury and wrongful death",
    education: [
      "J.D., Wake Forest University School of Law, 1998",
      "B.A., History, University of North Carolina at Chapel Hill, 1995",
    ],
    admissions: [
      "North Carolina State Bar, 1998",
      "South Carolina Bar, 2004",
      "U.S. District Court, Western District of North Carolina",
    ],
    languages: "English",
    bio: [
      "Dan spent the first ten years of his career defending insurance companies, which is exactly why he now represents the people they deny. He knows how adjusters value claims, where they cut corners, and when a case needs to go in front of a jury.",
      "Since co-founding the firm with Sofia Reyes in 2009, Dan has tried more than 40 cases to verdict in Mecklenburg, Gaston, and Union counties. He coaches youth baseball in Myers Park and serves on the board of a Charlotte nonprofit that provides free car seats to new parents.",
    ],
    email: "dharper@harperreyeslaw.com",
    ext: "101",
  },
  {
    id: "reyes",
    name: "Sofia M. Reyes",
    title: "Founding Partner",
    photo: demoImg("people", "woman-smile-1"),
    focus: "Family law and estate planning",
    education: [
      "J.D., Campbell University School of Law, 2002",
      "B.A., Political Science, Davidson College, 1999",
    ],
    admissions: [
      "North Carolina State Bar, 2002",
      "U.S. District Court, Western District of North Carolina",
      "Certified Family Financial Mediator",
    ],
    languages: "English, Spanish",
    bio: [
      "Sofia grew up in east Charlotte, the daughter of a small-business owner who immigrated from Puebla. She started her practice to make sure families going through the hardest moments of their lives had a lawyer who would explain everything clearly, in English or in Spanish.",
      "She leads the firm's family law and estate planning practice, handling divorce, custody, adoption, and probate matters. Sofia is a frequent volunteer at free legal clinics across Mecklenburg County and speaks regularly to community groups about protecting children through proper estate planning.",
    ],
    email: "sreyes@harperreyeslaw.com",
    ext: "102",
  },
];

export const ASSOCIATES: Person[] = [
  {
    id: "bell",
    name: "Marcus T. Bell",
    title: "Associate Attorney",
    photo: demoImg("people", "man-suit"),
    focus: "Car, truck and premises injury cases",
    education: [
      "J.D., cum laude, University of North Carolina School of Law, 2016",
      "B.S., Business Administration, Appalachian State University, 2013",
    ],
    admissions: ["North Carolina State Bar, 2016", "South Carolina Bar, 2018"],
    languages: "English",
    bio: [
      "Marcus handles car, truck, and premises liability cases from the first phone call through trial. Before joining the firm in 2019, he clerked for a Superior Court judge in Mecklenburg County, where he saw firsthand how juries weigh evidence and credibility.",
    ],
    email: "mbell@harperreyeslaw.com",
    ext: "104",
  },
  {
    id: "carter",
    name: "Emily R. Carter",
    title: "Associate Attorney",
    photo: demoImg("people", "woman-blazer"),
    focus: "Estate planning and probate",
    education: [
      "J.D., Elon University School of Law, 2019",
      "B.A., English, University of South Carolina, 2016",
    ],
    admissions: ["North Carolina State Bar, 2019"],
    languages: "English",
    bio: [
      "Emily helps families put wills, trusts, and powers of attorney in place, and guides executors through probate with the Mecklenburg County Clerk of Superior Court. Clients appreciate her patience and her checklists. She makes a complicated process feel manageable.",
    ],
    email: "ecarter@harperreyeslaw.com",
    ext: "105",
  },
];

export const STAFF: Person = {
  id: "molina",
  name: "Andrés Molina",
  title: "Senior Paralegal & Case Manager",
  photo: demoImg("people", "man-1"),
  focus: "Client communication, medical records & case coordination",
  education: ["Paralegal Certificate, Central Piedmont Community College, 2012", "B.A., Communications, UNC Charlotte, 2010"],
  admissions: ["N.C. State Bar Certified Paralegal"],
  languages: "English, Spanish",
  bio: [
    "Andrés has been with the firm since 2013 and is often the first person clients meet. He keeps every case moving: collecting records, scheduling appointments, and making sure you always know what happens next.",
  ],
  email: "amolina@harperreyeslaw.com",
  ext: "110",
};

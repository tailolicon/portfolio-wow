import { demoImg } from "../../demos/shared";

const person = (name: string) => demoImg("people", name);

export type Person = { name: string; role: string; photo: string; bio?: string };

export const FOUNDERS: Person[] = [
  {
    name: "Tomi Oyelaran",
    role: "Founding partner",
    photo: person("man-glasses"),
    bio: "Tomi studied at the Bartlett and worked for eight years in Rotterdam and Porto before returning to London. He leads the practice's housing and hospitality work and opened the Lisbon studio in 2017. He teaches a design unit at the Kingsway School of Architecture.",
  },
  {
    name: "Eleanor Hart",
    role: "Founding partner",
    photo: person("woman-smile-1"),
    bio: "Eleanor trained in Edinburgh and London and spent a decade on public buildings, from schools to a concert hall in Glasgow. She leads the cultural and workplace work and chairs the practice's design review. She sits on two design review panels in London.",
  },
];

export const TEAM: Person[] = [
  { name: "Ruth Adebayo", role: "Director", photo: person("woman-blazer") },
  { name: "Marcus Lindqvist", role: "Director", photo: person("man-1") },
  { name: "Sofia Mendes", role: "Director, Lisbon", photo: person("woman-red") },
  { name: "Daniel Okafor", role: "Associate director", photo: person("man-smile") },
  { name: "Priya Nandakumar", role: "Associate", photo: person("woman-2") },
  { name: "Inês Carvalho", role: "Associate, Lisbon", photo: person("woman-redhead") },
  { name: "Callum Reid", role: "Associate", photo: person("man-cap") },
  { name: "Hannah Crewe", role: "Senior architect", photo: person("woman-1") },
];

export const PRINCIPLES = [
  {
    title: "Start with the ground",
    body: "Every project begins with a survey we walk ourselves: levels, trees, light, how people already cross the site. Most of our best decisions come from what is already there.",
  },
  {
    title: "Keep what can be kept",
    body: "Around 60% of our work reuses an existing structure. We measure embodied carbon from the first sketch and publish the numbers for every completed building.",
  },
  {
    title: "Few materials, well made",
    body: "We prefer three materials used properly to ten used for effect, and we spend time with the people who make them: brickworks, joiners, kilns, quarries.",
  },
  {
    title: "Stay after handover",
    body: "We return to every building after one year and after three, to see how it is lived in and what we would do differently. Those visits shape the next project.",
  },
];

export const AWARDS: { year: number; award: string; project: string }[] = [
  { year: 2025, award: "Prémio Habitar, collective housing", project: "Alcântara Quay Housing" },
  { year: 2024, award: "Hanbury Prize for Housing, winner", project: "Hollow Lane House" },
  { year: 2024, award: "London Workplace Awards, best refurbishment", project: "St John Street Workplace" },
  { year: 2024, award: "European Office Design Awards, shortlisted", project: "Lindenhof Workplace" },
  { year: 2023, award: "Civic Building of the Year, shortlisted", project: "Kirkgate Library and Archive" },
  { year: 2023, award: "Northern Civic Awards, public building", project: "Kirkgate Library and Archive" },
  { year: 2022, award: "Hanbury Prize for Housing, commended", project: "Cedar House" },
  { year: 2021, award: "Brick and Clay Award, gold", project: "Harrowden Sculpture Pavilion" },
  { year: 2021, award: "North London Retrofit Prize", project: "Parkhill Road" },
  { year: 2019, award: "Emerging Practice of the Year", project: "Practice" },
];

export const PRESS: { date: string; outlet: string; title: string }[] = [
  { date: "Aug 2025", outlet: "Plan & Section", title: "Alcântara Quay: how a cooperative built for the heat" },
  { date: "May 2025", outlet: "The Architects' Quarterly", title: "In conversation with Tomi Oyelaran and Eleanor Hart" },
  { date: "Nov 2024", outlet: "Building Record", title: "Printworks, retold: St John Street reviewed" },
  { date: "Jun 2024", outlet: "Casa & Terra", title: "Casa do Sal, a house built around one fig tree" },
  { date: "Feb 2024", outlet: "The Weekend Review", title: "The best new houses in Britain" },
  { date: "Oct 2023", outlet: "Plan & Section", title: "Kirkgate Library: a front door for the city's memory" },
];

export const ROLES: { title: string; studio: string; type: string; note: string }[] = [
  {
    title: "Project architect, cultural",
    studio: "London",
    type: "Full time",
    note: "ARB registered, 5+ years post Part 3, experience leading public buildings through stages 3 to 5.",
  },
  {
    title: "Architectural assistant, Part 2",
    studio: "London",
    type: "Full time",
    note: "To join the housing team on Peckham Rye Mews from planning into technical design.",
  },
  {
    title: "Arquitecto/a sénior",
    studio: "Lisbon",
    type: "Full time",
    note: "OA registered, fluent Portuguese and English, hospitality or housing experience.",
  },
  {
    title: "Studio coordinator",
    studio: "London",
    type: "Part time, 3 days",
    note: "Running the studio day to day: diaries, visitors, supplies and our monthly crits.",
  },
];

export const OFFICES = [
  {
    city: "London",
    lines: ["14 Hardwick Street", "Clerkenwell", "London EC1R 4RB"],
    phone: "+44 20 7946 0318",
    email: "london@oyelaranhart.com",
    hours: "Monday to Friday, 9.00 to 18.00",
    travel: "Angel and Farringdon stations, 8 minutes on foot",
  },
  {
    city: "Lisbon",
    lines: ["Rua da Boavista 72, 3º", "Santos", "1200-066 Lisboa"],
    phone: "+351 21 000 0418",
    email: "lisboa@oyelaranhart.com",
    hours: "Monday to Friday, 9.30 to 18.30",
    travel: "Cais do Sodré, 6 minutes on foot",
  },
];

export const CONTACTS = [
  { topic: "New projects", name: "Ruth Adebayo", email: "newwork@oyelaranhart.com" },
  { topic: "Press and publications", name: "Nell Ashworth", email: "press@oyelaranhart.com" },
  { topic: "Careers", name: "Studio team", email: "jobs@oyelaranhart.com" },
];

export const NEWS: { date: string; title: string; body: string }[] = [
  {
    date: "12 September 2026",
    title: "Casa Pinhal tops out in Comporta",
    body: "The last of fourteen guest pavilions is weathertight. Opening is planned for spring 2027.",
  },
  {
    date: "28 July 2026",
    title: "Planning granted for Peckham Rye Mews",
    body: "64 homes for social rent, including twenty family houses on a new car-free mews.",
  },
  {
    date: "3 June 2026",
    title: "Ruth Adebayo joins the Civic Design Review panel",
    body: "Ruth will review public buildings across London for the next three years.",
  },
];

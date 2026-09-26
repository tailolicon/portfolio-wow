export type Boutique = {
  id: string;
  city: string;
  name: string;
  address: string[];
  phone: string;
  hours: string[];
  note: string;
  image: string;
  alt: string;
};

export const BOUTIQUES: Boutique[] = [
  {
    id: "paris",
    city: "Paris",
    name: "Saint-Honoré flagship and atelier",
    address: ["214 rue Saint-Honoré", "75001 Paris, France"],
    phone: "+33 1 00 19 31 00",
    hours: ["Monday to Saturday, 10:30 to 19:00", "Sunday by appointment"],
    note: "Atelier visits on the first Thursday of each month.",
    image: "ring-tray",
    alt: "Rings laid out in a velvet tray at the Paris boutique",
  },
  {
    id: "new-york",
    city: "New York",
    name: "Madison Avenue",
    address: ["781 Madison Avenue", "New York, NY 10065"],
    phone: "+1 (212) 555-0147",
    hours: ["Monday to Saturday, 10:00 to 18:00", "Sunday 12:00 to 17:00"],
    note: "Private salon on the second floor.",
    image: "pendants-hanging",
    alt: "Pendants hanging in a display at the Madison Avenue boutique",
  },
  {
    id: "tokyo",
    city: "Tokyo",
    name: "Ginza",
    address: ["5-4-7 Ginza, Chuo-ku", "Tokyo 104-0061, Japan"],
    phone: "+81 3 0000 1931",
    hours: ["Daily, 11:00 to 20:00"],
    note: "Pearl restringing done in store within five days.",
    image: "pearl-box",
    alt: "A pearl strand in its box at the Ginza boutique",
  },
];

export const TIMELINE = [
  {
    year: "1931",
    title: "Four benches on rue Saint-Honoré",
    text: "Lucien Orvel, a stone setter of 29, rents two rooms above a glovemaker and opens a workshop with three apprentices.",
  },
  {
    year: "1938",
    title: "The first Perle de Seine",
    text: "Marthe Orvel strings a necklace of Akoya pearls for her sister's wedding. Clients ask for the same knotting and the pearl line begins.",
  },
  {
    year: "1954",
    title: "The shop moves downstairs",
    text: "The glovemaker retires and the house takes the ground floor. The atelier stays above, where it still works today.",
  },
  {
    year: "1972",
    title: "Hélène Orvel and the gold link",
    text: "Lucien's daughter takes over and draws the Or Vivant link, hammered by hand and still assembled on the same bench.",
  },
  {
    year: "1996",
    title: "Madison Avenue",
    text: "A first boutique outside Paris opens in New York, with a small repair bench behind the salon.",
  },
  {
    year: "2011",
    title: "Ginza",
    text: "The Tokyo boutique opens a few streets from the pearl dealers who have supplied the house since 1962.",
  },
  {
    year: "2019",
    title: "Recycled gold, traced stones",
    text: "Every gram of gold is recycled and every diamond documented to its mine or its previous life.",
  },
  {
    year: "2025",
    title: "Lumière",
    text: "The house's first new diamond line in thirty years, drawn by atelier director Agnès Morel.",
  },
];

export const ARTISANS = [
  {
    name: "Agnès Morel",
    role: "Atelier director",
    years: "At the bench since 1994",
    image: "woman-smile-1",
    quote: "We still check every claw under the loupe twice, once by the setter and once by someone who did not set it.",
  },
  {
    name: "Henri Dufour",
    role: "Master setter",
    years: "Joined in 1988",
    image: "man-glasses",
    quote: "A good setting shows you the stone. Nobody should notice the metal holding it.",
  },
  {
    name: "Camille Roux",
    role: "Polisher",
    years: "Joined in 2016",
    image: "woman-redhead",
    quote: "Polishing is the last hour of forty. It is where a piece stops being a project and becomes yours.",
  },
  {
    name: "Julien Mercier",
    role: "Pearl stringer",
    years: "Joined in 2009",
    image: "man-1",
    quote: "I knot between every pearl so that if the silk ever breaks, you lose one and not fifty-six.",
  },
];

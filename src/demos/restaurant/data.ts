import type { MouseEvent } from "react";
import { demoImg } from "../shared";

export const PAGES = ["home", "menu", "about", "reservations", "contact"] as const;
export type RsPage = (typeof PAGES)[number];

export type LinkProps = {
  href: string;
  "aria-current"?: "page";
  onClick: (event: MouseEvent<HTMLElement>) => void;
};

export interface PageProps {
  go: (page: RsPage) => void;
  link: (page: RsPage) => LinkProps;
}

export const img = (name: string) => demoImg("restaurant", name);
export const person = (name: string) => demoImg("people", name);

export const BIZ = {
  name: "Nonna Rosa",
  full: "Nonna Rosa Trattoria",
  tagline: "Trattoria and wine bar since 1998",
  street: "2418 South Lamar Blvd",
  city: "Austin, TX 78704",
  phone: "(512) 555-0148",
  tel: "+15125550148",
  email: "hello@nonnarosaatx.com",
  events: "events@nonnarosaatx.com",
  mapQuery: "2418%20South%20Lamar%20Blvd%2C%20Austin%2C%20TX%2078704",
};

export const NAV: { id: RsPage; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "menu", label: "Menu" },
  { id: "about", label: "Our story" },
  { id: "reservations", label: "Reservations" },
  { id: "contact", label: "Contact & events" },
];

export const HOURS: { day: string; time: string; note?: string }[] = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday", time: "5:00-9:30pm", note: "Aperitivo at the bar 4-6pm" },
  { day: "Wednesday", time: "5:00-9:30pm", note: "Aperitivo at the bar 4-6pm" },
  { day: "Thursday", time: "5:00-9:30pm", note: "Aperitivo at the bar 4-6pm" },
  { day: "Friday", time: "5:00-10:30pm", note: "Aperitivo at the bar 4-6pm" },
  { day: "Saturday", time: "5:00-10:30pm" },
  { day: "Sunday", time: "Brunch 11am-2:30pm, dinner 4-9pm", note: "Family supper served all evening" },
];

export const HOURS_SHORT = [
  { day: "Mon", time: "Closed" },
  { day: "Tue-Thu", time: "5-9:30pm" },
  { day: "Fri-Sat", time: "5-10:30pm" },
  { day: "Sun", time: "11am-2:30pm, 4-9pm" },
];

export type Tag = "V" | "GF" | "GFA" | "VG";
export const TAG_LABEL: Record<Tag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  GFA: "Gluten-free available",
};

export interface MenuItem {
  name: string;
  it?: string;
  desc: string;
  price: string;
  tags?: Tag[];
  house?: boolean;
}

export interface MenuSection {
  id: string;
  title: string;
  note?: string;
  items: MenuItem[];
}

export const MENU: MenuSection[] = [
  {
    id: "antipasti",
    title: "Antipasti",
    note: "Served with warm focaccia from our wood oven.",
    items: [
      { name: "Burrata Pugliese", desc: "Creamy burrata, heirloom tomatoes, basil oil, aged balsamic, grilled bread", price: "17", tags: ["V", "GFA"], house: true },
      { name: "Arancini di Nonna", desc: "Crispy saffron risotto balls, mozzarella & peas, spicy pomodoro", price: "13", tags: ["V"] },
      { name: "Calamari Fritti", desc: "Lightly fried squid & zucchini, lemon aioli, Calabrian chili", price: "16" },
      { name: "Polpette al Sugo", desc: "Rosa's beef & pork meatballs braised in Sunday gravy, whipped ricotta", price: "15", tags: ["GFA"] },
      { name: "Tagliere Misto", desc: "Prosciutto di Parma, soppressata, pecorino, Castelvetrano olives, fig jam", price: "24", tags: ["GFA"] },
      { name: "Cozze in Bianco", desc: "PEI mussels, white wine, garlic, parsley, toasted focaccia", price: "18", tags: ["GFA"] },
    ],
  },
  {
    id: "insalate",
    title: "Insalate",
    note: "Add grilled chicken 7, shrimp 9 or salmon 11",
    items: [
      { name: "Insalata della Casa", desc: "Mixed greens, shaved fennel, cherry tomatoes, red-wine vinaigrette", price: "10", tags: ["VG", "GF"] },
      { name: "Caesar Romana", desc: "Little gem, parmigiano, anchovy dressing, garlic breadcrumbs", price: "13", tags: ["GFA"] },
      { name: "Rucola e Pere", desc: "Arugula, roasted pears, gorgonzola, candied walnuts, honey", price: "14", tags: ["V", "GF"] },
      { name: "Panzanella Toscana", desc: "Summer tomatoes, cucumber, red onion, torn bread, basil", price: "13", tags: ["VG"] },
    ],
  },
  {
    id: "pasta",
    title: "Pasta fatta in casa",
    note: "Rolled by hand every morning. Gluten-free penne available for any pasta +3.",
    items: [
      { name: "Tagliatelle alla Bolognese", desc: "Nonna Rosa's slow-simmered beef, pork & veal ragù, parmigiano", price: "26", tags: ["GFA"], house: true },
      { name: "Spaghetti alla Carbonara", desc: "Guanciale, egg yolk, pecorino romano, cracked black pepper", price: "24", tags: ["GFA"] },
      { name: "Cacio e Pepe", desc: "Tonnarelli, pecorino, parmigiano, toasted Tellicherry pepper", price: "21", tags: ["V", "GFA"] },
      { name: "Linguine ai Gamberi", desc: "Gulf shrimp, cherry tomatoes, garlic, white wine, chili, parsley", price: "29", tags: ["GFA"] },
      { name: "Ravioli di Ricotta", desc: "Ricotta & lemon-filled ravioli, brown butter, sage, toasted hazelnuts", price: "23", tags: ["V"] },
      { name: "Lasagna della Domenica", desc: "Seven layers of fresh pasta, ragù, béchamel & mozzarella", price: "25" },
      { name: "Penne all'Arrabbiata", desc: "Spicy San Marzano tomato, garlic, chili, basil", price: "18", tags: ["VG", "GFA"] },
    ],
  },
  {
    id: "pizze",
    title: "Pizze",
    note: "12-inch Neapolitan-style pies from our 900° oak-fired oven. Gluten-free crust +4.",
    items: [
      { name: "Margherita", desc: "San Marzano tomato, fior di latte, basil, extra-virgin olive oil", price: "16", tags: ["V", "GFA"], house: true },
      { name: "Diavola", desc: "Tomato, mozzarella, spicy soppressata, Calabrian chili honey", price: "19", tags: ["GFA"] },
      { name: "Quattro Formaggi", desc: "Mozzarella, gorgonzola, fontina, parmigiano, rosemary", price: "19", tags: ["V", "GFA"] },
      { name: "Salsiccia e Funghi", desc: "House fennel sausage, roasted mushrooms, mozzarella, thyme", price: "20", tags: ["GFA"] },
      { name: "Prosciutto e Rucola", desc: "Tomato, mozzarella, prosciutto di Parma, arugula, parmigiano", price: "22", tags: ["GFA"] },
    ],
  },
  {
    id: "secondi",
    title: "Secondi",
    items: [
      { name: "Pollo alla Parmigiana", desc: "Crispy chicken cutlet, pomodoro, melted mozzarella, side of spaghetti", price: "27" },
      { name: "Branzino al Forno", desc: "Whole roasted Mediterranean sea bass, lemon, capers, roasted potatoes", price: "36", tags: ["GF"] },
      { name: "Salmone al Limone", desc: "Seared salmon, lemon-caper butter, sautéed spinach, farro", price: "31" },
      { name: "Bistecca alla Griglia", desc: "14 oz grilled ribeye, rosemary potatoes, salsa verde", price: "48", tags: ["GF"] },
      { name: "Melanzane alla Parmigiana", desc: "Layered eggplant, tomato, basil, mozzarella, parmigiano", price: "22", tags: ["V", "GF"] },
    ],
  },
  {
    id: "dolci",
    title: "Dolci",
    items: [
      { name: "Tiramisù della Nonna", desc: "Espresso-soaked savoiardi, mascarpone cream, cocoa. Rosa's original recipe", price: "11", tags: ["V"], house: true },
      { name: "Cannoli Siciliani", desc: "Two crisp shells, sweet ricotta, pistachio, dark chocolate", price: "10", tags: ["V"] },
      { name: "Panna Cotta", desc: "Vanilla bean cream, seasonal fruit compote", price: "9", tags: ["V", "GF"] },
      { name: "Affogato", desc: "Vanilla gelato drowned in a double shot of espresso", price: "8", tags: ["V", "GF"] },
      { name: "Gelato & Sorbetto", desc: "Three scoops of the day, made locally for us", price: "8", tags: ["V", "GF"] },
    ],
  },
  {
    id: "drinks",
    title: "Wine & cocktails",
    note: "Our full list of 94 Italian wines is available at the table. Ask Elena for a pairing.",
    items: [
      { name: "Aperol Spritz", desc: "Aperol, prosecco, soda, orange", price: "12" },
      { name: "Negroni della Casa", desc: "Gin, Campari, sweet vermouth, stirred and served on a big rock", price: "14" },
      { name: "Limoncello Spritz", desc: "House limoncello, prosecco, mint, lemon", price: "13" },
      { name: "Espresso Martini", desc: "Vodka, Borghetti espresso liqueur, fresh espresso", price: "15" },
      { name: "Prosecco, Valdobbiadene", desc: "Veneto. Glass 12, bottle 46", price: "12" },
      { name: "Chianti Classico, Castello di Volpaia", desc: "Tuscany. Glass 15, bottle 58", price: "15" },
      { name: "Montepulciano d'Abruzzo", desc: "Abruzzo. Glass 11, bottle 42", price: "11" },
      { name: "Barolo, Pio Cesare", desc: "Piedmont. By the bottle", price: "125" },
      { name: "Pinot Grigio, Alto Adige", desc: "Trentino. Glass 12, bottle 46", price: "12" },
      { name: "Peroni or local draft", desc: "Ask your server about this week's Austin tap", price: "7" },
    ],
  },
];

export const SIGNATURES = [
  { name: "Tagliatelle alla Bolognese", desc: "Rosa's ragù, simmered six hours every morning since 1998.", price: "26", image: "pasta-tagliatelle" },
  { name: "Pizza Margherita", desc: "San Marzano tomato, fior di latte and basil from the oak-fired oven.", price: "16", image: "pizza-margherita" },
  { name: "Linguine ai Gamberi", desc: "Gulf shrimp, cherry tomatoes, garlic and a little chili.", price: "29", image: "pasta-shrimp" },
  { name: "Spaghetti alla Carbonara", desc: "Guanciale, egg yolk and pecorino. The Roman way, no cream.", price: "24", image: "pasta-carbonara" },
];

export const RATING = { score: "4.7", count: "1,248" };

export const REVIEWS = [
  { name: "Jessica M.", where: "Zilker", date: "Aug 2026", source: "Google", photo: "woman-smile-1", text: "Eleven anniversaries here now. The bolognese tastes exactly like it did the first time, and Elena still remembers our names." },
  { name: "David R.", where: "Travis Heights", date: "Jul 2026", source: "Google", photo: "man-glasses", text: "Sunday supper is the best deal in town. The platters just keep coming. My parents are already asking when we're going back." },
  { name: "Priya S.", where: "Mueller", date: "Jun 2026", source: "Yelp", photo: "woman-1", text: "Best cacio e pepe I've had outside Rome. They were careful with my celiac and walked me through every option." },
  { name: "Tom K.", where: "Round Rock", date: "Apr 2026", source: "Google", photo: "man-smile", text: "Rehearsal dinner for 32 in the Cantina. Marco's family-style menu was a hit and nothing felt rushed." },
  { name: "Rachel H.", where: "Bouldin Creek", date: "Mar 2026", source: "Google", photo: "woman-redhead", text: "Aperitivo on the patio is my Tuesday reset." },
  { name: "Marcus L.", where: "East Austin", date: "Jan 2026", source: "Yelp", photo: "man-cap", text: "Proper leopard-spotted crust, great tomatoes, quick service on a packed Friday. Get the tiramisu." },
];

export const ORDER_LINKS = [
  { label: "Order pickup", sub: "Ready in about 25 min", primary: true },
  { label: "DoorDash", sub: "Delivery" },
  { label: "Uber Eats", sub: "Delivery" },
];

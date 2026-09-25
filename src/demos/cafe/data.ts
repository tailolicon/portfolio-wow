export const PAGES = ["home", "menu", "story", "catering", "visit"] as const;
export type Page = (typeof PAGES)[number];

export const NAV: { page: Page; label: string }[] = [
  { page: "menu", label: "Menu" },
  { page: "story", label: "Our story" },
  { page: "catering", label: "Catering" },
  { page: "visit", label: "Locations" },
];

export const BRAND = {
  name: "Hearth & Honey",
  full: "Hearth & Honey Coffee Co.",
  email: "hello@hearthandhoney.coffee",
  domain: "hearthandhoney.coffee",
  since: 2014,
};

export type Location = {
  id: string;
  name: string;
  street: string;
  city: string;
  phone: string;
  hours: { days: string; time: string }[];
  /** index 0 = Sunday */
  daily: string[];
  image: string;
  imageAlt: string;
  blurb: string;
  amenities: string[];
  parking: string;
};

export const LOCATIONS: Location[] = [
  {
    id: "downtown",
    name: "Downtown",
    street: "118 Haywood St",
    city: "Asheville, NC 28801",
    phone: "(828) 555-0162",
    hours: [
      { days: "Mon-Fri", time: "6:30am-5pm" },
      { days: "Sat-Sun", time: "7am-5pm" },
    ],
    daily: ["7am-5pm", "6:30am-5pm", "6:30am-5pm", "6:30am-5pm", "6:30am-5pm", "6:30am-5pm", "7am-5pm"],
    image: "interior-busy",
    imageAlt: "Guests at the espresso bar in our Downtown café",
    blurb:
      "Our original shop, a block from the library. The roaster lives in the back room, and on roast days (Tue & Fri) the whole street smells like it.",
    amenities: ["Free Wi‑Fi", "Sidewalk patio", "Dog friendly patio", "Accessible restroom", "Roastery tours (Sat 10am)"],
    parking: "Wall Street Garage is a 2-minute walk; first hour free with any purchase.",
  },
  {
    id: "west",
    name: "West Asheville",
    street: "731 Haywood Rd",
    city: "Asheville, NC 28806",
    phone: "(828) 555-0187",
    hours: [{ days: "Every day", time: "7am-3pm" }],
    daily: ["7am-3pm", "7am-3pm", "7am-3pm", "7am-3pm", "7am-3pm", "7am-3pm", "7am-3pm"],
    image: "greenhouse",
    imageAlt: "Plant-filled seating area at our West Asheville café",
    blurb:
      "Our sunny little sister on Haywood Road, with a plant-filled room, a big back patio, and a drive-up window for mornings on the go.",
    amenities: ["Drive-up window", "Free Wi‑Fi", "Back patio", "Dog friendly", "Kids’ corner"],
    parking: "Free lot behind the building (enter from Brevard Rd) plus street parking.",
  },
];

export type Tag = "V" | "VG" | "GF" | "DF";
export const TAG_LABEL: Record<Tag, string> = {
  V: "Vegetarian",
  VG: "Vegan",
  GF: "Gluten-free",
  DF: "Dairy-free",
};

export type MenuItem = {
  name: string;
  desc?: string;
  price?: string;
  sizes?: [string, string];
  tags?: Tag[];
  isNew?: boolean;
};
export type MenuSection = {
  id: string;
  title: string;
  note?: string;
  sized?: boolean;
  items: MenuItem[];
};

export const MENU: MenuSection[] = [
  {
    id: "coffee",
    title: "Espresso & coffee",
    note: "Espresso: our Hearthstone blend, or ask for today’s single origin (+$0.50).",
    sized: true,
    items: [
      { name: "Drip Coffee", desc: "House roast or rotating single origin", sizes: ["$3.00", "$3.50"] },
      { name: "Pour Over", desc: "Brewed to order, about 4 minutes", sizes: ["$4.75", "$5.50"] },
      { name: "Americano", sizes: ["$3.75", "$4.25"] },
      { name: "Cortado", desc: "4oz, equal parts espresso and milk", price: "$4.00" },
      { name: "Cappuccino", sizes: ["$4.50", "$5.00"] },
      { name: "Latte", sizes: ["$4.75", "$5.25"] },
      { name: "Honey Lavender Latte", desc: "Local wildflower honey, lavender, a pinch of sea salt", sizes: ["$5.50", "$6.00"] },
      { name: "Mocha", desc: "House chocolate sauce made with dark cocoa", sizes: ["$5.25", "$5.75"] },
      { name: "Cold Brew", desc: "Steeped 18 hours, served over ice", sizes: ["$4.50", "$5.00"] },
      { name: "Maple Oat Cold Brew", desc: "Cold brew, oat milk, NC maple syrup", sizes: ["$5.50", "$6.00"], tags: ["VG"] },
      { name: "Espresso", desc: "Double shot", price: "$3.25" },
      { name: "Café au Lait", sizes: ["$3.75", "$4.25"] },
    ],
  },
  {
    id: "tea",
    title: "Tea & not coffee",
    sized: true,
    items: [
      { name: "Chai Latte", desc: "Spiced chai we brew in-house every morning", sizes: ["$4.75", "$5.25"] },
      { name: "Dirty Chai", desc: "Chai latte with a double shot", sizes: ["$5.75", "$6.25"] },
      { name: "Matcha Latte", desc: "Ceremonial-grade matcha, lightly sweetened", sizes: ["$5.25", "$5.75"] },
      { name: "London Fog", desc: "Earl Grey, vanilla, steamed milk", sizes: ["$4.50", "$5.00"] },
      { name: "Loose Leaf Tea", desc: "Black, green, chamomile, mint, or rooibos", sizes: ["$3.25", "$3.75"] },
      { name: "Hot Chocolate", desc: "Topped with a house-made marshmallow", sizes: ["$4.00", "$4.50"] },
      { name: "Sparkling Honey Lemonade", sizes: ["$4.25", "$4.75"], tags: ["VG", "GF"] },
      { name: "Steamer", desc: "Steamed milk with any syrup. A favorite with kids", sizes: ["$3.00", "$3.50"] },
    ],
  },
  {
    id: "breakfast",
    title: "Breakfast & toasts",
    note: "Served all day. Gluten-free bread available (+$1.50).",
    items: [
      { name: "Hearth Breakfast Sandwich", desc: "Farm egg, aged cheddar, bacon or sausage, on a buttermilk biscuit or English muffin", price: "$8.50" },
      { name: "Veggie Breakfast Burrito", desc: "Scrambled eggs, black beans, roasted sweet potato, pepper jack, salsa verde", price: "$9.50", tags: ["V"] },
      { name: "Avocado Toast", desc: "Sourdough, smashed avocado, pickled onion, chili crunch, microgreens. Add an egg +$1.75", price: "$9.75", tags: ["VG"] },
      { name: "Honey Ricotta Toast", desc: "Whipped ricotta, local honey, toasted walnuts, flaky salt", price: "$8.25", tags: ["V"] },
      { name: "Steel-Cut Oatmeal", desc: "Brown sugar, seasonal fruit, toasted pecans, oat milk", price: "$6.75", tags: ["VG", "GF"] },
      { name: "Greek Yogurt Parfait", desc: "House granola, honey, berries", price: "$6.50", tags: ["V", "GF"] },
      { name: "Biscuit & Sausage Gravy", desc: "Our buttermilk biscuit smothered in black pepper gravy", price: "$7.75" },
    ],
  },
  {
    id: "pastries",
    title: "Pastries",
    note: "Baked from scratch in our Downtown kitchen, starting at 4am. Once they’re gone, they’re gone.",
    items: [
      { name: "Butter Croissant", price: "$4.00", tags: ["V"] },
      { name: "Chocolate Croissant", price: "$4.50", tags: ["V"] },
      { name: "Ham & Gruyère Croissant", price: "$5.75" },
      { name: "Cardamom Morning Bun", desc: "Our most-requested pastry", price: "$4.75", tags: ["V"] },
      { name: "Blueberry Lemon Scone", price: "$4.00", tags: ["V"] },
      { name: "Buttermilk Biscuit with Honey Butter", price: "$3.75", tags: ["V"] },
      { name: "Brown Butter Chocolate Chip Cookie", price: "$3.50", tags: ["V"] },
      { name: "Banana Bread", desc: "Thick slice, walnuts optional", price: "$3.75", tags: ["VG"] },
      { name: "Almond Orange Cake", price: "$4.25", tags: ["GF", "V"] },
      { name: "Seasonal Hand Pie", desc: "Ask what’s in the case today", price: "$5.00", tags: ["V"] },
    ],
  },
  {
    id: "lunch",
    title: "Lunch & sandwiches",
    note: "Available 11am until close. Add a cup of soup +$3.",
    items: [
      { name: "Turkey & Brie", desc: "Roast turkey, brie, apple, arugula, fig jam on toasted sourdough", price: "$12.50" },
      { name: "Pimento Grilled Cheese", desc: "House pimento cheese and cheddar on griddled country bread", price: "$10.00", tags: ["V"] },
      { name: "Chicken Salad Croissant", desc: "Herbed chicken salad, grapes, pecans, butter lettuce", price: "$12.00" },
      { name: "Roasted Veggie Wrap", desc: "Hummus, roasted squash, peppers, spinach, feta", price: "$11.00", tags: ["V"], isNew: true },
      { name: "Harvest Grain Bowl", desc: "Farro, kale, roasted sweet potato, apples, goat cheese, cider vinaigrette", price: "$12.75", tags: ["V"] },
      { name: "Soup of the Day", desc: "Served with bread. Cup $5, bowl $7.50", price: "$5.00" },
    ],
  },
];

export const MILKS = ["Whole", "2%", "Skim", "Half & half", "Oat +$0.75", "Almond +$0.75", "Coconut +$0.75"];
export const SYRUPS = ["Vanilla", "Caramel", "Hazelnut", "Lavender", "Local honey", "Brown sugar cinnamon", "Sugar-free vanilla"];

export type Special = { name: string; desc: string; price: string; image: string; alt: string; label: string };
export const SPECIALS: Special[] = [
  {
    name: "Maple Pecan Latte",
    desc: "Double espresso, toasted-pecan syrup we make in-house, NC maple, a dusting of cinnamon.",
    price: "$5.75",
    image: "latte-art",
    alt: "Latte with rosetta art on a saucer",
    label: "Fall seasonal",
  },
  {
    name: "Apple Butter Cold Brew",
    desc: "Our 18-hour cold brew with spiced apple butter cold foam from Hendersonville apples.",
    price: "$6.00",
    image: "iced-coffee",
    alt: "Iced coffee with cream swirling through it",
    label: "Fall seasonal",
  },
  {
    name: "Pumpkin Cardamom Bun",
    desc: "Our famous morning bun, folded with roasted pumpkin and finished with brown-butter glaze.",
    price: "$5.00",
    image: "croissant",
    alt: "Fresh laminated pastries on a slate board",
    label: "Bakery special",
  },
];

export const BEANS = [
  { name: "Hearthstone Blend", origin: "Brazil and Colombia", notes: "Milk chocolate, toasted almond, brown sugar", roast: "Medium", price: "$17" },
  { name: "Ethiopia Guji", origin: "Hambela, Ethiopia", notes: "Blueberry, jasmine, lemon candy", roast: "Light", price: "$19" },
  { name: "Blue Ridge Decaf", origin: "Colombia, Swiss Water process", notes: "Cocoa, cherry, caramel", roast: "Medium", price: "$18" },
  { name: "Front Porch Dark", origin: "Guatemala & Sumatra", notes: "Dark chocolate, molasses, cedar", roast: "Dark", price: "$17" },
];

export type Review = { name: string; photo: string; date: string; place: string; source: string; stars: number; text: string };
export const REVIEWS: Review[] = [
  {
    name: "Rachel M.",
    photo: "woman-smile-1",
    date: "Sep 2026",
    place: "Montford",
    source: "Google",
    stars: 5,
    text: "The cardamom morning bun alone is worth the drive. By my third visit they knew my order.",
  },
  {
    name: "Marcus T.",
    photo: "man-smile",
    date: "Aug 2026",
    place: "West Asheville",
    source: "Google",
    stars: 5,
    text:
      "I buy a bag of the Ethiopia Guji every other week. The drive-up window on Haywood Rd has saved a lot of my mornings.",
  },
  {
    name: "Priya K.",
    photo: "woman-1",
    date: "Jun 2026",
    place: "Visiting from Charlotte",
    source: "Yelp",
    stars: 4,
    text:
      "Worked from the Downtown shop three days in a row. Solid Wi‑Fi, nobody rushed me, and the pastry case is dangerous. Gets loud around 9am on Saturdays.",
  },
  {
    name: "Tom B.",
    photo: "man-glasses",
    date: "Mar 2026",
    place: "Downtown",
    source: "Google",
    stars: 5,
    text: "Honest cup of drip for $3 and a biscuit that tastes like my grandmother’s. Sold.",
  },
];

export const RATING = { score: "4.8", count: "1,236" };

export type CateringItem = { name: string; serves: string; price: string; desc: string; image: string; alt: string };
export const CATERING: CateringItem[] = [
  {
    name: "Coffee Box",
    serves: "Serves 10 to 12",
    price: "$38",
    desc: "96oz of fresh-brewed house coffee or decaf, with cups, lids, sleeves, milk, oat milk, and sweeteners.",
    image: "cups-flatlay",
    alt: "Assorted coffee cups on a table from above",
  },
  {
    name: "Pastry Platter",
    serves: "Small (12 pcs) / Large (24 pcs)",
    price: "$42 / $78",
    desc: "A baker’s choice mix of croissants, scones, morning buns, and muffins, arranged and ready to set out.",
    image: "bakery-case",
    alt: "Bakery case full of breads and pastries",
  },
  {
    name: "Breakfast Spread",
    serves: "Per person, 10 minimum",
    price: "$16 / person",
    desc: "Breakfast sandwiches or burritos, a fruit platter, yogurt parfaits, a coffee box, and orange juice.",
    image: "brunch-spread",
    alt: "Breakfast spread with waffles, fruit and juice",
  },
  {
    name: "Lunch Box",
    serves: "Per person, 8 minimum",
    price: "$15.50 / person",
    desc: "Any sandwich or grain bowl, a house cookie, a bag of chips, and a drink. Individually labeled.",
    image: "bread",
    alt: "Loaves of fresh-baked country bread",
  },
];

export const CATERING_FAQ = [
  {
    q: "How much notice do you need?",
    a: "48 hours for most orders. Coffee boxes and pastry platters can often be done with 24 hours’ notice, so call the Downtown shop and we’ll do our best.",
  },
  {
    q: "Do you deliver?",
    a: "Yes. Delivery within Asheville city limits is $15 for orders over $75 (free for orders over $250). Deliveries run Monday to Saturday between 7am and 1pm.",
  },
  {
    q: "Can you handle dietary restrictions?",
    a: "Absolutely. We can build platters that are vegan, gluten-free, or nut-free. Our kitchen does handle wheat and nuts, so we can’t guarantee zero cross-contact.",
  },
  {
    q: "What’s your cancellation policy?",
    a: "Cancel or change your order free of charge up to 24 hours before pickup or delivery. After that we charge 50% since everything is baked to order.",
  },
  {
    q: "Do you offer a full coffee bar for events?",
    a: "Yes. Our mobile espresso bar comes with two baristas for weddings, conferences, and office parties. Packages start at $650 for 100 drinks.",
  },
];

export const INSTAGRAM = [
  { image: "latte-art-pair", alt: "Two lattes with heart art" },
  { image: "donuts", alt: "Stack of sprinkle doughnuts" },
  { image: "pour-over", alt: "Barista pouring a Chemex" },
  { image: "street-patio", alt: "Sidewalk patio tables" },
  { image: "cookies", alt: "Chocolate chip cookies in a basket" },
  { image: "portafilter", alt: "Espresso, grounds, and beans in portafilters" },
];

export const JOBS = [
  { title: "Barista (full or part time)", place: "Both locations", pay: "$16/hr plus tips (about $6/hr)" },
  { title: "Morning Baker", place: "Downtown bakery, 4am starts", pay: "$18 to $21/hr" },
  { title: "Weekend Shift Lead", place: "West Asheville", pay: "$19/hr plus tips" },
];

import { demoImg } from "../../demos/shared";

export const img = (name: string) => demoImg("lab-luxury", name);
export const person = (name: string) => demoImg("people", name);

export type Category = "Rings" | "Necklaces" | "Earrings" | "Bracelets" | "Bridal";
export type CollectionId = "lumiere" | "perle" | "or-vivant";
export type Metal = "Yellow gold" | "White gold" | "Rose gold" | "Platinum";

export const CATEGORIES: Category[] = ["Rings", "Necklaces", "Earrings", "Bracelets", "Bridal"];

export const METAL_DETAIL: Record<Metal, { label: string; swatch: string; surcharge: number }> = {
  "Yellow gold": { label: "18k recycled yellow gold", swatch: "#d9bf86", surcharge: 0 },
  "White gold": { label: "18k recycled white gold", swatch: "#dcdcd8", surcharge: 0 },
  "Rose gold": { label: "18k recycled rose gold", swatch: "#dcae9c", surcharge: 0 },
  Platinum: { label: "Platinum 950", swatch: "#c9ccce", surcharge: 0.14 },
};

export type Collection = {
  id: CollectionId;
  name: string;
  line: string;
  story: string;
  detail: string;
  image: string;
  imageAlt: string;
};

export const COLLECTIONS: Collection[] = [
  {
    id: "lumiere",
    name: "Lumière",
    line: "The diamond line",
    story:
      "Low claws, open galleries and stones chosen for fire rather than size. Lumière is set so the light reaches the diamond from every side, the way Lucien Orvel set his first solitaire in 1934.",
    detail: "Diamonds from 0.30 ct, each with an independent grading report and a documented origin.",
    image: "diamond-bracelet-dark",
    imageAlt: "Lumière rivière bracelet in white gold with round diamonds, on black",
  },
  {
    id: "perle",
    name: "Perle de Seine",
    line: "The pearl line",
    story:
      "Akoya and South Sea pearls matched by hand, one strand at a time, and knotted on silk in the atelier. The line began in 1938 with a necklace Marthe Orvel strung for her sister's wedding.",
    detail: "Hand-knotted on silk. Complimentary restringing every three years, for life.",
    image: "pearl-pendant-model",
    imageAlt: "A single Akoya pearl drop worn on a fine gold chain",
  },
  {
    id: "or-vivant",
    name: "Or Vivant",
    line: "The gold line",
    story:
      "Links, hoops and signets in recycled 18k gold, hammered and polished until the surface moves with the light. Hélène Orvel drew the first Or Vivant link in 1972. It is still made on the same bench.",
    detail: "100% recycled 18k gold, alloyed and cast in Paris.",
    image: "gold-link-bracelet",
    imageAlt: "Or Vivant marine link bracelet in yellow gold, resting on an open book",
  },
];

export type Stone = { label: string; value: string };

export type Product = {
  slug: string;
  name: string;
  collection: CollectionId;
  categories: Category[];
  price: number;
  image: string;
  alt: string;
  gallery: { src: string; alt: string; zoom?: string }[];
  metals: Metal[];
  sizing: "ring" | "bracelet" | "necklace" | "none";
  summary: string;
  stones: Stone[];
  certificate?: string;
  isNew?: boolean;
};

const P = (p: Product) => p;

export const PRODUCTS: Product[] = [
  P({
    slug: "lumiere-pear-halo-ring",
    name: "Lumière pear halo ring",
    collection: "lumiere",
    categories: ["Rings", "Bridal"],
    price: 14800,
    image: "pear-diamond-ring",
    alt: "Pear-shaped diamond ring with a halo and a milgrain band, in white gold",
    gallery: [
      { src: "pear-diamond-ring", alt: "Pear halo ring, three-quarter view" },
      { src: "pear-diamond-ring", alt: "Detail of the halo and claws", zoom: "54% 42%" },
      { src: "model-rings", alt: "Rings worn with a fine gold pendant" },
    ],
    metals: ["White gold", "Platinum", "Yellow gold"],
    sizing: "ring",
    summary:
      "A 1.02 ct pear diamond held by five low claws, circled by a halo of 28 brilliants, with 18 more along a hand-rolled milgrain band.",
    stones: [
      { label: "Centre stone", value: "Pear diamond, 1.02 ct" },
      { label: "Colour and clarity", value: "E, VS1" },
      { label: "Halo and band", value: "46 round brilliants, 0.38 ct total" },
      { label: "Origin", value: "Recycled diamond, Antwerp cutting house" },
    ],
    certificate: "Independent grading report no. 7342 1189 06",
    isNew: true,
  }),
  P({
    slug: "lumiere-cushion-halo-ring",
    name: "Lumière cushion halo ring",
    collection: "lumiere",
    categories: ["Rings", "Bridal"],
    price: 9400,
    image: "halo-ring",
    alt: "Round diamond in a cushion halo on a split pavé band",
    gallery: [
      { src: "halo-ring", alt: "Cushion halo ring on a black stand" },
      { src: "halo-ring", alt: "Detail of the split pavé shoulders", zoom: "48% 50%" },
      { src: "wedding-bands", alt: "Wedding bands in white and rose gold" },
    ],
    metals: ["Rose gold", "White gold", "Platinum"],
    sizing: "ring",
    summary: "A 0.71 ct round brilliant in a cushion halo, with a split shank paved to the midpoint.",
    stones: [
      { label: "Centre stone", value: "Round brilliant diamond, 0.71 ct" },
      { label: "Colour and clarity", value: "F, VS2" },
      { label: "Pavé", value: "52 diamonds, 0.44 ct total" },
      { label: "Origin", value: "Northwest Territories, Canada" },
    ],
    certificate: "Independent grading report no. 7338 5204 12",
  }),
  P({
    slug: "rosier-sapphire-ring",
    name: "Rosier sapphire ring",
    collection: "lumiere",
    categories: ["Rings"],
    price: 7900,
    image: "pink-sapphire-ring",
    alt: "Emerald-cut pink sapphire ring with a diamond halo in rose gold",
    gallery: [
      { src: "pink-sapphire-ring", alt: "Rosier ring, front view" },
      { src: "pink-sapphire-ring", alt: "Detail of the pink sapphire", zoom: "40% 38%" },
      { src: "model-rings", alt: "Rings worn together" },
    ],
    metals: ["Rose gold", "Yellow gold"],
    sizing: "ring",
    summary: "An unheated 2.14 ct Ceylon pink sapphire, step cut, framed by a single row of diamonds.",
    stones: [
      { label: "Centre stone", value: "Pink sapphire, 2.14 ct, unheated" },
      { label: "Origin", value: "Ratnapura, Sri Lanka" },
      { label: "Halo and band", value: "38 round brilliants, 0.31 ct total" },
    ],
    certificate: "Origin report no. CS 24-0917",
  }),
  P({
    slug: "fleur-de-minuit-ring",
    name: "Fleur de minuit ring",
    collection: "lumiere",
    categories: ["Rings"],
    price: 6250,
    image: "gem-flower-ring",
    alt: "Flower ring with amethyst and citrine petals around a diamond centre",
    gallery: [
      { src: "gem-flower-ring", alt: "Fleur de minuit ring, top view" },
      { src: "gem-flower-ring", alt: "Detail of the diamond heart", zoom: "50% 48%" },
    ],
    metals: ["White gold"],
    sizing: "ring",
    summary: "Six pear petals of amethyst and citrine, each outlined in diamonds, open around a pavé heart.",
    stones: [
      { label: "Petals", value: "4 amethysts and 2 citrines, 3.62 ct total" },
      { label: "Pavé", value: "71 diamonds, 0.58 ct total" },
      { label: "Origin", value: "Minas Gerais, Brazil" },
    ],
  }),
  P({
    slug: "lumiere-cushion-pendant",
    name: "Lumière cushion pendant",
    collection: "lumiere",
    categories: ["Necklaces"],
    price: 8900,
    image: "diamond-pendant",
    alt: "Round diamond in a cushion halo pendant on a box chain",
    gallery: [
      { src: "diamond-pendant", alt: "Cushion pendant on its box chain" },
      { src: "diamond-pendant", alt: "Detail of the halo", zoom: "50% 70%" },
      { src: "necklace-model", alt: "A pendant worn close to the collarbone" },
    ],
    metals: ["White gold", "Platinum"],
    sizing: "necklace",
    summary: "A 1.10 ct round brilliant in a double cushion halo, hung from a pavé bail on a fine box chain.",
    stones: [
      { label: "Centre stone", value: "Round brilliant diamond, 1.10 ct" },
      { label: "Colour and clarity", value: "G, VS1" },
      { label: "Halo and bail", value: "64 diamonds, 0.52 ct total" },
      { label: "Origin", value: "Recycled diamond" },
    ],
    certificate: "Independent grading report no. 7351 0042 88",
    isNew: true,
  }),
  P({
    slug: "lumiere-open-heart-pendant",
    name: "Lumière open heart pendant",
    collection: "lumiere",
    categories: ["Necklaces"],
    price: 3850,
    image: "heart-necklace",
    alt: "Open heart pendant set with small diamonds on a white gold chain",
    gallery: [
      { src: "heart-necklace", alt: "Open heart pendant" },
      { src: "heart-necklace", alt: "Detail of the pavé heart", zoom: "50% 70%" },
    ],
    metals: ["White gold", "Rose gold"],
    sizing: "necklace",
    summary: "A floating heart of 22 diamonds, open at the centre so it sits flat and catches light from behind.",
    stones: [
      { label: "Diamonds", value: "22 round brilliants, 0.27 ct total" },
      { label: "Colour and clarity", value: "F-G, VS" },
    ],
  }),
  P({
    slug: "lumiere-solitaire-pendant",
    name: "Lumière solitaire pendant",
    collection: "lumiere",
    categories: ["Necklaces"],
    price: 5600,
    image: "silver-chain",
    alt: "Small cushion diamond pendant on a long white gold box chain",
    gallery: [
      { src: "silver-chain", alt: "Solitaire pendant on its chain" },
      { src: "silver-chain", alt: "Detail of the pendant", zoom: "50% 80%" },
    ],
    metals: ["White gold", "Yellow gold"],
    sizing: "necklace",
    summary: "A cushion cluster pendant that reads as a single stone, on an adjustable box chain.",
    stones: [
      { label: "Diamonds", value: "17 diamonds, 0.61 ct total" },
      { label: "Colour and clarity", value: "G, VS2" },
    ],
  }),
  P({
    slug: "lumiere-sapphire-drop-earrings",
    name: "Lumière sapphire drop earrings",
    collection: "lumiere",
    categories: ["Earrings"],
    price: 12500,
    image: "sapphire-earrings",
    alt: "Pear sapphire drop earrings framed in baguette and round diamonds",
    gallery: [
      { src: "sapphire-earrings", alt: "Sapphire drop earrings on a leaf" },
      { src: "sapphire-earrings", alt: "Detail of the sapphire and baguettes", zoom: "46% 66%" },
      { src: "earring-model", alt: "Earrings worn" },
    ],
    metals: ["White gold"],
    sizing: "none",
    summary: "Two matched pear sapphires, each in a geometric frame of baguette and round diamonds.",
    stones: [
      { label: "Sapphires", value: "2 pear sapphires, 3.08 ct total, heated" },
      { label: "Origin", value: "Madagascar" },
      { label: "Diamonds", value: "84 baguette and round, 1.46 ct total" },
    ],
    certificate: "Origin report no. CS 24-1133",
  }),
  P({
    slug: "lumiere-riviere-bracelet",
    name: "Lumière rivière bracelet",
    collection: "lumiere",
    categories: ["Bracelets"],
    price: 18200,
    image: "diamond-bracelet-dark",
    alt: "White gold bracelet of open links set with round diamonds",
    gallery: [
      { src: "diamond-bracelet-dark", alt: "Rivière bracelet on black" },
      { src: "diamond-bracelet-dark", alt: "Detail of an open link", zoom: "56% 46%" },
      { src: "wrist-bracelet", alt: "A bracelet worn at the wrist" },
    ],
    metals: ["White gold", "Platinum"],
    sizing: "bracelet",
    summary: "Seven round diamonds set between open pavé links, articulated so the bracelet falls like fabric.",
    stones: [
      { label: "Principal stones", value: "7 round brilliants, 2.10 ct total" },
      { label: "Colour and clarity", value: "F-G, VS" },
      { label: "Pavé", value: "212 diamonds, 1.84 ct total" },
    ],
    certificate: "Independent grading reports supplied for each principal stone",
  }),
  P({
    slug: "guirlande-bracelet",
    name: "Guirlande bracelet",
    collection: "lumiere",
    categories: ["Bracelets"],
    price: 5300,
    image: "rose-gold-bracelet",
    alt: "Rose gold bangle of scrolling links set with diamonds",
    gallery: [
      { src: "rose-gold-bracelet", alt: "Guirlande bracelet on blush paper" },
      { src: "rose-gold-bracelet", alt: "Detail of the scroll links", zoom: "50% 50%" },
    ],
    metals: ["Rose gold", "Yellow gold"],
    sizing: "bracelet",
    summary: "A garland of scrolling links in rose gold, each set with a line of small diamonds.",
    stones: [{ label: "Diamonds", value: "96 round brilliants, 0.74 ct total" }],
  }),
  P({
    slug: "perle-de-seine-akoya-strand",
    name: "Perle de Seine Akoya strand",
    collection: "perle",
    categories: ["Necklaces", "Bridal"],
    price: 6400,
    image: "pearl-box",
    alt: "Akoya pearl strand with a diamond clasp in its presentation box",
    gallery: [
      { src: "pearl-box", alt: "Akoya strand in its box" },
      { src: "pearl-box", alt: "Detail of the pearls and clasp", zoom: "44% 58%" },
    ],
    metals: ["White gold", "Yellow gold"],
    sizing: "necklace",
    summary: "Fifty-six Akoya pearls of 7.0 to 7.5 mm, matched for lustre and knotted on silk, with a pavé clasp.",
    stones: [
      { label: "Pearls", value: "56 Akoya pearls, 7.0-7.5 mm" },
      { label: "Lustre and surface", value: "AAA, very clean" },
      { label: "Clasp", value: "18 diamonds, 0.12 ct total" },
      { label: "Origin", value: "Ago Bay, Japan" },
    ],
  }),
  P({
    slug: "perle-de-seine-pendant",
    name: "Perle de Seine pendant",
    collection: "perle",
    categories: ["Necklaces"],
    price: 1950,
    image: "pearl-pendant-model",
    alt: "A single Akoya pearl drop on a fine gold chain, worn",
    gallery: [
      { src: "pearl-pendant-model", alt: "Pearl pendant worn" },
      { src: "pearl-pendant-model", alt: "Detail of the pearl", zoom: "46% 58%" },
    ],
    metals: ["Yellow gold", "White gold"],
    sizing: "necklace",
    summary: "One 8.5 mm Akoya pearl on a gold bail, hung from a trace chain that stops at the collarbone.",
    stones: [
      { label: "Pearl", value: "Akoya, 8.5 mm, AAA" },
      { label: "Origin", value: "Ago Bay, Japan" },
    ],
    isNew: true,
  }),
  P({
    slug: "perle-de-seine-goutte-necklace",
    name: "Perle de Seine goutte necklace",
    collection: "perle",
    categories: ["Necklaces"],
    price: 1480,
    image: "necklace-model",
    alt: "A small pearl drop on a fine gold chain, worn with a white shirt",
    gallery: [
      { src: "necklace-model", alt: "Goutte necklace worn" },
      { src: "necklace-model", alt: "Detail of the drop", zoom: "46% 48%" },
    ],
    metals: ["Yellow gold"],
    sizing: "necklace",
    summary: "A 6 mm seed pearl drop, light enough to wear every day, on a 42 cm trace chain.",
    stones: [{ label: "Pearl", value: "Akoya, 6.0 mm, AA+" }],
  }),
  P({
    slug: "or-vivant-marine-link-bracelet",
    name: "Or Vivant marine link bracelet",
    collection: "or-vivant",
    categories: ["Bracelets"],
    price: 4200,
    image: "gold-link-bracelet",
    alt: "Yellow gold marine link bracelet resting on an open book",
    gallery: [
      { src: "gold-link-bracelet", alt: "Marine link bracelet" },
      { src: "gold-link-bracelet", alt: "Detail of the links", zoom: "46% 42%" },
      { src: "wrist-bracelet", alt: "Bracelet worn" },
    ],
    metals: ["Yellow gold", "Rose gold"],
    sizing: "bracelet",
    summary: "Hand-assembled marine links with a hidden box clasp. 18.6 g of recycled 18k gold.",
    stones: [{ label: "Stones", value: "None. 18.6 g of recycled 18k gold" }],
  }),
  P({
    slug: "or-vivant-twist-hoops",
    name: "Or Vivant twist hoops",
    collection: "or-vivant",
    categories: ["Earrings"],
    price: 1850,
    image: "gold-hoops",
    alt: "Twisted gold hoop earrings beside a pebble in hard light",
    gallery: [
      { src: "gold-hoops", alt: "Twist hoops in afternoon light" },
      { src: "gold-hoops", alt: "Detail of the twist", zoom: "58% 46%" },
    ],
    metals: ["Yellow gold"],
    sizing: "none",
    summary: "Hollow twisted hoops, 18 mm across, light on the ear and closed with a hinged latch.",
    stones: [{ label: "Stones", value: "None. 5.2 g of recycled 18k gold, the pair" }],
  }),
  P({
    slug: "or-vivant-huggies",
    name: "Or Vivant huggies",
    collection: "or-vivant",
    categories: ["Earrings"],
    price: 980,
    image: "earring-model",
    alt: "Small gold huggie earrings worn with a fine chain",
    gallery: [
      { src: "earring-model", alt: "Huggies worn" },
      { src: "earring-model", alt: "Detail of the huggie", zoom: "58% 34%" },
    ],
    metals: ["Yellow gold", "Rose gold", "White gold"],
    sizing: "none",
    summary: "Softly ridged huggies, 12 mm, made to be slept in and never taken off.",
    stones: [{ label: "Stones", value: "None. 3.4 g of recycled 18k gold, the pair" }],
  }),
  P({
    slug: "or-vivant-croissant-pendant",
    name: "Or Vivant croissant pendant",
    collection: "or-vivant",
    categories: ["Necklaces"],
    price: 2980,
    image: "gold-chain-warm",
    alt: "Crescent pendant set with small diamonds, layered with a blue topaz pendant",
    gallery: [
      { src: "gold-chain-warm", alt: "Croissant pendant layered with a topaz" },
      { src: "gold-chain-warm", alt: "Detail of the crescent", zoom: "56% 78%" },
    ],
    metals: ["Yellow gold"],
    sizing: "necklace",
    summary: "A crescent moon in recycled gold with nine set diamonds, shown layered with a London blue topaz.",
    stones: [
      { label: "Diamonds", value: "9 round brilliants, 0.09 ct total" },
      { label: "Topaz (sold separately)", value: "London blue, 1.8 ct" },
    ],
  }),
  P({
    slug: "or-vivant-layered-chains",
    name: "Or Vivant layered chains",
    collection: "or-vivant",
    categories: ["Necklaces"],
    price: 2300,
    image: "layered-necklaces",
    alt: "Three fine gold chains layered, worn with a bangle and rings",
    gallery: [
      { src: "layered-necklaces", alt: "Layered chains worn" },
      { src: "layered-necklaces", alt: "Detail of the chains", zoom: "50% 40%" },
    ],
    metals: ["Yellow gold"],
    sizing: "necklace",
    summary: "Three fine chains at 40, 45 and 50 cm, joined at one clasp so they never tangle.",
    stones: [{ label: "Diamonds", value: "3 bezel-set diamonds, 0.12 ct total" }],
  }),
  P({
    slug: "or-vivant-stacking-rings",
    name: "Or Vivant stacking rings",
    collection: "or-vivant",
    categories: ["Rings"],
    price: 3650,
    image: "gold-rings-stack",
    alt: "Three stacked gold rings set with pavé diamonds",
    gallery: [
      { src: "gold-rings-stack", alt: "Stacking rings" },
      { src: "gold-rings-stack", alt: "Detail of the pavé", zoom: "50% 50%" },
      { src: "model-rings", alt: "Rings worn" },
    ],
    metals: ["Yellow gold", "Rose gold"],
    sizing: "ring",
    summary: "A set of three: a textured band, a pavé heart and a baguette band. Worn together or apart.",
    stones: [{ label: "Diamonds", value: "58 round and baguette, 0.66 ct total" }],
  }),
  P({
    slug: "galet-signet-rings",
    name: "Galet signet ring",
    collection: "or-vivant",
    categories: ["Rings"],
    price: 2450,
    image: "rings-on-stone",
    alt: "Gold rings with chrysoprase and carnelian cabochons on a pale stone",
    gallery: [
      { src: "rings-on-stone", alt: "Galet rings on a stone" },
      { src: "rings-on-stone", alt: "Detail of the cabochons", zoom: "52% 30%" },
    ],
    metals: ["Yellow gold", "Rose gold"],
    sizing: "ring",
    summary: "A pebble-shaped signet with a polished cabochon of chrysoprase, carnelian or white gold.",
    stones: [{ label: "Cabochon", value: "Chrysoprase or carnelian, 9 x 7 mm" }],
  }),
  P({
    slug: "petit-coeur-ring",
    name: "Petit coeur ring",
    collection: "or-vivant",
    categories: ["Rings"],
    price: 1480,
    image: "ring-tray",
    alt: "Small gold rings with heart and flower motifs in a velvet tray",
    gallery: [
      { src: "ring-tray", alt: "Petit coeur rings in a tray" },
      { src: "ring-tray", alt: "Detail of the heart", zoom: "40% 44%" },
    ],
    metals: ["Rose gold", "Yellow gold"],
    sizing: "ring",
    summary: "A small pavé heart on a 1.6 mm band, first made for Hélène Orvel's goddaughters in 1979.",
    stones: [{ label: "Diamonds", value: "14 round brilliants, 0.08 ct total" }],
  }),
  P({
    slug: "alliance-wedding-bands",
    name: "Alliance wedding bands",
    collection: "or-vivant",
    categories: ["Rings", "Bridal"],
    price: 3200,
    image: "wedding-bands",
    alt: "A pair of wedding bands in white and rose gold on white silk",
    gallery: [
      { src: "wedding-bands", alt: "Alliance bands on silk" },
      { src: "wedding-bands", alt: "Detail of the two-tone band", zoom: "50% 50%" },
    ],
    metals: ["White gold", "Rose gold", "Platinum"],
    sizing: "ring",
    summary: "Comfort-fit bands, 4 mm and 3 mm, sold as a pair. Engraving inside is included.",
    stones: [{ label: "Stones", value: "None. Price shown for the pair" }],
  }),
  P({
    slug: "or-vivant-fine-chain-bracelet",
    name: "Or Vivant fine chain bracelet",
    collection: "or-vivant",
    categories: ["Bracelets"],
    price: 890,
    image: "wrist-bracelet",
    alt: "A fine gold chain bracelet worn on a raised wrist",
    gallery: [
      { src: "wrist-bracelet", alt: "Fine chain bracelet worn" },
      { src: "wrist-bracelet", alt: "Detail of the chain", zoom: "44% 52%" },
    ],
    metals: ["Yellow gold", "Rose gold"],
    sizing: "bracelet",
    summary: "A 1.2 mm trace chain with a single bezel-set diamond at the clasp.",
    stones: [{ label: "Diamond", value: "1 round brilliant, 0.03 ct" }],
  }),
];

export const collectionById = (id: CollectionId) => COLLECTIONS.find((c) => c.id === id) ?? COLLECTIONS[0];
export const productBySlug = (slug: string) => PRODUCTS.find((p) => p.slug === slug) ?? PRODUCTS[0];

export const formatPrice = (value: number) =>
  "$" + Math.round(value).toLocaleString("en-US");

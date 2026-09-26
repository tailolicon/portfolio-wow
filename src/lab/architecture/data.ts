import { demoImg } from "../../demos/shared";

export const img = (name: string) => demoImg("lab-architecture", name);

export type Sector = "Residential" | "Cultural" | "Workplace" | "Hospitality";
export type Status = "Completed" | "On site" | "In design";

export const SECTORS: Sector[] = ["Residential", "Cultural", "Workplace", "Hospitality"];
export const STATUSES: Status[] = ["Completed", "On site", "In design"];

export type Shot = { src: string; alt: string };

export type Project = {
  slug: string;
  name: string;
  location: string;
  year: number;
  sector: Sector;
  status: Status;
  completion: string;
  client: string;
  area: number;
  summary: string;
  hero: Shot;
  /** Image sequence after the narrative. Rendered in a fixed rhythm of layouts. */
  shots: Shot[];
  team: string[];
  collaborators: [string, string][];
  awards: string[];
  sections: { title: string; body: string[] }[];
  drawing: "house" | "courtyard" | "floorplate" | "pavilion";
  quote?: { text: string; by: string };
};

const shot = (name: string, alt: string): Shot => ({ src: img(name), alt });

export const PROJECTS: Project[] = [
  {
    slug: "hollow-lane",
    name: "Hollow Lane House",
    location: "Chiltern Hills, Buckinghamshire",
    year: 2023,
    sector: "Residential",
    status: "Completed",
    completion: "Completed June 2023",
    client: "Private",
    area: 412,
    summary:
      "A family house set into a beech-wood clearing, built in charred larch, lime render and a single long oak roof.",
    hero: shot("house-garden-night", "Hollow Lane House at dusk, lit from within beneath a mature oak"),
    shots: [
      shot("living-glass", "Living room opening fully to the garden through sliding glazing"),
      shot("living-timber", "Kitchen and dining space under the oak-lined roof"),
      shot("stair-interior", "The timber stair rising through the double-height hall"),
      shot("bath-stone", "Principal bathroom in honed limestone with a clerestory window"),
      shot("living-garden", "The snug looking west over the lawn"),
    ],
    team: ["Tomi Oyelaran", "Marcus Lindqvist", "Priya Nandakumar", "Owen Fairley"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Landscape", "Field Office Landscape"],
      ["Services", "Haverstock Environmental"],
      ["Contractor", "Grange & Tull Builders"],
    ],
    awards: ["Hanbury Prize for Housing 2024, winner", "Beechwood Design Award 2023"],
    sections: [
      {
        title: "Brief",
        body: [
          "The clients, a surgeon and a garden designer with three teenage children, bought a derelict 1960s bungalow in a clearing on the edge of an Area of Outstanding Natural Beauty. They asked for a house that would disappear into the wood from the lane but open completely to the south.",
        ],
      },
      {
        title: "Site and planning",
        body: [
          "The bungalow's footprint set the limit for the new house under local policy. We kept the ridge height within 300mm of the original and pushed the extra accommodation into a lower ground floor cut into the slope, which falls 3.4m across the plot.",
          "An arboricultural survey identified a 180-year-old oak as the anchor of the site. The plan bends around its root protection area, and the living room frames its canopy.",
        ],
      },
      {
        title: "Materials",
        body: [
          "The upper storey is clad in Siberian larch charred on site, the base in lime render tinted with local flint dust. Inside, a continuous oak ceiling runs 27m from the entrance to the terrace. Every window is set deep in the wall to shade the glass in summer.",
        ],
      },
      {
        title: "Performance",
        body: [
          "A ground source heat pump, mechanical ventilation with heat recovery and 42 roof-mounted PV panels bring measured operational energy to 38 kWh/m² a year, verified over the first twelve months of occupation.",
        ],
      },
    ],
    drawing: "house",
    quote: { text: "We asked for a house that would hide from the lane. What we got is one we never want to leave in the evening.", by: "Dr Anna Whitcombe, client" },
  },
  {
    slug: "kirkgate-library",
    name: "Kirkgate Library and Archive",
    location: "Leeds",
    year: 2022,
    sector: "Cultural",
    status: "Completed",
    completion: "Opened September 2022",
    client: "Leeds City Council",
    area: 3860,
    summary:
      "An extension to a Victorian public library that adds a reading hall, a climate-controlled city archive and a new entrance on the square.",
    hero: shot("museum-angular", "The folded glass and panel facade of the new reading hall"),
    shots: [
      shot("lounge-clerestory", "Reading room lit by a continuous clerestory"),
      shot("hallway-mirror", "Gallery corridor linking the old library to the extension"),
      shot("stair-interior", "The public stair between the archive and reading hall"),
      shot("office-glass", "Glazed study rooms along the east wall"),
    ],
    team: ["Eleanor Hart", "Ruth Adebayo", "Callum Reid", "Sofia Mendes", "Jonah Pike"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Conservation", "Aldous Heritage Consultants"],
      ["Environmental", "Haverstock Environmental"],
      ["Cost consultant", "Brennan Moss"],
    ],
    awards: ["Civic Building of the Year 2023, shortlisted", "Northern Civic Awards 2023, public building"],
    sections: [
      {
        title: "Brief",
        body: [
          "The council needed to bring the city archive, then split across three buildings, under one roof and give the Grade II listed library a front door on the new Kirkgate Square. The library stayed open for all but eleven weeks of construction.",
        ],
      },
      {
        title: "Approach",
        body: [
          "The extension is a single reading hall wrapped around a sealed archive store. Its folded facade takes its angles from the sightlines across the square, so the old library's clock tower stays visible from every approach.",
          "Inside, one long public stair connects the entrance, the reading hall and a roof terrace. The archive sits in the middle of the plan, where temperature and humidity are easiest to hold steady.",
        ],
      },
      {
        title: "Heritage",
        body: [
          "We removed a 1970s annexe and repaired the Victorian rear elevation, reopening four blind windows. The junction between old and new is a glazed slot 2.4m wide, so each building reads on its own.",
        ],
      },
    ],
    drawing: "courtyard",
    quote: { text: "Visits to the archive have tripled since opening. People come for the reading hall and stay for the records.", by: "Martin Oakes, city archivist, Leeds" },
  },
  {
    slug: "st-john-street",
    name: "St John Street Workplace",
    location: "Clerkenwell, London",
    year: 2024,
    sector: "Workplace",
    status: "Completed",
    completion: "Completed March 2024",
    client: "Halden & Rowe",
    area: 2140,
    summary:
      "A refit of a 1920s printworks for a 180-person design consultancy, with the concrete frame left exposed and every desk within 7m of a window.",
    hero: shot("office-open", "Open studio floor under exposed services in the former printworks"),
    shots: [
      shot("office-glass", "Steel-framed meeting rooms along the central spine"),
      shot("lounge-clerestory", "The ground floor lounge used for talks and client events"),
      shot("dining-light", "The staff kitchen overlooking the rear yard"),
    ],
    team: ["Eleanor Hart", "Daniel Okafor", "Hannah Crewe"],
    collaborators: [
      ["Services", "Tollbridge MEP"],
      ["Lighting", "Lux Parallel"],
      ["Project manager", "Carver Stone"],
    ],
    awards: ["London Workplace Awards 2024, best refurbishment"],
    sections: [
      {
        title: "Brief",
        body: [
          "Halden & Rowe had outgrown two floors in Shoreditch. They wanted a single building where the whole company could see each other working, and a ground floor they could open to the neighbourhood in the evenings.",
        ],
      },
      {
        title: "Approach",
        body: [
          "We stripped out four decades of suspended ceilings and partitions to reveal the original concrete frame. A new steel and glass spine runs the length of each floor and holds meeting rooms, phone booths and storage, keeping the perimeter free for desks.",
          "Reusing the structure saved an estimated 1,140 tonnes of embodied carbon against a rebuild. Over 60% of the furniture came from the client's previous office.",
        ],
      },
    ],
    drawing: "floorplate",
    quote: { text: "For the first time in ten years the whole company can see itself at work.", by: "Imogen Rowe, co-founder, Halden & Rowe" },
  },
  {
    slug: "casa-pinhal",
    name: "Casa Pinhal Hotel",
    location: "Comporta, Portugal",
    year: 2027,
    sector: "Hospitality",
    status: "On site",
    completion: "Opening spring 2027",
    client: "Pinhal Hospitality",
    area: 5320,
    summary:
      "A 34-key hotel in a cork and umbrella-pine forest, arranged as low white pavilions around a sequence of courtyards and pools.",
    hero: shot("villa-white", "Whitewashed guest pavilion among pines in Comporta"),
    shots: [
      shot("pavilion-pool", "The main pool beneath the dining pavilion canopy"),
      shot("villa-terrace", "A garden suite with its private plunge pool"),
      shot("bedroom", "Guest room with a timber floor and linen curtains"),
      shot("bath-stone", "Suite bathroom in local limestone"),
      shot("dining-light", "Breakfast room facing the eastern courtyard"),
    ],
    team: ["Tomi Oyelaran", "Sofia Mendes", "Inês Carvalho", "Marcus Lindqvist"],
    collaborators: [
      ["Local architect", "Atelier Sado"],
      ["Structural engineer", "Ribeiro Faria Engenharia"],
      ["Landscape", "Field Office Landscape"],
      ["Interiors", "Oyelaran Hart with Casa Morena"],
    ],
    awards: [],
    sections: [
      {
        title: "Brief",
        body: [
          "The client owns 11 hectares of protected pine forest between the rice fields and the dunes. Planning allowed building on less than 5% of the land. The hotel had to feel like a village rather than a resort.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Guest rooms are split across fourteen single-storey pavilions, none taller than the surrounding pine canopy. Paths are raised on timber boardwalks to protect the sandy ground and root systems.",
          "Walls are built in rammed earth from the excavations and finished in lime wash. Roofs are planted with native sea thrift and rock rose.",
        ],
      },
      {
        title: "Progress",
        body: [
          "The first nine pavilions are now weathertight and interior fit-out has begun. Landscape planting starts this winter so the gardens have a full season to settle before the first guests arrive.",
        ],
      },
    ],
    drawing: "courtyard",
    quote: { text: "They drew the pine trees before they drew a single room. That told us we had chosen the right architects.", by: "Joana Reis, founder, Pinhal Hospitality" },
  },
  {
    slug: "harrowden-pavilion",
    name: "Harrowden Sculpture Pavilion",
    location: "Harrowden, Northamptonshire",
    year: 2021,
    sector: "Cultural",
    status: "Completed",
    completion: "Opened May 2021",
    client: "Harrowden Sculpture Trust",
    area: 640,
    summary:
      "A gallery and visitor pavilion in a former quarry, its curved walls made from 62,000 hand-pressed terracotta fins.",
    hero: shot("facade-terracotta", "Curved terracotta fins of the pavilion against a clear sky"),
    shots: [
      shot("facade-curves", "Detail of the curving elevation"),
      shot("lounge-clerestory", "Gallery interior lit from a continuous roof light"),
      shot("hallway-mirror", "Entrance corridor to the main gallery"),
    ],
    team: ["Eleanor Hart", "Ruth Adebayo", "Owen Fairley"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Terracotta", "Kiln & Clay Works"],
      ["Contractor", "Ashbourne Construction"],
    ],
    awards: ["Brick and Clay Award 2021, gold", "Plan & Section Building of the Year 2021, shortlisted"],
    sections: [
      {
        title: "Brief",
        body: [
          "The trust needed a place to show works on paper and small bronzes, which cannot stay outdoors, and a building that would itself belong in a sculpture park.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Two curving walls follow the edge of the old quarry face. Between them sits a single gallery lit entirely from above. The terracotta fins are fired from clay dug 40 miles away and turn from ochre to deep red as the light moves.",
        ],
      },
    ],
    drawing: "pavilion",
  },
  {
    slug: "alcantara-quay",
    name: "Alcântara Quay Housing",
    location: "Lisbon, Portugal",
    year: 2024,
    sector: "Residential",
    status: "Completed",
    completion: "Completed October 2024",
    client: "Cooperativa Tejo Habitação",
    area: 11480,
    summary:
      "128 cooperative homes on a former dockyard, with deep curved balconies that shade every flat from the afternoon sun.",
    hero: shot("facade-curves", "Curved white balconies of the housing block seen from the courtyard"),
    shots: [
      shot("apartment-facade", "The street elevation facing Rua da Cordoaria"),
      shot("living-glass", "A two-bedroom flat opening onto its balcony"),
      shot("bedroom", "Bedroom in a corner flat"),
    ],
    team: ["Tomi Oyelaran", "Inês Carvalho", "Sofia Mendes", "Callum Reid"],
    collaborators: [
      ["Local architect", "Atelier Sado"],
      ["Structural engineer", "Ribeiro Faria Engenharia"],
      ["Environmental", "Haverstock Environmental"],
    ],
    awards: ["Prémio Habitar 2025, collective housing"],
    sections: [
      {
        title: "Brief",
        body: [
          "A housing cooperative of 128 households asked for homes they could afford to run as well as buy. Every flat needed cross ventilation and outdoor space large enough to eat at.",
        ],
      },
      {
        title: "Approach",
        body: [
          "The block wraps a planted courtyard open to the river. Balconies are 2.2m deep and curve to follow the path of the sun, so no flat needs air conditioning. Shared laundries, workshops and a roof garden are run by the residents.",
        ],
      },
    ],
    drawing: "courtyard",
  },
  {
    slug: "cedar-house",
    name: "Cedar House",
    location: "Hampstead, London",
    year: 2022,
    sector: "Residential",
    status: "Completed",
    completion: "Completed February 2022",
    client: "Private",
    area: 386,
    summary:
      "A new house on a sloping plot in a conservation area, in white brick and western red cedar, arranged over three split levels.",
    hero: shot("house-timber", "Cedar House from the garden, white brick and cedar volumes"),
    shots: [
      shot("living-garden", "Living room with a long clerestory above the garden"),
      shot("lounge-clerestory", "The family room on the lower level"),
      shot("stair-interior", "Split-level stair"),
    ],
    team: ["Eleanor Hart", "Priya Nandakumar", "Hannah Crewe"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Landscape", "Wilde Gardens"],
      ["Contractor", "Harcourt Build"],
    ],
    awards: ["Hanbury Prize for Housing 2022, commended"],
    sections: [
      {
        title: "Brief",
        body: [
          "A replacement for a poorly extended 1950s house. The owners, both musicians, wanted a music room that would not disturb the neighbours and a garden that felt like part of the house.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Three levels step down the slope, each half a storey apart, so every room looks onto the garden. The music room sits in the brick base, acoustically isolated on its own slab.",
        ],
      },
    ],
    drawing: "house",
  },
  {
    slug: "lindenhof",
    name: "Lindenhof Workplace",
    location: "Frankfurt, Germany",
    year: 2023,
    sector: "Workplace",
    status: "Completed",
    completion: "Completed November 2023",
    client: "Kessler Bank",
    area: 8950,
    summary:
      "Nine floors of a 1990s tower remade for hybrid work, with a new sky lobby, a staircase cut through four floors and a public ground floor.",
    hero: shot("towers-fog", "The Lindenhof tower rising into low cloud"),
    shots: [
      shot("towers-glass", "The tower among its neighbours in the banking district"),
      shot("office-glass", "Team rooms along the new internal stair"),
      shot("office-open", "Open floor with shared tables"),
    ],
    team: ["Eleanor Hart", "Daniel Okafor", "Marcus Lindqvist", "Jonah Pike"],
    collaborators: [
      ["Executive architect", "Brandt Vogel Architekten"],
      ["Structural engineer", "Weiss Engineering"],
      ["Lighting", "Lux Parallel"],
    ],
    awards: ["European Office Design Awards 2024, refurbishment, shortlisted"],
    sections: [
      {
        title: "Brief",
        body: [
          "The bank had reduced its Frankfurt headcount by a third and wanted fewer, better floors. The brief asked for places to meet, not places to sit.",
        ],
      },
      {
        title: "Approach",
        body: [
          "We cut a new stair through four floors to connect teams that had only ever met in lifts. Desks were reduced to 0.6 per person and the space released became team rooms, a library and a sky lobby on the 21st floor.",
        ],
      },
    ],
    drawing: "floorplate",
  },
  {
    slug: "casa-do-sal",
    name: "Casa do Sal",
    location: "Melides, Portugal",
    year: 2021,
    sector: "Residential",
    status: "Completed",
    completion: "Completed August 2021",
    client: "Private",
    area: 290,
    summary:
      "A holiday house of white cubic volumes on a south-facing slope above the lagoon, built around a shaded patio.",
    hero: shot("house-white-cubic", "White cubic volumes of Casa do Sal with a pine behind"),
    shots: [
      shot("villa-terrace", "The pool terrace facing the lagoon"),
      shot("living-glass", "Living room opening onto the patio"),
      shot("bath-stone", "Bathroom in local stone"),
    ],
    team: ["Tomi Oyelaran", "Inês Carvalho"],
    collaborators: [
      ["Local architect", "Atelier Sado"],
      ["Structural engineer", "Ribeiro Faria Engenharia"],
    ],
    awards: [],
    sections: [
      {
        title: "Brief",
        body: [
          "A London family wanted a summer house for three generations, with rooms that could be closed off in winter and a patio that stays cool at midday.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Five whitewashed volumes cluster around a patio shaded by a single fig tree. Walls are 600mm thick and windows small on the west, so the house needs no cooling.",
        ],
      },
    ],
    drawing: "courtyard",
  },
  {
    slug: "parkhill-road",
    name: "Parkhill Road",
    location: "Belsize Park, London",
    year: 2020,
    sector: "Residential",
    status: "Completed",
    completion: "Completed April 2020",
    client: "Private",
    area: 245,
    summary:
      "The retrofit of a 1970s townhouse, reclad in green render and zinc, with a new top floor and a kitchen that opens to the garden.",
    hero: shot("house-dusk", "Parkhill Road at dusk, green render and a lit entrance"),
    shots: [
      shot("dining-light", "Kitchen and dining room facing the garden"),
      shot("hallway-mirror", "Entrance hall with bespoke oak joinery"),
    ],
    team: ["Eleanor Hart", "Hannah Crewe"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Contractor", "Harcourt Build"],
    ],
    awards: ["North London Retrofit Prize 2021"],
    sections: [
      {
        title: "Brief",
        body: [
          "Rather than demolish, the owners wanted to keep the frame of a tired 1970s house and bring it to near Passivhaus standard.",
        ],
      },
      {
        title: "Approach",
        body: [
          "We wrapped the house in 200mm of wood fibre insulation, rebuilt the top floor in timber and replaced every window. Heating demand fell from 164 to 29 kWh/m² a year.",
        ],
      },
    ],
    drawing: "house",
  },
  {
    slug: "peckham-rye-mews",
    name: "Peckham Rye Mews",
    location: "Peckham, London",
    year: 2028,
    sector: "Residential",
    status: "In design",
    completion: "Planning granted, on site from spring 2027",
    client: "Southwark Homes",
    area: 6120,
    summary:
      "64 council homes in dark brick around a shared mews, with family homes at ground level and flats above.",
    hero: shot("apartment-facade", "Dark brick elevation with recessed balconies"),
    shots: [
      shot("living-garden", "Visualisation of a three-bedroom family home"),
      shot("architect-drawing", "Design development of the mews elevation"),
    ],
    team: ["Tomi Oyelaran", "Ruth Adebayo", "Callum Reid"],
    collaborators: [
      ["Structural engineer", "Price Wardle Engineers"],
      ["Landscape", "Field Office Landscape"],
      ["Planning", "Marsh Planning"],
    ],
    awards: [],
    sections: [
      {
        title: "Brief",
        body: [
          "Southwark Homes asked for 60 to 70 homes for social rent on a former garage site, with at least a third suitable for families.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Twenty family houses line a new car-free mews, each with its own front door and garden. Four storeys of flats sit above, reached by open galleries facing the park.",
        ],
      },
    ],
    drawing: "floorplate",
  },
  {
    slug: "casa-alfama",
    name: "Casa Alfama",
    location: "Lisbon, Portugal",
    year: 2028,
    sector: "Hospitality",
    status: "In design",
    completion: "Opening 2028",
    client: "Mouraria Hotels",
    area: 2480,
    summary:
      "Three 18th-century townhouses joined into a 26-room hotel, with a restaurant in the old stables and a roof terrace over the river.",
    hero: shot("bedroom", "Guest room sample with timber floors and pale linen"),
    shots: [
      shot("dining-light", "Sample dining room fit-out"),
      shot("bath-stone", "Bathroom mock-up in Estremoz marble"),
      shot("architect-drawing", "Working drawings for the stair"),
    ],
    team: ["Sofia Mendes", "Inês Carvalho", "Tomi Oyelaran"],
    collaborators: [
      ["Conservation", "Atelier Sado"],
      ["Structural engineer", "Ribeiro Faria Engenharia"],
    ],
    awards: [],
    sections: [
      {
        title: "Brief",
        body: [
          "The client acquired three adjoining townhouses on a stepped street in Alfama. The brief is to make one hotel without losing the character of three houses.",
        ],
      },
      {
        title: "Approach",
        body: [
          "Each house keeps its own stair and its own colour. A new courtyard is opened at the back, where the stables become a 40-cover restaurant.",
        ],
      },
    ],
    drawing: "pavilion",
  },
];

export const projectBySlug = (slug: string) => PROJECTS.find((p) => p.slug === slug) ?? PROJECTS[0];

export const PAGES = ["home", "product", "pricing", "customers", "story", "demo", "start"] as const;
export type Page = (typeof PAGES)[number];

/* ------------------------------------------------------------------ product data */

export type Point = { label: string; value: number };

/** Weekly active teams, last 13 weeks (hero answer). */
export const activeTeams: Point[] = [
  ["Jun 29", 4112], ["Jul 6", 4150], ["Jul 13", 4098], ["Jul 20", 4203], ["Jul 27", 4236],
  ["Aug 3", 4402], ["Aug 10", 4471], ["Aug 17", 4526], ["Aug 24", 4561], ["Aug 31", 4650],
  ["Sep 7", 4702], ["Sep 14", 4744], ["Sep 21", 4869],
].map(([label, value]) => ({ label: label as string, value: value as number }));

const convDays = [
  3.78, 3.84, 3.91, 3.86, 3.72, 3.69, 3.81, 3.83, 3.88, 3.93, 3.85, 3.74, 3.7, 3.79,
  3.85, 3.82, 3.9, 3.87, 3.76, 3.71, 3.8, 3.21, 3.02, 2.98, 3.05, 2.97, 2.94, 3.06,
];
const convLabels = Array.from({ length: 28 }, (_, i) => {
  const d = new Date(Date.UTC(2026, 7, 26 + i));
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" });
});

/** Checkout conversion (%), daily Aug 26 to Sep 22. Release 7.4.0 shipped Sep 16. */
export const checkoutConversion: Point[] = convDays.map((value, i) => ({ label: convLabels[i], value }));
export const checkoutExpected = { low: 3.66, high: 3.95 };
export const checkoutAnomalyFrom = 21;

export type Driver = { name: string; detail: string; impact: number; confidence: "High" | "Medium" | "Low" };
export const checkoutDrivers: Driver[] = [
  {
    name: "iOS app 7.4.0",
    detail: "Payment sheet fails to load on 12.6% of iOS sessions since the Sep 16 release",
    impact: -0.51,
    confidence: "High",
  },
  {
    name: "Traffic mix: paid social",
    detail: "Share of sessions from paid social rose from 18% to 27%; this segment converts at 1.9%",
    impact: -0.17,
    confidence: "High",
  },
  {
    name: "Card declines, EU",
    detail: "Soft declines up 2.3x at one processor between 18:00 and 23:00 CET",
    impact: -0.07,
    confidence: "Medium",
  },
  { name: "Unexplained", detail: "Residual not attributed to any tested dimension", impact: -0.03, confidence: "Low" },
];

/** Trial to paid conversion, EU, last 30 days (monitor). */
export const trialConversion: Point[] = [
  14.1, 14.4, 13.9, 14.6, 14.2, 13.8, 14.5, 14.9, 14.3, 14.0, 14.7, 14.2, 13.9, 14.4, 14.8,
  14.1, 13.7, 14.3, 14.6, 14.2, 14.0, 14.5, 14.3, 13.9, 14.2, 14.4, 13.6, 12.4, 11.8, 11.2,
].map((value, i) => ({ label: `Day ${i + 1}`, value }));
export const trialExpected = { low: 13.4, high: 15.1 };

export type AskExample = {
  id: string;
  question: string;
  answer: string;
  chart: "line" | "bars";
  unit: string;
  series: Point[];
  sources: string[];
  sql: string;
  runtime: string;
};

export const askExamples: AskExample[] = [
  {
    id: "teams",
    question: "How many teams were active each week over the last quarter?",
    answer:
      "Weekly active teams grew 18.4%, from 4,112 to 4,869. The biggest jump came the week of Aug 3, when the weekly email digest shipped.",
    chart: "line",
    unit: "teams",
    series: activeTeams,
    sources: ["analytics.events", "analytics.accounts"],
    runtime: "1.8s",
    sql: `select date_trunc('week', e.occurred_at) as week,
       count(distinct e.team_id)         as active_teams
from analytics.events e
join analytics.accounts a on a.team_id = e.team_id
where e.occurred_at >= '2026-06-29'
  and a.is_internal = false
group by 1
order by 1;`,
  },
  {
    id: "regions",
    question: "Which regions grew revenue fastest in Q2, compared with Q1?",
    answer:
      "APAC grew fastest at 31.4%, driven by annual renewals in Japan and Australia. EMEA followed at 21.7%. LATAM was the slowest at 9.8%.",
    chart: "bars",
    unit: "%",
    series: [
      { label: "APAC", value: 31.4 },
      { label: "EMEA", value: 21.7 },
      { label: "North America", value: 14.2 },
      { label: "LATAM", value: 9.8 },
    ],
    sources: ["finance.invoices", "crm.accounts"],
    runtime: "2.4s",
    sql: `with q as (
  select a.region, date_trunc('quarter', i.issued_at) as qtr,
         sum(i.amount_usd) as revenue
  from finance.invoices i
  join crm.accounts a using (account_id)
  where i.issued_at >= '2026-01-01' and i.issued_at < '2026-07-01'
  group by 1, 2
)
select region,
       round(100 * (max_by(revenue, qtr) / min_by(revenue, qtr) - 1), 1) as growth_pct
from q group by 1 order by 2 desc;`,
  },
  {
    id: "signups",
    question: "Where did new signups come from in August?",
    answer:
      "Organic search brought 38.1% of August signups. Referrals were second at 22.6%, up from 17.9% in July after the invite credit launched.",
    chart: "bars",
    unit: "%",
    series: [
      { label: "Organic search", value: 38.1 },
      { label: "Referral", value: 22.6 },
      { label: "Paid search", value: 19.4 },
      { label: "Paid social", value: 12.3 },
      { label: "Partners", value: 7.6 },
    ],
    sources: ["marketing.signups"],
    runtime: "0.9s",
    sql: `select first_touch_channel as channel,
       round(100 * count(*) / sum(count(*)) over (), 1) as share_pct
from marketing.signups
where created_at >= '2026-08-01' and created_at < '2026-09-01'
group by 1
order by 2 desc;`,
  },
];

export type Monitor = { metric: string; scope: string; rule: string; channel: string; state: "ok" | "alert" | "muted" };
export const monitors: Monitor[] = [
  { metric: "Trial to paid conversion", scope: "EU", rule: "Outside expected range", channel: "#growth-alerts", state: "alert" },
  { metric: "Checkout conversion", scope: "All platforms", rule: "Drops more than 0.3 pts day over day", channel: "#checkout", state: "ok" },
  { metric: "Net revenue", scope: "Daily", rule: "Outside expected range", channel: "finance@", state: "ok" },
  { metric: "Search to add-to-cart", scope: "Android", rule: "Below 21% for 2 hours", channel: "PagerDuty: Mobile", state: "muted" },
];

/* ------------------------------------------------------------------ customers */

export type Customer = {
  slug: string;
  name: string;
  mark: "ring" | "slash" | "stack" | "half" | "notch" | "grid" | "arc" | "bar";
  style: "lower" | "caps" | "serif" | "heavy";
};

export const logoWall: Customer[] = [
  { slug: "pellam", name: "pellam", mark: "ring", style: "lower" },
  { slug: "corvid", name: "Corvid Health", mark: "half", style: "caps" },
  { slug: "hollis", name: "Hollis Freight", mark: "stack", style: "heavy" },
  { slug: "ferro", name: "Ferro", mark: "slash", style: "serif" },
  { slug: "quillo", name: "quillo", mark: "notch", style: "lower" },
  { slug: "oaklet", name: "Oaklet", mark: "arc", style: "heavy" },
  { slug: "arbor", name: "Arbor & Finch", mark: "bar", style: "serif" },
  { slug: "sundial", name: "SUNDIAL", mark: "grid", style: "caps" },
];

export type Story = {
  slug: string;
  company: string;
  mark: Customer["mark"];
  industry: string;
  size: string;
  hq: string;
  warehouse: string;
  plan: string;
  headline: string;
  summary: string;
  image: string;
  imageAlt: string;
  outcomes: { value: string; label: string }[];
  challenge: string[];
  approach: string[];
  results: string[];
  quote: { text: string; name: string; role: string; portrait: string };
};

export const stories: Story[] = [
  {
    slug: "pellam",
    company: "Pellam",
    mark: "ring",
    industry: "Grocery delivery",
    size: "1,400 employees",
    hq: "Amsterdam",
    warehouse: "Snowflake",
    plan: "Business",
    headline: "Pellam cut ad-hoc data requests by 61% in one quarter",
    summary:
      "Category managers and ops leads now answer their own questions, and the six-person data team finally ships the models that were stuck in the backlog.",
    image: "team-pairing",
    imageAlt: "Two Pellam analysts reviewing a query together at a laptop",
    outcomes: [
      { value: "61%", label: "fewer ad-hoc requests to the data team" },
      { value: "11 min", label: "median time to answer, down from 3.2 days" },
      { value: "412", label: "weekly askers across 9 cities" },
    ],
    challenge: [
      "Pellam runs dark stores in nine European cities. Every morning, category managers want to know what sold out, which promotions worked and why basket size moved. Until last year, each of those questions became a ticket.",
      "The data team was answering around 140 requests a week. The median ticket took 3.2 days, and the dbt models the company actually needed kept slipping.",
    ],
    approach: [
      "The team connected Veyra to Snowflake with a read-only role and imported their existing dbt metrics, so revenue, basket size and availability meant the same thing everywhere.",
      "They started with 30 category managers in Rotterdam, reviewed every answer for two weeks, then opened Veyra to all nine cities. Monitors on stock availability post to each city's ops channel.",
    ],
    results: [
      "Within one quarter, ad-hoc requests fell from about 140 to 55 a week. The requests that remain are genuinely hard ones, which is where the data team wants to spend its time.",
      "Availability monitors flagged a supplier shortfall in Utrecht 5 hours before the first customer complaint, long enough to reroute stock from a nearby store.",
    ],
    quote: {
      text: "We stopped being a ticket queue. My team spends its week on models again, and the questions we still get are the interesting ones.",
      name: "Dana Whitfield",
      role: "Head of Data, Pellam",
      portrait: "woman-blazer",
    },
  },
  {
    slug: "corvid",
    company: "Corvid Health",
    mark: "half",
    industry: "Healthcare software",
    size: "620 employees",
    hq: "Boston",
    warehouse: "BigQuery",
    plan: "Enterprise",
    headline: "Corvid Health caught a broken booking flow in 38 minutes",
    summary:
      "A Veyra monitor on completed bookings spotted an insurance verification failure on a Saturday morning, long before Monday's dashboard review.",
    image: "engineers",
    imageAlt: "Corvid Health engineers working at their desks",
    outcomes: [
      { value: "38 min", label: "from failure to alert on a weekend" },
      { value: "$212k", label: "estimated bookings protected" },
      { value: "0", label: "patient records leaving BigQuery" },
    ],
    challenge: [
      "Corvid's scheduling platform books appointments for 2,300 clinics. Revenue depends on bookings completing, and bookings depend on a chain of third-party insurance checks.",
      "Health data had to stay inside their Google Cloud project, which ruled out every analytics tool that copied data into its own storage.",
    ],
    approach: [
      "Veyra runs every query inside BigQuery under Corvid's service account, and row-level policies carry over automatically. Corvid signed a BAA as part of their Enterprise agreement.",
      "The growth team set up 24 monitors on the booking funnel, each with seasonality learned from 18 months of history, so a quiet Sunday doesn't trigger a page.",
    ],
    results: [
      "On a Saturday in March, completed bookings in three states fell 34% below the expected range. Veyra alerted the on-call engineer 38 minutes after the drop began and traced it to a single verification partner.",
      "The fix shipped the same morning. Corvid estimates the weekend would otherwise have cost around $212,000 in lost bookings.",
    ],
    quote: {
      text: "The alert said which partner, which states and when it started. Our engineer had the fix open before she finished her coffee.",
      name: "Marcus Fenn",
      role: "VP Engineering, Corvid Health",
      portrait: "man-glasses",
    },
  },
  {
    slug: "hollis",
    company: "Hollis Freight",
    mark: "stack",
    industry: "Logistics marketplace",
    size: "380 employees",
    hq: "Chicago",
    warehouse: "Databricks",
    plan: "Business",
    headline: "Hollis Freight replaced a 40-slide ops review with one question",
    summary:
      "Explain now opens every Monday review, so the room spends its hour on decisions instead of reconciling spreadsheets.",
    image: "office-standup",
    imageAlt: "Hollis Freight operations team at their Monday review",
    outcomes: [
      { value: "14 hrs", label: "analyst time saved each week" },
      { value: "4.1 pts", label: "on-time pickup improvement in 6 months" },
      { value: "96%", label: "of ops leads use Veyra weekly" },
    ],
    challenge: [
      "Every Monday, Hollis's operations leads met to discuss on-time pickup rates across 41 lanes. Two analysts spent most of Friday building the deck, and half the meeting went to arguing about whose numbers were right.",
    ],
    approach: [
      "Hollis defined on-time pickup once in Veyra's semantic layer, on top of their Databricks lakehouse. The Monday meeting now starts with a single Explain run on last week's change, broken down by lane, carrier and weather region.",
    ],
    results: [
      "The deck is gone. The analysts got back about 14 hours a week, and the review now ends with owners assigned to the two or three drivers that actually moved the number.",
      "On-time pickups rose from 88.3% to 92.4% over the following six months.",
    ],
    quote: {
      text: "Explain gives us the same starting point every Monday. Nobody argues about the number anymore, we argue about what to do.",
      name: "Tomás Aguilar",
      role: "Director of Operations, Hollis Freight",
      portrait: "man-smile",
    },
  },
  {
    slug: "ferro",
    company: "Ferro",
    mark: "slash",
    industry: "Business payments",
    size: "210 employees",
    hq: "London",
    warehouse: "Snowflake",
    plan: "Business",
    headline: "Ferro opened its revenue data to 380 people without a single leak",
    summary:
      "Row-level permissions inherited from Snowflake let finance share account-level revenue with sales, while regulated fields stay locked down.",
    image: "office-meeting",
    imageAlt: "Ferro finance and sales teams in a planning session",
    outcomes: [
      { value: "380", label: "people with self-serve revenue access" },
      { value: "2 wks", label: "from contract to company-wide rollout" },
      { value: "100%", label: "of queries logged for audit" },
    ],
    challenge: [
      "As a regulated payments company, Ferro keeps card and identity data under strict access rules. The easiest way to stay compliant was to give almost nobody access, which left sales and success teams guessing.",
    ],
    approach: [
      "Veyra connects with each person's own Snowflake role through SSO, so masking and row access policies apply to every question automatically. Finance published a small set of revenue metrics for everyone else to ask about.",
    ],
    results: [
      "Ferro rolled Veyra out to 380 people in two weeks. Every question and generated query is logged, and the quarterly access review now takes an afternoon instead of a week.",
    ],
    quote: {
      text: "Our auditors asked who could see what. For the first time, the answer was one screen long.",
      name: "Hannah Leclerc",
      role: "CFO, Ferro",
      portrait: "woman-red",
    },
  },
];

export type Quote = { text: string; name: string; role: string; portrait: string };
export const quotes: Quote[] = [
  { text: "I asked why churn ticked up in July and got the answer with the SQL underneath. I checked it. It was right.", name: "Priya Raman", role: "Analytics Engineer, Hollis Freight", portrait: "woman-1" },
  { text: "Our PMs used to wait a sprint for a funnel breakdown. Now they paste the link in the standup doc.", name: "Jonah Pratt", role: "Group PM, Quillo", portrait: "man-cap" },
  { text: "Veyra reads our dbt metrics instead of inventing its own. That was the whole reason we said yes.", name: "Aiko Tanabe", role: "Data Lead, Oaklet", portrait: "woman-2" },
  { text: "The monitors learn our weekly rhythm. We went from forty noisy alerts a week to three that matter.", name: "Sam Delgado", role: "Revenue Operations, Ferro", portrait: "man-1" },
  { text: "Setup took an afternoon. Security review took longer, and it was still the easiest one we did this year.", name: "Graham Lowry", role: "CTO, Sundial Studios", portrait: "man-suit" },
  { text: "Our store managers ask questions I would never have thought to build a dashboard for.", name: "Ruth Okafor", role: "COO, Arbor & Finch", portrait: "woman-smile-1" },
  { text: "When a number looks off, Explain is the first thing I open. It usually saves me the rest of the morning.", name: "Elise Moreau", role: "Staff PM, Pellam", portrait: "woman-redhead" },
  { text: "We switched off two legacy BI tools in the first quarter. Nobody has asked for them back.", name: "Leo Brandt", role: "Director of Finance Systems, Arbor & Finch", portrait: "man-restaurant" },
  { text: "On-call used to mean staring at dashboards. Now the alert tells us which partner broke and where.", name: "Marcus Fenn", role: "VP Engineering, Corvid Health", portrait: "man-glasses" },
];

/* ------------------------------------------------------------------ pricing */

export type Plan = {
  id: string;
  name: string;
  monthly: number | null;
  annual: number | null;
  blurb: string;
  cta: { label: string; to: Page };
  lead: string;
  features: string[];
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For one analyst trying Veyra on real data.",
    cta: { label: "Start free", to: "start" },
    lead: "Includes",
    features: ["1 editor, 5 viewers", "1 warehouse connection", "200 questions a month", "3 monitors", "Community support"],
  },
  {
    id: "team",
    name: "Team",
    monthly: 49,
    annual: 39,
    blurb: "For data teams opening answers up to the company.",
    cta: { label: "Start 14-day trial", to: "start" },
    lead: "Everything in Starter, plus",
    features: ["Unlimited viewers", "Unlimited questions", "Explain for any metric", "25 monitors with alerts", "dbt metrics sync"],
    featured: true,
  },
  {
    id: "business",
    name: "Business",
    monthly: 99,
    annual: 79,
    blurb: "For companies with governed, shared metrics.",
    cta: { label: "Start 14-day trial", to: "start" },
    lead: "Everything in Team, plus",
    features: ["Unlimited monitors", "SAML SSO", "Row-level permissions", "Audit log, 1 year", "Priority support"],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    monthly: null,
    annual: null,
    blurb: "For regulated and large organizations.",
    cta: { label: "Book a demo", to: "demo" },
    lead: "Everything in Business, plus",
    features: ["SCIM provisioning", "US or EU data residency", "HIPAA BAA", "Private networking", "99.9% uptime SLA"],
  },
];

export type Cell = boolean | string;
export const comparison: { group: string; rows: { name: string; cells: [Cell, Cell, Cell, Cell] }[] }[] = [
  {
    group: "Usage",
    rows: [
      { name: "Editors", cells: ["1", "Up to 50", "Unlimited", "Unlimited"] },
      { name: "Viewers", cells: ["5", "Unlimited", "Unlimited", "Unlimited"] },
      { name: "Warehouse connections", cells: ["1", "2", "5", "Unlimited"] },
      { name: "Questions per month", cells: ["200", "Unlimited", "Unlimited", "Unlimited"] },
    ],
  },
  {
    group: "Ask and Explain",
    rows: [
      { name: "Plain-English questions with SQL shown", cells: [true, true, true, true] },
      { name: "Explain metric changes", cells: ["5 a month", true, true, true] },
      { name: "dbt and semantic layer sync", cells: [false, true, true, true] },
      { name: "Custom glossary and verified answers", cells: [false, false, true, true] },
    ],
  },
  {
    group: "Monitors",
    rows: [
      { name: "Monitors", cells: ["3", "25", "Unlimited", "Unlimited"] },
      { name: "Email and chat alerts", cells: [true, true, true, true] },
      { name: "Incident tools and webhooks", cells: [false, true, true, true] },
      { name: "Check frequency", cells: ["Daily", "Hourly", "Every 15 min", "Every 5 min"] },
    ],
  },
  {
    group: "Security and governance",
    rows: [
      { name: "SOC 2 Type II", cells: [true, true, true, true] },
      { name: "SAML SSO", cells: [false, false, true, true] },
      { name: "Row-level permissions from your warehouse", cells: [false, false, true, true] },
      { name: "SCIM provisioning", cells: [false, false, false, true] },
      { name: "Data residency and HIPAA BAA", cells: [false, false, false, true] },
      { name: "Audit log retention", cells: ["7 days", "90 days", "1 year", "Custom"] },
    ],
  },
  {
    group: "Support",
    rows: [
      { name: "Support", cells: ["Community", "Email", "Priority, 4h response", "Dedicated engineer"] },
      { name: "Onboarding", cells: [false, "Self-serve", "Guided, 2 sessions", "Custom rollout plan"] },
    ],
  },
];

export const faqs: { q: string; a: string }[] = [
  {
    q: "What is the difference between an editor and a viewer?",
    a: "Editors connect data, define metrics, build monitors and publish answers. Viewers can ask any question of published metrics, run Explain and receive alerts. Viewers are free on every paid plan.",
  },
  {
    q: "Does our data leave our warehouse?",
    a: "No. Queries run inside your warehouse with a read-only role. Veyra stores query text and small result caches, encrypted, for up to 24 hours. On Business and Enterprise you can set the cache to zero.",
  },
  {
    q: "Which warehouses do you support?",
    a: "Snowflake, BigQuery, Databricks SQL, Amazon Redshift and Postgres. ClickHouse is in beta for Business and Enterprise workspaces.",
  },
  {
    q: "Is our data used to train models?",
    a: "Never. Language models only see your schema, metric definitions and the question, under zero-retention agreements with our model providers. Enterprise workspaces can bring their own model endpoint.",
  },
  {
    q: "How does annual billing work?",
    a: "Annual plans are billed up front and cost 20% less. You can add editors at any time and we prorate the difference. Removing editors takes effect at renewal.",
  },
  {
    q: "Do you offer startup or nonprofit pricing?",
    a: "Yes. Companies under 30 people and registered nonprofits get 50% off Team or Business for the first year. Book a demo and mention it, or write to sales@veyra.ai.",
  },
];

/* ------------------------------------------------------------------ integrations */

export const integrations: { name: string; kind: string }[] = [
  { name: "Snowflake", kind: "Warehouse" },
  { name: "BigQuery", kind: "Warehouse" },
  { name: "Databricks", kind: "Warehouse" },
  { name: "Postgres", kind: "Database" },
  { name: "Amazon Redshift", kind: "Warehouse" },
  { name: "dbt Core and Cloud", kind: "Semantic layer" },
  { name: "Slack", kind: "Alerts and answers" },
  { name: "Microsoft Teams", kind: "Alerts and answers" },
  { name: "PagerDuty", kind: "Incident routing" },
  { name: "Okta", kind: "SSO and SCIM" },
  { name: "Google Sheets", kind: "Export" },
  { name: "Webhooks and API", kind: "Build your own" },
];

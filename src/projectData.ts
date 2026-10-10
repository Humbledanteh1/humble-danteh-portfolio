export type ProjectCategory = 'E-commerce' | 'Websites' | 'AI agents'

export type ProjectStory = {
  slug: string
  number: string
  category: ProjectCategory
  title: string
  descriptor: string
  summary: string
  challenge: string
  approach: string
  built: string
  demoNote: string
  visual: string
}

export const projectStories: ProjectStory[] = [
  {
    slug: 'hearth-form',
    number: '01',
    category: 'E-commerce',
    title: 'Hearth & Form',
    descriptor: 'A considered storefront for small-batch homeware.',
    summary: 'A calm product catalogue that makes browsing feel as considered as the objects themselves.',
    challenge: 'Show a small collection of tactile, handmade pieces without making shoppers work to understand the range or the next step.',
    approach: 'Keep the catalogue focused, make product categories easy to scan, and keep the basket visible without rushing visitors into checkout.',
    built: 'Responsive storefront, category filters, product cards, quantity controls, and a local basket. Payment and order placement are intentionally not connected.',
    demoNote: 'Self-initiated concept demo. Fictional brand and products; no sales or customer results are claimed.',
    visual: 'hearth',
  },
  {
    slug: 'sunday-bakehouse',
    number: '02',
    category: 'Websites',
    title: 'Sunday Bakehouse',
    descriptor: 'A neighbourhood bakery website with a warm point of view.',
    summary: 'A simple visit-planning experience that puts today’s bakes, opening hours, and the bakery’s character up front.',
    challenge: 'Help a first-time visitor quickly answer three questions: what is on the menu, when is it open, and how do I plan a visit?',
    approach: 'Pair a strong editorial image with a short menu, clear hours, and one obvious local-only preorder interaction.',
    built: 'Responsive brand homepage, menu and visit details, section navigation, and an on-page preorder confirmation with no personal-data collection.',
    demoNote: 'Self-initiated concept demo. Sunday Bakehouse and its location are fictional; no real orders are sent.',
    visual: 'sunday',
  },
  {
    slug: 'findwell',
    number: '03',
    category: 'AI agents',
    title: 'Findwell',
    descriptor: 'A product-discovery assistant for a compact homeware catalogue.',
    summary: 'A guided product finder that turns a broad shopping question into a short, grounded recommendation.',
    challenge: 'A filter list can feel like a dead end when a shopper knows the occasion or feeling they want, but not the right product name.',
    approach: 'Let a shopper describe their need in plain language, then connect the intent to a small, explicit product catalogue and explain the match.',
    built: 'Interactive prompt chips, free-text questions, curated demo replies, and product recommendations tied to the Hearth & Form catalogue.',
    demoNote: 'Self-initiated AI-agent prototype. Responses are scripted from demo rules; no live model or customer data is connected.',
    visual: 'findwell',
  },
  {
    slug: 'orderwise',
    number: '04',
    category: 'AI agents',
    title: 'Orderwise',
    descriptor: 'A post-purchase support agent with a clear handoff.',
    summary: 'A small support workspace that checks sample order states and gives the shopper a useful next step.',
    challenge: '“Where is my order?” is simple only when order context and safe next actions are easy to find.',
    approach: 'Ground the conversation in a few clearly identified sample orders, distinguish what can be answered from what needs a person, and make escalation visible.',
    built: 'Order selection, delivery and change-address intent chips, sample status details, and a simulated human handoff.',
    demoNote: 'Self-initiated AI-agent prototype. All order records are sample data; responses are scripted and no live AI or fulfilment system is connected.',
    visual: 'orderwise',
  },
]

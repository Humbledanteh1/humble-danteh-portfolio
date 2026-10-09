import { useState } from 'react'
import { projectStories } from './projectData'
import type { ProjectStory } from './projectData'
import './ProjectDemos.css'

type Product = {
  id: string
  name: string
  category: 'Drinkware' | 'Objects' | 'Table'
  description: string
  price: number
  image: string
  imageAlt: string
}

const products: Product[] = [
  { id: 'mug', name: 'Oat stoneware mug', category: 'Drinkware', description: 'Hand-shaped; made for the everyday pour.', price: 28, image: 'hearth-mug.webp', imageAlt: 'Handmade oat-colored stoneware coffee mug' },
  { id: 'vase', name: 'Still bud vase', category: 'Objects', description: 'A quiet shape for a single stem or two.', price: 42, image: 'hearth-vase.webp', imageAlt: 'Pale sage-gray hand-thrown ceramic bud vase' },
  { id: 'bowl', name: 'Low tide serving bowl', category: 'Table', description: 'A generous, hand-built bowl in warm clay.', price: 36, image: 'hearth-bowl.webp', imageAlt: 'Wide terracotta hand-built ceramic serving bowl' },
]

const categories = ['All', 'Drinkware', 'Objects', 'Table'] as const
const asset = (filename: string) => `${import.meta.env.BASE_URL}demo-assets/${filename}`
const money = (price: number) => `£${price.toFixed(2)}`

type AgentMessage = { role: 'assistant' | 'shopper'; text: string; productIds?: string[] }

function DemoHeader({ story }: { story: ProjectStory }) {
  return <header className="demo-topbar">
    <a href="#work" className="demo-back"><span aria-hidden="true">←</span> Back to Vertigo AI</a>
    <span className="demo-topbar-center">{story.number} / {story.category}</span>
    <span className="demo-concept-pill">Self-initiated demo</span>
  </header>
}

function CaseStudyNotes({ story }: { story: ProjectStory }) {
  return <section className="demo-notes" aria-label={`${story.title} case-study notes`}>
    <article><span className="demo-note-label">The brief</span><p>{story.challenge}</p></article>
    <article><span className="demo-note-label">The approach</span><p>{story.approach}</p></article>
    <article><span className="demo-note-label">What’s built</span><p>{story.built}</p></article>
    <p className="demo-disclosure">{story.demoNote}</p>
  </section>
}

function StoreDemo() {
  const [activeCategory, setActiveCategory] = useState<(typeof categories)[number]>('All')
  const [cart, setCart] = useState<Record<string, number>>({})
  const [cartOpen, setCartOpen] = useState(false)
  const [notice, setNotice] = useState('')
  const visibleProducts = products.filter((product) => activeCategory === 'All' || product.category === activeCategory)
  const cartItems = Object.entries(cart).flatMap(([id, quantity]) => {
    const product = products.find((item) => item.id === id)
    return product && quantity > 0 ? [{ product, quantity }] : []
  })
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const total = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0)

  const changeQuantity = (id: string, amount: number) => {
    setCart((current) => {
      const next = { ...current }
      const quantity = (current[id] ?? 0) + amount
      if (quantity <= 0) delete next[id]
      else next[id] = quantity
      return next
    })
  }

  const scrollToProducts = () => document.getElementById('store-products')?.scrollIntoView({ behavior: 'smooth' })

  return <div className="store-demo">
    <header className="store-nav">
      <a href="#demo-top" className="store-wordmark">HEARTH <i>&amp;</i> FORM</a>
      <span className="store-nav-note">Objects for a slower home</span>
      <button type="button" className="store-bag-button" onClick={() => setCartOpen(true)} aria-label={`Open shopping bag, ${itemCount} items`}>
        Bag <span>{itemCount}</span>
      </button>
    </header>
    <section className="store-hero" id="demo-top">
      <div className="store-hero-copy">
        <span className="store-eyebrow">SMALL BATCH · MADE TO BE KEPT</span>
        <h3>Everyday objects,<br /><em>made a little slower.</em></h3>
        <p>Useful forms, honest materials, and small details that make a daily ritual feel like your own.</p>
        <button type="button" className="store-primary" onClick={scrollToProducts}>Shop the collection <span aria-hidden="true">↓</span></button>
      </div>
      <div className="store-hero-art"><img src={asset('hearth-vase.webp')} alt="A sculptural handmade ceramic vase in soft morning light" /></div>
      <span className="store-hero-index">FORM 01 — HOME</span>
    </section>
    <section className="store-products-section" id="store-products">
      <div className="store-section-head"><div><span className="store-eyebrow">A SMALL, USEFUL COLLECTION</span><h4>Objects to live with.</h4></div><p>Thoughtful shapes. No rush.</p></div>
      <div className="store-filters" aria-label="Filter products">
        {categories.map((category) => <button key={category} type="button" aria-pressed={activeCategory === category} className={activeCategory === category ? 'selected' : ''} onClick={() => setActiveCategory(category)}>{category}</button>)}
      </div>
      <div className="store-product-grid">
        {visibleProducts.map((product, index) => <article className="store-product" key={product.id}>
          <div className={`store-product-image store-product-image-${index}`}><img src={asset(product.image)} alt={product.imageAlt} loading="lazy" /><span>0{products.indexOf(product) + 1}</span></div>
          <div className="store-product-meta"><div><h5>{product.name}</h5><p>{product.description}</p></div><strong>{money(product.price)}</strong></div>
          <button type="button" className="store-add-button" onClick={() => { changeQuantity(product.id, 1); setNotice(`${product.name} added to your demo bag.`) }}>Add to bag <span aria-hidden="true">+</span></button>
        </article>)}
      </div>
      <p className="store-live-note" role="status" aria-live="polite">{notice}</p>
    </section>
    <footer className="store-footer"><span>HEARTH &amp; FORM</span><span>A fictional storefront concept by Vertigo AI.</span><span>Small things, kept close.</span></footer>
    {cartOpen && <div className="store-cart-layer">
      <button type="button" className="store-cart-backdrop" aria-label="Close shopping bag" onClick={() => setCartOpen(false)} />
      <aside className="store-cart-panel" role="dialog" aria-modal="true" aria-labelledby="store-cart-title">
        <div className="store-cart-head"><div><span className="store-eyebrow">YOUR SELECTION</span><h4 id="store-cart-title">Shopping bag <small>({itemCount})</small></h4></div><button type="button" className="store-close-button" onClick={() => setCartOpen(false)} aria-label="Close shopping bag">×</button></div>
        {cartItems.length === 0 ? <p className="store-empty-cart">Your bag is empty for now. Find a piece to bring home.</p> : <div className="store-cart-items">{cartItems.map(({ product, quantity }) => <article className="store-cart-item" key={product.id}>
          <img src={asset(product.image)} alt="" />
          <div><h5>{product.name}</h5><span>{money(product.price)}</span><div className="store-quantity"><button type="button" onClick={() => changeQuantity(product.id, -1)} aria-label={`Remove one ${product.name}`}>−</button><span>{quantity}</span><button type="button" onClick={() => changeQuantity(product.id, 1)} aria-label={`Add one ${product.name}`}>+</button></div></div>
        </article>)}</div>}
        <div className="store-cart-bottom"><div><span>Subtotal</span><strong>{money(total)}</strong></div><button type="button" onClick={() => setNotice('This concept stops before checkout. No payment or order is submitted.')}>Continue to checkout <span aria-hidden="true">→</span></button><p>This is a concept demo. Checkout is not connected.</p></div>
      </aside>
    </div>}
  </div>
}

const bakeMenu = [
  { name: 'Brown butter morning bun', detail: 'Cinnamon sugar · baked at first light', price: '£4.20' },
  { name: 'Olive oil loaf', detail: 'Lemon zest · a little sea salt', price: '£3.80' },
  { name: 'Cardamom knot', detail: 'Soft dough · toasted spice', price: '£4.00' },
]

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

function BakeryDemo() {
  const [notice, setNotice] = useState('')
  return <div className="bakery-demo">
    <header className="bakery-nav">
      <button type="button" className="bakery-wordmark" onClick={() => scrollToSection('bakery-top')}>SUNDAY<span>BAKEHOUSE</span></button>
      <nav aria-label="Sunday Bakehouse demo navigation"><button type="button" onClick={() => scrollToSection('bakery-menu')}>The menu</button><button type="button" onClick={() => scrollToSection('bakery-visit')}>Find us</button></nav>
      <button type="button" className="bakery-nav-cta" onClick={() => setNotice('Visit plan noted in this demo. Nothing has been sent or booked.')}>Plan a visit <span aria-hidden="true">↗</span></button>
    </header>
    <section className="bakery-hero" id="bakery-top">
      <img src={asset('sunday-bakehouse.webp')} alt="Fresh pastry and espresso on a bakery counter in warm morning light" />
      <div className="bakery-hero-shade" />
      <div className="bakery-hero-copy"><span>GOOD THINGS, FROM EARLY</span><h3>A slower kind<br />of <em>morning.</em></h3><p>Small-batch bakes, properly good coffee, and a seat by the window.</p><button type="button" onClick={() => scrollToSection('bakery-menu')}>See what’s baking <span aria-hidden="true">↓</span></button></div>
      <span className="bakery-hero-side">FLOUR · BUTTER · TIME</span>
    </section>
    <p className="bakery-notice" role="status" aria-live="polite">{notice}</p>
    <section className="bakery-menu-section" id="bakery-menu">
      <div className="bakery-section-heading"><div><span>FROM THE COUNTER</span><h4>Today, while it lasts.</h4></div><p>Made in small batches, right here.</p></div>
      <div className="bakery-menu-list">{bakeMenu.map((item, index) => <article className="bakery-menu-item" key={item.name}><span className="bakery-menu-no">0{index + 1}</span><div><h5>{item.name}</h5><p>{item.detail}</p></div><strong>{item.price}</strong><button type="button" onClick={() => setNotice(`${item.name} added to your preview list. This demo does not send an order.`)}>Add to preview <span aria-hidden="true">+</span></button></article>)}</div>
    </section>
    <section className="bakery-visit-section" id="bakery-visit"><div><span>COME BY WHEN YOU’RE READY</span><h4>There’s always<br />room for <em>one more.</em></h4><p>Fictional neighbourhood · sample details for this concept.</p></div><div className="bakery-hours"><h5>Opening hours</h5><p><span>Tuesday — Friday</span><strong>7:30 — 15:00</strong></p><p><span>Saturday — Sunday</span><strong>8:00 — 14:00</strong></p><p><span>Monday</span><strong>Closed, mixing dough</strong></p><button type="button" onClick={() => setNotice('A visit reminder is shown for this demo only. Nothing has been booked.')}>Save a visit reminder <span aria-hidden="true">↗</span></button></div></section>
    <footer className="bakery-footer"><span>SUNDAY BAKEHOUSE</span><span>Fictional business website concept · Vertigo AI</span><span>Made for slow mornings.</span></footer>
  </div>
}

function ProductAgentDemo() {
  const [question, setQuestion] = useState('')
  const [messages, setMessages] = useState<AgentMessage[]>([
    { role: 'assistant', text: 'I can help you choose from the Hearth & Form collection. Tell me what you need it for, who it’s for, or what you’d like to spend.' },
  ])

  const respond = (text: string) => {
    const query = text.toLowerCase()
    let productIds: string[]
    let answer: string
    if (query.includes('gift') || query.includes('new home') || query.includes('housewarming')) {
      productIds = ['mug', 'vase']
      answer = 'For a thoughtful housewarming gift, I’d start with the Oat stoneware mug: it is useful every day and sits within the £30 mark. If you want something more sculptural, the Still bud vase is a lovely step up.'
    } else if (query.includes('serve') || query.includes('dinner') || query.includes('bowl') || query.includes('table')) {
      productIds = ['bowl']
      answer = 'The Low tide serving bowl is the best match for sharing food at the table. It is hand-built in warm clay and costs £36.'
    } else if (query.includes('plant') || query.includes('desk') || query.includes('flower') || query.includes('small space')) {
      productIds = ['vase']
      answer = 'For a desk or small space, the Still bud vase keeps the footprint light. It works with a single stem, or simply as a small handmade object.'
    } else if (query.includes('coffee') || query.includes('mug') || query.includes('drink')) {
      productIds = ['mug']
      answer = 'The Oat stoneware mug is the everyday coffee pick: a hand-shaped form, a matte glaze, and a £28 demo price.'
    } else {
      productIds = ['mug', 'vase', 'bowl']
      answer = 'I can help narrow it down. Is this for a gift, a table, a small space, or your everyday coffee ritual? Here are a few starting points from the collection.'
    }
    setMessages((current) => [...current, { role: 'shopper', text }, { role: 'assistant', text: answer, productIds }])
    setQuestion('')
  }

  const suggestions = [
    'I need a thoughtful new-home gift',
    'Something small for a desk',
    'A bowl for sharing dinner',
  ]

  return <div className="agent-demo findwell-demo">
    <aside className="agent-sidebar"><div className="agent-brand"><span className="agent-brand-mark">f</span><span>findwell<small>PRODUCT GUIDE</small></span></div><div className="agent-sidebar-label">WORKSPACE</div><button type="button" className="agent-nav-item selected"><span>✦</span> Product finder</button><button type="button" className="agent-nav-item"><span>⌂</span> Homeware</button><div className="agent-sidebar-bottom"><span className="agent-live-dot" /> Demo knowledge connected<small>3 sample products</small></div></aside>
    <section className="agent-main">
      <div className="agent-workspace-top"><div><span className="agent-breadcrumb">CUSTOMER EXPERIENCE / PRODUCT FINDER</span><h3>Find something that fits.</h3></div><span className="agent-status">Concept prototype</span></div>
      <div className="agent-scope-note"><strong>Prototype note</strong><span>Answers below are scripted from the demo catalogue. No live AI model is connected.</span></div>
      <div className="agent-conversation">
        <div className="agent-welcome"><span className="agent-avatar">f</span><div><strong>Findwell</strong><small>Guided product discovery</small></div></div>
        <div className="agent-messages" aria-live="polite">{messages.map((message, index) => <div className={`agent-message-row ${message.role}`} key={`${message.role}-${index}`}>
          {message.role === 'assistant' && <span className="agent-message-avatar">f</span>}
          <div className="agent-message-content"><p>{message.text}</p>{message.productIds && <div className="agent-recommendations">{message.productIds.map((id) => {
            const product = products.find((item) => item.id === id)
            return product ? <article className="agent-recommendation" key={id}><img src={asset(product.image)} alt="" /><div><strong>{product.name}</strong><span>{money(product.price)}</span></div></article> : null
          })}</div>}</div>
        </div>)}</div>
        <div className="agent-suggestions"><span>TRY ASKING</span>{suggestions.map((suggestion) => <button type="button" key={suggestion} onClick={() => respond(suggestion)}>{suggestion} <span aria-hidden="true">↗</span></button>)}</div>
        <form className="agent-input-row" onSubmit={(event) => { event.preventDefault(); if (question.trim()) respond(question.trim()) }}><input value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Tell me what you’re looking for…" aria-label="Ask the product finder" /><button type="submit" disabled={!question.trim()}>Send <span aria-hidden="true">↑</span></button></form>
        <p className="agent-data-footnote">DEMO CATALOGUE · 3 FICTIONAL PRODUCTS · NO PERSONAL DATA SAVED</p>
      </div>
    </section>
  </div>
}

const sampleOrders = [
  { id: '1048', status: 'In transit', item: 'Oat stoneware mug', eta: 'Estimated in 2 days (sample)', tracking: 'Parcel picked up by carrier' },
  { id: '1052', status: 'Preparing', item: 'Still bud vase', eta: 'Dispatch expected tomorrow', tracking: 'Being wrapped at the studio' },
  { id: '1059', status: 'Delivered', item: 'Low tide serving bowl', eta: 'Delivered yesterday', tracking: 'Left in the safe place selected at checkout' },
]

function OrderAgentDemo() {
  const [orderId, setOrderId] = useState(sampleOrders[0].id)
  const [response, setResponse] = useState('Choose a sample order and a question to see how the support flow handles it.')
  const [handoff, setHandoff] = useState(false)
  const order = sampleOrders.find((item) => item.id === orderId) ?? sampleOrders[0]

  const handleIssue = (issue: 'status' | 'address' | 'return') => {
    setHandoff(false)
    if (issue === 'status') setResponse(`Order #${order.id} is ${order.status.toLowerCase()}. ${order.tracking}. ${order.eta}. This answer uses a sample order record.`)
    if (issue === 'address') setResponse(order.status === 'Preparing' ? `Order #${order.id} is still being prepared. In a real store, an address-change request would be checked against the fulfilment cutoff; this prototype cannot change the address.` : `Order #${order.id} has moved to ${order.status.toLowerCase()}, so this demo routes an address change to a person rather than promising an edit.`)
    if (issue === 'return') setResponse(order.status === 'Delivered' ? `Order #${order.id} is shown as delivered. A real return would need to check the store’s policy and item condition; this prototype only demonstrates the triage step and does not submit a return.` : `Order #${order.id} is not marked delivered yet. This demo suggests checking back after delivery; no return request has been created.`)
  }

  return <div className="agent-demo orderwise-demo">
    <aside className="agent-sidebar order-sidebar"><div className="agent-brand"><span className="order-brand-mark">o</span><span>orderwise<small>SUPPORT DESK</small></span></div><div className="agent-sidebar-label">DEMO QUEUE</div><button type="button" className="agent-nav-item selected"><span>◉</span> Order questions <small className="queue-count">03</small></button><button type="button" className="agent-nav-item"><span>↗</span> Escalations</button><div className="agent-sidebar-bottom"><span className="agent-live-dot" /> Sample environment<small>Live orders are not connected</small></div></aside>
    <section className="agent-main orderwise-main">
      <div className="agent-workspace-top"><div><span className="agent-breadcrumb">SUPPORT / ORDER TRIAGE</span><h3>A clear next step.</h3></div><span className="agent-status">Scripted prototype</span></div>
      <div className="agent-scope-note"><strong>Safe demo scope</strong><span>These are fictional sample orders. The assistant does not access or change real orders.</span></div>
      <div className="order-workspace">
        <section className="order-context-panel"><div className="order-panel-header"><div><span>SELECT A SAMPLE RECORD</span><h4>Order context</h4></div><span className="order-sample-badge">SAMPLE DATA</span></div>
          <label className="order-select-label" htmlFor="sample-order">Sample order</label><select id="sample-order" value={orderId} onChange={(event) => { setOrderId(event.target.value); setResponse('Choose a question about this sample order.'); setHandoff(false) }}>{sampleOrders.map((item) => <option key={item.id} value={item.id}>#{item.id} · {item.status}</option>)}</select>
          <div className="order-record"><div className="order-record-top"><span>ORDER ID</span><strong>#{order.id}</strong></div><p>{order.item}</p><div className="order-record-status"><i />{order.status}</div><div className="order-record-meta"><span>Current detail</span><strong>{order.tracking}</strong></div><div className="order-record-meta"><span>Estimated update</span><strong>{order.eta}</strong></div></div>
          <p className="order-context-footnote">Illustrative order information only. No fulfilment or customer system is connected.</p>
        </section>
        <section className="order-chat-panel"><div className="order-chat-head"><span className="order-agent-avatar">o</span><div><strong>Orderwise</strong><small><i /> Support assistant · demo</small></div><button type="button" aria-label="More agent options">···</button></div>
          <div className="order-chat-body"><div className="order-greeting"><strong>How can I help with order #{order.id}?</strong><span>Pick a common request to see a safe, context-aware next step.</span></div><div className="order-question-list"><button type="button" onClick={() => handleIssue('status')}>Where is my order? <span>↗</span></button><button type="button" onClick={() => handleIssue('address')}>I need to change the address <span>↗</span></button><button type="button" onClick={() => handleIssue('return')}>I want to start a return <span>↗</span></button></div><div className={`order-agent-response ${handoff ? 'handoff' : ''}`} aria-live="polite"><span className="order-response-label"><i /> {handoff ? 'HANDOFF PREVIEW' : 'ORDERWISE RESPONSE'}</span><p>{response}</p></div><button type="button" className="order-handoff-button" onClick={() => { setHandoff(true); setResponse('In a live workflow, this conversation would be handed to a support teammate with the selected sample order and issue attached. This demo does not contact anyone.') }}>Preview human handoff <span aria-hidden="true">↗</span></button></div>
          <div className="order-chat-footer">DEMO MODE · SCRIPTED RESPONSES · NO LIVE AI</div>
        </section>
      </div>
    </section>
  </div>
}

function DemoExperience({ slug }: { slug: string }) {
  if (slug === 'hearth-form') return <StoreDemo />
  if (slug === 'sunday-bakehouse') return <BakeryDemo />
  if (slug === 'findwell') return <ProductAgentDemo />
  if (slug === 'orderwise') return <OrderAgentDemo />
  return <p className="demo-not-found">This project demo could not be found. <a href="#work">Return to the portfolio</a>.</p>
}

export function ProjectDemo({ slug }: { slug: string }) {
  const story = projectStories.find((item) => item.slug === slug)
  if (!story) return <main className="demo-not-found"><p>This demo is not available.</p><a href="#work">Return to the portfolio</a></main>

  return <div className="demo-page">
    <DemoHeader story={story} />
    <main className="demo-case-main">
      <section className="demo-case-intro">
        <div><span className="demo-case-kicker">{story.number} / {story.category} · CONCEPT PROJECT</span><h1>{story.title}</h1><p>{story.descriptor}</p></div>
        <div className="demo-case-summary"><span>THE IDEA</span><p>{story.summary}</p><div className="demo-case-actions"><button type="button" onClick={() => document.getElementById('interactive-demo')?.scrollIntoView({ behavior: 'smooth' })}>Try the interactive demo <span aria-hidden="true">↓</span></button><span>Original concept · Built from scratch</span></div></div>
      </section>
      <section className={`demo-interactive demo-interactive-${story.visual}`} id="interactive-demo" aria-label={`${story.title} interactive project demo`}>
        <div className="demo-screen-top"><span><i /> INTERACTIVE PREVIEW</span><span>{story.title.toUpperCase()}</span><span>CONCEPT BUILD</span></div>
        <DemoExperience slug={slug} />
      </section>
      <CaseStudyNotes story={story} />
      <a href="#work" className="demo-return-bottom">← Back to all project demos</a>
    </main>
  </div>
}

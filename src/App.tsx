import { useEffect, useState } from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTelegram, FaXTwitter } from 'react-icons/fa6'
import { ProjectDemo } from './ProjectDemos'
import { projectStories } from './projectData'
import './App.css'

const projectTabs = ['All work', 'Commerce', 'Websites', 'AI agents'] as const
const socialLinks = [
  { label: 'X / Twitter', handle: '@Humbledanteh1', icon: FaXTwitter, href: 'https://x.com/Humbledanteh1' },
  { label: 'Telegram', handle: '@Humbledanteh1', icon: FaTelegram, href: 'https://t.me/Humbledanteh1' },
  { label: 'Facebook', handle: 'Add profile', icon: FaFacebookF, href: '#contact' },
  { label: 'LinkedIn', handle: 'sharif-mahmood-0792a842b', icon: FaLinkedinIn, href: 'https://www.linkedin.com/in/sharif-mahmood-0792a842b' },
  { label: 'GitHub', handle: 'humbledanteh1', icon: FaGithub, href: 'https://github.com/Humbledanteh1' },
]

function getDemoSlug() {
  const match = window.location.hash.match(/^#\/demo\/([^/]+)$/)
  return match?.[1] ?? null
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<(typeof projectTabs)[number]>('All work')
  const [scrolled, setScrolled] = useState(false)
  const [demoSlug, setDemoSlug] = useState<string | null>(() => getDemoSlug())

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleHashChange = () => setDemoSlug(getDemoSlug())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  useEffect(() => {
    if (demoSlug) window.scrollTo({ top: 0 })
    else if (window.location.hash === '#work') {
      window.requestAnimationFrame(() => document.getElementById('work')?.scrollIntoView())
    }
  }, [demoSlug])

  const closeMenu = () => setMenuOpen(false)
  if (demoSlug) return <ProjectDemo slug={demoSlug} />
  const visibleProjects = projectStories.filter((project) => activeTab === 'All work' || project.category === activeTab)

  return <div className="portfolio" id="top">
    <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <a className="brand" href="#top" aria-label="Sharif Mahmood portfolio home">
        <span className="brand-orb" aria-hidden="true">S</span>
        <span>Sharif<br />Mahmood</span>
      </a>
      <button
        className="menu-toggle"
        type="button"
        onClick={() => setMenuOpen((open) => !open)}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={menuOpen}
        aria-controls="site-navigation"
      >
        <span aria-hidden="true">{menuOpen ? '×' : '☰'}</span>
      </button>
      <nav id="site-navigation" className={menuOpen ? 'nav-links open' : 'nav-links'} aria-label="Primary navigation">
        <a href="#work" onClick={closeMenu}>Work</a>
        <a href="#about" onClick={closeMenu}>About</a>
        <a href="#contact" onClick={closeMenu}>Contact</a>
        <a className="nav-pill" href="mailto:Vertigogrowth1@gmail.com">Let’s talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy">
          <div className="status-pill"><i aria-hidden="true" /> Building digital work with care</div>
          <h1 id="hero-heading">Websites, AI agents<br />and <em>useful ideas.</em></h1>
          <p>I'm Sharif Mahmood, the owner of Vertigo AI. I build websites and AI agents, then keep exploring the practical ideas that make digital work clearer and more useful.</p>
          <div className="hero-actions">
            <a className="primary-pill" href="#work">View project space <span aria-hidden="true">↓</span></a>
            <a className="secondary-pill" href="#about">A little about me <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <div className="hero-art">
          <img
            src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663891584706/DqsXpcXcDBivAizP.jpg"
            alt="A person standing in a field beneath a digital blue sky"
            width="1200"
            height="1500"
            fetchPriority="high"
            decoding="async"
          />
          <div className="hero-wash" aria-hidden="true" />
          <div className="image-caption"><span>Sharif Mahmood</span><span>Website &amp; AI builder</span></div>
          <div className="glass-card" aria-hidden="true"><span>In practice</span><strong>Digital work,<br />made tangible.</strong><small>01 / 03</small></div>
        </div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-heading">
        <div className="section-top">
          <div><span className="eyebrow">01 / Project space</span><h2 id="work-heading">Small concepts.<br /><em>Built to click.</em></h2></div>
          <p>Four self-initiated demos, built from scratch: an online shop, a business website, and two AI-agent prototypes. Fictional brands, honest scope, and something useful to try in each one.</p>
        </div>
        <div className="project-controls" role="tablist" aria-label="Project categories">
          <span className="active-pill" aria-hidden="true" style={{ transform: `translateX(${projectTabs.indexOf(activeTab) * 100}%)` }} />
          {projectTabs.map((tab) => <button type="button" role="tab" aria-selected={tab === activeTab} aria-controls="case-study-grid" className={tab === activeTab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}
        </div>
        <div className="case-study-grid" id="case-study-grid" role="tabpanel" aria-live="polite">
          {visibleProjects.map((project) => <article className={`case-card case-${project.visual}`} key={project.slug}>
            <a className="case-card-visual" href={`#/demo/${project.slug}`} aria-label={`Open ${project.title} concept demo`}>
              {project.visual === 'hearth' && <img src={`${import.meta.env.BASE_URL}demo-assets/hearth-vase.webp`} alt="Sculptural pale sage ceramic vase in warm studio light" loading="lazy" />}
              {project.visual === 'sunday' && <img src={`${import.meta.env.BASE_URL}demo-assets/sunday-bakehouse.webp`} alt="Morning pastry and espresso at a warm neighborhood bakery" loading="lazy" />}
              {project.visual === 'findwell' && <div className="agent-card-art" aria-hidden="true"><span className="agent-art-label">FINDWELL / PRODUCT FINDER</span><div className="agent-art-question">“A thoughtful gift<br />for a new home.”</div><div className="agent-art-answer"><i /> Try the handmade oat mug</div></div>}
              {project.visual === 'orderwise' && <div className="agent-card-art order-art" aria-hidden="true"><span className="agent-art-label">ORDERWISE / SUPPORT DESK</span><div className="order-art-row"><b>Order #1048</b><small>In transit</small></div><div className="order-art-row"><b>Next step</b><small>Sample ETA</small></div><div className="order-art-progress"><i /></div></div>}
              <span className="case-demo-chip">Self-initiated demo</span>
            </a>
            <div className="case-card-copy">
              <div className="case-card-meta"><span>{project.number} / {project.category}</span><span>CONCEPT BUILD</span></div>
              <h3>{project.title}</h3>
              <p className="case-card-descriptor">{project.descriptor}</p>
              <p className="case-card-summary">{project.summary}</p>
              <a className="case-card-link" href={`#/demo/${project.slug}`}>Explore the project <span aria-hidden="true">↗</span></a>
            </div>
          </article>)}
        </div>
      </section>

      <section className="about-section" id="about" aria-labelledby="about-heading">
        <div className="about-stamp" aria-hidden="true"><span className="monogram">SM</span><i>⋆</i><small>Vertigo AI<br />Owner</small></div>
        <div className="about-copy"><span className="eyebrow">02 / About</span><h2 id="about-heading">Designing the bridge between an <em>idea</em> and a useful digital tool.</h2><p>Sharif Mahmood builds websites and AI agents through Vertigo AI. His work is centered on turning an idea into something people can visit, use, and understand. He is interested in the practical details: a clear interface, a helpful workflow, and technology that earns its place.</p><p>Outside of individual projects, he keeps making room for interesting experiments and new ways to apply AI thoughtfully.</p><a className="inline-contact" href="mailto:Vertigogrowth1@gmail.com">Vertigogrowth1@gmail.com <span aria-hidden="true">↗</span></a></div>
      </section>

      <section className="social-section" aria-labelledby="social-heading">
        <div className="social-intro"><span className="eyebrow">03 / Elsewhere</span><h2 id="social-heading">Find the work<br />in <em>motion.</em></h2><p>Find me on LinkedIn, Telegram, X, and GitHub. The Telegram, X, and GitHub profiles use <strong>Humbledanteh1</strong>; Facebook can be added when ready.</p></div>
        <div className="social-list">{socialLinks.map(({ label, handle, icon: Icon, href }) => <a className="social-card" href={href} aria-label={`${label}: ${handle}`} key={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="social-icon" aria-hidden="true"><Icon /></span><span className="social-name">{label}</span><small>{handle}</small><b aria-hidden="true">↗</b></a>)}</div>
      </section>

      <section className="contact-section" id="contact" aria-labelledby="contact-heading"><span className="eyebrow">04 / Contact</span><h2 id="contact-heading">Have an idea<br />worth <em>building?</em></h2><a className="email-link" href="mailto:Vertigogrowth1@gmail.com">Vertigogrowth1@gmail.com <span aria-hidden="true">↗</span></a></section>
    </main>

    <footer><a className="brand footer-brand" href="#top" aria-label="Back to top"><span className="brand-orb" aria-hidden="true">S</span><span>Sharif Mahmood</span></a><span>Websites · AI agents · Vertigo AI</span><span>© 2026</span></footer>
  </div>
}

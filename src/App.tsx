/* Studio Ledger portfolio: warm editorial structure, blue glass highlights, fluid UI, and clear work-first narrative. */
import { useEffect, useState } from 'react'
import { FaFacebookF, FaGithub, FaLinkedinIn, FaTelegram, FaXTwitter } from 'react-icons/fa6'
import './App.css'

const projectTabs = ['All work', 'Websites', 'AI agents'] as const
const socialLinks = [
  { label: 'X / Twitter', handle: '@Humbledanteh1', icon: FaXTwitter, href: 'https://x.com/Humbledanteh1' },
  { label: 'Telegram', handle: 'Add profile', icon: FaTelegram, href: '#contact' },
  { label: 'Facebook', handle: 'Add profile', icon: FaFacebookF, href: '#contact' },
  { label: 'LinkedIn', handle: 'Add profile', icon: FaLinkedinIn, href: '#contact' },
  { label: 'GitHub', handle: 'humbledanteh1', icon: FaGithub, href: 'https://github.com/Humbledanteh1' },
]

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<(typeof projectTabs)[number]>('All work')
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const closeMenu = () => setMenuOpen(false)

  return <div className="portfolio" id="top">
    <header className={scrolled ? 'topbar scrolled' : 'topbar'}>
      <a className="brand" href="#top" aria-label="Sharif Mahmood portfolio"><span className="brand-orb">S</span><span>Sharif<br/>Mahmood</span></a>
      <button className="menu-toggle" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Close navigation' : 'Open navigation'}>{menuOpen ? '×' : '☰'}</button>
      <nav className={menuOpen ? 'nav-links open' : 'nav-links'}><a href="#work" onClick={closeMenu}>Work</a><a href="#about" onClick={closeMenu}>About</a><a href="#contact" onClick={closeMenu}>Contact</a><a className="nav-pill" href="mailto:Vertigogrowth1@gmail.com">Let’s talk <span>↗</span></a></nav>
    </header>

    <main>
      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-copy"><div className="status-pill"><i /> Building digital work with care</div><h1 id="hero-heading">Websites, AI agents<br/>and <em>useful ideas.</em></h1><p>I'm Sharif Mahmood, the owner of Vertigo AI. I build websites and AI agents, then keep exploring the practical ideas that make digital work clearer and more useful.</p><div className="hero-actions"><a className="primary-pill" href="#work">View project space <span>↓</span></a><a className="secondary-pill" href="#about">A little about me <span>↗</span></a></div></div>
        <div className="hero-art"><img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663891584706/DqsXpcXcDBivAizP.jpg" alt="A person standing in a field beneath a digital blue sky" /><div className="hero-wash" /><div className="image-caption"><span>Sharif Mahmood</span><span>Website & AI builder</span></div><div className="glass-card"><span>In practice</span><strong>Digital work,<br/>made tangible.</strong><small>01 / 03</small></div></div>
      </section>

      <section className="work-section" id="work" aria-labelledby="work-heading"><div className="section-top"><div><span className="eyebrow">01 / Project space</span><h2 id="work-heading">A place for<br/><em>what’s next.</em></h2></div><p>New work will live here. Each project can become a focused case study with a short story, the services involved, and the decisions behind the outcome.</p></div><div className="project-controls" role="tablist" aria-label="Project categories"><span className="active-pill" style={{ transform: `translateX(${projectTabs.indexOf(activeTab) * 100}%)` }} />{projectTabs.map((tab) => <button type="button" role="tab" aria-selected={tab === activeTab} className={tab === activeTab ? 'active' : ''} key={tab} onClick={() => setActiveTab(tab)}>{tab}</button>)}</div><div className="placeholder-grid"><article className="project-placeholder featured"><div className="placeholder-orb orb-one" /><div className="placeholder-orb orb-two" /><span className="project-number">01</span><div><span className="project-label">{activeTab === 'AI agents' ? 'AI agent' : 'Future project'}</span><h3>{activeTab === 'Websites' ? 'Website case study' : activeTab === 'AI agents' ? 'Agent workflow' : 'Your next case study'}</h3><p>Add a project title, project type, and one concise sentence about the work when you are ready.</p></div><span className="placeholder-link">Details later ↗</span></article><article className="project-placeholder dark"><span className="project-number">02</span><div><span className="project-label">Future project</span><h3>Built to be filled</h3><p>A ready-made area for your next website, AI agent, experiment, or collaboration.</p></div><span className="placeholder-link">Project slot ↗</span></article><article className="project-placeholder pale"><span className="project-number">03</span><div><span className="project-label">Future project</span><h3>Work in progress</h3><p>Use this card for projects in progress or a small piece of work worth sharing.</p></div><span className="placeholder-link">Project slot ↗</span></article></div></section>

      <section className="about-section" id="about"><div className="about-stamp"><span>SM</span><i>⋆</i><small>Vertigo AI<br/>Owner</small></div><div className="about-copy"><span className="eyebrow">02 / About</span><h2>Designing the bridge between an <em>idea</em> and a useful digital tool.</h2><p>Sharif Mahmood builds websites and AI agents through Vertigo AI. His work is centered on turning an idea into something people can visit, use, and understand. He is interested in the practical details: a clear interface, a helpful workflow, and technology that earns its place.</p><p>Outside of individual projects, he keeps making room for interesting experiments and new ways to apply AI thoughtfully.</p><a className="inline-contact" href="mailto:Vertigogrowth1@gmail.com">Vertigogrowth1@gmail.com <span>↗</span></a></div></section>

      <section className="social-section" aria-labelledby="social-heading"><div className="social-intro"><span className="eyebrow">03 / Elsewhere</span><h2 id="social-heading">Find the work<br/>in <em>motion.</em></h2><p>Social profiles and public workspaces are gathered here. The X and GitHub links use the provided <strong>Humbledanteh1</strong> username; the other profile links can be added when you are ready.</p></div><div className="social-list">{socialLinks.map(({ label, handle, icon: Icon, href }) => <a className="social-card" href={href} key={label} target={href.startsWith('http') ? '_blank' : undefined} rel={href.startsWith('http') ? 'noreferrer' : undefined}><span className="social-icon"><Icon /></span><span className="social-name">{label}</span><small>{handle}</small><b>↗</b></a>)}</div></section>

      <section className="contact-section" id="contact"><span className="eyebrow">04 / Contact</span><h2>Have an idea<br/>worth <em>building?</em></h2><a className="email-link" href="mailto:Vertigogrowth1@gmail.com">Vertigogrowth1@gmail.com <span>↗</span></a></section>
    </main>

    <footer><a className="brand footer-brand" href="#top"><span className="brand-orb">S</span><span>Sharif Mahmood</span></a><span>Websites · AI agents · Vertigo AI</span><span>© 2026</span></footer>
  </div>
}

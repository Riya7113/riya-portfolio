import { useState } from 'react'

const links = [['work', '#work'], ['experience', '#experience'], ['skills', '#skills'], ['contact', '#contact']]

function App() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState('')
  const [sending, setSending] = useState(false)

  async function submit(event) {
    event.preventDefault()
    setSending(true)
    setStatus('')
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL || ''}/api/contact`, {
        method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form),
      })
      let result
      try { result = await response.json() }
      catch { throw new Error(`The server returned an invalid response (${response.status}). Check that the contact API is running.`) }
      if (!response.ok) throw new Error(result.message || 'Could not send your message.')
      setStatus('Message sent. Thanks for reaching out!')
      setForm({ name: '', email: '', message: '' })
    } catch (error) { setStatus(error.message || 'Something went wrong. Please try again.') }
    finally { setSending(false) }
  }

  return <div className="shell">
    <header className="topbar">
      <a className="brand" href="#home"><span className="light" />riya<span className="slash">/</span><span className="crumb">home</span></a>
      <nav>{links.map(([label, href]) => <a key={label} href={href}>{label}</a>)}</nav>
      <a className="resume" href="/resume.pdf" target="_blank" rel="noreferrer">résumé ↗</a>
    </header>

    <main>
      <section className="hero" id="home">
        <div className="eyebrow"><span className="light" /> COMPUTER SCIENCE GRADUATE <span className="dot">·</span> OPEN TO OPPORTUNITIES</div>
        <h1>I turn data into<br /><span>useful experiences.</span></h1>
        <p className="intro">I’m Riya Singh, a computer science graduate with hands-on experience in warranty operations, claims, and customer data. I build responsive web projects and enjoy making information clearer and easier to act on.</p>
        <div className="actions"><a className="button primary" href="#work">explore my work <span>↘</span></a><a className="button" href="/resume.pdf" target="_blank" rel="noreferrer">résumé</a><a className="button" href="#contact">get in touch</a></div>
        <div className="hero-note"><span>GURUGRAM, INDIA</span><span>SCROLL TO EXPLORE <b>↓</b></span></div>
      </section>

      <section className="section" id="work">
        <div className="section-head"><div><span className="kicker">01 / SELECTED WORK</span><h2>Projects with purpose.</h2></div><span className="muted">Web · Data · UI</span></div>
        <div className="project-list">
          <article className="project-card"><div className="work-number">01</div><div><span className="kicker">REACT · SQL · PYTHON</span><h3>Customer Data Dashboard</h3><p>A dashboard concept inspired by real-world CRM work, bringing customer and operational data into focused filtering and analytics views. React powers the interface, with Python and SQL for data processing.</p><div className="tags"><span>Customer insights</span><span>Data visualization</span><span>Analytics</span></div></div><div className="project-icon">↗</div></article>
          <article className="project-card"><div className="work-number">02</div><div><span className="kicker">HTML · CSS · JAVASCRIPT</span><h3>E-Commerce Website</h3><p>A responsive storefront concept featuring product listings, category filtering, and cart interactions. Built with vanilla JavaScript for a lightweight, interactive experience.</p><div className="tags"><span>Responsive UI</span><span>Product filtering</span><span>Cart flow</span></div></div><div className="project-icon">⌘</div></article>
          <article className="project-card"><div className="work-number">03</div><div><span className="kicker">HTML · CSS · JAVASCRIPT</span><h3>Personal Portfolio Website</h3><p>A personal portfolio project showcasing front-end fundamentals and a clean, responsive web experience.</p><div className="tags"><span>Portfolio</span><span>Front end</span></div></div><div className="project-icon">✳</div></article>
        </div>
      </section>

      <section className="section about-grid" id="about">
        <div><span className="kicker">02 / ABOUT</span><h2>Operational insight.<br /><span className="muted">A builder’s mindset.</span></h2></div>
        <p className="about-copy">I’m a B.Tech Computer Science and Engineering graduate from Sushant University. At Okinawa Scooters & Motorcycles India, I managed warranty records and end-to-end claim workflows, used Excel and CRM tools for reporting and customer tracking, and worked with service teams to resolve escalations. That experience shaped how I approach software: organized data, clear workflows, and useful outcomes.</p>
      </section>

      <section className="section" id="experience"><div className="section-head"><div><span className="kicker">03 / EXPERIENCE & EDUCATION</span><h2>What I bring.</h2></div><span className="muted">Gurugram, India</span></div>
        <article className="timeline-item"><div className="timeline-date">SEP 2025 — FEB 2026</div><div><h3>Warranty Head <span>· Okinawa Scooters & Motorcycles India Pvt. Ltd.</span></h3><p>Managed warranty records and end-to-end claim processing, from validation and approval to tracking. Used Excel and CRM tools for reporting and customer follow-up, analyzed recurring claim issues, and coordinated escalations with internal teams and service centers.</p></div></article>
        <article className="timeline-item"><div className="timeline-date">GRADUATED 2025</div><div><h3>B.Tech, Computer Science and Engineering</h3><p>Sushant University · Gurugram</p></div></article>
      </section>

      <section className="section skills" id="skills"><div><span className="kicker">04 / TOOLKIT</span><h2>Tools I work with.</h2></div><div className="skill-groups"><div><span className="skill-label">WEB</span><p>HTML <i>·</i> CSS <i>·</i> JavaScript <i>·</i> React</p></div><div><span className="skill-label">DATA</span><p>Python <i>·</i> SQL <i>·</i> DBMS <i>·</i> Excel</p></div><div><span className="skill-label">OTHER</span><p>CRM tools <i>·</i> Networking fundamentals (CCNA)</p></div></div></section>

      <section className="section contact" id="contact">
        <div><span className="kicker">05 / GET IN TOUCH</span><h2>Have something<br />in mind? <span>Let’s talk.</span></h2><p>I’m looking for an entry-level web development or IT opportunity. Reach out and tell me what you have in mind.</p><div className="contact-direct"><a href="mailto:riyasingh7113@gmail.com">riyasingh7113@gmail.com ↗</a><a href="tel:+917428710327">+91 74287 10327</a></div></div>
        <form onSubmit={submit}>
          <label>Your name<input required maxLength="100" autoComplete="name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Jane Smith" /></label>
          <label>Email address<input required type="email" maxLength="254" autoComplete="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="jane@example.com" /></label>
          <label>Your message<textarea required maxLength="3000" rows="4" value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} placeholder="Tell me a little about it…" /></label>
          <div className="form-foot"><button className="button primary" disabled={sending}>{sending ? 'sending…' : 'send message ↗'}</button><span role="status">{status}</span></div>
        </form>
      </section>
    </main>
    <footer><a className="brand" href="#home"><span className="light" />riya<span className="slash">/</span></a><span>RIYA SINGH · © {new Date().getFullYear()}</span><a href="#home" className="text-link">BACK TO TOP ↑</a></footer>
  </div>
}

export default App

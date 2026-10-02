import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { FileDown, Menu, X } from 'lucide-react'
import { nav, profile } from '../data/content'
import './Nav.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section currently in view.
  useEffect(() => {
    const ids = nav.map((n) => n.href.slice(1))
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id))
      },
      { rootMargin: '-45% 0px -50% 0px' },
    )
    ids.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <a href="#top" className="nav__brand" aria-label={`${profile.name}, back to top`}>
          <img src={profile.logo} alt="" className="nav__logo" width="400" height="307" />
          <span className="nav__name">
            Avenier<span className="nav__dot">.</span>
          </span>
        </a>

        <nav aria-label="Primary" className="nav__links">
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={active === item.href.slice(1) ? 'is-active' : ''}
              aria-current={active === item.href.slice(1) ? 'true' : undefined}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="nav__actions">
          <a href={profile.resume} download className="btn btn-ghost nav__resume">
            <FileDown size={17} aria-hidden="true" /> Résumé
          </a>
          <a href="#book" className="btn btn-primary nav__cta">
            Book a call
          </a>
          <button
            className="nav__toggle"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="mobile-menu"
            aria-label="Mobile"
            className="nav__mobile"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.15 } }}
            transition={{ type: 'spring', stiffness: 260, damping: 26 }}
          >
            {nav.map((item) => (
              <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
            <a href={profile.resume} download className="btn btn-ghost" onClick={() => setOpen(false)}>
              <FileDown size={17} aria-hidden="true" /> Download résumé
            </a>
            <a href="#book" className="btn btn-primary" onClick={() => setOpen(false)}>
              Book a call
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}

import { ArrowRight, Mail } from 'lucide-react'
import Reveal from './Reveal'
import SocialIcon from './SocialIcons'
import { nav, profile, socials } from '../data/content'
import './Footer.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <>
      <section className="section cta" aria-labelledby="cta-title">
        <div className="container">
          <Reveal className="cta__box">
            <div className="cta__glow" aria-hidden="true" />
            <span className="eyebrow">Let’s work together</span>
            <h2 id="cta-title" className="h2">
              Each project is a unique opportunity. <span className="gradient-text">Let’s make yours count.</span>
            </h2>
            <p className="lead">
              Ready to take things off your plate and grow faster? Book a free call and let’s turn your vision into
              results.
            </p>
            <div className="cta__actions">
              <a href="#book" className="btn btn-primary">
                Book an appointment <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a href={profile.whatsapp} target="_blank" rel="noreferrer" className="btn btn-ghost">
                <SocialIcon name="whatsapp" size={17} /> Chat on WhatsApp
              </a>
              <a href={`mailto:${profile.email}`} className="btn btn-ghost">
                <Mail size={17} aria-hidden="true" /> Email me
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <a href="#top" className="footer__brand">
              <img src={profile.logo} alt="" width="400" height="307" />
              <span className="footer__name">
                Avenier Arellano<span>.</span>
              </span>
            </a>
            <p className="footer__tag">
              {profile.roles.join(' · ')}
              <br />
              Based in {profile.location}, working worldwide.
            </p>
          </div>
          <nav aria-label="Footer" className="footer__nav">
            {nav.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a href="#book">Book a call</a>
            <a href={profile.resume} download>
              Résumé (PDF)
            </a>
          </nav>
          <div className="footer__social">
            <a href={`mailto:${profile.email}`} aria-label="Email Avenier">
              <Mail size={18} />
            </a>
            {socials.map((s) => (
              <a key={s.name} href={s.href} target="_blank" rel="noreferrer" aria-label={`Avenier on ${s.label}`}>
                <SocialIcon name={s.name} size={18} />
              </a>
            ))}
          </div>
        </div>
        <div className="container footer__bottom">
          <p>© {YEAR} Avenier Arellano. All rights reserved.</p>
          <p>Designed &amp; built with Claude Code.</p>
        </div>
      </footer>
    </>
  )
}

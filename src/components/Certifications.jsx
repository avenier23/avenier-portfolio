import { useCallback, useState } from 'react'
import { Award, BadgeCheck } from 'lucide-react'
import Reveal from './Reveal'
import Lightbox from './Lightbox'
import { certifications, extraCredentials } from '../data/content'
import './Certifications.css'

export default function Certifications() {
  const [open, setOpen] = useState(null)
  const items = certifications.map((c) => ({ type: 'image', src: c.src, title: c.title, client: `${c.issuer} · ${c.date}` }))
  const navigate = useCallback((d) => setOpen((i) => (i + d + items.length) % items.length), [items.length])
  const close = useCallback(() => setOpen(null), [])

  return (
    <section className="section certs-section" id="certifications" aria-labelledby="certs-title">
      <div className="container">
        <Reveal className="section-head center">
          <span className="eyebrow">Credentials</span>
          <h2 id="certs-title" className="h2">
            Trained, certified <span className="muted">&amp; always learning</span>
          </h2>
        </Reveal>

        <ul className="certs">
          {certifications.map((c, i) => (
            <Reveal as="li" key={c.title} delay={i * 0.05}>
              <button className="cert card" onClick={() => setOpen(i)}>
                <span className="cert__img">
                  <img src={c.src} alt="" loading="lazy" />
                </span>
                <span className="cert__body">
                  <Award size={18} aria-hidden="true" />
                  <span>
                    <span className="cert__title">{c.title}</span>
                    <span className="cert__meta">
                      {c.issuer} · {c.date}
                      {c.note ? ` · ${c.note}` : ''}
                    </span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>

        <Reveal className="certs__extra">
          {extraCredentials.map((e) => (
            <span key={e} className="chip">
              <BadgeCheck size={15} aria-hidden="true" /> {e}
            </span>
          ))}
        </Reveal>
      </div>

      <Lightbox items={items} index={open} onClose={close} onNavigate={navigate} />
    </section>
  )
}
